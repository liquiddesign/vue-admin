<template>
  <BasePageTitle title="Role" icon="pe-7s-users" description="Přehled a správa administrátorských rolí">
    <button type="button" class="mr-3 btn btn-alternate">
      <i class="fa fa-life-saver"></i>
    </button>

    <button type="button" class="mr-3 btn btn-success ms-3" @click="$router.push({name: 'administratorsRolesCreate'})">
      <i class="fa fa-plus"></i> Přidat administrátora
    </button>
  </BasePageTitle>

  <BasePageTabs :tabs="{'administratorsUsers': 'Administrátoři', 'administratorsRoles': 'Role', 'administratorsLogs': 'Log přístupů'}" />


</template>

<script setup lang="ts">

import BasePageTabs from "./BasePageTabs.vue";
import BasePageTitle from "./BasePageTitle.vue";
</script>