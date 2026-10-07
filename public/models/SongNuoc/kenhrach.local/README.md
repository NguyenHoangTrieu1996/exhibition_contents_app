# Mô hình 3D khi mở index.html trực tiếp

Thư mục này chứa dữ liệu của `../kenhrach.glb`, đóng gói thành các script local để Chrome có thể đọc khi mở trang bằng `file://` mà không cần tắt bảo vệ CORS.

- Khi mở qua localhost/HTTP, ứng dụng tải file GLB gốc.
- Khi mở trực tiếp index.html, ứng dụng đọc manifest và từng chunk, khôi phục GLB trong bộ nhớ, rồi đưa vào trình xem bằng Blob URL.
- Thư viện trình xem và font đều nằm trong dự án. Không cần Internet.
- Giữ nguyên toàn bộ thư mục này khi sao chép dự án để sử dụng bằng `file://`.

Sau khi thay thế file GLB hoặc nâng cấp model-viewer, chạy từ thư mục gốc dự án:

```powershell
node scripts/build-local-3d.cjs
```

Đây là dữ liệu được sinh tự động; không chỉnh từng chunk bằng tay.
