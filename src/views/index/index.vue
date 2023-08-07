<template>
  <div>
    <!-- 外层盒子 -->
    <div class="max-h-[100%] min-h-[100vh] bg-[#F5F5F5] p-[18px]">
      <!-- 头部 -->
      <div
        class="w-[100%] h-[120px] bg-[#fff] flex items-center px-[30px] mb-[20px] justify-between"
      >
        <!-- 用户头像、用户名及问候语 -->
        <div class="flex h-[64px]">
          <img
            :src="dataInformation?.avatar"
            alt=""
            class="w-[64px] h-[64px] rounded-[50%] mr-[20px]"
          />
          <div class="flex flex-col justify-between">
            <p class="text-[20px]">
              {{ getDayPeriod() }}好，{{
                dataInformation?.username
              }}，祝你开心每一天！
            </p>
            <p class="text-[14px] text-[#8C8C8C]">
              {{ dataInformation?.roles[0].name }}
            </p>
          </div>
        </div>
        <!-- 项目数量 -->
        <div class="flex flex-col items-center">
          <p class="text-[14px] text-[#8C8C8C]">项目总数</p>
          <p class="text-[30px]">{{ data?.length }}</p>
        </div>
      </div>
      <div class="flex justify-between w-[100%]">
        <!-- 项目盒子 -->
        <div class="flex flex-col w-[66%] bg-[#fff]">
          <div
            class="flex justify-between items-center w-[100%] h-[60px] px-[20px] border-b-[1px] border-color-[#e8e8e8]"
          >
            <p class="text-[16px]">进行中的项目</p>
            <a-button type="link">全部项目</a-button>
          </div>
          <!-- 项目块儿 -->
          <div class="flex flex-wrap w-[100%] min-h-[500px]">
            <!-- 进行中的项目 -->
            <div
              v-for="item in dataProject"
              :key="item.id"
              class="flex flex-col justify-between border-r-[1px] border-b-[1px] border-color-[#e8e8e8] p-[10px] w-[25%] h-[273px] relative overflow-hidden item-box"
            >
              <div class="public-tip">公开</div>
              <img
                class="w-[100%] h-[150px]"
                :src="`http://192.168.122.36:1024${item.cover}`"
                alt=""
              />
              <p class="text-[14px] truncate">{{ item.name }}</p>
              <p class="text-[14px] text-zinc-300 truncate">
                {{ item.intro ? item.intro : "暂无介绍" }}
              </p>
              <a-progress
                :percent="item.progress"
                :size="[100, 2]"
                :show-info="false"
              />
              <div class="flex justify-between">
                <p class="w-[65px] text-[14px] text-zinc-300 truncate">
                  {{ item.creator.username }}
                </p>
                <p class="text-[14px] text-zinc-300 mt-[5px]">
                  {{ item.updated_at.slice(5, 16) }}
                </p>
              </div>
            </div>
          </div>
          <!-- 分页 -->
          <div
            class="flex justify-center mt-[15px] mb-[20px] py-[2px] px-[5px]"
          >
            <a-pagination
              v-model:current="current"
              v-model:page-size="pageSize"
              :total="total"
              :pageSizeOption="['2', '5', '8', '10']"
              show-less-items
            />
          </div>
        </div>
        <!-- 我的任务 -->
        <div class="w-[33%] h-[690px] bg-[#fff]">
          <div
            class="flex justify-between items-center w-[100%] h-[60px] px-[20px] border-b-[1px] border-color-[#e8e8e8]"
          >
            <p class="text-[16px]">
              我的任务 -
              {{ dataAssignment?.count }}
            </p>
            <div>
              <a-space>
                <a-select
                  ref="select"
                  v-model:value="selectOptions"
                  style="width: 120px"
                >
                  <a-select-option :value="0">未完成</a-select-option>
                  <a-select-option :value="1">已完成</a-select-option>
                </a-select>
              </a-space>
            </div>
          </div>
          <!-- 标签选择页 -->
          <div class="px-[20px]">
            <a-tabs v-model:activeKey="activeTabKey">
              <!-- 我执行的 -->
              <a-tab-pane key="executor_ids">
                <template #tab>
                  <span class="flex items-center">
                    <Icon icon="uiw:menu" class="mr-[10px]" />
                    我执行的
                  </span>
                </template>
                <div
                  v-if="dataAssignment?.count === 0"
                  class="flex flex-col justify-center items-center w-[100%] h-[500px] px-[20px]"
                >
                  <img
                    class="w-[160px] h-[160px]"
                    src="http://192.168.122.36:1024/static/img/empty.0bf7a80e.png"
                    alt=""
                  />
                  <p class="text-[16px] text-zinc-300 pl-[32px]">空空如也~~</p>
                </div>
                <div
                  v-for="item in dataAssignment?.rows"
                  :key="item.id"
                  class="flex justify-between items-center h-[40px] border-b-[1px] border-color-[#e8e8e8]"
                >
                  <div>
                    <a-tag v-show="item.task_priority_id === 5" color="error"
                      >非常紧急</a-tag
                    >
                    <a-tag v-show="item.task_priority_id === 4" color="warning"
                      >紧急</a-tag
                    >
                    <a-tag
                      v-show="item.task_priority_id === 2"
                      color="processing"
                      >普通</a-tag
                    >
                  </div>
                  <p
                    class="flex-1 px-[10px] text-[14px] text-[#1b9aee] cursor-pointer truncate"
                  >
                    {{ item.name }}
                  </p>
                  <p
                    class="w-[100px] text-[14px] text-zinc-300 hover:text-[#1b9aee] cursor-pointer truncate"
                  >
                    {{ item.project.name }}
                  </p>
                </div>
              </a-tab-pane>
              <!-- 我参与的 -->
              <a-tab-pane key="participator_id">
                <template #tab>
                  <span class="flex items-center">
                    <Icon icon="ph:users" class="mr-[10px]" />
                    我参与的
                  </span>
                </template>
                <div
                  v-if="dataAssignment?.count === 0"
                  class="flex flex-col justify-center items-center w-[100%] h-[500px] px-[20px]"
                >
                  <img
                    class="w-[160px] h-[160px]"
                    src="http://192.168.122.36:1024/static/img/empty.0bf7a80e.png"
                    alt=""
                  />
                  <p class="text-[16px] text-zinc-300 pl-[32px]">空空如也~~</p>
                </div>
                <div
                  v-for="item in dataAssignment?.rows"
                  :key="item.id"
                  class="flex justify-between items-center h-[40px] border-b-[1px] border-color-[#e8e8e8]"
                >
                  <div>
                    <a-tag v-show="item.task_priority_id === 5" color="error"
                      >非常紧急</a-tag
                    >
                    <a-tag v-show="item.task_priority_id === 4" color="warning"
                      >紧急</a-tag
                    >
                    <a-tag
                      v-show="item.task_priority_id === 2"
                      color="processing"
                      >普通</a-tag
                    >
                  </div>
                  <p
                    class="flex-1 px-[10px] text-[14px] text-[#1b9aee] cursor-pointer truncate"
                  >
                    {{ item.name }}
                  </p>
                  <p
                    class="w-[100px] text-[14px] text-zinc-300 hover:text-[#1b9aee] cursor-pointer truncate"
                  >
                    {{ item.project.name }}
                  </p>
                </div>
              </a-tab-pane>
              <!-- 我创建的 -->
              <a-tab-pane key="creator_id">
                <template #tab>
                  <span class="flex items-center">
                    <Icon icon="gg:add" class="mr-[10px]" />
                    我创建的
                  </span>
                </template>
                <div
                  v-if="dataAssignment?.count === 0"
                  class="flex flex-col justify-center items-center w-[100%] h-[500px] px-[20px]"
                >
                  <img
                    class="w-[160px] h-[160px]"
                    src="http://192.168.122.36:1024/static/img/empty.0bf7a80e.png"
                    alt=""
                  />
                  <p class="text-[16px] text-zinc-300 pl-[32px]">空空如也~~</p>
                </div>
                <div
                  v-for="item in dataAssignment?.rows"
                  :key="item.id"
                  class="flex justify-between items-center h-[40px] border-b-[1px] border-color-[#e8e8e8]"
                >
                  <div>
                    <a-tag v-show="item.task_priority_id === 5" color="error"
                      >非常紧急</a-tag
                    >
                    <a-tag v-show="item.task_priority_id === 4" color="warning"
                      >紧急</a-tag
                    >
                    <a-tag
                      v-show="item.task_priority_id === 2"
                      color="processing"
                      >普通</a-tag
                    >
                  </div>
                  <p
                    class="flex-1 px-[10px] text-[14px] text-[#1b9aee] cursor-pointer truncate"
                  >
                    {{ item.name }}
                  </p>
                  <p
                    class="w-[100px] text-[14px] text-zinc-300 hover:text-[#1b9aee] cursor-pointer truncate"
                  >
                    {{ item.project.name }}
                  </p>
                </div>
              </a-tab-pane>
            </a-tabs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { UserInformation, ProjectNumber, MyAssignment } from "@/service";
