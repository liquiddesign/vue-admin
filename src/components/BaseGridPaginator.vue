<template>
  <div class="">
    <nav class="pt-3 ms-auto" aria-label="Page navigation example">
  <ul class="pagination pagination-sm">

    <li class="page-item" :class="{disabled: page === 1}">
      <a class="page-link" aria-label="Previous" @click.prevent="emit('changePage', page > 1 ? page - 1 : 1)">
        <span aria-hidden="true">«</span>
        <span class="sr-only">Předchozí</span>
      </a>
    </li>
    <li  v-for="index in pageNumber" :key="index" class="page-item" :class="{active: index === page}">
      <a class="page-link" @click.prevent="emit('changePage', index)">{{ index }}</a>
      <a v-if="0" class="page-link"> .. </a>
    </li>
    <li class="page-item" :class="{disabled: page === pageNumber}">
      <a class="page-link" aria-label="Next" @click.prevent="emit('changePage', page < pageNumber ? page + 1 : pageNumber)">
        <span aria-hidden="true">»</span>
        <span class="sr-only">Další</span>
      </a>
    </li>
    <li class="ps-2" style="line-height: 24px;">Položek: <span class="text-black">{{ result?.result }}</span> | {{page }}/{{ pageNumber }}</li>
  </ul>
  </nav>
  </div>
</template>

<script setup lang="ts">
import {computed, defineProps, onActivated} from "vue";
import {DocumentNode} from "graphql/language";
import {useQuery} from "@vue/apollo-composable";

const emit = defineEmits(['changePage']);

const props = defineProps<{
  query: DocumentNode,
  page: number,
  onPage: number
}>();

const { result, loading, error, onError, onResult, refetch } = useQuery(props.query, {input: {page: props.page}});


const pageNumber = computed(function () {
  return result.value?.result ? Math.ceil(result.value?.result / props.onPage) : 1;
});

onActivated(() => {
  refetch();
});

</script>