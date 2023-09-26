# Reminder
シンプルなリマインダーアプリケーション
## development
### editor
VSCode  
devcontainer で開発しています。

### build docker compose
```bash
docker compose build
```

### start container
```bash
docker compose up -d
```

### migration
in devcontainer
```bash
npx prisma migrate dev
```
### generate prisma client
in devcontainer
```bash
npx prisma generate
```

### prisma studio
after `docker compose up`
```bash
docker compsoe exec app npx prisma studio
```
