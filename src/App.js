import Password from "./components/Password";
import { observer } from "mobx-react-lite"

function App() {
  return (
    <div className="App w-full flex justify-center">
            <Password />
    </div>
  );
}

export default observer(App);
