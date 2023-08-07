<template>
  <div>
    <a-button type="primary" @click="showModal">Open Modal</a-button>
    <a-modal
      v-model:visible="visible"
      title="邀请新成员"
      @ok="handleOk"
      confirmLoading
    >
      <div class="Invite">
        <div class="flex justify-between h-[40px] items-center">
          <div class="text-[14px] text-[#606266]">账号邀请</div>
          <a-button type="primary" disabled>通过链接邀请</a-button>
        </div>
        <div>
          <a-input
            v-model:value="userName"
            placeholder="请输入用户名或邮箱查找"
            class-="h-[40px]"
          >
            <template #prefix>
              <Icon icon="iconamoon:search-thin" color="#C0C4CC" />
            </template>
          </a-input>
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    const visible = ref<boolean>(true);

    const showModal = () => {
      visible.value = true;
    };

    const handleOk = (e: MouseEvent) => {
      console.log(e);
      visible.value = false;
    };
    const userName = ref<string>("");
    return {
      visible,
      showModal,
      handleOk,
      userName,
    };
  },
});
</script>
<style>
.Invite {
  border-bottom: 1px solid #dcdfe6;
  padding-bottom: 10px;
}
.Invite .ant-btn-primary {
  border: none !important;
  background: none !important;
  color: #c0c4cc !important;
}
.Invite .ant-input-affix-wrapper {
  height: 40px !important;
}
.ant-modal-footer {
  display: none !important;
}
</style>
