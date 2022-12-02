<template>
  <div class="table-responsive" style="overflow: initial;" v-bind="$attrs">
    <table class="mb-0 table table-sm table-striped">
        <thead>
        <slot name="header" :select-all="selectAll" :order-by="(value) => orderBy(value)"  />
        </thead>
        <tbody>
        <template v-if="result?.result" v-for="(item,i) in result.result.data" :key="i">
          <slot name="body" :item="applyDecorator(item)" :index="i" :selected="selected" :delete-row="() => deleteRow(item, i)" :update-row="(value) => updateRow(item, value)" />
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
import {defineProps, reactive, withDefaults, computed, defineExpose, onActivated} from "vue";
import {DocumentNode} from "graphql/language";
import {useMutation, useQuery} from "@vue/apollo-composable";

const props = withDefaults(defineProps<{
  query: DocumentNode,
  delete?: DocumentNode,
  page?: number
  onPage?: number
  filters?: any
}>(), {page: 1, onPage: 10, filters: {}});

const selected: any = reactive({});
const decorator: any = reactive({});

const test = computed(function() {
  return {input: {page: props.page, limit: props.onPage, filters: props.filters}};
});

const selectAll = computed({
  get: function () {
    return result.value?.result.data ? (Object.values(selected).filter( w => w === true).length === result.value?.result.data.length && result.value?.result.data.length > 0) : false;
  },
  set: function (value) {
    result.value?.result.data.forEach((v:any) => selected[v.uuid] = value);
}});

const {result, loading, error, onError, onResult, refetch} = useQuery(props.query, test);

if (props.delete) {
  const {mutate: deleteItem} = useMutation(props.delete);
}

defineExpose({loading, selectAll, refetch,  selected, selectedIds, decorator});

function applyDecorator(item: any) {
  if (!decorator[item.uuid]) {
    return item;
  }

  return Object.assign(Object.assign({}, item), decorator[item.uuid]);
}

function deleteRow(item: any, index) {
  if (props.delete) {
    deleteItem({'uuid': item.uuid});
    refetch();
  }
}

function updateRow(item, value) {

}

function orderBy(value) {

}

onActivated(() => {
  if (result.value?.result) {
    refetch();
  }
});

function selectedIds() {
  return Object.keys(Object.fromEntries(Object.entries(selected).filter(([key, value]) => value) ));
}

</script>