import h from "../helpers/htm-create-element.js";
import { useApp } from "../AppContext/index.js";
import ActionTypes from "../AppContext/actions.js";

const styles = { "--direction": "row", "--gap": 0 };

const testData = [
  ["col1", "col2", "col3", "col4"],
  ["col1", "col2", "col3", "col4"],
];

const Results = () => {
  const { state } = useApp();

  if (state.results.length === 0) return h`<div></div>`;

  return h`
		<div class="results flex flex-col">
			<h4>Found results:</h4>
			<ul class="results__list flex flex-col">
				${testData.map(
          (row, index) => h`
						<li key=${row[0] + index}>
							${row[0]}	
						</li>
					`
        )}
			</ul>
		</div>
	`;
};

export default Results;
