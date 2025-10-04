// ViLaw - Hệ thống AI Chat nâng cao
class AIChatSystem {
    constructor() {
        this.isInitialized = false;
        this.chatHistory = [];
        this.userContext = {};
        this.legalKnowledge = [];
        this.responseTemplates = {};
        this.intentClassifier = null;
        
        this.init();
    }
    
    init() {
        console.log('Initializing AI Chat System...');
        this.loadChatHistory();
        this.loadLegalKnowledge();
        this.initializeIntentClassifier();
        this.loadResponseTemplates();
        this.isInitialized = true;
        console.log('AI Chat System initialized successfully');
    }
    
    // ==================== CHAT FUNCTIONALITY ====================
    async sendMessage(userInput, context = {}) {
        if (!this.isInitialized) {
            throw new Error('AI Chat System not initialized');
        }
        
        const userMessage = {
            id: this.generateId(),
            type: 'user',
            content: userInput,
            timestamp: new Date(),
            context: context
        };
        
        this.chatHistory.push(userMessage);
        
        // Analyze user intent
        const intent = await this.analyzeIntent(userInput);
        
        // Generate AI response
        const aiResponse = await this.generateResponse(userInput, intent, context);
        
        const aiMessage = {
            id: this.generateId(),
            type: 'ai',
            content: aiResponse.content,
            intent: intent,
            confidence: aiResponse.confidence,
            sources: aiResponse.sources,
            suggestions: aiResponse.suggestions,
            timestamp: new Date()
        };
        
        this.chatHistory.push(aiMessage);
        this.saveChatHistory();
        
        return aiMessage;
    }
    
    // ==================== INTENT ANALYSIS ====================
    async analyzeIntent(userInput) {
        const input = userInput.toLowerCase();
        
        // Legal document queries
        if (this.containsLegalKeywords(input)) {
            return {
                type: 'legal_query',
                confidence: 0.9,
                subcategory: this.getLegalSubcategory(input)
            };
        }
        
        // Contract-related queries
        if (this.containsContractKeywords(input)) {
            return {
                type: 'contract_query',
                confidence: 0.8,
                subcategory: this.getContractSubcategory(input)
            };
        }
        
        // General legal advice
        if (this.containsAdviceKeywords(input)) {
            return {
                type: 'legal_advice',
                confidence: 0.7,
                subcategory: 'general'
            };
        }
        
        // Greeting
        if (this.isGreeting(input)) {
            return {
                type: 'greeting',
                confidence: 0.9,
                subcategory: 'hello'
            };
        }
        
        // Help request
        if (this.isHelpRequest(input)) {
            return {
                type: 'help',
                confidence: 0.8,
                subcategory: 'assistance'
            };
        }
        
        // Default
        return {
            type: 'general',
            confidence: 0.5,
            subcategory: 'unknown'
        };
    }
    
    containsLegalKeywords(input) {
        const legalKeywords = [
            'luật', 'pháp luật', 'quy định', 'nghị định', 'thông tư',
            'hiến pháp', 'bộ luật', 'luật', 'nghị quyết', 'chỉ thị',
            'quyền', 'nghĩa vụ', 'tội phạm', 'hình phạt', 'xử phạt',
            'tranh chấp', 'kiện', 'tòa án', 'luật sư', 'pháp lý'
        ];
        
        return legalKeywords.some(keyword => input.includes(keyword));
    }
    
    containsContractKeywords(input) {
        const contractKeywords = [
            'hợp đồng', 'thỏa thuận', 'ký kết', 'điều khoản',
            'nghĩa vụ', 'quyền lợi', 'vi phạm', 'bồi thường',
            'chấm dứt', 'gia hạn', 'sửa đổi', 'bổ sung'
        ];
        
        return contractKeywords.some(keyword => input.includes(keyword));
    }
    
    containsAdviceKeywords(input) {
        const adviceKeywords = [
            'tư vấn', 'hướng dẫn', 'giúp đỡ', 'hỗ trợ',
            'cần làm gì', 'phải làm sao', 'cách thức',
            'thủ tục', 'quy trình', 'hướng dẫn'
        ];
        
        return adviceKeywords.some(keyword => input.includes(keyword));
    }
    
