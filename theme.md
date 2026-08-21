

Digital Menu & Ordering System — Themes & Typography Specification

Status: Draft v1
Companion to: PRD.md, design.md
Last updated: August 21, 2026
Implementation target: Google Antigravity IDE
Theme: Retro Western Coffeehouse — 1960s–70s

⸻

1. Design Direction

The Digital Menu should not look like a conventional modern restaurant ordering website.

The experience should feel like the customer has opened a beautiful vintage 1960s–70s Western coffeehouse menu, translated into an interactive mobile web experience.

The visual language combines:

* Vintage Western coffeehouse aesthetics
* 1960s–70s graphic design
* Old printed café menus
* Vintage paper
* Subtle wood/café accents
* Screen-print and hand-inked illustration
* Earthy retro colors
* Modern high-quality food photography
* Subtle film/vintage treatment
* Expressive retro typography
* Minimal interface chrome

The objective is:

Make ordering feel like interacting with a physical vintage café menu rather than using a generic food-ordering application.

The interface must remain fast and usable despite the visual richness.

⸻

2. Core Design Principle

The product has one complete visual theme.

There is no theme selector in MVP.

Do not build:

* Theme marketplace
* Theme switching
* User-selectable color palettes
* User-selectable visual styles
* Multiple independent theme presets

The theme is part of the product’s identity.

Typography is also part of the visual identity, but the implementation should keep typography tokens modular so fonts can be changed later without restructuring components.

⸻

3. Experience Overview

The intended customer journey is:

QR SCAN
   ↓
VINTAGE MENU COVER
   ↓
OPEN MENU
   ↓
CATEGORY INDEX
   ↓
SELECT CATEGORY
   ↓
CATEGORY TRANSITION
   ↓
IMMERSIVE DISH VIEW
   ↓
SWIPE BETWEEN DISHES
   ↓
TAP CURRENT DISH
   ↓
DISH TRANSFORMATION
   ↓
CUSTOMIZATION
   ↓
ADD TO CART
   ↓
CHECKOUT

The first experience should feel emotional and visual.

The ordering experience must subsequently become clear and functional.

⸻

4. Visual Theme

Theme Name

Retro Coffeehouse

Alternative internal identifier:

retro-coffeehouse

Theme Personality

Keywords:

nostalgic
warm
earthy
handcrafted
retro
cozy
playful
editorial
coffeehouse
slightly groovy

Avoid:

corporate
sterile
ultra-minimal
neon
futuristic
glassmorphism
generic SaaS
excessive gradients
modern e-commerce card grids

⸻

5. Color System

The primary palette should be earthy and inspired by 1960s–70s Western coffeehouses.

5.1 Primary Palette

Coffee Brown

Name: Coffee Brown
HEX: #5A3825
Role:
- Primary headings
- Strong borders
- Primary illustrations
- Navigation emphasis
- Dark text on light surfaces

Deep Coffee

Name: Deep Coffee
HEX: #352319
Role:
- Strongest text
- Header/footer elements
- High-emphasis typography
- Dark decorative elements

Cream Paper

Name: Cream Paper
HEX: #F4E7CF
Role:
- Main page background
- Menu pages
- Large surfaces

Warm Ivory

Name: Warm Ivory
HEX: #FFF7E8
Role:
- Content surfaces
- Dish presentation surfaces
- Ordering interface

Olive

Name: Retro Olive
HEX: #667044
Role:
- Secondary accent
- Category highlights
- Decorative illustrations
- Selected states

Mustard

Name: Vintage Mustard
HEX: #C49A32
Role:
- Accent
- Price labels
- Decorative details
- Selected category indicators

Burnt Orange

Name: Burnt Orange
HEX: #B85D32
Role:
- Secondary accent
- Important visual details
- Food category accents
- Interactive emphasis

Muted Terracotta

Name: Muted Terracotta
HEX: #9B5038
Role:
- Secondary illustration color
- Decorative elements
- Optional status accents

⸻

6. Color Usage Rules

The palette must not be used as eight competing colors.

Use a hierarchy.

Recommended approximate visual balance:

Cream / Ivory       55–65%
Brown               15–20%
Olive                8–12%
Mustard              5–8%
Burnt Orange         3–6%
Terracotta           2–5%

The interface should feel paper-first, not colorful-app-first.

Avoid using mustard or orange for large areas.

