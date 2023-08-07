<template>
  <div>
    <!-- content -->
    <div
      v-for="item in filteredData"
      :key="item.id"
      class="bottom w-[100%] h-[70px] py-[10px] border-b-1 border-[#e8e8e8] flex"
    >
      <!-- 图片 -->
      <div class="w-[50px] h-[50px] rounded-[3px]">
        <a-image
          :width="50"
          :height="50"
          :preview="false"
          class="w-[50px] h-[50px] object-cover"
          :src="'http://192.168.122.36:1024' + item?.cover"
          fallback="data:image/png;base64,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"
        />
      </div>
      <!-- 图片结束 -->
      <!-- 项目名称介绍 -->
      <div class="flex ml-[10px] w-[36vw] flex-col">
        <!-- top -->
        <div>
          <span class="text-[#1890ff] cursor-pointer text-[14px]">{{
            item.name
          }}</span
          ><span
            v-if="item.is_private == 0"
            class="py-[8px] bg-[#f0f9eb] text-[#67c23a] h-[32px] px-[10px] border-[1px] border-[#e1f3d8] text-[12px]"
            style="margin-left: 10px"
            >公开</span
          >
        </div>
        <div class="leading-[25px] mt-[5px]">
          <p class="txt">{{ item.intro }}</p>
        </div>
      </div>
      <!-- 项目名称结束 -->
      <!-- 创建日期 -->
      <div class="txt w-[150px] flex flex-col">
        <div class="h-[25px]">创建日期</div>
        <div class="h-[25px]">{{ item.created_at.slice(0, 10) }}</div>
      </div>
      <!-- 创建日期结束 -->
      <!-- 创建人 -->
      <div class="txt w-[150px] flex flex-col">
        <div class="h-[25px]">创建人</div>
        <div class="h-[25px]">{{ item.creator.username }}</div>
      </div>
      <!-- 创建人结束 -->
      <!-- 进度条 -->
      <div class="w-[200px] flex flex-col">
        <div class="h-[25px] txt">进度</div>
        <div class="h-[25px]">
          <a-row class="w-[200px]">
            <a-col class="w-[150px]">
              <a-slider
                :dots="false"
                :tooltipOpen="false"
                v-model:value="item.progress"
                :min="0"
                :max="100"
                :step="1"
                class="w-[150px]"
              />
            </a-col>
            <a-col class="w-[50px] text-center leading-[25px]">
              <div>{{ Math.round(item.progress) + "%" }}</div>
            </a-col>
          </a-row>
        </div>
      </div>
      <!-- 进度条结束 -->
      <!-- 创建人 -->
      <div
        v-if="routeNum === 1 || routeNum === 2"
        class="txt w-[160px] flex items-center"
      >
        <a-tooltip class="cursor-pointer">
          <template #title>
            <p class="text-[12px]">项目成员</p>
          </template>
          <div
            class="p-[7px] rounded-[50%] border-[1px] border-[#DCDFE6] w-[27.6px] h-[27.6px]"
          >
            <Icon
              icon="radix-icons:person"
              class="text-[12px] text-[#606266]"
            />
          </div>
        </a-tooltip>
        <a-tooltip class="cursor-pointer">
          <template #title>
            <p class="text-[12px]">项目设置</p>
          </template>
          <div
            @click="toggle(item.id)"
            class="p-[7px] rounded-[50%] ml-[10px] border-[1px] border-[#DCDFE6] w-[27.6px] h-[27.6px]"
          >
            <Icon
              icon="icon-park-outline:setting-two"
              class="text-[12px] text-[#606266]"
            />
          </div>
        </a-tooltip>

        <a-tooltip class="cursor-pointer">
          <template #title
            ><p v-if="item.collector.length == 0" class="text-[12px]">
              加入收藏
            </p>
            <p v-else class="text-[12px]">取消收藏</p></template
          >
          <div
            @click="isCollection(item.id)"
            class="p-[7px] ml-[10px] rounded-[50%] border-[1px] border-[#DCDFE6] w-[27.6px] h-[27.6px]"
          >
            <Icon
              v-if="item.collector.length == 0"
              icon="ph:star"
              class="text-[12px] text-[#606266]"
            />
            <Icon
              v-else
              icon="tabler:star-filled"
              color="#ffaf38"
              class="text-[12px]"
            />
          </div>
        </a-tooltip>
        <a-tooltip class="cursor-pointer">
          <template #title>
            <p class="text-[12px]">移入回收站</p>
          </template>
          <div
            class="p-[7px] ml-[10px] rounded-[50%] border-[1px] border-[#DCDFE6] w-[27.6px] h-[27.6px]"
          >
            <Icon
              icon="icon-park-outline:delete"
              class="text-[12px] text-[#606266]"
            />
          </div>
        </a-tooltip>
      </div>
      <div
        v-if="routeNum == 3"
        class="txt w-[160px] flex items-center justify-end"
      >
        <a-tooltip class="cursor-pointer">
          <template #title>
            <p class="text-[12px]">从归档中恢复项目</p>
          </template>
          <div
            class="p-[7px] rounded-[50%] border-[1px] border-[#DCDFE6] w-[27.6px] h-[27.6px]"
          >
            <Icon
              icon="eva:refresh-outline"
              :horizontalFlip="true"
              class="text-[12px] text-[#606266]"
            />
          </div>
        </a-tooltip>
        <a-tooltip class="cursor-pointer">
          <template #title>
            <p class="text-[12px]">移入回收站</p>
          </template>
          <div
            class="p-[7px] ml-[10px] rounded-[50%] border-[1px] border-[#DCDFE6] w-[27.6px] h-[27.6px]"
          >
            <Icon
              icon="icon-park-outline:delete"
              class="text-[12px] text-[#606266]"
            />
          </div>
        </a-tooltip>
      </div>
      <div
        v-if="routeNum == 4"
        class="txt w-[160px] flex items-center justify-end"
      >
        <a-tooltip class="cursor-pointer">
          <template #title>
            <p class="text-[12px]">移入回收站</p>
          </template>
          <div
            class="p-[7px] ml-[10px] rounded-[50%] border-[1px] border-[#DCDFE6] w-[27.6px] h-[27.6px]"
          >
            <Icon
              icon="icon-park-outline:delete"
              class="text-[12px] text-[#606266]"
            />
          </div>
        </a-tooltip>
      </div>
      <!-- 创建人结束 -->
    </div>
    <a-pagination
      class="relative left-[40%] mt-[15px]"
      v-model:current="current"
      :total="ProjectsList?.length"
      :hideOnSinglePage="true"
      show-less-items
    />
    <projectSettings
      :open="open"
      @update="handleUpdate"
      :currentData="currentData"
    />
  </div>
