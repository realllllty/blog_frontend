<template>
    <div class="about">
        <div class="about__header">
            <div class="about__avatar">
                <img :src="icon" alt="avatar" class="about__avatar-img" />
            </div>
            <h1 class="about__title">关于我</h1>
            <div class="about__subtitle">Web前端开发工程师</div>
        </div>

        <div class="about__content">
            <div class="about__section about__education">
                <h2 class="about__section-title">教育背景</h2>
                <div class="about__education-content">
                    <div class="about__school">西南大学</div>
                    <div class="about__major">软件工程 · 本科</div>
                    <div class="about__time">2021.09 - 2025.06</div>
                    <div class="about__achievements">
                        <span class="about__tag">211</span>
                        <span class="about__tag">双一流</span>
                        <span class="about__tag">专业前20%</span>
                        <span class="about__tag">CET-4: 591</span>
                        <span class="about__tag">CET-6</span>
                    </div>
                </div>
            </div>

            <div class="about__section about__skills">
                <h2 class="about__section-title">技术栈</h2>
                <div class="about__skills-content">
                    <div class="about__skill-item">
                        <div class="about__skill-category">前端开发</div>
                        <div class="about__skill-list">
                            <span class="about__skill-tag">Vue.js</span>
                            <span class="about__skill-tag">ES6+</span>
                            <span class="about__skill-tag">Sass</span>
                            <span class="about__skill-tag">TailwindCSS</span>
                            <span class="about__skill-tag">Vuex/Pinia</span>
                            <span class="about__skill-tag">Vue Router</span>
                            <span class="about__skill-tag">Element UI</span>
                            <span class="about__skill-tag">Ant Design Vue</span>
                            <span class="about__skill-tag">Vuetify</span>
                        </div>
                    </div>
                    <div class="about__skill-item">
                        <div class="about__skill-category">后端开发</div>
                        <div class="about__skill-list">
                            <span class="about__skill-tag">Node.js</span>
                            <span class="about__skill-tag">Nest.js</span>
                        </div>
                    </div>
                    <div class="about__skill-item">
                        <div class="about__skill-category">开发工具</div>
                        <div class="about__skill-list">
                            <span class="about__skill-tag">Webpack</span>
                            <span class="about__skill-tag">Vite</span>
                            <span class="about__skill-tag">Git</span>
                            <span class="about__skill-tag">Charles</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="about__section about__experience">
                <h2 class="about__section-title">实习经历</h2>
                <div class="about__experience-item">
                    <div class="about__company">京东</div>
                    <div class="about__position">前端开发实习生</div>
                    <div class="about__time">2024.04 - 2024.09</div>
                </div>
                <div class="about__experience-item">
                    <div class="about__company">唱吧</div>
                    <div class="about__position">前端开发实习生</div>
                    <div class="about__time">2024.02 - 2024.04</div>
                </div>
                <div class="about__experience-item">
                    <div class="about__company">西南电力设计院有限公司</div>
                    <div class="about__position">前端开发实习生</div>
                    <div class="about__time">2023.06 - 2023.08</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import icon from '@/src/assets/homepage/icon.jpg';

onMounted(() => {
    window.isShowFooter = false;
});
</script>

<style lang="scss" scoped>
.about {
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
    }

    &__avatar {
        margin-bottom: 1rem;

        &-img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            object-fit: cover;
            box-shadow: 0 4px 20px rgba(74, 144, 226, 0.2);
            border: 3px solid #fff;
        }
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
        padding: 0 2rem; // 增加左右内边距
        padding-bottom: 2rem; // 增加底部内边距
        max-height: calc(100% - 200px);
    }

    &__section {
        margin-bottom: 2rem;

        &-title {
            font-size: 1.5rem;
            font-weight: 500;
            margin-bottom: 1rem;
            color: #1a365d;
            border-bottom: 2px solid #e2e8f0;
            padding-bottom: 0.5rem;
        }
    }

    &__education {
        &-content {
            background: rgba(74, 144, 226, 0.05);
            border-radius: 12px;
            padding: 1.5rem;
        }
    }

    &__school {
        font-size: 1.3rem;
        font-weight: 600;
        color: #2d3748;
        margin-bottom: 0.5rem;
    }

    &__major {
        font-size: 1.1rem;
        color: #4a5568;
        margin-bottom: 0.5rem;
    }

    &__time {
        font-size: 0.9rem;
        color: #718096;
        margin-bottom: 0.5rem;
    }

    &__tag {
        display: inline-block;
        padding: 0.2rem 0.8rem;
        background: rgba(74, 144, 226, 0.1);
        color: #4a90e2;
        border-radius: 20px;
        font-size: 0.9rem;
        margin-right: 0.5rem;
        margin-bottom: 0.5rem;
    }

    &__skills {
        &-content {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
        }
    }

    &__skill {
        &-item {
            background: rgba(74, 144, 226, 0.05);
            border-radius: 12px;
            padding: 1rem;
            margin-bottom: 1rem;
        }

        &-category {
            font-weight: 500;
            color: #2d3748;
            margin-bottom: 0.8rem;
        }

        &-tag {
            display: inline-block;
            padding: 0.2rem 0.8rem;
            background: #4a90e2;
            color: white;
            border-radius: 20px;
            font-size: 0.9rem;
            margin-right: 0.5rem;
            margin-bottom: 0.5rem;
        }
    }

    &__experience {
        &-item {
            background: rgba(74, 144, 226, 0.05);
            border-radius: 12px;
            padding: 1.5rem;
            margin-bottom: 1rem;
            transition: transform 0.3s ease;

            &:hover {
                transform: translateX(10px);
            }
        }
    }

    &__company {
        font-size: 1.2rem;
        font-weight: 600;
        color: #2d3748;
        margin-bottom: 0.5rem;
    }

    &__position {
        font-size: 1rem;
        color: #4a5568;
        margin-bottom: 0.5rem;
    }
}
</style>
