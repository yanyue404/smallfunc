(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-79f51740"],{"08ff":function(t,e,s){},"473d":function(t,e,s){"use strict";s("08ff")},ea23:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"qrcode-container"},[s("el-alert",{attrs:{title:"二维码生成工具（采用qrcode实现）",type:"info","show-icon":"",closable:!1}}),s("el-card",{staticClass:"card-box"},[s("section",{staticClass:"content-box"},[s("el-input",{staticClass:"txt",attrs:{type:"textarea",autosize:"",placeholder:"请输入内容"},model:{value:t.text,callback:function(e){t.text=e},expression:"text"}}),s("div",{staticClass:"opts-box"},[s("el-button",{staticClass:"create-btn",attrs:{type:"success"},on:{click:t.onTapQrcode}},[t._v("生成二维码")]),s("el-button",{staticClass:"reset-btn",on:{click:t.onTapReset}},[t._v("清空")])],1)],1),s("section",{staticClass:"qrcode-box",attrs:{id:"qrcode"}},[t.url?s("img",{attrs:{src:t.url,alt:""}}):s("span",[t._v("此处预览二维码")])])])],1)},c=[],o=s("ade3"),n=s("d055"),i=s.n(n),r={data:function(){return{text:"",url:""}},methods:{onTapQrcode:function(){var t,e=this;this.text?i.a.toDataURL(this.text,(t={errorCorrectionLevel:"L",margin:1,height:260,width:258,type:"10",scal:177},Object(o["a"])(t,"type","10"),Object(o["a"])(t,"color",{dark:"#000",light:"#fff"}),Object(o["a"])(t,"rendererOpts",{quality:.9}),t)).then((function(t){e.url=t,console.log(t)})).catch((function(t){console.log(t)})):this.$message("请输入内容")},onTapReset:function(){this.text="",this.url=""}}},l=r,u=(s("473d"),s("2877")),d=Object(u["a"])(l,a,c,!1,null,"c9fd80c0",null);e["default"]=d.exports}}]);