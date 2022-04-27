<template>
  <div class="wrapper">
    <div class="nodata" v-if="cacheState.total <= 0">
      <p>暂无数据</p>
    </div>
    <div class="item" v-for="rec in cacheState.curlist.records" :key="rec.id">
      <div class="cont text-gray-500">
        <div class="up pt-3">
          <div class="col min-w-20 flex flex-col justify-center items-center">
            <div class="logo w-20 h-20 p-3"> <img :src="rec.logo" alt="" /> </div>
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
            <div v-if="false" class="operate">
              <el-button v-if="rec.status == 0" type="success" circle
                ><span class="iconify text-l" data-icon="iconoir:security-pass"></span
              ></el-button>
              <el-button type="primary" circle @click="onedit(rec)"
                ><span class="iconify text-l" data-icon="clarity:note-edit-line"></span
              ></el-button>
              <el-button type="warning" circle
                ><span class="iconify text-l" data-icon="bi:pause"></span
              ></el-button>
              <el-button type="danger" circle @click="ondelete(rec)">
                <span class="iconify text-l" data-icon="ep:delete"></span>
              </el-button>
            </div>
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
        <div class="down mt-2">
          <div class="copdesc ml-3 mr-3">企业描述：{{ rec.copDesc }}</div>
        </div>
      </div>
      <div class="split"></div>
    </div>
    <el-pagination
      :hide-on-single-page="cacheState.hidesp"
      :total="cacheState.total"
      :page-size="cacheState.pagesize"
      :current-page="cacheState.currentpage"
      @current-change="handleCurrentChange"
      layout="prev, pager, next"
    />
  </div>
  <el-dialog
    v-model="cacheState.dialogVisible"
    :title="cacheState.curCop.copName"
    lock-scroll="true"
    width="30%"
    draggable
  >
    <span>{{ cacheState.curCop.copName }}</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cacheState.dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="cacheState.dialogVisible = false">确认</el-button>
      </span>
    </template>
  </el-dialog>
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
  .wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 1rem, 0;
  }

  .nodata {
    position: absolute;
    left: 50%;
    top: 15rem;
    transform: translateX(-50%);
  }

  .item {
    padding: 0.5rem;
  }

  .cont {
    background-color: #fff;
    padding-bottom: 0.4rem;
  }

  .split {
    height: 0.2rem;
    background: transparent;
  }

  .up {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    line-height: 2rem;
  }

  .col {
    padding: auto, 3rem;
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
