<template>
  <LayoutMain v-if="user.isLoggedIn">
    <router-view v-slot="{ Component }">
      <keep-alive :max="$router.getRoutes().length">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </LayoutMain>
  <LayoutLogin v-else-if="user.isLoggedIn === false" />

</template>


<script setup lang="ts">
import { reactive, provide, watch, onMounted } from 'vue';
import LayoutLogin from './components/LayoutLogin.vue';
import LayoutMain from './components/LayoutMain.vue';
import {useQuery} from "@vue/apollo-composable";
import {Meta, User} from './types/BaseTypes';
import gql from "graphql-tag";

const user: User = reactive({identity: {}, isLoggedIn: null});
const meta: Meta = reactive({buildDate: null});

const query = gql`
  query AuthAdminIsLogged {
    result:authAdminIsLogged {
      uuid,
      fullName,
    }
  }
`

const { result, error } = useQuery(query, null, {
  pollInterval: 60000,
});

onMounted(() => {
  if (sessionStorage.user) {
    const aux = JSON.parse(sessionStorage.user);
    user.isLoggedIn = aux.isLoggedIn;
    user.identity = aux.identity;
  } else {
    user.isLoggedIn = false;
  }

  meta.buildDate = document.documentElement.dataset.buildDate ?? null;
});

watch(() => user, (newUser) => {
  sessionStorage.user = JSON.stringify(newUser);
}, { deep: true });

provide('meta', meta);
provide('user', user);

</script>
