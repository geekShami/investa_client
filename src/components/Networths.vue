<template>    
  <div class="row">
    <div class="col-md-12">
      <div class="row">
        <div class="col-md-12">
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <form class="form-inline my-2 my-lg-0 ml-auto">
              <input v-model="networthNumber" class="form-control mr-sm-2" type="search" placeholder="Number" aria-label="Search">
              <button class="btn btn-outline-success my-2 my-sm-0" type="submit" v-on:click.prevent="fetchNetworths">GET</button>
            </form> 
          </nav>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Date</th>
                <th scope="col">Transaction</th>
                <th scope="col">Total</th>
                <th scope="col">In Hand</th>
                <th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in reversedNetworthTransactions" v-bind:key="item._id">
                <th scope="row">{{index+1}}</th>
                <td>{{item.date}}</td>
                <td><b>{{item.transaction_amount | currency}}</b></td>
                <td>{{item.total_amount | currency}}</td>
                <td> 
                  <div>
                    <div class="inline fas" v-bind:class="[item.arrowClass, item.colorClass]"></div>
                    <div class="inline">{{item.cash | currency }}</div>
                  </div> 
                </td>
                <td>{{item.description}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {BASE_API_URL} from '../config/keys.js'
import axios from 'axios'

export default {
  name: 'Networths',
  props:{
    initialNetworth:{
      type: Array, 
      required: true
    }
  },
  data(){
    return{
      networthTransactions: [],
      networthNumber:''
    }
  },
  computed:{
    reversedNetworthTransactions: function(){
      let prev = 0;
      let arr = [];
      for(var i=this.networthTransactions.length-1; i>=0;i--){
        let nw = {...this.networthTransactions[i]};
        if(nw.cash > prev){
          nw.arrowClass = "fa-arrow-up";
          nw.colorClass = "color-green";
          prev = nw.cash;
        }
        else if(nw.cash < prev){
          nw.arrowClass = "fa-arrow-down";
          nw.colorClass = "color-red";
          prev = nw.cash;
        }
        arr.push(nw);
      }
      return arr;
      //return [...this.networthTransactions].reverse();
    }
  },
  watch:{
    initialNetworth: function(value){
      this.networthTransactions = [...value];
    
    }
  },
  methods:{
    fetchNetworths: function(){
      axios.get(BASE_API_URL+"/api/transactions/getnetworth/"+this.networthNumber).then(res=>{
      if(res.data.success){
       
          this.networthTransactions = res.data.networth;
          this.$emit('updateNetworths', this.networthTransactions);
        
        }
        else{
          
          console.log(res.data);
        }
      }, err=>{

          console.log(err);
      });
    }
  },
  mounted(){
    this.$nextTick(function(){
      this.networthTransactions = [...this.initialNetworth];
    })
  },
  components: {
   
  }
}
</script>

<style scoped>
div.inline { display: inline; }
.color-green{color:green;}
.color-red{color:orange}
</style>