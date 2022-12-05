<template>
  <AdministratorsUsersForm :id="$route.params.id" :key="$route.params.id" />
</template>

<script setup lang="ts">
import AdministratorsUsersForm from "./AdministratorsUsersForm.vue";

</script>