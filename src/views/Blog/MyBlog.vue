<template height="100%">
  <div>
    <div style="height: 126.41px"></div>
    <!-- <div class="displaycard"></div> -->
    <div class="h-full blog_main" :style="{ padding: '20px 0px' }">
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

</script>

<style scoped lang="scss">
.blog_main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    flex-wrap: wrap;

    &__card {
        margin-bottom: 20px;
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
