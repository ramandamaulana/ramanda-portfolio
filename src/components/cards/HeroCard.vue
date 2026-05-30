<script setup lang="ts">
import { Mail, ArrowRight } from 'lucide-vue-next'
import heroImg from '../../assets/hero.png'
</script>

<template>
  <div class="hero-card">
    <!-- Huge subtle background watermark RM -->
    <div class="watermark-rm">RM</div>

    <!-- Header: Avatar + Apple Icon Chip -->
    <div class="hero-header">
      <div class="avatar-block">
        <img :src="heroImg" class="avatar-face" alt="Ramanda Maulana" />
        
        <!-- Apple Mini Icon Badge -->
        <div class="apple-badge">
          <svg class="apple-svg" viewBox="0 0 170 170">
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.37.13-9.13-1.9-14.31-6.08-3.35-2.79-7.15-7.42-11.38-13.91-4.81-7.37-8.72-15.65-11.73-24.86-3.02-9.21-4.53-18.06-4.53-26.54 0-12.84 3.19-23.36 9.58-31.55 6.38-8.19 14.54-12.33 24.47-12.44 4.58 0 9.84 1.34 15.77 4.02 5.92 2.68 9.94 4.02 12.06 4.02 1.68 0 5.48-1.29 11.39-3.86 5.92-2.57 11.23-3.8 15.93-3.69 11.62.22 21.01 4.3 28.17 12.24-9.5 5.81-14.15 13.97-13.98 24.47.17 8.38 3.19 15.25 9.05 20.61 5.87 5.36 12.91 8.27 21.12 8.72 1.45 3.58 2.68 7.37 3.69 11.39.89 3.58 1.34 6.7 1.34 9.39zM119.22 32.74c0-7.71 2.74-14.86 8.21-21.46 5.48-6.59 12.24-10.45 20.28-11.57.11 1.01.17 1.9.17 2.68 0 7.49-2.79 14.53-8.38 21.12-5.59 6.59-12.46 10.51-20.62 11.74-.22-1.01-.34-1.85-.34-2.51z" fill="#ffffff" />
          </svg>
        </div>

        <span class="avatar-label">HELLO — I'M RAMANDA</span>
      </div>
    </div>

    <!-- Body: Visual Title and 3D icons embedded -->
    <div class="hero-body">
      <h1 class="display-title">
        Building 
        <!-- 3D Blue Browser Icon -->
        <span class="icon-inline blue-browser">
          <svg viewBox="0 0 48 38" fill="none" class="inline-svg-3d">
            <rect x="1" y="1" width="46" height="36" rx="6" fill="url(#browser-gradient)" stroke="#1d4ed8" stroke-width="1.5"/>
            <!-- Browser top bar -->
            <rect x="1" y="1" width="46" height="8" rx="2" fill="#1e40af" />
            <circle cx="5" cy="5" r="1.5" fill="#ef4444" />
            <circle cx="9" cy="5" r="1.5" fill="#f59e0b" />
            <circle cx="13" cy="5" r="1.5" fill="#10b981" />
            <!-- Card preview inside -->
            <rect x="6" y="14" width="22" height="15" rx="3" fill="#3b82f6" opacity="0.8" />
            <rect x="32" y="14" width="10" height="4" rx="1" fill="#fff" opacity="0.6" />
            <rect x="32" y="21" width="10" height="2" rx="0.5" fill="#fff" opacity="0.4" />
            <rect x="32" y="25" width="8" height="2" rx="0.5" fill="#fff" opacity="0.4" />
            
            <defs>
              <linearGradient id="browser-gradient" x1="24" y1="1" x2="24" y2="37" gradientUnits="userSpaceOnUse">
                <stop stop-color="#3b82f6"/>
                <stop offset="1" stop-color="#1d4ed8"/>
              </linearGradient>
            </defs>
          </svg>
        </span>
        sites, 
        
        <!-- 3D Orange-Red Mobile Phone Icon -->
        <span class="icon-inline red-phone">
          <svg viewBox="0 0 30 46" fill="none" class="inline-svg-3d">
            <rect x="1" y="1" width="28" height="44" rx="8" fill="url(#phone-gradient)" stroke="#b91c1c" stroke-width="1.5"/>
            <!-- Screen bezel -->
            <rect x="3" y="3" width="24" height="40" rx="5" fill="#111827" />
            <!-- Notch -->
            <rect x="10" y="3" width="10" height="3" rx="1.5" fill="#1f2937" />
            <!-- Apps icons inside screen -->
            <rect x="6" y="9" width="6" height="6" rx="1.5" fill="#ef4444" />
            <rect x="14" y="9" width="6" height="6" rx="1.5" fill="#3b82f6" />
            <rect x="6" y="17" width="6" height="6" rx="1.5" fill="#10b981" />
            <rect x="14" y="17" width="6" height="6" rx="1.5" fill="#f59e0b" />
            <!-- Bottom home indicator -->
            <rect x="10" y="40" width="10" height="1.5" rx="0.75" fill="#fff" opacity="0.5" />
            
            <defs>
              <linearGradient id="phone-gradient" x1="15" y1="1" x2="15" y2="45" gradientUnits="userSpaceOnUse">
                <stop stop-color="#f97316"/>
                <stop offset="1" stop-color="#dc2626"/>
              </linearGradient>
            </defs>
          </svg>
        </span>
        apps, 
        & 
        
        <!-- 3D Dark CLI Terminal Icon -->
        <span class="icon-inline dark-terminal">
          <svg viewBox="0 0 46 38" fill="none" class="inline-svg-3d">
            <rect x="1" y="1" width="44" height="36" rx="6" fill="url(#terminal-gradient)" stroke="#111827" stroke-width="1.5"/>
            <!-- Terminal Header -->
            <rect x="1" y="1" width="44" height="7" rx="1.5" fill="#1f2937" />
            <circle cx="5" cy="4.5" r="1" fill="#ef4444" />
            <circle cx="8" cy="4.5" r="1" fill="#f59e0b" />
            <circle cx="11" cy="4.5" r="1" fill="#10b981" />
            <!-- Terminal line prompt -->
            <path d="M 6 15 L 10 18 L 6 21" stroke="#10b981" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <rect x="13" y="19" width="6" height="2" fill="#10b981" />
            
            <defs>
              <linearGradient id="terminal-gradient" x1="23" y1="1" x2="23" y2="37" gradientUnits="userSpaceOnUse">
                <stop stop-color="#374151"/>
                <stop offset="1" stop-color="#111827"/>
              </linearGradient>
            </defs>
          </svg>
        </span>
        systems 
        people actually use.
      </h1>

      <!-- Integrated horizontal single chip info bar -->
      <div class="info-chips-bar">
        <span class="info-dot">●</span>
        <span class="info-text font-bold text-green">OPEN FOR '26</span>
        <span class="info-bullet">·</span>
        <span class="info-text">BOGOR, ID</span>
        <span class="info-bullet">·</span>
        <span class="info-text">GMT+7</span>
        <span class="info-bullet">·</span>
        <span class="info-text">SHIPS WEEKLY</span>
      </div>

      <!-- Intro Description Text -->
      <p class="intro-description">
        Frontend Developer from Indonesia. Over 3 years of experience building and enhancing web applications, optimizing performance, and implementing scalable design systems. Passionate about creating premium user interfaces that look stunning and feel smooth.
        <a href="#card-experience" class="more-about-link">More about Ramanda →</a>
      </p>
    </div>

    <!-- Footer: Primary and secondary capsule buttons -->
    <div class="hero-footer">
      <div class="cta-capsule-container">
        <a href="#card-experience" class="btn-pill-dark font-bold">
          See work <ArrowRight class="cta-arrow" />
        </a>
        <a href="#card-postcard" class="btn-pill-white font-bold">
          <Mail class="mail-icon" /> masramanda@gmail.com
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-card {
  background-color: #F9F6F0;
  color: #161616;
  width: 100%;
  height: 100%;
  padding: 28px 32px;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
}

