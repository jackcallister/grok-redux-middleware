export default function behindTheCurtain(store) {
  return function(next) {
    return function(action) {
      console.log('action', action)
      console.log('next', next)
      next(action)
    }
  }
}
