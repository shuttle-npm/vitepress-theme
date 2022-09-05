<script lang="ts" setup>
    import VTIconShuttle from '../../core/components/icons/VTIconShuttle.vue';
    import { useConfig } from '../composables/config'
   
    const { config } = useConfig()
</script>

<template>
  <a class="VPNavBarTitle" href="/">
    <slot name="navbar-title">
      <VTIconShuttle class="logo" />
      <span class="text">{{config.title || 'Shuttle'}}</span>
    </slot>
  </a>
</template>

<style scoped>
.VPNavBarTitle {
  display: flex;
  align-items: center;
  padding-top: 1px;
  height: var(--vt-nav-height);
  transition: opacity 0.25s;
}

.VPNavBarTitle:hover {
  opacity: 0.6;
}

.logo {
  position: relative;
  width: 2em;
  height: 2em;
}

.logo + .text {
  padding-left: 8px;
}

.text {
  font-size: 16px;
  font-weight: 500;
}
</style>
