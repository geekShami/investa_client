<template>
  <div class="cashier">
    <h1>Cashier View</h1>
    <ul>
      <li v-for="(value, key) in currentNetworth" v-bind:key="key">{{key}}:{{value}}</li>
    </ul>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import {BASE_API_URL} from '../config/keys.js'
import axios from 'axios'


export default {

  name: 'Cashier',
  components: {},
  data(){
    return {
      currentNetworth:{}
    }
  },
  computed:{
    ...mapGetters(['username'])
  },
  mounted() {

    axios.get(BASE_API_URL+"/api/transactions/getnetworth/1").then(res=>{
      if(res.data.success){
        console.log('current networth fetched is');
        this.currentNetworth = res.data.networth[0];
        console.log(this.currentNetworth);

      }
    });
  }

}
</script>
