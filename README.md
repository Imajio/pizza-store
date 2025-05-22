# Pizza Store MVP

Pizza Store MVP is a web application for ordering pizzas, built with a **React** frontend (TypeScript, Vite, Tailwind CSS) and a **Spring Boot** backend (Java, PostgreSQL). It features a menu, cart, user authentication, payment processing with Stripe, and internationalization (English, Polish, German).

## Tech Stack
- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, react-router-dom, axios, react-i18next, react-slick, animate.css
- **Backend**: Spring Boot, Spring Data JPA, PostgreSQL
- **Payment**: Stripe
- **Database**: PostgreSQL

## Prerequisites
- **Node.js** (v16 or higher)
- **npm** (v8 or higher)
- **Java** (JDK 17)
- **Maven** (3.8.x)
- **PostgreSQL** (v14 or higher)
- **Stripe Account** (for payment integration)

## Project Structure

pizza-store/
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/    # React components (PizzaCard, Menu, Cart, etc.)
│   │   ├── index.tsx      # Entry point
│   │   ├── App.tsx        # Main app component
│   │   ├── index.css      # Tailwind CSS
│   │   ├── i18n.ts        # i18next configuration
│   ├── public/
│   │   ├── output.css     # Compiled Tailwind CSS
│   │   ├── images/        # Static images (logo.png, hero-bg.jpg, etc.)
│   │   ├── locales/       # Translation files (en, pl, de)
│   ├── index.html         # HTML entry point
│   ├── vite.config.ts     # Vite configuration
│   ├── tailwind.config.js # Tailwind configuration
│   ├── tsconfig.json      # TypeScript configuration
│   ├── package.json
├── backend/               # Spring Boot backend
│   ├── src/main/java/     # Java source code
│   │   ├── com/pizzastore/
│   │   │   ├── config/    # Security and CORS config
│   │   │   ├── controller/# API controllers
│   │   │   ├── model/     # Entity models
│   │   │   ├── repository/# JPA repositories
│   │   │   ├── service/   # Business logic
│   ├── src/main/resources/
│   │   ├── application.properties # Spring Boot configuration
│   ├── pom.xml            # Maven configuration
├── README.md

## Installation

### 1. Clone the Repository
```bash
git clone 
cd pizza-store
```

### 2. Set Up PostgreSQL
#### 1. Install PostgreSQL and create a database:
```bash
psql -U postgres
CREATE DATABASE pizzastore;
```

#### 2. Update backend/src/main/resources/application.properties:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/pizzastore
spring.datasource.username=admin
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

### 3. Set Up Backend
#### Navigate to the backend directory, install dependencies and run:
```bash
cd backend
mvn clean install
mvn spring-boot:run
```
#### The backend will run on **http://localhost:8080**.

### 4. Set Up Frontend
#### Navigate to the frontend directory:
```bash
cd frontend
```
#### Install dependencies:
```bash
npm install
```
#### Generate Tailwind CSS:
```bash
npx tailwindcss -i ./src/index.css -o ./public/output.css
```
#### Run the development server:
```bash
npm start
```
#### The frontend will run on http://localhost:5173.

### 5. Configure Stripe
#### Get your Stripe public key from Stripe Dashboard.
#### Update frontend/src/App.tsx with your key:
```tsx
const stripePromise = loadStripe('pk_test_your_stripe_key');
```
