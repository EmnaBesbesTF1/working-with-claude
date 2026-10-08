# CLAUDE.md — ops-dashboard

Dashboard ops de Marlowe & Finch (fictif) : API REST Spring Boot en lecture seule + page JS vanilla pour écran mural.
Repo support de l'atelier « Claude Code, zero to expert » (labs dans `workshop/`, tickets dans `docs/tickets/`).

## Commandes
- Lancer sans BDD : `SPRING_PROFILES_ACTIVE=demo ./mvnw spring-boot:run` → http://localhost:8080 (H2 en mémoire, mode PostgreSQL)
- Lancer avec Postgres : `docker compose up -d db` puis `./mvnw spring-boot:run` (profil `postgres` par défaut, user/pass/db `ops`)
- Tests Java : `./mvnw test` (JUnit 5 + MockMvc, toujours sur H2) — baseline **29**
- Tests front : `npm test` (Jest + jsdom) — baseline **49**

## Architecture
- Backend `src/main/java/com/marlowefinch/ops/` : Controllers → Repositories (SQL brut via Spring JDBC, **pas de JPA**) → records de réponse.
- Endpoints `GET /api/{health,kpis,deliveries/on-time,deliveries/late,tickets/by-category,tickets?category=…,vendors}` ; `from`/`to` ISO, défaut = 30 derniers jours, `limit` défaut 20.
- Schéma + seed : Flyway `db/migration/V1__schema.sql`, `V2__seed.sql` (généré par `tools/make_seed.py`, ne pas éditer à la main).
- Front `src/main/resources/static/` : `index.html`, `app.js`, `style.css` — pas de framework, pas de build, graphiques en SVG inline.
- Harness Jest : `src/test/javascript/setup/loadApp.js` (fake `fetch` + fixtures).

## Règles
- **`pom.xml` : dépendances gelées. Toute modification exige un ticket CHG.** Pas de nouvelle dépendance npm non plus.
- « Aujourd'hui » = **2026-09-21** (`ops.today`, `ClockConfig`) — ne jamais utiliser l'horloge système.
- Tout nouvel `id` HTML doit être ajouté à `REGISTERED_IDS` dans `loadApp.js`, sinon `harness.test.js` échoue.
- Le SQL doit tourner sur PostgreSQL **et** H2.
- Quand un ticket et le chat divergent, le ticket fait foi.

## Definition of done
Lancer `./mvnw test` et `npm test` et donner les deux compteurs ; redémarrer l'app pour vérification manuelle.

## État / en cours
- Pas de validation des paramètres (date invalide → 500) : voir TODO-232.
- Tickets ouverts : TODO-231 (thème clair/sombre), TODO-232 (validation 400), TODO-233 (`/api/summary`).
