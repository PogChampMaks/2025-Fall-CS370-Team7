# LostAndFound (backend prototype)

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
