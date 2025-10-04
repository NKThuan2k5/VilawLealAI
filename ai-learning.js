// ViLaw - Hệ thống AI học hỏi nâng cao
class AILearningSystem {
    constructor() {
        this.knowledgeBase = [];
        this.learningData = [];
        this.userInteractions = [];
        this.legalUpdates = [];
        this.learningProgress = {
            totalInteractions: 0,
            successfulAnswers: 0,
            accuracy: 0,
            lastUpdate: new Date(),
            knowledgeLevel: 0,
            legalCoverage: 0
        };
        
        this.init();
    }
    
    init() {
        console.log('Initializing AI Learning System...');
        this.loadKnowledgeBase();
        this.loadLearningData();
        this.loadUserInteractions();
        this.setupLearningPipeline();
        this.startContinuousLearning();
        console.log('AI Learning System initialized successfully');
    }
    
    // ==================== KNOWLEDGE BASE MANAGEMENT ====================
    loadKnowledgeBase() {
        // Load comprehensive legal knowledge
        this.knowledgeBase = [
            // Constitutional Law
            {
                category: 'constitutional',
                title: 'Hiến pháp nước Cộng hòa xã hội chủ nghĩa Việt Nam 2013',
                content: 'Hiến pháp là luật cơ bản của nước Cộng hòa xã hội chủ nghĩa Việt Nam, có hiệu lực pháp lý cao nhất. Hiến pháp quy định về chế độ chính trị, kinh tế, văn hóa, xã hội, quốc phòng, an ninh, quyền và nghĩa vụ cơ bản của công dân, cơ cấu tổ chức và nguyên tắc hoạt động của các cơ quan nhà nước.',
                keywords: ['hiến pháp', 'cơ bản', 'quyền', 'nghĩa vụ', 'công dân', 'nhà nước'],
                importance: 10,
                lastUpdated: new Date(),
                source: 'quoc-hoi',
                type: 'constitutional'
            },
            
            // Civil Law
            {
                category: 'civil',
                title: 'Bộ luật Dân sự 2015',
                content: 'Bộ luật này quy định về quan hệ dân sự, bao gồm: quyền sở hữu, quyền sử dụng, quyền định đoạt tài sản; quyền nhân thân; nghĩa vụ dân sự; hợp đồng dân sự; thừa kế; bồi thường thiệt hại ngoài hợp đồng.',
                keywords: ['dân sự', 'sở hữu', 'hợp đồng', 'thừa kế', 'tài sản', 'bồi thường'],
                importance: 9,
                lastUpdated: new Date(),
                source: 'quoc-hoi',
                type: 'civil'
            },
            
            // Criminal Law
            {
                category: 'criminal',
                title: 'Bộ luật Hình sự 2015',
                content: 'Bộ luật này quy định về tội phạm và hình phạt, bao gồm: các tội phạm về an ninh quốc gia; các tội phạm về trật tự, an toàn xã hội; các tội phạm về kinh tế; các tội phạm về môi trường; các tội phạm về ma túy; các tội phạm về tham nhũng.',
                keywords: ['hình sự', 'tội phạm', 'hình phạt', 'an ninh', 'trật tự', 'tham nhũng'],
                importance: 9,
                lastUpdated: new Date(),
                source: 'quoc-hoi',
                type: 'criminal'
            },
            
            // Business Law
            {
                category: 'business',
                title: 'Luật Doanh nghiệp 2020',
                content: 'Luật này quy định về việc thành lập, quản lý, tổ chức lại, giải thể doanh nghiệp; quyền và nghĩa vụ của chủ sở hữu, thành viên góp vốn, cổ đông, người đại diện theo pháp luật của doanh nghiệp.',
                keywords: ['doanh nghiệp', 'thành lập', 'quản lý', 'giải thể', 'cổ đông', 'góp vốn'],
                importance: 8,
                lastUpdated: new Date(),
                source: 'quoc-hoi',
                type: 'business'
            },
            
            // Labor Law
            {
                category: 'labor',
                title: 'Luật Lao động 2019',
                content: 'Luật này quy định về quyền và nghĩa vụ của người lao động, người sử dụng lao động; quan hệ lao động; quan hệ xã hội liên quan trực tiếp đến quan hệ lao động.',
                keywords: ['lao động', 'quyền', 'nghĩa vụ', 'lương', 'hợp đồng', 'bảo hiểm'],
                importance: 8,
                lastUpdated: new Date(),
                source: 'quoc-hoi',
                type: 'labor'
            },
            
            // Property Law
            {
                category: 'property',
                title: 'Luật Đất đai 2013',
                content: 'Luật này quy định về quản lý, sử dụng đất đai; quyền và nghĩa vụ của người sử dụng đất; quy hoạch, kế hoạch sử dụng đất; giao đất, cho thuê đất, thu hồi đất; bồi thường, hỗ trợ, tái định cư khi nhà nước thu hồi đất.',
                keywords: ['đất đai', 'quản lý', 'sử dụng', 'quy hoạch', 'giao đất', 'thu hồi'],
                importance: 7,
                lastUpdated: new Date(),
                source: 'quoc-hoi',
                type: 'property'
            },
            
            // Family Law
            {
                category: 'family',
                title: 'Luật Hôn nhân và gia đình 2014',
                content: 'Luật này quy định về hôn nhân và gia đình, bao gồm: kết hôn; ly hôn; quyền và nghĩa vụ của vợ chồng; quyền và nghĩa vụ của cha mẹ và con; cấp dưỡng; giám hộ; nuôi con nuôi.',
                keywords: ['hôn nhân', 'gia đình', 'kết hôn', 'ly hôn', 'cấp dưỡng', 'nuôi con'],
                importance: 7,
                lastUpdated: new Date(),
                source: 'quoc-hoi',
                type: 'family'
            },
            
            // Tax Law
            {
                category: 'tax',
                title: 'Luật Thuế thu nhập doanh nghiệp 2008',
                content: 'Luật này quy định về thuế thu nhập doanh nghiệp, bao gồm: đối tượng nộp thuế; căn cứ tính thuế; phương pháp tính thuế; thời hạn nộp thuế; miễn thuế, giảm thuế; hoàn thuế.',
                keywords: ['thuế', 'thu nhập', 'doanh nghiệp', 'nộp thuế', 'tính thuế', 'miễn thuế'],
                importance: 6,
                lastUpdated: new Date(),
                source: 'quoc-hoi',
                type: 'tax'
            },
            
            // Traffic Law
            {
                category: 'traffic',
                title: 'Luật Giao thông đường bộ 2008',
                content: 'Luật này quy định về quy tắc giao thông đường bộ; điều kiện tham gia giao thông của phương tiện giao thông đường bộ; quyền và nghĩa vụ của người tham gia giao thông; xử phạt vi phạm hành chính trong lĩnh vực giao thông đường bộ.',
                keywords: ['giao thông', 'đường bộ', 'quy tắc', 'phương tiện', 'xử phạt', 'vi phạm'],
                importance: 6,
                lastUpdated: new Date(),
                source: 'quoc-hoi',
                type: 'traffic'
            },
            
            // Cybersecurity Law
            {
                category: 'cybersecurity',
                title: 'Luật An ninh mạng 2018',
                content: 'Luật này quy định về hoạt động bảo vệ an ninh mạng; trách nhiệm của cơ quan, tổ chức, cá nhân trong việc bảo vệ an ninh mạng; các biện pháp bảo vệ an ninh mạng; xử lý vi phạm pháp luật về an ninh mạng.',
                keywords: ['an ninh mạng', 'bảo vệ', 'dữ liệu', 'thông tin', 'mạng', 'vi phạm'],
                importance: 7,
                lastUpdated: new Date(),
                source: 'quoc-hoi',
                type: 'cybersecurity'
            }
        ];
    }
    
