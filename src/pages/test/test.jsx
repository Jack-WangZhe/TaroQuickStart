import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button, Image } from '@tarojs/components'
import { setData, getData } from '../../utils'
import background from '../../img/background.jpg'
import './test.less'

export default class Test extends Component {

  config = {
    navigationBarTitleText: '测试页面'
  }

  state = {
    list: [
      {id: 1, name:'Jack'},
      {id: 2, name:'Susan'},
      {id: 3, name:'Tom'},
      {id: 4, name:'Jerry'}
    ]
  }

  navigateToIndex() {
    // 导航到index页面
    // 使用redirectTo,上方会出现小房子标志,点击会回到首页
    // 使用navigateTo,上方会出现返回标志,点击会返回到上一个页面
    Taro.redirectTo({url: '/pages/index/index?name=Jack'})
  }

  // 测试导入方法
  clickHandle() {
    setData()
  }

  render () {
    let dom = null
    dom = true?<Text>三元表达式条件正确</Text>:<Text>三元表达式条件不正确</Text>

    let {list} = this.state
    return (
      <View className='index'>
        <Button onClick={this.navigateToIndex}>跳转</Button>
        <Button onClick={this.clickHandle}>测试导入方法</Button>
        <Image className="img" src={background}/>
        {dom}
        {
          true||<Text>通过短路表达式决定无法显示</Text>
        }
        {
          list.map((item, index)=> {
            return(
              <View key={item.id}>{item.name}</View>
            )
          })
        }
      </View>
    )
  }
}
