import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import DialogModal from './dialogmodal'

export default class TestDialog extends Component {

  config = {
    navigationBarTitleText: '测试弹窗页面'
  }

  render () {
    return (
      <View className='index'>
        <DialogModal>
            <Text>我是传入的Text组件</Text>
        </DialogModal>

        <DialogModal>
            <Button>我是传入的Button组件</Button>
        </DialogModal>

        <DialogModal>
            <Image src={require('../../img/background.jpg')}></Image>
        </DialogModal>
      </View>
    )
  }
}
