# Digital Menu & Ordering System — Product Requirements Document

**Status:** Draft v1
**Owner:** [Cafe Name]
**Last updated:** August 21, 2026

---

## 1. Overview

A QR-code based digital menu and ordering system for the cafe. Customers scan a code at their table, browse the menu on their own phone, order, and pay — no app download, no waiting to flag down staff. Staff manage the entire menu, tables, and incoming orders through a simple admin dashboard, with no developer needed for day-to-day changes.

## 2. Problem Statement

- Physical menus are slow and costly to update, and every price or item change means a reprint.
- Manual order-taking is slower, more error-prone, and bottlenecks staff during busy periods.
- The cafe is opening new and has no existing POS or kitchen display system — order management needs to be built in, not bolted on.

## 3. Goals

- Cut order-taking time and staff overhead during peak hours.
- Let staff update menu items, prices, and availability instantly, without code.
- Improve table turnover and average order value.
- Give the owner real-time visibility into orders and sales.

## 4. Target Users

| User | Description |
|---|---|
| Customer | Seated guest, orders via their own phone, no account required |
| Kitchen/Floor Staff | Views and updates incoming orders, responds to table requests |
| Admin/Owner | Manages menu, tables, staff accounts, and sales reporting |

## 5. Scope

### In scope (MVP)
- QR code per table → mobile-friendly menu, no app install
- Menu browsing by category, with photos, descriptions, prices, variants/add-ons
- Cart, checkout, and in-app payment
- Live order status for the customer (Received → Preparing → Ready → Served)
- "Call Staff" and "Request Bill" quick actions
- Admin dashboard: menu CRUD, availability toggle, table/QR management, staff accounts with roles, live order queue, basic sales reporting
- Built-in order management for kitchen/floor staff (no external POS/KDS)

### Out of scope (MVP — future consideration)
- Native iOS/Android apps
- Loyalty/rewards program, customer accounts, order history across visits
- Multi-branch support
- Reservations
- Third-party delivery platform integration

## 6. User Stories

**Customer**
- Scan a QR code at my table to see the menu, no physical copy needed.
- See photos, descriptions, and prices to decide what to order.
- Customize items (size, milk type, add-ons, etc.).
- Add to cart and pay directly from my phone.
- See live status so I know when my order is coming.
- Call a staff member or request the bill with one tap.

**Kitchen/Floor Staff**
- See new orders the moment they're placed, grouped by table.
- Mark orders as preparing / ready / served.
- Get alerted when a table calls staff or asks for the bill.

**Admin/Owner**
- Update items and prices myself, no developer needed.
- Mark items sold out instantly.
- See daily sales and top-selling items.
- Manage table QR codes if seating changes.
- Control what each staff role can access.

## 7. Functional Requirements

### 7.1 Customer-facing menu & ordering
| ID | Requirement |
|---|---|
| FR1 | Each table has a unique QR code linking to the menu pre-loaded with that table's ID |
| FR2 | Menu shown by category, with photo, name, description, price |
| FR3 | Item detail view supports variants/add-ons with price adjustments |
| FR4 | Unavailable items are automatically greyed out / hidden per admin toggle |
| FR5 | Editable cart with running total before checkout |
| FR6 | Checkout collects optional name, processes payment via integrated gateway |
| FR7 | Live order-status screen after ordering |
| FR8 | Persistent "Call Staff" and "Request Bill" buttons |
| FR9 | No login/account required — session tied to table + order |

### 7.2 Kitchen / floor order management
| ID | Requirement |
|---|---|
| FR10 | New orders appear in real time on a staff order queue, grouped by table |
| FR11 | Staff can update order status |
| FR12 | Call Staff / Request Bill actions alert floor staff with table number |

### 7.3 Admin dashboard
| ID | Requirement |
|---|---|
| FR13 | Menu management: categories, items, prices, photos, availability |
| FR14 | Table & QR management: add/remove tables, generate/print QR codes |
| FR15 | Order history and basic sales reporting |
| FR16 | Staff accounts with role-based access (Admin / Kitchen / Floor) |
| FR17 | Payment reconciliation view |

## 8. Non-Functional Requirements

- **Performance:** menu loads in under 2s on typical mobile data; order updates propagate within 2–3s.
- **Availability:** 99.5%+ uptime during cafe operating hours.
- **Security:** no raw card data touches our servers — handled via payment gateway (PCI SAQ-A scope); admin dashboard is auth-gated.
- **Usability:** no app download; works across common phone sizes/browsers; minimal taps to order.
- **Accessibility:** sufficient color contrast, readable type sizes, alt text on item images.
- **Scalability:** comfortably handles concurrent orders from every table at peak, without blocking future multi-location growth.

## 9. Order & Payment Flow

Scan QR → Browse menu → Add to cart → Checkout → Pay → Order confirmed → Live status tracking → Served → (optional) Request bill / tip.

## 10. Success Metrics

- Reduction in average order-to-serve time vs. manual process
- Share of orders placed via digital menu vs. staff-assisted
- Change in average order value
- Menu update turnaround (instant vs. days for reprints)
- Order error rate / customer satisfaction

## 11. Assumptions & Open Questions

- **Payment gateway/region:** not yet specified. This determines supported methods and compliance requirements — needs confirmation (e.g., Stripe, Razorpay, PayPal, or a local processor) before development starts.
- **Tipping:** assumed optional at checkout — confirm if wanted.
- **Payment timing:** MVP assumes pay-at-order (pre-payment). Confirm if "order now, pay at the end via Request Bill" is preferred instead — this changes the checkout flow.
- **Currency, tax, and service charge display:** needs confirmation for correct pricing.
- **Branding:** logo, colors, and fonts not yet provided; design.md proposes a placeholder direction to be swapped later.

## 12. Future Considerations

- Native customer/staff apps
- Multi-branch support with centralized menu management
- Loyalty program, customer accounts, order history
- External POS/KDS or delivery platform integration
- Reservations
- Upsell/recommendation prompts

## 13. Suggested Phased Rollout

1. **Phase 1 (MVP):** QR menu, cart, payment, live order status, admin menu CRUD, kitchen order queue
2. **Phase 2:** Sales reporting, staff roles, Call Staff / Request Bill
3. **Phase 3:** Tipping, refund/reconciliation polish, performance & accessibility hardening
4. **Phase 4 (future):** loyalty, multi-branch, native apps
