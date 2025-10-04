// ViLaw Core - Advanced Application Management System

class ViLawCore {
    constructor() {
        console.log('🚀 ViLaw Core: Initializing...');
        this.version = '2.0.0';
        this.isInitialized = false;
        this.modules = new Map();
        this.eventBus = new EventTarget();
        this.performance = new PerformanceMonitor();
        this.analytics = new AnalyticsEngine();
        this.init();
    }

    async init() {
        try {
            // Initialize core modules
            await this.initializeModules();
            
            // Setup event listeners
            this.setupEventListeners();
            
            // Initialize performance monitoring
            this.performance.start();
            
            // Initialize analytics
            this.analytics.start();
            
            // Setup error handling
            this.setupErrorHandling();
            
            this.isInitialized = true;
            console.log('✅ ViLaw Core: Initialized successfully');
            
            // Emit initialization event
            this.emit('core:initialized', { version: this.version });
            
        } catch (error) {
            console.error('❌ ViLaw Core: Initialization failed:', error);
            this.handleError(error);
        }
    }

    async initializeModules() {
        const modules = [
            { name: 'app', instance: window.vilawApp },
            { name: 'legalData', instance: window.legalDataManager },
            { name: 'aiChat', instance: window.aiChatSystem },
            { name: 'payment', instance: window.paymentSystem }
        ];

        for (const module of modules) {
            if (module.instance) {
                this.modules.set(module.name, module.instance);
                console.log(`✅ Module ${module.name} loaded`);
            } else {
                console.warn(`⚠️ Module ${module.name} not found`);
            }
        }
    }

    setupEventListeners() {
        // Global click handler
        document.addEventListener('click', (e) => {
            this.handleGlobalClick(e);
        });

        // Global scroll handler
        document.addEventListener('scroll', (e) => {
            this.handleGlobalScroll(e);
        });

        // Global resize handler
        window.addEventListener('resize', (e) => {
            this.handleGlobalResize(e);
        });

        // Page visibility handler
        document.addEventListener('visibilitychange', (e) => {
            this.handleVisibilityChange(e);
        });
    }

    setupErrorHandling() {
        // Global error handler
        window.addEventListener('error', (e) => {
            this.handleError(e.error);
        });

        // Unhandled promise rejection handler
        window.addEventListener('unhandledrejection', (e) => {
            this.handleError(e.reason);
        });
    }

    handleGlobalClick(e) {
        const target = e.target;
        
        // Track button clicks
        if (target.classList.contains('btn')) {
            this.analytics.track('button_click', {
                buttonText: target.textContent,
                buttonClass: target.className,
                page: window.location.pathname
            });
        }

        // Track navigation clicks
        if (target.tagName === 'A' && target.href) {
            this.analytics.track('navigation_click', {
                url: target.href,
                text: target.textContent,
                page: window.location.pathname
            });
        }
    }

    handleGlobalScroll(e) {
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        
        if (scrollPercent > 25 && scrollPercent < 50) {
            this.analytics.track('scroll_25_percent');
        } else if (scrollPercent > 50 && scrollPercent < 75) {
            this.analytics.track('scroll_50_percent');
        } else if (scrollPercent > 75) {
            this.analytics.track('scroll_75_percent');
        }
    }

    handleGlobalResize(e) {
        this.analytics.track('window_resize', {
            width: window.innerWidth,
            height: window.innerHeight
        });
    }

    handleVisibilityChange(e) {
        if (document.hidden) {
            this.analytics.track('page_hidden');
        } else {
            this.analytics.track('page_visible');
        }
    }

    handleError(error) {
        console.error('ViLaw Core Error:', error);
        
        // Track error in analytics
        this.analytics.track('error', {
            message: error.message,
            stack: error.stack,
            page: window.location.pathname
        });

        // Show user-friendly error message
        this.showNotification('Đã xảy ra lỗi. Vui lòng thử lại sau.', 'error');
    }

    // ==================== MODULE MANAGEMENT ====================
    
    getModule(name) {
        return this.modules.get(name);
    }

    registerModule(name, instance) {
        this.modules.set(name, instance);
        console.log(`✅ Module ${name} registered`);
    }

    // ==================== EVENT SYSTEM ====================
    
    emit(eventName, data) {
        const event = new CustomEvent(eventName, { detail: data });
        this.eventBus.dispatchEvent(event);
    }

    on(eventName, callback) {
        this.eventBus.addEventListener(eventName, callback);
    }

    off(eventName, callback) {
        this.eventBus.removeEventListener(eventName, callback);
    }

    // ==================== UTILITY METHODS ====================
    
