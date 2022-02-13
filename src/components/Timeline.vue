<script setup lang="ts">
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import {onMounted, defineProps} from "vue";

const props = defineProps<{
  items: Array<{
    label: string
    name: string
    active: boolean
  }>
  maxWidth: number
}>()

onMounted(() => {
  const track: HTMLElement = document.querySelector('[data-draggable]')!

  const tl = gsap.timeline().to(track, {
    x: () => -3072,
    ease: 'none',
  })
  ScrollTrigger.create({
    animation: tl,
    trigger: 'main',
    start: () => 0,
    end: () => `+=${props.maxWidth}`,
    scrub: 0,
  })
})
</script>

<template>
  <nav>
    <div class="marker"></div>

    <div class="nav__track" data-draggable>
      <ul class="nav__list">
        <li v-for="item in items" :key="item.name">
          <span class="nav__link" :class="{ 'is-active': item.active }" data-link>
            <span>{{ item.label }}</span>
          </span>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style lang="sass">
nav
  position: fixed
  top: 0
  left: 0
  width: 100%
  background: var(--navBgColor)
  color: var(--navTextColor)
  z-index: 2
  height: 6rem

  &::after
    content: ''
    position: absolute
    top: 1.7rem
    left: 0
    width: 100%
    height: 0.25rem
    background: currentColor
    pointer-events: none

.nav
  &__track
    position: relative
    min-width: max(200rem, 200%)
    padding: 1.5rem max(100rem, 100%) 0 0
    height: 6rem

  &__list
    list-style: none
    margin: 0
    padding: 0

    display: flex

  &__link
    position: relative
    display: block
    width: 12rem
    padding: 2.25rem 1rem 0.5rem
    text-align: center
    color: inherit
    text-decoration: none
    z-index: 1
    transition: color 150ms

    &:hover,
    &:focus
      color: var(--activeColor)

    &::after
      content: ''
      position: absolute
      top: 0
      left: 50%
      width: 0.65rem
      height: 0.65rem
      background-color: currentColor
      border-radius: 50%
      transform: translate3d(-50%, 0, 0)
      transform-origin: center center

    span
      display: block
      transition: transform 200ms

    &.is-active
      span
        transform: scale(1.4)
        color: var(--activeColor)

      &::after
        display: none

.marker
  position: fixed
  top: 1.75rem
  left: 6rem
  width: 1rem
  height: 1rem
  transform: translate3d(-50%, -50%, 0)
  background: var(--activeColor)
  border-radius: 100%
  z-index: 2000

  &::before
    content: ''
    position: absolute
    top: calc(50% - 0.2rem)
    right: 100%
    width: 6rem
    height: 0.4rem
    background-color: var(--activeColor)

</style>