import ActionTypes from "./actions.js";

export const AppReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_QUERY:
      if (typeof action.payload === "string") {
        return { ...state, query: action.payload };
      }

    // throw new Error("Invalid attendee action payload type");
    case ActionTypes.UPDATE_SHEET_DATA:
      if (typeof Array.isArray(action.payload)) {
        return { ...state, sheetData: action.payload };
      }

      throw new Error("Invalid sheet data action payload type");

    case ActionTypes.UPDATE_RESULTS:
      if (typeof Array.isArray(action.payload)) {
        const foundResult = state.sheetData.find(row =>
          row[0].toLowerCase().includes(action.payload)
        );
        console.log("🚀 ~ foundResult:", foundResult);

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
