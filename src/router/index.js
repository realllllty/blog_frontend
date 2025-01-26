import { createRouter, createWebHistory } from "vue-router";

// 引入
import Home from "@/src/views/Home.vue"
import MyBlog from "@/src/views/Blog/MyBlog.vue"
import NotFound from "@/src/views/NotFound.vue"
import FullPage from "@/src/views/FullPage.vue";
import BlogDetail from "@/src/views/Blog/BlogDetail.vue"
import GalleryDetail from "/src/views/Gallery/GalleryDetail.vue"
import Admin from "@/src/views/Admin/Main.vue"

// 博客管理
import BlogList from "@/src/views/Admin/Blog/List.vue"
import BlogEdit from "@/src/views/Admin/Blog/Edit.vue"

// 图库管理
import GalleryList from "@/src/views/Admin/Gallery/List.vue"
import GalleryCreate from "@/src/views/Admin/Gallery/Create.vue"
import GalleryEdit from "@/src/views/Admin/Gallery/Edit.vue"

// 路由信息
let routes = [
    {
        path: "/admin",
        component: Admin,
        children:[
            {
                path: "blog",
                name: "BlogList",
                component: BlogList
            },
            {
                path: "blog/create",
                name: "BlogCreate",
                component: BlogEdit
            },
            {
                path: "blog/edit/:name",
                name: "BlogEdit",
                component: BlogEdit
            },
            {
                path: "gallery",
                name: "GalleryList",
                component: GalleryList
            },
            {
                path: "gallery/create",
                name: "GalleryCreate",
                component: GalleryCreate
            },
            {
                path: "gallery/edit/:id",
                name: "GalleryEdit",
                component: GalleryEdit
            }
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
                path: "about",
                name: "About",
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
