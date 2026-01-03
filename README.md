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

A. Learning the New Stack (MobX & MUI)

The assignment required using MobX and MUI 5, which were new to me.

    The Struggle: Switching from standard React state to MobX "Observables" was a new experience at first. I had to learn how to make the UI "react" to store changes without manual refreshes.

    The Fix: I set up a UserStore to hold the JWT. Now, as soon as you log in, MUI components (like the "Add Asset" button) automatically appear or disappear based on your role without any messy code.

B. First Time with JWT Security

This was my first time implementing a full JWT (JSON Web Token) handshake.

    The Struggle: Getting the Resource Service to trust a token created by the Auth Service was tricky. I had to make sure both services used the exact same "Secret Key" and validation logic.

    The Fix: I learned that JWTs are stateless. Once I got the signature validation right, the Resource Service could verify who a user was without even talking to the database.

C. Solving the "Docker Race"

When running docker-compose up, the API would often try to start before the database was actually up, causing a crash.

    The Fix: I wrote a retry loop in Program.cs. Now, the app waits and retries the connection until the DB is ready, making the startup process smooth.


3. Tooling Disclosure

As permitted by the "Open Tool" policy, the following resources were used during development:

    Gemini (AI Assistant): Used for architecting the Docker Compose variable interpolation and debugging the .NET 9 internal networking logic. Also used for code snippet examples and conceptual i needed advice for.

    Github Copilot (AI Auto Completions): Used suggestions made by the Github Copilot AI Assistant if the suggestion seemed fit

    Official Documentation: Microsoft Learn (.NET 9 Container defaults), Docker Documentation (Volume persistence) and MUI official documentation (Component use).


