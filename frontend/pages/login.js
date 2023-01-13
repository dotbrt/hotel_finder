import { useState } from "react";
import Router from "next/router";
import { v4 as uuid } from "uuid";
// import clientPromise from "/lib/mongodb";

export default function Login(props) {
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(email),
        });
        const json = await res.json();

        if (json === null) {
            document.getElementById("error").textContent = "Wrong email";
        } else {
            // const id = { uuid: "34117569-d656-4f8f-8a73-d9974898b08b" }; //uuid();
            // Replace <uri> with your MongoDB Atlas connection URI
            // const client = new MongoClient(uri, { useNewUrlParser: true });
            // await client.connect();
            // const db = client.db("mydb");
            // const usersCollection = db.collection("users");
            // await usersCollection.insertOne({ email, id });
            // await client.close();
            const id = json.uuid;
            Router.push(`/user/${id}`);
        }
    };

    return (
        <form>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
            />
            <button onClick={handleSubmit} type="submit">
                Submit
            </button>
            <p id="error"></p>
        </form>
    );
}

// export async function getServerSideProps(context) {
//     // const client = new MongoClient(uri, { useNewUrlParser: true });
//     // await client.connect();
//     // const db = client.db("mydb");
//     // const usersCollection = db.collection("users");
//     // const user = await usersCollection.findOne({ id });
//     // const projectsCollection = db.collection("projects");
//     // const projects = await projectsCollection.find({ userId: id }).toArray();
//     // await client.close();
//     try {
//         const client = await clientPromise;
//         const db = client.db("booking");
//         const users = await db
//             .collection("users")
//             .find({ email: "a@c.com" })
//             .limit(20)
//             .toArray();
//         return {
//             props: { users: JSON.parse(JSON.stringify(users)) },
//         };
//     } catch (e) {
//         console.error(e);
//     }
//     return { props: { db } };
// }
