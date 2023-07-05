1. npm init
2. install dependencies
3. gitignore setup
4. .env setup
5. server.js setup
   - config dotenv, for reading secrets
   - require express, set up app = express()
   - set up PORT, process.env.PORT
   - set up app.listen()
6. middlewear setup, in server.js
   - app.use() - json
   - app.use() - express.urlencoded
   - app.use() - express.static
   - app.set() - view engine
7. create config folder
   - connectDB.js setup DB connection
     - async await, try catch
     - set up DB_STRING in .env
8. call connectDB() in server.js
9. Test DB connection is working
10. set up views folder
    - edit.ejs, home.ejs, upload.ejs
11. set up public folder
    - images, styles folders
12. set up models folder and files
13. Set up route and controller folders
    - set up routes in server.js
14. Build out rest of view pages
