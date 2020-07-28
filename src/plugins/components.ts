import {App} from '@vue/runtime-core'
import VButton from '@/components/VButton.vue'
import VModal from '@/components/modals/VModal.vue'
import BasicModal from '@/components/modals/BasicModal.vue'
import SampleModal from '@/components/modals/SampleModal.vue'
import SampleModal2 from '@/components/modals/SampleModal2.vue'

export const setupComponents = (app: App) => {
  app.component('VButton', VButton)
  app.component('VModal', VModal)
  app.component(BasicModal.name, BasicModal)
  app.component('SampleModal', SampleModal)
  app.component('SampleModal2', SampleModal2)
}
