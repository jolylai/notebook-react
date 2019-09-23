# Modal

## 列表搜索弹窗

```jsx
import React, { PureComponent } from "react";
import { Form, Row, Col, Input, Button, Modal, Table } from "antd";

const FormItem = Form.Item;

@Form.create()
export default class MatchModal extends PureComponent {
  state = {};

  static defaultProps = {
    dataSource: [],
    onSearch() {}
  };

  filterData = {};

  handleSearch = e => {
    e.preventDefault();
    const {
      onSearch,
      form: { getFieldsValue }
    } = this.props;
    const fieldsValue = getFieldsValue();
    onSearch(fieldsValue);
  };

  handleReset = () => {
    const {
      form: { resetFields }
    } = this.props;
    resetFields();
  };

  handleTableChange = ({ current, pageSize }) => {
    const { onSearch } = this.props;
    onSearch({ ...this.filterData, pageNumber: current, pageSize });
  };

  render() {
    const {
      dataSource,
      loading,
      pagination,
      form: { getFieldDecorator },
      ...restProps
    } = this.props;

    const columns = [
      {
        title: "年份",
        dataIndex: "title",
        render: (text, record) => text
      }
    ];

    const tableProps = {
      columns,
      dataSource,
      loading,
      pagination: false,
      onChange: this.handleTableChange
    };

    return (
      <Modal {...restProps}>
        <Form onSubmit={this.handleSearch}>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="赛事年份">
                {getFieldDecorator("title")(
                  <Input placeholder="请输入赛事年份" />
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="赛事名称">
                {getFieldDecorator("title")(
                  <Input placeholder="请输入赛事名称" />
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                  重置
                </Button>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormItem>
                <Table {...tableProps} />
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}
```
