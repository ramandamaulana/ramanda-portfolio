<script setup lang="ts">
import { ref } from 'vue'
import { CheckCircle2, ChevronRight, ExternalLink } from 'lucide-vue-next'

const selectedShipIndex = ref(0)

const ships = [
  {
    name: 'Grosirmotor',
    stack: ['Vue Js', 'Laravel'],
    desc: 'Platform online motor bekas yang berkualitas dengan harga terbaik.',
    url: '#'
  },
  {
    name: 'Uemka',
    stack: ['Vue Js', 'Laravel'],
    desc: 'Kami membantu Anda untuk menemukan lembaga keuangan terbaik.',
    url: '#'
  },
  {
    name: 'Bakti Fajar Idaman',
    stack: ['Vue Js', 'Laravel'],
    desc: 'Bakti Fajar Idaman adalah organisasi ekonomi dioperasikan oleh seseorang demi kepentingan bersama.',
    url: '#'
  },
  {
    name: 'AgreeSIP',
    stack: ['Wordpress'],
    desc: '"AgreeSIP adalah solusi cepat dana tunai dari segala kebutuhan finansial-mu menggunakan jaminan BPKB mobil"',
    url: '#'
  },
  {
    name: 'Solusi One',
    stack: ['Vue Js', 'Laravel'],
    desc: 'Layanan dan Jasa',
    url: '#'
  },
  {
    name: 'Pickers Indonesia',
    stack: ['Wordpress'],
    desc: 'Pendanaan full dari rumah dengan mudah dengan pickeres',
    url: '#'
  },
  {
    name: 'Vehiclo',
    stack: ['Vue Js', 'Laravel'],
    desc: 'Vehiclo hadir untuk memberikan anda Solusi pengelolaan kendaraan',
    url: '#'
  },
  {
    name: 'CMS Grosirmotor',
    stack: ['Vue Js', 'Vuex'],
    desc: 'content management system pengelolaan kendaraan',
    url: '#'
  },
  {
    name: 'CMS Recovery Power Management',
    stack: ['Laravel', 'Vue Js'],
    desc: '"RPM adalah integrated platform berbasis digital."',
    url: '#'
  }
]
</script>

<template>
  <div class="ships-card">
    <div class="card-header">
      <span class="eyebrow">PRODUCT RELEASES</span>
      <h2 class="section-title">Recent · 9 ships</h2>
      <p class="section-desc">Tight loops, shipped weekly, polished Friday.</p>
    </div>

    <!-- Active Details Viewer -->
    <div class="active-ship-details">
      <div class="ship-details-header">
        <h3 class="active-ship-name">{{ ships[selectedShipIndex].name }}</h3>
        <div class="active-ship-tags">
          <span v-for="tech in ships[selectedShipIndex].stack" :key="tech" class="tech-tag text-mono">
            {{ tech }}
          </span>
        </div>
      </div>
      <p class="active-ship-desc">{{ ships[selectedShipIndex].desc }}</p>
      <a
        v-if="ships[selectedShipIndex].url !== '#'"
        :href="ships[selectedShipIndex].url"
        target="_blank"
        class="visit-link text-mono"
      >
        Visit surface <ExternalLink class="link-icon" />
      </a>
    </div>

    <!-- Release List Grid -->
    <div class="ships-scroll-list">
      <button
        v-for="(ship, idx) in ships"
        :key="ship.name"
        @click="selectedShipIndex = idx"
        class="ship-row-btn"
        :class="{ active: selectedShipIndex === idx }"
      >
        <div class="row-left">
          <CheckCircle2 class="check-icon" />
          <span class="ship-name">{{ ship.name }}</span>
        </div>
        <ChevronRight class="arrow-icon" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.ships-card {
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
  margin-bottom: 4px;
  letter-spacing: -0.4px;
}

.section-desc {
  font-size: 11px;
  color: var(--text-muted);
  margin-bottom: 16px;
}

.active-ship-details {
  background-color: var(--bg-canvas);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.2);
}

.ship-details-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.active-ship-name {
  font-size: 14px;
  font-weight: 700;
  color: var(--accent-color);
}

.active-ship-tags {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

.tech-tag {
  font-size: 9px;
  color: var(--accent-color);
  background-color: rgba(252, 199, 69, 0.05);
  border: 1px solid rgba(252, 199, 69, 0.2);
  padding: 2px 6px;
  border-radius: 4px;
}

.active-ship-desc {
  font-size: 11px;
  line-height: 1.5;
  color: var(--text-main);
}

.visit-link {
  font-size: 10px;
  font-weight: 700;
  color: var(--select-color);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: 4px;
}

.visit-link:hover {
  color: var(--text-main);
  text-decoration: underline;
}

.link-icon {
  width: 10px;
  height: 10px;
}

.ships-scroll-list {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.ship-row-btn {
  height: 36px;
  background-color: var(--bg-canvas);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  color: var(--text-muted);
  transition: all 0.2s ease;
  width: 100%;
}

.ship-row-btn:hover {
  border-color: rgba(252, 199, 69, 0.5);
  color: var(--text-main);
}

.ship-row-btn.active {
  background-color: rgba(252, 199, 69, 0.08);
  border-color: var(--accent-color);
  color: var(--text-main);
}

.row-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.check-icon {
  width: 12px;
  height: 12px;
  color: #14ae5c;
}

.ship-name {
  font-size: 11px;
  font-weight: 600;
}

.arrow-icon {
  width: 12px;
  height: 12px;
  opacity: 0.5;
}
</style>
