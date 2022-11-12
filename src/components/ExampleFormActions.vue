<template>
  <BaseForm :input="input" :rules="rules" :mutation="mutation">
    <div class="row">
      <BaseFormInput wrap="col-md-6" name="name" label="Název" />
      <BaseFormInput wrap="col-md-6" name="vatRate" label="Popis" />
    </div>
    <div class="row mt-2">
      <div class="col-md-2">
        <BaseFormButton class="btn-success">Uložit</BaseFormButton>
      </div>
    </div>
  </BaseForm>


  disabled
  send
  button states, loading
  inputs states
  <br>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import BaseForm from "./BaseForm.vue";
import BaseFormInput from "./BaseFormInput.vue";
import {required} from "@vuelidate/validators";
import BaseFormButton from "./BaseFormButton.vue";
import gql from "graphql-tag";

const input = reactive({
});

const rules = {
  name: {
    required
  },
  vatRate: {
    required
  },
};

const id = null;

const mutation = gql`
      mutation ($input: ${ !id ? 'ProductCreateInput' : 'ProductUpdateInput' }!) {
        data: ${ !id ? 'productCreate' : 'productUpdate' }(input: $input) {
            uuid
        }
      }
    `

</script>