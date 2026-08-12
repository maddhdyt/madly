# Zeasy Accounting — System Explanation

## 1. Overview

Zeasy terdiri dari tiga module:

```text
Sales & CRM
Digital Marketing
Accounting
```

Sales & CRM dan Digital Marketing tetap menjalankan fungsi existing.

Accounting menjadi financial layer yang mencatat **uang yang benar-benar diterima dan dikeluarkan**.

Prinsip utama:

> Sales mencatat aktivitas penjualan. Marketing mencatat aktivitas marketing. Accounting mencatat uang dan biaya aktual.

Project menjadi titik penghubung ketiga sistem.

---

# 2. How the Three Systems Connect

```text
                  ZEASY WORKSPACE
                        │
       ┌────────────────┼────────────────┐
       ▼                ▼                ▼
 Sales & CRM      Digital Marketing   Accounting
       │                │                │
       │                │                │
       └────────────── Project ──────────┘
                        │
                        ▼
               Accounting Engine
                        │
        ┌───────────────┼───────────────┐
        ▼               ▼               ▼
      Revenue         Expense        Allocation
        │               │               │
        └───────────────┼───────────────┘
                        ▼
                 Project Profit
                        │
                        ▼
              Optional Distribution
                        │
                        ▼
                    Closing
                        │
                        ▼
                     Report
```

---

# 3. Module Responsibility

## Sales & CRM

Sales menangani:

- lead;
- customer;
- quotation;
- product/service;
- sales activity;
- project context.

Sales dapat mempunyai project value/order value.

Tetapi project value bukan otomatis cash received.

---

## Digital Marketing

Marketing menangani:

- campaign;
- UTM;
- advertising;
- ROAS;
- budget;
- marketing strategy;
- campaign revenue logs.

Advertising information dapat menjadi reference untuk Accounting.

---

## Accounting

Accounting menangani:

- project financial record;
- actual money received;
- actual expense;
- cash/bank;
- cost allocation;
- calculation rules;
- project profit;
- profit distribution;
- daily closing;
- reporting.

---

# 4. Accounting Role

Hanya tambahkan satu role baru:

```text
Accounting
```

Role ini dapat masuk ke:

```text
/accounting
```

Accounting tidak otomatis mendapat akses ke Sales & CRM atau Digital Marketing.

---

# 5. Project Flow

Project dapat berasal dari Sales/CRM atau dibuat langsung di Accounting.

Contoh dari Sales:

```text
Customer
   ↓
Quotation
   ↓
Order
   ↓
Project
```

Accounting kemudian menggunakan project tersebut sebagai reference.

Accounting tidak perlu membuat ulang informasi Sales jika data sudah tersedia.

---

# 6. Money In Flow

Ini adalah prinsip paling penting.

Sales:

```text
Project Value = Rp20.000.000
```

Tidak berarti:

```text
Accounting Revenue = Rp20.000.000
```

Jika customer baru membayar Rp5.000.000:

```text
Project Value       Rp20.000.000
Actual Received      Rp5.000.000
Outstanding         Rp15.000.000
```

Accounting hanya memasukkan:

```text
Revenue = Rp5.000.000
```

Jadi:

> Accounting adalah sumber pencatatan actual money received.

---

# 7. Revenue Transaction

Contoh:

```text
Project:
Website ABC

Date:
11 Aug 2026

Payment:
Rp5.000.000

Account:
BCA

Status:
Posted
```

Accounting kemudian mengetahui:

```text
Project ABC
Revenue Received = Rp5.000.000
```

Jika customer membayar lagi:

```text
20 Aug
Rp5.000.000
```

maka total:

```text
Revenue Received = Rp10.000.000
```

Setiap pembayaran disimpan sebagai transaction terpisah.

---

# 8. Expense Flow

Pengeluaran dibagi menjadi:

```text
Direct Expense
Shared Expense
Rule-Based Expense
```

## Direct Expense

Langsung untuk project.