Accent colors should feel like printed ink, not digital neon.

⸻

7. Texture System

Texture is important to the theme, but must remain subtle.

7.1 Paper Texture

The main menu surface may include:

* Fine paper grain
* Slight noise
* Very subtle fiber texture
* Slightly uneven paper coloration

Texture opacity should remain low.

The user should perceive:

“old printed paper”

not:

“noisy background.”

7.2 Wood Texture

Wood should appear as a secondary environmental accent, not the primary page background.

Possible uses:

* Menu edges
* Transition surfaces
* Decorative frames
* Bottom sections
* Menu cover
* Behind the menu booklet

Avoid using heavy wood texture behind every component.

⸻

8. Illustration System

The visual illustration style is:

1960s–70s Western coffeehouse screen-print + hand-inked illustration.

Illustrations should look slightly imperfect.

Preferred characteristics:

* Limited color palette
* Ink outlines
* Slight printing imperfections
* Organic curves
* Vintage poster shapes
* Hand-drawn details
* Simple geometric motifs
* Botanical elements
* Coffee-related illustrations

Potential decorative illustrations:

coffee beans
coffee cups
coffee pots
leaves
flowers
sunbursts
stars
steam
plates
forks
spoons
retro badges
small banners
ornamental borders
coffeehouse signage

Do not overload every screen with illustrations.

Decorations should frame the content.

⸻

9. Food Photography

Real food photography should be used.

Food photography is more important than illustrations for communicating the actual product.

Photography Style

Use:

* High-quality food photography
* Natural-looking food
* Appetizing presentation
* Warm lighting
* Soft shadows
* Slightly warm color grading
* Subtle film grain
* Mildly muted saturation

Avoid:

* Heavy filters
* Excessive sepia
* Low-resolution photographs
* Artificial-looking AI food
* Overly dark food
* Excessive background clutter

The food should remain visually accurate and appetizing.

⸻

10. Dish-Specific Presentation Objects

Do not force every menu item into the same card.

Each category may have a visual object appropriate to the dish.

Examples:

Category	Presentation Object
Coffee	Coffee cup
Tea	Tea cup / teapot
Cold Drinks	Vintage glass
Milkshake	Tall retro glass
Dessert	Ceramic plate
Cake	Dessert plate
Burger	Diner tray
Sandwich	Café plate
Pizza	Wooden serving board
Pasta	Ceramic bowl
Breakfast	Breakfast plate
Bakery	Bakery paper / tray

The object is part of the interaction design.

⸻

11. Dish Object + Food Image

The visual hierarchy should be:

Presentation Object
        ↓
Real Food Photography
        ↓
Dish Name
        ↓
Price

The food image should remain the hero.

The vintage object should frame or contextualize the food rather than obscure it.

⸻

12. Price Treatment

Prices should feel physically integrated into the menu.

Do not use one universal price component for every dish.

Use context-appropriate treatments.

Examples:

Coffee

Price printed on a small vintage label attached to the cup.

Dessert

Price shown on a small printed ticket beside the plate.

Burger

Price displayed on a retro diner-style tag.

Pizza

Price printed on a small paper label attached to the serving board.

Drinks

Price can appear on a small label around the glass.

The price must remain clearly readable and accessible.

Decorative styling must never reduce legibility.

⸻

13. Opening Experience

When the customer scans the QR code, the first screen should NOT immediately display a standard food grid.

It should feel like opening a vintage menu.

Stage 1 — Menu Cover

Show a vintage menu cover.

Possible content:

THE COFFEE HOUSE
EST. 1974
GOOD COFFEE
GOOD COMPANY

The exact copy should be configurable.

The cover may contain:

* Cafe logo
* Cafe name
* Small vintage illustration
* Decorative border
* Established year
* Small coffeehouse tagline

⸻

14. Menu Opening Animation

The menu should appear to physically open.

Animation style:

Cinematic but fast.

Target:

~0.5–1.0 seconds

Animation should include subtle:

* Page movement
* Depth
* Shadow
* Paper movement
* Slight perspective
* Layered page transition

Avoid:

* Long intro animations
* Heavy 3D effects
* Loading screens disguised as animations
* Animation blocking the customer for multiple seconds

Respect:

prefers-reduced-motion

When reduced motion is enabled, replace the page-flip animation with a short fade/slide transition.

⸻

15. Category Index

