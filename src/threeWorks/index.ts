"use client";

import * as THREE from "three";
import { GLTF, GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

import { ClientDims } from "./utils";
import SceneSetup from "./SceneSetup";

// Setup Scene
const sceneSetup = new SceneSetup();

// Loading the 3D models (this needs to be moved to a separate file, class)
const gltfLoader = new GLTFLoader();

let saturnPlanetGlb: GLTF | null = null;
let saturnMixer: THREE.AnimationMixer | null = null;

gltfLoader.load(
  "/3D/planet_saturn.glb",
  (gltf) => {
    saturnPlanetGlb = gltf;
    console.log(saturnPlanetGlb);
    saturnPlanetGlb.scene.scale.set(0.1, 0.1, 0.1);
    saturnPlanetGlb.scene.position.set(0, 0, 0);
    sceneSetup.scene.add(saturnPlanetGlb.scene);

    // Animation
    saturnMixer = new THREE.AnimationMixer(saturnPlanetGlb.scene);

    // Assuming the GLB has animations, let's play the first one
    const animation = saturnPlanetGlb.animations[0]; // Get the first animation

    // Create an action for the animation
    const action = saturnMixer.clipAction(animation);

    // Play the animation
    action.play();

    // I don't know why the colors are not visible, but the textures are applied.
  },
  (prog) => {
    // on progress
    // console.log(prog)
  },
  (error) => {
    console.error(error);
  }
);

// Animation loop
const clock = new THREE.Clock(); // Clock is used for time-based animations

function animate() {
  //   if (saturnPlanetGlb) {
  //     saturnPlanetGlb.scene.rotation.y += 0.01;
  //   }

  const delta = clock.getDelta(); // Get the time difference between frames
  if (saturnMixer) saturnMixer.update(delta);

  sceneSetup.render();
}

sceneSetup.renderer.setAnimationLoop(animate);

// Global events
window.addEventListener("resize", () => {
  sceneSetup.update();
});

window.addEventListener("load", (e) => {
  sceneSetup.onLoad();
});
