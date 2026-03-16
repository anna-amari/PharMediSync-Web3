const express = require('express');
const router  = express.Router();

const reportData = {
  monthlySales: [
    { month:'Sep 2024', gross:88400,  vatable:78929, vat:10571, net:78929 },
    { month:'Oct 2024', gross:102300, vatable:91340, vat:10960, net:91340 },
    { month:'Nov 2024', gross:95700,  vatable:85446, vat:10254, net:85446 },
    { month:'Dec 2024', gross:134200, vatable:119821,vat:14379, net:119821},
    { month:'Jan 2025', gross:98500,  vatable:87946, vat:10554, net:87946 },
    { month:'Feb 2025', gross:112000, vatable:100000,vat:12000, net:100000},
  ],
  inventoryMovement: [
    { product:'BP Apparatus',     received:20, sold:8,  adjusted:0, closing:45 },
    { product:'Gauze Roll',        received:50, sold:42, adjusted:0, closing:8  },
    { product:'Alcohol 70%',       received:200,sold:80, adjusted:0, closing:120},
    { product:'Paracetamol 500mg', received:1000,sold:500,adjusted:0,closing:500},
  ],
  supplierPerformance: [
    { supplier:'MedSupply PH',    orders:12, onTime:11, defects:0, score:4.8 },
    { supplier:'HealthCare Depot',orders:8,  onTime:7,  defects:1, score:4.5 },
    { supplier:'Bicolmed Supplies',orders:6, onTime:6,  defects:0, score:4.7 },
  ]
};

router.get('/', (req, res) => {
  res.render('pages/reports', {
    title:      'Reports & Analytics',
    active:     'reports',
    reportData
  });
});

module.exports = router;