    showNotification(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            zIndex: '1000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });

        // Set background color based on type
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#3b82f6'
        };
        notification.style.backgroundColor = colors[type] || colors.info;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Animate out and remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, duration);
    }

    // ==================== PERFORMANCE MONITORING ====================
    
    getPerformanceMetrics() {
        return this.performance.getMetrics();
    }

    // ==================== ANALYTICS ====================
    
    getAnalytics() {
        return this.analytics.getData();
    }

    // ==================== DEBUGGING ====================
    
    debug() {
        console.log('🔍 ViLaw Core Debug Info:');
        console.log('Version:', this.version);
        console.log('Initialized:', this.isInitialized);
        console.log('Modules:', Array.from(this.modules.keys()));
        console.log('Performance:', this.getPerformanceMetrics());
        console.log('Analytics:', this.getAnalytics());
    }
}

// ==================== PERFORMANCE MONITOR ====================

class PerformanceMonitor {
    constructor() {
        this.metrics = {
            pageLoadTime: 0,
            domContentLoaded: 0,
            firstPaint: 0,
            firstContentfulPaint: 0,
            largestContentfulPaint: 0,
            cumulativeLayoutShift: 0,
            firstInputDelay: 0
        };
        this.observers = [];
    }

    start() {
        // Measure page load time
        window.addEventListener('load', () => {
            this.metrics.pageLoadTime = performance.now();
        });

        // Measure DOM content loaded
        document.addEventListener('DOMContentLoaded', () => {
            this.metrics.domContentLoaded = performance.now();
        });

        // Use Performance Observer for modern metrics
        if ('PerformanceObserver' in window) {
            this.setupPerformanceObservers();
        }
    }

    setupPerformanceObservers() {
        // First Paint
        try {
            const paintObserver = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.name === 'first-paint') {
                        this.metrics.firstPaint = entry.startTime;
                    }
                }
            });
            paintObserver.observe({ entryTypes: ['paint'] });
            this.observers.push(paintObserver);
        } catch (e) {
            console.warn('Paint observer not supported');
        }

        // Largest Contentful Paint
        try {
            const lcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                this.metrics.largestContentfulPaint = lastEntry.startTime;
            });
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
            this.observers.push(lcpObserver);
        } catch (e) {
            console.warn('LCP observer not supported');
        }

        // Cumulative Layout Shift
        try {
            const clsObserver = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (!entry.hadRecentInput) {
                        this.metrics.cumulativeLayoutShift += entry.value;
                    }
                }
            });
            clsObserver.observe({ entryTypes: ['layout-shift'] });
            this.observers.push(clsObserver);
        } catch (e) {
            console.warn('CLS observer not supported');
        }
    }

    getMetrics() {
        return { ...this.metrics };
    }
}

// ==================== ANALYTICS ENGINE ====================

class AnalyticsEngine {
    constructor() {
        this.events = [];
        this.sessionId = this.generateSessionId();
        this.startTime = Date.now();
    }

    start() {
        // Track page view
        this.track('page_view', {
            url: window.location.href,
            title: document.title,
            referrer: document.referrer
        });

        // Track session start
        this.track('session_start', {
            sessionId: this.sessionId,
            timestamp: new Date().toISOString()
        });
    }

    track(eventName, data = {}) {
        const event = {
            name: eventName,
            data: data,
            timestamp: new Date().toISOString(),
            sessionId: this.sessionId,
            page: window.location.pathname
        };

        this.events.push(event);
        console.log('📊 Analytics:', eventName, data);

        // Store in localStorage for persistence
        try {
            const stored = JSON.parse(localStorage.getItem('vilaw_analytics') || '[]');
            stored.push(event);
            localStorage.setItem('vilaw_analytics', JSON.stringify(stored.slice(-1000))); // Keep last 1000 events
        } catch (e) {
            console.warn('Failed to store analytics event');
        }
    }

    getData() {
        return {
            sessionId: this.sessionId,
            events: this.events,
            sessionDuration: Date.now() - this.startTime,
            totalEvents: this.events.length
        };
    }

    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
}

// ==================== INITIALIZATION ====================

// Initialize ViLaw Core when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.vilawCore = new ViLawCore();
    
    // Make core accessible globally
    window.ViLaw = {
        core: window.vilawCore,
        version: '2.0.0',
        debug: () => window.vilawCore.debug()
    };
    
    console.log('🎉 ViLaw Core loaded successfully!');
    console.log('💡 Use ViLaw.debug() to see debug information');
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ViLawCore, PerformanceMonitor, AnalyticsEngine };
}
