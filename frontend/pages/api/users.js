import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
    if (req.method === "POST") {
        try {
            const client = await clientPromise;
            const db = client.db("booking");
            const users = await db
                .collection("users")
                .findOne({ email: req.body });
            return res.json(users);
        } catch (e) {
            console.error(e);
        }
    } else {
        false;
        // try {
        //     const client = await clientPromise;
        //     const db = client.db("booking");
        //     const users = await db
        //         .collection("users")
        //         .findOne({ email: "a@c.com" });
        //     res.json(users);
        // } catch (e) {
        //     console.error(e);
        // }
    }
};
