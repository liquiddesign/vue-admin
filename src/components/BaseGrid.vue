<template>
  Error: {{ error }} | Loading {{ loading }} | <button @click="refetch">reload</button>
  <div class="table-responsive" style="overflow: initial;" v-bind="$attrs">
    <table class="mb-0 table table-sm table-striped">
        <thead>
        <slot name="header" :select-all="selectAll" :order-by="(value) => orderBy(value)"  />
        </thead>
        <tbody>
        <template v-if="result?.result" v-for="(item,i) in result.result.data" :key="i">
          <slot name="body" :item="item" :selected="selected" :delete-row="() => deleteRow(item)" :update-row="(value) => updateRow(item, value)" />
        </template>
        <tr v-if="result?.result && Object.values(result?.result.data).length === 0">
          <td colspan="100%" style="text-align: center; font-style: italic">
            K zobrazení nejsou žádné záznamy. Přidejte záznam nebo změňte nastavení filtru.
          </td>
        </tr>
        <tr v-if="error">
          <td colspan="100%" style="text-align: center; font-style: italic">
            <span class="text-danger">{{ error.message }}</span>
          </td>
        </tr>
        <tr v-if="loading && !result?.result">
          <td colspan="100%" style="text-align: center; font-style: italic">
            <i class="fa fa-circle-notch fa-spin" /> Načítám data ...
          </td>
        </tr>
        </tbody>
    </table>
  </div>

</template>
<script setup lang="ts">
import {defineProps, onMounted, reactive, withDefaults, ref, computed} from "vue";
import {DocumentNode} from "graphql/language";
import {useQuery} from "@vue/apollo-composable";

const props = withDefaults(defineProps<{
  query: DocumentNode,
  page?: number
  filters?: any
}>(), {page: 1, filters: {}});

const selected = reactive({});
let loadinga = ref(false);
let variables = reactive({input: {page: props.page, limit: 5, filters: props.filters}});

const remoteData = reactive({result: {}, loading: null, error: null});

const test = computed(function() {
  return {input: {page: props.page, limit: 5, filters: props.filters}};
});

const { result, loading, error, onError, onResult, refetch } = useQuery(props.query, test);

function selectAll() {

}

function deleteRow(item) {

}

function updateRow(item, value) {

}

function orderBy(value) {

}

onMounted(() => {

  //remoteData.result = result;
 // loadinga = loading;
});

</script>