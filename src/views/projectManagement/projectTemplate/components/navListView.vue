<template>
  <div class="w-[100%] bg-[#fff]">
    <div class="flex justify-between">
      <a-tabs class="ml-5 w-[100%]" v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="自定义模板"></a-tab-pane>
        <a-tab-pane key="2" tab="公共模板" force-render></a-tab-pane>
      </a-tabs>
      <a-button type="primary" class="mt-[17px] mr-[30px] w-[130px] h-[40px]"
        ><p class="flex items-center justify-center">
          <Icon icon="ion:add-outline" /><span>创建新项目</span>
        </p></a-button
      >
    </div>
    <div>
      <customTemplateView v-if="activeKey === '1'" />
      <commonTemplateView v-if="activeKey === '2'" />
    </div>
  </div>
</template>
<script setup lang="ts">
import customTemplateView from "./customTemplateView.vue";
import commonTemplateView from "./commonTemplateView.vue";
const activeKey = ref("1");
</script>
