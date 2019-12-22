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