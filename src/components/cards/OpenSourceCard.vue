<script setup lang="ts">
import { Star, FolderGit2 } from 'lucide-vue-next'

const repos = [
  {
    name: 'ramanda/learnify',
    stars: 320,
    desc: 'E-learning platform with video, materials, exams. Built for free access during the lockdown.',
    lang: 'PHP',
    status: 'archived \'22',
    link: 'https://github.com/ramanda/learnify'
  },
  {
    name: 'ramanda/gameina',
    stars: 153,
    desc: 'Indonesian gaming portal. Top-up + showcase for indie devs. CodeIgniter + Bootstrap.',
    lang: 'PHP',
    status: 'archived \'23',
    link: 'https://github.com/ramanda/gameina'
  },
  {
    name: 'ramanda/collegetivity',
    stars: 129,
    desc: 'Student productivity workspace. Tasks, files, class chats — one Laravel schema.',
    lang: 'PHP',
    status: 'archived \'22',
    link: 'https://github.com/ramanda/collegetivity'
  }
]
</script>

<template>
  <div class="opensource-card">
    <div class="card-header">
      <span class="eyebrow">OPEN SOURCE REPOS</span>
      <h2 class="section-title">Open source · pinned</h2>
      <p class="section-desc">
        Code I gave away, still defending years later. Three repos that taught me what I still believe about shipping.
      </p>
    </div>

    <div class="repos-grid">
      <a
        v-for="repo in repos"
        :key="repo.name"
        :href="repo.link"
        target="_blank"
        class="repo-item"
      >
        <div class="repo-top">
          <div class="repo-name-group">
            <FolderGit2 class="repo-icon" />
            <span class="repo-name text-mono">{{ repo.name }}</span>
          </div>
          <span class="repo-stars text-mono">
            <Star class="star-icon" /> {{ repo.stars }}
          </span>
        </div>
        <p class="repo-desc">{{ repo.desc }}</p>
        <div class="repo-footer text-mono">
          <span class="lang-dot"></span>
          <span class="lang-text">{{ repo.lang }}</span>
          <span class="status-text">· {{ repo.status }}</span>
        </div>
      </a>
    </div>
  </div>
</template>

<style scoped>
.opensource-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
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
  margin-bottom: 16px;
}

.repos-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  flex: 1;
}

@media (max-width: 768px) {
  .repos-grid {
    grid-template-columns: 1fr;
  }
}

.repo-item {
  background-color: var(--bg-canvas);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-decoration: none;
  transition: all 0.25s ease;
}

.repo-item:hover {
  border-color: var(--accent-color);
  box-shadow: 0 0 12px rgba(252, 199, 69, 0.1);
  transform: translateY(-1.5px);
}

.repo-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.repo-name-group {
  display: flex;
  align-items: center;
  gap: 6px;
}

.repo-icon {
  width: 13px;
  height: 13px;
  color: var(--text-muted);
}

.repo-name {
  font-size: 11px;
  font-weight: 700;
  color: var(--text-main);
}

.repo-item:hover .repo-name {
  color: var(--accent-color);
}

.repo-stars {
  font-size: 10px;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 3px;
}

.star-icon {
  width: 10px;
  height: 10px;
  fill: var(--accent-color);
  color: var(--accent-color);
}

.repo-desc {
  font-size: 10px;
  line-height: 1.5;
  color: var(--text-muted);
  margin-bottom: 12px;
}

.repo-footer {
  display: flex;
  align-items: center;
  font-size: 9px;
  color: var(--text-muted);
  margin-top: auto;
}

.lang-dot {
  width: 8px;
  height: 8px;
  background-color: #4f5d95; /* PHP purple */
  border-radius: 50%;
  margin-right: 6px;
}

.lang-text {
  font-weight: 600;
}

.status-text {
  margin-left: 4px;
}
</style>
