<template lang="pug">
div.v-modal(:class="customClass" tabindex="-1")
  div.v-modal-backdrop(@click="close")
  button.v-modal-close(v-if="closable" type="button" @click="close")

  component.v-modal-card(
    :is="name"
    v-bind="props"
    @close="closeForce"
    @update:closable="setClosable"
    @update:cb-blocked="setCallbackBlocked")
</template>

<script lang="ts">
  import {onBeforeUnmount, onMounted, reactive, ref, toRefs, computed} from 'vue'
  import {useRouter, useRoute} from 'vue-router'

  type Props = {
    name: string
    index: number
  }

  const DEFAULT_DATA = {
    closable: true,
    callback: () => ({}),
    callbackBlocked: () => ({})
  }

  export default {
    props: {
      name: String,
      index: Number,
      props: Object,
      customClass: String
    },
    setup(props: Props, ctx) {
      const data = reactive(Object.assign({}, DEFAULT_DATA))
      const isClosing = ref(false)
      const forceClose = ref(false)
      const route = useRoute()
      const router = useRouter()

      const modals = computed(() => route.query['modal[]'] || [])

      const close = async () => {
        if (!data.closable || isClosing.value) return
        isClosing.value = true
        await router.back()
      }
      const closeForce = async (callback = () => ({})) => {
        if (isClosing.value) return
        isClosing.value = true
        forceClose.value = true
        data.callback = callback
        await router.back()
      }
      const setClosable = (closable = true) => data.closable = closable
      const setCallbackBlocked = (callback = () => ({})) => data.callbackBlocked = callback
      const onBack = () => {
        if (('string' === typeof modals.value && modals.value !== props.name) || (modals.value.length <= props.index)) {
          if (data.closable || forceClose.value) {
            // data.callback()
            ctx.emit('update:name', '')
          } else {
            router.forward()
            data.callbackBlocked()
          }
        }
      }
      const keyPress = async (event: KeyboardEvent) => {
        if (![event.key, event.keyCode].includes(27)) return
        // Esc key
        if ((modals.value === props.name) || (modals.value.length === props.index + 1)) {
          await close()
        }
      }

      onMounted(() => {
        window.addEventListener('popstate', onBack)
        document.addEventListener('keyup', keyPress)
      })

      onBeforeUnmount(() => {
        document.removeEventListener('keyup', keyPress)
        window.removeEventListener('popstate', onBack)
      })


      return {
        close, closeForce, setClosable, setCallbackBlocked,
        ...toRefs(data)
      }
    }
  }
</script>

<style lang="sass">
.slide-fade-enter-active,
.slide-fade-leave-active
  transition: all .2s ease

.slide-fade-enter,
.slide-fade-leave-to
  transform: translateX(-10px)
  opacity: 0

.zoom-out-enter-active,
.zoom-out-leave-active
  transition: opacity 150ms ease-out
  .v-modal-card,
  .v-modal-card
    transition: transform 150ms ease-out
.zoom-out-enter,
.zoom-out-leave-active
  opacity: 0
  .v-modal-card,
  .v-modal-card
    transform: scale(1.05)

.overlay
  position: absolute
  bottom: 0
  left: 0
  right: 0
  top: 0

.v-modal
  $modal-radius: 8px
  $modal-bg-color: white
  $modal-padding: .75rem

  @extend .overlay
  align-items: center
  display: flex
  flex-direction: column
  justify-content: center
  overflow: hidden
  position: fixed
  z-index: 40
  &.is-full-screen
    .v-modal-close
      display: none
    .v-modal-backdrop
      opacity: .5
      pointer-events: none
    .v-modal-card-footer
      border-radius: 0
    .v-modal-card
      height: 100vh
      width: 100%
      > :first-child
        border-top-left-radius: 0
        border-top-right-radius: 0
      > :last-child
        border-bottom-left-radius: 0
        border-bottom-right-radius: 0
  &.delete-modal
    .v-modal-card-foot
      flex-direction: row-reverse
      align-items: baseline

  &-backdrop
    @extend .overlay
    background-color: rgba(black, .2)

  &-close
    position: fixed
    right: 20px
    top: 20px
    background: none
    min-height: 32px
    min-width: 32px
    -moz-appearance: none
    -webkit-appearance: none
    border: none
    pointer-events: auto
    display: inline-block
    flex-grow: 0
    outline: none
    &::before,
    &::after
      background-color: whitesmoke
      content: ""
      display: block
      left: 50%
      position: absolute
      top: 50%
      transform: translateX(-50%) translateY(-50%) rotate(45deg)
      transform-origin: center center
    &::before
      height: 2px
      width: 50%
    &::after
      height: 50%
      width: 2px

  &-card
    display: flex
    max-height: 94vh
    flex-direction: column
    position: relative
    min-width: 320px
    max-width: 90%
    overflow: hidden
    -ms-overflow-y: visible
    border-radius: $modal-radius
    background: $modal-bg-color
    > :first-child
      border-top-left-radius: $modal-radius
      border-top-right-radius: $modal-radius
    > :last-child
      border-bottom-left-radius: $modal-radius
      border-bottom-right-radius: $modal-radius

  &-card-header,
  &-card-footer
    position: relative
    display: flex
    flex-shrink: 0
    justify-content: space-around
    align-items: center
    padding: $modal-padding
  &-card-footer
    border-top: none
    margin-top: -1px
    .button-cancel
      border: none
      color: darkgrey
      padding-bottom: 0

  &-card-title
    flex-grow: 1
    flex-shrink: 0
    text-align: center
    font-weight: bold

  &-card-body
    flex-grow: 1
    flex-shrink: 1
    padding: $modal-padding
    overflow: auto
</style>
