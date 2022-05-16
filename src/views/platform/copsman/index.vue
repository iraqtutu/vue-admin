<template>
  <div class="wrapper">
    <div class="nodata" v-if="cacheState.total <= 0">
      <p>暂无数据</p>
    </div>
    <div class="item bg-white p-4 m-4" v-for="rec in cacheState.curlist.records" :key="rec.id">
      <div class="cont">
        <div class="up">
          <div class="col min-w-20 flex flex-col justify-center items-center">
            <div class="logo w-14 h-14"> <img :src="rec.logo" alt="" /> </div>
          </div>
          <div class="col min-w-100">
            <div class="copname font-bold text-black cursor-pointer" @click="onedit(rec)"
              >{{ rec.copName }}
              <span v-if="rec.status == 1" class="tip bg-emerald-500 bg-opacity-50 p-0.5"
                >正常</span
              >
              <span v-if="rec.status == 0" class="tip bg-orange-500 bg-opacity-50 p-0.5"
                >新申请</span
              >
              <span v-if="rec.status == 2" class="tip bg-rose-600 bg-opacity-50 p-0.5">已拒绝</span>
              <span v-if="rec.status == 3" class="tip bg-blue-500 bg-opacity-50 p-0.5">暂停</span>
            </div>
            <!-- <div class="status">申请结果(0未处理,1正常,2拒绝,3暂停)：{{ rec.status }}</div> -->
            <div class="address">{{ rec.address }}</div>
          </div>
          <div class="col min-w-80">
            <div class="linkman">联系人：{{ rec.linkMan }}</div>
            <div class="linkmanmobile">联系人电话：{{ rec.linkManMobile }}</div>
          </div>
          <div class="col">
            <div class="createdby">创建人：{{ rec.createdBy }}</div>
            <!-- <div class="creatormobile">创建人手机号：{{ rec.creatorMobile }}</div> -->
            <div class="createdtime">创建时间：{{ rec.createdTime }}</div>
          </div>
        </div>
        <div class="down">
          <div class="copdesc">企业描述：{{ rec.copDesc }}</div>
          <div class="float-right">
            <el-button v-if="rec.status == 0" type="success"
              ><span class="iconify text-l" data-icon="iconoir:security-pass"></span
              >审核通过</el-button
            >
            <el-button v-if="rec.status == 3" type="primary" @click="onedit(rec)"
              ><span class="iconify text-l" data-icon="clarity:note-edit-line"></span
              >恢复</el-button
            >
            <el-button v-if="rec.status == 0" type="warning"
              ><span class="iconify text-l" data-icon="fluent:pause-circle-20-regular"></span
              >暂停</el-button
            >
            <el-button type="danger" @click="ondelete(rec)">
              <span class="iconify text-l" data-icon="ep:delete"></span>删除
            </el-button>
          </div>
          <div class="clear-both"></div>
        </div>
      </div>
    </div>
    <el-pagination
      class="ml-4"
      :hide-on-single-page="cacheState.hidesp"
      :page-sizes="[5, 10, 20, 50]"
      :total="cacheState.total"
      :page-size="cacheState.pagesize"
      :current-page="cacheState.currentpage"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      layout="total, sizes, prev, pager, next, jumper"
    />
    <el-dialog
      v-model="cacheState.dialogVisible"
      :title="cacheState.curCop.copName"
      lock-scroll="true"
      width="30%"
      draggable
    >
      <span>{{ cacheState.curCop.copName }}</span>
      <div class="id">企业唯一标识：{{ cacheState.curCop.id }}</div>
      <div class="copname">企业或机构名称：{{ cacheState.curCop.copName }}</div>
      <div class="logo">公司LOGO：{{ cacheState.curCop.logo }}</div>
      <div class="bizlicense">营业执照：{{ cacheState.curCop.bizLicense }}</div>
      <div class="linkman">联系人：{{ cacheState.curCop.linkMan }}</div>
      <div class="linkmanmobile">联系人电话：{{ cacheState.curCop.linkManMobile }}</div>
      <div class="address">联系地址：{{ cacheState.curCop.address }}</div>
      <div class="checked">是否核实：{{ cacheState.curCop.checked }}</div>
      <div class="checkuser">核实人员：{{ cacheState.curCop.checkUser }}</div>
      <div class="revision">乐观锁：{{ cacheState.curCop.revision }}</div>
      <div class="createdby">创建人：{{ cacheState.curCop.createdBy }}</div>
      <div class="creatormobile">创建人手机号：{{ cacheState.curCop.creatorMobile }}</div>
      <div class="createdtime">创建时间：{{ cacheState.curCop.createdTime }}</div>
      <div class="updatedby">更新人：{{ cacheState.curCop.updatedBy }}</div>
      <div class="updatedtime">更新时间：{{ cacheState.curCop.updatedTime }}</div>
      <div class="deleteflag">删除标识：{{ cacheState.curCop.deleteFlag }}</div>
      <div class="copdesc">企业描述：{{ cacheState.curCop.copDesc }}</div>
      <template #footer>
        <span class="dialog-footer">
          <el-button v-if="cacheState.curCop.status == 0" type="success" circle
            ><span class="iconify text-l" data-icon="iconoir:security-pass"></span
          ></el-button>
          <el-button type="primary" circle @click="onedit(cacheState.curCop)"
            ><span class="iconify text-l" data-icon="clarity:note-edit-line"></span
          ></el-button>
          <el-button type="warning" circle
            ><span class="iconify text-l" data-icon="fluent:pause-circle-20-regular"></span
          ></el-button>
          <el-button type="danger" circle @click="ondelete(cacheState.curCop)">
            <span class="iconify text-l" data-icon="ep:delete"></span>
          </el-button>
          <el-button @click="cacheState.dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="cacheState.dialogVisible = false">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
  import { Coperation } from '/@/api/model/genModel';
  import { queryCoperations, deleteCoperation } from '/@/api/gen/coperation';
  import { BasicPageParams, Page } from '/@/api/model/baseModel';
  import { onBeforeMount, reactive } from 'vue';

  let dialogVisible = false;
  let curCop = {} as Coperation;
  let show = true;
  let hidesp = true;
  let total = 0;
  let pagesize = 3;
  let currentpage = 0;
  let curlist: Page<Coperation> = {} as Page<Coperation>;

  const cacheState = reactive({
    dialogVisible,
    curCop,
    show,
    hidesp,
    total,
    pagesize,
    currentpage,
    curlist,
  });

  function handleCurrentChange(val: number) {
    cacheState.currentpage = val;
    const param: BasicPageParams = {
      page: cacheState.currentpage,
      pageSize: cacheState.pagesize,
    };
    queryCoperations(param).then((res) => {
      cacheState.curlist = res;
      cacheState.currentpage = res.current;
      cacheState.total = res.total;
    });
  }
  function handleSizeChange(val: number) {
    cacheState.pagesize = val;
    handleCurrentChange(cacheState.currentpage);
  }
  onBeforeMount(() => {
    handleCurrentChange(cacheState.currentpage);
  });

  function onedit(rec: Coperation) {
    cacheState.curCop = rec;
    cacheState.dialogVisible = true;
  }
  function ondelete(rec: Coperation) {
    deleteCoperation(rec.id).then((res) => {
      if (res) {
        handleCurrentChange(cacheState.currentpage);
      }
    });
  }
</script>
<style scoped>
  .nodata {
    position: absolute;
    left: 50%;
    top: 15rem;
    transform: translateX(-50%);
  }

  .cont {
    background-color: #fff;
  }

  .up {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    line-height: 2rem;
  }

  span.tip {
    border-radius: 0.2rem;
    vertical-align: super;
    font-size: 0.6rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
      'Open Sans', 'Helvetica Neue', sans-serif;
    color: #fff;
  }
</style>
