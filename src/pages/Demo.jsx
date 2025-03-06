import React, { useState } from "react";
import { IoMdCreate } from "react-icons/io";
import { MdOutlineDelete } from "react-icons/md";
import { GrFormPin } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

const demoNotes = [
  {
    _id: "1",
    title: "Getting Started with React",
    content:
      "React is a JavaScript library for building user interfaces. It allows for component-based development and efficient rendering.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isPinned: true,
    tags: ["React", "JavaScript", "Frontend"],
  },
  {
    _id: "2",
    title: "What is an API?",
    content:
      "An API (Application Programming Interface) allows different software systems to communicate with each other.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isPinned: true,
    tags: ["API", "Backend", "Web Development"],
  },
  {
    _id: "3",
    title: "Understanding JavaScript Closures",
    content:
      "A closure is a function that retains access to its lexical scope, even when executed outside of its original scope.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isPinned: false,
    tags: ["JavaScript", "Functional Programming"],
  },
  {
    _id: "4",
    title: "CSS Grid vs. Flexbox",
    content:
      "CSS Grid is great for 2D layouts, whereas Flexbox is better suited for 1D layouts. Use them together for best results.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isPinned: false,
    tags: ["CSS", "Frontend", "Design"],
  },
  {
    _id: "5",
    title: "Node.js and Event Loop",
    content:
      "Node.js uses a non-blocking, event-driven architecture to handle multiple requests efficiently with a single thread.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isPinned: false,
    tags: ["Node.js", "Backend", "Asynchronous"],
  },
  {
    _id: "6",
    title: "Understanding REST vs. GraphQL",
    content:
      "REST is a traditional API approach using endpoints, while GraphQL provides more flexibility by allowing clients to request specific data structures.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isPinned: false,
    tags: ["API", "GraphQL", "REST"],
  },
];

const NotesDemo = () => {
  const navigate = useNavigate();
  const [pinnedNotes, setPinnedNotes] = useState([]);

  const handlePin = (id) => {
    setPinnedNotes((prev) =>
      prev.includes(id) ? prev.filter((noteId) => noteId !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-400 animate-fadeIn">
        Explore NeoNotes - Your Smart Note-Taking App
      </h1>
      <p className="text-lg text-gray-300 mb-8 text-center max-w-2xl animate-fadeInSlow">
        Want to create, edit, or organize your notes efficiently? Login to
        experience seamless note management with NeoNotes.
      </p>
      <button
        className="mt-8 px-6 py-3 text-lg font-semibold bg-blue-500 hover:bg-blue-600 rounded-lg transition-all shadow-md animate-bounce cursor-pointer mb-15"
        onClick={() => navigate("/login")}
      >
        Login to Create Your Notes
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-slideUp">
        {demoNotes.map((note) => (
          <div
            key={note._id}
            className={`relative p-5 rounded-lg shadow-md transition-all 
               bg-gray-800 border border-gray-700 
               hover:shadow-lg hover:scale-105 duration-200 ${
                 note.isPinned ? "border-yellow-400" : ""
               }`}
          >
            <GrFormPin
              className={`absolute top-3 right-3 text-2xl cursor-pointer transition-all transform ${
                note.isPinned
                  ? "text-yellow-500 rotate-45"
                  : "text-gray-400 hover:text-gray-600"
              }`}
              onClick={() => handlePin(note._id)}
            />

            <h2 className="text-lg font-semibold text-white">{note.title}</h2>
            <p className="mt-2 text-sm text-gray-300">{note.content}</p>

            {note.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {note.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs font-medium text-blue-300 bg-blue-700 rounded-lg"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex justify-end gap-3 mt-4 text-xl">
              <IoMdCreate className="cursor-pointer text-green-400 hover:text-green-600 transition-all" />
              <MdOutlineDelete className="cursor-pointer text-red-400 hover:text-red-600 transition-all" />
            </div>
          </div>
        ))}
      </div>

      {/* <button className="mt-8 px-6 py-3 text-lg font-semibold bg-blue-500 hover:bg-blue-600 rounded-lg transition-all shadow-md animate-bounce cursor-pointer"
      onClick={()=>navigate("/login")}
      >
        Login to Create Your Notes

      </button> */}
    </div>
  );
};

export default NotesDemo;
