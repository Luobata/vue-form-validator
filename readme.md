## Intro
针对Vue2.0之后的表单验证结构，最大程度的简化表单验证逻辑，分离校验函数与错误提示之间的耦合。并且通过丰富的trigger组合，使得任何情况的校验都能满足，完全告别手动验证的场景。

## Usage
```
<template>
    <div>
        <validate-form ref="form">
            <input validate-name="input2" min="5" required trigger="blur;$sel.change"/>
            <selects validate-name="sel" v-model="test.data" :options="options" v-bind:min="data"></selects>
            <input v-model="text" v-validate min="5" max="10" trigger="blur;keycode=13" phone/>
            <span v-show="errors.input2">{{ errors.input2Error }}</span>
        </validate-form>
    </div>
</template>
```

## API

1. events trigger
    1. blur / input / focus / keydown / keyup  (input textarea contenteditable only)
    2. keycode keycode=13 or keycode(默认绑定13 回车)
    3. change (v=model)
    4. ref.validate('validate-name') ref.validateAll();
    5. trigger by other element's rules like $sel.change;(由其他元素节点的值变化时触法)

2. rules
    1. min Min 最小值 
    2. max Max 最大值
    4. min-length / minlength (only in config)
    Min-length / Minlength (only in config)
    最小长度
    5. max-length / maxlength (only in config)
    Max-length / maxlength (only in config)
    最大长度
    6. min-float-length / minfloatlength
    Min-float-length / Minfloatlength
    最小浮点数部分的长度限制（小数点后位数）
    3. required 必填
    4. phone 手机号（/^1[34578]\d{9}$/）
    5. email （/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/）
    4. positive（>=0） Positive（>0）正数
    5. negative Negative 负数
    7. number(可以是字符串数字) Number(不能是字符串数字）number="int|float" 默认int

    ps:
        1. 大小写 大小写表示边界值 比如min="2" 表示2符合条件 Min="2" 表示2不符合条件 即大写不包含边界
        2. only in config 表示该写法只能在config配置参数中写不能在template中写 多因为和html原生属性名冲突
    
3. config
    1. lengthType: 适用于min/maxlength lengthType="eng(默认)|chi|function"
