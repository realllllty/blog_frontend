<template>
    <div class="blog-edit-page">
        <AdminNav />
        <div class="page-header">
            <h2>{{ isEdit ? '编辑博客' : '新建博客' }}</h2>
        </div>

        <div class="blog-form">
            <el-form :model="blogForm" label-width="80px">
                <el-form-item label="标题">
                    <el-input v-model="blogForm.title" placeholder="请输入博客标题" />
                </el-form-item>
                <el-form-item label="内容">
                    <el-input v-model="blogForm.content" type="textarea" :rows="20" placeholder="请输入博客内容" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSubmit">{{ isEdit ? '保存' : '发布' }}</el-button>
                    <el-button @click="$router.push('/admin/blog')">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { api } from '@/src/api/axios.js';
import AdminNav from '@/src/components/Admin/AdminNav.vue';

const route = useRoute();
const router = useRouter();
const blogName = computed(() => decodeURIComponent(route.params.name));
const isEdit = computed(() => route.path.includes('edit'));

const blogForm = ref({
    title: '',
    content: '',
    id: ''
});

// 获取博客详情
const fetchBlogDetail = async () => {
    if (!isEdit.value) return;

    try {
        const response = await api.get(`/api/articles/detail/${encodeURIComponent(blogName.value)}`);
        blogForm.value = {
            title: blogName.value,
            content: response.content,
            id: response.id
        };
    } catch (error) {
        ElMessage.error('获取博客详情失败');
    }
};

// 提交表单
const handleSubmit = async () => {
    if (!blogForm.value.title || !blogForm.value.content) {
        ElMessage.error('请填写博客标题和内容');
        return;
    }

    try {
        if (isEdit.value) {
            await api.put('/api/admin/update-article', {
                id: blogForm.value.id,
                content: blogForm.value.content
            });
            ElMessage.success('博客更新成功');
        } else {
            await api.post('/api/admin/create-blog', {
                title: blogForm.value.title,
                content: blogForm.value.content
            });
            ElMessage.success('博客发布成功');
        }
        router.push('/admin/blog');
    } catch (error) {
        ElMessage.error(isEdit.value ? '更新失败' : '发布失败');
    }
};

onMounted(() => {
    fetchBlogDetail();
});
</script>

<style lang="scss" scoped>
.blog-edit-page {
    padding: 2rem;

    .page-header {
        margin-bottom: 2rem;

        h2 {
            margin: 0;
            color: #333;
        }
    }

    .blog-form {
        background: white;
        border-radius: 8px;
        padding: 2rem;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

        .el-form-item:last-child {
            margin-bottom: 0;

            .el-button {
                margin-right: 1rem;
            }
        }
    }
}
</style>