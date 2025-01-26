<template>
  <div class="project">
    <div class="project__header">
      <h1 class="project__title">博客技术栈</h1>
      <div class="project__subtitle">全栈开发的个人博客系统</div>
    </div>

    <div class="project__content">
      <div class="project__section">
        <h2 class="project__section-title">前端技术</h2>
        <div class="project__tech-list">
          <div class="project__tech-item">
            <div class="project__tech-icon project__tech-icon--vue">
              <i class="fab fa-vuejs"></i>
            </div>
            <div class="project__tech-info">
              <h3 class="project__tech-name">Vue 3</h3>
              <p class="project__tech-desc">
                使用 Composition API 和 Script Setup 语法
                <br>基于 Vite 构建工具
              </p>
            </div>
          </div>
          <div class="project__tech-item">
            <div class="project__tech-icon project__tech-icon--sass">
              <i class="fab fa-sass"></i>
            </div>
            <div class="project__tech-info">
              <h3 class="project__tech-name">SASS</h3>
              <p class="project__tech-desc">
                采用 BEM 命名规范
                <br>模块化的样式组织
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="project__section">
        <h2 class="project__section-title">后端技术</h2>
        <div class="project__tech-list">
          <div class="project__tech-item">
            <div class="project__tech-icon project__tech-icon--nest">
              <i class="fas fa-server"></i>
            </div>
            <div class="project__tech-info">
              <h3 class="project__tech-name">Nest.js</h3>
              <p class="project__tech-desc">
                基于 TypeScript 的后端框架
                <br>使用装饰器实现面向切面编程
              </p>
            </div>
          </div>
          <div class="project__tech-item">
            <div class="project__tech-icon project__tech-icon--mysql">
              <i class="fas fa-database"></i>
            </div>
            <div class="project__tech-info">
              <h3 class="project__tech-name">MySQL</h3>
              <p class="project__tech-desc">
                关系型数据库
                <br>使用 TypeORM 进行数据库操作
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="project__section">
        <h2 class="project__section-title">部署环境</h2>
        <div class="project__tech-list">
          <div class="project__tech-item">
            <div class="project__tech-icon project__tech-icon--cloud">
              <i class="fas fa-cloud"></i>
            </div>
            <div class="project__tech-info">
              <h3 class="project__tech-name">阿里云</h3>
              <p class="project__tech-desc">
                ECS 云服务器
                <br>域名解析与 SSL 证书
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  window.isShowFooter = false;
});
</script>

<style lang="scss" scoped>
.project {
  width: 100%;
  height: 100%;
  color: #2c3e50;
  overflow-y: auto;

  // 滚动条样式
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #4a90e2;
    border-radius: 3px;
  }

  &__header {
    text-align: center;
    margin-bottom: 2rem;
    padding: 1rem;
  }

  &__title {
    font-size: 2.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    background: linear-gradient(45deg, #4a90e2, #63b3ed);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  &__subtitle {
    font-size: 1.2rem;
    color: #64748b;
  }

  &__content {
    padding: 0 2rem;
    padding-bottom: 2rem;
  }

  &__section {
    margin-bottom: 2rem;

    &-title {
      font-size: 1.5rem;
      font-weight: 500;
      margin-bottom: 1.5rem;
      color: #1a365d;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 0.5rem;
    }
  }

  &__tech-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  &__tech-item {
    display: flex;
    align-items: flex-start;
    background: rgba(74, 144, 226, 0.05);
    border-radius: 12px;
    padding: 1.5rem;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }
  }

  &__tech-icon {
    width: 50px;
    height: 50px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
    font-size: 1.5rem;
    color: white;

    &--vue {
      background: #42b883;
    }

    &--sass {
      background: #cc6699;
    }

    &--nest {
      background: #e0234e;
    }

    &--mysql {
      background: #00758f;
    }

    &--cloud {
      background: #ff6a00;
    }
  }

  &__tech-info {
    flex: 1;
  }

  &__tech-name {
    font-size: 1.2rem;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 0.5rem;
  }

  &__tech-desc {
    font-size: 0.9rem;
    color: #4a5568;
    line-height: 1.6;
  }
}
</style>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');
</style>
