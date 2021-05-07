import { makeObservable, observable, action } from "mobx"

class SessionStore {
  authUser = null;

  constructor(rootStore) {
    makeObservable(this, {
      authUser: observable,
      setAuthUser: action,
    })
    this.rootStore = rootStore;
  }

  setAuthUser = authUser => {
    this.authUser = authUser;
  };
}

export default SessionStore;