After opening, display the full menu category listing.

Example:

THE MENU
COFFEE
TEA
BREAKFAST
SANDWICHES
BAKERY
DESSERTS
COLD DRINKS

The category page should visually resemble a printed vintage menu.

Do not use conventional modern pill buttons.

Category entries may use:

* Vintage typography
* Small illustrations
* Decorative rules
* Dotted leaders
* Hand-drawn ornaments
* Small category icons

Example visual structure:

COFFEE ................. ☕
TEA .................... 🍵
BREAKFAST .............. 🍳
SANDWICHES ............. 🥪
BAKERY ................. 🥐
DESSERTS ............... 🍰

The actual implementation should use accessible buttons/links rather than decorative text.

⸻

16. Category Transition

When the customer selects a category:

CATEGORY INDEX
      ↓
TRANSITION
      ↓
CATEGORY EXPERIENCE

Example:

COFFEE

The category should visually establish itself before the first item appears.

Possible transition:

COFFEE
      ↓
coffee illustration
      ↓
first cup appears

Keep the transition short.

Target:

300–700ms

⸻

17. Dish Browsing Experience

The selected category uses a horizontal immersive carousel.

V1 behavior:

Large current item + partial preview of next item.

The customer should immediately understand that another item exists.

Example:

┌─────────────────────────────┐
│                             │
│        CAPPUCCINO           │
│                             │
│          [ CUP ]            │
│                             │
│             ₹180            │
│                             │
│                    [LATTE]  │
└─────────────────────────────┘

The next item should be partially visible.

⸻

18. Swipe Interaction

Support:

* Touch swipe
* Mouse drag where appropriate
* Keyboard navigation for desktop accessibility

Swipe direction:

← Previous
→ Next

The carousel must have:

* Snap positioning
* Smooth movement
* No accidental vertical scrolling
* Accessible focus behavior

Do not make the swipe gesture mandatory.

Provide visible navigation controls where appropriate.

⸻

19. Dish Browsing Typography

Main browsing screen should use minimal information.

Preferred:

CAPPUCCINO
₹180

Optional tiny supporting label:

POPULAR

Avoid displaying the full description on the main browsing state.

The user gets more information after selecting the item.

Principle:

Browse visually. Order functionally.

⸻

20. Dish Selection

When the customer taps the active dish, the dish should not open a generic modal.

The physical/illustrated object should transform into the ordering interface.

Example:

Coffee Cup
    ↓
Cup enlarges
    ↓
Cup transitions/opening animation
    ↓
Dish details appear
    ↓
Customization controls appear

This is a signature interaction and should be treated as a core product experience.

⸻

21. Dish Detail State

After transformation:

CAPPUCCINO
Classic espresso with steamed milk.
SIZE
Small     Regular     Large
ADD-ONS
Extra Shot
Oat Milk
Vanilla
QUANTITY
−   1   +
[ ADD TO CART ]

The exact fields come from the existing menu data model.

Do not hard-code product-specific options into the UI.

⸻

22. Transformation Animation

The transformation should visually connect the browse state to the order state.

Example:

Dish object
    ↓
Scale
    ↓
Reposition
    ↓
Reveal detail
    ↓
Reveal customization

Avoid abruptly replacing the screen.

The customer should understand:

“I tapped the coffee and now I’m interacting with that coffee.”

Target duration:

400–700ms

Again respect prefers-reduced-motion.

⸻

23. Typography Philosophy

Typography should combine several historical influences.

Use different roles rather than one font for the entire application.

Required roles:

1. Display / Hero
2. Dish Name
3. Body / Description
4. Price
5. Navigation
6. Decorative / Handwritten

⸻

24. Typography Direction

The typography should feel:

retro
warm
editorial
handcrafted
slightly groovy
readable

Avoid:

* Generic modern sans-serif everywhere
* Excessive futuristic fonts
* Extremely decorative body fonts
* Hard-to-read script fonts
* Using more than necessary font families

⸻

25. Recommended Font Strategy

Use free/open-source fonts initially.

The system should be designed so custom or premium fonts can be added later.

Recommended source:

Google Fonts

Fonts should preferably be self-hosted in production where practical to improve performance and reduce external dependency.

⸻

26. Recommended Typography Stack

Display Font

Recommended candidates:

Cooper Black

If licensing/self-hosting is not appropriate, use a similar freely licensed retro display alternative.

