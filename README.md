# Vue Slicksort RTL

## This is a fork of the [vue-slicksort](https://github.com/Jexordexan/vue-slicksort) that aims to fix bugs in RTL directions [(issue #191)](https://github.com/Jexordexan/vue-slicksort/issues/191)

![Slicksort logo](/logo/logomark.png)

> A set of component mixins to turn any list into an animated, touch-friendly, sortable list.
> Based on [react-sortable-hoc](https://github.com/clauderic/react-sortable-hoc) by [@clauderic]

[![npm version](https://img.shields.io/npm/v/vue-slicksort.svg)](https://www.npmjs.com/package/vue-slicksort)
[![npm downloads](https://img.shields.io/npm/dm/vue-slicksort.svg)](https://www.npmjs.com/package/vue-slicksort)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?maxAge=2592000)](https://github.com/Jexordexan/vue-slicksort/blob/master/LICENSE)
![gzip size](http://img.badgesize.io/https://npmcdn.com/vue-slicksort?compression=gzip)

<p align="center">
  <a href="https://vue-slicksort.netlify.app/">
    <img src="logo/demo.gif">
  </a>
</p>

### Examples available here: [vue-slicksort.netlify.app/](https://vue-slicksort.netlify.app/)

### [中文文档](./doc/zh.md)

## Features

- **`v-model` Compatible** – Make any array editable with the `v-model` standard
- **Mixin Components** – Integrates with your existing components
- **Standalone Components** – Easy to use components for slick lists
- **Drag handle, auto-scrolling, locked axis, events, and more!**
- **Suuuper smooth animations** – Chasing the 60FPS dream 🌈
- **Horizontal lists, vertical lists, or a grid** ↔ ↕ ⤡
- **Touch support** 👌
- **Oh yeah, and it's DEPENDENCY FREE!** 👌

## Installation

Using [npm](https://www.npmjs.com/package/vue-slicksort):

```
  $ npm install vue-slicksort-rtl
```

Then, using a module bundler that supports either CommonJS or ES2015 modules, such as [webpack](https://github.com/webpack/webpack):

```js
// Using an ES6 transpiler like Babel
import { ContainerMixin, ElementMixin } from 'vue-slicksort';

// Not using an ES6 transpiler
var slicksort = require('vue-slicksort');
var ContainerMixin = slicksort.ContainerMixin;
var ElementMixin = slicksort.ElementMixin;
```

If you are loading the package via `<script>` tag:

```html
<script>
  var { ContainerMixin, ElementMixin, HandleDirective } = window.VueSlicksort;
</script>
```

## Usage

Check out the docs:  [vue-slicksort.netlify.app](https://vue-slicksort.netlify.app/)


<!-- More code examples are available [here](https://github.com/Jexordexan/vue-slicksort/blob/master/examples/). -->

## Why should I use this?

There are already a number of great Drag & Drop libraries out there (for instance, [vuedraggable](https://github.com/SortableJS/Vue.Draggable) is fantastic). If those libraries fit your needs, you should definitely give them a try first. However, most of those libraries rely on the HTML5 Drag & Drop API, which has some severe limitations. For instance, things rapidly become tricky if you need to support touch devices, if you need to lock dragging to an axis, or want to animate the nodes as they're being sorted. Vue Slicksort aims to provide a simple set of component mixins to fill those gaps. If you're looking for a dead-simple, mobile-friendly way to add sortable functionality to your lists, then you're in the right place.

