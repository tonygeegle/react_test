import React, { Component } from "react";
import { BrowserRouter, Link, Route, Switch, Redirect } from "react-router-dom";
import { connect, Provider } from "react-redux";
import { login } from "../store/user.redux";
import store from "../store";


function App(props) {
    return (
        <div>
            {/* <p>
                <Link to="/home">home</Link> | <Link to="/about">about</Link> | <Link to="/foo">foo</Link>
            </p> */}
            <ul>
                <li><Link to="/">home</Link></li>
                <li><Link to="/about">about</Link></li>
                <li><Link to="/login">login</Link></li>
            </ul>
            <Switch>
                {/* component 写成大写的了！！！！ 
                就算是加上Switch，exact也是必须用的，  理解为: instr(link, path), 只要path为link的子串，就匹配！*/}
                <Route exact path="/" component={Home} />
                {/* <Route path="/about" component={About} /> */}
                <PrivateRoute path="/about" component={About} />
                <Route path="/detail/:course" component={Detail} />
                <Route path="/login" component={Login} />
                <Route component={NoMatch} />
            </Switch>

        </div>
    )
}

// 登录组件
@connect(
    state => ({ isLogin: state.user.isLogin }),
    {
        login
    }
)
class Login extends Component {
    render() {
        // 回调地址
        //   Cannot read property 'from' of undefined   
        //   const from = this.props.location.state.from || "/";
        const from = (this.props.location.state && this.props.location.state.from) || "/";
        if (this.props.isLogin) {
            return <Redirect to={from} />;
        }
        return (
            <div>
                <p>请先登录</p>
                <button onClick={this.props.login}>登录</button>
            </div>
        );
    }
}
// 下面也可以实现路由保护的功能，但是路由里面的子组件无法获得路由redirect信息
@connect(state => ({ isLogin: state.user.isLogin }))
class PrivateRoute extends Component {
    // 1.当需要状态时，需要构造函数
    constructor(props) {
        super(props);
        // 2.初始化状态
        this.state = {
            count: 3,
        };
    }

    // componentDidMount() {
    //     this.timer = setInterval(() => {
    //         // 3.更新状态
    //         this.setState(prevState => ({
    //             count: prevState.count - 1
    //         }));
    //     }, 1000);
    // }
    // componentWillUnmount() {
    //     clearTimeout(this.timer);
    // }

    render() {
        // console.log(this.state.count);
        
        const { isLogin, component, ...rest } = this.props;

        if (isLogin) {
            return <Route {...rest} component={component} />
        } 
        else if(this.state.count === 0) {
            return <Redirect to="/login"/>
        }
        else {
            // 每次render进行setState，因此立即再次触发render, 链式render
            let timer = setTimeout(()=>{
                this.setState(prevState =>({count: prevState.count - 1}), () => {
                    console.log(" this.state.count: " + this.state.count);
                    
                })
            }, 1000);
           
            return (<div> 
                        <p>没有权限访问, 请先登录</p>
                        <p>
                            页面马上就要跳转...{this.state.count}秒 
                            <button onClick={() => {
                                this.setState({count: 0}); 
                                clearTimeout(timer);}}>立即跳转</button>
                        </p>
                    </div>
            );
        }
    }
}

// 路由守卫：定义可以验证的高阶组件
// @connect(state => ({ isLogin: state.user.isLogin }))
// class PrivateRoute extends Component {
//   render() {
//     const { isLogin, component: Component, ...rest } = this.props;
//     // redner和component选项二选一
//     return (
//       <Route
//         {...rest}
//         render={props =>
//           isLogin ? (
//             <Component {...props} />
//           ) : (
//             <Redirect
//               to={{
//                 pathname: "/login",
//                 state: { from: props.location.pathname }
//               }}
//             />
//           )
//         }
//       />
//     );
//   }
// }

function Home({ location }) {
    console.log("接收参数：", location.state);

    return (
        <div>
            <ul>
                <li>
                    <Link to="/detail/web">Web</Link>
                </li>
                <li>
                    <Link to="/detail/python">Python</Link>
                </li>
                <li>
                    <Link to="/detail/java">Java</Link>
                </li>
            </ul>
        </div>
    );
}

function Detail({ match, history, location }) {
    // match - 参数获取等路由信息
    // history - 导航
    // location - url定位
    console.log(match, history, location);
    return (
        <div>
            {/* 获取参数 */}
            <div>
                {match.params.course}
            </div>
            {/* 命令式导航 */}
            <button onClick={history.goBack}>后退</button>
            <button
                onClick={() => history.push({ pathname: "/", state: { foo: "bar" } })}
            >
                回到首页
      </button>
        </div>
    );
}

function About() {
    return (
        <div>
            {/* 显示用户信息和订单 */}
            <h2>用户中心</h2>
            <div>
                <Link to="/about/me">个人信息</Link>
                <Link to="/about/order">订单</Link>
            </div>
            <Switch>
                <Route path="/about/me" component={() => <div>我的信息</div>} />
                <Route path="/about/order" component={() => <div>订单信息</div>} />
                {/* 重定向 */}
                <Redirect to="/about/me" />
            </Switch>
        </div>
    );
}

function NoMatch(props) {
    return <div>404页面</div>;
}


export default class RouteSample extends Component {
    render() {
        return (
            <BrowserRouter>
                <Provider store={store}>
                    <App />
                </Provider>
            </BrowserRouter>
        );
    }
}