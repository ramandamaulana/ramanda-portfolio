<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { Play, Pause, Disc } from 'lucide-vue-next'

const isPlaying = ref(false)
const selectedTrackIndex = ref(0) // Default to "Is There Someone Else?"
const isLoadingAudio = ref(false)

const setlist = [
  { num: '01', title: 'Is There Someone Else?', length: '3:12', term: 'the weeknd is there someone else' },
  { num: '02', title: 'Starboy', length: '3:50', term: 'the weeknd starboy' },
  { num: '03', title: 'Timeless', length: '3:36', term: 'playboi carti the weeknd timeless' },
  { num: '04', title: 'Die For You', length: '4:20', term: 'the weeknd die for you' },
  { num: '05', title: 'Moth to a Flame', length: '3:54', term: 'swedish house mafia the weeknd moth to a flame' },
  { num: '06', title: 'Save Your Tears', length: '3:35', term: 'the weeknd save your tears' },
  { num: '07', title: 'Call Out My Name', length: '3:48', term: 'the weeknd call out my name' }
]

// Web Audio API Synthesizer Setup (Fallback)
let audioCtx: AudioContext | null = null
let synthInterval: any = null
let currentStep = 0

// Live HTML5 Audio Player Setup
let audioPlayer: HTMLAudioElement | null = null

// Melodies for each track represented by frequency note arrays
const tracksMelodies: Record<number, { freq: number[], type: 'sawtooth' | 'triangle' | 'sine' | 'square', tempo: number }> = {
  0: { // Is There Someone Else?
    freq: [329.63, 392.00, 440.00, 523.25, 440.00, 392.00, 329.63, 293.66], // E4, G4, A4, C5 arpeggio
    type: 'triangle',
    tempo: 180
  },
  1: { // Starboy
    freq: [220.00, 220.00, 196.00, 220.00, 261.63, 261.63, 196.00, 196.00], // Bassline style
    type: 'square',
    tempo: 150
  },
  2: { // Timeless
    freq: [146.83, 146.83, 164.81, 174.61, 196.00, 174.61, 164.81, 146.83], // Dark heavy synth
    type: 'sawtooth',
    tempo: 160
  },
  3: { // Die For You
    freq: [349.23, 349.23, 392.00, 440.00, 329.63, 329.63, 293.66, 261.63], // Smooth pop lead
    type: 'triangle',
    tempo: 220
  },
  4: { // Moth to a Flame
    freq: [220.00, 261.63, 329.63, 392.00, 440.00, 392.00, 329.63, 261.63], // Retro arpeggiated wave
    type: 'sawtooth',
    tempo: 130
  },
  5: { // Save Your Tears
    freq: [261.63, 261.63, 329.63, 392.00, 440.00, 440.00, 349.23, 261.63], // Bright synthpop hook
    type: 'sine',
    tempo: 140
  },
  6: { // Call Out My Name
    freq: [174.61, 220.00, 261.63, 174.61, 196.00, 246.94, 293.66, 196.00], // Dramatic waltz arpeggio
    type: 'triangle',
    tempo: 250
  }
}

function playNote(freq: number, duration: number, type: 'sawtooth' | 'triangle' | 'sine' | 'square' = 'sawtooth') {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    
    if (audioCtx.state === 'suspended') {
      audioCtx.resume()
    }

    const osc = audioCtx.createOscillator()
    const gainNode = audioCtx.createGain()

    osc.type = type
    osc.frequency.value = freq

    // Premium ADSR Envelope
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime)
    gainNode.gain.linearRampToValueAtTime(0.08, audioCtx.currentTime + 0.04) // Safe, smooth volume
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration)

    osc.connect(gainNode)
    gainNode.connect(audioCtx.destination)

    osc.start()
    osc.stop(audioCtx.currentTime + duration)
  } catch (e) {
    console.warn('Audio Context is blocked or not supported yet: ', e)
  }
}

function startAudioLoop() {
  stopAudioLoop()
  currentStep = 0
  
  const melody = tracksMelodies[selectedTrackIndex.value] || tracksMelodies[0]
  
  synthInterval = setInterval(() => {
    if (!isPlaying.value) {
      stopAudioLoop()
      return
    }
    const freq = melody.freq[currentStep % melody.freq.length]
    playNote(freq, (melody.tempo / 1000) * 1.5, melody.type)
    currentStep++
  }, melody.tempo)
}

