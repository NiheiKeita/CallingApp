import type { Meta, StoryObj } from '@storybook/vue3';
import TabDefault from '../../components/button/TabDefault.vue';

type Story = StoryObj<typeof TabDefault>;

const meta: Meta<typeof TabDefault> = {
  title: 'TabDefault',
  component: TabDefault,
};

export const Default: Story = {
  render: () => ({
    components: { TabDefault },
    template: "<TabDefault msg='ボタン' />",
  }),
};

export default meta;
