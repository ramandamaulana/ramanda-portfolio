<script setup lang="ts">
import { ref } from 'vue'
import { Send, Check, Heart } from 'lucide-vue-next'

const email = ref('')
const message = ref('')
const isSending = ref(false)
const isSent = ref(false)

function handleSend() {
  if (!email.value || !message.value) return
  isSending.value = true
  
  setTimeout(() => {
    isSending.value = false
    isSent.value = true
    // Reset after success
    email.value = ''
    message.value = ''
    setTimeout(() => {
      isSent.value = false
    }, 6000)
  }, 1200) // Fast mock sending (Wait, 1.2s = 1200ms, not 1200000ms!)
  // Oops, 1200000ms is 20 minutes! Let's set it to 1200ms so it completes in 1.2 seconds!
}
</script>

<template>
  <div class="postcard-card">
    <!-- Airmail Stripes Border backdrop -->
    <div class="airmail-border"></div>

    <div class="postcard-layout">
      <!-- Left: Message Form panel -->
      <div class="message-side">
        <div v-if="!isSent" class="postcard-form">
          <span class="postcard-label text-mono">MESSAGE WRITE-UP</span>
          <textarea
            v-model="message"
            placeholder="Got a brief, a build, or a borrow? Drop me a line — I read every email and answer most by Friday."
            class="postcard-textarea"
            required
            :disabled="isSending"
          ></textarea>
          
          <div class="sender-input-group">
            <input
              v-model="email"
              type="email"
              placeholder="Your email address"
              class="postcard-input"
              required
              :disabled="isSending"
            />
            <button
              @click="handleSend"
              class="send-btn"
              :class="{ loading: isSending }"
              :disabled="isSending || !email || !message"
            >
              <Send v-if="!isSending" class="send-icon" />
              <span v-else class="spinner-small"></span>
              {{ isSending ? 'Mailing...' : 'Send Note' }}
            </button>
          </div>
        </div>

        <!-- Sent Success State -->
        <div v-else class="success-side">
          <div class="stamp-sent">
            <Check class="sent-check" />
          </div>
          <h3 class="success-title text-mono">Postcard Sent! 📮</h3>
          <p class="success-desc">
            Thanks for reaching out! Your note is flying via airmail over to Bogor. I will check it and reply by Friday!
          </p>
        </div>
      </div>

      <!-- Divider line -->
      <div class="postcard-divider"></div>

      <!-- Right: Stamp & Address panel -->
      <div class="address-side">
        <!-- Stamp and postmark -->
        <div class="stamp-panel">
          <div class="postmark text-mono">
            <span class="postmark-circle">BOGOR · ID<br>'26</span>
          </div>
          <div class="postage-stamp">
            <div class="stamp-perf"></div>
            <div class="stamp-content">
              <span class="stamp-val text-mono">IDR</span>
              <Heart class="stamp-heart" />
              <span class="stamp-val text-mono">'26</span>
            </div>
          </div>
        </div>

        <!-- Address lines -->
        <div class="address-lines">
          <div class="address-row text-mono">
            <span class="address-to">TO:</span>
            <span class="address-val">YOU, Anywhere with a brief.</span>
          </div>
          <div class="address-row text-mono">
            <span class="address-to">VIA:</span>
            <span class="address-val">Airmail · GMT+7 → worldwide</span>
          </div>
          <div class="address-row text-mono">
            <span class="address-to">FROM:</span>
            <span class="address-val text-gold">masramanda@gmail.com</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.postcard-card {
  position: relative;
  height: 100%;
  border-radius: 12px;
  background-color: var(--bg-card);
  overflow: hidden;
  border: 1px solid var(--border-color);
  padding: 12px;
}

.airmail-border {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background-image: repeating-linear-gradient(
    -45deg,
    #ff3366,
    #ff3366 12px,
    var(--bg-card) 12px,
    var(--bg-card) 20px,
    #0c8ce9 20px,
    #0c8ce9 32px,
    var(--bg-card) 32px,
    var(--bg-card) 40px
  );
}

