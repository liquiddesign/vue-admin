<template>
  <div class="mb-3 card">
    <div class="card-body">
      <h5>1. Akce</h5>
      <div class="row">
        <div class="col-md-6">
          <ExampleFormActions />
        </div>
      </div>
      <br>
      <h5>2. Formulářové prvky</h5>
      <div class="row">
        <div class="col-md-6">
          <ExampleFormBasic />
        </div>
      </div>
      <hr>
      <h5>3. Validace</h5>
      <div class="row">
        <div class="col-md-6">
          <ExampleFormValidation />
        </div>
      </div>
      <hr>
      <h5>4. Zanořování a konteinery</h5>
      <div class="row">
        <div class="col-md-6">
          <ExampleFormAdvanced />
        </div>
      </div>
    </div>
  </div>


</template>

<script setup lang="ts">

import ExampleFormBasic from "./ExampleFormBasic.vue";
import TestForm from "./TestForm.vue";
import ExampleFormAdvanced from "./ExampleFormAdvanced.vue";
import ExampleFormValidation from "./ExampleFormValidation.vue";
import ExampleFormActions from "./ExampleFormActions.vue";

</script>