<template>
    <div class="blog-manage">
        <div class="blog-manage-header">
            <h2>博客管理</h2>
            <el-button type="primary" @click="showUploadForm = true">新建博客</el-button>
        </div>

        <!-- 博客列表 -->
        <div class="blog-list">
            <el-table :data="blogList" style="width: 100%">
                <el-table-column prop="title" label="标题" />
                <el-table-column prop="createTime" label="创建时间" />
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button type="primary" link @click="editBlog(scope.row)">编辑</el-button>
                        <el-button type="danger" link @click="deleteBlog(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 博客上传/编辑表单 -->
        <el-dialog v-model="showUploadForm" :title="isEditing ? '编辑博客' : '新建博客'" width="70%">
            <div class="blog-form">
                <el-input v-model="blogTitle" placeholder="请输入博客标题" />
                <el-input
                    v-model="blogContent"
                    type="textarea"
                    placeholder="请输入博客内容"
                    :rows="15"
                />
                <div class="dialog-footer">
                    <el-button @click="showUploadForm = false">取消</el-button>
                    <el-button type="primary" @click="submitBlog">
                        {{ isEditing ? '保存' : '发布' }}
                    </el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { api } from '@/src/api/axios.js';

const blogList = ref([]);
const showUploadForm = ref(false);
const blogTitle = ref('');
const blogContent = ref('');
const isEditing = ref(false);
const currentBlogId = ref(null);

// 获取博客列表
const fetchBlogList = async () => {
    try {
        const response = await api.get('/api/admin/blogs');
        blogList.value = response.data;
    } catch (error) {
        ElMessage.error('获取博客列表失败');
    }
};

// 提交博客
const submitBlog = async () => {
    if (!blogTitle.value || !blogContent.value) {
        ElMessage.error('请填写博客标题和内容');
        return;
    }

    try {
        if (isEditing.value) {
            await api.put(`/api/admin/update-blog/${currentBlogId.value}`, {
                title: blogTitle.value,
                content: blogContent.value
            });
            ElMessage.success('博客更新成功');
        } else {
            await api.post('/api/admin/create-blog', {
                title: blogTitle.value,
                content: blogContent.value
            });
            ElMessage.success('博客发布成功');
        }
        showUploadForm.value = false;
        resetForm();
        fetchBlogList();
    } catch (error) {
        ElMessage.error(isEditing.value ? '更新失败' : '发布失败');
    }
};

// 编辑博客
const editBlog = (blog) => {
    isEditing.value = true;
    currentBlogId.value = blog.id;
    blogTitle.value = blog.title;
    blogContent.value = blog.content;
    showUploadForm.value = true;
};

// 删除博客
const deleteBlog = async (blog) => {
    try {
        await api.delete(`/api/admin/delete-blog/${blog.id}`);
        ElMessage.success('删除成功');
        fetchBlogList();
    } catch (error) {
        ElMessage.error('删除失败');
    }
};

// 重置表单
const resetForm = () => {
    blogTitle.value = '';
    blogContent.value = '';
    isEditing.value = false;
    currentBlogId.value = null;
};

onMounted(() => {
    fetchBlogList();
});
</script>

<style lang="scss" scoped>
.blog-manage {
    padding: 2rem;

    .blog-manage-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;

        h2 {
            margin: 0;
        }
    }

    .blog-list {
        margin-top: 2rem;
    }

    .blog-form {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        .el-input {
            margin-bottom: 1rem;
        }
    }

    .dialog-footer {
        margin-top: 1rem;
        text-align: right;
    }
}
</style> 