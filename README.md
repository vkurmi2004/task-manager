# Task Manager

A full-stack task management application built with **React** (frontend) and **Express.js** (backend) with **MongoDB** database.

## Features

✅ Create, Read, Update, and Delete tasks
✅ Clean and intuitive user interface
✅ RESTful API backend
✅ MongoDB database integration
✅ CORS enabled for cross-origin requests
✅ Environment-based configuration

## Tech Stack

### Frontend
- **React** 19.2.4
- **React DOM** 19.2.4
- **React Scripts** 5.0.1
- **Testing Library** (Jest, React, DOM)

### Backend
- **Node.js** with **Express.js** 5.2.1
- **MongoDB** 7.1.0
- **Mongoose** 9.2.1 (ODM)
- **CORS** 2.8.6
- **Dotenv** 17.3.1

## Project Structure

```
task-manager/
├── client/                 # React frontend
│   ├── public/            # Static files
│   ├── src/               # React components
│   ├── package.json       # Client dependencies
│   └── README.md          # Client documentation
├── controllers/           # Express route handlers
│   └── taskcontroller.js  # Task CRUD operations
├── models/                # Database models
│   └── task.js            # Task schema
├── routes/                # API routes
│   └── taskroutes.js      # Task endpoints
├── server.js              # Express server setup
├── package.json           # Server dependencies
└── README.md              # This file
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas cloud)

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/task-manager.git
   cd task-manager
   ```

2. **Install server dependencies**
   ```bash
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=5001
   ```
   
   Example MongoDB URI:
   - Local: `mongodb://localhost:27017/task-manager`
   - Atlas: `mongodb+srv://username:password@cluster.mongodb.net/task-manager?retryWrites=true&w=majority`

## Running the Application

### Development Mode (Recommended)

**Terminal 1 - Start the backend server:**
```bash
npm start
```
The server will run on `http://localhost:5001`

**Terminal 2 - Start the frontend dev server:**
```bash
cd client
npm start
```
The client will run on `http://localhost:3000`

The React app will automatically open in your browser.

### Production Mode

**Build the client:**
```bash
cd client
npm run build
cd ..
```

**Start the server:**
```bash
npm start
```

## API Endpoints

### Tasks
- `GET /tasks` - Get all tasks
- `GET /tasks/:id` - Get a single task by ID
- `POST /tasks` - Create a new task
- `PUT /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task

### Request Body Example (POST/PUT)
```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": false
}
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/task-manager` |
| `PORT` | Server port | `5001` |

## Scripts

### Server Scripts
```bash
npm start          # Start the Express server
npm test           # Run tests (not configured)
```

### Client Scripts
```bash
cd client
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
npm run eject      # Eject from create-react-app (irreversible)
```

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. You'll see the task manager interface
3. Click "Add Task" to create a new task
4. View all your tasks in the list
5. Click on a task to update or delete it

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running (for local installations: `mongod`)
- Check your `MONGO_URI` in `.env`
- Verify MongoDB credentials for Atlas

### Port Already in Use
- Change the `PORT` in `.env` to an available port
- Or kill the process using that port

### CORS Issues
- Ensure the proxy in `client/package.json` points to the correct backend URL
- Check that CORS is enabled in `server.js`

### Module Not Found
- Delete `node_modules` and `package-lock.json` in both root and client
- Run `npm install` again in both directories

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the `LICENSE` file for details.

## Future Enhancements

- [ ] User authentication and authorization
- [ ] Task categories and tags
- [ ] Due date reminders
- [ ] Task priority levels
- [ ] Search and filter functionality
- [ ] Dark mode
- [ ] Mobile app version

## Support

For issues, questions, or suggestions, please open an issue on GitHub or contact the maintainer.

## Author

Created with ❤️ by VIVEK KURMI

---

**Happy Task Managing!** 🚀
