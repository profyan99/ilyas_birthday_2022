<script setup lang="ts">
import gsap from 'gsap'
import {defineEmits, onMounted, ref} from "vue"

const el = ref()
const wrapper = ref()
const birthText = `
Илья! Спасибо тебе за этот ахуенный год, без тебя он бы не был таким! Желаю тебе успехов в карьере,
чтобы разъебал всех гоферов и стал самым гошным самым трушным, чтобы твои тусовки были еще круче, на которых будут и нефорки,
и бляди, и гачи-мэны, и все кто пожелаешь! Успешного поступления в аспу/ШАД, перебирайся быстрее в МСК, кальянный босс!!
Всех благ, большой любви и много денег!!!!! С ДНЕМ ВАРЕНИЯ!!
`
const emit = defineEmits(['selected'])
const props = defineProps<{
  maxWidth: number
}>()


const machineGun = (text: string) => {
  const container = el.value
  const section = wrapper.value
  const _sentenceEndExp = /([.?!])$/g
  const words = text.split(/\s+/),
      tl = gsap.timeline({
        delay: 0.6,
        repeat: 0,
        scrollTrigger: {
          trigger: container,
          start: () => 'top top-=' + (section.offsetLeft - window.innerWidth / 2) * (props.maxWidth / (props.maxWidth - window.innerWidth)),
          end: () => '+=' + section.offsetWidth * (props.maxWidth / (props.maxWidth - window.innerWidth)),
          onToggle: ({isActive}) => {
            if (isActive) {
              emit('selected')
            }
          },
          toggleActions: 'play reverse play reverse',
        }
      }),
      wordCount = words.length
  let time = 0,
      word,
      element,
      duration,
      isSentenceEnd

  for (let i = 0; i < wordCount; i++) {
    word = words[i]
    isSentenceEnd = _sentenceEndExp.test(word)

    element = document.createElement('h3')
    element.innerHTML = word
    container.appendChild(element)
    duration = Math.max(0.5, word.length * 0.08)
    if (isSentenceEnd) {
      duration += 0.6
    }

    gsap.set(element, {autoAlpha:0, scale:0, z:0.01});
    tl.to(element, duration, {scale:1.2,  ease:"slow(0.25, 0.9)"}, time)
        .to(element, duration, {autoAlpha:1, ease:"slow(0.25, 0.9)"}, time)
        .to(element, duration, { delay: 0.2, autoAlpha: 0 }, time + 0.2)
    time += duration - 0.05;
    if (isSentenceEnd) {
      time += 0.6;
    }
  }
}

onMounted(() => {
  machineGun(birthText)
})

</script>

<template>
  <section class="finish_container" ref="wrapper">
    <div id="finish_title" ref="el">
      <h3>test</h3>
    </div>
  </section>
</template>

<style lang="sass">
.finish_container
  width: 100vw
  height: 100vh
  display: flex
  align-items: center
  justify-content: center
  flex-shrink: 0
  background-color: #000
  color: white

#finish_title
  display: flex
  align-items: center
  justify-content: center
  position: relative
  width: 100%
  height: 300px
  background-color: #000
  margin: auto
  overflow: hidden
  font-family: 'Asap', sans-serif

  h3
    position: absolute
    font-weight: 700
    margin: 0
    padding: 0
    width: 800px
    text-align: center
    visibility: hidden
    font-size: 120px
    top: 65px

</style>