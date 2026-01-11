# ZEVARAZ CMS Implementation Plan

## Overview
Building a comprehensive Content Management System for ZEVARAZ jewellery website that allows non-technical users to manage all website content without coding knowledge.

## Architecture

### 1. Database Schema (Prisma)
New models needed for jewellery CMS:

#### Content Models
- **Page** - Manage all pages (Home, About, Contact, Collections, etc.)
- **Section** - Individual sections within pages
- **Hero** - Hero banners with images and text
- **Collection** - Jewellery collections (Bridal, Fine, Heritage)
- **Product** - Individual jewellery pieces
- **Media** - Image library management
- **SEO** - SEO metadata for all pages
- **Settings** - Global site settings

#### Admin Models
- **User** - Admin users with roles
- **ActivityLog** - Track all content changes

### 2. Admin Panel Features

#### Dashboard
- Quick stats (pages, products, collections)
- Recent activity
- Quick actions

#### Page Management
- List all pages
- Edit page content (WYSIWYG editor)
- Manage sections per page
- Add/remove/reorder sections
- SEO settings per page

#### Section Management
- Hero sections (image + text overlay)
- Text sections (headings, paragraphs)
- Image galleries
- Collection grids
- CTA sections
- Custom HTML sections

#### Media Library
- Upload images
- Organize in folders
- Search and filter
- Replace images
- Delete unused images
- Image optimization

#### Collection Management
- Create/edit/delete collections
- Add products to collections
- Reorder products
- Set featured collections

#### Product Management  
- Add/edit/delete products
- Multiple images per product
- Product details (name, description, price, etc.)
- Categories and tags
- Stock management

#### Settings
- Site name and logo
- Contact information
- Social media links
- Footer content
- Navigation menu
- Color scheme
- Typography

### 3. Technology Stack

#### Backend
- **Database**: PostgreSQL (existing)
- **ORM**: Prisma
- **API**: Next.js API routes
- **File Upload**: Uploadthing or AWS S3
- **Authentication**: NextAuth.js

#### Frontend (Admin Panel)
- **Framework**: Next.js 14+ (App Router)
- **UI Library**: shadcn/ui + Tailwind CSS
- **Forms**: React Hook Form + Zod validation
- **Rich Text Editor**: Tiptap or Lexical
- **Drag & Drop**: dnd-kit
- **Image Upload**: react-dropzone

#### Frontend (Public Site)
- Dynamic content fetching from database
- Static generation where possible
- Image optimization with Next.js Image

### 4. Implementation Phases

#### Phase 1: Database & Auth (Week 1)
- Create new Prisma schema for CMS
- Set up authentication
- Create admin user management

#### Phase 2: Core Admin UI (Week 1-2)
- Build admin layout and navigation
- Create dashboard
- Implement media library

#### Phase 3: Content Management (Week 2-3)
- Page management interface
- Section builder with drag-drop
- WYSIWYG editor integration
- SEO management

#### Phase 4: Jewellery-Specific Features (Week 3-4)
- Collection management
- Product management
- Image galleries
- Category management

#### Phase 5: Settings & Polish (Week 4)
- Global settings interface
- Activity logging
- User roles and permissions
- Testing and bug fixes

### 5. Key Features

#### Visual Page Builder
- Drag-and-drop section reordering
- Live preview
- Pre-built section templates
- Custom section creation

#### Media Management
- Bulk upload
- Image editing (crop, resize)
- Alt text management
- Automatic optimization
- CDN integration

#### SEO Tools
- Meta title/description
- Open Graph tags
- Structured data
- Sitemap generation
- Robots.txt management

#### User Roles
- **Super Admin**: Full access
- **Admin**: Content management
- **Editor**: Edit existing content
- **Viewer**: Read-only access

### 6. Security
- Role-based access control
- CSRF protection
- Input sanitization
- SQL injection prevention (Prisma)
- File upload validation
- Rate limiting

### 7. Performance
- Image optimization and lazy loading
- Static page generation
- Database query optimization
- Caching strategy
- CDN for media files

## Next Steps

1. Get approval for implementation approach
2. Set up new database schema
3. Build authentication system
4. Create admin panel foundation
5. Implement content management features
6. Test with real content
7. Train admin users
8. Deploy to production

## Estimated Timeline
- **Full Implementation**: 3-4 weeks
- **MVP (Basic CMS)**: 1-2 weeks
- **Testing & Refinement**: 1 week

## Questions to Address
1. Hosting preference for images (S3, Cloudinary, local)?
2. Number of admin users needed?
3. Multi-language support required?
4. E-commerce features needed (shopping cart, checkout)?
5. Blog/news section required?
