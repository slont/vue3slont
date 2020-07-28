<template lang="pug">
article.basic-modal(:class="customClass")
  header.v-modal-card-header(v-if="title")
  main.v-modal-card-body
    figure(v-if="image"): img(:src="image")
    div(v-if="content") {{ content }}
  footer.v-modal-card-footer
    v-button(v-if="cancelText" :onclick="cancel") {{ cancelText }}
    v-button(v-if="okText" :onclick="ok") {{ okText }}
</template>

<script lang="ts">
  type Props = {
    title: string
    content: string
    image: string
    closable: boolean
    onOk: () => Promise<any>
    onCancel: () => Promise<any>
  }

  export default {
    name: 'BasicModal',
    props: {
      title: String,
      content: String,
      image: String,
      okText: String,
      onOk: {type: Function, default: () => Promise.resolve()},
      cancelText: String,
      onCancel: {type: Function, default: () => Promise.resolve()},
      customClass: String,
      closable: {
        type: Boolean,
        default: true
      }
    },
    setup(props: Props, {emit}) {
      const ok = async () => {
        await props.onOk()
        emit('close')
      }
      const cancel = async () => {
        await props.onCancel()
        emit('close')
      }

      /** Init **/
      emit('update:closable', props.closable)

      return {
        ok, cancel
      }
    }
  }
</script>
