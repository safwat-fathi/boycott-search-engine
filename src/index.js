import { render } from "react-dom";
import h from "./helpers/htm-create-element.js";

import App from "./App.js";

render(h`<${App}/>`, document.getElementById("app"));