</template>

<script lang="ts" setup>
let routeNum = ref(1);
const route = useRoute();

import { featProjectsList, feat_project_collects } from "@/service";

const arrAxios = [
  { collection: 0, is_recycle: 0 },
  { collection: 1, is_recycle: 0 },
  { collection: 0, is_archived: 1 },
  { collection: 0, is_recycle: 1 },
];

// 请求全部项目数据
watch([route], () => {
  // console.log(route.path);
  routeNum.value = Number(
    route.path.replace("/projectManagement/ProjectLists/ProjectList/", "")
  );
  console.log(routeNum.value);

  runFeatProjectsList();
  runFeatProjectsList();
});
const { data: ProjectsList, run: runFeatProjectsList } = useRequest(
  () =>
    featProjectsList(
      arrAxios[
        Number(
          route.path.replace("/projectManagement/ProjectLists/ProjectList/", "")
        ) - 1
      ]
    ),
  {
    manual: true,
  }
);
// 点击收藏
const Collection_ID = ref(0);

// 请求 收藏
const { run: runFeat_Project_Collects } = useRequest(
  () => feat_project_collects({ project_id: Collection_ID.value, user_id: 56 }),
  {
    manual: true,
  }
);

const isCollection = ref((index: number) => {
  Collection_ID.value = index;
  runFeat_Project_Collects();
  runFeatProjectsList();
  runFeatProjectsList();
});
runFeatProjectsList();

const current = ref(1);
const filteredData = computed(() => {
  const startIndex = (current.value - 1) * 10;
  const endIndex = startIndex + 10;
  const reversedData = ProjectsList.value?.slice().reverse();
  return reversedData?.slice(startIndex, endIndex);
});
const open = ref(false);
// 在监听回调中更新父组件的值
const handleUpdate = (isopen: boolean) => {
  open.value = isopen;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let currentData: any;
const toggle = ref((index: number) => {
  open.value = !open.value;
  if (ProjectsList.value) {
    for (let i = 0; i < ProjectsList.value?.length; i++) {
      if (ProjectsList.value[i].id == index) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-undef
        currentData = ProjectsList.value[i];
      }
    }
  }
  // console.log(currentData.value);
});
</script>
<style>
.txt {
  color: rgba(0, 0, 0, 0.45);
}
:where(.css-dev-only-do-not-override-eq3tly).ant-slider
  .ant-slider-handle::after {
  content: none;
  width: 0;
  height: 0;
  box-shadow: 0 0 0 0;
}
.bottom {
  border-bottom: 1px solid #e8e8e8;
}
.bottom :where(.css-dev-only-do-not-override-eq3tly).ant-image .ant-image-img {
  width: 50px;
  height: 50px;
  vertical-align: middle;
}
</style>
