const showDiffJsonExpected = () => {
  console.log('[{"key":"common","children":[{"key":"follow","value":false,"type":"added"},{"key":"setting1","value":"Value 1","type":"unchanged"},{"key":"setting2","value":200,"type":"removed"},{"key":"setting3","oldValue":true,"type":"changed","newValue":null},{"key":"setting4","value":"blah blah","type":"added"},{"key":"setting5","value":{"key5":"value5"},"type":"added"},{"key":"setting6","children":[{"key":"doge","children":[{"key":"wow","oldValue":"","type":"changed","newValue":"so much"}]},{"key":"key","value":"value","type":"unchanged"},{"key":"ops","value":"vops","type":"added"}]}]},{"key":"group1","children":[{"key":"baz","oldValue":"bas","type":"changed","newValue":"bars"},{"key":"foo","value":"bar","type":"unchanged"},{"key":"nest","oldValue":{"key":"value"},"type":"changed","newValue":"str"}]},{"key":"group2","value":{"abc":12345,"deep":{"id":45}},"type":"removed"},{"key":"group3","value":{"deep":{"id":{"number":45}},"fee":100500},"type":"added"}]');
};
export default showDiffJsonExpected;
