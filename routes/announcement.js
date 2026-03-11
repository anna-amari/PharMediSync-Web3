const express = require('express');
const router  = express.Router();

const announcements = [
  { id:1, title:'System Maintenance – March 15',         body:'PharMediSync will undergo scheduled maintenance on March 15, 2025 from 12:00 AM to 4:00 AM. All modules will be temporarily unavailable.', date:'2025-03-10', audience:'All Users',   priority:'High'   },
  { id:2, title:'New BIR Receipt Format Effective April 1', body:'In compliance with BIR RR 11-2025, all official receipts will be updated to the new format starting April 1, 2025.',                    date:'2025-03-08', audience:'All Users',   priority:'High'   },
  { id:3, title:'Updated Supplier Payment Terms',         body:'Effective March 20, payment terms for MedSupply PH and HealthCare Depot have been updated to NET-30.',                                    date:'2025-03-05', audience:'Admin, Staff', priority:'Medium' },
  { id:4, title:'Holiday Notice – Araw ng Kagitingan',   body:'Office will be closed on April 9, 2025 in observance of Araw ng Kagitingan. Orders received on this date will be processed next business day.', date:'2025-03-01', audience:'All Users', priority:'Low'   },
];

router.get('/', (req, res) => {
  res.render('pages/announcement', {
    title:         'Announcements',
    active:        'announcement',
    announcements
  });
});

router.post('/add', (req, res) => {
  const { title, body, audience, priority } = req.body;
  announcements.unshift({
    id:       announcements.length + 1,
    title, body, audience, priority,
    date:     new Date().toISOString().split('T')[0]
  });
  res.redirect('/announcement');
});

module.exports = router;
