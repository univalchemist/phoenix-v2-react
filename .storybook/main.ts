import type { StorybookConfig } from '@storybook/react-vite'
import svgrPlugin from "vite-plugin-svgr";

const { loadEnv } = require('vite');
const tsconfigPaths = require('vite-tsconfig-paths');

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  viteFinal: (config, ...args) => {
    const env = loadEnv('development', process.cwd());
    const envWithProcessPrefix = Object.entries(env).reduce(
      (prev, [key, val]) => {
        return {
          ...prev,
          ['process.env.' + key]: `"${val}"`,
        };
      },
      {},
    );

    return {
      ...config,
      define: envWithProcessPrefix,
      plugins: [
        ...(config.plugins || []),
        svgrPlugin({
          exportAsDefault: true,
          svgrOptions: {
            icon: true,
          },
        }),
        tsconfigPaths.default(),
      ],
    };
  },
}
export default config
