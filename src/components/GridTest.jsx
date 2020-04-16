import React from 'react'
import { Row, Col } from 'antd';
// 注意css的引入方法
import "./GridTest.css";




export default function GridTest() {
    const arry = []
    for (let i = 1; i <= 12; i++) {
        arry.push(i)
    }

    const List = arry.map(item => (
        <Col className="gutter-row" span={2}>
            <div className="gutter-box" style={{ background: "#00a0e9", height: "100px" }}> {item}</div>
        </Col>
    ))

    console.log(List);


    return (
        <div>
            <Row >
                <Col xs={{ span: 24 }} lg={{ span: 6, offset: 2 }} style={{ background: "#00a0e9" }}>
                    Col1
                 </Col>
                <Col xs={{ span: 0 }} lg={{ span: 6, offset: 2 }} style={{ background: "#00a0e9" }}>
                    Col2
                </Col>
                <Col xs={{ span: 0 }} lg={{ span: 6, offset: 2 }} style={{ background: "#00a0e9", height: "100px" }}>
                    Col3
                </Col>
            </Row>
            {/* gutter 为栅格的内距，类似padding */}
            <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 20]}>
                {List}
            </Row>
            <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 20]}>
                {List}
            </Row> 
            <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 20]}>
                {List}
            </Row>
        </div>

    )
}

