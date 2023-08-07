<template>
  <div>
    <!-- 外层盒子 -->
    <div class="max-h-[100%] min-h-[100vh] p-[1.25rem]">
      <div class="w-[67.25rem] min-h-[calc(100vh-12rem)] m-auto bg-[#fff]">
        <!-- 上传文件头部 -->
        <div
          class="w-[100%] h-[3.75rem] flex justify-between items-center px-[1.25rem]"
        >
          <p>我的文件</p>
          <div class="relative">
            <a-button
              v-if="GroupMember"
              type="primary"
              ghost
              class="flex items-center"
            >
              <Icon icon="material-symbols:cloud-upload" />
              上传
            </a-button>
            <a-button
              v-else
              :disabled="true"
              type="primary"
              ghost
              class="flex items-center z-10"
            >
              <Icon icon="material-symbols:cloud-upload" />
              上传
            </a-button>
            <input
              @change="change"
              type="file"
              class="absolute opacity-0 top-0 left-0 w-[4.625rem] h-[2rem]"
            />
          </div>
        </div>
        <!-- 文字标识部分 -->
        <div
          class="flex justify-between items-center w-[100%] py-[.625rem] px-[1.25rem] border-b-[.0625rem] border-[#e5e5e5] text-[.875rem] text-[#8C8C8C]"
        >
          <p class="w-[62.5%]">名称</p>
          <p class="w-[8.5%]">大小</p>
          <p class="w-[12.5%]">创建日期</p>
          <p class="w-[9.5%]">创建人</p>
          <p class="w-[8.5%]"></p>
        </div>
        <!-- 文件部分 -->
        <div
          v-show="item.is_recycle === 0"
          v-for="item in dataFileCreate?.rows"
          :key="item.id"
          class="flex items-center w-[100%] h-[3.125rem] px-[1.25rem] text-[.875rem] text-[#8C8C8C]"
        >
          <div class="flex items-center w-[62.5%] text-[black]">
            <img
              :src="`http://192.168.122.36:1024${item.path}`"
              alt=""
              class="w-[2rem] h-[2rem] rounded-[.5rem] mr-[.625rem]"
            />
            <a
              :href="`http://192.168.122.36:1024${item.path}`"
              target="blank"
              class="hover:text-[#1b9aee]"
            >
              {{ item.title }}{{ item.extension }}
            </a>
          </div>
          <p class="w-[8.5%]">{{ formatSize(item.size) }}</p>
          <p class="w-[12.5%]">
            {{
              dayjs(item.updated_at).subtract(1, "day").format("M月D日 HH:mm")
            }}
          </p>
          <p class="w-[9.5%]">{{ uploadUsers[item.creator_id] }}</p>
          <div class="flex justify-between items-center w-[8.5%]">
            <Icon
              icon="clarity:download-line"
              class="text-[1rem] cursor-pointer"
              @click="downloadFile(item)"
            />
            <Icon
              icon="carbon:edit"
              class="ml-[.625rem] text-[1rem] cursor-pointer"
            />
            <a-dropdown
              placement="bottom"
              :arrow="{ pointAtCenter: true }"
              :trigger="['click']"
              class="cursor-pointer"
            >
              <a class="ant-dropdown-link" @click.prevent>
                <DownOutlined />
              </a>
              <template #overlay>
                <a-menu>
                  <a-menu-item @click="copyLinkToClipboard(item)">
                    <a href="javascript:;" class="dropDownItem">
                      <Icon icon="ci:link" class="mr-[.3125rem]" />
                      复制链接
                    </a>
                  </a-menu-item>
                  <a-menu-item v-if="GroupMember" @click="onDelete(item)">
                    <a href="javascript:;" class="dropDownItem">
                      <Icon icon="ph:trash-bold" class="mr-[.3125rem]" />
                      移到回收站
                    </a>
                  </a-menu-item>
                  <a-menu-item v-else @click="onDelete(item)" disabled>
                    <a href="javascript:;" class="dropDownItem">
                      <Icon icon="ph:trash-bold" class="mr-[.3125rem]" />
                      移到回收站
                    </a>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import dayjs from "dayjs";
