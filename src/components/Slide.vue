<script setup lang="ts">
import gsap from 'gsap'
import {ref, defineEmits, watch} from "vue"

const el = ref()
const emit = defineEmits(['selected'])
const props = defineProps<{
  date: string,
  name: string,
  text: string,
  caption: string,
  img: string,
  maxWidth: number
  containerAnimation?: GSAPAnimation
}>()

watch(() => props.containerAnimation, () => {
  if(!props.containerAnimation) {
    return
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

  const initSectionAnimation = () => {
    if (prefersReducedMotion.matches) {
      return
    }

    const section = el.value
    const heading = section.querySelector('h2')
    const image = section.querySelector('.section__image')

    gsap.set(heading, {
      opacity: 0,
      y: 50
    })
    gsap.set(image, {
      opacity: 0,
      rotateY: 15
    })

    gsap.timeline({
      scrollTrigger: {
        trigger: section,
        containerAnimation: props.containerAnimation,
        start: 'left center',
        onToggle: ({isActive}) => {
          if (isActive) {
            emit('selected')
          }
        },
        toggleActions: 'play reverse play reverse',
      }
    }).to(image, {
      opacity: 1,
      rotateY: -5,
      duration: 6,
      ease: 'elastic'
    }).to(heading, {
      opacity: 1,
      y: 0,
      duration: 2
    }, 0.5)
  }

  initSectionAnimation()
})
</script>

<template>
  <section ref="el" :id="`slide_${name}`">
    <div class="container">
      <h2 class="section__heading">
        <span>{{ caption }}</span>
        <span>{{ text }}</span>
      </h2>
      <div class="section__image">
        <img :src="img" width="1200" height="1200"/>
      </div>
    </div>
  </section>
</template>

<style scoped lang="sass">
section
  --h: calc(var(--i) * 30)

  height: 100vh
  width: 100vw
  padding: 6rem 0 max(5vh, 1rem)
  display: flex
  flex-shrink: 0
  justify-content: center
  align-items: center
  background-color: hsl(var(--h, 0) 75% 60%)

.container
  width: 100%
  padding: 0 max(5vw, 1rem)
  transform-style: perspective-3d
  perspective: 900px

  @media (min-width: 32em)
    display: grid
    grid-template-columns: repeat(7, minmax(0, 1fr))
    gap: 1rem

.section
  &__heading
    font-size: clamp(2rem, 12vmin, 7rem)
    line-height: 1
    letter-spacing: -0.06em
    margin: 0 0 1rem
    grid-row: 1
    grid-column: 1 / span 7
    align-self: end
    position: relative
    z-index: 1

    span
      display: block

    span:first-child
      font-size: clamp(1rem, 8vmin, 3rem)
      letter-spacing: 0.05rem
      font-weight: 800
      text-transform: uppercase
      color: #ffffff

    span:nth-child(2)
      word-break: break-word

  &__image
    grid-row: 1
    grid-column: 5 / span 3
    position: relative
    box-shadow: 0.7rem 0.7rem 8rem rgb(0 0 0 / 0.3)
    align-self: center

    &::after
      content: ''
      position: absolute
      top: 0
      left: 0
      bottom: 0
      right: 0
      background-color: hsl(var(--h, 0) 40% 30%)
      mix-blend-mode: screen

    img
      filter: brightness(0.5) grayscale(100%)
      max-height: 600px
      object-fit: cover

img
  display: block
  width: 100%
  height: auto
  max-width: 100%
</style>