import React, { Component } from 'react'
import "./PropRender.css";

function Comp(props) {
    const { children } = props;
    // const Dom = typeof(children) === "function" ? children() : childrens
    // console.log(typeof());
    return (
        <div style={{ color: 'red' }}>
            {children}
        </div>
    )
}

function Comp2(props) {
    const { children, text } = props;
    return (
        <div style={{ color: 'blue' }}>
            {children(text)}
        </div>
    )
}

function Comp3(props) {
    const { children, text } = props;
    const Dom = children;

    return (
        <div style={{ color: 'green' }}>
            <Dom text={text}></Dom>
        </div>
    )
}

// HOC
// react csss => https://blog.csdn.net/pcaxb/article/details/53896661
function withBorder(Comp) {
    return class extends Component {
        render() {
            return (
                <div style={{borderWidth:1, borderColor:'red', borderStyle:'solid'}}>
                    <Comp {...this.props} name = 'Comp'/>
                </div>
            )
        }
    }

}

@withBorder
class PropRender extends Component {
    render() {
        return (
            <div>
                <Comp>
                    {/* children是一个jsx */}
                    <h3>this is comp</h3>
                </Comp>
                <Comp2 text="this is comp2">
                    {/* children是一个普通函数 */}
                    {text => <h3>{text}</h3>}
                </Comp2>
                <Comp3 text="this is comp3">
                    {/* children是一个 function component */}
                    {props => <h3>{props.text}</h3>}
                </Comp3>
            </div>
        )


    }
}

export default PropRender;