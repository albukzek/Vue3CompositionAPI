<template>  
    <div class="sidebar" v-if="sidebar">
        <span class="sidebar-close" @click="close">&times;</span>
        <div class="sidebar-content">
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis asperiores esse, expedita modi totam pariatur nesciunt sunt ducimus aperiam aut vero dolorum dicta ullam temporibus illum excepturi facere, odio commodi?</p>
        </div>
    </div>
</template>
<script>
import {useStore} from 'vuex'
import {computed} from 'vue'
export default {
    setup(){
        const store = useStore()
        const sidebar = computed(()=> store.state.sidebar)
        return{
            sidebar,
            close: () => store.commit('closeSiebar')
        }
    }
}
</script>