function sumObjectProps(arr, propertyName) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    const hasProperty = Object.prototype.hasOwnProperty.call(arr[i], [
      propertyName,
    ]);
    if (hasProperty) {
      sum += parseFloat(arr[i][propertyName]);
    }
  }
  return sum;
}

function sortPostsbyGreatestValue(objectArr, propertyName) {
  return objectArr.reduce(
    (maxObject, currentObject) =>
      currentObject[propertyName] > maxObject[propertyName]
        ? currentObject
        : maxObject,
    objectArr[0]
  );
}

function handleObjectResponse(data) {
  const contentJSON = JSON.parse(data.message.content);
  const content = Object.values(contentJSON)[0];
  return content;
}

function handleStringResponse(data) {
  const list = data.message.content;
  const content = list.split(/\d+\. /).filter(Boolean);
  return content;
}

export {
  sumObjectProps,
  sortPostsbyGreatestValue,
  handleObjectResponse,
  handleStringResponse,
};
