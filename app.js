const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Routers
const userRoutes = require('./Backend/routes/user.routes');

const app = express();
const dbURL = process.env.dbURL;
const PORT = process.env.PORT || 3000;

// DB connect
mongoose
    .connect(dbURL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log(err));

mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Allow CORS
app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization,auth-token"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

// Use Routes
app.use('/user', userRoutes);

// route not found
app.use((req, res) => {
    return res.status(404).json({ message: "Route Not Found" });
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});