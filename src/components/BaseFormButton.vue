<template>
  <button class="btn" type="submit" v-bind="$attrs">
    <span v-if="loading" class="spinner-grow spinner-grow-sm me-1" role="status" aria-hidden="true" />
    <slot />

    {{ form }}
  </button>   {{ validation.$invalid }}
</template>

<script setup lang="ts">
import {defineProps, inject, withDefaults} from 'vue';

const props = withDefaults(defineProps<{
  loading?: boolean
}>(), {loading: false});


const validation: any = inject('validation') as any;
const form: any = inject('form') as any;


</script>