import h from "./helpers/htm-create-element.js";
import { AppProvider } from "./AppContext/index.js";
import Search from "./components/Search.js";
import Results from "./components/Results.js";

function App() {
  return h`
    <${AppProvider}>
			<${Search} />
			<${Results} />
		</${AppProvider}>
	`;
}

export default App;
