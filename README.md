# Title
Personal Finance Visualizer

## Objective
# Personal Finance Visualizer - Stage 1

A simple personal finance tracker built using Next.js, React, shadcn/ui, Recharts, and MongoDB.

## Demo

Link: https://personal-finance-visualizer-stage-1-psi.vercel.app/dashboard

## Tech Stack
Next.js, React, shadcn, Recharts, MongoDB Atlas, 

### Functionality
## Features

- Add, edit, and delete transactions
- View transaction list
- Monthly expenses visualized via bar chart
- Form validation with React Hook Form and Zod
  
## Setup Instructions
1) Create Project Directory: Create a new directory for your project using the command line: mkdir personal-finance-visualizer && cd personal-finance-visualizer
   
2) Initialize Next.js Project: Initialize a Next.js project using npx create-next-app@latest .

3) Install Dependencies: Install necessary dependencies using npm install @radix-ui/react-slot recharts mongoose zod react-hook-form tailwind-merge class-variance-authority and npm install -D prettier-plugin-tailwindcss.

4) Configure shadcn: Initialize shadcn by running npx shadcn-ui@latest init. Follow the prompts to configure your project with the desired styling and components.

5) Set up MongoDB: Ensure you have cloud-based MongoDB service like MongoDB Atlas. Obtain the connection string for your MongoDB database. Create a .env.local file in your project root and add MONGODB_URI=<your_mongodb_connection_string>.

6) push the code to Git using the following commands

* git init
* git remote add origin https://github.com/Haripriya866/personal-finance-visualizer-stage-1.git
* git add -A
* git commit -m "personal-finance-visualizer stage 1"
* git branch -M main
* git push -u origin main

7) npm run dev 
   
8) Define Transaction Schema (MongoDB): Create a models directory and within it, create a transaction.js file. Define a Mongoose schema for transactions with fields like amount (Number), date (Date), and description (String). Use Zod to ensure type safety and validation.
 
9)  Create API Routes (Next.js): In the app/api directory, create API routes for:
POST /api/transactions: To create a new transaction.
GET /api/transactions: To retrieve all transactions.
PUT /api/transactions/[id]: To update an existing transaction.
DELETE /api/transactions/[id]: To delete a transaction.
Use the Mongoose model to interact with MongoDB in these API routes. Handle errors gracefully.

10) Develop Transaction Form (React): Create a React component for adding/editing transactions. This form should include fields for amount, date, and description. Use React Hook Form and Zod for form validation and state management.

11) Develop Transaction List View (React): Create a React component to display a list of transactions. Fetch transaction data from the GET /api/transactions endpoint and render it in a table or list format. Implement the delete functionality, using the DELETE api call.

12) Develop Transaction List View (React): Create a React component to display a list of transactions. Fetch transaction data from the GET /api/transactions endpoint and render it in a table or list format. Implement the delete functionality, using the DELETE api call.

13) Implement Basic Form Validation: Ensure that all form fields (amount, date, description) have appropriate validation.


## Resources
## Design files
dashboard/page.jsx


    