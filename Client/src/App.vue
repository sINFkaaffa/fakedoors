<template>
  <div id="app">
    <NavBar/>
    <div class="parallax"></div>
    <main>
      <div id="root" class="z-depth-3">
  	    <div class="container">
          <transition name="fade">
          <router-view></router-view>
          </transition>
  	    </div>
  	  </div>
    </main>
    <Footer/>
  </div>
</template>

<script>
import NavBar from './components/NavBar'
import Footer from './components/Footer'
export default {
  name: 'app',
  components: {
    NavBar, Footer
  }
}
</script>
<style>
/*
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;
  /*color: #2c3e50;
  margin-top: 0;
}

.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .1s;
}

.fade-enter-active {
  transition-delay: .1s;
}

.fade-enter, .fade-leave-active {
  opacity: 0
}*/
</style>
