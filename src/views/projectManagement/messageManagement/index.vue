<template>
  <div>我是index</div>
</template>
<script setup lang="ts">
import {useRoute} from "vue-router";

const route = useRoute();
console.log('route.params',route.params);
</script>
<style scoped lang="scss"></style>
