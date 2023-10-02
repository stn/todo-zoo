# react-ts-vite-shadcn

## 作業記録

1. react/style/react-vite-tailwindcss から fork

Tailwind CSS に共通の設定は終わっている。

2. tsconfig.json

```json
"baseUrl": ".",
"paths": {
  "@/*": ["./src/*"]
}
```

3. vite.config.ts

```shell
pnpm add -D @types/node
```

vite.config.ts

```ts
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

4. components.json

```shell
> npx shadcn-ui@latest init

Would you like to use TypeScript (recommended)? no / yes
Which style would you like to use? › Default
Which color would you like to use as base color? › Slate
Where is your global CSS file? › › src/index.css
Do you want to use CSS variables for colors? › no / yes
Where is your tailwind.config.js located? › tailwind.config.js
Configure the import alias for components: › @/components
Configure the import alias for utils: › @/lib/utils
Are you using React Server Components? › no / yes (no)
```

5. component の追加

```shell
> npx shadcn-ui@latest add button
```

6. build を確認

```shell
> pnpm dev
```

## Scripts

- `dev`/`start` - start dev server and open browser
- `build` - build for production
- `preview` - locally preview production build
- `test` - launch test runner

## 参考

- [Vite - shadcn/ui](https://ui.shadcn.com/docs/installation/vite)
