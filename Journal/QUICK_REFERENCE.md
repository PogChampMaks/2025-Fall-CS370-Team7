# Quick Reference Guide

## Starting the App (Every Time)

### Fastest Start (Windows)
```powershell
cd Code
.\start-all.ps1
```

Alternative launcher:
```bat
Code\start-all.bat
```

Optional flags:
- `-SkipInstall` skips `npm install` check
- `-DryRun` prints commands without launching terminals

### Prerequisites (one-time setup)
- Java 17+
- Node.js 18+ (includes npm)

Maven is not required globally for this project because it uses Maven Wrapper.

### Quick Manual Start (any OS)
Backend:
```bash
cd Code
# macOS/Linux:
./mvnw spring-boot:run

# Windows PowerShell:
.\mvnw.cmd spring-boot:run
```

Frontend:
```bash
cd Code/frontend
npm install  # (only first time)
npm start
```

### Stop the App
```powershell
Get-Process -Name java -ErrorAction SilentlyContinue | Stop-Process -Force
# Frontend: Ctrl+C in its terminal
```

### Startup Troubleshooting
- If backend command fails, run `.\mvnw.cmd -v` from `Code` and confirm Java is installed.
- If frontend fails, run `npm -v` and `node -v` from `Code/frontend`.
- If ports are busy, close old terminals and retry.

Then open browser to:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8080
- **Backend Home/Docs:** http://localhost:8080/
- **Database Console:** http://localhost:8080/h2-console

## Login Credentials

| Account | Username | Password |
|---------|----------|----------|
| Admin | admin | adminpass |
| User | user | userpass |

## Features to Test

1. **View Home Page** - http://localhost:3000
2. **Browse Items** - Click "Browse Items" button
3. **Filter Items** - Use LOST/FOUND filter buttons
4. **View Details** - Click any item card
5. **Login** - Click "Login" or "Post Item"
6. **Post Item** - Fill form and submit (requires login)
7. **Upload Image** - Select image when posting item
8. **Contact Owner** - Click "Contact Owner" on item detail page
9. **Send Messages** - Write and send messages about items
10. **View Messages** - Click "Messages" in navbar to see conversations
11. **Mark as Claimed** - Item owners can mark items as claimed/returned
12. **See Posted Item** - Item appears in list with claimed status if applicable

## Frontend Pages

| URL | Page | What It Does |
|-----|------|-------------|
| `/` | Home | Overview and instructions |
| `/items` | Browse | See all lost/found items |
| `/items/1` | Detail | See full item details, contact owner, claim item |
| `/login` | Login | Authenticate user |
| `/post-item` | Post | Create new item with image upload (auth required) |
| `/messages` | Messages | View and send messages about items (auth required) |

## Backend API Endpoints (for testing)

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
POST http://localhost:8080/api/items/upload-image
PUT http://localhost:8080/api/items/1
PUT http://localhost:8080/api/items/1/claim
PUT http://localhost:8080/api/items/1/unclaim
DELETE http://localhost:8080/api/items/1

POST http://localhost:8080/api/messages
GET http://localhost:8080/api/messages/received
GET http://localhost:8080/api/messages/sent
GET http://localhost:8080/api/messages/item/1
GET http://localhost:8080/api/messages/unread
GET http://localhost:8080/api/messages/unread/count
PUT http://localhost:8080/api/messages/1/read
```

## Common Tasks

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
   - Image: Upload photo (optional)
4. Click "Post Item"

### Contact an Item Owner
1. Go to item detail page
2. Login if not already logged in
3. Click "Contact Owner" button
4. Write your message
5. Click "Send Message"

### Mark Item as Claimed
1. Login as the item owner
2. Go to your item's detail page
3. Click "Mark as Claimed/Returned"
4. Item now shows claimed status

### View Your Messages
1. Click "Messages" in navbar (must be logged in)
2. Select a conversation from the list
3. Read and reply to messages
4. Messages are grouped by item

### View Posted Item
1. Go to `/items`
2. Click item card
3. See all details including poster contact

### Stop Running Processes
```powershell
Get-Process -Name java | Stop-Process -Force  # Stop backend
# Frontend (Ctrl+C in terminal)
```

## File Locations

**Backend Files:**
- Main App: `Code/src/main/java/com/example/lostandfound/LostAndFoundApplication.java`
- Models: `Code/src/main/java/com/example/lostandfound/model/`
- API: `Code/src/main/java/com/example/lostandfound/controller/`
- Config: `Code/src/main/java/com/example/lostandfound/config/`

**Frontend Files:**
- Main App: `Code/frontend/src/App.js`
- Pages: `Code/frontend/src/pages/`
- Components: `Code/frontend/src/components/`
- Styles: `Code/frontend/src/App.css`

## Debugging

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

This is a **complete full-stack application** showing:
- Spring Boot REST API design
- React SPA development
- HTTP authentication
- Database design with JPA entities
- Component-based architecture
- Frontend-backend integration
- File upload and storage
- Messaging system with real-time communication
- Trust-based claim/return workflow
- State management and user sessions

All code is clean, documented, and follows best practices!

---

