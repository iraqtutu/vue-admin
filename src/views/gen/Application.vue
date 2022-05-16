<template>
  <PageWrapper v-loading="cacheState.loading" loading-tip="加载中..." title="Application">
    <div class="nodata" v-if="cacheState.total === 0">
      <p>暂无数据</p>
    </div>
    <div class="item bg-white p-4 m-4" v-for="rec in cacheState.curlist.records" :key="rec.id">
      <div class="clientid">客户端唯一标识，应用名:{{ rec.clientId }}</div>
      <div class="resourceids">当前客户端能够访问哪些资源:{{ rec.resourceIds }}</div>
      <div class="clientsecret">客户端密码:{{ rec.clientSecret }}</div>
      <div class="scope">用户可选,让客户端可以请求的权限:{{ rec.scope }}</div>
      <div class="authorizedgranttypes">客户端授权类型:{{ rec.authorizedGrantTypes }}</div>
      <div class="webserverredirecturi">重定向地址:{{ rec.webServerRedirectUri }}</div>
      <div class="authorities">客户端固有的权限:{{ rec.authorities }}</div>
      <div class="accesstokenvalidity">Token有效期:{{ rec.accessTokenValidity }}</div>
      <div class="refreshtokenvalidity">RefreshToken有效期:{{ rec.refreshTokenValidity }}</div>
      <div class="additionalinformation">附加信息:{{ rec.additionalInformation }}</div>
      <div class="createtime">创建时间:{{ rec.createTime }}</div>
      <div class="archived">是否归档，逻辑删除:{{ rec.archived }}</div>
      <div class="trusted">是否可信的，全权限？:{{ rec.trusted }}</div>
      <div class="autoapprove">自动允许，登陆后无需点击授权:{{ rec.autoapprove }}</div>
      <div class="appname">应用中文名称:{{ rec.appname }}</div>
      <div class="description">应用简介:{{ rec.description }}</div>
      <div class="logo">应用logo的URL:{{ rec.logo }}</div>
      <div class="copid">企业ID:{{ rec.copId }}</div>
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
      title="Application编辑"
      lock-scroll="true"
      width="30%"
      draggable
      :before-close="handleClose"
    >
      <span>我是对话框</span>
      <div class="clientid">客户端唯一标识，应用名:{{ cacheState.curRec.clientId }}</div>
      <div class="resourceids">当前客户端能够访问哪些资源:{{ cacheState.curRec.resourceIds }}</div>
      <div class="clientsecret">客户端密码:{{ cacheState.curRec.clientSecret }}</div>
      <div class="scope">用户可选,让客户端可以请求的权限:{{ cacheState.curRec.scope }}</div>
      <div class="authorizedgranttypes"
        >客户端授权类型:{{ cacheState.curRec.authorizedGrantTypes }}</div
      >
      <div class="webserverredirecturi"
        >重定向地址:{{ cacheState.curRec.webServerRedirectUri }}</div
      >
      <div class="authorities">客户端固有的权限:{{ cacheState.curRec.authorities }}</div>
      <div class="accesstokenvalidity">Token有效期:{{ cacheState.curRec.accessTokenValidity }}</div>
      <div class="refreshtokenvalidity"
        >RefreshToken有效期:{{ cacheState.curRec.refreshTokenValidity }}</div
      >
      <div class="additionalinformation"
        >附加信息:{{ cacheState.curRec.additionalInformation }}</div
      >
      <div class="createtime">创建时间:{{ cacheState.curRec.createTime }}</div>
      <div class="archived">是否归档，逻辑删除:{{ cacheState.curRec.archived }}</div>
      <div class="trusted">是否可信的，全权限？:{{ cacheState.curRec.trusted }}</div>
      <div class="autoapprove"
        >自动允许，登陆后无需点击授权:{{ cacheState.curRec.autoapprove }}</div
      >
      <div class="appname">应用中文名称:{{ cacheState.curRec.appname }}</div>
      <div class="description">应用简介:{{ cacheState.curRec.description }}</div>
      <div class="logo">应用logo的URL:{{ cacheState.curRec.logo }}</div>
      <div class="copid">企业ID:{{ cacheState.curRec.copId }}</div>
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
  import { Application } from '/@/api/model/genModel';
  import { queryApplications, deleteApplication } from '/@/api/gen/application';
  import { BasicPageParams, Page } from '/@/api/model/baseModel';
  import { onBeforeMount, reactive } from 'vue';

  const cacheState = reactive({
    loading: false,
    show: true,
    hidesp: true,
    total: -1,
    pagesize: 3,
    currentpage: 0,
    curlist: {} as Page<Application>,
    dialogVisible: false,
    curRec: {} as Application,
  });

  function handleCurrentChange(val: number) {
    cacheState.loading = true;
    cacheState.currentpage = val;
    const param: BasicPageParams = {
      page: cacheState.currentpage,
      pageSize: cacheState.pagesize,
    };
    queryApplications(param).then((res) => {
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

  function onedit(rec: Application) {
    cacheState.curRec = rec;
    cacheState.dialogVisible = true;
  }
  function ondelete(rec: Application) {
    deleteApplication(rec.id).then((res) => {
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
