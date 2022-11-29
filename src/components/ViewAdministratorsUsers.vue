<template>
  <BasePageTitle title="Role" icon="pe-7s-users" description="Přehled a správa administrátorských rolí">

    <button type="button" class="mr-3 btn btn-success ms-3" @click="$router.push({name: 'administratorsRolesCreate'})">
      <i class="fa fa-plus"></i> Přidat administrátora
    </button>
  </BasePageTitle>

  <BasePageTabs :tabs="{'administratorsUsers': 'Administrátoři', 'administratorsRoles': 'Role'}" />
  <BasePageCard>
    <template #body>
      <BaseGrid ref="grid" :query="query" :page="page" :onPage="onPage" :delete="mutation">
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
            <td class="minimal">{{ index + (page - 1) * onPage + 1 }}</td>
            <td class="minimal"><BaseGridButtonEdit :route="{name: 'administratorsRolesEdit', params: {id: item.uuid}}" /></td>
            <td>{{ item.fulName }}</td>
            <td class="minimal"><BaseGridButtonDelete @click="deleteRow"/></td>
          </tr>
        </template>
      </BaseGrid>
      <BaseGridPaginator :query="pagingQuery" :page="page" :on-page="onPage" @change-page="page = $event"/>
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
import BaseGridPaginator from "./BaseGridPaginator.vue";
import {ref} from "vue";

const page = ref(1);
const onPage = ref(10);

const query = gql`
  query ($input: ManyInput!) {
    result:administratorMany(manyInput: $input) {
      data {
        uuid,
        fullName,
      }
    }
  }
`;

const pagingQuery = gql`
  query ($input: ManyInput!) {
    result:administratorManyTotalCount(manyInput: $input)
  }
`;

const mutation = gql`
      mutation ($uuid: [ID]!) {
        administratorDelete(uuid: $uuid)
      }
`;

</script>