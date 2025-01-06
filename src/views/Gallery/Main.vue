<template height="100%">
    <div>
      <div style="height: 126.41px"></div>
      <div class="h-full gallery_main" :style="{ padding: '20px 0px' }">
          <div v-for="(item, index) in data" :key="index" style="width: 70%;">
              <Card :title="item.name" :id="item.id" :cardImgURL="item.url" class="gallery_main__card"></Card>
          </div>
      </div>
    </div>
</template>
  
<script setup>
//引入卡片组件
import Card from '@/src/components/Gallery/Card.vue';
import { api } from '@/src/api/axios.js'
import { onMounted, reactive } from 'vue';

onMounted(() => {
    fetchData();
});

const data = reactive([]);
async function fetchData() {
    const response = await api.get('/api/gallery/list');
    data.splice(0, data.length, ...response); // 更新 data 的内容
}


// 规定一下数据结构
// [{ title(同时也作为路由传参的一部分): ...., cardImgURL(预留的卡片改造图片):... }]
  
</script>
  
<style scoped lang="scss">
  .gallery_main {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      flex-direction: column;
  
      &__card {
          width: 100%;
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