# Giao Diện Quản Trị Thống Nhất

## Tổng Quan

Giao diện quản trị mới đã được thiết kế để kết hợp giữa mẫu giao diện Anime hiện có và chức năng quản trị mạnh mẽ từ mẫu SB Admin 2. Giao diện này cho phép quản trị viên quản lý toàn bộ nội dung và thiết kế của trang web AnimeHub.

## Cấu Trúc

```
anime-main/admin/
├── dashboard.html          # Trang bảng điều khiển chính
├── css/
│   ├── admin-dashboard.css # CSS cho giao diện quản trị
│   └── ...                 # Các file CSS khác
├── js/
│   ├── admin-dashboard.js  # JavaScript cho chức năng quản trị
│   └── ...                 # Các file JS khác
└── ...                     # Các file khác
```

## Tính Năng

### 1. Tổng Quan (Dashboard)
- Hiển thị thống kê về anime, người dùng, lượt xem và bình luận
- Hiển thị hoạt động gần đây của hệ thống

### 2. Quản Lý Nội Dung
- Thêm, sửa, xóa các mục anime
- Quản lý thông tin chi tiết của từng anime (tên, thể loại, số tập, mô tả)

### 3. Quản Lý Người Dùng
- Xem danh sách tất cả người dùng
- Phân quyền người dùng (người dùng thông thường/quản trị viên)
- Xóa người dùng

### 4. Thiết Kế Trang Web
- Tùy chỉnh logo trang web
- Thay đổi màu sắc chính và phụ của trang web
- Chỉnh sửa nội dung footer

### 5. Cài Đặt Hệ Thống
- Thay đổi tiêu đề và mô tả trang web
- Bật/tắt chế độ bảo trì

## Cách Sử Dụng

1. Đăng nhập với tài khoản quản trị viên
2. Truy cập trang Hồ Sơ cá nhân
3. Nhấn vào nút "Bảng Điều Khiển" trong khu vực quản trị
4. Sử dụng menu điều hướng để chuyển giữa các chức năng

## Tùy Chỉnh Giao Diện

Giao diện quản trị sử dụng cùng hệ thống CSS với trang web chính, đảm bảo tính nhất quán về thiết kế. Các màu sắc và phông chữ được kế thừa từ mẫu Anime, tạo nên trải nghiệm người dùng thống nhất.

## Lưu Trữ Dữ Liệu

Hiện tại, dữ liệu được lưu trữ trong localStorage của trình duyệt. Trong môi trường sản xuất thực tế, dữ liệu sẽ được lưu trữ trên máy chủ.

## Tương Lai

Trong các phiên bản tương lai, giao diện quản trị có thể được mở rộng với các tính năng:
- Quản lý blog và bài viết
- Thống kê chi tiết về lượt xem và người dùng
- Quản lý bình luận và đánh giá
- Tùy chỉnh slider hình ảnh trang chủ
- Quản lý thể loại anime