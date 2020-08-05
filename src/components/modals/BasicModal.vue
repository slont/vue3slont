<template lang="pug">
article.basic-modal(:class="customClass")
  header.v-modal-card-header(v-if="title")
  main.v-modal-card-body
    figure(v-if="image"): img(:src="image")
    div(v-if="content") {{ content }}
  footer.v-modal-card-footer
    v-button(v-if="cancelText" :onclick="onCancel") {{ cancelText }}
    v-button(v-if="okText" :onclick="onOk") {{ okText }}
</template>

<script lang="ts">
  type Props = {
    title: string
    content: string
    image: string
    closable: boolean
    ok: () => Promise<any>
    cancel: () => Promise<any>
  }

  export default {
    name: 'BasicModal',
    props: {
      title: String,
      content: String,
      image: String,
      okText: String,
      ok: {type: Function, default: () => Promise.resolve()},
      cancelText: String,
      cancel: {type: Function, default: () => Promise.resolve()},
      customClass: String
    },
    setup(props: Props, {emit}) {
      const onOk = async () => {
        await props.ok()
        emit('close')
      }
      const onCancel = async () => {
        await props.cancel()
        emit('close')
      }

      return {
        onOk, onCancel
      }
    }
  }
</script>
