<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { activeCardId, selectCard, cardsRegistry, zoomLevel } from '../state'
import {
  MousePointer,
  ZoomIn,
  ZoomOut,
  Pencil,
  Type,
  MessageSquare,
  Search,
  Code2,
  Frame,
  Hash
} from 'lucide-vue-next'

// Card Imports
import HeroCard from './cards/HeroCard.vue'
import TouchCard from './cards/TouchCard.vue'
import ExperienceCard from './cards/ExperienceCard.vue'
import TerminalCard from './cards/TerminalCard.vue'
import OpenSourceCard from './cards/OpenSourceCard.vue'
import ShipsCard from './cards/ShipsCard.vue'
import EducationCard from './cards/EducationCard.vue'
import RecordCard from './cards/RecordCard.vue'
import MapCard from './cards/MapCard.vue'
import CatsCard from './cards/CatsCard.vue'
import PostcardCard from './cards/PostcardCard.vue'

// Custom Cursor coordinates
const cursorX = ref(120)
const cursorY = ref(150)
let cursorTimer: any = null

function updateCursorLocation() {
  const cardsKeys = Object.keys(cardsRegistry)
  const randomCardKey = cardsKeys[Math.floor(Math.random() * cardsKeys.length)]
  const card = cardsRegistry[randomCardKey]
  
  if (card) {
    const rx = card.x + Math.floor(Math.random() * (card.w - 40))
    const ry = card.y + Math.floor(Math.random() * (card.h - 40))
    cursorX.value = rx
    cursorY.value = ry
  }
}

onMounted(() => {
  cursorTimer = setInterval(updateCursorLocation, 8000)
})

onUnmounted(() => {
  if (cursorTimer) clearInterval(cursorTimer)
})

function handleZoomIn() {
  if (zoomLevel.value < 150) zoomLevel.value += 10
}

function handleZoomOut() {
  if (zoomLevel.value > 60) zoomLevel.value -= 10
}

function handleResetZoom() {
  zoomLevel.value = 100
}

// Floating Figma Tools State
const activeTool = ref('pointer')

const tools = [
  { id: 'pointer', name: 'Move (V)', icon: MousePointer },
  { id: 'grid', name: 'Grid (G)', icon: Hash },
  { id: 'frame', name: 'Frame (F)', icon: Frame },
  { id: 'draw', name: 'Draw (P)', icon: Pencil },
  { id: 'text', name: 'Text (T)', icon: Type },
  { id: 'comment', name: 'Comment (C)', icon: MessageSquare },
  { id: 'search', name: 'Search (S)', icon: Search },
  { id: 'code', name: 'Code Export', icon: Code2 }
]
</script>

