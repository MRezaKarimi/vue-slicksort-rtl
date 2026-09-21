import { mount } from '@cypress/vue';
import { SlickList, SlickItem } from './index';
import { ref } from 'vue';

// A horizontal list. In `rtl` the items are laid out right-to-left, so index
// order runs against the `left` offsets the sorting math is built on.
const horizontalList = (dir) => ({
  setup() {
    const list = ref(['a', 'b', 'c', 'd']);
    return () => (
      <div dir={dir}>
        <SlickList v-model:list={list.value} axis="x" data-cy="list" style="display: flex">
          {list.value.map((item, i) => (
            <SlickItem key={item} index={i} data-cy="item" style="width: 50px; padding: 10px">
              {item}
            </SlickItem>
          ))}
        </SlickList>
      </div>
    );
  },
});

// Drags the item at `from` onto the slot the item at `to` currently occupies.
// Works off measured positions, so it means the same thing in both directions.
function dragToSlot(from, to) {
  cy.get('cy:item').then(($items) => {
    const start = $items[from].getBoundingClientRect();
    const target = $items[to].getBoundingClientRect();

    cy.wrap($items[from]).trigger('mousedown', { which: 1 });
    cy.document()
      .trigger('mousemove', {
        pageX: target.left + start.width / 2,
        pageY: start.top + start.height / 2,
      })
      .trigger('mouseup', { force: true });
  });
}

// Both directions must agree: dropping an item on a slot puts it at that index.
// Before the RTL fix, `rtl` sent every item to the end of the list instead.
['rtl', 'ltr'].forEach((dir) => {
  describe(`horizontal list with dir="${dir}"`, () => {
    beforeEach(() => mount(horizontalList(dir)));

    it('moves an item one slot forward', () => {
      dragToSlot(0, 1);
      cy.get('cy:list').should('have.text', 'bacd');
    });

    it('moves an item one slot backward', () => {
      dragToSlot(2, 1);
      cy.get('cy:list').should('have.text', 'acbd');
    });

    it('moves an item to the end of the list', () => {
      dragToSlot(0, 3);
      cy.get('cy:list').should('have.text', 'bcda');
    });

    it('moves an item back to the start of the list', () => {
      dragToSlot(3, 0);
      cy.get('cy:list').should('have.text', 'dabc');
    });
  });
});
