// ViLaw - Hệ thống thanh toán
class PaymentSystem {
    constructor() {
        this.paymentMethods = [];
        this.subscriptions = [];
        this.invoices = [];
        this.transactions = [];
        this.pricing = {};
        this.paymentConfig = {};
        
        this.init();
    }
    
    init() {
        console.log('Initializing Payment System...');
        this.loadPaymentConfig();
        this.loadPricing();
        this.loadPaymentMethods();
        this.loadSubscriptions();
        this.loadInvoices();
        this.loadTransactions();
        console.log('Payment System initialized successfully');
    }
    
    // ==================== PAYMENT CONFIGURATION ====================
    loadPaymentConfig() {
        this.paymentConfig = {
            currency: 'VND',
            taxRate: 0.1, // 10% VAT
            processingFee: 0.03, // 3% processing fee
            minAmount: 10000, // 10,000 VND minimum
            maxAmount: 100000000, // 100,000,000 VND maximum
            timeout: 300000, // 5 minutes
            retryAttempts: 3,
            webhookUrl: 'https://api.vilaw.vn/webhooks/payment',
            successUrl: 'https://vilaw.vn/payment/success',
            cancelUrl: 'https://vilaw.vn/payment/cancel'
        };
    }
    
    loadPricing() {
        this.pricing = {
            plans: {
                free: {
                    id: 'free',
                    name: 'Miễn phí',
                    price: 0,
                    currency: 'VND',
                    features: [
                        '5 câu hỏi AI/ngày',
                        'Tìm kiếm cơ bản',
                        '3 hợp đồng mẫu',
                        'Hỗ trợ email'
                    ],
                    limits: {
                        aiQueries: 5,
                        documents: 10,
                        contracts: 3,
                        storage: '10MB'
                    }
                },
                basic: {
                    id: 'basic',
                    name: 'Cơ bản',
                    price: 99000,
                    currency: 'VND',
                    period: 'month',
                    features: [
                        '50 câu hỏi AI/ngày',
                        'Tìm kiếm nâng cao',
                        '20 hợp đồng mẫu',
                        'Hỗ trợ ưu tiên',
                        'Xuất PDF'
                    ],
                    limits: {
                        aiQueries: 50,
                        documents: 100,
                        contracts: 20,
                        storage: '100MB'
                    }
                },
                professional: {
                    id: 'professional',
                    name: 'Chuyên nghiệp',
                    price: 299000,
                    currency: 'VND',
                    period: 'month',
                    features: [
                        '200 câu hỏi AI/ngày',
                        'Tìm kiếm không giới hạn',
                        '100 hợp đồng mẫu',
                        'Hỗ trợ 24/7',
                        'API access',
                        'Tích hợp CRM'
                    ],
                    limits: {
                        aiQueries: 200,
                        documents: -1, // unlimited
                        contracts: 100,
                        storage: '1GB'
                    }
                },
                enterprise: {
                    id: 'enterprise',
                    name: 'Doanh nghiệp',
                    price: 999000,
                    currency: 'VND',
                    period: 'month',
                    features: [
                        'Không giới hạn AI',
                        'Tìm kiếm không giới hạn',
                        'Hợp đồng không giới hạn',
                        'Hỗ trợ chuyên dụng',
                        'API không giới hạn',
                        'Tích hợp tùy chỉnh',
                        'Báo cáo nâng cao'
                    ],
                    limits: {
                        aiQueries: -1, // unlimited
                        documents: -1, // unlimited
                        contracts: -1, // unlimited
                        storage: '10GB'
                    }
                }
            },
            addons: {
                extraAI: {
                    name: 'Thêm câu hỏi AI',
                    price: 10000,
                    currency: 'VND',
                    unit: 'per_100_queries'
                },
                extraStorage: {
                    name: 'Thêm dung lượng',
                    price: 50000,
                    currency: 'VND',
                    unit: 'per_GB'
                },
                prioritySupport: {
                    name: 'Hỗ trợ ưu tiên',
                    price: 200000,
                    currency: 'VND',
                    unit: 'per_month'
                }
            }
        };
    }
    
