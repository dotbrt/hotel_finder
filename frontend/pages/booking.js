import React, { useState } from "react";
import { Table, Input, Button } from "antd";

const BookingTool = () => {
    const [projectName, setProjectName] = useState("");
    const [urls, setUrls] = useState([]);
    const [venue, setVenue] = useState("");
    const [data, setData] = useState({});

    const handleSubmit = () => {
        // Fetch data for each URL
        urls.forEach((url) => {
            fetch(`http://localhost:8000/api/hotel/${url}`)
                .then((res) => res.json())
                .then((response) => {
                    setData((prevData) => ({ ...prevData, [url]: response }));
                });
        });
    };

    const handleAddUrl = () => {
        const newUrl = document.getElementById("urlInput").value;
        setUrls([...urls, newUrl]);
    };

    const handleRemoveUrl = (urlToRemove) => {
        setUrls(urls.filter((url) => url !== urlToRemove));
        setData((prevData) => {
            const newData = { ...prevData };
            delete newData[urlToRemove];
            return newData;
        });
    };

    const columns = [
        {
            title: projectName,
            dataIndex: "data",
            key: "data",
        },
    ];

    return (
        <div>
            <h1>Booking Tool</h1>
            <div>
                <label htmlFor="projectName">Project Name:</label>
                <Input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                />
                <Button onClick={(e) => setProjectName(e.target.value)}>
                    Edit
                </Button>
            </div>
            <div>
                <label htmlFor="urls">URLs:</label>
                <Input id="urlInput" />
                <Button onClick={handleAddUrl}>Add</Button>
                {urls.map((url) => (
                    <div key={url}>
                        {url}
                        <Button onClick={() => handleRemoveUrl(url)}>
                            Remove
                        </Button>
                    </div>
                ))}
            </div>
            <div>
                <label htmlFor="venue">Venue:</label>
                <Input
                    type="text"
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                />
                <Button onClick={() => setVenue("")}>Edit</Button>
            </div>
            <Button onClick={handleSubmit}>Submit</Button>
            {Object.keys(data).length > 0 && (
                <Table
                    dataSource={Object.values(data)}
                    columns={columns}
                    rowKey={(record) => record.url}
                />
            )}
        </div>
    );
};

export default BookingTool;
