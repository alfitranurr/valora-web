# PROGRESS.md — Laporan Proyek Valora Tour & Travel

> Terakhir diperbarui: 14 September 2026
> Tujuan dokumen: handover untuk sesi berikutnya — berisi apa yang sudah selesai,
> keputusan arsitektur, inventaris file, tugas yang belum selesai, dan panduan uji.

---

## 1. Ringkasan Proyek

| Item | Nilai |
|---|---|
| Nama | Valora Tour and Travel — spesialis private tour Turki untuk wisatawan Indonesia |
| Kode frontend | `valora-web` (Next.js App Router) |
| Stack | Next.js 16.3.5 (App Router, Turbopack), React 19, Tailwind v4, TypeScript 5 |
| Dependensi | `@supabase/supabase-js` (DB + Storage), `lucide-react`, `clsx`, `tailwind-merge`, `server-only` |
| Penyimpanan data | Supabase free tier (Postgres + Storage bucket `bukti-transfer` private) |
| Deployment target | Vercel free tier (Hobby) — file JSON store dibatalkan karena tidak reliable di serverless |
| Model bisnis | WA-first (konsultasi via WhatsApp), pembayaran manual (transfer bank / QRIS statis), verifikasi admin, skema DP + sisa |

### Keputusan yang sudah dikunci (jangan diubah tanpa alasan kuat)
1. **Verifikasi manual dulu** — tanpa payment gateway (Midtrans/Tripay/Xendit). Store `src/lib/store/bookings.ts` berfungsi sebagai satu-satunya akses DB supaya nanti gateway bisa dicolok tanpa redesign.
2. **DP default 30%**, sisa dibayar maksimal H-7 — diatur di `SITE_CONFIG.payments.depositPercent`.
3. **Entry pembayaran hanya setelah admin konfirmasi quote** — user tidak bisa bayar langsung dari estimator. Wizard `/kalkulator` tidak diubah.
4. **Bucket bukti transfer private** — admin melihat via signed URL (1 jam); upload memakai `SUPABASE_SERVICE_ROLE_KEY` hanya di server.

---

## 2. Sistem yang Dibangun (sesi ini): Booking & Pembayaran Manual

### 2.1 Alur end-to-end
```
Quote disetujui di WhatsApp
  → Admin: /admin → login (ADMIN_PASSWORD) → "Buat Booking Baru"
  → Sistem buat ID VLR-YYMM-#### + halaman /booking/[id]
  → Admin salin template WA (link booking + total + DP) → kirim ke customer
Customer
  → buka /booking/[id] → instruksi transfer bank / QRIS (link /pembayaran#qris)
  → transfer tepat nominal → upload bukti (JPG/PNG/WebP ≤2MB) → status "menunggu_verifikasi"
  → klik "Lapor via WhatsApp" (template WA berisi nomor booking)
Admin
  → /admin/[id] → pratinjau bukti (signed URL) → Verifikasi
     deposit  → status dp_terverifikasi
     final    → status lunas
  → alternatif: catat pembayaran manual / ubah status (dikonfirmasi/dibatalkan)
```

### 2.2 Status booking
`menunggu_pembayaran → menunggu_verifikasi → dp_terverifikasi → lunas → dikonfirmasi`
(jalur keluar: `dibatalkan`). Label & warna di `STATUS_LABEL` / `STATUS_STYLE` pada `src/lib/booking-status.ts`.

### 2.3 Pengaman yang tertanam
- Tabel Supabase: RLS aktif **tanpa policy** → anon/authenticated tidak bisa apa-apa; hanya service_role (server) yang lolos.
- Route upload `/api/booking/[id]/proof`: validasi booking ada (404), tipe file & ≤2MB (400), nominal sesuai booking (400), maksimal 1 pengajuan aktif (409).
- Nama file di bucket = UUID, tidak pernah berasal dari input user.
- Cookie admin: `httpOnly`, `sameSite: lax`, `secure` di produksi, TTL 12 jam; token = HMAC dengan kunci ADMIN_PASSWORD.

---

## 3. Inventaris File (sesi ini)

