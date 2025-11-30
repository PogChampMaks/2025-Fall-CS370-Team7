# Lost & Found - Full Stack Campus Application

A complete web application for helping your campus community find and return lost items.

## 📋 Project Overview

**Backend:** Spring Boot 3.1.5 REST API with H2 Database  
**Frontend:** React 18 with React Router  
**Authentication:** HTTP Basic Auth  
**Database:** H2 (in-memory, perfect for development)

## 🎯 Features

### Backend (Spring Boot REST API)
- ✅ User authentication with HTTP Basic Auth
- ✅ Full CRUD operations for lost/found items
- ✅ Item filtering by status (LOST/FOUND)
- ✅ Search by creator/user
- ✅ Role-based access control (Admin/User)
- ✅ H2 in-memory database with auto-schema generation

### Frontend (React SPA)
- ✅ Clean, responsive UI with navigation
- ✅ Item listing with filters
- ✅ Detailed item view
- ✅ Post new items form (authenticated)
- ✅ Login/logout with test credentials
- ✅ Home page with API documentation

## LostAndFound (backend prototype)

This is a small Spring Boot backend prototype for the Lost & Found app. It includes a simple username/password authentication system, an H2 embedded database, and two temporary accounts created at startup.

Temporary credentials (created automatically at startup):

- Admin: username=`admin`, password=`adminpass` (ROLE_ADMIN)
- User:  username=`user`, password=`userpass`  (ROLE_USER)

How to run

1. Make sure you have Java installed (JDK 17+). JDK was installed earlier in this environment.
2. From the project root run:

```powershell
mvn spring-boot:run
```

3. Access the H2 console at http://localhost:8080/h2-console (JDBC URL: `jdbc:h2:mem:lostfound`, user `sa`, no password)

4. Login endpoint: POST to `http://localhost:8080/api/auth/login` with JSON body:

```json
{ "username": "admin", "password": "adminpass" }
```

On success it returns basic user info and role.

## 🚀 Quick Start (2 minutes)

### Prerequisites
- Java JDK 21+ (already installed)
- Maven 3.9.4+ (already installed)
- Node.js 16+ (needs to be installed from nodejs.org)
- npm (comes with Node.js)

### Step 1: Start Backend
```bash
cd C:\Users\devin\OneDrive\Desktop\CS370LostAndFound
C:\Users\devin\apache-maven-3.9.4\bin\mvn spring-boot:run
```
- Backend runs on http://localhost:8080

### Step 2: Start Frontend (New Terminal)
```bash
cd C:\Users\devin\OneDrive\Desktop\CS370LostAndFound\frontend
npm install
npm start
```
- Frontend opens at http://localhost:3000

## 🔐 Test Credentials

```
Admin:
  Username: admin
  Password: adminpass
  Role: ROLE_ADMIN

User:
  Username: user
  Password: userpass
  Role: ROLE_USER
```

## 📱 Using the App

1. **Homepage** - Visit http://localhost:3000
2. **Browse Items** - Click "Browse Items" to see all lost/found items
3. **Filter** - Use LOST/FOUND buttons to filter items
4. **View Details** - Click any item to see full information
5. **Post Item** - Click "Post Item" (login required)
6. **Login** - Use test credentials above

## 🛠️ Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Backend** | Spring Boot | 3.1.5 |
| **Web Framework** | Spring Web MVC | 3.1.5 |
| **Security** | Spring Security | 6.1.5 |
| **Database** | H2 Database | 2.1.214 |
| **ORM** | Hibernate JPA | 6.2.13 |
| **Frontend** | React | 18.2.0 |
| **Routing** | React Router | 6.16.0 |
| **HTTP Client** | Axios | 1.5.0 |
| **CSS Framework** | Bootstrap | 5.3.2 |

## 📂 Project Structure

```
CS370LostAndFound/
├── src/main/java/com/example/lostandfound/
│   ├── model/              # Entity models
│   │   ├── User.java
│   │   ├── Item.java
│   │   └── ItemStatus.java
│   ├── repository/         # Data access layer
│   │   ├── UserRepository.java
│   │   └── ItemRepository.java
│   ├── service/            # Business logic
│   │   ├── UserService.java
│   │   └── ItemService.java
│   ├── controller/         # REST API endpoints
│   │   ├── AuthController.java
│   │   ├── ItemController.java
│   │   └── HomeController.java
│   ├── config/             # Configuration
│   │   ├── SecurityConfig.java
│   │   └── DataLoader.java
│   └── LostAndFoundApplication.java
├── frontend/               # React application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── pom.xml                 # Maven build config
└── README.md
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/login` - Login with username/password
- `GET /api/auth/me` - Get current user info

