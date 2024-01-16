import React from 'react';
import type { Preview } from '@storybook/react'
import { MemoryRouter } from 'react-router';

import './main.scss'
import '../src/App.scss'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}

export const decorators = [
  (Story) => {
    return (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    );
  },
];
