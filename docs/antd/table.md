# Table

## 可选择

```jsx
import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import { Table } from "antd";

class SelectableTable extends PureComponent {
  constructor(props) {
    super(props);
    this.uid = props.uid;
    this.state = {
      selectedRowKeys: [],
      selectedRows: [],
      uid: props.uid
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const changedState = {};
    const { selectedRowKeys, dataSource } = nextProps;
    if (selectedRowKeys) {
      const selectedRows = dataSource.filter(data =>
        selectedRowKeys.includes(data[prevState.uid])
      );
      changedState.selectedRowKeys = selectedRowKeys;
      changedState.selectedRows = selectedRows;
    }
    return changedState;
  }

  handleRowSelectionSelect = (record, selected) => {
    const {
      multiple,
      onSelect,
      selectedRowKeys: selectedRowKeysFormProps
    } = this.props;
    const { selectedRowKeys, selectedRows } = this.state;

    const key = record[this.uid];

    let newSelectedRowKeys = [],
      newSelectedRows = [];

    if (selected) {
      if (multiple) {
        newSelectedRowKeys = selectedRowKeys.concat(key);
        newSelectedRows = selectedRows.concat(record);
      } else {
        newSelectedRowKeys = [key];
        newSelectedRows = [record];
      }
    } else {
      if (multiple) {
        newSelectedRowKeys = selectedRowKeys.filter(item => item !== key);
        newSelectedRows = selectedRows.filter(row =>
          newSelectedRowKeys.includes(row[this.uid])
        );
      }
    }

    onSelect(newSelectedRowKeys, newSelectedRows);
    this.setState({
      selectedRowKeys: newSelectedRowKeys,
      selectedRows: newSelectedRows
    });
  };

  handleRowSelectionSelectAll = (selected, selectedRows, changeRows) => {
    const { onSelectAll } = this.props;
    let newSelectedRowKeys = [],
      newSelectedRows = [];
    if (selected) {
      newSelectedRowKeys = this.state.selectedRowKeys.concat(
        selectedRows.map(data => data[this.uid])
      );
      newSelectedRows = selectedRows;
    }
    onSelectAll(newSelectedRowKeys, newSelectedRows);
    this.setState({
      selectedRowKeys: newSelectedRowKeys,
      selectedRows: newSelectedRows
    });
  };

  handleListRowEvent = record => {
    const { multiple, onSelect, onRowDblClick } = this.props;
    const { selectedRowKeys, selectedRows } = this.state;
    const onClick = () => {
      const key = record[this.uid];

      let newSelectedRowKeys = [],
        newSelectedRows = [];

      const isExist = selectedRowKeys.includes(key);

      if (!isExist) {
        if (multiple) {
          newSelectedRowKeys = selectedRowKeys.concat(key);
          newSelectedRows = selectedRows.concat(record);
        } else {
          newSelectedRowKeys = [key];
          newSelectedRows = [record];
        }
      } else {
        if (multiple) {
          newSelectedRowKeys = selectedRowKeys.filter(item => item !== key);
          newSelectedRows = selectedRows.filter(row =>
            newSelectedRowKeys.includes(row[this.uid])
          );
        }
      }

      onSelect(newSelectedRowKeys, newSelectedRows);
      this.setState(() => ({
        selectedRowKeys: newSelectedRowKeys,
        selectedRows: newSelectedRows
      }));
    };

    const onDoubleClick = () => {
      onRowDblClick(record);
    };

    return { onClick, onDoubleClick };
  };

  render() {
    const {
      selectedRowKeys: selectedRowKeysFormProps,
      ...restProps
    } = this.props;
    const { selectedRowKeys } = this.state;

    const rowSelection = {
      selectedRowKeys: selectedRowKeysFormProps || selectedRowKeys,
      onSelect: this.handleRowSelectionSelect,
      onSelectAll: this.handleRowSelectionSelectAll
    };

    const tableProps = {
      rowSelection,
      onRow: this.handleListRowEvent,
      rowKey: record => record[this.uid],
      ...restProps
    };
    return <Table {...tableProps} />;
  }
}

SelectableTable.propTypes = {
  uid: PropTypes.string,
  onSelect: PropTypes.func
};

SelectableTable.defaultProps = {
  uid: "id",
  multiple: true,
  onSelect: () => {},
  onSelectAll: () => {},
  onRowDblClick: () => {}
};

export default SelectableTable;
```