### Items (Public)
- `GET /api/items` - List all items
- `GET /api/items/{id}` - Get item by ID
- `GET /api/items/status/{status}` - Filter by LOST/FOUND
- `GET /api/items/user/{username}` - Get user's items

### Items (Protected - Requires Login)
- `POST /api/items` - Create new item
- `PUT /api/items/{id}` - Update item
- `DELETE /api/items/{id}` - Delete item

### Utilities
- `GET /` - Home page with documentation
- `GET /h2-console` - Database console (development only)

## 💻 Development

### Edit Backend Code
```bash
# Edit Java files in src/main/java/
# Restart mvn spring-boot:run to see changes
```

### Edit Frontend Code
```bash
# Edit files in frontend/src/
# Changes hot-reload automatically in browser
# No restart needed!
```

### Test API with PowerShell
```powershell
# Login
$loginBody = @{username="admin"; password="adminpass"} | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:8080/api/auth/login" -Method Post -Body $loginBody -ContentType "application/json"

# Get all items
Invoke-RestMethod -Uri "http://localhost:8080/api/items" -Method Get | ConvertTo-Json

# Create item (with auth)
$auth = [System.Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes("admin:adminpass"))
$item = @{title="Found Keys"; description="..."; status="FOUND"; location="Library"; date="2025-11-10"; contactInfo="admin@example.com"; imageRef=""} | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:8080/api/items" -Method Post -Body $item -ContentType "application/json" -Headers @{Authorization="Basic $auth"}
```

## 🐛 Troubleshooting

**Frontend won't start?**
```bash
cd frontend
rm -r node_modules package-lock.json
npm install
npm start
```

**Backend won't start (port in use)?**
```powershell
Get-Process -Name java | Stop-Process -Force
# Then restart with mvn spring-boot:run
```

**Can't connect backend and frontend?**
- Ensure backend is running on http://localhost:8080
- Ensure frontend is running on http://localhost:3000
- Check browser console (F12) for errors

**Login fails?**
- Verify backend is running on port 8080
- Try test credentials: `user:userpass`
- Check backend console for error messages

## 📝 Testing the Application

### Manual Testing Workflow

1. **Login**
   - Go to `http://localhost:3000/login`
   - Use `user:userpass`
   - Should redirect to `/post-item`

2. **Post an Item**
   - Fill in form with item details
   - Click "Post Item"
   - Should see confirmation

3. **Browse Items**
   - Go to `/items`
   - Filter by LOST/FOUND
   - Click item to view details

4. **View Details**
   - Click any item card
   - See full description and contact info

## 🚀 Deployment

### Local Testing
Your app is already running locally! Share `http://localhost:3000` with classmates.

### Deploy Backend to Cloud
```bash
# Package as executable JAR
mvn clean package

# Deploy to Heroku, AWS, or Google Cloud
# See documentation for each service
```

### Deploy Frontend
```bash
# Build optimized version
cd frontend
npm run build

# Deploy build folder to:
# - Vercel (easiest)
# - Netlify
# - GitHub Pages
# - AWS S3 + CloudFront
```

## 📚 Next Steps (Optional Enhancements)

- [ ] Add image upload for items
- [ ] Implement item claims/returns workflow
- [ ] Add email notifications
- [ ] Write unit/integration tests
- [ ] Add search functionality
- [ ] Deploy to production (Heroku, AWS, etc.)
- [ ] Add user profiles
- [ ] Add review/rating system

## 🔒 Security Notes

- ✅ Passwords are BCrypt hashed
- ✅ HTTP Basic Auth for API requests
- ✅ CSRF protection disabled (development mode)
- ✅ H2 console open for development only
- ⚠️ For production: Use HTTPS, secure password storage, implement OAuth2

## 📖 Further Reading

- [Spring Boot Docs](https://spring.io/projects/spring-boot)
- [React Docs](https://react.dev)
- [React Router Docs](https://reactrouter.com)
- [Bootstrap Docs](https://getbootstrap.com/docs/5.3/)
- [Axios Docs](https://axios-http.com/docs)

## ❓ Questions?

Refer to:
- Frontend README: See `Code/frontend/README.md`
- API Documentation: Visit `http://localhost:8080/` (home page)

## 🎓 For the Instructor

This project demonstrates:
1. **Backend Development** - Spring Boot REST API with authentication
2. **Database Design** - JPA entities with relationships
3. **Frontend Development** - React with routing and state
4. **Full-Stack Integration** - Frontend consuming APIs
5. **Software Engineering** - Layered architecture
