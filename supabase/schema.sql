-- ============================================================
-- Valora Tour — Supabase Schema (Manual Payment / Booking)
-- Jalankan SELURUH file ini di Supabase Dashboard > SQL Editor
-- ============================================================

-- 1. Tabel bookings -------------------------------------------
create table if not exists public.bookings (
  id           text primary key,                -- format VLR-YYMM-####, dibuat aplikasi
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  service_name text not null,
  service_ref  text,                            -- mis. "tour-packages/istanbul-classical"
  travel_date  date not null,
  adults       int not null default 1,
  children     int not null default 0,
  total_idr    bigint not null,
  deposit_idr  bigint not null,
  customer     jsonb not null,                  -- { name, wa, email? }
  notes        text,
  status       text not null default 'menunggu_pembayaran'
               check (status in (
                 'menunggu_pembayaran',
                 'menunggu_verifikasi',
                 'dp_terverifikasi',
                 'lunas',
                 'dikonfirmasi',
                 'dibatalkan'
               ))
);

-- 2. Tabel payments (bukti transfer & pembayaran) -------------
create table if not exists public.payments (
  id          uuid primary key default gen_random_uuid(),
  booking_id  text not null references public.bookings(id) on delete cascade,
  type        text not null check (type in ('deposit', 'final')),
  method      text check (method in ('transfer', 'qris')),
  amount_idr  bigint not null,
  proof_path  text,                             -- path di bucket 'bukti-transfer'
  submitted_at timestamptz,
  verified_at  timestamptz,
  admin_note  text,
  created_at  timestamptz not null default now()
);

create index if not exists idx_payments_booking on public.payments(booking_id);

-- 3. Kunci akses: hanya server (service_role) yang boleh Akses.
--    RLS aktif tanpa policy = anon/authenticated tidak bisa melihat apa pun,
--    sedangkan service_role selalu melewati RLS.
alter table public.bookings  enable row level security;
alter table public.payments  enable row level security;

revoke all on all tables in schema public from anon;
revoke all on all tables in schema public from authenticated;

-- 4. Bucket untuk foto bukti transfer (private) ---------------
insert into storage.buckets (id, name, public)
values ('bukti-transfer', 'bukti-transfer', false)
on conflict (id) do nothing;
