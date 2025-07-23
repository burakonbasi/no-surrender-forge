import { test, expect } from '@playwright/test'

test.describe('Game Flow', () => {
  test('should login and play game', async ({ page }) => {
    // Login
    await page.goto('/login')
    await page.fill('input[type="text"]', 'testuser')
    await page.fill('input[type="password"]', 'test123')
    await page.click('button[type="submit"]')
    
    // Wait for redirect
    await expect(page).toHaveURL('/')
    
    // Check energy bar
    await expect(page.locator('text=Enerji')).toBeVisible()
    
    // Click on a card
    const firstCard = page.locator('.grid > div').first()
    await firstCard.click()
    
    // Check progress update
    await expect(page.locator('text=%2')).toBeVisible()
  })
})