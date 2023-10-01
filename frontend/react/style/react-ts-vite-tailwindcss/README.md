# react-ts-vite-tailwindcss

## 作業記録

1. react/style/react-ts-redux-vite から fork

```sh
> pnpm add -D tailwindcss postcss autoprefixer
> npx tailwindcss init -p
```

`postcss.config.js`およびに`tailwind.config.js`が作成される。

[Vite](https://ja.vitejs.dev/guide/features.html#postcss)は`postcss.config.js`があれば PostCSS を自動的に適用する。

2. tailwind.config.js の設定

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

3. `src/index.css`の設定

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

4. build を確認

```shell
> pnpm dev
```

## Scripts

- `dev`/`start` - start dev server and open browser
- `build` - build for production
- `preview` - locally preview production build
- `test` - launch test runner

## 参考

- [Install Tailwind CSS with Vite - Tailwind CSS](https://tailwindcss.com/docs/guides/vite)
