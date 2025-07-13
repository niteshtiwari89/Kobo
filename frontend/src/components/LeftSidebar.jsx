import { Clipboard, Book } from "lucide-react"

const LeftSidebar = ({ activeSection, setActiveSection }) => {
    return (
        <aside className="w-16 bg-gray-200 shadow-gray-700 flex flex-col items-center py-4 space-y-8">
            <button
                onClick={() => setActiveSection("clipboard")}
                className={`p-2 rounded-md hover:bg-gray-300 transition-colors ${activeSection === "clipboard" ? "bg-gray-300" : ""}`}
            >
                <Clipboard className={`h-6 w-6 ${activeSection === "clipboard" ? "text-teal-500" : "text-gray-500"}`} />
            </button>
            <button
                onClick={() => setActiveSection("book")}
                className={`p-2 rounded-md hover:bg-gray-300 transition-colors ${activeSection === "book" ? "bg-gray-300" : ""}`}
            >
                <Book className={`h-6 w-6 ${activeSection === "book" ? "text-teal-500" : "text-gray-500"}`} />
            </button>
        </aside>
    )
}

export default LeftSidebar

