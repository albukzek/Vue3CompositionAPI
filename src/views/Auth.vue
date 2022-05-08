<template>
    <form class="card" @submit.prevent="onSubmit">
        <h1>Войти в систему</h1>
        <div :class="['form-control', {invalid: eError }]">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="email" @blur="eBlur" >
            <small v-if="eError">{{eError}}</small>
        </div>
            <div :class="['form-control', {invalid: pError}]">
            <label for="password" >Пароль</label>
            <input type="password" id="password" v-model="password" @blur="pBlur">
            <small v-if="pError">{{pError}}</small>
        </div>

        <button class="btn primary" type="submit" :disabled="isSubmitting || isToManyAttempts">Войти</button>
        <div class="text-danger" v-if="isToManyAttempts">
            Вы слишком часто пытаетесь войти в систему, попробуйте позже
        </div>
        <button class="btn primary" type="submit" @click.prevent="modal = true">Регистрация</button>
    </form>
    <teleport to="body">
      <app-modal v-if="modal" title="Реистрация учетной записи" @close="modal = false">
        <login-modal @created="modal = false"></login-modal>
      </app-modal>
    </teleport>
</template>
<script>
// import useVuelidate from '@vuelidate/core'
// import { required, email } from '@vuelidate/validators'
import {useLoginForm} from '../use/login-form.js'
import {useRoute} from 'vue-router'
import { useStore } from 'vuex'
import {error} from '../utils/error'
import AppModal from '../components/ui/AppModal.vue'
import {ref} from 'vue'
import LoginModal from '../components/login/LoginModal.vue'


export default {
components:{AppModal, LoginModal},
setup(){
    const modal = ref(false)
    const route = useRoute()
    const store = useStore()
    if(route.query.message){
        store.dispatch('setMessage', {
            value: error(route.query.message),
            type:'warning'
        })
    }

   return{
       modal,
       ...useLoginForm()
   }
}    
}

</script>