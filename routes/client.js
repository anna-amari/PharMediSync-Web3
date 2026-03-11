const express = require('express');
const router  = express.Router();

const clients = [
  { id:'CL-001', name:'LGU',                  contact:'Mr.Tyler Cervando', phone:'09171110001', email:'lgu@irigacity.gov.ph',  type:'LGU',      creditLimit:200000, balance:45000,  status:'Active' },
  { id:'CL-002', name:'RHU Baao',             contact:'Mr. Brent',      phone:'09172220002', email:'rhu@baao.gov.ph',        type:'Gov Health',creditLimit:100000, balance:18500,  status:'Active' },
  { id:'CL-003', name:'BFAR Iriga',           contact:'Shiloh',       phone:'09173330003', email:'bfar@iriga.ph',          type:'Government',creditLimit:300000, balance:62000,  status:'Active' },
  { id:'CL-004', name:'Iriga City Hall',      contact:'Josephine Abad',        phone:'09174440004', email:'cityhall@iriga.ph',      type:'LGU',       creditLimit:150000, balance:0,      status:'Active' },
  { id:'CL-005', name:'LGU Nabua',            contact:'Mayor Rosario Cruz',    phone:'09175550005', email:'lgu@nabua.gov.ph',       type:'LGU',       creditLimit:120000, balance:27500,  status:'Active' },
  { id:'CL-006', name:'St. Luke Clinic',      contact:'Dr. Brian Tan',         phone:'09176660006', email:'clinic@stluke.ph',       type:'Private',   creditLimit:80000,  balance:0,      status:'Inactive'},
];

router.get('/', (req, res) => {
  res.render('pages/client', {
    title:   'Institutional Clients',
    active:  'client',
    clients
  });
});

// Institutional Client Portal (separate role view)
router.get('/portal', (req, res) => {
  res.render('pages/client-portal', {
    title:  'Client Portal',
    active: 'client',
    client: clients[0],       // simulating logged-in client
    orders: [
      { id:'SO-2041', date:'2025-03-10', items:8,  total:45000, status:'In Transit' },
      { id:'SO-2038', date:'2025-03-01', items:3,  total:9800,  status:'Delivered'  },
      { id:'SO-2037', date:'2025-02-20', items:6,  total:27500, status:'Delivered'  },
    ],
    invoices: [
      { id:'INV-3021', orderId:'SO-2041', amount:45000, due:'2025-04-10', paid: false },
      { id:'INV-3018', orderId:'SO-2038', amount:9800,  due:'2025-04-01', paid: true  },
    ]
  });
});

router.post('/add', (req, res) => {
  const { name, contact, phone, email, type, creditLimit } = req.body;
  clients.push({
    id: 'CL-00'+(clients.length+1), name, contact, phone, email, type,
    creditLimit: parseFloat(creditLimit), balance: 0, status: 'Active'
  });
  res.redirect('/client');
});

module.exports = router;
