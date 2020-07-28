<template lang="pug">
div.home
  img(alt="Vue logo" src="../assets/logo.png")
  HelloWorld(msg="Welcome to Your Vue.js App")
  button.button(@click="onOpenSampleModal") Open Sample Modal
</template>

<script lang="ts">
  import HelloWorld from '@/components/HelloWorld.vue'
  import {inject, reactive, toRefs} from 'vue'
  import {InjectionKeyEnum} from '@/enums'
  import BasicModal from '@/components/modals/BasicModal.vue'
  import SampleModal from '@/components/modals/SampleModal.vue'

  export default {
    name: 'Home',
    components: {HelloWorld},
    setup() {
      const data = reactive({
        active: false
      })
      const openFirstModal = inject(InjectionKeyEnum.OPEN_FIRST_MODAL)

      const onOpenBasicModal = () => {
        (openFirstModal as any)({
          name: BasicModal.name,
          props: {
            okText: 'OK',
            cancelText: 'キャンセル',
          }
        })
      }
      const onOpenSampleModal = () => {
        (openFirstModal as any)({
          name: SampleModal.name,
          props: {
            okText: 'OK',
            cancelText: 'キャンセル',
          }
        })
      }

      return {
        onOpenBasicModal, onOpenSampleModal,
        ...toRefs(data)
      }
    }
  }
</script>

<style lang="sass">
.home
  position: relative
</style>
