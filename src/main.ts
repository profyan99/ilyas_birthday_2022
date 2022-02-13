import { createApp } from 'vue'
import App from './App.vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ScrollTo from 'gsap/ScrollToPlugin'
import Draggable from 'gsap/Draggable'
import TextPlugin from 'gsap/TextPlugin'
import EasePack from 'gsap/EasePack'

gsap.registerPlugin(ScrollTrigger, ScrollTo, Draggable, TextPlugin, EasePack)

createApp(App).mount('#app')
