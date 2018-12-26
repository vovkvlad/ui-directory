const initialState = {
  display: false,
  position: { x: 0, y: 0 },
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  
  switch (type) {
    default:
      return state;
  }
};