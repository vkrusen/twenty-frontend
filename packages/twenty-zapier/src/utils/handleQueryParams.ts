const handleQueryParams = (inputData: { [x: string]: any }): string => {
  const formattedInputData: {[x:string]: any} = {};
  Object.keys(inputData).forEach((key) => {
    if(key.includes('__')) {
      const [objectKey, nestedObjectKey] = key.split('__')
      if (formattedInputData[objectKey]) {
        formattedInputData[objectKey][nestedObjectKey] = inputData[key]
      } else {
        formattedInputData[objectKey] = {[nestedObjectKey]: inputData[key]}
      }
    } else {
      formattedInputData[key]=inputData[key]
    }
  })
  let result = '';
  Object.keys(formattedInputData).forEach((key) => {
    let quote = '';
    if (typeof formattedInputData[key]==='object') {
      result=result.concat(`${key}: {${handleQueryParams(formattedInputData[key])}}, `)
    } else {
    if (typeof formattedInputData[key] === 'string') quote = '"';
    result = result.concat(`${key}: ${quote}${formattedInputData[key]}${quote}, `);
    }
  });
  if (result.length) result = result.slice(0, -2); // Remove the last ', '
  return result;
};
export default handleQueryParams;
