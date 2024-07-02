
# FamliCare

FamliCare is a mobile-optimized web application designed to support and empower caregivers. It provides tools for care coordination, communication, and document management, helping caregivers navigate their journey with more confidence and less stress.

## Check out our deployed version

If you would like to see the deployed version of this app, please click the link below.
[Famlicare App](https://famlicare-0348fad2c799.herokuapp.com)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have the following installed on your system:

- Node.js (version 14.0 or higher)
- npm (usually comes with Node.js)
- PostgreSQL (version 12.0 or higher)

### Installing

1. Clone the repository:

   ```os
   git clone https://github.com/your-username/famlicare.git
   cd famlicare
   ```

2. Install server dependencies:

   ```os
   cd server
   npm install
   ```

3. Install client dependencies:

   ```os
   cd ../client
   npm install
   ```

4. Set up the database:

   ```postgres
   createdb famlicare
   ```

5. Set up environment variables:
   Create a `.env` file in the server directory and add the following:

   ```javascript
   DATABASE_URL=postgresql://localhost:5432/famlicare
   PORT=5000
   ```

6. Run database migrations:

   ```os
   cd ../server
   npm run migrate
   ```

7. Start the development server:

   ```os
   npm run dev
   ```

8. In a new terminal, start the client:

   ```os
   cd ../client
   npm start
   ```

The application should now be running on `http://localhost:3000`.

## Deployment

The application is deployed on Heroku. To deploy your own instance:

1. Create a new Heroku app
2. Connect your GitHub repository to the Heroku app
3. Set up the necessary environment variables in Heroku
4. Deploy the main branch

## Built With

- [React](https://reactjs.org/) - The web framework used
- [Express](https://expressjs.com/) - Backend framework
- [PostgreSQL](https://www.postgresql.org/) - Database
- [Socket.io](https://socket.io/) - Used for real-time messaging
- [Multer](https://github.com/expressjs/multer) - Used for handling file uploads

## Authors

- **Janet** - messaging, care team component
- **Mustafe** - messaging
- **Jason** - theme styling, create a loved one flow
- **Alex** - care vault
- **Zeyini** - registration flow, profile component

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- Prime Digital Academy for providing the opportunity to work on this project
- Our client for their valuable input and feedback
- All caregivers who inspired this application

```markdown
