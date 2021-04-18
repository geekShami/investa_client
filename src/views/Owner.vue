<template>
  <div class="owner">
    <nav class="navbar navbar-light bg-light">
      <a class="navbar-brand" href="#">
        {{username}}
      </a>
      <button class="btn btn-outline-success my-2 my-sm-0" v-on:click.prevent="executeLogout" >Logout</button>

    </nav>
    <div class="row" style="margin-top:20px;">
      <div class="col-md-7" >
        <div class="card border-info mb-3" >
          <div class="card-header">Total Networth</div>
          <div class="card-body text-secondary">
            <h5 class="card-title">PKR {{currentNetworth | currency}}</h5>
            <p class="card-text">Invested amount: <b>PKR {{investedAmount | currency}}</b>, Cash in hand: <b>PKR {{cashInHand | currency}}</b></p>
          </div>
        </div>
      </div>
      <div class="col-md-5" >
        <div class="card border-info mb-3" >
          <div class="card-header">Client Investment</div>
          <div class="card-body text-secondary">
            <h5 class="card-title">PKR {{investorsAmount | currency}}</h5>
            <p class="card-text">Company share: <b>{{companyShare}} %</b>, Client share: <b>{{investorShare}} %</b></p>
          </div>
        </div>
      </div>
    </div>

         
    <TabNav v-bind:tabs="['Networth','Investors','Profits']" v-bind:selected="selctedTab" @tabSelected="setTabSelected">
      <TabItem :isSelected="selctedTab === 'Networth'" >
            <Networths v-bind:initialNetworth="networthTransactions" @updateNetworths="netWorthsUpdated"/>
      </TabItem>
      <TabItem :isSelected="selctedTab === 'Investors'" >
        <p>Investors Tab</p>
      </TabItem>
      <TabItem :isSelected="selctedTab === 'Profits'" >
        <p>Profits Tab</p>
      </TabItem>
      
    </TabNav>
    
    
  </div>
</template>

<script>

import {mapActions} from 'vuex'
import {BASE_API_URL} from '../config/keys.js'
import axios from 'axios'
import Networths from '../components/Networths'
import TabNav from '../components/TabNav'
import TabItem from '../components/TabItem'


export default {
  name: 'Owner',
  components: {Networths, TabNav, TabItem},
  data(){
    return{
      networthTransactions:[],
      username: "",
      selctedTab:'Networth'

    }
  },
  computed:{
    currentNetworth: function(){
      if(this.networthTransactions.length==0) return 0;
      else return this.networthTransactions[0].total_amount;
    },
    cashInHand: function(){
      if(this.networthTransactions.length==0) return 0;
      else return this.networthTransactions[0].cash;
    },
    investedAmount: function(){
      
      if(this.networthTransactions.length==0) return 0;
      else return this.networthTransactions[0].invested == 0 ? "0" : this.networthTransactions[0].invested;
    },
    investorsAmount: function(){
      if(this.networthTransactions.length==0) return 0;
      else return this.networthTransactions[0].investors_share;
    },
    investorShare: function(){
      return ((this.investorsAmount / this.currentNetworth)*100).toFixed();
    },
    companyShare: function(){
      return 100-this.investorShare;
    }
  },
  methods: {
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
    },
    setTabSelected: function(tab){
      this.selctedTab = tab;
    },
    netWorthsUpdated : function(networths){
      console.log('updating networths be careful');
      this.networthTransactions = networths;
    }
  }, 
  mounted() {
    this.$nextTick(function () {

      //get the username from store 
      this.username = this.$store.getters.username;

      //fetch networth data from Node js backend
      axios.get(BASE_API_URL+"/api/transactions/getnetworth/5").then(res=>{
      if(res.data.success){
          console.log('current networth fetched is');
          this.networthTransactions = res.data.networth;
          console.log(this.networthTransactions) ;
        }
        else{
          console.log('Cannot fetch current networth');
          console.log(res.data);
        }
      }, err=>{
          console.log('Cannot fetch current networth');
          console.log(err);
      });

    })
  }
}
</script>

<style scoped>
.my-card
{
    position:absolute;
    left:40%;
    top:-20px;
    border-radius:50%;
}
</style>
