import { useState } from 'react';
import type { FC, ChangeEvent, KeyboardEvent, MouseEvent } from 'react';

/**
 * Props for the PromptDialog component.
 */
interface PromptDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (value: string) => void;
    title?: string;
    text?: string;
    placeholder?: string;
    submitText?: string;
    cancelText?: string;
    inputType?: string;
}

/**
 * PromptDialog Component for user input via a modal dialog.
 *
 * This component is completely modular and can be used anywhere in the app.
 * It displays a modal dialog with a title, text, input field, and action buttons.
 * The dialog can be customized with various props.
 *
 * @param isOpen - Controls the visibility of the dialog
 * @param onClose - Function to call when the dialog is closed
 * @param onSubmit - Function to call with the input value when submitted
 * @param title - Title of the dialog
 * @param text - Descriptive text in the dialog
 * @param placeholder - Placeholder text for the input field
 * @param submitText - Text for the submit button
 * @param cancelText - Text for the cancel button
 * @param inputType - Type of the input field (e.g., text, password)
 * @constructor
 *
 * @example
 * <PromptDialog
 *     isOpen={isDialogOpen}
 *     onClose={handleClose}
 *     onSubmit={handleSubmit}
 *     title="Enter Your Name"
 *     text="Please provide your full name below:"
 *     placeholder="Full Name"
 *     submitText="Save"
 *     cancelText="Dismiss"
 *     inputType="text"
 * />
 *
 * @author Hélder Oliveira
 * @version 1.0.0
 */
const PromptDialog: FC<PromptDialogProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title = "Input Required",
    text = "Please enter a value:",
    placeholder = "Enter value...",
    submitText = "Submit",
    cancelText = "Cancel",
    inputType = "text",
}) => {
    const [inputValue, setInputValue] = useState('');

    if (!isOpen) return null;

    const handleSubmit = () => {
        onSubmit(inputValue);
        setInputValue('');
        onClose();
    };

    const handleCancel = () => {
        onClose();
        setInputValue('');
    };

    const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            handleCancel();
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    return (
        <div
            className="fixed inset-0 bg-black flex items-center justify-center z-50"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            onClick={handleBackdropClick}
        >
            <div className="bg-white rounded-lg shadow-xl p-6 w-96 max-w-full mx-4">
                <h2 className="text-xl font-semibold mb-2">{title}</h2>
                <p className="text-gray-600 mb-4">{text}</p>

                <input
                    type={inputType}
                    value={inputValue}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                    autoFocus
                />

                <div className="flex gap-2 justify-end">
                    <button
                        onClick={handleCancel}
                        className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        {submitText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PromptDialog;