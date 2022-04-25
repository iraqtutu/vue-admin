<template>
  <div class="wrapper">
    <div class="nodata" v-if="pagination.total <= 0">
      <p>暂无数据</p>
    </div>
    <div class="item" v-for="rec in pagination.curlist.records" :key="rec.id">
      <div class="id">数据标识：{{ rec.id }}</div>
      <div class="copid">企业ID：{{ rec.copId }}</div>
      <div class="uuid">用户ID：{{ rec.uuid }}</div>
      <div class="username">登录名：{{ rec.username }}</div>
      <div class="nickname">用户昵称：{{ rec.nickname }}</div>
      <div class="realname">用户真实姓名：{{ rec.realname }}</div>
      <div class="password">密码：{{ rec.password }}</div>
      <div class="phone">电话：{{ rec.phone }}</div>
      <div class="email">邮件：{{ rec.email }}</div>
      <div class="idnum">身份证号：{{ rec.idnum }}</div>
      <div class="avatar">头像：{{ rec.avatar }}</div>
      <div class="idcarda">身份证正面：{{ rec.idcarda }}</div>
      <div class="idcardb">身份证反面：{{ rec.idcardb }}</div>
      <div class="note">个人描述：{{ rec.note }}</div>
      <div class="inneruser">是否平台内置用户：{{ rec.innerUser }}</div>
      <div class="lastlogintime">最后登录时间：{{ rec.lastLoginTime }}</div>
      <div class="version">版本-乐观锁：{{ rec.version }}</div>
      <div class="creatorid">创建者：{{ rec.creatorId }}</div>
      <div class="createtime">创建时间：{{ rec.createTime }}</div>
      <div class="updatedby">更新人：{{ rec.updatedBy }}</div>
      <div class="updatedtime">更新时间：{{ rec.updatedTime }}</div>
      <div class="archived">删除标记：{{ rec.archived }}</div>
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
  import { User } from '/@/api/model/genModel';
  import { queryUsers, deleteUser } from '/@/api/gen/user';
  import { BasicPageParams, Page } from '/@/api/model/baseModel';
  import { onBeforeMount, reactive } from 'vue';

  let show = true;
  let hidesp = true;
  let total = 0;
  let pagesize = 3;
  let currentpage = 0;
  let curlist: Page<User> = {} as Page<User>;

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
    queryUsers(param).then((res) => {
      pagination.curlist = res;
      pagination.currentpage = res.current;
      pagination.total = res.total;
    });
  }

  onBeforeMount(() => {
    handleCurrentChange(pagination.currentpage);
  });

  function onedit(rec: User) {
    console.log(rec);
  }
  function ondelete(rec: User) {
    deleteUser(rec.id).then((res) => {
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
