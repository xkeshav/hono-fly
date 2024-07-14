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

// exclude 2345 ' 2353 / 2355 / 2356
const extraLetters = [2345, 2353,2356];
const varnmala = Array.from(Array(37),  (_, i) =>  ({code: 2325 +i , letter: String.fromCharCode(2325 + i)}) );
const varnmala_english = Array.from(Array(26),  (_, i) =>  ({code: 65 +i , letter: String.fromCharCode(65 + i)}) );
const varnmala_hindi = varnmala.filter( v => !extraLetters.includes(v.code) );

// MARK: JSX Support
app.get('/alphabet', (c) => {
  return c.html(<Alphabet title={'English Alphabet'} list={varnmala_english}/>)
});

app.get('/varnmala', (c) => {
  return c.html(<Alphabet title={'Hindi Varnmala'} list={varnmala_hindi}/>)
});

// MARK: CSS support
app.route('/color', colorWise);

app.onError((err, c) => {
  console.error(`${err}`)
  return c.text('Custom Error Message', 500)
});

showRoutes(app);

// change default port
// const port = 3000

// serve({
//   fetch: app.fetch,
//   port
// })

export default app
