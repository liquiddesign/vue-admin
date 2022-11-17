<template>
  <BasePageTitle title="Role" icon="pe-7s-users" description="Přehled a správa administrátorských rolí">
    <button type="button" class="mr-3 btn btn-sm btn-alternate">
      <i class="fa fa-life-saver"></i>
    </button>

    <button type="button" class="mr-3 btn btn-success btn-sm ms-3" @click="$router.push({name: 'administratorsRolesCreate'})">
      <i class="fa fa-plus"></i> Přidat roli
    </button>
  </BasePageTitle>

  <BasePageTabs :tabs="{'administratorsUsers': 'Administrátoři', 'administratorsRoles': 'Role', 'administratorsLogs': 'Log přístupů'}" />

  <BasePageCard>
    <template #body>
      <BaseGrid ref="grid" :query="query" :delete="mutation">
        <template #header>
          <tr>
            <BaseGridThSelect />
            <th>ID</th>
            <BaseGridTh class="text-center"> <i class="fa fa-edit" /></BaseGridTh>
            <th>Název</th>
            <BaseGridThReaload />
          </tr>
        </template>
        <template #body="{item, deleteRow, selected, index}">
          <tr :class="{active: selected[item.uuid]}">
            <BaseGridTdSelect :id="item.uuid" />
            <td class="minimal">{{ index }}</td>
            <td class="minimal"><BaseGridButtonEdit :route="{name: 'administratorsRolesEdit', params: {id: item.uuid}}" /></td>
            <td>{{ item.name }}</td>
            <td class="minimal"><BaseGridButtonDelete @click="deleteRow"/></td>
          </tr>
        </template>
      </BaseGrid>
    </template>
  </BasePageCard>

</template>

<script setup lang="ts">

import BasePageTitle from "./BasePageTitle.vue";
import BasePageTabs from "./BasePageTabs.vue";
import BasePageCard from "./BasePageCard.vue";
import BaseGrid from "./BaseGrid.vue";
import gql from "graphql-tag";
import BaseGridButtonEdit from "./BaseGridButtonEdit.vue";
import BaseGridTh from "./BaseGridTh.vue";
import BaseGridButtonDelete from "./BaseGridButtonDelete.vue";
import BaseGridThReaload from "./BaseGridThReaload.vue";
import BaseGridTdSelect from "./BaseGridTdSelect.vue";
import BaseGridThSelect from "./BaseGridThSelect.vue";

const query = gql`
  query ($input: ManyInput!) {
    result:roleMany(manyInput: $input) {
      data {
        uuid,
        name,
      }
    }
  }
`

const mutation = gql`
      mutation ($uuid: [ID]!) {
        roleDelete(uuid: $uuid)
      }
    `

</script>