```text
Project A
HPP = Rp1.300.000
```

## Shared Expense

Digunakan perusahaan secara umum.

```text
Office
Internet
Software
Operational
```

Tidak langsung masuk satu project.

## Rule-Based Expense

Dihitung berdasarkan rule.

Contoh:

```text
Advertising = Revenue × 4%
```

---

# 9. Why Rules Are Dynamic

Business rule dapat berubah.

Contoh:

```text
Agustus
Advertising = 4%

September
Advertising = 5%
```

Sistem tidak mengubah laporan Agustus.

Rule memiliki effective date.

```text
Rule Version 1
4%
01 Aug - 31 Aug

Rule Version 2
5%
01 Sep onward
```

---

# 10. Project Profit Calculation

Sistem menghitung:

```text
Revenue
   ↓
- HPP
   ↓
- Gaji
   ↓
- Advertising
   ↓
- Bonus
   ↓
- Operational
   ↓
- Other Expense
   ↓
Distributable Profit
```

Contoh:

```text
Revenue                Rp4.315.500
HPP                   -Rp1.300.000
Gaji                  -Rp2.346.154
Advertising 4%          -Rp172.620
Bonus 3%                -Rp129.465
---------------------------------
Profit                   Rp367.261
```

Dengan angka tersebut, hasil matematis adalah Rp367.261.

---

# 11. Salary Allocation

Gaji dapat menjadi shared cost.

Contoh:

```text
Salary = Rp5.000.000
```

Allocation:

```text
Project A = 50%
Project B = 30%
Project C = 20%
```

Maka:

```text
A = Rp2.500.000
B = Rp1.500.000
C = Rp1.000.000
```

Total tetap:

```text
Rp5.000.000
```

---

# 12. Operational Allocation

Operational juga dapat dibagi.

Contoh:

```text
Office Expense
Rp10.000.000
```

Jika basis revenue:

```text
Project A = 50%
Project B = 30%
Project C = 20%
```

maka:

```text
A = Rp5.000.000
B = Rp3.000.000
C = Rp2.000.000
```

Allocation method tidak hardcode.

---

# 13. Profit Sharing

Profit sharing adalah optional.

Default:

```text
Disabled
```

Jika disabled:

```text
Distributable Profit
        ↓
Company
```

Jika enabled:

```text
Distributable Profit
        ↓
Profit Sharing Scheme
```

---

# 14. Dynamic Profit Sharing

Contoh periode pertama:

```text
Partner A = 40%
Company   = 60%
```

Periode berikutnya:

```text
Partner A = 50%
Company   = 50%
```

Kemudian:

```text
Partner A = 80%
Company   = 20%
```

Tidak ada perubahan source code.

---

# 15. Dynamic Participants

Company tidak boleh hardcoded sebagai satu-satunya recipient.

Participant dapat berupa:

```text
Company
Partner
Employee
Other
```

Contoh:

```text
Company       50%
Partner A     20%
Partner B     20%
Employee      10%
```

Total wajib:

```text
100%
```

---

# 16. Daily Closing

Setiap hari Accounting dapat melakukan closing.

Flow:

```text
Input Revenue
      ↓
Input Expense
      ↓
Resolve Rules
      ↓
Calculate Allocation
      ↓
Calculate Profit
      ↓
Review
      ↓
Close
      ↓
Snapshot
      ↓
Report
```

Closing menyimpan hasil pada saat closing.

---

# 17. Why Closing Needs a Snapshot

Jika rule berubah setelah closing, laporan lama tidak boleh berubah.

Contoh:

11 Agustus:

```text
Advertising = 4%
Profit = Rp367.261
```

12 Agustus:

```text
Advertising = 5%
```

Report 11 Agustus tetap menggunakan:

```text
4%
```

Karena closing menyimpan historical result/rule version.

---

# 18. Daily Report

Setelah closing, Accounting dapat menghasilkan report:

