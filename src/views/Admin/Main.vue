<template>
    <div class="admin">
        <h2>图片上传</h2>
        <div class="image-upload-container">
            <el-input v-model="galleryName" placeholder="请输入图库名称" style="width: 300px" />
            <el-upload 
                class="upload-demo" 
                :http-request="uploadToCloudflare"
                :on-success="uploadSuccess"
                list-type="picture"
                multiple
            >
                <el-button type="primary">
                    选择图片
                </el-button>
            </el-upload>
            <el-divider />
            <el-button type="primary" @click="uploadGallery">
                上传相册集
            </el-button>
        </div>

        <el-divider />

        <h2>博客上传</h2>
        <div class="blog-upload-container">
            <el-input v-model="blogTitle" placeholder="请输入博客标题" style="width: 500px" />
            <el-input v-model="blogContent" type="textarea" placeholder="请输入博客内容" :rows="10" style="margin-top: 10px" />
            <el-button type="primary" style="margin-top: 10px" @click="uploadBlog">上传博客</el-button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { api } from '@/src/api/axios.js';
import Compressor from 'compressorjs';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const galleryName = ref('');
const blogTitle = ref('');
const blogContent = ref('');
const puburl = import.meta.env.VITE_CLOUDFLARE_PUB_URL;
const endpoint = import.meta.env.VITE_CLOUDFLARE_UPLOAD_URL;
const uploadFiles = [];
let client;

// 上传相册集
const uploadGallery = async () => {
    if (!galleryName.value || !uploadFiles.length) {
        ElMessage.error('请填写图库名称或上传图片');
        return;
    }
    try {
        await api.post('/api/admin/create-gallery', {
            name: galleryName.value,
            urls: uploadFiles
        });
        ElMessage.success('相册集创建成功');
    } catch (error) {
        ElMessage.error('上传失败');
    }
}

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


// 上传图片
const uploadToCloudflare = async (options) => {

    if (options.file.type.startsWith('image/')) {
        // 上传前图片压缩
        new Compressor(options.file, {
            quality: 0.6,
            async success(result) {
                await uploadImage(result);
                options.onSuccess();
                ElMessage.success('图片压缩成功');
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

/**
 * 上传所需文件
 * Notice: 因为使用的是PUT方法, 触发预检请求(会检查Access-Control-Allow-Headers: 允许的自定义头部字段)
 * 需要在R2配置允许的自定义请求头为*
 */
const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append('file', image);
    const params = {
        Bucket: "blog",
        Key: image.name,
        Body: image,
        ContentType: image.type
    };
    try {
        await client.send(new PutObjectCommand(params));
        ElMessage.success('上传图片成功');
    } catch (err) {
        ElMessage.error('上传失败');
    }
}

// 上传成功
const uploadSuccess = (res, file, files) => {
    // 将特定字符转换为 UTF-8 编码的转义序列(URI 中只允许包含特定的 ASCII 字符)
    // 编码 URI 的组成部分
    const encodedUrl = encodeURIComponent(file.name);
    uploadFiles.push(puburl + '/' + encodedUrl);
}

// 上传博客
const uploadBlog = async () => {
    if (!blogTitle.value || !blogContent.value) {
        ElMessage.error('请填写博客标题或内容');
        return;
    }
    try {
        await api.post('/api/admin/create-blog', {
            title: blogTitle.value,
            content: blogContent.value
        });
        ElMessage.success('博客上传成功');
    } catch (error) {
        ElMessage.error('上传失败');
    }
}

onMounted(() => {
    initS3();
})
</script>

<style lang="scss" scoped>
.admin {
    padding: 40px;

    .image-upload-container,
    .blog-upload-container {
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 8px;
        margin-bottom: 20px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .image-upload-container h3,
    .blog-upload-container h3 {
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
</style>
