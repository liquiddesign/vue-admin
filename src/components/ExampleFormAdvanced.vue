<template>
  <BaseForm :input="input" :rules="rules">
    <div class="row">
      <BaseFormInput wrap="col-md-6" name="login" :path="['account']" />
      <BaseFormInput wrap="col-md-6" name="password" :path="['account']" />
    </div>
    <br>
    <h5 class="card-title-lower">Dynamické přidávání</h5>
    <div class="row mt-2" v-for="(i,index) in input.list" :key="index">
      <div class="col-md-5">
        <BaseFormInput name="name" :path="['list', index]" />
      </div>
      <div class="col-md-5">
        <BaseFormInput name="amount" :path="['list', index]" />
      </div>
      <div class="col-md-2">
        <a href="#" @click.prevent="input.list.splice(index, 1)">X</a>
      </div>
    </div>
    <button type="button" class="mt-4"  @click="input.list.push({amount: 5, name: '',}); rules.list[input.list.length - 1] = {name: {required}}">Přidat</button>
  </BaseForm>
  <br>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import BaseForm from "./BaseForm.vue";
import BaseFormInput from "./BaseFormInput.vue";
import {required} from "@vuelidate/validators";

const input = reactive({
  account: {login: 'defaultni-hodnota'},
  list: [{amount: 1, name: 'prvni hodnota',}],
});

const rules = reactive({
  list: {
  },
});



</script>