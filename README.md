# email-guesser-service

Email guesser service's purpose is to guess the email address of a person from a given name with a conventional format of the company URLs.

Please visit the [frontend repository here](https://github.com/buraksaraloglu/email-guesser).

## Key Features

- CI pipeline that runs tests and builds the project and deploys it to the production environment.
- Swagger documentation for the API.
- Conventional commit linting.

---

## How to start?

```zsh
# Install dependencies
npm i

# Activate git hooks
npm run prepare

# Start development
npm run dev

You can visit the swagger documentation at http://localhost:8000/documentation

# Build production code
npm run build

# Run production code
node build

# New commit with interactive CLI
npm run cz

# Auto generate changelogs and versioning
npm run release
```
