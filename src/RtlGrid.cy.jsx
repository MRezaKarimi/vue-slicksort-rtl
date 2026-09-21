import { mount } from '@cypress/vue';
import { SlickList, SlickItem } from './index';
import { ref } from 'vue';

// A 3-column grid. `transition-duration` is off so the transforms below land
// instantly and positions can be measured exactly.
const gridList = (dir) => ({
  setup() {
    const list = ref(['1', '2', '3', '4', '5', '6', '7', '8', '9']);
    return () => (
      <div dir={dir}>
        <SlickList
          v-model:list={list.value}
          axis="xy"
          data-cy="list"
          transitionDuration={0}
          style="display: flex; flex-wrap: wrap; width: 240px"
        >
          {list.value.map((item, i) => (
            <SlickItem key={item} index={i} data-cy="item" style="width: 80px; height: 40px; box-sizing: border-box">
              {item}
            </SlickItem>
          ))}
        </SlickList>
      </div>
    );
  },
});

// Holds a drag mid-flight and checks where the other items have animated to.
// `slots` maps an item index to the index whose original position it should
// have taken. This is the part a final-order assertion cannot see.
function expectSlotsWhileDragging(from, to, slots) {
  cy.get('cy:item').then(($items) => {
    const original = [...$items].map((el) => el.getBoundingClientRect());

    cy.wrap($items[from]).trigger('mousedown', { which: 1 });
    cy.document().trigger('mousemove', {
      pageX: original[to].left + original[from].width / 2,
      pageY: original[to].top + original[from].height / 2,
    });

    cy.then(() => {
      Object.entries(slots).forEach(([item, slot]) => {
        const now = $items[Number(item)].getBoundingClientRect();
        expect(now.left, `item ${item} left`).to.be.closeTo(original[slot].left, 1);
        expect(now.top, `item ${item} top`).to.be.closeTo(original[slot].top, 1);
      });
    });

    cy.document().trigger('mouseup', { force: true });
  });
}

// While dragging across rows, the item at the end of a row has to wrap onto the
// adjacent row rather than slide sideways out of the grid. The drop index was
// already correct in `rtl` before this was fixed -- only the animation was wrong,
// so these assert positions mid-drag as well as the final order.
['rtl', 'ltr'].forEach((dir) => {
  describe(`grid with dir="${dir}"`, () => {
    beforeEach(() => mount(gridList(dir)));

    it('wraps the end of a row onto the next row', () => {
      // Drag 4 onto 1: 1 and 2 shift one slot forward, 3 wraps onto the next
      // row into the slot 4 came from.
      expectSlotsWhileDragging(3, 0, { 0: 1, 1: 2, 2: 3 });
      cy.get('cy:list').should('have.text', '412356789');
    });

    it('wraps the start of a row onto the previous row', () => {
      // Drag 1 onto 4: 2 and 3 shift one slot back, 4 wraps onto the previous
      // row into the slot 3 came from.
      expectSlotsWhileDragging(0, 3, { 1: 0, 2: 1, 3: 2 });
      cy.get('cy:list').should('have.text', '234156789');
    });
  });
});
