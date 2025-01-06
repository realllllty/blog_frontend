<template>
  <div class="w-full h-full">
    <div class="testBox absolute w-full" v-loading="isLoading"></div>
    <video
      class="w-full h-full bg-black object-cover"
      ref="vbg"
      autoplay
      muted
      loop
      :src="videobg"
    ></video>
  </div>
</template>
<script setup>
import { source } from '@/src/api/homesrc';
import useLoading from '@/src/hooks/useLoading';
import { ref, onMounted } from 'vue';
const { isLoading, setLoading } = useLoading();
setLoading(true);

//背景视频播放:
const videobg = source.video;
const vbg = ref(0);

onMounted(() => {
  changeloading();
});

async function changeloading() {
  vbg.value.addEventListener('loadeddata', () => {
    setLoading(false);
  });
}
</script>
<style scoped></style>
