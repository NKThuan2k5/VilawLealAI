# 🚀 ViLaw - Nền tảng Hạ tầng Pháp lý Số Toàn Dân

## 📋 Tổng quan dự án

ViLaw là nền tảng pháp lý số toàn diện, tích hợp AI để hỗ trợ công dân, doanh nghiệp và cơ quan nhà nước tiếp cận pháp luật một cách dễ hiểu, minh bạch và cá nhân hóa.

## 🎯 Tính năng chính

### 🤖 AI Chat System
- **Chat AI cơ bản** (`chat.html`) - Trò chuyện với AI pháp lý
- **Chat AI nâng cao** (`enhanced-chat.html`) - AI học hỏi liên tục
- **Nhận diện giọng nói** - Tương tác bằng tiếng Việt
- **Phân tích ý định** - Hiểu rõ câu hỏi của người dùng

### 📚 Quản lý Văn bản Pháp luật
- **Tìm kiếm thông minh** - AI semantic search
- **30+ văn bản pháp luật** - Luật, nghị định, thông tư
- **Phân loại theo chủ đề** - Doanh nghiệp, lao động, dân sự, v.v.
- **Cập nhật tự động** - Dữ liệu pháp luật mới nhất

### 📝 Soạn thảo Hợp đồng
- **Mẫu hợp đồng chuẩn** - Hợp đồng lao động, mua bán, thuê nhà
- **AI hỗ trợ soạn thảo** - Gợi ý điều khoản pháp lý
- **Phân tích rủi ro** - Đánh giá rủi ro pháp lý
- **Xuất file PDF** - Tải về hợp đồng hoàn chỉnh

### 💳 Hệ thống Thanh toán
- **Nhiều phương thức** - VNPay, MoMo, ZaloPay, chuyển khoản
- **Gói dịch vụ linh hoạt** - Miễn phí, Cơ bản, Chuyên nghiệp, Doanh nghiệp
- **Quản lý đăng ký** - Gia hạn, hủy, thay đổi gói
- **Lịch sử thanh toán** - Theo dõi giao dịch

### 📊 Dashboard & Analytics
- **Thống kê tổng quan** - Người dùng, tài liệu, hợp đồng
- **Phân tích hiệu suất** - Thời gian phản hồi, tỷ lệ thành công
- **Báo cáo chi tiết** - Xuất dữ liệu Excel/PDF
- **Theo dõi xu hướng** - Phân tích hành vi người dùng

## 🛠️ Công nghệ sử dụng

### Frontend
- **HTML5** - Cấu trúc trang web
- **CSS3** - Styling và animations
- **JavaScript ES6+** - Logic tương tác
- **Lucide Icons** - Icon system

### AI & Machine Learning
- **Intent Analysis** - Phân tích ý định người dùng
- **Natural Language Processing** - Xử lý ngôn ngữ tự nhiên
- **Continuous Learning** - AI học hỏi từ tương tác
- **Response Generation** - Tạo phản hồi thông minh

### Data Management
- **Local Storage** - Lưu trữ dữ liệu local
- **JSON Database** - Quản lý dữ liệu pháp luật
- **Search Engine** - Tìm kiếm nhanh chóng
- **Data Synchronization** - Đồng bộ dữ liệu

## 📁 Cấu trúc dự án

```
ViLaw/
├── index.html              # Trang chủ chính
├── chat.html               # Chat AI cơ bản
├── enhanced-chat.html      # Chat AI nâng cao
├── legal.html              # Tìm kiếm văn bản pháp luật
├── documents.html          # Quản lý tài liệu
├── contract.html           # Soạn thảo hợp đồng
├── dashboard.html          # Dashboard admin
├── loginuser.html          # Đăng nhập người dùng
├── subscription.html       # Gói dịch vụ
├── payment.html            # Thanh toán
├── vilaw-core.js           # Core system
├── app.js                  # Application logic
├── legal-data.js           # Legal data management
├── ai-chat.js              # AI chat system
├── ai-learning.js          # AI learning system
├── payment.js              # Payment system
├── config.js               # Configuration
├── enhanced-styles.css     # Enhanced styles
├── fix-colors.css          # Color fixes
└── README.md               # Documentation
```

