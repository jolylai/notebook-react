# Form

## 三等分

```jsx
import React from "react";
import { Input, Form, Row, Col } from "antd";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};

const formLargeItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 }
  }
};

const Download = props => {
  const { form, onDownload } = props;
  const { getFieldDecorator, validateFields } = form;

  const handleDownload = e => {
    e.preventDefault();
    validateFields((error, values) => {
      if (!error) {
        onDownload(values);
      }
    });
  };

  return (
    <Form {...formItemLayout} onSubmit={handleDownload}>
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item label="网店名称">
            {getFieldDecorator("username", {
              initialValue: "",
              rules: [{ required: true, message: "请选择网店！" }]
            })(<Input type="password" />)}
          </Form.Item>
        </Col>
        <Col span={16}>
          <Form.Item {...formLargeItemLayout} label="网店单号">
            {getFieldDecorator("password")(<Input type="password" />)}
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

Download.defaultProps = {
  onDownload() {}
};

export default Form.create()(Download);
```

## 格式化动态表单值

动态生成表单，获取表单值后需要将数据格式化成想要的数据结构时可以使用自定义迭代器, 例如：将
`{ dec-0-0: "1", dec-0-1: "0", option-0-0: "真的", option-0-1: "假的", question-0: "是真的吗", }` 转换成
`options: [ { dec: "1" option: "真的" }, { dec: "0" option: "假的" } ]`

```js
const it = {
  [Symbol.iterator]() {
    let index = 0;
    return {
      [Symbol.iterator]() {
        return this;
      },
      next() {
        if (condition) {
          // 符合条件时返回自定义的数据结构
          return { value: {}, done: false };
        }
        // 结束迭代
        return { done: true };
      },
      return(v) {
        return { value: v, done: true };
      }
    };
  }
};

for (let value of it) {
  // 每次迭代一个符合条件时返回自定义的数据
}
```

```js
import omit from "omit.js";

formatFieldsValue = values => {
  let restValue = { ...values };
  const Ques = {
    [Symbol.iterator]() {
      let index = 0;
      return {
        [Symbol.iterator]() {
          return this;
        },
        next() {
          const current = values[`question-${index}`];
          if (current) {
            let options = [];
            for (
              let j = 0;
              values[`option-${index}-${j}`] && values[`dec-${index}-${j}`];
              j++
            ) {
              options = options.concat({
                option: values[`option-${index}-${j}`],
                dec: values[`dec-${index}-${j}`]
              });
              restValue = omit(restValue, [
                `question-${index}`,
                `option-${index}-${j}`,
                `dec-${index}-${j}`
              ]);
            }
            index++;
            return { value: { question: current, options }, done: false };
          }
          index = 0;
          return { done: true };
        },
        return(v) {
          return { value: v, done: true };
        }
      };
    }
  };
  let questions = [];
  for (let key of Ques) {
    questions = questions.concat(key);
  }
  return { ...restValue, questions };
};
```

解决动态生成表单删除某个字段后的数据显示问题

```js
import React, { PureComponent } from "react";
import { Form, Input, Button } from "antd";

@Form.create({
  name: "global_state",
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      username: Form.createFormField({
        ...props.username,
        value: props.username.value
      })
    };
  },
  onValuesChange(_, values) {
    console.log(values);
  }
})
export default class Questions extends PureComponent {
  render() {
    const {
      list,
      onAddQuestion,
      onDeleteQuestion,
      onAddOption,
      onDeleteOption,
      form: { getFieldDecorator }
    } = this.props;
    return (
      <Form>
        {list.map((question, index) => (
          <React.Fragment key={question.key}>
            <Form.Item key={question.key} label={`题目${index + 1}`}>
              {getFieldDecorator(`question-${index}`, {
                rules: [{ required: true, message: "请输入题目" }]
              })(<Input placeholder="请输入题目" />)}
              <Button onClick={onAddQuestion}>添加</Button>
              <Button onClick={() => onDeleteQuestion(index)} type="danger">
                删除
              </Button>
            </Form.Item>
          </React.Fragment>
        ))}
      </Form>
    );
  }
}
```
