<template>
  <form v-bind="$attrs" @submit.prevent="submit(v$)">
    <slot />
  </form>
</template>

<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
import {defineEmits, defineProps, onMounted, provide, reactive, ref, withDefaults} from 'vue';
import {useMutation, useQuery} from '@vue/apollo-composable'
import {DocumentNode} from "graphql/language";

const emit = defineEmits(['success', 'error']);

const props = withDefaults(defineProps<{
  rules?: object
  input: object
  name?: string
  disabled?: boolean,
  mutation?: DocumentNode
  query?: DocumentNode
}>(), {name: 'frm', disabled: false});


const { mutate: createProduct, onDone, onError, loading, error } = useMutation(props.mutation);


const remoteData = reactive({result: {}});

const formState = reactive( {name: props.name, disabled: props.disabled, loading: loading, error: error});

onDone(result => {
  emit('success', result);
  alert('ok');
});

onError(error => {
  emit('error', error);
  alert(error.message);
});

const v$ = useVuelidate(props.rules ?? {}, props.input);
provide('validation', props.rules !== undefined ? v$ : null);

provide('input', props.input);
provide('form', formState);


function submit(val:any)
{
  val.$touch();
  if (!val.$invalid && !formState.loading) {
    createProduct({ input: props.input });
  }
}

onMounted(() => {
  if (props.query) {
    const { onResult, onError: onFetchError, result } = useQuery(props.query);

    remoteData.result = result;

    onResult(result => {
      // @TODO: object assign deep
      delete result.data.data['__typename'];
      Object.assign(props.input, result.data.data);
    });

    onFetchError(error => {
      alert('error');
    });
  }
});




</script>