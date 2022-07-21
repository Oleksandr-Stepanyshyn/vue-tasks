import { mount } from '@vue/test-utils';
import ProcessSelection from '@/components/ProcessSelection.vue';

const options = [
  { id: 1, label: 'Accepted', color: '#04ff00', checked: false },
  { id: 2, label: 'In process', color: '#fff700', checked: true },
  { id: 3, label: 'Rejected', color: '#ff1100', checked: false },
  {
    id: 4,
    label:
      'Postponed Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium eligendi eveniet porro optio sed odio rem veniam debitis quia numquam.',
    color: '#00fffb',
    checked: true,
  },
  { id: 5, label: 'Returned', color: '#0015ff', checked: false },
];

describe('ProcessSelection', () => {
  test(' render checkbox', () => {
    const wrapper = mount(ProcessSelection, {
      propsData: {
        options,
        showCheckbox: true,
        value: { id: 2, label: 'In process', color: '#fff700', checked: true },
      },
    });

    const checkbox = wrapper.findComponent('.custom-checkbox');

    expect(checkbox.exists()).toBeTruthy();
  });

  test('do not render checkbox', () => {
    const wrapper = mount(ProcessSelection, {
      propsData: {
        options,
        showCheckbox: false,
        value: { id: 3, label: 'Rejected', color: '#ff1100', checked: false },
      },
    });

    const checkbox = wrapper.findComponent('.custom-checkbox');

    expect(checkbox.exists()).toBeFalsy();
  });

  test(' render title text "In process"', () => {
    const wrapper = mount(ProcessSelection, {
      propsData: {
        options,
        showCheckbox: true,
        value: { id: 2, label: 'In process', color: '#fff700', checked: true },
      },
    });

    const title = wrapper.findComponent('.title__text');

    expect(title.text()).toBe('In process');
  });

  test(' render title text "Rejected"', () => {
    const wrapper = mount(ProcessSelection, {
      propsData: {
        options,
        showCheckbox: true,
        value: { id: 3, label: 'Rejected', color: '#ff1100', checked: false },
      },
    });

    const title = wrapper.findComponent('.title__text');

    expect(title.text()).toBe('Rejected');
  });

  test(' render title text by default "Please select"', () => {
    const wrapper = mount(ProcessSelection, {
      propsData: {
        options,
        showCheckbox: true,
        value: {},
      },
    });

    const title = wrapper.findComponent('.title__text');

    expect(title.text()).toBe('Please select');
  });

  test('data focusedOptionIndex = 2', () => {
    const wrapper = mount(ProcessSelection, {
      propsData: {
        options,
        showCheckbox: true,
        value: { id: 3, label: 'Rejected', color: '#ff1100', checked: false },
      },
    });

    expect(wrapper.vm.focusedOptionIndex).toBe(2);
  });

  test('data focusedOptionIndex = -1', () => {
    const wrapper = mount(ProcessSelection, {
      propsData: {
        options,
        showCheckbox: true,
        value: {},
      },
    });

    expect(wrapper.vm.focusedOptionIndex).toBe(-1);
  });

  test('"click" on a title can rewrite data areOptionsVisible = true', async () => {
    const wrapper = mount(ProcessSelection, {
      propsData: {
        options,
        showCheckbox: true,
        value: { id: 2, label: 'In process', color: '#fff700', checked: true },
      },
    });

    const title = wrapper.findComponent('.title__text');

    await title.trigger('click');

    expect(wrapper.vm.areOptionsVisible).toBe(true);
  });

  test('"click" on a title render select__list', async () => {
    const wrapper = mount(ProcessSelection, {
      propsData: {
        options,
        showCheckbox: true,
        value: { id: 2, label: 'In process', color: '#fff700', checked: true },
      },
    });

    const title = wrapper.findComponent('.title__text');

    await title.trigger('click');

    const optionsList = wrapper.findComponent('.select__list');

    expect(optionsList.exists()).toBeTruthy();
  });

  test('Keydown "Enter" on a title render select__list', async () => {
    const wrapper = mount(ProcessSelection, {
      propsData: {
        options,
        showCheckbox: true,
        value: { id: 2, label: 'In process', color: '#fff700', checked: true },
      },
    });

    const title = wrapper.findComponent('.title__text');

    await title.trigger('keydown.enter');

    const optionsList = wrapper.findComponent('.select__list');

    expect(optionsList.exists()).toBeTruthy();
  });

  test('"click" on a options[2] from select__list remove focusedOptionIndex = 2', async () => {
    const wrapper = mount(ProcessSelection, {
      propsData: {
        options,
        showCheckbox: true,
        value: { id: 2, label: 'In process', color: '#fff700', checked: true },
      },
    });

    let title = wrapper.findComponent('.title__text');

    await title.trigger('click');

    const option = wrapper.findAll('.select__item').at(2);

    await option.trigger('click');

    expect(wrapper.vm.focusedOptionIndex).toBe(2);
  });
});
