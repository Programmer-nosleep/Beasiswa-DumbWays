# 🎨 Portfolio Website - Ahmad Zani Syechkar

Website portfolio profesional untuk menampilkan profil, project, dan informasi kontak sebagai Fullstack Developer.

---

## 📋 Deskripsi Proyek

Website portfolio yang dibangun menggunakan **HTML**, **CSS**, **JavaScript (ES6 Modules)**, dan **Bootstrap 5**. Website ini terdiri dari tiga halaman utama yang menampilkan informasi personal, daftar project, dan form kontak.

---

## 🗂️ Struktur Folder

```
stage-04/
├── assets/                          # Folder untuk menyimpan gambar
│   └── [profile-image].jpg          # Foto profil
├── script/                          # Folder JavaScript modules
│   ├── app.js                       # Entry point utama
│   ├── data.js                      # Data projects & tech icons
│   ├── utils.js                     # Utility functions
│   ├── projectCard.js               # Component project card
│   └── projectForm.js               # Component form handling
├── index.html                       # Halaman utama (Home)
├── myproject.html                   # Halaman My Project
├── form.html                        # Halaman kontak (Contact Form)
├── style.css                        # File styling custom (semua halaman)
└── README.md                        # Dokumentasi proyek
```

---

## 🔄 Alur Website (User Flow)

```
┌─────────────────────────────────────────────────────────────────────┐
│                           NAVBAR (Navigasi)                          │
│  [Logo ZS] ─── [Home] ─── [My Project] ─── [Contact Me Button]       │
└─────────────────────────────────────────────────────────────────────┘
                              │
          ┌───────────────────┼───────────────────┐
          ▼                   ▼                   ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│  📄 index.html  │  │📁 myproject.html│  │  📝 form.html   │
│   (Home Page)   │  │ (Project Page)  │  │ (Contact Page)  │
├─────────────────┤  ├─────────────────┤  ├─────────────────┤
│                 │  │                 │  │                 │
│  Welcome Text   │  │  ADD MY PROJECT │  │  GET IN TOUCH   │
│  & Description  │  │  ┌───────────┐  │  │  ┌───────────┐  │
│                 │  │  │Form Input │  │  │  │Contact    │  │
│  [Contact]      │  │  │• Name     │  │  │  │Form       │  │
│  [Download CV]  │  │  │• Dates    │  │  │  │• Name     │  │
│                 │  │  │• Desc     │  │  │  │• Email    │  │
│  Social Icons   │  │  │• Tech     │  │  │  │• Phone    │  │
│                 │  │  │• Image    │  │  │  │• Subject  │  │
│  Profile Card   │  │  └───────────┘  │  │  │• Message  │  │
│  ┌───────────┐  │  │                 │  │  └───────────┘  │
│  │ Foto      │  │  │  MY PROJECT     │  │                 │
│  │ Profil    │  │  │  ┌───┐┌───┐┌───┐│  │  [Submit]       │
│  └───────────┘  │  │  │   ││   ││   ││  │                 │
│  Ahmad Zani S.  │  │  │Card││Card││Card│  └─────────────────┘
│  Fullstack Dev  │  │  └───┘└───┘└───┘│
└─────────────────┘  │  [Edit][Delete] │
                     └─────────────────┘
```

---

## 📄 Penjelasan Halaman

### 1. Home Page (`index.html`)

Halaman utama yang menampilkan:

| Section | Deskripsi |
|---------|-----------|
| **Navbar** | Navigasi dengan logo "ZS", menu Home, My Project, dan tombol Contact Me |
| **Hero Section** | Teks sambutan "Hi Welcome to my hut" dengan deskripsi personal |
| **CTA Buttons** | Tombol Contact dan link Download CV |
| **Social Media Icons** | Icon LinkedIn, Instagram, Facebook, dan Twitter |
| **Profile Card** | Kartu profil dengan foto, nama, dan jabatan |

### 2. My Project Page (`myproject.html`)

Halaman project dengan fitur:

| Section | Deskripsi |
|---------|-----------|
| **Navbar** | Navigasi yang sama dengan halaman lain |
| **Add Project Form** | Form untuk menambah project baru |
| **Form Fields** | Project Name, Start/End Date, Description, Technologies, Upload Image |
| **Project Grid** | Grid menampilkan semua project cards |
| **Project Card** | Kartu project dengan gambar, judul, durasi, deskripsi, tech icons |
| **Card Actions** | Tombol Edit (kuning) dan Delete (merah) |

