export const initialState = {
  user: null,
  userId: null,
};
export const actionTypes = {
  SET_USER: "SET_USER",
};
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: localStorage.setItem("data", JSON.stringify(action.item)),
        // userId: localStorage.setItem("id", JSON.stringify(action.id)),
      };

    default:
      return state;
  }
};

export default reducer;
