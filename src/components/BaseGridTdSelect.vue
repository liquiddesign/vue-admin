<template>
  <th class="minimal">
    <input v-model="$parent.selected[id]" type="checkbox" :class="{'form-check-input' : true}">
  </th>
</template>

<script setup lang="ts">
import {defineProps} from "vue";

defineProps<{
  id: string
}>();

</script>