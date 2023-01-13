import clientPromise from "/lib/mongodb";
import Dashboard from "/pages/dashboard";
import Form from "/pages/form";

export default function ({ user, links }) {
    const projects = user.projects;
    return (
        <div>
            <Dashboard />
            <h3>Email: {user.email}</h3>
            <h3>Projects:</h3>

            <ul>
                {projects.map((project) => {
                    <li key={project.projId}>{project.projName}</li>;
                })}
            </ul>

            <Form />
            <div>
                <ul>
                    {links.map((link) => (
                        <li key={link._id}>{link.url}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    try {
        const client = await clientPromise;
        const db = client.db("booking");
        const user = await db
            .collection("users")
            .findOne({ uuid: context.query.uuid });
        const links = await db
            .collection("links")
            .find({
                owner: context.query.uuid,
            })
            .toArray();
        return {
            props: {
                user: JSON.parse(JSON.stringify(user)),
                links: JSON.parse(JSON.stringify(links)),
            },
        };
    } catch (e) {
        console.error(e);
    }
}
