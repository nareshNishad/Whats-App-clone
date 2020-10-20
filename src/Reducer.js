export const initialState = {
  user: null,
};
export const actionTypes = {
  SET_USER: "SET_USER",
};
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      sessionStorage.setItem("data", JSON.stringify(action.item));
      return state;
    default:
      return state;
  }
};

export default reducer;
