// ============================================
// UI Components & Utilities
// ============================================

// Toast Notification System
const Toast = {
    container: document.getElementById('toastContainer'),
    
    show(message, type = 'info', duration = 5000) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icon = this.getIcon(type);
        const title = this.getTitle(type);
        
        toast.innerHTML = `
            <div class="toast-icon">${icon}</div>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close" aria-label="Close">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        `;
        
        this.container.appendChild(toast);
        
        // Auto remove
        const timeout = setTimeout(() => {
            this.remove(toast);
        }, duration);
        
        // Manual close
        toast.querySelector('.toast-close').addEventListener('click', () => {
            clearTimeout(timeout);
            this.remove(toast);
        });
        
        return toast;
    },
    
    getIcon(type) {
        const icons = {
            success: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"></path><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>',
            error: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>',
            info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'
        };
        return icons[type] || icons.info;
    },
    
    getTitle(type) {
        const titles = {
            success: 'Success',
            error: 'Error',
            info: 'Info'
        };
        return titles[type] || 'Info';
    },
    
    remove(toast) {
        toast.style.animation = 'toastSlideIn 0.3s ease reverse';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    },
    
    success(message) {
        return this.show(message, 'success');
    },
    
    error(message) {
        return this.show(message, 'error');
    },
    
    info(message) {
        return this.show(message, 'info');
    }
};

// Modal System
const Modal = {
    open(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            
            // Focus trap
            const focusableElements = modal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            if (focusableElements.length > 0) {
                focusableElements[0].focus();
            }
        }
    },
    
    close(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    },
    
    init() {
        // Close on overlay click
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    overlay.classList.add('hidden');
                    document.body.style.overflow = '';
                }
            });
        });
        
        // Close on close button
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', () => {
                const modal = btn.closest('.modal-overlay');
                if (modal) {
                    modal.classList.add('hidden');
                    document.body.style.overflow = '';
                }
            });
        });
        
        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.querySelectorAll('.modal-overlay').forEach(modal => {
                    if (!modal.classList.contains('hidden')) {
                        modal.classList.add('hidden');
                        document.body.style.overflow = '';
                    }
                });
            }
        });
    }
};

