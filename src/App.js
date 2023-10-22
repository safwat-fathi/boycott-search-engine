import h from "./helpers/htm-create-element.js";
import Search from "./components/Search.js";
import { AppProvider } from "./AppContext/index.js";

// const styles = { "--justify": "center", "--align": "center", height: "100vh" };

function App() {
  return h`
    <${AppProvider}>
			<${Search} />
		</${AppProvider}>
	`;
}

export default App;
