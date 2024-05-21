<template>
  <the-header></the-header>
  <router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
</template>

<script>
/* 
  ! NOTES

  * For transition above, we had to access the component that the router will render by accessing `v-slot="slotProps"`
  * After that, we had to wrap the component rendering with `transition` component and bind the component being rendered to the one the router wants to render
  * `mode="out-in"` means that the animation of the removal of the current page will occur first followed by the animation of the new page so that we don't have two pages shown at the same time for a brief period
*/
import TheHeader from './components/header/TheHeader.vue';

export default {
  components: {
    TheHeader,
  },
  created() {
    this.$store.dispatch('autoLogin');
  },
  computed: {
    didAutoLogout() {
      return this.$store.getters.didAutoLogout;
    },
  },
  watch: {
    didAutoLogout(curVal, oldVal) {
      if (curVal && curVal !== oldVal) {
        this.$router.replace('/');
      }
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

html {
  font-family: 'Roboto', sans-serif;
}

body {
  margin: 0;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.route-enter-active {
  transition: all 150ms ease-out;
}

.route-leave-active {
  transition: all 150ms ease-in;
}
</style>
