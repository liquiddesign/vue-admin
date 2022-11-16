<template>
  <button class="btn btn-xs btn-success me-1" @click="$router.push(route)">
    <i class="fa fa-edit" />
    <slot />
  </button>
</template>

<script setup lang="ts">
import {defineProps} from "vue";

defineProps<{
  route: object
}>();

</script>