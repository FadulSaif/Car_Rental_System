// ============================================
// Booking Flow Logic
// ============================================

const BookingFlow = {
    currentStep: 1,
    totalSteps: 3,
    bookingData: {
        car: null,
        startDate: '',
        endDate: '',
        pickupLocation: '',
        driverInfo: {
            name: '',
            email: '',
            phone: '',
            license: ''
        }
    },
    
    init() {
        this.renderStepper();
        this.setupEventListeners();
    },
    
    renderStepper() {
        const stepper = document.getElementById('bookingStepper');
        if (!stepper) return;
        
        stepper.innerHTML = `
            <div class="stepper-header">
                <div class="stepper-step ${this.currentStep >= 1 ? 'active' : ''} ${this.currentStep > 1 ? 'completed' : ''}">
                    <div class="step-number">${this.currentStep > 1 ? '✓' : '1'}</div>
                    <div class="step-label">Dates & Location</div>
                </div>
                <div class="stepper-step ${this.currentStep >= 2 ? 'active' : ''} ${this.currentStep > 2 ? 'completed' : ''}">
                    <div class="step-number">${this.currentStep > 2 ? '✓' : '2'}</div>
                    <div class="step-label">Driver Info</div>
                </div>
                <div class="stepper-step ${this.currentStep >= 3 ? 'active' : ''}">
                    <div class="step-number">3</div>
                    <div class="step-label">Review & Confirm</div>
                </div>
            </div>
            <div class="stepper-content">
                ${this.renderStepContent()}
            </div>
        `;
        
        this.setupStepEventListeners();
    },
    
    renderStepContent() {
        switch (this.currentStep) {
            case 1:
                return this.renderStep1();
            case 2:
                return this.renderStep2();
            case 3:
                return this.renderStep3();
            default:
                return '';
        }
    },
    
    renderStep1() {
        const today = new Date().toISOString().split('T')[0];
        const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
        
        return `
            <form class="stepper-form" id="step1Form">
                <div class="form-group">
                    <label for="bookingStartDate">Start Date *</label>
                    <input type="date" id="bookingStartDate" class="form-input" 
                           value="${this.bookingData.startDate || today}" 
                           min="${today}" required>
                </div>
                <div class="form-group">
                    <label for="bookingEndDate">End Date *</label>
                    <input type="date" id="bookingEndDate" class="form-input" 
                           value="${this.bookingData.endDate || tomorrow}" 
                           min="${this.bookingData.startDate || tomorrow}" required>
                </div>
                <div class="form-group">
                    <label for="bookingPickupLocation">Pickup Location *</label>
                    <input type="text" id="bookingPickupLocation" class="form-input" 
                           value="${this.bookingData.pickupLocation || this.bookingData.car?.location || ''}" 
                           placeholder="Enter pickup location" required>
                </div>
                <div class="stepper-actions">
                    <button type="button" class="btn btn-secondary" id="cancelBooking">Cancel</button>
                    <button type="submit" class="btn btn-primary">Next</button>
                </div>
            </form>
        `;
    },
    
    renderStep2() {
        return `
            <form class="stepper-form" id="step2Form">
                <div class="form-group">
                    <label for="driverName">Full Name *</label>
                    <input type="text" id="driverName" class="form-input" 
                           value="${this.bookingData.driverInfo.name}" 
                           placeholder="John Doe" required>
                </div>
                <div class="form-group">
                    <label for="driverEmail">Email *</label>
                    <input type="email" id="driverEmail" class="form-input" 
                           value="${this.bookingData.driverInfo.email}" 
                           placeholder="john@example.com" required>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="driverPhone">Phone *</label>
                        <input type="tel" id="driverPhone" class="form-input" 
                               value="${this.bookingData.driverInfo.phone}" 
                               placeholder="+1 234 567 8900" required>
                    </div>
                    <div class="form-group">
                        <label for="driverLicense">License Number *</label>
                        <input type="text" id="driverLicense" class="form-input" 
                               value="${this.bookingData.driverInfo.license}" 
                               placeholder="DL123456" required>
                    </div>
                </div>
                <div class="stepper-actions">
                    <button type="button" class="btn btn-secondary" id="backToStep1">Back</button>
                    <button type="submit" class="btn btn-primary">Next</button>
                </div>
            </form>
        `;
    },
    
    renderStep3() {
        const car = this.bookingData.car;
        const calculation = calculateBookingTotal(
            car,
            this.bookingData.startDate,
            this.bookingData.endDate
        );
        
        return `
            <div class="booking-review">
                <h2 style="margin-bottom: 2rem;">Review Your Booking</h2>
                
                <div style="background: var(--bg-tertiary); border-radius: 16px; padding: 1.5rem; margin-bottom: 2rem;">
                    <h3 style="margin-bottom: 1rem;">Car Details</h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <div>
                            <p style="color: var(--text-secondary); font-size: 0.875rem;">Car</p>
                            <p style="font-weight: 700;">${car.name}</p>
                        </div>
                        <div>
                            <p style="color: var(--text-secondary); font-size: 0.875rem;">Brand</p>
                            <p style="font-weight: 700;">${car.brand}</p>
                        </div>
                        <div>
                            <p style="color: var(--text-secondary); font-size: 0.875rem;">Type</p>
                            <p style="font-weight: 700;">${car.type.toUpperCase()}</p>
                        </div>
                        <div>
                            <p style="color: var(--text-secondary); font-size: 0.875rem;">Price/Day</p>
                            <p style="font-weight: 700;">$${car.price}</p>
                        </div>
                    </div>
                </div>
                
                <div style="background: var(--bg-tertiary); border-radius: 16px; padding: 1.5rem; margin-bottom: 2rem;">
                    <h3 style="margin-bottom: 1rem;">Rental Period</h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <div>
                            <p style="color: var(--text-secondary); font-size: 0.875rem;">Start Date</p>
                            <p style="font-weight: 700;">${new Date(this.bookingData.startDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <p style="color: var(--text-secondary); font-size: 0.875rem;">End Date</p>
                            <p style="font-weight: 700;">${new Date(this.bookingData.endDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <p style="color: var(--text-secondary); font-size: 0.875rem;">Duration</p>
                            <p style="font-weight: 700;">${calculation.days} day${calculation.days !== 1 ? 's' : ''}</p>
                        </div>
                        <div>
                            <p style="color: var(--text-secondary); font-size: 0.875rem;">Pickup Location</p>
                            <p style="font-weight: 700;">${this.bookingData.pickupLocation}</p>
                        </div>
                    </div>
                </div>
                
                <div style="background: var(--bg-tertiary); border-radius: 16px; padding: 1.5rem; margin-bottom: 2rem;">
                    <h3 style="margin-bottom: 1rem;">Driver Information</h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <div>
                            <p style="color: var(--text-secondary); font-size: 0.875rem;">Name</p>
                            <p style="font-weight: 700;">${this.bookingData.driverInfo.name}</p>
                        </div>
                        <div>
                            <p style="color: var(--text-secondary); font-size: 0.875rem;">Email</p>
                            <p style="font-weight: 700;">${this.bookingData.driverInfo.email}</p>
                        </div>
                        <div>
                            <p style="color: var(--text-secondary); font-size: 0.875rem;">Phone</p>
                            <p style="font-weight: 700;">${this.bookingData.driverInfo.phone}</p>
                        </div>
                        <div>
                            <p style="color: var(--text-secondary); font-size: 0.875rem;">License</p>
                            <p style="font-weight: 700;">${this.bookingData.driverInfo.license}</p>
                        </div>
                    </div>
                </div>
                
                <div class="car-price-summary">
                    <h3 style="margin-bottom: 1rem;">Price Summary</h3>
                    <div class="price-summary-row">
                        <span>Base Price (${calculation.days} days)</span>
                        <span>$${calculation.base.toFixed(2)}</span>
                    </div>
                    <div class="price-summary-row">
                        <span>Insurance (15%)</span>
                        <span>$${calculation.insurance.toFixed(2)}</span>
                    </div>
                    <div class="price-summary-row">
                        <span>Tax (10%)</span>
                        <span>$${calculation.tax.toFixed(2)}</span>
                    </div>
                    <div class="price-summary-row total">
                        <span>Total</span>
                        <span>$${calculation.total.toFixed(2)}</span>
                    </div>
                </div>
                
                <div class="stepper-actions">
                    <button type="button" class="btn btn-secondary" id="backToStep2">Back</button>
                    <button type="button" class="btn btn-primary" id="confirmBooking">Confirm Booking</button>
                </div>
            </div>
        `;
    },
    
    setupEventListeners() {
        // Update end date min when start date changes
        document.addEventListener('change', (e) => {
            if (e.target.id === 'bookingStartDate') {
                const endDateInput = document.getElementById('bookingEndDate');
                if (endDateInput) {
                    const startDate = new Date(e.target.value);
                    startDate.setDate(startDate.getDate() + 1);
                    endDateInput.min = startDate.toISOString().split('T')[0];
                }
            }
        });
    },
    
    setupStepEventListeners() {
        // Step 1
        const step1Form = document.getElementById('step1Form');
        if (step1Form) {
            step1Form.addEventListener('submit', (e) => {
                e.preventDefault();
                if (this.validateStep1()) {
                    this.nextStep();
                }
            });
        }
        
        // Step 2
        const step2Form = document.getElementById('step2Form');
        if (step2Form) {
            step2Form.addEventListener('submit', (e) => {
                e.preventDefault();
                if (this.validateStep2()) {
                    this.nextStep();
                }
            });
        }
        
        // Navigation buttons
        const cancelBtn = document.getElementById('cancelBooking');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                this.reset();
                Modal.close('bookingModal');
            });
        }
        
        const backToStep1 = document.getElementById('backToStep1');
        if (backToStep1) {
            backToStep1.addEventListener('click', () => {
                this.prevStep();
            });
        }
        
        const backToStep2 = document.getElementById('backToStep2');
        if (backToStep2) {
            backToStep2.addEventListener('click', () => {
                this.prevStep();
            });
        }
        
        const confirmBtn = document.getElementById('confirmBooking');
        if (confirmBtn) {
            confirmBtn.addEventListener('click', () => {
                this.confirmBooking();
            });
        }
    },
    
    validateStep1() {
        const startDate = document.getElementById('bookingStartDate').value;
        const endDate = document.getElementById('bookingEndDate').value;
        const pickupLocation = document.getElementById('bookingPickupLocation').value;
        
        if (!startDate || !endDate || !pickupLocation) {
            Toast.error('Please fill in all required fields');
            return false;
        }
        
        if (new Date(endDate) <= new Date(startDate)) {
            Toast.error('End date must be after start date');
            return false;
        }
        
        this.bookingData.startDate = startDate;
        this.bookingData.endDate = endDate;
        this.bookingData.pickupLocation = pickupLocation;
        
        return true;
    },
    
    validateStep2() {
        const name = document.getElementById('driverName').value.trim();
        const email = document.getElementById('driverEmail').value.trim();
        const phone = document.getElementById('driverPhone').value.trim();
        const license = document.getElementById('driverLicense').value.trim();
        
        if (!name || !email || !phone || !license) {
            Toast.error('Please fill in all required fields');
            return false;
        }
        
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Toast.error('Please enter a valid email address');
            return false;
        }
        
        this.bookingData.driverInfo = { name, email, phone, license };
        
        return true;
    },
    
    nextStep() {
        if (this.currentStep < this.totalSteps) {
            this.currentStep++;
            this.renderStepper();
        }
    },
    
    prevStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.renderStepper();
        }
    },
    
    confirmBooking() {
        const calculation = calculateBookingTotal(
            this.bookingData.car,
            this.bookingData.startDate,
            this.bookingData.endDate
        );
        
        const booking = {
            carId: this.bookingData.car.id,
            carName: this.bookingData.car.name,
            carBrand: this.bookingData.car.brand,
            startDate: this.bookingData.startDate,
            endDate: this.bookingData.endDate,
            pickupLocation: this.bookingData.pickupLocation,
            driverInfo: this.bookingData.driverInfo,
            total: calculation.total,
            days: calculation.days
        };
        
        const newBooking = addBooking(booking);
        
        // Show success screen
        this.showSuccess(newBooking);
    },
    
    showSuccess(booking) {
        const stepper = document.getElementById('bookingStepper');
        if (!stepper) return;
        
        stepper.innerHTML = `
            <div class="booking-success">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M9 11l3 3L22 4"></path>
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                </svg>
                <h2>Booking Confirmed!</h2>
                <p>Your booking has been successfully confirmed.</p>
                <div class="booking-reference">${booking.id}</div>
                <p style="font-size: 0.875rem; color: var(--text-secondary);">
                    Please save this reference number for your records.
                </p>
                <div style="margin-top: 2rem;">
                    <button class="btn btn-primary" id="closeBookingModal">Done</button>
                </div>
            </div>
        `;
        
        const closeBtn = document.getElementById('closeBookingModal');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.reset();
                Modal.close('bookingModal');
                Toast.success('Booking confirmed successfully!');
                
                // Refresh bookings view if active
                if (typeof App !== 'undefined' && App.renderBookings) {
                    App.renderBookings();
                }
            });
        }
    },
    
    start(car) {
        this.bookingData.car = car;
        this.currentStep = 1;
        this.renderStepper();
        Modal.open('bookingModal');
    },
    
    reset() {
        this.currentStep = 1;
        this.bookingData = {
            car: null,
            startDate: '',
            endDate: '',
            pickupLocation: '',
            driverInfo: {
                name: '',
                email: '',
                phone: '',
                license: ''
            }
        };
    }
};

// Initialize booking flow
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        BookingFlow.init();
    });
} else {
    BookingFlow.init();
}

