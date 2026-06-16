import { Hono } from 'hono';
import { logger } from 'hono/logger';
import type { Env } from './types';
import api from './routes/api';

const app = new Hono<{ Bindings: Env }>();

let envChecked = false;
app.use('*', async (c, next) => {
  if (!envChecked) {
    const missing: string[] = [];
    if (!c.env.GITHUB_APP_ID) missing.push('GITHUB_APP_ID');
    if (!c.env.GITHUB_PRIVATE_KEY) missing.push('GITHUB_PRIVATE_KEY');
    if (missing.length > 0) {
      console.warn(
        `[BugDrop] Missing env vars (feedback endpoint will fail): ${missing.join(', ')}`
      );
    }
    if (c.env.ALLOWED_ORIGINS === '*' && c.env.ENVIRONMENT !== 'development') {
      console.warn('WARNING: ALLOWED_ORIGINS is set to "*" in non-development environment');
    }
    if (isWeakAuthTokenSecret(c.env.AUTH_TOKEN_SECRET)) {
      console.warn('[BugDrop] AUTH_TOKEN_SECRET should be a long random value of at least 32 characters.');
    }
    if (hasWeakAdditionalAuthTokenSecret(c.env.AUTH_TOKEN_ADDITIONAL_SECRETS)) {
      console.warn('[BugDrop] AUTH_TOKEN_ADDITIONAL_SECRETS contains a value shorter than 32 characters.');
    }
    envChecked = true;
  }
  return next();
});

app.use('*', logger());
app.route('/api', api);

export function isWeakAuthTokenSecret(secret?: string): boolean {
  return typeof secret === 'string' && secret.length > 0 && secret.length < 32;
}

export function hasWeakAdditionalAuthTokenSecret(value?: string): boolean {
  if (!value) return false;
  return value.split(/[,\n]/).map(s => s.trim()).some(isWeakAuthTokenSecret);
}

app.get('/widget.js', async c => {
  return c.env.ASSETS.fetch(c.req.raw);
});

export default app;
