<template>
  <div class="p-[20px] bg-[#F5F5F5] departmentManagement h-[100%] box-border">
    <div class="w-[1140px] h-[878px] mx-auto p-[20px] bg-[#fff]">
      <div class="flex h-[100%]">
        <!-- 部门左 -->
        <a-menu
          v-model:selectedKeys="selectedKeys"
          mode="inline"
          class="w-[247px] flex flex-col border-r border-[#E8E8E8]"
        >
          <!-- 搜索框 -->
          <div class="relative">
            <a-input
              type="text"
              v-model:value="SearchUseInf"
              @keyup.enter="searchUser"
              placeholder="输入'用户名/邮箱'回车搜索"
              class="h-[36px] text-[14px] w-[228px] pr-[15px] rounded-[5px] border-2 border-[#DCDFE6]"
            >
              <template #prefix>
                <Icon icon="basil:search-solid" class="text-[20px]" />
              </template>
            </a-input>
          </div>
          <span class="pt-[20px] pb-[10px] text-[#ccc]">成员</span>
          <!--  成员开始 -->
          <a-menu-item
            key="1"
            class="h-[40px]"
            @click="
              GetDepartmentUserFuntion({
                keyword: SearchUseInf,
              }),
                showDepartmentValue('所有成员'),
                scrollToTop()
            "
          >
            <Icon icon="mdi:person-group" width="20px" height="20px" />
            <span class="pl-[12px]">所有成员</span>
          </a-menu-item>
          <a-menu-item
            key="2"
            class="h-[40px]"
            @click="
              GetDepartmentUserFuntion({
                keyword: SearchUseInf,
                date_after_created: '2023-07-03 00:00:00',
              }),
                showDepartmentValue('新加入的成员'),
                scrollToTop()
            "
          >
            <Icon
              icon="mdi:users-add"
              :horizontalFlip="true"
              width="20px"
              height="20px"
            />
            <span class="pl-[12px]">新加入的成员</span>
          </a-menu-item>
          <a-menu-item
            key="3"
            class="h-[40px]"
            @click="
              GetDepartmentUserFuntion({
                keyword: SearchUseInf,
                department_id: 0,
              }),
                showDepartmentValue('未分配部门的成员'),
                scrollToTop()
            "
          >
            <Icon icon="pepicons-pencil:person" width="20px" height="20px" />
            <span class="pl-[12px]">未分配部门的成员</span>
          </a-menu-item>
          <a-menu-item
            key="4"
            class="h-[40px]"
            @click="
              GetDepartmentUserFuntion({ keyword: SearchUseInf, state: 0 }),
                showDepartmentValue('停用的成员'),
                scrollToTop()
            "
          >
            <Icon
              icon="pepicons-pencil:person-off"
              width="20px"
              height="20px"
            />
            <span class="pl-[12px]">停用的成员</span>
          </a-menu-item>
          <!-- 成员结束 -->
          <div
            class="h-[72px] pt-[20px] pb-[10px] text-[#ccc] flex items-center"
          >
            <span>部门</span>
            <a-button
              disabled
              type="text"
              class="flex items-center ml-[120px] p-[0] border-0"
            >
              <Icon icon="gala:add" />
              创建部门
            </a-button>
          </div>
          <!-- 部门名字开始 -->
          <a-menu-item
            v-for="row in sortedDepartments"
            :key="row.id"
            class="h-[40px] pl-[10px] flex items-center overflow-hidden"
            @click="
              GetDepartmentUserFuntion({
                keyword: SearchUseInf,
                department_id: row.id,
              }),
                showDepartmentValue(row.name, row),
                scrollToTop()
            "
          >
            <Icon icon="mingcute:department-line" width="20px" height="20px" />
            <span class="pl-[12px] overflow-hidden">{{ row.name }}</span>
          </a-menu-item>
          <!-- 部门名字结束 -->
        </a-menu>
        <!-- 部门右 -->
        <div class="pl-[24px] w-[828px]">
          <div class="h-[30px] mb-[18px] flex justify-between items-center">
            <div class="text-[18px]">
              {{ selectedValue }} · {{ UserData?.length }}
            </div>
            <a-space class="flex" v-if="selectedKeys[0] > '4'">
              <a-button
                disabled
                type="text"
                class="flex items-center text-[14px] p-[0] border-0 mr-[10px]"
              >
                <Icon icon="uiw:user-add" class="mr-[3px]" />添加新成员
              </a-button>
              <a-button
                type="link"
                @click="showDrawer"
                class="flex items-center text-[14px] p-[0] border-0 shadow-none mr-[10px] text-[#409EFF]"
              >
                <Icon icon="iconamoon:edit-thin" class="mr-[3px]" />编辑部门
              </a-button>
              <a-button
                disabled
                type="text"
                class="flex items-center text-[14px] p-[0] border-0"
              >
                <Icon icon="fluent-mdl2:delete" class="mr-[3px]" />删除部门
              </a-button>
            </a-space>
          </div>
          <ul class="overflow-hidden">
            <li
              v-for="UserInf in UserData"
              :key="UserInf.id"
              class="h-[68.8px] py-[12px] border-t border-[#E8E8E8] flex justify-between items-center"
            >
              <div class="flex items-center">
                <img
                  :src="UserInf.avatar"
                  alt=""
                  class="h-[32px] w-[32px] mr-[15px] rounded-[50%]"
                />
                <div>
                  <button
                    @click="
                      (openUserInf = true),
                        departmentUSerInfFunction({ id: UserInf?.id })
                    "
                    class="p-[0] border-0 shadow-none h-[24px]"
                  >
                    {{ UserInf?.username }}
                  </button>
                  <div class="flex items-center text-[#ccc]">
                    <div class="mr-[10px]">{{ UserInf?.email }}</div>
                    <div>{{ UserInf.department?.name }}</div>
                  </div>
                </div>
              </div>
              <div class="flex items-center" v-if="selectedKeys[0] > '4'">
                <a-popconfirm
                  placement="bottom"
                  title="确定禁用此用户吗？"
                  ok-text="确定"
                  cancel-text="取消"
                  @confirm="confirm(UserInf.id, 0)"
                  v-if="UserInf.state == 1"
                >
                  <template #icon
                    ><question-circle-outlined style="color: orange" />
                  </template>
                  <a-popover color="#303133">
                    <template #content>
                      <div class="text-[#fff]">禁用</div>
                    </template>
                    <a-button shape="circle">
                      <Icon icon="mdi:forbid" :horizontalFlip="true" />
                    </a-button>
                  </a-popover>
                </a-popconfirm>
                <a-popconfirm
                  placement="bottom"
                  title="确定启用此用户吗？"
                  ok-text="确定"
                  cancel-text="取消"
                  @confirm="confirm(UserInf.id, 1)"
                  v-else
                >
                  <template #icon
                    ><question-circle-outlined style="color: orange" />
                  </template>
                  <a-popover color="#303133">
                    <template #content>
                      <div class="text-[#fff]">启用</div>
                    </template>
                    <a-button shape="circle">
                      <Icon icon="teenyicons:tick-circle-outline" />
                    </a-button>
                  </a-popover>
                </a-popconfirm>
                <span class="px-[5px]">|</span>
                <a-button disabled shape="circle" class="">
                  <Icon icon="tabler:user-minus" />
                </a-button>
              </div>
            </li>
          </ul>
        </div>
        <!-- 编辑部门 -->
        <a-drawer
          v-model:open="open"
          :closable="false"
          class="custom-class"
          height="300px"
          title="编辑部门"
          placement="top"
        >
          <template #extra>
            <button @click="open = false" class="hover:text-[#1677ff]">
              <Icon icon="ph:x" />
            </button>
          </template>
          <a-form
            labelAlign
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 16 }"
            :model="formState"
            name="dynamic_rule"
          >
            <a-form-item
              label="部门名称"
              name="DepartmentNameValue"
              :rules="[{ required: true, message: '部门为必填项' }]"
            >
              <a-input v-model:value="formState.DepartmentNameValue" />
            </a-form-item>
            <a-form-item label="排序" name="sort">
              <a-input v-model:value="formState.sortValue" />
            </a-form-item>
            <a-form-item :wrapper-col="{ offset: 5, span: 16 }">
              <a-button
                html-type="button"
                class="bg-[#409EFF]"
                @click="
                  DepartmentSortFunction(
                    formState.DepartmentNameValue,
                    Number(formState.sortValue)
                  ),
                    runDataDepartmentName()
                "
              >
                编辑
              </a-button>
            </a-form-item>
          </a-form>
        </a-drawer>
        <!-- 用户信息 -->
        <a-drawer
          v-model:open="openUserInf"
          :closable="false"
          class="custom-class titleLocation"
          height="655px"
          placement="top"
          :title="`${departmentUSerInf?.username}详细信息`"
        >
          <template #extra>
            <button @click="openUserInf = false" class="hover:text-[#1677ff]">
              <Icon icon="ph:x" />
            </button>
          </template>
          <div class="">
            <div class="h-[154px] flex flex-col items-center justify-between">
              <img
                :src="departmentUSerInf.avatar"
                alt=""
                class="w-[64px] h-[64px] rounded-[50%]"
              />
              <!-- .avatar -->
              <h2 class="h-[80px] leading-[80px]">
                {{ departmentUSerInf?.username }}
              </h2>
            </div>
            <ul>
              <a-divider
                orientation="left"
                orientation-margin="0px"
                style="color: #ccc"
              >
                <Icon icon="ep:suitcase" class="mr-[5px]" />工作信息
              </a-divider>
              <li class="h-[50px] leading-[50px] flex">
                <div class="w-[80px] text-[#ccc]">昵称</div>
                <span>{{ departmentUSerInf?.nickname }}</span>
              </li>
              <li class="h-[50px] leading-[50px] flex">
                <div class="w-[80px] text-[#ccc]">职位</div>
                <span>-</span>
              </li>
              <li class="h-[50px] leading-[50px] flex">
                <div class="w-[80px] text-[#ccc]">邮箱</div>
                <span>{{ departmentUSerInf?.email }}</span>
              </li>
              <li class="h-[50px] leading-[50px] flex">
                <div class="w-[80px] text-[#ccc]">手机</div>
                <span>{{ departmentUSerInf?.phone }}</span>
              </li>
              <li class="h-[50px] leading-[50px] flex">
                <div class="w-[80px] text-[#ccc]">部门</div>
                <span>{{ departmentUSerInf?.department?.name }}</span>
              </li>
              <li class="h-[50px] leading-[50px] flex">
                <div class="w-[80px] text-[#ccc]">城市</div>
                <span>{{ departmentUSerInf?.city }}</span>
              </li>
            </ul>
          </div>
        </a-drawer>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, watch, ref } from "vue";
