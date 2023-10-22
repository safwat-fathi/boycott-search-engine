/**
 * @param {ArrayBuffer} arrayBuffer
 * @param {string} name
 * @param {string} type
 * @returns {File}
 */
export const convertFromArrayBuffer = (arrayBuffer, name = "", type = "") => {
  const file = new File([arrayBuffer], name, {
    type,
  });

  return file;
};

// /**
//  * @param {File} fileData
//  * @returns {string}
//  */
// export const readFileData = fileData => {
//   const reader = new FileReader();

//   if (fileData) {
//     reader.onload = e => {
//       const fileContent = e.target.result;
//       return fileContent;
//     };
//   }

//   reader.readAsText(fileData);
// };
