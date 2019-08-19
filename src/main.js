import Vue from 'vue'
import VueResource from 'vue-resource'
import VueSmoothScroll from 'vue2-smooth-scroll'
import VueScrollReveal from 'vue-scroll-reveal'

import App from './App.vue'

import showdown from 'showdown'
import showdownTargetBlank from 'showdown-target-blank'


const converter = new showdown.Converter({extensions: [showdownTargetBlank]})

Vue.config.productionTip = false

Vue.use(VueResource)
Vue.use(VueSmoothScroll)
Vue.use(VueScrollReveal)

Vue.mixin({
  methods: {
    markdown(string) {
      return converter.makeHtml(string)
    },
    slugify(string) {
      const a = 'àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;'
      const b = 'aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------'
      const p = new RegExp(a.split('').join('|'), 'g')
      return string.toString().toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
        .replace(/&/g, '-and-') // Replace & with 'and'
        .replace(/[^\w-]+/g, '') // Remove all non-word characters
        .replace(/--+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, '') // Trim - from end of text
    }
  },
})

new Vue({
  render: h => h(App)
}).$mount('#app')

