import React from "react";
import {useBio} from "../../hooks/useBio.tsx";
import ReactMarkdown from "react-markdown";

const BioPage: React.FC = () => {
    const username = "heldertheking";
    const {bio, loading, error} = useBio(username);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }
    if (!bio || bio?.length < 1) {
        return <div>No bio available.</div>;
    }
    return (
        <div className="flex flex-col items-center min-h-full w-full max-w-[70vw] mx-auto overflow-auto">
            <div className="h-fit markdown-body p-8">
                <ReactMarkdown>
                    {bio}
                </ReactMarkdown>
            </div>
        </div>
    );
};

export default BioPage;