<template>
    <div class="admin-nav">
        <div class="nav-links">
            <el-button-group>
                <el-button @click="$router.push('/fullpage/myblog')">
                    <el-icon><HomeFilled /></el-icon>
                    前台首页
                </el-button>
                <el-button @click="$router.push('/admin')">
                    <el-icon><Menu /></el-icon>
                    管理首页
                </el-button>
            </el-button-group>
        </div>
    </div>
</template>

<script setup>
import { HomeFilled, Menu } from '@element-plus/icons-vue';
</script>

<style lang="scss" scoped>
.admin-nav {
    margin-bottom: 1rem;

    .nav-links {
        display: flex;
        gap: 1rem;
    }
}
</style> 