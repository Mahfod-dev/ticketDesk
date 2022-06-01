const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Ticket = require('../models/ticketsModel');

//get all tickets
exports.getTickets = asyncHandler(async (req, res) => {
  //Get user using the id in the JWT
  console.log(req.user.id);
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const tickets = await Ticket.find({ user: req.user.id });

  res.status(200).json({ numberofTickets: tickets.length, tickets });
});

//getOneTicket
exports.getTicket = asyncHandler(async (req, res) => {
  console.log(req.params.id);
  console.log(req.user.id);
  const user = await User.findById(req.user.id);
  console.log(user);
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }
  console.log(ticket.user.toString(), req.user.id);

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not Authorized');
  }

  res.status(200).json(ticket);
});

//create Ticket
exports.createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body;

  if (!product || !description) {
    res.status(400);
    throw new Error('User not found');
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: 'new',
  });

  res.status(201).json(ticket);
});

//delete Ticket

exports.deleteTicket = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await User.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }
  if (ticket.id !== req.user.id) {
    res.status(401);
    throw new Error('Not Authorized');
  }

  await ticket.remove();

  res.status(200).json({ success: true });
});
