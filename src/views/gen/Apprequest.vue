<template>
  <PageWrapper v-loading="cacheState.loading" loading-tip="加载中..." title="Apprequest">
    <div class="nodata" v-if="cacheState.total === 0">
      <p>暂无数据</p>
    </div>
    <div class="item bg-white p-4 m-4" v-for="rec in cacheState.curlist.records" :key="rec.id">
      <div class="id">申请单ID:{{ rec.id }}</div>
      <div class="copid">企业ID:{{ rec.copId }}</div>
      <div class="status">申请结果(0未处理,1通过,2,拒绝):{{ rec.status }}</div>
      <div class="appename">应用英文名:{{ rec.appEname }}</div>
      <div class="appcnname">应用中文名:{{ rec.appCnname }}</div>
      <div class="appnote">应用描述:{{ rec.appNote }}</div>
      <div class="viewrefappid">复制某个APP的视图,否则，复制BASE:{{ rec.viewrefappid }}</div>
      <div class="email">申请人邮箱:{{ rec.email }}</div>
      <div class="mobile">申请人联系电话:{{ rec.mobile }}</div>
      <div class="adminid">初始授权管理员:{{ rec.adminId }}</div>
      <div class="revision">乐观锁:{{ rec.revision }}</div>
      <div class="createdby">申请人:{{ rec.createdBy }}</div>
      <div class="createdtime">创建时间:{{ rec.createdTime }}</div>
      <div class="updatedby">更新人:{{ rec.updatedBy }}</div>
      <div class="updatedtime">更新时间:{{ rec.updatedTime }}</div>
      <div class="deleteflag">删除标识:{{ rec.deleteFlag }}</div>
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
      title="Apprequest编辑"
      lock-scroll="true"
      width="30%"
      draggable
      :before-close="handleClose"
    >
      <span>我是对话框</span>
      <div class="id">申请单ID:{{ cacheState.curRec.id }}</div>
      <div class="copid">企业ID:{{ cacheState.curRec.copId }}</div>
      <div class="status">申请结果(0未处理,1通过,2,拒绝):{{ cacheState.curRec.status }}</div>
      <div class="appename">应用英文名:{{ cacheState.curRec.appEname }}</div>
      <div class="appcnname">应用中文名:{{ cacheState.curRec.appCnname }}</div>
      <div class="appnote">应用描述:{{ cacheState.curRec.appNote }}</div>
      <div class="viewrefappid"
        >复制某个APP的视图,否则，复制BASE:{{ cacheState.curRec.viewrefappid }}</div
      >
      <div class="email">申请人邮箱:{{ cacheState.curRec.email }}</div>
      <div class="mobile">申请人联系电话:{{ cacheState.curRec.mobile }}</div>
      <div class="adminid">初始授权管理员:{{ cacheState.curRec.adminId }}</div>
      <div class="revision">乐观锁:{{ cacheState.curRec.revision }}</div>
      <div class="createdby">申请人:{{ cacheState.curRec.createdBy }}</div>
      <div class="createdtime">创建时间:{{ cacheState.curRec.createdTime }}</div>
      <div class="updatedby">更新人:{{ cacheState.curRec.updatedBy }}</div>
      <div class="updatedtime">更新时间:{{ cacheState.curRec.updatedTime }}</div>
      <div class="deleteflag">删除标识:{{ cacheState.curRec.deleteFlag }}</div>
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
  import { Apprequest } from '/@/api/model/genModel';
  import { queryApprequests, deleteApprequest } from '/@/api/gen/apprequest';
  import { BasicPageParams, Page } from '/@/api/model/baseModel';
  import { onBeforeMount, reactive } from 'vue';

  const cacheState = reactive({
    loading: false,
    show: true,
    hidesp: true,
    total: -1,
    pagesize: 3,
    currentpage: 0,
    curlist: {} as Page<Apprequest>,
    dialogVisible: false,
    curRec: {} as Apprequest,
  });

  function handleCurrentChange(val: number) {
    cacheState.loading = true;
    cacheState.currentpage = val;
    const param: BasicPageParams = {
      page: cacheState.currentpage,
      pageSize: cacheState.pagesize,
    };
    queryApprequests(param).then((res) => {
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

  function onedit(rec: Apprequest) {
    cacheState.curRec = rec;
    cacheState.dialogVisible = true;
  }
  function ondelete(rec: Apprequest) {
    deleteApprequest(rec.id).then((res) => {
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
