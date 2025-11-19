import React from "react";
import {Link} from "react-router-dom";

const Navigation: React.FC = () => {
    const name = "Hélder Oliveira";

    return (
        <header className="grid grid-cols-3 text-center items-center w-full p-1">
            <h1 className="flex text-right">
                <Link to="/">{ name }</Link>
            </h1>
            <nav className="flex items-center justify-self-center w-fit gap-2 rounded-full bg-gray-600/20 [&>a]:duration-350 [&>a]:hover:bg-gray-600/30 [&>a]:rounded-full [&>a]:px-2">
                <Link to="/projects">Projects</Link>
                •
                <Link to="/contact">Contact</Link>
                •
                <Link to="/about">About</Link>
                •
                <Link to="/blog">Blog</Link>
                •
                <Link to="/other">Other</Link>
            </nav>
        </header>
        // <nav className="navigation w-full z-50 bg-white shadow">
        //     <ul style={{display: "flex", gap: "1rem", listStyle: "none", padding: "6px"}}>
        //         {items.map((item, index) => {
        //             if (index === 0) {
        //                 return (
        //                     <li key={item.title} style={{marginRight: "auto"}}>
        //                         <a to={item.url}>{item.title}</a>
        //                     </li>
        //                 );
        //             }
        //             if (item.type === "link") {
        //                 return (
        //                     <li key={item.title}>
        //                         {item.locked ? (
        //                             <button
        //                                 type="button"
        //                                 style={{
        //                                     opacity: 0.5,
        //                                     pointerEvents: "auto",
        //                                     background: "none",
        //                                     border: "none",
        //                                     cursor: "pointer"
        //                                 }}
        //                                 onClick={() => {
        //                                     setDialogOpen(true);
        //                                     console.log("Locked item clicked")
        //                                 }}
        //                             >
        //                                 {item.title}
        //                             </button>
        //                         ) : (
        //                             <a to={item.url} style={{
        //                                 opacity: 1,
        //                                 pointerEvents: "auto"
        //                             }}>
        //                                 {item.title}
        //                             </a>
        //                         )}
        //                     </li>
        //                 );
        //             }
        //             if (item.type === "dropdown" && item.children) {
        //                 return (
        //                     <li
        //                         key={item.title}
        //                         style={{position: "relative"}}
        //                         onMouseEnter={() => setOpenDropdown(item.title)}
        //                         onMouseLeave={() => setOpenDropdown(null)}
        //                     >
        //                         <button type="button" style={{background: "none", border: "none", cursor: "pointer"}}>
        //                             {item.title}
        //                         </button>
        //                         {openDropdown === item.title && (
        //                             <ul style={{
        //                                 position: "absolute",
        //                                 top: "100%",
        //                                 left: 0,
        //                                 background: "white",
        //                                 boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        //                                 padding: "0.5rem",
        //                                 margin: 0,
        //                                 listStyle: "none"
        //                             }}>
        //                                 {item.children.map((child) => (
        //                                     <li key={child.title}>
        //                                         {child.locked ? (
        //                                             <button
        //                                                 type="button"
        //                                                 style={{
        //                                                     opacity: 0.5,
        //                                                     pointerEvents: "auto",
        //                                                     background: "none",
        //                                                     border: "none",
        //                                                     cursor: "pointer"
        //                                                 }}
        //                                                 onClick={() => {
        //                                                     setDialogOpen(true);
        //                                                     console.log("Locked child item clicked")
        //                                                 }}
        //                                             >
        //                                                 {child.title}
        //                                             </button>
        //                                         ) : (
        //                                             <a to={child.url} style={{
        //                                                 opacity: 1,
        //                                                 pointerEvents: "auto"
        //                                             }}>
        //                                                 {child.title}
        //                                             </a>
        //                                         )}
        //                                     </li>
        //                                 ))}
        //                             </ul>
        //                         )}
        //                     </li>
        //                 );
        //             }
        //             return null;
        //         })}
        //     </ul>
        //     <PromptDialog
        //         isOpen={dialogOpen}
        //         onClose={() => setDialogOpen(false)}
        //         onSubmit={handleSubmit}
        //         title="Access Password Required"
        //         text="Please enter the password to access this section:"
        //         placeholder="Enter password..."
        //         submitText="Access"
        //         cancelText="Cancel"
        //         inputType="password"
        //     />
        // </nav>
    );
};

export default Navigation;