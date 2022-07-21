import { mount } from '@vue/test-utils';
import ProcessSelection from '@/components/ProcessSelection.vue';

describe('component ProcessSelection', () => {
  const wrapper = mount(ProcessSelection);

  it('отображает корректную разметку', () => {
    expect(wrapper.html())
      .toContain(`<label class="checkbox__label" v-if="showCheckbox" for="checkbox">
        <span class="checkbox__icon" :style="{ borderColor: value.color }">
          <svg width="14" height="14">
            <use href="@/images/sprite.svg#icon-check"></use>
          </svg>
        </span>
      </label>`);
  });

  it('имеет кнопку', () => {
    expect(wrapper.contains('input')).toBe(true);
  });
});
