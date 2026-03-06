## reactjs-peerjs-chat-app

**A clean, WhatsApp‑style peer‑to‑peer chat UI built with React, Vite, Tailwind, and PeerJS.**  
Use PeerJS IDs to connect two browsers directly, manage a small contact list, and chat in a minimal, responsive interface.

### Tech stack

- **React + Vite** for the SPA and fast DX.
- **PeerJS** for WebRTC‑based peer‑to‑peer data connections.
- **Tailwind CSS** (via the Vite setup) for layout and theming.
- **LocalStorage** for persisting contacts and theme preference.

### Features

- **Peer‑to‑peer messaging**
  - Each browser instance gets its own **Peer ID**.
  - Connect to another user by saving their Peer ID as a contact.
  - Messages show timestamps and basic alignment for sent/received.

- **Contact management**
  - Add contacts with **name**, **Peer ID**, and optional **avatar image**.
  - Edit and delete contacts.
  - Contact list is stored in `localStorage` and restored on refresh.

- **Responsive, animated layout**
  - Sliding **contacts sidebar** on mobile with smooth open/close animation.
  - Wider static sidebar on laptops/desktop for comfortable use.
  - Sticky message input bar at the bottom.

- **Theming**
  - Light/Dark theme toggle in the sidebar header.
  - Theme choice is persisted in `localStorage` and applied to the document.

### Getting started

#### Prerequisites

- **Node.js** ≥ 18
- **npm** (or another package manager; examples use `npm`)

#### Install dependencies

```bash
npm install
```

#### Run the development server

```bash
npm run dev
```

Open the printed URL in your browser (usually `http://localhost:5173`).

#### Build for production

```bash
npm run build
```

You can then preview the production build with:

```bash
npm run preview
```

### How to use the app

1. **Start two peers**
   - Open the app in two browser windows/tabs or two different devices.
   - Each instance shows its **Peer Id** in the chat header strip.

2. **Add a contact**
   - In the left sidebar, click **“Add Contact”**.
   - Enter:
     - A **Name** (e.g., “Laptop”, “Phone”, or a person’s name).
     - The **Peer ID** from the other browser.
     - Optionally upload a **profile image**.
   - Click **Save**. The contact is stored in `localStorage`.

3. **Auto‑connect**
   - The app automatically tries to connect to the **first contact** in your list once your own PeerJS connection is ready.
   - Status under the contact name shows **Online / Offline / Connecting...**.

4. **Chat**
   - Type a message into the input at the bottom and press Enter or click send.
   - Your messages appear on the right; incoming messages appear on the left, both with timestamps.

5. **Manage contacts**
   - Hover a contact row to reveal **Edit** and **Delete** icons.
   - Editing updates the stored contact; deleting removes it from `localStorage` and updates the active chat target.

6. **Toggle theme**
   - Use the moon icon in the sidebar header to switch between light and dark themes.

### Project structure (high level)

- `src/App.jsx`  
  **Root component.** Sets up PeerJS, manages the current connection, message list, selected contact, theme, and overall layout.

- `src/Dashboard.jsx`  
  **Contacts sidebar.** Loads contacts from `localStorage`, handles add/edit/delete, validates Peer IDs, and reports changes back to `App` via `onContactsChange`.

- `src/App.css`  
  Tailwind configuration imports, design tokens, and base styles.

### Notes & limitations

- This project is meant as a **learning/demo** chat UI, not a production‑grade secure messenger.
- PeerJS by default uses a public signaling server; for real deployments you should:
  - Host your own PeerJS server.
  - Configure STUN/TURN and HTTPS appropriately.
  - Add authentication, authorization, and proper encryption on top as needed.
