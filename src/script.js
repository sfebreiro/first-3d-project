import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import gsap from 'gsap'


/**
 * Base
 */

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/textures/matcaps/4.png')
matcapTexture.colorSpace = THREE.SRGBColorSpace

/**
 * Object
 */
// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial({color: 0xff3054})
// )
// scene.add(cube)

/**
 * Fonts
 */
const fontLoader = new FontLoader()

fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) =>
    {
        const textGeometry = new TextGeometry(
            `Random \n3d \nthings`,
            {
                font: font,
                size: 0.8,
                height: 0.2,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5
            }
        )
        const textMaterial = new THREE.MeshNormalMaterial()
        const text = new THREE.Mesh(textGeometry, textMaterial)
        scene.add(text)
        
        textGeometry.center()   
    }
)

for(let i = 0; i < 50; i++) {
    const sphereGeometry = new THREE.SphereGeometry(0.25, 32, 16)
    
    const sphereMaterial = new THREE.MeshMatcapMaterial({matcap: matcapTexture})

    // const sphereMaterial = new THREE.MeshPhysicalMaterial()

    // const sphereMaterial = new THREE.MeshPhongMaterial()
    // sphereMaterial.shininess = 100
    // sphereMaterial.specular = new THREE.Color(0x1188ff)

    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
    
    scene.add(sphere)
    sphere.position.x = (Math.random() - 0.5) * 10
    sphere.position.y = (Math.random() - 0.5) * 10
    sphere.position.z = (Math.random() - 0.5) * 10

    gsap.fromTo(sphere.position, {
        x: sphere.position.x * Math.random() * 10, 
        y: sphere.position.y * Math.random() * 10, 
        z: sphere.position.z * Math.random() * 10, 
    },
    { 
        yoyo: true,
        duration: 5, 
        delay: 1, 
        x: 0, 
        y: 0, 
        z: 0, 
        ease: "bounce.out",
        repeat: 100
    })

}
    
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = - 1
camera.position.y = - 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
})
renderer.setClearColor( 0x000000, 0 );
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
// const clock = new THREE.Clock()

const tick = () =>
{
    // const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()