<template>
  <BaseFormControl control="select" :nullable="true" v-bind="$attrs">
    <option v-if="prompt" value="">-- {{ prompt }} -- </option>
    <slot />
    <option v-for="(value, index) in values" :value="index" :key="index">{{ value }}</option>
  </BaseFormControl>
</template>

<script setup lang="ts">
import BaseFormControl from "./BaseFormControl.vue";
import {defineProps} from "vue";

const props = defineProps<{
  values: object
  prompt?: string
}>();

</script>