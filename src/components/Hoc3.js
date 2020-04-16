import React, { Component } from 'react'

const formWrapper = Comp => {
    class NewComp extends Component {
        constructor(props) {
            super(props);
            // 2.初始化状态
            this.state = {
                formDate: {}
            };
        }

        handleChange = e => {
            console.log(e.target);
            const { name, value } = e.target;
            this.setState(
                {

                    formDate: { ...this.state.formDate, [name]: value }
                },
                () => {
                    // 数值变化后再校验
                    console.log(this.state.formDate);

                }
            );
        }


        fieldWrapperCreator1 = (Comp, type, name) => {
            const NewComp = React.cloneElement(Comp, {
                type: type,
                name: name,
                value: this.state.formDate[name] || '',
                onChange: this.handleChange
            })

            return (
                <div>
                    {/* NewComp 是一个组件对象 */}
                    <span>{name}</span>
                    {NewComp}
                </div>
            )
        }
        
        fieldWrapperCreator2 = (type, name) => CompObj => {
            const newCompObj = React.cloneElement(CompObj, {
                type: type,
                name: name,
                value: this.state.formDate[name] || '',
                onChange: this.handleChange
            })

            return (
                <div>
                    {/* NewComp 是一个组件对象 */}
                    <span>{name}</span>
                    {newCompObj}
                </div>
            )
        }

        render() {
            return (
                <Comp {...this.props} fieldWrapper1={this.fieldWrapperCreator1} fieldWrapper2={this.fieldWrapperCreator2}>
                </Comp>
            )
        }
    }
    return NewComp;
}

@formWrapper
class Form extends Component {
    render() {
        const { fieldWrapper1,  fieldWrapper2} = this.props
        return (
            <div>
                {fieldWrapper1(<input></input>, "text", "username")}
                {fieldWrapper1(<input></input>, "password", "password")}
                {fieldWrapper2("text", "username2")(<input></input>)}
                {fieldWrapper2("password", "password2")(<input></input>)}
            </div>
        )
    }
}

export default Form;