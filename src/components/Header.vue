<template>
    <div class="header">
        <header class="bg-white">
            <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div class="flex lg:flex-1">
                    <a href="/" class="-m-1.5 p-1.5">
                        <img src="/src/assets/icon.jpg" alt="Logo" class="h-10 w-auto">
                    </a>
                </div>
                <div class="hidden lg:flex lg:gap-x-12">
                    <div v-for="item in navItems" :key="item.path"
                        class="header_index"
                        v-wave
                        @click="navigateTo(item.path)"
                        @mouseover="anmiationUnderlineIn"
                        @mouseleave="anmiationUnderlineOut"
                    >
                        {{ item.label }}
                        <div class="underline" :class="{ 'active': item.isActive }"></div>
                    </div>
                </div>
            </nav>
        </header>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import gsap from 'gsap';

const router = useRouter();
const route = useRoute();

const navItemsConst = [
    { label: '博客(blog)', path: '/fullpage/myblog', isActive: false },
    { label: '照片墙(gallery)', path: '/fullpage/gallery', isActive: false }
]

const navItems = ref(JSON.parse(JSON.stringify(navItemsConst)));

function navigateTo(path) {
    navItems.value.forEach((item) => {
        if (item.path === path) {
            item.isActive = true;
        } else {
            item.isActive = false;
        }
    });
    router.push({ path });
}

function anmiationUnderlineIn(event) {
    const animationTarget = event.target.querySelector('.underline');
    if (animationTarget && Array.prototype.includes.call(event.target.querySelector('.underline').classList, 'active')) return;
    if (animationTarget) {
        gsap.to(animationTarget, {
            width: '100%',
            duration: 0.5,
            ease: 'Power3.easeOut'
        });
    }
}

function anmiationUnderlineOut(event) {
    const animationTarget = event.target.querySelector('.underline');
    if (animationTarget && Array.prototype.includes.call(event.target.querySelector('.underline').classList, 'active')) return;
    if (animationTarget) {
        gsap.to(animationTarget, {
            width: '0%',
            duration: 0.5,
            ease: 'Power3.easeOut'
        });
    }
}

watch(() => route.path, (newPath) => {

    navItems.value.forEach((item) => {
        item.isActive = newPath.startsWith(item.path);
    });

    // 动画更新：根据当前活动 tab 更新下划线状态
    navItems.value.forEach((item) => {
      const target = document.querySelector(`.header_index:nth-child(${navItems.value.indexOf(item) + 1}) .underline`);
      if (target) {
        if (item.isActive) {
          gsap.to(target, { width: '100%', duration: 0.5, ease: 'Power3.easeOut' });
        } else {
          gsap.to(target, { width: '0%', duration: 0.5, ease: 'Power3.easeOut' });
        }
      }
    });
}, { immediate: true });

onMounted(() => {});

</script>

<style scoped lang="scss">
.header {
    border-bottom: 1px solid #000;
    // padding: 20px 0px;
    z-index: 3;

    &_index {
        position: relative; 
        font-weight: 100;
        font-size: 25px;
        border-radius: 10px;
        cursor: pointer; 
        @include googleFonts("Open Sans", "Noto Sans SC");

        .underline {
            position: absolute;
            bottom: -3px; 
            width: 0%;
            height: 1px;
            background-color: black;
        }

        .underline.active {
            width: 100%;
        }
    }
}
</style>