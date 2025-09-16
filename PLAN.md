# Integrationsplan: d.velop Plattform in n8n

## Zielsetzung
- Automatisierte Workflows zwischen d.velop und anderen Systemen via n8n.
- Entwicklung von nachhaltigen Community-Nodes für n8n.
- Sicherstellung von Verifizierung und Sicherheit.
- Automatische Konvertierung von d.velop Actions/Events zu n8n Node-Format.

---

## 1. Analyse & Architektur

### 1.1 d.velop Actions App Analyse
- **Zentrale Datenbus-Architektur:** Actions App als Hub für alle Platform-Events
- **REST API:** Query-Interface für Actions und Events
- **Auto-Discovery:** Automatische Node-Generierung basierend auf verfügbaren Actions/Events
- **Authentifizierung:** OAuth2, API Keys über d.velop Identity Provider

### 1.2 API-zu-Node Konvertierung
- **Actions → Action Nodes:** REST API Endpoints zu n8n Action Nodes
- **Events → Trigger Nodes:** Event-Definitionen zu n8n Trigger Nodes
- **Schema-Mapping:** d.velop API Schema zu n8n Node Properties
- **Metadata-Extraktion:** Parameter, Typen, Validierung aus API-Dokumentation

### 1.3 Entwicklungsumgebung
- **Lokale n8n Instanz:** Docker Container für schnelle Iteration
- **Hot-Reload:** Automatisches Neuladen von Custom Nodes
- **Debug-Setup:** Logging und Debugging für Node-Entwicklung

### 1.4 Zielarchitektur
- **Phase 1:** API-Discovery Tool + Custom Nodes (lokal, Docker)
- **Phase 2:** Node-Generator + Template-System
- **Phase 3:** Community Nodes (Open Source, Auto-Updates)

---

## 2. Node-Konzept für n8n

### 2.1 Generierte Nodes
- **Dynamic Action Nodes:** Auto-generiert aus Actions App API
- **Dynamic Trigger Nodes:** Auto-generiert aus Events API
- **Meta-Node:** d.velop Platform Connection & Auth Management

### 2.2 Statische Base Nodes
- **d.velop Auth Node:** OAuth2 Flow, Token Management
- **d.velop Platform Node:** Generic API Calls, Custom Actions
- **d.velop Webhook Node:** Event Listening, Webhook Verification

---

## 3. Entwicklungsschritte

### 3.1 API Discovery & Mapping
- [ ] d.velop Actions App REST API analysieren
- [ ] Schema-Extractor entwickeln (Actions/Events → JSON Schema)
- [ ] n8n Node-Template Generator entwickeln
- [ ] Mapping-Logic: API Parameters → n8n Properties

### 3.2 Docker Development Setup
- [ ] n8n Docker Container mit Custom Node Mount
- [ ] Hot-Reload für Node-Entwicklung konfigurieren
- [ ] Debug-Logging und Error Handling setup
- [ ] Local d.velop Platform Connection testen

### 3.3 Prototyping
- [ ] Ersten Action Node generieren (z.B. "Document Create")
- [ ] Ersten Trigger Node generieren (z.B. "Document Changed")
- [ ] Auth Flow implementieren und testen
- [ ] End-to-End Workflow testen

### 3.4 Node-Generator Tool
- [ ] CLI Tool für automatische Node-Generierung
- [ ] Template-System für verschiedene Node-Typen
- [ ] Version Management und Update-Mechanismus
- [ ] Validation und Testing der generierten Nodes

### 3.5 Community Node Vorbereitung
- [ ] TypeScript, n8n Node-Standards, Dokumentation
- [ ] Unit- und Integrationstests, Mock-API
- [ ] Open Source: Lizenz, Readme, Contribution Guide
- [ ] CI/CD Pipeline für automatische Updates

### 3.6 Veröffentlichung
- [ ] Einreichung im n8n Community Node Registry
- [ ] Review-Prozess, Wartung, Updates
- [ ] Community Feedback Integration

---

## 4. Technische Implementation

### 4.1 API-Discovery Service
```
GET /api/actions → Liste aller verfügbaren Actions
GET /api/events → Liste aller verfügbaren Events
GET /api/actions/{id}/schema → Schema für spezifische Action
GET /api/events/{id}/schema → Schema für spezifisches Event
```

### 4.2 Node-Generator Architecture
- **Schema Parser:** d.velop API Schema → Intermediate Format
- **Template Engine:** Intermediate Format → n8n Node Code
- **Validator:** Generated Nodes Testing & Validation
- **Packager:** Bundle Nodes für n8n Installation

### 4.3 Docker Development Stack
```yaml
# docker-compose.yml für lokale Entwicklung
services:
  n8n:
    image: n8nio/n8n
    volumes:
      - ./nodes:/home/node/.n8n/custom/
    ports:
      - "5678:5678"
  postgres:
    # für n8n Datenbank
```

---

## 5. Verifizierung & Sicherheit

- **OAuth2 Integration:** d.velop Identity Provider Flow
- **Webhook Verification:** Signature Validation für Events
- **Input Validation:** Schema-based Validation für alle Parameter
- **Rate Limiting:** API Call Throttling und Error Handling
- **Audit Logging:** Tracking aller Actions und Events
- **Secrets Management:** Sichere Token-Speicherung in n8n

---

## 6. Automatisierung & Wartung

### 6.1 Auto-Update Mechanismus
- Regelmäßige API-Discovery für neue Actions/Events
- Automatische Node-Regenerierung bei API-Änderungen
- Version-Management und Backward-Compatibility

### 6.2 Community Integration
- Feedback Loop mit n8n Community
- Feature Requests und Bug Reports
- Dokumentation und Tutorial-Erstellung

---

## 7. Nächste Schritte (Priorisiert)

1. **API-Analyse:** d.velop Actions App REST API dokumentieren
2. **Docker Setup:** n8n lokale Entwicklungsumgebung aufsetzen
3. **Schema-Extraktor:** Tool für API-Schema-Analyse entwickeln
4. **Ersten Node generieren:** Proof-of-Concept mit einer Action
5. **Auth-Integration:** OAuth2 Flow implementieren und testen
6. **Template-System:** Wiederverwendbare Node-Templates erstellen
7. **Generator-Tool:** CLI für automatische Node-Erstellung
8. **Testing & Validation:** Comprehensive Test Suite
9. **Community Preparation:** Open Source Repository setup
10. **Release & Maintenance:** Community Node Veröffentlichung

---

## Technische Anforderungen

- **Node.js/TypeScript** für n8n Node Development
- **Docker** für lokale n8n Instanz
- **REST API Client** für d.velop Actions App
- **JSON Schema Validation** für API-Schema Processing
- **Template Engine** (z.B. Handlebars) für Code-Generierung
- **Testing Framework** (Jest) für Node Testing

---

## Erfolgs-Metriken

- Anzahl automatisch generierter Nodes
- API Coverage (% der d.velop Actions/Events)
- Community Adoption und Feedback
- Update-Zykluszeit bei API-Änderungen
- Erfolgsrate der generierten Workflows
