import type { Project } from '../types'

export const projects: Project[] = [
  {
    slug: 'shelter-center',
    title: 'Shelter Center',
    category: 'web',
    progress: 100,
    summary:
      'Shelters hosting displaced families often track residents, donations and aid on paper or scattered spreadsheets, and lose it all when the connection drops. Shelter Center keeps each shelter running offline and syncs to the cloud when it can.',
    stack: ['React', 'TypeScript', 'Tailwind', 'Redux Toolkit Query', 'Node.js', 'Express', 'Prisma', 'PostgreSQL', 'Supabase'],
    shots: 0,
    liveUrl: 'https://shelter-center.vercel.app/',
    sections: [
      {
        title: 'Overview',
        paragraphs: [
          'Shelter Center is a management platform for shelters hosting displaced families. It replaces paper registers and spreadsheets with one system covering family registration, stock, donations and aid distribution. It is built to keep working in places where internet access is unreliable.',
        ],
      },
      {
        title: 'The problem',
        paragraphs: [
          'A shelter has to answer questions like “who is here, who is most vulnerable, what do we have in stock, and who already received what?” Without a shared system, those answers live in notebooks and separate files. Aid gets duplicated or missed, donors can’t see where their contributions went, and nobody outside the shelter has a clear picture across sites.',
        ],
      },
      {
        title: 'How it works',
        paragraphs: [
          'Offline-first, two databases. Each shelter runs its own local PostgreSQL database, so daily work never depends on the internet. A central Supabase PostgreSQL database acts as the cloud copy. A “Sync to Cloud” action reconciles the two using last-updated timestamps, pushing local changes up and pulling cloud changes down. The same sync carries families, members, inventory, donations, distributions and staff accounts.',
        ],
      },
      {
        title: 'Four roles, each with their own workspace',
        items: [
          'Field employees register families through a three-step intake: household details, members, then review. Age groups are derived from birth dates, and vulnerability flags such as infants, pregnant or lactating members, disabled members, chronic patients and refrigerated medication are detected automatically.',
          'Shelter admins manage the day-to-day: inventory with low-stock thresholds, donation batches, aid distributions, staff and the NGO directory. Stock is deducted when aid is given and restored if a record is deleted.',
          'NGO viewers see only what concerns them: anonymized family statistics, the batches their organization funded, and the distributions made from them. They can export filtered reports as CSV.',
          'Super admins work across the whole platform. They pick a shelter from a hub and manage it online, with extra tools such as restoring deleted records, activating or deactivating shelters, and viewing an activity log.',
        ],
      },
      {
        title: 'Targeted donations',
        paragraphs: [
          'A donation batch can be discretionary, or earmarked for specific families or a vulnerability type. The distribution screen then shows how far the available stock covers the selected families before anything is confirmed.',
        ],
      },
      {
        title: 'Safe by design',
        paragraphs: [
          'Nothing is permanently deleted. Records are soft-deleted with who deleted them and when, so there is a full audit trail. Access control is enforced on both sides: CASL on the frontend and role and shelter-scope middleware on the API. Login is rate-limited and uses short-lived JWTs with a refresh cookie. New staff must replace their temporary password on first sign-in. Admins can also export an entire shelter’s data as a ZIP of CSV files.',
        ],
      },
      {
        title: 'Tech',
        paragraphs: [
          'React, TypeScript, Tailwind and Redux Toolkit Query on the frontend, following IBM Carbon design principles. Node.js, Express and Prisma on the backend, with local PostgreSQL and Supabase.',
        ],
      },
    ],
  },
  {
    slug: 'pos-system',
    title: 'POS System',
    category: 'desktop',
    progress: 100,
    summary:
      'Windows desktop POS for small shops, built in Flutter. It runs fully offline on a local SQLite (Drift) database and can sync several terminals through the owner’s own Supabase project. It covers the register, shifts, refunds, inventory, reports, and an audit log, with PIN-based staff roles.',
    stack: ['Flutter', 'Fluent UI', 'Riverpod', 'Drift', 'Supabase', 'MVVM'],
    shots: 0,
    sections: [
      {
        title: 'The problem',
        paragraphs: [
          'Small shops need to sell, issue receipts, and track stock all day, even when the internet is flaky. Many cloud POS tools stop working when the connection drops, and many local ones can’t share data between counters. I built a POS that works fully offline first and treats cloud sync as an optional layer the owner controls.',
        ],
      },
      {
        title: 'What it does',
        items: [
          'Register: barcode scanner support, product search, per-product discounts, tax, cash and card payments, and suggested cash amounts for quick change.',
          'Staff and security: PIN login, manager approval for refunds, lockout after repeated wrong PINs, and auto-lock after inactivity.',
          'Shifts: opening float, cash drawer reconciliation, and a Z-report showing over/short.',
          'Refunds: partial refunds at the price actually paid, proportional tax, optional return to stock, and printable credit notes.',
          'Inventory: an append-only stock ledger with receive, count, and adjust actions and low-stock warnings.',
          'Products: categories, cost price with profit preview, and CSV import with a preview step and per-line error reporting.',
          'Reports: net sales, daily and hourly charts, category mix, and per-cashier totals.',
          'Audit log: a tamper-resistant record of every sensitive action.',
          'Price checker mode: a locked, customer-facing lookup screen that needs a manager PIN to exit.',
          'Backups: automatic daily and on shift close, optional USB copy, and restore from file.',
          'Receipts: 80 mm and 58 mm layouts, reprints, and a packaged Windows installer.',
        ],
      },
      {
        title: 'My role',
        paragraphs: [
          'I designed and built the whole application end to end: the data model, business rules, UI, sync engine, backup/restore, tests, and installer.',
        ],
      },
      {
        title: 'Architecture',
        items: [
          'Flutter + Fluent UI for a native-feeling Windows interface.',
          'MVVM with Riverpod: views stay thin, notifiers and providers hold UI state, and repositories own all database access and business rules.',
          'Drift (SQLite) for typed queries, reactive streams that update the UI automatically, and versioned migrations (currently schema v10).',
          'Supabase (optional) as a shared backend for multi-terminal sync.',
        ],
      },
      {
        title: 'Interesting engineering problems I solved',
        items: [
          'Money correctness: all amounts are stored as integer cents and formatted only at the UI edge, so there are no floating-point errors in totals or reports.',
          'Tax on partial refunds: I track refunded tax cumulatively against the original sale, so three partial refunds sum to exactly the original tax and never drift by a cent.',
          'Append-only data: SQLite triggers block updates and deletes on the audit log and stock ledger. Stock on hand is derived from the sum of movements, so there is a full history of every change.',
          'Offline-first sync: database triggers write changed rows into an outbox, and a background runner uploads them in parent-before-child order. A puller downloads other terminals’ changes using per-table cursors with an overlap window, which is safe because applying a row is idempotent. Conflicts use newest-updated_at-wins. Rows the server keeps rejecting are parked after five attempts so they can’t block the queue, while network and auth errors never park anything.',
          'Multi-terminal safety: receipt and refund numbers are unique per device, so two terminals can’t clash. Each terminal’s own shifts are never overwritten from the cloud.',
          'Security: PINs are salted and hashed with iterated HMAC-SHA256 and checked in constant time. PIN material never leaves the device (the sync mapper strips it). Sync credentials live in Windows Credential Manager, and the app refuses a service_role key.',
          'Data safety: backups use VACUUM INTO plus an integrity check. If a new backup has fewer sales than the previous one, the app flags it and stops rotating old copies out. Restore validates the file, keeps a safety copy, and swaps it in safely.',
          'Scanner detection: a keyboard-wedge scanner is told apart from human typing by keystroke timing, so scans work anywhere without special drivers.',
          'Testing: about 30 test files cover repositories, refund tax math, sync (push, pull, parking, conflicts), CSV parsing, receipts, charts, PIN rules, and backups, mostly against in-memory databases.',
        ],
      },
      {
        title: 'Tech',
        paragraphs: ['Flutter, Dart, Fluent UI, Riverpod, Drift/SQLite, Supabase, fl_chart, window_manager, flutter_secure_storage.'],
      },
    ],
  },
  {
    slug: 'shelter-center-mobile',
    title: 'Shelter Center Mobile',
    category: 'mobile',
    progress: 40,
    summary:
      'The super admin’s version of Shelter Center, built in Flutter. It syncs with the same Supabase backend as the web platform through a local Drift database.',
    stack: ['Flutter', 'Riverpod', 'Drift', 'Supabase', 'MVVM'],
    shots: 0,
    sections: [
      {
        title: 'Overview',
        paragraphs: [
          'Shelter Center Mobile covers the same ground as the Shelter Center web platform, but only for the super admin role. Shelters hosting displaced families often track residents, donations and aid on paper or scattered spreadsheets, and lose it all when the connection drops. Shelter Center keeps each shelter running offline and syncs to the cloud when it can.',
        ],
      },
      {
        title: 'How it works',
        paragraphs: [
          'The app syncs between Supabase and a local Drift database. Unlike the web platform, it does not connect to a regular PostgreSQL database: Supabase is its only backend, and it is the same Supabase project the web app uses.',
        ],
      },
      {
        title: 'Architecture',
        paragraphs: ['Flutter with MVVM structure and Riverpod for state management.'],
      },
    ],
  },
  {
    slug: 'mizan',
    title: 'Mizan',
    category: 'mobile',
    progress: 40,
    summary:
      'Mizan is the owner’s companion to a Windows POS system. It syncs the shop’s Supabase data into a local Drift database, so the owner can check sales, stock levels, staff pay and a full profit and loss (rent, salaries, and all) from their phone, online or offline. It works in English and Arabic (RTL) with light and dark themes.',
    stack: ['Flutter', 'Riverpod', 'Drift', 'Supabase', 'fl_chart', 'MVVM'],
    shots: 0,
    sections: [
      {
        title: 'The problem',
        paragraphs: [
          'A supermarket’s POS terminals record every sale, but the owner needs answers away from the counter: How much did we really earn this month? What is running out? How much do I owe staff? Sales totals alone don’t answer the first question, because rent, electricity and salaries also have to come off.',
        ],
      },
      {
        title: 'What Mizan does',
        paragraphs: [
          'Mizan is a Flutter app (Android and iOS) that connects to the same Supabase backend as the POS, keeps a full copy in a local database, and shows the owner:',
        ],
        items: [
          'Dashboard: today’s net profit and a 7-day net sales chart.',
          'Profit and loss: item revenue, refunds, cost of goods sold, gross profit, expenses by category (with a donut chart) and net profit for today, 7 days, this month or this year.',
          'Sales: history and receipt detail with items, payments and refunds. On tablets it uses a two-pane master-detail layout.',
          'Stock: on-hand quantities with out-of-stock and low-stock status, plus a movement history per product.',
          'Expenses: one-off and recurring (weekly to yearly), spread evenly per day so a quarterly bill doesn’t distort a single month.',
          'Staff and payroll: salary and transportation per employee, a monthly attendance calendar (absent or paid leave), pay cycles with a configurable pay day, and raises that start on a chosen month without rewriting history.',
          'Staff activity: cashier shifts (cash expected vs. counted) and sign-in attempts from the POS.',
          'Missing costs: a screen for products with no cost price. The P&L shows a coverage percentage and marks profit as an estimate until costs are filled in, instead of silently treating unknown cost as zero.',
        ],
      },
      {
        title: 'Technical highlights',
        items: [
          'Offline-first architecture: the UI reads only from a local Drift (SQLite) database. Screens never call the network.',
          'Custom two-way sync, pull: per-table cursors, a 5-minute overlap for late-visible rows, paging past the 1,000-row API limit, idempotent upserts, and last-write-wins by updated_at. One bad row never stops a sync.',
          'Custom two-way sync, push: a transactional outbox filled by SQLite triggers, parents sent before children, and “poison row” protection. Only data or constraint errors count against a row, which is parked after 5 rejections, while outages and auth errors pause the queue without losing anything.',
          'Correct money handling: integer cents everywhere, formatting only at the UI edge, and tax kept out of revenue.',
          'SQL-aggregated reports so yearly views stay fast on a phone.',
          'Security: only the public key is accepted (private keys are rejected on the connect screen), credentials live in secure storage, and PINs never leave the POS terminals.',
          'Localization and design: English and Arabic with full RTL layout, Western digits for amounts, bundled fonts (Inter and Cairo) so it works offline, a custom Material 3 theme, and three adaptive layouts (bottom bar, rail, extended rail).',
          'Tested: unit and repository tests on in-memory Drift with fake remote sources, plus widget tests for the shell, connect flow and forms.',
        ],
      },
      {
        title: 'Still to come',
        paragraphs: [
          'Adding and editing products with camera barcode scanning, receiving stock from the phone, biometric app lock, realtime updates, a demo mode with seeded data, and low-stock alerts.',
        ],
      },
      {
        title: 'What I learned',
        paragraphs: ['Designing sync that is safe when devices go offline, and making profit numbers honest when data is incomplete.'],
      },
      {
        title: 'Stack',
        paragraphs: ['Flutter, Material 3, Riverpod, Drift, Supabase (PostgREST), fl_chart, MVVM-style layering (pages, view models, repositories, services).'],
      },
    ],
  },
  {
    slug: 'pdf-utility',
    title: 'PDF Utility',
    category: 'mobile',
    progress: 60,
    summary:
      'A Flutter app with 20+ PDF tools: merge, split, reorder pages, sign, protect, compress, scan to PDF and more. Most run entirely on the phone, so files never leave the device, and heavy conversions like Office to PDF and OCR go through a cloud API.',
    stack: ['Flutter', 'Riverpod', 'Drift', 'iLoveAPI', 'MVVM'],
    shots: 0,
    sections: [
      {
        title: 'The idea',
        paragraphs: [
          'I wanted one app for the PDF tasks I do every week, without uploading private documents to random websites. So the app splits its work into two pipelines. Everyday tools run locally on the device. Only the tools that need a server-side layout engine go to the cloud.',
        ],
      },
      {
        title: 'Local tools (offline, free, private)',
        items: [
          'Merge, split, split into several files, remove pages, and a drag-and-drop page organizer with thumbnails.',
          'Image to PDF, camera scan to PDF, and PDF to image.',
          'Protect and unlock with AES-256 encryption.',
          'Draw and place a signature, with drag, resize and a guarantee it stays inside the page.',
          'Page numbers, text watermark, and rotate.',
          'Offline compression with three quality levels.',
          'Built-in PDF viewer, and the app can open PDFs shared from other apps.',
          'A safety check that scans a PDF for risky features such as auto-run JavaScript, embedded programs, disguised names and suspicious links. Links are listed as text and never opened. It is a heuristic check, not an antivirus.',
        ],
      },
      {
        title: 'Cloud tools (iLoveAPI)',
        paragraphs: [
          'Office to PDF, server-side compression that keeps text selectable, OCR in English, Arabic and French, and PDF repair. Before running a job the app shows an estimated credit cost, warns if the balance is too low, and measures the real cost afterwards. Uploaded files are deleted from the server right after processing.',
        ],
      },
      {
        title: 'Architecture',
        items: [
          'MVVM with clear layers: pages, then Riverpod notifiers (viewmodels), then repositories, then services.',
          'Heavy work like merging, splitting and encryption runs in background isolates so the UI never freezes.',
          'Riverpod Notifier and AsyncNotifier classes handle loading, success and error states. Jobs that could go stale (page thumbnails, page previews) use session counters so results from an abandoned file are dropped.',
          'Errors are typed codes (ErrorCode, CloudErrorCode) that the UI turns into translated messages, never raw exceptions.',
          'Fully localized in English, Arabic (RTL) and French, with light, dark and system themes.',
          'Unit tests cover the services, the notifiers (with fake repositories), the page-range parser, the split planner, the safety scanner, error mapping and settings persistence.',
        ],
      },
      {
        title: 'Status: about 60%',
        paragraphs: [
          'Done: all the tools above and the localization. Remaining: PDF to Office, translating the remaining hard-coded screen text, and polish and testing on more devices.',
        ],
      },
      {
        title: 'What I learned',
        paragraphs: [
          'Designing a clean separation so a tool can be added without touching the others, keeping the UI responsive with large files, and treating cost and privacy as design constraints rather than afterthoughts.',
        ],
      },
    ],
  },
]