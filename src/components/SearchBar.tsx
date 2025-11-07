import React, {useState} from "react";

interface SearchBarProps {
    suggestions: string[];
    value?: string;
    onChange?: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({suggestions, value, onChange}) => {
    const [query, setQuery] = useState(value || "");
    const [showSuggestions, setShowSuggestions] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setQuery(newValue);
        onChange?.(newValue);
        setShowSuggestions(true);
    };

    const handleSuggestionClick = (suggestion: string) => {
        setQuery(suggestion);
        onChange?.(suggestion);
        setShowSuggestions(false);
    };

    const filteredSuggestions = suggestions.filter(
        (s) => s.toLowerCase().includes(query.toLowerCase()) && s !== query
    );

    return (
        <div className="search-bar w-full max-w-md mx-auto h-12 relative flex items-center">
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search..."
                className="w-full bg-transparent border-0 border-b-2 border-stone-600 px-0 py-2 text-black focus:outline-none focus:ring-0 placeholder-gray-400"
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
            />
            {showSuggestions && filteredSuggestions.length > 0 && (
                <ul className="absolute top-full left-0 right-0 bg-white border border-stone-300 rounded-xl mt-2 shadow-xl z-10 overflow-hidden">                    {filteredSuggestions.map((suggestion) => (
                    <li
                        key={suggestion}
                        className="px-4 py-3 cursor-pointer hover:bg-stone-100 transition-colors"
                        onMouseDown={() => handleSuggestionClick(suggestion)}
                    >
                        {suggestion}
                    </li>
                ))}
                </ul>
            )}
        </div>
    );
}

export default SearchBar;