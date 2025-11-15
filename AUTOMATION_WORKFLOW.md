# 🤖 Workflow d'Automatisation des Photos par Email

Ce document explique comment automatiser le traitement des photos reçues par email et leur publication automatique sur le site.

---

## 📋 Vue d'Ensemble

### Système Actuel (Manuel)
1. Recevoir email à marineeterwan29@gmail.com
2. Télécharger manuellement les pièces jointes
3. Copier les photos dans le bon dossier (`marine/` ou `erwan/`)
4. Mettre à jour manuellement les fichiers HTML
5. Commit et push vers GitHub

### Système Automatisé (Objectif)
1. Recevoir email avec sujet spécifique
2. Script automatique extrait les pièces jointes
3. Photos placées automatiquement dans le bon dossier
4. Fichiers HTML mis à jour automatiquement
5. Commit et push automatique vers GitHub

---

## 🎯 Identification par Sujet d'Email

Les 3 boutons du site envoient des emails avec ces sujets différents :

| Bouton | Sujet Email | Dossier Cible |
|--------|-------------|---------------|
| 📤 Marine et Erwan | `Photos pour Marine et Erwan` | Les deux dossiers |
| 👧 Marine | `Photos pour Marine` | `assets/images/marine/` |
| 👦 Erwan | `Photos pour Erwan` | `assets/images/erwan/` |

---

## 🔧 Architecture d'Automatisation

### Option 1: Script Python + Gmail API (Recommandé)

**Avantages:**
- Gratuit
- Contrôle total
- Peut tourner sur n'importe quel serveur
- Fonctionne avec cron job

**Technologies requises:**
- Python 3.8+
- Gmail API
- Git (automatique)
- Serveur ou ordinateur toujours allumé

**Workflow:**
```
[Gmail] → [Script Python] → [Extraction photos] → [Git add/commit/push]
```

### Option 2: Zapier / Make.com (Plus simple mais payant)

**Avantages:**
- Pas de code
- Interface visuelle
- Hébergement cloud

**Coût:**
- Zapier: ~20€/mois
- Make.com: ~9€/mois (meilleur pour cette tâche)

---

## 💻 Implémentation avec Python + Gmail API

### Étape 1: Configuration Gmail API

1. **Créer un projet Google Cloud:**
   - Aller sur https://console.cloud.google.com/
   - Créer un nouveau projet "MarineErwan Photo Automation"

2. **Activer Gmail API:**
   - Dans le projet, aller à "APIs & Services"
   - Cliquer "Enable APIs and Services"
   - Chercher "Gmail API" et activer

3. **Créer des credentials:**
   - OAuth 2.0 Client ID
   - Type: Desktop app
   - Télécharger le fichier `credentials.json`

### Étape 2: Script Python

Créer un fichier `email_photo_automation.py`:

