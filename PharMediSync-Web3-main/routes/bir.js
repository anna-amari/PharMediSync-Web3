const express = require('express');
const router  = express.Router();

const birRecords = [
  { orNo:'OR-0088', date:'2025-03-11', customer:'Walk-in', grossSales:915,  vatableSales:816.96, vatAmount:98.04,  total:915   },
  { orNo:'OR-0087', date:'2025-03-11', customer:'Walk-in', grossSales:850,  vatableSales:758.93, vatAmount:91.07,  total:850   },
  { orNo:'OR-0086', date:'2025-03-10', customer:'Walk-in', grossSales:186,  vatableSales:166.07, vatAmount:19.93,  total:186   },
  { orNo:'OR-0085', date:'2025-03-10', customer:'LGU Iriga',grossSales:45000,vatableSales:40178.57,vatAmount:4821.43,total:45000},
  { orNo:'OR-0084', date:'2025-03-09', customer:'Walk-in', grossSales:520,  vatableSales:464.29, vatAmount:55.71,  total:520   },
];

router.get('/', (req, res) => {
  const totals = birRecords.reduce((acc, r) => ({
    gross:   acc.gross   + r.grossSales,
    vatable: acc.vatable + r.vatableSales,
    vat:     acc.vat     + r.vatAmount
  }), { gross:0, vatable:0, vat:0 });

  res.render('pages/bir', {
    title:      'BIR Compliance',
    active:     'bir',
    birRecords,
    totals
  });
});

module.exports = router;
