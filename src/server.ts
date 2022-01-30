import app from './app/app';

process.on('SIGTERM', () => {
  process.exit();
});

app.listen(3333, () => console.log('Server was started...'));