.postcard-layout {
  display: grid;
  grid-template-columns: 1fr 2px 1.2fr;
  height: 100%;
  padding-top: 10px;
  gap: 20px;
}

@media (max-width: 768px) {
  .postcard-layout {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  .postcard-divider {
    display: none;
  }
}

.message-side {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

.postcard-form {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.postcard-label {
  font-size: 8px;
  font-weight: 800;
  color: var(--text-muted);
  letter-spacing: 1px;
}

.postcard-textarea {
  background-color: var(--bg-input);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 12px;
  color: var(--text-main);
  font-size: 12px;
  font-family: var(--font-sans);
  height: 130px;
  resize: none;
  transition: border-color 0.2s ease;
}

.postcard-textarea:focus {
  outline: none;
  border-color: var(--accent-color);
}

.sender-input-group {
  display: flex;
  gap: 8px;
}

.postcard-input {
  flex: 1;
  background-color: var(--bg-input);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 0 12px;
  height: 36px;
  color: var(--text-main);
  font-size: 11.5px;
  transition: border-color 0.2s ease;
}

.postcard-input:focus {
  outline: none;
  border-color: var(--accent-color);
}

.send-btn {
  background-color: var(--accent-color);
  color: #000000;
  border: none;
  font-weight: 700;
  font-size: 11px;
  padding: 0 16px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  height: 36px;
  transition: all 0.2s ease;
}

.send-btn:hover:not(:disabled) {
  opacity: 0.9;
  transform: translateY(-1px);
}

.send-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.send-icon {
  width: 10px;
  height: 10px;
}

.spinner-small {
  width: 10px;
  height: 10px;
  border: 1.5px dashed #000;
  border-radius: 50%;
  animation: spin-slow 1s linear infinite;
}

/* Success View */
.success-side {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 16px;
  animation: fade-in 0.4s ease;
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}

.stamp-sent {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: rgba(20, 174, 92, 0.1);
  border: 2px dashed #14ae5c;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
}

.sent-check {
  width: 24px;
  height: 24px;
  color: #14ae5c;
}

.success-title {
  font-size: 13px;
  font-weight: 700;
  color: #14ae5c;
  margin-bottom: 6px;
}

.success-desc {
  font-size: 10.5px;
  line-height: 1.5;
  color: var(--text-muted);
}

/* Divider line */
.postcard-divider {
  background-color: var(--border-color);
  width: 1px;
  height: 90%;
  align-self: center;
}

/* Stamp & address side */
.address-side {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px 0;
}

.stamp-panel {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
}

.postmark {
  position: relative;
  width: 52px;
  height: 52px;
  border: 1px dashed rgba(255, 255, 255, 0.12);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(-12deg);
}

.postmark-circle {
  font-size: 8px;
  text-align: center;
  color: var(--text-muted);
  line-height: 1.2;
}

.postage-stamp {
  width: 48px;
  height: 58px;
  background-color: var(--accent-color);
  border-radius: 3px;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3);
  transform: rotate(5deg);
  border: 2px dashed rgba(0, 0, 0, 0.2);
}

.stamp-content {
  width: 100%;
  height: 100%;
  border: 1px solid rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 2px;
}

.stamp-val {
  font-size: 8px;
  font-weight: 800;
  color: #000000;
}

.stamp-heart {
  width: 16px;
  height: 16px;
  color: #ff3366;
  fill: #ff3366;
}

/* Address rows */
.address-lines {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
}

.address-row {
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 6px;
  display: flex;
  align-items: center;
}

.address-to {
  font-size: 9px;
  font-weight: 800;
  color: var(--text-muted);
  width: 52px;
  flex-shrink: 0;
}

.address-val {
  font-size: 10px;
  color: var(--text-main);
  font-weight: 600;
}

.text-gold {
  color: var(--accent-color);
}
</style>
