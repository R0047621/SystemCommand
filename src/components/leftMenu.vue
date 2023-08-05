<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider
      v-model:collapsed="collapsed"
      collapsible
      class="mt-[75px]"
      width="170px"
    >
      <div class="logo" />
      <a-menu
        v-model:selectedKeys="selectedKeys"
        v-model:openKeys="state.openKeys"
        theme="light"
        mode="inline"
        :inline-collapsed="state.collapsed"
      >
        <a-sub-menu key="sub1">
          <template #title>
            <span>
              <unordered-list-outlined />
              <span>项目列表</span>
            </span>
          </template>
          <a-menu-item key="1">
            <div class="flex items-center">
              <Icon icon="iwwa:menu" width="20px" />
              <span
                class="ml-2"
                @click="
                  router.push('/projectManagement/ProjectLists/ProjectList/1')
                "
                >全部项目</span
              >
            </div>
          </a-menu-item>
          <a-menu-item key="2">
            <div class="flex items-center">
              <Icon icon="ph:star-light" width="20px" />
              <span
                class="ml-2"
                @click="
                  router.push('/projectManagement/ProjectLists/ProjectList/2')
                "
                >我的收藏</span
              >
            </div>
          </a-menu-item>
          <a-menu-item key="3">
            <div class="flex items-center">
              <Icon icon="icon-park-twotone:handbag" width="20px" />
              <span
                class="ml-2"
                @click="
                  router.push('/projectManagement/ProjectLists/ProjectList/3')
                "
                >已归档项目</span
              >
            </div>
          </a-menu-item>
          <a-menu-item key="4">
            <div class="flex items-center">
              <Icon icon="mdi:trash-can-outline" width="20px" />
              <span
                class="ml-2"
                @click="
                  router.push('/projectManagement/ProjectLists/ProjectList/4')
                "
                >回收站</span
              >
            </div>
          </a-menu-item>
        </a-sub-menu>
        <a-menu-item key="5">
          <book-outlined />
          <span @click="$router.push('/projectManagement/ProjectTemplate')"
            >项目模板</span
          >
        </a-menu-item>
        <a-sub-menu key="sub2">
          <template #title>
            <span>
              <bell-outlined />
              <span>消息提醒</span>
            </span>
          </template>
          <a-menu-item key="6">
            <div class="flex items-center">
              <Icon icon="ant-design:message-outlined" width="20px" />
              <span
                class="ml-2"
                @click="router.push('/projectManagement/message/mention')"
                >@我</span
              >
            </div>
          </a-menu-item>
          <a-menu-item key="7">
            <div class="flex items-center">
              <Icon icon="basil:bullhorn-outline" width="20px" />
              <span
                class="ml-2"
                @click="router.push('/projectManagement/message/inform')"
                >通知</span
              >
            </div>
          </a-menu-item>
          <a-menu-item key="8">
            <div class="flex items-center">
              <Icon icon="ph:envelope-open" width="20px" />
              <span
                class="ml-2"
                @click="$router.push('/projectManagement/message/personal')"
                >私信</span
              >
            </div>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-content style="margin: 85px 16px 0 16px">
        <div
          :style="{
            padding: '24px',
            background: '#fff',
            minHeight: '360px',
          }"
        >
          <menuList
            v-if="
              selectedKeys.includes('1') ||
              selectedKeys.includes('2') ||
              selectedKeys.includes('3') ||
              selectedKeys.includes('4')
            "
          />
          <navListView v-if="selectedKeys.includes('5')" />
          <mention v-if="selectedKeys.includes('6')" />
          <inform v-if="selectedKeys.includes('7')" />
          <personal v-if="selectedKeys.includes('8')" />
          <menuList
            v-if!="
              selectedKeys.includes('5') &&
              selectedKeys.includes('6') &&
              selectedKeys.includes('7') &&
              selectedKeys.includes('8')
            "
          />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import menuList from "@/views/projectManagement/projectList/components/menuList.vue";
import navListView from "@/views/projectManagement/projectTemplate/components/navListView.vue";
import mention from "@/views/projectManagement/message/components/mention.vue";
import inform from "@/views/projectManagement/message/components/inform.vue";
import personal from "@/views/projectManagement/message/components/personal.vue";
import {
  UnorderedListOutlined,
  BellOutlined,
  BookOutlined,
} from "@ant-design/icons-vue";
import { ref } from "vue";
import router from "@/router/index";
const selectedKeys = ref<string[]>(["1"]);
const state = reactive({
  collapsed: false,
  openKeys: ["sub1", "sub2"],
});
selectedKeys.value = [
  useRoute().path.split("")[useRoute().path.lastIndexOf("/") + 1],
];
const collapsed = ref<boolean>(false);
</script>
<style scoped>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}
</style>
<style>
.ant-layout-sider-children {
  background: #fff !important;
  position: fixed;
}
.ant-layout .ant-layout-sider-has-trigger {
  background: #fff;
}
</style>
