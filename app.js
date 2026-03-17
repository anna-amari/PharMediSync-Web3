const express = require('express');
const path    = require('path');
const app     = express();
const PORT    = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}]  ${req.method}  ${req.url}`);
  next();
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/',             require('./routes/dashboard'));
app.use('/inventory',    require('./routes/inventory'));
app.use('/supplier',     require('./routes/supplier'));
app.use('/sales',        require('./routes/sales'));
app.use('/client',       require('./routes/client'));
app.use('/pos',          require('./routes/pos'));
app.use('/reports',      require('./routes/reports'));
app.use('/bir',          require('./routes/bir'));
app.use('/chatbot',      require('./routes/chatbot'));
app.use('/announcement', require('./routes/announcement'));

app.use('/client-portal', require('./routes/client-portal'));
const clientPortalRoutes = require('./routes/client-portal');
app.use('/client-portal', clientPortalRoutes);

app.use('/website', require('./routes/website'));

// ERROR HANDLING
app.use((req, res) => {
  res.status(404).render('pages/404', { title: '404 – Not Found', active: '' });
});



app.listen(PORT, () => {
  console.log(`\PharMediSync is running → http://localhost:${PORT}\n`);
});