<template>
  <main class="canvas-viewport">
    <!-- Top Workspace Tabs Bar -->
    <div class="canvas-tabs-bar">
      <div class="tab active-tab">
        <span class="tab-indicator"></span>
        <span class="tab-title text-mono uppercase-tab">01 — HELLO / CANVAS 940 × ∞</span>
      </div>
      <div class="tab inactive-tab">
        <span class="tab-status-dot"></span>
        <span class="tab-title text-mono uppercase-tab">EDIT · RAMANDA · LAST SEEN NOW</span>
      </div>

      <div class="zoom-controls">
        <button @click="handleZoomOut" class="zoom-btn" title="Zoom Out"><ZoomOut class="icon-small" /></button>
        <span @click="handleResetZoom" class="zoom-text text-mono" title="Reset Zoom">{{ zoomLevel }}%</span>
        <button @click="handleZoomIn" class="zoom-btn" title="Zoom In"><ZoomIn class="icon-small" /></button>
      </div>
    </div>

    <!-- Scrollable Canvas Grid -->
    <div class="canvas-scroll-container">
      <div
        class="canvas-board canvas-grid"
        :style="{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top left' }"
      >
        <!-- Horizontal & Vertical Coordinates Rulers (visual ticks) -->
        <div class="ruler-horizontal"></div>
        <div class="ruler-vertical"></div>

        <!-- Simulated Floating Figma Cursor ("ramanda") -->
        <div
          class="figma-cursor"
          :style="{ left: `${cursorX}px`, top: `${cursorY}px` }"
        >
          <MousePointer class="cursor-pointer" />
          <div class="cursor-label">ramanda</div>
        </div>

        <!-- Interactive Canvas Card Frames -->
        <div
          v-for="card in cardsRegistry"
          :key="card.id"
          :id="`card-${card.id}`"
          class="canvas-card-frame"
          :class="{ selected: activeCardId === card.id }"
          :style="{
            left: `${card.x}px`,
            top: `${card.y}px`,
            width: `${card.w}px`,
            height: `${card.h}px`
          }"
          @click.stop="selectCard(card.id)"
        >
          <!-- Figma Frame Handles & Label with orange dot -->
          <div class="frame-tag-header">
            <span class="frame-dot"></span>
            <span class="frame-label">{{ card.id === 'hero' ? 'frame · hello.v04' : card.name }}</span>
            <span class="frame-coordinates text-mono">{{ card.w }} × {{ card.h }}</span>
          </div>

          <!-- Selected Outline & Corner Resizer nodes -->
          <div v-if="activeCardId === card.id" class="selection-outline">
            <div class="resize-node top-left"></div>
            <div class="resize-node top-right"></div>
            <div class="resize-node bottom-left"></div>
            <div class="resize-node bottom-right"></div>
          </div>

          <!-- Dynamic Component Loader -->
          <div class="card-content-wrapper" :class="{ 'no-padding': card.id === 'postcard' || card.id === 'hero' || card.id === 'touch' }">
            <HeroCard v-if="card.id === 'hero'" />
            <TouchCard v-else-if="card.id === 'touch'" />
            <ExperienceCard v-else-if="card.id === 'experience'" />
            <TerminalCard v-else-if="card.id === 'terminal'" />
            <OpenSourceCard v-else-if="card.id === 'opensource'" />
            <ShipsCard v-else-if="card.id === 'ships'" />
            <EducationCard v-else-if="card.id === 'education'" />
            <RecordCard v-else-if="card.id === 'record'" />
            <MapCard v-else-if="card.id === 'map'" />
            <CatsCard v-else-if="card.id === 'cats'" />
            <PostcardCard v-else-if="card.id === 'postcard'" />
          </div>
        </div>
      </div>
    </div>

    <!-- Floating Figma-style Toolbar -->
    <div class="floating-toolbar">
      <template v-for="(tool, index) in tools" :key="tool.id">
        <button
          @click="activeTool = tool.id"
          class="toolbar-item"
          :class="{ active: activeTool === tool.id }"
          :title="tool.name"
        >
          <component :is="tool.icon" class="icon-small" />
        </button>
        <div v-if="index === 0 || index === 2 || index === 6" class="toolbar-divider"></div>
      </template>
    </div>
  </main>
</template>

<style scoped>
.canvas-viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.canvas-tabs-bar {
  height: 40px;
  background-color: var(--bg-sidebar);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  padding: 0 16px;
  justify-content: space-between;
  z-index: 10;
}

.tab {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 16px;
  height: 40px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  border-right: 1px solid var(--border-color);
}

.active-tab {
  background-color: var(--bg-canvas);
  color: var(--text-main);
  border-bottom: 2px solid var(--select-color);
}

.inactive-tab {
  color: var(--text-muted);
}

.inactive-tab:hover {
  background-color: rgba(255, 255, 255, 0.02);
}

.tab-indicator {
  width: 6px;
  height: 6px;
  background-color: var(--accent-color);
  border-radius: 50%;
}

.tab-status-dot {
  width: 6px;
  height: 6px;
  background-color: #14ae5c;
  border-radius: 50%;
}

.tab-title {
  font-size: 10px;
  letter-spacing: 0.5px;
}

.uppercase-tab {
  text-transform: uppercase;
}

.zoom-controls {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  padding: 2px;
  border-radius: 6px;
  height: 28px;
}

.zoom-btn {
  border: none;
  background: transparent;
  color: var(--text-muted);
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
}

.zoom-btn:hover {
  background-color: rgba(255, 255, 255, 0.05);
  color: var(--text-main);
}

.zoom-text {
  font-size: 10px;
  font-weight: 700;
  color: var(--text-muted);
  padding: 0 4px;
  cursor: pointer;
}

.zoom-text:hover {
  color: var(--text-main);
}

.canvas-scroll-container {
  flex: 1;
  overflow: auto;
  position: relative;
  background-color: var(--bg-canvas);
}

