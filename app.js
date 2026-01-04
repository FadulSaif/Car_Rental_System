// ============================================
// Main Application Logic
// ============================================

const App = {
    currentView: 'dashboard',
    currentFilters: {
        priceMin: 0,
        priceMax: 500,
        transmission: [],
        seats: [],
        brand: '',
        rating: '0',
        type: ''
    },
    
    init() {
        this.setupNavigation();
        this.setupEventListeners();
        this.renderDashboard();
        this.updateStats();
        this.setupSearch();
        this.setupFilters();
        this.setupAdmin();
    },
    
    // Navigation
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const navMenu = document.getElementById('navMenu');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const view = link.getAttribute('data-view');
                this.showView(view);
                
                // Update active state
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                // Close mobile menu if open
                if (navMenu) {
                    navMenu.classList.remove('active');
                }
            });
        });
        
        // Mobile menu toggle
        const mobileToggle = document.getElementById('mobileMenuToggle');
        const navMenu = document.getElementById('navMenu');
        if (mobileToggle && navMenu) {
            mobileToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }
    },
    
    showView(viewName) {
        // Hide all views
        document.querySelectorAll('.view').forEach(view => {
            view.classList.add('hidden');
        });
        
        // Show selected view
        const view = document.querySelector(`[data-view="${viewName}"]`);
        if (view) {
            view.classList.remove('hidden');
            this.currentView = viewName;
            
            // Render view-specific content
            switch (viewName) {
                case 'dashboard':
                    this.renderDashboard();
                    break;
                case 'browse':
                    this.renderBrowse();
                    break;
                case 'bookings':
                    this.renderBookings();
                    break;
                case 'admin':
                    this.renderAdmin();
                    break;
            }
        }
    },
    
    // Dashboard
    renderDashboard() {
        this.renderFeaturedCars();
        this.updateStats();
    },
    
    renderFeaturedCars() {
        const carousel = document.getElementById('featuredCarousel');
        if (!carousel) return;
        
        const featuredCars = getFeaturedCars(6);
        carousel.innerHTML = '';
        
        featuredCars.forEach(car => {
            const card = CarCard.create(car, {
                onViewDetails: (car) => this.showCarDetails(car),
                onBook: (car) => BookingFlow.start(car)
            });
            carousel.appendChild(card);
        });
        
        // Setup carousel navigation
        this.setupCarousel();
    },
    
    setupCarousel() {
        const prevBtn = document.getElementById('carouselPrev');
        const nextBtn = document.getElementById('carouselNext');
        const track = document.getElementById('featuredCarousel');
        
        if (prevBtn && track) {
            prevBtn.addEventListener('click', () => {
                track.scrollBy({ left: -340, behavior: 'smooth' });
            });
        }
        
        if (nextBtn && track) {
            nextBtn.addEventListener('click', () => {
                track.scrollBy({ left: 340, behavior: 'smooth' });
            });
        }
    },
    
    updateStats() {
        const availableCars = getAllCars().length;
        const activeBookings = getAllBookings().filter(b => b.status === 'confirmed').length;
        const avgRating = getAllCars().reduce((sum, car) => sum + car.rating, 0) / availableCars;
        
        const availableEl = document.getElementById('availableCars');
        const bookingsEl = document.getElementById('activeBookings');
        const ratingEl = document.getElementById('topRated');
        
        if (availableEl) {
            this.animateValue(availableEl, 0, availableCars, 1000);
        }
        if (bookingsEl) {
            this.animateValue(bookingsEl, 0, activeBookings, 1000);
        }
        if (ratingEl) {
            ratingEl.textContent = avgRating.toFixed(1);
        }
    },
    
    animateValue(element, start, end, duration) {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    },
    
    // Search
    setupSearch() {
        const searchBtn = document.getElementById('searchBtn');
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                const location = document.getElementById('pickupLocation').value;
                const startDate = document.getElementById('startDate').value;
                const endDate = document.getElementById('endDate').value;
                const carType = document.getElementById('carType').value;
                
                // Apply filters
                this.currentFilters.type = carType;
                
                // Switch to browse view
                this.showView('browse');
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                const browseLink = document.querySelector('.nav-link[data-view="browse"]');
                if (browseLink) browseLink.classList.add('active');
                
                // Render filtered results
                this.renderBrowse();
            });
        }
    },
    
    // Browse Cars
    renderBrowse() {
        const loadingSkeleton = document.getElementById('loadingSkeleton');
        const carsGrid = document.getElementById('carsGrid');
        
        if (loadingSkeleton && carsGrid) {
            Skeleton.show(loadingSkeleton, 6);
            carsGrid.innerHTML = '';
            
            // Simulate loading
            setTimeout(() => {
                Skeleton.hide(loadingSkeleton);
                this.renderCarsGrid();
            }, 600);
        } else {
            this.renderCarsGrid();
        }
    },
    
    renderCarsGrid() {
        const grid = document.getElementById('carsGrid');
        const resultsCount = document.getElementById('resultsCount');
        if (!grid) return;
        
        // Apply filters
        let filteredCars = filterCars(this.currentFilters);
        
        // Apply sorting
        const sortSelect = document.getElementById('sortSelect');
        if (sortSelect) {
            filteredCars = sortCars(filteredCars, sortSelect.value);
        }
        
        // Update results count
        if (resultsCount) {
            resultsCount.textContent = filteredCars.length;
        }
        
        // Render cars
        grid.innerHTML = '';
        if (filteredCars.length === 0) {
            grid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem; color: var(--text-secondary);">
                    <p style="font-size: 1.25rem; margin-bottom: 0.5rem;">No cars found</p>
                    <p>Try adjusting your filters</p>
                </div>
            `;
        } else {
            filteredCars.forEach(car => {
                const card = CarCard.create(car, {
                    onViewDetails: (car) => this.showCarDetails(car),
                    onBook: (car) => BookingFlow.start(car)
                });
                grid.appendChild(card);
            });
        }
    },
    
    setupFilters() {
        // Price range
        const priceMin = document.getElementById('priceMin');
        const priceMax = document.getElementById('priceMax');
        const priceMinValue = document.getElementById('priceMinValue');
        const priceMaxValue = document.getElementById('priceMaxValue');
        
        if (priceMin && priceMax && priceMinValue && priceMaxValue) {
            const updatePriceDisplay = () => {
                priceMinValue.textContent = priceMin.value;
                priceMaxValue.textContent = priceMax.value;
                this.currentFilters.priceMin = parseInt(priceMin.value);
                this.currentFilters.priceMax = parseInt(priceMax.value);
                this.renderCarsGrid();
            };
            
            priceMin.addEventListener('input', updatePriceDisplay);
            priceMax.addEventListener('input', updatePriceDisplay);
        }
        
        // Transmission checkboxes
        document.querySelectorAll('.filter-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.updateFilterCheckboxes();
            });
        });
        
        // Brand filter
        const brandFilter = document.getElementById('brandFilter');
        if (brandFilter) {
            const brands = getUniqueBrands();
            brandFilter.innerHTML = '<option value="">All Brands</option>';
            brands.forEach(brand => {
                const option = document.createElement('option');
                option.value = brand;
                option.textContent = brand;
                brandFilter.appendChild(option);
            });
            
            brandFilter.addEventListener('change', () => {
                this.currentFilters.brand = brandFilter.value;
                this.renderCarsGrid();
            });
        }
        
        // Rating filter
        const ratingFilter = document.getElementById('ratingFilter');
        if (ratingFilter) {
            ratingFilter.addEventListener('change', () => {
                this.currentFilters.rating = ratingFilter.value;
                this.renderCarsGrid();
            });
        }
        
        // Sort
        const sortSelect = document.getElementById('sortSelect');
        if (sortSelect) {
            sortSelect.addEventListener('change', () => {
                this.renderCarsGrid();
            });
        }
        
        // Reset filters
        const resetBtn = document.getElementById('resetFilters');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.resetFilters();
            });
        }
    },
    
    updateFilterCheckboxes() {
        const transmission = [];
        const seats = [];
        
        document.querySelectorAll('.filter-checkbox').forEach(checkbox => {
            if (checkbox.checked) {
                const value = checkbox.value;
                if (value === 'automatic' || value === 'manual') {
                    transmission.push(value);
                } else {
                    seats.push(value);
                }
            }
        });
        
        this.currentFilters.transmission = transmission;
        this.currentFilters.seats = seats;
        this.renderCarsGrid();
    },
    
    resetFilters() {
        this.currentFilters = {
            priceMin: 0,
            priceMax: 500,
            transmission: [],
            seats: [],
            brand: '',
            rating: '0',
            type: ''
        };
        
        // Reset UI
        document.getElementById('priceMin').value = 0;
        document.getElementById('priceMax').value = 500;
        document.getElementById('priceMinValue').textContent = '0';
        document.getElementById('priceMaxValue').textContent = '500';
        document.querySelectorAll('.filter-checkbox').forEach(cb => cb.checked = false);
        document.getElementById('brandFilter').value = '';
        document.getElementById('ratingFilter').value = '0';
        
        this.renderCarsGrid();
    },
    
    // Car Details Modal
    showCarDetails(car) {
        const modal = document.getElementById('carDetailsModal');
        const content = document.getElementById('carDetailsContent');
        if (!modal || !content) return;
        
        const imageSvg = CarCard.getCarImageSvg(car.type, car.image);
        
        content.innerHTML = `
            <div class="car-details-image">
                ${imageSvg}
            </div>
            <div class="car-details-info">
                <h2>${car.name}</h2>
                <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">${car.brand}</p>
                
                <div class="car-details-specs">
                    <div class="car-spec-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                        <div>
                            <div class="car-spec-label">Seats</div>
                            <div class="car-spec-value">${car.seats}</div>
                        </div>
                    </div>
                    <div class="car-spec-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        <div>
                            <div class="car-spec-label">Transmission</div>
                            <div class="car-spec-value">${car.transmission}</div>
                        </div>
                    </div>
                    <div class="car-spec-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <div>
                            <div class="car-spec-label">Fuel Type</div>
                            <div class="car-spec-value">${car.fuel}</div>
                        </div>
                    </div>
                    <div class="car-spec-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                        </svg>
                        <div>
                            <div class="car-spec-label">Mileage</div>
                            <div class="car-spec-value">${car.mileage.toLocaleString()} km</div>
                        </div>
                    </div>
                    <div class="car-spec-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <div>
                            <div class="car-spec-label">Pickup Location</div>
                            <div class="car-spec-value">${car.location}</div>
                        </div>
                    </div>
                    <div class="car-spec-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                        <div>
                            <div class="car-spec-label">Rating</div>
                            <div class="car-spec-value">${car.rating} / 5.0</div>
                        </div>
                    </div>
                </div>
                
                <div class="car-price-summary">
                    <h3 style="margin-bottom: 1rem;">Pricing</h3>
                    <div class="price-summary-row">
                        <span>Base Price</span>
                        <span>$${car.price} / day</span>
                    </div>
                    <p style="color: var(--text-secondary); font-size: 0.875rem; margin-top: 1rem;">
                        Insurance and taxes will be calculated during booking.
                    </p>
                </div>
                
                <button class="btn btn-primary" style="width: 100%; margin-top: 1.5rem;" id="bookFromDetails">
                    Book Now
                </button>
            </div>
        `;
        
        const bookBtn = document.getElementById('bookFromDetails');
        if (bookBtn) {
            bookBtn.addEventListener('click', () => {
                Modal.close('carDetailsModal');
                BookingFlow.start(car);
            });
        }
        
        Modal.open('carDetailsModal');
    },
    
    // Bookings
    renderBookings() {
        const tbody = document.getElementById('bookingsTableBody');
        const emptyState = document.getElementById('bookingsEmpty');
        if (!tbody) return;
        
        const bookings = getAllBookings();
        
        if (bookings.length === 0) {
            tbody.innerHTML = '';
            if (emptyState) emptyState.classList.remove('hidden');
            return;
        }
        
        if (emptyState) emptyState.classList.add('hidden');
        
        tbody.innerHTML = bookings.map(booking => {
            const startDate = new Date(booking.startDate).toLocaleDateString();
            const endDate = new Date(booking.endDate).toLocaleDateString();
            const statusClass = booking.status || 'pending';
            
            return `
                <tr>
                    <td>${booking.id}</td>
                    <td>${booking.carName} (${booking.carBrand})</td>
                    <td>${startDate}</td>
                    <td>${endDate}</td>
                    <td>$${booking.total.toFixed(2)}</td>
                    <td><span class="status-badge ${statusClass}">${statusClass}</span></td>
                    <td>
                        <div class="table-actions">
                            <button class="btn btn-ghost view-receipt-btn" data-booking-id="${booking.id}">
                                Receipt
                            </button>
                            ${booking.status === 'confirmed' ? `
                                <button class="btn btn-ghost cancel-booking-btn" data-booking-id="${booking.id}">
                                    Cancel
                                </button>
                            ` : ''}
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
        
        // Setup event listeners
        document.querySelectorAll('.view-receipt-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const bookingId = btn.getAttribute('data-booking-id');
                this.showReceipt(bookingId);
            });
        });
        
        document.querySelectorAll('.cancel-booking-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const bookingId = btn.getAttribute('data-booking-id');
                this.cancelBooking(bookingId);
            });
        });
    },
    
    showReceipt(bookingId) {
        const booking = getAllBookings().find(b => b.id === bookingId);
        if (!booking) return;
        
        const modal = document.getElementById('receiptModal');
        const content = document.getElementById('receiptContent');
        if (!modal || !content) return;
        
        const startDate = new Date(booking.startDate).toLocaleDateString();
        const endDate = new Date(booking.endDate).toLocaleDateString();
        
        content.innerHTML = `
            <div class="receipt-header">
                <h2>HFAM Rentals</h2>
                <p>Booking Receipt</p>
            </div>
            <div class="receipt-details">
                <div class="receipt-row">
                    <span><strong>Booking ID:</strong></span>
                    <span>${booking.id}</span>
                </div>
                <div class="receipt-row">
                    <span><strong>Date:</strong></span>
                    <span>${new Date(booking.createdAt).toLocaleDateString()}</span>
                </div>
                <div class="receipt-row">
                    <span><strong>Car:</strong></span>
                    <span>${booking.carName} (${booking.carBrand})</span>
                </div>
                <div class="receipt-row">
                    <span><strong>Pickup Location:</strong></span>
                    <span>${booking.pickupLocation}</span>
                </div>
                <div class="receipt-row">
                    <span><strong>Start Date:</strong></span>
                    <span>${startDate}</span>
                </div>
                <div class="receipt-row">
                    <span><strong>End Date:</strong></span>
                    <span>${endDate}</span>
                </div>
                <div class="receipt-row">
                    <span><strong>Duration:</strong></span>
                    <span>${booking.days} day${booking.days !== 1 ? 's' : ''}</span>
                </div>
                <div class="receipt-row">
                    <span><strong>Driver:</strong></span>
                    <span>${booking.driverInfo.name}</span>
                </div>
                <div class="receipt-row">
                    <span><strong>Email:</strong></span>
                    <span>${booking.driverInfo.email}</span>
                </div>
                <div class="receipt-row total">
                    <span><strong>Total Amount:</strong></span>
                    <span>$${booking.total.toFixed(2)}</span>
                </div>
            </div>
            <div style="text-align: center; margin-top: 2rem;">
                <button class="btn btn-primary" onclick="window.print()">Print Receipt</button>
            </div>
        `;
        
        Modal.open('receiptModal');
    },
    
    cancelBooking(bookingId) {
        if (confirm('Are you sure you want to cancel this booking?')) {
            updateBookingStatus(bookingId, 'cancelled');
            Toast.success('Booking cancelled successfully');
            this.renderBookings();
        }
    },
    
    // Admin
    renderAdmin() {
        this.renderAdminStats();
        this.renderAdminTable();
    },
    
    renderAdminStats() {
        const stats = getAdminStats();
        
        const revenueEl = document.getElementById('adminRevenue');
        const bookingsEl = document.getElementById('adminBookings');
        const fleetEl = document.getElementById('adminFleet');
        
        if (revenueEl) revenueEl.textContent = '$' + stats.revenue.toFixed(2);
        if (bookingsEl) bookingsEl.textContent = stats.bookings;
        if (fleetEl) fleetEl.textContent = stats.fleet;
    },
    
    renderAdminTable() {
        const tbody = document.getElementById('adminTableBody');
        if (!tbody) return;
        
        const cars = getAllCars();
        
        tbody.innerHTML = cars.map(car => {
            const imageSvg = CarCard.getCarImageSvg(car.type, car.image);
            
            return `
                <tr>
                    <td>
                        <div class="admin-table-image">
                            ${imageSvg}
                        </div>
                    </td>
                    <td>${car.name}</td>
                    <td>${car.type.toUpperCase()}</td>
                    <td>$${car.price}</td>
                    <td>${car.rating}</td>
                    <td><span class="status-badge confirmed">Active</span></td>
                    <td>
                        <div class="table-actions">
                            <button class="btn btn-ghost edit-car-btn" data-car-id="${car.id}">Edit</button>
                            <button class="btn btn-ghost delete-car-btn" data-car-id="${car.id}">Delete</button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
        
        // Setup event listeners
        document.querySelectorAll('.edit-car-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const carId = btn.getAttribute('data-car-id');
                this.editCar(carId);
            });
        });
        
        document.querySelectorAll('.delete-car-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const carId = btn.getAttribute('data-car-id');
                this.deleteCar(carId);
            });
        });
    },
    
    setupAdmin() {
        const addBtn = document.getElementById('addCarBtn');
        if (addBtn) {
            addBtn.addEventListener('click', () => {
                this.showCarForm();
            });
        }
        
        const carForm = document.getElementById('carForm');
        if (carForm) {
            carForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveCar();
            });
        }
        
        const cancelBtn = document.getElementById('cancelCarForm');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                Modal.close('carFormModal');
                document.getElementById('carForm').reset();
            });
        }
    },
    
    showCarForm(carId = null) {
        const modal = document.getElementById('carFormModal');
        const form = document.getElementById('carForm');
        const title = document.getElementById('carFormTitle');
        
        if (!modal || !form) return;
        
        form.reset();
        form.dataset.carId = carId || '';
        
        if (carId) {
            const car = getCarById(carId);
            if (car) {
                if (title) title.textContent = 'Edit Car';
                document.getElementById('carName').value = car.name;
                document.getElementById('carBrand').value = car.brand;
                document.getElementById('carTypeForm').value = car.type;
                document.getElementById('carPrice').value = car.price;
                document.getElementById('carSeats').value = car.seats;
                document.getElementById('carTransmission').value = car.transmission;
                document.getElementById('carFuel').value = car.fuel;
                document.getElementById('carRating').value = car.rating;
                document.getElementById('carMileage').value = car.mileage || '';
                document.getElementById('carLocation').value = car.location;
            }
        } else {
            if (title) title.textContent = 'Add New Car';
        }
        
        Modal.open('carFormModal');
    },
    
    editCar(carId) {
        this.showCarForm(carId);
    },
    
    saveCar() {
        const form = document.getElementById('carForm');
        const carId = form.dataset.carId;
        
        const carData = {
            name: document.getElementById('carName').value.trim(),
            brand: document.getElementById('carBrand').value.trim(),
            type: document.getElementById('carTypeForm').value,
            price: parseFloat(document.getElementById('carPrice').value),
            seats: parseInt(document.getElementById('carSeats').value),
            transmission: document.getElementById('carTransmission').value,
            fuel: document.getElementById('carFuel').value,
            rating: parseFloat(document.getElementById('carRating').value),
            mileage: parseInt(document.getElementById('carMileage').value) || 0,
            location: document.getElementById('carLocation').value.trim(),
            image: document.getElementById('carTypeForm').value
        };
        
        if (carId) {
            updateCar(carId, carData);
            Toast.success('Car updated successfully');
        } else {
            addCar(carData);
            Toast.success('Car added successfully');
        }
        
        Modal.close('carFormModal');
        form.reset();
        this.renderAdminTable();
        this.renderAdminStats();
        
        // Refresh browse view if active
        if (this.currentView === 'browse') {
            this.renderBrowse();
        }
    },
    
    deleteCar(carId) {
        const car = getCarById(carId);
        if (!car) return;
        
        if (confirm(`Are you sure you want to delete ${car.name}?`)) {
            deleteCar(carId);
            Toast.success('Car deleted successfully');
            this.renderAdminTable();
            this.renderAdminStats();
            
            // Refresh browse view if active
            if (this.currentView === 'browse') {
                this.renderBrowse();
            }
        }
    },
    
    // General event listeners
    setupEventListeners() {
        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // Set today's date as default for date inputs
        const today = new Date().toISOString().split('T')[0];
        const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
        
        const startDateInput = document.getElementById('startDate');
        const endDateInput = document.getElementById('endDate');
        
        if (startDateInput) {
            startDateInput.value = today;
            startDateInput.min = today;
        }
        
        if (endDateInput) {
            endDateInput.value = tomorrow;
            endDateInput.min = tomorrow;
        }
        
        // Update end date min when start date changes
        if (startDateInput && endDateInput) {
            startDateInput.addEventListener('change', () => {
                const startDate = new Date(startDateInput.value);
                startDate.setDate(startDate.getDate() + 1);
                endDateInput.min = startDate.toISOString().split('T')[0];
                if (endDateInput.value <= startDateInput.value) {
                    endDateInput.value = startDate.toISOString().split('T')[0];
                }
            });
        }
    }
};

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        App.init();
    });
} else {
    App.init();
}

