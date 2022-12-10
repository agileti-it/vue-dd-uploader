<template>
  <div>
    <div v-if="showAlert" class="alert alert-error shadow-lg">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="stroke-current flex-shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span
          >Error! Code: <strong>{{ alertError.value }}</strong
          ><button
            class="btn btn-outline btn-error btn-sm"
            @click="dismissError"
          >
            Dismiss
          </button></span
        >
      </div>
    </div>
    <hr />
    <div v-if="showSpinner" class="text-center">
      <div role="status">
        <svg
          class="inline mr-2 w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div v-if="showResult">
      <EasyDataTable
        :headers="headings"
        :items="resultValue"
        :key="showResult"
        alternating
        @click-row="showRow"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";
import type { AxiosRequestConfig } from "axios/index";
import type { Header } from "vue3-easy-data-table";
import { ClickRowArgument } from "vue3-easy-data-table";

const showResult = ref(0);

const props = defineProps({
  sourceName: String,
  sourcePassword: String,
});
const resultValue = ref([]);
const showSpinner = ref(true);
const showAlert = ref(false);
const alertError = ref("");
let selectedRow = ref({});
const showColumns = ref(false);

const options: AxiosRequestConfig = {
  headers: {
    "Content-Type": "text/plain",
  },
};
const result = axios
  .post(
    "http://localhost:8080/filemanager/showheaders?sourcename=" +
      encodeURIComponent(props.sourceName),
    props.sourcePassword,
    options
  )
  .then((res) => {
    console.log(res.data);
    showResult.value += 1;
    showSpinner.value = false;
    resultValue.value = res.data;
  })
  .catch((error) => {
    console.log(error);
    showAlert.value = true;
    alertError.value = error.message;
  });
const headings: Array<Header> = [
  { text: "Row Num", value: "presentationRowIndex" },
  { text: "Row Values", value: "concatenatedCells" },
];

function dismissError() {
  showAlert.value = false;
  alertError.value = "";
}

const showRow = (item: ClickRowArgument) => {
  selectedRow.value = item;
  showColumns.value = true;
};

function recalcHeaders() {
  const rows = resultValue.value;
  console.log("recalc headers");

  console.log("rows: " + rows.length);
  console.log(rows);

  const names = rows.map((obj) => obj.dataCells);
  const values = names.map((dataRow) => dataRow.cellValue.value);

  console.log("names : " + names);
  console.log("values : " + values);
}
</script>

<style scoped></style>
