<template>
  <BaseForm :input="input" :rules="rules" :mutation="mutation" :query="query" @success="success">
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
  <br>
</template>

<script setup lang="ts">
import { reactive, inject } from 'vue';
import BaseForm from "./BaseForm.vue";
import BaseFormInput from "./BaseFormInput.vue";
import {required} from "@vuelidate/validators";
import BaseFormButton from "./BaseFormButton.vue";
import gql from "graphql-tag";
import {ToastPluginApi, useToast} from 'vue-toast-notification';

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

const toast: ToastPluginApi = inject('toast', useToast());

const id = null;

function success(result: any) {
  toast.success('uloženo');
}

const mutation = gql`
      mutation ($input: ${ !id ? 'ProductCreateInput' : 'ProductUpdateInput' }!) {
        data: ${ !id ? 'productCreate' : 'productUpdate' }(input: $input) {
            uuid
        }
      }
    `

const query = gql`
      query {
        data: productOne(uuid: "612ceb421461854717717823") {
          uuid
          name
        }
      }
    `

</script>