<template>
  <BaseWrapper :wrap="$attrs.wrap">
    <BaseFormControl v-for="(value, index) in values" control="checkbox" :name="index" :label="value" :inline="true" v-bind="$attrs" :wrap="null" :key="index" />
  </BaseWrapper>
</template>

<script setup lang="ts">
import BaseFormControl from "./BaseFormControl.vue";
import BaseWrapper from "./BaseWrapper.vue";

import {defineProps} from "vue";

const props = defineProps<{
  values: object
}>();


// props

</script>