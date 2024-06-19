# Loved One Router Documentation

The Loved One Router is responsible for handling the routes related to loved ones in the FamiliCare application.

## Table of Contents

- [Introduction](#introduction)
- [Routes](#routes)
- [Error Handling](#error-handling)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The Loved One Router is implemented using Express.js and is used to handle all the CRUD operations related to loved ones. It provides endpoints for creating, reading, updating, and deleting loved ones in the FamiliCare system. Authentication is required for accessing these routes, ensuring that only authenticated users can perform operations on loved ones.

## Routes

The following routes are available in the Loved One Router:

- `GET /api/loved-one/:id`: Retrieves a specific loved one by their ID. Requires user to be authenticated.
- `POST /api/loved-one`: Creates a new loved one. Requires user to be authenticated and includes validation for `first_name` and `last_name`.
- `PUT /api/loved-one/:id`: Updates an existing loved one. Requires user to be authenticated. Validates the ID and updates fields provided in the request body.
- `DELETE /api/loved-one/:id`: Deletes a loved one. Requires user to be authenticated and checks if the user has admin privileges.

## Error Handling

The Loved One Router handles various error scenarios and returns appropriate HTTP status codes and error messages. Some common error scenarios include:

- Invalid request parameters
- Missing required fields for POST and PUT requests
- Non-existent loved one ID
- Unauthorized access attempts
- Database connection errors
- Errors during transactional operations

## Usage

To use the Loved One Router, follow these steps:

1. Import the router module into your Express application:

```javascript
const lovedOneRouter = require('./routes/lovedOne.router');
```

2. Mount the router as middleware in your Express application:

```javascript
app.use('/api/loved-one', lovedOneRouter);
```

3. Ensure that your application includes authentication middleware to secure the routes.

4. Start your Express application and test the routes using a tool like Postman or cURL, ensuring you include authentication tokens as required.

## Contributing

Contributions to the Loved One Router are welcome. If you find any issues or have suggestions for improvements, please open an issue or submit a pull request on the GitHub repository.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
