<template>
    <div class="gallery-edit-page">
        <AdminNav />
        <h2>编辑图库</h2>
        <div class="edit-container">
            <el-input v-model="galleryForm.name" placeholder="请输入图库名称" style="width: 300px" />

            <!-- 图片列表 -->
            <div class="image-list" v-if="imageList.length">
                <el-divider>已上传图片</el-divider>
                <el-table :data="imageList" style="width: 100%">
                    <el-table-column label="预览图" width="200">
                        <template #default="scope">
                            <el-image :src="scope.row.url" fit="cover"
                                style="width: 180px; height: 180px; border-radius: 4px;" />
                        </template>
                    </el-table-column>
                    <el-table-column prop="desc" label="描述">
                        <template #default="scope">
                            <el-input v-model="scope.row.desc" type="textarea" :rows="3" placeholder="请输入图片描述" />
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="200" fixed="right">
                        <template #default="scope">
                            <div class="operation-buttons">
                                <el-button v-if="galleryForm.url !== scope.row.url" type="primary" link
                                    @click="handleSetCover(scope.row)">
                                    设为头图
                                </el-button>
                                <el-tag v-else type="success" size="small">当前头图</el-tag>
                                <el-button type="danger" link @click="handleDeleteImage(scope.row)">
                                    删除
                                </el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <!-- 上传新图片 -->
            <el-divider>上传新图片</el-divider>
            <el-upload class="upload-demo" :http-request="uploadToCloudflare" :on-success="uploadSuccess"
                list-type="picture" multiple>
                <el-button type="primary">
                    选择图片
                </el-button>
            </el-upload>

            <el-divider />

            <div class="action-buttons">
                <el-button type="primary" @click="handleSubmit">保存修改</el-button>
                <el-button @click="$router.push('/admin/gallery')">返回列表</el-button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import { api } from '@/src/api/axios.js';
import Compressor from 'compressorjs';
import { S3Client, PutObjectCommand, DeleteObjectsCommand } from "@aws-sdk/client-s3";
import AdminNav from '@/src/components/Admin/AdminNav.vue';

const route = useRoute();
const router = useRouter();
const galleryId = route.params.id;

// 图片原始增量列表
let imageList_ori = [];

// 图库基本信息
const galleryForm = ref({
    name: '',
    url: '',  // 头图URL
});

// 图库对应图片列表
const imageList = ref([]);

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

// 获取图库详情
const fetchGalleryDetail = async () => {
    try {
        // 获取图库基本信息
        const galleryResponse = await api.get('/api/gallery/list');
        const gallery = galleryResponse.find(g => g.id === parseInt(galleryId));
        if (gallery) {
            galleryForm.value = {
                ...gallery,
                url: gallery.url || ''  // 确保url存在，即使为空
            };
        }

        // 获取图片列表
        imageList_ori = await api.get(`/api/gallery/pictures/${galleryId}`);
        imageList.value = [...imageList_ori];
        // 前端修改的imageList反应到galleryForm.value.pictures中
        galleryForm.value.pictures = imageList;
    } catch (error) {
        ElMessage.error('获取图库详情失败' + error);
    }
};

// 设置头图
const handleSetCover = async (image) => {
    galleryForm.value.url = image.url;
};

// 上传图片
const uploadToCloudflare = async (options) => {
    if (client) {
        if (options.file.type.startsWith('image/')) {
            // 上传前图片压缩
            new Compressor(options.file, {
                quality: 0.6,
                async success(result) {
                    await uploadImage(result);
                    ElMessage.success('图片压缩成功');
                },
                error(err) {
                    ElMessage.error('图片压缩失败' + err);
                },
            });
        } else {
            ElMessage.error('请上传图片');
            return;
        }
    } else {
        ElMessage.error('S3客户端未初始化');
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



// 上传成功回调
// 上传成功
const uploadSuccess = (res, file, files) => {
    // 将特定字符转换为 UTF-8 编码的转义序列(URI 中只允许包含特定的 ASCII 字符)
    // 编码 URI 的组成部分
    const encodedUrl = encodeURIComponent(file.name);
    // 将图片URL添加到galleryForm.value.pictures中
    galleryForm.value.pictures.push({ url: puburl + '/' + encodedUrl});
    imageList_ori.push({ url: puburl + '/' + encodedUrl});
}

// 更新图片描述
// const handleDescChange = async (image) => {
//     image.desc = image.desc;
// }

// 删除图片, 仅从列表中删除
const handleDeleteImage = (image) => {
    // 如果删除的是头图, 则将头图设置为第一个图片
    if (image.url === galleryForm.value.url) {
        galleryForm.value.url = imageList.value[0].url;
    }
    imageList.value = imageList.value.filter(item => item.url !== image.url);
}

// 提交表单
const handleSubmit = async () => {
    if (!galleryForm.value.name) {
        ElMessage.error('请填写图库名称');
        return;
    }
    try {
        await api.put(`/api/admin/update-gallery`, {
            id: galleryId,
            name: galleryForm.value.name,
            url: galleryForm.value.url,
            pictures: galleryForm.value.pictures
        });
        ElMessage.success('图库更新成功');
        router.push('/admin/gallery');
    } catch (error) {
        ElMessage.error('更新失败');
    }
    
    // 操作对象存储删除图片
    const deleteImagesList = imageList_ori.filter(i => {
        return imageList.value.findIndex(ii => {
            return ii.url === i.url;
        }) === -1;
    }).map(item => decodeURIComponent(item.url.split('/').pop()));

    if (deleteImagesList.length) {
        deleteImages(deleteImagesList);
    }
};

// 删除图片
const deleteImages = async (names) => {
    const params = {
        Bucket: "blog",
        Delete: {
            Objects: []
        }
    };
    names.forEach(name => {
        params.Delete.Objects.push({ Key: name });
    })
    try {
        await client.send(new DeleteObjectsCommand(params));
        ElMessage.success('删除图片已从对象存储中删除');
    } catch (err) {
        ElMessage.error('对象存储操作失败' + err);
    }
}

onMounted(() => {
    initS3();
    fetchGalleryDetail();
});
</script>

<style lang="scss" scoped>
.gallery-edit-page {
    padding: 40px;

    h2 {
        margin-bottom: 20px;
    }

    .edit-container {
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 8px;
        margin-bottom: 20px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

        .el-input {
            margin-bottom: 10px;
        }

        .image-list {
            margin: 20px 0;

            .operation-buttons {
                display: flex;
                align-items: center;
                gap: 10px;
            }
        }

        .el-upload {
            margin-top: 10px;
        }

        .action-buttons {
            margin-top: 20px;
            text-align: center;

            .el-button {
                margin: 0 10px;
            }
        }
    }
}
</style>