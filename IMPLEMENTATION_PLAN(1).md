# Zeasy Accounting — Implementation Plan

## 1. Objective

Add a new **Accounting** module to the existing Zeasy workspace without breaking the existing:

- Sales & CRM
- Digital Marketing

Only **one new role** is introduced:

```text
Accounting
```

The Accounting role is responsible for the Accounting module.

The implementation uses:

```text
Layered Architecture
Service → Request → Controller
```

with Laravel + React + Inertia.js + Tailwind CSS + MySQL, consistent with the existing Zeasy stack.

---

# 2. Scope

Accounting will manage:

- Accounting Projects
- Actual Revenue / Money Received
- Expenses
- Expense Categories
- Cash & Bank Accounts
- Dynamic Calculation Rules
- Cost Allocation
- Project Profitability
- Dynamic Profit Sharing
- Daily Closing
- Copyable Reports
- Audit Trail
- Reconciliation

Accounting will **not** replace Sales & CRM or Digital Marketing.

---

# 3. Existing System Protection

The implementation must be additive.

Do not:

- remove existing tables;
- drop existing columns;
- rename existing columns;
- change existing Sales business logic;
- change existing Marketing business logic;
- change existing authentication flow;
- change existing routes;
- duplicate existing master data unnecessarily.

Use new Accounting tables and optional references to existing data.

---

# 4. Role

Add exactly one role:

```text
Accounting
```

Recommended permissions:

```text
accounting.access

accounting.dashboard.view

accounting.project.view
accounting.project.create
accounting.project.update

accounting.revenue.view
accounting.revenue.create
accounting.revenue.update
accounting.revenue.post
accounting.revenue.void

accounting.expense.view
accounting.expense.create
accounting.expense.update
accounting.expense.post
accounting.expense.void

accounting.cash_account.view
accounting.cash_account.manage

accounting.rule.view
accounting.rule.create
accounting.rule.update
accounting.rule.activate

accounting.allocation.view
accounting.allocation.manage

accounting.profit_sharing.view
accounting.profit_sharing.manage

accounting.closing.view
accounting.closing.create
accounting.closing.reopen

accounting.report.view
accounting.report.export

accounting.audit.view
```

No additional `Accounting Manager` role is required.

---

# 5. Module Selector

Existing:

```text
Sales & CRM
Digital Marketing
```

Add:

```text
Accounting
```

Flow:

```text
/login
   ↓
Module Selection
   ├── Sales & CRM
   ├── Digital Marketing
   └── Accounting
```

Accounting route namespace:

```text
/accounting
```

---

# 6. Database Implementation

## 6.1 New Tables

Create the following tables.

### accounting_projects

Purpose: Accounting-side project reference.

Fields:

```text
id
holding_id
project_code
project_name
customer_id nullable
source_project_id nullable
status
start_date nullable
end_date nullable
budget nullable
notes nullable
created_by
created_at
updated_at
```

`source_project_id` is optional and can reference the existing Sales/CRM project without changing its business logic.

---

### accounting_revenues

Purpose: actual money received.

Fields:

```text
id
holding_id
project_id
customer_id nullable
cash_account_id
transaction_date
reference_number
description
amount
payment_method
status
notes nullable
created_by
posted_at nullable
voided_at nullable
created_at
updated_at
```

Important:

> Project value/order value is not automatically revenue.

Revenue is only recorded when Accounting inputs the actual money received.

---

### accounting_expenses

Purpose: actual and calculated project/company expenses.

Fields:

```text
id
holding_id
project_id nullable
cash_account_id nullable
expense_category_id
transaction_date
reference_number
description
amount
expense_source
allocation_type
status
notes nullable
created_by
posted_at nullable
voided_at nullable
created_at
updated_at
```

`expense_source`:

```text
actual
rule_based
allocated
manual
```

`allocation_type`:

```text
direct
shared
```

---

### accounting_expense_categories

Purpose: configurable expense categories.

Default seed:

```text
HPP
Gaji
Advertising
Bonus
Operational
Office
Internet
Software
Transport
Vendor
Freelance
Tax
Other
```

Users can add categories later.

---

