<script setup>
import QuBar from "./components/QuBar.vue";
import QuStat from "./components/QuStat.vue";
import QuSet from "./components/QuSet.vue";
</script>

<template>
  <n-message-provider
    ><h1 class="title">⚔️前端百题斩</h1>
    <QuBar /> <QuStat /> <QuSet />
  </n-message-provider>
</template>

<style>
#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.title {
  margin-bottom: 30px;
}
</style>
