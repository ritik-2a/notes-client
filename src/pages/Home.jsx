import React, { useState, useEffect } from "react";
import { IoIosAdd } from "react-icons/io";
import { GrFormPin } from "react-icons/gr";
import { IoMdCreate } from "react-icons/io";
import { MdOutlineDelete } from "react-icons/md";
import Modal from "react-modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import img from "../assets/images/image1.jpg";
import img2 from "../assets/images/createNote.png";
import { helpFun } from "../utils/helper";
import { BASE_URL } from "../utils/helper";

const Home = ({ searchQuery }) => {
  const [openEditModal, setOpenEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState([]);
  const [notes, setNotes] = useState([]);
  const [pinnedNotes, setPinnedNotes] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/api/note/getAll`, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      setNotes(response.data.notes.sort((a, b) => b.isPinned - a.isPinned));
    } catch (error) {
      toast.error("Unable to fetch notes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // 📝 Create Note
  const createNote = async () => {
    if (!title || !content) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      const response = await axios.post(
        `${BASE_URL}/api/note/create`,
        { title, content, tags: tag },
        { withCredentials: true }
      );

      const newNote = response.data.newNote; // Ensure correct key (not notes)

      if (!newNote || !newNote._id) {
        throw new Error("Invalid response: Missing note or _id");
      }

      setNotes((prevNotes) => [...prevNotes, newNote]);
      setOpenEditModal({ isShown: false, type: "add", data: null });
      setTitle("");
      setContent("");
      setTag([]);
      toast.success("Note created successfully!");
    } catch (error) {
      toast.error("Error creating note");
    }
  };

  //  Update Note
  const updateNote = async (id) => {
    if (!title || !content) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      const response = await axios.put(
        `${BASE_URL}/api/note/update/${id}`,
        { title, content, tags: tag },
        { withCredentials: true }
      );
      const d = openEditModal.data;
      setNotes((prevNotes) =>
        prevNotes.map(
          (note) => (note._id === id ? { ...note, ...d } : note) // Update matching note with new data
        )
      );
      fetchNotes();
      setOpenEditModal({ isShown: false, type: "add", data: null });
      setTitle("");
      setContent("");
      setTag([]);
      toast.success("Successfully updated!");
    } catch (error) {
      toast.error("Error updating note");
    }
  };

  //  Delete Note
  const noteDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/note/delete/${id}`, {
        withCredentials: true,
      });
      setNotes(notes.filter((note) => note._id !== id));
      toast.success("Successfully Deleted");
    } catch (error) {
      toast.error("Error deleting note");
    }
  };

  // 📅 Format Date & Time
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };
  };

  const getUsernameFromToken = () => {
    const token = localStorage.getItem("jwt"); // Get token from storage

    if (!token) return null; // Return null if no token exists

    try {
      const [, payload] = token.split("."); // JWT has three parts: header, payload, signature
      const decodedPayload = JSON.parse(atob(payload)); // Decode Base64 payload
      return decodedPayload.username || decodedPayload.name || null; // Extract username
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  // Usage
  const userName = getUsernameFromToken();

  //search querry
  let filteredData = notes;

  if (searchQuery.length !== 0) {
    filteredData = notes.filter((item) =>
      item.title.toLowerCase().includes(searchQuery)
    );
  }

  //  Pin Note
  const handlePin = async (id) => {
    try {
      // Find the note to get its current pinned state
      const noteToUpdate = notes.find((note) => note._id === id);
      if (!noteToUpdate) {
        toast.error("Note not found");
        return;
      }

      const updatedPinnedStatus = !noteToUpdate.isPinned;

      // Send request to update pin status in the backend
      await axios.put(
        `${BASE_URL}/api/note/updatePinned/${id}`,
        { isPinned: updatedPinnedStatus },
        { withCredentials: true }
      );

      // Update pinned notes state
      setPinnedNotes((prev) =>
        prev.includes(id)
          ? prev.filter((noteId) => noteId !== id)
          : [...prev, id]
      );

      // Update notes state and sort pinned notes to the top
      setNotes((prevNotes) => {
        const updatedNotes = prevNotes.map((note) =>
          note._id === id ? { ...note, isPinned: updatedPinnedStatus } : note
        );

        // Sort: Pinned notes first
        return updatedNotes.sort((a, b) => b.isPinned - a.isPinned);
      });

      toast.success("Pin status updated!");
    } catch (error) {
      toast.error("Error updating pin");
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Toaster />
      <div className="min-h-screen w-full bg-gray-900 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-gray-300 animate-fadeIn">
            {/* Spinner */}
            <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>

            {/* Loading Message */}
            <span className="mt-4 text-lg font-medium">
              Loading, please wait...
            </span>
          </div>
        ) : (
          <div className="w-full min-h-screen flex flex-col items-center justify-start p-10">
            <h1 className="text-4xl font-bold mb-6 text-center text-blue-400 animate-fadeIn">
              NeoNote's Dashboard
            </h1>
            <p className="text-lg text-gray-300 mb-8 text-center max-w-2xl mx-auto animate-fadeInSlow">
              Welcome to{" "}
              <span className="font-semibold text-cyan-400">NeoNotes</span>{" "}
              Dashboard! Manage your notes efficiently and stay organized.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-slideUp">
              {Array.isArray(notes) &&
                notes.length > 0 &&
                filteredData.map((note) => {
                  const isPinned = pinnedNotes.includes(note._id);
                  const { date: createdDate, time: createdTime } =
                    formatDateTime(note.createdAt);
                  const { date: updatedDate, time: updatedTime } =
                    formatDateTime(note.updatedAt);

                  return (
                    <div
                      key={note._id}
                      className={`relative p-5 rounded-lg shadow-md transition-all 
                           bg-gray-800 border border-gray-700 
                           hover:shadow-lg hover:scale-105 duration-200 ${
                             note.isPinned ? "border-yellow-400" : ""
                           }`}
                    >
                      {/* Pin Icon */}
                      <GrFormPin
                        className={`absolute top-3 right-3 text-2xl cursor-pointer transition-all 
                             ${
                               note.isPinned
                                 ? "text-yellow-400 rotate-45"
                                 : "text-gray-400 hover:text-gray-500"
                             }`}
                        onClick={() => handlePin(note._id)}
                      />

                      {/* Title & Date */}
                      <h2 className="text-lg font-semibold text-white">
                        {note.title}
                      </h2>
                      <span className="text-sm text-gray-400">
                        Created: {createdDate} • {createdTime}
                      </span>
                      {note.updatedAt && note.updatedAt !== note.createdAt && (
                        <span className="text-sm text-gray-500 block">
                          (Updated: {updatedDate} • {updatedTime})
                        </span>
                      )}

                      {/* Content */}
                      <p className="mt-2 text-sm text-gray-300">
                        {note.content}
                      </p>

                      {/* Tags */}

                      {note.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {helpFun(note.tags).map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-xs font-medium text-blue-300 bg-blue-700 rounded-lg"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex justify-end gap-3 mt-4 text-xl">
                        <IoMdCreate
                          className="cursor-pointer text-green-400 hover:text-green-500 transition-all"
                          onClick={() =>
                            setOpenEditModal({
                              isShown: true,
                              type: "edit",
                              data: note,
                            })
                          }
                        />

                        <MdOutlineDelete
                          className="cursor-pointer text-red-400 hover:text-red-500 transition-all"
                          onClick={() => noteDelete(note._id)}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
            {notes.length === 0 && (
              <div className="flex justify-center items-center">
                <div className="bg-gray-800  shadow-lg rounded-2xl p-6 max-w-md text-center">
                  <img
                    src={img2}
                    alt="Notes Preview"
                    className="rounded-lg mx-auto mb-4"
                  />
                  <h2 className="text-2xl font-semibold text-gray-100">
                    No Notes Available
                  </h2>
                  <p className="text-gray-100 mt-2">
                    You need tap on + to create and manage your notes.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Floating Add Button */}
      {userName && (
        <button
          className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-2xl bg-[#2B85FF] hover:bg-blue-600 
        fixed right-5 bottom-5 md:right-10 md:bottom-10 cursor-pointer shadow-lg transition-all duration-300 transform hover:scale-110"
          onClick={() =>
            setOpenEditModal({ isShown: true, type: "add", data: null })
          }
        >
          <IoIosAdd />
        </button>
      )}

      {/* Modal for Adding/Editing Notes */}
      <Modal
        ariaHideApp={false}
        isOpen={openEditModal.isShown}
        onRequestClose={() =>
          setOpenEditModal({ isShown: false, type: "add", data: null })
        }
        className="bg-white p-6 rounded-lg shadow-xl w-96 mx-auto mt-20"
        overlayClassName="fixed inset-0 backdrop-blur-md bg-gray-900 bg-opacity-30 flex justify-center items-center"
      >
        <h2 className="text-xl font-semibold mb-4">
          {openEditModal.type === "add" ? "Add Note" : "Edit Note"}
        </h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full h-12 p-2 border rounded-md mb-3"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 h-20 border rounded-md mb-3"
        />
        <textarea
          placeholder="Tags"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="w-full p-2 h-12 border rounded-md mb-3"
        />

        <div className="flex justify-end gap-3 mt-4">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md cursor-pointer"
            onClick={() => setOpenEditModal({ isShown: false })}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md cursor-pointer"
            onClick={() =>
              openEditModal.type === "add"
                ? createNote()
                : updateNote(openEditModal.data._id)
            }
          >
            {openEditModal.type === "add" ? "Add" : "Update"}
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Home;
