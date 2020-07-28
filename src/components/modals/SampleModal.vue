<template lang="pug">
article.sample-modal(:class="customClass")
  header.v-modal-card-header(v-if="title")
  main.v-modal-card-body
    button(@click="onOpenSampleModal2") Open SampleModal2
  footer.v-modal-card-footer
    v-button(v-if="cancelText" :onclick="cancel") {{ cancelText }}
    v-button(v-if="okText" :onclick="ok") {{ okText }}
</template>

<script lang="ts">
  import {inject} from 'vue'
  import {InjectionKeyEnum} from '@/enums'
  import SampleModal2 from '@/components/modals/SampleModal2.vue'

  type Props = {
    title: string
    content: string
    image: string
    onOk: () => Promise<any>
    onCancel: () => Promise<any>
  }

  export default {
    name: 'SampleModal',
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
      const openModal = inject(InjectionKeyEnum.OPEN_SECOND_MODAL)

      const onOpenSampleModal2 = () => {
        (openModal as any)({
          name: SampleModal2.name,
          props: {
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
        ok, cancel, onOpenSampleModal2
      }
    }
  }
</script>
