import{_ as o,u as p,r as d,o as u,a as l,c as r,b as e,t as g,d as f,e as y,F as m,f as v,g as h}from"./index-54b2b8e7.js";const x={class:"card_picture"},k={class:"card_picture-mainpic"},I=["src"],C={__name:"Card",props:["title","cardImgURL","id"],setup(i){const t=p(),a=i,c=d(null),n=d(null);function s(){t.push(`/fullpage/gallery/detail/${a.id}`)}return u(()=>{}),(_,U)=>(l(),r("div",{class:"card",onClick:s,ref_key:"card",ref:n},[e("div",{class:"card_title",ref_key:"title",ref:c},g(a.title),513),e("div",x,[e("div",k,[e("img",{src:a.cardImgURL,alt:"图片加载失败"},null,8,I)])])],512))}},L=o(C,[["__scopeId","data-v-24764af4"]]);const R={class:"h-full gallery_main",style:{padding:"20px 0px"}},M={__name:"Main",setup(i){u(()=>{a()});const t=f([]);async function a(){const c=await y.get("/api/gallery/list");t.splice(0,t.length,...c)}return(c,n)=>(l(),r("div",null,[n[0]||(n[0]=e("div",{style:{height:"126.41px"}},null,-1)),e("div",R,[(l(!0),r(m,null,v(t,(s,_)=>(l(),r("div",{key:_,style:{width:"70%"}},[h(L,{title:s.name,id:s.id,cardImgURL:s.url,class:"gallery_main__card"},null,8,["title","id","cardImgURL"])]))),128))])]))}},B=o(M,[["__scopeId","data-v-c4cb6c3d"]]);export{B as default};
