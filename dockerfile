# Stage 1: Build the app
FROM node:20-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the app with NGINX
FROM nginx:alpine
# Copy the built files from the previous stage to the NGINX folder
COPY --from=build /app/dist /usr/share/nginx/html
# Replace default NGINX config with one that listens on port 8080
COPY <<EOF /etc/nginx/conf.d/default.conf
server {
    listen 8080;
    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files \$uri \$uri/ /index.html;
    }
}
EOF
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]