// ViLaw - Hệ thống quản lý dữ liệu pháp luật
class LegalDataManager {
    constructor() {
        this.documents = [];
        this.categories = [];
        this.sources = [];
        this.keywords = [];
        this.lastUpdate = null;
        this.updateInterval = 24 * 60 * 60 * 1000; // 24 hours
        
        this.init();
    }
    
    init() {
        console.log('Initializing Legal Data Manager...');
        this.loadData();
        this.setupAutoUpdate();
        console.log('Legal Data Manager initialized');
    }
    
    // ==================== DATA LOADING ====================
    loadData() {
        this.loadDocuments();
        this.loadCategories();
        this.loadSources();
        this.loadKeywords();
    }
    
    loadDocuments() {
        const saved = localStorage.getItem('vilaw_legal_documents');
        if (saved) {
            this.documents = JSON.parse(saved);
        } else {
            this.documents = this.getComprehensiveLegalData();
            this.saveDocuments();
        }
    }
    
    loadCategories() {
        this.categories = [
            { id: 'constitutional', name: 'Hiến pháp', color: '#FF6B6B' },
            { id: 'civil', name: 'Dân sự', color: '#4ECDC4' },
            { id: 'criminal', name: 'Hình sự', color: '#45B7D1' },
            { id: 'administrative', name: 'Hành chính', color: '#96CEB4' },
            { id: 'labor', name: 'Lao động', color: '#FFEAA7' },
            { id: 'business', name: 'Doanh nghiệp', color: '#DDA0DD' },
            { id: 'tax', name: 'Thuế', color: '#98D8C8' },
            { id: 'property', name: 'Đất đai', color: '#F7DC6F' },
            { id: 'family', name: 'Gia đình', color: '#BB8FCE' },
            { id: 'cybersecurity', name: 'An ninh mạng', color: '#85C1E9' },
            { id: 'traffic', name: 'Giao thông', color: '#F8C471' },
            { id: 'health', name: 'Y tế', color: '#82E0AA' }
        ];
    }
    
    loadSources() {
        this.sources = [
            { id: 'quoc-hoi', name: 'Quốc hội', type: 'legislative' },
            { id: 'chinh-phu', name: 'Chính phủ', type: 'executive' },
            { id: 'toa-an', name: 'Tòa án', type: 'judicial' },
            { id: 'vks', name: 'Viện kiểm sát', type: 'judicial' },
            { id: 'bo-nganh', name: 'Bộ/Ngành', type: 'ministry' },
            { id: 'ubnd', name: 'UBND', type: 'local' }
        ];
    }
    
    loadKeywords() {
        this.keywords = [
            'quyền', 'nghĩa vụ', 'công dân', 'pháp nhân', 'hợp đồng',
            'thỏa thuận', 'tranh chấp', 'giải quyết', 'xử phạt',
            'hình phạt', 'bồi thường', 'thiệt hại', 'trách nhiệm',
            'nghĩa vụ', 'quyền lợi', 'bảo vệ', 'thực hiện', 'tuân thủ'
        ];
    }
    
    // ==================== DOCUMENT MANAGEMENT ====================
    addDocument(documentData) {
        const document = {
            id: this.generateId(),
            ...documentData,
            createdAt: new Date(),
            updatedAt: new Date(),
            views: 0,
            bookmarks: 0,
            downloads: 0
        };
        
        this.documents.push(document);
        this.saveDocuments();
        return document;
    }
    
    updateDocument(id, updates) {
        const index = this.documents.findIndex(doc => doc.id === id);
        if (index !== -1) {
            this.documents[index] = {
                ...this.documents[index],
                ...updates,
                updatedAt: new Date()
            };
            this.saveDocuments();
            return this.documents[index];
        }
        return null;
    }
    
    deleteDocument(id) {
        this.documents = this.documents.filter(doc => doc.id !== id);
        this.saveDocuments();
    }
    
    getDocumentById(id) {
        return this.documents.find(doc => doc.id === id);
    }
    
