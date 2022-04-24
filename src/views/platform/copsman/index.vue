<template>
  <div class="wrapper">
    <div class="item" v-for="cop in pagination.curlist.records" :key="cop.id">
      {{ cop.logo }}
      <div class="copname">名称：{{ cop.copName }}</div>
      <div class="address">地址：{{ cop.address }}</div>
      <div class="linkman">联系人：{{ cop.linkMan }}</div>
      <div class="mobile">联系电话：{{ cop.linkManMobile }}</div>
      <div class="status">状态：{{ cop.status }}</div>
      <div class="operate">
        <el-button type="primary" size="mini" @click="edit(cop)">编辑</el-button>
        <el-button type="danger" size="mini" @click="deleteCop(cop)">删除</el-button>
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
  import { Cop, CopPage } from '/@/api/platform/model/copModel';
  import { queryCops } from '/@/api/platform/cop';
  import { BasicPageParams } from '/@/api/model/baseModel';
  import { onBeforeMount, reactive } from 'vue';

  let show = true;
  let hidesp = true;
  let total = 0;
  let pagesize = 3;
  let currentpage = 0;
  let curlist: CopPage = {} as CopPage;

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
    queryCops(param).then((res) => {
      pagination.curlist = res;
      pagination.currentpage = res.current;
      pagination.total = res.total;
    });
  }

  onBeforeMount(() => {
    handleCurrentChange(pagination.currentpage);
  });

  function edit(cop: Cop) {
    console.log(cop);
  }
  function deleteCop(cop: Cop) {
    console.log(cop);
  }
</script>
