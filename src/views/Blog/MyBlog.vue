<template height="100%">
    <div>
        <div class="blog_header">
            <div class="blog_header__slogan">
                <h1>Explore the Beauty of Technology</h1>
            </div>
            <img :src="blog_header" alt="blog_header" class="blog_header__img">
        </div>
        <!-- <div class="displaycard"></div> -->
        <div class="h-full blog_main">
            <div v-for="(item, index) in data" :key="index">
                <Card :title="item.title" :time="item.createdAt" class="blog_main__card"></Card>
            </div>
        </div>
    </div>
</template>

<script setup>
//引入卡片组件
import Card from '@/src/components/Blog/Card.vue'
import { api } from '@/src/api/axios.js'
import { onMounted, reactive } from 'vue';

onMounted(() => {
    fetchData();
});

const data = reactive([]);
async function fetchData() {
    const response = await api.get('/api/articles/list');
    data.splice(0, data.length, ...response); // 更新 data 的内容
}

const blog_header = "https://pub-1fdea691c7ef4a9c895b88aeae4d1b68.r2.dev/IMG_7372.jpg";

</script>

<style scoped lang="scss">
.blog {
    &_header {
        height: 500px;
        position: relative;

        &__slogan {
            position: absolute;
            bottom: 40px;
            right: 40px;
            z-index: 1;
            text-align: right;


            h1 {
                color: white;
                font-size: 2.5rem;
                font-style: italic;
                font-weight: 100;
                @include googleFonts("Open Sans", "Noto Sans SC");
            }
        }

        &__img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            position: relative;
        }
    }

    &_main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        flex-wrap: wrap;
        padding: 88px 0px;

        &__card {
            margin-bottom: 20px;
        }
    }
}

.displaycard {
    max-width: 1300px;
    min-width: 320px;
}

.col {
    padding: 0 !important;
}

.custom-card {
    width: 1000px;
    margin-top: 100px;
}
</style>
