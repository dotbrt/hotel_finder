import { MongoClient } from "mongodb";
import nextConnect from "next-connect";

const client = new MongoClient(
    "mongodb+srv://offerter:G8COzqGWZRklZCGo@cluster0.nox2hij.mongodb.net/?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

async function database(req, res, next) {
    if (!client.isConnected()) await client.connect();
    req.dbClient = client;
    req.db = client.db("MCT");
    return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;
