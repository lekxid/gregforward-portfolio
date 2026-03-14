# Greg Forward Cloud Portfolio

**Live Portfolio:**  
https://gregforward.duckdns.org

**WireGuard Access:**  
https://spiritlove.duckdns.org

---

# Overview

This project is a production-style cloud portfolio deployed on a Microsoft Azure Ubuntu virtual machine.

It demonstrates practical **cloud infrastructure and DevOps concepts** including:

- reverse proxy architecture
- HTTPS security with automatic SSL certificates
- Dockerized deployment
- GitHub Actions CI/CD automation
- domain routing with DuckDNS
- secure service separation
- WireGuard VPN integration
- container-based production hosting

This project is designed to simulate a **real-world cloud deployment environment** with automated updates and secure public access.

---

# Current Production Stack

The live environment currently includes:

- **Microsoft Azure Ubuntu Virtual Machine**
- **Caddy reverse proxy**
- **Portfolio frontend container**
- **GitHub Actions CI/CD pipeline**
- **DuckDNS domain mapping**
- **Automatic HTTPS / SSL certificate management**
- **WireGuard VPN service**
- **Docker-based service deployment**

---

# Architecture

```mermaid
flowchart TD
    U[User Browser] -->|HTTPS| C[Caddy Reverse Proxy]

    C -->|gregforward.duckdns.org| P[Portfolio Container]
    C -->|spiritlove.duckdns.org| W[WireGuard Service]

    G[GitHub Repository] -->|Push to main| A[GitHub Actions CI/CD]
    A -->|SSH Deploy| V[Azure Ubuntu VM]

    V --> D[Docker Runtime]
    D --> C
    D --> P
    D --> W
