<template>
  <h5>1. validation</h5>
  <BaseForm name="test" :rules="rules" :input="input">
    <BaseFormInput name="number" /><br>
    <BaseFormInput name="test" /><br>
  </BaseForm>

  2. control states

  3. form states

  4. nesting

  5. dynamic

  6. ommiting fields

  7. ommiting controls

  8. float int null

  9. field relation
</template>

<script setup lang="ts">
import {required} from "@vuelidate/validators";
import { reactive } from 'vue';
import BaseForm from "./BaseForm.vue";
import BaseFormInput from "./BaseFormInput.vue";

const rules = reactive({
  number: {
    required,
  },
});

const input = reactive({
  number: 1,
  test: 'xxx',
  nested: {
    name: 'aa',
  }
});

</script>