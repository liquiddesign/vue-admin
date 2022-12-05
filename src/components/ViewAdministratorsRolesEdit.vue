<template>
  <AdministratorsRolesForm :id="$route.params.id" :key="$route.params.id" />
</template>

<script setup lang="ts">
import AdministratorsRolesForm from "./AdministratorsRolesForm.vue";

</script>