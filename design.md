# Digital Menu & Ordering System — Design Document

**Status:** Draft v1
**Companion to:** PRD.md
**Last updated:** August 21, 2026

---

## 1. Architecture Overview

Three surfaces share one backend:

1. **Customer Web App** — mobile-first, opened via QR scan, no install
2. **Admin Dashboard** — desktop-first, menu/table/staff management, reporting
3. **Kitchen/Floor Order Queue** — real-time order view, could later map to a dedicated screen

```
[Customer Phone] --HTTPS--> [Backend API] <--HTTPS-- [Admin Dashboard]
                                  |
                 -----------------------------------
                 |             |             |
            [Database]   [Payment       [Image/File
                           Gateway]       Storage]
                                  |
                        [Realtime layer: WebSocket]
                                  |
                     [Kitchen/Floor Order Queue View]
```

## 2. System Components

- **Customer PWA** — reads menu via API, holds cart in local state, checks out via payment gateway SDK, subscribes to order-status updates.
- **Admin Dashboard** — auth-gated web app; CRUD for menu, tables, staff; order queue; reporting.
- **Backend API** — serves menu/order/table data, handles auth, processes payment webhooks.
- **Database** — relational store for menu, orders, tables, staff, payments.
- **Real-time layer** — pushes new orders to the kitchen view and status updates to the customer.
- **Payment Gateway** — pluggable; handles PCI compliance and tokenized payments.
- **Image Storage** — hosts menu item photos.
- **QR Generation** — server-generated per table, encoding a URL like `https://menu.[cafe-domain]/t/{tableId}`.

## 3. Data Model

**Category** — id, name, sort_order, active

**MenuItem** — id, category_id, name, description, price, image_url, is_available, tags (veg/allergen), sort_order

**ItemVariant** — id, menu_item_id, name (e.g. "Large", "Oat Milk"), price_delta

**Table** — id, label, qr_code_url, active

**Order** — id, table_id, status (received/preparing/ready/served/paid), customer_name (optional), created_at, total_amount, payment_status

**OrderItem** — id, order_id, menu_item_id, selected_variants, quantity, unit_price, notes

**Payment** — id, order_id, gateway_transaction_id, amount, status, method

**StaffUser** — id, name, email, role (admin/kitchen/floor), password_hash

> Note: entities are scoped so a `cafe_id`/location field can be added later without a schema rewrite, even though MVP is single-location.

## 4. Key User Flows

### 4.1 Customer ordering
1. Scan table QR → menu loads pre-linked to that table's ID, no login.
2. Browse categories → select item → choose variants/add-ons → add to cart.
3. Review cart → checkout → optional name → pay via gateway.
4. On payment success, order is created and pushed instantly to the kitchen queue.
5. Customer sees a live status screen, updated via WebSocket.
6. "Call Staff" / "Request Bill" available at any point — sends a real-time alert with the table number.

### 4.2 Kitchen/floor
1. New order appears instantly on the queue, grouped by table, with items and customizations.
2. Staff update status: Preparing → Ready.
3. Floor staff mark Served once delivered, and clear Call Staff / Bill alerts.

### 4.3 Admin
1. Log in with role-based access.
2. **Menu tab:** add/edit items, categories, prices, photos, toggle availability — changes go live immediately.
3. **Tables tab:** add/remove tables, download/print QR codes.
4. **Orders tab:** live + historical orders, filterable by status/date.
5. **Reports tab:** daily sales, top items, revenue trends.
6. **Staff tab:** manage accounts and roles.

## 5. API Design (representative)

- `GET /api/menu?table={tableId}` — fetch active menu
- `POST /api/orders` — create order
- `GET /api/orders/:id/status` — order status
- `PATCH /api/orders/:id` — staff updates status
- `POST /api/payments/webhook` — payment gateway callback
- `CRUD /api/admin/menu-items`, `/api/admin/categories`, `/api/admin/tables`, `/api/admin/staff`
- `GET /api/admin/reports/sales`
- WebSocket channels: `order:new`, `order:status`, `table:call-staff`

## 6. Real-Time Updates

WebSocket connection (e.g. Socket.IO) between backend and both the customer app (subscribed to their order) and the kitchen/admin view (subscribed to the cafe-wide order feed). Falls back to short-interval polling (5–10s) if WebSockets are blocked on the customer's network.

## 7. Payment Handling

- Use the gateway's hosted checkout / client SDK so card data never touches our servers (PCI SAQ-A scope).
- Order is marked "paid" only after the gateway's webhook confirms success, not on client-side confirmation alone, to avoid race conditions.
- Support cards plus at least one popular local payment method — exact set depends on the gateway/region chosen (see PRD open questions).

## 8. Proposed Tech Stack

| Layer | Recommendation |
|---|---|
| Frontend (customer + admin) | React + Tailwind CSS, mobile-first |
| Backend | Node.js (Express/Fastify) REST API |
| Database | PostgreSQL |
| Real-time | Socket.IO / WebSockets |
| Image storage | S3-compatible object storage |
| Hosting | Frontend on Vercel/Netlify; backend + DB on Render/Railway/AWS |
| Payment | Stripe or a regional equivalent, TBD by cafe's country |

This is a starting recommendation, not a hard constraint — adjust to your team's existing skills.

## 9. Security Considerations

- Passwords hashed (bcrypt) or delegated to a managed auth provider; role-based access control for staff.
- Rate-limiting on public menu/order endpoints.
- HTTPS everywhere.
- No sensitive payment data stored directly.
- Table sessions scoped so one table can't see or modify another table's order.

## 10. UX Notes (customer app)

- Mobile-first, thumb-friendly tap targets, minimal steps from scan to order.
- Clear visual cue for sold-out items (greyed out, non-tappable).
- Sticky cart/checkout button while browsing.
- High-contrast, legible type for varied indoor lighting.
- Placeholder visual direction: warm, appetite-friendly neutrals plus one accent color — swap in real branding (logo, colors, fonts) once available.

## 11. Scalability & Future-Proofing

- Data model leaves room for a `cafe_id` field to support multi-branch later without a rewrite.
- Payment integration is modular, so gateways can be swapped or added.
- Kitchen queue is a separate route/component, making it straightforward to later target a dedicated kitchen display device.
