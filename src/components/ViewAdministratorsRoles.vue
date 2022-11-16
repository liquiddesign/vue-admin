<template>
  <BasePageTitle title="Role" icon="pe-7s-users" description="Přehled a správa administrátorských rolí">
    <button type="button" class="mr-3 btn btn-alternate">
      <i class="fa fa-life-saver"></i>
    </button>

    <button type="button" class="mr-3 btn btn-success ms-3">
      <i class="fa fa-plus"></i> Přidat roli
    </button>
  </BasePageTitle>

  <BasePageTabs :tabs="{'administratorsUsers': 'Administrátoři', 'administratorsRoles': 'Role', 'administratorsLogs': 'Log přístupů'}" />

  <BasePageCard>
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
          <td class="minimal"><BaseGridButtonEdit :route="{name: 'administratorsRoleEdit', params: {id: item.uuid}}" /></td>
          <td>{{ item.name }}</td>
          <td class="minimal"><BaseGridButtonDelete @click="deleteRow"/></td>
        </tr>
      </template>
    </BaseGrid>
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

function test(test) {
  console.log(test)
}

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