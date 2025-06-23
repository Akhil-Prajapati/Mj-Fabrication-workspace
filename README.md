# MJ Fabrication Workspace

## Project Structure

- `backend/` — Spring Boot backend (Java 17+, Maven)
- `frontend/` — React + Vite frontend (TypeScript)

---

## Backend Setup (Local)

1. **Java 17+ and Maven required**
2. Copy or set up your database (PostgreSQL recommended)
3. Configure DB connection in `backend/src/main/resources/application-dev.properties`
4. Run:
   ```bash
   cd backend
   mvn clean package
   mvn spring-boot:run
   ```
5. The backend will start on the port set in `application.properties` or `application-dev.properties`

### Profiles

- `application-dev.properties` for development
- `application-prod.properties` for production
- Set active profile in `application.properties` or with `SPRING_PROFILES_ACTIVE=dev|prod`

---

## Frontend Setup (Local)

1. **Node.js 18+ recommended**
2. Install dependencies:
   ```bash
   cd frontend
   npm install
   # or
   bun install
   ```
3. Start dev server:
   ```bash
   npm run dev
   # or
   bun run dev
   ```
4. The frontend will start on the port set in Vite config (default: 5173)

---

## Git & Collaboration

- `.gitignore` is set up for Java, Node, and IDE files
- Commit all code to your own branch before merging to main/master
- Use pull requests for code review
- Never commit secrets or passwords

---

## Deployment Notes

- Use `application-prod.properties` for production
- Set environment variables for secrets in production
- Build frontend with `npm run build` or `bun run build` and serve with a static server or deploy to Vercel/Netlify

---

## Troubleshooting

- If tables are not generated, check `spring.jpa.hibernate.ddl-auto` and DB connection
- For port conflicts, change `server.port` in the relevant properties file
- For CORS issues, update allowed origins in properties

---

## Banner

- Edit `backend/src/main/resources/banner.txt` for custom backend startup banner

---

## Contact

- For questions, contact the project maintainer or check the code comments for guidance.
