# 🔥 Sizzle Season - Social Cooking Challenge App

A vibrant social cooking challenge app where users join weekly themed cooking challenges, create dinner party groups, submit dishes with photos/videos, and engage with a community-driven culinary feed.

## 📱 About

Sizzle Season is a React Native Expo app that brings people together through food. Each week, users can participate in themed cooking challenges either individually or as part of dinner party groups. The app features a visual-first design with rich media support, real-time engagement, and Instagram integration.

### ✨ Key Features

- **Weekly Themed Challenges**: Join cooking challenges with curated ingredient lists
- **Dinner Party Groups**: Create or join groups to cook together
- **Visual Submissions**: Submit dishes with photos, videos, captions, and tags
- **Community Feed**: Discover and react to other users' culinary creations
- **Challenge Ideas**: Submit and vote on future challenge themes
- **Profile Management**: Track your cooking journey and achievements
- **Instagram Integration**: Share your best dishes to social media
- **Real-time Engagement**: Live notifications, reactions, and comments

## 🎨 Design

- **Primary Color**: #FF6B35 (Vibrant Orange)
- **Accent Color**: #F7931E (Golden Orange)
- **Typography**: Inter family for clean, modern readability
- **Style**: Visual-first with rich media support and community-driven interactions

## 🚀 Getting Started

### Prerequisites

Before running this app, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Expo Go app](https://expo.dev/client) on your mobile device (for testing)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/antsh3k/sizzleseason.git
   cd sizzleseason
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   # or
   yarn expo start
   ```

4. **Run on your device**
   - Scan the QR code with the Expo Go app (Android) or Camera app (iOS)
   - Or press `i` for iOS simulator, `a` for Android emulator

### Development Commands

```bash
# Start development server
npm start

# Start with specific platform
npm run ios      # iOS simulator
npm run android  # Android emulator
npm run web      # Web browser

# Build for production
npm run build

# Type checking
npm run type-check
```

## 📁 Project Structure

```
├── app/                    # App Router pages
│   ├── (tabs)/            # Tab navigation screens
│   │   ├── index.tsx      # Home feed
│   │   ├── challenge.tsx  # Current challenge
│   │   ├── groups.tsx     # Dinner party groups
│   │   ├── ideas.tsx      # Challenge ideas
│   │   └── profile.tsx    # User profile
│   └── _layout.tsx        # Root layout
├── components/            # Reusable UI components
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities and configurations
│   └── blink.ts          # Blink SDK setup
├── assets/               # Images and static files
└── package.json          # Dependencies and scripts
```

## 🛠 Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router (file-based routing)
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Backend**: Blink SDK (Authentication, Database, Storage, AI)
- **State Management**: React hooks and context
- **Media**: Expo Camera and Image Picker
- **Icons**: Expo Vector Icons

## 🔧 Configuration

### Environment Setup

The app uses Blink SDK for backend services. No additional environment configuration is needed as Blink handles authentication, database, and storage automatically.

### Customization

- **Colors**: Update the color palette in `lib/blink.ts` and component styles
- **Fonts**: Modify font families in component styling
- **Features**: Add new screens in the `app/(tabs)/` directory

## 📱 Deployment

### Building for Production

1. **Configure app.json**
   ```bash
   # Update app.json with your app details
   # Set version, bundle identifier, and store assets
   ```

2. **Build for iOS**
   ```bash
   npx expo build:ios
   # or use EAS Build
   npx eas build --platform ios
   ```

3. **Build for Android**
   ```bash
   npx expo build:android
   # or use EAS Build
   npx eas build --platform android
   ```

### App Store Deployment

1. **iOS App Store**
   - Use Expo's build service or Xcode
   - Follow Apple's App Store guidelines
   - Submit through App Store Connect

2. **Google Play Store**
   - Generate signed APK/AAB
   - Follow Google Play policies
   - Upload through Google Play Console

### Web Deployment

```bash
# Build for web
npx expo export:web

# Deploy to hosting service
# (Netlify, Vercel, Firebase Hosting, etc.)
```


## 🆘 Support

- **Documentation**: [Expo Docs](https://docs.expo.dev/)
- **Blink SDK**: [Blink Documentation](https://blink.new/docs)

## 🎯 Roadmap

- [ ] Push notifications for challenge updates
- [ ] Advanced group chat features
- [ ] Recipe sharing and saving
- [ ] Cooking timer integration
- [ ] Achievement system and badges
- [ ] Video streaming for live cooking sessions

