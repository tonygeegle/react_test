import React, { Component } from "react";

//Dialog
function Dialog(props) {
  return (
    <div style={{ border: `4px solid ${props.color || "blue"}` }}>
      {/* 等效vue中匿名插槽 */}
      {props.children}
      {/* 等效vue中具名插槽 */}
      <div className="abc">{props.footer}</div>
    </div>
  );
}

function WelcomeDialog() {
  const confirmBtn = (
    <button onClick={() => alert("react确实好！")}>确定</button>
  );
  return (
    <Dialog color="green" footer={confirmBtn}>
      <h1>欢迎光临</h1>
      <p>感谢使用react！！！</p>
    </Dialog>
  );
}
// props.children 的使用探讨
const api = {
  getUser: () => ({name: 'Tony', age: 30})
}

function Fetcher(props) {
  let user = api[props.name]();
  return props.children(user)
}

// function ShowUser({name, age}) {
//   return <p>{name}----{age}</p>
// }

function FilterP(props) {
  return (
    <div>
      {
        // 用 map 实现了一个filter功能
        React.Children.map( 
          props.children, child => {
            console.log(child);
            if (child.type !== 'p') {
              return;
            } else {
              return child;
            }
          }
        )
      }
    </div>
  )
}

function RadioGroup(props) {
  console.log(props.name);
  console.log(props.children);
  return (
    <div>
      {/* TypeError: Cannot add property name, object is not extensible */}
      {/* {React.Children.foreach(props.children, child => {
        child.props.name = props.name;
      })} */}
      {React.Children.map(props.children, child => {
        return React.cloneElement(child, {name: props.name});
      })}
      {/* 1. 用下面也可以，但是index.js:1375 Warning: Each child in a list should have a unique "key" prop.
      {props.children.map(child => {  
        return React.cloneElement(child, {name: props.name});
      })} 
          2. 使用index完美解决！
      {props.children.map((child, index) => {  
        return React.cloneElement(child, {name: props.name, key: index});
      })} 
      */}
    </div>
  )
}

function RadioGroup2(props) {
  console.log(props.name);
  console.log(props.children);
  return (
    <div>
      {/* TypeError: Cannot add property name, object is not extensible */}
      {/* {React.Children.foreach(props.children, child => {
        child.props.name = props.name;
      })} */}
      {/* 下面本来应该可以，但是 props.children 为函数，不是 jsx的时候 用React.Children.map出现问题*/}
      {/* {React.Children.map(props.children, child => {
        return child(props.name);
      })} */}
       
       {/*这时props.children为数组，所以 */}
       {props.children.map((child, index) => {  
        return child(props.name, index);
      })}
    </div>
  )
}

function Radio({ children, ...rest }) {
  return (<label>
            <input type="radio" {...rest} />
            {children}
          </label>)
}

export default class Composition extends Component {
  render() {
    return (
      <div>
        <WelcomeDialog />
        <Fetcher name="getUser">
          {/* 下面直接用 <ShowUser/> 的的话，该标签已经是JSX，不能再传入props了，除非用react.clone*/}
          {/* <ShowUser/> */}
          {({name, age}) => <p>{name}----{age}</p>}
        </Fetcher>
        {/* 操作children */}
        <FilterP>
          <h3>React</h3>
          <p>React很不错</p>
          <h3>VUE</h3>
          <p>VUE也很不错</p>
        </FilterP>
        {/* 编辑children */}
        <RadioGroup name="mvvm">
          <Radio value="VUE" >VUE</Radio>
          <Radio value="React">React</Radio>
          <Radio value="Angela">Angela</Radio>
        </RadioGroup>
        <RadioGroup2 name="mvvm2">
          {(name, index) => <Radio value="VUE2" name={name} key={index}>VUE</Radio>}
          {(name, index)  => <Radio value="React2" name={name} key={index}>React</Radio>}
          {(name, index)  => <Radio value="Angela2" name={name} key={index}>Angela</Radio>}
          {/* {name => <h3>{name}</h3>} */}
        </RadioGroup2>
      </div>
    );
  }
}