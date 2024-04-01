interface Choice {
  label: string;
  value: string;
  hint?: string
}

type ChoiceList  = {
  [key: string]: Choice[]
}

const choices: ChoiceList = {
  operate: [
    { label: '默认模版', value: 'default' },
    { label: '远程仓库', value: 'repo' },
  ],
  type: [
    { label: 'Mobile', value: 'mobile' },
    { label: 'PC', value: 'pc' },
  ],
  mobile: [
    { label: 'Vite + Vue 3', value: 'leedom92/vue-h5-template#main' },
    { label: 'Vite + Vue 2', value: 'leedom92/vue-h5-template#vue2-h5-vite-template' },
    { label: 'Vue CLI + Vue 2', value: 'leedom92/vue-h5-template#vue-h5-webpack-template' },
  ],
  pc: [
    { label: 'Vite + Vue 3', value: 'kailong321200875/vue-element-plus-admin#master' },
    { label: 'Vue CLI + Vue 2', value: 'PanJiaChen/vue-element-admin#master' },
  ],
}

export { choices }