### accounting_cash_accounts

Purpose: cash/bank source for actual money movement.

Fields:

```text
id
holding_id
name
account_type
account_number nullable
opening_balance
current_balance
status
created_at
updated_at
```

`account_type`:

```text
cash
bank
```

---

### accounting_calculation_rules

Purpose: dynamic financial rules.

Fields:

```text
id
holding_id
name
rule_type
calculation_basis
value
scope
effective_from
effective_until nullable
status
priority
rounding_mode
created_by
created_at
updated_at
```

Example:

```text
Advertising
4%
Basis: Revenue
Scope: Project
```

---

### accounting_rule_versions

Purpose: preserve historical rule calculations.

Fields:

```text
id
calculation_rule_id
version
value
calculation_basis
effective_from
effective_until nullable
created_by
created_at
```

Historical reports must use the rule version active at the transaction date.

---

### accounting_allocation_rules

Purpose: define how shared costs are allocated.

Fields:

```text
id
holding_id
name
allocation_basis
value nullable
status
effective_from
effective_until nullable
created_by
created_at
updated_at
```

Supported basis:

```text
Revenue %
Equal Split
Headcount
Working Hours
Project Weight
Manual %
Fixed Amount
```

---

### accounting_profit_participants

Purpose: dynamic profit-sharing recipients.

Fields:

```text
id
holding_id
name
participant_type
status
created_at
updated_at
```

Participant type:

```text
company
partner
employee
other
```

The company must not be hardcoded.

---

### accounting_profit_sharing_schemes

Purpose: dynamic profit-sharing configuration.

Fields:

```text
id
holding_id
name
status
calculation_basis
effective_from
effective_until nullable
created_by
created_at
updated_at
```

Status:

```text
enabled
disabled
```

---

### accounting_profit_sharing_items

Purpose: percentages per participant.

Fields:

```text
id
scheme_id
participant_id
percentage
created_at
updated_at
```

Validation:

```text
SUM(percentage) = 100
```

only when the scheme is enabled.

---

### accounting_closings

Purpose: daily/period closing snapshot.

Fields:

```text
id
holding_id
closing_date
total_revenue
total_expense
total_hpp
total_salary
total_advertising
total_bonus
total_operational
net_profit
settlement
status
closed_by
closed_at
created_at
updated_at
```

---

### accounting_closing_items

Purpose: preserve transaction-level snapshot/detail.

Fields:

```text
id
closing_id
transaction_type
transaction_id
project_id nullable
amount
category nullable
created_at
```

---

### accounting_audit_logs

Purpose: financial audit trail.

Fields:

```text
id
holding_id
user_id
module
action
record_type
record_id
before_data nullable
after_data nullable
reason nullable
created_at
```

---

# 7. Migration Order

Create migrations in this order:

```text
1. accounting_projects
2. accounting_expense_categories
3. accounting_cash_accounts
4. accounting_calculation_rules
5. accounting_rule_versions
6. accounting_allocation_rules
7. accounting_profit_participants
8. accounting_profit_sharing_schemes
9. accounting_profit_sharing_items
10. accounting_revenues
11. accounting_expenses
12. accounting_closings
13. accounting_closing_items
14. accounting_audit_logs
```

Every migration must be:

- additive;
- reversible;
- tested with rollback;
- independent from destructive changes to existing tables.

---

# 8. Model Implementation

Create:

```text
app/Models/Accounting/
├── AccountingProject.php
├── AccountingRevenue.php
├── AccountingExpense.php
├── ExpenseCategory.php
├── CashAccount.php
├── CalculationRule.php
├── CalculationRuleVersion.php
├── AllocationRule.php
├── ProfitParticipant.php
├── ProfitSharingScheme.php
├── ProfitSharingItem.php
├── AccountingClosing.php
├── AccountingClosingItem.php
└── AccountingAuditLog.php
```

Relationships:

```text
AccountingProject
├── hasMany Revenue
├── hasMany Expense
└── belongsTo Customer nullable

CalculationRule
└── hasMany RuleVersions

ProfitSharingScheme
└── hasMany ProfitSharingItems

ProfitSharingItem
└── belongsTo ProfitParticipant

AccountingClosing
└── hasMany ClosingItems
```

