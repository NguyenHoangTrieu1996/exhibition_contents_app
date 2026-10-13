# Thư và kỷ vật kháng chiến

Mở `index.html#/thuvakyvatkhangchien/index` trong ứng dụng trưng bày. Có thể mở trực tiếp bằng `file:///` hoặc phục vụ thư mục dự án qua HTTP; ứng dụng không tải dữ liệu bằng `fetch` và không cần dịch vụ bên ngoài.

- 31 mục tư liệu, hai phần nội dung, bốn chặng khám phá; giữ chú thích Việt–Anh và sáu đoạn trích song ngữ từ DOCX.
- Bộ sưu tập tìm kiếm không phân biệt dấu, kết hợp lọc theo chặng.
- Xem ảnh lớn, chuyển ảnh bằng nút hoặc phím trái/phải, phóng to và tự chạy mỗi 8 giây. Tự chạy dừng khi tab bị ẩn; đóng bằng Escape, nút Đóng hoặc vùng nền bên ngoài hộp xem ảnh.
- Tài nguyên được lưu cục bộ. Ảnh nhỏ dùng cho danh sách, ảnh tối đa 2000 px dùng khi xem chi tiết.
- Mục 7 không có ảnh nguồn; hiển thị văn bản thay thế, không dùng bìa sách giả. Mục 6 sử dụng ảnh nhúng DOCX có độ phân giải thấp. Các ảnh còn lại dùng ảnh gốc trong thư mục tư liệu.
- Chú thích tiếng Anh mục 28 được sửa từ January 20 sang July 20, 1974 để khớp chú thích Việt và ngày ghi trong thư. Các nội dung còn lại giữ theo tài liệu nguồn.

## Tệp nội dung

`public/datas/thuvakyvatkhangchien/index.js` chứa các nhóm, mục tư liệu, chú thích, đoạn trích và đường dẫn ảnh. Không sửa tên hoặc đường dẫn của các chuyên đề khác.

Ảnh trong `public/images/thuvakyvatkhangchien/full/` dùng khi xem chi tiết; ảnh trong `thumb/` dùng cho danh sách và trang giới thiệu. Cả hai thư mục đều cần cho ứng dụng.
