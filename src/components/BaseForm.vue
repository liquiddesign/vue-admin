<template>
  <form v-bind="$attrs" @submit.prevent="submit(v$)">
    <slot />
      {{ v$.$invalid }}
  </form>
</template>

<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
import {defineProps, provide, reactive, withDefaults} from 'vue';
import { useMutation } from '@vue/apollo-composable'
import {DocumentNode} from "graphql/language";


const props = withDefaults(defineProps<{
  rules?: object
  input: object
  name?: string
  disabled?: boolean,
  mutation?: DocumentNode
}>(), {name: 'frm', disabled: false});


const { mutate: createProduct, onDone, loading, error } = useMutation(props.mutation);


const formState = reactive( {name: props.name, disabled: props.disabled, loading: loading, error: error});

onDone(result => {
  console.log(result.data);
  // emit
});




const v$ = useVuelidate(props.rules ?? {}, props.input);
provide('validation', props.rules !== undefined ? v$ : null);

provide('input', props.input);
provide('form', formState);


function submit(val:any)
{
  val.$touch();

  if (!val.$invalid) {
    createProduct({ input: props.input });
  }
}




</script>