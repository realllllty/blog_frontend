<template>
    <div class="home">
        <!-- Three.js 背景容器 -->
        <div class="background" ref="backgroundRef"></div>

        <!-- Swiper 卡片容器 -->
        <div class="swiper-container">
            <swiper :effect="'cards'" :grabCursor="true" :modules="modules" :direction="'horizontal'" :cardsEffect="{
                slideShadows: false,
                rotate: false,
                perSlideOffset: 15,
                perSlideRotate: 0
            }" class="about-swiper">
                <swiper-slide>
                    <slide1 />
                </swiper-slide>
                <swiper-slide>
                    <slide2 />
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { EffectCards } from 'swiper/modules'
import slide1 from '../components/Swiper-slides/slide1.vue'
import slide2 from '../components/Swiper-slides/slide2.vue'
import * as THREE from 'three'
import 'swiper/css'
import 'swiper/css/effect-cards'

// Swiper模块配置
const modules = [EffectCards]

// Three.js 相关变量
const backgroundRef = ref(null)
let scene, camera, renderer, particles
let mouseX = 0
let mouseY = 0
let time = 0

// 初始化Three.js场景
const initThree = () => {
    // 创建场景
    scene = new THREE.Scene()

    // 创建透视相机
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    )
    camera.position.z = 50

    // 创建渲染器
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    backgroundRef.value.appendChild(renderer.domElement)

    // 创建粒子系统
    const particlesGeometry = new THREE.BufferGeometry()
    const particleCount = 200
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
        // 位置
        positions[i * 3] = (Math.random() - 0.5) * 100
        positions[i * 3 + 1] = (Math.random() - 0.5) * 100
        positions[i * 3 + 2] = (Math.random() - 0.5) * 50

        // 颜色
        colors[i * 3] = Math.random() * 0.3 + 0.7     // R
        colors[i * 3 + 1] = Math.random() * 0.3 + 0.7 // G
        colors[i * 3 + 2] = Math.random() * 0.3 + 0.7 // B
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.5,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        sizeAttenuation: true
    })

    particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)

    // 创建渐变背景
    const gradientGeometry = new THREE.PlaneGeometry(200, 200)
    const gradientMaterial = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0 },
            mousePosition: { value: new THREE.Vector2(0, 0) }
        },
        vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform float time;
            uniform vec2 mousePosition;
            varying vec2 vUv;

            void main() {
                vec2 position = vUv * 2.0 - 1.0;
                position += mousePosition * 0.1;
                
                float d = length(position);
                vec3 color1 = vec3(0.98, 0.98, 0.98);  // 接近白色
                vec3 color2 = vec3(0.95, 0.95, 1.0);   // 淡蓝色
                vec3 color = mix(color1, color2, d + sin(time * 0.5) * 0.2);
                
                gl_FragColor = vec4(color, 1.0);
            }
        `,
        transparent: true
    })

    const gradientMesh = new THREE.Mesh(gradientGeometry, gradientMaterial)
    gradientMesh.position.z = -10
    scene.add(gradientMesh)
}

// 动画循环
const animate = () => {
    requestAnimationFrame(animate)
    time += 0.01

    if (particles) {
        particles.rotation.x += 0.0003
        particles.rotation.y += 0.0005

        // 更新粒子位置
        const positions = particles.geometry.attributes.position.array
        for (let i = 0; i < positions.length; i += 3) {
            positions[i + 1] += Math.sin((time + positions[i]) * 0.5) * 0.02
        }
        particles.geometry.attributes.position.needsUpdate = true
    }

    // 更新渐变背景
    const gradientMesh = scene.children.find(child => child instanceof THREE.Mesh)
    if (gradientMesh) {
        gradientMesh.material.uniforms.time.value = time
        gradientMesh.material.uniforms.mousePosition.value.x = (mouseX / window.innerWidth) * 2 - 1
        gradientMesh.material.uniforms.mousePosition.value.y = -(mouseY / window.innerHeight) * 2 + 1
    }

    renderer.render(scene, camera)
}

// 处理鼠标移动
const handleMouseMove = (event) => {
    mouseX = event.clientX
    mouseY = event.clientY
}

// 处理窗口大小变化
const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}

// 组件挂载时初始化
onMounted(() => {
    initThree()
    animate()
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)
})

// 组件卸载时清理
onBeforeUnmount(() => {
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('resize', handleResize)
    scene.traverse(object => {
        if (object.geometry) object.geometry.dispose()
        if (object.material) object.material.dispose()
    })
    renderer.dispose()
})
</script>

<style lang="scss" scoped>
.home {
    width: 100vw;
    height: 100vh;
    position: relative;
    overflow: hidden;
    z-index: 0;

    // 背景容器样式
    .background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;

        canvas {
            position: absolute;
            top: 0;
            left: 0;
        }
    }

    // Swiper容器样式
    .swiper-container {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .about-swiper {
            width: 900px;
            height: 600px;
        }

        .swiper-slide {
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(8px);
            border-radius: 20px;
            border: 1px solid rgba(74, 144, 226, 0.2);
            padding: 20px;
            box-shadow:
                0 8px 32px 0 rgba(74, 144, 226, 0.1),
                0 0 0 1px rgba(74, 144, 226, 0.05);

            transition: transform 0.3s ease;

            &:hover {
                transform: translateY(-5px);
            }
        }

        .empty-slide {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: rgba(0, 0, 0, 0.8);
            font-size: 24px;
        }
    }
}
</style>
