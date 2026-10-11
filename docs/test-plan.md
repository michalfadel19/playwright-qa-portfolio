# Test Plan

## 1. Scope
Functional UI testing of login, cart, and checkout on Sauce Demo, and functional API testing of the posts endpoints on JSONPlaceholder.

Out of scope: performance, load, security, and cross-browser testing.

## 2. Approach
- Automated with Playwright (TypeScript). Page Object Model for UI tests.
- Each test is independent and uses synthetic data.
- Positive and negative cases for login and API requests.
- CI: GitHub Actions on every push and pull request.

## 3. Environment
- Sauce Demo (public demo site), Chromium via Playwright
- JSONPlaceholder (public fake REST API)

## 4. Test cases

| ID | Area | Description | Expected result |
|----|------|-------------|-----------------|
| TC-LOGIN-01 | UI | Log in with a valid user | Inventory page loads |
| TC-LOGIN-02 | UI | Log in as the locked-out user | Locked-out error shown |
| TC-LOGIN-03 | UI | Log in with a wrong password | Credentials error shown |
| TC-LOGIN-04 | UI | Submit with empty username | "Username is required" |
| TC-LOGIN-05 | UI | Submit with empty password | "Password is required" |
| TC-LOGIN-06 | UI | Open the inventory page without logging in (negative) | Redirected to login with an access error |
| TC-CART-01 | UI | Add one item | Cart badge shows 1 |
| TC-CART-02 | UI | Add two items | Badge shows 2, cart lists both |
| TC-CART-03 | UI | Remove an item | Cart badge disappears |
| TC-CHECKOUT-01 | UI | Complete an order | Confirmation message shown |
| TC-CHECKOUT-02 | UI | Submit shipping form without first name | "First Name is required" |
| TC-API-01 | API | GET /posts | 200 and a non-empty list |
| TC-API-02 | API | GET /posts/1 | 200 and expected fields |
| TC-API-03 | API | POST /posts | 201 and created post returned |
| TC-API-04 | API | PUT /posts/1 | 200 and updated post returned |
| TC-API-05 | API | DELETE /posts/1 | 200 |
| TC-API-06 | API | GET /posts/99999 (negative) | 404 |

## 5. Risks and notes
- Both targets are public practice sites. Availability and behavior are outside our control.
- JSONPlaceholder does not persist writes, so create, update, and delete tests verify the response, not saved data.
