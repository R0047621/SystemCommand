<template>
  <div>
    <ul class="m-auto mx-5 h-[781.8px]">
      <li
        v-for="(item, index) in reverse"
        :key="item.id"
        class="h-[70.8px] border-b-2 flex items-center"
      >
        <div class="flex items-center w-[567px]">
          <img
            :src="`
http://192.168.122.36:1024${item.cover}`"
            alt=""
            class="w-[50px] h-[50px] rounded-[3px]"
            v-if="
              item.cover != '' &&
              item.cover !=
                'https://i.picsum.photos/id/399/290/160.jpg?hmac=3xULt6wNyF5o6cyMNb9Whr8XKjwrGAGKErAeJyDjKVQ'
            "
          />
          <Icon icon="jam:picture" v-else class="w-[50px]" />
          <div class="ml-3">
            <div class="flex items-center">
              <a
                class="text-[#1890ff] line-clamp-1 w-[80px] text-[14px] cursor-pointer"
                >{{ item.name }}</a
              >
              <div
                class="w-[45px] h-[32px] text-[#67c23a] bg-[#f0f9eb] text-center leading-[32px] rounded-[3px] ml-2 text-[12px]"
              >
                公开
              </div>
            </div>
            <div class="line-clamp-1 w-[80px] text-[#00000073] text-[14px]">
              {{ item.intro }}
            </div>
          </div>
        </div>

        <div class="mr-[50px] w-[120px]">
          <p class="text-[14px] text-[#00000073]">创建日期</p>
          <p class="text-[14px] text-[#00000073]">{{ time[index] }}</p>
        </div>

        <div class="mr-[32px] w-[120px]">
          <p class="text-[14px] text-[#00000073]">创建人</p>
          <p class="text-[14px] text-[#00000073]">
            {{ item.creator.username }}
          </p>
        </div>

        <div class="w-[200px] mt-2 mr-[87px]">
          <p class="text-[14px] text-[#00000073]">进度</p>
          <a-progress :percent="item.progress" size="small" />
        </div>

        <!-- 字体图标部分 -->
        <div class="w-[67px] flex items-center justify-between mt-3">
          <a-tooltip
            placement="top"
            class="w-[27.6px] h-[27.6px] rounded-[50%] border flex items-center justify-center"
          >
            <template #title>
              <span class="text-[12px]">从归档中恢复项目</span>
            </template>
            <div class="cursor-pointer">
              <Icon icon="ep:refresh-left" width="12px" color="#606266" />
            </div>
          </a-tooltip>
          <a-tooltip
            class="w-[27.6px] h-[27.6px] rounded-[50%] border flex items-center justify-center"
          >
            <template #title>
              <span class="text-[12px]">移至回收站</span>
            </template>
            <div class="cursor-pointer">
              <Icon icon="icomoon-free:bin" width="12px" color="#606266" />
            </div>
          </a-tooltip>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { getArchivedProjectsData } from "@/service/index";

const { data: getdata } = useRequest(
  () =>
    getArchivedProjectsData({
      collection: 0,
      is_archived: 1,
    }),
  {
    // 请求成功时
    onSuccess: () => {
      console.log(getdata.value);
    },
  }
);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const time: any = computed(() => {
  return getdata.value?.data.rows.map((item) => {
    return item.created_at.slice(0, 10);
  });
});
const reverse = computed(() => {
  return getdata.value?.data.rows.reverse();
});
</script>
