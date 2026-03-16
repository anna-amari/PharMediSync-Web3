const express = require('express');
const router  = express.Router();

const dashboardData = {
  kpi: {
    salesPending: 24,
    inTransit:    19,
    delivered:    100,
    qtyOnHand:    670,
    qtyToReceive: 150
  },
  productDetails: {
    allItems:  500,
    lowStock:  20,
    expired:   94,
    products:  1078
  },
  sales: {
    deliveryToClient: 65,
    walkInCustomer:   35
  },
  topClients:  ['LGU Iriga', 'RHU Baao', 'BFAR Iriga'],
  topProducts: ['BP Apparatus', 'Gauze', 'Alcohol 70%', 'Paracetamol'],
  recentActivity: [
    { time: '09:14 AM', event: 'PO #1042 approved for MedSupply PH',   type: 'success' },
    { time: '09:02 AM', event: 'Low stock alert: Gauze (8 pcs left)',   type: 'warning' },
    { time: '08:55 AM', event: 'Walk-in sale ₱1,250 processed',         type: 'info'    },
    { time: '08:30 AM', event: 'GRR #204 recorded – 50 units received', type: 'success' },
    { time: '08:10 AM', event: 'Near-expiry: Povidone 500ml – 12 days', type: 'danger'  },
  ]
};

router.get('/', (req, res) => {
  res.render('pages/dashboard', {
    title:  'Admin Dashboard',
    active: 'dashboard',
    data:   dashboardData
  });
});

module.exports = router;
