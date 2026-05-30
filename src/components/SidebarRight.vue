<script setup lang="ts">
import { ref } from 'vue'
import heroImg from '../assets/hero.png'
import {
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Flame,
  UserCheck,
  BarChart3
} from 'lucide-vue-next'

const sections = ref<Record<string, boolean>>({
  currently: true,
  profile: true,
  stats: true
})

function toggleSection(sec: string) {
  sections.value[sec] = !sections.value[sec]
}

function handleHireMe() {
  const contactCard = document.getElementById('card-postcard')
  if (contactCard) {
    contactCard.scrollIntoView({ behavior: 'smooth', block: 'center' })
  } else {
    window.location.href = 'mailto:masramanda@gmail.com'
  }
}
</script>

<template>
  <aside class="sidebar-right">
    <!-- Header with Avatars Pile & Hire Me button -->
    <div class="sidebar-header-custom">
      <div class="avatar-pile">
        <img :src="heroImg" class="pile-avatar active-user" title="Ramanda Maulana" alt="RM" />
        <div class="pile-avatar letter-avatar av-purple" title="Alex T.">AT</div>
        <div class="pile-avatar letter-avatar av-blue" title="Mike R.">MR</div>
        <div class="pile-avatar letter-avatar av-green" title="Jess D.">JD</div>
        <div class="pile-avatar letter-avatar av-pink" title="Lisa H.">LH</div>
      </div>
      <button @click="handleHireMe" class="hire-me-btn">Hire me</button>
    </div>

    <div class="sidebar-content">
      <!-- Section 1: Currently Collapsible Panel -->
      <div class="inspector-section">
        <div @click="toggleSection('currently')" class="section-title-bar">
          <span class="section-title-label">
            <ChevronDown v-if="sections.currently" class="chevron-icon" />
            <ChevronRight v-else class="chevron-icon" />
            <UserCheck class="sec-icon" />
            Currently
          </span>
        </div>

        <div v-show="sections.currently" class="section-fields">
          <div class="inspector-field">
            <label class="field-label">Role</label>
            <div class="field-value-box text-ellipsis">Frontend Developer</div>
          </div>
          <div class="inspector-field">
            <label class="field-label">Edu</label>
            <div class="field-value-box text-ellipsis">Bachelor's IT (Ongoing)</div>
          </div>
          <div class="inspector-field">
            <label class="field-label">Since</label>
            <div class="field-value-box text-mono">2020</div>
          </div>
        </div>
      </div>

      <!-- Section 2: Profile Collapsible Panel -->
      <div class="inspector-section border-top">
        <div @click="toggleSection('profile')" class="section-title-bar">
          <span class="section-title-label">
            <ChevronDown v-if="sections.profile" class="chevron-icon" />
            <ChevronRight v-else class="chevron-icon" />
            <Flame class="sec-icon" />
            Profile
          </span>
        </div>

        <div v-show="sections.profile" class="section-fields">
          <div class="inspector-field">
            <label class="field-label">role</label>
            <div class="field-value-box">frontend developer</div>
          </div>
          <div class="inspector-field">
            <label class="field-label">based</label>
            <div class="field-value-box">bogor, indonesia · GMT+7</div>
          </div>

          <!-- Stack Tags -->
          <div class="inspector-field flex-col">
            <label class="field-label">stack</label>
            <div class="tags-container">
              <span class="profile-tag">typescript</span>
              <span class="profile-tag">vue.js</span>
              <span class="profile-tag">nuxt.js</span>
              <span class="profile-tag">react.js</span>
              <span class="profile-tag">next.js</span>
              <span class="profile-tag">laravel</span>
              <span class="profile-tag">figma</span>
              <span class="profile-tag">git</span>
            </div>
          </div>

          <!-- Writes multi-line text area block -->
          <div class="inspector-field flex-col">
            <label class="field-label">writes</label>
            <div class="textarea-mock">
              javascript, typescript, php, css — interfaces, schemas, performance optimization
            </div>
          </div>

          <!-- Social Links Inputs -->
          <div class="inspector-field">
            <label class="field-label">github</label>
            <a href="https://github.com/ramanda" target="_blank" class="field-value-box link-box text-ellipsis">
              github.com/ramanda
              <ExternalLink class="val-link-icon" />
            </a>
          </div>
          <div class="inspector-field">
            <label class="field-label">linkedin</label>
            <a href="https://linkedin.com/in/ramandamaulana" target="_blank" class="field-value-box link-box text-ellipsis">
              linkedin.com/in/ramandamaulana
              <ExternalLink class="val-link-icon" />
            </a>
          </div>
          <div class="inspector-field">
            <label class="field-label">email</label>
            <a href="mailto:masramanda@gmail.com" class="field-value-box link-box text-ellipsis">
              masramanda@gmail.com
              <ExternalLink class="val-link-icon" />
            </a>
          </div>
        </div>
      </div>

      <!-- Section 3: Stats Collapsible Panel -->
      <div class="inspector-section border-top">
        <div @click="toggleSection('stats')" class="section-title-bar">
          <span class="section-title-label">
            <ChevronDown v-if="sections.stats" class="chevron-icon" />
            <ChevronRight v-else class="chevron-icon" />
            <BarChart3 class="sec-icon" />
            Stats
          </span>
        </div>

        <div v-show="sections.stats" class="section-fields">
          <div class="inspector-field">
            <label class="field-label">Repos</label>
            <div class="field-value-box text-mono">43</div>
          </div>
          <div class="inspector-field">
            <label class="field-label">Stars</label>
            <div class="field-value-box text-mono text-yellow-gold">★ 401</div>
          </div>
          <div class="inspector-field">
            <label class="field-label">Followers</label>
            <div class="field-value-box text-mono">417</div>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar-right {
  background-color: var(--bg-sidebar);
  border-left: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  user-select: none;
}

