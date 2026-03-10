# Greg Forward Cloud Portfolio

**Live Site:**  
https://gregforward.duckdns.org

## Overview

This project is a production-style cloud portfolio deployed on an Azure Ubuntu virtual machine.

It demonstrates practical cloud and DevOps concepts including reverse proxying, HTTPS, containerization, backend API deployment, database integration, CI/CD, and live monitoring.

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

User → Apache HTTPS Reverse Proxy → Flask API (Gunicorn) → PostgreSQL

## Infrastructure Stack

- **Cloud Provider:** Azure
- **Operating System:** Ubuntu Server
- **Web Server:** Apache
- **SSL:** Let's Encrypt
- **Backend:** Flask + Gunicorn
- **Database:** PostgreSQL
- **Containerization:** Docker
- **Orchestration:** Docker Compose
- **CI/CD:** GitHub Actions
- **DNS:** DuckDNS
- **Monitoring:** Live server monitoring dashboard

## Features

- Live portfolio hosted on Azure VM
- HTTPS enabled with Let's Encrypt
- Apache reverse proxy to backend API
- Flask API running with Gunicorn
- PostgreSQL database for contact form submissions
- Docker Compose orchestration
- CI/CD workflow integration
- Monitoring dashboard page
- Cloud infrastructure section on homepage

## DevOps Workflow

GitHub Push → GitHub Actions → Azure VM Deployment → Docker Compose Restart → Health Check

## API Endpoints

- `/api/health`
- `/api/contact`

## Current DevOps Practices

- Reverse proxy routing with Apache
- Secure HTTPS deployment
- Containerized backend services
- Persistent PostgreSQL storage
- Health check endpoint
- Git-based deployment workflow

## Planned Improvements

- Prometheus metrics
- Grafana dashboards
- Centralized logging
- Automated backups
- Security hardening
- Azure Monitor integration

## Author

**Greg Forward**  
Cloud / Systems / DevOps Portfolio Project
