<template>

  <BaseForm :rules="rules" :inputs="inputs">
    <BaseFormInput name="number" /><br>
    <BaseFormInput name="test" /><br>
    <BaseFormInput name="nested-name" /><br>
  </BaseForm>

  <BaseForm :rules="rules2" :inputs="inputs2">
    <BaseFormInput name="aaa" /><br>
    <BaseFormInput name="cccc" /><br>
  </BaseForm>
</template>

<script setup lang="ts">
import {required} from "@vuelidate/validators";
import { reactive } from 'vue';
import BaseForm from "./BaseForm.vue";
import BaseFormInput from "./BaseFormInput.vue";

const rules = {
  number: {
    required,
  },
};

const inputs = reactive({
  number: 1,
  test: 'xxx',
  nested: {
    name: 'aa',
  }
});

const rules2 = {
  cccc: {
    required,
  },
};

const inputs2 = reactive({
  aaa: 'xx',
  cccc: 'aaa',
});


</script>