    isGreeting(input) {
        const greetings = [
            'xin chào', 'chào', 'hello', 'hi', 'chào bạn',
            'chào anh', 'chào chị', 'chào em', 'chào cô',
            'chào thầy', 'chào cô giáo'
        ];
        
        return greetings.some(greeting => input.includes(greeting));
    }
    
    isHelpRequest(input) {
        const helpKeywords = [
            'giúp', 'hỗ trợ', 'hướng dẫn', 'cần giúp',
            'làm sao', 'như thế nào', 'cách nào'
        ];
        
        return helpKeywords.some(keyword => input.includes(keyword));
    }
    
    getLegalSubcategory(input) {
        if (input.includes('doanh nghiệp') || input.includes('công ty')) return 'business';
        if (input.includes('lao động') || input.includes('lương')) return 'labor';
        if (input.includes('dân sự') || input.includes('sở hữu')) return 'civil';
        if (input.includes('hình sự') || input.includes('tội phạm')) return 'criminal';
        if (input.includes('đất đai') || input.includes('nhà ở')) return 'property';
        if (input.includes('hôn nhân') || input.includes('gia đình')) return 'family';
        if (input.includes('thuế') || input.includes('khai thuế')) return 'tax';
        if (input.includes('giao thông') || input.includes('xử phạt')) return 'traffic';
        if (input.includes('an ninh mạng') || input.includes('dữ liệu')) return 'cybersecurity';
        return 'general';
    }
    
    getContractSubcategory(input) {
        if (input.includes('lao động') || input.includes('việc làm')) return 'labor_contract';
        if (input.includes('mua bán') || input.includes('thương mại')) return 'commercial_contract';
        if (input.includes('thuê') || input.includes('cho thuê')) return 'rental_contract';
        if (input.includes('xây dựng') || input.includes('thi công')) return 'construction_contract';
        return 'general_contract';
    }
    
    // ==================== RESPONSE GENERATION ====================
    async generateResponse(userInput, intent, context) {
        const startTime = Date.now();
        
        try {
            let response = '';
            let sources = [];
            let suggestions = [];
            let confidence = intent.confidence;
            
            switch (intent.type) {
                case 'greeting':
                    response = this.generateGreetingResponse();
                    suggestions = this.getGeneralSuggestions();
                    break;
                    
                case 'legal_query':
                    const legalResponse = await this.generateLegalResponse(userInput, intent);
                    response = legalResponse.content;
                    sources = legalResponse.sources;
                    suggestions = legalResponse.suggestions;
                    break;
                    
                case 'contract_query':
                    const contractResponse = await this.generateContractResponse(userInput, intent);
                    response = contractResponse.content;
                    sources = contractResponse.sources;
                    suggestions = contractResponse.suggestions;
                    break;
                    
                case 'legal_advice':
                    const adviceResponse = await this.generateAdviceResponse(userInput, intent);
                    response = adviceResponse.content;
                    sources = adviceResponse.sources;
                    suggestions = adviceResponse.suggestions;
                    break;
                    
                case 'help':
                    response = this.generateHelpResponse();
                    suggestions = this.getHelpSuggestions();
                    break;
                    
                default:
                    response = this.generateGeneralResponse(userInput);
                    suggestions = this.getGeneralSuggestions();
            }
            
            const processingTime = Date.now() - startTime;
            
            return {
                content: response,
                confidence: confidence,
                sources: sources,
                suggestions: suggestions,
                processingTime: processingTime
            };
            
        } catch (error) {
            console.error('Error generating response:', error);
            return {
                content: 'Xin lỗi, tôi gặp sự cố khi xử lý câu hỏi của bạn. Vui lòng thử lại sau.',
                confidence: 0.1,
                sources: [],
                suggestions: this.getGeneralSuggestions(),
                processingTime: Date.now() - startTime
            };
        }
    }
    