    loadLearningData() {
        // Load learning data from various sources
        this.learningData = [
            {
                source: 'user_feedback',
                data: [],
                weight: 0.3
            },
            {
                source: 'legal_updates',
                data: [],
                weight: 0.4
            },
            {
                source: 'expert_annotations',
                data: [],
                weight: 0.2
            },
            {
                source: 'case_law',
                data: [],
                weight: 0.1
            }
        ];
    }
    
    loadUserInteractions() {
        // Load user interaction history
        const saved = localStorage.getItem('vilaw_user_interactions');
        if (saved) {
            this.userInteractions = JSON.parse(saved);
        }
    }
    
    // ==================== LEARNING PIPELINE ====================
    setupLearningPipeline() {
        // Setup continuous learning pipeline
        this.learningPipeline = {
            dataCollection: this.collectData.bind(this),
            dataProcessing: this.processData.bind(this),
            modelTraining: this.trainModel.bind(this),
            modelEvaluation: this.evaluateModel.bind(this),
            modelDeployment: this.deployModel.bind(this)
        };
    }
    
    startContinuousLearning() {
        // Start continuous learning process
        setInterval(() => {
            this.runLearningCycle();
        }, 60000); // Every minute
        
        // Initial learning cycle
        this.runLearningCycle();
    }
    
