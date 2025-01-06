<template>
    <div>
        <v-banner lines="one" :stacked="false" v-if="showBanner">
            <div>
                <v-avatar icon="$vuetify" :image="icon"></v-avatar>
            </div>
            <v-banner-text class="px-15">
                🪐
                &ensp;Hi, 欢迎进入我的博客, 纯真大学生在线找工作, 请给我一个☝🏻机会吧
            </v-banner-text>
            <template v-slot:actions>
                <v-btn variant="outlined" @click="closebanner">OK</v-btn>
            </template>
        </v-banner>
        <div>
            <router-view :style="{ height: getHeight }"> </router-view>
        </div>


    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import icon from '@/src/assets/homepage/icon.jpg';

let getHeight = window.innerHeight;
onMounted(() => {
    getHeight = window.innerHeight;
    window.onresize = () => {
        getHeight = window.innerHeight;
    };
});

//控制展示banner
let showBanner = ref(true);
function closebanner() {
    showBanner.value = false;
    console.log('close');
}
</script>

<style scoped></style>
