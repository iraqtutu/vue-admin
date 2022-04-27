<template>
  <div class="wrapper">
    <div class="nodata" v-if="cacheState.total <= 0">
      <p>暂无数据</p>
    </div>
    <div class="item bg-white p-4 m-4" v-for="rec in cacheState.curlist.records" :key="rec.id">
      <div class="createtime">数据的创建时间;：{{ rec.createTime }}</div>
      <div class="tokenid">refresh_token的MD5;：{{ rec.tokenId }}</div>
      <div class="token">OAuth2RefreshToken.java对象序列化后的二进制数据;：{{ rec.token }}</div>
      <div class="authentication"
        >OAuth2Authentication.java对象序列化后的二进制数据;：{{ rec.authentication }}</div
      >
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
      title="OauthRefreshToken编辑"
      lock-scroll="true"
      width="30%"
      draggable
      :before-close="handleClose"
    >
      <span>我是对话框</span>
      <div class="createtime">数据的创建时间;：{{ cacheState.curRec.createTime }}</div>
      <div class="tokenid">refresh_token的MD5;：{{ cacheState.curRec.tokenId }}</div>
      <div class="token"
        >OAuth2RefreshToken.java对象序列化后的二进制数据;：{{ cacheState.curRec.token }}</div
      >
      <div class="authentication"
        >OAuth2Authentication.java对象序列化后的二进制数据;：{{
          cacheState.curRec.authentication
        }}</div
      >
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
  import { OauthRefreshToken } from '/@/api/model/genModel';
  import { queryOauthRefreshTokens, deleteOauthRefreshToken } from '/@/api/gen/oauthrefreshtoken';
  import { BasicPageParams, Page } from '/@/api/model/baseModel';
  import { onBeforeMount, reactive } from 'vue';

  let show = true;
  let hidesp = true;
  let total = 0;
  let pagesize = 3;
  let currentpage = 0;
  let curlist: Page<OauthRefreshToken> = {} as Page<OauthRefreshToken>;
  let dialogVisible = false;
  let curRec = {} as OauthRefreshToken;

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
    queryOauthRefreshTokens(param).then((res) => {
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

  function onedit(rec: OauthRefreshToken) {
    cacheState.curRec = rec;
    cacheState.dialogVisible = true;
  }
  function ondelete(rec: OauthRefreshToken) {
    deleteOauthRefreshToken(rec.id).then((res) => {
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