```text
Laporan
Holding : CV Aksara Nusa Meditama
Tgl : 11 Agustus 2026


Penerimaan (A)
Rp. 4.315.500

Pengeluaran (B)

1. Hpp : Rp. 1.300.000
2. Gaji : Rp. 2.346.154
3. Biaya iklan 4% : Rp. 172.620
4. Bonus 3% : Rp. 129.465

Jumlah setoran
Rp. 367.261 (A-B)
```

Report dapat:

```text
Copy
PDF
Export
Print
```

---

# 19. Copy Report

Button:

```text
Copy Report
```

mengambil hasil dari backend `ReportService`.

User dapat langsung paste ke WhatsApp atau media lain.

Tidak perlu mengetik ulang.

---

# 20. Cash & Bank

Accounting mencatat sumber uang:

```text
Cash
BCA
Bank Mandiri
Other Bank
```

Revenue:

```text
Project A
Rp5.000.000
→ BCA
```

Expense:

```text
Project A
Rp1.300.000
→ BCA
```

Cash balance dapat dihitung dari transaction movement.

---

# 21. Audit Trail

Setiap perubahan financial record dicatat.

Contoh:

```text
User:
Accounting

Action:
Update Expense

Before:
Rp500.000

After:
Rp700.000

Reason:
Additional operational cost
```

Financial data tidak boleh hilang tanpa trace.

---

# 22. Accounting Architecture

Backend menggunakan:

```text
Route
 ↓
Controller
 ↓
Form Request
 ↓
Service
 ↓
Model / Repository
 ↓
Database
```

Business calculation berada di Service.

Contoh:

```text
RevenueController
       ↓
StoreRevenueRequest
       ↓
RevenueService
       ↓
Calculation / Cash Update
       ↓
Model
       ↓
Database
```

---

# 23. Calculation Architecture

```text
CalculationService
        │
        ├── Revenue
        ├── Direct Expense
        ├── Rule-Based Expense
        ├── Allocation
        ├── Profit
        └── Distributable Profit
                    │
                    ▼
          ProfitSharingService
```

Persentase tidak ditulis langsung di Controller.

---

# 24. Final Business Flow

```text
1. Sales mendapatkan customer
2. Sales membuat quotation/order
3. Project tersedia
4. Customer melakukan pembayaran
5. Accounting mencatat actual money received
6. Accounting mencatat HPP
7. Accounting mencatat salary/shared cost
8. Accounting mencatat/resolve advertising
9. Accounting mencatat/resolve bonus
10. Accounting menghitung operational allocation
11. Accounting Engine menghitung project profit
12. Optional Profit Sharing diterapkan
13. Accounting melakukan daily closing
14. Sistem menyimpan closing snapshot
15. Sistem menghasilkan daily report
16. User melakukan Copy Report
```

---

# 25. Core Principle

```text
Sales
→ What was sold?

Marketing
→ Where did the traffic/campaign come from?

Accounting
→ What money actually came in and went out?

Accounting Engine
→ What is the real project cost and profit?

Closing
→ What is the official result for that day/period?

Report
→ How is that result communicated?
```

Dengan struktur tersebut, Zeasy tetap sederhana:

```text
Sales & CRM
Digital Marketing
Accounting
```

tetapi ketiga module memiliki hubungan data yang jelas tanpa membuat Accounting merusak workflow existing.


# 26. Important Profit Sharing Rule

Profit sharing does **not** happen on every daily closing.

Daily closing only calculates:

```text
Penerimaan (A)
-
Pengeluaran (B)
=
Jumlah Setoran Harian
```

Example:

```text
Penerimaan          Rp4.315.500
Pengeluaran         Rp3.948.239
--------------------------------
Jumlah Setoran        Rp367.261
```

The `Rp367.261` is the daily result.

It is not split into 40% and 60% yet.

---

# 27. Accumulation for 30 Days

Every daily closing produces a daily settlement.

Example:

```text
Day 01   Rp1.500.000
Day 02   Rp2.000.000
Day 03   Rp1.200.000
...
Day 30   Rp2.100.000
```