```python
#!/usr/bin/env python3
"""
Script d'automatisation pour traiter les photos reçues par email
et les publier automatiquement sur le site MarineAndErwan
"""

import os
import base64
import pickle
from email.mime.text import MIMEText
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
import subprocess
from datetime import datetime

# Configuration
SCOPES = ['https://www.googleapis.com/auth/gmail.modify']
REPO_PATH = 'C:/Users/kevin/Desktop/Claude_code/MarineAndErwan'
EMAIL_ADDRESS = 'marineeterwan29@gmail.com'

# Sujets d'email à surveiller
SUBJECT_BOTH = 'Photos pour Marine et Erwan'
SUBJECT_MARINE = 'Photos pour Marine'
SUBJECT_ERWAN = 'Photos pour Erwan'

def authenticate_gmail():
    """Authentifie avec Gmail API"""
    creds = None
    token_path = 'token.pickle'

    if os.path.exists(token_path):
        with open(token_path, 'rb') as token:
            creds = pickle.load(token)

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)

        with open(token_path, 'wb') as token:
            pickle.dump(creds, token)

    return build('gmail', 'v1', credentials=creds)

def get_unread_photo_emails(service):
    """Récupère les emails non lus avec photos"""
    try:
        # Chercher emails non lus avec pièces jointes
        query = 'is:unread has:attachment'
        results = service.users().messages().list(
            userId='me',
            q=query
        ).execute()

        messages = results.get('messages', [])
        return messages
    except Exception as error:
        print(f'Erreur lors de la récupération des emails: {error}')
        return []

def determine_target_folder(subject):
    """Détermine le dossier cible basé sur le sujet"""
    if SUBJECT_MARINE in subject:
        return ['marine']
    elif SUBJECT_ERWAN in subject:
        return ['erwan']
    elif SUBJECT_BOTH in subject:
        return ['marine', 'erwan']
    else:
        return None

def download_attachments(service, msg_id, target_folders):
    """Télécharge les pièces jointes et les place dans les bons dossiers"""
    try:
        message = service.users().messages().get(
            userId='me',
            id=msg_id
        ).execute()

        downloaded_files = []

        for part in message['payload'].get('parts', []):
            if part['filename']:
                if 'data' in part['body']:
                    data = part['body']['data']
                else:
                    att_id = part['body']['attachmentId']
                    attachment = service.users().messages().attachments().get(
                        userId='me',
                        messageId=msg_id,
                        id=att_id
                    ).execute()
                    data = attachment['data']

                file_data = base64.urlsafe_b64decode(data)
                filename = part['filename']

                # Sauvegarder dans chaque dossier cible
                for folder in target_folders:
                    folder_path = os.path.join(REPO_PATH, 'assets', 'images', folder)
                    filepath = os.path.join(folder_path, filename)

                    with open(filepath, 'wb') as f:
                        f.write(file_data)

                    downloaded_files.append({
                        'folder': folder,
                        'filename': filename,
                        'path': filepath
                    })
                    print(f'✅ Photo sauvegardée: {folder}/{filename}')

        return downloaded_files
    except Exception as error:
        print(f'Erreur lors du téléchargement: {error}')
        return []

def update_html_files(downloaded_files):
    """Met à jour les fichiers HTML avec les nouvelles photos"""
    # TODO: Implémenter la logique pour ajouter les photos aux arrays JavaScript
    # Cette partie nécessite de parser les fichiers HTML et ajouter les entrées
    print("⚠️  Mise à jour HTML à implémenter manuellement pour le moment")
    pass

def git_commit_and_push(files):
    """Commit et push vers GitHub"""
    try:
        os.chdir(REPO_PATH)

        # Git add
        for file_info in files:
            subprocess.run(['git', 'add', file_info['path']], check=True)

        # Git commit
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M')
        commit_msg = f"Ajout automatique de {len(files)} photo(s) - {timestamp}"
        subprocess.run(['git', 'commit', '-m', commit_msg], check=True)

        # Git push
        subprocess.run(['git', 'push', 'origin', 'main'], check=True)

        print(f'✅ {len(files)} photo(s) committées et pushées vers GitHub')
        return True
    except Exception as error:
        print(f'❌ Erreur Git: {error}')
        return False

def mark_as_read(service, msg_id):
    """Marque l'email comme lu"""
    try:
        service.users().messages().modify(
            userId='me',
            id=msg_id,
            body={'removeLabelIds': ['UNREAD']}
        ).execute()
    except Exception as error:
        print(f'Erreur lors du marquage comme lu: {error}')

def main():
    """Fonction principale"""
    print("🤖 Démarrage de l'automatisation...")

    # Authentification
    service = authenticate_gmail()
    print("✅ Authentifié avec Gmail API")

    # Récupérer les emails
    messages = get_unread_photo_emails(service)
    print(f"📧 {len(messages)} email(s) non lu(s) trouvé(s)")

    for msg in messages:
        msg_id = msg['id']
        message = service.users().messages().get(
            userId='me',
            id=msg_id
        ).execute()

        # Extraire le sujet
        headers = message['payload']['headers']
        subject = next((h['value'] for h in headers if h['name'] == 'Subject'), '')

        # Déterminer le dossier cible
        target_folders = determine_target_folder(subject)

        if target_folders:
            print(f"\n📨 Traitement email: {subject}")
            print(f"📁 Dossier(s) cible(s): {', '.join(target_folders)}")

            # Télécharger les pièces jointes
            files = download_attachments(service, msg_id, target_folders)

            if files:
                # Mettre à jour HTML
                update_html_files(files)

                # Git commit et push
                if git_commit_and_push(files):
                    # Marquer comme lu seulement si tout a réussi
                    mark_as_read(service, msg_id)
                    print(f"✅ Email traité avec succès\n")
                else:
                    print(f"⚠️  Commit/push échoué, email non marqué comme lu\n")
        else:
            print(f"⏭️  Sujet non reconnu, ignoré: {subject}\n")

    print("✨ Automatisation terminée!")

if __name__ == '__main__':
    main()
```

### Étape 3: Dépendances Python

Créer `requirements.txt`:

```
google-api-python-client
google-auth-httplib2
google-auth-oauthlib
```

Installer:
```bash
pip install -r requirements.txt
```

### Étape 4: Configuration Cron (Linux/Mac) ou Task Scheduler (Windows)

