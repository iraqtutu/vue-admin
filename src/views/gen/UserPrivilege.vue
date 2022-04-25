<template>
  <div class="wrapper">
    <div class="nodata" v-if="pagination.total <= 0">
      <p>暂无数据</p>
    </div>
    <div class="item" v-for="rec in pagination.curlist.records" :key="rec.id">
      <div class="id">：{{ rec.id }}</div>
      <div class="uuid">：{{ rec.uuid }}</div>
      <div class="createtime">：{{ rec.createTime }}</div>
      <div class="archived">：{{ rec.archived }}</div>
      <div class="version">：{{ rec.version }}</div>
      <div class="userid">：{{ rec.userId }}</div>
      <div class="privilege">：{{ rec.privilege }}</div>
      <div class="operate">
        <el-button type="primary" size="small" @click="onedit(rec)">编辑</el-button>
        <el-button type="danger" size="small" @click="ondelete(rec)">删除</el-button>
      </div>
    </div>
    <el-pagination
      :hide-on-single-page="pagination.hidesp"
      :total="pagination.total"
      :page-size="pagination.pagesize"
      :current-page="pagination.currentpage"
      @current-change="handleCurrentChange"
      layout="prev, pager, next"
    />
  </div>
</template>
<script setup lang="ts">
  import { UserPrivilege } from '/@/api/model/genModel';
  import { queryUserPrivileges, deleteUserPrivilege } from '/@/api/gen/userprivilege';
  import { BasicPageParams, Page } from '/@/api/model/baseModel';
  import { onBeforeMount, reactive } from 'vue';

  let show = true;
  let hidesp = true;
  let total = 0;
  let pagesize = 3;
  let currentpage = 0;
  let curlist: Page<UserPrivilege> = {} as Page<UserPrivilege>;

  const pagination = reactive({
    show,
    hidesp,
    total,
    pagesize,
    currentpage,
    curlist,
  });

  function handleCurrentChange(val: number) {
    pagination.currentpage = val;
    const param: BasicPageParams = {
      page: pagination.currentpage,
      pageSize: pagination.pagesize,
    };
    queryUserPrivileges(param).then((res) => {
      pagination.curlist = res;
      pagination.currentpage = res.current;
      pagination.total = res.total;
    });
  }

  onBeforeMount(() => {
    handleCurrentChange(pagination.currentpage);
  });

  function onedit(rec: UserPrivilege) {
    console.log(rec);
  }
  function ondelete(rec: UserPrivilege) {
    deleteUserPrivilege(rec.id).then((res) => {
      if (res) {
        handleCurrentChange(pagination.currentpage);
      }
    });
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
