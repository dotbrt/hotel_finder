// pages/index.js
import Login from "./login";
import Layout from "../components/layout";
// import NestedLayout from '../components/nested-layout'

export default function Page() {
    return (
        <div>
            <Login />
        </div>
    );
}

Page.getLayout = function getLayout(page) {
    return (
        <>
            <Layout>{page}</Layout>
        </>
    );
};
