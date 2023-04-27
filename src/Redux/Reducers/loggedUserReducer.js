const loggedUserReducer = (state = { id: -1 }, action) => {
  switch (action.type) {
    case "GET_USER":
      return (state.id = action.payload);
    case "LOGOUT":
      return (state.id = {});
    default:
      return state;
  }
};

export default loggedUserReducer;
