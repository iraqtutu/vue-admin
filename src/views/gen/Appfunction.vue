<template>
  <PageWrapper v-loading="cacheState.loading" loading-tip="加载中..." title="Appfunction">
    <div class="nodata" v-if="cacheState.total === 0">
      <p>暂无数据</p>
    </div>
    <div class="item bg-white p-4 m-4" v-for="rec in cacheState.curlist.records" :key="rec.id">
      <div class="id">数据ID:{{ rec.id }}</div>
      <div class="appid">应用ID:{{ rec.appId }}</div>
      <div class="groupid">功能分组ID:{{ rec.groupId }}</div>
      <div class="functionid">功能ID:{{ rec.functionId }}</div>
      <div class="functionename">功能英文名:{{ rec.functionEname }}</div>
      <div class="functioncname">功能中文名:{{ rec.functionCname }}</div>
      <div class="url">功能对应的URL:{{ rec.url }}</div>
      <div class="note">功能描述:{{ rec.note }}</div>
      <div class="revision">乐观锁:{{ rec.revision }}</div>
      <div class="createdby">创建人:{{ rec.createdBy }}</div>
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
      title="Appfunction编辑"
      lock-scroll="true"
      width="30%"
      draggable
      :before-close="handleClose"
    >
      <span>我是对话框</span>
      <div class="id">数据ID:{{ cacheState.curRec.id }}</div>
      <div class="appid">应用ID:{{ cacheState.curRec.appId }}</div>
      <div class="groupid">功能分组ID:{{ cacheState.curRec.groupId }}</div>
      <div class="functionid">功能ID:{{ cacheState.curRec.functionId }}</div>
      <div class="functionename">功能英文名:{{ cacheState.curRec.functionEname }}</div>
      <div class="functioncname">功能中文名:{{ cacheState.curRec.functionCname }}</div>
      <div class="url">功能对应的URL:{{ cacheState.curRec.url }}</div>
      <div class="note">功能描述:{{ cacheState.curRec.note }}</div>
      <div class="revision">乐观锁:{{ cacheState.curRec.revision }}</div>
      <div class="createdby">创建人:{{ cacheState.curRec.createdBy }}</div>
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
  import { Appfunction } from '/@/api/model/genModel';
  import { queryAppfunctions, deleteAppfunction } from '/@/api/gen/appfunction';
  import { BasicPageParams, Page } from '/@/api/model/baseModel';
  import { onBeforeMount, reactive } from 'vue';

  const cacheState = reactive({
    loading: false,
    show: true,
    hidesp: true,
    total: -1,
    pagesize: 3,
    currentpage: 0,
    curlist: {} as Page<Appfunction>,
    dialogVisible: false,
    curRec: {} as Appfunction,
  });

  function handleCurrentChange(val: number) {
    cacheState.loading = true;
    cacheState.currentpage = val;
    const param: BasicPageParams = {
      page: cacheState.currentpage,
      pageSize: cacheState.pagesize,
    };
    queryAppfunctions(param).then((res) => {
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

  function onedit(rec: Appfunction) {
    cacheState.curRec = rec;
    cacheState.dialogVisible = true;
  }
  function ondelete(rec: Appfunction) {
    deleteAppfunction(rec.id).then((res) => {
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
