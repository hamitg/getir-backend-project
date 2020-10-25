const app = require('./app');

app.listen(process.env.PORT || 3000, () => {
  console.log(`Getir-Backend-Project app is listening on port ${process.env.PORT || 3000}`);
});