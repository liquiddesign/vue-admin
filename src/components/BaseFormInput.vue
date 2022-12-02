<template>
  <BaseFormControl control="input" v-bind="$attrs" :type="type" :path="path"  />
</template>

<script setup lang="ts">
import BaseFormControl from "./BaseFormControl.vue";
import {defineProps} from "vue";


const props = defineProps<{
  type?: string,
  path?: string[]|number[],
}>();

</script>