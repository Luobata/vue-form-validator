## Intro
针对Vue2.0之后的表单验证结构，最大程度的简化表单验证逻辑，分离校验函数与错误提示之间的耦合。并且通过丰富的trigger组合，使得任何情况的校验都能满足，完全告别手动验证的场景。

## Usage
```
<template>
    <div>
        <validate-form ref="form">
            <input validate-name="input2" min="5" required trigger="blur;$sel.change"/>
            <selects validate-name="sel" v-model="test.data" :options="options" v-validate v-if="a" v-bind:min="data"></selects>
            <input v-model="text" v-validate min="5" max="10" trigger="blur" phone/>
            <span v-show="errors.input2">{{ errors.input2Error }}</span>
        </validate-form>
    </div>
</template>
```

## API

1. events trigger
    1. blur (input textarea contenteditable only)
    2. input (input textarea contenteditable only)
    3. change (v=model)
    4. handle by user
    5. trigger by other element's rules

2. rules
    1. min must number
    2. max must number
    3. required
    4. max-length must number
    5. min-length must number
    6. lengthtype global-config or rule in the validate-form or exact dom
    7. number
    8. float value is the length of the number

3. config
    1. lengthType: the length rule for property length
