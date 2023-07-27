# Lo Encontre - Product Search Engine

Lo Encontre is a powerful product search engine designed to help users find the best prices for various products from multiple websites. The application reduces search time by up to 70% through efficient caching, indexing, and sharding techniques, ensuring that customers can make cost-effective purchasing decisions easily. Lo Encontre is built using React, Node.js, Express, MongoDB, Cypress, and Jest, and it is deployed on Heroku for easy access.

## Technologies Used

- React: Frontend library used to build the user interface and manage the application's state.
- Node.js: JavaScript runtime used on the server-side to build the backend.
- Express: Web framework for Node.js used to handle HTTP requests and responses.
- MongoDB: NoSQL database used to store product data and support efficient querying.
- Cypress: End-to-end testing framework used to ensure the application's functionality.
- Jest: Testing framework used for unit testing the React components.
- Web Scraping: Techniques used to gather product data from various websites.

## Installation and Setup

1. Clone the repository to your local machine.

2. Install dependencies for the frontend and backend:
   ```
   cd frontend
   npm install

   cd ../backend
   npm install
   ```

3. Set up MongoDB on your local machine or use a cloud-based MongoDB service.

4. Configure the MongoDB connection in the backend by updating the `.env` file with your MongoDB URI.

5. Run the backend server and frontend development server:
   ```
   cd frontend
   npm start

   cd ../backend
   npm start
   ```

6. Access the application by visiting `http://localhost:3000` in your web browser.

## Features

- Search for Products: Users can search for products using keywords or specific criteria.
- Product Comparison: The application fetches product data from multiple websites and displays them for easy comparison.
- Caching: Efficient caching techniques are implemented to minimize redundant web scraping and improve response times.
- Indexing: Indexing is used to optimize product data retrieval and enable fast search queries.
- Sharding: Sharding is implemented to distribute data across multiple databases, ensuring scalability and improved performance.
- Testing: The application is thoroughly tested using Cypress for end-to-end testing and Jest for unit testing.

## Deployment

The application is deployed on Heroku for easy access. You can access the live version of Lo Encontre at [https://lo-encontre.herokuapp.com/](https://lo-encontre.herokuapp.com/).

Feel free to explore the power of Lo Encontre and make cost-effective purchasing decisions with ease! 🛍️
