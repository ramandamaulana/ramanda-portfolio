# ⚡ Ramanda Maulana — Figma-Style Interactive Canvas Portfolio

[![Vue](https://img.shields.io/badge/Vue.js-3.5+-4fc08d?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0+-646cff?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-fcc745?style=for-the-badge)](https://opensource.org/licenses/MIT)

Selamat datang di repositori portofolio interaktif milik **Ramanda Maulana**. Project ini bukan sekadar web resume biasa, melainkan sebuah visualisasi workspace interaktif bertema **Figma Canvas** di mana pengunjung dapat menggeser (*scroll*), memilih (*select*), dan memeriksa (*inspect*) koordinat layaknya seorang desainer atau developer di Figma Dev Mode.

> 📍 **Live Preview:** [ramandamaulana/ramanda-portfolio](https://github.com/ramandamaulana/ramanda-portfolio)
> 📧 **Kontak:** [masramanda@gmail.com](mailto:masramanda@gmail.com)

---

## 🎨 Visual & Fitur Unggulan

Portofolio ini dibangun dengan estetika modern, micro-animation responsif, dan beberapa fitur unik:

* 📐 **Figma Canvas Viewport**: Seluruh kartu portofolio dirender dalam grid koordinat tak terbatas (Canvas 940 × ∞). Pengunjung dapat mengklik kartu apa pun untuk menyeleksinya secara interaktif.
* 🔍 **Zoom Controls**: Kendali zoom (+ / - / reset) yang dinamis secara langsung memperbesar dan memperkecil viewport canvas menggunakan CSS matrix transform.
* 🛠️ **Dev Mode Properties Inspector**: Ketika kartu diklik, bilah kanan (*Sidebar Right*) akan menampilkan koordinat posisi geometris objek (X, Y, W, H), *design tokens* yang digunakan, serta eksportir kode snippet (Vue 3 / CSS).
* 🎹 **On Heavy Rotation Synth Player**: Kartu pemutar piringan hitam interaktif yang ditenagai oleh **Web Audio API**. Pengunjung dapat mendengarkan retro synth arpeggiator mini buatan sendiri saat memutar setlist lagu favorit.
* 📡 **Origin & Topo Map Radar**: Peta topografi interaktif dengan radar dot bercahaya yang menunjukkan lokasi asal di **Bogor, Indonesia** (7.3275° S, 108.3517° E).
* 📮 **Airmail Postcard form**: Formulir kontak interaktif yang didesain menyerupai kartu pos tradisional dengan stampel perangkap udara Ciamis-Bogor.

---

## 💻 Tech Stack Utama

Proyek ini dibangun dari nol menggunakan arsitektur modern berkecepatan tinggi:

* **Framework**: [Vue 3](https://vuejs.org/) (Composition API dengan `<script setup>` SFCs)
* **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict type checking)
* **Bundler & Server**: [Vite](https://vite.dev/) (Instant HMR & optimized production bundling)
* **Styling**: Vanilla CSS (Scoped CSS per komponen untuk isolasi gaya yang aman)
* **Icons**: [Lucide Vue Next](https://lucide.dev/) (Clean & modern vector icons)
* **Audio engine**: Web Audio API (Retro synthesizer)

---

## 📁 Struktur Folder & File Utama

```bash
ramanda-portfolio/
├── dist/                  # Hasil build produksi siap sebar (HTML, CSS, JS)
├── public/                # Aset statis seperti favicon & ikon
├── src/
│   ├── assets/            # Gambar & visual resource (foto profil, dsb.)
│   ├── components/
│   │   ├── cards/         # Seluruh kartu komponen utama yang dirender di canvas
│   │   │   ├── HeroCard.vue          # Profil utama Ramanda
│   │   │   ├── TouchCard.vue         # Stack & kapabilitas
│   │   │   ├── ExperienceCard.vue    # Riwayat karir profesional
│   │   │   ├── ShipsCard.vue         # Portofolio rilis produk (Featured)
│   │   │   └── ... (komponen kartu lainnya)
│   │   ├── CanvasWorkspace.vue       # Workspace viewport grid utama
│   │   ├── SidebarLeft.vue           # Navigasi halaman & layer tree bergaya Figma
│   │   └── SidebarRight.vue          # Properties Inspector & Dev Mode panel
│   ├── main.ts            # Entrypoint inisialisasi aplikasi Vue
│   ├── state.ts           # Manajemen state global (Card Registry, active card, theme)
│   └── style.css          # Desain sistem global, warna HSL, figma dark & light tokens
├── index.html             # Template HTML utama
├── package.json           # Dependensi proyek & konfigurasi skrip
└── vite.config.ts         # Konfigurasi plugin Vite untuk Vue & TS
```

---

## 🚀 Portofolio Unggulan (Product Releases)

Di dalam kartu **PRODUCT RELEASES**, Anda dapat melihat detail kontribusi sistem dan aplikasi yang telah dibangun oleh Ramanda Maulana:

| Proyek | Tech Stack | Kategori / Deskripsi |
| :--- | :--- | :--- |
| **Grosirmotor** | `Vue Js`, `Laravel` | Platform online jual beli motor bekas yang berkualitas dengan penawaran harga terbaik. |
| **Uemka** | `Vue Js`, `Laravel` | Platform inovatif untuk membantu menemukan lembaga keuangan terbaik yang sesuai kebutuhan. |
| **Bakti Fajar Idaman** | `Vue Js`, `Laravel` | Sistem administrasi digital untuk organisasi ekonomi kemasyarakatan yang dikelola secara bersama. |
| **AgreeSIP** | `Wordpress` | Solusi cepat pengajuan dana tunai dari kebutuhan finansial dengan jaminan BPKB Mobil. |
| **Solusi One** | `Vue Js`, `Laravel` | Portal layanan jasa profesional terintegrasi untuk kebutuhan korporasi maupun individu. |
| **Pickers Indonesia** | `Wordpress` | Layanan penggalangan dana dan pendanaan mudah langsung dari rumah berbasis digital. |
| **Vehiclo** | `Vue Js`, `Laravel` | Aplikasi pintar terintegrasi khusus untuk solusi manajemen dan pengelolaan operasional kendaraan. |
| **CMS Grosirmotor** | `Vue Js`, `Vuex` | Content Management System (CMS) internal yang dirancang khusus untuk memantau data armada kendaraan. |
| **CMS Recovery Power Management** | `Laravel`, `Vue Js` | Integrated digital platform (RPM) untuk manajemen daya dan monitoring status operasional sistem secara real-time. |

---

## 🛠️ Pengembangan Lokal

Jika Anda ingin menjalankan atau mengembangkan portofolio ini di perangkat lokal Anda, ikuti langkah-langkah di bawah ini:

### 1. Prasyarat
Pastikan Anda sudah menginstal [Node.js](https://nodejs.org/) (Versi 18+ direkomendasikan) dan `npm` di komputer Anda.

### 2. Kloning Proyek
```bash
git clone https://github.com/ramandamaulana/ramanda-portfolio.git
cd ramanda-portfolio
```

### 3. Instalasi Dependensi
```bash
npm install
```

### 4. Jalankan Development Server
Perintah ini akan menyalakan server lokal lengkap dengan *Hot Module Replacement* (HMR):
```bash
npm run dev
```
Setelah berjalan, buka tautan yang muncul di terminal (biasanya `http://localhost:5173`) di browser Anda.

### 5. Kompilasi & Build Produksi
Untuk melakukan build yang dioptimalkan untuk performa produksi:
```bash
npm run build
```
Hasil kompilasi final akan berada di dalam direktori `dist/` yang siap dideploy ke server statis seperti Vercel, Netlify, atau GitHub Pages.

---

## ✉️ Hubungi Ramanda

Apakah Anda memiliki proyek menarik, tawaran kolaborasi, atau sekadar ingin berdiskusi? Jangan ragu untuk mengirimkan catatan interaktif lewat **Airmail Postcard** di portofolio atau hubungi saya langsung di:
* 💼 **LinkedIn:** [linkedin.com/in/ramandamaulana](https://linkedin.com/in/ramandamaulana)
* 🐙 **GitHub:** [github.com/ramandamaulana](https://github.com/ramandamaulana)
* 📧 **Email:** [masramanda@gmail.com](mailto:masramanda@gmail.com)

---
*Dibuat dengan 💻, ☕, dan semangat pixel-perfect oleh [Ramanda Maulana](https://github.com/ramandamaulana).*
