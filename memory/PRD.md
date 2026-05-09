# The Adventures of Arky Allogist Ant - Book Launch Website

## Project Overview
Book launch website for "The Adventures of Arky Allogist Ant" by Poopah (Moises J. Mendoza Sr.)

## Original Problem Statement
Build a website for a seasoned author promoting a children's faith-based illustrated book. Design inspired by luxury brands (Prada/Gucci/LV) with book illustration color palette.

## User Personas
- **Primary**: Families, parents, grandparents looking for faith-based children's books
- **Secondary**: Church communities, schools seeking wholesome content
- **Tertiary**: Friends and family of the author

## Core Requirements (Static)
1. ✅ Book launch landing page with Amazon purchase link
2. ✅ Less than 3 clicks to purchase
3. ✅ Beautiful Open Graph for iPhone sharing (Arky cover image)
4. ✅ NO "Made by Emergent" badge
5. ✅ Browser tab shows "The Adventures of Arky Allogist Ant"
6. ✅ Blue CTA buttons linking to Amazon

## What's Been Implemented (December 2025)

### Core Features
- **Hero Section**: Book cover, "Buy on Amazon" CTA, author attribution
- **About Section**: Book description, illustrations grid, feature highlights
- **Chapters Section**: All 8 chapter previews with descriptions
- **Author Section**: Full bio of Moises J. Mendoza Sr. (Poopah)
- **Dedication Section**: "Crunch Bunch" grandchildren grid with family tribute
- **More Books Section**: Bartemon the Sour Lemon book promotion
- **Contact Section**: LinkedIn DM to Ish, Buy Now CTA

### Special Features
- **Music Player**: Motown YouTube audio at bottom right (starts at 2:41:00)
- **Custom Cursor**: Circle following mouse like showcar.lol
- **Dark Mode Toggle**: Light/dark theme switcher
- **Responsive Navigation**: Mobile menu with all sections

### Links Configured
- Amazon (Arky book): https://www.amazon.com/dp/B0GMZG64QG/
- Amazon (Bartemon): https://www.amazon.com/Bartemon-sour-lemon-finds-his-ebook/dp/B0GMY3D31J
- LinkedIn (Ish): https://www.linkedin.com/in/ishmendoza/
- Charlotte Software Engineering: https://charlottesoftwareengineering.com/

### Design System
- **Fonts**: Playfair Display (headings), Outfit (body), Caveat (accent)
- **Colors**: Warm Bone bg (#FDFBF7), Earth Brown text (#593616), Scientist Blue CTA (#3B8DC4)
- **Style**: "Warm Luxury Storybook" - Prada meets Pixar

## Backend Endpoints
- GET /api/health - Health check
- GET /api/book/info - Book metadata
- POST /api/contact - Contact form (deprecated, using LinkedIn DM)
- POST /api/newsletter/subscribe - Newsletter signup
- POST /api/orders - Book orders

## P0/P1/P2 Features Remaining
- P2: Newsletter integration (email service)
- P2: Bulk order form for churches/schools
- P2: Author events/speaking calendar

## Next Tasks
1. Deploy to production
2. Add actual Amazon analytics tracking
3. Set up custom domain
