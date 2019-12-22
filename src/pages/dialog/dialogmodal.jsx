import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

export default class DialogModal extends Component {

  render () {
    // 使用this.props.children可以获得父组件在引用当前组件时内部包含的内容
    // 注意:
    // 1. 请不要对this.props.children进行任何操作
    // 2. this.props.children无法用defaultProps设置默认内容
    // 3. 不能把this.props.children分解为变量再使用
    return (
      <View className='index'>
        我是弹窗组件
        {
          this.props.children
        }
      </View>
    )
  }
}
