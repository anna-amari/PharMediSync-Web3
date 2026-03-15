const express = require('express');
const router  = express.Router();

const clients = [
  {
    id: 'CL-001',
    name: 'LGU Iriga',
    contact: 'Mr. Tyler Cervando',
    phone: '09171110001',
    email: 'lgu@irigacity.gov.ph',
    type: 'LGU',
    creditLimit: 200000,
    balance: 45000,
    status: 'Active'
  },
  {
    id: 'CL-002',
    name: 'RHU Baao',
    contact: 'Dr. Maria Santos',
    phone: '09172223344',
    email: 'rhu.baao@gov.ph',
    type: 'Health Unit',
    creditLimit: 150000,
    balance: 18500,
    status: 'Active'
  },
  {
    id: 'CL-003',
    name: 'BFAR Iriga',
    contact: 'Engr. Joel Ramos',
    phone: '09173334455',
    email: 'bfar.iriga@gov.ph',
    type: 'Agency',
    creditLimit: 300000,
    balance: 62000,
    status: 'Active'
  }
];

/* ===============================
   CLIENT LIST PAGE
================================ */
router.get('/', (req, res) => {
  res.render('pages/client', {
    title:  'Client Portal',
    active: 'clients',
    clients,
    totalClients: clients.length,
    totalReceivables: clients.reduce((sum, c) => sum + c.balance, 0)
  });
});

/* ===============================
   ADD NEW CLIENT
================================ */
router.post('/add', (req, res) => {
  const { name, contact, phone, email, type, creditLimit } = req.body;

  clients.unshift({
    id: 'CL-' + String(1000 + clients.length + 1),
    name,
    contact,
    phone,
    email,
    type,
    creditLimit: parseFloat(creditLimit) || 0,
    balance: 0,
    status: 'Active'
  });

  res.redirect('/client');
});

module.exports = router;