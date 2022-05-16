<template>
  <PageWrapper v-loading="cacheState.loading" loading-tip="加载中..." title="User">
    <div class="nodata" v-if="cacheState.total === 0">
      <p>暂无数据</p>
    </div>
    <div class="item bg-white p-4 m-4" v-for="rec in cacheState.curlist.records" :key="rec.id">
      <div class="uuid">用户标识:{{ rec.uuid }}</div>
      <div class="createtime">创建时间:{{ rec.createTime }}</div>
      <div class="archived">删除标记:{{ rec.archived }}</div>
      <div class="version">版本-乐观锁:{{ rec.version }}</div>
      <div class="username">用户名:{{ rec.username }}</div>
      <div class="nickname">用户昵称:{{ rec.nickname }}</div>
      <div class="realname">用户真实姓名:{{ rec.realname }}</div>
      <div class="password">密码:{{ rec.password }}</div>
      <div class="phone">电话:{{ rec.phone }}</div>
      <div class="email">邮件:{{ rec.email }}</div>
      <div class="idnum">身份证号:{{ rec.idnum }}</div>
      <div class="avatar">头像:{{ rec.avatar }}</div>
      <div class="idcarda">身份证正面:{{ rec.idcarda }}</div>
      <div class="idcardb">身份证反面:{{ rec.idcardb }}</div>
      <div class="note">个人描述:{{ rec.note }}</div>
      <div class="defaultuser">是否内置用户:{{ rec.defaultUser }}</div>
      <div class="lastlogintime">最后登录时间:{{ rec.lastLoginTime }}</div>
      <div class="creatorid">创建者:{{ rec.creatorId }}</div>
      <div class="signature">个性签名:{{ rec.signature }}</div>
      <div class="introduction">自我介绍:{{ rec.introduction }}</div>
      <div class="address">地址:{{ rec.address }}</div>
      <div class="copid">对应企业ID:{{ rec.copId }}</div>
      <div class="locked">账号是否被锁定:{{ rec.locked }}</div>
      <div class="accountexpiredtime">账号过期时间:{{ rec.accountExpiredTime }}</div>
      <div class="pwdexpiredtime">密码过期时间:{{ rec.pwdExpiredTime }}</div>
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
      title="User编辑"
      lock-scroll="true"
      width="30%"
      draggable
      :before-close="handleClose"
    >
      <span>我是对话框</span>
      <div class="uuid">用户标识:{{ cacheState.curRec.uuid }}</div>
      <div class="createtime">创建时间:{{ cacheState.curRec.createTime }}</div>
      <div class="archived">删除标记:{{ cacheState.curRec.archived }}</div>
      <div class="version">版本-乐观锁:{{ cacheState.curRec.version }}</div>
      <div class="username">用户名:{{ cacheState.curRec.username }}</div>
      <div class="nickname">用户昵称:{{ cacheState.curRec.nickname }}</div>
      <div class="realname">用户真实姓名:{{ cacheState.curRec.realname }}</div>
      <div class="password">密码:{{ cacheState.curRec.password }}</div>
      <div class="phone">电话:{{ cacheState.curRec.phone }}</div>
      <div class="email">邮件:{{ cacheState.curRec.email }}</div>
      <div class="idnum">身份证号:{{ cacheState.curRec.idnum }}</div>
      <div class="avatar">头像:{{ cacheState.curRec.avatar }}</div>
      <div class="idcarda">身份证正面:{{ cacheState.curRec.idcarda }}</div>
      <div class="idcardb">身份证反面:{{ cacheState.curRec.idcardb }}</div>
      <div class="note">个人描述:{{ cacheState.curRec.note }}</div>
      <div class="defaultuser">是否内置用户:{{ cacheState.curRec.defaultUser }}</div>
      <div class="lastlogintime">最后登录时间:{{ cacheState.curRec.lastLoginTime }}</div>
      <div class="creatorid">创建者:{{ cacheState.curRec.creatorId }}</div>
      <div class="signature">个性签名:{{ cacheState.curRec.signature }}</div>
      <div class="introduction">自我介绍:{{ cacheState.curRec.introduction }}</div>
      <div class="address">地址:{{ cacheState.curRec.address }}</div>
      <div class="copid">对应企业ID:{{ cacheState.curRec.copId }}</div>
      <div class="locked">账号是否被锁定:{{ cacheState.curRec.locked }}</div>
      <div class="accountexpiredtime">账号过期时间:{{ cacheState.curRec.accountExpiredTime }}</div>
      <div class="pwdexpiredtime">密码过期时间:{{ cacheState.curRec.pwdExpiredTime }}</div>
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
  import { User } from '/@/api/model/genModel';
  import { queryUsers, deleteUser } from '/@/api/gen/user';
  import { BasicPageParams, Page } from '/@/api/model/baseModel';
  import { onBeforeMount, reactive } from 'vue';

  const cacheState = reactive({
    loading: false,
    show: true,
    hidesp: true,
    total: -1,
    pagesize: 3,
    currentpage: 0,
    curlist: {} as Page<User>,
    dialogVisible: false,
    curRec: {} as User,
  });

  function handleCurrentChange(val: number) {
    cacheState.loading = true;
    cacheState.currentpage = val;
    const param: BasicPageParams = {
      page: cacheState.currentpage,
      pageSize: cacheState.pagesize,
    };
    queryUsers(param).then((res) => {
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

  function onedit(rec: User) {
    cacheState.curRec = rec;
    cacheState.dialogVisible = true;
  }
  function ondelete(rec: User) {
    deleteUser(rec.id).then((res) => {
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
