// ViLaw - Hệ thống quản lý chức năng toàn diện
class ViLawApp {
    constructor() {
        this.currentUser = null;
        this.isLoggedIn = false;
        this.chatHistory = [];
        this.legalDocuments = [];
        this.contracts = [];
        this.bookmarks = [];
        this.settings = {
            theme: 'light',
            language: 'vi',
            notifications: true,
            aiEnabled: true
        };
        
        this.init();
    }
    
    init() {
        console.log('Initializing ViLaw App...');
        this.loadUserData();
        this.loadLegalDocuments();
        this.setupEventListeners();
        this.initializeComponents();
        console.log('ViLaw App initialized successfully');
    }
    
    // ==================== USER MANAGEMENT ====================
    login(email, password) {
        return new Promise((resolve, reject) => {
            // Simulate API call
            setTimeout(() => {
                if (email && password) {
                    this.currentUser = {
                        id: Date.now(),
                        email: email,
                        name: email.split('@')[0],
                        role: 'user',
                        avatar: 'https://via.placeholder.com/40',
                        joinDate: new Date().toISOString()
                    };
                    this.isLoggedIn = true;
                    this.saveUserData();
                    resolve(this.currentUser);
                } else {
                    reject(new Error('Invalid credentials'));
                }
            }, 1000);
        });
    }
    
    logout() {
        this.currentUser = null;
        this.isLoggedIn = false;
        this.saveUserData();
        this.redirectToHome();
    }
    
