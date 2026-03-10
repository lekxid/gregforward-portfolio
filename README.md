## Architecture

```mermaid
flowchart TD
    U[User Browser] -->|HTTPS| A[Apache Reverse Proxy]
    A -->|Static Site| F[Portfolio Frontend]
    A -->|/api| B[Flask API via Gunicorn]
    B --> D[(PostgreSQL Database)]
    B --> H[Health Check Endpoint]
    G[GitHub Actions] -->|Deploy| V[Azure Ubuntu VM]
    V --> C[Docker Compose]
    C --> B
    C --> D
