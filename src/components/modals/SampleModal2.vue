<template lang="pug">
article.sample-modal(:class="customClass")
  header.v-modal-card-header(v-if="title")
  main.v-modal-card-body
    button(@click="onOpenBasicModal") Open BasicModal
  footer.v-modal-card-footer
    v-button(v-if="cancelText" :onclick="onCancel") {{ cancelText }}
    v-button(v-if="okText" :onclick="onOk") {{ okText }}
</template>

<script lang="ts">
  import {inject} from 'vue'
  import {InjectionKeyEnum} from '@/enums'
  import BasicModal from '@/components/modals/BasicModal.vue'

  type Props = {
    title: string
    content: string
    image: string
    ok: () => Promise<any>
    cancel: () => Promise<any>
  }

  export default {
    name: 'SampleModal2',
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
      const openModal = inject<(config: any) => void>(InjectionKeyEnum.OPEN_THIRD_MODAL)!

      const onOpenBasicModal = () => {
        openModal({
          name: BasicModal.name,
          props: {
            content: 'ブラウザバックでは閉じれないよa',
            okText: 'OK',
            cancelText: 'キャンセル'
          },
          closable: false
        })
      }

      const onOk = async () => {
        await props.ok()
        emit('close')
      }
      const onCancel = async () => {
        await props.cancel()
        emit('close')
      }

      return {
        onOk, onCancel, onOpenBasicModal
      }
    }
  }
</script>
