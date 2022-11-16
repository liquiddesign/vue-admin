<template>
  <th class="minimal">
    <slot />
    <button class="btn btn-xs" style="float: right" @click="$parent.refetch()"><i class="fa fa-refresh" :class="{'fa-spin': $parent.loading}"></i></button>
  </th>
</template>