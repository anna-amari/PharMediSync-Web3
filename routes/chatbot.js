const express = require('express');
const router  = express.Router();

const chatLogs = [
  { id:1, client:'LGU Iriga',      message:'Do you have Gauze in stock?',            reply:'We currently have 8 rolls of Gauze available.',              time:'10:31 AM', status:'Resolved' },
  { id:2, client:'RHU Baao',       message:'What is the price of BP Apparatus?',      reply:'BP Apparatus is priced at ₱850.00 per unit.',                time:'10:05 AM', status:'Resolved' },
  { id:3, client:'Walk-in Customer',message:'When will my order arrive?',             reply:null,                                                         time:'09:48 AM', status:'Escalated'},
  { id:4, client:'BFAR Iriga',     message:'Can I get a bulk discount on Paracetamol?',reply:null,                                                        time:'09:20 AM', status:'Pending'  },
];

const autoReplies = {
  'stock':    'Our current stock is updated in real-time. Please visit our Product Catalog for details.',
  'price':    'You can view all product prices on the Product Catalog page.',
  'order':    'Your order status is visible in the Order Tracking section.',
  'delivery': 'Delivery schedules are sent to your registered email and available in the Delivery Schedule page.',
  'invoice':  'Invoices are available under Invoice and Payment Records.',
};

router.get('/', (req, res) => {
  res.render('pages/chatbot', {
    title:    'Chatbot Handling',
    active:   'chatbot',
    chatLogs,
    autoReplies
  });
});

router.post('/reply', (req, res) => {
  const { id, reply } = req.body;
  const chat = chatLogs.find(c => c.id == id);
  if (chat) { chat.reply = reply; chat.status = 'Resolved'; }
  res.redirect('/chatbot');
});

module.exports = router;