    // ==================== PAYMENT METHODS ====================
    loadPaymentMethods() {
        this.paymentMethods = [
            {
                id: 'vnpay',
                name: 'VNPay',
                type: 'gateway',
                icon: 'credit-card',
                enabled: true,
                config: {
                    merchantId: 'VILAW001',
                    merchantName: 'ViLaw Platform',
                    returnUrl: 'https://vilaw.vn/payment/return',
                    notifyUrl: 'https://api.vilaw.vn/webhooks/vnpay'
                }
            },
            {
                id: 'momo',
                name: 'MoMo',
                type: 'ewallet',
                icon: 'smartphone',
                enabled: true,
                config: {
                    partnerCode: 'MOMOVILAW',
                    accessKey: 'your_access_key',
                    secretKey: 'your_secret_key'
                }
            },
            {
                id: 'zalopay',
                name: 'ZaloPay',
                type: 'ewallet',
                icon: 'smartphone',
                enabled: true,
                config: {
                    appId: 'ZALOVILAW',
                    key1: 'your_key1',
                    key2: 'your_key2'
                }
            },
            {
                id: 'bank_transfer',
                name: 'Chuyển khoản ngân hàng',
                type: 'bank',
                icon: 'building',
                enabled: true,
                config: {
                    bankName: 'Vietcombank',
                    accountNumber: '1234567890',
                    accountName: 'ViLaw Platform',
                    branch: 'Hà Nội'
                }
            },
            {
                id: 'credit_card',
                name: 'Thẻ tín dụng',
                type: 'card',
                icon: 'credit-card',
                enabled: true,
                config: {
                    supportedCards: ['visa', 'mastercard', 'jcb'],
                    currency: 'VND'
                }
            }
        ];
    }
    
    // ==================== SUBSCRIPTION MANAGEMENT ====================
    createSubscription(userId, planId, paymentMethodId, billingInfo = {}) {
        const plan = this.pricing.plans[planId];
        if (!plan) {
            throw new Error('Invalid plan ID');
        }
        
        const subscription = {
            id: this.generateId(),
            userId: userId,
            planId: planId,
            plan: plan,
            status: 'pending',
            startDate: new Date(),
            endDate: this.calculateEndDate(plan.period),
            paymentMethodId: paymentMethodId,
            billingInfo: billingInfo,
            amount: plan.price,
            currency: plan.currency,
            tax: this.calculateTax(plan.price),
            total: this.calculateTotal(plan.price),
            createdAt: new Date(),
            updatedAt: new Date()
        };
        
        this.subscriptions.push(subscription);
        this.saveSubscriptions();
        
        return subscription;
    }
    
    updateSubscription(subscriptionId, updates) {
        const index = this.subscriptions.findIndex(sub => sub.id === subscriptionId);
        if (index !== -1) {
            this.subscriptions[index] = {
                ...this.subscriptions[index],
                ...updates,
                updatedAt: new Date()
            };
            this.saveSubscriptions();
            return this.subscriptions[index];
        }
        return null;
    }
    
    cancelSubscription(subscriptionId, reason = '') {
        return this.updateSubscription(subscriptionId, {
            status: 'cancelled',
            cancelledAt: new Date(),
            cancelReason: reason
        });
    }
    
    renewSubscription(subscriptionId) {
        const subscription = this.subscriptions.find(sub => sub.id === subscriptionId);
        if (!subscription) {
            throw new Error('Subscription not found');
        }
        
        const newEndDate = this.calculateEndDate(subscription.plan.period, subscription.endDate);
        return this.updateSubscription(subscriptionId, {
            endDate: newEndDate,
            status: 'active',
            renewedAt: new Date()
        });
    }
    
    getUserSubscriptions(userId) {
        return this.subscriptions.filter(sub => sub.userId === userId);
    }
    
    getActiveSubscription(userId) {
        return this.subscriptions.find(sub => 
            sub.userId === userId && 
            sub.status === 'active' && 
            new Date(sub.endDate) > new Date()
        );
    }
    
