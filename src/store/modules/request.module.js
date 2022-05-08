import axios from '../../axios/request'
import store from '../index'
export default{
    namespaced: true,
    state(){
        
        return{
            requests:[]
        }
    },
    mutations:{
        setRequests(state, requests){
            state.requests = requests
        },
        addRequest(state, request){
            state.requests.push(request)
        }
    },
    actions:{
        async load({commit, dispatch}){
            try{
                const token = store.getters['auth/token']
                const {data} = await axios.get(`/request.json?auth=${token}`)
                const requests = Object.keys(data).map(id => ({...data[id], id})) 
                console.log(data)
                commit('setRequests', requests)
            } catch(e){
                dispatch('setMessage', {
                    value: e.message ,
                    type: 'danger'
                },{root: true})
            }
        },
        async loadById({dispatch}, id){
            try{
                const token = store.getters['auth/token']
                const {data} = await axios.get(`/request/${id}.json?auth=${token}`)
                return data
            } catch(e){
                dispatch('setMessage', {
                    value: e.message ,
                    type: 'danger'
                },{root: true})
            }
        },
        async remove({dispatch}, id){
            try{
                const token = store.getters['auth/token']
                await axios.delete(`/request/${id}.json?auth=${token}`)
                dispatch('setMessage', {
                    value: 'Заявка удалена',
                    type:'danger'
                }, {root:true})
            } catch(e){
                dispatch('setMessage', {
                    value: e.message ,
                    type: 'danger'
                },{root: true})
            }
        },
        async update({dispatch}, request){
            try{
                const token = store.getters['auth/token']
                await axios.put(`/request/${request.id}.json?auth=${token}`, request)
                dispatch('setMessage', {
                    value: 'Заявка обновлена',
                    type:'primary'
                }, {root:true})
            } catch(e){
                dispatch('setMessage', {
                    value: e.message ,
                    type: 'danger'
                },{root: true})
            }
        },
        async create({commit, dispatch}, payload){
            try{
                const token = store.getters['auth/token']
                const {data} = await axios.post(`/request.json?auth=${token}`, payload)
                commit('addRequest', {...payload, id:data.name})
                dispatch('setMessage', {
                    value: "Заявка успешно создана",
                    type: 'primary'
                },{root: true})
            } catch(e){
                dispatch('setMessage', {
                    value: e.message ,
                    type: 'danger'
                },{root: true})
            }
        }
    },
    getters:{
        requests(state){
            return state.requests
        }
    }
}