**Linux/Mac (Cron):**
```bash
# Éditer crontab
crontab -e

# Ajouter (vérifie toutes les heures)
0 * * * * cd /path/to/script && python3 email_photo_automation.py
```

**Windows (Task Scheduler):**
1. Ouvrir Task Scheduler
2. Créer une tâche basique
3. Déclencheur: Chaque heure
4. Action: Démarrer `python email_photo_automation.py`

---

## 🎨 Mise à Jour HTML Automatique

Pour automatiser complètement, il faut parser et modifier les fichiers HTML.

### Option A: Utiliser un manifest.json (Plus Propre)

Au lieu d'éditer directement les fichiers HTML, créer un `manifest.json` :

```json
{
  "marine": [
    {
      "filename": "photo1.jpg",
      "caption": "Auto-ajoutée",
      "date": "2025-11-15"
    }
  ],
  "erwan": []
}
```

Puis modifier le JavaScript pour charger depuis le manifest.

### Option B: Parser et Modifier HTML (Plus Complexe)

Utiliser BeautifulSoup pour insérer dans les arrays JavaScript.

---

## 🔐 Sécurité

**Important:**
- ✅ Ne jamais commiter `credentials.json` ou `token.pickle`
- ✅ Ajouter à `.gitignore`:
  ```
  credentials.json
  token.pickle
  email_photo_automation.py
  ```
- ✅ Garder le script localement uniquement
- ✅ Utiliser un compte Gmail dédié si possible

---

## 📊 Workflow Complet Automatisé

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. Visiteur clique sur un bouton d'upload sur le site          │
│    (Marine, Erwan, ou Les Deux)                                 │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│ 2. Email envoyé à marineeterwan29@gmail.com                     │
│    Sujet: "Photos pour Marine" / "Photos pour Erwan" / "Both"  │
│    Corps: Template pré-rempli                                   │
│    Pièces jointes: Photos                                       │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│ 3. Script Python s'exécute (toutes les heures via cron)        │
│    - Vérifie les nouveaux emails non lus                        │
│    - Lit le sujet pour identifier la cible                      │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│ 4. Extraction et tri des photos                                 │
│    - Télécharge les pièces jointes                              │
│    - Copie dans assets/images/marine/ et/ou erwan/             │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│ 5. Mise à jour du site                                          │
│    Option A: Ajoute au manifest.json                            │
│    Option B: Parse et modifie marine.html/erwan.html            │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│ 6. Commit et push automatique vers GitHub                       │
│    - git add assets/images/                                     │
│    - git commit -m "Auto: Ajout de X photo(s)"                 │
│    - git push origin main                                        │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│ 7. GitHub Pages rebuild automatique                             │
│    - Déploie la nouvelle version                                │
│    - Photos visibles sur marineeterwan.com en 1-2 minutes       │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│ 8. Email marqué comme lu                                        │
│    - Ne sera pas retraité au prochain run                       │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎯 Prochaines Étapes

### Phase 1: Setup Initial (1-2 heures)
- [ ] Créer projet Google Cloud
- [ ] Activer Gmail API
- [ ] Télécharger credentials.json
- [ ] Tester authentification

### Phase 2: Script de Base (2-3 heures)
- [ ] Installer dépendances Python
- [ ] Tester lecture emails
- [ ] Tester téléchargement pièces jointes
- [ ] Tester git commit/push

### Phase 3: Automatisation HTML (3-4 heures)
- [ ] Choisir entre manifest.json ou parsing HTML
- [ ] Implémenter mise à jour automatique
- [ ] Tester workflow complet

### Phase 4: Déploiement (1 heure)
- [ ] Configurer cron job / Task Scheduler
- [ ] Tester avec vrais emails
- [ ] Monitorer logs

---

## 🐛 Debugging

**Script ne s'exécute pas:**
```bash
python3 email_photo_automation.py
# Regarder les erreurs dans la console
```

**Emails non détectés:**
- Vérifier que le sujet est exact
- Vérifier que l'email a des pièces jointes
- Vérifier que l'email n'est pas déjà marqué comme lu

**Git push échoue:**
- Vérifier les credentials Git
- S'assurer que le token GitHub est valide
- Vérifier les permissions du repository

---

## 📞 Support

Pour toute question sur l'automatisation, contactez le développeur ou consultez:
- Gmail API Docs: https://developers.google.com/gmail/api
- Python Gmail Examples: https://github.com/googleworkspace/python-samples

---

**Créé le:** 2025-11-15
**Version:** 1.0
**Statut:** Documentation complète - prêt pour implémentation
