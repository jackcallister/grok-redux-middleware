export default function anotherLogger(store) {
  return function(next) {
    return function(action) {
      console.log('another logger action', action)
      console.log('next', next)
      next(action)
    }
  }
}
