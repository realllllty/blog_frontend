import { createRouter, createWebHistory } from "vue-router";

// 引入
import Home from "@/src/views/Home.vue"
import MyBlog from "@/src/views/Blog/MyBlog.vue"
import NotFound from "@/src/views/NotFound.vue"
import FullPage from "@/src/views/FullPage.vue";
import BlogDetail from "@/src/views/Blog/BlogDetail.vue"
import GalleryDetail from "/src/views/Gallery/GalleryDetail.vue"
import Admin from "@/src/views/Admin/Main.vue"
import ImageUpload from "../views/Admin/ImageUpload.vue";

// 路由信息
let routes = [
    {
        path: "/admin",
        component: Admin,
        children:[
            {
                path: "imageupload",
                name: "imageupload",
                component: ImageUpload
            },
        ]
    },
    {
        path: "/fullpage",
        component: FullPage,
        children:[
            {
                path: "myblog",
                name: "MyBlog",
                component: MyBlog
            },
            {
                path: "myblog/:name/:heading?",
                name: "BlogDetail",
                component: BlogDetail
            },
            {
                path: "Home",
                name: "Home",
                component: Home
            },
            {
                path: "gallery",
                name: "Gallery",
                component: () => import("/src/views/Gallery/Main.vue"),
            },
            {
                path: "gallery/detail/:id",
                name: "GalleryDetail",
                component: GalleryDetail
            }
        ]
    },
    {
        path:"",
        redirect:"/fullpage/myblog"
    },
    {
        path:"/:pathMatch(.*)*",
        component: NotFound,
    }

];

// 路由器
const router = createRouter({
    history: createWebHistory(), // HTML5模式
    routes:routes,
});

export default router;
