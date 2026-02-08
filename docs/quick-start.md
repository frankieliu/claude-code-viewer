# Quick Start Guide

This guide provides essential commands to get claude-code-viewer up and running quickly.

## Requirements

- **Node.js**: Version 20.19.0 or later
- **Package Manager**: pnpm
- **OS**: macOS or Linux (Windows not supported)
- **Claude Code**: v1.0.50 or later

## Development Setup

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Run Development Server

```bash
pnpm dev
```

This starts both the frontend (Vite) and backend (Hono server) in watch mode.

The application will be available at:
- Frontend: `http://localhost:3400` (default)
- Backend API: `http://localhost:3401` (default)

### 3. Quality Checks

Before committing changes, run:

```bash
pnpm typecheck  # Type checking
pnpm fix        # Auto-fix linting and formatting
```

## Production Build

### 1. Build the Application

```bash
pnpm build
```

This creates a production-ready build in the `dist/` directory.

### 2. Run Production Server

```bash
pnpm start
```

The server will start on port 3000 by default.

## Quick Start (Without Local Build)

### Run via npx (Recommended for Testing)

```bash
npx @kimuson/claude-code-viewer@latest --port 3400
```

### Global Installation

```bash
npm install -g @kimuson/claude-code-viewer
claude-code-viewer --port 3400
```

## Available CLI Options

```bash
claude-code-viewer [options]

Options:
  -p, --port <port>                Port to listen on (default: 3000)
  -h, --hostname <hostname>        Hostname to listen on (default: localhost)
  -P, --password <password>        Password for authentication
  -e, --executable <executable>    Path to Claude Code executable
  --claude-dir <claude-dir>        Path to Claude directory (default: ~/.claude)
```

### Example Usage

```bash
# Run on custom port
claude-code-viewer --port 3400

# Run with password protection
claude-code-viewer --password mySecurePassword

# Run with custom Claude directory
claude-code-viewer --claude-dir /path/to/custom/claude-dir

# Combine multiple options
claude-code-viewer --port 3400 --password mySecurePassword
```

## Environment Variables

Instead of CLI options, you can use environment variables:

| CLI Option | Environment Variable | Default |
|------------|---------------------|---------|
| `--port` | `PORT` | `3000` |
| `--hostname` | `HOSTNAME` | `localhost` |
| `--password` | `CCV_PASSWORD` | (none) |
| `--executable` | `CCV_CC_EXECUTABLE_PATH` | (auto-detect) |
| `--claude-dir` | `CCV_GLOBAL_CLAUDE_DIR` | `~/.claude` |

### Example with Environment Variables

```bash
# Create .env.local file
echo "PORT=3400" >> .env.local
echo "CCV_PASSWORD=mySecurePassword" >> .env.local

# Run with environment variables
pnpm start
```

## Testing

```bash
# Run unit tests once
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run E2E tests
pnpm e2e
```

## Data Source

The application reads Claude Code session logs from:
- **Default Location**: `~/.claude/projects/<project>/<session-id>.jsonl`
- **Cache Location**: `~/.claude-code-viewer/`

## Common Development Tasks

```bash
# Start development server
pnpm dev

# Type checking
pnpm typecheck

# Linting and formatting
pnpm fix

# Run all tests
pnpm test

# Build production version
pnpm build

# Start production server
pnpm start
```

## Docker Deployment

### Build Docker Image

```bash
docker build -t claude-code-viewer .
```

### Run Docker Container

```bash
docker run --rm -p 3400:3400 \
  -e PORT=3400 \
  -e CCV_PASSWORD=your-password \
  -e ANTHROPIC_BASE_URL=... \
  -e ANTHROPIC_API_KEY=... \
  -e ANTHROPIC_AUTH_TOKEN=... \
  claude-code-viewer
```

### Using Docker Compose

```bash
docker compose up --build
```

## Troubleshooting

### NODE_ENV Issues

If you have `NODE_ENV=development` set in your environment from other projects, the application may not work correctly. Either:
- Set `NODE_ENV=production`
- Leave `NODE_ENV` unset

### Port Already in Use

If the default port 3000 is already in use:
```bash
claude-code-viewer --port 3400
```

### Authentication Issues

If you set a password but can't log in:
- Ensure the password is correctly set via `--password` flag or `CCV_PASSWORD` environment variable
- Check browser console for any errors

## Additional Resources

- Full documentation: [README.md](../README.md)
- Development guide: [dev.md](./dev.md)
- Privacy information: [PRIVACY.md](../PRIVACY.md)
- Project instructions: [CLAUDE.md](../CLAUDE.md)
