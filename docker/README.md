# No-Surrender Docker Setup

Bu proje tamamen Docker üzerinde çalışacak şekilde yapılandırılmıştır.

## 🚀 Hızlı Başlangıç

### Windows Kullanıcıları İçin

```bash
# Development ortamını başlat
cd docker/scripts
dev.bat

# Yeniden build et
build.bat

# Temizlik yap
clean.bat
```

### Linux/Mac Kullanıcıları İçin

```bash
# Script'leri çalıştırılabilir yap
chmod +x docker/scripts/*.sh

# Development ortamını başlat
cd docker/scripts
./dev.sh
```

## 📋 Manuel Komutlar

```bash
# Development ortamını başlat
cd docker
docker-compose up -d

# Logları izle
docker-compose logs -f

# Belirli bir servisin logunu izle
docker-compose logs -f web
docker-compose logs -f api

# Servisleri durdur
docker-compose down

# Yeniden build et
docker-compose build --no-cache

# Production build
docker-compose -f docker-compose.prod.yml up -d
```

## 🔧 Servis Adresleri

- **Web Application**: http://localhost:3000
- **API**: http://localhost:3001
- **MongoDB**: mongodb://localhost:27017/ns_case
- **Redis**: redis://localhost:6379

## 🐳 Container'lara Erişim

```bash
# Web container'a gir
docker exec -it ns_web sh

# API container'a gir
docker exec -it ns_api sh

# MongoDB'ye bağlan
docker exec -it ns_mongo mongosh

# Redis CLI
docker exec -it ns_redis redis-cli
```

## 🔄 Hot Reload

Development modda çalışırken, kod değişiklikleri otomatik olarak yansıtılır:
- Web ve API container'ları dosya değişikliklerini algılar
- Next.js hot reload özelliği aktiftir
- node_modules dizinleri container içinde kalır (performans için)

## 🚨 Sorun Giderme

### Container'lar başlamıyor
```bash
# Logları kontrol et
docker-compose logs

# Temizlik yap ve yeniden başlat
docker-compose down
docker system prune -a -f
docker-compose up -d
```

### Port çakışması
```bash
# .env dosyasından portları değiştir
WEB_PORT=3001
API_PORT=3002
```

### Build hataları
```bash
# Cache'i temizle
docker builder prune -a -f

# Yeniden build et
docker-compose build --no-cache
```

## 🔐 Production Deployment

```bash
# Production için .env.production oluştur
cp .env.example .env.production

# Güvenlik ayarlarını güncelle
# - JWT_SECRET
# - MONGO_USERNAME / MONGO_PASSWORD
# - REDIS_PASSWORD

# Production'ı başlat
docker-compose -f docker-compose.prod.yml up -d
```

## 📦 Cihaz Değişimi

Yeni bir cihaza geçerken:

1. Projeyi klonla
2. Docker Desktop'ı kur
3. `cd docker/scripts && dev.bat` çalıştır
4. Hazır! 🎉

Tüm bağımlılıklar ve yapılandırmalar Docker içinde olduğu için ekstra kurulum gerekmez.