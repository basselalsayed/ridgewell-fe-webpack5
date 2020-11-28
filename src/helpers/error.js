const parseError = error => {
  let errorText = '';
  if (error.response) {
    const { response } = error;
    if (response.statusText && response.status)
      errorText += `${response.statusText} (${response.status}): `;
    if (response.data.message) errorText += response.data.message;
  } else if (error.message) return error.message;
  return errorText;
};

export { parseError };
