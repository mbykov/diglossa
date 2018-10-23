// import { q, qs, empty, create, span, p, div, remove } from './utils'

class Apstore {
  constructor() {
    this.app = document.querySelector('#app')
  }

  get(key) {
    return JSON.parse(this.app.getAttribute(key))
  }

  set(key, value) {
    return this.app.setAttribute(key, JSON.stringify(value))
  }
}

// const john = new Apstore()
// john.set('key', 'JOHN')
// console.log('APSTORE', john.get('key'))

// export default Apstore
// export Apstore

module.exports = Apstore