---

# 9. Form Request Layer

Create:

```text
app/Http/Requests/Accounting/
├── StoreAccountingProjectRequest.php
├── UpdateAccountingProjectRequest.php
├── StoreRevenueRequest.php
├── UpdateRevenueRequest.php
├── StoreExpenseRequest.php
├── UpdateExpenseRequest.php
├── StoreCalculationRuleRequest.php
├── UpdateCalculationRuleRequest.php
├── StoreAllocationRuleRequest.php
├── StoreProfitSharingSchemeRequest.php
├── StoreProfitSharingItemRequest.php
└── CloseAccountingPeriodRequest.php
```

Responsibilities:

- input validation;
- authorization;
- amount validation;
- percentage validation;
- date validation;
- project validation;
- cash account validation;
- rule validation.

Do not calculate financial results in Form Requests.

---

# 10. Service Layer

Create:

```text
app/Services/Accounting/
├── ProjectService.php
├── RevenueService.php
├── ExpenseService.php
├── CalculationService.php
├── CalculationRuleService.php
├── AllocationService.php
├── ProfitSharingService.php
├── ClosingService.php
├── ReportService.php
└── ReconciliationService.php
```

## ProjectService

Handles:

```text
create
update
archive
get financial summary
```

## RevenueService

Handles:

```text
create revenue
post revenue
void revenue
calculate received amount
update cash account
```

## ExpenseService

Handles:

```text
create expense
post expense
void expense
direct expense
shared expense
```

## CalculationRuleService

Handles:

```text
find active rule
resolve rule version by date
calculate rule-based expense
```

## CalculationService

Handles:

```text
revenue
HPP
direct expense
salary allocation
advertising
bonus
operational allocation
net/distributable profit
```

## AllocationService

Handles shared expense allocation.

## ProfitSharingService

Handles:

```text
resolve active scheme
check enabled/disabled
validate total percentage
calculate participant amount
```

## ClosingService

Handles:

```text
validate closing
calculate daily totals
create snapshot
lock closing
reopen if permitted
```

## ReportService

Handles:

```text
daily report
project report
profit report
copyable report
PDF/export data
```

---

# 11. Controller Layer

Controllers must remain thin.

Create:

```text
app/Http/Controllers/Accounting/
├── DashboardController.php
├── ProjectController.php
├── RevenueController.php
├── ExpenseController.php
├── CashAccountController.php
├── CalculationRuleController.php
├── AllocationController.php
├── ProfitSharingController.php
├── ClosingController.php
└── ReportController.php
```

Controller flow:

```text
Request
 ↓
Form Request
 ↓
Service
 ↓
Response
```

No accounting formulas in controllers.

---

# 12. Routes

Create Accounting route group:

```text
/accounting
```

Suggested routes:

```text
/accounting
/accounting/dashboard

/accounting/projects
/accounting/projects/create
/accounting/projects/{project}

/accounting/revenues
/accounting/revenues/create

/accounting/expenses
/accounting/expenses/create

/accounting/cash-accounts

/accounting/rules
/accounting/allocation-rules

/accounting/profit-sharing

/accounting/closing
/accounting/closing/{date}

/accounting/reports
/accounting/reports/daily
/accounting/reports/projects
```

Use existing authentication middleware plus Accounting permission middleware.

---

# 13. Frontend Implementation

Follow existing Zeasy design:

```text
React
Inertia.js
Tailwind CSS
Monochrome Minimalist
```

Pages:

```text
resources/js/Pages/Accounting/
├── Dashboard.jsx
├── Projects/
│   ├── Index.jsx
│   ├── Create.jsx
│   └── Show.jsx
├── Revenues/
│   ├── Index.jsx
│   ├── Create.jsx
│   └── Edit.jsx
├── Expenses/
│   ├── Index.jsx
│   ├── Create.jsx
│   └── Edit.jsx
├── CashAccounts/
│   └── Index.jsx
├── Rules/
│   ├── Index.jsx
│   └── Form.jsx
├── Allocation/
│   └── Index.jsx
├── ProfitSharing/
│   ├── Index.jsx
│   └── Form.jsx
├── Closing/
│   ├── Index.jsx
│   └── Show.jsx
└── Reports/
    ├── Daily.jsx
    └── Project.jsx
```

