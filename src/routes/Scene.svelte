<script lang="ts">
  import { T } from "@threlte/core";
  import { interactivity } from "@threlte/extras";
  import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
  import { useLoader } from "@threlte/core";
  import { useGltfAnimations } from "@threlte/extras";
  import { base } from "$app/paths";

  interactivity();

  const url = `${base}/mega_delphox_za/scene.gltf`;

  const gltf = useLoader(GLTFLoader).load(url);

  const { actions } = useGltfAnimations(gltf);

  // Effect rune to play animation when actions are ready
  $effect(() => {
    // Actions might not exist yet on first run
    if (!$actions) return;

    // Play the first available animation
    const first = Object.keys($actions)[0];

    $actions[first]?.reset().play();
  });
</script>

{#if $gltf}
  <T is={$gltf.scene} />
{/if}

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
