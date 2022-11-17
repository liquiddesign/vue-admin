<template>
  <BaseWrapper :wrap="wrap">
    <form v-bind="$attrs" @submit.prevent="submit">
      <slot />
    </form>
  </BaseWrapper>
</template>

<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
import {
  defineEmits,
  defineExpose,
  defineProps,
  onActivated,
  onMounted,
  provide,
  reactive,
  ref,
  withDefaults
} from 'vue';
import {useMutation, useQuery} from '@vue/apollo-composable'
import {DocumentNode} from "graphql/language";
import BaseWrapper from "./BaseWrapper.vue";

const emit = defineEmits(['success', 'error']);
defineExpose({submit});

const props = withDefaults(defineProps<{
  rules?: object
  input: object
  defaultInput?: any
  name?: string
  wrap?: string
  disabled?: boolean,
  mutation?: DocumentNode
  query?: DocumentNode|null
  id?: string|null
}>(), {name: 'frm', disabled: false, defaultInput: {}});


const { mutate: createProduct, onDone, onError, loading, error } = useMutation(props.mutation);


const remoteData = reactive({result: {}});

const formState = reactive( {name: props.name, disabled: props.disabled, loading: loading, error: error});

onDone(result => {
  emit('success', result);
});

onError(error => {
  emit('error', error);
});

const v$ = useVuelidate(props.rules ?? {}, props.input);
provide('validation', props.rules !== undefined ? v$ : null);

provide('input', props.input);
provide('form', formState);


function submit()
{
  //console.log(v$.value.$invalid);//.$touch();

  v$.value.$touch();
  if (!v$.value.$invalid && !formState.loading) {
    createProduct({ input: props.input });
    v$.value.$reset();
    if (!props.query || !props.id) {
      Object.assign(props.input, props.defaultInput);
    }

  }
}

onActivated(() => {

  if (props.id && props.query) {
    Object.assign(props.input, props.defaultInput);
    const { onResult, onError: onFetchError, result } = useQuery(props.query, {'uuid': props.id});

    remoteData.result = result;

    onResult(result => {
      // @TODO: object assign deep
      console.log(result);
      const test = Object.assign({}, result.data.data);
      delete test['__typename'];
      Object.assign(props.input,test);
    });

    onFetchError(error => {
    });
  }
});




</script>