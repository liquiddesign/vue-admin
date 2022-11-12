<template>
  <BaseWrapper :wrap="$attrs.wrap">
    <BaseFormControl v-for="(value, index) in values" control="radio" name="radio" :value="index" :label="value" v-bind="$attrs" :inline="true" :wrap="null" :key="index"/>
  </BaseWrapper>
</template>

<script setup lang="ts">
import BaseWrapper from "./BaseWrapper.vue";
import BaseFormControl from "./BaseFormControl.vue";

import {defineProps} from "vue";

const props = defineProps<{
  values: object
}>();

</script>