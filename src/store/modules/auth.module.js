const TOKEN_KEY = 'jwt-token'
import axios from "axios"
import {error} from '../../utils/error.js'

export default {
    namespaced: true,
    state(){
        return{
            token: localStorage.getItem(TOKEN_KEY)
        }
    },
    mutations:{
        setToken(state, token){
            state.token = token
            localStorage.setItem(TOKEN_KEY, token)
        },
        logout(state){
            state.token = null,
            localStorage.removeItem(TOKEN_KEY)
        }
    },
    actions:{
        async register({dispatch}, payload){
            try{
                console.log('payload on Register:', payload)
                const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_FB_KEY}`
                await axios.post(url , {...payload, returnSecureToken: true})
            }catch(e){
                dispatch('setMessage', {
                    value : error(e.response.data.error.message),
                    type:'danger'
                }, {root: true})
                throw new Error(e)
            }
        },
        async login({commit, dispatch}, payload){
            try{

                console.log('payLogin', payload)
                const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`
                const {data} = await axios.post(url , {...payload, returnSecureToken: true})
                commit('setToken', data.idToken)    
                commit('clearMessage', null, {root:true})
            }catch(e){
                dispatch('setMessage', {
                    value : error(e.response.data.error.message),
                    type:'danger'
                }, {root: true})
                throw new Error(e)
            }
            
            // commit('setToken', 'TEST TOKEN')
        }
    },
    getters:{
        token(state){
            return state.token
        },
        isAuthenticated(_, getters){
            return !!getters.token
        }
    }
}