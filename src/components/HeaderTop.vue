<template>
  <header
    style="box-shadow: 0 0 10px #ccc"
    class="w-[100%] flex h-[65px] bg-white fixed top-[0] left-[0] z-[9] justify-between px-[24px]"
  >
    <div class="flex">
      <!-- 图标logo -->
      <div class="flex items-center w-[265px] pl-[30px]">
        <svg data-v-74f95c37="" width="36" height="36" fill="none">
          <path
            data-v-74f95c37=""
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 31.5c11.375 0 19.5-9.035 19.5-19.787H24c0 6.892-5.045 12.284-12 12.284V31.5z"
            fill="#16D2AC"
          ></path>
          <path
            data-v-74f95c37=""
            d="M4.5 4.5H12v19.508H4.5V4.5z"
            fill="#165DFF"
          ></path>
          <path
            data-v-74f95c37=""
            d="M24 4.5v7.503H4.5V4.5H24zM31.5 4.5v7.503H24V4.5h7.5z"
            fill="#165DFF"
          ></path>
        </svg>
        <span class="text-[26px] ml-[6px]">Arco</span>
      </div>
      <!-- 中间图标 -->
      <a-tabs v-model:activeKey="activeKey" style="height: 65px">
        <a-tab-pane key="1">
          <template #tab
            ><span class="flex justify-center items-center text-[14px]"
              ><Icon
                icon="icon-park-outline:new-computer"
                class="mr-[5px]"
              />工作台</span
            ></template
          ></a-tab-pane
        >
        <a-tab-pane key="2" force-render>
          <template #tab
            ><span
              class="flex justify-center items-center text-[14px]"
              @click="
                $router.push('/projectManagement/ProjectLists/ProjectList/1')
              "
              ><Icon icon="solar:chart-bold" />项目</span
            ></template
          >
        </a-tab-pane>
        <a-tab-pane key="3">
          <template #tab
            ><span class="flex justify-center items-center text-[14px]"
              ><Icon
                icon="icon-park-outline:new-computer"
                class="mr-[5px]"
              />部门</span
            ></template
          ></a-tab-pane
        >
      </a-tabs>
    </div>
    <!-- 右边头像信息 -->
    <div class="flex items-center justify-center pr-[30px]">
      <a-button
        type="text"
        class="flex items-center justify-center w-[70px] h-[65px] relative"
        ><Icon icon="ri:group-line" class="text-[20px]" /><a-badge
          class="absolute top-[13px] right-[9px]"
          count="2"
          :number-style="{
            backgroundColor: '#409EFF',
            color: '#fff',
          }"
      /></a-button>

      <!-- 消息 -->
      <a-popover
        placement="bottom"
        class="flex items-center justify-center w-[70px] h-[65px]"
      >
        <template #content>
          <a-card
            style="width: 100%"
            :tab-list="tabListNoTitle"
            :active-tab-key="noTitleKey"
            @tabChange="(key: string) => onTabChange(key, 'noTitleKey')"
          >
            <p
              v-if="noTitleKey === '@我'"
              class="flex flex-col items-center justify-center"
            >
              <Icon
                icon="ant-design:message-outlined"
                class="text-[30px] text-[#ccc]"
              /><span class="mt-[7px]">你已查看所有@我</span>
            </p>
            <p
              v-else-if="noTitleKey === '通知'"
              class="flex flex-col items-center justify-center"
            >
              <Icon icon="mingcute:horn-fill" class="text-[30px] text-[#ccc]" />
              <span class="mt-[7px]">你已查看所有通知</span>
            </p>
            <p v-else class="flex flex-col items-center justify-center">
              <Icon
                icon="octicon:read-24"
                class="text-[30px] text-[#ccc]"
              /><span class="mt-[7px]">你已查看所有私信</span>
            </p>
          </a-card>
        </template>
        <a-button type="text"
          ><Icon icon="mdi-light:bell" class="text-[25px]"
        /></a-button>
      </a-popover>
      <!-- 用户信息 -->
      <a-popover
        class="flex items-center justify-center w-[70px] h-[65px] ml-[6px]"
      >
        <template #content>
          <a-menu
            v-model:openKeys="openKeys"
            v-model:selectedKeys="selectedKeys"
            style="width: 140px"
            mode="vertical"
            :items="items"
            @click="handleClick"
          />
        </template>
        <a-button type="text"
          ><img
            class="rounded-[50%] w-[32px] h-[32px] mr-[9px]"
            src="	https://fastly.picsum.photos/id/800/100/100.jpg?hmac=1ZFk6tFMaH90_tNhZgiL5zsGttEKB4cKQCUXQKDm6kc"
          />
          <span class="text-[14px]">WeiJin</span></a-button
        >
      </a-popover>
    </div>
  </header>
</template>
<script lang="ts" setup>
import { PoweroffOutlined, SettingOutlined } from "@ant-design/icons-vue";
import type { MenuProps } from "ant-design-vue";
const activeKey = ref("1");
const selectedKeys = ref([]);
const openKeys = ref([]);
const tabListNoTitle = [
  {
    key: "@我",
    tab: "@我",
  },
  {
    key: "通知",
    tab: "通知",
  },
  {
    key: "私信",
    tab: "私信",
  },
];
const items = ref([
  {
    key: "1",
    icon: () => h(SettingOutlined),
    label: "个人设置",
    title: "个人设置",
  },
  {
    key: "2",
    icon: () => h(PoweroffOutlined),
    label: "退出登录",
    title: "退出登录",
  },
]);
const key = ref("tab1");
const noTitleKey = ref("app");
const onTabChange = (value: string, type: string) => {
  console.log(value, type);
  if (type === "key") {
    key.value = value;
  } else if (type === "noTitleKey") {
    noTitleKey.value = value;
  }
};
const handleClick: MenuProps["onClick"] = (menuInfo) => {
  console.log("click ", menuInfo);
};
</script>
<style>
.ant-tabs-tab {
  height: 65px;
  margin-right: 32px !important;
}
</style>
