# d.velop n8n Integration

Automatische Generierung von n8n Nodes aus der d.velop Actions API.

## 🚀 Features

- **Automatische Node-Generierung**: Konvertiert d.velop Actions zu n8n Action Nodes
- **Event-Trigger**: Erstellt Trigger Nodes aus d.velop Event Definitions
- **Docker-Entwicklungsumgebung**: Lokale n8n Instanz für schnelle Entwicklung
- **OAuth2 & Cookie Auth**: Unterstützt beide d.velop Authentifizierungsmethoden
- **Template-basiert**: Verwendung von Handlebars für flexible Code-Generierung
- **CLI Tool**: Einfache Bedienung über Kommandozeile

## 📋 Voraussetzungen

- Node.js 18+
- Docker & Docker Compose
- Zugang zur d.velop Platform mit API-Berechtigung

## 🔧 Installation & Setup

1. **Dependencies installieren:**
```bash
npm install
```

2. **TypeScript kompilieren:**
```bash
npm run build
```

3. **n8n Entwicklungsumgebung starten:**
```bash
npm run dev
```

n8n ist dann verfügbar unter: http://localhost:5678

## 📖 Verwendung

### Interaktive Node-Generierung

```bash
node dist/cli.js generate
```

Das CLI führt Sie durch die Konfiguration:
- d.velop Base URL
- Tenant Name
- Authentifizierungsmethode (Bearer Token oder Cookie Auth)
- Node-Einstellungen

### Konfigurationsdatei verwenden

1. **Konfiguration erstellen:**
```bash
node dist/cli.js init-config
```

2. **Nodes mit Konfiguration generieren:**
```bash
node dist/cli.js generate -c dvelop-n8n.config.json
```

### Verbindung testen

```bash
node dist/cli.js test-connection
```

## 🏗️ Projektstruktur

```
dvelopN8N/
├── src/
│   ├── api/           # d.velop API Client
│   ├── generator/     # Node Generator
│   ├── templates/     # Handlebars Templates
│   ├── types/         # TypeScript Definitionen
│   └── utils/         # Utility Functions
├── nodes/             # Generierte n8n Nodes
├── credentials/       # n8n Credentials
└── docker-compose.yml # n8n Entwicklungsumgebung
```

## 🔑 Authentifizierung

### Bearer Token (Empfohlen)
1. Anmeldung in der d.velop Cloud
2. Entwicklerbereich → App Session erstellen
3. Bearer Token kopieren

### Cookie Auth
1. Anmeldung in der d.velop Cloud
2. Browser DevTools → Application → Cookies
3. `AuthSessionId` Wert kopieren

## 📝 Beispiel-Konfiguration

```json
{
  "dvelopConfig": {
    "baseUrl": "https://my-tenant.d-velop.cloud",
    "tenant": "my-tenant",
    "bearerToken": "your-bearer-token-here"
  },
  "outputPath": "./nodes",
  "nodePrefix": "Dvelop",
  "generateTests": true,
  "includeVolatileActions": false
}
```

## 🎯 Generated Nodes

### Action Nodes
- Führen d.velop Actions aus
- Parameter werden automatisch aus der API gemappt
- Unterstützung für dynamische Wertelisten
- Fehlerbehandlung und Logging

### Trigger Nodes  
- Webhooks für d.velop Events
- Automatische Registrierung/Deregistrierung
- Event-Schema Validierung

### Credentials
- d.velop API Authentifizierung
- Verbindungstest integriert
- Sichere Token-Speicherung

## 🔄 Development Workflow

1. **Starte die Entwicklungsumgebung:**
```bash
npm run dev
```

2. **Generiere Nodes:**
```bash
node dist/cli.js generate
```

3. **Teste in n8n:**
   - Gehe zu http://localhost:5678
   - Erstelle neue Credentials (d.velop API)
   - Verwende die generierten Nodes in Workflows

4. **Hot Reload:**
Änderungen an den Nodes werden automatisch erkannt (Docker Volume Mount)

## 🧪 Testing

```bash
npm test
```

## 📚 API Referenz

Das System basiert auf der d.velop Actions API:
https://help.d-velop.de/dev/documentation/dvelop-actions

### Wichtige Endpoints:
- `GET /api/v1/actions` - Alle verfügbaren Actions
- `GET /api/v1/event-definitions` - Event Definitionen
- `POST /api/v1/events/execute` - Event ausführen

## 🛠️ Troubleshooting

### Connection Failed
- Prüfe Base URL und Tenant Name
- Validiere Authentication Token
- Firewall/Proxy Einstellungen überprüfen

### No Nodes Generated
- Prüfe API Berechtigungen
- Volatile Actions ggf. einschließen
- Log-Output analysieren

### n8n lädt Nodes nicht
- Docker Container neu starten: `docker-compose restart n8n`
- Volume Mounts überprüfen
- n8n Logs: `npm run logs`

## 🚧 Roadmap

- [ ] Webhook-Signatur Validierung
- [ ] Rate Limiting & Retry Logic
- [ ] Unit Tests für generierte Nodes
- [ ] Community Node Package
- [ ] Auto-Update bei API Änderungen
- [ ] UI für Node-Generierung

## 📄 Lizenz

MIT License

## 🤝 Beitragen

1. Fork das Repository
2. Feature Branch erstellen
3. Änderungen committen
4. Pull Request erstellen

---

**Hinweis**: Dieses Tool generiert n8n Custom Nodes basierend auf der d.velop Actions API. Für Production-Verwendung sollten die generierten Nodes gründlich getestet werden.