import usePagination from "@/hooks/usePagination";
// 获取用户信息
const { data: dataInformation } = useRequest(() => UserInformation(), {
  onSuccess() {
    runAssignment();
  },
});

// 获取项目数量
const { data } = useRequest(() =>
  ProjectNumber({ is_recycle: 0, is_archived: 0, is_private: 0 })
);
const {
  data: dataProject,
  total,
  pageSize,
  current,
} = usePagination(data, ref(12));

let selectOptions = ref(0); // 切换完成情况
let activeTabKey = ref("executor_ids"); // 切换方式

// 获取我的任务数据
const { data: dataAssignment, run: runAssignment } = useRequest(
  () =>
    MyAssignment({
      limit: 10, // 每页条数
      is_recycle: 0, //放进回收站的项目数据不渲染在页面
      is_done: selectOptions.value, // 任务完成情况
      [activeTabKey.value]: dataInformation?.value?.id, //根据用户id来渲染该项目数据
      // eslint-disable-next-line no-undef
    } as TMyAssignmentParams),
  {
    manual: true,
  }
);

watch([selectOptions, activeTabKey], () => {
  runAssignment(); // 监听任务完成情况和查询方式变化，并重新请求数据
});

// 计算问候语时间
function getDayPeriod() {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  if (currentHour >= 0 && currentHour < 12) {
    return "上午";
  } else if (currentHour >= 12 && currentHour < 18) {
    return "下午";
  } else {
    return "晚上";
  }
}
</script>

<style>
.public-tip {
  position: absolute;
  top: 0;
  right: 0;
  width: 70px;
  background-color: rgba(87, 78, 254, 0.8);
  color: #fff;
  padding-top: 10px;
  transform: translateX(50%) rotateZ(45deg);
  transform-origin: top center;
  text-align: center;
  font-size: 12px;
}

.item-box:hover {
  box-shadow: 0px 0px 6px #ccc;
  cursor: pointer;
}
</style>
