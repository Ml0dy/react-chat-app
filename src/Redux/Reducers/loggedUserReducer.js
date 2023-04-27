const loggedUserReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case "GET_USER":
      return (state.user = action.payload);
    case "LOGOUT":
      return (state.user = {});
    default:
      return state;
  }
};

export default loggedUserReducer;
