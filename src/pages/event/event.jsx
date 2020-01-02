import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'

const currentEnvName = process.env.TARO_ENV;
export default class Event extends Component {

  config = {
    navigationBarTitleText: '测试事件'
  }

  state = {
    name: 'Jack'
  }

  componentDidMount() {
    // 输出当前环境
    // 如果是微信则是weapp
    // 如果是h5则是h5
    // 使用环境可以用来渲染不同内容,比如不同的less文件
    // if (currentEnvName === 'h5') {
    //   require('./h5.less')
    // } else {
    //   require('./weapp.less')
    // }
    console.log(currentEnvName)
  }

  test(event) {
    // this是指向当前page的,若this指向了事件,则需要在调用时给定this.test.bind(this)传递全局的this
    console.log(this.state.name)
    // 获取点击事件,如果是大元素包含小元素,希望点击小元素的时候不触发大元素的onClick事件,则需要使用stopPropagation的方式阻止事件冒泡
    console.log(event);
    // 打出来的内容是0-Jack 1-event,则说明当添加函数参数时,参数在前,event事件对象在后
    console.log(arguments);
  }

  render () {
    return (
      <View className='index'>
        <Button onClick={this.test.bind(this, this.state.name)}>测试事件</Button>
        <Button onClick={()=> {console.log('Susan')}}>测试直接添加箭头函数</Button>
      </View>
    )
  }
}
