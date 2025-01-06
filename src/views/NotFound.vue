<template>
  <div class="flex min-h-full flex-col bg-white lg:relative h-screen">
    <div class="flex flex-grow flex-col">
      <!-- 主内容区域 -->
      <main class="flex flex-grow flex-col bg-white">
        <!-- 主内容区域容器 -->
        <div class="mx-auto flex w-full max-w-7xl flex-grow flex-col px-6 lg:px-8">
          <!-- 网站标志 -->
          <div class="flex-shrink-0 pt-10 sm:pt-16">
            <a href="/" class="inline-flex">
              <img class="h-12 w-auto" src="https://matt-obstorage777-1313452829.cos.ap-shanghai.myqcloud.com/pic_store/logo.png" alt="" />
            </a>
          </div>
          <!-- 错误信息提示 -->
          <div class="my-auto flex-shrink-0 py-16 sm:py-32">
            <p class="text-base font-semibold text-indigo-600">404</p>
            <h1 class="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Chill一下</h1>
            <p class="mt-2 text-base text-gray-500">Not found</p>
            <!-- 返回主页按钮 -->
            <div class="mt-6">
              <a href="#" class="text-base font-medium text-indigo-600 hover:text-indigo-500" @click="back" v-wave>
                返回主页
                <span aria-hidden="true"> &rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </main>
      <!-- 页面底部 -->
      <footer class="flex-shrink-0 bg-gray-50">
        <div class="mx-auto w-full max-w-7xl py-16 px-6 lg:px-8">
          <!-- 导航栏 -->
          <nav class="flex space-x-4">
            <p class="text-sm font-medium text-gray-500 hover:text-gray-600">Email:17828126523@163.com</p>
            <span class="inline-block border-l border-gray-300" aria-hidden="true" />
            <a href="https://github.com/realllllty" class="text-sm font-medium text-gray-500 hover:text-gray-600">Github</a>
          </nav>
        </div>
      </footer>
    </div>
    <!-- 右侧图片 -->
    <div class="hidden lg:absolute lg:inset-y-0 lg:right-0 lg:block lg:w-1/2">
      <img class="absolute inset-0 h-full w-full object-cover" src="https://matt-obstorage777-1313452829.cos.ap-shanghai.myqcloud.com/pic_store/B18BF054-B84F-4CC8-83D0-EB1FD04D0A66_1_105_c.jpeg" alt="" />
    </div>
  </div>

</template>

<script setup>
import router from '../router/index.js'
function back(){
  router.push('/fullpage')
}
</script>

<style scoped>

</style>