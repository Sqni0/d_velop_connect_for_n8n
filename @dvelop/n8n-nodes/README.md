# @dvelop/n8n-nodes

Community n8n node for executing d.velop Actions from workflows.

## What this package provides

- Credential type: `d.velop API`
- Node: `d.velop Actions`
- Stable actions:
  - Download Document
  - Get Document Info
  - Get User Info
  - Import Document (d.velop Inbound)
- Volatile actions loaded dynamically from your d.velop tenant

## Scope and compatibility

- This package currently ships only the `d.velop Actions` node.
- Trigger nodes are not part of this release.
- Node API version: `n8nNodesApiVersion = 1`

## Prerequisites

- Running n8n instance
- d.velop tenant with access to the Actions API
- API bearer token with required permissions

## Installation

Install as a community node package in n8n or via npm:

```bash
npm install @dvelop/n8n-nodes
```

## Credentials setup

Create credentials of type `d.velop API` and configure:

- `Base URL`: for example `https://my-tenant.d-velop.cloud`
- `Authentication Method`: `Bearer Token`
- `Bearer Token`: API key/token from your d.velop environment

## Supported actions

### 1) Download Document

Required fields:
- Repository
- Document ID
- Format (`original` or `pdf`)

Result:
- Binary file output on `binary.data`
- Metadata in JSON output

### 2) Get Document Info

Required fields:
- Repository
- Document ID

Result:
- JSON response from the d.velop action endpoint

### 3) Get User Info

Required field:
- User ID

Result:
- JSON response containing user details

### 4) Import Document (d.velop Inbound)

Required fields:
- File Name
- File Source (`binary` or `string`)
- Import Profile

Notes:
- For `binary`, set `Input Binary Property` (default: `data`)
- For `string`, provide Base64 content (with or without data URI prefix)

### 5) Volatile Action

Required fields:
- Volatile Action Name or ID
- Payload (JSON)

Behavior:
- Available volatile actions are loaded dynamically from `GET /actions/api/v1/actions`
- Payload structure depends on the selected action

## Minimal examples

### Example A: Get User Info

1. Add `d.velop Actions` node
2. Set `Action Mode` to `Stable Action`
3. Set `Operation` to `Get User Info`
4. Fill `User ID`
5. Execute node

### Example B: Import from previous binary node

1. Add a node that outputs binary data (for example `Read/Write Files from Disk`)
2. Add `d.velop Actions` node
3. Set `Operation` to `Import Document (d.velop Inbound)`
4. Set `File Source` to `From N8n Binary`
5. Set `Input Binary Property` to the binary field name
6. Set `Import Profile`
7. Execute workflow

## Error handling

Common API responses:

- `400 Bad Request`: invalid payload or missing required fields
- `401 Unauthorized`: missing/invalid token
- `403 Forbidden`: insufficient permissions
- `404 Not Found`: invalid repository/document/action identifiers
- `413 Payload Too Large`: import payload too large
- `500 Internal Server Error`: upstream/server-side issue

Recommended handling in n8n:

- Use `Continue On Fail` where partial processing is acceptable
- Route failures to a dedicated error branch
- Log request context (operation/action ID, key input IDs)

## Known limitations

- No trigger node is included in this release.
- Volatile action payloads are tenant-specific and cannot be fully validated client-side.
- No built-in retry/backoff strategy is implemented in the node.
- Integration tests against a live d.velop tenant are not bundled in this package.

## Development and release checks

From `@dvelop/n8n-nodes`:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm run verify
```

`npm run test` validates the n8n manifest references (`nodes` and `credentials`) against existing files.

## License

MIT