    // ==================== INVOICE MANAGEMENT ====================
    createInvoice(subscriptionId, items = []) {
        const subscription = this.subscriptions.find(sub => sub.id === subscriptionId);
        if (!subscription) {
            throw new Error('Subscription not found');
        }
        
        const invoice = {
            id: this.generateId(),
            subscriptionId: subscriptionId,
            userId: subscription.userId,
            items: items.length > 0 ? items : [{
                description: subscription.plan.name,
                quantity: 1,
                unitPrice: subscription.plan.price,
                total: subscription.plan.price
            }],
            subtotal: this.calculateSubtotal(items),
            tax: this.calculateTax(this.calculateSubtotal(items)),
            total: this.calculateTotal(this.calculateSubtotal(items)),
            currency: subscription.plan.currency,
            status: 'pending',
            dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
            createdAt: new Date(),
            updatedAt: new Date()
        };
        
        this.invoices.push(invoice);
        this.saveInvoices();
        
        return invoice;
    }
    
    markInvoicePaid(invoiceId, paymentMethodId, transactionId) {
        const invoice = this.invoices.find(inv => inv.id === invoiceId);
        if (!invoice) {
            throw new Error('Invoice not found');
        }
        
        invoice.status = 'paid';
        invoice.paidAt = new Date();
        invoice.paymentMethodId = paymentMethodId;
        invoice.transactionId = transactionId;
        invoice.updatedAt = new Date();
        
        this.saveInvoices();
        
        // Update subscription status
        const subscription = this.subscriptions.find(sub => sub.id === invoice.subscriptionId);
        if (subscription) {
            subscription.status = 'active';
            subscription.updatedAt = new Date();
            this.saveSubscriptions();
        }
        
        return invoice;
    }
    
    getUserInvoices(userId) {
        return this.invoices.filter(inv => inv.userId === userId);
    }
    
    // ==================== TRANSACTION MANAGEMENT ====================
    createTransaction(invoiceId, paymentMethodId, amount, currency = 'VND') {
        const transaction = {
            id: this.generateId(),
            invoiceId: invoiceId,
            paymentMethodId: paymentMethodId,
            amount: amount,
            currency: currency,
            status: 'pending',
            createdAt: new Date(),
            updatedAt: new Date()
        };
        
        this.transactions.push(transaction);
        this.saveTransactions();
        
        return transaction;
    }
    
