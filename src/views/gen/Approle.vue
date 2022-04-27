<template>
  <div class="wrapper">
    <div class="nodata" v-if="cacheState.total <= 0">
      <p>暂无数据</p>
    </div>
    <div class="item" v-for="rec in cacheState.curlist.records" :key="rec.id">
      <div class="id">角色ID：{{ rec.id }}</div>
      <div class="appid">应用ID：{{ rec.appId }}</div>
      <div class="groupid">角色对应分组ID：{{ rec.groupId }}</div>
      <div class="roleename">角色英文名：{{ rec.roleEname }}</div>
      <div class="rolecname">角色中文名称：{{ rec.roleCname }}</div>
      <div class="note">角色描述：{{ rec.note }}</div>
      <div class="revision">乐观锁：{{ rec.revision }}</div>
      <div class="createdby">创建人：{{ rec.createdBy }}</div>
      <div class="createdtime">创建时间：{{ rec.createdTime }}</div>
      <div class="updatedby">更新人：{{ rec.updatedBy }}</div>
      <div class="updatedtime">更新时间：{{ rec.updatedTime }}</div>
      <div class="deleteflag">删除标识：{{ rec.deleteFlag }}</div>
      <div class="operate">
        <el-button type="primary" size="small" @click="onedit(rec)">编辑</el-button>
        <el-button type="danger" size="small" @click="ondelete(rec)">删除</el-button>
      </div>
    </div>
    <el-pagination
      :hide-on-single-page="cacheState.hidesp"
      :total="cacheState.total"
      :page-size="cacheState.pagesize"
      :current-page="cacheState.currentpage"
      @current-change="handleCurrentChange"
      layout="prev, pager, next"
    />
    <el-dialog
      v-model="cacheState.dialogVisible"
      title="Approle编辑"
      lock-scroll="true"
      width="30%"
      draggable
      :before-close="handleClose"
    >
      <span>我是对话框</span>
      <div class="id">角色ID：{{ cacheState.curRec.id }}</div>
      <div class="appid">应用ID：{{ cacheState.curRec.appId }}</div>
      <div class="groupid">角色对应分组ID：{{ cacheState.curRec.groupId }}</div>
      <div class="roleename">角色英文名：{{ cacheState.curRec.roleEname }}</div>
      <div class="rolecname">角色中文名称：{{ cacheState.curRec.roleCname }}</div>
      <div class="note">角色描述：{{ cacheState.curRec.note }}</div>
      <div class="revision">乐观锁：{{ cacheState.curRec.revision }}</div>
      <div class="createdby">创建人：{{ cacheState.curRec.createdBy }}</div>
      <div class="createdtime">创建时间：{{ cacheState.curRec.createdTime }}</div>
      <div class="updatedby">更新人：{{ cacheState.curRec.updatedBy }}</div>
      <div class="updatedtime">更新时间：{{ cacheState.curRec.updatedTime }}</div>
      <div class="deleteflag">删除标识：{{ cacheState.curRec.deleteFlag }}</div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cacheState.dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="cacheState.dialogVisible = false">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
  import { Approle } from '/@/api/model/genModel';
  import { queryApproles, deleteApprole } from '/@/api/gen/approle';
  import { BasicPageParams, Page } from '/@/api/model/baseModel';
  import { onBeforeMount, reactive } from 'vue';

  let show = true;
  let hidesp = true;
  let total = 0;
  let pagesize = 3;
  let currentpage = 0;
  let curlist: Page<Approle> = {} as Page<Approle>;
  let dialogVisible = false;
  let curRec = {} as Approle;

  const cacheState = reactive({
    show,
    hidesp,
    total,
    pagesize,
    currentpage,
    curlist,
    dialogVisible,
    curRec,
  });

  function handleCurrentChange(val: number) {
    cacheState.currentpage = val;
    const param: BasicPageParams = {
      page: cacheState.currentpage,
      pageSize: cacheState.pagesize,
    };
    queryApproles(param).then((res) => {
      cacheState.curlist = res;
      cacheState.currentpage = res.current;
      cacheState.total = res.total;
    });
  }

  onBeforeMount(() => {
    handleCurrentChange(cacheState.currentpage);
  });

  function onedit(rec: Approle) {
    cacheState.curRec = rec;
    cacheState.dialogVisible = true;
  }
  function ondelete(rec: Approle) {
    deleteApprole(rec.id).then((res) => {
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
  .wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .nodata {
    position: absolute;
    left: 50%;
    top: 15rem;
    transform: translateX(-50%);
  }
</style>
