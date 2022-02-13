<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

import Timeline from './components/Timeline.vue'
import Slide from "./components/Slide.vue";
import FinishSlide from "./components/FinishSlide.vue";

type Slide = {
  date: string
  text: string
  caption: string
  img: string
  name: string
}

const slides: Array<Slide> = [
  { date: '14 февраля', caption: 'С чего все началось...', text: 'Классно организовал месячные', img: './assets/4.jpeg', name: '1' },
  { date: '5 мая', caption: 'Тусер 99 лвл', text: 'Классно отрывался весь год', img: './assets/6.jpeg', name: '2' },
  { date: '23 июня', caption: 'Кончита Вурст', text: 'Пытался поменять свой имидж', img: './assets/3.jpeg', name: '17' },
  { date: '4 июля', caption: 'Мечтатель', text: 'Грезил о светлом будущем с невестой', img: './assets/5.jpeg', name: '3' },
  { date: '4 июля тоже', caption: 'Батя', text: 'Был опорой, поддержкой и батей', img: './assets/7.jpeg', name: '4' },
  { date: '11 июля', caption: 'Кайф', text: 'Наслаждался жизнью с калюмбасиком', img: './assets/16.jpeg', name: '16' },
  { date: '27 июля', caption: 'Джобс', text: 'Мутил стартапы с друзьями', img: './assets/9.jpeg', name: '5' },
  { date: '1 августа', caption: 'Меломан', text: 'Слушал все, что только можно', img: './assets/10.jpeg', name: '6' },
  { date: '21 октября', caption: 'Стратег', text: 'Светлый ум', img: './assets/13.jpeg', name: '15' },
  { date: '6 ноября', caption: 'Сосок', text: 'Жарил як дьявол, еще и совращал соском', img: './assets/2.jpeg', name: '7' },
  { date: '13 ноября', caption: 'Брутал', text: 'Вокруг крутого самца, крутая самка', img: './assets/8.jpeg', name: '8' },
  { date: '11 декабря', caption: 'Лучшая спина', text: 'Был неотразим и фотогеничен как никогда', img: './assets/12.jpeg', name: '9' },
  { date: '12 декабря', caption: 'Семьянин', text: 'Зачал новую ячейку общества. Мужик!', img: './assets/15.jpeg', name: '10' },
  { date: '5 января', caption: 'Дамский угодник', text: 'Сиял, блистал и укрощал', img: './assets/1.jpeg', name: '12' },
  { date: '8 января', caption: 'Деревенский модник', text: 'Лучшие шашлыки от деда', img: './assets/11.jpeg', name: '13' },
  { date: '14 января', caption: 'Катала', text: 'Учил салаг рубиться в картишки и курить сигару', img: './assets/14.jpeg', name: '14' },
]

const currentSlideName = ref(slides[0].name)
const maxWidth = ref(0)
const audio = ref()
const containerAnimation = ref()

const timelineItems = computed(() => {
  const mainSlides = slides.map((item) => ({
    name: item.name,
    label: item.date,
    active: currentSlideName.value === item.name,
  }))

  return [
      ...mainSlides,
    {
      name: 'last',
      label: 'День Рождения',
      active: currentSlideName.value === 'last',
    }
  ]
})

const handleSelected = (slide: string) => {
  currentSlideName.value = slide
}

const playMusic = () => {
  audio.value = new Audio('music.mp3');
  audio.value.play();
}

onMounted(() => {
  const sections: Array<HTMLElement> = gsap.utils.toArray("section");

  const getMaxWidth = () => {
    maxWidth.value = 0;
    sections.forEach((s) => {
      maxWidth.value += s.offsetWidth;
    });
  };
  getMaxWidth();
  // ScrollTrigger.addEventListener("refreshInit", getMaxWidth);

  containerAnimation.value = gsap.to(sections, {
    // x: () => `-${maxWidth.value - window.innerWidth}`,
    xPercent: -100 * (sections.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: '.main-container',
      pin: true,
      scrub: 0.1,
      // end: () => `+=25000`,
      end: () => `+=${maxWidth.value}`,
      invalidateOnRefresh: true,
      snap: {
        snapTo: 1 / (sections.length - 1),
        duration: {
          min: 0.25,
          max: 0.75,
        },
        delay: 0.125,
        ease: "power1.inOut",
      },
    }
  });

  const res = confirm('Кликни по экрану, чтобы ощутить кайф, ок?')
  if(!res) {
    window.location.href='https://www.google.com/search?q=%D0%BF%D0%BE%D1%88%D0%B5%D0%BB+%D0%BD%D0%B0%D1%85%D1%83%D0%B9'
  }
  document.addEventListener('click', async () => {
    if(audio.value) {
      return
    }

    playMusic()
  })
})

</script>

<template>
  <Timeline :items="timelineItems" :max-width="maxWidth"  />
  <div class="main-container">
    <Slide
        v-for="(slide, i) in slides"
        v-bind="slide"
        :key="slide.name"
        :style="{ '--i': i }"
        :max-width="maxWidth"
        :container-animation="containerAnimation"
        @selected="handleSelected(slide.name)"
    />
    <FinishSlide
        :max-width="maxWidth"
        @selected="handleSelected('last')"
    />
  </div>
</template>

<style lang="sass">
*
  box-sizing: border-box

@media (prefers-reduced-motion: no-preference)
  html
    scroll-behavior: smooth

body
  --activeColor: rgb(240 240 240)
  --navBgColor: rgb(37 38 41)
  --navTextColor: rgb(144 144 150)
  --mainBg: rgb(20 20 23)

  font-family: 'Syncopate', sans-serif
  min-height: 100vh
  margin: 0
  color: var(--navBgColor)
  background: var(--mainBg)
  overflow-x: hidden
  width: 100vw

.main-container
  display: flex
  flex-wrap: nowrap
</style>
