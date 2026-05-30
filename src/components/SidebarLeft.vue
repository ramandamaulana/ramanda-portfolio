<script setup lang="ts">
import { ref } from 'vue'
import heroImg from '../assets/hero.png'
import {
  activeCardId,
  activePage,
  selectCard,
  currentTheme,
  setTheme
} from '../state'

import {
  ChevronDown,
  ChevronRight,
  Hash,
  Type,
  FileText,
  Folder,
  Layers,
  Sun,
  Moon
} from 'lucide-vue-next'

const isPagesExpanded = ref(true)
const isLayersExpanded = ref(true)

// Reactive expand/collapse states for top-level layers
const expandedLayers = ref<Record<string, boolean>>({
  hero: true,
  touch: true,
  experience: true,
  terminal: true,
  opensource: false,
  ships: false,
  education: false,
  record: false,
  map: false,
  cats: false,
  postcard: false
})

const pages = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'projects', label: 'Projects', icon: '📁' },
  { id: 'writing', label: 'Writing', icon: '✍️' },
  { id: 'store', label: 'Store', icon: '🏷️' },
  { id: 'about', label: 'About', icon: '👤' },
  { id: 'uses', label: 'Uses', icon: '🧰' }
]

function handleLayerClick(id: string) {
  selectCard(id)
  const element = document.getElementById(`card-${id}`)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
  }
}

function handlePageClick(pageId: string) {
  activePage.value = pageId
  if (pageId === 'home' || pageId === 'projects' || pageId === 'about') {
    const targetCard = pageId === 'home' ? 'hero' : (pageId === 'projects' ? 'ships' : 'education')
    handleLayerClick(targetCard)
  }
}

function toggleLayerExpand(id: string, event: Event) {
  event.stopPropagation() // Don't trigger card selection when expanding/collapsing
  expandedLayers.value[id] = !expandedLayers.value[id]
}
</script>

