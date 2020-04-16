
import { Input } from "antd";

import React, { Component } from 'react'

export default class Test extends Component {

    constructor(props) {
        super(props)
        this.state = {
            value1: 'antd Input',
            value2: 'html input'
        }
    }


    render() {
        console.log('render');
        
        return (
            <div>
                <div>this is a test</div>
                <div>antd Input</div>
                <Input></Input>
                <Input value={this.state.value1} onChange={e => { 
                    console.log(e);
                    
                    this.setState({ value1:  e.target.value }) }}></Input>
                <div>html input</div>
                <input value={this.state.value2} onChange={e => { 
                      console.log(e);
                      this.setState({ value2: e.target.value})}}></input>
            </div>
        )
    }
}

