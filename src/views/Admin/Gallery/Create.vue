<template>
    <div class="gallery-create">
        <AdminNav />
        <h2>新建图库</h2>
        <div class="image-upload-container">
            <el-input v-model="galleryName" placeholder="请输入图库名称" style="width: 300px" />
            <el-upload class="upload-demo" :http-request="uploadToCloudflare" :on-success="uploadSuccess"
                list-type="picture" multiple>
                <el-button type="primary">
                    选择图片
                </el-button>
            </el-upload>
            <el-divider />
            <el-button type="primary" @click="uploadGallery">
                创建图库
            </el-button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { api } from '@/src/api/axios.js';
import Compressor from 'compressorjs';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import AdminNav from '@/src/components/Admin/AdminNav.vue';

const router = useRouter();
const galleryName = ref('');
const uploadFiles = [];
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

// 上传图库
const uploadGallery = async () => {
    if (!galleryName.value || !uploadFiles.length) {
        ElMessage.error('请填写图库名称或上传图片');
        return;
    }
    try {
        await api.post('/api/admin/create-gallery', {
            name: galleryName.value,
            pictures: uploadFiles
        });
        ElMessage.success('图库创建成功');
        router.push('/admin/gallery');
    } catch (error) {
        ElMessage.error('创建失败');
    }
}

// 上传图片
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
        ElMessage.error('请上传图片');
        return;
    }
}

// 上传图片到Cloudflare
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
        ElMessage.error('上传失败' + err);
        throw err;
    }
}

// 上传成功回调
const uploadSuccess = (res, file, files) => {
    const encodedUrl = encodeURIComponent(file.name);
    uploadFiles.push({ url: puburl + '/' + encodedUrl });
}

initS3();
</script>

<style lang="scss" scoped>
.gallery-create {
    padding: 40px;

    .image-upload-container {
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 8px;
        margin-bottom: 20px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

        h3 {
            margin-top: 0;
            margin-bottom: 15px;
            color: #333;
        }

        .el-input {
            margin-bottom: 10px;
        }

        .el-upload {
            margin-top: 10px;
        }

        .el-button--primary {
            background-color: #409eff;
            color: white;
        }
    }
}
</style>