Components:

```text
resources/js/Components/Accounting/
├── FinancialSummaryCard.jsx
├── RevenueForm.jsx
├── ExpenseForm.jsx
├── ProjectFinancialSummary.jsx
├── CalculationRuleForm.jsx
├── AllocationTable.jsx
├── ProfitSharingTable.jsx
├── ClosingSummary.jsx
└── CopyReportButton.jsx
```

---

# 14. Dashboard

Show:

```text
Today's Revenue
Today's Expense
Today's Profit
Cash Balance
Open Projects
Outstanding Revenue
```

Additional:

```text
Revenue vs Expense
Project Profitability
Recent Transactions
Closing Status
```

---

# 15. Project Page

Tabs:

```text
Overview
Revenue
Expense
Allocation
Profit
Closing
Report
```

Summary:

```text
Revenue
Expense
Profit
Margin
Outstanding
```

---

# 16. Revenue Page

Accounting user inputs actual received money.

Form:

```text
Project
Date
Reference Number
Description
Amount
Payment Method
Cash / Bank Account
```

Important:

```text
Project Value ≠ Revenue Received
```

If project value is Rp20.000.000 but only Rp5.000.000 has been received:

```text
Project Value       Rp20.000.000
Received             Rp5.000.000
Outstanding         Rp15.000.000
```

---

# 17. Expense Page

Form:

```text
Project / Shared
Date
Category
Description
Amount
Payment Method
Cash / Bank
Source
Allocation
```

Direct expense:

```text
Project A
HPP
Rp1.300.000
```

Shared expense:

```text
Project = Shared
Operational
Rp10.000.000
```

---

# 18. Calculation Rules UI

Admin/Accounting user can configure:

```text
Name
Value
Basis
Scope
Effective From
Effective Until
Status
```

Example:

```text
Advertising
4%
Revenue
Project
01 Aug 2026
Active
```

No hardcoded percentage in frontend/backend business logic.

---

# 19. Profit Sharing UI

Default:

```text
Disabled
```

When enabled:

```text
Scheme Name
Basis
Effective From
Participants
Percentage
```

Example:

```text
Partner A    40%
Company      60%
```

Another period:

```text
Partner A    50%
Company      50%
```

Another:

```text
Partner A    80%
Company      20%
```

The company and participants are selected from master data.

---

# 20. Daily Closing UI

Show:

```text
Revenue
HPP
Salary
Advertising
Bonus
Operational
Other Expense
Net Profit
Settlement
```

Before closing:

```text
[ Review ]
[ Close Day ]
```

After closing:

```text
Closed
Closed By
Closed At
[ View Report ]
[ Copy Report ]
```

---

# 21. Copyable Report

Output:

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

The output is generated by `ReportService`.

---

# 22. Testing Plan

## Migration

Test:

```text
migrate
rollback
migrate again
```

## Role

Test:

```text
Accounting can access /accounting
Sales cannot access Accounting without permission
Marketing cannot access Accounting without permission
```

## Revenue

Test:

```text
create
post
void
partial payment
cash/bank update
```

## Expense

Test:

```text
direct expense
shared expense
rule-based expense
```

## Rules

Test:

```text
4%
5%
effective date
historical rule
```

## Profit Sharing

Test:

```text
disabled
40/60
50/50
80/20
multiple participants
percentage total != 100
```

## Closing

Test:

```text
open
close
snapshot
reopen permission
```

## Regression

Existing:

```text
Sales & CRM → PASS
Digital Marketing → PASS
Login → PASS
Existing routes → PASS
Existing database → PASS
```

---

# 23. Implementation Order

