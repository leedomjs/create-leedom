import type { ChoiceList } from './types'

export const choices: ChoiceList = {
  operate: [
    { label: 'Template', value: 'template' },
    { label: 'Remote', value: 'remote' },
  ],
  type: [
    { label: 'Mobile', value: 'mobile' },
    { label: 'PC', value: 'pc' },
  ],
  mobile: [
    { label: 'Vite + Vue 3', value: 'leedom92/vue-h5-template#main', hint: 'recommended' },
    { label: 'Vite + Vue 2', value: 'leedom92/vue-h5-template#vue2-h5-vite-template' },
    { label: 'Vue CLI + Vue 2', value: 'leedom92/vue-h5-template#vue-h5-webpack-template' },
  ],
  pc: [
    { label: 'Vite + Vue 3', value: 'kailong321200875/vue-element-plus-admin#master', hint: 'recommended' },
    { label: 'Vue CLI + Vue 2', value: 'PanJiaChen/vue-element-admin#master' },
  ],
}
