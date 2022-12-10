<template>
  <div v-if="selectedItem">
    Selected: <br />
    {{ selectedItem.Name }}
  </div>
  file password: <input type="text" v-model="sourcePassword" />
  <button
    type="button"
    @click="getHeaders"
    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
  >
    Get headers
  </button>

  <div v-if="showPreview">
    <SourcePreviewHeader
      :source-name="selectedItem.Name"
      :source-password="sourcePassword"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SourcePreviewHeader from "@/components/SourcePreviewHeader.vue";

const props = defineProps({
  selectedItem: {},
});
const dataArrived = ref(0);
const sourcePassword = ref("");
const showPreview = ref(false);

//
function getHeaders(selectedItem: any) {
  showPreview.value = true;
}
</script>

<style scoped></style>
