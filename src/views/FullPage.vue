<template>
    <div>
        <Header class="bg-transparent absolute w-full z-10"></Header>
        <div class="full_router__view">
            <router-view> </router-view>
        </div>
        <Footer></Footer>
    </div>
</template>

<script setup>
import Header from '@/src/components/Header.vue';
import Footer from "@/src/components/Footer.vue";

import { onMounted, ref } from 'vue';
let getHeight = window.innerHeight;
onMounted(() => {
    getHeight = window.innerHeight;
    window.onresize = () => {
        getHeight = window.innerHeight;
    };
});
</script>

<style scoped>
.full_router__view {
    min-height: 100vh;
}
</style>