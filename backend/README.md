Sure, here's an example text for `README.md` file in the root directory of the project:

# Red Blue Game

This is a full-stack web application for playing the Red Blue game. It is built with the MERN (MongoDB, Express.js, React.js, Node.js) stack and includes user authentication, high score tracking, and admin functionality.

## Features

- Responsive website with a game called Red Blue.
- Two squares: one red and one blue.
- Blue square is moved by user.
- Red square is computer controlled and moves around the screen in random patterns.
- Red square moves between 2 and 10 seconds in the same direction.
- Red square increases its speed level once every minute.
- Each speed level is a 50% increase from the original speed.
- Red square grows 10 pixels every minute.
- Player gets a point for every second they survive.
- Player has 2 extra lives, three lives in total.
- Player is revived as far away from the red square as possible when they die.
- High score list on the home screen web page is based on calculations from a database.
- Introduction screen (home screen) includes a high score list and a "Press any key to start game" prompt.
- Signup link and login link are available on the home screen for user registration and login.
- Users must have an account and be logged in to play the game.
- Admin function is available with a separate web page for user admin.
- Admin can delete users and edit user profiles.
- Database has two tables: "User" and "Game" with one-to-many relations.
- "User" table includes columns for user information and high score tracking.
- "Game" table includes columns for game information and high score tracking.
- User's nickname, max score, and game information are displayed on the Red Blue web page.

## Installation

1. Clone this repository to your local machine.
2. Install the dependencies by running `npm install` in both the `red-blue-frontend` and `red-blue-backend` directories.
3. Create a `.env` file in the `red-blue-backend` directory with the following environment variables:
   - `PORT`: the port number to use for the server (e.g. 5000)
   - `MONGODB_URI`: the URI for the MongoDB database to connect to
   - `JWT_SECRET`: a secret key for JWT token generation and validation
4. Start the development server by running `npm start` in both the `red-blue-frontend` and `red-blue-backend` directories.
5. Open your browser and navigate to `http://localhost:3000` to use the application.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributors

Matija Jovanovic
