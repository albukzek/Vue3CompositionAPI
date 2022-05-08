<template>
    <div class="container">
        <app-message></app-message>
        <router-view></router-view>
    </div>
</template>

<script>
// import App from '../App.vue'
import AppMessage from '../components/ui/appMessage.vue'
export default {
    components:{AppMessage}
}
</script>