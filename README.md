# HFAM Car Rental System

A mesmerizing, premium-looking car rental system UI built with pure HTML, CSS, and JavaScript. Features a modern glassmorphism design with Amazon-inspired orange accents, smooth animations, and a fully responsive layout.

## Features

- **Modern UI/UX**: Dark glassmorphism theme with neon accents and smooth micro-interactions
- **Fully Responsive**: Mobile-first design that works seamlessly on all devices
- **Multiple Views**:
  - Dashboard with hero section, search panel, and featured cars carousel
  - Browse Cars with advanced filtering and sorting
  - Car Details modal with comprehensive specifications
  - Booking Flow with 3-step stepper (Dates & Location → Driver Info → Review & Confirm)
  - My Bookings with receipt generation
  - Admin Dashboard for managing the fleet
- **Interactive Components**:
  - Theme toggle (Dark/Light mode)
  - Toast notifications
  - Modal system with keyboard navigation
  - Loading skeletons
  - Animated carousel
- **Local Data Storage**: Uses localStorage to persist bookings
- **Accessibility**: Keyboard navigable, focus outlines, good contrast ratios

## Project Structure

```
Car-Rental-System/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # All styles (glassmorphism, animations, responsive)
├── js/
│   ├── data.js         # Mock data and data management functions
│   ├── ui.js           # UI components (toasts, modals, car cards, theme)
│   ├── booking.js      # Booking flow logic and stepper
│   └── app.js          # Main application logic and view management
└── README.md           # This file
```

## How to Run Locally

### Option 1: Direct File Opening (Simplest)

1. **Download/Clone** the project to your local machine
2. **Navigate** to the project directory
3. **Open** `index.html` in your web browser
   - Double-click the file, or
   - Right-click → Open with → Your preferred browser

That's it! The application will run completely offline with no build process or server required.

### Option 2: Using a Local Server (Recommended for Development)

If you prefer to use a local server (useful for testing certain features):

#### Using Python:
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Then open `http://localhost:8000` in your browser.

#### Using Node.js (http-server):
```bash
# Install globally
npm install -g http-server

# Run in project directory
http-server
```

#### Using PHP:
```bash
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## Technical Details

### Technologies Used
- **HTML5**: Semantic markup
- **CSS3**: Modern features including:
  - CSS Variables for theming
  - Flexbox and Grid layouts
  - Backdrop filters (glassmorphism)
  - CSS animations and transitions
  - Media queries for responsiveness
- **Vanilla JavaScript**: ES6+ features, no frameworks

### Key Features Implementation

1. **Glassmorphism**: Achieved using `backdrop-filter: blur()` and semi-transparent backgrounds
2. **Theme Toggle**: CSS variables with localStorage persistence
3. **Animations**: CSS keyframes for floating blobs, fade-ins, and smooth transitions
4. **Data Management**: Local JavaScript arrays with localStorage for bookings
5. **Form Validation**: Client-side validation with visual feedback
6. **Responsive Design**: Mobile-first approach with breakpoints at 480px, 768px, and 1024px

## Usage Guide

### For Users

1. **Browse Cars**: Navigate to "Browse Cars" to see all available vehicles
2. **Filter & Search**: Use the sidebar filters to narrow down your search
3. **View Details**: Click "View Details" on any car card to see full specifications
4. **Book a Car**: Click "Book Now" to start the 3-step booking process
5. **View Bookings**: Check "My Bookings" to see all your reservations
6. **Download Receipt**: Click "Receipt" on any booking to view/print the receipt

### For Admins

1. **Access Admin**: Navigate to "Admin" in the main menu
2. **View Stats**: See revenue, bookings, and fleet size at a glance
3. **Manage Cars**: 
   - Click "Add New Car" to add a vehicle
   - Click "Edit" to modify car details
   - Click "Delete" to remove a car from the fleet

## Customization

### Changing Colors/Theme

Edit CSS variables in `css/style.css`:

```css
:root {
    --accent-primary: #6366f1;    /* Primary accent color */
    --accent-secondary: #8b5cf6;  /* Secondary accent */
    --accent-tertiary: #ec4899;   /* Tertiary accent */
    /* ... more variables */
}
```

### Adding More Cars

Edit the `carsData` array in `js/data.js`:

```javascript
{
    id: 13,
    name: 'Car Name',
    brand: 'Brand',
    type: 'sedan', // sedan, suv, hatchback, luxury, ev, van
    price: 50,
    seats: 5,
    transmission: 'automatic', // automatic or manual
    fuel: 'petrol', // petrol, diesel, electric, hybrid
    mileage: 10000,
    rating: 4.5,
    location: 'City Center',
    image: 'sedan'
}
```

## Notes

- All data is stored locally in the browser (localStorage for bookings, in-memory arrays for cars)
- No backend or database required - everything runs client-side
- Bookings persist across page refreshes (stored in localStorage)
- Car data resets when the page is refreshed (unless you modify the code to use localStorage for cars too)

## License

This project is provided as-is for educational and demonstration purposes.

## Credits

Built with pure HTML, CSS, and JavaScript - no external dependencies or frameworks.

---

**Enjoy your HFAM car rental experience! 🚗✨**

