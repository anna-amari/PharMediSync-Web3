const express = require('express');
const router  = express.Router();

const currentClient = {
  id: 'CL-001', name: 'LGU Iriga City',
  contact: 'Mr. Kael Chua', phone: '09171110001',
  email: 'lgu@irigacity.gov.ph', type: 'LGU',
  creditLimit: 200000, balance: 45000
};

const catalog = [
  { id:'P001', name:'BP Apparatus',     category:'Equipment',  price:850,  stock:45, unit:'pcs',  icon:'🩺' },
  { id:'P002', name:'Gauze Roll',        category:'Consumable', price:35,   stock:8,  unit:'rolls',icon:'🩹' },
  { id:'P003', name:'Alcohol 70%',       category:'Consumable', price:45,   stock:120,unit:'btls', icon:'🧴' },
  { id:'P004', name:'Paracetamol 500mg', category:'Medicine',   price:8,    stock:500,unit:'tabs', icon:'💊' },
  { id:'P005', name:'Sterile Gloves L',  category:'PPE',        price:120,  stock:200,unit:'prs',  icon:'🧤' },
  { id:'P006', name:'Surgical Mask',     category:'PPE',        price:15,   stock:5,  unit:'boxes',icon:'😷' },
  { id:'P007', name:'Syringe 5mL',       category:'Consumable', price:18,   stock:300,unit:'pcs',  icon:'💉' },
  { id:'P008', name:'Povidone Iodine',   category:'Consumable', price:65,   stock:30, unit:'btls', icon:'🫙' },
];

const orders = [
  { id:'SO-2041', date:'2025-03-10', items:8,  total:45000, payment:'Invoiced', delivery:'In Transit', status:'Active'    },
  { id:'SO-2040', date:'2025-03-01', items:3,  total:9800,  payment:'Paid',     delivery:'Delivered',  status:'Completed' },
  { id:'SO-2038', date:'2025-02-20', items:6,  total:27500, payment:'Paid',     delivery:'Delivered',  status:'Completed' },
];

const invoices = [
  { id:'INV-3021', orderId:'SO-2041', amount:45000, issued:'2025-03-10', due:'2025-04-10', paid:false },
  { id:'INV-3018', orderId:'SO-2040', amount:9800,  issued:'2025-03-01', due:'2025-04-01', paid:true  },
  { id:'INV-3015', orderId:'SO-2038', amount:27500, issued:'2025-02-20', due:'2025-03-20', paid:true  },
];

const deliveries = [
  { id:'DEL-501', orderId:'SO-2041', scheduledDate:'2025-03-14', address:'LGU Iriga City Hall, Iriga City', status:'In Transit', driver:'Juan Dela Cruz', contact:'09181234567' },
  { id:'DEL-498', orderId:'SO-2040', scheduledDate:'2025-03-05', address:'LGU Iriga City Hall, Iriga City', status:'Delivered',  driver:'Pedro Santos',   contact:'09182345678' },
];

const notifications = [
  { id:1, type:'info',    message:'Your order SO-2041 is now In Transit. Expected delivery: March 14.',  time:'2 hours ago',  read:false },
  { id:2, type:'success', message:'Invoice INV-3018 payment confirmed. Thank you!',                       time:'2 days ago',   read:false },
  { id:3, type:'warning', message:'Invoice INV-3021 is due on April 10. Please prepare payment.',         time:'3 days ago',   read:true  },
  { id:4, type:'info',    message:'New announcement: BIR RR 11-2025 compliance update.',                  time:'5 days ago',   read:true  },
];

const announcements = [
  { id:1, title:'System Maintenance – March 15',            body:'PharMediSync will undergo scheduled maintenance on March 15, 2025 from 12:00 AM to 4:00 AM.',         date:'2025-03-10', priority:'High'   },
  { id:2, title:'New BIR Receipt Format Effective April 1', body:'In compliance with BIR RR 11-2025, all official receipts will be updated to the new format.',          date:'2025-03-08', priority:'High'   },
  { id:3, title:'Holiday Notice – Araw ng Kagitingan',      body:'Office will be closed on April 9, 2025. Orders received on this date will be processed next day.',     date:'2025-03-01', priority:'Low'    },
];

// Home
router.get('/', (req, res) => {
  res.render('client-portal/home', {
    title: 'Client Dashboard', active: 'home',
    client: currentClient, orders, notifications,
    unread: notifications.filter(n => !n.read).length
  });
});

// Product Catalog
router.get('/catalog', (req, res) => {
  res.render('client-portal/catalog', {
    title: 'Product Catalog', active: 'catalog',
    client: currentClient, catalog,
    unread: notifications.filter(n => !n.read).length
  });
});

// Purchase Order Management
router.get('/orders', (req, res) => {
  res.render('client-portal/orders', {
    title: 'Purchase Order Management', active: 'orders',
    client: currentClient, orders, catalog,
    unread: notifications.filter(n => !n.read).length
  });
});

router.post('/client-orders/place', (req, res) => {
  orders.unshift({
    id:       'SO-' + (2050 + orders.length),
    date:     new Date().toISOString().split('T')[0],
    items:    parseInt(req.body.itemCount) || 1,
    total:    parseFloat(req.body.total)   || 0,
    payment:  'Unpaid',
    delivery: 'Pending',
    status:   'Active'
  });
  res.redirect('/client-portal/orders');
});

// Delivery Schedule
router.get('/delivery', (req, res) => {
  res.render('client-portal/delivery', {
    title: 'Delivery Schedule', active: 'delivery',
    client: currentClient, deliveries,
    unread: notifications.filter(n => !n.read).length
  });
});

// Order Tracking
router.get('/tracking', (req, res) => {
  res.render('client-portal/tracking', {
    title: 'Order Tracking', active: 'tracking',
    client: currentClient, orders, deliveries,
    unread: notifications.filter(n => !n.read).length
  });
});

// Transaction History
router.get('/history', (req, res) => {
  res.render('client-portal/history', {
    title: 'Transaction History', active: 'history',
    client: currentClient, orders,
    unread: notifications.filter(n => !n.read).length
  });
});

// Invoices
router.get('/invoices', (req, res) => {
  res.render('client-portal/invoices', {
    title: 'Invoice and Payment Records', active: 'invoices',
    client: currentClient, invoices,
    totalUnpaid: invoices.filter(i => !i.paid).reduce((s,i) => s + i.amount, 0),
    unread: notifications.filter(n => !n.read).length
  });
});

// Profile
router.get('/profile', (req, res) => {
  res.render('client-portal/profile', {
    title: 'Profile Management', active: 'profile',
    client: currentClient,
    unread: notifications.filter(n => !n.read).length
  });
});

// Notifications & Announcements
router.get('/notifications', (req, res) => {
  res.render('client-portal/notifications', {
    title: 'Notifications & Announcements', active: 'notifications',
    client: currentClient, notifications, announcements,
    unread: notifications.filter(n => !n.read).length
  });
});

// Add this with your other routes
router.get('/test', (req, res) => {
  console.log('Test route accessed');
  console.log('Current views path:', req.app.get('views'));
  
  res.render('client-portal/test', {
    title: 'Test Page',
    client: {
      name: 'Test Client',
      contact: 'TC',
      type: 'Test',
      balance: 0,
      creditLimit: 10000
    },
    active: 'home',
    unread: 0,
    orders: [],
    notifications: []
  });
});

module.exports = router;