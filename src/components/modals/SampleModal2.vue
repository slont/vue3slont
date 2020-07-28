<template lang="pug">
article.sample-modal(:class="customClass")
  header.v-modal-card-header(v-if="title")
  main.v-modal-card-body
    button(@click="onOpenBasicModal") Open BasicModal
  footer.v-modal-card-footer
    v-button(v-if="cancelText" :onclick="cancel") {{ cancelText }}
    v-button(v-if="okText" :onclick="ok") {{ okText }}
</template>

<script lang="ts">
  import {inject} from 'vue'
  import {InjectionKeyEnum} from '@/enums'
  import BasicModal from '@/components/modals/BasicModal.vue'

  type Props = {
    title: string
    content: string
    image: string
    onOk: () => Promise<any>
    onCancel: () => Promise<any>
  }

  export default {
    name: 'SampleModal2',
    props: {
      title: String,
      content: String,
      image: String,
      okText: String,
      onOk: {type: Function, default: () => Promise.resolve()},
      cancelText: String,
      onCancel: {type: Function, default: () => Promise.resolve()},
      customClass: String
    },
    setup(props: Props, {emit}) {
      const openModal = inject(InjectionKeyEnum.OPEN_THIRD_MODAL)

      const onOpenBasicModal = () => {
        (openModal as any)({
          name: BasicModal.name,
          props: {
            content: 'ブラウザバックでは閉じれないよ',
            okText: 'OK',
            cancelText: 'キャンセル',
            closable: false
          }
        })
      }

      const ok = async () => {
        await props.onOk()
        emit('close')
      }
      const cancel = async () => {
        await props.onCancel()
        emit('close')
      }

      return {
        ok, cancel, onOpenBasicModal
      }
    }
  }
</script>
