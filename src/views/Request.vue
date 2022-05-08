<template>
    <app-loader v-if="loading"></app-loader>
    <app-page back v-else-if="request" title='Заявка'>
        <p><strong>Имя владельца</strong>: {{request.fio}}</p>
        <p><strong>Телефон</strong>: {{request.phone}}</p>
        <p><strong>Сумма</strong>: {{currency(request.amount)}}</p>
        <p><strong>Стутс</strong>: <app-status :type="request.status"></app-status></p>

        <div class="form-control">
        <label for="status">Статус</label>  
            <select id="status" v-model="status">
                <option value="done">Завершено</option>
                <option value="canceled">Отмена</option>
                <option value="active">Активен</option>
                <option value="pending">Выполняется</option>
            </select>    
        </div>

        <button class="btn danger" @click="remove">Удалить</button>
        <button class="btn" v-if="hasChanges" @click="update">Обновить</button>

    </app-page>
    <h3 v-else class="text-center text-white">Заявки с таким ID ({{id}}) нет</h3>
</template>
<script>
import AppPage from '../components/ui/AppPage.vue'
import {useRoute,useRouter} from 'vue-router'
import {ref, onMounted, computed} from 'vue'
import {useStore} from 'vuex'
import AppLoader from '../components/ui/AppLoader.vue'
import AppStatus from '../components/ui/AppStatus.vue'
import {currency} from '../utils/currency'
export default {
    components:{AppPage, AppLoader,AppStatus},
    setup(){
        const loading = ref(true) 
        const route = useRoute()
        const store = useStore()
        const request = ref({})
        const status = ref()
        const router = useRouter()

        onMounted(async() =>{
            loading.value = true
            request.value = await store.dispatch('request/loadById', route.params.id)
            status.value = request.value?.status
            loading.value = false
        }
        )

        const hasChanges = computed(() => request.value.status !== status.value)
        

        const remove = async() => {
            await store.dispatch('request/remove', route.params.id)
            router.push('/')
        }
        const update = async() => {
            const data = {...request.value, status: status.value, id: route.params.id}
            await store.dispatch('request/update', data)
            request.value.status = status.value
        }

        return{
            route,
            loading,
            request,
            id: route.params.id,
            currency,
            remove,
            update,
            status,
            hasChanges
        }
    }
}
</script>