# SafeZone - Interactive Safety Mapping Platform

A comprehensive safety mapping platform that provides real-time safety analytics, incident reporting, and location-based safety assessments. Built with React, TypeScript, and Mapbox GL JS.

## Features

### 🗺️ Interactive Safety Map
- Real-time safety zone visualization with color-coded markers
- Dynamic location search with autocomplete functionality
- Current location detection and navigation
- Customizable safety markers with detailed popups

### 📊 Safety Analytics
- Comprehensive safety scoring based on multiple factors:
  - Crime rate analysis
  - Traffic safety assessment
  - Weather conditions monitoring
  - Emergency response time evaluation
  - Street lighting quality assessment
- Real-time safety trend tracking
- Location-specific danger zone identification

### 🚨 Live Safety Alerts
- Location-based safety alerts that update with map position
- Multiple alert severity levels (Info, Warning, Critical)
- Real-time incident notifications

### 📝 Incident Reporting
- User-friendly incident report submission
- Location autocomplete for accurate positioning
- Multiple incident type categorization
- Contact information management

### 🎨 Modern UI/UX
- Responsive design optimized for all devices
- Dark/light theme support
- Intuitive navigation and user interface
- Accessibility-focused components

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Mapping**: Mapbox GL JS
- **UI Components**: Radix UI primitives
- **Forms**: React Hook Form with Zod validation
- **Build Tool**: Vite
- **State Management**: React hooks and context

## Prerequisites

- Node.js 16+ or Bun
- Mapbox account and API token

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd safezone
```

2. Install dependencies:
```bash
npm install
# or
bun install
```

3. Set up environment variables:
Create a `.env` file in the root directory and add your Mapbox token:
```
VITE_MAPBOX_TOKEN=your_mapbox_token_here
```

4. Start the development server:
```bash
npm run dev
# or
bun dev
```

## Configuration

### Mapbox Setup
1. Sign up for a Mapbox account at [mapbox.com](https://www.mapbox.com)
2. Create a new access token
3. Add the token to your environment variables

### Customizing Safety Factors
The safety scoring algorithm can be customized in `src/services/safetyDataService.ts`:
- Adjust factor weights
- Modify scoring thresholds
- Add new safety factors


## API Integration

The application supports integration with various safety data APIs:
- Weather data (OpenWeatherMap)
- Crime statistics
- Traffic information
- Emergency response data


## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Deployment

### Build for Production
```bash
npm run build
# or
bun run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Support

For support and questions, please open an issue in the GitHub repository.

---

**SafeZone** - Making communities safer through data-driven insights and real-time safety monitoring.
