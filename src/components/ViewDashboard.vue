<template>

  <h4>Dashboard</h4>
  <p>Ukázka tabulky s 💫 LqGrAphi:</p>

  Filter:


  <BaseForm :input="filters">
    <BaseFormCheckbox name="hidden" />
    <BaseFormInput name="q" />
  </BaseForm>

  <BaseGrid :query="query" :page="page" :filters="filters" />











  PAGE: {{ page }} |
  <button @click="page=1">1</button>
  <button @click="page=2">2</button>
  <button @click="page=3">3</button>

</template>

<script setup lang="ts">
import BaseGrid from "./BaseGrid.vue";
import gql from "graphql-tag";
import { ref, reactive } from 'vue';
import BaseForm from "./BaseForm.vue";
import BaseFormCheckbox from "./BaseFormCheckbox.vue";
import BaseFormInput from "./BaseFormInput.vue";


const page = ref(1);
const filters = reactive({});

const query = gql`
  fragment ProductItem on ProductOutput {
    uuid,
    name,
    code,
  }
  query Products ($input: ManyInput!) {
    result:productMany(manyInput: $input) {
      data {
        ...ProductItem
      },
      onPageCount
    }
  }
`

</script>