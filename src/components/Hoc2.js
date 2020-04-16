import React, { Component } from 'react'
// formWrapper就像钢铁侠的装甲一样，可以给基本的comp添加各种额外的功能
// 或者称为工具箱装饰器
// 再测试的时候对input输入之后，input的value并没有改变，是因为 ：
// input 发生change事件之后，可能有两个原因 
// A. 对input进行了重新渲染，然后恢复了初始值
// B. 或者，没有发现props和state的变化，根本没有进行渲染。（答案：B）
function formWrapper(Comp) {
    // 调试了半天，，下面的Component写成了 comment了！！！！！
    return class extends Component {
        // formWrapper还携带了一个子装饰器生成器，用来传递给Comp组件内部使用
        // 本子装饰器生成的装饰器只能包装input类型的基本组件
        // 处理表单项输入事件
        handleChange = e => {
            // const { name, value } = e.target;
            // this.setState(
            //     {
            //         [name]: value
            //     },
            //     () => {
            //         // 数值变化后再校验
            //        console.log(this.state.name);
                   
            //     }
            // );
            console.log(e.target);
        };

        childWrapperCreator = (ttype, name, value) => {
            // 1. 下面的装饰器装饰的是对象，而不是class，所以用React.cloneElement
            return ChildCompObject => {
                return (
                    <div>
                        {React.cloneElement(ChildCompObject, {
                            type: ttype,
                            name: name, //控件name
                            value: value, //控件值
                            onChange: this.handleChange
                        })}
                        {/* 2. 所以下面这样写，会报错 */}
                        {/* <ChildComp {...cprops} type={ttype} name={name} value={value}></ChildComp> */}
                    </div>
                )
            }
        }
        render() {
            console.log("formWrapper render");
            return (
                <Comp {...this.props} wrapperCreator={this.childWrapperCreator}></Comp>
            );
        }
    }
}

class Kinput extends Component {
    render() {
        console.log("Kinput  render");
        return (
            <input {...this.props} />
        );
    }
}

@formWrapper
class Form extends Component {
    render() {
        // 从props中拿出小礼物
        const { wrapperCreator } = this.props;
        console.log("Form  render");
        return (
            <div>
                {wrapperCreator('text', 'name', 'TonyStark')(<Kinput></Kinput>)}
                {wrapperCreator('password', 'pwd', '123')(<Kinput></Kinput>)}
            </div>
        )
    }
}

export default Form;