### File baru
| File | Peran |
|---|---|
| `supabase/schema.sql` | Setup DB: tabel `bookings`, `payments`, RLS + revoke, bucket `bukti-transfer`. Dijalankan di Supabase SQL Editor oleh user. |
| `.env.local.example` | Template env: `ADMIN_PASSWORD`, `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_SITE_URL` |
| `src/lib/supabase/server.ts` | Client service-role (server-only) + konstanta `BUKTI_BUCKET` |
| `src/lib/store/bookings.ts` | CRUD booking/pembayaran, generator ID `VLR-YYMM-####` (retry bila bentrok), verifikasi, catatan manual, signed URL |
| `src/lib/booking-status.ts` | Label/style status, `nextPayableType`, `nominalForType`, `verifiedPaidIDR`, util tanggal id-ID |
| `src/lib/auth.ts` | Session admin (cookie HMAC-SHA256, perbandingan waktu-konstan) |
| `src/app/pembayaran/page.tsx` | Kebijakan & cara pembayaran (statis) + anchor `#qris` |
| `src/app/booking/[id]/page.tsx` | Halaman status booking customer (`force-dynamic`, `noindex`) |
| `src/app/booking/[id]/ProofUploadForm.tsx` | Form upload bukti + preview + WA "Lapor sudah transfer" |
| `src/app/api/booking/[id]/proof/route.ts` | POST multipart → upload bucket → update status |
| `src/app/admin/page.tsx` | Gate login + daftar booking + form buat booking |
| `src/app/admin/actions.ts` | Server actions: login/logout, create, verify, set status, catat pembayaran manual |
| `src/app/admin/LoginForm.tsx` | Form login (useActionState) |
| `src/app/admin/CreateBookingForm.tsx` | Form buat booking dari data quote WA |
| `src/app/admin/[bookingId]/page.tsx` | Detail booking admin: pratinjau bukti, verifikasi, ubah status, salin pesan WA |
| `src/app/admin/[bookingId]/ManualPaymentForm.tsx` | Catat pembayaran manual (langsung terverifikasi) |
| `src/components/shared/CopyButton.tsx` | Tombol salin ke clipboard (dipakai lintas halaman) |

### File yang diubah
| File | Perubahan |
|---|---|
| `src/data/config.ts` | + `SITE_CONFIG.payments` (bank, QRIS path, depositPercent, catatan verifikasi) — **masih placeholder** |
| `src/types/index.ts` | + `Booking`, `BookingPayment`, `BookingStatus`, `PaymentType/Method`, `BookingCustomer` |
| `src/lib/whatsapp.ts` | + `bookingHandoverMessage`, `paymentSubmittedUrl`, `bookingStatusUrl` |
| `src/components/layout/Footer.tsx` | + link "Kebijakan Pembayaran" |
| `package.json` | + `@supabase/supabase-js`, `server-only` |

### Hasil verifikasi
- `npm run lint` → 0 problem.
- `npm run build` → sukses. Route benar: `/`, `/pembayaran` dan katalog `○ Static`; `/booking/[id]`, `/admin`, `/admin/[bookingId]`, `/api/booking/[id]/proof` `ƒ Dynamic`.
- Smoke test `next start -p 3005`: `/pembayaran` 200, `/admin` 200 (gate login). Port sudah dibersihkan.
- **E2E ke Supabase belum diuji** — menunggu env dari user (lihat §5 dan §6).

---

## 4. Konfigurasi Lingkungan

`src/data/config.ts` — blok `SITE_CONFIG.payments` (placeholder):
```ts
bankName: "BANK ABC",          // TODO: bank asli
accountNumber: "0000000000",   // TODO: nomor rekening asli
accountName: "Valora Tour and Travel",
qrisImage: "/images/qris.jpg", // TODO: taruh gambar QRIS asli di public/images/
depositPercent: 30,
```

Env (dev: `.env.local`; Vercel: Settings → Environment Variables):
```
ADMIN_PASSWORD=             # password login /admin (min. 12 karakter)
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=  # service_role secret, HANYA server-side
NEXT_PUBLIC_SITE_URL=       # tanpa trailing slash, dipakai dalam pesan WA
```

