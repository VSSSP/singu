 # 🍔 Restaurant Orders API

 This is a simple Order API built with Node.js, Express, and MongoDB. The application allows users to create, read, and update orders.

 ## ✨ Features
 - 🆕 Create a new order
 - 📄 Get all orders
 - 🔄 Update order status

 ## 🛠️ Technologies
 - Node.js
 - Express
 - MongoDB
 - Joi (for validation)
 - Jest (for testing)
 - Docker

 ## ⚙️ Setup

 1. Clone the repository
 ```bash
 git clone https:github.com/VSSSP/singu.git
 cd singu
 ```

 2. Install dependencies
 ```bash
 npm install
 ```

 3. Set up environment variables
 Create a `.env` file in the root directory and add the following environment variables:
 ```env
 MONGODB_URI=mongodb:localhost:27017/orderdb
 ```

 4. Start the application
 ```bash
 docker compose up --build
 ```

 5. Run tests
 ```bash
 npm test
 ```

 ## 🔌 API Endpoints

 ### 🆕 Create a new order
 - **URL**: `/api/orders`
 - **Method**: `POST`
 - **Body**:
   ```json
   {
     "items": ["Burger", "Fries", "Coke"]
   }
   ```
 - **Response**:
   ```json
   {
     "_id": "507f1f77bcf86cd799439011",
     "orderId": "ORD-1627576183721",
     "items": ["Burger", "Fries", "Coke"],
     "status": "PENDING",
     "__v": 0
   }
   ```

 ### 📄 Get all orders
 - **URL**: `/api/orders`
 - **Method**: `GET`
 - **Response**:
   ```json
   [
     {
       "_id": "507f1f77bcf86cd799439011",
       "orderId": "ORD-1627576183721",
       "items": ["Burger", "Fries", "Coke"],
       "status": "PENDING",
       "__v": 0
     }
   ]
   ```

 ### 🔄 Update order status
 - **URL**: `/api/orders/:orderId/status`
 - **Method**: `PUT`
 - **Body**:
   ```json
   {
     "status": "READY"
   }
   ```
 - **Response**:
   ```json
   {
     "_id": "507f1f77bcf86cd799439011",
     "orderId": "ORD-1627576183721",
     "items": ["Burger", "Fries", "Coke"],
     "status": "READY",
     "__v": 0
   }
   ```

 ## 🗂️ Project Structure

 ```plaintext
singu
├── src
│   ├── application
│   │   └── orderService.js
│   ├── domain
│   │   ├── models
│   │   │   └── order.js
│   │   ├── repositories
│   │       └── orderRepository.js
│   │   └── validators
│   │       └── orderValidator.js
│   ├── infrastructure
│   │   ├── controllers
│   │   │   └── orderController.js
│   │   ├── routes
│   │   │   └── orderRoutes.js
│   │   └── database
│   │       └── mongoose.js
│   └── index.js
├── tests
│   ├── order.test.js
├── .env
├── .env.example
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── package.json
└── README.md
 ```
