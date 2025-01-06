<template height="100%">
    <div>
        <div style="height: 126.41px">
        </div>
        <div class="flex flex-col mx-10 align-center" :style="{ padding: '20px 0px' }">
            <div class="gallery">
                <div class="font-bold font-serif text-2xl italic">Lin's Photo Gallery</div>
                <div class="italic font-serif">Made by Canon & Panasonic & Sony Cameras</div>

                <div class="gallery-photo grid grid-cols-4 gap-5 my-3">
                    <div v-for="(item, index) in imageSet" :key="index" class="gallery-photo_item">
                        <v-img 
                            :src="item.url" 
                            aspect-ratio="1" 
                            cover 
                            @click="openDialog(item)"
                            transition="scale-transition"
                        >
                            <template v-slot:placeholder>
                                <v-row class="fill-height ma-0" align="center" justify="center">
                                    <v-progress-circular indeterminate color="grey-lighten-5"></v-progress-circular>
                                </v-row>
                            </template>
                        </v-img>
                    </div>
                </div>
                <v-dialog v-model="dialog" width="1000px" class="gallery-dialog">
                    <v-card class="gallery-dialog_card">
                        <div>
                            <v-img 
                                :max-height="800" 
                                :src="detailURL" 
                                :lazy-src="detailURL"
                            >
                                <template v-slot:placeholder>
                                    <v-row class="h-full ma-0" align="center" justify="center">
                                        <v-progress-circular indeterminate color="grey-lighten-5"></v-progress-circular>
                                    </v-row>
                                </template>
                            </v-img>
                        </div>

                        <v-card-subtitle class="my-3">
                            {{ detailDesc }}
                        </v-card-subtitle>
                        <!-- <v-card-actions class="flex justify-center">
                            <v-btn color="primary" button @click="dialog = false">关闭</v-btn>
                        </v-card-actions> -->
                    </v-card>
                </v-dialog>
            </div>


        </div>
    </div>

</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { api } from '@/src/api/axios.js';

const route = useRoute();
const galleryID = route.params.id;
const dialog = ref(false);
const detailURL = ref("");
const detailDesc = ref("");
const imageSet = ref([]);

function openDialog(item) {
    dialog.value = true;
    detailURL.value = item.url;
    detailDesc.value = item.desc;
}

async function getImagesURL() {
    const urls = await api.get(`/api/gallery/pictures/${galleryID}`);
    imageSet.value = urls;
}

onMounted(() => {
    getImagesURL();
})

</script>


<style lang="scss" scoped>
.pic {
    background: aliceblue;
    height: 300px;
    width: 300px;
}

.gallery {
    width: 1260px;

    &-photo {
        &_item {
            transition: transform 0.15s ease-in-out; /* 添加默认的 transition */
        }
        &_item:hover {
            transform: scale(1.05);
            will-change: transform;
        }
    }

    &-dialog {
        ::-webkit-scrollbar { display: none; }
        &_card {
            padding: 20px;
            
        }
    }
}
</style>
