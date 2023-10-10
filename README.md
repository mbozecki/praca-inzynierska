# Online Music Beat Store

## Overview

The Online Music Beat Store is a web application designed to provide music enthusiasts with a seamless shopping experience for music beats. It allows users to browse, search for, and purchase their favorite music beats. This project is developed using a combination of frontend and backend technologies, including HTML, CSS, JavaScript, TypeScript, Angular, Angular Material, Ngx PayPal, Java, Hibernate, Quarkus, Panache, Google Firebase, PostgreSQL, Docker, and REST APIs.
You can preview the look and mocks here https://www.figma.com/file/bV7dLflJjJRspPviHjwOQu/beatstore?type=design&node-id=194%3A1561&mode=design&t=p8ISOQIktVNGJl91-1
## Features

- Browse and search for music beats.
- Detailed product listings with beat previews.
- User authentication and registration.
- Shopping cart functionality.
- Secure payment processing using Ngx PayPal.
- Admin panel for managing products, users, and orders.

## Technologies Used

- **Frontend**:
  - HTML, CSS, JavaScript, TypeScript
  - Angular: The frontend of the application is built using the Angular framework.
  - Angular Material: Used for styling and UI components.
  - Ngx PayPal: Integration for secure payment processing.

- **Backend**:
  - Java: Backend services are developed in Java.
  - Hibernate: Object-relational mapping (ORM) for database interactions.
  - Quarkus: Used for building the backend services with high performance and scalability.
  - Panache: A Quarkus extension for simplifying data access.
  - Google Firebase: Authentication and cloud functions.
  - PostgreSQL: Database management system for storing product, user, and order data.
  - REST APIs: Used for communication between the frontend and backend.

- **Deployment**:
  - Docker: Containerization for easy deployment and scaling.

## Getting Started

Follow these steps to set up and run the project locally:

1.
Navigate to 'beatstore' folder and launch npm install, then ng serve.

2. 
Go to docker-compose.yaml and launch it by docker-compose pull, then docker-compose up -d

3.
Finally, go to beatstore-backend folder and launch 'mvn clean compile quarkus:dev'
The project will be available at localhost:4200

