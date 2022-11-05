<template>
  FORMULAR:
  <slot />
</template>

<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
import {defineProps, provide} from 'vue';

const props = defineProps<{
  rules: object
  inputs: object
}>()

const v$ = useVuelidate(props.rules, props.inputs);

provide('validation', v$);
provide('inputs', props.inputs);

</script>