import { useState } from "react";
export default function Form(props) {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState("");
    const handleChange = (e) => {
        setNewItem(e.target.value);
    };

    const handleAdd = (e) => {
        setItems([...items, newItem]);
        setNewItem("");
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        items.forEach((item) => {
            console.log({
                url: item,
                owner: props.props.uuid,
            });
        });
        // const res = await fetch("/api/links", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify([...items]),
        // });
        // const json = await res.json();
        // console.log(json);
    };
    return (
        <div>
            <form>
                <input
                    type="text"
                    value={newItem}
                    onChange={handleChange}
                    placeholder="Enter a new item"
                />
                <button type="button" onClick={handleAdd}>
                    Add
                </button>
                <button type="submit" onClick={handleSubmit}>
                    Submit
                </button>
            </form>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}
