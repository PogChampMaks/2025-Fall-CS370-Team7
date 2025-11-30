# Quick Reference Guide

## 🚀 Starting the App (Every Time)

### Terminal 1: Backend
```bash
cd C:\Users\devin\OneDrive\Desktop\CS370LostAndFound
C:\Users\devin\apache-maven-3.9.4\bin\mvn spring-boot:run
```

### Terminal 2: Frontend  
```bash
cd C:\Users\devin\OneDrive\Desktop\CS370LostAndFound\frontend
npm install  # (only first time)
npm start
```

Then open browser to:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8080
- **Backend Home/Docs:** http://localhost:8080/
- **Database Console:** http://localhost:8080/h2-console

## 🔐 Login Credentials

| Account | Username | Password |
|---------|----------|----------|
| Admin | admin | adminpass |
| User | user | userpass |

## 📋 Features to Test

1. **View Home Page** - http://localhost:3000
2. **Browse Items** - Click "Browse Items" button
3. **Filter Items** - Use LOST/FOUND filter buttons
4. **View Details** - Click any item card
5. **Login** - Click "Login" or "Post Item"
6. **Post Item** - Fill form and submit (requires login)
7. **See Posted Item** - Item appears in list

## 🔗 Frontend Pages

| URL | Page | What It Does |
|-----|------|-------------|
| `/` | Home | Overview and instructions |
| `/items` | Browse | See all lost/found items |
| `/items/1` | Detail | See full item details |
| `/login` | Login | Authenticate user |
| `/post-item` | Post | Create new item (auth required) |

## 🔌 Backend API Endpoints (for testing)

### Public Endpoints (No Login)
```
GET http://localhost:8080/api/items
GET http://localhost:8080/api/items/1
GET http://localhost:8080/api/items/status/LOST
GET http://localhost:8080/api/items/user/admin
```

### Protected Endpoints (Need Authorization Header)
```
POST http://localhost:8080/api/items
PUT http://localhost:8080/api/items/1
DELETE http://localhost:8080/api/items/1
```

## 💡 Common Tasks

### Post a New Item via Frontend
1. Click "Post Item" in navbar
2. Login with `user:userpass`
3. Fill form:
   - Title: "Found Wallet"
   - Description: "Brown leather wallet"
   - Status: FOUND
   - Location: "Student Center"
   - Date: Pick date
   - Contact: "user@example.com"
4. Click "Post Item"

### View Posted Item
1. Go to `/items`
2. Click item card
3. See all details including poster contact

### Stop Running Processes
```powershell
Get-Process -Name java | Stop-Process -Force  # Stop backend
# Frontend (Ctrl+C in terminal)
```

## 📝 File Locations

**Backend Files:**
- Main App: `src/main/java/com/example/lostandfound/LostAndFoundApplication.java`
- Models: `src/main/java/com/example/lostandfound/model/`
- API: `src/main/java/com/example/lostandfound/controller/`
- Config: `src/main/java/com/example/lostandfound/config/`

**Frontend Files:**
- Main App: `frontend/src/App.js`
- Pages: `frontend/src/pages/`
- Components: `frontend/src/components/`
- Styles: `frontend/src/App.css`

## 🐛 Debugging

**Backend not responding?**
- Check terminal for errors
- Ensure running on port 8080
- Try: `Get-Process -Name java | Stop-Process -Force`

**Frontend not loading?**
- Check browser console (F12)
- Ensure npm start finished
- Try: `Ctrl+C` then `npm start` again

**Login not working?**
- Verify backend is running
- Try test credentials exactly: `user` / `userpass`
- Check browser Network tab

**Can't see posted items?**
- Refresh browser (F5)
- Check if logged in user created it
- Try going to `/items?status=FOUND`
