// ============================================
// Mock Data Store
// ============================================

// Car data with diverse types
const carsData = [
    {
        id: 1,
        name: 'Tesla Model 3',
        brand: 'Tesla',
        type: 'ev',
        price: 89,
        seats: 5,
        transmission: 'automatic',
        fuel: 'electric',
        mileage: 15000,
        rating: 4.9,
        location: 'Downtown Hub',
        image: 'ev'
    },
    {
        id: 2,
        name: 'BMW 5 Series',
        brand: 'BMW',
        type: 'luxury',
        price: 125,
        seats: 5,
        transmission: 'automatic',
        fuel: 'petrol',
        mileage: 12000,
        rating: 4.8,
        location: 'Airport Terminal',
        image: 'luxury'
    },
    {
        id: 3,
        name: 'Toyota Camry',
        brand: 'Toyota',
        type: 'sedan',
        price: 45,
        seats: 5,
        transmission: 'automatic',
        fuel: 'hybrid',
        mileage: 25000,
        rating: 4.6,
        location: 'City Center',
        image: 'sedan'
    },
    {
        id: 4,
        name: 'Honda Civic',
        brand: 'Honda',
        type: 'hatchback',
        price: 38,
        seats: 5,
        transmission: 'manual',
        fuel: 'petrol',
        mileage: 18000,
        rating: 4.5,
        location: 'Downtown Hub',
        image: 'hatchback'
    },
    {
        id: 5,
        name: 'Mercedes GLE',
        brand: 'Mercedes',
        type: 'suv',
        price: 145,
        seats: 7,
        transmission: 'automatic',
        fuel: 'diesel',
        mileage: 8000,
        rating: 4.9,
        location: 'Airport Terminal',
        image: 'suv'
    },
    {
        id: 6,
        name: 'Ford Transit',
        brand: 'Ford',
        type: 'van',
        price: 65,
        seats: 9,
        transmission: 'manual',
        fuel: 'diesel',
        mileage: 30000,
        rating: 4.4,
        location: 'City Center',
        image: 'van'
    },
    {
        id: 7,
        name: 'Audi A4',
        brand: 'Audi',
        type: 'sedan',
        price: 75,
        seats: 5,
        transmission: 'automatic',
        fuel: 'petrol',
        mileage: 14000,
        rating: 4.7,
        location: 'Downtown Hub',
        image: 'sedan'
    },
    {
        id: 8,
        name: 'Nissan Leaf',
        brand: 'Nissan',
        type: 'ev',
        price: 55,
        seats: 5,
        transmission: 'automatic',
        fuel: 'electric',
        mileage: 20000,
        rating: 4.6,
        location: 'City Center',
        image: 'ev'
    },
    {
        id: 9,
        name: 'Jeep Wrangler',
        brand: 'Jeep',
        type: 'suv',
        price: 85,
        seats: 5,
        transmission: 'manual',
        fuel: 'petrol',
        mileage: 22000,
        rating: 4.5,
        location: 'Airport Terminal',
        image: 'suv'
    },
    {
        id: 10,
        name: 'Volkswagen Golf',
        brand: 'Volkswagen',
        type: 'hatchback',
        price: 42,
        seats: 5,
        transmission: 'manual',
        fuel: 'petrol',
        mileage: 16000,
        rating: 4.4,
        location: 'Downtown Hub',
        image: 'hatchback'
    },
    {
        id: 11,
        name: 'Porsche 911',
        brand: 'Porsche',
        type: 'luxury',
        price: 250,
        seats: 2,
        transmission: 'automatic',
        fuel: 'petrol',
        mileage: 5000,
        rating: 5.0,
        location: 'Airport Terminal',
        image: 'luxury'
    },
    {
        id: 12,
        name: 'Toyota Sienna',
        brand: 'Toyota',
        type: 'van',
        price: 70,
        seats: 7,
        transmission: 'automatic',
        fuel: 'hybrid',
        mileage: 19000,
        rating: 4.7,
        location: 'City Center',
        image: 'van'
    }
];

// Bookings data (stored in localStorage)
let bookingsData = JSON.parse(localStorage.getItem('bookings') || '[]');

