import React from "react";

const NotFoundPage: React.FC = () => {
    return (
        <div className="flex flex-1 justify-center items-center flex-col">
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <a href="/" style={{ color: '#007bff', textDecoration: 'none' }}>Go back to Home</a>
        </div>
    );
}

export default NotFoundPage;