### 3. Contact Page (`form.html`)

Halaman kontak yang berisi:

| Section | Deskripsi |
|---------|-----------|
| **Navbar** | Navigasi yang sama dengan halaman lain |
| **Form Title** | Judul "GET IN TOUCH" |
| **Contact Form** | Formulir dengan field Name, Email, Phone, Subject, dan Message |
| **Submit Button** | Tombol untuk mengirim pesan |

---

## 📦 JavaScript Modules

Project ini menggunakan **ES6 Modules** untuk organisasi kode yang lebih baik:

| Module | Fungsi | Exports |
|--------|--------|---------|
| **app.js** | Entry point, menginisialisasi semua module | - |
| **data.js** | Menyimpan data project dan tech icons | `projects`, `techIcons`, `addProject()`, `removeProject()`, `getProjectById()` |
| **utils.js** | Utility functions | `formatDuration()`, `showNotification()` |
| **projectCard.js** | Render dan manage project cards | `createProjectCard()`, `renderProjects()`, `editProject()`, `deleteProject()` |
| **projectForm.js** | Handle form submission | `initForm()` |

### Import Flow
```
app.js (Entry Point)
├── imports: data.js
├── imports: projectCard.js
│   ├── imports: data.js
│   └── imports: utils.js
└── imports: projectForm.js
    ├── imports: data.js
    ├── imports: utils.js
    └── imports: projectCard.js
```

---

## 🛠️ Teknologi yang Digunakan

| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| **HTML5** | - | Struktur halaman |
| **CSS3** | - | Styling custom |
| **JavaScript** | ES6+ | Interaktivitas & modular code |
| **Bootstrap** | 5.3.3 | Framework CSS untuk layout responsif |
| **Bootstrap Icons** | 1.11.3 | Icon library |
| **Font Awesome** | 6.5.2 | Social media icons |
| **Google Fonts** | Poppins | Typography |
| **DevIcons** | CDN | Technology icons (Node.js, React, etc.) |

---

## 🎨 Fitur Desain

- ✅ **Responsive Design** - Tampilan menyesuaikan berbagai ukuran layar
- ✅ **Glassmorphism Navbar** - Effect blur transparan pada navigasi
- ✅ **Hover Effects** - Animasi smooth pada tombol, icon, dan cards
- ✅ **Modern Typography** - Font Poppins untuk tampilan profesional
- ✅ **Card Design** - Desain kartu dengan shadow effect
- ✅ **Custom Color Palette** - Warna tema yang konsisten
- ✅ **Toast Notifications** - Notifikasi sukses/error dengan animasi

---

## ⚡ Fitur My Project Page

- ✅ **Add Project** - Menambah project baru via form
- ✅ **Edit Project** - Mengubah data project yang sudah ada
- ✅ **Delete Project** - Menghapus project dengan konfirmasi
- ✅ **Technology Icons** - Menampilkan icon teknologi (Node.js, React, Next.js, TypeScript)
- ✅ **Duration Calculator** - Menghitung durasi project otomatis
- ✅ **Image Upload** - Upload gambar untuk project
- ✅ **Responsive Grid** - Layout grid yang responsif

---

## 🚀 Cara Menjalankan

1. **Clone atau Download** repository ini
2. **Buka file** `index.html` di browser
3. **Navigasi** menggunakan menu di navbar

```bash
# Jika menggunakan Live Server (VS Code)
# Klik kanan pada index.html → Open with Live Server
```

> ⚠️ **Note:** Karena menggunakan ES6 Modules, halaman `myproject.html` harus dijalankan melalui server (seperti Live Server) bukan dengan membuka file langsung.

---

## 📱 Responsivitas

Website ini responsif di berbagai ukuran layar:

| Device | Breakpoint | Status |
|--------|------------|--------|
| Mobile | < 576px | ✅ |
| Mobile | 576px - 768px | ✅ |
| Tablet | 768px - 992px | ✅ |
| Desktop | > 992px | ✅ |

---

## 👤 Author

**Ahmad Zani Syechkar**  
Fullstack Developer

---

## 📝 License

Project ini dibuat untuk keperluan pembelajaran di **Dumbways Bootcamp - Stage 04**.
