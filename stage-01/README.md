# Dokumentasi Mini Project: Introduction Self

Dokumen ini dibuat untuk mempresentasikan mini project "Introduction Self", yang merupakan sebuah halaman web sederhana berisi portofolio diri. Berikut adalah penjelasan mengenai struktur kode HTML, elemen, dan atribut yang digunakan di dalamnya.

## Struktur Dasar HTML

### 1. Deklarasi Tipe Dokumen
- **Elemen:** `<!DOCTYPE html>`
- **Penjelasan:** Memberitahu browser bahwa dokumen ini menggunakan standar HTML5.

### 2. Root Elemen
- **Elemen:** `html`
- **Atribut:** `lang="en"` (Language)
- **Penjelasan:** Elemen pembungkus utama seluruh konten halaman. Atribut `lang` memberi tahu mesin pencari dan browser bahwa bahasa utama halaman ini adalah bahasa Inggris.

## Bagian Head (Kepala Dokumen)

Bagian `<head>` berisi informasi meta yang tidak tampil langsung di halaman web, tetapi penting untuk browser.

### 3. Meta Data
- **Elemen:** `meta`
- **Atribut:**
    - `charset="UTF-8"`: Mengatur pengkodean karakter agar dapat menampilkan berbagai simbol dan huruf dengan benar.
    - `name="viewport"`: Mengontrol tampilan halaman di perangkat mobile.
    - `content="width=device-width, initial-scale=1.0"`: Memastikan halaman responsif, di mana lebar halaman mengikuti lebar layar perangkat dan skala awal adalah 100%.

### 4. Judul Halaman
- **Elemen:** `title`
- **Penjelasan:** Menentukan teks yang muncul di tab browser (di sini: "Introduction Self | Portfolio").

### 5. Styling (CSS Internal)
- **Elemen:** `style`
- **Penjelasan:** Tempat menuliskan kode CSS untuk mempercantik tampilan halaman.
    - **Selector `*`**: Mengatur ulang padding dan margin menjadi 0 untuk semua elemen.
    - **Selector `.nav`, `.container`**: Mengatur tata letak dan desain elemen dengan class tersebut.

## Bagian Body (Isi Dokumen)

Bagian `<body>` berisi semua elemen yang akan dilihat oleh pengguna di layar.

### 6. Navigasi
- **Elemen:** `nav`
- **Atribut:** `class="nav"`
- **Penjelasan:** Wadah semantik untuk navigasi utama website. Class "nav" digunakan untuk menerapkan gaya CSS (flexbox, padding, background).

### 7. Headings (Judul)
- **Elemen:** `h1`
- **Penjelasan:** Judul utama halaman atau bagian.
    - Digunakan untuk teks "Introduction" di navigasi.
    - Digunakan untuk "Halo, Namaku Ahmad Zani Syechkar" di bagian konten utama.

### 8. Unordered List (Daftar Tanpa Urutan)
- **Elemen:** `ul`
- **Penjelasan:** Wadah untuk daftar item yang tidak bernomor, biasanya digunakan untuk menu navigasi.

### 9. List Item (Item Daftar)
- **Elemen:** `li`
- **Penjelasan:** Item individu dalam daftar `<ul>`.

### 10. Anchor (Tautan)
- **Elemen:** `a`
- **Atribut:** `href="#"` (Hypertext Reference)
- **Penjelasan:** Membuat tautan yang dapat diklik. Tanda `#` berarti tautan tersebut belum mengarah ke halaman lain (link dummy). Teks di dalamnya adalah "Home", "About", "Contact".

### 11. Division (Pembagian Area)
- **Elemen:** `div`
- **Atribut:**
    - `class="container"`: Mengelompokkan konten utama agar berada di tengah halaman dengan margin otomatis.
    - `class="content"`: Mengelompokkan teks perkenalan diri.
- **Penjelasan:** Elemen generik untuk mengelompokkan konten agar mudah diatur tata letaknya menggunakan CSS.

### 12. Paragraph (Paragraf)
- **Elemen:** `p`
- **Penjelasan:** Digunakan untuk menuliskan teks deskripsi atau paragraf. Di sini berisi teks "Saya adalah seorang pemula yang sedang belajar pemrograman web."
