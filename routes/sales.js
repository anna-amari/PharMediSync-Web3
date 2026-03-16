const express = require('express');
const router  = express.Router();

const salesOrders = [
  { id:'SO-2041', client:'LGU Iriga',         date:'2025-03-10', items:8,  total:45000, payment:'Invoiced',  delivery:'In Transit',  status:'Active'    },
  { id:'SO-2040', client:'RHU Baao',           date:'2025-03-08', items:4,  total:18500, payment:'Paid',      delivery:'Delivered',   status:'Completed' },
  { id:'SO-2039', client:'BFAR Iriga',         date:'2025-03-05', items:12, total:62000, payment:'Unpaid',    delivery:'Pending',     status:'Active'    },
  { id:'SO-2038', client:'Iriga City Hall',    date:'2025-03-01', items:3,  total:9800,  payment:'Invoiced',  delivery:'Delivered',   status:'Completed' },
  { id:'SO-2037', client:'LGU Nabua',          date:'2025-02-28', items:6,  total:27500, payment:'Paid',      delivery:'Delivered',   status:'Completed' },
];

router.get('/', (req, res) => {
  res.render('pages/sales', {
    title:       'Sales Orders',
    active:      'sales',
    salesOrders,
    totalSales:  salesOrders.reduce((s,o) => s + o.total, 0)
  });
});

router.post('/add', (req, res) => {
  const { client, items, total, payment } = req.body;
  salesOrders.unshift({
    id:       'SO-' + (2042 + salesOrders.length),
    client, items: parseInt(items), total: parseFloat(total),
    payment:  payment || 'Unpaid',
    delivery: 'Pending',
    status:   'Active',
    date:     new Date().toISOString().split('T')[0]
  });
  res.redirect('/sales');
});

module.exports = router;