<template>
  <aside class="sidebar-left">
    <!-- Figma Header Workspace Title with Cartoon Avatar -->
    <div class="sidebar-header">
      <div class="avatar-container">
        <img :src="heroImg" class="avatar-img" alt="Ramanda Avatar" />
        <span class="pulse-green"></span>
      </div>
      <div class="header-text">
        <span class="workspace-title">Ramanda Maulana</span>
        <span class="workspace-sub">Portfolio Website v0.1</span>
      </div>
    </div>

    <!-- Theme Switcher Widget -->
    <div class="theme-switcher">
      <span class="section-title"><Sun class="icon-small" /> Theme Mode</span>
      <div class="theme-toggle-container">
        <button
          @click="setTheme('white')"
          class="theme-toggle-btn"
          :class="{ active: currentTheme === 'white' }"
          title="Light Theme"
        >
          <Sun class="theme-icon" />
          <span>White</span>
        </button>
        <button
          @click="setTheme('figma-dark')"
          class="theme-toggle-btn"
          :class="{ active: currentTheme === 'figma-dark' }"
          title="Dark Theme"
        >
          <Moon class="theme-icon" />
          <span>Dark</span>
        </button>
      </div>
    </div>

    <div class="sidebar-scrollable">
      <!-- Pages Section -->
      <div class="sidebar-section">
        <div class="section-header" @click="isPagesExpanded = !isPagesExpanded">
          <span class="header-label">
            <ChevronDown v-if="isPagesExpanded" class="chevron-icon" />
            <ChevronRight v-else class="chevron-icon" />
            Pages
          </span>
        </div>
        <div v-show="isPagesExpanded" class="section-content">
          <button
            v-for="page in pages"
            :key="page.id"
            @click="handlePageClick(page.id)"
            class="page-link-btn"
            :class="{ active: activePage === page.id }"
          >
            <span class="page-emoji">{{ page.icon }}</span>
            <span class="page-label">{{ page.label }}</span>
          </button>
        </div>
      </div>

      <!-- Layers Section - Figma Layer Tree -->
      <div class="sidebar-section">
        <div class="section-header" @click="isLayersExpanded = !isLayersExpanded">
          <span class="header-label">
            <ChevronDown v-if="isLayersExpanded" class="chevron-icon" />
            <ChevronRight v-else class="chevron-icon" />
            Layers
          </span>
        </div>
        
        <div v-show="isLayersExpanded" class="section-content layers-content">
          <!-- Top level group: Home / cover -->
          <div class="layer-item-group">
            <div class="layer-node-row top-group-node">
              <ChevronDown class="node-arrow" />
              <Folder class="node-icon group-folder-icon" />
              <span class="node-label group-label">Home / cover</span>
            </div>

            <!-- Nested layers tree -->
            <div class="nested-tree-container">
              <!-- 1. Profile - hero Card -->
              <div class="layer-tree-branch">
                <div
                  @click="handleLayerClick('hero')"
                  class="layer-node-row branch-header"
                  :class="{ active: activeCardId === 'hero' }"
                >
                  <button @click="toggleLayerExpand('hero', $event)" class="node-arrow-btn">
                    <ChevronDown v-if="expandedLayers.hero" class="node-arrow" />
                    <ChevronRight v-else class="node-arrow" />
                  </button>
                  <Hash class="node-icon branch-icon" />
                  <span class="node-label font-bold">Profile - hero</span>
                </div>
                
                <div v-show="expandedLayers.hero" class="nested-children">
                  <div class="layer-node-row leaf-node">
                    <Layers class="node-icon leaf-icon" />
                    <span class="node-label">Floating chips</span>
                  </div>
                  <div class="layer-node-row leaf-node">
                    <Type class="node-icon leaf-icon text-muted-icon" />
                    <span class="node-label">HELLO — I'M RAMANDA</span>
                  </div>
                  <div class="layer-node-row leaf-node">
                    <Type class="node-icon leaf-icon text-muted-icon" />
                    <span class="node-label">Display title</span>
                  </div>
                  <div class="layer-node-row leaf-node">
                    <FileText class="node-icon leaf-icon text-muted-icon" />
                    <span class="node-label">Body</span>
                  </div>
                  <div class="layer-node-row leaf-node">
                    <Layers class="node-icon leaf-icon" />
                    <span class="node-label">CTA buttons</span>
                  </div>
                </div>
              </div>

              <!-- 2. Things I touch Card -->
              <div class="layer-tree-branch">
                <div
                  @click="handleLayerClick('touch')"
                  class="layer-node-row branch-header"
                  :class="{ active: activeCardId === 'touch' }"
                >
                  <button @click="toggleLayerExpand('touch', $event)" class="node-arrow-btn">
                    <ChevronDown v-if="expandedLayers.touch" class="node-arrow" />
                    <ChevronRight v-else class="node-arrow" />
                  </button>
                  <Hash class="node-icon branch-icon" />
                  <span class="node-label font-bold">Things I touch</span>
                </div>

                <div v-show="expandedLayers.touch" class="nested-children">
                  <div class="layer-node-row leaf-node">
                    <Layers class="node-icon leaf-icon" />
                    <span class="node-label">Hex tool cluster</span>
                  </div>
                  <div class="layer-node-row leaf-node">
                    <Type class="node-icon leaf-icon text-muted-icon" />
                    <span class="node-label">Headline</span>
                  </div>
                  <div class="layer-node-row leaf-node">
                    <FileText class="node-icon leaf-icon text-muted-icon" />
                    <span class="node-label">Body</span>
                  </div>
                </div>
              </div>

              <!-- 3. Experience Card -->
              <div class="layer-tree-branch">
                <div
                  @click="handleLayerClick('experience')"
                  class="layer-node-row branch-header"
                  :class="{ active: activeCardId === 'experience' }"
                >
                  <button @click="toggleLayerExpand('experience', $event)" class="node-arrow-btn">
                    <ChevronDown v-if="expandedLayers.experience" class="node-arrow" />
                    <ChevronRight v-else class="node-arrow" />
                  </button>
                  <Hash class="node-icon branch-icon" />
                  <span class="node-label font-bold">Experience · 6 stops</span>
                </div>

                <div v-show="expandedLayers.experience" class="nested-children">
                  <div class="layer-node-row leaf-node text-ellipsis">
                    <Layers class="node-icon leaf-icon" />
                    <span class="node-label">Jul 2024 — present · Framer Dev @ HitPay</span>
                  </div>
                  <div class="layer-node-row leaf-node text-ellipsis">
                    <Layers class="node-icon leaf-icon" />
                    <span class="node-label">Aug 2023 — Aug 2024 · UI/UX Designer @...</span>
                  </div>
                  <div class="layer-node-row leaf-node text-ellipsis">
                    <Layers class="node-icon leaf-icon" />
                    <span class="node-label">Jun 2022 — Mar 2023 · UI/UX & Frontend...</span>
                  </div>
                  <div class="layer-node-row leaf-node text-ellipsis">
                    <Layers class="node-icon leaf-icon" />
                    <span class="node-label">May 2021 — Mar 2022 · Fullstack Dev...</span>
                  </div>
                  <div class="layer-node-row leaf-node text-ellipsis">
                    <Layers class="node-icon leaf-icon" />
                    <span class="node-label">Dec 2020 — present · Freelance Des...</span>
                  </div>
                </div>
              </div>

              <!-- 4. Behind the Seam Card -->
              <div class="layer-tree-branch">
                <div
                  @click="handleLayerClick('terminal')"
                  class="layer-node-row branch-header"
                  :class="{ active: activeCardId === 'terminal' }"
                >
                  <button @click="toggleLayerExpand('terminal', $event)" class="node-arrow-btn">
                    <ChevronDown v-if="expandedLayers.terminal" class="node-arrow" />
                    <ChevronRight v-else class="node-arrow" />
                  </button>
                  <Hash class="node-icon branch-icon" />
                  <span class="node-label font-bold">Behind the seam</span>
                </div>

                <div v-show="expandedLayers.terminal" class="nested-children">
                  <div class="layer-node-row leaf-node">
                    <Type class="node-icon leaf-icon text-muted-icon" />
                    <span class="node-label">Headline</span>
                  </div>
                  <div class="layer-node-row leaf-node">
                    <FileText class="node-icon leaf-icon text-muted-icon" />
                    <span class="node-label">Body</span>
                  </div>
                  <div class="layer-node-row leaf-node">
                    <Layers class="node-icon leaf-icon" />
                    <span class="node-label">Terminal · curl + JSON</span>
                  </div>
                </div>
              </div>

              <!-- Simple top-level cards list for others to keep navigation working! -->
              <div
                v-for="item in [
                  { id: 'opensource', label: 'Open source · pinned' },
                  { id: 'ships', label: 'Recent · 9 ships' },
                  { id: 'education', label: 'Education & Awards' },
                  { id: 'record', label: 'On heavy rotation · music' },
                  { id: 'map', label: 'Origin · topo map' },
                  { id: 'cats', label: 'Studio cats · crew' },
                  { id: 'postcard', label: 'Contact · postcard' }
                ]"
                :key="item.id"
                @click="handleLayerClick(item.id)"
                class="layer-node-row single-frame-header"
                :class="{ active: activeCardId === item.id }"
              >
                <ChevronRight class="node-arrow opacity-0" />
                <Hash class="node-icon branch-icon" />
                <span class="node-label font-bold">{{ item.label }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar-left {
  background-color: var(--bg-sidebar);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  user-select: none;
}

.sidebar-header {
  height: 52px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 14px;
}

.avatar-container {
  position: relative;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
}

.avatar-img {
  width: 32px;
  height: 32px;
  object-fit: cover;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: #0c8ce9;
}

.pulse-green {
  position: absolute;
  bottom: -1px;
  right: -1px;
  width: 8px;
  height: 8px;
  background-color: #14ae5c;
  border: 1.5px solid var(--bg-sidebar);
  border-radius: 50%;
  animation: pulse-slow 1.5s infinite;
}

.header-text {
  display: flex;
  flex-direction: column;
  line-height: 1.25;
  overflow: hidden;
}

.workspace-title {
  font-size: 12px;
  font-weight: 700;
  color: var(--text-main);
  letter-spacing: -0.15px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.workspace-sub {
  font-size: 10px;
  color: var(--text-muted);
}

.theme-switcher {
  padding: 12px 14px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.section-title {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--text-muted);
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.icon-small {
  width: 12px;
  height: 12px;
}

.theme-toggle-container {
  display: flex;
  background-color: var(--bg-input);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 3px;
  gap: 2px;
}

.theme-toggle-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border: none;
  background: transparent;
  color: var(--text-muted);
  font-size: 11px;
  font-weight: 600;
  padding: 6px 0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.theme-toggle-btn:hover {
  color: var(--text-main);
}

.theme-toggle-btn.active {
  background-color: var(--bg-sidebar);
  color: var(--text-main);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--border-color);
}

.theme-icon {
  width: 14px;
  height: 14px;
}

.sidebar-scrollable {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 8px;
}

.sidebar-section {
  display: flex;
  flex-direction: column;
}

.section-header {
  height: 28px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}

.section-header:hover {
  background-color: rgba(255, 255, 255, 0.02);
}

.header-label {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--text-muted);
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.chevron-icon {
  width: 10px;
  height: 10px;
  color: var(--text-muted);
}

.section-content {
  display: flex;
  flex-direction: column;
  gap: 1px;
  padding: 2px 6px;
}

.page-link-btn {
  height: 28px;
  border-radius: 4px;
  border: none;
  background: transparent;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 8px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  text-align: left;
  transition: all 0.15s ease;
}

.page-link-btn:hover {
  background-color: rgba(255, 255, 255, 0.04);
  color: var(--text-main);
}

.page-link-btn.active {
  background-color: rgba(255, 255, 255, 0.06);
  color: var(--text-main);
  border-left: 2px solid var(--accent-color);
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.page-emoji {
  font-size: 13px;
}

.layers-content {
  overflow-y: visible;
  padding: 2px 0;
}

/* Layer Node Tree Styles */
.layer-node-row {
  display: flex;
  align-items: center;
  height: 26px;
  padding: 0 8px;
  font-size: 11px;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.15s ease;
  border-radius: 3px;
  position: relative;
}

.layer-node-row:hover {
  background-color: rgba(255, 255, 255, 0.03);
  color: var(--text-main);
}

.layer-node-row.active {
  background-color: rgba(12, 140, 233, 0.08);
  color: #79c0ff;
  border-left: 2px solid var(--select-color);
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.node-arrow {
  width: 10px;
  height: 10px;
  flex-shrink: 0;
  color: var(--text-muted);
}

.node-arrow-btn {
  background: transparent;
  border: none;
  width: 14px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  margin-left: -4px;
}

.node-arrow-btn:hover .node-arrow {
  color: var(--text-main);
}

.node-icon {
  width: 11px;
  height: 11px;
  margin-right: 6px;
  flex-shrink: 0;
  color: var(--text-muted);
}

.node-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.font-bold {
  font-weight: 600;
}

.opacity-0 {
  opacity: 0;
}

.text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Specific Layers formatting */
.top-group-node {
  padding-left: 8px;
  height: 28px;
}

.group-folder-icon {
  color: var(--accent-color);
}

.group-label {
  font-weight: 700;
  color: var(--text-main);
}

.nested-tree-container {
  padding-left: 12px;
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.layer-tree-branch {
  display: flex;
  flex-direction: column;
}

.branch-header {
  padding-left: 4px;
}

.branch-icon {
  color: var(--select-color);
}

.single-frame-header {
  padding-left: 14px;
}

.nested-children {
  padding-left: 24px;
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.leaf-node {
  height: 24px;
}

.leaf-icon {
  color: #a25aff; /* Figma text/component color */
}

.text-muted-icon {
  color: #8e8e8e;
}
</style>
