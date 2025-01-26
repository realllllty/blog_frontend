<template>
    <div class="blog-list-page">
        <AdminNav />
        <div class="page-header">
            <h2>博客列表</h2>
            <el-button type="primary" @click="$router.push('/admin/blog/create')">新建博客</el-button>
        </div>

        <div class="blog-table">
            <el-table :data="blogList" style="width: 100%">
                <el-table-column prop="title" label="标题" />
                <el-table-column prop="createdAt" label="创建时间">
                    <template #default="scope">
                        {{ new Date(scope.row.createdAt).toLocaleString() }}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="200">
                    <template #default="scope">
                        <el-button type="primary" link @click="$router.push(`/admin/blog/edit/${encodeURIComponent(scope.row.title)}`)">
                            编辑
                        </el-button>
                        <el-button type="danger" link @click="handleDelete(scope.row)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { api } from '@/src/api/axios.js';
import AdminNav from '@/src/components/Admin/AdminNav.vue';

const blogList = ref([]);

// 获取博客列表
const fetchBlogList = async () => {
    try {
        const response = await api.get('/api/articles/list');
        blogList.value = response;
    } catch (error) {
        ElMessage.error('获取博客列表失败');
    }
};

// 删除博客
const handleDelete = (blog) => {
    ElMessageBox.confirm('确定要删除这篇博客吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(async () => {
        try {
            await api.delete('/api/admin/delete-article', {
                data: { id: blog.id }
            });
            ElMessage.success('删除成功');
            fetchBlogList();
        } catch (error) {
            ElMessage.error('删除失败');
        }
    });
};

onMounted(() => {
    fetchBlogList();
});
</script>

<style lang="scss" scoped>
.blog-list-page {
    padding: 2rem;

    .page-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;

        h2 {
            margin: 0;
        }
    }

    .blog-table {
        background: white;
        border-radius: 8px;
        padding: 1rem;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
    }
}
</style> 