---

## 5. Panduan Setup Supabase (wajib sebelum alur booking hidup)

1. Buat project gratis di supabase.com (root ~Region Asia, mis. Singapore).
2. Dashboard → **SQL Editor** → paste seluruh isi `supabase/schema.sql` → Run.
   Hasil: 2 tabel + index, RLS menyala (tanpa policy), revoke akses anon/authenticated, bucket `bukti-transfer` (private).
3. **Project Settings → API**: salin `Project URL` dan `service_role` key.
4. Isi `.env.local` (dev) dan Environment Variables di Vercel (prod) sesuai §4.
5. Jalankan checklist uji §6.

Catatan: project Supabase free bisa **pause setelah ±7 hari tidak aktif** — resume dari dashboard. Kalau terganggu, gampang pindah ke Neon/Vercel Postgres (struktur sudah SQL standar).

---

## 6. Checklist Pengujian (jalankan setelah env terisi)

### Admin
1. `/admin` → login salah → pesan "Password salah."; benar → masuk.
2. Form "Buat Booking Baru" lengkap → `Buat Booking` → redirect ke `/admin/VLR-YYMM-0001` (berurutan per bulan; kalau bentrok, sistem coba nomor berikutnya).
3. Blok "Kirim Info Booking": template pesan memuat link `NEXT_PUBLIC_SITE_URL/booking/<id>` + nominal total & DP.

### Customer
1. `/booking/<id>` (mis. setelah logout) → tampil ringkasan + status `menunggu_pembayaran`.
2. Upload: PDF ditolak; JPG >2MB ditolak; JPG ≤2MB sukses → status jadi `menunggu_verifikasi`, form ganti jadi "terkirim", tombol WA pakai nomor booking.
3. Upload kedua saat masih pending → HTTP 409 dari API.

### Verifikasi admin
1. Detail admin → thumbnail bukti muncul (klik buka signed URL penuh).
2. Klik `Verifikasi` → deposit: status `dp_terverifikasi`; final: `lunas`.
3. Catat pembayaran manual → row terverifikasi langsung + status maju.
4. Ubah status → badge berubah; customer page ikutan saat dibuka.

### Regresi setelah deploy
- [ ] Mobile 375px: bottom-CTA tidak menutupi konten.
- [ ] `/booking/[id]` membawa `noindex` (cek header meta robots).
- [ ] Upload block dari jaringan lambat → pesan error jelas, tidak dobel submit.

---

## 7. Backlog dari Review End-to-End (belum dikerjakan)

**P0 — kebocoran funnel:**
1. **Pre-select kalkulator**: tombol "Pesan Sekarang" di `tour-packages/[slug]:137`, `bundles/[slug]:148`, `services/[slug]:105` masih `href="/kalkulator"` tanpa konteks. Rencana: kirim `?item=<slug>`, `Estimator.tsx` baca `useSearchParams` → mulai wizard dengan item terpilih.
2. **Simpan state wizard** kalkulator di `sessionStorage`.
3. **Pesan WA dari halaman detail** baru berisi nama + harga — tambah pax/tanggal jika ada + URL halaman detail.
4. **Analytics belum ada sama sekali** — pasang GA4/Plausible + event klik WA & submit wizard.
5. **Validasi form**: input tanggal belum punya `min=today`; pax tidak di-clamp ke kapasitas armada.

**P0 — trust (halaman statis):** Testimoni, Galeri, FAQ, T&C/pembatalan/refund resmi (memperluas `/pembayaran`).

**P1 — SEO:** `generateMetadata` untuk 3 halaman detail (saat ini title fallback ke root untuk packages/services; bundles pakai title statis generik), `sitemap.ts`, `robots.ts`, OG image, `metadataBase`, JSON-LD (Organization/Product/TouristTrip).

