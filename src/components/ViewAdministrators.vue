<template>
  <div class="app-page-title">
    <div class="page-title-wrapper">
      <div class="page-title-heading">
        <div class="page-title-icon">
          <i class="pe-7s-users icon-gradient bg-ripe-malin"></i>
        </div>
        <div>Administrátoři
          <div class="page-title-subheading">Přehled a správa administrátorů, administrátorských rolí a administračních logů.</div>
        </div>
      </div>
      <div class="page-title-actions">
        <button type="button" data-toggle="tooltip" title="" data-placement="bottom" class="mr-3 btn btn-alternate" data-original-title="Example Tooltip">
          <i class="fa fa-life-saver"></i>
        </button>

        <button type="button" data-toggle="tooltip" title="" data-placement="bottom" class="mr-3 btn btn-success ms-3" data-original-title="Example Tooltip">
          <i class="fa fa-plus"></i> Přidat roli
        </button>

      </div>
    </div>
  </div>
  <ul class="body-tabs body-tabs-layout tabs-animated body-tabs-animated nav">
    <li class="nav-item">
      <a href="#" role="tab" class="nav-link active" data-toggle="tab" >
        <span>Administrátoři</span>
      </a>

    </li>
    <li class="nav-item">
      <a href="#" role="tab" class="nav-link" data-toggle="tab" >
        <span>Role</span>
      </a>
    </li>
    <li class="nav-item">
      <a href="#" role="tab" class="nav-link" data-toggle="tab" >
        <span>Historie akcí</span>
      </a>
    </li>
  </ul>

  <div class="mb-3 card">
    <div class="card-body">
      <BaseForm :input="input" :mutation="mutation">
        <div class="row">
          <BaseFormInput wrap="col-md-6" name="name" label="Název" />
        </div>
        <div class="row mt-2">
          <div class="col-md-2">
            <BaseFormButton class="btn-success">Uložit</BaseFormButton>
          </div>
        </div>
      </BaseForm>


      <BaseGrid :query="query">
        <template #header>
          <tr>
            <th>id</th>
            <th>name</th>
          </tr>
        </template>
        <template #body="{item}">
          <tr>
            <td>{{ item.uuid }}</td>
            <td>{{ item.name }}</td>
          </tr>
        </template>
      </BaseGrid>

      <div class="d-inline-block me-3 " id="example_length"><select name="example_length" aria-controls="example" class="custom-select custom-select-sm form-control form-control-sm"><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select></div>
      <nav class="d-inline-block" aria-label="Page navigation example">
        <ul class="pagination pagination-sm">
          <li class="page-item">
            <a href="javascript:void(0);" class="page-link" aria-label="Previous">
              <span aria-hidden="true">«</span>
              <span class="sr-only">Previous</span>
            </a>
          </li>
          <li class="page-item">
            <a href="javascript:void(0);" class="page-link">1</a>
          </li>
          <li class="page-item">
            <a href="javascript:void(0);" class="page-link">2</a>
          </li>
          <li class="page-item">
            <a href="javascript:void(0);" class="page-link">3</a>
          </li>
          <li class="page-item">
            <a href="javascript:void(0);" class="page-link">4</a>
          </li>
          <li class="page-item">
            <a href="javascript:void(0);" class="page-link">5</a>
          </li>
          <li class="page-item">
            <a href="javascript:void(0);" class="page-link" aria-label="Next">
              <span aria-hidden="true">»</span>
              <span class="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </nav>

    </div>
  </div>

</template>
<script setup lang="ts">
import BaseGrid from "./BaseGrid.vue";
import BaseFormButton from "./BaseFormButton.vue";
import BaseFormInput from "./BaseFormInput.vue";
import BaseForm from "./BaseForm.vue";
import gql from "graphql-tag";
import {reactive} from "vue";

const query = gql`
  query Roles ($input: ManyInput!) {
    result:roleMany(manyInput: $input) {
      data {
        uuid,
        name
      }
    }
  }
`

const input = reactive({});

const mutation = gql`
      mutation ($input: RoleCreateInput!) {
        data: roleCreate(input: $input) {
            uuid
        }
      }
    `
</script>