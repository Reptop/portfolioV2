<script lang="ts">
  import { Canvas } from "@threlte/core";
  import Scene from "./Scene.svelte";

  let { dpr, onloaded }: { dpr: number; onloaded?: () => void } = $props();
</script>

<Canvas {dpr}>
  <Scene {onloaded} />
</Canvas>
