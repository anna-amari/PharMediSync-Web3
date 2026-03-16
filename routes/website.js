const express = require('express');
const router  = express.Router();

const featuredProducts = [
  { sku:'BC-BP-001', name:'Blood Pressure Monitor Aneroid',     cat:'diagnostics', brand:'Rossmax',  icon:'🩺', desc:'Manual sphygmomanometer with stethoscope. 0-300 mmHg range.',            price:850,  unit:'pc',   stock:'In Stock',  badge:'Best Seller' },
  { sku:'IP-GL-010', name:'Sterile Latex Gloves Medium (100s)',  cat:'ppe',         brand:'Indoplas', icon:'🧤', desc:'Powder-free sterile latex examination gloves. Box of 100 pairs.',         price:280,  unit:'box',  stock:'In Stock',  badge:null          },
  { sku:'BC-SY-025', name:'Disposable Syringe 5mL',              cat:'surgical',    brand:'Blue Cross',icon:'💉',desc:'Sterile single-use syringe with 23G needle. FDA registered.',             price:8,    unit:'pc',   stock:'In Stock',  badge:'New Stock'   },
  { sku:'3M-MS-004', name:'N95 Respirator Mask (20s)',            cat:'ppe',         brand:'3M',       icon:'😷', desc:'NIOSH-approved N95 respirator. Adjustable nose clip. Box of 20.',        price:1200, unit:'box',  stock:'In Stock',  badge:null          },
  { sku:'IP-AL-002', name:'Isopropyl Alcohol 70% 500mL',          cat:'hygiene',     brand:'Indoplas', icon:'🧴', desc:'70% isopropyl alcohol 500mL. Effective against bacteria and viruses.',   price:65,   unit:'btl',  stock:'In Stock',  badge:null          },
  { sku:'RM-GK-008', name:'Pulse Oximeter Fingertip',             cat:'diagnostics', brand:'Rossmax',  icon:'🔬', desc:'Measures SpO2 and pulse rate. OLED display. CE and FDA cleared.',        price:1450, unit:'pc',   stock:'Low Stock', badge:'Sale'        },
  { sku:'BC-GZ-015', name:'Sterile Gauze Roll 4" x 4yd',          cat:'surgical',    brand:'Blue Cross',icon:'🩹',desc:'12-ply sterile gauze roll. Individually packaged. 10 per box.',          price:35,   unit:'roll', stock:'In Stock',  badge:null          },
  { sku:'AN-GV-003', name:'Nitrile Exam Gloves Large (100s)',      cat:'ppe',         brand:'Ansell',   icon:'🩺', desc:'Powder-free nitrile gloves, ambidextrous. 100 per box.',                 price:420,  unit:'box',  stock:'In Stock',  badge:null          },
  { sku:'IP-PV-011', name:'Povidone Iodine Solution 500mL',        cat:'hygiene',     brand:'Indoplas', icon:'🫙', desc:'10% povidone iodine antiseptic solution. Broad-spectrum antimicrobial.', price:95,   unit:'btl',  stock:'In Stock',  badge:null          },
  { sku:'BC-CT-020', name:'IV Catheter 20G (50s)',                  cat:'surgical',    brand:'Blue Cross',icon:'💉',desc:'Sterile IV peripheral catheter. Color-coded hub. Box of 50.',             price:650,  unit:'box',  stock:'In Stock',  badge:null          },
  { sku:'RM-TH-007', name:'Digital Thermometer',                   cat:'diagnostics', brand:'Rossmax',  icon:'🌡️',desc:'Fast 10-second reading digital thermometer. Memory recall feature.',      price:185,  unit:'pc',   stock:'In Stock',  badge:null          },
  { sku:'IP-SC-030', name:'Stethoscope Dual Head',                  cat:'diagnostics', brand:'Indoplas', icon:'🩺', desc:'Dual-head stethoscope, adult size. 22" tubing.',                         price:480,  unit:'pc',   stock:'Low Stock', badge:null          },
];

const news = [
  { icon:'📢', category:'Company News',    title:'Robin Rose Trading Launches PharMediSync Digital Platform',       excerpt:'We are proud to announce the launch of PharMediSync, our web-integrated operations and client management platform, enabling institutional clients to manage orders online.', date:'March 10, 2025', author:'Robin Rose Trading' },
  { icon:'📋', category:'Regulation',      title:'BIR Revenue Regulation 11-2025: New Receipt Format Requirements', excerpt:'The Bureau of Internal Revenue has issued new guidelines. All Robin Rose Trading transactions comply with the updated BIR requirements effective April 1, 2025.',           date:'March 8, 2025',  author:'Compliance Team'    },
  { icon:'💊', category:'New Products',    title:'New Arrivals: Rossmax Diagnostic Line Now Available',             excerpt:'We now carry the complete Rossmax diagnostic line including blood pressure monitors, glucose meters, and pulse oximeters. All FDA-registered.',                              date:'March 5, 2025',  author:'Product Team'       },
  { icon:'🏛️', category:'Government',     title:'Robin Rose Trading Awarded New PhilGEPS Supply Contract',          excerpt:'We are honored to have been awarded supply contracts with multiple LGUs in Camarines Sur for the 2025 health procurement program.',                                        date:'Feb 28, 2025',   author:'Sales Team'         },
  { icon:'🧤', category:'Health & Safety', title:'DOH Updates PPE Requirements for Rural Health Units',              excerpt:'The Department of Health has released updated PPE guidelines for Rural Health Units. Our PPE inventory meets all new specifications.',                                       date:'Feb 20, 2025',   author:'Compliance Team'    },
  { icon:'🎉', category:'Promotion',       title:'March Sale: 15% Off on Bulk Orders of Surgical Consumables',       excerpt:'This March, institutional clients get 15% off on bulk orders of surgical consumables for orders of ₱5,000 and above.',                                                       date:'Mar 1, 2025',    author:'Sales Team'         },
];

router.get('/',          (req, res) => res.render('website/home',      { title:'Home',      page:'home',      featuredProducts }));
router.get('/products',  (req, res) => res.render('website/products',  { title:'Products',  page:'products',  products: featuredProducts }));
router.get('/about',     (req, res) => res.render('website/about',     { title:'About Us',  page:'about'      }));
router.get('/contact',   (req, res) => res.render('website/contact',   { title:'Contact',   page:'contact'    }));
router.get('/resources', (req, res) => res.render('website/resources', { title:'Resources', page:'resources'  }));
router.get('/news',      (req, res) => res.render('website/news',      { title:'News',      page:'news',      news }));
router.post('/contact/send', (req, res) => res.redirect('/website/contact'));

module.exports = router;