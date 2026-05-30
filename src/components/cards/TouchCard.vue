<script setup lang="ts">
// Royal Blue stacks card - pure elegant typography
</script>

<template>
  <div class="touch-card">
    <!-- Huge background visual watermarks (Framer Style) -->
    <div class="bg-watermark-container">
      <!-- Line 1: ACT [laravel-badge] LAR -->
      <div class="watermark-line line-solid">
        <span class="wm-text">ACT</span>
        
        <!-- Laravel Red Logo Hexagon SVG -->
        <span class="laravel-badge-inline">
          <svg class="laravel-svg" viewBox="0 0 100 100" fill="none">
            <path d="M83.4 20.8 L53.7 3.7 C51.4 2.4 48.6 2.4 46.3 3.7 L16.6 20.8 C14.3 22.1 12.9 24.5 12.9 27.2 L12.9 61.4 C12.9 64.1 14.3 66.5 16.6 67.8 L46.3 84.9 C48.6 86.2 51.4 86.2 53.7 84.9 L83.4 67.8 C85.7 66.5 87.1 64.1 87.1 61.4 L87.1 27.2 C87.1 24.5 85.7 22.1 83.4 20.8 Z" fill="#ff2d20" />
            <path d="M42 35 C42 32 45 30 50 30 C55 30 58 32 58 35 L58 60 C58 63 55 65 50 65 C45 65 42 63 42 60 Z" stroke="#ffffff" stroke-width="6" stroke-linecap="round" fill="none" />
            <path d="M34 45 L50 45" stroke="#ffffff" stroke-width="6" stroke-linecap="round" />
          </svg>
        </span>
        
        <span class="wm-text">LAR</span>
      </div>
      
      <!-- Line 2: GMA ● FRAM (Outlined text) -->
      <div class="watermark-line line-outline">
        <span class="wm-text-outline">GMA</span>
        <span class="wm-dot-outline">●</span>
        <span class="wm-text-outline">FRAM</span>
      </div>
    </div>

    <!-- Foreground Content -->
    <div class="touch-content">
      <span class="touch-eyebrow">THINGS I TOUCH</span>
      
      <h2 class="touch-headline">
        Surface, system,<br>
        and the small<br>
        bits<br>
        <span class="text-yellow-gold">in between.</span>
      </h2>
      
      <p class="touch-description">
        Figma & Framer for surface, Next.js for frontend, Laravel + Postgres for the part underneath — and the fifteen variants of an empty state nobody else wants to draw.
      </p>
    </div>
  </div>
</template>

<style scoped>
.touch-card {
  background-color: #2F6FE5;
  color: #ffffff;
  width: 100%;
  height: 100%;
  padding: 32px;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
}

/* Background floating text container */
.bg-watermark-container {
  position: absolute;
  top: 15px;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 0px;
  pointer-events: none;
  user-select: none;
  z-index: 1;
  padding: 0 10px;
}

.watermark-line {
  display: flex;
  align-items: center;
  gap: 12px;
  line-height: 0.95;
  white-space: nowrap;
}

.wm-text {
  font-family: var(--font-sans);
  font-size: 78px;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.12);
  letter-spacing: -3px;
}

.laravel-badge-inline {
  width: 58px;
  height: 58px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 45, 32, 0.15);
  border: 1px solid rgba(255, 45, 32, 0.3);
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(255, 45, 32, 0.2);
  transform: rotate(-5deg);
}

.laravel-svg {
  width: 36px;
  height: 36px;
}

/* Line 2 outlined style */
.line-outline {
  margin-top: -6px;
}

.wm-text-outline {
  font-family: var(--font-sans);
  font-size: 78px;
  font-weight: 900;
  color: transparent;
  -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.11);
  letter-spacing: -3px;
}

.wm-dot-outline {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.11);
}

/* Foreground content layout */
.touch-content {
  z-index: 5;
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: left;
}

.touch-eyebrow {
  font-size: 10px;
  font-weight: 800;
  color: #A9C6FF;
  letter-spacing: 0.8px;
}

.touch-headline {
  font-size: 30px;
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -1.2px;
  color: #ffffff;
  margin: 0 0 4px 0;
}

.text-yellow-gold {
  color: #FCC745;
}

.touch-description {
  font-size: 12px;
  line-height: 1.55;
  color: #D2E0FF;
  margin: 0;
}

@media (max-width: 768px) {
  .touch-card {
    padding: 24px;
    height: 380px;
    justify-content: flex-end;
  }
  
  .wm-text, .wm-text-outline {
    font-size: 60px;
  }
  
  .laravel-badge-inline {
    width: 44px;
    height: 44px;
  }
  
  .laravel-svg {
    width: 28px;
    height: 28px;
  }
  
  .touch-headline {
    font-size: 26px;
  }
}
</style>