    // ==================== SEARCH & FILTER ====================
    searchDocuments(query, filters = {}) {
        let results = [...this.documents];
        
        // Text search
        if (query) {
            const searchTerm = query.toLowerCase();
            results = results.filter(doc => 
                doc.title.toLowerCase().includes(searchTerm) ||
                doc.content.toLowerCase().includes(searchTerm) ||
                doc.summary.toLowerCase().includes(searchTerm) ||
                doc.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm))
            );
        }
        
        // Category filter
        if (filters.category) {
            results = results.filter(doc => doc.category === filters.category);
        }
        
        // Source filter
        if (filters.source) {
            results = results.filter(doc => doc.source === filters.source);
        }
        
        // Date range filter
        if (filters.dateFrom) {
            results = results.filter(doc => new Date(doc.date) >= new Date(filters.dateFrom));
        }
        
        if (filters.dateTo) {
            results = results.filter(doc => new Date(doc.date) <= new Date(filters.dateTo));
        }
        
        // Status filter
        if (filters.status) {
            results = results.filter(doc => doc.status === filters.status);
        }
        
        // Sort results
        const sortBy = filters.sortBy || 'date';
        const sortOrder = filters.sortOrder || 'desc';
        
        results.sort((a, b) => {
            let aVal, bVal;
            
            switch (sortBy) {
                case 'date':
                    aVal = new Date(a.date);
                    bVal = new Date(b.date);
                    break;
                case 'title':
                    aVal = a.title.toLowerCase();
                    bVal = b.title.toLowerCase();
                    break;
                case 'views':
                    aVal = a.views;
                    bVal = b.views;
                    break;
                case 'relevance':
                    aVal = a.relevanceScore || 0;
                    bVal = b.relevanceScore || 0;
                    break;
                default:
                    aVal = new Date(a.date);
                    bVal = new Date(b.date);
            }
            
            if (sortOrder === 'asc') {
                return aVal > bVal ? 1 : -1;
            } else {
                return aVal < bVal ? 1 : -1;
            }
        });
        
        return results;
    }
    
    getPopularDocuments(limit = 10) {
        return this.documents
            .sort((a, b) => b.views - a.views)
            .slice(0, limit);
    }
    
    getRecentDocuments(limit = 10) {
        return this.documents
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, limit);
    }
    
    getDocumentsByCategory(category, limit = 20) {
        return this.documents
            .filter(doc => doc.category === category)
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, limit);
    }
    
    // ==================== ANALYTICS ====================
    getAnalytics() {
        const totalDocs = this.documents.length;
        const totalViews = this.documents.reduce((sum, doc) => sum + doc.views, 0);
        const totalBookmarks = this.documents.reduce((sum, doc) => sum + doc.bookmarks, 0);
        
        const categoryStats = this.categories.map(cat => ({
            ...cat,
            count: this.documents.filter(doc => doc.category === cat.id).length
        }));
        
        const sourceStats = this.sources.map(source => ({
            ...source,
            count: this.documents.filter(doc => doc.source === source.id).length
        }));
        
        const monthlyStats = this.getMonthlyStats();
        
        return {
            totalDocuments: totalDocs,
            totalViews: totalViews,
            totalBookmarks: totalBookmarks,
            averageViews: totalDocs > 0 ? Math.round(totalViews / totalDocs) : 0,
            categoryStats: categoryStats,
            sourceStats: sourceStats,
            monthlyStats: monthlyStats,
            lastUpdate: this.lastUpdate
        };
    }
    
    getMonthlyStats() {
        const months = [];
        const now = new Date();
        
        for (let i = 11; i >= 0; i--) {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const monthName = date.toLocaleDateString('vi-VN', { month: 'short' });
            
            const docsInMonth = this.documents.filter(doc => {
                const docDate = new Date(doc.date);
                return docDate.getMonth() === date.getMonth() && 
                       docDate.getFullYear() === date.getFullYear();
            });
            
            months.push({
                month: monthName,
                count: docsInMonth.length,
                views: docsInMonth.reduce((sum, doc) => sum + doc.views, 0)
            });
        }
        
        return months;
    }
    
    // ==================== AUTO UPDATE ====================
    setupAutoUpdate() {
        // Check for updates every hour
        setInterval(() => {
            this.checkForUpdates();
        }, 60 * 60 * 1000);
        
        // Initial update check
        this.checkForUpdates();
    }
    
    async checkForUpdates() {
        try {
            const lastUpdate = localStorage.getItem('vilaw_last_update');
            const now = new Date();
            
            if (!lastUpdate || (now - new Date(lastUpdate)) > this.updateInterval) {
                console.log('Checking for legal data updates...');
                await this.updateLegalData();
                localStorage.setItem('vilaw_last_update', now.toISOString());
                this.lastUpdate = now;
            }
        } catch (error) {
            console.error('Error checking for updates:', error);
        }
    }
    
    async updateLegalData() {
        // Simulate data update
        const newDocuments = await this.fetchNewDocuments();
        if (newDocuments.length > 0) {
            this.documents = [...this.documents, ...newDocuments];
            this.saveDocuments();
            console.log(`Updated with ${newDocuments.length} new documents`);
        }
    }
    
    async fetchNewDocuments() {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                const newDocs = this.generateSampleNewDocuments();
                resolve(newDocs);
            }, 2000);
        });
    }
    
    generateSampleNewDocuments() {
        const sampleDocs = [
            {
                id: this.generateId(),
                title: 'Nghị định mới về an toàn thông tin mạng',
                content: 'Quy định về bảo vệ dữ liệu cá nhân và an toàn thông tin mạng...',
                summary: 'Nghị định quy định về bảo vệ dữ liệu cá nhân',
                category: 'cybersecurity',
                type: 'Nghị định',
                source: 'chinh-phu',
                date: new Date().toISOString(),
                keywords: ['an toàn', 'thông tin', 'mạng', 'dữ liệu'],
                status: 'active',
                views: 0,
                bookmarks: 0,
                downloads: 0
            }
        ];
        
        return sampleDocs;
    }
    
    // ==================== DATA PERSISTENCE ====================
    saveDocuments() {
        localStorage.setItem('vilaw_legal_documents', JSON.stringify(this.documents));
    }
    
    saveCategories() {
        localStorage.setItem('vilaw_categories', JSON.stringify(this.categories));
    }
    
    saveSources() {
        localStorage.setItem('vilaw_sources', JSON.stringify(this.sources));
    }
    
    saveKeywords() {
        localStorage.setItem('vilaw_keywords', JSON.stringify(this.keywords));
    }
    
    // ==================== COMPREHENSIVE LEGAL DATA ====================
    getComprehensiveLegalData() {
        return [
            // Hiến pháp
            {
                id: 'doc_1',
                title: 'Hiến pháp nước Cộng hòa xã hội chủ nghĩa Việt Nam 2013',
                content: 'Hiến pháp là luật cơ bản của nước Cộng hòa xã hội chủ nghĩa Việt Nam, có hiệu lực pháp lý cao nhất. Hiến pháp quy định về chế độ chính trị, kinh tế, văn hóa, xã hội, quốc phòng, an ninh, quyền và nghĩa vụ cơ bản của công dân, cơ cấu tổ chức và nguyên tắc hoạt động của các cơ quan nhà nước.',
                summary: 'Luật cơ bản của nước Cộng hòa xã hội chủ nghĩa Việt Nam',
                category: 'constitutional',
                type: 'Hiến pháp',
                source: 'quoc-hoi',
                date: '2013-11-28T00:00:00.000Z',
                keywords: ['hiến pháp', 'cơ bản', 'quyền', 'nghĩa vụ', 'công dân', 'nhà nước'],
                status: 'active',
                views: 1250,
                bookmarks: 45,
                downloads: 120
            },
            
            // Luật Doanh nghiệp
            {
                id: 'doc_2',
                title: 'Luật Doanh nghiệp 2020',
                content: 'Luật này quy định về việc thành lập, quản lý, tổ chức lại, giải thể doanh nghiệp; quyền và nghĩa vụ của chủ sở hữu, thành viên góp vốn, cổ đông, người đại diện theo pháp luật của doanh nghiệp.',
                summary: 'Quy định về thành lập, quản lý, tổ chức lại, giải thể doanh nghiệp',
                category: 'business',
                type: 'Luật',
                source: 'quoc-hoi',
                date: '2020-06-17T00:00:00.000Z',
                keywords: ['doanh nghiệp', 'thành lập', 'quản lý', 'giải thể', 'cổ đông'],
                status: 'active',
                views: 980,
                bookmarks: 32,
                downloads: 85
            },
            
            // Luật Lao động
            {
                id: 'doc_3',
                title: 'Luật Lao động 2019',
                content: 'Luật này quy định về quyền và nghĩa vụ của người lao động, người sử dụng lao động; quan hệ lao động; quan hệ xã hội liên quan trực tiếp đến quan hệ lao động.',
                summary: 'Quy định về quyền và nghĩa vụ của người lao động',
                category: 'labor',
                type: 'Luật',
                source: 'quoc-hoi',
                date: '2019-11-20T00:00:00.000Z',
                keywords: ['lao động', 'quyền', 'nghĩa vụ', 'lương', 'hợp đồng'],
                status: 'active',
                views: 1100,
                bookmarks: 28,
                downloads: 95
            },
            
            // Luật Dân sự
            {
                id: 'doc_4',
                title: 'Bộ luật Dân sự 2015',
                content: 'Bộ luật này quy định về quan hệ dân sự, bao gồm: quyền sở hữu, quyền sử dụng, quyền định đoạt tài sản; quyền nhân thân; nghĩa vụ dân sự; hợp đồng dân sự; thừa kế.',
                summary: 'Quy định về quan hệ dân sự, quyền sở hữu, hợp đồng',
                category: 'civil',
                type: 'Bộ luật',
                source: 'quoc-hoi',
                date: '2015-11-24T00:00:00.000Z',
                keywords: ['dân sự', 'sở hữu', 'hợp đồng', 'thừa kế', 'tài sản'],
                status: 'active',
                views: 1350,
                bookmarks: 52,
                downloads: 110
            },
            
            // Luật Hình sự
            {
                id: 'doc_5',
                title: 'Bộ luật Hình sự 2015',
                content: 'Bộ luật này quy định về tội phạm và hình phạt, bao gồm: các tội phạm về an ninh quốc gia; các tội phạm về trật tự, an toàn xã hội; các tội phạm về kinh tế; các tội phạm về môi trường.',
                summary: 'Quy định về tội phạm và hình phạt',
                category: 'criminal',
                type: 'Bộ luật',
                source: 'quoc-hoi',
                date: '2015-11-27T00:00:00.000Z',
                keywords: ['hình sự', 'tội phạm', 'hình phạt', 'an ninh', 'trật tự'],
                status: 'active',
                views: 980,
                bookmarks: 25,
                downloads: 75
            },
            
            // Luật Đất đai
            {
                id: 'doc_6',
                title: 'Luật Đất đai 2013',
                content: 'Luật này quy định về quản lý, sử dụng đất đai; quyền và nghĩa vụ của người sử dụng đất; quy hoạch, kế hoạch sử dụng đất; giao đất, cho thuê đất, thu hồi đất.',
                summary: 'Quy định về quản lý, sử dụng đất đai',
                category: 'property',
                type: 'Luật',
                source: 'quoc-hoi',
                date: '2013-11-29T00:00:00.000Z',
                keywords: ['đất đai', 'quản lý', 'sử dụng', 'quy hoạch', 'giao đất'],
                status: 'active',
                views: 1200,
                bookmarks: 45,
                downloads: 95
            },
            
            // Luật An ninh mạng
            {
                id: 'doc_7',
                title: 'Luật An ninh mạng 2018',
                content: 'Luật này quy định về hoạt động bảo vệ an ninh mạng; trách nhiệm của cơ quan, tổ chức, cá nhân trong việc bảo vệ an ninh mạng; các biện pháp bảo vệ an ninh mạng.',
                summary: 'Quy định về bảo vệ an ninh mạng',
                category: 'cybersecurity',
                type: 'Luật',
                source: 'quoc-hoi',
                date: '2018-06-12T00:00:00.000Z',
                keywords: ['an ninh mạng', 'bảo vệ', 'dữ liệu', 'thông tin', 'mạng'],
                status: 'active',
                views: 850,
                bookmarks: 30,
                downloads: 65
            },
            
            // Luật Giao thông
            {
                id: 'doc_8',
                title: 'Luật Giao thông đường bộ 2008',
                content: 'Luật này quy định về quy tắc giao thông đường bộ; điều kiện tham gia giao thông của phương tiện giao thông đường bộ; quyền và nghĩa vụ của người tham gia giao thông.',
                summary: 'Quy định về quy tắc giao thông đường bộ',
                category: 'traffic',
                type: 'Luật',
                source: 'quoc-hoi',
                date: '2008-11-13T00:00:00.000Z',
                keywords: ['giao thông', 'đường bộ', 'quy tắc', 'phương tiện', 'xử phạt'],
                status: 'active',
                views: 750,
                bookmarks: 20,
                downloads: 55
            },
            
            // Luật Thuế
            {
                id: 'doc_9',
                title: 'Luật Thuế thu nhập doanh nghiệp 2008',
                content: 'Luật này quy định về thuế thu nhập doanh nghiệp, bao gồm: đối tượng nộp thuế; căn cứ tính thuế; phương pháp tính thuế; thời hạn nộp thuế.',
                summary: 'Quy định về thuế thu nhập doanh nghiệp',
                category: 'tax',
                type: 'Luật',
                source: 'quoc-hoi',
                date: '2008-11-03T00:00:00.000Z',
                keywords: ['thuế', 'thu nhập', 'doanh nghiệp', 'nộp thuế', 'tính thuế'],
                status: 'active',
                views: 650,
                bookmarks: 18,
                downloads: 45
            },
            
            // Luật Gia đình
            {
                id: 'doc_10',
                title: 'Luật Hôn nhân và gia đình 2014',
                content: 'Luật này quy định về hôn nhân và gia đình, bao gồm: kết hôn; ly hôn; quyền và nghĩa vụ của vợ chồng; quyền và nghĩa vụ của cha mẹ và con; cấp dưỡng.',
                summary: 'Quy định về hôn nhân và gia đình',
                category: 'family',
                type: 'Luật',
                source: 'quoc-hoi',
                date: '2014-06-19T00:00:00.000Z',
                keywords: ['hôn nhân', 'gia đình', 'kết hôn', 'ly hôn', 'cấp dưỡng'],
                status: 'active',
                views: 900,
                bookmarks: 35,
                downloads: 70
            }
        ];
    }
    
    // ==================== UTILITY METHODS ====================
    generateId() {
        return 'doc_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    formatDate(date) {
        return new Date(date).toLocaleDateString('vi-VN');
    }
    
    formatDateTime(date) {
        return new Date(date).toLocaleString('vi-VN');
    }
}

// Global instance
window.legalDataManager = new LegalDataManager();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LegalDataManager;
}
