(function(t){function e(e){for(var l,o,a=e[0],s=e[1],u=e[2],f=0,d=[];f<a.length;f++)o=a[f],Object.prototype.hasOwnProperty.call(r,o)&&r[o]&&d.push(r[o][0]),r[o]=0;for(l in s)Object.prototype.hasOwnProperty.call(s,l)&&(t[l]=s[l]);c&&c(e);while(d.length)d.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],l=!0,a=1;a<n.length;a++){var s=n[a];0!==r[s]&&(l=!1)}l&&(i.splice(e--,1),t=o(o.s=n[0]))}return t}var l={},r={app:0},i=[];function o(e){if(l[e])return l[e].exports;var n=l[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=t,o.c=l,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var l in t)o.d(n,l,function(e){return t[e]}.bind(null,l));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],s=a.push.bind(a);a.push=e,a=a.slice();for(var u=0;u<a.length;u++)e(a[u]);var c=s;i.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"030f":function(t,e,n){},"034f":function(t,e,n){"use strict";n("85ec")},"0aa8":function(t,e,n){},"3e06":function(t,e,n){},"429b":function(t,e,n){"use strict";n("030f")},"478a":function(t,e,n){"use strict";n("0aa8")},"4f49":function(t,e,n){"use strict";n("6a82")},"539a":function(t,e,n){"use strict";n("d60f")},"56d7":function(t,e,n){"use strict";n.r(e);n("a7cc"),n("450d");var l=n("df33"),r=n.n(l),i=(n("e260"),n("e6cf"),n("cca6"),n("a79d"),n("2b0e")),o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("div"),n("div",{staticStyle:{display:"grid","grid-template-columns":"repeat(2, auto)"}},[n("div",{staticStyle:{display:"grid","grid-template-rows":"repeat(2, auto)","justify-items":"center"}},[n("Table",{attrs:{table:t.table}}),n("ButtonGroup",{attrs:{table:t.table}})],1),n("div",[n("ChartRoom",{ref:"chartRoom",attrs:{user:t.user}})],1)]),t._v(" "+t._s(t.table.id)+" "),n("Dialog",{ref:"dialog"},[n("input",{attrs:{placeholder:"怎么称呼"},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.submitName(e)}}})])],1)},a=[],s=(n("96cf"),n("1da1")),u=function(){var t=this,e=t.$createElement,n=t._self._c||e;return void 0!==this.table.boxs?n("div",{staticClass:"table",style:t.tableStyle},t._l(this.table.getBoxs(),(function(t,e){return n("Box",{key:e,attrs:{box:t}})})),1):t._e()},c=[],f=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{style:t.boxStyle},t._l(t.box.getCells(),(function(t,e){return n("Cell",{key:e,attrs:{cell:t}})})),1)},d=[],h=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",{staticClass:"cell",style:t.cellStyle,on:{click:function(e){return t.fillGap(e)}}},[n("span",{style:t.valueStyle},[t._v(t._s(t.cell.value)+" ")])])},v=[],p=(n("99af"),n("b0c0"),n("d81d"),n("d148")),g=p["a"].init({env:"myth-8ghne7lfb3b2968a"}),b=g.database(),m=new WebSocket("ws://service-66x1nfgh-1252739196.bj.apigw.tencentcs.com/release/websocket");function y(t,e){x().then((function(n){var l=n.data[0]._id;b.collection("Table").doc(l).set({code:t,data:{cells:e.getCells().map((function(t){return{x:t.x,y:t.y,value:t.value,needFill:t.needFill}}))}}).then((function(t){console.log(t),console.log("生成新的table成功")}))}))}function x(){return b.collection("Table").where({}).get()}function w(t){var e=t.remoteTable;b.collection("Table").doc(e._id).update({data:{cells:t.getCells().map((function(t){return{x:t.x,y:t.y,value:t.value,needFill:t.needFill}}))}}).then((function(t){console.log(t)}))}function k(t,e){m.send(JSON.stringify({user:t,msg:e}))}function C(t,e){var n=t.remoteTable;t.watcher=b.collection("Table").doc(n._id).watch({onChange:function(){e(this.virtualClient.sessionInfo.currentDocs[0])}})}function S(t){m.onmessage=function(e){var n=JSON.parse(e.data);t(n)}}var j={props:["cell"],methods:{fillGap:function(t){var e=this;if(!1!==this.cell.allowFill&&!1!==this.cell.needFill){this.$parent.$parent.$parent.$emit("startGame");var n=this.$root.$children[0].user;"×"===this.$root.curIndex?(this.cell.value=void 0,w(this.cell.table),n.sendMsg("[".concat(n.name,"] 将 x:").concat(this.cell.x,",y:").concat(this.cell.y," 清空了"))):this.cell.value=this.$root.curIndex;var l=this.cell.table.verify(this.cell);if(l)this.$root.$children[0],w(this.cell.table),n.sendMsg("[".concat(n.name,"] 将 x:").concat(this.cell.x,",y:").concat(this.cell.y," 修改为:").concat(this.cell.value)),this.cell.table.verifyPass()&&(window.clearInterval(this.$parent.$parent.$parent.timeId),n.sendMsg("[".concat(n.name,"] 下完了最后一步，重新开始")),this.$root.$children[0].restart(),alert("恭喜你通关了"));else{this.cell.value=void 0;var r=t.target.style.background;t.target.style.background="#eb2d2d46",this.cell.allowFill=!1,setTimeout((function(){t.target.style.background=r,e.cell.allowFill=!0}),500)}}}},computed:{valueStyle:function(){return this.cell.needFill?{color:"green","font-size":"35px"}:{"font-size":"25px"}},hint:function(){return this.cell.value===this.$root.curIndex},cellStyle:function(){return this.hint?{background:"#0000004f",color:"#fff"}:{}}}},O=j,_=(n("ca81"),n("2877")),$=Object(_["a"])(O,h,v,!1,null,"106483f4",null),E=$.exports,M={props:["box"],components:{Cell:E},computed:{boxStyle:function(){return{display:"grid","grid-template-columns":"repeat(3, 50px)","grid-template-rows":"repeat(3, 50px)",border:"2px solid #000"}}}},B=M,T=Object(_["a"])(B,f,d,!1,null,null,null),P=T.exports,I={props:["table"],components:{Box:P},data:function(){return{curIndex:"1"}},computed:{tableStyle:function(){return{cursor:'url("./images/'+this.$root.curIndex+'.png") 1 1, auto'}}},mounted:function(){console.log()}},F=I,R=(n("429b"),Object(_["a"])(F,u,c,!1,null,"12d28948",null)),L=R.exports,G=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticStyle:{"margin-top":"20px"}},t._l(t.buttons,(function(e,l){return n("button",{key:l,class:t.$root.curIndex===e.label?"btn-handle btn-handle-active":"btn-handle",on:{click:function(n){return t.click(e)}}},[t._v(" "+t._s(e.label)+" ")])})),0)},N=[],A=(n("4de4"),n("4160"),n("159b"),{props:["table"],data:function(){return{buttons:[{label:"1"},{label:"2"},{label:"3"},{label:"4"},{label:"5"},{label:"6"},{label:"7"},{label:"8"},{label:"9"},{label:"×"}]}},methods:{click:function(t){this.$root.curIndex=t.label,this.table.getCells().filter((function(e){return e.hint=!1,e.value===t.label})).forEach((function(t){t.hint=!0}))}}}),D=A,J=(n("478a"),Object(_["a"])(D,G,N,!1,null,"7eff32d2",null)),V=J.exports,W=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.msg,expression:"msg"}],ref:"textarea",staticStyle:{width:"300px",height:"468px","margin-top":"30px"},attrs:{readonly:""},domProps:{value:t.msg},on:{input:function(e){e.target.composing||(t.msg=e.target.value)}}}),n("div",[n("input",{directives:[{name:"model",rawName:"v-model",value:t.willSendMsg,expression:"willSendMsg"}],domProps:{value:t.willSendMsg},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.onEnter(e)},input:function(e){e.target.composing||(t.willSendMsg=e.target.value)}}})])])},z=[],H=(n("a15b"),{props:["user"],computed:{msg:function(){return this.msgList.join("\n")}},data:function(){return{msgList:[],willSendMsg:""}},methods:{onEnter:function(){this.user.sendMsg(this.user.name+":"+this.willSendMsg),this.willSendMsg="",this.setScrollLastPositon()},startListen:function(){var t=this;S((function(e){console.log("消息来了"),console.log(e),e&&t.msgList.push(e.msg)}))},setScrollLastPositon:function(){this.$refs.textarea.scrollTop=this.$refs.textarea.scrollHeight}}}),q=H,K=(n("5f82"),Object(_["a"])(q,W,z,!1,null,null,null)),Q=K.exports,U=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-dialog",{attrs:{title:"请问",visible:t.dialogVisible,width:"300px","show-close":!1,"close-on-click-modal":!1,"close-on-press-escape":!1,"custom-class":"custom-dialog"},on:{"update:visible":function(e){t.dialogVisible=e}}},[t._t("default"),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"})],2)},X=[],Y={data:function(){return{dialogVisible:!0}}},Z=Y,tt=(n("4f49"),Object(_["a"])(Z,U,X,!1,null,null,null)),et=tt.exports,nt=(n("ac1f"),n("1276"),n("b85c")),lt=n("2ef0"),rt=n.n(lt),it=n("d4ec"),ot=n("bee2"),at=function(){function t(e,n,l,r,i){var o=arguments.length>5&&void 0!==arguments[5]&&arguments[5];Object(it["a"])(this,t),this.x=n,this.y=l,this.box=r,this.weights=100,this.value=void 0===e?void 0:String(e),this.table=i,this.needFill=o,this.hint=!1,this.allowFill=!0}return Object(ot["a"])(t,[{key:"setBlank",value:function(){var t=this;this.value=void 0,this.box.getCells().filter((function(t){return void 0!==t.value})).forEach((function(t){return t.weights=t.weights-1})),this.table.getCells().filter((function(e){return e.x===t.x&&void 0!==e.value})).forEach((function(t){return t.weights=t.weights-1})),this.table.getCells().filter((function(e){return e.y===t.y&&void 0!==e.value})).forEach((function(t){return t.weights=t.weights-1})),this.needFill=!0}}],[{key:"filterCellsByBoxPosition",value:function(t,e,n){if(t<0||t>2)throw new Error("x不在范围内");if(e<0||e>2)throw new Error("x不在范围内");var l=[];return 0===t?l=n.filter((function(t){return t.x>=0&&t.x<3})):1===t?l=n.filter((function(t){return t.x>2&&t.x<6})):2===t&&(l=n.filter((function(t){return t.x>5&&t.x<=9}))),0===e?l=l.filter((function(t){return t.y>=0&&t.y<3})):1===e?l=l.filter((function(t){return t.y>2&&t.y<6})):2===e&&(l=l.filter((function(t){return t.y>5&&t.y<=9}))),l}}]),t}(),st=at,ut=function(){function t(e,n){Object(it["a"])(this,t),this.x=e,this.y=n,this.cells=[],this.weights=100}return Object(ot["a"])(t,[{key:"addCell",value:function(t){this.cells.push(t)}},{key:"setCells",value:function(t){var e=this;t.forEach((function(t){t.box=e})),this.cells=t}},{key:"getCells",value:function(){return this.cells}}]),t}(),ct=ut,ft=function(){function t(){Object(it["a"])(this,t),this.boxs=[]}return Object(ot["a"])(t,[{key:"addBox",value:function(t){this.boxs.push(t)}},{key:"getBoxs",value:function(){return this.boxs}},{key:"getCells",value:function(){var t=this;if(void 0!==this.cells)return this.cells;var e=[];return this.boxs.forEach((function(t){e=e.concat(t.getCells())})),this.cells=e,this.positionMap={},this.cells.forEach((function(e){t.positionMap[String(e.x)+String(e.y)]=e})),e}},{key:"findCellByPosition",value:function(t){return this.positionMap[t]}},{key:"getMaxWeightsCell",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=this.getCells().filter((function(t){return void 0!==t.value}));if(e.sort((function(t,e){return t.weights>e.weights?-1:1})),0==t)return e[0];t>e.length-1&&(t=e.length-1);var n=rt.a.random(0,t,!1);return e[n]}},{key:"getRowCells",value:function(t){return this.getCells().filter((function(e){return e.x===t}))}},{key:"getColumnCells",value:function(t){return this.getCells().filter((function(e){return e.y===t}))}},{key:"verify",value:function(t){var e,n=t.box,l=n.getCells().filter((function(e){return e.x!==t.x||e.y!==t.y})),r=Object(nt["a"])(l);try{for(r.s();!(e=r.n()).done;){var i=e.value;if(i.value===t.value)return!1}}catch(v){r.e(v)}finally{r.f()}var o,a=this.getRowCells(t.x).filter((function(e){return e.x!==t.x||e.y!==t.y})),s=Object(nt["a"])(a);try{for(s.s();!(o=s.n()).done;){var u=o.value;if(u.value===t.value)return!1}}catch(v){s.e(v)}finally{s.f()}var c,f=this.getColumnCells(t.y).filter((function(e){return e.x!==t.x||e.y!==t.y})),d=Object(nt["a"])(f);try{for(d.s();!(c=d.n()).done;){var h=c.value;if(h.value===t.value)return!1}}catch(v){d.e(v)}finally{d.f()}return!0}},{key:"verifyPass",value:function(){var t,e=this.getCells(),n=Object(nt["a"])(e);try{for(n.s();!(t=n.n()).done;){var l=t.value;if(void 0===l.value)return!1;if(!1===this.verify(l))return!1}}catch(r){n.e(r)}finally{n.f()}return!0}}]),t}(),dt=ft,ht=[[1,2,3,4,5,6,7,8,9],[4,5,6,7,8,9,1,2,3],[7,8,9,1,2,3,4,5,6],[8,9,1,2,3,4,5,6,7],[2,3,4,5,6,7,8,9,1],[5,6,7,8,9,1,2,3,4],[6,7,8,9,1,2,3,4,5],[9,1,2,3,4,5,6,7,8],[3,4,5,6,7,8,9,1,2]],vt=function(){for(var t=rt.a.cloneDeep(ht),e=[[0,1,2],[3,4,5],[6,7,8]],n=[[0,1,2],[3,4,5],[6,7,8]],l=[],r=0;r<3;r++){var i=e[r],o=rt.a.random(0,2,!1);rt.a.pullAt(i,o),l.push(o);var a=[t[i[1]],t[i[0]]];t[i[0]]=a[0],t[i[1]]=a[1]}for(var s=0;s<3;s++){var u=n[s],c=rt.a.random(0,2,!1);l.push(c),rt.a.pullAt(u,c);var f,d=Object(nt["a"])(t);try{for(d.s();!(f=d.n()).done;){var h=f.value,v=[h[u[1]],h[u[0]]];h[u[0]]=v[0],h[u[1]]=v[1]}}catch(w){d.e(w)}finally{d.f()}}for(var p=new dt,g=0;g<3;g++)for(var b=0;b<3;b++)p.addBox(new ct(g,b));for(var m=[],y=function(e){m=m.concat(t[e].map((function(t,n){return new st(t,e,n,void 0,p)})))},x=0;x<t.length;x++)y(x);return p.getBoxs().forEach((function(t){var e=st.filterCellsByBoxPosition(t.x,t.y,m);t.setCells(e)})),{table:p,codeArr:l}},pt=function(t){var e=t.data.cells,n=new dt;n.code=t.code,n.remoteTable=t;for(var l=0;l<3;l++)for(var r=0;r<3;r++)n.addBox(new ct(l,r));var i=e.map((function(t){return new st(t.value,t.x,t.y,void 0,n,t.needFill)}));return n.getBoxs().forEach((function(t){var e=st.filterCellsByBoxPosition(t.x,t.y,i);t.setCells(e)})),n},gt=function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:49,e=vt(),n=e.table,l=e.codeArr,r=0;r<t;r++){var i=n.getMaxWeightsCell(5);l.push(String(i.x)+String(i.y)),i.setBlank()}var o=l.join("");return y(o,n),{data:n,code:o}},bt=function(){function t(e){Object(it["a"])(this,t),this.name=e}return Object(ot["a"])(t,[{key:"joinChartRoom",value:function(t){this.msgList=t,this.sendMsg("欢迎[".concat(this.name,"]光临"))}},{key:"sendMsg",value:function(t){this.msgList.push(t),k(this.name,t)}}]),t}(),mt=bt,yt={name:"App",components:{Table:L,ButtonGroup:V,ChartRoom:Q,Dialog:et},data:function(){return{table:{},fillSum:49,gameTime:0,timeId:void 0,user:void 0}},methods:{restart:function(){var t=this;console.log("重开了"),this.fillSum<10||this.fillSum>80?alert("你别玩了"):/^\d+$/.test(this.fillSum)?(this.gameTime=0,this.table=gt(this.fillSum),this.$once("startGame",(function(){t.timeId=setInterval((function(){t.gameTime++}),1e3)}))):alert("输个阳间数")},submitName:function(t){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function n(){var l;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(l=t.target.value,l){n.next=3;break}return n.abrupt("return");case 3:e.$refs.dialog.dialogVisible=!1,e.user=new mt(l),e.user.joinChartRoom(e.$refs.chartRoom.msgList),e.$refs.chartRoom.startListen();case 7:case"end":return n.stop()}}),n)})))()},initTable:function(){var t=this;x().then((function(e){t.table=pt(e.data[0]),C(t.table,(function(e){t.table=pt(e)}))}))}},mounted:function(){var t=this;this.$once("startGame",(function(){t.timeId=setInterval((function(){t.gameTime++}),1e3)})),this.initTable()}},xt=yt,wt=(n("034f"),n("539a"),Object(_["a"])(xt,o,a,!1,null,"490b23d7",null)),kt=wt.exports;i["default"].use(r.a),i["default"].config.productionTip=!1,new i["default"]({render:function(t){return t(kt)},data:{curIndex:"1"}}).$mount("#app")},"5f82":function(t,e,n){"use strict";n("3e06")},"6a82":function(t,e,n){},"85ec":function(t,e,n){},"8f6f":function(t,e,n){},ca81:function(t,e,n){"use strict";n("8f6f")},d60f:function(t,e,n){}});