```text
Phase 1
├── Accounting Role
├── Permission
├── Module Selector
└── Accounting Layout

Phase 2
├── Migrations
├── Models
└── Seeders

Phase 3
├── Form Requests
├── Services
└── Controllers

Phase 4
├── Routes
├── Dashboard
├── Projects
├── Revenue
└── Expenses

Phase 5
├── Calculation Rules
├── Allocation
├── Profit Calculation
└── Profit Sharing

Phase 6
├── Daily Closing
├── Reports
└── Copy Report

Phase 7
├── Audit Trail
├── Reconciliation
└── Regression Testing

Phase 8
└── Optional deeper integration with Sales & Marketing
```

---

# 24. Definition of Done

Accounting is ready when:

```text
Login
 ↓
Accounting
 ↓
Create / Select Project
 ↓
Input Actual Revenue
 ↓
Input Expense
 ↓
Apply Dynamic Rules
 ↓
Calculate Profit
 ↓
Optional Profit Sharing
 ↓
Daily Closing
 ↓
Copy Report
```

works without changing the existing Sales & CRM and Digital Marketing workflows.


# 26. Daily Settlement vs Period Profit Sharing

**Important business rule:** Profit sharing is NOT calculated on each daily closing.

The daily report calculates the **daily setoran / daily net settlement** first.

Example:

```text
Penerimaan (A)        Rp4.315.500

Pengeluaran (B)
HPP                  Rp1.300.000
Gaji                 Rp2.346.154
Advertising            Rp172.620
Bonus                  Rp129.465
--------------------------------
Jumlah Setoran          Rp367.261
```

The `Rp367.261` is the daily settlement.

It is **not yet multiplied by the profit-sharing percentage**.

Daily settlement is accumulated during the configured profit-sharing period.

Example 30 days:

```text
Day 01   Rp1.500.000
Day 02   Rp2.000.000
Day 03   Rp1.200.000
...
Day 30   Rp2.100.000
--------------------
Total    Rp50.000.000
```

Only after the period is closed:

```text
Total Daily Settlement = Rp50.000.000
```

then the active profit-sharing rule is applied:

```text
40% = Rp20.000.000
60% = Rp30.000.000
```

Therefore the system does **not** perform:

```text
Day 01 settlement × 40%
Day 01 settlement × 60%

Day 02 settlement × 40%
Day 02 settlement × 60%
...
```

This prevents double calculation and makes the daily report independent from the period profit-sharing settlement.

---

# 27. Profit Sharing Period

Profit sharing must have a configurable period.

Examples:

```text
Monthly
01 Aug 2026 - 31 Aug 2026

Quarterly
01 Jul 2026 - 30 Sep 2026

Custom
01 Aug 2026 - 15 Aug 2026
```

Default can be monthly, but the period must be configurable.

The system aggregates:

```text
Daily Closing Settlement
```

not raw revenue.

Formula:

```text
Period Distributable Amount
=
SUM(All Daily Settlement Within Period)
```

Example:

```text
Rp367.261
+ Rp1.500.000
+ Rp2.000.000
+ ...
= Rp50.000.000
```

---

# 28. Profit Sharing Calculation

After period aggregation:

```text
Total Daily Settlement
            ↓
   Period Profit Sharing
            ↓
     Active Scheme
            ↓
      40% / 60%
            ↓
   Distribution Amount
```

Example:

```text
Period Total = Rp50.000.000

Participant A
40% = Rp20.000.000

Company
60% = Rp30.000.000
```

The system creates **one period distribution**, not a distribution for every daily closing.

---

# 29. No Double Counting Rule

The Accounting Engine must separate these concepts:

```text
Daily Closing
    =
Penerimaan - Pengeluaran
    =
Daily Settlement
```

and:

```text
Period Profit Sharing
    =
SUM(Daily Settlement)
×
Profit Sharing Percentage
```

Therefore:

```text
Daily Closing
→ records the daily result

Period Closing
→ aggregates daily results

Profit Sharing
→ distributes the aggregated result
```

Profit sharing must never be deducted again from the daily expense list unless the business explicitly configures it as a separate accounting expense.

---

# 30. Period Closing Data

Add/maintain a period closing concept in addition to daily closing.

Recommended fields:

```text
id
holding_id
period_type
period_start
period_end
total_daily_settlement
profit_sharing_enabled
profit_sharing_scheme_id nullable
status
closed_by
closed_at
created_at
updated_at
```

