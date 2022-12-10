<template>
  <div>
    <div v-if="showDetail">
      <BlobDetail :selected-item="selectedRow" />
    </div>
    <hr />
    <span>search value: </span>
    <input type="text" v-model="searchValue" />
    <button @click="clearSelection">Clear selection</button>
    <EasyDataTable
      :headers="headings"
      :items="items"
      :key="dataArrived"
      :search-field="searchField"
      :search-value="searchValue"
      alternating
      @click-row="showRow"
    />
  </div>
</template>

<script setup lang="ts">
import type { ClickRowArgument, Header } from "vue3-easy-data-table";
import axios from "axios";
import { ref } from "vue";
import BlobDetail from "@/components/BlobDetail.vue";

const dataArrived = ref(0);
const itemsSelected = ref("");
const searchValue = ref("");
const searchField = ref("Name");
const showDetail = ref(false);
let selectedRow = ref({});
let items = ref("Hello, Composition API!");

const result = axios
  .get("http://localhost:8080/filemanager/documents")
  .then((res) => {
    dataArrived.value += 1;
    items.value = res.data;
  });

const headings: Array<Header> = [{ text: "Name", value: "Name" }];

const showRow = (item: ClickRowArgument) => {
  selectedRow.value = item;
  showDetail.value = true;
};

function clearSelection() {
  selectedRow.value = {};
  showDetail.value = false;
}
</script>

<style scoped>
div {
  margin: 20px;
}
</style>
