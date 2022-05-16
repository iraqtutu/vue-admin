<template>
  <PageWrapper v-loading="cacheState.loading" loading-tip="加载中..." title="OauthAccessToken">
    <div class="nodata" v-if="cacheState.total === 0">
      <p>暂无数据</p>
    </div>
    <div class="item bg-white p-4 m-4" v-for="rec in cacheState.curlist.records" :key="rec.id">
      <div class="createtime">创建时间:{{ rec.createTime }}</div>
      <div class="tokenid">唯一标识:{{ rec.tokenId }}</div>
      <div class="token">token值:{{ rec.token }}</div>
      <div class="authenticationid">被授予token的用户is:{{ rec.authenticationId }}</div>
      <div class="username">用户名:{{ rec.userName }}</div>
      <div class="clientid">客户端id:{{ rec.clientId }}</div>
      <div class="authentication">授权数据:{{ rec.authentication }}</div>
      <div class="refreshtoken">Refresh Token:{{ rec.refreshToken }}</div>
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
      title="OauthAccessToken编辑"
      lock-scroll="true"
      width="30%"
      draggable
      :before-close="handleClose"
    >
      <span>我是对话框</span>
      <div class="createtime">创建时间:{{ cacheState.curRec.createTime }}</div>
      <div class="tokenid">唯一标识:{{ cacheState.curRec.tokenId }}</div>
      <div class="token">token值:{{ cacheState.curRec.token }}</div>
      <div class="authenticationid"
        >被授予token的用户is:{{ cacheState.curRec.authenticationId }}</div
      >
      <div class="username">用户名:{{ cacheState.curRec.userName }}</div>
      <div class="clientid">客户端id:{{ cacheState.curRec.clientId }}</div>
      <div class="authentication">授权数据:{{ cacheState.curRec.authentication }}</div>
      <div class="refreshtoken">Refresh Token:{{ cacheState.curRec.refreshToken }}</div>
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
  import { OauthAccessToken } from '/@/api/model/genModel';
  import { queryOauthAccessTokens, deleteOauthAccessToken } from '/@/api/gen/oauthaccesstoken';
  import { BasicPageParams, Page } from '/@/api/model/baseModel';
  import { onBeforeMount, reactive } from 'vue';

  const cacheState = reactive({
    loading: false,
    show: true,
    hidesp: true,
    total: -1,
    pagesize: 3,
    currentpage: 0,
    curlist: {} as Page<OauthAccessToken>,
    dialogVisible: false,
    curRec: {} as OauthAccessToken,
  });

  function handleCurrentChange(val: number) {
    cacheState.loading = true;
    cacheState.currentpage = val;
    const param: BasicPageParams = {
      page: cacheState.currentpage,
      pageSize: cacheState.pagesize,
    };
    queryOauthAccessTokens(param).then((res) => {
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

  function onedit(rec: OauthAccessToken) {
    cacheState.curRec = rec;
    cacheState.dialogVisible = true;
  }
  function ondelete(rec: OauthAccessToken) {
    deleteOauthAccessToken(rec.id).then((res) => {
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
