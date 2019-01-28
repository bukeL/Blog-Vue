//事件bus

import Vue from 'vue'

let EventBus = new Vue();

//有一个$on(事件名,function(){})
//对应$emit ('事件名',数据)

export default EventBus;