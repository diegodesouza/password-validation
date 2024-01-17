import Password from "./components/Password";
import { observer } from "mobx-react-lite"
import {PasswordStoreContext} from "./stores/PasswordStore";
import {passwordStore} from "./stores/PasswordStore";

function App() {
  return (
      <PasswordStoreContext.Provider value={passwordStore}>
          <div className="App w-full flex justify-center" data-testid="app">
              <Password/>
          </div>
      </PasswordStoreContext.Provider>
  );
}

export default observer(App);
