# KidCity - Next.js 14 eCommerce Toy Store

A modern, responsive eCommerce toy store built with Next.js 14, inspired by Hamleys. Features a playful design, smooth animations, and comprehensive functionality for selling toys online.

## 🎯 Features

### Core Functionality
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **TailwindCSS** + **shadcn/ui** for beautiful UI components
- **Firebase** integration (Auth, Firestore, Storage)
- **Framer Motion** animations for smooth interactions
- **Responsive design** optimized for all devices

### eCommerce Features
- Product catalog with categories
- Shopping cart functionality
- User authentication
- Search functionality
- Wishlist system
- Product reviews and ratings

### Design & UX
- Playful, colorful design inspired by Hamleys
- Smooth page transitions and micro-interactions
- Optimized images with Next.js Image component
- Mobile-first responsive design
- Accessibility features

### SEO & Performance
- SEO-optimized metadata
- Automatic sitemap generation
- Robots.txt configuration
- Image optimization
- Performance optimizations

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase project

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd kidcity-nextjs-version
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication, Firestore, and Storage
   - Copy your Firebase config

4. **Configure environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Update `.env.local` with your Firebase configuration:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js 14 App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Home page
│   ├── sitemap.ts        # Sitemap generation
│   └── robots.ts         # Robots.txt
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── layout/           # Layout components
│   └── home/             # Home page components
├── contexts/             # React contexts
│   ├── AuthContext.tsx   # Authentication context
│   └── CartContext.tsx   # Shopping cart context
├── lib/                  # Utility functions
│   ├── firebase.ts       # Firebase configuration
│   └── utils.ts          # Helper utilities
└── types/                # TypeScript type definitions
```

## 🎨 Design System

### Colors
- **Primary**: Pink (#ec4899) - Main brand color
- **Secondary**: Purple (#8b5cf6) - Accent color
- **Success**: Green (#10b981) - Success states
- **Warning**: Yellow (#f59e0b) - Warning states
- **Error**: Red (#ef4444) - Error states

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold weights (600-800)
- **Body**: Regular weight (400)
- **Captions**: Medium weight (500)

### Components
All UI components are built with shadcn/ui and customized for the playful toy store theme.

## 🔧 Configuration

### Firebase Setup
1. **Authentication**: Enable Email/Password authentication
2. **Firestore**: Set up collections for products, users, orders
3. **Storage**: Configure for product images

### Tailwind Configuration
The project uses a custom Tailwind configuration with:
- Custom color palette
- Playful animations
- Responsive breakpoints
- Custom utilities

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform

## 🔒 Security

- Environment variables for sensitive data
- Firebase security rules
- Input validation and sanitization
- XSS protection headers
- CSRF protection

## 📈 Performance

- Next.js Image optimization
- Code splitting and lazy loading
- Optimized bundle size
- Efficient re-renders with React contexts
- Cached API responses

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by [Hamleys](https://hamleys.in/) design
- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide React](https://lucide.dev/)
- Images from [Pexels](https://pexels.com/)

## 📞 Support

For support, email support@kidcity.com or join our Discord community.

---

Made with ❤️ for kids everywhere! 🧸