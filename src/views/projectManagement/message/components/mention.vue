<template>
  <div>
    <div class="flex justify-end">
      <a-space direction="vertical" class="w-[250px] h-[40px] mt-[5px]">
        <a-input placeholder="内容" allowClear />
      </a-space>
      <a-button type="primary" class="mr-[30px] w-[88px] h-[40px] ml-3"
        ><p class="flex items-center justify-center">
          <Icon icon="iconamoon:search" /><span>查询</span>
        </p></a-button
      >
    </div>
    <div
      class="flex items-center justify-between w-[100%] h-[58px] mt-[10px] border-b"
    >
      <p>内容</p>
      <div class="flex w-[200px] items-center justify-around mr-[180px]">
        <p>时间</p>
        <p>操作</p>
      </div>
    </div>
    <ul>
      <li class="flex items-center h-[60px] justify-center border-b">
        <p>暂无内容</p>
      </li>
    </ul>
    <a-pagination
      size="small"
      :total="10"
      show-size-changer
      show-quick-jumper
      class="flex items-center justify-center mt-[50px]"
    />
  </div>
</template>
<script setup lang="ts"></script>
<style scoped>
.ant-input:placeholder-shown {
  height: 40px;
}
</style>
