<template>
    <div class="gallery-list-page">
        <AdminNav />
        <div class="page-header">
            <h2>图库列表</h2>
            <el-button type="primary" @click="$router.push('/admin/gallery/create')">新建图库</el-button>
        </div>

        <div class="gallery-grid">
            <el-table :data="galleryList" style="width: 100%">
                <el-table-column prop="id" label="相册ID" />
                <el-table-column prop="name" label="相册名称" />
                <el-table-column label="预览图" width="150">
                    <template #default="scope">
                        <el-image 
                            v-if="scope.row.url"
                            :src="scope.row.url"
                            fit="cover"
                            style="width: 100px; height: 100px; border-radius: 4px;"
                        />
                        <span v-else>暂无图片</span>
                    </template>
                </el-table-column>
                <el-table-column prop="pictureCount" label="图片数量" width="180" />
                <el-table-column prop="createdAt" label="创建时间" width="180">
                    <template #default="scope">
                        {{ new Date(scope.row.createdAt).toLocaleString() }}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="200">
                    <template #default="scope">
                        <el-button type="primary" link @click="$router.push(`/admin/gallery/edit/${scope.row.id}`)">
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

const galleryList = ref([]);

// 获取图库列表
const fetchGalleryList = async () => {
    try {
        const response = await api.get('/api/gallery/list');
        galleryList.value = response;
    } catch (error) {
        ElMessage.error('获取图库列表失败');
    }
};

// 删除图库
const handleDelete = (gallery) => {
    console.log(gallery.id);
    ElMessageBox.confirm('确定要删除这个图库吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(async () => {
        try {
            await api.delete('/api/admin/delete-gallery', {
                data: {
                    id: gallery.id
                }
            });
            ElMessage.success('删除成功');
            fetchGalleryList();
        } catch (error) {
            ElMessage.error('删除失败');
        }
    });
};

onMounted(() => {
    fetchGalleryList();
});
</script>

<style lang="scss" scoped>
.gallery-list-page {
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

    .gallery-grid {
        background: white;
        border-radius: 8px;
        padding: 1rem;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
    }
}
</style> 