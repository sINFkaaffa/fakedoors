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
import Footer from '@/components/Footer'
export default {
  name: 'app',
  components: {
    NavBar,
    Footer
  }
}
</script>
