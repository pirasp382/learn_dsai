import {useEffect, useRef, useState} from "react";
import "./searchable_dropdown.css";
import PropTypes from "prop-types";

const SearchableDropdown = ({
                                options,
                                label,
                                id,
                                selectedVal,
                                handleChange,
                                placeholder,
                                title,
                            }) => {
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [hasSelected, setHasSelected] = useState(false); // Neues State-Flag

    const inputRef = useRef(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("click", handleOutsideClick);
        return () => document.removeEventListener("click", handleOutsideClick);
    }, []);

    const selectOption = (option) => {
        setQuery(""); // Löscht das Suchfeld
        setHasSelected(true); // Markiert, dass ein Element ausgewählt wurde
        handleChange(option[label]);
        setIsOpen(false);
    };

    const getDisplayValue = () => {
        if (query) return query; // Zeige den Suchbegriff
        if (hasSelected) return selectedVal; // Zeige den ausgewählten Wert
        return ""; // Keine Anzeige
    };

    const filter = (options) => {
        return options.filter((option) =>
            option[label].toLowerCase().includes(query.toLowerCase()),
        );
    };

    return (
        <div className="dropdown" ref={dropdownRef}>
            <div className="control">
                <div className="selected-value">
                    <h3>{title}</h3>
                    <input
                        ref={inputRef}
                        type="text"
                        value={getDisplayValue()}
                        name="searchTerm"
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setHasSelected(false); // Entfernt die Auswahl, wenn der Benutzer tippt
                            handleChange(null);
                        }}
                        onClick={() => setIsOpen((prev) => !prev)}
                        placeholder={!hasSelected ? placeholder : ""}
                    />
                </div>
                <div className={`arrow ${isOpen ? "open" : ""}`}></div>
            </div>

            {isOpen && (
                <div className="options">
                    {filter(options).map((option, index) => (
                        <div
                            onClick={() => selectOption(option)}
                            className={`option ${
                                option[label] === selectedVal ? "selected" : ""
                            }`}
                            key={`${id}-${index}`}
                        >
                            {option[label]}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

SearchableDropdown.propTypes = {
    options: PropTypes.array,
    label: PropTypes.string,
    id: PropTypes.string,
    selectedVal: PropTypes.string,
    handleChange: PropTypes.func,
    placeholder: PropTypes.string,
    title: PropTypes.string,
}

export default SearchableDropdown;