import {
  UserInformation,
  UserFileName,
  FileCreate,
  UploadFile,
  ImgProjectFiles,
  deleteProjectFiles,
} from "@/service";
import { DownOutlined } from "@ant-design/icons-vue";
import { notification } from "ant-design-vue";
import saveAs from "file-saver";
const route = useRoute();

const uploadUsers = ref<{ [x: number]: string }>({});

// 获取用户信息
const { data: dataInformation } = useRequest(() => UserInformation(), {
  onSuccess() {
    runUserFileName();
  },
});
const GroupMember = ref(true);
// 获取用户项目数据
const { run: runUserFileName } = useRequest(
  () =>
    UserFileName({
      project_id: Number(route.params.id),
    }),
  {
    manual: true,
    onSuccess(data) {
      data.rows.map((item) => {
        uploadUsers.value[item.id] = item.username;
      });

      for (const item of data.rows) {
        GroupMember.value = dataInformation.value?.username === item.username;
        if (GroupMember.value) {
          return;
        }
      }
    },
  }
);

// 获取文件内部数据
const { data: dataFileCreate, run: runFileCreate } = useRequest(() =>
  FileCreate({
    project_id: Number(route.params.id),
    prop_order: "id",
    order: "desc",
  })
);

// 计算内存函数
function formatSize(size: number) {
  if (size < 1024) {
    return size + " b";
  } else if (size < 1024 * 1024) {
    return (size / 1024).toFixed(2) + " Kb";
  } else if (size < 1024 * 1024 * 1024) {
    return (size / (1024 * 1024)).toFixed(2) + " Mb";
  } else {
    return (size / (1024 * 1024 * 1024)).toFixed(2) + " Gb";
  }
}

// 上传文件数据请求
function change(e: Event) {
  const fd = new FormData();
  const files = (e.target as HTMLInputElement).files;
  if (files?.["0"]) {
    fd.append("file", files[0]);
  }
  UploadFile(fd).then((res) => {
    let dataUrl: IdataUrl;
    dataUrl = res;
    dataUrl.creator_id = dataInformation.value?.id;
    dataUrl.project_id = Number(route.params.id);
    dataUrl.title = res.filename.replace(res.extension, "");
    ImgProjectFiles(dataUrl).then(() => {
      runFileCreate();
    });
    notification.open({
      type: "success",
      placement: "bottomLeft",
      message: `图片上传成功`,
    });
  });
}

// 下载文件
function downloadFile(item) {
  // 假设您有一个文件的 Blob 数据或者 URL
  const fileImg = "http://192.168.122.36:1024" + item.path;
  const fileName = item.filename;

  // 使用 Fetch API 获取文件数据（注意：这里使用的是 async/await 语法）
  fetch(fileImg)
    .then((response) => response.blob()) // 获取文件的 Blob 数据
    .then((fileBlob) => {
      // 将数据保存为文件并触发下载
      saveAs(fileBlob, fileName);
    })
    .catch((error) => {
      console.error("下载文件失败:", error);
    });
}

// 点击复制链接
function copyLinkToClipboard(item) {
  const link = "http://192.168.122.36:1024" + item.path;
  const textArea = document.createElement("textarea");
  textArea.value = link;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
  notification.open({
    type: "success",
    placement: "bottomLeft",
    message: `链接复制成功`,
  });
}

// 请求 删除文件数据
const { run: runDeleteProjectFiles } = useRequest(
  (obj) => deleteProjectFiles(obj),
  {
    manual: true,
    onSuccess() {
      runFileCreate();
    },
  }
);

// 函数 点击删除文件数据
function onDelete(item) {
  const { deleted_at, task_id, ...item2 } = item;
  item2["is_recycle"] = 1;
  item2["onEdit"] = false;
  item2["_title"] = item2["title"];
  runDeleteProjectFiles(item2);
}
</script>
<style>
.uploadButton:hover {
  color: #409eff;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}

.dropDownItem {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
