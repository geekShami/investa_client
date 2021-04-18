<template>
  <div class="cashier">
    <nav class="navbar navbar-light bg-light">
      <a class="navbar-brand" href="#">
        {{username}}
      </a>
      <button class="btn btn-outline-success my-2 my-sm-0" v-on:click.prevent="executeLogout" >Logout</button>

    </nav>
    <ul>
      <li v-for="(value, key) in currentNetworth" v-bind:key="key">{{key}}:{{value}}</li>
    </ul>
  </div>
</template>

<script>

import {BASE_API_URL} from '../config/keys.js'
import axios from 'axios'
import {mapActions} from 'vuex'


export default {

  name: 'Cashier',
  components: {},
  data(){
    return {
      currentNetworth:{},
      username:""
    }
  },
  methods:{
    ...mapActions(['logoutUser']),
    executeLogout: function(){
      this.logoutUser().then(res=>{

        console.log('successfully logged out the owner');
        console.log(res);
        this.$router.push('/login');

      }).catch(err=>{

        console.log('some error occured during log out');
        console.log(err);

      });
    }
  },
  mounted() {

    this.$nextTick(function () {

      this.username = this.$store.getters.username;
      axios.get(BASE_API_URL+"/api/transactions/getnetworth/1").then(res=>{
      if(res.data.success){
        console.log('current networth fetched is');
        this.currentNetworth = res.data.networth[0];
        console.log(this.currentNetworth);
        

        }
      });
    })

    
  }

}
</script>
