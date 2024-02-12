import app from './app'

const port = 8080;

app.listen(port, () => {
  console.warn(`App listening on port ${port}`);
  console.warn(`Started At: ${new Date()}`);
});
