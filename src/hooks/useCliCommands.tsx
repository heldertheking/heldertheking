import {useCallback, useState} from "react";
import {useNavigate} from "react-router-dom";
import {commands} from "../config/CliConfig";
import {useBio} from "./useBio";

export type CliCommandResult = {
    output: string[];
    clear?: boolean;
    location?: string;
};

export function useCliCommands(initialLocation: string = "cli/") {
    const navigate = useNavigate();
    const [terminalLines, setTerminalLines] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [location, setLocation] = useState(initialLocation);
    const [history, setHistory] = useState<string[]>([]);

    // Find command by name or alias
    const findCommand = (cmd: string) =>
        commands.find(c => c.name === cmd || (c.aliases && c.aliases.includes(cmd)));

    // Fetch content for special files
    const bioData = useBio("heldertheking");
    const bio = bioData.bio || "Bio Not Found";

    const processCommand = useCallback((input: string) => {
        const value = input.trim();
        if (!value) return;
        setTerminalLines(prev => [...prev, `> ${value}`]);
        setHistory(prev => [...prev, value]);
        const [command, ...args] = value.split(/\s+/);
        const cmdObj = findCommand(command);
        if (cmdObj) {
            const result = cmdObj.execute(args, location, [...history, value]);
            if (result.clear) {
                setTerminalLines([]);
            } else if (result.output && result.output.length) {
                setTerminalLines(prev => [...prev, ...result.output]);
            }
            if (result.location && result.location !== location) {
                setLocation(result.location);
                if (result.location.startsWith("/")) {
                    navigate(result.location);
                }
            }
            // Handle fetch signals for special files
            if (result.fetch === "bio") {
                if (bioData.bio) {
                    setTerminalLines(prev => [...prev, bio]);
                } else if (bioData.error) {
                    setTerminalLines(prev => [...prev, `Error loading bio: ${bioData.error}`]);
                } else {
                    setTerminalLines(prev => [...prev, "Unable to load bio"]);
                }
            }
        } else {
            setTerminalLines(prev => [...prev, `Command not found: ${command}. Type 'help' for a list of commands.`]);
        }
        setInputValue("");
    }, [location, navigate, history, bioData]);

    return {
        terminalLines,
        inputValue,
        setInputValue,
        processCommand,
        location,
        setLocation,
        history,
    };
}