// Get all cars
function getAllCars() {
    return carsData;
}

// Get car by ID
function getCarById(id) {
    return carsData.find(car => car.id === parseInt(id));
}

// Add new car
function addCar(car) {
    const newId = Math.max(...carsData.map(c => c.id), 0) + 1;
    const newCar = { ...car, id: newId };
    carsData.push(newCar);
    return newCar;
}

// Update car
function updateCar(id, updates) {
    const index = carsData.findIndex(car => car.id === parseInt(id));
    if (index !== -1) {
        carsData[index] = { ...carsData[index], ...updates };
        return carsData[index];
    }
    return null;
}

// Delete car
function deleteCar(id) {
    const index = carsData.findIndex(car => car.id === parseInt(id));
    if (index !== -1) {
        carsData.splice(index, 1);
        return true;
    }
    return false;
}

// Get all bookings
function getAllBookings() {
    return bookingsData;
}

// Add booking
function addBooking(booking) {
    const bookingId = 'BR' + Date.now().toString(36).toUpperCase();
    const newBooking = {
        ...booking,
        id: bookingId,
        status: 'confirmed',
        createdAt: new Date().toISOString()
    };
    bookingsData.push(newBooking);
    localStorage.setItem('bookings', JSON.stringify(bookingsData));
    return newBooking;
}

// Update booking status
function updateBookingStatus(id, status) {
    const booking = bookingsData.find(b => b.id === id);
    if (booking) {
        booking.status = status;
        localStorage.setItem('bookings', JSON.stringify(bookingsData));
        return booking;
    }
    return null;
}

// Get featured cars (top rated)
function getFeaturedCars(limit = 6) {
    return [...carsData]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, limit);
}

// Filter cars
function filterCars(filters) {
    let filtered = [...carsData];

    // Price range
    if (filters.priceMin !== undefined) {
        filtered = filtered.filter(car => car.price >= filters.priceMin);
    }
    if (filters.priceMax !== undefined) {
        filtered = filtered.filter(car => car.price <= filters.priceMax);
    }

    // Transmission
    if (filters.transmission && filters.transmission.length > 0) {
        filtered = filtered.filter(car => filters.transmission.includes(car.transmission));
    }

    // Seats
    if (filters.seats && filters.seats.length > 0) {
        filtered = filtered.filter(car => {
            const carSeats = car.seats.toString();
            return filters.seats.some(s => {
                if (s === '7') return parseInt(carSeats) >= 7;
                return carSeats === s;
            });
        });
    }

    // Brand
    if (filters.brand) {
        filtered = filtered.filter(car => car.brand.toLowerCase() === filters.brand.toLowerCase());
    }

    // Rating
    if (filters.rating) {
        filtered = filtered.filter(car => car.rating >= parseFloat(filters.rating));
    }

    // Type
    if (filters.type) {
        filtered = filtered.filter(car => car.type === filters.type);
    }

    return filtered;
}

// Sort cars
function sortCars(cars, sortBy) {
    const sorted = [...cars];
    
    switch (sortBy) {
        case 'price-asc':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-desc':
            return sorted.sort((a, b) => b.price - a.price);
        case 'rating-desc':
            return sorted.sort((a, b) => b.rating - a.rating);
        case 'newest':
            return sorted.sort((a, b) => b.id - a.id);
        default:
            return sorted;
    }
}

// Get unique brands
function getUniqueBrands() {
    return [...new Set(carsData.map(car => car.brand))].sort();
}

// Calculate booking total
function calculateBookingTotal(car, startDate, endDate) {
    const days = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
    if (days <= 0) return { base: 0, insurance: 0, tax: 0, total: 0, days: 0 };
    
    const base = car.price * days;
    const insurance = base * 0.15; // 15% insurance
    const tax = (base + insurance) * 0.1; // 10% tax
    const total = base + insurance + tax;
    
    return { base, insurance, tax, total, days };
}

// Get admin stats
function getAdminStats() {
    const totalRevenue = bookingsData.reduce((sum, booking) => {
        return sum + (booking.total || 0);
    }, 0);
    
    return {
        revenue: totalRevenue,
        bookings: bookingsData.length,
        fleet: carsData.length
    };
}

