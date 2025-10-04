# Hướng dẫn thanh toán ViLaw

## 💳 Tổng quan hệ thống thanh toán

ViLaw hỗ trợ nhiều phương thức thanh toán để phục vụ người dùng Việt Nam:

### 🔧 Các phương thức thanh toán

#### 1. **VNPay** - Cổng thanh toán chính
- **Mô tả**: Cổng thanh toán phổ biến nhất tại Việt Nam
- **Hỗ trợ**: Thẻ ATM, thẻ tín dụng, ví điện tử
- **Phí**: 3% + VAT
- **Thời gian xử lý**: 1-3 phút

#### 2. **MoMo** - Ví điện tử
- **Mô tả**: Ví điện tử MoMo
- **Hỗ trợ**: Số dư MoMo, thẻ ngân hàng
- **Phí**: 2.5% + VAT
- **Thời gian xử lý**: Tức thì

#### 3. **ZaloPay** - Ví điện tử
- **Mô tả**: Ví điện tử ZaloPay
- **Hỗ trợ**: Số dư ZaloPay, thẻ ngân hàng
- **Phí**: 2.5% + VAT
- **Thời gian xử lý**: Tức thì

#### 4. **Chuyển khoản ngân hàng**
- **Mô tả**: Chuyển khoản trực tiếp
- **Hỗ trợ**: Tất cả ngân hàng Việt Nam
- **Phí**: Miễn phí
- **Thời gian xử lý**: 1-2 ngày làm việc

#### 5. **Thẻ tín dụng/ghi nợ**
- **Mô tả**: Thẻ quốc tế
- **Hỗ trợ**: Visa, Mastercard, JCB
- **Phí**: 3.5% + VAT
- **Thời gian xử lý**: 1-5 phút

## 📦 Các gói dịch vụ

### 🆓 **Gói Miễn phí**
- **Giá**: 0 VND
- **Tính năng**:
  - 5 câu hỏi AI/ngày
  - Tìm kiếm cơ bản
  - 3 hợp đồng mẫu
  - Hỗ trợ email

### 💼 **Gói Cơ bản**
- **Giá**: 99,000 VND/tháng
- **Tính năng**:
  - 50 câu hỏi AI/ngày
  - Tìm kiếm nâng cao
  - 20 hợp đồng mẫu
  - Hỗ trợ ưu tiên
  - Xuất PDF

### 🏢 **Gói Chuyên nghiệp** (Phổ biến)
- **Giá**: 299,000 VND/tháng
- **Tính năng**:
  - 200 câu hỏi AI/ngày
  - Tìm kiếm không giới hạn
  - 100 hợp đồng mẫu
  - Hỗ trợ 24/7
  - API access
  - Tích hợp CRM

### 🏭 **Gói Doanh nghiệp**
- **Giá**: 999,000 VND/tháng
- **Tính năng**:
  - Không giới hạn AI
  - Tìm kiếm không giới hạn
  - Hợp đồng không giới hạn
  - Hỗ trợ chuyên dụng
  - API không giới hạn
  - Tích hợp tùy chỉnh
  - Báo cáo nâng cao

## 🚀 Quy trình thanh toán

### Bước 1: Chọn gói dịch vụ
1. Truy cập `subscription.html`
2. Chọn gói phù hợp với nhu cầu
3. Nhấn "Chọn gói"

### Bước 2: Phương thức thanh toán
1. Truy cập `payment.html`
2. Chọn phương thức thanh toán
3. Điền thông tin thanh toán

### Bước 3: Xác nhận thanh toán
1. Kiểm tra thông tin đơn hàng
2. Nhấn "Tiến hành thanh toán"
3. Chuyển hướng đến cổng thanh toán

### Bước 4: Hoàn tất
1. Thanh toán thành công
2. Tự động kích hoạt gói dịch vụ
3. Nhận email xác nhận

## 💰 Tính phí

### Công thức tính phí
```
Tổng phí = Giá gói + Thuế VAT (10%) + Phí xử lý (3%)
```

### Ví dụ tính phí
- **Gói Cơ bản**: 99,000 + 9,900 + 2,970 = **111,870 VND**
- **Gói Chuyên nghiệp**: 299,000 + 29,900 + 8,970 = **337,870 VND**
- **Gói Doanh nghiệp**: 999,000 + 99,900 + 29,970 = **1,128,870 VND**

## 🔒 Bảo mật thanh toán

### Mã hóa dữ liệu
- **SSL/TLS**: Mã hóa toàn bộ kết nối
- **PCI DSS**: Tuân thủ tiêu chuẩn bảo mật thẻ
- **Tokenization**: Mã hóa thông tin nhạy cảm

