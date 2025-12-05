# Hướng dẫn cài đặt & sử dụng hệ thống ClothingEcommerce

Tài liệu này hướng dẫn cài đặt môi trường, khởi chạy hệ thống và sử dụng cơ bản cho dự án **ClothingEcommerce** (Backend Spring Boot, Frontend Next.js, CSDL MySQL trên XAMPP) chạy **local** trên Windows.

---

## 1. Yêu cầu hệ thống

### 1.1. Yêu cầu phần cứng

- CPU: 2 nhân trở lên  
- RAM: 8 GB  
- Ổ cứng trống: ≥ 10 GB  

### 1.2. Yêu cầu phần mềm

- Hệ điều hành: **Windows 10 / 11 (64-bit)**
- Phần mềm cần cài:
  - **XAMPP** (Apache + MySQL)
  - **JDK** (Java Development Kit) – khuyến nghị **JDK 17**
  - **Node.js** (LTS, ví dụ **18.x** hoặc **20.x**)
  - **Visual Studio Code**
  - **Git**

---

## 2. Cài đặt môi trường

### 2.1. Cài đặt XAMPP

1. Tải XAMPP từ trang chính thức (phiên bản mới nhất).  
   - Link: https://www.apachefriends.org/download.html
<img width="940" height="474" alt="image" src="https://github.com/user-attachments/assets/7cdd21a8-b8a6-47ac-b0d5-d5eb0fca75c1" />
2. Chạy file cài đặt, chọn các module:
   - Apache  
   - MySQL  
3. Cài đặt theo hướng dẫn mặc định (ví dụ: `C:\xampp`).  
4. Mở **XAMPP Control Panel**:
   - Nhấn **Start** module **Apache**
   - Nhấn **Start** module **MySQL**

### 2.2. Cài đặt JDK (Java Development Kit)

1. Tải **JDK 17 (hoặc 21)** từ trang chính thức của Oracle.  
   - Link: https://www.oracle.com/java/technologies/downloads/#jdk25-windows
2. Cài đặt theo mặc định.  
3. Mở **Command Prompt** hoặc **PowerShell** và kiểm tra:

   ```bash
   java -version
   ```

   Nếu hiển thị phiên bản JDK là OK.

### 2.3. Cài đặt Node.js

1. Tải **Node.js phiên bản LTS** (18.x hoặc 20.x).  
   - Link: https://nodejs.org/en
2. Cài đặt theo mặc định.  
3. Kiểm tra:

   ```bash
   node -v
   npm -v
   ```

### 2.4. Cài đặt Visual Studio Code

1. Tải **VS Code** từ trang chính thức.  
   - Link: https://code.visualstudio.com/
2. Cài đặt theo mặc định.  
3. Mở VS Code, cài thêm các extension khuyến nghị:
   - **Extension Pack for Java**
   - **Spring Boot Extension Pack**
   - **Debugger for Java**
   - **Java Test Runner**

### 2.5. Cài đặt Git

1. Truy cập trang tải **Git for Windows**.  
   - Link: https://git-scm.com/install/windows
2. Tải file cài đặt (dạng: `Git-*-64-bit.exe`).  
3. Chạy file cài đặt:
   - Bấm **Next** liên tục theo cấu hình mặc định.
   - Bước **Choosing the default editor used by Git**:
     - Có thể để mặc định (Vim)  
     - Hoặc chọn **Use Visual Studio Code as Git’s default editor** nếu muốn.
   - Các bước còn lại để mặc định.  
4. Sau khi cài xong, kiểm tra:

   ```bash
   git --version
   ```

   Nếu hiển thị phiên bản Git (ví dụ: `git version 2.xx.x`) là cài đặt thành công.

---

## 3. Clone dự án từ GitHub

### 3.1. Chuẩn bị thư mục lưu source

Tạo folder:

```text
D:\ClothingEcommerce\
```

### 3.2. Clone dự án từ GitHub

