<script setup lang="ts">
import { ref } from 'vue'
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'

const CHARACTERS_QUERY = gql`
  fragment ProductItem on ProductOutput {
    uuid
  }
  query Products {
    products:productMany {
      data {
        ...ProductItem
      }
    }
  }
`

defineProps<{ msg: string }>()

const count = ref(0);
let state = ref('nic');

const { result, loading, error } = useQuery(CHARACTERS_QUERY);

console.log(result);
</script>

<template>
  <h1>{{ msg }}</h1>
  <h2>{{ error }}</h2>
  <h2> {{ loading }}</h2>

  <div v-for="product in result?.products?.data ?? {}">{{ product.uuid }}</div>


  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit {{ state }} <button @click="loadData">LOAD</button>
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
