# 🎨 Portfolio Website - Ahmad Zani Syechkar

Website portfolio profesional untuk menampilkan profil dan informasi kontak sebagai Fullstack Developer.

---

## 📋 Deskripsi Proyek

Website portfolio sederhana yang dibangun menggunakan **HTML**, **CSS**, dan **Bootstrap 5**. Website ini terdiri dari dua halaman utama yang menampilkan informasi personal dan form kontak untuk berkomunikasi dengan pengunjung.

---

## 🗂️ Struktur Folder

```
stage-03/
├── assets/                          # Folder untuk menyimpan gambar
│   └── [profile-image].jpg          # Foto profil
├── index.html                       # Halaman utama (Home)
├── form.html                        # Halaman kontak (Contact Form)
├── style.css                        # File styling custom
└── README.md                        # Dokumentasi proyek
```

---

## 🔄 Alur Website (User Flow)

```
┌─────────────────────────────────────────────────────────────────┐
│                         NAVBAR (Navigasi)                       │
│  [Logo DU] ─── [Home] ─── [My Project] ─── [Contact Me Button]  │
└─────────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┴───────────────┐
              ▼                               ▼
┌─────────────────────────┐     ┌─────────────────────────┐
│     📄 index.html       │     │     📝 form.html        │
│      (Home Page)        │     │    (Contact Page)       │
├─────────────────────────┤     ├─────────────────────────┤
│                         │     │                         │
│  ┌───────────────────┐  │     │  ┌───────────────────┐  │
│  │   Welcome Text    │  │     │  │   GET IN TOUCH    │  │
│  │   & Description   │  │     │  │      Title        │  │
│  └───────────────────┘  │     │  └───────────────────┘  │
│           │             │     │           │             │
│           ▼             │     │           ▼             │
│  ┌───────────────────┐  │     │  ┌───────────────────┐  │
│  │  [Contact Button] │──┼────►│  │   Contact Form    │  │
│  │  [Download CV]    │  │     │  │  • Name           │  │
│  └───────────────────┘  │     │  │  • Email          │  │
│           │             │     │  │  • Phone Number   │  │
│           ▼             │     │  │  • Subject        │  │
│  ┌───────────────────┐  │     │  │  • Message        │  │
│  │   Social Icons    │  │     │  └───────────────────┘  │
│  │ [LinkedIn][IG]    │  │     │           │             │
│  │ [Facebook][X]     │  │     │           ▼             │
│  └───────────────────┘  │     │  ┌───────────────────┐  │
│           │             │     │  │  [Submit Button]  │  │
│           ▼             │     │  └───────────────────┘  │
│  ┌───────────────────┐  │     │                         │
│  │   Profile Card    │  │     └─────────────────────────┘
│  │  ┌─────────────┐  │  │
│  │  │   Foto      │  │  │
│  │  │   Profil    │  │  │
│  │  └─────────────┘  │  │
│  │  Ahmad Zani S.    │  │
│  │  Fullstack Dev    │  │
│  └───────────────────┘  │
│                         │
└─────────────────────────┘
```

---

## 📄 Penjelasan Halaman

### 1. Home Page (`index.html`)

Halaman utama yang menampilkan:

| Section | Deskripsi |
|---------|-----------|
| **Navbar** | Navigasi dengan logo "DU", menu Home, My Project, dan tombol Contact Me |
| **Hero Section** | Teks sambutan "Hi Welcome to my hut" dengan deskripsi personal |
| **CTA Buttons** | Tombol Contact dan link Download CV |
| **Social Media Icons** | Icon LinkedIn, Instagram, Facebook, dan Twitter |
| **Profile Card** | Kartu profil dengan foto, nama, dan jabatan |

### 2. Contact Page (`form.html`)

Halaman kontak yang berisi:

| Section | Deskripsi |
|---------|-----------|
| **Navbar** | Navigasi yang sama dengan halaman Home |
| **Form Title** | Judul "GET IN TOUCH" |
| **Contact Form** | Formulir dengan field Name, Email, Phone, Subject, dan Message |
| **Submit Button** | Tombol untuk mengirim pesan |

---

## 🛠️ Teknologi yang Digunakan

| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| **HTML5** | - | Struktur halaman |
| **CSS3** | - | Styling custom |
| **Bootstrap** | 5.3.3 | Framework CSS untuk layout responsif |
| **Font Awesome** | 6.5.2 | Icon library untuk social media icons |
| **Google Fonts** | Poppins | Typography |

---

## 🎨 Fitur Desain

- ✅ **Responsive Design** - Tampilan menyesuaikan berbagai ukuran layar
- ✅ **Glassmorphism Navbar** - Effect blur transparan pada navigasi
- ✅ **Hover Effects** - Animasi smooth pada tombol dan icon
- ✅ **Modern Typography** - Font Poppins untuk tampilan profesional
- ✅ **Card Design** - Desain kartu dengan shadow effect
- ✅ **Custom Color Palette** - Warna tema yang konsisten

---

## 🚀 Cara Menjalankan

1. **Clone atau Download** repository ini
2. **Buka file** `index.html` di browser
3. **Navigasi** menggunakan menu di navbar

```bash
# Jika menggunakan Live Server (VS Code)
# Klik kanan pada index.html → Open with Live Server
```

---

## 📱 Responsivitas

Website ini responsif di berbagai ukuran layar:

| Device | Breakpoint | Status |
|--------|------------|--------|
| Mobile | < 768px | ✅ |
| Tablet | 768px - 992px | ✅ |
| Desktop | > 992px | ✅ |

---

## 👤 Author

**Ahmad Zani Syechkar**  
Fullstack Developer

---

## 📝 License

Project ini dibuat untuk keperluan pembelajaran di **Dumbways Bootcamp - Stage 03**.
