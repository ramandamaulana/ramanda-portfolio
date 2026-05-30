<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SidebarLeft from './components/SidebarLeft.vue'
import CanvasWorkspace from './components/CanvasWorkspace.vue'
import SidebarRight from './components/SidebarRight.vue'
import { currentTheme } from './state'
import { Menu, Settings, X } from 'lucide-vue-next'

const showMobileLeft = ref(false)
const showMobileRight = ref(false)

// Set default theme attribute on load
onMounted(() => {
  document.documentElement.setAttribute('data-theme', currentTheme.value)
})
</script>

<template>
  <div class="app-container" :data-theme="currentTheme">
    <!-- Mobile Navigation Header -->
    <header class="mobile-header">
      <button @click="showMobileLeft = !showMobileLeft" class="menu-toggle-btn" title="Toggle pages">
        <Menu class="toggle-icon" />
      </button>
      <span class="mobile-title">ramanda.github.io</span>
      <button @click="showMobileRight = !showMobileRight" class="menu-toggle-btn" title="Toggle properties">
        <Settings class="toggle-icon" />
      </button>
    </header>

    <!-- Mobile Drawer Backdrops -->
    <div
      v-if="showMobileLeft"
      @click="showMobileLeft = false"
      class="drawer-backdrop"
    ></div>
    <div
      v-if="showMobileRight"
      @click="showMobileRight = false"
      class="drawer-backdrop"
    ></div>

    <!-- 1. Left Sidebar Panel (Pages & Layers) -->
    <div class="sidebar-wrapper left-sidebar-wrapper" :class="{ 'mobile-open': showMobileLeft }">
      <button @click="showMobileLeft = false" class="close-drawer-btn"><X class="icon-close" /></button>
      <SidebarLeft />
    </div>

    <!-- 2. Central Figma Canvas Viewport -->
    <CanvasWorkspace class="canvas-viewport-wrapper" />

    <!-- 3. Right Sidebar Panel (Inspector & Code Export) -->
    <div class="sidebar-wrapper right-sidebar-wrapper" :class="{ 'mobile-open': showMobileRight }">
      <button @click="showMobileRight = false" class="close-drawer-btn"><X class="icon-close" /></button>
      <SidebarRight />
    </div>
  </div>
</template>

<style>
/* Layout positioning and responsivity drawer system */
.app-container {
  display: grid;
  grid-template-columns: 240px 1fr 280px;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: relative;
}

.mobile-header {
  display: none;
  height: 48px;
  background-color: var(--bg-sidebar);
  border-bottom: 1px solid var(--border-color);
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  z-index: 90;
}

.mobile-title {
  font-size: 13px;
  font-weight: 800;
  letter-spacing: -0.2px;
}

.menu-toggle-btn {
  background: transparent;
  border: none;
  color: var(--text-main);
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
}

.menu-toggle-btn:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.toggle-icon {
  width: 18px;
  height: 18px;
}

.sidebar-wrapper {
  height: 100%;
  overflow: hidden;
  z-index: 80;
}

.close-drawer-btn {
  display: none;
  position: absolute;
  top: 10px;
  right: 10px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-color);
  color: var(--text-muted);
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 100;
}

.icon-close {
  width: 14px;
  height: 14px;
}

/* Tablet & Smaller Layout adjustments */
@media (max-width: 1200px) {
  .app-container {
    grid-template-columns: 240px 1fr;
  }
  .right-sidebar-wrapper {
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    width: 280px;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    box-shadow: -4px 0 20px rgba(0, 0, 0, 0.5);
  }
  .right-sidebar-wrapper.mobile-open {
    transform: translateX(0);
  }
  .right-sidebar-wrapper .close-drawer-btn {
    display: flex;
  }
}

@media (max-width: 768px) {
  .app-container {
    grid-template-columns: 1fr;
    grid-template-rows: 48px 1fr;
  }
  
  .mobile-header {
    display: flex;
  }
  
  .left-sidebar-wrapper {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 240px;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    box-shadow: 4px 0 20px rgba(0, 0, 0, 0.5);
  }
  
  .left-sidebar-wrapper.mobile-open {
    transform: translateX(0);
  }
  
  .left-sidebar-wrapper .close-drawer-btn {
    display: flex;
  }
  
  .drawer-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(2px);
    z-index: 75;
  }
}
</style>
