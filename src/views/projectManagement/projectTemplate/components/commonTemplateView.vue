<template>
  <div>
    <ul class="m-auto mx-5">
      <li
        v-for="item in getdata"
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
          </div>
        </div>
        <!-- 右边文字部分 -->
        <div class="flex items-center justify-between">
          <p
            v-for="(item1, index) in item.project_template_tasks"
            :key="item1.id"
            class="flex items-center justify-between text-[14px] text-[#00000073]"
          >
            {{ item1.name
            }}<Icon
              icon="ph:arrow-right-bold"
              v-if="index != item.project_template_tasks.length - 1"
            />
          </p>
        </div>
      </li>
    </ul>
  </div>
  <a-back-top :visibilityHeight="100" />
</template>
<script setup lang="ts">
import { getCommonTemplateData } from "@/service/index";

const { data: getdata } = useRequest(
  () =>
    getCommonTemplateData({
      is_custom: 0,
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
<style></style>
