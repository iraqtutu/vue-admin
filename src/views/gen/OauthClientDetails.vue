<template>
  <div class="wrapper">
    <div class="nodata" v-if="cacheState.total <= 0">
      <p>暂无数据</p>
    </div>
    <div class="item" v-for="rec in cacheState.curlist.records" :key="rec.id">
      <div class="id">数据ID：{{ rec.id }}</div>
      <div class="clientid">应用英文标识;：{{ rec.clientId }}</div>
      <div class="resourceids">客户端资源ID;：{{ rec.resourceIds }}</div>
      <div class="clientsecret">客户端密码;：{{ rec.clientSecret }}</div>
      <div class="scope">作用域(也是权限);：{{ rec.scope }}</div>
      <div class="authorizedgranttypes"
        >授权模式(安全码、密码等);：{{ rec.authorizedGrantTypes }}</div
      >
      <div class="webserverredirecturi">重定向地址;：{{ rec.webServerRedirectUri }}</div>
      <div class="authorities">申请Oauth服务器的权限;：{{ rec.authorities }}</div>
      <div class="accesstokenvalidity">令牌过期时间;：{{ rec.accessTokenValidity }}</div>
      <div class="refreshtokenvalidity">刷新令牌过期时间;：{{ rec.refreshTokenValidity }}</div>
      <div class="additionalinformation">附件信息;：{{ rec.additionalInformation }}</div>
      <div class="createtime">创建时间;：{{ rec.createTime }}</div>
      <div class="archived">被归档(逻辑删除);：{{ rec.archived }}</div>
      <div class="trusted">可信的;：{{ rec.trusted }}</div>
      <div class="autoapprove">自动授权，无需用户点击;：{{ rec.autoapprove }}</div>
      <div class="copid">企业ID：{{ rec.copId }}</div>
      <div class="appcname">应用中文名：{{ rec.appCname }}</div>
      <div class="note">应用描述：{{ rec.note }}</div>
      <div class="viewid">对应的视图ID：{{ rec.viewId }}</div>
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
      title="OauthClientDetails编辑"
      lock-scroll="true"
      width="30%"
      draggable
      :before-close="handleClose"
    >
      <span>我是对话框</span>
      <div class="id">数据ID：{{ cacheState.curRec.id }}</div>
      <div class="clientid">应用英文标识;：{{ cacheState.curRec.clientId }}</div>
      <div class="resourceids">客户端资源ID;：{{ cacheState.curRec.resourceIds }}</div>
      <div class="clientsecret">客户端密码;：{{ cacheState.curRec.clientSecret }}</div>
      <div class="scope">作用域(也是权限);：{{ cacheState.curRec.scope }}</div>
      <div class="authorizedgranttypes"
        >授权模式(安全码、密码等);：{{ cacheState.curRec.authorizedGrantTypes }}</div
      >
      <div class="webserverredirecturi"
        >重定向地址;：{{ cacheState.curRec.webServerRedirectUri }}</div
      >
      <div class="authorities">申请Oauth服务器的权限;：{{ cacheState.curRec.authorities }}</div>
      <div class="accesstokenvalidity"
        >令牌过期时间;：{{ cacheState.curRec.accessTokenValidity }}</div
      >
      <div class="refreshtokenvalidity"
        >刷新令牌过期时间;：{{ cacheState.curRec.refreshTokenValidity }}</div
      >
      <div class="additionalinformation"
        >附件信息;：{{ cacheState.curRec.additionalInformation }}</div
      >
      <div class="createtime">创建时间;：{{ cacheState.curRec.createTime }}</div>
      <div class="archived">被归档(逻辑删除);：{{ cacheState.curRec.archived }}</div>
      <div class="trusted">可信的;：{{ cacheState.curRec.trusted }}</div>
      <div class="autoapprove">自动授权，无需用户点击;：{{ cacheState.curRec.autoapprove }}</div>
      <div class="copid">企业ID：{{ cacheState.curRec.copId }}</div>
      <div class="appcname">应用中文名：{{ cacheState.curRec.appCname }}</div>
      <div class="note">应用描述：{{ cacheState.curRec.note }}</div>
      <div class="viewid">对应的视图ID：{{ cacheState.curRec.viewId }}</div>
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
  import { OauthClientDetails } from '/@/api/model/genModel';
  import {
    queryOauthClientDetailss,
    deleteOauthClientDetails,
  } from '/@/api/gen/oauthclientdetails';
  import { BasicPageParams, Page } from '/@/api/model/baseModel';
  import { onBeforeMount, reactive } from 'vue';

  let show = true;
  let hidesp = true;
  let total = 0;
  let pagesize = 3;
  let currentpage = 0;
  let curlist: Page<OauthClientDetails> = {} as Page<OauthClientDetails>;
  let dialogVisible = false;
  let curRec = {} as OauthClientDetails;

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
    queryOauthClientDetailss(param).then((res) => {
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

  function onedit(rec: OauthClientDetails) {
    cacheState.curRec = rec;
    cacheState.dialogVisible = true;
  }
  function ondelete(rec: OauthClientDetails) {
    deleteOauthClientDetails(rec.id).then((res) => {
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
