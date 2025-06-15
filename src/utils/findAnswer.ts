export default <T extends { id: string }>(ans: T[], id: string) =>
  ans.find(({ id: _id }) => _id === id);
