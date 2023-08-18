function transformStringToObjectKey(inputString) {
    const keys = inputString.split('.');
    let result = {};
  
    let currentObj = result;
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      currentObj[key] = i === keys.length - 1 ? undefined : {};
      currentObj = currentObj[key];
    }
  
    return result;
}

export default transformStringToObjectKey;