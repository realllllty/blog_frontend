<template>
    <div class="admin-container">
        <div class="admin-header">
            <h1>后台管理系统</h1>
        </div>
        <div class="admin-content">
            <div class="admin-cards" v-if="$route.path === '/admin'">
                <div class="admin-card" @click="$router.push('/admin/blog')">
                    <div class="card-icon">📝</div>
                    <h2>博客管理</h2>
                    <p>管理博客内容、发布新文章</p>
                </div>
                <div class="admin-card" @click="$router.push('/admin/gallery')">
                    <div class="card-icon">🖼️</div>
                    <h2>图片管理</h2>
                    <p>管理图片库、上传新图片</p>
                </div>
            </div>
            <router-view v-else></router-view>
        </div>
    </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.admin-container {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.admin-header {
    margin-bottom: 2rem;

    h1 {
        font-size: 2rem;
        color: #333;
    }
}

.admin-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.admin-card {
    background: white;
    border-radius: 10px;
    padding: 2rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    text-align: center;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
    }

    .card-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
    }

    h2 {
        margin: 1rem 0;
        color: #333;
    }

    p {
        color: #666;
    }
}
</style>
