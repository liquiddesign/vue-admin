<template>
  <BaseFormControl control="input" v-bind="$attrs" :type="type" :path="path"  />
</template>

<script setup lang="ts">
import BaseFormControl from "./BaseFormControl.vue";
import {defineProps, inject} from "vue";


const props = defineProps<{
  type?: string,
  path?: string[]|number[],
}>();

const form: any = inject('form') as any;


</script>