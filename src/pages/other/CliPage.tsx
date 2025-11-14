import React, {useRef} from "react";
import {useCliCommands} from "../../hooks";

const CliPage: React.FC = () => {
    const cliRef = useRef<HTMLPreElement>(null);
    const {
        terminalLines,
        inputValue,
        setInputValue,
        processCommand,
        location,
    } = useCliCommands("cli/");

    // Auto-scroll terminal output
    React.useEffect(() => {
        if (cliRef.current) {
            cliRef.current.scrollTop = cliRef.current.scrollHeight;
        }
    }, [terminalLines]);

    const onEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            processCommand(inputValue);
        }
    };

    return (
        <div className="flex flex-1 items-center justify-center w-full flex-col">
            <header
                className="grid grid-cols-3 text-center items-center w-full p-1 border-b border-gray-700 bg-gray-300 rounded-t-lg max-w-5xl">
                <div className="flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block"></span>
                </div>
                <h3>Terminal</h3>
            </header>
            <div
                className="relative bg-[#23272e] rounded-b-lg shadow-2xl px-6 py-3 w-full max-w-5xl min-h-[600px] flex flex-col aspect-video">
                <pre ref={cliRef} id="cli"
                     className="flex-1 w-full bg-transparent text-[#e5e5e5] font-mono text-sm overflow-x-auto text-wrap mb-4">
                    {terminalLines.map((line, idx) => (
                        <div key={idx}>{line}</div>
                    ))}
                </pre>
                <div className="flex flex-row">
                    <span className="text-sm font-mono text-gray-600 text-nowrap">{`Homepage: ~/${location}/#`}</span>
                    <input
                        className="w-full bg-[#23272e] text-[#e5e5e5] border-none outline-none font-mono text-sm pl-1 ml-1"
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        onKeyDown={onEnter}
                        autoFocus={true}
                    />
                </div>
            </div>
        </div>
    );
}

export default CliPage;