<template>
  <div class="wrapper">
    <div class="nodata" v-if="pagination.total <= 0">
      <p>暂无数据</p>
    </div>
    <div class="item" v-for="rec in pagination.curlist.records" :key="rec.id">
      <div class="id">申请单ID：{{ rec.id }}</div>
      <div class="copid">企业ID：{{ rec.copId }}</div>
      <div class="status">申请结果(0未处理,1通过,2,拒绝)：{{ rec.status }}</div>
      <div class="appename">应用英文名：{{ rec.appEname }}</div>
      <div class="appcnname">应用中文名：{{ rec.appCnname }}</div>
      <div class="appnote">应用描述：{{ rec.appNote }}</div>
      <div class="viewrefappid">复制某个APP的视图,否则，复制BASE：{{ rec.viewrefappid }}</div>
      <div class="email">申请人邮箱：{{ rec.email }}</div>
      <div class="mobile">申请人联系电话：{{ rec.mobile }}</div>
      <div class="adminid">初始授权管理员：{{ rec.adminId }}</div>
      <div class="revision">乐观锁：{{ rec.revision }}</div>
      <div class="createdby">申请人：{{ rec.createdBy }}</div>
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
  import { Apprequest } from '/@/api/model/genModel';
  import { queryApprequests, deleteApprequest } from '/@/api/gen/apprequest';
  import { BasicPageParams, Page } from '/@/api/model/baseModel';
  import { onBeforeMount, reactive } from 'vue';

  let show = true;
  let hidesp = true;
  let total = 0;
  let pagesize = 3;
  let currentpage = 0;
  let curlist: Page<Apprequest> = {} as Page<Apprequest>;

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
    queryApprequests(param).then((res) => {
      pagination.curlist = res;
      pagination.currentpage = res.current;
      pagination.total = res.total;
    });
  }

  onBeforeMount(() => {
    handleCurrentChange(pagination.currentpage);
  });

  function onedit(rec: Apprequest) {
    console.log(rec);
  }
  function ondelete(rec: Apprequest) {
    deleteApprequest(rec.id).then((res) => {
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
