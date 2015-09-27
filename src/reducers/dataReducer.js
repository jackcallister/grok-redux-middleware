export default function data(state = [], action) {

  switch(action.type){
    case 'TRIGGER_DISPATCH':
      console.log('Triggering')
      return state;
    default:
      return state;
  }
}
