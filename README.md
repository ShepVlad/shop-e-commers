# 🍚 Simple E-Commerce App

This is a test assignment for a **Senior Vue Developer** position. The app is a minimalist e-commerce interface with three main pages:

- 📂 Category and product listing
- 📦 Product detail view
- 🛍 Shopping cart with checkout

---

## 🚀 Features

- 🔍 Browse categories and nested subcategories
- 🖼 View product details
- 🧺 Add/remove items from the cart
- 🧱 Breadcrumb navigation
- ✅ Checkout confirmation modal
- ♻️ Reusable UI components (e.g., `BaseButton`, modals)
- ⚙️ Modular project structure with `features`, `components`, `store`, `services`, `router`
- 🥪 Unit tests for key components
- 🔐 Secure usage of environment variables
- 🛡 Basic protection against XSS attacks

---

## 🛠 Tech Stack

- **Vue 3** with Composition API (`<script setup>`)
- **TypeScript**
- **Pinia** for state management
- **Vue Router**
- **Tailwind CSS**
- **Heroicons**
- **VueUse** for composition utilities
- **Vitest** for testing
- **Vue Testing Library**

---

## 📦 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 🥪 Running Tests

```bash
npx vitest
```

All tests are colocated inside the `src/tests/` folder, and use the `.spec.ts` extension.

---

## 📁 Project Structure

```
src/
├── components/         # Reusable UI components
│   └── shared/         # Base components like BaseButton
├── features/           # Feature-based modules
├── router/             # Vue Router setup
├── services/           # API/data layer
├── store/              # Pinia stores
├── tests/              # Component/unit tests
└── App.vue             # Root component
```

---

## 📌 Environment Configuration

The project uses environment variables stored in a `.env` file for configuration (e.g., API URL, Telegram chat ID).

> ⚠️ These values are not listed here for security reasons. Never commit `.env` files with sensitive data to version control.

You can access them in the codebase via `import.meta.env`.

---

## 🔐 Security Notes

- No `v-html` usage — to avoid XSS injection points
- Dynamic content is safely rendered and sanitized
- Sensitive logic and config are externalized through environment variables

---