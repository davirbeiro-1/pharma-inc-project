import Vue from 'vue';
import Users from './Users.vue'
import VueMask from 'v-mask';
import AsyncComputed from 'vue-async-computed';
import VeeValidate from 'vee-validate';
import Vuelidate from 'vuelidate';
import VueSidebarMenu from 'vue-sidebar-menu';
import VueToast from 'vue-toast-notification';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import LoadScript from 'vue-plugin-load-script';
import VueClipboard from 'vue-clipboard2';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'vue-toast-notification/dist/theme-sugar.css';
import VueCompositionApi from '@vue/composition-api';
import AudioVisual from 'vue-audio-visual';
import { MonthPicker, MonthPickerInput } from 'vue-month-picker';

Vue.use(MonthPicker);
Vue.use(MonthPickerInput);
Vue.use(VueCompositionApi);
Vue.use(VueMask);
Vue.use(Vuelidate);
Vue.use(AsyncComputed);
Vue.use(LoadScript);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.config.productionTip = false;
Vue.use(VeeValidate, {
  inject: true,
  fieldsBagName: 'veeFields'
});
Vue.use(VueSidebarMenu);
Vue.use(VueToast);
Vue.use(AudioVisual);
Vue.use(VueClipboard);

new Vue({
  el: '#app',
  render: h => h(Users)
});
