<template>
  <div class="w-screen h-screen bg">
    <div
      class="flex items-center fixed top-[24px] left-[22px] z-10 scale-[0.8]"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        style="height: 40px"
        class="mr-[5px]"
      >
        <path
          data-v-37dfd6fc=""
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12 21a9 9 0 100-18 9 9 0 000 18zm0-4.737a4.263 4.263 0 100-8.526 4.263 4.263 0 000 8.526z"
          fill="#165DFF"
        ></path>
        <path
          data-v-37dfd6fc=""
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M16.263 7.737H21v4.353l-.013.384h-4.75c.024-.237.026-.41.026-.41V7.737zM11.526 3.013c.207-.01.402-.013.402-.013h4.335v4.737h-4.35s-.202.004-.387.025v-4.75z"
          fill="#165DFF"
        ></path>
        <path fill="#16D2AC" d="M15 3h6v6h-6z"></path>
      </svg>
      <span class="text-[24px] font-bold text-[#303133]">Arco</span>
    </div>
    <RegisterView v-if="isSwitch === 'registerView'" @update="handleUpdate" />
    <loginView v-if="isSwitch === 'loginView'" @update="handleUpdate" />
    <ForgotPasswordView
      v-if="isSwitch === 'forgotPasswordView'"
      @update="handleUpdate"
    />
  </div>
</template>
<script setup lang="ts">
import RegisterView from "@/views/Login/components/RegisterView.vue";
import loginView from "@/views/Login/components/loginView.vue";
import ForgotPasswordView from "@/views/Login/components/forgotPasswordView.vue";
// 切换选项卡
let isSwitch = ref<"loginView" | "registerView" | "forgotPasswordView">(
  "loginView"
);
let toggle = ref(false);

let userNameSong = ref("");
let passWordSong = ref("");

// 在监听回调中更新父组件的值
const handleUpdate = (
  newValue: "loginView" | "registerView" | "forgotPasswordView",
  isBoolean: boolean,
  userNameParent: string,
  passWordParent: string
) => {
  isSwitch.value = newValue;
  toggle.value = isBoolean;
  userNameSong.value = userNameParent;
  passWordSong.value = passWordParent;
};
</script>
<style scoped lang="scss">
.bg {
  background: #f5f5f5 url(@/assets/images/bg.svg) no-repeat center 110px;
  background-size: 100%;
}
</style>