    processPayment(transactionId, paymentData) {
        const transaction = this.transactions.find(t => t.id === transactionId);
        if (!transaction) {
            throw new Error('Transaction not found');
        }
        
        // Simulate payment processing
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const success = Math.random() > 0.1; // 90% success rate
                
                if (success) {
                    transaction.status = 'completed';
                    transaction.completedAt = new Date();
                    transaction.paymentData = paymentData;
                    this.saveTransactions();
                    
                    // Update invoice
                    const invoice = this.invoices.find(inv => inv.id === transaction.invoiceId);
                    if (invoice) {
                        this.markInvoicePaid(invoice.id, transaction.paymentMethodId, transaction.id);
                    }
                    
                    resolve({
                        success: true,
                        transaction: transaction,
                        message: 'Payment processed successfully'
                    });
                } else {
                    transaction.status = 'failed';
                    transaction.failedAt = new Date();
                    transaction.errorMessage = 'Payment processing failed';
                    this.saveTransactions();
                    
                    reject({
                        success: false,
                        transaction: transaction,
                        message: 'Payment processing failed'
                    });
                }
            }, 2000); // 2 seconds processing time
        });
    }
    
    getTransactionById(transactionId) {
        return this.transactions.find(t => t.id === transactionId);
    }
    
    getUserTransactions(userId) {
        const userInvoices = this.invoices.filter(inv => inv.userId === userId);
        const invoiceIds = userInvoices.map(inv => inv.id);
        return this.transactions.filter(t => invoiceIds.includes(t.invoiceId));
    }
    
    // ==================== PAYMENT PROCESSING ====================
    async processVNPayPayment(transactionId, returnUrl) {
        const transaction = this.getTransactionById(transactionId);
        if (!transaction) {
            throw new Error('Transaction not found');
        }
        
        const vnpayConfig = this.paymentMethods.find(m => m.id === 'vnpay').config;
        
        const paymentData = {
            vnp_Version: '2.1.0',
            vnp_Command: 'pay',
            vnp_TmnCode: vnpayConfig.merchantId,
            vnp_Amount: transaction.amount * 100, // Convert to cents
            vnp_CurrCode: transaction.currency,
            vnp_TxnRef: transaction.id,
            vnp_OrderInfo: `ViLaw Subscription - ${transaction.id}`,
            vnp_OrderType: 'other',
            vnp_Locale: 'vn',
            vnp_ReturnUrl: returnUrl || vnpayConfig.returnUrl,
            vnp_IpAddr: '127.0.0.1'
        };
        
        // Generate secure hash
        const secureHash = this.generateVNPayHash(paymentData);
        paymentData.vnp_SecureHash = secureHash;
        
        return {
            url: 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
            data: paymentData
        };
    }
    
    async processMoMoPayment(transactionId, returnUrl) {
        const transaction = this.getTransactionById(transactionId);
        if (!transaction) {
            throw new Error('Transaction not found');
        }
        
        const momoConfig = this.paymentMethods.find(m => m.id === 'momo').config;
        
        const paymentData = {
            partnerCode: momoConfig.partnerCode,
            accessKey: momoConfig.accessKey,
            requestId: transaction.id,
            amount: transaction.amount,
            orderId: transaction.id,
            orderInfo: `ViLaw Subscription - ${transaction.id}`,
            returnUrl: returnUrl || this.paymentConfig.successUrl,
            notifyUrl: momoConfig.notifyUrl,
            extraData: '',
            requestType: 'captureMoMoWallet'
        };
        
        // Generate signature
        const signature = this.generateMoMoSignature(paymentData, momoConfig.secretKey);
        paymentData.signature = signature;
        
        return {
            url: 'https://test-payment.momo.vn/v2/gateway/api/create',
            data: paymentData
        };
    }
    
    async processZaloPayPayment(transactionId, returnUrl) {
        const transaction = this.getTransactionById(transactionId);
        if (!transaction) {
            throw new Error('Transaction not found');
        }
        
        const zalopayConfig = this.paymentMethods.find(m => m.id === 'zalopay').config;
        
        const paymentData = {
            app_id: zalopayConfig.appId,
            app_user: 'ViLaw User',
            app_time: Date.now(),
            amount: transaction.amount,
            app_trans_id: transaction.id,
            description: `ViLaw Subscription - ${transaction.id}`,
            item: JSON.stringify([{
                itemid: 'vilaw_subscription',
                itemname: 'ViLaw Subscription',
                itemprice: transaction.amount,
                itemquantity: 1
            }]),
            embed_data: JSON.stringify({
                merchantinfo: 'ViLaw Platform'
            }),
            bank_code: 'zalopayapp'
        };
        
        // Generate mac
        const mac = this.generateZaloPayMac(paymentData, zalopayConfig.key1, zalopayConfig.key2);
        paymentData.mac = mac;
        
        return {
            url: 'https://sb-openapi.zalopay.vn/v2/create',
            data: paymentData
        };
    }
    
    // ==================== CALCULATIONS ====================
    calculateTax(amount) {
        return Math.round(amount * this.paymentConfig.taxRate);
    }
    
    calculateProcessingFee(amount) {
        return Math.round(amount * this.paymentConfig.processingFee);
    }
    
    calculateTotal(amount) {
        const tax = this.calculateTax(amount);
        const processingFee = this.calculateProcessingFee(amount);
        return amount + tax + processingFee;
    }
    
    calculateSubtotal(items) {
        return items.reduce((total, item) => total + (item.unitPrice * item.quantity), 0);
    }
    
    calculateEndDate(period, startDate = new Date()) {
        const date = new Date(startDate);
        
        switch (period) {
            case 'day':
                date.setDate(date.getDate() + 1);
                break;
            case 'week':
                date.setDate(date.getDate() + 7);
                break;
            case 'month':
                date.setMonth(date.getMonth() + 1);
                break;
            case 'year':
                date.setFullYear(date.getFullYear() + 1);
                break;
            default:
                date.setMonth(date.getMonth() + 1);
        }
        
        return date;
    }
    
    // ==================== SECURITY ====================
    generateVNPayHash(data) {
        // Simplified hash generation for demo
        const sortedData = Object.keys(data)
            .sort()
            .map(key => `${key}=${data[key]}`)
            .join('&');
        
        return this.simpleHash(sortedData);
    }
    
    generateMoMoSignature(data, secretKey) {
        const sortedData = Object.keys(data)
            .sort()
            .map(key => `${key}=${data[key]}`)
            .join('&');
        
        return this.simpleHash(sortedData + secretKey);
    }
    
    generateZaloPayMac(data, key1, key2) {
        const sortedData = Object.keys(data)
            .sort()
            .map(key => `${key}=${data[key]}`)
            .join('&');
        
        return this.simpleHash(sortedData + key1 + key2);
    }
    
    simpleHash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return Math.abs(hash).toString(16);
    }
    
    // ==================== DATA PERSISTENCE ====================
    saveSubscriptions() {
        localStorage.setItem('vilaw_subscriptions', JSON.stringify(this.subscriptions));
    }
    
    loadSubscriptions() {
        const saved = localStorage.getItem('vilaw_subscriptions');
        if (saved) {
            this.subscriptions = JSON.parse(saved);
        }
    }
    
    saveInvoices() {
        localStorage.setItem('vilaw_invoices', JSON.stringify(this.invoices));
    }
    
    loadInvoices() {
        const saved = localStorage.getItem('vilaw_invoices');
        if (saved) {
            this.invoices = JSON.parse(saved);
        }
    }
    
    saveTransactions() {
        localStorage.setItem('vilaw_transactions', JSON.stringify(this.transactions));
    }
    
    loadTransactions() {
        const saved = localStorage.getItem('vilaw_transactions');
        if (saved) {
            this.transactions = JSON.parse(saved);
        }
    }
    
    // ==================== UTILITY METHODS ====================
    generateId() {
        return 'pay_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    formatCurrency(amount, currency = 'VND') {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: currency
        }).format(amount);
    }
    
    formatDate(date) {
        return new Date(date).toLocaleDateString('vi-VN');
    }
    
    formatDateTime(date) {
        return new Date(date).toLocaleString('vi-VN');
    }
    
    // ==================== VALIDATION ====================
    validatePaymentAmount(amount) {
        if (amount < this.paymentConfig.minAmount) {
            throw new Error(`Minimum amount is ${this.formatCurrency(this.paymentConfig.minAmount)}`);
        }
        
        if (amount > this.paymentConfig.maxAmount) {
            throw new Error(`Maximum amount is ${this.formatCurrency(this.paymentConfig.maxAmount)}`);
        }
        
        return true;
    }
    
    validatePaymentMethod(methodId) {
        const method = this.paymentMethods.find(m => m.id === methodId);
        if (!method) {
            throw new Error('Invalid payment method');
        }
        
        if (!method.enabled) {
            throw new Error('Payment method is disabled');
        }
        
        return true;
    }
    
    // ==================== ANALYTICS ====================
    getPaymentAnalytics() {
        const totalRevenue = this.transactions
            .filter(t => t.status === 'completed')
            .reduce((sum, t) => sum + t.amount, 0);
        
        const totalTransactions = this.transactions.length;
        const successfulTransactions = this.transactions.filter(t => t.status === 'completed').length;
        const successRate = totalTransactions > 0 ? (successfulTransactions / totalTransactions) * 100 : 0;
        
        const paymentMethodStats = this.paymentMethods.map(method => ({
            method: method.name,
            count: this.transactions.filter(t => t.paymentMethodId === method.id).length,
            revenue: this.transactions
                .filter(t => t.paymentMethodId === method.id && t.status === 'completed')
                .reduce((sum, t) => sum + t.amount, 0)
        }));
        
        return {
            totalRevenue,
            totalTransactions,
            successfulTransactions,
            successRate,
            paymentMethodStats,
            currency: this.paymentConfig.currency
        };
    }
}

// Global instance
window.paymentSystem = new PaymentSystem();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PaymentSystem;
}
