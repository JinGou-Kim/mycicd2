# 1단계: Node.js 20 환경에서 yarn으로 리액트(TypeScript) 앱 빌드
FROM node:20-alpine AS build
WORKDIR /app

# 패키지 목록 및 yarn.lock 복사 후 의존성 설치
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# 전체 소스 코드 복사 및 프로덕션 빌드
COPY . .
RUN yarn build

# 2단계: Nginx 서버로 빌드 결과물 및 커스텀 nginx.conf 배치
FROM nginx:alpine

# 커스텀 nginx.conf 적용
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 빌드된 정적 파일 복사
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]O
