# Reminder
シンプルなリマインダーアプリケーション
## development
### editor
VSCode  
devcontainer で開発しています。
### in devcontainer
#### development
```bash
npm run dev
```
#### migration
```bash
npx prisma migrate dev
```
### generate prisma client 
in devcontainer
```bash
npx prisma generate
```
#### start prisma studio
```bash
npx prisma studio
```

### docker compose 
### build 
```bash
docker compose build
```
### start container
```bash
docker compose up -d
```