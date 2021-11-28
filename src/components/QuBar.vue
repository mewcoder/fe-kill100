<script setup>
import { onMounted, ref, reactive } from "vue";
import api from "../../api";
import { Add, Edit } from "@vicons/carbon";
import { useMessage } from "naive-ui";

const message = useMessage();

let labelList = ref([]);
const showModal = ref(false);
const showModal2 = ref(false);
const newQu = reactive({
  input: "",
  label: "",
});

const ramdomId = ref(0);

onMounted(async () => {
  const res = await api.getLabels();
  if (res.status === 200) {
    labelList.value = res.data.map((item) => {
      return {
        label: item.name,
        value: item.name,
      };
    });
  }
});

const getOneQu = async () => {
  let res = await api.getAllQuestion();
  let total = 0;
  if (res.status === 200) {
    total = res.data.length || 0;
  }
  const id = Math.floor(Math.random() * total + 1);
  console.log(id);
  res = await api.getOneQuestion(id);
  if (res.status === 200) {
    newQu.input = res.data.title;
    newQu.label = res.data.labels[0].name;
  }
  showModal2.value = true;
};

const addOneQu = async () => {
  newQu.input = "";
  newQu.label = "";
  showModal.value = true;
};

const saveOneQu = async () => {
  showModal.value = false;
  const data = {
    title: newQu.input,
    labels: [newQu.label],
  };
  const res = await api.addOneQuestion(data);
  if (res.status === 201) {
    message.success("添加成功");
  } else {
    message.error("添加失败");
  }
};
</script>

<template>
  <n-space justify="center">
    <n-button type="info" @click="getOneQu" size="large">
      <n-icon> <Edit /> </n-icon>来一题</n-button
    >
    <n-button @click="addOneQu" size="large">
      <n-icon> <Add /> </n-icon>加一题</n-button
    >
  </n-space>

  <n-modal
    v-model:show="showModal"
    preset="dialog"
    title="加一题"
    positive-text="确认"
    negative-text="取消"
    @positive-click="saveOneQu"
    style="width: 600px"
  >
    <n-input
      v-model:value="newQu.input"
      type="textarea"
      placeholder="输入题目"
      rows="2"
    />
    <n-select
      v-model:value="newQu.label"
      :options="labelList"
      placeholder="选择分类"
      style="width: 150px; margin-top: 10px"
    />
  </n-modal>
  <n-modal
    class="custom-card"
    v-model:show="showModal2"
    preset="card"
    title="来一题"
    :bordered="false"
    :segmented="segmented"
    style="width: 600px"
  >
    <n-tag size="medium" type="info" style="margin-right: 5px">
      {{ newQu.label }} </n-tag
    >{{ newQu.input }}
  </n-modal>
</template>

<style></style>