/* Massive subtle watermark initials in background */
.watermark-rm {
  position: absolute;
  bottom: -20px;
  right: -5px;
  font-size: 190px;
  font-weight: 800;
  color: rgba(22, 22, 22, 0.035);
  font-family: var(--font-sans);
  pointer-events: none;
  user-select: none;
  z-index: 1;
  line-height: 1;
}

.hero-header {
  z-index: 5;
  margin-bottom: 8px;
}

.avatar-block {
  display: flex;
  align-items: center;
  gap: 8px;
}

.avatar-face {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid rgba(0,0,0,0.08);
}

.apple-badge {
  width: 18px;
  height: 18px;
  background-color: #000000;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.apple-svg {
  width: 10px;
  height: 10px;
}

.avatar-label {
  font-size: 10px;
  font-weight: 700;
  color: #707070;
  letter-spacing: 0.5px;
}

.hero-body {
  z-index: 5;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.display-title {
  font-size: 32px;
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -1.3px;
  color: #161616;
  margin: 0;
  word-break: break-word;
}

/* Inline 3D Icons elements */
.icon-inline {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  margin: 0 2px;
}

.inline-svg-3d {
  height: 28px;
  filter: drop-shadow(0 4px 10px rgba(0,0,0,0.12));
  transform: translateY(-2px);
  transition: transform 0.3s ease;
}

.icon-inline:hover .inline-svg-3d {
  transform: translateY(-4px) scale(1.05);
}

.blue-browser {
  width: 36px;
}

.red-phone {
  width: 20px;
}

.dark-terminal {
  width: 34px;
}

/* Integrated Horizontal Chip Bar */
.info-chips-bar {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 2px;
}

.info-dot {
  font-size: 7px;
  color: #14ae5c;
  animation: pulse-slow 2s infinite;
}

.info-text {
  font-size: 10px;
  color: #707070;
  letter-spacing: 0.5px;
}

.text-green {
  color: #14ae5c;
}

.info-bullet {
  font-size: 12px;
  color: rgba(0,0,0,0.15);
  font-weight: bold;
}

/* Description intro texts */
.intro-description {
  font-size: 12.5px;
  line-height: 1.5;
  color: #555555;
  margin: 4px 0 0 0;
}

.hitpay-link {
  font-weight: 700;
  color: #161616;
  text-decoration: underline;
  text-decoration-thickness: 1.5px;
  text-underline-offset: 3px;
}

.hitpay-link:hover {
  color: #0c8ce9;
}

.more-about-link {
  font-weight: 700;
  color: #161616;
  text-decoration: underline;
  text-decoration-thickness: 1.5px;
  text-underline-offset: 3px;
  margin-left: 2px;
  white-space: nowrap;
}

.more-about-link:hover {
  color: #0c8ce9;
}

/* Footer layout */
.hero-footer {
  z-index: 5;
  margin-top: 8px;
}

.cta-capsule-container {
  display: flex;
  gap: 10px;
  align-items: center;
}

.cta-arrow {
  width: 14px;
  height: 14px;
}

.mail-icon {
  width: 14px;
  height: 14px;
  color: #555;
}

.font-bold {
  font-weight: 700;
}

@media (max-width: 768px) {
  .hero-card {
    padding: 24px;
  }
  .display-title {
    font-size: 26px;
    letter-spacing: -0.8px;
  }
  .inline-svg-3d {
    height: 22px;
  }
  .watermark-rm {
    font-size: 120px;
  }
  .cta-capsule-container {
    flex-direction: column;
    align-items: stretch;
    width: 100%;
  }
  .btn-pill-dark, .btn-pill-white {
    justify-content: center;
  }
}
</style>
