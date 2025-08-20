# Explorer Frontend

A Vue 3 + Vite + TailwindCSS application that serves as the frontend for the **Explorer** project.  
It follows **Clean Architecture** principles, separating domain, application, infrastructure, and presentation layers.

---

## 🚀 Tech Stack

- **Framework**: [Vue 3](https://vuejs.org/) + [Vue Router](https://router.vuejs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **UI Styling**: [TailwindCSS](https://tailwindcss.com/)
- **Icons**: [Lucide Vue](https://lucide.dev/)
- **Testing**: [Vitest](https://vitest.dev/), [Vue Test Utils](https://test-utils.vuejs.org/)
- **E2E Testing**: [Playwright](https://playwright.dev/)

---

## 📦 Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/candinursadi/explorer-frontend.git
   cd explorer-frontend
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Start the development server:
   ```bash
   bun run dev
   ```

4. Open the app in your browser:
   ```
   http://localhost:5173
   ```

---

## 🏗 Project Structure

```
src/
 ├─ application/        # Use cases / service layer
 ├─ domain/             # Core business logic (entities, repositories)
 ├─ infrastructure/     # API and repository implementations
 ├─ presentation/       # Vue components (UI, views)
 │   ├─ components/Ui/  # Reusable UI widgets (buttons, inputs, etc.)
 │   └─ views/          # Page-level views
 ├─ router/             # Vue Router configuration
 ├─ style/              # Global styles & Tailwind config
 └─ tests/              # Unit, integration, e2e tests
```

---

## 🖥️ UI Layout

- **Header**: App title / branding  
- **Sidebar**: Displays folder tree
- **Right Pane**: Displays selected folder contents

![Home Screen](<Screenshot 2025-08-21 at 01.42.37.png>)

---

## 🔌 API Integration

This frontend expects the **Explorer Backend** running at:  
```
http://localhost:3000/api/v1
```

Endpoints used:
- `GET /folders` → fetch root folders
- `GET /folders/:id` → fetch subfolders
- `GET /folders/:id/files` → fetch files in folder
- `GET /folders/:id/contents` → fetch both subfolders & files

Configure base URL in a central API service file (e.g., `src/application/services/nameService.ts`).

---

## ✅ Testing

### Unit & Component Tests
```bash
bun run test
```

### UI Test Runner
```bash
bun run test:ui
```

### Coverage
```bash
bun run test:cov
```

### E2E Tests
```bash
bun run e2e
```

### E2E Test Runner (UI)
```bash
bun run e2e:ui
```

---

## 📦 Build

To build for production:
```bash
bun run build
```

Preview production build:
```bash
bun run preview
```

---

## 📖 Contributing

1. Fork this repository  
2. Create a new feature branch (`git checkout -b feature/your-feature`)  
3. Commit your changes (`git commit -m 'add: new feature'`)  
4. Push to your branch (`git push origin feature/your-feature`)  
5. Open a Pull Request  

---

## 📜 License

MIT License.