The system totals all daily settlements:

```text
Total Setoran 30 Hari
=
SUM(Daily Settlement)
=
Rp50.000.000
```

This `Rp50.000.000` becomes the base for profit sharing.

---

# 28. Profit Sharing Happens Once Per Period

If the active scheme is:

```text
Partner A = 40%
Company   = 60%
```

then:

```text
Rp50.000.000 × 40%
= Rp20.000.000

Rp50.000.000 × 60%
= Rp30.000.000
```

Final:

```text
Partner A    Rp20.000.000
Company      Rp30.000.000
```

The system creates one period-level distribution.

It does NOT calculate:

```text
Daily settlement × 40%
Daily settlement × 60%
```

for every day.

---

# 29. Why This Prevents Double Counting

There are two different levels:

## Daily Accounting

```text
Revenue
-
Expense
=
Daily Settlement
```

Purpose:

> Mengetahui berapa jumlah setoran/result setiap hari.

## Period Profit Sharing

```text
SUM(Daily Settlement)
×
Profit Sharing %
```

Purpose:

> Menentukan pembagian hasil pada akhir periode.

Therefore:

```text
Daily Settlement
≠
Profit Sharing Expense
```

unless the company explicitly configures a separate accounting treatment for the distribution.

The profit-sharing amount should not be inserted again into each daily expense calculation.

---

# 30. Complete System Flow

```text
             DAILY OPERATIONS
                    │
                    ▼
             Actual Revenue
                    │
                    ▼
               Expenses
                    │
                    ▼
          Calculation Rules
                    │
                    ▼
          Daily Settlement
                    │
                    ▼
             Daily Closing
                    │
                    ▼
             Daily Report
                    │
                    │
          Repeat for 30 Days
                    │
                    ▼
        ┌──────────────────────┐
        │ SUM DAILY SETTLEMENT │
        └──────────┬───────────┘
                   ▼
          Rp50.000.000
                   │
                   ▼
        PROFIT SHARING SCHEME
                   │
          ┌────────┴────────┐
          ▼                 ▼
        40%               60%
          │                 │
          ▼                 ▼
    Rp20.000.000       Rp30.000.000
          │                 │
          └────────┬────────┘
                   ▼
          PERIOD SETTLEMENT
```

---

# 31. Daily Report vs Period Report

Daily report:

```text
Laporan
Holding : CV Aksara Nusa Meditama
Tgl : 11 Agustus 2026


Penerimaan (A)
Rp. 4.315.500

Pengeluaran (B)

1. Hpp : Rp. 1.300.000
2. Gaji : Rp. 2.346.154
3. Biaya iklan 4% : Rp. 172.620
4. Bonus 3% : Rp. 129.465

Jumlah setoran
Rp. 367.261 (A-B)
```

No profit sharing appears here.

Period report:

```text
Laporan Profit Sharing
Holding : CV Aksara Nusa Meditama
Periode : 01 - 30 Agustus 2026


Total Setoran Harian
Rp. 50.000.000

Profit Sharing

1. Partner A 40% : Rp. 20.000.000
2. Company 60%   : Rp. 30.000.000

Total
Rp. 50.000.000
```

This keeps the operational report simple while keeping the financial distribution transparent.

---

# 32. Dynamic Scheme Still Applies

The same dynamic system remains.

Example:

```text
August
40% / 60%

September
50% / 50%

October
80% / 20%
```

The system calculates the distribution only when the corresponding period is closed.

If profit sharing is disabled:

```text
Total Daily Settlement
=
Company Settlement
```

No distribution is generated.

---

# 33. Final Accounting Principle

The accounting system now has three distinct concepts:

```text
1. DAILY SETTLEMENT
   Penerimaan - Pengeluaran

2. PERIOD TOTAL
   SUM(Daily Settlement)

3. PROFIT DISTRIBUTION
   Period Total × Active Sharing Scheme
```

This separation is the core rule that prevents double counting.
