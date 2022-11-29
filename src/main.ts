import { createApp, provide, h } from 'vue'
import "./assets/css/base.css";
import "./assets/css/adds.css";
import "./assets/css/toaster.css";
import 'font-awesome/css/font-awesome.css';
import 'pe7-icon/dist/dist/pe-icon-7-stroke.css';
import 'ionicons-npm/css/ionicons.css';
import VueToast from 'vue-toast-notification';
import "bootstrap"

import App from './App.vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'
import router from "./router";

const cache = new InMemoryCache();

const link = createHttpLink({
    uri: 'http://www.roiwell-api.cz.d4169.masterinter.net/',
    credentials: 'include'
});

const apolloClient = new ApolloClient({
    cache,
    link,
})

const app = createApp({
    setup () {
        provide(DefaultApolloClient, apolloClient)
    },

    render: () => h(App),
});
app.use(router);
app.use(VueToast, {position: 'top'}).provide('toast', app.config.globalProperties.$toast);;
app.mount('#app');
