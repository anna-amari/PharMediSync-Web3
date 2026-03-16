const express = require('express');
const router  = express.Router();

const products = [
  { id:'P001', name:'BP Apparatus',     price:850,  icon:'🩺', stock:45 },
  { id:'P002', name:'Gauze Roll',        price:35,   icon:'🩹', stock:8  },
  { id:'P003', name:'Alcohol 70%',       price:45,   icon:'🧴', stock:120},
  { id:'P004', name:'Paracetamol 500mg', price:8,    icon:'💊', stock:500},
  { id:'P005', name:'Sterile Gloves L',  price:120,  icon:'🧤', stock:200},
  { id:'P006', name:'Surgical Mask',     price:15,   icon:'😷', stock:5  },
  { id:'P007', name:'Syringe 5mL',       price:18,   icon:'💉', stock:300},
  { id:'P008', name:'Povidone Iodine',   price:65,   icon:'🫙', stock:30 },
];

const recentTransactions = [
  { id:'OR-0088', items:3, subtotal:915,  vat:109.80, total:1024.80, method:'Cash',   time:'10:32 AM' },
  { id:'OR-0087', items:1, subtotal:850,  vat:102,    total:952,     method:'GCash',  time:'10:15 AM' },
  { id:'OR-0086', items:5, subtotal:186,  vat:22.32,  total:208.32,  method:'Cash',   time:'09:58 AM' },
];

router.get('/', (req, res) => {
  res.render('pages/pos', {
    title:               'Point of Sale',
    active:              'pos',
    products,
    recentTransactions
  });
});

router.post('/process', (req, res) => {
  res.redirect('/pos');
});

module.exports = router;
