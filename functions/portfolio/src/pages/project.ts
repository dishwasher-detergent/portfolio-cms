import { Hono } from 'hono';
import { Query } from 'node-appwrite';
import { PROJECTS_COLLECTION_ID, database_service } from '../lib/appwrite.js';

export function Project(app: Hono, cacheDuration: number = 1440) {
  app.get('/project/:slug', async (c) => {
    const slug = c.req.param('slug');

    const response = await database_service.list(PROJECTS_COLLECTION_ID, [
      Query.equal('slug', slug),
    ]);

    return c.json(response, 200, {
      'Cache-Control': `public, max-age=${cacheDuration}`,
    });
  });
}
