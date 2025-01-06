<template>
    <div class="outline">
        <div class="outline_title">
            Index
        </div>
        <div class="outline_content">
            <div v-for="heading in localHeadings" :key="heading.id"
                :class="{ activated: heading.isActivate, [`outline_content-level-${heading.level}`]: true }"
                @mouseenter="highlightItem" @mouseleave="resetHighlight" @click="emitHeading(heading)">
                <span class="outline_content-item">{{ heading.title }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, onMounted, ref, defineEmits, watch, computed } from 'vue';
import { gsap } from 'gsap';
import { useBlogStore } from '@/src/stores/article/index.js';
const blogStore = useBlogStore();

const props = defineProps({
    headings: {
        type: Array,
        required: true
    }
});
const localHeadings = computed(() => props.headings);
const emit = defineEmits(['heading-clicked']);

// 点击大纲项，触发滚动
const emitHeading = (heading) => {
    emit('heading-clicked', heading.title);
};

// 使用 refs 对每个列表项应用动画效果
const highlightItem = (event) => {
    if (!event.target.classList.contains('activated')) {
        gsap.to(event.target, {
            backgroundColor: '#e6f7ff',
            scale: 1.05,
            duration: 0.3,
            ease: "power1.out"
        });
    }
};
const resetHighlight = (event) => {
    if (!event.target.classList.contains('activated')) {
        gsap.to(event.target, {
            backgroundColor: '#f9fafb',
            scale: 1,
            duration: 0.3,
            ease: "power1.in"
        });
    }
};

// 监听大纲项的变化
watch(() => blogStore.currentHeading, (newHeading) => {
    if (localHeadings.value.length) {
        localHeadings.value.forEach((heading, index) => {
            if (heading.title === newHeading.title) {
                heading.isActivate = true;
            } else {
                heading.isActivate = false;
            }
        });
        console.log(localHeadings.value);
    }
}, { deep: true, immediate: true });

onMounted(() => { });
</script>

<style scoped lang="scss">
.outline {
    padding: 1rem;
    margin: 0;
    // tailwind自己给outline类加上了style(这里去除)
    outline-style: none;
    background-color: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    font-size: 14px;
    position: sticky;
    top: 6rem;
    margin-right: 20px;
    width: fit-content; // 根据内容自适应宽度
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1); // subtle box-shadow

    &_title {
        @include googleFonts("Open Sans", "Noto Sans SC");
        font-weight: 600;
        font-size: 1.125rem;
        margin-bottom: 0.75rem;
        padding-bottom: 0.5rem;
        text-align: left;
        border-bottom: 1px solid #e5e7eb;
        color: #374151;
    }

    &_content {
        padding-bottom: 0.5rem;

        &-item {
            display: block;
            padding: 0.625rem 1rem;
            cursor: pointer;
            border-radius: 0.375rem;
            font-weight: 400;
            font-size: 1rem;
            color: #4b5563;
            transition: background-color 0.3s ease-in-out
        }

        .activated {
            transition: all 0.3s ease;
            background-color: #e6f7ff !important;
        }
    }
}

/* 使用 map 循环生成样式 */
@for $i from 1 through 6 {
    .outline_content-level-#{$i} {
        .outline_content-item {
            padding-left: calc(1rem + ($i - 1) * 0.75rem);
            /* 调整缩进量 */
            font-size: calc(1rem - ($i - 1) * 0.05rem); // 标题级别越深，字号略微减小
        }
    }
}
</style>