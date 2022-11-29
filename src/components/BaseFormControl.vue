<template>
  <BaseWrapper :wrap="wrap">
    <BaseWrapper :wrap="{'form-group position-relative': true,'d-inline-block me-2': inline}">
      <input v-if="control === 'checkbox'" :id="id" v-bind="$attrs" type="checkbox" :checked="value" :class="controlClass" :disabled="form.disabled || form.loading" @input="change(validation, $event)">
      <input v-if="control === 'radio'" :id="id" v-bind="$attrs" type="radio" :checked="value" :class="controlClass" :disabled="form.disabled || form.loading" @input="change(validation, $event)">
      <label v-if="label !== null" :class="labelClass" :for="id">{{ label }}</label>
      <textarea v-if="control === 'textarea'" :id="id" v-bind="$attrs" :class="controlClass" :disabled="form.disabled || form.loading"  @input="change(validation, $event)">{{ value }}</textarea>
      <input v-if="control === 'input'" :id="id" v-bind="$attrs" :type="htmlType" :value="value" :class="controlClass" :disabled="form.disabled || form.loading" @input="change(validation, $event)">
      <select v-if="control === 'select'" :id="id" v-bind="$attrs" :class="controlClass" :value="value" :disabled="form.disabled || form.loading" @input="change(validation, $event)"><slot /></select>
      <div v-if="validation" class="text-danger" v-for="(error, index) in errors(validation)" :key="index">
        {{ error.$message }}
      </div>
    </BaseWrapper>
  </BaseWrapper>
</template>

<script setup lang="ts">
import {defineProps, withDefaults, inject, ref, computed} from 'vue';
import BaseWrapper from "./BaseWrapper.vue";

const input: any = inject('input') as any;
const validation: any = inject('validation') as any;
const form: any = inject('form') as any;

const props = withDefaults(defineProps<{
  control: string
  name?: string
  value?: string|number
  type?: string
  label?: string|null
  wrap?: string
  nullable?: boolean|null,
  path?: string[]|number[],
  inline?: boolean
}>(), { type: 'text', label: null, nullable: null, inline: false });

const emit = defineEmits(['change']);

const name = ref(props.name);
const htmlType = ref(props.type);
const isInvalid = ref(false);

const path: string[]|number[] = props.path === undefined ? [] : props.path;

const nullable = props.nullable !== null ? props.nullable : ['number', 'float'].includes(props.type);

const id = computed(function() {
  let aux = form.name;

  path.forEach((pathItem) => aux += '-' + pathItem)

  return aux + '-' + name.value + (props.control === 'radio' ? '-' + props.value : '');
});

const controlClass = computed( function () {
  if (props.control === 'checkbox' || props.control === 'radio') {
    return {'form-check-input' : true, 'is-invalid': isInvalid.value}
  }

  if (props.control === 'select') {
    return {'form-select' : true, 'form-select-sm' :true, 'form-control' : true, 'is-invalid': isInvalid.value}
  }

  return {'form-control-sm' : true, 'form-control' :true, 'is-invalid': isInvalid.value}
});

const labelClass = computed( function () {
  if (props.control === 'checkbox' || props.control === 'radio') {
    return {'form-check-label' : true, 'ps-1' : true}
  }

  return {};
});



const value = computed(function() {
  if (props.value !== undefined && props.control !== 'radio') {
    return props.value;
  }

  let ref = input;
  path.forEach((pathItem) => ref = ref[pathItem])

  if (props.control === 'radio') {
    return props.value === ref[name.value];
  } else {
    return ref[name.value];
  }
});

function errors(val: any)
{
  let ref = val;
  path.forEach((pathItem) => ref = ref?.[pathItem])

  const errors = ref?.[props.name]?.$errors ?? [];

  isInvalid.value = errors.length > 0;

  return errors;
}

function change(val: any, ev: any)
{
  let value = nullable && ev.target.value === '' ? null : ev.target.value;

  if (props.type === 'number' && value !== null) {
    value = parseInt(value);
  }

  if (props.type === 'float' && value !== null) {
    value = parseFloat(value);
    htmlType.value = 'number';
  }

  let ref = val;
  let refi = input;

  for (let i = 0; i < path.length; i++) {
    refi = refi[path[i]];

    if (!ref || !ref[path[i]]) {
      ref = null;

      continue;
    }

    ref = ref[path[i]];
  }

  if (props.name) {
    if (ref && ref[props.name]) {
      if (props.control === 'checkbox') {
        ref[props.name].$model = !ref[props.name].$model;
      } else if (props.control === 'radio') {
        ref[props.name].$model = props.value;
      } else {
        ref[props.name].$model = value;
      }

    } else {


      if (props.control === 'checkbox') {
        refi[props.name] = !refi[props.name];
      } else if (props.control === 'radio') {
        refi[props.name] = props.value;
      } else {
        refi[props.name] = value;
      }
    }

    emit('change', value);
  }
}


</script>