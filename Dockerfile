# Sử dụng image Nginx chính thức
FROM nginx:alpine

# Xóa nội dung mặc định của Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copy toàn bộ website tĩnh vào thư mục phục vụ của Nginx
COPY . /usr/share/nginx/html

# Mở cổng 80
EXPOSE 80