/* Custom Header with Avatars & Button */
.sidebar-header-custom {
  height: 52px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 14px;
}

.avatar-pile {
  display: flex;
  align-items: center;
}

.pile-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1.5px solid var(--bg-sidebar);
  margin-right: -6px;
  background-color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8px;
  font-weight: 800;
  color: #fff;
  transition: all 0.2s ease;
  cursor: pointer;
  flex-shrink: 0;
}

.pile-avatar:hover {
  transform: translateY(-2px);
  z-index: 10;
}

.active-user {
  object-fit: cover;
  border-color: #0c8ce9;
}

.letter-avatar {
  text-align: center;
}

.av-purple { background-color: #a25aff; }
.av-orange { background-color: #ff5c00; }
.av-blue { background-color: #0c8ce9; }
.av-green { background-color: #14ae5c; }
.av-pink { background-color: #ff3366; }

.hire-me-btn {
  background-color: #0c8ce9;
  color: #ffffff;
  border: none;
  font-size: 11px;
  font-weight: 700;
  padding: 6px 14px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.hire-me-btn:hover {
  background-color: #0076cf;
}

.sidebar-content {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

/* Figma Section Bar Styles */
.inspector-section {
  display: flex;
  flex-direction: column;
  padding: 6px 0;
}

.border-top {
  border-top: 1px solid var(--border-color);
}

.section-title-bar {
  height: 32px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.section-title-bar:hover {
  background-color: rgba(255, 255, 255, 0.02);
}

.section-title-label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--text-muted);
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.chevron-icon {
  width: 10px;
  height: 10px;
  color: var(--text-muted);
}

.sec-icon {
  width: 12px;
  height: 12px;
  color: var(--text-muted);
}

/* Fields & Custom Inputs layout */
.section-fields {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 6px 12px 12px 12px;
}

.inspector-field {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.flex-col {
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
}

.field-label {
  font-size: 10px;
  font-weight: 600;
  color: var(--text-muted);
  width: 52px;
  flex-shrink: 0;
}

.field-value-box {
  flex: 1;
  height: 28px;
  background-color: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  font-size: 11px;
  font-weight: 500;
  color: var(--text-main);
  transition: all 0.2s ease;
  overflow: hidden;
}

.field-value-box:hover {
  border-color: rgba(255, 255, 255, 0.15);
  background-color: rgba(255, 255, 255, 0.05);
}

.text-ellipsis {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.text-mono {
  font-family: var(--font-mono);
}

.text-yellow-gold {
  color: var(--accent-color);
  font-weight: 700;
}

/* Link Box value */
.link-box {
  color: var(--select-color);
  text-decoration: none;
  cursor: pointer;
  justify-content: space-between;
  font-weight: 600;
}

.link-box:hover {
  color: #79c0ff;
  border-color: var(--select-color);
}

.val-link-icon {
  width: 10px;
  height: 10px;
  opacity: 0.7;
}

/* Tags Container block */
.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  width: 100%;
}

.profile-tag {
  font-size: 9.5px;
  font-weight: 700;
  color: var(--text-main);
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-color);
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.profile-tag:hover {
  border-color: var(--accent-color);
  color: var(--accent-color);
  background-color: rgba(252, 199, 69, 0.05);
}

/* Textarea Custom block */
.textarea-mock {
  width: 100%;
  background-color: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 8px 10px;
  font-size: 11px;
  line-height: 1.4;
  color: var(--text-main);
}

.textarea-mock:hover {
  border-color: rgba(255, 255, 255, 0.1);
}
</style>