    async runLearningCycle() {
        try {
            console.log('Running AI learning cycle...');
            
            // Collect new data
            await this.collectData();
            
            // Process data
            await this.processData();
            
            // Train model
            await this.trainModel();
            
            // Evaluate model
            await this.evaluateModel();
            
            // Update learning progress
            this.updateLearningProgress();
            
            console.log('AI learning cycle completed');
        } catch (error) {
            console.error('Error in learning cycle:', error);
        }
    }
    
    // ==================== DATA COLLECTION ====================
    async collectData() {
        // Collect data from various sources
        const newData = [];
        
        // Collect user interactions
        const userData = this.collectUserInteractions();
        newData.push(...userData);
        
        // Collect legal updates
        const legalData = await this.collectLegalUpdates();
        newData.push(...legalData);
        
        // Collect expert feedback
        const expertData = this.collectExpertFeedback();
        newData.push(...expertData);
        
        // Store collected data
        this.learningData.forEach(source => {
            source.data.push(...newData.filter(item => item.source === source.source));
        });
        
        return newData;
    }
    
    collectUserInteractions() {
        // Collect user interaction data
        const interactions = this.userInteractions.slice(-100); // Last 100 interactions
        
        return interactions.map(interaction => ({
            source: 'user_feedback',
            type: 'interaction',
            data: {
                question: interaction.question,
                answer: interaction.answer,
                rating: interaction.rating,
                timestamp: interaction.timestamp
            },
            weight: this.calculateInteractionWeight(interaction)
        }));
    }
    
    async collectLegalUpdates() {
        // Simulate collecting legal updates
        const updates = [
            {
                source: 'legal_updates',
                type: 'new_law',
                data: {
                    title: 'Nghị định mới về an toàn thông tin mạng',
                    content: 'Quy định về bảo vệ dữ liệu cá nhân và an toàn thông tin mạng...',
                    date: new Date(),
                    category: 'cybersecurity'
                },
                weight: 0.8
            }
        ];
        
        return updates;
    }
    
    collectExpertFeedback() {
        // Collect expert feedback data
        return [
            {
                source: 'expert_annotations',
                type: 'expert_feedback',
                data: {
                    question: 'Luật doanh nghiệp quy định gì?',
                    expertAnswer: 'Luật Doanh nghiệp 2020 quy định về việc thành lập, quản lý, tổ chức lại, giải thể doanh nghiệp...',
                    accuracy: 0.95,
                    timestamp: new Date()
                },
                weight: 0.9
            }
        ];
    }
    
    // ==================== DATA PROCESSING ====================
    async processData() {
        // Process collected data
        const processedData = [];
        
        for (const source of this.learningData) {
            const processed = await this.processSourceData(source);
            processedData.push(...processed);
        }
        
        // Update knowledge base
        this.updateKnowledgeBase(processedData);
        
        return processedData;
    }
    
    async processSourceData(source) {
        // Process data from a specific source
        const processed = [];
        
        for (const item of source.data) {
            const processedItem = {
                ...item,
                processed: true,
                processedAt: new Date(),
                features: this.extractFeatures(item),
                importance: this.calculateImportance(item)
            };
            
            processed.push(processedItem);
        }
        
        return processed;
    }
    
    extractFeatures(item) {
        // Extract features from data item
        const features = {
            keywords: this.extractKeywords(item.data.content || item.data.question),
            category: this.categorizeContent(item.data),
            sentiment: this.analyzeSentiment(item.data),
            complexity: this.assessComplexity(item.data),
            relevance: this.calculateRelevance(item.data)
        };
        
        return features;
    }
    
