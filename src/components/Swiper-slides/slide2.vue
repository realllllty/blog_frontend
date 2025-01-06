<template>
  <div class="w-full h-full flex justify-center items-center">
    <img :src="slide2_bg" class="object-cover blur-sm fixed h-full w-full" />
    <v-card class="h-2/3 w-2/3">
      <v-container class="h-full pcard">
        <v-row class="h-full">
          <v-col sm="0" md="3" class="h-full pcard">
            <div
              class="h-full object-fill relative top-3 flex flex-col items-center justify-center flex-nowrap"
              id="slide2_card"
            >
              <div class="avatar-wrap">
                <v-avatar
                  v-bind="props"
                  icon="$vuetify"
                  :image="icon"
                  size="80"
                  class="elevation-20"
                ></v-avatar>
              </div>
              <div
                  class="text-wrap tracking-in-expand-fwd-bottom"
                  :style="{ 'animation-play-state': isPlaying ? 'running' : 'paused' }"
              >
                <div class="artt intro py-5">About Me</div>
                <div class="artt text-center mb-3 whitespace-nowrap">
                  林天宇
                </div>
                <div class="artt text-center mb-3">
                  email
                </div>
                <div class="artt text-center mb-3">
                  17828126523@163.com
                </div>
                <div class="artt text-left ml-5">
                  {{ unitext.breifintro}}
                </div>
              </div>
            </div>
          </v-col>
          <v-col class="pcard">
            <div
                class="artt m-12 text-left tracking-in-expand-fwd-bottom"
                :style="{ 'animation-play-state': isPlaying ? 'running' : 'paused' }"
            >
              {{ unitext.selfintro}}
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>
<script setup>
//定义背景照片存储位置
import slide2_bg from '@/src/assets/homepage/slide2_bg.jpg';
import icon from '@/src/assets/homepage/icon.jpg';

//控制默认展开panel
import { ref,watch } from 'vue';
const defaultexpand = ref([0]);

//文本内容
const unitext = {
  breifintro: " 目前就读于西南大学计信院,前端工程师,曾负责某国企数据服务前端开发",
  selfintro : "本人适应心强，勤勉不懈，对待工作认真负责，善于沟通、协调有较强的组织能力与团队精神;活泼开朗、乐观上进、勤于学习能不断提高自身的能力与综合素质。非常热爱前端这个领域，喜欢探索前端论坛学习新知识，未来在巩固温习现有技术栈的同时还想要学习Three.js、 wasm、 Electron等更多前端相关的技能。在未来的工作中，我将以充沛的精力，刻苦钻研的精神来努力工作，稳定地提高自己的工作能力。本人适应心强，勤勉不懈，对待工作认真负责，善于沟通、协调有较强的组织能力与团队精神;活泼开朗、乐观上进、勤于学习能不断提高自身的能力与综合素质。 "
}

//控制动画
const props = defineProps(["is-active"])
let isPlaying = ref(false);
watch(props, (newVal, oldVal) => {
  if (newVal.isActive) {
    isPlaying.value = true;
  } else {
    isPlaying.value = false;
  }
});

</script>

<style scoped>
.artt {
  font-family: "Songti SC";
}

:deep .pcard {
  padding: 0;
}
#slide2_card {
  background-image: url('@/src/assets/homepage/card_bg.jpg');
  background-size: cover;
}
.text-wrap {
  padding: 20px;
}
.avatar-wrap {
  padding: 20px;
}

.tracking-in-expand-fwd-bottom {
  -webkit-animation: tracking-in-expand-fwd-bottom 0.8s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
  animation: tracking-in-expand-fwd-bottom 0.8s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
}

@-webkit-keyframes tracking-in-expand-fwd-bottom {
  0% {
    letter-spacing: -0.5em;
    -webkit-transform: translateZ(-700px) translateY(500px);
    transform: translateZ(-700px) translateY(500px);
    opacity: 0;
  }
  40% {
    opacity: 0.6;
  }
  100% {
    -webkit-transform: translateZ(0) translateY(0);
    transform: translateZ(0) translateY(0);
    opacity: 1;
  }
}
@keyframes tracking-in-expand-fwd-bottom {
  0% {
    letter-spacing: -0.5em;
    -webkit-transform: translateZ(-700px) translateY(500px);
    transform: translateZ(-700px) translateY(500px);
    opacity: 0;
  }
  40% {
    opacity: 0.6;
  }
  100% {
    -webkit-transform: translateZ(0) translateY(0);
    transform: translateZ(0) translateY(0);
    opacity: 1;
  }
}


</style>
