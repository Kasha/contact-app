import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'vue-universal-modal/dist/index.css';

import VueUniversalModal from 'vue-universal-modal';


createApp(App).use(store).use(router).use(VueUniversalModal, {
    teleportTarget: '#modals',
  }).mount('#app')
