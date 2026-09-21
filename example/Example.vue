<template>
  <div class="rtl-example">
    <header class="bar">
      <h1>Sorting in RTL <small>(issue #191)</small></h1>
      <div class="controls">
        <label><input v-model="dir" type="radio" value="rtl" /> dir="rtl"</label>
        <label><input v-model="dir" type="radio" value="ltr" /> dir="ltr"</label>
        <button type="button" @click="reset">Reset lists</button>
        <label><input v-model="showGroupExample" type="checkbox" /> group example</label>
      </div>
    </header>

    <p class="hint">
      Drag an item one slot at a time and watch where it lands. Both directions have to behave the same way: the item
      follows the cursor, its neighbours open a single gap, and it drops into the slot you left it on. With the bug,
      <code>rtl</code> sent the item straight to the end of the list and shifted every other item at once.
    </p>

    <div class="panels">
      <section v-for="demo in demos" :key="demo.axis" class="panel">
        <h2>{{ demo.title }} <code>axis="{{ demo.axis }}"</code></h2>
        <!-- `dir` sits on an ancestor rather than on the list itself, so this
             also covers the direction being inherited from further up the tree -->
        <div :dir="dir">
          <SlickList
            v-model:list="demo.items"
            :axis="demo.axis"
            tag="ul"
            class="demo-list"
            :class="`axis-${demo.axis}`"
            helper-class="demo-helper"
          >
            <SlickItem v-for="(item, index) in demo.items" :key="item" :index="index" tag="li" class="demo-item">
              {{ item }}
            </SlickItem>
          </SlickList>
        </div>
        <output class="order">index order: {{ demo.items.join(' · ') }}</output>
      </section>
    </div>

    <section v-if="showGroupExample" class="group-example">
      <h2>Group example</h2>
      <GroupExample />
    </section>
  </div>
</template>

<script>
import { SlickList, SlickItem } from '../src';
import { range } from './util';

import GroupExample from './components/GroupExample.vue';

// The three axes the direction fix touches. `y` is the control: it was never
// affected by direction, so it should look identical in rtl and ltr.
const demos = () => [
  { axis: 'x', title: 'Horizontal', items: ['A', 'B', 'C', 'D', 'E'] },
  { axis: 'xy', title: 'Grid', items: range(9).map((i) => `${i + 1}`) },
  { axis: 'y', title: 'Vertical', items: ['One', 'Two', 'Three', 'Four'] },
];

export default {
  name: 'Example',
  components: {
    SlickList,
    SlickItem,
    GroupExample,
  },
  data() {
    return {
      dir: 'rtl',
      showGroupExample: false,
      demos: demos(),
    };
  },
  methods: {
    reset() {
      this.demos = demos();
    },
  },
};
</script>

<style lang="scss" scoped>
.rtl-example {
  padding: 24px 32px 48px;
}

.bar {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 8px 24px;

  h1 {
    margin: 0;
    font-size: 20px;
  }

  small {
    color: #888;
    font-weight: normal;
  }
}

.controls {
  display: flex;
  align-items: center;
  gap: 16px;

  label {
    cursor: pointer;
    user-select: none;
  }

  button {
    font: inherit;
    padding: 4px 12px;
    cursor: pointer;
    border: 1px solid #ccc;
    border-radius: 3px;
    background: #fff;
  }
}

.hint {
  max-width: 70ch;
  color: #555;
  line-height: 1.5;

  code {
    background: #eee;
    padding: 1px 4px;
    border-radius: 3px;
  }
}

.panels {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 32px;
}

.panel {
  h2 {
    font-size: 14px;
    font-weight: 600;
    margin: 0 0 8px;

    code {
      font-weight: normal;
      color: #888;
    }
  }
}

// Own class names so the demo does not inherit the `.list` / `.list-item`
// rules in index.html, which the group example still relies on.
.demo-list {
  list-style: none;
  margin: 0;
  padding: 6px;
  background: #ececec;
  border: 1px solid #ddd;
  border-radius: 3px;

  &.axis-x {
    display: flex;
  }

  &.axis-xy {
    display: flex;
    flex-wrap: wrap;
    width: 260px;
  }
}

.demo-item {
  padding: 14px 18px;
  margin: 3px;
  min-width: 48px;
  box-sizing: border-box;
  text-align: center;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 3px;
  cursor: grab;
  user-select: none;
}

.axis-xy .demo-item {
  width: 74px;
}

// Applied to the cloned node that follows the cursor
.demo-helper {
  cursor: grabbing;
  border-color: #4a90d9;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.group-example {
  margin-top: 40px;
  padding-top: 24px;
  border-top: 1px solid #ddd;

  h2 {
    font-size: 14px;
    font-weight: 600;
    margin: 0;
  }

  // The group example brings its own `.root` layout from index.html, which
  // assumes it is the only thing on the page
  :deep(.root) {
    width: 100%;
    align-items: flex-start;
    gap: 24px;
  }
}

.order {
  display: block;
  margin-top: 8px;
  font-family: monospace;
  font-size: 12px;
  color: #666;
}
</style>
