The "Smart-Office" Asset Manager

An enterprise-grade, containerized asset management system built with a micro-backend architecture using .NET 9, React (TypeScript), and Docker.

1. Run Guide

This project is designed for "Single Command Deployment". You do not need .NET, Node.js, or any database engines installed on your host machine—only Docker Desktop.

Execution

    Open a terminal in the project root directory.

    Run the following command:

docker-compose up --build

Wait for the terminal to show --> Database and Migrations are Ready!.

Accessing the Application

    Frontend UI: http://localhost:3000

    Backend API (Swagger): http://localhost:7061/swagger 

Testing the Requirements

    Identity: Navigate to the Register page and create a new user. The system uses PostgreSQL to persist identity data.

Authentication: Log in to receive a JWT token containing your UserID and Role claims.

Data Isolation: Assets are managed by a separate service using MongoDB, demonstrating full data isolation from the Auth service.

RBAC: Log in as an "Admin" to see the "Add Asset" functionality. This is hidden for "Member" roles.

2. Reflections & Technical Bottlenecks

During the containerization of this enterprise stack, two primary technical challenges were encountered and resolved:
A. Docker Startup Race Conditions (Database Readiness)

Issue: Upon running docker-compose up, the .NET Backend attempted to run Entity Framework migrations before the PostgreSQL container was fully initialized and ready to accept connections. This resulted in a "Connection Refused" exception and a crash of the API service.

Solution: Implemented a resilient migration strategy in Program.cs. Instead of a single migration attempt, I wrapped the logic in a retry loop with a 2-second delay. This ensures the application waits for its dependencies to reach a "Ready" state before executing DDL commands, ensuring consistent deployments regardless of hardware speed.
B. CORS Preflight Failures in Containerized Environments

Issue: The browser blocked requests from the React frontend (3000) to the API (7061) with a "Status code: null" error. This was caused by a protocol mismatch where the frontend was attempting to use https while the Linux-based Docker containers were running on standard http.

Solution: Synchronized the transport layer to standard HTTP for internal bridge networking. I explicitly configured a CORS policy in .NET 9 to whitelist the specific host origins and disabled the HttpsRedirection middleware for the development orchestration to ensure a seamless "handshake" between the client and server.

3. Tooling Disclosure

As permitted by the "Open Tool" policy, the following resources were used during development:

    Gemini (AI Assistant): Used for architecting the Docker Compose variable interpolation and debugging the .NET 9 internal networking logic.

    Official Documentation: Microsoft Learn (.NET 9 Container defaults) and Docker Documentation (Volume persistence).

    Nginx: Utilized as a high-performance production-grade reverse proxy to serve the React static assets.