## 🚀 Cách sử dụng

### 1. Chạy dự án
```bash
# Sử dụng live-server (khuyến nghị)
npm install -g live-server
live-server --port=5500

# Hoặc mở trực tiếp file HTML
open index.html
```

### 2. Truy cập các tính năng
- **Trang chủ**: `index.html`
- **Chat AI**: `chat.html` hoặc `enhanced-chat.html`
- **Tìm kiếm luật**: `legal.html`
- **Soạn thảo**: `contract.html`
- **Dashboard**: `dashboard.html`
- **Thanh toán**: `payment.html`

### 3. Debug và phát triển
```javascript
// Mở console và chạy
ViLaw.debug()  // Xem thông tin debug
```

## 🎨 Giao diện & UX

### Design System
- **Màu sắc**: Xanh lá chủ đạo (#76BA53)
- **Typography**: Inter font family
- **Spacing**: Consistent 8px grid
- **Shadows**: Subtle depth layers
- **Animations**: Smooth transitions

### Responsive Design
- **Mobile First** - Tối ưu cho mobile
- **Tablet Support** - Giao diện tablet
- **Desktop Enhanced** - Tính năng desktop

### Accessibility
- **Keyboard Navigation** - Điều hướng bằng phím
- **Screen Reader** - Hỗ trợ đọc màn hình
- **High Contrast** - Chế độ tương phản cao
- **Reduced Motion** - Tắt animation

## 📈 Performance & Analytics

### Performance Monitoring
- **Page Load Time** - Thời gian tải trang
- **First Paint** - Thời gian vẽ đầu tiên
- **Largest Contentful Paint** - LCP metric
- **Cumulative Layout Shift** - CLS metric

### Analytics Tracking
- **User Interactions** - Tương tác người dùng
- **Feature Usage** - Sử dụng tính năng
- **Error Tracking** - Theo dõi lỗi
- **Performance Metrics** - Chỉ số hiệu suất

## 🔧 Cấu hình & Tùy chỉnh

### Environment Variables
```javascript
// config.js
const ViLawConfig = {
    appName: "ViLaw",
    version: "2.0.0",
    apiEndpoints: { ... },
    features: { ... }
};
```

### Feature Flags
```javascript
// Bật/tắt tính năng
ViLawConfig.features.aiChat.enabled = true;
ViLawConfig.features.paymentSystem.enabled = true;
```

## 🐛 Debug & Troubleshooting

### Common Issues
1. **Script không load**: Kiểm tra đường dẫn file
2. **CSS không áp dụng**: Clear cache browser
3. **JavaScript error**: Mở console xem lỗi
4. **Local storage**: Kiểm tra quota

### Debug Commands
```javascript
// Xem thông tin hệ thống
ViLaw.debug()

// Xem analytics
console.log(ViLaw.core.getAnalytics())

// Xem performance
console.log(ViLaw.core.getPerformanceMetrics())
```

## 🚀 Roadmap & Future

### Version 2.1
- [ ] Voice recognition nâng cao
- [ ] Multi-language support
- [ ] Advanced AI training
- [ ] Real-time collaboration

### Version 2.2
- [ ] Blockchain integration
- [ ] Smart contracts
- [ ] Decentralized storage
- [ ] NFT legal documents

## 📞 Support & Contact

- **Email**: support@vilaw.com
- **Phone**: +84 123 456 789
- **Website**: https://vilaw.com
- **Documentation**: https://docs.vilaw.com

---

**ViLaw Team** - Nền tảng Hạ tầng Pháp lý Số Toàn Dân 🚀
