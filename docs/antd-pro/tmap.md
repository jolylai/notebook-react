# 腾讯地图

## QQ 地图库

```html
<script src="//map.qq.com/api/js?v=2.exp&key=[开发者个人密钥]"></script>
```

## 热力图库

如果要使用默认热力图组件，需要额外引入热力图库

```html
<script src="http://open.map.qq.com/apifiles/plugins/heatmap/heatmap.min.js"></script>
```

## 安装 npm 包

```bash
yarn add react-tmap
yarn add react-loadable
```

## 组件封装

```jsx
import React, { PureComponent } from "react";
import Loadable from "react-loadable";

const getLocalCity = function() {
  return new Promise(resolve => {
    const CityService = new window.qq.maps.CityService({
      complete: result => resolve(result)
    });

    CityService.searchLocalCity();
  });
};

const TMap = Loadable({
  loader: () => import("react-tmap"),
  loading: () => <div>loading...</div>,
  render: (loaded, props) => {
    const { QMap, Marker } = loaded;
    const { center, onDragend, ...restProps } = props;
    return (
      <QMap
        apiKey="DSABZ"
        center={center}
        events={{
          dragend: event => onDragend(event, loaded.utils)
        }}
        {...restProps}
      >
        <Marker position={center} />
      </QMap>
    );
  }
});

export default class App extends PureComponent {
  state = {
    center: {
      lat: 0,
      lng: 0
    },
    address: ""
  };

  componentDidMount() {
    getLocalCity().then(result => {
      const { latLng, name } = result.detail;
      this.setState({ center: latLng, address: name });
    });
  }

  handleDragend = (event, utils) => {
    utils.getAddressByLatLng(event.center).then(result => {
      const { location, address } = result.detail;
      this.setState({ center: location, address: address });
    });
  };

  render() {
    const { center, address } = this.state;
    return (
      <div>
        <div>{address}</div>
        <TMap zoom={14} center={center} onDragend={this.handleDragend} />
      </div>
    );
  }
}
```

- utils: `react-tmap` 封装的一些工具函数
- events: [
  'click',
  'dblclick',
  'rightclick',
  'mouseover',
  'mouseout',
  'mousemove',
  'drag',
  'dragstart',
  'dragend',
  'longpress',
  'bounds_changed',
  'center_changed',
  'zoom_changed',
  'maptypeid_changed',
  'projection_changed',
  ['idle', true],
  'tilesloaded',
  'resize'
  ]

## 工具封装

根据 ip 获取城市

```js
const getLocalCity = function() {
  return new Promise(resolve => {
    const CityService = new window.qq.maps.CityService({
      complete: result => resolve(result)
    });

    CityService.searchLocalCity();
  });
};
```

根据地址获取位置信息

```js
const getPositionByAddress = address => {
  return new Promise(resolve => {
    const Geocoder = new window.qq.maps.Geocoder({
      complete: result => resolve(result)
    });

    Geocoder.getLocation(address);
  });
};
```

根据官网 api 文档封装更多工具

## 资源

- [react-tmap](https://github.com/lichenbuliren/react-tmap)
- [腾讯位置服务]](https://lbs.qq.com/index.html)
