<template>
  <div id="app">
    <a id="top" />
    <div @click="showMenu = false"
         :class="['menu', 'show-sm', showMenu ? 'active' : '']">
      <div class="logo" />
      <a v-for="(section, index) in content.sections" 
         v-smooth-scroll="{offset: -75, duration: 250}"
         :ref="'nav-' + slugify(section.title)"
         :key="index" 
         :href="'#' + slugify(section.title)"
         class="link">
        <!-- These ids should be made unique -->
        <h1>{{ section.title }}</h1></a>
    </div>
    <nav ref="nav">
      <div class="wrapper container-fluid">
        <div class="col-sm-12 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
          <a href="#top" v-smooth-scroll="{duration: 250}" @click="showMenu = false">
            <h2 class="hover-primary">S&#x2260;A</h2>
          </a>
          <div @click="showMenu = !showMenu" class="menu-toggle show-sm">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <a v-for="(section, index) in content.sections" 
             class="link show-upper"
             v-smooth-scroll="{offset: -75, duration: 250}"
             :ref="'nav-' + slugify(section.title)"
             :key="index" 
             :href="'#' + slugify(section.title)">
            {{ section.title }}</a>
        </div>
      </div>
    </nav>
    <header ref="hero">
      <div class="wrapper container-fluid">
        <div class="col-lg-offset-3 col-lg-6">
          <div class="logo" />
        </div>
        <h1>&gt; A project of <a href="https://beautifultrouble.org/" target="_blank">Beautiful Trouble</a></h1>
      </div>
    </header>
    <article>
      <div class="wrapper container-fluid">
        <div class="col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
          <section v-for="(section, index) in content.sections"
                   v-scroll-reveal.reset="{origin: 'left', distance: '50px', opacity: .2}"
                   :key="index"
                   :id="slugify(section.title)">
            <h1 @click="navTo(section.title)" class="hover-primary">{{ section.title }}</h1>
            <div v-if="slugify(section.title) == 'bio'" class="bio-pic" />
            <div v-html="markdown(section.content)" />
            <div v-if="slugify(section.title) == 'principles-of-solidarity'">
              <form @submit="submitForm">
                <div class="row">
                  <div class="col-sm-12">
                    <textarea name="suggestion" placeholder="write or describe a solidarity principle" class="feedback" required v-model="suggestion"/>
                  </div>
                  <div class="col-sm-12 col-md-5">
                    <input name="name" type="text" placeholder="name" class="feedback" v-model="name"/>
                  </div>
                  <div class="col-sm-12 col-md-5">
                    <input name="email" type="email" placeholder="email" class="feedback" v-model="email"/>
                  </div>
                  <div class="col-sm-12 col-md-2">
                    <input type="submit" value="Submit"/>
                  </div>
                </div>
                <h3 :style="{color: formError ? 'red' : 'inherit'}">{{ result }}</h3>
              </form>
            </div>
          </section>
        </div>
      </div>
    </article>
    <footer>
      <div class="wrapper container-fluid">
        <div class="col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
          <img src="./logo-inverse.png" class="dib logo">
          <a href="https://beautifultrouble.org" target="_blank">
            <img src="./logo-bt-inverse.png" class="logo bt">
          </a>
          <a :href="content.mailto" target="_blank" class="db spaced">Contact</a>
          <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="CC BY-NC-SA 4.0" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a>
          <p class="dib">Beautiful Trouble 2019, solidaritynotaid.com v1.0.6</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import Headroom from 'headroom.js'
import content from './content.aml'

export default {
  data: () => ({
    content: content,
    showMenu: false,
    name: '',
    email: '',
    suggestion: '',
    result: '',
    formError: false,
  }),
  methods: {
    navTo(title) { // eslint-disable-next-line
      try { this.$refs['nav-' + this.slugify(title)][0].click() } catch (e) { }
    },
    submitForm(e) {
      e.preventDefault()
      this.formError = false;
      let url = 'https://google-forms.beautifultrouble.org/forms/d/e/1FAIpQLSdo44FE4PE8ppSwkWpQw4npzdA2l92ghCs7iOEUtaiS4Luc6Q/formResponse'
      this.$http.get(url, {params: {
          usp: 'pp_url',
          'entry.1978900174': this.name,
          'entry.673330758': this.email,
          'entry.650237374': this.suggestion,
          submit: 'Submit',
        }}).then(() => {
          this.name = ''
          this.email = ''
          this.suggestion = ''
          this.result = 'Thanks!'
        }).catch(() => {
          this.formError = true;
          this.result = 'Sorry, something went wrong. Please get in touch by email!'
        })
    }
  },
  mounted() {
    let headroom = new Headroom(this.$refs.nav, {
      offset: this.$refs.hero.clientHeight - this.$refs.nav.clientHeight,
    })
    headroom.init()
  }
}
</script>


