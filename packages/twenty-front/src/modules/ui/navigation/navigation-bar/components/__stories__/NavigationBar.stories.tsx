import { Meta, StoryObj } from '@storybook/react';

import {
  IconCheckbox,
  IconList,
  IconSearch,
  IconSettings,
} from '@/ui/display/icon';
import { ComponentDecorator } from '~/testing/decorators/ComponentDecorator';
import { ComponentWithRouterDecorator } from '~/testing/decorators/ComponentWithRouterDecorator';

import { NavigationBar } from '../NavigationBar';

const meta: Meta<typeof NavigationBar> = {
  title: 'UI/Navigation/NavigationBar/NavigationBar',
  component: NavigationBar,
  args: {
    activeItemName: 'main',
    items: [
      { name: 'main', Icon: IconList, onClick: () => undefined },
      { name: 'search', Icon: IconSearch, onClick: () => undefined },
      { name: 'tasks', Icon: IconCheckbox, onClick: () => undefined },
      { name: 'settings', Icon: IconSettings, onClick: () => undefined },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof NavigationBar>;

export const Default: Story = {
  decorators: [ComponentDecorator, ComponentWithRouterDecorator],
};
