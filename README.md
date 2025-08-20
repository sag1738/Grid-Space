# GridSpace Frontend

GridSpace is a web application built using Next.js (TypeScript) that allows users to book workplaces and manage memberships. This repository contains the frontend code for GridSpace.

## Repository Links
- **Frontend Code:** [GitHub - asl1n/GridSpace](https://github.com/asl1n/GridSpace.git)
- **Backend API:** [GitHub - asl1n/grid-space-api](https://github.com/asl1n/grid-space-api.git)

## Prerequisites

Before running this frontend, you need to set up the backend service.

### Backend Setup

1. Clone the backend repository:
   ```sh
   git clone https://github.com/asl1n/grid-space-api.git
   ```
2. Navigate to the backend folder:
   ```sh
   cd grid-space-api
   ```
3. Install Laravel dependencies:
   ```sh
   composer install
   ```
4. Create a `.env` file from the `.env.example` template:
   ```sh
   cp .env.example .env
   ```
5. Set up your database:
   - Open `.env` and update the `DB_DATABASE` value with your database name.
   - Create the database manually using MySQL or any preferred database tool.
6. Generate the application key:
   ```sh
   php artisan key:generate
   ```
7. Run migrations and seed the database:
   ```sh
   php artisan migrate --seed
   ```
8. Start the Laravel server:
   ```sh
   php artisan serve
   ```

Now the backend should be running at `http://127.0.0.1:8000`.

## Frontend Setup

1. Clone this repository:
   ```sh
   git clone https://github.com/asl1n/GridSpace.git
   ```
2. Navigate to the project folder:
   ```sh
   cd GridSpace
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Create an `.env` file and configure the API URL:
   ```sh
   cp .env.example .env
   ```
   Edit `.env` and set the backend API URL:
   ```sh
   NEXT_PUBLIC_API_URL=<your-backend-url>/api
   ```
   - If running locally, set `NEXT_PUBLIC_API_URL=http://localhost:8000/api`
   - For a deployed backend, replace it with the live backend URL.
5. Run the frontend:
   ```sh
   npm run dev
   ```

Now, you should be able to access the frontend at `http://localhost:3000` (or whatever port Next.js assigns).

## Additional Notes
- Ensure your backend is running before starting the frontend.
- If you face any issues, check the backend logs (`storage/logs/laravel.log`) or frontend console errors.
- For production, configure environment variables properly and build the frontend using:
  ```sh
  npm run build
  ```

