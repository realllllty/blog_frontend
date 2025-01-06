<template>
  <div>
    <swiper
        :direction="'vertical'"
        :pagination="{
      clickable: true,
    }"
        :modules="modules"
        class="mySwiper"
        :mousewheel="true"
        @slide-change="onSlideChange"
    >
      <swiper-slide v-slot="{ isActive }">
        <slide1></slide1>
      </swiper-slide>
      <swiper-slide v-slot="{ isActive }">
        <slide2 :is-active="isActive"></slide2>
      </swiper-slide>
      <swiper-slide>Slide 3</swiper-slide>
    </swiper>
  </div>

</template>

<script setup>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';



// import required modules
import { Pagination, Mousewheel } from 'swiper/modules';
// Define and expose modules
const modules = [Pagination, Mousewheel];

//import slides components
import slide1 from '../components/Swiper-slides/slide1.vue';
import slide2 from '../components/Swiper-slides/slide2.vue';



</script>

<style scoped>
#app {
  height: 100%;
}
html,
body {
  position: relative;
  height: 100%;
}

body {
  background: #eee;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #000;
  margin: 0;
  padding: 0;
}

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
