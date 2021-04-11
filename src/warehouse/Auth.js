import axios from 'axios'
import {BASE_API_URL} from '../config/keys.js'
import userRoles from '../Enums/userRole.js'
import VueJwtDecode from 'vue-jwt-decode'



const state = {
    token: localStorage.getItem("token") || ''
};

const getters = {
    isLoggedIn: state => {
        return state.token != '' ? true : false;   
    },
    parsedToken: state=>{
        return VueJwtDecode.decode(state.token.substr(7));
    },
    username: (state, getters) => {
        return getters.parsedToken.username;
    },
    userRole: (state, getters)=>{
        return getters.parsedToken.role;
    }
};

const actions = {


    logoutUser({commit}){
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        commit('auth_logout');
    },
    loginUser({commit}, user){

        return new Promise((resolve, reject)=>{

            //determine endpoint for login based on selected rol
            let apiUrl = "";
            if(user.role == userRoles.COMPANY) 
                apiUrl = BASE_API_URL+"/api/companies/login";
            else if(user.role == userRoles.EMPLOYEE)
                apiUrl = BASE_API_URL+"/api/companies/loginemployee";
            else if(user.role == userRoles.CLIENT){
                apiUrl = BASE_API_URL+"/api/companies/loginclient";
            }


            axios.post(apiUrl,user).then(res=>{
                if(res.data.success){
                    const token = res.data.token;
                    localStorage.setItem("token", token);
                    axios.defaults.headers.common['Authorization'] = token;
                    commit('auth_success',token);
                    resolve(res.data);
                }
                else{
                    commit('auth_failure');
                    reject(res.data);
                }
            });

        });
    }

};

const mutations = {

    auth_success: function(state, token){
        state.token = token;
    },
    auth_failure: function(state){
        state.token = "";
    },
    auth_logout: function(state){
        state.token = "";
    }
};

export default{
    state,
    actions,
    mutations,
    getters
}