    generateGreetingResponse() {
        const greetings = [
            'Xin chào! Tôi là trợ lý pháp lý AI của ViLaw. Tôi có thể giúp bạn tìm hiểu về pháp luật Việt Nam, tư vấn pháp lý và hỗ trợ soạn thảo hợp đồng. Bạn cần hỗ trợ gì?',
            'Chào bạn! Tôi là AI pháp lý, sẵn sàng hỗ trợ bạn về mọi vấn đề pháp luật. Hãy cho tôi biết bạn cần tư vấn về lĩnh vực nào?',
            'Xin chào! Tôi có thể giúp bạn tìm kiếm văn bản pháp luật, tư vấn pháp lý và soạn thảo hợp đồng. Bạn muốn hỏi gì?'
        ];
        
        return greetings[Math.floor(Math.random() * greetings.length)];
    }
    
    async generateLegalResponse(userInput, intent) {
        // Find relevant legal documents
        const relevantDocs = await this.findRelevantDocuments(userInput, intent.subcategory);
        
        if (relevantDocs.length === 0) {
            return {
                content: this.generateNoResultsResponse(userInput),
                sources: [],
                suggestions: this.getGeneralSuggestions()
            };
        }
        
        const topDoc = relevantDocs[0];
        let response = `Dựa trên ${relevantDocs.length} văn bản pháp luật liên quan:\n\n`;
        
        response += `📋 **${topDoc.title}**\n`;
        response += `📅 Ngày ban hành: ${this.formatDate(topDoc.date)}\n`;
        response += `📂 Loại: ${topDoc.type}\n`;
        response += `🏛️ Nguồn: ${topDoc.source}\n\n`;
        
        response += `**Nội dung liên quan:**\n`;
        response += this.extractRelevantContent(userInput, topDoc.content);
        
        response += `\n\n⚠️ **Lưu ý quan trọng:**\n`;
        response += `• Thông tin này chỉ mang tính chất tham khảo\n`;
        response += `• Để có câu trả lời chính xác, hãy tham khảo luật sư\n`;
        response += `• Luật có thể thay đổi, cần cập nhật thường xuyên\n`;
        
        return {
            content: response,
            sources: relevantDocs.slice(0, 3),
            suggestions: this.getLegalSuggestions(intent.subcategory)
        };
    }
    
    async generateContractResponse(userInput, intent) {
        const contractTemplates = this.getContractTemplates(intent.subcategory);
        
        let response = `Về ${intent.subcategory.replace('_', ' ')}, tôi có thể hỗ trợ bạn:\n\n`;
        
        response += `📄 **Các loại hợp đồng phổ biến:**\n`;
        contractTemplates.forEach(template => {
            response += `• ${template.name}\n`;
        });
        
        response += `\n**Hướng dẫn soạn thảo:**\n`;
        response += `1. Xác định các bên tham gia\n`;
        response += `2. Xác định đối tượng hợp đồng\n`;
        response += `3. Quy định quyền và nghĩa vụ\n`;
        response += `4. Xác định thời hạn và địa điểm\n`;
        response += `5. Quy định về xử lý tranh chấp\n`;
        
        response += `\n**Lưu ý quan trọng:**\n`;
        response += `• Hợp đồng phải tuân thủ pháp luật\n`;
        response += `• Cần có chữ ký của các bên\n`;
        response += `• Nên tham khảo luật sư trước khi ký\n`;
        
        return {
            content: response,
            sources: [],
            suggestions: this.getContractSuggestions(intent.subcategory)
        };
    }
    
    async generateAdviceResponse(userInput, intent) {
        let response = `Tôi hiểu bạn cần tư vấn pháp lý. Dựa trên câu hỏi của bạn, tôi khuyên bạn:\n\n`;
        
        response += `🔍 **Bước 1: Tìm hiểu thông tin**\n`;
        response += `• Tìm kiếm văn bản pháp luật liên quan\n`;
        response += `• Tham khảo các quy định hiện hành\n`;
        response += `• Xem xét các trường hợp tương tự\n\n`;
        
        response += `📞 **Bước 2: Tìm kiếm hỗ trợ chuyên nghiệp**\n`;
        response += `• Tham khảo luật sư có kinh nghiệm\n`;
        response += `• Liên hệ cơ quan nhà nước có thẩm quyền\n`;
        response += `• Tham khảo ý kiến chuyên gia\n\n`;
        
        response += `📋 **Bước 3: Chuẩn bị hồ sơ**\n`;
        response += `• Thu thập tài liệu liên quan\n`;
        response += `• Chuẩn bị các bằng chứng cần thiết\n`;
        response += `• Lập kế hoạch hành động\n\n`;
        
        response += `⚠️ **Lưu ý:** Tư vấn này chỉ mang tính chất tham khảo. Để có câu trả lời chính xác, hãy tham khảo luật sư chuyên nghiệp.`;
        
        return {
            content: response,
            sources: [],
            suggestions: this.getAdviceSuggestions()
        };
    }
    
