<script lang="ts">
  let { children } = $props();
</script>

<main>{@render children()}</main>

<svelte:head>
  <link rel="stylesheet" href="style.css" />
</svelte:head>
