<template lang="pug">
transition(name="slide-fade" mode="out-in")
  router-view

transition(:name="firstModalMixin.animation")
  VModal(v-if="firstModalMixin.name" v-bind="firstModalMixin" v-model:name="firstModalMixin.name")
transition(:name="secondModalMixin.animation")
  VModal(v-if="secondModalMixin.name" v-bind="secondModalMixin" v-model:name="secondModalMixin.name")
transition(:name="thirdModalMixin.animation")
  VModal(v-if="thirdModalMixin.name" v-bind="thirdModalMixin" v-model:name="thirdModalMixin.name")
</template>

<script lang="ts">
  import {provide} from 'vue'
  import ModalMixin from '@/mixins/modal'
  import {InjectionKeyEnum} from './enums'

  export default {
    setup(_, ctx) {
      const firstModalMixin = ModalMixin(0)
      const secondModalMixin = ModalMixin(1)
      const thirdModalMixin = ModalMixin(2)
      provide(InjectionKeyEnum.OPEN_FIRST_MODAL, firstModalMixin.openModal)
      provide(InjectionKeyEnum.OPEN_SECOND_MODAL, secondModalMixin.openModal)
      provide(InjectionKeyEnum.OPEN_THIRD_MODAL, thirdModalMixin.openModal)

      return {
        firstModalMixin, secondModalMixin, thirdModalMixin
      }
    }
  }
</script>

<style lang="sass">
#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50

#nav
  height: $header-nav-height
  padding: 30px
  a
    font-weight: bold
    color: #2c3e50
    &.router-link-exact-active
      color: #42b983
</style>
