<template>
  <div class="wrapper">
    <div class="nodata" v-if="cacheState.total <= 0">
      <p>暂无数据</p>
    </div>
    <div class="item" v-for="rec in cacheState.curlist.records" :key="rec.id">
      <div class="id">组标识：{{ rec.id }}</div>
      <div class="appid">应用标识：{{ rec.appid }}</div>
      <div class="parentid">上级组节点：{{ rec.parentId }}</div>
      <div class="groupname">组名称：{{ rec.groupName }}</div>
      <div class="note">备注：{{ rec.note }}</div>
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
      title="Funccategory编辑"
      lock-scroll="true"
      width="30%"
      draggable
      :before-close="handleClose"
    >
      <span>我是对话框</span>
      <div class="id">组标识：{{ cacheState.curRec.id }}</div>
      <div class="appid">应用标识：{{ cacheState.curRec.appid }}</div>
      <div class="parentid">上级组节点：{{ cacheState.curRec.parentId }}</div>
      <div class="groupname">组名称：{{ cacheState.curRec.groupName }}</div>
      <div class="note">备注：{{ cacheState.curRec.note }}</div>
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
  import { Funccategory } from '/@/api/model/genModel';
  import { queryFunccategorys, deleteFunccategory } from '/@/api/gen/funccategory';
  import { BasicPageParams, Page } from '/@/api/model/baseModel';
  import { onBeforeMount, reactive } from 'vue';

  let show = true;
  let hidesp = true;
  let total = 0;
  let pagesize = 3;
  let currentpage = 0;
  let curlist: Page<Funccategory> = {} as Page<Funccategory>;
  let dialogVisible = false;
  let curRec = {} as Funccategory;

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
    queryFunccategorys(param).then((res) => {
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

  function onedit(rec: Funccategory) {
    cacheState.curRec = rec;
    cacheState.dialogVisible = true;
  }
  function ondelete(rec: Funccategory) {
    deleteFunccategory(rec.id).then((res) => {
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
