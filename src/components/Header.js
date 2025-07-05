import React, { useEffect, useState } from "react";

export default function Header({ shapes, setShapes, title, setTitle }) {
    const [username, setUsername] = useState("");

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/user');
                if (response.ok) {
                    const data = await response.json();
                    setUsername(data.username);
                } else {
                    console.error('Failed to fetch user info.');
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        fetchUserInfo();
    }, []);

    const exportJSON = () => {
        const fileData = { title, shapes };
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(fileData));
        const downloadAnchor = document.createElement("a");
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", `${title || "untitled"}.json`);
        downloadAnchor.click();
    };

    const importJSON = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            const loaded = JSON.parse(reader.result);
            setTitle(loaded.title || "untitled");
            setShapes(loaded.shapes || []);
        };
        reader.readAsText(e.target.files[0]);
    };

    const saveDrawing = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/drawings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, shapes }),
            });
            if (response.ok) {
                alert('Drawing saved successfully!');
            } else {
                alert('Failed to save drawing.');
            }
        } catch (error) {
            console.error('Error saving drawing:', error);
            alert('Error saving drawing.');
        }
    };

    const loadDrawing = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/drawings');
            if (response.ok) {
                const loaded = await response.json();
                setTitle(loaded.title || "untitled");
                setShapes(loaded.shapes || []);
                alert('Drawing loaded successfully!');
            } else if (response.status === 404) {
                alert('No saved drawing found for this user.');
            } else {
                alert('Failed to load drawing.');
            }
        } catch (error) {
            console.error('Error loading drawing:', error);
            alert('Error loading drawing.');
        }
    };

    return (
        <div className="header">
            <span className="username-display">Welcome, {username || "Guest"}!</span>
            <input
                className="title-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <div className="header-buttons">
                <label className="import-label">
                    Import <input type="file" accept=".json" onChange={importJSON} hidden />
                </label>
                <button onClick={exportJSON}>Export</button>
                <button onClick={saveDrawing}>Save</button>
                <button onClick={loadDrawing}>Load</button>
            </div>
        </div>
    );
}