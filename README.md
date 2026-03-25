# 🏦 Digital Bank Tests

Suite de tests end-to-end (E2E) d'une application bancaire digitale (SPA HTML statique), 
réalisée dans le cadre d'une formation en QA/test logiciel.

📖 **[Documentation complète sur le Wiki](https://github.com/Karlito-blob/digital-bank-tests/wiki)**

## 🛠️ Stack technique

- **[Playwright](https://playwright.dev/)** — framework de tests E2E
- **JavaScript** (CommonJS) — langage principal
- **GitHub Actions** — intégration continue (CI/CD)

## 📊 En chiffres

| Info | Détail |
|------|--------|
| Scénarios | 37 tests |
| Exécutions | 185 (5 navigateurs) |
| Couverture | Authentification, Dashboard, Virements, Factures, Sécurité, E2E |
| CI/CD | Smoke → Regression → E2E |

## 📁 Structure du projet
```
digital-bank-tests/
├── .github/workflows/   # Pipelines CI GitHub Actions
├── app/                 # Application DigitalBank (SPA statique)
├── fixtures/            # Données de test
├── helpers/             # Fonctions utilitaires
├── pages/               # Page Object Model (POM)
├── tests/               # Scénarios de test
├── global-setup.js      # Configuration avant les tests
├── global-teardown.js   # Nettoyage après les tests
└── playwright.config.js # Configuration Playwright
```

## 🚀 Installation
```bash
git clone https://github.com/Karlito-blob/digital-bank-tests.git
cd digital-bank-tests
npm install
npx playwright install
```

## ▶️ Lancer les tests
```bash
npx playwright test          # Tous les tests
npx playwright test --ui     # Interface graphique
npx playwright show-report   # Rapport HTML
```

## 🔁 Pipelines CI/CD

| Campagne | Navigateurs | Déclencheur | Durée cible |
|----------|-------------|-------------|-------------|
| Smoke | Chromium | Push sur `main` | < 3 min |
| Regression | Chromium + Firefox + WebKit | Pull Request | < 15 min |
| E2E | Chromium | Merge sur `main` | < 10 min |

## 📚 Documentation

Le wiki couvre l'architecture, les environnements, les commandes et les bugs connus :
➡️ [Getting Started](https://github.com/Karlito-blob/digital-bank-tests/wiki/Getting-Started) · [Architecture](https://github.com/Karlito-blob/digital-bank-tests/wiki/Architecture) · [Running Tests](https://github.com/Karlito-blob/digital-bank-tests/wiki/Running-Tests) · [Known Bugs](https://github.com/Karlito-blob/digital-bank-tests/wiki/Known-Bugs)