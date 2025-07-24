import Ticket from "../models/Ticket.js";

export const createTicket = async (req, res) => {
  const userId = req.user?._id || req.body.userId;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  const { message, priority = "medium" } = req.body;

  const ticket = await Ticket.create({
    userId,
    message,
    status: "open",
    priority,
  });

  res.status(201).json({ message: "Ticket created", ticket });
};

export const getTickets = async (req, res) => {
  const tickets = await Ticket.find()
    .populate("userId", "name email") // <== populate user fields you want
    .sort({ createdAt: -1 }); // Optional: sort by newest first

  // Optionally rename userId -> user for cleaner frontend
  const enrichedTickets = tickets.map((ticket) => ({
    ...ticket._doc,
    user: ticket.userId,
  }));

  res.json(enrichedTickets);
};

export const updateTicketStatus = async (req, res) => {
  const ticket = await Ticket.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(ticket);
};
export const getMyTickets = async (req, res) => {
  const tickets = await Ticket.find({ userId: req.user._id }).sort({ createdAt: -1 });
  res.json(tickets);
};