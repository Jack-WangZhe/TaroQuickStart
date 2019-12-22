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
### 二.生命周期 & State & Props
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

#### 3.Props
* 实例代码
```jsx
- 父级jsx模板
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

- 子类jsx模板
import Taro, {Component} from '@tarojs/taro';
import {View, Text} from '@tarojs/components';

export default class Child extends Component {
    // 由于父组件在组件渲染完成后重新给state的name属性赋值,且该name属性传递给子组件作为props,则会触发componentWillReceiveProps方法
    componentWillReceiveProps(nextProps) {
        console.log(`props属性变化了,变化前是:${this.props.name}, 变化成: ${nextProps.name}`)
    }

    c1() {
        // 调用父组件传递来的函数
        this.props.onFun();
    }

    render() {
        // 接受父组件传递的props值,传值可以使值类型也可以是引用类型或函数
        let {name, obj} = this.props;
        // 若调用包含this的函数,需要使用bind并传递参数this,否则在c1中的this指向的就是Click中的事件对象
        return (
            <View onClick={this.c1.bind(this)}>我是子节点 {name + '------' + obj.key[0].name}</View>
        )
    }
}
// 设置默认的props值
Child.defaultProps = {
    // 如传递过来的props值为undefined时,则表明该props没有赋值,则会使用当前default值
    // 但若传递来的props属性值是null,则不会读取defaultProps中的值,会视为已经赋值为null了
    obj: {key: [{name: 'Susan'}]}
}

```

* 注意事项
  * 在父组件中调用子组件,需要通过import方式将子组件引入,且注意引入的组件名需要跟子组件类名相同
  * 在父组件中通过填写组件的属性值给子组件传递参数,在子组件中通过`this.props`的方式获取传递的属性值
  * 如果在父组件传递给子组件 对象 并希望子组件调用时,可以在子组件使用defaultProps的方式设置默认属性值，如果父组件传递的是undefined,则会使用子组件的默认值,若父组件传递的是null,则不会使用子组件的默认值
  * 父组件向子组件传递函数时,需要使用on开头的函数名,否则微信会报错

### 三.路由功能
#### 1.Taro路由概念
* 在Taro中,路由功能是默认自带的,不需要开发者进行额外的路由配置【在app.js中配置】
* 这里相当于通过小程序的配置配置了小程序和H5的路由问题
* Taro默认根据配置路径生成了Route
* 我们只需要在入口文件的config配置中指定好pages,然后就可以在代码中通过Taro提供的API来跳转到目的页面
* Taro路由API
  * `Taro.navigateTo(OBJECT)` - 小程序中相当于打开一个新的WebView,WebView中放了一个新的页面(追加页面),小程序限制打开WebView的层数最多5层
  * `Taro.redirectTo` - 替换新页面
  * `Taro.switchTab`
  * `Taro.navigateBack`
  * `Taro.reLaunch`
  * `Taro.getCurrentPage` - 获取当前页面
#### 2.Taro基本路由代码详解
* app.jsx
```jsx
import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'
import './app.less'

class App extends Component {

  config = {
    pages: [
      // 此处用来定义微信中的pages或h5路由
      // Taro默认的首页就是pages里面数组的第一项
      'pages/index/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Index />
    )
  }
}
Taro.render(<App />, document.getElementById('app'))
```

* test.jsx
```jsx
import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'

export default class Test extends Component {

  config = {
    navigationBarTitleText: '测试页面'
  }

  navigateToIndex() {
    // 导航到index页面
    // 使用redirectTo,上方会出现小房子标志,点击会回到首页
    // 使用navigateTo,上方会出现返回标志,点击会返回到上一个页面
    Taro.redirectTo({url: '/pages/index/index'})
  }

  render () {
    return (
      <View className='index'>
        <Button onClick={this.navigateToIndex}>跳转</Button>
      </View>
    )
  }
}
```

#### 3.路由传参
* 我们可以通过在所有跳转url后面添加查询字符串参数进行跳转传参,例如传入参数id=2&type=test
```jsx
Taro.navigateTo({
  url: '/pages/page/path/name?id=2&type=test'
})
```
* 这样的话,在跳转成功的目标页的生命周期方法里就能通过`this.$route.params`获取到传入的参数,例如上述跳转,在目标页的`componentWillMount()`生命周期里获取入参

#### 4.静态资源引用
* 在Taro中可以像使用webpack那样自由地引用静态资源，而且不需要安装任何loader(很棒吧~)
* 引用样式文件
```jsx
- 使用import引入样式文件
import './test.less'

- 使用className声明使用的样式类
<Image className="img" src={background}/>
```
* 可以直接通过ES6的import语法来引用样式文件
* 引用js文件
  * 可以直接通过ES6的import语法来引用JS文件 `import {functionName} from './css/path/name.js'`
  * `import defaultExportName from './css/path/name.js'`可以去掉文件路径后面的后缀
```jsx
- 设置utils.js类
export function getData() {
    console.log('get data')
}
export function setData() {
    console.log('set data')
}

- 导入utils.js类并调用方法
import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { setData, getData } from '../../utils'

export default class Test extends Component {

  config = {
    navigationBarTitleText: '测试页面'
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
    return (
      <View className='index'>
        <Button onClick={this.navigateToIndex}>跳转</Button>
        <Button onClick={this.clickHandle}>测试导入方法</Button>
      </View>
    )
  }
}
```

#### 5.引用图片、音频、字体等文件
* 可以直接通过ES6的import语法来引用此类文件,拿到文件引用后直接在JSX中进行使用
```jsx
// 引用文件
import namedPng from '../../images/path/named.png'
// 使用
<View>
  <Image src={namedPng} />
</View>
```
* 也可以用require来引用,值得注意的是只有本地文件才这样做,如果是线上图片直接赋值即可[使用require原因:直接写路径是无法找到的,需要将图片一起放置到dist下才能通过路径找到],示例如下:
```jsx
<Image src={require('../../img/background.jpg')}/>
```

### 四.条件渲染
> Taro由于需要适配各种客户端,故不能再渲染模板中使用if/else,只能实现处理好数组,之后遍历数组调用map进行显示
#### 1.短路表达式
* 值得注意的是 小程序在短路表达式渲染时，会出现true或者false的短暂出现，所以如果是要适配小程序，最好采用三元表达式来进行判断
```jsx
{
  true||<Text>通过短路表达式决定无法显示</Text>
}
```

#### 2.三元表达式
* 比较通用的一种方式，jsx语法是不支持if操作符的，所以只能用三元表达式或者短路表达式
```jsx
render () {
  let dom = null
  dom = true?<Text>三元表达式条件正确</Text>:<Text>三元表达式条件不正确</Text>
  return (
    <View className='index'>
      {dom}
    </View>
  )
}
```
#### 3.列表渲染
* 可以通过遍历数组的形式进行列表渲染,但在渲染的每个组件中需要给一个key,因为React通过diff比较算法,进行最快的计算与比较渲染页面[在页面元素发生变化的时候可以快速比较及渲染变化的元素]
```jsx
render () {
  let {list} = this.state
  return (
    <View className='index'>
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
```
#### 4.组件传递
* 通过`this.props.children`的方式可以在父组件中定义组件内容并传递给子组件,子组件可以获取父组件调用时包裹内部的内容
* 注意:
  * 请不要对this.props.children进行任何操作
  * this.props.children无法用defaultProps设置默认内容
  * 不能把this.props.children分解为变量再使用
  * 也可以通过传递属性值的方式传递组件内容,如`<DialogModal content={<View>传递给子组件用于接收</View>}></DialogModal>`
```jsx
// 父组件
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

// 子组件
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
```