### Xác thực
- **2FA**: Xác thực 2 yếu tố
- **OTP**: Mã xác thực SMS/Email
- **Biometric**: Vân tay/Face ID

### Giám sát
- **Fraud Detection**: Phát hiện gian lận
- **Risk Assessment**: Đánh giá rủi ro
- **Audit Trail**: Theo dõi giao dịch

## 📊 Quản lý gói dịch vụ

### Gia hạn tự động
- **Bật/tắt**: Có thể tùy chỉnh
- **Thông báo**: Email trước 7 ngày
- **Hủy**: Có thể hủy bất kỳ lúc nào

### Thay đổi gói
- **Nâng cấp**: Có hiệu lực ngay
- **Hạ cấp**: Có hiệu lực chu kỳ tiếp theo
- **Hoàn tiền**: Theo chính sách

### Hủy gói
- **Thời gian**: Bất kỳ lúc nào
- **Hoàn tiền**: Theo tỷ lệ sử dụng
- **Dữ liệu**: Được bảo lưu 30 ngày

## 🆘 Hỗ trợ thanh toán

### Liên hệ hỗ trợ
- **Email**: payment@vilaw.vn
- **Hotline**: 1900-1234
- **Chat**: Hỗ trợ trực tuyến 24/7

### Thời gian hỗ trợ
- **Thứ 2-6**: 8:00-18:00
- **Thứ 7**: 8:00-12:00
- **Chủ nhật**: Nghỉ

### Câu hỏi thường gặp

#### Q: Tôi có thể thay đổi phương thức thanh toán không?
A: Có, bạn có thể thay đổi trong phần "Cài đặt tài khoản".

#### Q: Phí thanh toán có được hoàn lại không?
A: Phí thanh toán không được hoàn lại, chỉ hoàn tiền gói dịch vụ.

#### Q: Tôi có thể thanh toán bằng ngoại tệ không?
A: Hiện tại chỉ hỗ trợ VND, sẽ hỗ trợ USD trong tương lai.

#### Q: Làm sao để hủy gói dịch vụ?
A: Vào "Gói dịch vụ" > "Hủy gói" > Xác nhận hủy.

## 📈 Báo cáo thanh toán

### Báo cáo doanh thu
- **Tổng doanh thu**: Theo tháng/quý/năm
- **Phân tích gói**: Gói nào bán chạy nhất
- **Phương thức**: Phương thức thanh toán phổ biến

### Báo cáo người dùng
- **Tỷ lệ chuyển đổi**: Từ miễn phí sang trả phí
- **Tỷ lệ giữ chân**: Người dùng gia hạn
- **Phân khúc**: Phân tích theo ngành nghề

### Báo cáo kỹ thuật
- **Thời gian xử lý**: Trung bình xử lý thanh toán
- **Tỷ lệ thành công**: Phần trăm thanh toán thành công
- **Lỗi thanh toán**: Các lỗi thường gặp

## 🔧 Tích hợp API

### Webhook thanh toán
```javascript
// Cấu hình webhook
const webhookConfig = {
    url: 'https://api.vilaw.vn/webhooks/payment',
    events: ['payment.success', 'payment.failed', 'subscription.created'],
    secret: 'your_webhook_secret'
};
```

### API endpoints
```javascript
// Tạo thanh toán
POST /api/payments
{
    "planId": "professional",
    "paymentMethod": "vnpay",
    "amount": 299000,
    "currency": "VND"
}

// Kiểm tra trạng thái
GET /api/payments/{paymentId}

// Hủy thanh toán
DELETE /api/payments/{paymentId}
```

## 📱 Ứng dụng di động

### Thanh toán trên mobile
- **Responsive**: Tối ưu cho mobile
- **Touch ID**: Xác thực vân tay
- **Push notification**: Thông báo thanh toán

### Offline payment
- **QR Code**: Quét mã thanh toán
- **SMS**: Thanh toán qua SMS
- **Bank transfer**: Chuyển khoản offline

## 🌍 Thanh toán quốc tế

### Hỗ trợ trong tương lai
- **PayPal**: Thanh toán quốc tế
- **Stripe**: Thẻ tín dụng quốc tế
- **Crypto**: Bitcoin, Ethereum
- **Multi-currency**: USD, EUR, JPY

### Compliance
- **PCI DSS**: Tiêu chuẩn bảo mật thẻ
- **GDPR**: Bảo vệ dữ liệu cá nhân
- **SOX**: Tuân thủ pháp luật

---

**ViLaw - Hệ thống thanh toán an toàn và tiện lợi** 💳
