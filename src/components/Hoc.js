import React, { Component } from "react";


// function Kaikeba(props) {
//     return (
//         <div>
//             {props.stage} ---- {props.name}
//         </div>
//     )
// }

// const withName = (Comp, name) => {
//     return props => <Comp {...props} name={name}/>
// }


// export default withName(Kaikeba, '高阶组件的应用')


// 高阶组件
const withName = Comp => {
  console.log("withName 调用了")
  // 甚至可以重写组件声明周期
  class NewComponent extends Component {
    componentDidMount() {
      console.log("do something");
    }
    render() {
      return <Comp {...this.props} name="高阶组件试用介绍" />;
    }
  }

  // 假设通过某种特殊手段获取了本节课名字
  return NewComponent;
};

function withLogF(tag) {
  function withTag(Comp) {
    console.log(tag + ' : ' + Comp.name + "渲染了");
    return props => <Comp {...props} />;
  }
  return withTag;
}

const withLog = tag => {
  const withTag = Comp => {
    console.log(tag + ' : ' + Comp.name + "渲染了");
    return props => <Comp {...props} />;
  }
  return withTag;
};

// 更简洁的写法
// const withLog = tag => {
//   return Comp => {
//     console.log(tag + ' : ' + Comp.name + "渲染了");
//     return props => <Comp {...props} />;
//   }
// };


//使用注解！
@withLogF('outer')
@withName
@withLog('inner')
class Kaikeba extends Component {
  render() {
    return (
      <div>
        {this.props.stage} - {this.props.name}
      </div>
    );
  }
}
// 输出：
// inner : Kaikeba渲染了
// withName 调用了
// outer : NewComponent渲染了
// do something

export default Kaikeba;
