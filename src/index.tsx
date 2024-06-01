import { Hono } from 'hono'
import { renderer } from './renderer'

const app = new Hono()

app.use(renderer)

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

export default app
