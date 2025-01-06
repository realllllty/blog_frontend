import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export const useBlogStore = defineStore('blog', () => {
    // State
    const currentHeading = ref(null);

    const router = useRouter();
    const route = useRoute();

    function setCurrentHeading(heading) {
        currentHeading.value = heading;
    }

    // 监听 currentHeading 的变化, 并更新路由
    watch(currentHeading, (newHeading) => {
        // 使用 replace 方法更新路由(方法更新路由，避免产生历史记录)，避免产生历史记录
        router.replace({
            name: route.name,
            params: {
                ...route.params,
                heading: newHeading.title,
            },
        });
    }, { deep: true }); // 使用 deep: true 监听对象内部属性的变化

    return {
        currentHeading,
        setCurrentHeading,
    };
});
