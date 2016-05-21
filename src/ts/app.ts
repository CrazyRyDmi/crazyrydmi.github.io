// import "babel-polyfill";
import * as THREE from "./ThreeProxy";

import base_fs = require("../glsl/base-fs.glsl");
import base_vs = require("../glsl/base-vs.glsl");

let manager = new THREE.LoadingManager();
let loader = new THREE.TextureLoader(manager);

let texture = loader.load("images/Floor.jpg");
texture.wrapS = THREE.MirroredRepeatWrapping;
texture.wrapT = THREE.MirroredRepeatWrapping;

let squareTex = loader.load("images/rsquare.png");
squareTex.wrapS = THREE.MirroredRepeatWrapping;
squareTex.wrapT = THREE.MirroredRepeatWrapping;

let uniforms = {
    texture: { type: "t", value: texture },
    squareTex: { type: "t", value: squareTex }
};

let scene = new THREE.Scene();
let shaderMaterial = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: base_vs,
    fragmentShader: base_fs
});

let geometry = new THREE.PlaneGeometry(1.0, 0.7);
let planeMesh = new THREE.Mesh(geometry, shaderMaterial);
planeMesh.translateX(0.5);
planeMesh.translateY(0.5);
scene.add(planeMesh);

// let textGeometry = new THREE.TextGeometry("Hello World!", {
//     font: new THREE.Font("Tahoma"),
//     size: 14,
//     height: 10,
//     curveSegments: null,
//     bevelEnabled: false,
//     bevelThickness: 10,
//     bevelSize: 10
// });
// let textMesh = new THREE.Mesh(textGeometry, new THREE.MeshBasicMaterial({ color: "red" }));
// scene.add(textMesh);

let renderer = new THREE.WebGLRenderer();
renderer.setClearColor("black");
document.body.appendChild(renderer.domElement);

let camera = new THREE.OrthographicCamera(0.0, 1.0, 1.0, 0.0, -1.0, 1.0);

let resize = () => {
    // camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    // renderer.setSize(window.innerWidth - 20, window.innerHeight - 20);
    renderer.setSize(window.innerWidth, window.innerHeight - 5);
};

let animate = (time: number) => {
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
};

window.onresize = resize;
resize();
animate(Date.now());