## 可伸缩表格

```jsx
import React from "react";
import { Table } from "antd";
import { Resizable } from "react-resizable";
import PropTypes from "prop-types";
import omit from "omit.js";
import classnames from "classnames";

import styles from "./index.less";

const ResizeableTitle = props => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable width={width} height={0} onResize={onResize}>
      <th {...restProps} />
    </Resizable>
  );
};

class ResizeableTable extends React.Component {
  constructor(props) {
    super(props);
    const { columns = [] } = props;
    this.uid = props.uid;
    this.state = {
      columns,
      selectedRowKeys: [],
      selectedRows: [],
      uid: props.uid
    };
  }

  components = {
    header: {
      cell: ResizeableTitle
    }
  };

  handleResize = index => (e, { size }) => {
    this.setState(({ columns }) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width
      };
      return { columns: nextColumns };
    });
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    const changedState = {};
    const { selectedRowKeys, dataSource } = nextProps;
    if (selectedRowKeys) {
      const selectedRows = dataSource.filter(data =>
        selectedRowKeys.includes(data[prevState.uid])
      );
      changedState.selectedRowKeys = selectedRowKeys;
      changedState.selectedRows = selectedRows;
    }
    if (nextProps.columns.length !== prevState.columns.length) {
      changedState.columns = nextProps.columns;
    }
    return changedState;
  }

  handleRowSelectionSelect = (record, selected) => {
    const {
      multiple,
      onSelect,
      selectedRowKeys: selectedRowKeysFormProps
    } = this.props;
    const { selectedRowKeys, selectedRows } = this.state;

    const key = record[this.uid];

    let newSelectedRowKeys = [],
      newSelectedRows = [];

    if (selected) {
      if (multiple) {
        newSelectedRowKeys = selectedRowKeys.concat(key);
        newSelectedRows = selectedRows.concat(record);
      } else {
        newSelectedRowKeys = [key];
        newSelectedRows = [record];
      }
    } else {
      if (multiple) {
        newSelectedRowKeys = selectedRowKeys.filter(item => item !== key);
        newSelectedRows = selectedRows.filter(row =>
          newSelectedRowKeys.includes(row[this.uid])
        );
      }
    }

    onSelect(newSelectedRowKeys, newSelectedRows);
    this.setState({
      selectedRowKeys: newSelectedRowKeys,
      selectedRows: newSelectedRows
    });
  };

  handleRowSelectionSelectAll = (selected, selectedRows, changeRows) => {
    const { onSelectAll } = this.props;
    const { selectedRowKeys } = this.state;
    let newSelectedRowKeys = [],
      newSelectedRows = [];
    if (selected) {
      newSelectedRowKeys = selectedRowKeys.concat(
        selectedRows
          .map(data => data[this.uid])
          .filter(item => !selectedRowKeys.includes(item))
      );
      newSelectedRows = selectedRows;
    }
    onSelectAll(newSelectedRowKeys, newSelectedRows);
    this.setState({
      selectedRowKeys: newSelectedRowKeys,
      selectedRows: newSelectedRows
    });
  };

  handleListRowEvent = record => {
    const { multiple, onSelect, onRowDblClick, getCheckboxProps } = this.props;
    const { selectedRowKeys, selectedRows } = this.state;
    const onClick = () => {
      const key = record[this.uid];

      let newSelectedRowKeys = [],
        newSelectedRows = [];

      const isExist = selectedRowKeys.includes(key);

      if (!isExist) {
        if (multiple) {
          newSelectedRowKeys = selectedRowKeys.concat(key);
          newSelectedRows = selectedRows.concat(record);
        } else {
          newSelectedRowKeys = [key];
          newSelectedRows = [record];
        }
      } else {
        if (multiple) {
          newSelectedRowKeys = selectedRowKeys.filter(item => item !== key);
          newSelectedRows = selectedRows.filter(row =>
            newSelectedRowKeys.includes(row[this.uid])
          );
        }
      }

      onSelect(newSelectedRowKeys, newSelectedRows);
      this.setState(() => ({
        selectedRowKeys: newSelectedRowKeys,
        selectedRows: newSelectedRows
      }));
    };

    const onDoubleClick = () => {
      onRowDblClick(record);
    };

    return { onClick, onDoubleClick };
  };

  render() {
    const newProps = omit(this.props, ["columns"]);
    const { className, ...restProps } = newProps;

    const cns = classnames({
      [className]: !!className,
      [styles.resizeableTable]: true
    });
    const columns = this.state.columns.map((col, index) => ({
      ...col,
      onHeaderCell: column => ({
        width: column.width,
        onResize: this.handleResize(index)
      })
    }));

    const {
      selectedRowKeys: selectedRowKeysFormProps,
      getCheckboxProps,
      isShowCheckBox,
      ...others
    } = this.props;
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys: selectedRowKeysFormProps || selectedRowKeys,
      onSelect: this.handleRowSelectionSelect,
      onSelectAll: this.handleRowSelectionSelectAll,
      getCheckboxProps
    };
    const tableProps = {
      rowSelection: isShowCheckBox === true ? rowSelection : null,
      onRow: this.handleListRowEvent,
      rowKey: record => record[this.uid],
      ...others
    };

    return (
      <Table
        {...tableProps}
        className={cns}
        bordered={true}
        components={this.components}
        columns={columns}
        size="small"
      />
    );
  }
}

ResizeableTable.propTypes = {
  uid: PropTypes.string,
  onSelect: PropTypes.func
};

ResizeableTable.defaultProps = {
  uid: "id",
  multiple: true,
  onSelect: () => {},
  onSelectAll: () => {},
  onRowDblClick: () => {},
  getCheckboxProps: null,
  isShowCheckBox: true
};

export default ResizeableTable;
```

