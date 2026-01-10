<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HFAM Car Rental | Find Your Perfect Ride</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar" id="navbar">
        <div class="nav-container">
            <div class="nav-brand">
                <svg class="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"></path>
                    <polygon points="12 15 17 21 7 21 12 15"></polygon>
                </svg>
                <span>HFAMRentals</span>
            </div>
            <ul class="nav-menu" id="navMenu">
                <li><a href="#" class="nav-link active" data-view="dashboard">Home</a></li>
                <li><a href="#" class="nav-link" data-view="browse">Browse Cars</a></li>
                <li><a href="#" class="nav-link" data-view="bookings">My Bookings</a></li>
                <li><a href="#" class="nav-link" data-view="admin">Admin</a></li>
            </ul>
            <div class="nav-actions">
                <button class="theme-toggle" id="themeToggle" aria-label="Toggle theme">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <circle cx="12" cy="12" r="5"></circle>
                        <line x1="12" y1="1" x2="12" y2="3"></line>
                        <line x1="12" y1="21" x2="12" y2="23"></line>
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                        <line x1="1" y1="12" x2="3" y2="12"></line>
                        <line x1="21" y1="12" x2="23" y2="12"></line>
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                    </svg>
                </button>
                <button class="mobile-menu-toggle" id="mobileMenuToggle" aria-label="Toggle menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </div>
    </nav>

    <!-- Toast Container -->
    <div class="toast-container" id="toastContainer"></div>

    <!-- Main Content -->
    <main class="main-content">
        <!-- Dashboard View -->
        <section class="view" id="dashboard" data-view="dashboard">
            <!-- Hero Section -->
            <div class="hero-section">
                <div class="hero-background">
                    <div class="blob blob-1"></div>
                    <div class="blob blob-2"></div>
                    <div class="blob blob-3"></div>
                </div>
                <div class="hero-content">
                    <h1 class="hero-title">Find Your Perfect Ride</h1>
                    <p class="hero-subtitle">Experience exceptional mobility with our curated fleet</p>
                </div>
            </div>

            <!-- Search Panel -->
            <div class="search-panel">
                <div class="search-form">
                    <div class="form-group">
                        <label for="pickupLocation">Pickup Location</label>
                        <input type="text" id="pickupLocation" placeholder="Enter city or address" class="form-input">
                    </div>
                    <div class="form-group">
                        <label for="startDate">Start Date</label>
                        <input type="date" id="startDate" class="form-input">
                    </div>
                    <div class="form-group">
                        <label for="endDate">End Date</label>
                        <input type="date" id="endDate" class="form-input">
                    </div>
                    <div class="form-group">
                        <label for="carType">Car Type</label>
                        <select id="carType" class="form-input">
                            <option value="">All Types</option>
                            <option value="sedan">Sedan</option>
                            <option value="suv">SUV</option>
                            <option value="hatchback">Hatchback</option>
                            <option value="luxury">Luxury</option>
                            <option value="ev">Electric</option>
                            <option value="van">Van</option>
                        </select>
                    </div>
                    <button class="btn btn-primary search-btn" id="searchBtn">
                        <span>Search Cars</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.35-4.35"></path>
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Quick Stats -->
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"></path>
                            <polygon points="12 15 17 21 7 21 12 15"></polygon>
                        </svg>
                    </div>
                    <div class="stat-content">
                        <h3 class="stat-value" id="availableCars">0</h3>
                        <p class="stat-label">Available Cars</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M9 11l3 3L22 4"></path>
                            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                        </svg>
                    </div>
                    <div class="stat-content">
                        <h3 class="stat-value" id="activeBookings">0</h3>
                        <p class="stat-label">Active Bookings</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                    </div>
                    <div class="stat-content">
                        <h3 class="stat-value" id="topRated">4.8</h3>
                        <p class="stat-label">Average Rating</p>
                    </div>
                </div>
            </div>

            <!-- Featured Cars -->
            <div class="section-header">
                <h2>Featured Cars</h2>
                <p>Handpicked quality vehicles for your journey</p>
            </div>
            <div class="carousel-container">
                <button class="carousel-btn carousel-prev" id="carouselPrev" aria-label="Previous">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>
                <div class="carousel-track" id="featuredCarousel">
                    <!-- Car cards will be inserted here -->
                </div>
                <button class="carousel-btn carousel-next" id="carouselNext" aria-label="Next">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>
            </div>
        </section>

        <!-- Browse Cars View -->
        <section class="view hidden" id="browse" data-view="browse">
            <div class="browse-header">
                <h1>Browse Our Fleet</h1>
                <p>Discover the perfect vehicle for your needs</p>
            </div>
            <div class="browse-layout">
                <!-- Filters Sidebar -->
                <aside class="filters-sidebar">
                    <h3>Filters</h3>
                    <div class="filter-group">
                        <label>Price Range</label>
                        <div class="price-range">
                            <input type="range" id="priceMin" min="0" max="500" value="0" class="range-input">
                            <input type="range" id="priceMax" min="0" max="500" value="500" class="range-input">
                            <div class="price-display">
                                <span>$<span id="priceMinValue">0</span></span>
                                <span>$<span id="priceMaxValue">500</span></span>
                            </div>
                        </div>
                    </div>
                    <div class="filter-group">
                        <label>Transmission</label>
                        <div class="checkbox-group">
                            <label class="checkbox-label">
                                <input type="checkbox" value="automatic" class="filter-checkbox">
                                <span>Automatic</span>
                            </label>
                            <label class="checkbox-label">
                                <input type="checkbox" value="manual" class="filter-checkbox">
                                <span>Manual</span>
                            </label>
                        </div>
                    </div>
                    <div class="filter-group">
                        <label>Seats</label>
                        <div class="checkbox-group">
                            <label class="checkbox-label">
                                <input type="checkbox" value="2" class="filter-checkbox">
                                <span>2 Seats</span>
                            </label>
                            <label class="checkbox-label">
                                <input type="checkbox" value="4" class="filter-checkbox">
                                <span>4 Seats</span>
                            </label>
                            <label class="checkbox-label">
                                <input type="checkbox" value="5" class="filter-checkbox">
                                <span>5 Seats</span>
                            </label>
                            <label class="checkbox-label">
                                <input type="checkbox" value="7" class="filter-checkbox">
                                <span>7+ Seats</span>
                            </label>
                        </div>
                    </div>
                    <div class="filter-group">
                        <label>Brand</label>
                        <select id="brandFilter" class="form-input">
                            <option value="">All Brands</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label>Minimum Rating</label>
                        <select id="ratingFilter" class="form-input">
                            <option value="0">Any Rating</option>
                            <option value="4">4+ Stars</option>
                            <option value="4.5">4.5+ Stars</option>
                        </select>
                    </div>
                    <button class="btn btn-secondary filter-reset" id="resetFilters">Reset Filters</button>
                </aside>

                <!-- Cars Grid -->
                <div class="cars-content">
                    <div class="browse-controls">
                        <div class="results-count">
                            <span id="resultsCount">0</span> cars found
                        </div>
                        <div class="sort-controls">
                            <label for="sortSelect">Sort by:</label>
                            <select id="sortSelect" class="form-input">
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                                <option value="rating-desc">Rating: High to Low</option>
                                <option value="newest">Newest First</option>
                            </select>
                        </div>
                    </div>
                    <div class="cars-grid" id="carsGrid">
                        <!-- Car cards will be inserted here -->
                    </div>
                    <div class="loading-skeleton hidden" id="loadingSkeleton">
                        <!-- Skeleton cards will be inserted here -->
                    </div>
                </div>
            </div>
        </section>

        <!-- My Bookings View -->
        <section class="view hidden" id="bookings" data-view="bookings">
            <div class="bookings-header">
                <h1>My Bookings</h1>
                <p>Manage your reservations and view booking history</p>
            </div>
            <div class="bookings-container">
                <div class="bookings-table-wrapper">
                    <table class="bookings-table">
                        <thead>
                            <tr>
                                <th>Booking ID</th>
                                <th>Car</th>
                                <th>Pickup Date</th>
                                <th>Return Date</th>
                                <th>Total Price</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="bookingsTableBody">
                            <!-- Bookings will be inserted here -->
                        </tbody>
                    </table>
                    <div class="empty-state hidden" id="bookingsEmpty">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M9 11l3 3L22 4"></path>
                            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                        </svg>
                        <p>No bookings yet. Start by browsing our cars!</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Admin View -->
        <section class="view hidden" id="admin" data-view="admin">
            <div class="admin-header">
                <h1>Admin Dashboard</h1>
                <p>Manage fleet and monitor operations</p>
            </div>
            <div class="admin-stats">
                <div class="admin-stat-card">
                    <div class="admin-stat-icon revenue">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <line x1="12" y1="1" x2="12" y2="23"></line>
                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                        </svg>
                    </div>
                    <div class="admin-stat-content">
                        <h3 class="admin-stat-value" id="adminRevenue">$0</h3>
                        <p class="admin-stat-label">Total Revenue</p>
                    </div>
                </div>
                <div class="admin-stat-card">
                    <div class="admin-stat-icon bookings">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M9 11l3 3L22 4"></path>
                            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                        </svg>
                    </div>
                    <div class="admin-stat-content">
                        <h3 class="admin-stat-value" id="adminBookings">0</h3>
                        <p class="admin-stat-label">Total Bookings</p>
                    </div>
                </div>
                <div class="admin-stat-card">
                    <div class="admin-stat-icon fleet">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"></path>
                            <polygon points="12 15 17 21 7 21 12 15"></polygon>
                        </svg>
                    </div>
                    <div class="admin-stat-content">
                        <h3 class="admin-stat-value" id="adminFleet">0</h3>
                        <p class="admin-stat-label">Fleet Size</p>
                    </div>
                </div>
            </div>
            <div class="admin-section">
                <div class="admin-section-header">
                    <h2>Manage Cars</h2>
                    <button class="btn btn-primary" id="addCarBtn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        Add New Car
                    </button>
                </div>
                <div class="admin-table-wrapper">
                    <table class="admin-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Price/Day</th>
                                <th>Rating</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="adminTableBody">
                            <!-- Admin car rows will be inserted here -->
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    </main>

    <!-- Car Details Modal -->
    <div class="modal-overlay hidden" id="carDetailsModal">
        <div class="modal-content modal-large">
            <button class="modal-close" aria-label="Close modal">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
            <div class="modal-body" id="carDetailsContent">
                <!-- Car details will be inserted here -->
            </div>
        </div>
    </div>

    <!-- Booking Modal -->
    <div class="modal-overlay hidden" id="bookingModal">
        <div class="modal-content modal-large">
            <button class="modal-close" aria-label="Close modal">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
            <div class="modal-body">
                <div class="booking-stepper" id="bookingStepper">
                    <!-- Stepper will be inserted here -->
                </div>
            </div>
        </div>
    </div>

    <!-- Add/Edit Car Modal -->
    <div class="modal-overlay hidden" id="carFormModal">
        <div class="modal-content">
            <button class="modal-close" aria-label="Close modal">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
            <div class="modal-body">
                <h2 id="carFormTitle">Add New Car</h2>
                <form id="carForm" class="car-form">
                    <div class="form-group">
                        <label for="carName">Car Name *</label>
                        <input type="text" id="carName" class="form-input" required>
                    </div>
                    <div class="form-group">
                        <label for="carBrand">Brand *</label>
                        <input type="text" id="carBrand" class="form-input" required>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="carTypeForm">Type *</label>
                            <select id="carTypeForm" class="form-input" required>
                                <option value="">Select Type</option>
                                <option value="sedan">Sedan</option>
                                <option value="suv">SUV</option>
                                <option value="hatchback">Hatchback</option>
                                <option value="luxury">Luxury</option>
                                <option value="ev">Electric</option>
                                <option value="van">Van</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="carPrice">Price/Day ($) *</label>
                            <input type="number" id="carPrice" class="form-input" min="0" step="0.01" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="carSeats">Seats *</label>
                            <input type="number" id="carSeats" class="form-input" min="2" max="9" required>
                        </div>
                        <div class="form-group">
                            <label for="carTransmission">Transmission *</label>
                            <select id="carTransmission" class="form-input" required>
                                <option value="">Select</option>
                                <option value="automatic">Automatic</option>
                                <option value="manual">Manual</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="carFuel">Fuel Type *</label>
                            <select id="carFuel" class="form-input" required>
                                <option value="">Select</option>
                                <option value="petrol">Petrol</option>
                                <option value="diesel">Diesel</option>
                                <option value="electric">Electric</option>
                                <option value="hybrid">Hybrid</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="carRating">Rating *</label>
                            <input type="number" id="carRating" class="form-input" min="0" max="5" step="0.1" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="carMileage">Mileage (km)</label>
                        <input type="number" id="carMileage" class="form-input" min="0">
                    </div>
                    <div class="form-group">
                        <label for="carLocation">Pickup Location *</label>
                        <input type="text" id="carLocation" class="form-input" required>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn btn-secondary" id="cancelCarForm">Cancel</button>
                        <button type="submit" class="btn btn-primary">Save Car</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Receipt Modal -->
    <div class="modal-overlay hidden" id="receiptModal">
        <div class="modal-content modal-large">
            <button class="modal-close" aria-label="Close modal">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
            <div class="modal-body receipt-body" id="receiptContent">
                <!-- Receipt will be inserted here -->
            </div>
        </div>
    </div>

    <script src="js/data.js"></script>
    <script src="js/ui.js"></script>
    <script src="js/booking.js"></script>
    <script src="js/app.js"></script>
</body>
</html>

