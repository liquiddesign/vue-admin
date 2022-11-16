<template>
  <ul class="body-tabs body-tabs-layout tabs-animated body-tabs-animated nav">
    <li v-for="(tab, link) in tabs" :key="link"  class="nav-item">
      <a href="#" role="tab" class="nav-link" :class="{active: link === $route.name}" data-toggle="tab" @click.prevent="$router.push({name: link})">
        <span>{{ tab }}</span>
      </a>
    </li>
  </ul>
</template>

<script setup lang="ts">

import {defineProps} from "vue";

defineProps<{
  tabs: object
}>();

</script>