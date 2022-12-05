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
        <BaseForm ref="form" wrap="col-lg-6" :input="input" :test="test" :default-input="defaultInput" :disabled="loading" :rules="rules" :mutation="mutation" :vars-callback="callback" @success="success">
          <div class="row">
            <BaseFormInput wrap="col-lg-6" name="fullName" label="Název" />
            <BaseFormInput wrap="col-lg-6" name="role" label="Role" />
          </div>
          <br>
          <div class="form-wrapper-blue">
            <h5 class="card-title">Účet</h5>
            <div class="row">
              <BaseFormInput wrap="col-lg-6" name="login" label="Login" :path="['accounts', '0']" />
            </div>
            <div class="row mt-2">
              <BaseFormInput wrap="col-lg-6" name="password" label="Heslo" type="password" autocomplete="off" :path="['accounts', '0']" />
              <BaseFormInput wrap="col-lg-6" label="Heslo" type="password" autocomplete="off" :path="['accounts', '0']" />
            </div>
            <div class="row mt-2">
              <BaseFormInput wrap="col-lg-6" name="activeFrom" label="Platnost od" type="datetime-local" :path="['accounts', '0']" />
              <BaseFormInput wrap="col-lg-6" name="activeTo" label="Platnost do" type="datetime-local" :path="['accounts', '0']" />
            </div>
            <div class="row mt-2">
              <BaseFormInput wrap="col-lg-6" name="preferredMutation" label="Preferovana mutace" :path="['accounts', '0']" />
              <BaseFormCheckbox wrap="col-lg-6" name="active" label="Aktivní" :path="['accounts', 0]" />
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-lg-2">
              <BaseFormButton class="btn-success">Uložit</BaseFormButton>
            </div>
          </div>
        </BaseForm>
      </div>
    </template>
  </BasePageCard>
</template>

<script setup lang="ts">

import BasePageCard from "./BasePageCard.vue";
import BaseButtonBack from "./BaseButtonBack.vue";
import BaseButtonSave from "./BaseButtonSave.vue";
import {reactive, inject, onActivated, ref} from 'vue';
import BaseFormInput from "./BaseFormInput.vue";
import {required} from "@vuelidate/validators";
import BaseFormButton from "./BaseFormButton.vue";
import gql from "graphql-tag";
import {ToastPluginApi, useToast} from 'vue-toast-notification';
import {fetchInput, gqlAssignInput, gqlTagCreate, gqlTagOne, gqlTagUpdate} from "../utils/helpers";
import {DocumentNode} from "graphql/language";
import BaseForm from "./BaseForm.vue";
import {useLazyQuery, useMutation} from "@vue/apollo-composable";
import BaseFormCheckbox from "./BaseFormCheckbox.vue";


const defaultInput = {
  accounts: {'0': {}},
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


const select = gql`
  fragment Select on AdministratorOutput {
    uuid
    fullName
    accounts {
      uuid
      login
      activeFrom
      activeTo
      preferredMutation
      active
    }
  }
`;

const { load: loadUserQuery, onResult: onUserQueryDone, loading } = useLazyQuery(gqlTagOne('administrator', select));
props.id && loadUserQuery(undefined, {uuid: props.id});
onUserQueryDone((result) => gqlAssignInput(input, result.data.data))


const toast: ToastPluginApi = inject('toast', useToast());

const mutationAccount: DocumentNode = props.id ? gqlTagUpdate('administrator') : gqlTagCreate('administrator');

const { mutate, onError } = useMutation(mutationAccount);

const test = ref(1);

function success(result) {

  toast.success('uloženaao');

  const inputs2 = Object.assign({}, input);

  delete inputs2['accounts'];

  mutate({input: Object.assign(inputs2,{addAccounts: [result.data.data.uuid]},)});
  onError(error => console.error(error));
}


const callback = function (input: any) {

  return {input: input.accounts[0]};
}

const mutation: DocumentNode = props.id ? gqlTagUpdate('account') : gqlTagCreate('account');


</script>