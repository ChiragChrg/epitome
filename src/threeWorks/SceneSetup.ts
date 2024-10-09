"use client";

import * as THREE from "three";

import { ClientDims } from "@/threeWorks/utils";

class SceneSetup {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  ambientLight: THREE.AmbientLight;
  directionalLight: THREE.DirectionalLight;

  constructor() {
    // Setting up scene and camera
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      ClientDims.width / ClientDims.height,
      0.1,
      1000
    );
    this.renderer = new THREE.WebGLRenderer();

    // Lighting
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);

    this.scene.add(this.ambientLight);
    this.scene.add(this.directionalLight);

    // Setting initial position
    this.directionalLight.position.set(10, 10, 10);
    this.camera.position.z = 1;
    this.camera.position.y = 0.05;
    console.log(this.camera.position);

    // Temp:
    const pointLight = new THREE.PointLight(0xffffff, 1.5);
    pointLight.position.set(5, 5, 5);
    this.scene.add(pointLight);
  }

  onLoad() {
    this.renderer.setSize(ClientDims.width, ClientDims.height);
    this.camera.aspect = ClientDims.width / ClientDims.height;
    this.camera.updateProjectionMatrix();

    document
      .getElementById("three-work")!
      .appendChild(this.renderer.domElement);
  }

  update() {
    this.renderer.setSize(ClientDims.width, ClientDims.height);
    this.camera.aspect = ClientDims.width / ClientDims.height;
    this.camera.updateProjectionMatrix();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}

export default SceneSetup;
