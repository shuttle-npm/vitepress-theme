<script lang="ts" setup>
import VTSwitch from './VTSwitch.vue'
import VTIconSun from './icons/VTIconSun.vue'
import VTIconMoon from './icons/VTIconMoon.vue'
import { useConfig } from '../../vitepress/composables/config'

const { config } = useConfig()

const storageKey = 'shuttle-theme-appearance'
const toggle = typeof localStorage !== 'undefined' ? useAppearance() : () => {}

function useAppearance() {
  let userPreference = localStorage.getItem(storageKey) || 'auto'
  const query = window.matchMedia(`(prefers-color-scheme: dark)`)
  const classList = document.documentElement.classList
  let isDark =
    userPreference === 'auto' ? query.matches : userPreference === 'dark'
  const setClass = (dark: boolean) => classList[dark ? 'add' : 'remove']('dark')

  query.onchange = (e) => {
    if (userPreference === 'auto') {
      setClass((isDark = e.matches))
    }
  }

  const toggle = () => {
    setClass((isDark = !isDark))
    localStorage.setItem(
      storageKey,
      (userPreference = isDark
        ? query.matches
          ? 'auto'
          : 'dark'
        : query.matches
        ? 'light'
        : 'auto')
    )
  }

  return toggle
}
</script>

<template>
  <VTSwitch
    class="vt-switch-appearance"
    :aria-label="config.i18n?.ariaDarkMode ?? 'Toggle dark mode'"
    @click="toggle"
  >
    <VTIconSun class="vt-switch-appearance-sun" />
    <VTIconMoon class="vt-switch-appearance-moon" />
  </VTSwitch>
</template>
