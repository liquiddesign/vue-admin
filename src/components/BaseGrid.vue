<template>
  <div class="table-responsive" style="overflow: initial;" v-bind="$attrs">
    <table class="mb-0 table table-sm table-striped">
        <thead>
        <slot name="header" :select-all="selectAll" :order-by="(value) => orderBy(value)"  />
        </thead>
        <tbody>
        <template v-if="result?.result" v-for="(item,i) in result.result.data" :key="i">
          <slot name="body" :item="decorator(item)" :index="i" :selected="selected" :delete-row="() => deleteRow(item, i)" :update-row="(value) => updateRow(item, value)" />
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
import {defineProps, onMounted, reactive, withDefaults, ref, computed, defineExpose, onActivated} from "vue";
import {DocumentNode} from "graphql/language";
import {useMutation, useQuery} from "@vue/apollo-composable";

const props = withDefaults(defineProps<{
  query: DocumentNode,
  delete?: DocumentNode,
  page?: number
  onPage?: number
  filters?: any
}>(), {page: 1, onPage: 10, filters: {}});

const selected = reactive({});
let loadinga = ref(false);
let variables = reactive({input: {page: props.page, limit: 15, filters: props.filters}});

const remoteData = reactive({result: {}, loading: null, error: null});

const test = computed(function() {
  return {input: {page: props.page, limit: props.onPage, filters: props.filters}};
});

const selectAll = computed({ get: function () {

    return result.value?.result.data ? (Object.values(selected).filter( w => w === true).length === result.value?.result.data.length && result.value?.result.data.length > 0) : false;
  },
  set: function (value) {
    result.value?.result.data.forEach(v => selected[v.uuid] = value);
  }});

const { result, loading, error, onError, onResult, refetch } = useQuery(props.query, test);

const query = props.query;

const { mutate: deleteItem } = useMutation(props.delete);


defineExpose({selectAll, refetch, loading, selected, selectedIds});

function deleteRow(item, index) {
 deleteItem({'uuid': item.uuid});
 refetch();

}

function decorator(item) {
 // console.log(item);
  const display = Object.assign({}, item);
  display.name += '-TEST';

  return display;
}

function updateRow(item, value) {

}

function orderBy(value) {

}

onActivated(() => {

  if (result.value?.result ) {
    refetch();
  }
  //remoteData.result = result;
 // loadinga = loading;
});



function selectedIds() {
  return Object.keys(Object.fromEntries(Object.entries(selected).filter(([key, value]) => value) ));
}

</script>