Possible alternatives:

Fraunces
Ribeye
Bowlby One SC
Modak
Shrikhand

The display font should be used sparingly.

⸻

27. Dish Name Font

Recommended direction:

Classic serif.

Candidates:

Lora
Libre Baskerville
Cormorant Garamond
Playfair Display

Preferred starting choice:

Lora

Reason:

It retains an editorial printed-menu character while remaining highly readable.

⸻

28. Body Font

Body text should prioritize readability.

Recommended:

DM Sans
Inter
Source Sans 3
Nunito Sans

Preferred starting choice:

DM Sans

Use for:

* Descriptions
* Forms
* Buttons
* Supporting text
* Checkout
* Order information
* Admin interface

⸻

29. Price Typography

Prices should be highly visible.

Recommended:

Lora SemiBold

or:

DM Sans Bold

depending on the component.

Prices should not use decorative script fonts.

Example:

₹180

should be readable immediately.

⸻

30. Decorative Typography

A handwritten font may be used for:

* Small labels
* “Freshly brewed”
* “Chef’s choice”
* “Since 1974”
* Tiny decorative notes
* Promotional stamps

Never use decorative handwriting for:

* Prices
* Long descriptions
* Checkout controls
* Important instructions
* Accessibility-critical information

Potential candidates:

Caveat
Patrick Hand
Kalam
Permanent Marker

Use extremely sparingly.

⸻

31. Typography Pairing

Initial recommended pairing:

Display:
Fraunces / retro display alternative
Dish Names:
Lora
Body:
DM Sans
Decorative:
Caveat

The system should allow these roles to be replaced independently.

Do not hard-code font families directly throughout components.

⸻

32. Typography Tokens

Create semantic typography tokens.

Example:

--font-display:
--font-heading:
--font-body:
--font-price:
--font-accent:

Example initial mapping:

--font-display: "Fraunces", serif;
--font-heading: "Lora", serif;
--font-body: "DM Sans", sans-serif;
--font-price: "Lora", serif;
--font-accent: "Caveat", cursive;

These values should be centralized.

⸻

33. Font Weights

Use a restrained weight system.

Recommended:

Regular: 400
Medium: 500
SemiBold: 600
Bold: 700

Avoid excessive use of 800/900 weights unless specifically required by a display font.

⸻

34. Type Scale

The mobile customer experience should remain readable.

Suggested scale:

Hero / Cover:
36–48px
Category Heading:
28–36px
Dish Name:
28–34px
Price:
20–26px
Body:
15–17px
Secondary:
13–14px
Decorative:
14–20px

These are starting values, not rigid requirements.

Antigravity should adjust the actual values during implementation based on responsive testing.

⸻

35. Mobile Typography

The QR menu is primarily mobile-first.

Typography must work comfortably at:

320px
375px
390px
414px
430px

Do not allow:

* Text clipping
* Horizontal overflow
* Tiny prices
* Long dish names breaking the visual composition
* Decorative fonts becoming unreadable

Long names should wrap gracefully.

⸻

36. Accessibility

The visual theme must not compromise accessibility.

Requirements from the PRD remain mandatory.

Minimum requirements:

* Sufficient color contrast
* Readable font sizes
* Accessible interactive controls
* Alt text for food images
* Keyboard accessibility where applicable
* Screen-reader labels
* Visible focus states
* Reduced-motion support

Decorative textures must not reduce text contrast.

⸻

37. Motion System

Motion should feel like physical paper and objects, not a technology demo.

Preferred:

ease-out
ease-in-out
soft spring-like movement
subtle scale
subtle depth

Avoid:

large bounces
excessive parallax
continuous animations
long delays
flashy transitions

Recommended durations:

Micro interaction:
150–250ms
Category transition:
300–500ms
Menu opening:
500–1000ms
Dish transition:
300–500ms
Dish → ordering transformation:
400–700ms

⸻

38. Responsive Behavior

The experience must be mobile-first.

Primary target:

Phone portrait

Secondary:

Tablet
Desktop browser

On desktop, do not simply stretch the mobile experience across the entire viewport.

Maintain a comfortable menu reading width.

The visual experience should feel like a menu, not a full-width dashboard.

⸻

39. Customer UI vs Admin UI

The retro theme applies strongly to the customer-facing menu.

