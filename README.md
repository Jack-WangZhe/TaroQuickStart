## Taro练手项目
### 一.Taro简介
#### 1.Taro基础概念
* Taro是一套遵循React语法规范的多端开发解决方案
* 使用Taro只书写一套代码（Nerv 类React代码），再通过**Taro的编译工具**，将源代码分别编译出可以在不同端（微信小程序、H5、RN等）运行的代码
#### 2. Taro的安装
* 安装Taro开发工具`@tarojs/cli`
* 使用npm或者yarn全局安装，或者直接使用npx
* `npm install -g @tarojs/cli`
* `yarn global add @tarojs/cli`
#### 3.Taro的使用
* 使用命令创建模板项目`taro init myApp`
* 开发期启动命令
	* `npm run dev:h5` Web
	* `npm run dev:weapp` 微信小程序
	* `npm run dev:alipay` 支付宝小程序
	* `npm run dev:swan` 百度小程序
	* `npm run dev:rn` ReactNative
#### 4.Taro目录结构
```
| —— dist 编译结果目录 - 不同格式打包后的文件都在此文件夹下
| —— config 编译目录
|             | —— dev.js 开发时配置
|             | —— index.js 默认配置
|             | —— prod.js 打包时配置
| —— src  源码目录
|             | —— pages 页面文件目录
|             |              | —— index index页面目录
|             |              |             | —— index.js index页面逻辑
|      		  | 			 |             | —— index.css index页面样式
|             | —— app.css 项目总通用样式
|             | —— app.js 项目入口文件[配置路由,Taro在编译成小程序时会将路由里的组件视为页面,不是路由中的组件编译成组件]
| —— package.json
```
### 二.生命周期 & State
#### 1.实例代码及相关生命周期介绍
* 实例代码
```jsx
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.less'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  // 生命周期只能对state变量使用setState进行管理,对其他定义的变量无法管理
  state = {
    name: 'Hello Jack'
  }

  componentWillMount () { 
    // 在第一次渲染之前执行,只执行一次
    console.log('第一次渲染之前执行')
  }

  componentDidMount () {
    // 在第一次渲染之后执行,只执行一次
    console.log('第一次渲染之后执行')
    // 修改state中的值只可以使用setState进行,调用setState后还会再次调用render()渲染数据
    this.setState({
      // 此更改只会更新name属性值,不会更改其他state中的属性值
      name: 'Hello Jack!'
    })
  }

  componentWillUpdate () {
    // state数据将要更新
    console.log('state数据将要更新')
  }

  componentDidUpdate () {
    // state数据更新过后
    console.log('state数据更新过后')
  }

  /**
   * @param {*} nextProps 下一个的props值
   */
  componentWillReceiveProps (nextProps) {
    // 此事件会在父组件传递给子组件的参数发生改变时触发
  }

  /**
   * @param {*} nextProps 通过父组件传给子组件的对象Props
   * @param {*} nextState 下一次的state状态值
   */
  shouldComponentUpdate (nextProps, nextState) {
    // 检查此次setState是否要进行render调用
    return true; // 通过返回的true或false决定此次setState操作是否需要调用render渲染页面
    // 此方法通常用于多次setState调用时,判断状态决定是否更新,提升render性能.比如if(nextState.text=='Jack')时才return true
    // 如果其中使用this.state.value:此时获取的state是没改前的state;使用nextState则是判断修改后的
  }

  componentWillUnmount () { 
    // 卸载时执行, 只执行一次
    console.log('卸载时执行')
    // 什么时候卸载呢?
    // 从A页面跳到B页面被销毁时
    // 组件被页面刷新渲染时执行
  }

  componentDidShow () { 
    // reactjs是不存在的
    // 但是在Taro是存在的
    // 页面显示时触发
    console.log('页面显示时触发')
  }

  componentDidHide () { 
    // 页面隐藏时触发
    console.log('页面隐藏时触发')
  }

  getName() {
    return '1111111'
  }

  render () {
    // this表示当前index实例对象
    // 渲染render中不论使用的是对象也好,方法也好,都可以执行获取结果返回
    return (
      <View className='index'>
        <Text>{this.state.name}</Text>
      </View>
    )
  }
}
```
* 调用结果
```
第一次渲染之前执行
页面显示时触发
第一次渲染之后执行
state数据将要更新
state数据更新过后
```
#### 2.生命周期与State注意
```jsx
// setState设置state后取值不一定是更改后的
this.setState({name:'Jack'})
console.log(this.state.name) // 打印出来的不一定是Jack,可能是之前值,因为是异步的

// 采用setState的第二个参数回调函数的方式可以获取到更改后的state值
this.setState({name:'Jack'}, ()=> {
	console.log(this.state.name) // 此时一定是Jack
})
```
* 状态更新一定是异步的
* React中的状态更新不一定是异步的
* 必须使用setState({})更新state中的数据，直接赋值是无效的