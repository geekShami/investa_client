<template>
    <div>
        <ul class="nav nav-tabs">
            <li class="nav-item" v-for="tab in tabs" v-bind:key="tab">
                <a class="nav-link" :class="{ active: tab === selected }" @click="setTab(tab)">
                    {{ tab }}
                </a>
            </li>
        </ul>
        <slot></slot>
    </div>
</template>

<script>
   export default{
       name: "TabNav",
       props:{
           tabs:{
               type: Array,
               required: true
           },
           selected:{
               type: String,
               required: true
           }
       },
       methods:{
           setTab: function(tab){
               this.$emit('tabSelected', tab);
           }
       }
   }
</script>

<style scoped>
.nav-link{cursor: pointer;}
</style>
