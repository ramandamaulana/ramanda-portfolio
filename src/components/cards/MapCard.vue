<script setup lang="ts">
import { MapPin, Navigation } from 'lucide-vue-next'

const distances = [
  { city: 'Singapore', dist: '920 km' },
  { city: 'Tokyo', dist: '5,830 km' },
  { city: 'San Francisco', dist: '14,020 km' }
]
</script>

<template>
  <div class="map-card">
    <div class="map-left">
      <span class="eyebrow">ORIGIN & GEOLOCATION</span>
      <h3 class="location-title">From Bogor, ID</h3>
      <p class="location-desc">
        Shipping digital solutions everywhere from a serene city in West Java, Indonesia.
      </p>

      <!-- Distance Pills -->
      <div class="pills-container">
        <div v-for="d in distances" :key="d.city" class="distance-pill">
          <span class="pill-dist text-mono text-gold">{{ d.dist }}</span>
          <span class="pill-city text-mono">to {{ d.city }}</span>
        </div>
      </div>
    </div>

    <!-- Interactive Topo Canvas -->
    <div class="map-right">
      <div class="topo-canvas">
        <!-- Contour lines SVG backdrop -->
        <svg class="topo-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M 0 30 Q 30 10 50 35 T 100 20" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1" />
          <path d="M 0 50 Q 40 30 60 65 T 100 40" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1.5" />
          <path d="M 0 70 Q 20 60 70 85 T 100 60" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1" />
          <path d="M 0 85 Q 50 75 80 95" fill="none" stroke="rgba(255,255,255,0.02)" stroke-width="0.8" />
        </svg>

        <!-- Pulsing radar target -->
        <div class="radar-dot">
          <div class="ping-ring ring-1"></div>
          <div class="ping-ring ring-2"></div>
          <div class="center-dot">
            <MapPin class="pin-icon" />
          </div>
        </div>

        <div class="coordinates-overlay text-mono">
          <Navigation class="nav-icon" />
          6.5971° S, 106.8060° E
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.map-card {
  display: flex;
  height: 100%;
  gap: 16px;
  justify-content: space-between;
}

.map-left {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 180px;
  flex-shrink: 0;
}

.eyebrow {
  font-size: 8px;
  font-weight: 800;
  letter-spacing: 1px;
  color: var(--accent-color);
}

.location-title {
  font-size: 14px;
  font-weight: 800;
  color: var(--text-main);
  letter-spacing: -0.2px;
}

.location-desc {
  font-size: 10px;
  line-height: 1.4;
  color: var(--text-muted);
  margin-top: 4px;
  margin-bottom: auto;
}

.pills-container {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 12px;
}

.distance-pill {
  background-color: var(--bg-canvas);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 4px 8px;
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.pill-dist {
  font-size: 10px;
  font-weight: 700;
}

.text-gold {
  color: var(--accent-color);
}

.pill-city {
  font-size: 8px;
  color: var(--text-muted);
}

/* Radar & coordinates map canvas */
.map-right {
  flex: 1;
  height: 100%;
  position: relative;
  background-color: #0d0d0d;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
}

.topo-canvas {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.topo-lines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.radar-dot {
  position: relative;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.center-dot {
  width: 16px;
  height: 16px;
  background-color: var(--accent-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  box-shadow: 0 0 10px var(--accent-color);
}

.pin-icon {
  width: 10px;
  height: 10px;
  color: #000000;
}

.ping-ring {
  position: absolute;
  border: 1px solid var(--accent-color);
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;
}

.ring-1 {
  width: 32px;
  height: 32px;
  animation: ping-anim 2.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.ring-2 {
  width: 48px;
  height: 48px;
  animation: ping-anim 2.5s cubic-bezier(0, 0, 0.2, 1) infinite 1.25s;
}

@keyframes ping-anim {
  0% {
    transform: scale(0.5);
    opacity: 0.8;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

.coordinates-overlay {
  position: absolute;
  bottom: 8px;
  left: 8px;
  font-size: 8px;
  background-color: rgba(0, 0, 0, 0.6);
  border: 1px solid var(--border-color);
  padding: 3px 6px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--text-main);
  backdrop-filter: blur(2px);
}

.nav-icon {
  width: 8px;
  height: 8px;
  color: var(--accent-color);
}
</style>
