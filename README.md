# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

<hr />

## 🚀 Getting Started

### 💻 Installation

1. Clone the LoDi-App repository:
```sh
$ git clone https://github.com/Spintr/Phoenix2
```

2. Change to the project directory:
```sh
cd Phoenix2
```

3. Choose node version
```sh
$ nvm use
```

4. Install the dependencies:
```sh
$ yarn install
```

5. Run project:
```sh
$ yarn dev
```

5. Run storybook:
```sh
$ yarn storybook
```


## Main Packages used in Spintr

| Command | Description |
| --- | --- |
| [@faker-js/faker](https://www.npmjs.com/package/@faker-js/faker) | Generate massive amounts of fake (but realistic) data for testing and development. This library is used here because the api is not integrated but the flow should work. |
| [@hookform/resolvers](https://www.npmjs.com/package/@hookform/resolvers/v/2.3.1) | The resolver of form validation schema. In this project, this is being used for `yup` and `react-hook-form` |
| [react-hook-form](https://www.npmjs.com/package/react-hook-form) | React Form library that supports various of form methods, states, errors, etc. For the better UX, validation should be performed in frontend side and needs to show errors to users if there is any invalid fields before submitting. This package helps us to handle these stuff in a easy way. And beside of this, it supports errors, dirty fields, and auto-focusing on error fields. In order to validate fields, it needs to have validation schema and schemas are defined with `yup`. All validation schemas are defined in `src/utils/validation.ts` |
| [yup](https://www.npmjs.com/package/yup) | Yup is a schema builder for runtime value parsing and validation. Define a schema, transform a value to match, assert the shape of an existing value, or both. Yup schema are extremely expressive and allow modeling complex, interdependent validations, or value transformation. |
| [@reduxjs/toolkit](https://www.npmjs.com/package/@reduxjs/toolkit) | This package is intended to be the standard way to write Redux logic. Redux Toolkit also includes a powerful data fetching and caching capability called "RTK Query". It's included in the package as a separate set of entry points. It's optional, but can eliminate the need to hand-write data fetching logic yourself. |
| [draft-js](https://www.npmjs.com/package/draft-js) | Draft.js is a JavaScript rich text editor framework, built for React and backed by an immutable model. This package is being used for TextArea |
| [draftjs-to-html](https://www.npmjs.com/package/draftjs-to-html) | A library for converting DraftJS Editor content to plain HTML. This is used with `draft-js` |
| [react-draft-wysiwyg](https://www.npmjs.com/package/react-draft-wysiwyg) | A Wysiwyg editor built using ReactJS and DraftJS libraries. This is used with `draft-js` |