The Admin Dashboard does NOT need to replicate the vintage visual treatment.

Admin should prioritize:

* Clarity
* Speed
* Data density
* Usability
* Accessibility

The customer menu should prioritize:

* Experience
* Visual identity
* Food presentation
* Discoverability

Kitchen/Floor Queue should prioritize:

* Speed
* Readability
* High visibility
* Real-time status

Do not force the same decorative UI onto all three surfaces.

⸻

40. Component Architecture

Antigravity implementation should separate content, components, and theme tokens.

Recommended conceptual structure:

src/
├── components/
│   ├── menu/
│   │   ├── MenuCover
│   │   ├── MenuBook
│   │   ├── CategoryIndex
│   │   ├── CategoryTransition
│   │   ├── DishCarousel
│   │   ├── DishObject
│   │   ├── DishPhoto
│   │   ├── DishPrice
│   │   ├── DishDetail
│   │   └── AddToCart
│   │
│   ├── cart/
│   └── checkout/
│
├── theme/
│   ├── colors
│   ├── typography
│   ├── spacing
│   ├── motion
│   └── texture
│
├── data/
│   └── menu
│
└── assets/
    ├── food/
    ├── illustrations/
    ├── textures/
    └── fonts/

The exact framework structure may differ depending on the implementation chosen in the existing project.

⸻

41. Design Token Architecture

Create centralized semantic tokens.

Example:

:root {
  /* Colors */
  --color-paper: #F4E7CF;
  --color-ivory: #FFF7E8;
  --color-coffee: #5A3825;
  --color-deep-coffee: #352319;
  --color-olive: #667044;
  --color-mustard: #C49A32;
  --color-burnt-orange: #B85D32;
  --color-terracotta: #9B5038;
  /* Typography */
  --font-display: "Fraunces", serif;
  --font-heading: "Lora", serif;
  --font-body: "DM Sans", sans-serif;
  --font-price: "Lora", serif;
  --font-accent: "Caveat", cursive;
  /* Motion */
  --motion-fast: 200ms;
  --motion-normal: 400ms;
  --motion-slow: 700ms;
}

Do not scatter raw color values throughout components.

⸻

42. Menu Data Must Remain Theme-Agnostic

The menu data should not contain visual styling.

Example:

{
  "id": "coffee-cappuccino",
  "category": "coffee",
  "name": "Cappuccino",
  "description": "Classic espresso with steamed milk.",
  "price": 180,
  "image": "/food/cappuccino.webp",
  "presentationType": "cup",
  "variants": []
}

The presentationType may determine the appropriate visual container.

Example:

cup
plate
bowl
tray
board
glass

But color, typography, spacing, animation, and styling belong to the theme/components.

⸻

43. Dish Presentation Architecture

Create a reusable presentation system.

Conceptually:

Dish
 ↓
Presentation Resolver
 ↓
Cup / Plate / Bowl / Tray / Glass / Board
 ↓
Food Image
 ↓
Dish Metadata
 ↓
Price Treatment

This allows the same ordering system to support many food types without creating separate menu implementations.

⸻

44. Interaction State Model

The customer menu should have explicit states.

COVER
MENU_OPENING
CATEGORY_INDEX
CATEGORY_TRANSITION
CATEGORY_BROWSING
DISH_SELECTED
DISH_CUSTOMIZING
ADDED_TO_CART

Avoid implementing the experience as unrelated animations.

Each animation should correspond to a meaningful UI state.

⸻

45. Performance Rules

The visual experience must not violate the PRD’s performance target.

Menu should load in under approximately:

2 seconds

on typical mobile data.

Therefore:

* Optimize food images
* Prefer WebP/AVIF where supported
* Lazy-load non-visible dishes
* Preload the next carousel image
* Avoid loading every high-resolution image immediately
* Compress textures
* Avoid huge background images
* Avoid unnecessary animation libraries

For the carousel:

Current image → loaded
Next image → preload
Remaining images → lazy load

⸻

46. Image Requirements

Food images should have consistent presentation quality.

Recommended:

Aspect ratio:
Flexible by dish
Resolution:
Sufficient for modern mobile screens
Format:
WebP or AVIF preferred
Background:
Prefer clean backgrounds when cut-out treatment is required

Do not automatically crop every food item into the same square if doing so damages the presentation.

⸻

47. Desktop Adaptation

The core interaction remains the same.

