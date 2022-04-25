<template>
  <div class="wrapper">
    <div class="nodata" v-if="pagination.total <= 0">
      <p>暂无数据</p>
    </div>
    <div class="item" v-for="rec in pagination.curlist.records" :key="rec.id">
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
    queryOauthClientDetailss(param).then((res) => {
      pagination.curlist = res;
      pagination.currentpage = res.current;
      pagination.total = res.total;
    });
  }

  onBeforeMount(() => {
    handleCurrentChange(pagination.currentpage);
  });

  function onedit(rec: OauthClientDetails) {
    console.log(rec);
  }
  function ondelete(rec: OauthClientDetails) {
    deleteOauthClientDetails(rec.id).then((res) => {
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
