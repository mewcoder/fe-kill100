<script setup>
import { onMounted, ref, watch } from "vue";
import api from "../../api";
import { Account, ArrowsVertical } from "@vicons/carbon";

const total = ref(0);
const list = ref([]);
const showTable = ref(false);
const label = ref("");
const labelList = ref([]);
const showSpin = ref(false);

watch(
  () => label.value,
  async () => {
    const res = await api.getAllQuestion({
      labels: label.value,
    });
    if (res.status === 200) {
      list.value = res.data;
      total.value = res.data.length || 0;
    }
  }
);

onMounted(async () => {
  showSpin.value = true;
  let res = await api.getAllQuestion();
  if (res.status === 200) {
    list.value = res.data;
    total.value = res.data.length || 0;
  }
  showSpin.value = false;
  res = await api.getLabels();
  if (res.status === 200) {
    labelList.value = res.data.map((item) => {
      return {
        label: item.name,
        value: item.name,
      };
    });
  }
});

const switchTable = () => {
  if (showTable.value) {
    label.value = "";
  }
  showTable.value = !showTable.value;
};
</script>

<template>
  <div class="table">
    <n-spin :show="showSpin">
      <n-statistic :value="total">
        <template #prefix>
          <n-icon>
            <Account />
          </n-icon>
          共
        </template>
        <template #suffix>题</template>
      </n-statistic></n-spin
    >
    <n-select
      v-show="showTable"
      v-model:value="label"
      :options="labelList"
      placeholder="请选择"
      clearable
      style="width: 150px; float: left"
    />
    <n-button #icon style="float: right" @click="switchTable">
      <n-icon> <ArrowsVertical /> </n-icon
    ></n-button>

    <n-table v-show="showTable" :single-line="false">
      <thead>
        <tr>
          <th>题目</th>
          <th>分类</th>
          <th>序号</th>
          <th>链接</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in list" :key="item.number">
          <td>{{ item.title }}</td>
          <td>
            <n-tag>{{ item.labels[0].name }}</n-tag>
          </td>
          <td>{{ item.number }}</td>
          <td><a :href="item.html_url" target="_blank">查看</a></td>
        </tr>
      </tbody>
    </n-table>
  </div>
</template>

<style scoped="scss">
.table {
  margin: 40px;
}
</style>
