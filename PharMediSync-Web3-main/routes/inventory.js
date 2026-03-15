const express = require('express');
const router  = express.Router();

const inventory = [
  { id:'INV-001', name:'BP Apparatus',      category:'Equipment',   batch:'B-2024-01', qty:45, unit:'pcs',  expiry:'2027-06-01', status:'Good'      },
  { id:'INV-002', name:'Gauze Roll',         category:'Consumable',  batch:'B-2024-02', qty:8,  unit:'rolls',expiry:'2025-12-01', status:'Low Stock' },
  { id:'INV-003', name:'Alcohol 70%',        category:'Consumable',  batch:'B-2024-03', qty:120,unit:'btls', expiry:'2026-03-01', status:'Good'      },
  { id:'INV-004', name:'Povidone Iodine',    category:'Consumable',  batch:'B-2024-04', qty:30, unit:'btls', expiry:'2025-04-01', status:'Near Expiry'},
  { id:'INV-005', name:'Paracetamol 500mg',  category:'Medicine',    batch:'B-2024-05', qty:500,unit:'tabs', expiry:'2026-08-01', status:'Good'      },
  { id:'INV-006', name:'Sterile Gloves L',   category:'PPE',         batch:'B-2024-06', qty:200,unit:'prs',  expiry:'2028-01-01', status:'Good'      },
  { id:'INV-007', name:'Surgical Mask',      category:'PPE',         batch:'B-2024-07', qty:5,  unit:'boxes',expiry:'2026-05-01', status:'Low Stock' },
  { id:'INV-008', name:'Syringe 5mL',        category:'Consumable',  batch:'B-2024-08', qty:300,unit:'pcs',  expiry:'2027-09-01', status:'Good'      },
];

router.get('/', (req, res) => {
  res.render('pages/inventory', {
    title:     'Inventory Management',
    active:    'inventory',
    inventory,
    flash: null
  });
});

router.post('/add', (req, res) => {
  const { name, category, batch, qty, unit, expiry } = req.body;
  inventory.push({
    id:     'INV-00' + (inventory.length + 1),
    name, category, batch,
    qty:    parseInt(qty),
    unit, expiry,
    status: parseInt(qty) < 10 ? 'Low Stock' : 'Good'
  });
  res.redirect('/inventory');
});

module.exports = router;
