<template>
  <PageWrapper v-loading="cacheState.loading" loading-tip="加载中..." title="Coperation">
    <div class="nodata" v-if="cacheState.total === 0">
      <p>暂无数据</p>
    </div>
    <div class="item bg-white p-4 m-4" v-for="rec in cacheState.curlist.records" :key="rec.id">
      <div class="id">企业唯一标识:{{ rec.id }}</div>
      <div class="copname">企业或机构名称:{{ rec.copName }}</div>
      <div class="logo">公司LOGO:{{ rec.logo }}</div>
      <div class="bizlicense">营业执照:{{ rec.bizLicense }}</div>
      <div class="linkman">联系人:{{ rec.linkMan }}</div>
      <div class="linkmanmobile">联系人电话:{{ rec.linkManMobile }}</div>
      <div class="address">联系地址:{{ rec.address }}</div>
      <div class="checked">是否核实:{{ rec.checked }}</div>
      <div class="checkuser">核实人员:{{ rec.checkUser }}</div>
      <div class="revision">乐观锁:{{ rec.revision }}</div>
      <div class="createdby">创建人:{{ rec.createdBy }}</div>
      <div class="creatormobile">创建人手机号:{{ rec.creatorMobile }}</div>
      <div class="createdtime">创建时间:{{ rec.createdTime }}</div>
      <div class="updatedby">更新人:{{ rec.updatedBy }}</div>
      <div class="updatedtime">更新时间:{{ rec.updatedTime }}</div>
      <div class="deleteflag">删除标识:{{ rec.deleteFlag }}</div>
      <div class="copdesc">企业描述:{{ rec.copDesc }}</div>
      <div class="status">申请结果(0未处理,1正常,2拒绝,3暂停):{{ rec.status }}</div>
      <div class="operate">
        <el-button type="primary" size="small" @click="onedit(rec)">编辑</el-button>
        <el-button type="danger" size="small" @click="ondelete(rec)">删除</el-button>
      </div>
    </div>
    <el-pagination
      class="m-4"
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
      title="Coperation编辑"
      lock-scroll="true"
      width="30%"
      draggable
      :before-close="handleClose"
    >
      <span>我是对话框</span>
      <div class="id">企业唯一标识:{{ cacheState.curRec.id }}</div>
      <div class="copname">企业或机构名称:{{ cacheState.curRec.copName }}</div>
      <div class="logo">公司LOGO:{{ cacheState.curRec.logo }}</div>
      <div class="bizlicense">营业执照:{{ cacheState.curRec.bizLicense }}</div>
      <div class="linkman">联系人:{{ cacheState.curRec.linkMan }}</div>
      <div class="linkmanmobile">联系人电话:{{ cacheState.curRec.linkManMobile }}</div>
      <div class="address">联系地址:{{ cacheState.curRec.address }}</div>
      <div class="checked">是否核实:{{ cacheState.curRec.checked }}</div>
      <div class="checkuser">核实人员:{{ cacheState.curRec.checkUser }}</div>
      <div class="revision">乐观锁:{{ cacheState.curRec.revision }}</div>
      <div class="createdby">创建人:{{ cacheState.curRec.createdBy }}</div>
      <div class="creatormobile">创建人手机号:{{ cacheState.curRec.creatorMobile }}</div>
      <div class="createdtime">创建时间:{{ cacheState.curRec.createdTime }}</div>
      <div class="updatedby">更新人:{{ cacheState.curRec.updatedBy }}</div>
      <div class="updatedtime">更新时间:{{ cacheState.curRec.updatedTime }}</div>
      <div class="deleteflag">删除标识:{{ cacheState.curRec.deleteFlag }}</div>
      <div class="copdesc">企业描述:{{ cacheState.curRec.copDesc }}</div>
      <div class="status">申请结果(0未处理,1正常,2拒绝,3暂停):{{ cacheState.curRec.status }}</div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cacheState.dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="cacheState.dialogVisible = false">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </PageWrapper>
</template>
<script setup lang="ts">
  import { Coperation } from '/@/api/model/genModel';
  import { queryCoperations, deleteCoperation } from '/@/api/gen/coperation';
  import { BasicPageParams, Page } from '/@/api/model/baseModel';
  import { onBeforeMount, reactive } from 'vue';

  const cacheState = reactive({
    loading: false,
    show: true,
    hidesp: true,
    total: -1,
    pagesize: 3,
    currentpage: 0,
    curlist: {} as Page<Coperation>,
    dialogVisible: false,
    curRec: {} as Coperation,
  });

  function handleCurrentChange(val: number) {
    cacheState.loading = true;
    cacheState.currentpage = val;
    const param: BasicPageParams = {
      page: cacheState.currentpage,
      pageSize: cacheState.pagesize,
    };
    queryCoperations(param).then((res) => {
      cacheState.curlist = res;
      cacheState.currentpage = res.current;
      cacheState.total = res.total;
      cacheState.loading = false;
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
    cacheState.curRec = rec;
    cacheState.dialogVisible = true;
  }
  function ondelete(rec: Coperation) {
    deleteCoperation(rec.id).then((res) => {
      if (res) {
        handleCurrentChange(cacheState.currentpage);
      }
    });
  }
  function handleClose() {
    // 点击空白区域是否关闭对话框
    // cacheState.dialogVisible = false;
  }
</script>
<style scoped>
  .nodata {
    position: absolute;
    left: 50%;
    top: 15rem;
    transform: translateX(-50%);
  }
</style>
