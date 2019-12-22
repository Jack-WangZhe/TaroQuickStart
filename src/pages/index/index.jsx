import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.less'
import Child from './child'; // 注意: 引入的名称必须跟组件的名称保持一致

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  // 生命周期只能对state变量使用setState进行管理,对其他定义的变量无法管理
  state = {
    name: 'Hello Jack',
    obj: undefined
  }

  componentWillMount () {
    let {name} = this.$router.params
    console.log(name)
    // 在第一次渲染之前执行,只执行一次
    console.log('第一次渲染之前执行')
  }

  componentDidMount () {
    // 在第一次渲染之后执行,只执行一次
    console.log('第一次渲染之后执行')
    // 修改state中的值只可以使用setState进行,调用setState后还会再次调用render()渲染数据
    this.setState({
      // 此更改只会更新name和obj属性值,不会更改其他state中的属性值
      name: 'Hello Jack!',
      obj: {key: [{name: 'Jack'}]}
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

  fun() {
    console.log('父组件传递函数到子组件')
  }

  render () {
    let {name, obj} = this.state;
    // this表示当前index实例对象
    // 渲染render中不论使用的是对象也好,方法也好,都可以执行获取结果返回
    // 注意: 小程序在传递函数时必须要加一个onXXX!!否则无法识别传递到子组件的函数
    return (
      <View className='index'>
        <Text>{this.state.name}</Text>
        <Child name={name} obj={obj} onFun={this.fun}></Child>
      </View>
    )
  }
}
