<script setup lang="ts">
import { ref } from 'vue'
import { Play, RotateCcw } from 'lucide-vue-next'

const isRunning = ref(false)
const showOutput = ref(true)
const responseTime = ref(84)

function runCurl() {
  isRunning.value = true
  showOutput.value = false
  
  setTimeout(() => {
    isRunning.value = false
    showOutput.value = true
    responseTime.value = Math.floor(60 + Math.random() * 40)
  }, 1000)
}
</script>

<template>
  <div class="terminal-card">
    <div class="terminal-top">
      <div class="terminal-header">
        <span class="window-dot dot-red"></span>
        <span class="window-dot dot-yellow"></span>
        <span class="window-dot dot-green"></span>
        <span class="terminal-title text-mono">bash · ramanda@studio: ~/api</span>
      </div>
      <button @click="runCurl" class="run-btn text-mono" :disabled="isRunning">
        <RotateCcw v-if="showOutput" class="run-icon" />
        <Play v-else class="run-icon" />
        {{ isRunning ? 'Running...' : (showOutput ? 'Run Again' : 'Execute') }}
      </button>
    </div>

    <div class="terminal-body text-mono">
      <div class="prompt-line">
        <span class="prompt-symbol">$</span>
        <span class="command-text">
          curl -X POST api.example.com/v1/checkout/charge \
          <br>&nbsp;&nbsp;-H "Authorization: Bearer sk_live_…" \
          <br>&nbsp;&nbsp;-d '{"amount":4200,"currency":"SGD"}'
        </span>
      </div>

      <!-- Live Loading Spinner -->
      <div v-if="isRunning" class="loading-line">
        <span class="spinner"></span> Executing transaction...
      </div>

      <!-- Command Output -->
      <div v-if="showOutput && !isRunning" class="terminal-output">
        <div class="status-line">
          <span class="arrow-indicator">←</span>
          <span class="status-badge success">201 Created</span>
          <span class="metric-badge">{{ responseTime }}ms</span>
          <span class="metric-badge">idempotent</span>
        </div>
        <pre class="json-output"><code>{
  <span class="key">"id"</span>: <span class="string">"chg_8f39b4f2c8d2"</span>,
  <span class="key">"status"</span>: <span class="string">"succeeded"</span>,
  <span class="key">"amount"</span>: <span class="number">4200</span>,
  <span class="key">"currency"</span>: <span class="string">"SGD"</span>,
  <span class="key">"livemode"</span>: <span class="boolean">true</span>
}</code></pre>
      </div>
    </div>
  </div>
</template>

<style scoped>
.terminal-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #0b0b0b;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--border-color);
}

.terminal-top {
  height: 36px;
  background-color: #121212;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  user-select: none;
}

.terminal-header {
  display: flex;
  align-items: center;
  gap: 6px;
}

.window-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.dot-red { background-color: #ff5f56; }
.dot-yellow { background-color: #ffbd2e; }
.dot-green { background-color: #27c93f; }

.terminal-title {
  font-size: 10px;
  color: var(--text-muted);
  margin-left: 8px;
}

.run-btn {
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-color);
  color: var(--text-muted);
  font-size: 9px;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.2s ease;
}

.run-btn:hover:not(:disabled) {
  background-color: var(--accent-color);
  border-color: var(--accent-color);
  color: #000000;
}

.run-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.run-icon {
  width: 8px;
  height: 8px;
}

.terminal-body {
  flex: 1;
  padding: 16px;
  font-size: 11px;
  line-height: 1.5;
  color: #a9b1d6;
  overflow-y: auto;
  text-align: left;
}

.prompt-line {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.prompt-symbol {
  color: #fcc745;
  font-weight: 700;
}

.command-text {
  color: #a9b1d6;
}

.loading-line {
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
}

.spinner {
  width: 12px;
  height: 12px;
  border: 2px dashed var(--accent-color);
  border-radius: 50%;
  animation: spin-slow 1s linear infinite;
}

.terminal-output {
  margin-top: 12px;
  border-top: 1px dashed rgba(255, 255, 255, 0.05);
  padding-top: 12px;
}

.status-line {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 10px;
}

.arrow-indicator {
  color: #27c93f;
}

.status-badge {
  font-weight: 700;
}

.status-badge.success {
  color: #27c93f;
}

.metric-badge {
  color: var(--text-muted);
  background-color: rgba(255, 255, 255, 0.03);
  padding: 1px 4px;
  border-radius: 2px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.json-output {
  color: #eceff4;
}

.key { color: #88c0d0; }
.string { color: #a3be8c; }
.number { color: #b48ead; }
.boolean { color: #d08770; }
</style>
