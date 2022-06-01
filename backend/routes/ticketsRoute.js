const express = require('express');

const router = express.Router();

const { protectToken } = require('../middleware/authMiddleware');

const {
  getTickets,
  createTicket,
  getTicket,
} = require('../controllers/ticketsController');

router
  .route('/')
  .get(protectToken, getTickets)
  .post(protectToken, createTicket)
  .get(protectToken, getTicket);

router.get('/:id', protectToken, getTicket);

module.exports = router;
