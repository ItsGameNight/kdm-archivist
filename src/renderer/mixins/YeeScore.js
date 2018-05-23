import {
  faStar,
  faCircle,
  faFrown
} from '@fortawesome/fontawesome-free-solid'

var yeeScoreMixin = {
  computed: {
    yeeIcon: function () {
      switch (this.yeeScore) {
        case 0:
          return faFrown
        case 1:
          return faCircle
        case 2:
        case 3:
        case 4:
        case 5:
          return faStar
        default:
          return faCircle
      }
    },
    yeeColor: function () {
      switch (this.yeeScore) {
        case 0:
          return { color: '#000' }
        case 1:
          return { color: '#d11141' }
        case 2:
          return { color: '#00b159' }
        case 3:
          return { color: '#00aedb' }
        case 4:
          return { color: '#f37735' }
        case 5:
          return { color: '#ffc425' }
        default:
          return { color: 'black' }
      }
    }
  }
}

export { yeeScoreMixin as default }
