<template>
  <LayoutMain v-if="user.isLoggedIn">
    <router-view v-slot="{ Component }">
      <keep-alive :max="$router.getRoutes().length">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </LayoutMain>
  <LayoutLogin v-else />

</template>


<script setup lang="ts">
import { reactive, provide, watch, onMounted } from 'vue';
import LayoutLogin from './components/LayoutLogin.vue'
import LayoutMain from './components/LayoutMain.vue'

interface Meta {
  buildDate: string|null
}

interface User {
  identity:  string|null
  isLoggedIn: boolean
}

const user: User = reactive({identity: null, isLoggedIn: false});
const meta: Meta = reactive({buildDate: null});

function login() {
  user.isLoggedIn = true;
  user.identity = 'PES';
}

function logout() {
  user.isLoggedIn = false;
  user.identity = null;
}

onMounted(() => {
  if (sessionStorage.user) {
    const aux = JSON.parse(sessionStorage.user);
    user.isLoggedIn = aux.isLoggedIn;
    user.identity = aux.identity;
  }

  meta.buildDate = document.documentElement.dataset.buildDate ?? null;
});

watch(() => user, (newUser) => {
  sessionStorage.user = JSON.stringify(newUser);
}, { deep: true });

provide('meta', meta);
provide('user', user);

</script>

<style scoped>

</style>
