import * as yup from 'yup'
import {useField, useForm} from 'vee-validate'
import {useStore} from 'vuex'

export function useRefisterFrom(){
    const PASSWORD_MIN = 6
    const store = useStore()
    const {handleSubmit, isSubmitting} = useForm()

    const {value: email, errorMessage: eError, handleBlur: eBlur} = useField(
        'email',
        yup.string()
        .email()
            .trim()
            .required('email не может быть пустым')
        )
        const {value: password, errorMessage: pError, handleBlur: pBlur} = useField(
        'password',
        yup.string()
              .trim()
              .required('Пожалуйста введите пароль')
              .min(PASSWORD_MIN, `Пароль не может быть меньше ${PASSWORD_MIN} символов`)
        )

        const onSubmit = handleSubmit( async values =>{
            console.log('Form onSubmit:', values)
            try{
                await store.dispatch('auth/register', values)
            } catch (e){
                console.log(e.message)
            }
           
        })

        return{
            password, pError, pBlur,
            email, eError, eBlur,
            onSubmit, isSubmitting
        }
}