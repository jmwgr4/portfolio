// import * as THREE from 'three';
// import * as dat from 'lil-gui';
// import gsap from 'gsap';
// import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
// import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

const scene = new THREE.Scene();
// const gui = new dat.GUI();

const parameters = {
    materialColor: '#ffeded'
}

const canvas = document.querySelector('canvas.webgl');
/**
 * Dark Mode Toggle Logic - Moved to top to avoid initialization errors
 */
const darkToggle = document.querySelector('#dark-toggle');

let nameMaterial = null;

const updateNameColor = () => {
    if (!nameMaterial) return;
    nameMaterial.color.set(darkToggle.checked ? '#ffffff' : '#333333');
};

if (darkToggle){
    darkToggle.addEventListener('change', updateNameColor);
}

const nameCanvas = document.querySelector('#name-canvas');
let nameScene, nameCamera, nameRenderer;

const updateNameCanvasSize = () => {
    if (!nameCanvas || !nameRenderer) return;
    const width = nameCanvas.clientWidth;
    const height = nameCanvas.clientHeight;
    nameRenderer.setSize(width, height, false);
    nameRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    nameCamera.aspect = width / height;
    nameCamera.updateProjectionMatrix();
};

if (nameCanvas) {
    nameScene = new THREE.Scene();
    nameCamera = new THREE.PerspectiveCamera(35, 1, 0.1, 10);
    nameCamera.position.z = 2.5;

    nameRenderer = new THREE.WebGLRenderer({
        canvas: nameCanvas,
        antialias: true,
        alpha: true
    });

    // Initial call to set size
    updateNameCanvasSize();

    const fontLoader = new FontLoader();
    fontLoader.load('/fonts/Poppins_Bold.json', (font) => {
        nameMaterial = new THREE.MeshBasicMaterial({ color: '#333333' });
        const textGeometry = new TextGeometry("Jun Mc Win", {
            font: font,
            size: 0.9,
            height: 0.1,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.001,
            bevelSize: 0.01,
            bevelOffset: 0,
            bevelSegments: 5
        });
        textGeometry.center();

        const text = new THREE.Mesh(textGeometry, nameMaterial);
        nameScene.add(text);

        updateNameColor();
    });
} else {
    console.error("Could not find canvas with ID #name-canvas");
}

const textureLoader = new THREE.TextureLoader();
const gradientTexture = textureLoader.load('/textures/gradients/5.jpg');
gradientTexture.magFilter = THREE.NearestFilter;

const directionalLight = new THREE.DirectionalLight('#ffffff', 3);
directionalLight.position.set(1, 0.25, 0);
scene.add(directionalLight);

const particlesCount = 200
const positions = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
}

const particlesGeometry = new THREE.BufferGeometry();
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const particlesMaterial = new THREE.PointsMaterial({
    color: parameters.materialColor,
    sizeAttenuation: true,
    size: 0.03,
    transparent: true,
    opacity: 0.8
});

//Bot
const botScene = new THREE.Scene();
const botCanvas = document.querySelector('#bot-icon');
const botCamera = new THREE.PerspectiveCamera(35, 1, 0.1, 10);

if (!botCanvas) {
    console.error("Could not find canvas with ID #bot-icon");
} else {

botCamera.position.z = 3;

const botRenderer = new THREE.WebGLRenderer({
    canvas: botCanvas,
    antialias: true,
    alpha: true
});
botRenderer.setSize(32, 32, false);
botRenderer.setPixelRatio(window.devicePixelRatio);

const botGeometry = new THREE.IcosahedronGeometry(1, 0);
const botMaterial = new THREE.MeshBasicMaterial({ color: '#0078d4', wireframe: true });
const botMesh = new THREE.Mesh(botGeometry, botMaterial);
botScene.add(botMesh);

function animateBot() {
    botMesh.rotation.x += 0.01;
    botMesh.rotation.y += 0.01;
    botRenderer.render(botScene, botCamera);
    requestAnimationFrame(animateBot);
}

animateBot();

const updateBotColor = () => {
    botMaterial.color.set(darkToggle.checked ? '#ffffff' : '#000000');
};
if (darkToggle) {
    darkToggle.addEventListener('change', updateBotColor);
    updateBotColor(); // Set initial color
}


}


const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

// gui.addColor(parameters, 'materialColor').onChange(() => {
//     particlesMaterial.color.set(parameters.materialColor);
// });

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

/**
 * Section Meshes
 */
const sectionMeshes = []; // You should add your section objects to this array

let scrollY = window.scrollY;
let currentSection = 0;

const cursor = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', (event) => {
    cursor.x = (event.clientX / sizes.width) - 0.5;
    cursor.y = (event.clientY / sizes.height) - 0.5;
});

window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
    const newSection = Math.round(scrollY / sizes.height);

    if(newSection !== currentSection && sectionMeshes[newSection]) {
        currentSection = newSection;
        gsap.to(sectionMeshes[currentSection].rotation, {
            duration: 1.5,
            ease: 'power2.inOut',
            x: '+=6',
            y: '+=3',
            z: '+=1.5'
        });
    }
});

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;  

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    updateNameCanvasSize();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const cameraGroup = new THREE.Group();
scene.add(cameraGroup);

const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 6;
cameraGroup.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearAlpha(0);

/**
 * Dark Mode Toggle Logic
 */
const updateParticles = () => {
    const isDark = darkToggle.checked;
    particlesMaterial.color.set(isDark ? '#ffffff' : '#000000');
};

if (darkToggle) {
    darkToggle.addEventListener('change', updateParticles);
    updateParticles(); // Set initial color
}

const clock = new THREE.Clock();
let previousTime = 0;

const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - previousTime;
    previousTime = elapsedTime;

    cameraGroup.position.y = - scrollY / sizes.height * 0.5;

    const parallaxX = cursor.x * 0.5;
    const parallaxY = - cursor.y * 0.5;
    camera.position.x += (parallaxX - camera.position.x) * 5 * deltaTime;
    camera.position.y += (parallaxY - camera.position.y) * 5 * deltaTime;

    renderer.render(scene, camera);
    if (nameCanvas) {
        nameRenderer.render(nameScene, nameCamera);
    }

    window.requestAnimationFrame(tick);
};

tick();