<style lang="scss">
// Breakpoints
@import 'breakpoint-sass/stylesheets/_breakpoint.scss';

$lg_width: 1280px;
$md_width: 960px;
$sm_width: 0px; // real min-width might be 480px

$lg: $lg_width;
$md: $md_width $lg_width - 1px;
$sm: $sm_width $md_width - 1px;
$upper: $md_width;
$lower: $sm_width $lg_width - 1px;


// Grid system
$outer-margin: 0;
$gutter-width: 15px;

$breakpoints:
    sm 0px $md_width - 1px,
    md $md_width $lg_width - 1px,
    lg $lg_width 10000px;
$flexboxgrid-max-width: 1280px - $gutter-width;

@import 'flexboxgrid-sass/flexboxgrid.scss';


// Theme
@import url('https://fonts.googleapis.com/css?family=Lexend+Deca&display=swap');
@font-face {
  font-family: 'A Love of Thunder';
  src: url('a_love_of_thunder.woff') format('woff'),
       url('a_love_of_thunder.ttf') format('truetype');
}

$nav-height: 50px;

$primary: #2a3073;
$dark: #333333;
$med: #adadad;
$light: #f5f5f5;
$accent: #69f30a;
$text: #2c3e51;

$accent1: #f58b58;
$accent2: #ffd00b;
$accent3: #69f30a;
$accent4: #6ec6c9;


// Utilities
@function tint($color, $percentage) {
  @return mix(white, $color, $percentage);
}
@function shade($color, $percentage) {
  @return mix(black, $color, $percentage);
}

.show-sm {
  @include breakpoint($upper) {
    display: none;
  }
}
.show-upper {
  @include breakpoint($sm) {
    display: none;
  }
}
.db { display: block; }
.dib { display: inline-block; vertical-align: top; }

@include breakpoint($upper) {
  .hover-primary {
    transition: all .2s ease-in-out;
    &:hover { color: $primary }
  }
}


