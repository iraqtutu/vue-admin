<template>
  <div class="wrapper">
    <div class="nodata" v-if="pagination.total <= 0">
      <p>暂无数据</p>
    </div>
    <div class="item" v-for="rec in pagination.curlist.records" :key="rec.id">
      <div class="id">企业唯一标识：{{ rec.id }}</div>
      <div class="copname">企业或机构名称：{{ rec.copName }}</div>
      <div class="logo">公司LOGO：{{ rec.logo }}</div>
      <div class="bizlicense">营业执照：{{ rec.bizLicense }}</div>
      <div class="linkman">联系人：{{ rec.linkMan }}</div>
      <div class="linkmanmobile">联系人电话：{{ rec.linkManMobile }}</div>
      <div class="address">联系地址：{{ rec.address }}</div>
      <div class="checked">是否核实：{{ rec.checked }}</div>
      <div class="checkuser">核实人员：{{ rec.checkUser }}</div>
      <div class="revision">乐观锁：{{ rec.revision }}</div>
      <div class="createdby">创建人：{{ rec.createdBy }}</div>
      <div class="creatormobile">创建人手机号：{{ rec.creatorMobile }}</div>
      <div class="createdtime">创建时间：{{ rec.createdTime }}</div>
      <div class="updatedby">更新人：{{ rec.updatedBy }}</div>
      <div class="updatedtime">更新时间：{{ rec.updatedTime }}</div>
      <div class="deleteflag">删除标识：{{ rec.deleteFlag }}</div>
      <div class="copdesc">企业描述：{{ rec.copDesc }}</div>
      <div class="status">申请结果(0未处理,1正常,2拒绝,3暂停)：{{ rec.status }}</div>
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
  import { Coperation } from '/@/api/model/genModel';
  import { queryCoperations, deleteCoperation } from '/@/api/gen/coperation';
  import { BasicPageParams, Page } from '/@/api/model/baseModel';
  import { onBeforeMount, reactive } from 'vue';

  let show = true;
  let hidesp = true;
  let total = 0;
  let pagesize = 3;
  let currentpage = 0;
  let curlist: Page<Coperation> = {} as Page<Coperation>;

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
    queryCoperations(param).then((res) => {
      pagination.curlist = res;
      pagination.currentpage = res.current;
      pagination.total = res.total;
    });
  }

  onBeforeMount(() => {
    handleCurrentChange(pagination.currentpage);
  });

  function onedit(rec: Coperation) {
    console.log(rec);
  }
  function ondelete(rec: Coperation) {
    deleteCoperation(rec.id).then((res) => {
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
