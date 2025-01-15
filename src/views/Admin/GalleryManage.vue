<template>
    <div class="gallery-manage">
        <div class="gallery-manage-header">
            <h2>图片管理</h2>
            <el-button type="primary" @click="showUploadForm = true">新建相册</el-button>
        </div>

        <!-- 相册列表 -->
        <div class="gallery-list">
            <el-table :data="galleryList" style="width: 100%">
                <el-table-column prop="name" label="相册名称" />
                <el-table-column prop="imageCount" label="图片数量" />
                <el-table-column prop="createTime" label="创建时间" />
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button type="primary" link @click="viewGallery(scope.row)">查看</el-button>
                        <el-button type="danger" link @click="deleteGallery(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 上传表单 -->
        <el-dialog v-model="showUploadForm" title="新建相册" width="70%">
            <div class="upload-form">
                <el-input v-model="galleryName" placeholder="请输入相册名称" />
                <el-upload class="upload-demo" :http-request="uploadToCloudflare" :on-success="uploadSuccess"
                    list-type="picture-card" multiple>
                    <el-icon>
                        <Plus />
                    </el-icon>
                </el-upload>
                <div class="dialog-footer">
                    <el-button @click="showUploadForm = false">取消</el-button>
                    <el-button type="primary" @click="submitGallery">创建相册</el-button>
                </div>
            </div>
        </el-dialog>

        <!-- 相册详情 -->
        <el-dialog v-model="showGalleryDetail" title="相册详情" width="80%">
            <div class="gallery-detail">
                <div class="image-grid">
                    <div v-for="(url, index) in currentGalleryImages" :key="index" class="image-item">
                        <el-image :src="url" fit="cover" />
                        <el-button type="danger" icon="Delete" circle @click="deleteImage(index)" />
                    </div>
                </div>
                <el-upload class="upload-demo" :http-request="uploadToCloudflare"
                    :on-success="(res) => uploadSuccess(res, true)" list-type="picture-card" multiple>
                    <el-icon>
                        <Plus />
                    </el-icon>
                </el-upload>
            </div>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import { api } from '@/src/api/axios.js';
import Compressor from 'compressorjs';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const galleryList = ref([]);
const showUploadForm = ref(false);
const showGalleryDetail = ref(false);
const galleryName = ref('');
const uploadFiles = ref([]);
const currentGalleryImages = ref([]);
const currentGalleryId = ref(null);

const puburl = import.meta.env.VITE_CLOUDFLARE_PUB_URL;
const endpoint = import.meta.env.VITE_CLOUDFLARE_UPLOAD_URL;
let client;

// 初始化 S3 客户端
const initS3 = async () => {
    if (!client) {
        const tokenResponse = await api.get('/api/admin/cloudflare-temporary-token');
        client = new S3Client({
            region: "auto",
            endpoint: endpoint,
            credentials: {
                ...tokenResponse
            },
        });
    }
}

// 获取相册列表
const fetchGalleryList = async () => {
    try {
        const response = await api.get('/api/admin/galleries');
        galleryList.value = response.data;
    } catch (error) {
        ElMessage.error('获取相册列表失败');
    }
};

// 上传图片到Cloudflare
const uploadToCloudflare = async (options) => {
    if (options.file.type.startsWith('image/')) {
        new Compressor(options.file, {
            quality: 0.6,
            async success(result) {
                await uploadImage(result);
                options.onSuccess();
                ElMessage.success('图片上传成功');
            },
            error(err) {
                options.onError();
                ElMessage.error('图片压缩失败');
            },
        });
    } else {
        ElMessage.error('请上传图片文件');
        return;
    }
}

// 上传图片
const uploadImage = async (image) => {
    const params = {
        Bucket: "blog",
        Key: image.name,
        Body: image,
        ContentType: image.type
    };
    try {
        await client.send(new PutObjectCommand(params));
    } catch (err) {
        ElMessage.error('上传失败');
        throw err;
    }
}

// 上传成功回调
const uploadSuccess = (res, isAddingToExisting = false) => {
    const encodedUrl = encodeURIComponent(res.file.name);
    const imageUrl = puburl + '/' + encodedUrl;

    if (isAddingToExisting) {
        currentGalleryImages.value.push(imageUrl);
        updateGallery();
    } else {
        uploadFiles.value.push(imageUrl);
    }
}

// 提交相册
const submitGallery = async () => {
    if (!galleryName.value || !uploadFiles.value.length) {
        ElMessage.error('请填写相册名称并上传图片');
        return;
    }

    try {
        await api.post('/api/admin/create-gallery', {
            name: galleryName.value,
            urls: uploadFiles.value
        });
        ElMessage.success('相册创建成功');
        showUploadForm.value = false;
        resetForm();
        fetchGalleryList();
    } catch (error) {
        ElMessage.error('创建失败');
    }
}

// 查看相册
const viewGallery = (gallery) => {
    currentGalleryId.value = gallery.id;
    currentGalleryImages.value = gallery.urls || [];
    showGalleryDetail.value = true;
}

// 更新相册
const updateGallery = async () => {
    try {
        await api.put(`/api/admin/update-gallery/${currentGalleryId.value}`, {
            urls: currentGalleryImages.value
        });
        fetchGalleryList();
    } catch (error) {
        ElMessage.error('更新失败');
    }
}

// 删除图片
const deleteImage = async (index) => {
    currentGalleryImages.value.splice(index, 1);
    await updateGallery();
}

// 删除相册
const deleteGallery = async (gallery) => {
    try {
        await api.delete(`/api/admin/delete-gallery/${gallery.id}`);
        ElMessage.success('删除成功');
        fetchGalleryList();
    } catch (error) {
        ElMessage.error('删除失败');
    }
}

// 重置表单
const resetForm = () => {
    galleryName.value = '';
    uploadFiles.value = [];
}

onMounted(() => {
    initS3();
    fetchGalleryList();
});
</script>

<style lang="scss" scoped>
.gallery-manage {
    padding: 2rem;

    .gallery-manage-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;

        h2 {
            margin: 0;
        }
    }

    .gallery-list {
        margin-top: 2rem;
    }

    .upload-form {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        .el-input {
            margin-bottom: 1rem;
        }
    }

    .gallery-detail {
        .image-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 1rem;
            margin-bottom: 2rem;

            .image-item {
                position: relative;
                aspect-ratio: 1;

                .el-image {
                    width: 100%;
                    height: 100%;
                    border-radius: 8px;
                }

                .el-button {
                    position: absolute;
                    top: 8px;
                    right: 8px;
                    padding: 8px;
                }
            }
        }
    }

    .dialog-footer {
        margin-top: 1rem;
        text-align: right;
    }
}
</style>