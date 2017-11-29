## Intro
A vue plugin to solve the situation when form is need to validate by complex conditions.

**You can not validate a form item triger by other item's change with other validate plugin.**

针对Vue2.0之后的表单验证结构，最大程度的简化表单验证逻辑，分离校验函数与错误提示之间的耦合。并且通过丰富的trigger组合，使得任何情况的校验都能满足，完全告别手动验证的场景。

## Installation
```npm install --save-dev vue-validator-help```

## Usage
```js
import Vue from 'vue';
import validate from 'vue-validator-help';

Vue.use(validate);
```

then in your component template, add the validate-form.
```html
<validate-form ref="form" :rule="rule" :config="config">
    <input type="text" v-validate/>
    <input type="text" validate-name="input"/>
</validate-form>
```
```html
// more complex form
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
**if you need to show error text or other style when error, you need to add a object errors in your component like**
```js
// vue js
export default {
    data() {
        return {
            errors: {},
        }
    }
};
// when the validate-name="input" is error, the validate from will add the key into errors
errors: {
    input: true,
    inputError: '', // the error text is defined by you config more detail in component
};
```

## (API)[https://luobata.github.io/luobata-wiki/vue-validator-help-wiki/]

### events trigger
1. blur / input / focus / keydown / keyup  (input textarea contenteditable only)
2. keycode keycode=13 or keycode(默认绑定13 回车)
3. change (v=model)
4. ref.validate('validate-name') ref.validateAll();
5. trigger by other element's rules like $sel.change;(由其他元素节点的值变化时触法)

### (rules)[https://luobata.github.io/luobata-wiki/vue-validator-help-wiki/rule.html]
