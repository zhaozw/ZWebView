/*
 ZWeb.js v0.0.1
 (c) 2017 Zyao89
 Released under the MIT License.
*/
(function(c,h){if("undefined"===typeof c)throw"not find window...";"undefined"===typeof c.__ZWeb__&&(h=h(c,"ZWeb"),c.__ZWeb__=new h)})(window,function(c,h){var f={UUID:void 0,Promise:void 0};(function(b){function a(){this.id=this.createUUID()}a.prototype.valueOf=function(){return this.id};a.prototype.toString=function(){return this.id};a.prototype.createUUID=function(){var b=new Date(1582,10,15,0,0,0,0),c=(new Date).getTime()-b.getTime(),b=a.getIntegerBits(c,0,31),k=a.getIntegerBits(c,32,47),c=a.getIntegerBits(c,
48,59)+"1",n=a.getIntegerBits(a.rand(4095),0,7),f=a.getIntegerBits(a.rand(4095),0,7),e=a.getIntegerBits(a.rand(8191),0,7)+a.getIntegerBits(a.rand(8191),8,15)+a.getIntegerBits(a.rand(8191),0,7)+a.getIntegerBits(a.rand(8191),8,15)+a.getIntegerBits(a.rand(8191),0,15);return b+"-"+k+"-"+c+"-"+n+f+"-"+e};a.getIntegerBits=function(b,c,k){b=a.returnBase(b,16);var d=[],g="",e;for(e=0;e<b.length;e++)d.push(b.substring(e,e+1));for(e=Math.floor(c/4);e<=Math.floor(k/4);e++)g=d[e]&&""!=d[e]?g+d[e]:g+"0";return g};
a.returnBase=function(a,b){var c="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");if(a<b)b=c[a];else{var d=""+Math.floor(a/b);a-=d*b;b=d>=b?this.returnBase(d,b)+c[a]:c[d]+c[a]}return b};a.rand=function(a){return Math.floor(Math.random()*a)};b.UUID=a})(f);(function(b){var a=function(){this.callbacks=[]};a.prototype={construct:a,resolve:function(a){this.complete("resolve",a)},reject:function(a){this.complete("reject",a)},complete:function(a,b){for(;this.callbacks[0];){var c=this.callbacks.shift()[a];
c&&c(b)}},then:function(a,b){this.callbacks.push({resolve:a,reject:b});return this}};b.Promise=a})(f);var l=function(b,a){this.mapRequireQueue={};this.mapMessageQueue={};this.mapDatabaseQueue={};this.szFrameworkUUID=b;this.OS=a.OS;this.Version=a.Version;this.InternalName=a.InternalName;this.ExposedName=a.ExposedName;this.__onFuncCallBackMap__={};this.print("Info",JSON.stringify(a))};l.prototype={createUUID:function(){return(new f.UUID).id},saveData:function(b,a){b={Sequence:this.createUUID(),Data:{Key:b,
Value:a}};a=new f.Promise;this.mapDatabaseQueue[b.Sequence]=a;this.callInterOS("saveData",b);return a},loadData:function(b){b={Sequence:this.createUUID(),Data:b};var a=new f.Promise;this.mapDatabaseQueue[b.Sequence]=a;this.callInterOS("loadData",b);return a},databaseCallback:function(b){var a=b.Sequence,c=this.mapDatabaseQueue[a];"undefined"!==typeof c&&(delete this.mapDatabaseQueue[a],"success"===b.Result?c.resolve(b.Data):c.reject(b.Data))},showLoading:function(){this.callInterOS("showLoading")},
hideLoading:function(){this.callInterOS("hideLoading")},tip:function(b){this.callInterOS("tip",b)},require:function(b,a,c,g){b={Sequence:this.createUUID(),Url:b,Method:a,Data:c,Type:g||"json"};a=new f.Promise;this.mapRequireQueue[b.Sequence]=a;this.callInterOS("onRequire",b);return a},requireCallback:function(b){var a=b.Sequence,c=this.mapRequireQueue[a];"undefined"!==typeof c&&(delete this.mapRequireQueue[a],"success"===b.Result?c.resolve(b.Data):c.reject(b.Data))},message:function(b,a){b={Sequence:this.createUUID(),
Cmd:b,Data:a};a=new f.Promise;this.mapMessageQueue[b.Sequence]=a;this.callInterOS("onMessage",b);return a},messageCallback:function(b){var a=b.Sequence,c=this.mapMessageQueue[a];"undefined"!==typeof c&&(delete this.mapMessageQueue[a],"success"===b.Result?c.resolve(b.Data):c.reject(b.Data))},destroy:function(){this.callInterOS("onDestroy")},callInterOS:function(b,a){this.callOS(b,a,this.InternalName)},callOS:function(b,a,d){"undefined"===typeof d&&(d=this.ExposedName);switch(this.OS){case "ANDROID":if(c[d]&&
c[d][b])if("undefined"===typeof a)c[d][b](this.szFrameworkUUID);else if("object"===typeof a)c[d][b](this.szFrameworkUUID,JSON.stringify(a));else c[d][b](this.szFrameworkUUID,a);else this.print(b+" : "+this.szFrameworkUUID+"\uff1a Android \u63a5\u53e3\u8c03\u7528\u5f02\u5e38...");break;case "IOS":c.webkit&&c.webkit.messageHandlers&&c.webkit.messageHandlers[d]?(b={Method:b,FrameworkID:this.szFrameworkUUID,Data:JSON.stringify(a)},"undefined"===typeof a&&delete b.Data,c.webkit.messageHandlers[d].postMessage(b)):
this.print(b+" : "+this.szFrameworkUUID+"\uff1a IOS \u63a5\u53e3\u8c03\u7528\u5f02\u5e38...");break;case "WEB":this.print(b+" : "+this.szFrameworkUUID+"\uff1a Web \u63a5\u53e3\u8c03\u7528...");break;default:this.print("init callOS error, \u56de\u8c03\u5931\u8d25\u3002")}},exceptionOS:function(b,a){switch(this.OS){case "ANDROID":if(c[this.InternalName]&&c[this.InternalName].onException)if("undefined"===typeof a)c[this.InternalName].onException(this.szFrameworkUUID,b,"");else if("object"===typeof oData)c[this.InternalName].onException(this.szFrameworkUUID,
b,JSON.stringify(a));else c[this.InternalName].onException(this.szFrameworkUUID,b,a);else this.print("onException : "+this.szFrameworkUUID+"\uff1a Android \u63a5\u53e3\u8c03\u7528\u5f02\u5e38...");break;case "IOS":c.webkit&&c.webkit.messageHandlers&&c.webkit.messageHandlers[this.InternalName]?(b={Method:"onException",FrameworkID:this.szFrameworkUUID,ErrorCode:b,Data:JSON.stringify(a)},c.webkit.messageHandlers[this.InternalName].postMessage(b)):this.print("onException : "+this.szFrameworkUUID+"\uff1a IOS \u63a5\u53e3\u8c03\u7528\u5f02\u5e38...");
break;case "WEB":this.print("onException : "+this.szFrameworkUUID+"\uff1a Web \u63a5\u53e3\u8c03\u7528...");break;default:this.print("init callOS error, \u56de\u8c03\u5931\u8d25\u3002")}},print:function(){var b="Debug",a=arguments[0];2===arguments.length&&(b=arguments[0],a=arguments[1]);b={Type:b,Msg:a};console.info(b);switch(this.OS){case "ANDROID":if(c[this.InternalName]&&c[this.InternalName].onLog)c[this.InternalName].onLog(this.szFrameworkUUID,JSON.stringify(b));else console.error("onLog : "+
this.szFrameworkUUID+"\uff1a Android \u63a5\u53e3\u8c03\u7528\u5f02\u5e38...");break;case "IOS":c.webkit&&c.webkit.messageHandlers&&c.webkit.messageHandlers[this.InternalName]?(a={Method:"onLog",FrameworkID:this.szFrameworkUUID,Data:JSON.stringify(b)},c.webkit.messageHandlers[this.InternalName].postMessage(a)):console.error("onException : "+this.szFrameworkUUID+"\uff1a IOS \u63a5\u53e3\u8c03\u7528\u5f02\u5e38...");break;case "WEB":console.error("onLog : "+this.szFrameworkUUID+"\uff1a Web \u63a5\u53e3\u8c03\u7528...");
break;default:console.error("Call print error...")}},on:function(b,a){this.__onFuncCallBackMap__[b]=a},dispatchCall:function(b,a){(b=this.__onFuncCallBackMap__[b])&&"function"===typeof b&&b(a)}};var m=function(){this.szFrameworkUUID=0;this.OS="WEB";this.ZWebSDK=this.ExposedName=this.InternalName=this.Version=void 0};m.prototype={initFramework:function(b,a){this.szFrameworkUUID=b;this.OS=a.OS;this.Version=a.Version;this.InternalName=a.InternalName;this.ExposedName=a.ExposedName;c[h+"SDK"]=this.ZWebSDK=
new l(b,a);this.ZWebSDK.callInterOS("onCreated",function(){var a=0,b=0;c.innerWidth?a=c.innerWidth:document.body&&document.body.clientWidth&&(a=document.body.clientWidth);c.innerHeight?b=c.innerHeight:document.body&&document.body.clientHeight&&(b=document.body.clientHeight);document.documentElement&&document.documentElement.clientHeight&&document.documentElement.clientWidth&&(b=document.documentElement.clientHeight,a=document.documentElement.clientWidth);return{Width:a,Height:b}}())},requireCallback:function(b,
a){this.ZWebSDK.requireCallback(a)},messageCallback:function(b,a){this.ZWebSDK.messageCallback(a)},databaseCallback:function(b,a){this.ZWebSDK.databaseCallback(a)},callReceiver:function(b,a,c){this.ZWebSDK.dispatchCall(a,c)},goBack:function(b){this.ZWebSDK.print("goBack \u88ab\u8c03\u7528\u4e86...");c.history.go(-1)},goForward:function(b){this.ZWebSDK.print("goForward \u88ab\u8c03\u7528\u4e86...");c.history.go(1)},refresh:function(b){this.ZWebSDK.print("refresh \u88ab\u8c03\u7528\u4e86...");c.location.reload()}};
return m});