// Car Card Component
const CarCard = {
    create(car, options = {}) {
        const { showActions = true, onViewDetails, onBook } = options;
        
        const card = document.createElement('div');
        card.className = 'car-card';
        
        const imageSvg = this.getCarImageSvg(car.type, car.image);
        
        card.innerHTML = `
            <div class="car-card-image">
                ${imageSvg}
            </div>
            <div class="car-card-content">
                <div class="car-card-header">
                    <div>
                        <h3 class="car-card-name">${car.name}</h3>
                        <p style="color: var(--text-secondary); font-size: 0.875rem;">${car.brand}</p>
                    </div>
                    <div class="car-card-price">
                        $${car.price}<span>/day</span>
                    </div>
                </div>
                <div class="car-card-rating">
                    ${this.renderStars(car.rating)}
                    <span style="color: var(--text-secondary); font-size: 0.875rem;">${car.rating}</span>
                </div>
                <div class="car-card-tags">
                    <span class="car-tag">${car.type.toUpperCase()}</span>
                    <span class="car-tag">${car.transmission}</span>
                    <span class="car-tag">${car.seats} Seats</span>
                </div>
                ${showActions ? `
                    <div class="car-card-actions">
                        <button class="btn btn-secondary view-details-btn">View Details</button>
                        <button class="btn btn-primary book-btn">Book Now</button>
                    </div>
                ` : ''}
            </div>
        `;
        
        if (showActions) {
            const viewBtn = card.querySelector('.view-details-btn');
            const bookBtn = card.querySelector('.book-btn');
            
            if (viewBtn && onViewDetails) {
                viewBtn.addEventListener('click', () => onViewDetails(car));
            }
            
            if (bookBtn && onBook) {
                bookBtn.addEventListener('click', () => onBook(car));
            }
        }
        
        return card;
    },
    
    getCarImageSvg(type, imageType) {
        const svgs = {
            sedan: `<svg viewBox="0 0 200 100" fill="none" stroke="white" stroke-width="2">
                <rect x="20" y="40" width="160" height="40" rx="5" fill="rgba(255,255,255,0.2)"/>
                <rect x="30" y="30" width="50" height="20" rx="3" fill="rgba(255,255,255,0.3)"/>
                <rect x="120" y="30" width="50" height="20" rx="3" fill="rgba(255,255,255,0.3)"/>
                <circle cx="50" cy="85" r="8" fill="rgba(255,255,255,0.4)"/>
                <circle cx="150" cy="85" r="8" fill="rgba(255,255,255,0.4)"/>
            </svg>`,
            suv: `<svg viewBox="0 0 200 100" fill="none" stroke="white" stroke-width="2">
                <rect x="15" y="35" width="170" height="50" rx="8" fill="rgba(255,255,255,0.2)"/>
                <rect x="25" y="25" width="60" height="25" rx="4" fill="rgba(255,255,255,0.3)"/>
                <rect x="115" y="25" width="60" height="25" rx="4" fill="rgba(255,255,255,0.3)"/>
                <circle cx="50" cy="90" r="10" fill="rgba(255,255,255,0.4)"/>
                <circle cx="150" cy="90" r="10" fill="rgba(255,255,255,0.4)"/>
            </svg>`,
            hatchback: `<svg viewBox="0 0 200 100" fill="none" stroke="white" stroke-width="2">
                <rect x="25" y="45" width="150" height="35" rx="5" fill="rgba(255,255,255,0.2)"/>
                <rect x="35" y="35" width="45" height="18" rx="3" fill="rgba(255,255,255,0.3)"/>
                <rect x="120" y="35" width="45" height="18" rx="3" fill="rgba(255,255,255,0.3)"/>
                <circle cx="55" cy="88" r="7" fill="rgba(255,255,255,0.4)"/>
                <circle cx="145" cy="88" r="7" fill="rgba(255,255,255,0.4)"/>
            </svg>`,
            luxury: `<svg viewBox="0 0 200 100" fill="none" stroke="white" stroke-width="2">
                <rect x="10" y="30" width="180" height="45" rx="6" fill="rgba(255,255,255,0.25)"/>
                <rect x="20" y="20" width="70" height="22" rx="4" fill="rgba(255,255,255,0.35)"/>
                <rect x="110" y="20" width="70" height="22" rx="4" fill="rgba(255,255,255,0.35)"/>
                <circle cx="45" cy="82" r="9" fill="rgba(255,255,255,0.5)"/>
                <circle cx="155" cy="82" r="9" fill="rgba(255,255,255,0.5)"/>
            </svg>`,
            ev: `<svg viewBox="0 0 200 100" fill="none" stroke="white" stroke-width="2">
                <rect x="20" y="40" width="160" height="40" rx="5" fill="rgba(255,255,255,0.2)"/>
                <rect x="30" y="30" width="50" height="20" rx="3" fill="rgba(255,255,255,0.3)"/>
                <rect x="120" y="30" width="50" height="20" rx="3" fill="rgba(255,255,255,0.3)"/>
                <circle cx="50" cy="85" r="8" fill="rgba(255,255,255,0.4)"/>
                <circle cx="150" cy="85" r="8" fill="rgba(255,255,255,0.4)"/>
                <path d="M 100 20 L 100 30" stroke="white" stroke-width="2"/>
            </svg>`,
            van: `<svg viewBox="0 0 200 100" fill="none" stroke="white" stroke-width="2">
                <rect x="15" y="30" width="170" height="55" rx="7" fill="rgba(255,255,255,0.2)"/>
                <rect x="25" y="20" width="50" height="20" rx="3" fill="rgba(255,255,255,0.3)"/>
                <rect x="125" y="20" width="50" height="20" rx="3" fill="rgba(255,255,255,0.3)"/>
                <circle cx="50" cy="92" r="9" fill="rgba(255,255,255,0.4)"/>
                <circle cx="150" cy="92" r="9" fill="rgba(255,255,255,0.4)"/>
            </svg>`
        };
        return svgs[type] || svgs.sedan;
    },
    
    renderStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let stars = '';
        
        for (let i = 0; i < fullStars; i++) {
            stars += '<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>';
        }
        
        if (hasHalfStar) {
            stars += '<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>';
        }
        
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>';
        }
        
        return stars;
    }
};

// Loading Skeleton
const Skeleton = {
    createCard() {
        const skeleton = document.createElement('div');
        skeleton.className = 'skeleton-card';
        skeleton.innerHTML = `
            <div class="skeleton-image"></div>
            <div class="skeleton-content">
                <div class="skeleton-line"></div>
                <div class="skeleton-line short"></div>
                <div class="skeleton-line"></div>
            </div>
        `;
        return skeleton;
    },
    
    show(container, count = 6) {
        container.innerHTML = '';
        for (let i = 0; i < count; i++) {
            container.appendChild(this.createCard());
        }
        container.classList.remove('hidden');
    },
    
    hide(container) {
        container.classList.add('hidden');
    }
};

// Theme Toggle
const Theme = {
    init() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        this.setTheme(savedTheme);
        
        const toggle = document.getElementById('themeToggle');
        if (toggle) {
            toggle.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                this.setTheme(newTheme);
            });
        }
    },
    
    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }
};

// Initialize UI components when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        Modal.init();
        Theme.init();
    });
} else {
    Modal.init();
    Theme.init();
}