import {
  isEnableDisable,
  DepartmentInf,
  DepartmentName,
  DepartmentUSerInf,
  DepartmentSort,
} from "@/service";
import { QuestionCircleOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";

let parameter = ref();
const selectedKeys = ref<string[]>(["1"]); // 侧边栏刚开始显示的内容
const open = ref<boolean>(false); // 编辑部门隐藏
const openUserInf = ref<boolean>(false); // 用户信息隐藏
const selectedValue = ref<string | null>(" 所有成员 "); // 右边标题
// eslint-disable-next-line no-undef
const selectedRow = ref<TDepartmentInformation>([]); //当前点击的部门的所有数据
// eslint-disable-next-line no-undef
const sortedDepartments = ref<TDepartmentInformation>([]); //排序后全部部门的数据
// eslint-disable-next-line no-undef
const UserData = ref<TDepartmentInformation>(); // 人员（个人）全部信息
// eslint-disable-next-line no-undef
const departmentUSerInf = ref<TDepartmentInformation>(); //部门用户信息
const SearchUseInf = ref(); //搜索框value的值默认""
// 数据请求——————————————————————
// 部门全部数据
const { data: dataDepartmentName, run: runDataDepartmentName } = useRequest(
  () => DepartmentName()
);
// 部门成员信息
const departmentUSerInfFunction = (obj: { id: number }) => {
  DepartmentUSerInf(obj).then((res) => {
    departmentUSerInf.value = res;
  });
};
// 成员信息
const GetDepartmentUserFuntion = (obj: {
  keyword: string;
  department_id?: number;
  state?: number;
  date_after_created?: string;
}) => {
  DepartmentInf(obj).then((res) => {
    UserData.value = res; //所有人员信息
    parameter.value = obj;
  });
};

// 数据修改单个——————————————————————
// 禁用框
const confirm = async (id: number, state: 0 | 1) => {
  await isEnableDisable({ state: state, id: id });
  message.info(state === 1 ? "启用成功" : "禁用成功");
  GetDepartmentUserFuntion(parameter.value); //重新获取当前个体信息
};
// 部门
function DepartmentSortFunction(name: string, sort: number) {
  DepartmentSort({
    name: name,
    sort: sort,
    id: selectedRow.value.id,
    owner_id: selectedRow.value.owner_id,
    parent_id: selectedRow.value.parent_id,
    created_at: selectedRow.value.created_at,
    updated_at: selectedRow.value.updated_at,
  }).then(() => {
    message.info("编辑成功");
    runDataDepartmentName();
    GetDepartmentUserFuntion(parameter.value);
    selectedValue.value = name;
    open.value = false;
    formState.sortValue = sort;
  });
}

// 声明函数——————————————————————
const showDrawer = () => {
  open.value = true; // 点击事件抽屉显示
};
// 点击li时调用该函数，在div中显示选中的值
const showDepartmentValue = (
  value: string,
  // eslint-disable-next-line no-undef
  row?: TDepartmentInformation
) => {
  selectedValue.value = value; // 当前点击的标签的文字内容
  selectedRow.value = row; // 当前点击的所有数据
};
// 点击后根据部门dataDepartmentName?.value?.rows.sort值的大小进行排序
const SortFunction = () => {
  sortedDepartments.value = dataDepartmentName?.value?.rows
    ? dataDepartmentName.value.rows
        .slice()
        .sort((a: { sort: number }, b: { sort: number }) => b.sort - a.sort)
    : [];
};
//定义需要修改的值的类型
interface IFormState {
  DepartmentNameValue: string;
  sortValue: number;
}
// 初始需要修改的值的数据
const formState = reactive<IFormState>({
  DepartmentNameValue: "",
  sortValue: 0,
});
// 搜索框
const searchUser = () => {
  parameter.value.keyword = SearchUseInf.value;
  GetDepartmentUserFuntion(parameter.value); //重新获取当前个体信息
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // 平滑滚动
  });
};

