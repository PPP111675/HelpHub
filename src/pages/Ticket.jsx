import { useEffect, useState } from "react";
import api from "../services/api";

const Ticket = () => {
  const [msg, setMsg] = useState("");
  const [priority, setPriority] = useState("medium");
  const [statusMsg, setStatusMsg] = useState("");
  const [userTickets, setUserTickets] = useState([]);

  // Fetch user's previous tickets on mount
  useEffect(() => {
    fetchUserTickets();
  }, []);

  const fetchUserTickets = async () => {
    try {
      const { data } = await api.get("/tickets/me"); // Make sure this route exists
      setUserTickets(data);
    } catch (err) {
      console.error("Error fetching tickets:", err);
    }
  };

  const submit = async () => {
    if (!msg.trim()) {
      setStatusMsg("Please enter a message.");
      return;
    }

    try {
      await api.post("/tickets", { message: msg, priority });
      setStatusMsg("✅ Support ticket submitted.");
      setMsg("");
      setPriority("medium");
      fetchUserTickets(); // refresh list
    } catch (err) {
      setStatusMsg("❌ Failed to submit ticket.");
    }
  };

  const statusColor = (status) => {
    return {
      open: "text-green-600",
      pending: "text-yellow-600",
      closed: "text-red-600"
    }[status] || "text-gray-600";
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Submit a Support Ticket</h2>

      <textarea
        placeholder="Describe your issue..."
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        rows={5}
        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300 mb-4"
      />

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Priority:</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <button
        onClick={submit}
        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
      >
        Submit Ticket
      </button>

      {statusMsg && <p className="mt-4 text-sm text-gray-700">{statusMsg}</p>}

      {/* Previous Tickets */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-2">Your Previous Tickets</h3>
        {userTickets.length === 0 ? (
          <p className="text-gray-500">No previous tickets found.</p>
        ) : (
          <ul className="space-y-3">
            {userTickets.map((ticket) => (
              <li
                key={ticket._id}
                className="border border-gray-200 p-4 rounded shadow-sm bg-gray-50"
              >
                <p className="text-gray-800 mb-1">
                  <strong>Message:</strong> {ticket.message}
                </p>
                <p className="text-sm text-gray-600">
                  Priority: <strong>{ticket.priority}</strong> —{" "}
                  <span className={statusColor(ticket.status)}>
                    {ticket.status.toUpperCase()}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Ticket;
