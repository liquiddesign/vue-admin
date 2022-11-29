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
  defineProps, inject,
  provide,
  reactive,
  withDefaults
} from 'vue';
import {useMutation} from '@vue/apollo-composable'
import {DocumentNode} from "graphql/language";
import BaseWrapper from "./BaseWrapper.vue";
import {ToastPluginApi, useToast} from "vue-toast-notification";

const props = withDefaults(defineProps<{
  name?: string
  input: object
  defaultInput?: any
  rules?: object
  mutation: DocumentNode
  varsCallback?: (input: object) => object,
  wrap?: string
  disabled?: boolean,
  silent?: boolean
}>(), {name: 'frm', disabled: false, silent: false, defaultInput: {},  varsCallback: function (input: object) { return input},});

const toast: ToastPluginApi = inject('toast', useToast());

const { mutate: executeMutation, onDone, onError, loading, error } = useMutation(props.mutation);
const formState = reactive( {name: props.name, disabled: props.disabled, loading: loading, error: error});
const v$ = useVuelidate(props.rules ?? {}, props.input);

provide('validation', props.rules !== undefined ? v$ : null);
provide('input', props.input);
provide('form', formState);

defineExpose({submit, resetInput, loading, error});
const emit = defineEmits(['success', 'error']);

onDone(result => {
  emit('success', result);
});

onError(error => {
  emit('error', error);

  if (!props.silent) {
    toast.error(error.message);
  }
});


function submit()
{
  v$.value.$touch();

  if (!v$.value.$invalid && !formState.loading) {
    executeMutation(props.varsCallback(props.input));
    v$.value.$reset();
  }
}

function resetInput()
{
  Object.assign(props.input, props.defaultInput);
}


</script>