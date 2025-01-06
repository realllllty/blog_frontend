<template>
    <div>
        <div style="height: 126.41px"></div>
        <div class="blog_detail">
            <div class="blog_detail__wrapper" ref="contentDom" v-html="md.render(content)"></div>
            <div class="blog_detail__outliner">
                <Outliner :headings="headings" @heading-clicked="scrollToHeading"></Outliner>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { api } from '@/src/api/axios.js';
import { onMounted, ref, watch } from 'vue';
import markdownit from "markdown-it";
import hljs from 'highlight.js';
import { mark } from '@mdit/plugin-mark';
import 'highlight.js/styles/brown-paper.css';

// 引入大纲组件
import Outliner from '@/src/components/Blog/Outliner.vue';

// 引入blogstore
import { useBlogStore } from '@/src/stores/article/index.js';
const blogStore = useBlogStore();

const route = useRoute();
const blogName = ref(route.params.name);

onMounted(() => {
    fetchContent();
    observeDomChanges();
});

// 内容数据
const content = ref('');
async function fetchContent() {
    const response = await api.get(`/api/articles/detail/${blogName.value}`);
    content.value = response;
}

// 获取heading state
const currentHeading = route.params.heading;
blogStore.setCurrentHeading({ title: currentHeading });


// 渲染md内容
const md = markdownit({
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(str, { language: lang }).value;
            } catch (__) { }
        }
        // 使用额外的默认转义 
        return '';
    }
}).use(mark);

// 大纲相关-提取标题
const contentDom = ref(null);
const headings = ref([]);

// 获取标题对应的DOM, 添加交叉观察者
async function extractHeadings() {
    const headingsArray = [];
    const domElements = contentDom.value;
    // domElements是动态的, 会遇到console打印错误问题
    domElements.querySelectorAll('h1, h2, h3').forEach((element) => {
        // 收集标题信息
        headingsArray.push({
            level: parseInt(element.tagName[1]),
            title: element.innerText,
            id: element.id
        });
    });
    // 设置默认激活的标题
    headingsArray[0].isActivate = true;
    headings.value = headingsArray;

    // 添加交叉观察者
    const headingsDom = domElements.querySelectorAll('h1, h2, h3');
    const observerOptions = {
        root: null, // 使用视口作为根
        rootMargin: '0px 0px -90% 0px', // 调整以确保元素接近顶部时触发
        threshold: 0
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 设置store中的当前标题
                blogStore.setCurrentHeading({ title: entry.target.innerText });
            }
        });
    }, observerOptions);
    headingsDom.forEach(el => observer.observe(el));
    console.log(currentHeading)
    scrollToHeading(currentHeading, 'instant');
}

// 监听v-html dom变化
// v-html 插入的dom没有对应的v-dom, 不收到响应式的管理
// nextTick 是在 Vue 的虚拟 DOM 更新完成后执行的，但 v-html 的内容插入不受虚拟 DOM 的管理，可能需要额外的时间（如浏览器重绘）才能实际反映到页面上。
function observeDomChanges() {
    const observer = new MutationObserver(() => {
        extractHeadings();
    });
    if (contentDom.value) {
        observer.observe(contentDom.value, { childList: true, subtree: true });
    }
}

// 滚动到指定标题
function scrollToHeading(headingText, behavior = 'smooth') {
    const element = [...document.querySelectorAll(`h1, h2, h3`)];
    element.forEach((el) => {
        if (el.innerText === headingText) {
            el.scrollIntoView({ behavior });
        }
    });
}

</script>

<style scoped lang="scss">
.blog_detail {

    display: flex;
    /*  
        保证outline的sticky能够生效: position: sticky 的元素会相对于其最近的可滚动容器的内容区域定位
        sticky 的边界被限制在这个父级元素的内容区域内，超出这个范围时无法继续生效。如果滚动并没有在这个父级容器上发生，那么 sticky 的效果看起来就像是完全失效了一样。
        设置成了滚动容器, 但是本身不滚动, 就会让sticky失效 
    */
    overflow: visible;

    &::-webkit-scrollbar {
        display: none;
    }

    &__wrapper {
        max-width: 1000px;
        margin: 0 auto;
        padding: 100px 120px 100px 0px;
        flex-grow: 1;

        :deep(p) {
            font-size: 20px;
            line-height: 2;
            @include googleFonts();
        }

        :deep(h1) {
            font-size: 40px;
            font-weight: bold;
            line-height: 3;
            @include googleFonts();
        }

        :deep(h2) {
            font-size: 30px;
            font-weight: bold;
            line-height: 3;
            @include googleFonts();
        }

        :deep(h3) {
            font-size: 25px;
            font-weight: bold;
            line-height: 3;
            @include googleFonts();
        }

        // list-style-type 用于定义列表项目的标记样式
        // 文本标签, 标题标签, 列表标签具有集成特性

        :deep(ol) {
            list-style-type: upper-roman;
            font-size: 20px;
            line-height: 2;
            @include googleFonts();
        }

        :deep(ul) {
            list-style-type: disc;
            font-size: 20px;
            line-height: 2;
            @include googleFonts();
        }

        :deep(li) {
            margin-left: 40px;
        }

        :deep(img) {
            border-radius: 10px;
        }

    }

    &__outliner {
        width: 300px;
    }
}
</style>