**P1 — konsistensi harga data:**
- `src/data/*`: `priceIDR` dihitung manual dan tidak konsisten (mis. $211 → 3.412.500, dari 17.630 seharusnya 3.719.930). Pilih satu: hapus `priceIDR` dan hitung via `usdToIdr()` runtime, atau perbaiki angkanya.
- `Estimator.tsx:111` mengalikan `priceUSD × duration × quantity` untuk semua item — overcharge untuk unit "per paket". Solusi: flag `unitType` (`per_paket` tidak dikalikan durasi).
- Card destinasi tampak klik-able tapi tanpa link (dead-end); belum ada detail page destinasi.

**P2:** endpoint penyimpanan lead (custom trip), custom 404/`error.tsx`/`loading.tsx`, hapus `public/test-vision.jpg`, foto katalog milik sendiri + `next/image`.

---

## 8. Catatan Teknis Next.js 16 (wajib baca AGENTS.md)

Versi ini punya breaking changes vs pengetahuan lama — **wajib** baca `node_modules/next/dist/docs/` sebelum menulis kode. Yang sudah diverifikasi dipakai di kode ini:
- Server Actions: file dengan directive `"use server"`, `revalidatePath`, `redirect()` (me-throw untuk kontrol flow — jangan di-catch).
- Route handler dinamis: `ctx: { params: Promise<{ id: string }> }` → `const { id } = await ctx.params`.
- `cookies()` async; set/delete hanya dari Server Action.
- `useActionState(action, init)` di client untuk pending/error.
- Typing opsional `RouteContext<'/path'>` (hasil `next typegen`).

---

## 9. Perintah & Struktur

```bash
cd valora-web
npm run dev       # dev di :3000
npm run lint
npm run build
npm run start     # produksi (tambah -p <port> lewat "npm run start -- -p 3005" bila dev masih jalan)
```

```
src/
  app/
    page.tsx, destinasi/, tour-packages/, services/, bundles/,
    kalkulator/          # + Estimator.tsx (client, colocated — dipakai hanya di sini)
    custom-trip/         # + CustomTripForm.tsx (client, colocated)
    pembayaran/, about-us/, faq/, ketentuan/
    booking/[id]/            # halaman status customer + upload bukti
    admin/                   # panel admin (login, list, detail, actions)
    api/kurs/                # kurs live 3 sumber + fallback
    api/booking/[id]/proof/  # upload bukti multipart
  components/
    layout/, cards/, home/
    shared/                  # PageHeader, NumberStepper, CopyButton, dll.
    shared/catalog/          # useCatalogFilters + Search/Select/TagToggle/CountBar/EmptyState
  data/          # config.ts (kontak + payments), packages, services, dst.
                 # data file menyimpan priceUSD; priceIDR diturunkan via lib/pricing
  lib/           # whatsapp.ts, auth.ts, currency.ts, booking-status.ts, pricing.ts
  lib/supabase/  # server.ts (service-role client)
  lib/store/     # bookings.ts (akses DB; satu pintu)
  types/         # index.ts
supabase/schema.sql
.env.local.example
PROGRESS.md     # dokumen invariand ini
```

---

## 10. Tindak Lanjut (checklist)

| # | Tugas | Pemilik | Status |
|---|---|---|---|
| 1 | Buat project Supabase + jalankan `supabase/schema.sql` + isi `.env.local` | User | PENDING |
| 2 | Isi rekening asli di `src/data/config.ts` + taruh `public/images/qris.jpg` | User | PENDING |
| 3 | Jalankan checklist uji §6 (admin + customer + verifikasi) | User + AI | PENDING |
| 4 | Deploy Vercel (import repo, set env vars `NEXT_PUBLIC_SITE_URL`, dst.) | User + AI | PENDING |
| 5 | Isi kebijakan refund/reschedule final di `/pembayaran` | User | PENDING |
| 6 | P0 funnel fix: pre-select kalkulator, sessionStorage, tracking, `min=today` | AI | PENDING |
| 7 | Halaman trust: testimoni, FAQ, T&C | AI | SEBAGIAN — `/faq`, `/ketentuan`, `/pembayaran` ada; perlu isi konten asli + testimoni/galeri |
| 8 | SEO: `generateMetadata` 3 detail + sitemap + robots + JSON-LD | AI | PENDING (title.template + metadataBase ✔ lihat §11) |
| 9 | Konsistensi `priceIDR` + logika estimator `per paket` | AI | SEBAGIAN — priceIDR ✔ derivasi via `lib/pricing.ts`; bug estimator (duration × paket) masih PENDING |
| 10 | Halaman 404/error/loading custom | AI | PENDING |
| 11 | Hapus `public/test-vision.jpg` (file tes lama) | AI | DONE (file sudah tidak ada) |
| 12 | Upgrade opsional: gateway otomatis (Midtrans/Tripay) + webhook | Belum diputuskan | — |

