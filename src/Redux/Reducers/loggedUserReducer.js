const loggedUserReducer = (state = { id: -1 }, action) => {
  switch (action.type) {
    case "GET_USER":
      return (state.id = action.payload);
    default:
      return state;
  }
};

export default loggedUserReducer;