    generateHelpResponse() {
        let response = `Tôi có thể giúp bạn với các chức năng sau:\n\n`;
        
        response += `🔍 **Tìm kiếm pháp luật:**\n`;
        response += `• Tìm kiếm văn bản pháp luật\n`;
        response += `• Tra cứu quy định cụ thể\n`;
        response += `• Hướng dẫn thủ tục pháp lý\n\n`;
        
        response += `📄 **Soạn thảo hợp đồng:**\n`;
        response += `• Tạo hợp đồng mẫu\n`;
        response += `• Hướng dẫn điều khoản\n`;
        response += `• Kiểm tra tính hợp pháp\n\n`;
        
        response += `💬 **Tư vấn pháp lý:**\n`;
        response += `• Trả lời câu hỏi pháp luật\n`;
        response += `• Hướng dẫn quy trình\n`;
        response += `• Cung cấp thông tin cập nhật\n\n`;
        
        response += `Hãy cho tôi biết bạn cần hỗ trợ gì cụ thể!`;
        
        return response;
    }
    
    generateGeneralResponse(userInput) {
        return `Tôi hiểu bạn đang hỏi về "${userInput}". Tôi có thể giúp bạn tìm hiểu về pháp luật Việt Nam, tư vấn pháp lý và hỗ trợ soạn thảo hợp đồng. Bạn có thể hỏi cụ thể hơn về lĩnh vực nào bạn quan tâm?`;
    }
    
    generateNoResultsResponse(userInput) {
        return `Tôi không tìm thấy văn bản pháp luật cụ thể liên quan đến "${userInput}". Tuy nhiên, tôi có thể giúp bạn:\n\n• Tìm kiếm thông tin pháp luật khác\n• Tư vấn về quy trình pháp lý\n• Hướng dẫn soạn thảo hợp đồng\n\nBạn có thể hỏi cụ thể hơn về lĩnh vực nào?`;
    }
    
