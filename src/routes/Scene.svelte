<script lang="ts">
  import { T, useTask } from "@threlte/core";
  import { interactivity } from "@threlte/extras";
  import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
  import { useLoader } from "@threlte/core";
  import { useGltfAnimations } from "@threlte/extras";
  import { base } from "$app/paths";
  import type { Object3D } from "three";

  let { onloaded }: { onloaded?: () => void } = $props();

  interactivity();

  const url = `${base}/mega_delphox_za/scene.optimized.glb`;
  const gltf = useLoader(GLTFLoader).load(url);
  const { actions } = useGltfAnimations(gltf);

  // Root scene node — set once the model loads
  let scene: Object3D | undefined = $state(undefined);

  // Mouse target rotation (radians)
  let targetY = 0;
  let targetX = 0;
  // Current interpolated rotation
  let currentY = 0;
  let currentX = 0;

  $effect(() => {
    const onMouseMove = (e: MouseEvent) => {
      targetY = (e.clientX / window.innerWidth - 0.5) * (Math.PI / 5); // ±36°
      targetX = (e.clientY / window.innerHeight - 0.5) * (Math.PI / 10); // ±18°
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  });

  // Smooth follow — frame-rate independent exponential lerp
  useTask((delta: number) => {
    if (!scene) return;
    const k = 1 - Math.exp(-5 * delta);
    currentY += (targetY - currentY) * k;
    currentX += (targetX - currentX) * k;
    scene.rotation.y = currentY;
    scene.rotation.x = currentX;
  });

  // Play first animation clip when ready
  $effect(() => {
    if (!$actions) return;
    const first = Object.keys($actions)[0];
    $actions[first]?.reset().play();
  });

  // Capture scene root and notify parent on load
  $effect(() => {
    if (!$gltf) return;
    scene = $gltf.scene;
    onloaded?.();
  });
</script>

{#if $gltf}
  <T is={$gltf.scene} />
{/if}

<T.AmbientLight intensity={0.7} />
<T.DirectionalLight position={[2, 4, 3]} intensity={1.1} />

<T.PerspectiveCamera
  makeDefault
  position={[1.5, 1, 1.5]}
  oncreate={(ref) => ref.lookAt(0, 1, 0)}
/>

<style>
  :global(canvas) {
    width: 100%;
    height: 100%;
    display: block;
  }
</style>
