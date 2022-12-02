<template>
  <BasePageCard>
    <template #header>
      <div class="btn-actions-pane-left">
        <BaseButtonBack @click="$router.push({name: 'administratorsUsers'})" />
      </div>
      <div class="btn-actions-pane-right">
        <BaseButtonSave @click="redirect = null; $refs.form.submit()" />
      </div>
    </template>
    <template #body>
      <div class="row">

        <BaseEditForm ref="form" wrap="col-lg-6" :input="input" :default-input="defaultInput" :rules="rules" :mutation="mutation" :query="query" :id="id" @success="success">
          <div class="row">
            <BaseFormInput wrap="col-lg-6" name="fullName" label="Název" />
            <BaseFormInput wrap="col-lg-6" name="role" label="Role" />
          </div>
          <br>
          <div class="form-wrapper-blue">
            <h5 class="card-title">Účet</h5>
            <div class="row">
              <BaseFormInput wrap="col-lg-6" name="login" label="Login" :path="['accounts']" />
            </div>
            <div class="row mt-2">
              <BaseFormInput wrap="col-lg-6" name="password" label="Heslo" type="password" :path="['accounts']" />
              <BaseFormInput wrap="col-lg-6" name="password" label="Heslo" type="password" :path="['accounts']" />
            </div>
            <div class="row mt-2">
              <BaseFormInput wrap="col-lg-6" name="activeFrom" label="Platnost od" type="datetime-local" :path="['accounts']" />
              <BaseFormInput wrap="col-lg-6" name="activeTo" label="Platnost do" type="datetime-local" :path="['accounts']" />
            </div>
            <div class="row mt-2">
              <BaseFormInput wrap="col-lg-6" name="preferredMutation" label="Preferovana mutace" :path="['accounts']" />
              <BaseFormInput wrap="col-lg-6" name="active" label="Aktivní" :path="['accounts']" />
            </div>
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
  accounts: {},
}

const props = defineProps<{
  id?: string
}>();

const input = reactive(Object.assign({}, defaultInput));

const rules = {
  fullName: {
    required
  },
};

const toast: ToastPluginApi = inject('toast', useToast());

function success(result: any) {
  toast.success('uloženaao');
}

//$helpers.createQqlMutation('administrator', 'update')
//$helpers.createQqlQuery('administrator', fragment)

/*
const mutations = ['user' => '', 'account' => ''];

const callback = function (inputs, mutationName) {
  if () {

  }

  return;
}*/

const mutation = gql`
      mutation ($input: ${ !props.id ? 'AdministratorCreateInput' : 'AdministratorUpdateInput' }!) {
        data: ${ !props.id ? 'administratorCreate' : 'administratorUpdate' }(input: $input) {
            uuid
        }
      }
    `
const query = gql`
    query ($uuid: ID!) {
      data: administratorOne(uuid: $uuid) {
        uuid
        name
      }
    }
  `;

</script>