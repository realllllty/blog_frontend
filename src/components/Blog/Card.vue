<template>
    <div class="card">
        <div
            class="card_title"
            @click="onClick"
        >
            {{ props.title }}
        </div>
        <p class="card_time">
            {{ props.time.slice(0, 10) }}
        </p>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
let router = useRouter();

const props = defineProps(['title', 'time'])

function onClick() {
    router.push(`/fullpage/myblog/${props.title}`)
}
</script>

<style scoped lang="scss">

/* 字体配置导入 */
/* 
    Alumni Sans Pinstripe
    Noto Serif Simplified Chinese 
*/


.card_title {
    font-weight: 200;
    font-size: 30px;
    @include googleFonts("Open Sans", "Noto Sans SC");
}

p {
    font-size: 25px;
    @include googleFonts("Alumni Sans Pinstripe", sans-serif);
}

</style>