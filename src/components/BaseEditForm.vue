<template>
  <BaseForm v-bind="props">
    <slot />
  </BaseForm>

</template>
<script setup lang="ts">
import BaseForm from "./BaseForm.vue";
import {defineProps, onActivated, reactive, withDefaults} from "vue";
import {useQuery} from "@vue/apollo-composable";
import {DocumentNode} from "graphql/language";

const props = withDefaults(defineProps<{
  name?: string
  input: object
  defaultInput?: any
  rules?: object
  mutation: DocumentNode
  varsCallback?: (input: object) => object,
  wrap?: string
  disabled?: boolean,
  silent?: boolean,
  id?: string|null
  query?: DocumentNode|null
}>(), {name: 'frm', disabled: false, silent: false, defaultInput: {},  varsCallback: function (input: object) { return {input}},});

const remoteData = reactive({result: {}});

onActivated(() => {

  if (props.id && props.query) {
    Object.assign(props.input, props.defaultInput);
    const { onResult: onFetchResult, onError: onFetchError, result } = useQuery(props.query, {'uuid': props.id});

    remoteData.result = result;

    onFetchResult(result => {
      // @TODO: object assign deep
      console.log(result);
      const test = Object.assign({}, result.data.data);
      delete test['__typename'];
      Object.assign(props.input,test);
    });

    onFetchError(error => {
      alert('fetch')
    });
  }
});

</script>