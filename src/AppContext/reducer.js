import ActionTypes from "./actions.js";

export const AppReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.LOADING:
      if (typeof action.payload === "boolean") {
        return { ...state, loading: action.payload };
      }

    case ActionTypes.UPDATE_QUERY:
      if (typeof action.payload === "string") {
        return { ...state, query: action.payload };
      }

    case ActionTypes.UPDATE_SHEET_DATA:
      if (typeof Array.isArray(action.payload)) {
        return { ...state, sheetData: action.payload };
      }

      throw new Error("Invalid sheet data action payload type");

    case ActionTypes.UPDATE_RESULTS:
      if (typeof Array.isArray(action.payload)) {
        // if search query is empty
        if (state.query === "")
          return {
            ...state,
            results: [...state.sheetData],
          };

        // if search query updated
        const foundResult = state.sheetData.filter(row =>
          row[0].toLowerCase().includes(action.payload)
        );

        return {
          ...state,
          results: [...foundResult],
        };
      }

      throw new Error("Invalid results action payload type");
    default:
      return state;
  }
};
