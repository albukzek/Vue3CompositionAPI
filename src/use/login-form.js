import { reactive, computed, watch } from 'vue'
import * as yup from 'yup'
import {useField, useForm} from 'vee-validate'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'

export function useLoginForm(){
    const store = useStore()
    const router = useRouter()
    const {handleSubmit, isSubmitting, submitCount} = useForm()
    const PASSWORD_MIN = 6
    const { value: password, errorMessage: pError, handleBlur: pBlur } = useField(
        'password',
         yup
          .string()
          .trim()
          .required('Пожалуйста введите пароль')
          .min(PASSWORD_MIN, `Пароль не может быть меньше ${PASSWORD_MIN} символов`)
        //   .password()
    )
    const { value: email, errorMessage: eError, handleBlur: eBlur } = useField(
        'email',
        yup
          .string()
          .trim()
          .required('Пожалуйста ввеите email')
          .email('Необходио ввести корректный email')
    )

    const isToManyAttempts = computed(() => submitCount.value >=3)

    watch(isToManyAttempts , val => {
        if(val){
            setTimeout(()=> submitCount.value = 0, 1500)
        }
    })
    
    const onSubmit = handleSubmit( async values =>{
        console.log('Form:', values)
        try{
            await store.dispatch('auth/login', values)
            router.push('/')
        } catch (e){
        }
       
    })

    return{
        email,
        password,
        eError,
        pError,
        eBlur,
        pBlur,
        onSubmit,
        isSubmitting,
        isToManyAttempts
    }
}