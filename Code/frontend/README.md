# Lost & Found Frontend

A React-based web application for the Lost & Found campus community platform.

## Features

- 🏠 **Home Page** - Overview of the platform
- 📋 **Browse Items** - View all lost and found items with filtering
- 📝 **Post Items** - Create new lost/found item listings (requires login)
- 👁️ **Item Details** - View full details of each item
- 🔐 **Authentication** - Login system with role-based access

## Tech Stack

- **React 18** - UI library
- **React Router** - Navigation and routing
- **Axios** - HTTP client for API calls
- **Bootstrap 5** - CSS framework
- **React Bootstrap** - React components for Bootstrap

## Getting Started

### Prerequisites

- Node.js 16+ and npm installed
- Backend Spring Boot API running on `http://localhost:8080`

### Installation

```bash
cd frontend
npm install
```

### Running the App

```bash
npm start
```

The app will open at `http://localhost:3000` and proxy API calls to `http://localhost:8080`

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navigation.js   # Top navigation bar
│   └── Navigation.css
├── pages/              # Page components
│   ├── Home.js        # Home/landing page
│   ├── ItemList.js    # Browse items page
│   ├── ItemDetail.js  # Item detail view
│   ├── Login.js       # Login page
│   └── PostItem.js    # Post new item form
├── App.js             # Main app component
├── App.css            # Global styles
└── index.js           # React entry point
public/
└── index.html         # HTML template
```

## API Integration

The frontend communicates with the backend REST API:

- **POST /api/auth/login** - User authentication
- **GET /api/items** - List all items
- **GET /api/items/:id** - Get single item
- **GET /api/items/status/:status** - Filter by LOST/FOUND
- **GET /api/items/user/:username** - Get user's items
- **POST /api/items** - Create new item (requires auth)
- **PUT /api/items/:id** - Update item (requires auth)
- **DELETE /api/items/:id** - Delete item (requires auth)

## Test Credentials

```
Admin:
  Username: admin
  Password: adminpass

User:
  Username: user
  Password: userpass
```

## Available Pages

| Route | Component | Auth Required | Description |
|-------|-----------|---------------|-------------|
| `/` | Home | No | Landing page with overview |
| `/items` | ItemList | No | Browse all items with filters |
| `/items/:id` | ItemDetail | No | View detailed item information |
| `/login` | Login | No | User authentication |
| `/post-item` | PostItem | Yes | Post a new lost/found item |

## Development Notes

- All API requests are sent with HTTP Basic Auth header
- Auth credentials are stored in localStorage
- The `proxy` setting in `package.json` forwards API requests to the backend

## Future Enhancements

- [ ] Image upload with file storage
- [ ] User profile page
- [ ] Search and advanced filtering
- [ ] Item claims and returns workflow
- [ ] Email/notification system
- [ ] PWA support for offline access
- [ ] Mobile app (React Native)

## Deployment

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm run build
# Then drag and drop the 'build' folder to Netlify
```

### As a Docker Container

Create a `Dockerfile` in the frontend directory:

```dockerfile
FROM node:16 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Troubleshooting

**CORS errors?**
- Ensure backend is running on port 8080
- Check that the `proxy` setting in `package.json` matches your backend URL

**Can't login?**
- Verify backend has test users created via DataLoader
- Check browser console for detailed error messages

**API calls failing?**
- Make sure the Spring Boot app is running
- Check network tab in browser DevTools
- Verify localhost:8080 is accessible

**PowerShell / npm issues**
- If you see an error like `npm.ps1 cannot be loaded because running scripts is disabled`, PowerShell's execution policy is preventing the npm script wrapper from running. Use one of these safe options:

  - Run npm using the Windows command wrapper (no policy change needed):

    ```powershell
    cd 'frontend'
    npm.cmd install
    npm.cmd start
    ```

  - Temporarily allow scripts for the current PowerShell session (session-only):

    ```powershell
    Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
    npm install
    npm start
    ```

  - Use the provided Windows batch file (calls cmd):

    ```powershell
    .\start-frontend.bat
    ```

  - Or use the included PowerShell wrapper which calls the `npm.cmd` executable and avoids execution policy issues:

    ```powershell
    # from project root
    .\frontend\start-frontend.ps1 -Install
    ```

  - To permanently allow locally-created scripts for your user (use cautiously):

    ```powershell
    Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned -Force
    ```

  - Check current policies:

    ```powershell
    Get-ExecutionPolicy -List
    ```

## License

MIT