样式

```less
.resizeableTable {
  :global {
    background: white;
    table {
      table-layout: fixed;
      background: #ffffff;
      td {
        width: 100%;
        word-break: keep-all;
        /* 不换行 */
        white-space: nowrap;
        /* 不换行 */
        overflow: hidden;
        /* 内容超出宽度时隐藏超出部分的内容 */
        text-overflow: ellipsis;
        /* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
      }
    }
    .ant-table {
      .ant-table-fixed {
        .ant-table-thead {
          th {
            background-color: #f0f8ff !important;
            font-weight: bold;
          }
        }
        .ant-table-tbody {
          .ant-table-row-hover {
            td {
              background-color: #c1ffc1;
            }
          }
          .ant-table-row {
            td {
              padding: 4px !important;
              white-space: nowrap;
            }
          }
        }
      }
      .ant-table-body {
        overflow: auto;
        .ant-table-thead th {
          white-space: nowrap;
          font-weight: bold;
          background-color: #f0f8ff !important;
          padding: 4px !important;
          text-align: left;
        }
        .ant-table-tbody {
          tr:hover {
            td {
              background-color: #c1ffc1;
            }
          }
          td {
            white-space: nowrap;
            padding: 4px !important;
            text-align: left;
          }
        }
      }
    }
    .ant-table-content {
      background: #ffffff;
      padding: 10px 8px;
      padding-bottom: 0px;
    }

    .react-resizable {
      position: relative;
    }
    .react-resizable-handle {
      position: absolute;
      width: 10px;
      height: 100%;
      bottom: 0;
      right: -5px;
      cursor: col-resize;
    }
  }
}
```
