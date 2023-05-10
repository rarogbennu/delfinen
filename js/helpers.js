function prepareData(dataObject) {
    const dataArray = [];
    for (const key in dataObject) {
      const data = dataObject[key];
      data.id = key;
      dataArray.push(data);
    }
  
    return dataArray;
}

export {prepareData}