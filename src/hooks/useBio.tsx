import {useEffect, useState} from "react";

export function useBio(username: string, repo: string = username) {
    const [bio, setBio] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBio = async () => {
            try {
                setLoading(true);
                setError(null);

                // Use GitHub API to fetch raw README.md content
                const response = await fetch(`https://raw.githubusercontent.com/${username}/${repo}/main/README.md`);
                if (!response.ok) {
                    throw new Error(`Error fetching README: ${response.statusText}`);
                }

                const text = await response.text();
                setBio(text);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBio().then(() => {
            console.debug(`Fetched bio for ${username}/${repo} successfully.`);
        });
    }, [username, repo]);

    return {bio, loading, error};
}