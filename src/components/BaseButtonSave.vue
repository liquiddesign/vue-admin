<template>
  <button v-bind="$attrs" class="btn btn-light btn-sm">
    <i class="fa fa-save" />
    <slot />
  </button>
</template>