However, desktop can provide:

* Larger menu booklet
* Visible previous/next controls
* Larger food presentation
* More breathing room

Do not turn the customer menu into a conventional desktop grid.

The immersive menu identity should remain intact.

⸻

48. Do Not Build These in V1

Do not implement:

* Theme selector
* Color customization
* Font customization UI
* Theme marketplace
* Multiple visual themes
* User-created themes
* Heavy 3D WebGL effects
* Full-screen video backgrounds
* Excessive animation
* Auto-playing sound
* Forced music
* Long intro animations

The visual system is intentionally fixed.

⸻

49. Future-Proofing

Although V1 has one fixed theme, architecture should allow future themes.

Components should consume semantic tokens:

color.paper
color.primary
color.accent
font.display
font.heading
font.body
motion.categoryTransition

rather than hardcoded values.

This means a future theme can be added by replacing token values rather than rewriting components.

Do not build the theme selector yet.

⸻

50. Implementation Priority

Antigravity should implement the experience in this order:

Phase 1 — Foundation

* Theme tokens
* Typography
* Base surfaces
* Paper texture
* Responsive layout
* Basic menu components

Phase 2 — Menu Opening

* Menu cover
* Booklet structure
* Opening animation
* Category index

Phase 3 — Category Experience

* Category transition
* Dish carousel
* Next-item preview
* Swipe interaction
* Dish photography

Phase 4 — Dish Interaction

* Tap interaction
* Dish object transformation
* Detail state
* Variants
* Add-ons
* Quantity

Phase 5 — Ordering

* Cart
* Checkout
* Payment integration
* Order status

Phase 6 — Polish

* Motion refinement
* Accessibility
* Image optimization
* Responsive testing
* Reduced-motion behavior
* Performance optimization

⸻

51. Acceptance Criteria

The implementation is visually successful when:

* The first screen immediately feels like a vintage coffeehouse menu.
* The customer understands how to open the menu.
* The menu-opening animation feels physical but finishes quickly.
* Category listing looks like an old printed menu.
* Selecting Coffee creates a noticeable transition into the coffee experience.
* The current coffee is visually dominant.
* The next coffee is partially visible.
* Swipe navigation feels natural.
* Real food photography remains the visual hero.
* Food presentation objects change appropriately by dish.
* Prices feel integrated into the physical menu aesthetic.
* Browsing remains minimal and uncluttered.
* Tapping a dish produces a meaningful transformation instead of a generic modal.
* Customization remains clear and usable.
* The vintage style never interferes with ordering.
* Text remains readable.
* The experience works on common mobile screen sizes.
* Reduced-motion users receive an equivalent non-animated experience.
* The implementation remains performant on mobile networks.

⸻

52. Design Mantra

The entire customer experience should follow these principles:

Open the menu.

Explore the café.

See the food.

Touch the dish.

Make it yours.

Order.

The technology should disappear behind the experience.

The customer should feel like they are interacting with a living vintage café menu, not operating a web application.

⸻

53. Final Visual Summary

ERA
1960s–70s Western Coffeehouse
STYLE
Vintage + Illustrated + Editorial
PALETTE
Coffee Brown
Cream
Olive
Mustard
Burnt Orange
Terracotta
SURFACE
Vintage Paper
+
Subtle Wood/Café Accents
TYPOGRAPHY
Retro Display
+
Classic Serif
+
Readable Sans
+
Handwritten Accent
PHOTOGRAPHY
Real Food
+
Modern Professional Quality
+
Subtle Vintage Treatment
OPENING
Vintage Menu Booklet
CATEGORY
Printed Menu Index
DISH EXPERIENCE
Large Food Object
+
Real Food Photography
+
Next Item Preview
NAVIGATION
Horizontal Swipe
SELECTION
Tap Dish
TRANSITION
Physical Object → Ordering Interface
BROWSING
Minimal Text
ORDERING
Clear + Functional
THEME
Fixed
CUSTOMIZATION
No Theme Customization in V1

⸻

Implementation note for Google Antigravity: Treat this document together with PRD.md and design.md as the source of truth for the customer-facing visual experience. Do not invent a generic restaurant UI when implementing unspecified details. When a detail is not explicitly defined, preserve the retro coffeehouse design language, prioritize usability and performance, and avoid introducing modern SaaS visual patterns that conflict with the established direction.