// 调用函数——————————————————————
runDataDepartmentName(); //直接调用函数获取全部部门数据信息
GetDepartmentUserFuntion({
  keyword: " ", //获取所有人员的数据信息
});
departmentUSerInfFunction({ id: 2 }); //获取id为2的人员信息

// 监听打印——————————————————————
watch(dataDepartmentName, () => {
  SortFunction(); //监听全部部门数据发生变化调用排序
});
watch(selectedRow, (newValue) => {
  formState.DepartmentNameValue = newValue?.name || "";
  formState.sortValue = Number(newValue?.sort) || 0;
});
// watchEffect(() => {
//   console.log("当前部门数据", selectedRow.value); //当前部门数据
//   console.log("部门数据(dataDepartmentName):", dataDepartmentName.value?.rows); //重新获取部门全部数据
//   console.log("排序后部门数据(sortedDepartments):", sortedDepartments.value); //排序后部门的数据
// });

// 钩子
// 在组件初始化时调用排序函数
onMounted(() => {
  runDataDepartmentName(); // 获取部门数据
  SortFunction(); // 排序数据
});
</script>
<style>
.ant-drawer-content-wrapper {
  width: 460px !important;
  margin: 5% auto !important;
}
.departmentManagement .ant-menu-title-content {
  display: flex !important;
  align-items: center !important;
}

.departmentManagement .ant-menu-item {
  padding-left: 10px !important;
  border-radius: 0 !important;
}
.departmentManagement .ant-menu-item-selected {
  border-right: 3px solid;
}
.departmentManagement .ant-menu-item-active {
  color: #1677ff !important;
  background-color: transparent !important;
}
.departmentManagement .ant-divider-with-text-left {
  margin-top: 0 !important;
}
.departmentManagement .ant-divider-inner-text {
  display: flex !important;
  align-items: center !important;
}
.departmentManagement .ant-btn-circle {
  padding-inline-start: 8px !important;
  padding-inline-end: 8px !important;
}
.ant-btn-primary {
  background-color: #1677ff !important;
}
.ant-btn-default {
  display: inline-block;
}
.titleLocation .ant-drawer-title {
  text-align: center;
}
.departmentManagement span {
  user-select: none;
  cursor: pointer;
}
</style>
