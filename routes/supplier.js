const express = require('express');
const router  = express.Router();

const suppliers = [
  { id:'SUP-001', name:'MedSupply PH Inc.',      contact:'Juan Cruz',    phone:'09171234567', email:'juan@medsupply.ph',    address:'Quezon City',  status:'Active',   rating:4.8 },
  { id:'SUP-002', name:'HealthCare Depot',        contact:'Maria Reyes',  phone:'09281234567', email:'maria@hcdepot.ph',      address:'Makati City',  status:'Active',   rating:4.5 },
  { id:'SUP-003', name:'PharmaDirect Corp.',      contact:'Pedro Santos', phone:'09391234567', email:'pedro@pharmadirect.ph', address:'Pasig City',   status:'Inactive', rating:3.9 },
  { id:'SUP-004', name:'Bicolmed Supplies',       contact:'Ana Lim',      phone:'09501234567', email:'ana@bicolmed.ph',       address:'Naga City',    status:'Active',   rating:4.7 },
];

const purchaseOrders = [
  { id:'PO-1042', supplier:'MedSupply PH Inc.',  date:'2025-03-01', items:5, total:12500, status:'Approved'  },
  { id:'PO-1041', supplier:'HealthCare Depot',   date:'2025-02-25', items:3, total:8750,  status:'Delivered' },
  { id:'PO-1040', supplier:'Bicolmed Supplies',  date:'2025-02-20', items:7, total:21000, status:'Pending'   },
  { id:'PO-1039', supplier:'PharmaDirect Corp.', date:'2025-02-15', items:2, total:5200,  status:'Cancelled' },
];

router.get('/', (req, res) => {
  res.render('pages/supplier', {
    title: 'Supplier Management',
    active: 'supplier',
    suppliers,
    purchaseOrders
  });
});

router.post('/add', (req, res) => {
  const { name, contact, phone, email, address } = req.body;
  suppliers.push({ id: 'SUP-00' + (suppliers.length+1), name, contact, phone, email, address, status:'Active', rating: 4.0 });
  res.redirect('/supplier');
});

module.exports = router;
