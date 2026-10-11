import { test, expect } from '@playwright/test';

test.describe('Posts API (JSONPlaceholder)', () => {
  test('TC-API-01: GET /posts returns a list of posts', async ({ request }) => {
    const response = await request.get('/posts');
    expect(response.status()).toBe(200);
    const posts = await response.json();
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBeGreaterThan(0);
  });

  test('TC-API-02: GET /posts/1 returns the expected fields', async ({ request }) => {
    const response = await request.get('/posts/1');
    expect(response.status()).toBe(200);
    const post = await response.json();
    expect(post).toMatchObject({ id: 1, userId: 1 });
    expect(typeof post.title).toBe('string');
    expect(typeof post.body).toBe('string');
  });

  test('TC-API-03: POST /posts creates a post', async ({ request }) => {
    const payload = { title: 'QA test post', body: 'Created by Playwright', userId: 1 };
    const response = await request.post('/posts', { data: payload });
    expect(response.status()).toBe(201);
    const created = await response.json();
    expect(created).toMatchObject(payload);
    expect(created.id).toBeDefined();
  });

  test('TC-API-04: PUT /posts/1 updates a post', async ({ request }) => {
    const payload = { id: 1, title: 'Updated title', body: 'Updated body', userId: 1 };
    const response = await request.put('/posts/1', { data: payload });
    expect(response.status()).toBe(200);
    expect(await response.json()).toMatchObject(payload);
  });

  test('TC-API-05: DELETE /posts/1 succeeds', async ({ request }) => {
    const response = await request.delete('/posts/1');
    expect(response.status()).toBe(200);
  });

  test('TC-API-06 (negative): GET a non-existent post returns 404', async ({ request }) => {
    const response = await request.get('/posts/99999');
    expect(response.status()).toBe(404);
  });
});
