<template>
  <BasePageCard>
    <template #header>
      <div class="btn-actions-pane-left">
        <BaseButtonBack @click="$router.push({name: 'administratorsRoles'})" />
      </div>
      <div class="btn-actions-pane-right">
        <BaseButtonSave @click="redirect = null; $refs.form.submit()" />
      </div>
    </template>
    <template #body>
      <div class="row">

        <BaseEditForm ref="form" wrap="col-lg-6" :input="input" :default-input="defaultInput" :rules="rules" :mutation="mutation" :query="query" :id="id" @success="success">
          <div class="row">
            <BaseFormInput wrap="col-lg-6" name="name" label="Název" />
          </div>
          <div class="row mt-2">
            <div class="col-lg-2">
              <BaseFormButton class="btn-success">Uložit</BaseFormButton>
            </div>
          </div>
        </BaseEditForm>
      </div>
    </template>
  </BasePageCard>
</template>

<script setup lang="ts">

import BasePageCard from "./BasePageCard.vue";
import BaseButtonBack from "./BaseButtonBack.vue";
import BaseButtonSave from "./BaseButtonSave.vue";
import {reactive, inject, defineProps} from 'vue';
import BaseFormInput from "./BaseFormInput.vue";
import {required} from "@vuelidate/validators";
import BaseFormButton from "./BaseFormButton.vue";
import gql from "graphql-tag";
import {ToastPluginApi, useToast} from 'vue-toast-notification';
import BaseEditForm from "./BaseEditForm.vue";


const defaultInput = {
}

const props = defineProps<{
  id?: string
}>();

const input = reactive(Object.assign({}, defaultInput));

const rules = {
  name: {
    required
  },
};

const toast: ToastPluginApi = inject('toast', useToast());

function success(result: any) {
  toast.success('uloženaao');
}

const mutation = gql`
      mutation ($input: ${ !props.id ? 'AdminRoleCreateInput' : 'AdminRoleUpdateInput' }!) {
        data: ${ !props.id ? 'adminRoleCreate' : 'adminRoleUpdate' }(input: $input) {
            uuid
        }
      }
    `
const query = gql`
    query ($uuid: ID!) {
      data: adminRoleOne(uuid: $uuid) {
        uuid
        name
      }
    }
  `;

</script>