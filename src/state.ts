import { ref, reactive } from 'vue'

export const activeCardId = ref<string>('hero')
export const activePage = ref<string>('home')
export const zoomLevel = ref<number>(100)
export const currentTheme = ref<string>('figma-dark')

export interface CardMetadata {
  id: string
  name: string
  x: number
  y: number
  w: number
  h: number
  stack: string[]
  snippet: string
}

export const cardsRegistry = reactive<Record<string, CardMetadata>>({
  hero: {
    id: 'hero',
    name: 'Profile · hero',
    x: 40,
    y: 40,
    w: 580,
    h: 380,
    stack: ['TypeScript', 'Next.js', 'React', 'Laravel', 'Framer'],
    snippet: `<template>
  <div class="hero-card">
    <span class="badge">Open for '26</span>
    <h1>Hello — I'm Ramanda</h1>
    <p>Building sites, apps, & systems people actually use.</p>
  </div>
</template>`
  },
  touch: {
    id: 'touch',
    name: 'Things I touch',
    x: 640,
    y: 40,
    w: 360,
    h: 380,
    stack: ['Figma', 'Framer', 'TypeScript', 'Vue.js', 'Laravel', 'PostgreSQL', 'Docker'],
    snippet: `<template>
  <div class="skills-grid">
    <div v-for="skill in skills" :key="skill" class="skill-badge">
      {{ skill }}
    </div>
  </div>
</template>`
  },
  experience: {
    id: 'experience',
    name: 'Experience · 6 stops',
    x: 40,
    y: 440,
    w: 480,
    h: 520,
    stack: ['UI/UX', 'Frontend', 'Framer Developer', 'Fullstack'],
    snippet: `<template>
  <div class="timeline">
    <div class="stop" v-for="stop in career" :key="stop.role">
      <h4>{{ stop.role }} @ {{ stop.company }}</h4>
      <span>{{ stop.duration }}</span>
    </div>
  </div>
</template>`
  },
  terminal: {
    id: 'terminal',
    name: 'Behind the seam',
    x: 540,
    y: 440,
    w: 460,
    h: 240,
    stack: ['Laravel', 'PostgreSQL', 'Docker', 'REST API', 'Git'],
    snippet: `<template>
  <div class="terminal-mock">
    <div class="terminal-header">
      <span class="dot red"></span>
      <span class="dot yellow"></span>
      <span class="dot green"></span>
    </div>
    <pre><code>curl -X POST api.example.com/v1/checkout/charge</code></pre>
  </div>
</template>`
  },
  opensource: {
    id: 'opensource',
    name: 'Open source · pinned',
    x: 540,
    y: 700,
    w: 460,
    h: 260,
    stack: ['PHP', 'CodeIgniter', 'Laravel', 'Bootstrap'],
    snippet: `<template>
  <div class="repos">
    <div class="repo" v-for="repo in pinned" :key="repo.name">
      <h3>{{ repo.name }}</h3>
      <p>{{ repo.desc }}</p>
    </div>
  </div>
</template>`
  },
  ships: {
    id: 'ships',
    name: 'Recent · 9 ships',
    x: 1020,
    y: 40,
    w: 320,
    h: 580,
    stack: ['Vue.js', 'Laravel', 'Wordpress', 'Vuex'],
    snippet: `<template>
  <div class="ships-container">
    <h2>Recent releases</h2>
    <ul>
      <li v-for="ship in ships" :key="ship">{{ ship }}</li>
    </ul>
  </div>
</template>`
  },
  education: {
    id: 'education',
    name: 'Education & Awards',
    x: 1020,
    y: 640,
    w: 320,
    h: 320,
    stack: ['BSc CS', 'Vocational SE', 'Web Design Gold', 'ITEXPO Silver'],
    snippet: `<template>
  <div class="education">
    <h3>BSc Computer Science</h3>
    <p>Universitas Siliwangi (GPA 3.76)</p>
  </div>
</template>`
  },
  record: {
    id: 'record',
    name: 'On heavy rotation',
    x: 40,
    y: 980,
    w: 520,
    h: 320,
    stack: ['The Weeknd', 'Synthwave / R&B', 'XO Records', 'Vinyl Rotation'],
    snippet: `<template>
  <div class="vinyl-player" :class="{ playing: isPlaying }">
    <div class="disc"></div>
    <button @click="togglePlay">Play XO track</button>
  </div>
</template>`
  },
  map: {
    id: 'map',
    name: 'Origin · topo map',
    x: 580,
    y: 980,
    w: 420,
    h: 320,
    stack: ['Bogor', 'Geopoint', 'GMT+7', 'Distance Pills'],
    snippet: `<template>
  <div class="topo-map">
    <div class="coordinates">6.5971° S, 106.8060° E</div>
    <div class="pills">Singapore: 920 km</div>
  </div>
</template>`
  },
  cats: {
    id: 'cats',
    name: 'Studio cats · crew',
    x: 1020,
    y: 980,
    w: 320,
    h: 320,
    stack: ['Semol', 'Mochi', 'Box Certified', 'Gallery Roll'],
    snippet: `<template>
  <div class="cats-carousel">
    <div class="cat-slide">{{ activeCat }}</div>
  </div>
</template>`
  },
  postcard: {
    id: 'postcard',
    name: 'Contact · postcard',
    x: 40,
    y: 1320,
    w: 1300,
    h: 340,
    stack: ['Airmail Stamps', 'Bogor Postmark', 'Send Note', 'Email Client'],
    snippet: `<template>
  <form @submit.prevent="sendMail" class="airmail-form">
    <input type="email" placeholder="Your email" />
    <textarea placeholder="Your message"></textarea>
    <button type="submit">Send note</button>
  </form>
</template>`
  }
})

export function selectCard(id: string) {
  if (cardsRegistry[id]) {
    activeCardId.value = id
  }
}

export function setTheme(themeName: string) {
  currentTheme.value = themeName
  document.documentElement.setAttribute('data-theme', themeName)
}