    // ==================== DOCUMENT SEARCH ====================
    async findRelevantDocuments(userInput, category) {
        if (!window.legalDataManager) {
            return [];
        }
        
        const searchResults = window.legalDataManager.searchDocuments(userInput, {
            category: category,
            limit: 5
        });
        
        return searchResults;
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
    
    // ==================== SUGGESTIONS ====================
    getGeneralSuggestions() {
        return [
            'Tìm kiếm luật doanh nghiệp',
            'Hướng dẫn soạn hợp đồng lao động',
            'Quy định về thuế thu nhập',
            'Luật giao thông đường bộ',
            'Quyền và nghĩa vụ của người lao động'
        ];
    }
    
    getLegalSuggestions(category) {
        const suggestions = {
            'business': [
                'Thành lập doanh nghiệp',
                'Quy định về vốn điều lệ',
                'Nghĩa vụ của chủ sở hữu',
                'Giải thể doanh nghiệp'
            ],
            'labor': [
                'Hợp đồng lao động',
                'Quy định về tiền lương',
                'Thời gian làm việc',
                'Nghỉ phép năm'
            ],
            'civil': [
                'Quyền sở hữu tài sản',
                'Hợp đồng dân sự',
                'Thừa kế tài sản',
                'Bồi thường thiệt hại'
            ],
            'criminal': [
                'Các tội phạm hình sự',
                'Hình phạt và biện pháp',
                'Thủ tục tố tụng',
                'Quyền của bị can'
            ]
        };
        
        return suggestions[category] || this.getGeneralSuggestions();
    }
    
    getContractSuggestions(category) {
        const suggestions = {
            'labor_contract': [
                'Hợp đồng lao động không xác định thời hạn',
                'Hợp đồng lao động xác định thời hạn',
                'Hợp đồng lao động theo mùa vụ',
                'Hợp đồng thử việc'
            ],
            'commercial_contract': [
                'Hợp đồng mua bán hàng hóa',
                'Hợp đồng cung cấp dịch vụ',
                'Hợp đồng vận chuyển',
                'Hợp đồng bảo hiểm'
            ],
            'rental_contract': [
                'Hợp đồng thuê nhà',
                'Hợp đồng thuê đất',
                'Hợp đồng thuê phương tiện',
                'Hợp đồng thuê thiết bị'
            ]
        };
        
        return suggestions[category] || this.getGeneralSuggestions();
    }
    
    getAdviceSuggestions() {
        return [
            'Tìm luật sư tư vấn',
            'Liên hệ cơ quan nhà nước',
            'Tham khảo hướng dẫn pháp lý',
            'Chuẩn bị hồ sơ pháp lý',
            'Tìm hiểu quy trình thủ tục'
        ];
    }
    
    getHelpSuggestions() {
        return [
            'Tìm kiếm văn bản pháp luật',
            'Soạn thảo hợp đồng',
            'Tư vấn pháp lý',
            'Hướng dẫn thủ tục',
            'Tra cứu quy định'
        ];
    }
    
    // ==================== CONTRACT TEMPLATES ====================
    getContractTemplates(category) {
        const templates = {
            'labor_contract': [
                { name: 'Hợp đồng lao động không xác định thời hạn', id: 'labor_indefinite' },
                { name: 'Hợp đồng lao động xác định thời hạn', id: 'labor_definite' },
                { name: 'Hợp đồng thử việc', id: 'labor_probation' }
            ],
            'commercial_contract': [
                { name: 'Hợp đồng mua bán hàng hóa', id: 'commercial_sale' },
                { name: 'Hợp đồng cung cấp dịch vụ', id: 'commercial_service' },
                { name: 'Hợp đồng vận chuyển', id: 'commercial_transport' }
            ],
            'rental_contract': [
                { name: 'Hợp đồng thuê nhà', id: 'rental_house' },
                { name: 'Hợp đồng thuê đất', id: 'rental_land' },
                { name: 'Hợp đồng thuê phương tiện', id: 'rental_vehicle' }
            ]
        };
        
        return templates[category] || [];
    }
    
    // ==================== DATA PERSISTENCE ====================
    saveChatHistory() {
        localStorage.setItem('vilaw_chat_history', JSON.stringify(this.chatHistory));
    }
    
    loadChatHistory() {
        const saved = localStorage.getItem('vilaw_chat_history');
        if (saved) {
            this.chatHistory = JSON.parse(saved);
        }
    }
    
    loadLegalKnowledge() {
        // Load legal knowledge from legal data manager
        if (window.legalDataManager) {
            this.legalKnowledge = window.legalDataManager.documents;
        }
    }
    
    loadResponseTemplates() {
        this.responseTemplates = {
            greeting: [
                'Xin chào! Tôi là trợ lý pháp lý AI của ViLaw.',
                'Chào bạn! Tôi sẵn sàng hỗ trợ bạn về pháp luật.',
                'Xin chào! Tôi có thể giúp bạn tìm hiểu về pháp luật Việt Nam.'
            ],
            help: [
                'Tôi có thể giúp bạn tìm kiếm pháp luật, tư vấn và soạn thảo hợp đồng.',
                'Tôi sẵn sàng hỗ trợ bạn về mọi vấn đề pháp lý.',
                'Hãy cho tôi biết bạn cần hỗ trợ gì cụ thể!'
            ]
        };
    }
    
    // ==================== UTILITY METHODS ====================
    generateId() {
        return 'msg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    formatDate(date) {
        return new Date(date).toLocaleDateString('vi-VN');
    }
    
    formatDateTime(date) {
        return new Date(date).toLocaleString('vi-VN');
    }
    
    // ==================== INITIALIZATION ====================
    initializeIntentClassifier() {
        // Initialize intent classification model
        this.intentClassifier = {
            classify: async (input) => {
                // Simple rule-based classification
                return this.analyzeIntent(input);
            }
        };
    }
}

// Global instance
window.aiChatSystem = new AIChatSystem();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AIChatSystem;
}
