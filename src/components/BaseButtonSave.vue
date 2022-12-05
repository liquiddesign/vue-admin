<template>
  <BaseWrapper :wrap="wrap">
    <button v-bind="$attrs" class="btn btn-light btn-sm">
      <i class="fa fa-save" />
      <slot />
    </button>
  </BaseWrapper>
</template>
<script setup lang="ts">
import BaseWrapper from "./BaseWrapper.vue";
</script>