function stopAudioLoop() {
  if (synthInterval) {
    clearInterval(synthInterval)
    synthInterval = null
  }
}

function stopAllPlayback() {
  stopAudioLoop()
  if (audioPlayer) {
    audioPlayer.pause()
  }
}

function playActualTrack(idx: number) {
  stopAllPlayback()
  isLoadingAudio.value = true
  
  const track = setlist[idx]
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(track.term)}&limit=1&entity=musicTrack`

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.results && data.results.length > 0) {
        const previewUrl = data.results[0].previewUrl
        if (previewUrl) {
          audioPlayer = new Audio(previewUrl)
          audioPlayer.volume = 0.25 // Clear, comfortable volume

          audioPlayer.addEventListener('canplaythrough', () => {
            isLoadingAudio.value = false
            audioPlayer?.play().catch(e => {
              console.warn("Autoplay block, playing synth fallback:", e)
              startAudioLoop()
            })
            isPlaying.value = true
          })

          audioPlayer.addEventListener('ended', () => {
            isPlaying.value = false
          })

          audioPlayer.addEventListener('error', () => {
            isLoadingAudio.value = false
            startAudioLoop() // Fallback to synth notes arpeggio
          })
        } else {
          throw new Error('No preview URL')
        }
      } else {
        throw new Error('No track found')
      }
    })
    .catch(err => {
      console.warn('iTunes Preview API failed, using retro synth arpeggiator instead:', err)
      isLoadingAudio.value = false
      isPlaying.value = true
      startAudioLoop() // Fallback
    })
}

function togglePlay() {
  isPlaying.value = !isPlaying.value
  if (isPlaying.value) {
    playActualTrack(selectedTrackIndex.value)
  } else {
    stopAllPlayback()
  }
}

function playTrack(idx: number) {
  selectedTrackIndex.value = idx
  isPlaying.value = true
  playActualTrack(idx)
}

onUnmounted(() => {
  stopAllPlayback()
  if (audioCtx) {
    audioCtx.close()
    audioCtx = null
  }
  audioPlayer = null
})
</script>

<template>
  <div class="record-card">
    <!-- Player Left Block -->
    <div class="player-controls-panel">
      <div class="vinyl-sleeve">
        <span class="spine-tag text-mono">XO · '20</span>
        <!-- Spinning Vinyl Disc -->
        <div class="vinyl-disc-container" :class="{ playing: isPlaying }">
          <div class="vinyl-grooves spin-slow">
            <div class="vinyl-label">
              <span class="label-text text-mono">XO</span>
            </div>
          </div>
        </div>
        <div class="album-cover">
          <Disc class="cover-icon" :class="{ rotating: isPlaying }" />
          <span class="rotations-tag text-mono">THE WEEKND · XO</span>
        </div>
      </div>

      <div class="album-meta">
        <span class="eyebrow">XO ROTATION</span>
        <h3 class="album-name">After Hours (Deluxe)</h3>
        <span class="artist-sub text-mono">The Weeknd · 2020 · Synthwave / R&B</span>
        
        <!-- Live Play Toggle Button -->
        <button @click="togglePlay" class="play-toggle-btn" :class="{ active: isPlaying }">
          <Pause v-if="isPlaying && !isLoadingAudio" class="ctrl-icon" />
          <Play v-else class="ctrl-icon" />
          {{ isLoadingAudio ? 'Loading track...' : (isPlaying ? 'Pause Rotation' : 'Spin Record') }}
        </button>
      </div>
    </div>

    <!-- Setlist Right Block -->
    <div class="setlist-panel">
      <span class="setlist-header text-mono">── SETLIST ──</span>
      <div class="tracks-list">
        <button
          v-for="(track, idx) in setlist"
          :key="track.num"
          @click="playTrack(idx)"
          class="track-row"
          :class="{ active: selectedTrackIndex === idx }"
        >
          <div class="track-left">
            <span class="track-num text-mono">{{ track.num }}</span>
            <span class="track-title">{{ track.title }}</span>
            <span v-if="isPlaying && selectedTrackIndex === idx" class="soundwave">
              <span class="bar bar-1"></span>
              <span class="bar bar-2"></span>
              <span class="bar bar-3"></span>
            </span>
          </div>
          <span class="track-len text-mono">{{ track.length }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.record-card {
  display: flex;
  height: 100%;
  gap: 20px;
  justify-content: space-between;
}

.player-controls-panel {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 200px;
  flex-shrink: 0;
}

.vinyl-sleeve {
  position: relative;
  width: 130px;
  height: 130px;
  background-color: #121212;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
  margin-left: 20px;
}

.spine-tag {
  position: absolute;
  left: -20px;
  top: 50%;
  transform: rotate(-90deg) translateY(-50%);
  font-size: 8px;
  color: var(--text-muted);
  letter-spacing: 1px;
}

.vinyl-disc-container {
  position: absolute;
  right: -30px;
  width: 110px;
  height: 110px;
  z-index: 1;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
}

.vinyl-sleeve:hover .vinyl-disc-container,
.vinyl-disc-container.playing {
  transform: translateX(20px);
}

.vinyl-grooves {
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, #222 10%, #000 40%, #222 50%, #000 70%);
  border-radius: 50%;
  border: 2px solid #111;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
}

.vinyl-disc-container.playing .vinyl-grooves {
  animation: spin-slow 3s linear infinite;
}

.vinyl-label {
  width: 32px;
  height: 32px;
  background-color: var(--accent-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #000;
}

.label-text {
  font-size: 6px;
  font-weight: 800;
  color: #000;
}

.album-cover {
  position: relative;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #a70000 0%, #160000 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 4px 0 12px rgba(0, 0, 0, 0.4);
}

.cover-icon {
  width: 48px;
  height: 48px;
  color: #ffffff;
  opacity: 0.8;
  transition: transform 0.5s ease;
}

.cover-icon.rotating {
  animation: spin-slow 8s linear infinite;
}

.rotations-tag {
  position: absolute;
  bottom: 8px;
  font-size: 7px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.5px;
}

.album-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 12px;
}

.eyebrow {
  font-size: 8px;
  font-weight: 800;
  letter-spacing: 1px;
  color: var(--accent-color);
}

.album-name {
  font-size: 13px;
  font-weight: 800;
  color: var(--text-main);
  letter-spacing: -0.2px;
}

.artist-sub {
  font-size: 9px;
  color: var(--text-muted);
}

.play-toggle-btn {
  background-color: var(--bg-canvas);
  border: 1px solid var(--border-color);
  color: var(--text-main);
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 10.5px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 6px;
  transition: all 0.2s ease;
}

.play-toggle-btn:hover {
  border-color: var(--accent-color);
}

.play-toggle-btn.active {
  background-color: var(--accent-color);
  color: #000000;
  border-color: var(--accent-color);
}

.ctrl-icon {
  width: 10px;
  height: 10px;
}

/* Setlist right side */
.setlist-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
}

.setlist-header {
  font-size: 8px;
  color: var(--text-muted);
  letter-spacing: 1px;
}

.tracks-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.track-row {
  background: transparent;
  border: none;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s ease;
  width: 100%;
}

.track-row:hover {
  background-color: rgba(255, 255, 255, 0.03);
  color: var(--text-main);
}

.track-row.active {
  background-color: rgba(252, 199, 69, 0.05);
  color: var(--accent-color);
}

.track-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.track-num {
  font-size: 9px;
  color: var(--text-muted);
}

.track-row.active .track-num {
  color: var(--accent-color);
}

.track-title {
  font-size: 11px;
  font-weight: 500;
}

.track-len {
  font-size: 9px;
  color: var(--text-muted);
}

/* Sound wave animations */
.soundwave {
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 10px;
  margin-left: 6px;
}

.bar {
  width: 2px;
  background-color: var(--accent-color);
  border-radius: 1px;
}

.bar-1 { height: 40%; animation: wave-anim 0.6s ease infinite alternate; }
.bar-2 { height: 90%; animation: wave-anim 0.4s ease infinite alternate; }
.bar-3 { height: 60%; animation: wave-anim 0.8s ease infinite alternate; }

@keyframes wave-anim {
  from {
    height: 20%;
  }
  to {
    height: 100%;
  }
}
</style>
