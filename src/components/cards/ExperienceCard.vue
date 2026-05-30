<script setup lang="ts">
import { Briefcase } from 'lucide-vue-next'

const careerStops = [
  {
    role: 'Frontend Developer',
    company: 'BFI Finance',
    duration: '2021 — 2023',
    desc: 'Optimized API data processing, reducing load time by 20%. Designed and implemented new web application features, increasing user satisfaction by 15%. Refactored codebase for performance.',
    isCurrent: true
  },
  {
    role: 'Frontend Developer (Freelance)',
    company: 'PANDI',
    duration: '2021 — 2022',
    desc: 'Developed internal websites and CMS platforms, focusing on usability and scalability. Participated in creating corporate landing pages using Laravel.'
  },
  {
    role: 'Frontend Developer (Intern)',
    company: 'Solusi integrasi pratama',
    duration: '2020 — 2021',
    desc: 'Collaborated on client website development, ensuring responsive and accessible designs using Vue.js and Nuxt.'
  },
  {
    role: 'Product Designer',
    company: 'Unixon Branding',
    duration: '2017 — 2018',
    desc: 'Created and documented design libraries, including styles, components, and templates to align with client branding goals.'
  }
]
</script>

<template>
  <div class="experience-card">
    <div class="card-header">
      <span class="eyebrow">CAREER STOPS</span>
      <h2 class="section-title">Experience · 4 stops</h2>
      <p class="section-desc">
        Over 3 years of building responsive user interfaces, optimizing client platforms, and designing accessible digital systems.
      </p>
    </div>

    <div class="timeline-container">
      <div class="timeline-line"></div>
      <div
        v-for="stop in careerStops"
        :key="stop.company"
        class="timeline-item"
        :class="{ active: stop.isCurrent }"
      >
        <div class="timeline-marker">
          <Briefcase class="marker-icon" />
        </div>
        <div class="timeline-content">
          <div class="timeline-top">
            <span class="role-text">{{ stop.role }}</span>
            <span class="duration-text text-mono">{{ stop.duration }}</span>
          </div>
          <div class="company-text">@ {{ stop.company }}</div>
          <p class="stop-desc">{{ stop.desc }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.experience-card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.eyebrow {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1.5px;
  color: var(--accent-color);
  margin-bottom: 6px;
  display: block;
}

.section-title {
  font-size: 20px;
  font-weight: 800;
  color: var(--text-main);
  margin-bottom: 8px;
  letter-spacing: -0.4px;
}

.section-desc {
  font-size: 11px;
  line-height: 1.5;
  color: var(--text-muted);
  margin-bottom: 20px;
}

.timeline-container {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
  overflow-y: auto;
  padding-left: 12px;
}

.timeline-line {
  position: absolute;
  left: 21px;
  top: 8px;
  bottom: 8px;
  width: 2px;
  background-color: var(--border-color);
  z-index: 1;
}

.timeline-item {
  position: relative;
  display: flex;
  gap: 16px;
  z-index: 2;
}

.timeline-marker {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--bg-card);
  border: 2px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
  margin-top: 2px;
}

.marker-icon {
  width: 10px;
  height: 10px;
  color: var(--text-muted);
  transition: all 0.3s ease;
}

.timeline-item:hover .timeline-marker,
.timeline-item.active .timeline-marker {
  border-color: var(--accent-color);
  background-color: var(--accent-color);
  box-shadow: 0 0 8px rgba(252, 199, 69, 0.4);
}

.timeline-item:hover .marker-icon,
.timeline-item.active .marker-icon {
  color: #000;
}

.timeline-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.timeline-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 8px;
}

.role-text {
  font-size: 13px;
  font-weight: 700;
  color: var(--text-main);
}

.duration-text {
  font-size: 9px;
  color: var(--text-muted);
  background-color: var(--bg-canvas);
  border: 1px solid var(--border-color);
  padding: 2px 6px;
  border-radius: 4px;
}

.company-text {
  font-size: 11px;
  font-weight: 700;
  color: var(--accent-color);
}

.stop-desc {
  font-size: 11px;
  line-height: 1.5;
  color: var(--text-muted);
  margin-top: 4px;
}
</style>
