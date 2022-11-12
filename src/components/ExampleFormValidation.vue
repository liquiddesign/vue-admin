<template>
  <BaseForm :input="input" :rules="rules" >
    <div class="row">
      <BaseFormInput wrap="col-md-6" name="name" label="Povinné pole" />
      <BaseFormInput wrap="col-md-6" name="email" label="Povinné pole + e-mail" />
    </div>
  </BaseForm>
  <br>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import BaseForm from "./BaseForm.vue";
import BaseFormInput from "./BaseFormInput.vue";
import {required, email} from "@vuelidate/validators";

const input = reactive({
});

const rules = {
  name: {
    required
  },
  email: {
    required, email
  },
};

</script>