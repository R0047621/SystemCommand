<template>
  <div class="w-[100%] bg-[#fff]">
    <div class="flex justify-between">
      <a-tabs class="ml-5 w-[100%]" v-model:activeKey="activeKey" @change="fn">
        <a-tab-pane key="1" tab="全部项目"></a-tab-pane>
        <a-tab-pane key="2" tab="我的收藏" force-render></a-tab-pane>
        <a-tab-pane key="3" tab="已归档项目"></a-tab-pane>
        <a-tab-pane key="4" tab="回收站"></a-tab-pane>
      </a-tabs>
      <a-button type="primary" class="mt-[17px] mr-[30px] w-[130px] h-[40px]"
        ><p class="flex items-center justify-center">
          <Icon icon="ion:add-outline" /><span>创建新项目</span>
        </p></a-button
      >
    </div>
    <div>
      <projectList1 v-if="activeKey === '1'" />
      <myCollectionView v-if="activeKey === '2'" />
      <archivedProjectsView v-if="activeKey === '3'" />
      <recycleBinView v-if="activeKey === '4'" />
    </div>
  </div>
</template>
<script setup lang="ts">
const activeKey = ref("1");
import projectList1 from "./projectList1.vue";
import myCollectionView from "./myCollectionView.vue";
import archivedProjectsView from "./archivedProjectsView.vue";
import recycleBinView from "./recycleBinView.vue";
// import router from "@/router";
import router from "@/router/index";

activeKey.value =
  useRoute().path.split("")[useRoute().path.lastIndexOf("/") + 1];

const fn = (activeKey: string) => {
  console.log(activeKey);
  router.push(`/projectManagement/ProjectLists/ProjectList/${activeKey}`);
};
</script>
