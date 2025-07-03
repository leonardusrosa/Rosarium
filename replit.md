# Rosarium Virginis Mariae - Sacred Digital Sanctuary

## Overview

This is a premium digital Catholic Rosary application inspired by illuminated manuscripts and sacred art. The application provides a reverent, bilingual (Latin & Portuguese) experience for praying the traditional Catholic Rosary using the Montfort method. The design emphasizes sacred typography, celestial aesthetics, and manuscript-style visual elements.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Query (@tanstack/react-query) for server state, local React state for UI
- **Styling**: Tailwind CSS with custom sacred color palette and typography
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Design**: RESTful endpoints under `/api` prefix
- **Data Validation**: Zod schemas for request/response validation
- **Development**: Hot module replacement with Vite integration
- **Error Handling**: Centralized error middleware with structured responses

### Database Layer
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon serverless)
- **Migrations**: Drizzle Kit for schema management
- **Schema Location**: Shared schema definitions in `/shared/schema.ts`

## Key Components

### Sacred Design System
- **Typography**: Custom font stack with Cinzel (display), Crimson Text (body), Cormorant Garamond (Latin), and Inter (UI)
- **Color Palette**: Deep celestial backgrounds with Byzantine gold accents, Marian blue highlights
- **Visual Effects**: Starfield background, twinkling animations, aurora borealis effects
- **Sacred Geometry**: Golden ratio proportions, circular prayer counters inspired by rose windows

### Prayer Navigation
- **Sidebar Navigation**: Illuminated manuscript-style left sidebar with ornate borders
- **Section Structure**: Initium → Gaudiosa → Dolorosa → Gloriosa → Ultima
- **Progress Tracking**: Visual prayer beads showing completion status
- **Interactive Elements**: Clickable beads for direct navigation within mysteries

### Content Management
- **Prayer Data**: Structured rosary content with Latin and Portuguese text
- **Intentions System**: User prayer intentions with local and server storage
- **Progress Persistence**: localStorage for guest users, database for authenticated users

## Data Flow

### Authentication Flow
1. Optional user registration/login system
2. Guest users can use full functionality with localStorage
3. Authenticated users get cloud sync for progress and intentions
4. Session management with localStorage persistence

### Prayer Progress Flow
1. User navigates through rosary sections sequentially
2. Progress tracked per mystery section (Gaudiosa, Dolorosa, Gloriosa)
3. Local storage for immediate persistence
4. Server sync for authenticated users
5. Visual feedback through interactive prayer beads

### Intentions Management
1. Users can add personal prayer intentions
2. Guest mode: stored in localStorage
3. Authenticated mode: stored in database with sync
4. Modal interface for managing intentions list

## External Dependencies

### UI and Styling
- **Radix UI**: Comprehensive set of accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework with custom theme
- **Lucide React**: Icon library for UI elements
- **Font Awesome**: Sacred icons and symbols

### Development Tools
- **Vite**: Build tool with HMR and optimization
- **TypeScript**: Type safety across frontend and backend
- **ESLint/Prettier**: Code quality and formatting (implicit)

### Database and Storage
- **Neon Database**: Serverless PostgreSQL hosting
- **Drizzle ORM**: Type-safe database queries and migrations
- **Connect-pg-simple**: PostgreSQL session store (if sessions needed)

## Deployment Strategy

### Development
- Vite dev server for frontend with proxy to Express backend
- Hot module replacement for rapid development
- TypeScript compilation in watch mode
- Environment variables for database connection

### Production Build
- Frontend: Vite build to `dist/public`
- Backend: ESBuild compilation to `dist/index.js`
- Static file serving from Express in production
- Single deployment artifact with embedded frontend

### Environment Configuration
- `DATABASE_URL` required for PostgreSQL connection
- Development/production mode detection via `NODE_ENV`
- Replit-specific development banner integration

## User Preferences

Preferred communication style: Simple, everyday language.

## Deployment Readiness

### Authentication & Security
- ✅ **Secure Authentication**: PostgreSQL-backed user system with bcrypt password hashing
- ✅ **Session Management**: Frontend localStorage with server-side verification
- ✅ **API Security**: Protected routes with proper error handling
- ✅ **Password Policies**: Strong password verification implemented

### Database & Persistence
- ✅ **PostgreSQL Database**: Fully configured with Neon serverless
- ✅ **Schema Management**: Drizzle ORM with type-safe operations
- ✅ **Data Integrity**: User intentions sync between localStorage (guest) and database (authenticated)
- ✅ **Migration System**: `npm run db:push` for schema updates

### Production Configuration
- ✅ **Environment Variables**: DATABASE_URL, NODE_ENV properly configured
- ✅ **Build System**: Vite frontend + ESBuild backend compilation
- ✅ **Storage Strategy**: Automatic PostgreSQL in production, MemStorage fallback
- ✅ **Error Handling**: Comprehensive API error responses and frontend validation

### Core Features Verified
- ✅ **User Registration**: Secure account creation with unique username validation
- ✅ **User Login**: Authenticated sessions with proper credential verification
- ✅ **Intention Storage**: Real-time sync for authenticated users, localStorage for guests
- ✅ **Prayer Progress**: Local storage with future database sync capability
- ✅ **Sacred UI**: Complete Latin interface with medieval cathedral aesthetic

## Changelog

```
Changelog:
- July 03, 2025. Authentication and database persistence implemented - DEPLOYMENT READY
- July 02, 2025. Initial setup
```