import { useState } from "react";
import h from "../helpers/htm-create-element.js";
import { useApp } from "../AppContext/index.js";
import ActionTypes from "../AppContext/actions.js";

const styles = { "--direction": "row", "--gap": 0 };

const Search = () => {
  const { state, dispatch } = useApp();

  const handleChange = e => {
    dispatch({ type: ActionTypes.UPDATE_QUERY, payload: e.target.value });
  };

  const handleSubmit = () => {
    dispatch({ type: ActionTypes.UPDATE_RESULTS, payload: state.query });
  };

  return h`
		<form onSubmit=${e => e.preventDefault()}>
			<div class="flex" style=${styles}>
				<input
					type="text"
					class="input--lg"
					autocomplete="text"
					inputmode="text"
					minlength="1"
					maxlength="50"
					value=${state.query}
					onChange=${e => handleChange(e)}
					placeholder="Search Products"
					required
				/>
				<input type="submit" value="Search" class="btn btn--lg transition" onClick=${handleSubmit} />
			</div>
		</form>
	`;
};

export default Search;
