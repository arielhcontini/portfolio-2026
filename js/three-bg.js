import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

const CONFIG = {
    colorNiebla: 0x331166,
    nieblaInicio: 0.1,
    nieblaFin: 25.0,
    colorGeometria: 0x120B1A,
    colorLuzToque: 0x320B3A,
    intensidadLuzBase: 222,
    intensidadLuzToque: 666,
    colorLuzAmbiente: 0x990096,
    intensidadAmbiente: 12.95,
    distanciaCamara: 3.5,
    campoVision: 50,
    radio: 4.44,
    detalle: 8,
    rugosidad: .666,
    metalizado: 1.999,
    flatShading: true,
    escalaTiempo: 0.000007,
    velRotacionX: 0.155,
    velRotacionY: 0.155,
    amplitudRotZ: 0.99,
    frecuenciaRotZ: 0.05,
    velOlaBase: 8,
    fuerzaOlaBase: 10,
    frecuenciaOla: 1.33,
    atraccionDedo: 2.5,
    radioAtraccion: 2.0,
    suavizadoInteraccion: 0.05
};

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(CONFIG.colorNiebla, CONFIG.nieblaInicio, CONFIG.nieblaFin);

const camera = new THREE.PerspectiveCamera(CONFIG.campoVision, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 0, CONFIG.distanciaCamara);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.domElement.id = 'bg-three';
document.body.appendChild(renderer.domElement);

let geometry = new THREE.TetrahedronGeometry(CONFIG.radio, CONFIG.detalle);
if (geometry.index) geometry = geometry.toNonIndexed();

const material = new THREE.MeshStandardMaterial({
    color: CONFIG.colorGeometria,
    flatShading: CONFIG.flatShading,
    roughness: CONFIG.rugosidad,
    metalness: CONFIG.metalizado
});

const tetraMesh = new THREE.Mesh(geometry, material);
scene.add(tetraMesh);

const posAttribute = geometry.attributes.position;
const originalPos = new Float32Array(posAttribute.array);
const count = posAttribute.count;

const pointLight = new THREE.PointLight(CONFIG.colorLuzToque, CONFIG.intensidadLuzBase, 100);
scene.add(pointLight);
scene.add(new THREE.AmbientLight(CONFIG.colorLuzAmbiente, CONFIG.intensidadAmbiente));

const raycaster = new THREE.Raycaster();
const mathPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -1);
const pointerCoords = new THREE.Vector2(-1000, -1000);
const interaction3D = new THREE.Vector3();
const lightTarget = new THREE.Vector3(0, 0, 1);

let effectStrength = 0;

function setPointer(clientX, clientY) {
    pointerCoords.x = (clientX / window.innerWidth) * 2 - 1;
    pointerCoords.y = -(clientY / window.innerHeight) * 2 + 1;
}

window.addEventListener('mousemove', (e) => setPointer(e.clientX, e.clientY));
window.addEventListener('touchstart', (e) => { if (e.touches.length > 0) setPointer(e.touches[0].clientX, e.touches[0].clientY); }, { passive: true });
window.addEventListener('touchmove', (e) => { if (e.touches.length > 0) setPointer(e.touches[0].clientX, e.touches[0].clientY); }, { passive: true });
window.addEventListener('touchend', () => pointerCoords.set(-1000, -1000));
document.addEventListener('mouseleave', () => pointerCoords.set(-1000, -1000));

function animate() {
    requestAnimationFrame(animate);
    const time = performance.now() * CONFIG.escalaTiempo;
    const isInteracting = pointerCoords.x !== -1000;
    raycaster.setFromCamera(pointerCoords, camera);

    if (isInteracting) {
        effectStrength += (1.0 - effectStrength) * CONFIG.suavizadoInteraccion;
        if (raycaster.ray.intersectPlane(mathPlane, interaction3D)) {
            lightTarget.lerp(interaction3D, 0.1);
        }
    } else {
        effectStrength += (0.0 - effectStrength) * (CONFIG.suavizadoInteraccion * 0.3);
        lightTarget.lerp(new THREE.Vector3(0, 0, 1), 0.02);
    }

    pointLight.position.copy(lightTarget);
    pointLight.intensity = CONFIG.intensidadLuzBase + (CONFIG.intensidadLuzToque * effectStrength);

    for (let i = 0; i < count; i++) {
        const ox = originalPos[i * 3], oy = originalPos[i * 3 + 1], oz = originalPos[i * 3 + 2];
        const distToCenter = Math.sqrt(ox * ox + oy * oy + oz * oz);
        const wave = Math.sin(time * CONFIG.velOlaBase + oy * CONFIG.frecuenciaOla) * CONFIG.fuerzaOlaBase;
        const dx = ox - lightTarget.x, dy = oy - lightTarget.y, dz = oz - lightTarget.z;
        const distToTargetSq = dx * dx + dy * dy + dz * dz;
        const pullStrength = (Math.exp(-distToTargetSq / CONFIG.radioAtraccion) * CONFIG.atraccionDedo) * effectStrength;
        const scale = (distToCenter + wave + pullStrength) / distToCenter;
        posAttribute.setXYZ(i, ox * scale, oy * scale, oz * scale);
    }

    posAttribute.needsUpdate = true;
    geometry.computeVertexNormals();
    tetraMesh.rotation.x = time * CONFIG.velRotacionX;
    tetraMesh.rotation.y = time * CONFIG.velRotacionY;
    tetraMesh.rotation.z = Math.sin(time * CONFIG.frecuenciaRotZ) * CONFIG.amplitudRotZ;
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
