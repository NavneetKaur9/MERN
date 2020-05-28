import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import config from './config';
// import userRoute from './routes/userRoute';
import listingsRoute from './routes/listingsRoute';
import cors from 'cors';
// import orderRoute from './routes/orderRoute';
// import { MongoClient } from 'mongodb';

const mongodbUrl = config.MONGODB_URL;
// async function main() {
//     const client = new MongoClient(mongodbUrl, { useUnifiedTopology: true });
//     try {
//         // Connect to the MongoDB cluster
//         await client.connect();

//         // Make the appropriate DB calls
//         await listDatabases(client);

//     } catch (e) {
//         console.error(e);
//     } finally {
//         await client.close();
//     }
// }

// async function listDatabases(client) {
//     let databasesList = await client.db();

//     console.log("Databases:");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };

// main().catch(console.error);

/*=========================================
                Mongoose                 
=========================================*/
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).catch((error) => console.log("Error in connecting MongoDB", error.reason));

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
    console.log("Database connected");
});

/*=========================================
            express                 
=========================================*/
const app = express();
app.use(bodyParser.json());
app.use(cors());

// app.use('/api/users', userRoute);
app.use('/api/listings', listingsRoute);
// app.use('/api/orders', orderRoute);
// app.get('/api/config/paypal', (req, res) => {
//   res.send(config.PAYPAL_CLIENT_ID);
// });

app.use(express.static(path.join(__dirname, '/../frontend/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
});

app.listen(config.PORT, () => { console.log(`Server started at http://localhost:${config.PORT}`); });
