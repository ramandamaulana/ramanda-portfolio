<script setup lang="ts">
import { ref } from 'vue'
import { Heart, ChevronLeft, ChevronRight } from 'lucide-vue-next'

const selectedCatIdx = ref(0)

const cats = [
  {
    name: 'Semol',
    role: 'the elder · sunbeam regular',
    desc: 'Senior office supervisor. Specializes in sleeping directly on keyboard spacebars and finding the single patch of sun on the floor.',
    emoji: '🐱'
  },
  {
    name: 'Mochi',
    role: 'the floof · the youngest',
    desc: 'Junior visual designer. Enjoys chasing mouse pointers on screens, eating plant leaves, and vocalizing at 3:00 AM.',
    emoji: '😺'
  },
  {
    name: 'Box certified',
    role: 'cargo inspector',
    desc: 'If it fits, she sits. 100% success rate in container safety compliance for every shipment box that arrives at the studio.',
    emoji: '📦'
  }
]

function nextCat() {
  selectedCatIdx.value = (selectedCatIdx.value + 1) % cats.length
}

function prevCat() {
  selectedCatIdx.value = (selectedCatIdx.value - 1 + cats.length) % cats.length
}
</script>

<template>
  <div class="cats-card">
    <div class="card-header">
      <span class="eyebrow">STUDIO CREW</span>
      <h3 class="section-title">Studio cats · 5 cats</h3>
      <p class="section-desc">House cats, office workspace crew.</p>
    </div>

    <!-- Slide Carousel Content -->
    <div class="carousel-container">
      <div class="cat-slide">
        <div class="cat-avatar text-mono">
          <span class="avatar-emoji">{{ cats[selectedCatIdx].emoji }}</span>
        </div>
        <div class="cat-meta">
          <h4 class="cat-name">{{ cats[selectedCatIdx].name }}</h4>
          <span class="cat-role text-mono text-gold">{{ cats[selectedCatIdx].role }}</span>
          <p class="cat-desc">{{ cats[selectedCatIdx].desc }}</p>
        </div>
      </div>
      
      <!-- Slide Controls -->
      <div class="carousel-controls">
        <button @click="prevCat" class="ctrl-btn" title="Previous"><ChevronLeft class="ctrl-icon" /></button>
        <span class="slide-indicator text-mono">{{ selectedCatIdx + 1 }} / {{ cats.length }}</span>
        <button @click="nextCat" class="ctrl-btn" title="Next"><ChevronRight class="ctrl-icon" /></button>
      </div>
    </div>

    <div class="cats-footer">
      <span class="heart-span text-mono"><Heart class="heart-icon" /> Supported by Purina</span>
    </div>
  </div>
</template>

<style scoped>
.cats-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
}

.eyebrow {
  font-size: 8px;
  font-weight: 800;
  letter-spacing: 1px;
  color: var(--accent-color);
}

.section-title {
  font-size: 14px;
  font-weight: 800;
  color: var(--text-main);
  letter-spacing: -0.2px;
}

.section-desc {
  font-size: 10px;
  color: var(--text-muted);
}

.carousel-container {
  background-color: var(--bg-canvas);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 10px;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.2);
}

.cat-slide {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.cat-avatar {
  width: 44px;
  height: 44px;
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

.avatar-emoji {
  font-size: 20px;
}

.cat-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
  text-align: left;
}

.cat-name {
  font-size: 12px;
  font-weight: 700;
  color: var(--text-main);
}

.cat-role {
  font-size: 8.5px;
  font-weight: 700;
}

.text-gold {
  color: var(--accent-color);
}

.cat-desc {
  font-size: 10px;
  line-height: 1.4;
  color: var(--text-muted);
  margin-top: 4px;
}

.carousel-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid var(--border-color);
  padding-top: 8px;
}

.ctrl-btn {
  background: transparent;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}

.ctrl-btn:hover {
  background-color: rgba(255, 255, 255, 0.05);
  color: var(--text-main);
}

.ctrl-icon {
  width: 14px;
  height: 14px;
}

.slide-indicator {
  font-size: 9px;
  color: var(--text-muted);
}

.cats-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
}

.heart-span {
  font-size: 8px;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 4px;
}

.heart-icon {
  width: 8px;
  height: 8px;
  color: #ff3366;
  fill: #ff3366;
}
</style>
