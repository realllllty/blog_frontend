<template>
    <div class="card" @click="onClick" ref="card">
        <div class="card_title" ref="title">
            {{ props.title }}
        </div>
        <div class="card_picture">
            <div class="card_picture-mainpic">
                <img :src="props.cardImgURL" alt="图片加载失败" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { gsap } from 'gsap';
import { ref, onMounted } from 'vue';

const router = useRouter();
const props = defineProps(['title', 'cardImgURL', 'id']);
const title = ref(null);
const card = ref(null);

function onClick() {
    router.push(`/fullpage/gallery/detail/${props.id}`);
}

onMounted(() => {});
</script>

<style scoped lang="scss">
.card {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    width: 100%;
    height: 300px;
    border-radius: 20px;
    overflow: hidden;
    cursor: pointer;
    background-color: #f9f9f9;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;

    &:hover {
        transform: translateY(-10px);
    }

    &_title {
        position: absolute;
        bottom: 20px;
        left: 20px;
        @include googleFonts("Open Sans", "Noto Sans SC");
        font-size: 50px;
        font-style: italic;
        font-weight: 100;
        color: #fff;
        z-index: 10;
        text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
    }

    &_picture {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;

        &-mainpic {
            height: 100%;
            width: 100%;
            // mask: linear-gradient(-90deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0) 98%);

            img {
                height: 100%;
                width: 100%;
                object-fit: cover;
                transition: transform 0.3s ease-in-out;
            }
        }

        &:hover img {
            transform: scale(1.1);
        }
    }
}
</style>