<template>
  <input type="text" :value="validation[name] ? validation[name].$model : inputs[name]" @input="change(validation, $event)">
  <span class="text-danger" v-for="(error, index) in validation[name]?.$errors" :key="index">
    {{ error.$message }}
  </span>
</template>

<script setup lang="ts">
import {defineProps, inject, ref} from 'vue';

const inputs: any = inject('inputs') as any;
const validation: any = inject('validation') as any;

const props = defineProps<{
  name: string
}>()

const name = ref(props.name);

function change(val: any, ev: any)
{

  if (val[props.name]) {

    val[props.name].$model = ev.target.value;
  } else {
    inputs[props.name] = ev.target.value;
  }
}


</script>