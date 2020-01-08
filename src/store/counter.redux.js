const initialState = {
  count: 0
};


// reducer:状态修改具体执行者，返回一个对象！
export default (state = initialState, action) => {
    switch (action.type) {
      case "add":
        return {count: state.count + 1};
      case "minus":
        return {count: state.count - 1};
      default:
        // return state.count;
        // ERROR: 返回一个对象！而不是一个数！
        return state;
    }
  };
  
  function add() {
    return { type: "add" };
  }
  
  function minus() {
    return { type: "minus" };
  }
  
  function asyncAdd() {
    return (dispatch, getState) => {
      console.log(getState());
  
      // 模拟异步操作
      setTimeout(() => {
        dispatch({ type: "add" });
      }, 1000);
    };
  }
  
  export {add, minus, asyncAdd}