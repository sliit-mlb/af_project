let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
let dbConfig = require('./database/db');

const path = require('path');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const crypto = require("crypto");

// Express Route
const userRoute = require('./routes/user.route');
const adminRoute = require('./routes/admin.route');
const managerRoute = require('./routes/manager.route');
const categoryRoute = require('./routes/category.route');
const productRoute = require('./routes/product.route');

// Connecting mongoDB Database
/*mongoose.Promise = global.Promise;*/

/*mongoose.connect(dbConfig.db, {
    useNewUrlParser: true
}).then(() => {
        console.log('Database sucessfully connected!')
    },
    error => {
        console.log('Could not connect to database : ' + error)
    }
);*/

const app = express();
app.use(bodyParser.json());
app.use(cors());

const mongoURI =
    "mongodb://localhost:27017/onlineShopping";

const conn = mongoose.createConnection(mongoURI);

mongoose.connect(mongoURI, { useNewUrlParser: true });

let gfs;

conn.once("open",()=> {
    gfs = Grid(conn.db,mongoose.mongo);
    gfs.collection("images");
    console.log("Database successfully connected")
})

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/users', userRoute);
app.use('/admin', adminRoute);
app.use('/store-manager', managerRoute);
app.use('/category', categoryRoute);
app.use('/product',productRoute);

// Create storage engine
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = file.originalname;
                const fileInfo = {
                    filename: filename,
                    bucketName: "images"
                };
                resolve(fileInfo);
            });
        });
    }
});

const upload = multer({ storage });

app.post("/image/upload-image/", upload.single("img"), (req, res, err) => {
    res.send(req.files);
});

app.get("/image/get-image/:filename", (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        // Check if file
        if (!file || file.length === 0) {
            console.log("No file exists");
            return res.status(404).json({
                err: "No file exists"
            });
        }

        // Check if image
        if (file.contentType === "image/jpeg" || file.contentType === "image/png" || file.contentType === "image/jpg") {
            // Read output to browser
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        } else {
            console.log("Not an image");
            res.status(404).json({
                err: "Not an image"
            });
        }
    });
});

// PORT
const port = 4000;
const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
});

// 404 Error
app.use((req, res, next) => {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});