export const initialState = {
  user: null,
};
export const actionTypes = {
  SET_USER: "SET_USER",
};
const reducer = (state, action) => {
  //   console.log(action);
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: localStorage.setItem("data", JSON.stringify(action.item)),
      };

    default:
      return state;
  }
};

export default reducer;