html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
body {
  margin: 0 auto;
  font-family: 'Lexend Deca', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $text;
}
a {
  text-decoration: none;
  color: $dark;
}
h1, h2 {
  font-family: 'A Love of Thunder', Helvetica, Arial, sans-serif;
  font-weight: normal;
  line-height: 1;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: tint($primary, 30%);
}
nav {
  &.headroom {
    height: $nav-height;
    z-index: 9999;
    position: fixed;
    top: 0;
    left: 0; right: 0;
    will-change: transform;
    transform: translate3d(0, 0, 0);
    transition: all .2s ease-in-out;

    @include breakpoint($upper) {
      &:after {
        top: $nav-height;
        left: 0; right: 0;
        content: " ";
        height: $nav-height / 2;
        position: absolute;
      }
      &--unpinned {
        transform: translate3d(0, -80%, 0);
      }
      &--unpinned:hover {
        transform: translate3d(0, 0, 0);
      }
    }
  }
  background-color: white;
  box-shadow: 0 1px 20px 0 tint($primary, 90%);
  > div > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    @include breakpoint($sm) {
      padding: 0 1.5rem !important; // Overrides padding from the grid
    }
  }
  a {
    padding: .8rem 0;
    color: $med;
    h2 {
      display: inline;
    }
  }
}
.menu {
  h1 {
    text-align: center;
    margin: .5rem;
  }
  border-bottom: 8px solid $accent;
  box-shadow: inset 0 -10px 10px tint($primary, 90%);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  position: fixed;
  padding-top: $nav-height * 3;
  padding-bottom: $nav-height * 2;
  top: 0; bottom: 0;
  left: 0; right: 0;
  background-image: url(./stripes.png);
  z-index: 1;
  transform: translate3d(0, -100%, 0);
  transition: all .2s ease-in-out;
  &.active {
    transform: translate3d(0, 0, 0);
  }
  a {
    display: block;
  }
}
.menu-toggle {
  padding: .8rem 0;
  > div {
    height: 4px;
    width: 30px;
    margin-bottom: 5px;
    border-radius: 4px;
    background-color: tint($primary, 30%);
  }
}
header {
  background-image: url(./stripes.png);
  box-shadow: inset 0 0 10px tint($primary, 90%);
  padding: 100px 0 75px 0;
  text-align: center;
  h1 {
    margin: .25rem;
    text-shadow: 20px 20px 40px rgba(0,0,0,.1);
  }
  @include breakpoint($sm) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    padding: 100px 1rem 75px 1rem;
    h1 {
      font-size: 2rem;
      margin-top: 1rem;
    }
  }
  .logo {
    background-image: url(./logo.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 50% 100%;
    padding-top: 348px;
    margin: 0 2rem;
    @include breakpoint($sm) {
      padding-top: 50%; //224px;
    }
  }
}
article {
  $vertical_margin: 4rem;
  margin-bottom: $vertical_margin;
  section {
    a {
      font-size: 1.1rem;
      font-weight: bold;
    }
    p {
      margin-left: 2rem;
      padding-bottom: 2rem;
      box-shadow: 0 14px 28px -28px tint($primary, 50%);
    }
    ul, ol {
      box-shadow: 0 14px 28px -28px tint($primary, 50%);
      padding-bottom: 2rem;
    }
    hr {
      display: none;
    }
    hr + p {
      // HACK! This allows hiding the box shadow on paragraphs if the paragraphs are preceded by an hr
      box-shadow: none;
      padding-bottom: 0;
    }
    blockquote {
      display: inline-block;
      vertical-align: top;
      margin: 0 2%;
      p {
        font-size: .75rem;
        margin-left: 1rem;
      }
      & + p {
        display: none;
      }
      @include breakpoint($upper) {
        width: 45%;
      }
    }
    h1 {
      font-size: 3rem;
      margin-top: $vertical_margin;
      margin-bottom: .25rem;
      position: relative;
      &:before {
        position: absolute;
        content: " ";
        width: .5rem;
        top: 0; bottom: 0;
        left: -2rem;
        border-radius: 4px;
        background: $accent;
      }
      @include breakpoint($sm) {
        font-size: 2rem;
      }
      @include breakpoint($upper) {
        cursor: pointer;
        text-decoration: underline;
        text-decoration-color: tint($primary, 25%);
        text-decoration-style: dotted;
      }
    }
    @include breakpoint($upper) {
      ol {
        margin: 3rem;
      }
      ul {
        margin: 0 5rem;
      }
    }
    @include breakpoint($sm) {
      p {
        margin-left: 1rem;
      }
    }
  }
  .bio-pic {
    background-image: url(./micha.jpg);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 50% 25%;
    border-radius: 100%;

    position: relative;
    &:after {
      content: " ";
      position: absolute;
      top: 0; bottom: 0;
      left: 0; right: 0;
      background: linear-gradient(180deg, rgba(255,255,255,0), rgba(255, 255, 255, .5) 95%);
    }
    @include breakpoint($sm) {
      padding-top: 100%;
    }
  }
  @include breakpoint($upper) {
    & #bio div {
      display: inline-block;
      vertical-align: center;
      max-width: 73%;
    }
    .bio-pic {
      margin-top: 1.5rem;
      width: 10rem;
      height: 10rem;
      display: inline-block;
    }
  }
}
footer {
  background-color: shade($primary, 50%);
  background-image: url(./stripes-primary.png);
  border-bottom: 3rem solid black;
  padding: 2rem 0;
  position: relative;
  color: $primary;
  a {
    color: white;
  }
  img {
    color: tint($primary, 10%);
  }
  p {
    font-weight: normal;
    margin: 0 1rem;
    color: tint($primary, 10%);
    @include breakpoint($sm) {
      display: block !important;
      margin: 1rem 0;
    }
  }
  .spaced {
    margin: 0 0 1rem 0;
  }
  .logo {
    margin: 0 2rem 1rem 0;
    max-width: 100%;
    height: 140px;
  }
  @include breakpoint($upper) {
    height: 500px;
    .bt {
      transition: all .1s ease-in-out;
    }
    .bt:hover {
      transform: scale(1.03);
    }
  }
}
form {
  margin-top: 2rem;
  h3 {
    font-weight: normal;
  }
  .feedback {
    color: $text;
    font-family: 'Lexend Deca', Helvetica, Arial, sans-serif;
    font-size: 1rem;
    padding: 1rem;
    margin: 0 1rem 1rem 0;
    border-radius: 5px;
    border: 3px solid tint($primary, 30%);
    outline: 0;
    background-color: transparent;
    width: 100%;
    box-sizing: border-box;
    transition: all 0.2s;
    &:focus {
      border: 3px solid $accent;
    }
    &::placeholder {
      color: $med;
    }
  }
  textarea {
    height: 150px;
    line-height: 150%;
    resize:vertical;
  }
  [type="submit"] {
    font-family: 'Lexend Deca', Helvetica, Arial, sans-serif;
    width: 100%;
    height: 58px;
    background: $primary;
    border-radius: 5px;
    border: 0;
    cursor: pointer;
    color: white;
    font-size: 1rem;
    font-weight: bold;
    transition: all 0.2s;
  }
  @include breakpoint($upper) {
    [type="submit"]:hover { 
      background: $accent;
    }
  }
}

</style>
