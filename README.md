# Weather API

A simple REST API to fetch weather data with fast retrievals from persistent cache.

## Requirements
- Make
- Yarn >= 1.9.4
- Node.js >= 8.11.3
- Docker >= 18.06.1 CE
- Docker Compose >= 1.22.0

**Note:** Yarn and Node.js are only required for development environment.

## Endpoints
Method | Path | Query String | Status Codes
--- | --- | --- | ---
GET | `/weather` | city= country= lat= lon= units={metric, imperial} | 200, 400, 404, 500
GET | `/version` |  | 200
GET | `/health-check` |  | 204, 500

## Deployment
To deploy on Docker (including dependencies):

    make deploy
To tear down the deployment:

    make teardown
To customize, change the configuration files in `config` folder.

## Development
To install the dependencies:

    make bootstrap
To start the REST API locally:

    make start
To check for formatting issues:

    make lint
To debug, see the log files in `logs` folder.

## Roadmap
- Configure deployment to a cloud platform
