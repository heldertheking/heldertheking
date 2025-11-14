import React, {useState} from "react";

const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState({name: '', email: '', message: ''});

    const [status, setStatus] = useState("");

    const handleChange = (e: any) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setStatus("Sending...");

        // TODO: Implement Email sending via Cloudflare Pages Function

        try {
            setStatus("Contact form currently disabled.");
            return;
            // Use relative path for Cloudflare Pages Function
            // const response = await fetch('/api/contact', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(formData),
            // });
            //
            // if (response.ok) {
            //     setStatus("Message sent successfully!");
            //     setFormData({name: '', email: '', message: ''});
            // } else {
            //     setStatus("Something went wrong. Please try again later.");
            // }
        } catch (error) {
            setStatus("Failed to send message.");
        }
    }

    return (
        <div className="flex flex-col items-center justify-center w-full flex-1">
            <h1 className="text-3xl mb-6">Contact Me</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded shadow-md">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                        Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded h-32"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                >
                    Send Message
                </button>
                {status && <p className="mt-4 text-center animate-fade-in">{status}</p>}
            </form>
        </div>
    );
}

export default ContactPage;