import { createContext, useContext, useReducer, useEffect } from "react";
import { GoogleSpreadsheet } from "google-spreadsheet";
import Papa from "papaparse";

import h from "../helpers/htm-create-element.js";
import ActionTypes from "./actions.js";
import { AppReducer } from "./reducer.js";
import { convertFromArrayBuffer } from "../helpers/files.js";

const SPREADSHEET_ID = "1otnux4WInu6ZzgDamBEWKO0LeFw1Dg2Bv0xJxCPZwd4";

const API_KEY = "AIzaSyB56UJNZmkX2qALZTCuRnybSFSXCkIC6IU";

const initialState = { query: "", sheetData: [], results: [], loading: false };

const AppContext = createContext({
  state: initialState,
  dispatch: () => null,
});

const useApp = () => useContext(AppContext);

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const loadDoc = async () => {
    // fetch doc data
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID, {
      apiKey: API_KEY,
    });

    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[0]; // or use `doc.sheetsById[id]` or `doc.sheetsByTitle[title]`

    // read doc data as CSV
    const csvBuffer = await sheet.downloadAsCSV();

    // Create a File from the ArrayBuffer
    const docAsFile = convertFromArrayBuffer(
      csvBuffer,
      `${sheet.title}.csv`,
      "text/csv"
    );

    readFile(docAsFile);
  };

  const readFile = file => {
    const reader = new FileReader();

    if (file) {
      reader.onload = e => {
        const content = e.target.result;

        // parse file content
        const parsedContent = Papa.parse(content);

        // update state
        dispatch({
          type: ActionTypes.UPDATE_SHEET_DATA,
          payload: parsedContent.data,
        });
      };
    }

    reader.readAsText(file);
  };

  useEffect(() => {
    loadDoc();
  }, []);

  console.log("🚀 ~ state:", state);

  const value = { state, dispatch };

  return h`
    <${AppContext.Provider} value=${value}>
      ${children}
    </${AppContext.Provider}>
  `;
};

export { AppProvider, useApp, AppContext };
