export const catchErrors = (error) => {
  let errorMsg;

  if (error.response) {
    errorMsg = error.response.data;
    console.error(errorMsg);
  } else {
    errorMsg = error.message;
    console.error(errorMsg);
  }
  return errorMsg;
};