Status:

```text
Open
Calculated
Approved
Settled
Reopened
```

Recommended additional table:

```text
accounting_period_closings
```

and:

```text
accounting_period_closing_items
```

The items reference the daily closings included in the period.

---

# 31. Profit Sharing Distribution Record

Create a dedicated distribution record for the period.

Recommended table:

```text
accounting_profit_distributions
```

Fields:

```text
id
period_closing_id
scheme_id
participant_id
base_amount
percentage
distribution_amount
status
settled_at nullable
created_at
updated_at
```

Example:

```text
Period:
August 2026

Base Amount:
Rp50.000.000

Partner A:
40%
Rp20.000.000

Company:
60%
Rp30.000.000
```

This makes it impossible to confuse the daily settlement with the final profit-sharing amount.

---

# 32. Updated Closing Flow

The complete flow becomes:

```text
DAILY
─────

Revenue Input
     ↓
Expense Input
     ↓
Calculation Rules
     ↓
Daily Profit Calculation
     ↓
Daily Settlement
     ↓
Daily Closing
     ↓
Daily Report
```

Then:

```text
PERIOD
──────

Daily Closing #1
Daily Closing #2
Daily Closing #3
...
Daily Closing #30
     ↓
SUM Daily Settlement
     ↓
Period Total
     ↓
Profit Sharing Scheme
     ↓
40% / 60%
     ↓
Period Distribution
     ↓
Period Settlement
```

---

# 33. Updated Report Requirements

Daily report remains exactly in the operational format:

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

There is **no 40%/60% calculation in this daily report**.

Profit-sharing is shown separately in the period report.

---

# 34. Period Profit Sharing Report

Example:

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

This report can also have:

```text
[Copy Report]
[Export PDF]
```

---

# 35. Implementation Changes Required

Add to database:

```text
accounting_period_closings
accounting_period_closing_items
accounting_profit_distributions
```

Add models:

```text
AccountingPeriodClosing.php
AccountingPeriodClosingItem.php
AccountingProfitDistribution.php
```

Add services:

```text
PeriodClosingService.php
ProfitDistributionService.php
```

Add controllers:

```text
PeriodClosingController.php
ProfitDistributionController.php
```

Add requests:

```text
CloseAccountingPeriodRequest.php
CalculateProfitDistributionRequest.php
SettleProfitDistributionRequest.php
```

Frontend:

```text
Pages/Accounting/PeriodClosing/
Pages/Accounting/ProfitDistribution/
```

---

# 36. Updated CalculationService Responsibility

`CalculationService` calculates the daily result:

```text
Revenue
- Expenses
= Daily Settlement
```

It must NOT apply period profit sharing.

`ProfitDistributionService` is responsible for:

```text
SUM Daily Settlement
        ↓
Resolve Active Scheme
        ↓
Calculate Distribution
        ↓
Create Distribution Records
```

This separation is mandatory to avoid double counting.

---

# 37. Example End-to-End

Assume 30 daily closings produce:

```text
Total Daily Settlement = Rp50.000.000
```

Current scheme:

```text
Partner = 40%
Company = 60%
```

System calculates:

```text
Partner:
Rp50.000.000 × 40%
= Rp20.000.000

Company:
Rp50.000.000 × 60%
= Rp30.000.000
```

The daily records remain:

```text
Day 1 = Rp...
Day 2 = Rp...
...
Day 30 = Rp...
```

They are not modified.

The period distribution is an additional financial record referencing the accumulated amount.

---

# 38. If Profit Sharing Is Disabled

If the active scheme is disabled:

```text
Total Daily Settlement
        ↓
Rp50.000.000
        ↓
No Distribution
```

No 40%/60% calculation occurs.

The full amount remains the company's settlement according to the company's accounting policy.

---

# 39. If the Scheme Changes

Example:

```text
August:
40% / 60%

September:
50% / 50%

October:
80% / 20%
```

Each period uses the scheme effective for that period.

August cannot be recalculated using September's 50/50 rule.

This is enforced through:

```text
scheme_id
effective_from
effective_until
period_closing_id
```
