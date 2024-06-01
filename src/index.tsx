import { Hono } from 'hono'
import { renderer } from './renderer'
import { showRoutes } from 'hono/dev';

import jsonWise from './json';
import htmlWise from './html';
import colorWise from './Color';
import { Alphabet } from './Alphabet';
import { logger } from 'hono/logger';

const app = new Hono()

app.use(renderer)
app.use(logger()) // middleware


app.get('/', (c) => {
  return c.render(<h1>Hello!</h1>)
})

// set custom headers
app.get('/welcome', (c) => {
  c.header('X-Message', 'Hello!');
  c.header('Content-Type', 'text/plain');
  return c.body('welcome, see header part of request');
});

// multiple path 
app.on('GET', ['/hello', '/hi', '/hey'], (c) => c.text('🙋🏻‍♂️ Hello' ));

// MARK: json support
app.route('/json', jsonWise);

// MARK: HTML support
app.route('/html', htmlWise);

// MARK: JSX Support
app.get('/alphabet', (c) => {
  return c.html(<Alphabet/>)
});

// MARK: CSS support
app.route('/color', colorWise);

app.onError((err, c) => {
  console.error(`${err}`)
  return c.text('Custom Error Message', 500)
});

showRoutes(app);

export default app
