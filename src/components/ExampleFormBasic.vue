<template>
  <BaseForm name="test" :input="input">
    <div class="row">
      <BaseFormInput wrap="col-md-6" name="testNumber" type="number" label="Číslo - Integer" />
      <BaseFormInput wrap="col-md-6" name="testFloat" type="float" label="Číslo - Float" />
    </div>
    <div class="row mt-2">
      <BaseFormInput wrap="col-md-6" name="testString" label="Řetěze" />
      <BaseFormInput wrap="col-md-6" name="testStringNullable" :nullable="true" label="Řetězec - s null místo prázdného stringu" />
    </div>
    <div class="row mt-2">
      <BaseFormTextArea  wrap="col-md-12" name="testRichText" label="Textarea" />
    </div>
    <div class="row mt-2">
      <BaseFormCheckbox name="check" label="Zaškrtávátko" />
    </div>
    <div class="row mt-2">
      <BaseFormSelect name="select" :values="{'a':'a','b':'b','c':'c','d':'d'}" prompt="Zvolte" />
    </div>
    <div class="row mt-3">
      <BaseFormRadio name="radio" wrap="col-md-12" :values="{'a':'a','b':'b','c':'c','d':'d'}" />
    </div>
    <div class="row mt-3">
      <BaseFormCheckList wrap="col-md-12" :values="{'a':'a','b':'b','c':'c','d':'d'}" />
    </div>
    <div class="row mt-2">
      <BaseFormInput wrap="col-md-6" name="master" type="number" label="Řídící prvek" @change="input.slave++"/>
      <BaseFormInput wrap="col-md-6" name="slave" type="number" label="Závyslí prvek" />
    </div>
    <div class="row mt-2">
      <BaseFormInput wrap="col-md-6" :value="input.slave + 1" type="number" label="Vynechání prvku z dat" />
    </div>
    <div class="row mt-4">
      <div class="col-md-6">
        <label>Vlastní label VS prázdný label</label>
        <BaseFormInput />
      </div>
      <BaseFormInput wrap="col-md-6" label="" />
    </div>
  </BaseForm>
  <br>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import BaseForm from "./BaseForm.vue";
import BaseFormInput from "./BaseFormInput.vue";
import BaseFormTextArea from "./BaseFormTextArea.vue";
import BaseFormRadio from "./BaseFormRadio.vue";
import BaseFormCheckbox from "./BaseFormCheckbox.vue";
import BaseFormSelect from "./BaseFormSelect.vue";
import BaseFormCheckList from "./BaseFormCheckList.vue";

const input = reactive({
  testNumber: 0,
  testFloat: 5.1,
  testString: '',
  testStringNullable: null,
  radio: 'c',
  slave: 1,
});


</script>