    extractKeywords(text) {
        // Extract keywords from text
        const commonWords = ['của', 'và', 'trong', 'với', 'cho', 'từ', 'đến', 'về', 'theo', 'như'];
        const words = text.toLowerCase()
            .replace(/[^\w\s]/g, '')
            .split(/\s+/)
            .filter(word => word.length > 2 && !commonWords.includes(word));
        
        const wordCount = {};
        words.forEach(word => {
            wordCount[word] = (wordCount[word] || 0) + 1;
        });
        
        return Object.entries(wordCount)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 10)
            .map(([word]) => word);
    }
    
    categorizeContent(data) {
        // Categorize content based on keywords
        const categories = {
            'constitutional': ['hiến pháp', 'cơ bản', 'quyền', 'nghĩa vụ'],
            'civil': ['dân sự', 'sở hữu', 'hợp đồng', 'thừa kế'],
            'criminal': ['hình sự', 'tội phạm', 'hình phạt', 'an ninh'],
            'business': ['doanh nghiệp', 'thành lập', 'quản lý', 'cổ đông'],
            'labor': ['lao động', 'lương', 'bảo hiểm', 'nghỉ phép'],
            'property': ['đất đai', 'nhà ở', 'quyền sở hữu', 'bất động sản'],
            'family': ['hôn nhân', 'gia đình', 'ly hôn', 'cấp dưỡng'],
            'tax': ['thuế', 'khai thuế', 'nộp thuế', 'hoàn thuế'],
            'traffic': ['giao thông', 'xử phạt', 'vi phạm', 'bằng lái'],
            'cybersecurity': ['an ninh mạng', 'dữ liệu', 'thông tin', 'bảo mật']
        };
        
        const text = (data.content || data.question || '').toLowerCase();
        let maxScore = 0;
        let bestCategory = 'general';
        
        for (const [category, keywords] of Object.entries(categories)) {
            const score = keywords.reduce((acc, keyword) => {
                return acc + (text.includes(keyword) ? 1 : 0);
            }, 0);
            
            if (score > maxScore) {
                maxScore = score;
                bestCategory = category;
            }
        }
        
        return bestCategory;
    }
    
    analyzeSentiment(data) {
        // Analyze sentiment of the data
        const text = (data.content || data.question || '').toLowerCase();
        const positiveWords = ['tốt', 'tích cực', 'hữu ích', 'chính xác', 'đúng'];
        const negativeWords = ['sai', 'không đúng', 'tiêu cực', 'xấu', 'không hữu ích'];
        
        const positiveScore = positiveWords.reduce((acc, word) => acc + (text.includes(word) ? 1 : 0), 0);
        const negativeScore = negativeWords.reduce((acc, word) => acc + (text.includes(word) ? 1 : 0), 0);
        
        if (positiveScore > negativeScore) return 'positive';
        if (negativeScore > positiveScore) return 'negative';
        return 'neutral';
    }
    
    assessComplexity(data) {
        // Assess complexity of the data
        const text = data.content || data.question || '';
        const wordCount = text.split(/\s+/).length;
        const sentenceCount = text.split(/[.!?]+/).length;
        const avgWordsPerSentence = wordCount / sentenceCount;
        
        if (avgWordsPerSentence > 20) return 'high';
        if (avgWordsPerSentence > 10) return 'medium';
        return 'low';
    }
    
    calculateRelevance(data) {
        // Calculate relevance score
        const text = (data.content || data.question || '').toLowerCase();
        const legalKeywords = ['luật', 'pháp luật', 'quy định', 'nghị định', 'thông tư', 'hiến pháp'];
        
        const relevanceScore = legalKeywords.reduce((acc, keyword) => {
            return acc + (text.includes(keyword) ? 1 : 0);
        }, 0);
        
        return Math.min(relevanceScore / legalKeywords.length, 1);
    }
    
    // ==================== MODEL TRAINING ====================
    async trainModel() {
        // Train AI model with new data
        console.log('Training AI model...');
        
        // Simulate model training
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Update model parameters
        this.updateModelParameters();
        
        console.log('AI model training completed');
    }
    
    updateModelParameters() {
        // Update model parameters based on learning data
        const totalData = this.learningData.reduce((acc, source) => acc + source.data.length, 0);
        const successfulData = this.learningData.reduce((acc, source) => {
            return acc + source.data.filter(item => item.rating > 3).length;
        }, 0);
        
        this.learningProgress.accuracy = totalData > 0 ? (successfulData / totalData) * 100 : 0;
        this.learningProgress.totalInteractions = totalData;
        this.learningProgress.successfulAnswers = successfulData;
        this.learningProgress.lastUpdate = new Date();
    }
    
    // ==================== MODEL EVALUATION ====================
    async evaluateModel() {
        // Evaluate model performance
        console.log('Evaluating AI model...');
        
        const evaluation = {
            accuracy: this.learningProgress.accuracy,
            coverage: this.calculateLegalCoverage(),
            responsiveness: this.calculateResponsiveness(),
            userSatisfaction: this.calculateUserSatisfaction()
        };
        
        this.learningProgress.legalCoverage = evaluation.coverage;
        
        console.log('Model evaluation completed:', evaluation);
        return evaluation;
    }
    
    calculateLegalCoverage() {
        // Calculate legal coverage percentage
        const categories = ['constitutional', 'civil', 'criminal', 'business', 'labor', 'property', 'family', 'tax', 'traffic', 'cybersecurity'];
        const coveredCategories = new Set();
        
        this.knowledgeBase.forEach(item => {
            if (categories.includes(item.category)) {
                coveredCategories.add(item.category);
            }
        });
        
        return (coveredCategories.size / categories.length) * 100;
    }
    
    calculateResponsiveness() {
        // Calculate responsiveness score
        const recentInteractions = this.userInteractions.filter(interaction => {
            const interactionTime = new Date(interaction.timestamp);
            const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
            return interactionTime > oneHourAgo;
        });
        
        if (recentInteractions.length === 0) return 100;
        
        const avgResponseTime = recentInteractions.reduce((acc, interaction) => {
            return acc + (interaction.responseTime || 0);
        }, 0) / recentInteractions.length;
        
        return Math.max(100 - avgResponseTime, 0);
    }
    
    calculateUserSatisfaction() {
        // Calculate user satisfaction score
        const ratedInteractions = this.userInteractions.filter(interaction => interaction.rating);
        
        if (ratedInteractions.length === 0) return 0;
        
        const avgRating = ratedInteractions.reduce((acc, interaction) => {
            return acc + interaction.rating;
        }, 0) / ratedInteractions.length;
        
        return (avgRating / 5) * 100;
    }
    
    // ==================== MODEL DEPLOYMENT ====================
    async deployModel() {
        // Deploy updated model
        console.log('Deploying updated AI model...');
        
        // Update global AI system
        if (window.aiChatSystem) {
            window.aiChatSystem.updateModel(this.getModelData());
        }
        
        console.log('AI model deployment completed');
    }
    
    getModelData() {
        // Get current model data
        return {
            knowledgeBase: this.knowledgeBase,
            learningProgress: this.learningProgress,
            lastUpdate: new Date()
        };
    }
    
    // ==================== LEARNING PROGRESS ====================
    updateLearningProgress() {
        // Update learning progress
        this.learningProgress.knowledgeLevel = this.calculateKnowledgeLevel();
        this.learningProgress.legalCoverage = this.calculateLegalCoverage();
        
        // Save progress
        this.saveLearningProgress();
    }
    
    calculateKnowledgeLevel() {
        // Calculate knowledge level based on various factors
        const factors = {
            accuracy: this.learningProgress.accuracy,
            coverage: this.learningProgress.legalCoverage,
            interactions: Math.min(this.learningProgress.totalInteractions / 1000, 1),
            recency: this.calculateRecencyScore()
        };
        
        const weights = {
            accuracy: 0.4,
            coverage: 0.3,
            interactions: 0.2,
            recency: 0.1
        };
        
        let knowledgeLevel = 0;
        for (const [factor, value] of Object.entries(factors)) {
            knowledgeLevel += value * weights[factor];
        }
        
        return Math.min(knowledgeLevel * 100, 100);
    }
    
    calculateRecencyScore() {
        // Calculate recency score based on last update
        const hoursSinceUpdate = (Date.now() - this.learningProgress.lastUpdate.getTime()) / (1000 * 60 * 60);
        return Math.max(1 - (hoursSinceUpdate / 24), 0); // Decay over 24 hours
    }
    
    // ==================== USER INTERACTION TRACKING ====================
    trackUserInteraction(question, answer, rating = null, responseTime = null) {
        // Track user interaction
        const interaction = {
            id: this.generateId(),
            question: question,
            answer: answer,
            rating: rating,
            responseTime: responseTime,
            timestamp: new Date(),
            category: this.categorizeContent({ question }),
            sentiment: this.analyzeSentiment({ question })
        };
        
        this.userInteractions.push(interaction);
        
        // Keep only last 1000 interactions
        if (this.userInteractions.length > 1000) {
            this.userInteractions = this.userInteractions.slice(-1000);
        }
        
        // Save interactions
        this.saveUserInteractions();
        
        return interaction;
    }
    
    updateInteractionRating(interactionId, rating) {
        // Update interaction rating
        const interaction = this.userInteractions.find(i => i.id === interactionId);
        if (interaction) {
            interaction.rating = rating;
            this.saveUserInteractions();
        }
    }
    
    // ==================== KNOWLEDGE BASE UPDATES ====================
    updateKnowledgeBase(processedData) {
        // Update knowledge base with processed data
        for (const item of processedData) {
            if (item.type === 'new_law' || item.type === 'legal_update') {
                this.addToKnowledgeBase(item);
            }
        }
    }
    
    addToKnowledgeBase(item) {
        // Add new item to knowledge base
        const knowledgeItem = {
            id: this.generateId(),
            category: item.data.category || 'general',
            title: item.data.title || 'Unknown',
            content: item.data.content || '',
            keywords: this.extractKeywords(item.data.content || ''),
            importance: item.weight || 0.5,
            lastUpdated: new Date(),
            source: item.source,
            type: item.type
        };
        
        this.knowledgeBase.push(knowledgeItem);
        
        // Keep knowledge base size manageable
        if (this.knowledgeBase.length > 1000) {
            this.knowledgeBase = this.knowledgeBase
                .sort((a, b) => b.importance - a.importance)
                .slice(0, 1000);
        }
    }
    
    // ==================== DATA PERSISTENCE ====================
    saveLearningProgress() {
        localStorage.setItem('vilaw_learning_progress', JSON.stringify(this.learningProgress));
    }
    
    loadLearningProgress() {
        const saved = localStorage.getItem('vilaw_learning_progress');
        if (saved) {
            this.learningProgress = { ...this.learningProgress, ...JSON.parse(saved) };
        }
    }
    
    saveUserInteractions() {
        localStorage.setItem('vilaw_user_interactions', JSON.stringify(this.userInteractions));
    }
    
    saveKnowledgeBase() {
        localStorage.setItem('vilaw_knowledge_base', JSON.stringify(this.knowledgeBase));
    }
    
    loadKnowledgeBase() {
        const saved = localStorage.getItem('vilaw_knowledge_base');
        if (saved) {
            this.knowledgeBase = JSON.parse(saved);
        }
    }
    
    // ==================== UTILITY METHODS ====================
    generateId() {
        return 'ai_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    calculateInteractionWeight(interaction) {
        // Calculate weight for interaction
        let weight = 0.5; // Base weight
        
        if (interaction.rating) {
            weight += (interaction.rating - 3) * 0.1; // Adjust based on rating
        }
        
        if (interaction.responseTime) {
            weight += Math.max(0, 1 - interaction.responseTime / 10); // Faster response = higher weight
        }
        
        return Math.max(0, Math.min(1, weight));
    }
    
    // ==================== PUBLIC API ====================
    getLearningStats() {
        return {
            ...this.learningProgress,
            knowledgeBaseSize: this.knowledgeBase.length,
            totalInteractions: this.userInteractions.length,
            recentInteractions: this.userInteractions.filter(i => {
                const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
                return new Date(i.timestamp) > oneDayAgo;
            }).length
        };
    }
    
    getKnowledgeBase() {
        return this.knowledgeBase;
    }
    
    searchKnowledgeBase(query) {
        // Search knowledge base
        const results = this.knowledgeBase.filter(item => {
            const text = (item.title + ' ' + item.content).toLowerCase();
            return text.includes(query.toLowerCase());
        });
        
        return results.sort((a, b) => b.importance - a.importance);
    }
    
    getCategoryStats() {
        // Get statistics by category
        const stats = {};
        
        this.knowledgeBase.forEach(item => {
            if (!stats[item.category]) {
                stats[item.category] = 0;
            }
            stats[item.category]++;
        });
        
        return stats;
    }
}

// Global instance
window.aiLearningSystem = new AILearningSystem();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AILearningSystem;
}
