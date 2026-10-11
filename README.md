# Playwright QA Portfolio

UI and API test automation built with Playwright and TypeScript, using the Page Object Model and a GitHub Actions CI pipeline.

## What this covers

| Area | Details |
|------|---------|
| UI tests | Login (valid, locked-out, wrong password, empty fields) and cart/checkout flows on [Sauce Demo](https://www.saucedemo.com), a public practice site |
| API tests | CRUD plus a negative case on [JSONPlaceholder](https://jsonplaceholder.typicode.com), a public practice API |
| Design | Page Object Model, test case IDs that map to the test plan |
| CI | GitHub Actions runs the suite on every push and pull request and uploads the HTML report |

## Setup

```bash
npm install
npx playwright install chromium
```

## Run the tests

```bash
npm test              # everything
npm run test:ui       # UI tests only
npm run test:api      # API tests only
npm run test:headed   # watch the browser while UI tests run
npm run report        # open the last HTML report
```

## Project structure

```
pages/                 Page objects (one class per page)
tests/ui/              UI test specs
tests/api/             API test specs
docs/test-plan.md      Scope, approach, and test case list
.github/workflows/     CI pipeline
playwright.config.ts   Projects, reporters, retries, traces
```

## Notes

- Tests are independent: each UI test logs in fresh and does not rely on another test's state.
- All test data is synthetic. No real personal data is used anywhere.
- Failures capture a screenshot, and a trace is recorded on the first retry in CI.
