<template>
  <ul class="vertical-nav-menu metismenu">
    <template v-for="(header, index) in menu" :key="index">
      <li class="app-sidebar__heading">{{ header.title }}</li>
      <li v-for="(item, index2) in header.items" :key="index2" :class="{'mm-active' : active[item.name] === true}">
        <a href="#" :aria-expanded="active[item.name] === true ? 'true' : 'false'" @click="item.items.length ? active[item.name] = !active[item.name] : move(item.route)">
          <i class="metismenu-icon" :class="[item.icon]" />{{ item.title }}
          <i v-if="item.items.length" class="metismenu-state-icon pe-7s-angle-down caret-left" />
        </a>
        <ul v-if="item.items.length" class="mm-collapse" :class="{'mm-show' : active[item.name] === true}">
          <li v-for="(subItem, index3) in item.items" :key="index3">
            <a href="#" :class="{'mm-active': subItem.route === $route.name || $route.meta?.parent === subItem.route, 'disabled': subItem.disabled}" @click="move(subItem.route)">
              <i class="metismenu-icon" />{{ subItem.title }}
            </a>
          </li>
        </ul>
      </li>
    </template>
  </ul>
</template>
<script setup lang="ts">

import menu from "./../menu";
import {reactive} from "vue";

const active = reactive({});


</script>