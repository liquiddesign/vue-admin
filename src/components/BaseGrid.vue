<template>
  Error: {{ error }} | Loading {{ loading }} | <button @click="refetch">reload</button>
  
  <div v-if="result?.result" v-for="(item, i) in result.result.data" :key="i" style="border: 1px solid red;">
    {{ item.code }} <br>
    {{ item.category }} <br>
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

let loadinga = ref(false);
let variables = reactive({input: {page: props.page, limit: 5, filters: props.filters}});

const remoteData = reactive({result: {}, loading: null, error: null});

const test = computed(function() {
  return {input: {page: props.page, limit: 5, filters: props.filters}};
});

const { result, loading, error, onError, onResult, refetch } = useQuery(props.query, test);



onMounted(() => {

  //remoteData.result = result;
 // loadinga = loading;
});

</script>