<template>
  <BasePageCard>
    <template #header>
      <BaseButtonBack wrap="btn-actions-pane-left" @click="$router.push({name: 'administratorsRoles'})" />
      <BaseButtonSave wrap="btn-actions-pane-righ" @click="redirect = null; $refs.form.submit()" />
    </template>
    <template #body>
      <div class="row">
        <BaseForm ref="form" wrap="col-lg-6" :input="input" :disabled="loading" :vars-callback="input => ({input})" :default-input="defaultInput" :rules="rules" :mutation="mutation" @success="success">
          <div class="row">
            <BaseFormInput wrap="col-lg-6" name="name" label="Název" />
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
import {reactive} from 'vue';
import BaseFormInput from "./BaseFormInput.vue";
import {required} from "@vuelidate/validators";
import BaseFormButton from "./BaseFormButton.vue";
import {gqlAssignInput, gqlTagCreate, gqlTagOne, gqlTagUpdate} from "../utils/helpers";
import BaseForm from "./BaseForm.vue";
import {DocumentNode} from "graphql/language";
import {useLazyQuery} from "@vue/apollo-composable";
import gql from "graphql-tag";

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

const mutation: DocumentNode = props.id ? gqlTagUpdate('adminRole') : gqlTagCreate('adminRole');

const select = gql`
  fragment Select on AdminRoleOutput {
    uuid
    name
  }
`;

const { load: loadUserQuery, onResult: onUserQueryDone, loading } = useLazyQuery(gqlTagOne('adminRole', select));
props.id && loadUserQuery(undefined, {uuid: props.id});
onUserQueryDone((result) => gqlAssignInput(input, result.data.data))


</script>