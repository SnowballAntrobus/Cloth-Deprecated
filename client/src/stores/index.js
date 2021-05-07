import SessionStore from './sessionStore';
 
class RootStore {
  constructor() {
    this.sessionStore = new SessionStore(this);
  }
}
 
const rootStore = new RootStore();
 
export default rootStore;