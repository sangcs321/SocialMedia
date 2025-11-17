1. Clone repository
   cd PublicModule.Server
2. Cài đặt các gói BE
   dotnet restore
   dotnet dev-certs https --trust
3. Cập nhật chuỗi kết nối trong appsettings.json.
   "DefaultConnection": "Server=..."" Server là "localhost" hoặc tên của Connect SSMS
4. cài đặt FE và chạy
   cd ..
   cd PublicModule.Client
   npm install
   npm run devSQL
5. Copy câu lệnh query từ PublicModule.Server/SQL/social.sql để tạo database
6. Link Client:http://localhost:5173/
   Link BE Swagger:http://localhost:5229/swagger/index.html
