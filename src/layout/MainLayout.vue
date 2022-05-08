<template>
    <the-navbar></the-navbar>
    <the-siebar></the-siebar>
    <div class="container with-nav">
        <app-message></app-message>
        <router-view></router-view>
    </div>
</template>

<script>
import TheNavbar from '../components/TheNavbar.vue'
import AppMessage from '../components/ui/appMessage.vue'
import TheSiebar from '../components/TheSidebar.vue'
export default {
    components:{TheNavbar, AppMessage, TheSiebar}
}
</script>