# Lost & Found - Full Stack Application

A complete web application for helping your campus community find and return lost items.

## 📋 Project Overview

**Backend:** Spring Boot 3.1.5 REST API with H2 Database  
**Frontend:** React 18 with React Router  
**Authentication:** HTTP Basic Auth  
**Database:** H2 (in-memory, perfect for development)

## 🚀 Quick Start

### Step 1: Ensure Backend is Running

```bash
cd c:\Users\devin\OneDrive\Desktop\CS370LostAndFound
C:\Users\devin\apache-maven-3.9.4\bin\mvn spring-boot:run
```

Backend will start on `http://localhost:8080`

### Step 2: Start Frontend

Open a **new terminal** and:

```bash
cd c:\Users\devin\OneDrive\Desktop\CS370LostAndFound\frontend
npm install
npm start
```

Frontend will open at `http://localhost:3000`

## 📁 Project Structure

```
CS370LostAndFound/
├── src/
│   ├── main/java/com/example/lostandfound/
│   │   ├── LostAndFoundApplication.java       # Main Spring Boot entry point
│   │   ├── model/
│   │   │   ├── Item.java                      # Item entity
│   │   │   ├── ItemStatus.java                # LOST/FOUND enum
│   │   │   └── User.java                      # User entity
│   │   ├── repository/
│   │   │   ├── ItemRepository.java            # Item database queries
│   │   │   └── UserRepository.java            # User database queries
│   │   ├── service/
│   │   │   ├── ItemService.java               # Item business logic
│   │   │   └── UserService.java               # User authentication
│   │   ├── controller/
│   │   │   ├── ItemController.java            # Item REST endpoints
│   │   │   ├── AuthController.java            # Authentication endpoints
│   │   │   └── HomeController.java            # Home page
│   │   └── config/
│   │       ├── SecurityConfig.java            # Spring Security setup
│   │       └── DataLoader.java                # Seed test data
│   └── resources/
│       └── application.properties             # App configuration
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navigation.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── ItemList.js
│   │   │   ├── ItemDetail.js
│   │   │   ├── Login.js
│   │   │   └── PostItem.js
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   │   └── index.html
│   └── package.json
├── pom.xml                                    # Maven build configuration
└── README.md
```

## 🔑 Test Credentials

Use these to login and test the app:

```
Admin Account:
  Username: admin
  Password: adminpass
  Role: ROLE_ADMIN

User Account:
  Username: user
  Password: userpass
  Role: ROLE_USER
```

## 🌐 Available Endpoints

### Frontend Pages

| Route | Description | Auth Required |
|-------|-------------|---------------|
| `/` | Home/Landing page | No |
| `/items` | Browse all items with filters | No |
| `/items/:id` | View item details | No |
| `/login` | User login | No |
| `/post-item` | Post new item | Yes |

### Backend API

**Authentication:**
- `POST /api/auth/login` - Login with credentials
- `GET /api/auth/me` - Get current user info

**Items:**
- `GET /api/items` - List all items
- `GET /api/items/:id` - Get single item
- `GET /api/items/status/{status}` - Filter by LOST/FOUND
- `GET /api/items/user/{username}` - Get user's items
- `POST /api/items` - Create new item (requires auth)
- `PUT /api/items/:id` - Update item (requires auth)
- `DELETE /api/items/:id` - Delete item (requires auth)

**Utilities:**
- `GET /` - Home page with API documentation
- `GET /h2-console` - H2 database console (for debugging)

## 🛠️ Development Workflow

### Adding a Feature

1. **Backend:** Add endpoints/logic in Spring Boot
   ```bash
   # Edit relevant files in src/main/java
   # Compile and test
   mvn -DskipTests clean compile
   ```

2. **Frontend:** Create React components
   ```bash
   # Edit/create files in frontend/src
   # Changes hot-reload in browser
   ```

3. **Test:** Use PowerShell to test APIs
   ```powershell
   $cred = [System.Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes("user:pass"))
   Invoke-RestMethod -Uri "http://localhost:8080/api/items" -Method Get -Headers @{Authorization="Basic $cred"}
   ```

### Debugging

**Backend Issues:**
- Check Spring Boot console output for error messages
- Visit `http://localhost:8080/h2-console` to inspect database
- Add `@Bean` loggers in Spring classes

**Frontend Issues:**
- Check browser console (F12) for JavaScript errors
- Check Network tab to see API calls
- Ensure backend is running on port 8080

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

## 📚 Key Technologies

**Backend:**
- Spring Boot 3.1.5
- Spring Data JPA + Hibernate
- Spring Security (HTTP Basic Auth)
- H2 Database
- Maven

**Frontend:**
- React 18
- React Router v6
- Axios (HTTP client)
- Bootstrap 5
- CSS Flexbox/Grid

## 🔒 Security Notes

- ✅ Passwords are BCrypt hashed
- ✅ HTTP Basic Auth for API requests
- ✅ CSRF protection disabled (development mode)
- ✅ H2 console open for development only
- ⚠️ For production: Use HTTPS, secure password storage, implement OAuth2

## 🐛 Troubleshooting

**Port already in use?**
```bash
# Find process on port 8080
Get-Process -Id (Get-NetTCPConnection -LocalPort 8080).OwningProcess

# Kill it
Stop-Process -Id [PID] -Force
```

**npm module not found?**
```bash
cd frontend
rm -r node_modules
npm install
npm start
```

**CORS errors?**
- Backend is configured to accept requests from `localhost:3000`
- Check `package.json` proxy setting

**Can't reach localhost?**
- Windows Firewall may be blocking
- Try adding Java/Maven to firewall exceptions

## 📖 Further Reading

- [Spring Boot Docs](https://spring.io/projects/spring-boot)
- [React Docs](https://react.dev)
- [React Router Docs](https://reactrouter.com)
- [Bootstrap Docs](https://getbootstrap.com/docs/5.3/)
- [Axios Docs](https://axios-http.com/docs)

## 📝 Assignment Checklist

- [x] Tech stack decided (Spring Boot + React)
- [x] Backend project scaffold created
- [x] Database models (User, Item) implemented
- [x] REST API endpoints built
- [x] Authentication system added
- [x] Home page with navigation
- [x] Frontend created with React
- [ ] Unit/Integration tests
- [ ] Claim/return workflow (optional)
- [ ] Image upload (optional)
- [ ] Production deployment (optional)

## ❓ Questions?

Refer to:
- Backend README: See `src/main/resources/README.md`
- Frontend README: See `frontend/README.md`
- API Documentation: Visit `http://localhost:8080/` (home page)

---

**Happy coding! 🎓**
