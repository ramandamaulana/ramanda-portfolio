<script setup lang="ts">
import { Trophy, GraduationCap } from 'lucide-vue-next'

const eduStops = [
  {
    type: "Bachelor's IT",
    school: "Information Technology",
    duration: '2023 — 2027',
    grade: 'Ongoing Degree (Active)',
    badge: 'BScIT'
  }
]

const awards = [
  {
    rank: 'Vue',
    label: 'Vue - The Complete Guide',
    issuer: 'Maximilian Schwarzmüller (Udemy) · 2024'
  },
  {
    rank: 'React',
    label: 'React - The Complete Guide 2024',
    issuer: 'Maximilian Schwarzmüller (Udemy) · 2023'
  },
  {
    rank: 'JS',
    label: 'Full-Stack JavaScript Developer',
    issuer: 'Build With Angga · 2022'
  },
  {
    rank: 'PWA',
    label: 'Mastering React JS (Progressive Web Apps)',
    issuer: 'E-Commerce Specialization · 2022'
  }
]
</script>

<template>
  <div class="education-card">
    <!-- Education block -->
    <div class="card-section">
      <div class="section-title-group">
        <GraduationCap class="sec-icon text-gold" />
        <span class="eyebrow">EDUCATION</span>
      </div>
      <div class="edu-list">
        <div v-for="edu in eduStops" :key="edu.school" class="edu-item">
          <div class="edu-avatar text-mono">{{ edu.badge }}</div>
          <div class="edu-details">
            <h4 class="edu-type">{{ edu.type }}</h4>
            <span class="edu-school">{{ edu.school }} · <span class="text-mono text-muted">{{ edu.duration }}</span></span>
            <span class="edu-grade text-mono text-gold">{{ edu.grade }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Awards block -->
    <div class="card-section border-top">
      <div class="section-title-group">
        <Trophy class="sec-icon text-gold" />
        <span class="eyebrow">CERTIFICATIONS & PROOF</span>
      </div>
      <div class="awards-list">
        <div v-for="award in awards" :key="award.label" class="award-item">
          <div class="award-badge text-mono">{{ award.rank }}</div>
          <div class="award-details">
            <h4 class="award-label">{{ award.label }}</h4>
            <span class="award-issuer">{{ award.issuer }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.education-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
}

.card-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.border-top {
  border-top: 1px solid var(--border-color);
  padding-top: 12px;
}

.section-title-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.sec-icon {
  width: 14px;
  height: 14px;
}

.text-gold {
  color: var(--accent-color);
}

.eyebrow {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1.5px;
  color: var(--text-muted);
}

.edu-list,
.awards-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.edu-item,
.award-item {
  display: flex;
  gap: 12px;
  align-items: center;
}

.edu-avatar {
  width: 36px;
  height: 36px;
  background-color: var(--bg-canvas);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  color: var(--text-muted);
  flex-shrink: 0;
}

.edu-details,
.award-details {
  display: flex;
  flex-direction: column;
  line-height: 1.3;
}

.edu-type,
.award-label {
  font-size: 12px;
  font-weight: 700;
  color: var(--text-main);
}

.edu-school,
.award-issuer {
  font-size: 10.5px;
  color: var(--text-muted);
}

.edu-grade {
  font-size: 9px;
  font-weight: 600;
  margin-top: 2px;
}

.award-badge {
  width: 52px;
  height: 24px;
  background-color: rgba(252, 199, 69, 0.1);
  border: 1px solid rgba(252, 199, 69, 0.2);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  font-weight: 800;
  color: var(--accent-color);
  flex-shrink: 0;
}
</style>
