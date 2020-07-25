<template lang="pug">
  button.v-button(:class="{'processing': isProcessing}"
                  :disabled="disabled || isProcessing"
                  @click.stop="onClick")
    slot
</template>

<script lang="ts">
  import {computed, ref} from 'vue'

  type Props = {
    processing: boolean,
    onclick: () => void
  }

  export default {
    props: {
      disabled: Boolean,
      processing: Boolean,
      onclick: Function
    },
    setup(props: Props, {emit}) {
      const isProcessingRef = ref(false)

      const isProcessing = computed(() => props.processing || isProcessingRef.value)

      const onClick = async () => {
        isProcessingRef.value = true
        emit('update:processing', true)
        await Promise.resolve(props.onclick ? props.onclick() : null).finally(() => {
          emit('update:processing', false)
          isProcessingRef.value = false
        })
      }
      return {
        isProcessing,
        onClick
      }
    }
  }
</script>

<style lang="sass" scoped>
  .v-button
    transition: all .2s ease
    > span
      display: inline-flex
</style>
