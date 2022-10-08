# sms-to-miniprogram

> https://gitlab.it.taikang.com/tk-online/tf/pos/sms-to-miniprogram

短信链接跳转微信小程序中转页

## 微信小程序短链生成规则

```js
// eg: pages/home/home?env=dev
const toNormalLink = (url) => {
  return encodeURIComponent(url);
};

// eg: https://f.tk.cn/tkproperty/ksh/N20220003/?recall=A
const toProductLink = (url) => {
  return encodeURIComponent("pages/product/product?url=" + encodeURIComponent(url));
};

// eg: https://mp.weixin.qq.com/s/GAFpXcoiKZd7K3W0I6TAmw
const toWebLink = (url) => {
  return encodeURIComponent("pages/web-page/web-page?url=" + encodeURIComponent(url));
};

// 域名 dev：https://ecuat.tk.cn/tk-online/pos/sms-to-miniprogram/#/?path=
// 域名 production：https://m.tk.cn/tk-online/pos/sms-to-miniprogram/#/?path=
```
