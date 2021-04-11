<template>
    <div class="login">
        <div class="row">
            <div class="col-md-6 mx-auto contact-form">
                <div class="form-group row">
                    <div class="col-sm-12">
                        <label for="email">Email *</label>
                        <input v-model="email" type="text" class="form-control" id="email" placeholder="Email">
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-12">
                        <label for="password">Password *</label>
                        <input v-model="password" type="password" class="form-control" id="password">
                    </div>
                </div>

                <div class="form-group row">
                    <div class="col-sm-12">
                        <label for="confirmpassword">Confirm Password *</label>
                        <input v-model="confirmPassword" type="password" class="form-control" id="confirmpassword">
                    </div>
                </div>

                <div class="form-group">
                    <label for="role">Role</label>
                    <select v-model="role" id="role" class="form-control">
                        <option disabled value="">Choose...</option>
                        <option value="0">Company</option>
                        <option value="3">Employee</option>
                        <option value="4">Client</option> 
                    </select>
                </div>


                <div class="row" v-if="showErr">
                    <div class="col-sm-12">
                        <div class="alert alert-warning" role="alert" style="padding-bottom:0px;">
                            <ul>
                                <li v-for="(error, index) in errors" :key="`error-${index}`">{{ error }}</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="row justify-content-center">
                     <div class="col text-center">
                        <button :disabled="loggingIn" style="background:#ba9444;border:0px;margin-top:8px;width:200px;" type="button" class="btn btn-primary" v-on:click.prevent="executeLogin">GET IN</button>
                     </div>
                </div>   


            </div>
        </div>
    </div>   
</template>

<script>

import {mapActions} from 'vuex';
import userRoles from '../Enums/userRole.js';



export default {
  name: 'Login',
  components: {},
  data(){
      return{
          errors:[],
          email:"",
          password:"",
          confirmPassword:"",
          role:"",
          loggingIn:false
      }
  },
  computed:{
      showErr:function(){
          return this.errors.length > 0;
      }
  },
  methods:{
      ...mapActions(['loginUser']),
      executeLogin:function(){
          
        //validation part
        this.errors=[];

        //email validation
        let re = /\S+@\S+\.\S+/;
        if(!re.test(this.email)) this.errors.push('Invalid email address');

        if(this.password === "" && this.confirmPassword === "") this.errors.push('Password required');
        if(this.password !== this.confirmPassword) this.errors.push('Password missmatch');

        if(this.role==="") this.errors.push("No role selected");


        //if data has been validated we procedd to login call
        if(this.errors.length===0){
           
            let user={email:this.email, password:this.password, role: this.role};
            this.loggingIn = true;
            this.loginUser(user)
            .then(res=>{

                console.log(res);
                const userRole = this.$store.getters.userRole;
               
                if(userRole == userRoles.COMPANY)   this.$router.push('/company');
                if(userRole == userRoles.OWNER)     this.$router.push('/owner');
                if(userRole == userRoles.CASHIER)   this.$router.push('/cashier');
                if(userRole == userRoles.EMPLOYEE)  this.$router.push('/employee');
                if(userRole == userRoles.CLIENT)    this.$router.push('/investor');
                //console.log(Object.keys(userRoles)[jwt.role]);

               
            })
            .catch(err=>{
                let message = err.message || "Error loggin in company"
                this.errors.push(message);
            })
            .finally(()=>{this.loggingIn = false;});
                
            
        }  

    }

  }

}
</script>

<style scoped>
.login{
    margin-top:15vh;
}
.contact-form
{
    background:#e4ded7;
    padding-top:10px;
    padding-bottom:15px;
}

</style>
