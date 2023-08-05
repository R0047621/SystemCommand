<template>
  <div>
    <ul class="m-auto mx-5">
      <li
        v-for="item in getdata?.data.rows"
        :key="item.id"
        class="h-[70.8px] border-b-2 flex justify-between items-center w-[100%]"
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
            </div>
            <div class="line-clamp-1 w-[80px] text-[#00000073] text-[14px]">
              {{ item.intro }}
            </div>
          </div>
        </div>

        <!-- 字体图标部分 -->
        <div class="w-[100px] flex items-center justify-between mt-3">
          <a-tooltip
            class="w-[27.6px] h-[27.6px] rounded-[50%] border flex items-center justify-center"
          >
            <div class="cursor-pointer">
              <Icon
                icon="icon-park-outline:application-menu"
                width="12px"
                color="#606266"
              />
            </div>
          </a-tooltip>
          <a-tooltip
            class="w-[27.6px] h-[27.6px] rounded-[50%] border flex items-center justify-center"
          >
            <div class="cursor-pointer">
              <Icon icon="tabler:pencil-minus" width="12px" color="#606266" />
            </div>
          </a-tooltip>
          <a-tooltip
            class="w-[27.6px] h-[27.6px] rounded-[50%] border flex items-center justify-center"
          >
            <div class="cursor-pointer">
              <Icon icon="icomoon-free:bin" width="12px" color="#606266" />
            </div>
          </a-tooltip>
        </div>
      </li>
    </ul>
  </div>
  <a-back-top :visibilityHeight="100" />
</template>

<script setup lang="ts">
import { getProjectTemplateData } from "@/service/index";

const { data: getdata } = useRequest(
  () =>
    getProjectTemplateData({
      is_custom: 1,
      limit: 1000,
      offset: 0,
    }),
  {
    // 请求成功时
    onSuccess: () => {
      console.log(getdata.value);
    },
  }
);
</script>
