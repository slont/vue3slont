import {useRoute, useRouter} from 'vue-router'
import {reactive, toRefs} from 'vue'

export type ModalOptions = {
  index: number
  name: string
  props: any
  closable: boolean
  animation?: string
}

export default (index: number) => {
  const data = reactive<ModalOptions>({
    index,
    name: '',
    props: {},
    closable: true,
    animation: 'zoom-out',
  })

  const route = useRoute()
  const router = useRouter()

  const openModal = async (options: ModalOptions) => {
    Object.assign(data, options)
    const modals = route.query['modal[]']
    const query = {...route.query}
    if (!modals) {
      Object.assign(query, {'modal[]': [data.name]})
    } else if ('string' === typeof modals) {
      Object.assign(query, {'modal[]': [modals, data.name]})
    } else {
      Object.assign(query, {'modal[]': [...modals, data.name]})
    }
    await router.push({query})
  }

  return {
    openModal,
    ...toRefs(data)
  }
}