### Catatan lingkungan kerja
- **Keterbatasan model chat sesi ini** (GLM 5.2 Flash): tidak menerima input gambar, jadi semua verifikasi visual (screenshot layar) harus dilakukan user, atau dengan tool eksternal. Screenshot headless Chrome tetap bisa dibuat:
  `& "C:\Program Files\Google\Chrome\Application\chrome.exe" --headless=new --disable-gpu --window-size=1440,900 --screenshot="out.png" http://localhost:3000`
- Dev server user biasanya jalan di `:3000` — jangan pakai port itu untuk uji; pakai `:3005` lalu dimatikan setelah uji.

## 11. Sesi Refactor Besar (14 Sep 2026) — selesai

Refactor maintenance untuk jangka panjang; net **−338 baris** (+396/−734). Verifikasi: lint 0, build sukses, smoke 11 halaman 200.

**Shared components baru (`src/components/shared/`):**
- `PageHeader.tsx` — shell header halaman seragam; menggantikan blok `section + container + RevealOnScroll + SectionHeader` yang sebelumnya disalin di 10 halaman. Dipakai: `<PageHeader eyebrow title description below? />` (untuk halaman ber-bawah kurs: `/kalkulator`, `/custom-trip` pakai prop `below`).
- `NumberStepper.tsx` — kontrol Plus/Minus/input angka; menggantikan 6 blok duplikat di `Estimator` & `CustomTripForm`.
- `shared/catalog/useCatalogFilters.ts` — hook state pencarian + toggle best-seller + sorting (filter khusus per katalog tetap di client masing-masing).
- `shared/catalog/` UI: `CatalogSearch`, `CatalogSelect` (generic + ikon clock/sliders), `CatalogTagToggle`, `CountBar`, `EmptyState`.

**Konvensi baru (penting untuk perawatan):**
- Halaman baru = `PageHeader` + konten; JANGAN copy-paste shell section lagi.
- Filter/sort katalog = wiring `useCatalogFilters` + komponen catalog, bukan menyalin UI.
- Stepper angka = `<NumberStepper>` (clamp, fallback, aria otomatis).
- Harga katalog: data file **hanya menyimpan `priceUSD`** — `priceIDR` selalu diturunkan via `lib/pricing.ts: catalogIDR()` (rate tunggal: `SITE_CONFIG.exchangeRate.USD_IDR`). Konsekuensi: IDR katalog kini konsisten (mis. $211 → Rp 3.719.930).
- Metadata: judul halaman pendek ("FAQ", "Layanan", dst.) — sufiks `— Valora Tour & Travel` datang dari `title.template` di `app/layout.tsx` (juga `openGraph.title.template`); `metadataBase` dari `NEXT_PUBLIC_SITE_URL`.
- Link WhatsApp dibuat via `lib/whatsapp.ts`; dilarang bangun URL `wa.me` inline (sisa inline sudah 0).
- Komponen khusus satu halaman colocated: `app/custom-trip/CustomTripForm.tsx`, `app/kalkulator/Estimator.tsx` (folder `components/custom-trip` & `components/estimator` dihapus).
- Navbar tambah item "Home" (pertama) — pelengkap navigasi balik.

**File kunci vs sebelumnya:** `currency.ts` (alias format), `data/*.ts` (raw* array → derive priceIDR), `layout.tsx` (template), `Navbar.tsx` (Home).

— akhir laporan.
