# react-ts-vite-daisyui

## 作業記録

1. react/style/react-ts-tailwindcss から fork

```sh
> pnpm add -D daisyui@latest
```

2. tailwind.config.js の設定

```js
module.exports = {
  //...
  plugins: [require("daisyui")],
}
```

3. 動作を確認

```shell
> pnpm dev
```

## Scripts

- `dev`/`start` - start dev server and open browser
- `build` - build for production
- `preview` - locally preview production build
- `test` - launch test runner

## 参考

- [Install daisyUI as a Tailwind CSS plugin — Tailwind CSS Components](https://daisyui.com/docs/install/)