    register(userData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (userData.email && userData.password) {
                    this.currentUser = {
                        id: Date.now(),
                        ...userData,
                        role: 'user',
                        joinDate: new Date().toISOString()
                    };
                    this.isLoggedIn = true;
                    this.saveUserData();
                    resolve(this.currentUser);
                } else {
                    reject(new Error('Registration failed'));
                }
            }, 1500);
        });
    }
    
    // ==================== CHAT AI FUNCTIONALITY ====================
    async sendChatMessage(message) {
        if (!this.isLoggedIn) {
            throw new Error('Please login to use chat');
        }
        
        const userMessage = {
            id: Date.now(),
            type: 'user',
            content: message,
            timestamp: new Date(),
            userId: this.currentUser.id
        };
        
        this.chatHistory.push(userMessage);
        
        // Simulate AI processing
        const aiResponse = await this.generateAIResponse(message);
        
        const aiMessage = {
            id: Date.now() + 1,
            type: 'ai',
            content: aiResponse,
            timestamp: new Date(),
            userId: this.currentUser.id
        };
        
        this.chatHistory.push(aiMessage);
        this.saveChatHistory();
        
        return aiMessage;
    }
    
    async generateAIResponse(userInput) {
        // Simulate AI processing time
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
        
        const relevantDocs = this.findRelevantDocuments(userInput);
        const intent = this.analyzeUserIntent(userInput);
        
        if (relevantDocs.length === 0) {
            return this.generateGeneralResponse(intent);
        }
        
        const topDoc = relevantDocs[0];
        let response = `Dựa trên ${relevantDocs.length} văn bản pháp luật liên quan:\n\n`;
        response += `📋 **${topDoc.title}**\n`;
        response += `📅 Ngày: ${new Date(topDoc.date).toLocaleDateString('vi-VN')}\n`;
        response += `📂 Loại: ${topDoc.type}\n`;
        response += `🏛️ Nguồn: ${topDoc.source}\n\n`;
        response += `**Nội dung liên quan:**\n`;
        response += this.extractRelevantContent(userInput, topDoc.content);
        response += `\n\n⚠️ **Lưu ý:** Thông tin tham khảo. Tham khảo luật sư để có câu trả lời chính xác.`;
        
        return response;
    }
    
    findRelevantDocuments(userInput) {
        const relevantDocs = [];
        const input = userInput.toLowerCase();
        
        for (const doc of this.legalDocuments) {
            let score = 0;
            
            // Title match
            if (doc.title.toLowerCase().includes(input)) {
                score += 0.8;
            }
            
            // Keyword matches
            for (const keyword of doc.keywords) {
                if (input.includes(keyword.toLowerCase())) {
                    score += 0.6;
                }
            }
            
            // Content word matches
            const inputWords = input.split(/\s+/).filter(word => word.length > 2);
            const contentWords = doc.content.toLowerCase().split(/\s+/);
            
            let wordMatches = 0;
            for (const word of inputWords) {
                if (contentWords.includes(word)) {
                    wordMatches++;
                }
            }
            
            score += (wordMatches / inputWords.length) * 0.4;
            
            if (score > 0.3) {
                relevantDocs.push({ ...doc, relevanceScore: score });
            }
        }
        
        return relevantDocs.sort((a, b) => b.relevanceScore - a.relevanceScore).slice(0, 3);
    }
    
    analyzeUserIntent(userInput) {
        const input = userInput.toLowerCase();
        
        if (input.includes('hiến pháp') || input.includes('cơ bản')) return 'constitutional';
        else if (input.includes('hình sự') || input.includes('tội phạm')) return 'criminal';
        else if (input.includes('dân sự') || input.includes('sở hữu')) return 'civil';
        else if (input.includes('lao động') || input.includes('việc làm')) return 'labor';
        else if (input.includes('doanh nghiệp') || input.includes('công ty')) return 'business';
        else if (input.includes('hôn nhân') || input.includes('gia đình')) return 'family';
        else if (input.includes('đất đai') || input.includes('nhà ở')) return 'property';
        else if (input.includes('an ninh mạng') || input.includes('dữ liệu')) return 'cybersecurity';
        else if (input.includes('thuế') || input.includes('khai thuế')) return 'tax';
        else if (input.includes('giao thông') || input.includes('xử phạt')) return 'traffic';
        else if (input.includes('covid') || input.includes('dịch bệnh')) return 'covid';
        else if (input.includes('hợp đồng') || input.includes('thỏa thuận')) return 'contract';
        else return 'general';
    }
    
    generateGeneralResponse(intent) {
        const responses = {
            'constitutional': 'Về Hiến pháp và quyền cơ bản, tôi có thể cung cấp thông tin về các quyền và nghĩa vụ của công dân.',
            'criminal': 'Về luật hình sự, tôi có thể giúp bạn hiểu về tội phạm, hình phạt và thủ tục tố tụng.',
            'civil': 'Về luật dân sự, tôi có thể hỗ trợ về quyền sở hữu, thừa kế, hợp đồng dân sự.',
            'business': 'Về pháp luật doanh nghiệp, tôi có thể giúp về thành lập, quản lý doanh nghiệp.',
            'labor': 'Về quyền lao động, tôi có thể cung cấp thông tin về quan hệ lao động, tiền lương.',
            'property': 'Về luật đất đai và nhà ở, tôi có thể giúp về quyền sở hữu, sử dụng đất đai.',
            'cybersecurity': 'Về luật an ninh mạng, tôi có thể cung cấp thông tin về bảo vệ dữ liệu cá nhân.',
            'tax': 'Về thuế, tôi có thể hỗ trợ về khai thuế, nộp thuế, hoàn thuế.',
            'traffic': 'Về luật giao thông, tôi có thể cung cấp thông tin về xử phạt vi phạm.',
            'covid': 'Về COVID-19, tôi có thể cung cấp thông tin về các biện pháp phòng chống.',
            'contract': 'Về hợp đồng, tôi có thể giúp hiểu về ký kết, thực hiện hợp đồng.',
            'general': 'Tôi có thể giúp bạn về tất cả các loại văn bản pháp luật Việt Nam!'
        };
        
        return responses[intent] || responses['general'];
    }
    
    extractRelevantContent(userInput, content) {
        const sentences = content.split(/[.!?]+/);
        const input = userInput.toLowerCase();
        
        const relevantSentences = sentences.filter(sentence => 
            sentence.toLowerCase().includes(input) ||
            sentence.toLowerCase().includes(input.split(' ')[0])
        );
        
        if (relevantSentences.length === 0) {
            return content.substring(0, 200) + '...';
        }
        
        return relevantSentences.slice(0, 2).join('. ') + '.';
    }
    
    // ==================== LEGAL DOCUMENTS ====================
    searchLegalDocuments(query, filters = {}) {
        let results = this.legalDocuments;
        
        if (query) {
            const searchTerm = query.toLowerCase();
            results = results.filter(doc => 
                doc.title.toLowerCase().includes(searchTerm) ||
                doc.content.toLowerCase().includes(searchTerm) ||
                doc.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm))
            );
        }
        
        if (filters.type) {
            results = results.filter(doc => doc.type === filters.type);
        }
        
        if (filters.source) {
            results = results.filter(doc => doc.source === filters.source);
        }
        
        if (filters.dateFrom) {
            results = results.filter(doc => new Date(doc.date) >= new Date(filters.dateFrom));
        }
        
        if (filters.dateTo) {
            results = results.filter(doc => new Date(doc.date) <= new Date(filters.dateTo));
        }
        
        return results.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    
    getDocumentById(id) {
        return this.legalDocuments.find(doc => doc.id === id);
    }
    
    bookmarkDocument(documentId) {
        if (!this.isLoggedIn) {
            throw new Error('Please login to bookmark documents');
        }
        
        const doc = this.getDocumentById(documentId);
        if (!doc) {
            throw new Error('Document not found');
        }
        
        const bookmark = {
            id: Date.now(),
            documentId: documentId,
            userId: this.currentUser.id,
            timestamp: new Date(),
            title: doc.title,
            type: doc.type
        };
        
        this.bookmarks.push(bookmark);
        this.saveBookmarks();
        return bookmark;
    }
    
    removeBookmark(bookmarkId) {
        this.bookmarks = this.bookmarks.filter(b => b.id !== bookmarkId);
        this.saveBookmarks();
    }
    
    // ==================== CONTRACT MANAGEMENT ====================
    createContract(contractData) {
        if (!this.isLoggedIn) {
            throw new Error('Please login to create contracts');
        }
        
        const contract = {
            id: Date.now(),
            ...contractData,
            userId: this.currentUser.id,
            status: 'draft',
            createdAt: new Date(),
            updatedAt: new Date()
        };
        
        this.contracts.push(contract);
        this.saveContracts();
        return contract;
    }
    
    updateContract(contractId, updates) {
        const contract = this.contracts.find(c => c.id === contractId);
        if (!contract) {
            throw new Error('Contract not found');
        }
        
        Object.assign(contract, updates, { updatedAt: new Date() });
        this.saveContracts();
        return contract;
    }
    
    deleteContract(contractId) {
        this.contracts = this.contracts.filter(c => c.id !== contractId);
        this.saveContracts();
    }
    
    getContractById(contractId) {
        return this.contracts.find(c => c.id === contractId);
    }
    
    getUserContracts() {
        if (!this.isLoggedIn) return [];
        return this.contracts.filter(c => c.userId === this.currentUser.id);
    }
    
    // ==================== DOCUMENT GENERATION ====================
    generateDocument(template, data) {
        let content = template;
        
        // Replace placeholders with data
        for (const [key, value] of Object.entries(data)) {
            const placeholder = `{{${key}}}`;
            content = content.replace(new RegExp(placeholder, 'g'), value);
        }
        
        return {
            id: Date.now(),
            content: content,
            template: template,
            data: data,
            generatedAt: new Date(),
            userId: this.currentUser?.id
        };
    }
    
    downloadDocument(document, filename) {
        const blob = new Blob([document.content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename || 'document.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
    // ==================== ANALYTICS & REPORTING ====================
    getAnalytics() {
        return {
            totalUsers: this.getTotalUsers(),
            totalDocuments: this.legalDocuments.length,
            totalContracts: this.contracts.length,
            totalChatMessages: this.chatHistory.length,
            popularDocuments: this.getPopularDocuments(),
            userActivity: this.getUserActivity(),
            performance: this.getPerformanceMetrics(),
            engagement: this.getEngagementMetrics(),
            trends: this.getTrends()
        };
    }
    
    getPerformanceMetrics() {
        return {
            averageResponseTime: this.calculateAverageResponseTime(),
            successRate: this.calculateSuccessRate(),
            userSatisfaction: this.calculateUserSatisfaction(),
            systemUptime: this.calculateSystemUptime()
        };
    }
    
    getEngagementMetrics() {
        return {
            dailyActiveUsers: this.getDailyActiveUsers(),
            sessionDuration: this.getAverageSessionDuration(),
            featureUsage: this.getFeatureUsage(),
            retentionRate: this.getRetentionRate()
        };
    }
    
    getTrends() {
        return {
            popularQueries: this.getPopularQueries(),
            trendingTopics: this.getTrendingTopics(),
            userGrowth: this.getUserGrowth(),
            contentConsumption: this.getContentConsumption()
        };
    }
    
    calculateAverageResponseTime() {
        const responses = this.chatHistory.filter(msg => msg.type === 'ai');
        if (responses.length === 0) return 0;
        
        const totalTime = responses.reduce((sum, msg) => sum + (msg.responseTime || 0), 0);
        return Math.round(totalTime / responses.length);
    }
    
    calculateSuccessRate() {
        const totalInteractions = this.chatHistory.length;
        const successfulInteractions = this.chatHistory.filter(msg => 
            msg.type === 'ai' && msg.rating && msg.rating >= 4
        ).length;
        
        return totalInteractions > 0 ? Math.round((successfulInteractions / totalInteractions) * 100) : 0;
    }
    
    calculateUserSatisfaction() {
        const ratedMessages = this.chatHistory.filter(msg => msg.rating);
        if (ratedMessages.length === 0) return 0;
        
        const totalRating = ratedMessages.reduce((sum, msg) => sum + msg.rating, 0);
        return Math.round((totalRating / ratedMessages.length) * 20); // Convert to percentage
    }
    
    calculateSystemUptime() {
        // Simulate system uptime calculation
        return 99.9;
    }
    
    getDailyActiveUsers() {
        const today = new Date();
        const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        
        return this.userInteractions.filter(interaction => 
            new Date(interaction.timestamp) >= startOfDay
        ).length;
    }
    
    getAverageSessionDuration() {
        // Simulate session duration calculation
        return Math.floor(Math.random() * 30) + 10; // 10-40 minutes
    }
    
    getFeatureUsage() {
        return {
            chat: this.chatHistory.length,
            documents: this.legalDocuments.length,
            contracts: this.contracts.length,
            search: this.searchQueries.length
        };
    }
    
    getRetentionRate() {
        // Simulate retention rate calculation
        return Math.floor(Math.random() * 20) + 70; // 70-90%
    }
    
    getPopularQueries() {
        const queryCounts = {};
        this.chatHistory.forEach(msg => {
            if (msg.type === 'user') {
                const query = msg.content.toLowerCase();
                queryCounts[query] = (queryCounts[query] || 0) + 1;
            }
        });
        
        return Object.entries(queryCounts)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 10)
            .map(([query, count]) => ({ query, count }));
    }
    
    getTrendingTopics() {
        const topics = ['doanh nghiệp', 'lao động', 'dân sự', 'hình sự', 'thuế', 'đất đai'];
        return topics.map(topic => ({
            topic,
            growth: Math.floor(Math.random() * 50) + 10
        }));
    }
    
    getUserGrowth() {
        const months = [];
        for (let i = 11; i >= 0; i--) {
            const date = new Date();
            date.setMonth(date.getMonth() - i);
            months.push({
                month: date.toLocaleDateString('vi-VN', { month: 'short' }),
                users: Math.floor(Math.random() * 100) + 50
            });
        }
        return months;
    }
    
    getContentConsumption() {
        return {
            documentsViewed: this.legalDocuments.reduce((sum, doc) => sum + (doc.views || 0), 0),
            contractsCreated: this.contracts.length,
            chatMessages: this.chatHistory.length,
            searchQueries: this.searchQueries.length
        };
    }
    
    getTotalUsers() {
        // Simulate user count
        return Math.floor(Math.random() * 1000) + 500;
    }
    
    getPopularDocuments() {
        // Simulate popular documents based on bookmarks
        return this.legalDocuments
            .sort((a, b) => b.views - a.views)
            .slice(0, 5);
    }
    
    getUserActivity() {
        if (!this.isLoggedIn) return null;
        
        return {
            loginCount: this.currentUser.loginCount || 1,
            lastLogin: this.currentUser.lastLogin || new Date(),
            documentsViewed: this.currentUser.documentsViewed || 0,
            contractsCreated: this.getUserContracts().length,
            chatMessages: this.chatHistory.filter(m => m.userId === this.currentUser.id).length
        };
    }
    
    // ==================== SETTINGS & PREFERENCES ====================
    updateSettings(newSettings) {
        this.settings = { ...this.settings, ...newSettings };
        this.saveSettings();
    }
    
    getSettings() {
        return this.settings;
    }
    
    // ==================== NOTIFICATIONS ====================
    showNotification(message, type = 'info') {
        const notification = {
            id: Date.now(),
            message: message,
            type: type,
            timestamp: new Date(),
            read: false
        };
        
        // Add to UI if notification system exists
        if (window.showNotification) {
            window.showNotification(notification);
        }
        
        return notification;
    }
    
    // ==================== DATA PERSISTENCE ====================
    saveUserData() {
        localStorage.setItem('vilaw_user', JSON.stringify({
            currentUser: this.currentUser,
            isLoggedIn: this.isLoggedIn
        }));
    }
    
    loadUserData() {
        const saved = localStorage.getItem('vilaw_user');
        if (saved) {
            const data = JSON.parse(saved);
            this.currentUser = data.currentUser;
            this.isLoggedIn = data.isLoggedIn;
        }
    }
    
    saveChatHistory() {
        localStorage.setItem('vilaw_chat_history', JSON.stringify(this.chatHistory));
    }
    
    loadChatHistory() {
        const saved = localStorage.getItem('vilaw_chat_history');
        if (saved) {
            this.chatHistory = JSON.parse(saved);
        }
    }
    
    saveLegalDocuments() {
        localStorage.setItem('vilaw_legal_documents', JSON.stringify(this.legalDocuments));
    }
    
    loadLegalDocuments() {
        const saved = localStorage.getItem('vilaw_legal_documents');
        if (saved) {
            this.legalDocuments = JSON.parse(saved);
        } else {
            this.legalDocuments = this.getSampleLegalData();
        }
    }
    
    saveContracts() {
        localStorage.setItem('vilaw_contracts', JSON.stringify(this.contracts));
    }
    
    loadContracts() {
        const saved = localStorage.getItem('vilaw_contracts');
        if (saved) {
            this.contracts = JSON.parse(saved);
        }
    }
    
    saveBookmarks() {
        localStorage.setItem('vilaw_bookmarks', JSON.stringify(this.bookmarks));
    }
    
    loadBookmarks() {
        const saved = localStorage.getItem('vilaw_bookmarks');
        if (saved) {
            this.bookmarks = JSON.parse(saved);
        }
    }
    
    saveSettings() {
        localStorage.setItem('vilaw_settings', JSON.stringify(this.settings));
    }
    
    loadSettings() {
        const saved = localStorage.getItem('vilaw_settings');
        if (saved) {
            this.settings = JSON.parse(saved);
        }
    }
    
    // ==================== SAMPLE DATA ====================
    getSampleLegalData() {
        return [
            {
                id: 'doc_1',
                title: 'Hiến pháp nước Cộng hòa xã hội chủ nghĩa Việt Nam 2013',
                content: 'Hiến pháp là luật cơ bản của nước Cộng hòa xã hội chủ nghĩa Việt Nam, có hiệu lực pháp lý cao nhất.',
                type: 'Hiến pháp',
                source: 'Quốc hội',
                date: '2013-11-28T00:00:00.000Z',
                keywords: ['hiến pháp', 'cơ bản', 'quyền', 'nghĩa vụ', 'công dân'],
                views: 1250
            },
            {
                id: 'doc_2',
                title: 'Luật Doanh nghiệp 2020',
                content: 'Luật này quy định về việc thành lập, quản lý, tổ chức lại, giải thể doanh nghiệp.',
                type: 'Luật',
                source: 'Quốc hội',
                date: '2020-06-17T00:00:00.000Z',
                keywords: ['doanh nghiệp', 'thành lập', 'quản lý', 'giải thể'],
                views: 980
            },
            {
                id: 'doc_3',
                title: 'Luật Lao động 2019',
                content: 'Luật này quy định về quyền và nghĩa vụ của người lao động, người sử dụng lao động.',
                type: 'Luật',
                source: 'Quốc hội',
                date: '2019-11-20T00:00:00.000Z',
                keywords: ['lao động', 'quyền', 'nghĩa vụ', 'lương'],
                views: 1100
            }
        ];
    }
    
    // ==================== EVENT LISTENERS ====================
    setupEventListeners() {
        // Global event listeners
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-action="login"]')) {
                this.handleLogin(e);
            }
            if (e.target.matches('[data-action="logout"]')) {
                this.handleLogout(e);
            }
            if (e.target.matches('[data-action="bookmark"]')) {
                this.handleBookmark(e);
            }
        });
    }
    
    handleLogin(e) {
        e.preventDefault();
        // Handle login logic
    }
    
    handleLogout(e) {
        e.preventDefault();
        this.logout();
    }
    
    handleBookmark(e) {
        e.preventDefault();
        const documentId = e.target.dataset.documentId;
        if (documentId) {
            this.bookmarkDocument(documentId);
        }
    }
    
    // ==================== COMPONENT INITIALIZATION ====================
    initializeComponents() {
        // Initialize chat if chat component exists
        if (document.getElementById('chatContainer')) {
            this.initializeChat();
        }
        
        // Initialize document search if search component exists
        if (document.getElementById('searchForm')) {
            this.initializeSearch();
        }
        
        // Initialize contract management if contract component exists
        if (document.getElementById('contractForm')) {
            this.initializeContracts();
        }
    }
    
    initializeChat() {
        console.log('Initializing chat component...');
        // Chat initialization logic
    }
    
    initializeSearch() {
        console.log('Initializing search component...');
        // Search initialization logic
    }
    
    initializeContracts() {
        console.log('Initializing contract component...');
        // Contract initialization logic
    }
    
    // ==================== NAVIGATION ====================
    navigateTo(page) {
        // Simple navigation logic
        window.location.href = `${page}.html`;
    }
    
    redirectToHome() {
        window.location.href = 'index.html';
    }
    
    // ==================== UTILITY METHODS ====================
    formatDate(date) {
        return new Date(date).toLocaleDateString('vi-VN');
    }
    
    formatDateTime(date) {
        return new Date(date).toLocaleString('vi-VN');
    }
    
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Global instance
window.vilawApp = new ViLawApp();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ViLawApp;
}