1. Mở **Command Prompt** hoặc **PowerShell**.  
2. Chuyển sang ổ D:

   ```bash
   cd /d D:\ClothingEcommerce
   ```

3. Chạy lệnh clone repository:

   ```bash
   git clone https://github.com/nguyenhuutruong6666/ClothingEcommerce
   ```

4. Sau khi clone xong, kiểm tra cấu trúc thư mục trong `D:\ClothingEcommerce\ClothingEcommerce`, ví dụ:

```text
Frontend\client-website
Frontend\dashboard-admin
Backend\...
```

> Lưu ý: Có thể đổi tên folder cho gọn (ví dụ: đặt trực tiếp mã nguồn vào `D:\ClothingEcommerce\`).

---

## 4. Cài đặt và cấu hình CSDL MySQL (XAMPP)

### 4.1. Tạo database từ file `clothingshop.sql`

1. Mở **XAMPP Control Panel** → **Start MySQL**.  
2. Nhấn nút **Admin** của MySQL để mở **phpMyAdmin**.  
3. Trong phpMyAdmin:
   - Vào tab **Databases**.
   - Tạo database mới, ví dụ: `clothingshop`.
   - Chọn database `clothingshop` vừa tạo.
   - Vào tab **Import**.
   - Chọn file **`clothingshop.sql`** trên máy.
   - Nhấn **Go** để import.
4. Sau khi import thành công:
   - Kiểm tra các bảng đã được tạo (ví dụ: `users`, `products`, `orders`, ...).

### 4.2. Thông tin kết nối mặc định (XAMPP)

- **Host**: `localhost`  
- **Port**: `3306`  
- **User**: `root`  
- **Password**: *(trống – mặc định XAMPP)*  

### 4.3. Cấu hình kết nối DB trong Backend Spring Boot

Mở file cấu hình trong backend:  
`src/main/resources/application.yml` (hoặc `application.properties` tuỳ dự án).

Thêm/cập nhật:

```properties
url: jdbc:mysql://localhost:3306/clothingshop?useSSL=false&serverTimezone=UTC
driver-class-name: com.mysql.cj.jdbc.Driver
username: root
password: 
```

> Nếu bạn đổi tên database hoặc mật khẩu MySQL, nhớ sửa lại cho khớp.

---

## 5. Cài đặt và chạy Backend Spring Boot (Java)

### 5.1. Mở project backend trong VS Code

1. Mở **Visual Studio Code**.  
2. Chọn **File → Open Folder...**  
3. Chọn thư mục backend, ví dụ:

   ```text
   D:\ClothingEcommerce\Backend\...
   ```

4. Chờ VS Code tự động nhận diện project Java/Spring Boot và tải dependencies (thông qua Gradle hoặc cấu hình sẵn).

### 5.2. Đảm bảo extension Java/Spring đã cài

Trong VS Code:

- Mở **Extensions** (`Ctrl + Shift + X`).
- Cài (nếu chưa có):
  - **Extension Pack for Java**
  - **Spring Boot Extension Pack**
  - **Debugger for Java**
  - **Java Test Runner**

### 5.3. Cách 1: Chạy Backend trực tiếp trên VS Code (Run and Debug)

1. Tìm file chứa hàm `main` của Spring Boot, có annotation `@SpringBootApplication`, thường tên kiểu:

   ```java
   ClothingEcommerceWebsiteApplication.java
   ```

2. Mở file đó.  
3. Mở panel **Run and Debug** (icon tam giác + con bọ ở thanh bên trái) hoặc nhấn **F5**.  
4. Chọn cấu hình chạy phù hợp nếu được hỏi.  
5. Theo dõi log trong **Debug Console / Terminal**. Khi chạy thành công sẽ xuất hiện:

   ```text
   Started <TênApplication> in X.XXX seconds (JVM running for Y.YYY)
   ```

6. Mặc định backend chạy tại:

   ```text
   http://localhost:8080
   ```

### 5.4. Cách 2: Chạy Backend bằng Gradle wrapper trong Terminal VS Code

1. Mở **Terminal** tích hợp trong VS Code:  
   **View → Terminal**.  
2. Chạy lệnh (Windows):

   ```bash
   .\gradlew bootRun
   ```

3. Đợi đến khi xuất hiện log dạng:

   ```text
   Started Application in X.XXX seconds (JVM running for Y.YYY)
   ```

4. Ứng dụng chạy tại:

   ```text
   http://localhost:8080
   ```

---

## 6. Cài đặt và chạy Frontend Next.js

### 6.1. Kiểm tra môi trường Node.js

Đảm bảo Node.js và npm đã cài:

```bash
node -v
npm -v
```

### 6.2. Cài đặt dependencies & chạy **client website**

1. Mở VS Code.  
2. **File → Open Folder...** → chọn thư mục:

   ```text
   D:\ClothingEcommerce\Frontend\client-website
   ```

3. Mở Terminal trong VS Code (hoặc dùng CMD/PowerShell) và chạy:

   ```bash
   cd /d D:\ClothingEcommerce\Frontend\client-website
   npm install
   ```

   > Lần đầu sẽ tải toàn bộ package.

4. Sau khi cài xong, chạy:

   ```bash
   npm run dev
   ```

5. Mặc định Next.js chạy tại:

   ```text
   http://localhost:3000
   ```

### 6.3. Cài đặt dependencies & chạy **dashboard admin**

1. Mở (hoặc dùng lại) VS Code.  
2. **File → Open Folder...** → chọn thư mục:

   ```text
   D:\ClothingEcommerce\Frontend\dashboard-admin
   ```

3. Trong Terminal:

   ```bash
   cd /d D:\ClothingEcommerce\Frontend\dashboard-admin
   npm install
   npm run dev
   ```

4. Mặc định admin chạy tại:

   ```text
   http://localhost:3001
   ```

---

## 7. Hướng dẫn sử dụng cơ bản

> Yêu cầu:  
> - Backend Spring Boot đã chạy tại `http://localhost:8080`  
> - MySQL/XAMPP đã chạy và kết nối đúng  
> - Frontend đã chạy (`client-website` và/hoặc `dashboard-admin`)

### 7.1. Dành cho người dùng (Client Website)

1. Mở trình duyệt → truy cập:

   ```text
   http://localhost:3000
   ```

2. Các chức năng chính (tuỳ theo hệ thống đã xây):

   - Đăng ký / Đăng nhập tài khoản  
   - Xem danh sách sản phẩm  
   - Lọc / tìm kiếm theo:
     - Danh mục
     - Giá
     - Kích cỡ
     - Màu sắc  
   - Xem chi tiết sản phẩm  
   - Thêm sản phẩm vào giỏ hàng  
   - Cập nhật số lượng / xóa sản phẩm khỏi giỏ  
   - Tiến hành đặt hàng (**checkout**)  
   - Sau khi đặt hàng, hệ thống ghi nhận thông tin vào database.

### 7.2. Dành cho quản trị viên (Dashboard Admin)

1. Mở trình duyệt → truy cập:

   ```text
   http://localhost:3001
   ```

2. Đăng nhập với tài khoản quản trị (ví dụ – tuỳ bạn cấu hình sẵn trong DB):

   ```text
   Email: nguyenhuutruong6666@gmail.com
   Mật khẩu: 123456
   ```

3. Một số chức năng quản trị (tuỳ hệ thống):

   - Quản lý sản phẩm:
     - Thêm / sửa / xóa sản phẩm  
     - Cập nhật tồn kho  
   - Quản lý danh mục sản phẩm  
   - Xem và xử lý đơn hàng  
   - Quản lý người dùng  
   - Xem báo cáo, thống kê:
     - Doanh thu
     - Số lượng đơn hàng
     - Các chỉ số kinh doanh khác (tuỳ implement).

---
