# ---- Base Node ----
FROM node:20-alpine as base
WORKDIR '/app'
COPY ./package.json .
# prevent postinstall scripts from running on install
RUN npm config set ignore-scripts true
RUN npm install
# manually install esbuild
RUN npm install esbuild --no-save --ignore-scripts
# enable postinstall scripts back
RUN npm config set ignore-scripts false

# ---- Build ----
FROM base AS build
WORKDIR /app
COPY . .
RUN npm run build

# --- Production Nginx ----
FROM nginx:stable-alpine as production
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
