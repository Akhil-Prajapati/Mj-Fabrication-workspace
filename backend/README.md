# MJ Fabrication Backend

This is a Spring Boot 3.2.x backend for the MJ Fabrication GST Billing System.

## Tech Stack

- Java 17
- Spring Boot
- Spring Data JPA (Hibernate)
- PostgreSQL
- ModelMapper
- Maven

## How to Run

1. Configure your PostgreSQL database in `src/main/resources/application.properties`.
2. Build and run:
   ```bash
   mvn spring-boot:run
   ```

## Project Structure

- `entity/` - JPA entities matching your DB schema
- `repository/` - Spring Data JPA repositories
- `dto/` - Data Transfer Objects for API
- `service/` - Business logic
- `controller/` - REST API endpoints
- `exception/` - Custom/global exception handling
- `config/` - Configuration (ModelMapper, etc.)
- `enums/` - Enum types for roles, status, etc.

---

This project is ready for integration with your React frontend.
