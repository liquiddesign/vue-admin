<template>
  <BasePageTitle title="Role" icon="pe-7s-users" description="Přehled a správa administrátorských rolí">
    <button type="button" class="mr-3 btn btn-success btn-sm ms-3" @click="$router.push({name: 'administratorsRolesCreate'})">
      <i class="fa fa-plus"></i> Přidat roli
    </button>
  </BasePageTitle>

  <BasePageTabs :tabs="{'administratorsUsers': 'Administrátoři', 'administratorsRoles': 'Role'}" />

  <BasePageCard>
    <template #body>
      <BaseGrid ref="grid" :query="mainQuery" :page="page" :onPage="onPage" :delete="deleteMutation">
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
            <td>{{ item.name }}</td>
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
import BaseGridThReaload from "./BaseGridThReload.vue";
import BaseGridTdSelect from "./BaseGridTdSelect.vue";
import BaseGridThSelect from "./BaseGridThSelect.vue";
import BaseGridPaginator from "./BaseGridPaginator.vue";
import {ref} from "vue";
import {gqlTagMany} from "../utils/helpers";

const page = ref(1);
const onPage = ref(10);

const select = gql`
  fragment Select on AdminRoleManyOutput {
    data {
      uuid
      name
    }
  }
`;

const {mainQuery, pagingQuery, deleteMutation} = gqlTagMany('adminRole', select);


</script>