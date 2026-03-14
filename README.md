# Cloud Architecture

This project is deployed using a containerized production stack running on a Microsoft Azure Ubuntu virtual machine.

The infrastructure uses Docker containers, a Caddy reverse proxy, GitHub Actions CI/CD, and DuckDNS domain routing.

```mermaid
flowchart TD

U[User Browser] -->|HTTPS| D[DuckDNS Domain]

D --> C[Caddy Reverse Proxy]

C --> P[Portfolio Frontend Container]
C --> W[WireGuard VPN Service]

P --> B[Backend API Container]

B --> DB[(PostgreSQL Database)]

G[GitHub Repository] -->|Push to main| A[GitHub Actions CI/CD]

A -->|SSH Deploy| V[Azure Ubuntu VM]

V --> DR[Docker Runtime]

DR --> C
DR --> P
DR --> B
DR --> DB
DR --> W
```
