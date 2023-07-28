<template>
  <!-- 注册 -->
  <div
    class="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[324px]"
  >
    <!-- 注册 -->
    <a-form
      ref="formRef"
      name="custom-validation"
      :model="userInfo"
      :rules="rules"
    >
      <!-- 请输入用户名 -->
      <a-form-item name="username">
        <a-input
          allowClear
          placeholder="请输入用户名"
          class="h-[40px]"
          type="text"
          v-model:value="userInfo.username"
        >
          <template #prefix>
            <Icon icon="majesticons:user" class="text-[#c2c7ce]" />
          </template>
        </a-input>
      </a-form-item>

      <!-- 请输入邮箱 -->
      <a-form-item name="mailbox">
        <a-input
          allowClear
          placeholder="请输入邮箱"
          class="h-[40px]"
          type="text"
          v-model:value="userInfo.mailbox"
        >
          <template #prefix>
            <Icon icon="majesticons:mail" class="text-[#c2c7ce]" />
          </template>
        </a-input>
      </a-form-item>

      <!-- 验证码 -->
      <a-form-item name="verificationCode">
        <a-input
          class="h-[40px]"
          placeholder="验证码"
          type="text"
          autocomplete="new-password"
          v-model:value="userInfo.verificationCode"
        >
        </a-input>
        <a-button
          class="h-[40px] flex-1 bg-[#ecf5ff] text-[#409EFF] shadow-none border-1 border-[#b3d8ff]"
          type="primary"
          style="margin-left: 10px"
          @click="ObtainVerificationCode"
          >获取验证码 <span v-show="isCountdownRunning">({{ countdown }})</span>
        </a-button>
      </a-form-item>

      <!-- 设置密码 -->
      <a-form-item name="password">
        <a-input-password
          allowClear
          placeholder="设置密码"
          class="h-[40px]"
          type="password"
          autocomplete="new-password"
          v-model:value="userInfo.password"
        >
          <template #prefix>
            <Icon
              icon="solar:lock-password-unlocked-bold-duotone"
              class="text-[#c2c7ce]"
            />
          </template>
        </a-input-password>
      </a-form-item>

      <!-- 确认密码 -->
      <a-form-item name="confirmPassword">
        <a-input-password
          allowClear
          placeholder="确认密码"
          class="h-[40px]"
          type="password"
          autocomplete="new-password"
          v-model:value="userInfo.confirmPassword"
        >
          <template #prefix>
            <Icon
              icon="solar:lock-password-bold-duotone"
              class="text-[#c2c7ce]"
            />
          </template>
        </a-input-password>
      </a-form-item>

      <!-- 注册按钮 登录按钮 -->
      <div class="flex items-center">
        <a-button
          class="h-[40px] flex-1 bg-[#409eff]"
          type="primary"
          html-type="submit"
          @click="onSubmit"
          >注册
        </a-button>
        <a-button
          @click="updateParentValue"
          class="h-[40px] flex-1 bg-[#ffffff]"
          style="margin-left: 10px"
          >去登录
        </a-button>
      </div>
    </a-form>
  </div>
  <!-- 底部信息 -->
  <div
    class="fixed bottom-0 w-screen flex items-center justify-center h-[48px] text-[#999] text-[20px]"
  >
    <Icon
      icon="ic:baseline-copyright"
      class="text-[#999] text-[20px] mr-[5px]"
    />
    2021 HOP | 鄂ICP备29218126号-1
  </div>
</template>

<script lang="ts" setup>
import { notification, type FormInstance } from "ant-design-vue";
import { isUserExists, register, sendVerificationCodes } from "@/service";
import { useRequest } from "vue-request";
import type { Rule } from "ant-design-vue/es/form";
import { useCountdown } from "@/hooks/useCountdown";

const userInfo = reactive({
  username: "",
  mailbox: "",
  verificationCode: "",
  password: "",
  confirmPassword: "",
});

//验证码
const { run: runSendVerificationCodes } = useRequest(
  () => sendVerificationCodes({ target: userInfo.mailbox, type: 1 }),
  { manual: true }
);

//注册
const { run: runRegister } = useRequest(
  () =>
    register({
      avatar: "",
      code: userInfo.verificationCode,
      email: userInfo.mailbox,
      password: userInfo.password,
      passwordConfirm: userInfo.confirmPassword,
      username: userInfo.username,
      verification_type: 1,
    }),
  {
    manual: true,
    onSuccess(data) {
      console.log(data);
    },
    onError() {
      notification.open({
        type: "error",
        message: `验证码错误或已使用过或已过期`,
      });
    },
  }
);

const formRef = ref<FormInstance>();
//验证用户名
let validateRegisterUserName = async (_rule: Rule, value: string) => {
  if (value === "") return Promise.reject("请输入用户名");
  // 使用正则表达式检查用户名长度在2到20个字符之间
  const usernameRegex = /^.{2,20}$/;
  if (!usernameRegex.test(value))
    return Promise.reject("用户名长度应在2到20个字符之间");
  const userNameCode = await isUserExists({ username: userInfo.username });
  if (!userNameCode) return Promise.reject("用户名已存在");
  return Promise.resolve();
};

//验证邮箱
let validateRegisterMailbox = async (_rule: Rule, value: string) => {
  if (value === "") return Promise.reject("请输入邮箱");
  // 使用正则表达式检查用户名长度在2到20个字符之间
  const userEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!userEmailRegex.test(value)) return Promise.reject("邮箱格式错误");
  const userEmail = await isUserExists({ email: userInfo.mailbox }); // 等待邮箱验证完成
  if (!userEmail) return Promise.reject("邮箱已存在");
  return Promise.resolve();
};

//验证密码
let validateRegisterPassword = async (_rule: Rule, value: string) => {
  if (value === "") return Promise.reject("请输入密码");
  const userEmailRegex = /^(?=.*[a-zA-Z])(?=.*\d).{6,15}$/;
  if (!userEmailRegex.test(value)) return Promise.reject("密码格式错误");
  return Promise.resolve();
};

const rules: Record<string, Rule[]> = {
  username: [
    { required: true, validator: validateRegisterUserName, trigger: "blur" },
  ],
  mailbox: [
    { required: true, validator: validateRegisterMailbox, trigger: "blur" },
  ],
  password: [
    { required: true, validator: validateRegisterPassword, trigger: "blur" },
  ],
  confirmPassword: [
    {
      required: true,
      validator: () => {
        if (userInfo.password !== userInfo.confirmPassword)
          return Promise.reject("两次密码不一致");
      },
      trigger: "blur",
    },
  ],
};

// 点击获取验证码按钮触发的方法
const ObtainVerificationCode = async () => {
  if (formRef.value) {
    try {
      await formRef.value.validateFields("mailbox");
      runSendVerificationCodes();
    } catch (error) {
      console.log("邮箱验证失败");
    }
  }
};

// 提交表单数据
const onSubmit = () => {
  if (formRef.value) {
    formRef.value.validate().then(() => {
      runRegister();
    });
  }
};

// 使用倒计时功能函数，并传入初始值 30 秒
const { countdown, isCountdownRunning, startCountdown } = useCountdown(30);
// 在组件卸载前清除计时器
onBeforeUnmount(() => {
  isCountdownRunning.value = true;
  startCountdown();
});

// 定义向父组件发送的自定义事件
const emits = defineEmits(["update"]);

// 点击按钮时触发的方法 触发父组件的自定义事件，将新值传递给父组件
const updateParentValue = () => emits("update", "loginView");
</script>
<style lang="scss">
.ant-form-item-control-input-content {
  display: flex;
}

.ant-input-clear-icon {
  display: flex;
}
</style>