.canvas-board {
  position: relative;
  width: 1420px;
  height: 1740px;
  padding: 40px;
  transition: transform 0.15s ease-out;
}

/* Rulers */
.ruler-horizontal {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 16px;
  border-bottom: 1px solid var(--border-color);
  pointer-events: none;
  background-image: linear-gradient(to right, var(--border-color) 1px, transparent 1px);
  background-size: 100px 16px;
  opacity: 0.3;
}

.ruler-vertical {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 16px;
  border-right: 1px solid var(--border-color);
  pointer-events: none;
  background-image: linear-gradient(to bottom, var(--border-color) 1px, transparent 1px);
  background-size: 16px 100px;
  opacity: 0.3;
}

/* Floating pointer */
.figma-cursor {
  position: absolute;
  display: flex;
  align-items: flex-start;
  gap: 2px;
  transition: all 1.2s cubic-bezier(0.19, 1, 0.22, 1);
  z-index: 50;
  pointer-events: none;
}

.cursor-pointer {
  width: 18px;
  height: 18px;
  color: #ff5c00;
  fill: #ff5c00;
  transform: rotate(-20deg) translate(-2px, -2px);
  filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.4));
}

.cursor-label {
  background-color: #ff5c00;
  color: #ffffff;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 2px 8px 8px 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

/* Canvas frames */
.canvas-card-frame {
  position: absolute;
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 24px;
  box-shadow: var(--card-shadow);
  display: flex;
  flex-direction: column;
  overflow: visible;
  cursor: pointer;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.canvas-card-frame:hover {
  border-color: rgba(255, 255, 255, 0.15);
}

.canvas-card-frame.selected {
  border-color: var(--select-color);
  box-shadow: 0 0 0 1px var(--select-color), var(--card-shadow);
}

.frame-tag-header {
  position: absolute;
  top: -24px;
  left: 0;
  display: flex;
  align-items: center;
  gap: 6px;
  user-select: none;
  pointer-events: none;
  background-color: #1e1e1e;
  border: 1px solid var(--border-color);
  padding: 2px 8px;
  border-radius: 4px;
  height: 18px;
}

.frame-dot {
  width: 5px;
  height: 5px;
  background-color: var(--accent-color);
  border-radius: 50%;
}

.frame-label {
  font-size: 9.5px;
  font-weight: 700;
  color: #d1d1d1;
}

.canvas-card-frame.selected .frame-label {
  color: var(--accent-color);
}

.frame-coordinates {
  font-size: 8.5px;
  color: rgba(255, 255, 255, 0.2);
  display: none;
}

.canvas-card-frame.selected .frame-coordinates {
  display: inline;
}

/* Resize Outline nodes */
.selection-outline {
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  border: 1.5px solid var(--select-color);
  border-radius: 24px;
  pointer-events: none;
  z-index: 10;
}

.resize-node {
  position: absolute;
  width: 6px;
  height: 6px;
  background-color: #ffffff;
  border: 1.5px solid var(--select-color);
  z-index: 12;
}

.top-left { top: -3px; left: -3px; }
.top-right { top: -3px; right: -3px; }
.bottom-left { bottom: -3px; left: -3px; }
.bottom-right { bottom: -3px; right: -3px; }

.card-content-wrapper {
  flex: 1;
  width: 100%;
  height: 100%;
  padding: 24px;
  overflow: hidden;
  border-radius: 24px;
}

.card-content-wrapper.no-padding {
  padding: 12px;
}

.icon-small {
  width: 12px;
  height: 12px;
}

/* Mobile responsive override */
@media (max-width: 768px) {
  .canvas-scroll-container {
    overflow: auto;
  }
  .canvas-board {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    gap: 48px;
    padding: 32px 16px;
    transform: none !important;
  }
  .canvas-card-frame {
    position: static !important;
    width: 100% !important;
    height: auto !important;
    min-height: 250px;
    border-radius: 16px;
  }
  .card-content-wrapper {
    border-radius: 16px;
  }
  .selection-outline {
    border-radius: 16px;
  }
  .frame-tag-header {
    top: -20px;
  }
  .ruler-horizontal,
  .ruler-vertical,
  .figma-cursor,
  .floating-toolbar {
    display: none !important;
  }
}
</style>
