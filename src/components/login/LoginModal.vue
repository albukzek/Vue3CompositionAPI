<template>
    <form @submit.prevent="onSubmit">
        <div class="form-control" :class="{invalid: eError}">
            <label for="email">Email</label>  
            <input type="text" id="email" v-model="email" @blur="eBlur"> 
            <small v-if="eError">{{eError}}</small>     
        </div>
         <div class="form-control" :class="{invalid: pError}">
            <label for="password">Password</label>  
            <input type="password" id="password" v-model="password" @blur="pBlur">   
            <small v-if="pError">{{pError}}</small>     
        </div>
        <button class="btn primary" :disabled="isSubmitting" @click="register" >Зарегистрироваться</button>
    </form>
</template>
<script>
import {useRefisterFrom} from '../../use/register-form.js'
export default {
    setup(){
        return{
            ...useRefisterFrom()
        }
    }
}
</script>