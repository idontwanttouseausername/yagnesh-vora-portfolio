# Portfolio Website - Replit Development Guide

## Overview

This is a modern portfolio website built with React, Express, and PostgreSQL, designed to showcase creative work across multiple disciplines including UX design, photography, videography, and graphic design. The application features a sleek, dark-themed interface with smooth animations and a responsive design.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui components
- **Animations**: Framer Motion for smooth transitions and interactions
- **State Management**: TanStack Query for server state management
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with JSON responses
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Session Management**: Express sessions with PostgreSQL store
- **Build System**: Vite for frontend, esbuild for backend

### Development Setup
- **Bundler**: Vite with React plugin
- **Development Server**: Express with Vite middleware in development
- **Hot Reload**: Vite HMR for frontend, tsx for backend development
- **Type Checking**: TypeScript with strict mode enabled

## Key Components

### Database Schema
The application uses two main tables:
- **Projects**: Stores portfolio items with title, description, category, images, tags, and featured status
- **Messages**: Handles contact form submissions with name, email, project type, and message content

### API Endpoints
- `GET /api/projects` - Retrieve all projects
- `GET /api/projects/category/:category` - Filter projects by category
- `GET /api/projects/featured` - Get featured projects only
- `POST /api/contact` - Submit contact form messages

### UI Components Structure
- **Navigation**: Fixed header with smooth scroll navigation
- **Hero Section**: Animated landing area with floating elements
- **About Section**: Skills showcase with animated progress bars
- **Portfolio Section**: Filterable project gallery with category tabs
- **Contact Section**: Form with validation and toast notifications
- **Footer**: Simple footer with links and branding

### Design System
- **Color Scheme**: Dark theme with gradient accents (navy, purple, coral)
- **Typography**: Inter font family for headings and body text
- **Custom CSS Variables**: Portfolio-specific color palette and gradients
- **Glass Morphism**: Translucent UI elements with backdrop blur effects

## Data Flow

### Frontend Data Management
1. TanStack Query handles all server state with automatic caching
2. React Hook Form manages form state with Zod schema validation
3. Framer Motion provides scroll-triggered animations
4. Custom hooks handle filtering, mobile detection, and scroll animations

### Backend Request Processing
1. Express middleware logs API requests with timing
2. Route handlers validate input using Zod schemas
3. Storage layer abstracts database operations
4. Error handling middleware provides consistent error responses

### Development vs Production
- **Development**: Memory storage for quick prototyping
- **Production**: PostgreSQL with Drizzle ORM for persistence
- **Build Process**: Vite bundles frontend, esbuild compiles backend

## External Dependencies

### Core Libraries
- **@neondatabase/serverless**: PostgreSQL connection for serverless environments
- **drizzle-orm**: Type-safe database ORM with PostgreSQL support
- **@tanstack/react-query**: Server state management and caching
- **framer-motion**: Animation library for React components
- **wouter**: Lightweight client-side routing

### UI Framework
- **@radix-ui/***: Accessible UI primitives for complex components
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **cmdk**: Command palette component

### Development Tools
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundler for production
- **@replit/vite-plugin-***: Replit-specific development plugins

## Deployment Strategy

### Build Process
1. **Frontend**: Vite builds React app to `dist/public`
2. **Backend**: esbuild bundles Express server to `dist/index.js`
3. **Assets**: Static files served from the build output directory

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string (required)
- **NODE_ENV**: Environment mode (development/production)
- **PORT**: Server port configuration

### Production Considerations
- Static file serving through Express in production
- PostgreSQL session store for scalability
- Error handling with graceful degradation
- Database migrations through Drizzle Kit

### Development Workflow
- `npm run dev`: Starts development server with hot reload
- `npm run build`: Creates production build
- `npm run check`: Type checking without compilation
- `npm run db:push`: Push database schema changes

The application is designed to work seamlessly in both Replit's development environment and production deployments, with automatic database provisioning and environment-specific configurations.