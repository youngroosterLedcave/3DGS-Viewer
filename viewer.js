import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js";
import { PLYLoader } from "https://cdn.jsdelivr.net/npm/three@0.152.2/examples/jsm/loaders/PLYLoader.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.152.2/examples/jsm/controls/OrbitControls.js";

// Google Drive Direktlink
const modelUrl = "https://drive.google.com/uc?export=download&id=1TWIpTEDAm9WIzQHnRNggE8BZZaJZGGFR";

let scene, camera, renderer, controls;

init();
loadModel(modelUrl);
animate();

function init() {
    // Szene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x202020);

    // Kamera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 5);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Licht
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 10, 7.5);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    // Steuerung
    controls = new OrbitControls(camera, renderer.domElement);

    window.addEventListener("resize", onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function loadModel(url) {
    const loader = new PLYLoader();
    loader.load(
        url,
        function (geometry) {
            geometry.computeVertexNormals();
            const material = new THREE.MeshStandardMaterial({ color: 0xcccccc, flatShading: false });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.scale.set(1, 1, 1);
            scene.add(mesh);
        },
        undefined,
        function (error) {
            console.error("Fehler beim Laden der PLY-Datei:", error);
        }
    );
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
