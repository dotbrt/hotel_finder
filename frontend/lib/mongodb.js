// mongodb.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
};

let client;
let clientPromise;

client = new MongoClient(
    "mongodb+srv://offerter:G8COzqGWZRklZCGo@cluster0.nox2hij.mongodb.net/?retryWrites=true&w=majority",
    options
);
clientPromise = client.connect();

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;
