(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();function mM(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var Cv={exports:{}},eu={},Rv={exports:{}},Ve={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ua=Symbol.for("react.element"),gM=Symbol.for("react.portal"),xM=Symbol.for("react.fragment"),vM=Symbol.for("react.strict_mode"),yM=Symbol.for("react.profiler"),_M=Symbol.for("react.provider"),SM=Symbol.for("react.context"),MM=Symbol.for("react.forward_ref"),EM=Symbol.for("react.suspense"),TM=Symbol.for("react.memo"),wM=Symbol.for("react.lazy"),t0=Symbol.iterator;function AM(t){return t===null||typeof t!="object"?null:(t=t0&&t[t0]||t["@@iterator"],typeof t=="function"?t:null)}var Pv={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Dv=Object.assign,Lv={};function _o(t,e,n){this.props=t,this.context=e,this.refs=Lv,this.updater=n||Pv}_o.prototype.isReactComponent={};_o.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};_o.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function Iv(){}Iv.prototype=_o.prototype;function ap(t,e,n){this.props=t,this.context=e,this.refs=Lv,this.updater=n||Pv}var lp=ap.prototype=new Iv;lp.constructor=ap;Dv(lp,_o.prototype);lp.isPureReactComponent=!0;var n0=Array.isArray,Nv=Object.prototype.hasOwnProperty,cp={current:null},Uv={key:!0,ref:!0,__self:!0,__source:!0};function Fv(t,e,n){var i,r={},s=null,o=null;if(e!=null)for(i in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(s=""+e.key),e)Nv.call(e,i)&&!Uv.hasOwnProperty(i)&&(r[i]=e[i]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var l=Array(a),c=0;c<a;c++)l[c]=arguments[c+2];r.children=l}if(t&&t.defaultProps)for(i in a=t.defaultProps,a)r[i]===void 0&&(r[i]=a[i]);return{$$typeof:Ua,type:t,key:s,ref:o,props:r,_owner:cp.current}}function bM(t,e){return{$$typeof:Ua,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function up(t){return typeof t=="object"&&t!==null&&t.$$typeof===Ua}function CM(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var i0=/\/+/g;function Cu(t,e){return typeof t=="object"&&t!==null&&t.key!=null?CM(""+t.key):e.toString(36)}function zl(t,e,n,i,r){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(s){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case Ua:case gM:o=!0}}if(o)return o=t,r=r(o),t=i===""?"."+Cu(o,0):i,n0(r)?(n="",t!=null&&(n=t.replace(i0,"$&/")+"/"),zl(r,e,n,"",function(c){return c})):r!=null&&(up(r)&&(r=bM(r,n+(!r.key||o&&o.key===r.key?"":(""+r.key).replace(i0,"$&/")+"/")+t)),e.push(r)),1;if(o=0,i=i===""?".":i+":",n0(t))for(var a=0;a<t.length;a++){s=t[a];var l=i+Cu(s,a);o+=zl(s,e,n,l,r)}else if(l=AM(t),typeof l=="function")for(t=l.call(t),a=0;!(s=t.next()).done;)s=s.value,l=i+Cu(s,a++),o+=zl(s,e,n,l,r);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function Ka(t,e,n){if(t==null)return t;var i=[],r=0;return zl(t,i,"","",function(s){return e.call(n,s,r++)}),i}function RM(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var hn={current:null},Gl={transition:null},PM={ReactCurrentDispatcher:hn,ReactCurrentBatchConfig:Gl,ReactCurrentOwner:cp};function kv(){throw Error("act(...) is not supported in production builds of React.")}Ve.Children={map:Ka,forEach:function(t,e,n){Ka(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return Ka(t,function(){e++}),e},toArray:function(t){return Ka(t,function(e){return e})||[]},only:function(t){if(!up(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};Ve.Component=_o;Ve.Fragment=xM;Ve.Profiler=yM;Ve.PureComponent=ap;Ve.StrictMode=vM;Ve.Suspense=EM;Ve.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=PM;Ve.act=kv;Ve.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var i=Dv({},t.props),r=t.key,s=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,o=cp.current),e.key!==void 0&&(r=""+e.key),t.type&&t.type.defaultProps)var a=t.type.defaultProps;for(l in e)Nv.call(e,l)&&!Uv.hasOwnProperty(l)&&(i[l]=e[l]===void 0&&a!==void 0?a[l]:e[l])}var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){a=Array(l);for(var c=0;c<l;c++)a[c]=arguments[c+2];i.children=a}return{$$typeof:Ua,type:t.type,key:r,ref:s,props:i,_owner:o}};Ve.createContext=function(t){return t={$$typeof:SM,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:_M,_context:t},t.Consumer=t};Ve.createElement=Fv;Ve.createFactory=function(t){var e=Fv.bind(null,t);return e.type=t,e};Ve.createRef=function(){return{current:null}};Ve.forwardRef=function(t){return{$$typeof:MM,render:t}};Ve.isValidElement=up;Ve.lazy=function(t){return{$$typeof:wM,_payload:{_status:-1,_result:t},_init:RM}};Ve.memo=function(t,e){return{$$typeof:TM,type:t,compare:e===void 0?null:e}};Ve.startTransition=function(t){var e=Gl.transition;Gl.transition={};try{t()}finally{Gl.transition=e}};Ve.unstable_act=kv;Ve.useCallback=function(t,e){return hn.current.useCallback(t,e)};Ve.useContext=function(t){return hn.current.useContext(t)};Ve.useDebugValue=function(){};Ve.useDeferredValue=function(t){return hn.current.useDeferredValue(t)};Ve.useEffect=function(t,e){return hn.current.useEffect(t,e)};Ve.useId=function(){return hn.current.useId()};Ve.useImperativeHandle=function(t,e,n){return hn.current.useImperativeHandle(t,e,n)};Ve.useInsertionEffect=function(t,e){return hn.current.useInsertionEffect(t,e)};Ve.useLayoutEffect=function(t,e){return hn.current.useLayoutEffect(t,e)};Ve.useMemo=function(t,e){return hn.current.useMemo(t,e)};Ve.useReducer=function(t,e,n){return hn.current.useReducer(t,e,n)};Ve.useRef=function(t){return hn.current.useRef(t)};Ve.useState=function(t){return hn.current.useState(t)};Ve.useSyncExternalStore=function(t,e,n){return hn.current.useSyncExternalStore(t,e,n)};Ve.useTransition=function(){return hn.current.useTransition()};Ve.version="18.3.1";Rv.exports=Ve;var Se=Rv.exports;const DM=mM(Se);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var LM=Se,IM=Symbol.for("react.element"),NM=Symbol.for("react.fragment"),UM=Object.prototype.hasOwnProperty,FM=LM.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,kM={key:!0,ref:!0,__self:!0,__source:!0};function Ov(t,e,n){var i,r={},s=null,o=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(o=e.ref);for(i in e)UM.call(e,i)&&!kM.hasOwnProperty(i)&&(r[i]=e[i]);if(t&&t.defaultProps)for(i in e=t.defaultProps,e)r[i]===void 0&&(r[i]=e[i]);return{$$typeof:IM,type:t,key:s,ref:o,props:r,_owner:FM.current}}eu.Fragment=NM;eu.jsx=Ov;eu.jsxs=Ov;Cv.exports=eu;var v=Cv.exports,Qf={},Bv={exports:{}},Dn={},Vv={exports:{}},zv={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(L,W){var Z=L.length;L.push(W);e:for(;0<Z;){var ne=Z-1>>>1,oe=L[ne];if(0<r(oe,W))L[ne]=W,L[Z]=oe,Z=ne;else break e}}function n(L){return L.length===0?null:L[0]}function i(L){if(L.length===0)return null;var W=L[0],Z=L.pop();if(Z!==W){L[0]=Z;e:for(var ne=0,oe=L.length,ze=oe>>>1;ne<ze;){var Je=2*(ne+1)-1,He=L[Je],K=Je+1,ae=L[K];if(0>r(He,Z))K<oe&&0>r(ae,He)?(L[ne]=ae,L[K]=Z,ne=K):(L[ne]=He,L[Je]=Z,ne=Je);else if(K<oe&&0>r(ae,Z))L[ne]=ae,L[K]=Z,ne=K;else break e}}return W}function r(L,W){var Z=L.sortIndex-W.sortIndex;return Z!==0?Z:L.id-W.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var o=Date,a=o.now();t.unstable_now=function(){return o.now()-a}}var l=[],c=[],u=1,d=null,f=3,p=!1,m=!1,E=!1,g=typeof setTimeout=="function"?setTimeout:null,h=typeof clearTimeout=="function"?clearTimeout:null,x=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function S(L){for(var W=n(c);W!==null;){if(W.callback===null)i(c);else if(W.startTime<=L)i(c),W.sortIndex=W.expirationTime,e(l,W);else break;W=n(c)}}function _(L){if(E=!1,S(L),!m)if(n(l)!==null)m=!0,q(w);else{var W=n(c);W!==null&&z(_,W.startTime-L)}}function w(L,W){m=!1,E&&(E=!1,h(y),y=-1),p=!0;var Z=f;try{for(S(W),d=n(l);d!==null&&(!(d.expirationTime>W)||L&&!D());){var ne=d.callback;if(typeof ne=="function"){d.callback=null,f=d.priorityLevel;var oe=ne(d.expirationTime<=W);W=t.unstable_now(),typeof oe=="function"?d.callback=oe:d===n(l)&&i(l),S(W)}else i(l);d=n(l)}if(d!==null)var ze=!0;else{var Je=n(c);Je!==null&&z(_,Je.startTime-W),ze=!1}return ze}finally{d=null,f=Z,p=!1}}var b=!1,A=null,y=-1,C=5,P=-1;function D(){return!(t.unstable_now()-P<C)}function F(){if(A!==null){var L=t.unstable_now();P=L;var W=!0;try{W=A(!0,L)}finally{W?X():(b=!1,A=null)}}else b=!1}var X;if(typeof x=="function")X=function(){x(F)};else if(typeof MessageChannel<"u"){var ee=new MessageChannel,O=ee.port2;ee.port1.onmessage=F,X=function(){O.postMessage(null)}}else X=function(){g(F,0)};function q(L){A=L,b||(b=!0,X())}function z(L,W){y=g(function(){L(t.unstable_now())},W)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(L){L.callback=null},t.unstable_continueExecution=function(){m||p||(m=!0,q(w))},t.unstable_forceFrameRate=function(L){0>L||125<L?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):C=0<L?Math.floor(1e3/L):5},t.unstable_getCurrentPriorityLevel=function(){return f},t.unstable_getFirstCallbackNode=function(){return n(l)},t.unstable_next=function(L){switch(f){case 1:case 2:case 3:var W=3;break;default:W=f}var Z=f;f=W;try{return L()}finally{f=Z}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(L,W){switch(L){case 1:case 2:case 3:case 4:case 5:break;default:L=3}var Z=f;f=L;try{return W()}finally{f=Z}},t.unstable_scheduleCallback=function(L,W,Z){var ne=t.unstable_now();switch(typeof Z=="object"&&Z!==null?(Z=Z.delay,Z=typeof Z=="number"&&0<Z?ne+Z:ne):Z=ne,L){case 1:var oe=-1;break;case 2:oe=250;break;case 5:oe=1073741823;break;case 4:oe=1e4;break;default:oe=5e3}return oe=Z+oe,L={id:u++,callback:W,priorityLevel:L,startTime:Z,expirationTime:oe,sortIndex:-1},Z>ne?(L.sortIndex=Z,e(c,L),n(l)===null&&L===n(c)&&(E?(h(y),y=-1):E=!0,z(_,Z-ne))):(L.sortIndex=oe,e(l,L),m||p||(m=!0,q(w))),L},t.unstable_shouldYield=D,t.unstable_wrapCallback=function(L){var W=f;return function(){var Z=f;f=W;try{return L.apply(this,arguments)}finally{f=Z}}}})(zv);Vv.exports=zv;var OM=Vv.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var BM=Se,Pn=OM;function ie(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Gv=new Set,da={};function ms(t,e){oo(t,e),oo(t+"Capture",e)}function oo(t,e){for(da[t]=e,t=0;t<e.length;t++)Gv.add(e[t])}var Yi=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Jf=Object.prototype.hasOwnProperty,VM=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,r0={},s0={};function zM(t){return Jf.call(s0,t)?!0:Jf.call(r0,t)?!1:VM.test(t)?s0[t]=!0:(r0[t]=!0,!1)}function GM(t,e,n,i){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return i?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function HM(t,e,n,i){if(e===null||typeof e>"u"||GM(t,e,n,i))return!0;if(i)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function pn(t,e,n,i,r,s,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=o}var Kt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){Kt[t]=new pn(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];Kt[e]=new pn(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){Kt[t]=new pn(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){Kt[t]=new pn(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){Kt[t]=new pn(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){Kt[t]=new pn(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){Kt[t]=new pn(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){Kt[t]=new pn(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){Kt[t]=new pn(t,5,!1,t.toLowerCase(),null,!1,!1)});var fp=/[\-:]([a-z])/g;function dp(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(fp,dp);Kt[e]=new pn(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(fp,dp);Kt[e]=new pn(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(fp,dp);Kt[e]=new pn(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){Kt[t]=new pn(t,1,!1,t.toLowerCase(),null,!1,!1)});Kt.xlinkHref=new pn("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){Kt[t]=new pn(t,1,!1,t.toLowerCase(),null,!0,!0)});function hp(t,e,n,i){var r=Kt.hasOwnProperty(e)?Kt[e]:null;(r!==null?r.type!==0:i||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(HM(e,n,r,i)&&(n=null),i||r===null?zM(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):r.mustUseProperty?t[r.propertyName]=n===null?r.type===3?!1:"":n:(e=r.attributeName,i=r.attributeNamespace,n===null?t.removeAttribute(e):(r=r.type,n=r===3||r===4&&n===!0?"":""+n,i?t.setAttributeNS(i,e,n):t.setAttribute(e,n))))}var Ji=BM.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Za=Symbol.for("react.element"),Fs=Symbol.for("react.portal"),ks=Symbol.for("react.fragment"),pp=Symbol.for("react.strict_mode"),ed=Symbol.for("react.profiler"),Hv=Symbol.for("react.provider"),Wv=Symbol.for("react.context"),mp=Symbol.for("react.forward_ref"),td=Symbol.for("react.suspense"),nd=Symbol.for("react.suspense_list"),gp=Symbol.for("react.memo"),fr=Symbol.for("react.lazy"),jv=Symbol.for("react.offscreen"),o0=Symbol.iterator;function Co(t){return t===null||typeof t!="object"?null:(t=o0&&t[o0]||t["@@iterator"],typeof t=="function"?t:null)}var xt=Object.assign,Ru;function jo(t){if(Ru===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Ru=e&&e[1]||""}return`
`+Ru+t}var Pu=!1;function Du(t,e){if(!t||Pu)return"";Pu=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var i=c}Reflect.construct(t,[],e)}else{try{e.call()}catch(c){i=c}t.call(e.prototype)}else{try{throw Error()}catch(c){i=c}t()}}catch(c){if(c&&i&&typeof c.stack=="string"){for(var r=c.stack.split(`
`),s=i.stack.split(`
`),o=r.length-1,a=s.length-1;1<=o&&0<=a&&r[o]!==s[a];)a--;for(;1<=o&&0<=a;o--,a--)if(r[o]!==s[a]){if(o!==1||a!==1)do if(o--,a--,0>a||r[o]!==s[a]){var l=`
`+r[o].replace(" at new "," at ");return t.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",t.displayName)),l}while(1<=o&&0<=a);break}}}finally{Pu=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?jo(t):""}function WM(t){switch(t.tag){case 5:return jo(t.type);case 16:return jo("Lazy");case 13:return jo("Suspense");case 19:return jo("SuspenseList");case 0:case 2:case 15:return t=Du(t.type,!1),t;case 11:return t=Du(t.type.render,!1),t;case 1:return t=Du(t.type,!0),t;default:return""}}function id(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case ks:return"Fragment";case Fs:return"Portal";case ed:return"Profiler";case pp:return"StrictMode";case td:return"Suspense";case nd:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case Wv:return(t.displayName||"Context")+".Consumer";case Hv:return(t._context.displayName||"Context")+".Provider";case mp:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case gp:return e=t.displayName||null,e!==null?e:id(t.type)||"Memo";case fr:e=t._payload,t=t._init;try{return id(t(e))}catch{}}return null}function jM(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return id(e);case 8:return e===pp?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function Cr(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Xv(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function XM(t){var e=Xv(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),i=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var r=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return r.call(this)},set:function(o){i=""+o,s.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return i},setValue:function(o){i=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function Qa(t){t._valueTracker||(t._valueTracker=XM(t))}function Yv(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),i="";return t&&(i=Xv(t)?t.checked?"true":"false":t.value),t=i,t!==n?(e.setValue(t),!0):!1}function dc(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function rd(t,e){var n=e.checked;return xt({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function a0(t,e){var n=e.defaultValue==null?"":e.defaultValue,i=e.checked!=null?e.checked:e.defaultChecked;n=Cr(e.value!=null?e.value:n),t._wrapperState={initialChecked:i,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function $v(t,e){e=e.checked,e!=null&&hp(t,"checked",e,!1)}function sd(t,e){$v(t,e);var n=Cr(e.value),i=e.type;if(n!=null)i==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(i==="submit"||i==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?od(t,e.type,n):e.hasOwnProperty("defaultValue")&&od(t,e.type,Cr(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function l0(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var i=e.type;if(!(i!=="submit"&&i!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function od(t,e,n){(e!=="number"||dc(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var Xo=Array.isArray;function Zs(t,e,n,i){if(t=t.options,e){e={};for(var r=0;r<n.length;r++)e["$"+n[r]]=!0;for(n=0;n<t.length;n++)r=e.hasOwnProperty("$"+t[n].value),t[n].selected!==r&&(t[n].selected=r),r&&i&&(t[n].defaultSelected=!0)}else{for(n=""+Cr(n),e=null,r=0;r<t.length;r++){if(t[r].value===n){t[r].selected=!0,i&&(t[r].defaultSelected=!0);return}e!==null||t[r].disabled||(e=t[r])}e!==null&&(e.selected=!0)}}function ad(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(ie(91));return xt({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function c0(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(ie(92));if(Xo(n)){if(1<n.length)throw Error(ie(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:Cr(n)}}function qv(t,e){var n=Cr(e.value),i=Cr(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),i!=null&&(t.defaultValue=""+i)}function u0(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function Kv(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function ld(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?Kv(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var Ja,Zv=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,i,r){MSApp.execUnsafeLocalFunction(function(){return t(e,n,i,r)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(Ja=Ja||document.createElement("div"),Ja.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=Ja.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function ha(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var Jo={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},YM=["Webkit","ms","Moz","O"];Object.keys(Jo).forEach(function(t){YM.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),Jo[e]=Jo[t]})});function Qv(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||Jo.hasOwnProperty(t)&&Jo[t]?(""+e).trim():e+"px"}function Jv(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var i=n.indexOf("--")===0,r=Qv(n,e[n],i);n==="float"&&(n="cssFloat"),i?t.setProperty(n,r):t[n]=r}}var $M=xt({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function cd(t,e){if(e){if($M[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(ie(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(ie(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(ie(61))}if(e.style!=null&&typeof e.style!="object")throw Error(ie(62))}}function ud(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var fd=null;function xp(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var dd=null,Qs=null,Js=null;function f0(t){if(t=Oa(t)){if(typeof dd!="function")throw Error(ie(280));var e=t.stateNode;e&&(e=su(e),dd(t.stateNode,t.type,e))}}function ey(t){Qs?Js?Js.push(t):Js=[t]:Qs=t}function ty(){if(Qs){var t=Qs,e=Js;if(Js=Qs=null,f0(t),e)for(t=0;t<e.length;t++)f0(e[t])}}function ny(t,e){return t(e)}function iy(){}var Lu=!1;function ry(t,e,n){if(Lu)return t(e,n);Lu=!0;try{return ny(t,e,n)}finally{Lu=!1,(Qs!==null||Js!==null)&&(iy(),ty())}}function pa(t,e){var n=t.stateNode;if(n===null)return null;var i=su(n);if(i===null)return null;n=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(t=t.type,i=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!i;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(ie(231,e,typeof n));return n}var hd=!1;if(Yi)try{var Ro={};Object.defineProperty(Ro,"passive",{get:function(){hd=!0}}),window.addEventListener("test",Ro,Ro),window.removeEventListener("test",Ro,Ro)}catch{hd=!1}function qM(t,e,n,i,r,s,o,a,l){var c=Array.prototype.slice.call(arguments,3);try{e.apply(n,c)}catch(u){this.onError(u)}}var ea=!1,hc=null,pc=!1,pd=null,KM={onError:function(t){ea=!0,hc=t}};function ZM(t,e,n,i,r,s,o,a,l){ea=!1,hc=null,qM.apply(KM,arguments)}function QM(t,e,n,i,r,s,o,a,l){if(ZM.apply(this,arguments),ea){if(ea){var c=hc;ea=!1,hc=null}else throw Error(ie(198));pc||(pc=!0,pd=c)}}function gs(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function sy(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function d0(t){if(gs(t)!==t)throw Error(ie(188))}function JM(t){var e=t.alternate;if(!e){if(e=gs(t),e===null)throw Error(ie(188));return e!==t?null:t}for(var n=t,i=e;;){var r=n.return;if(r===null)break;var s=r.alternate;if(s===null){if(i=r.return,i!==null){n=i;continue}break}if(r.child===s.child){for(s=r.child;s;){if(s===n)return d0(r),t;if(s===i)return d0(r),e;s=s.sibling}throw Error(ie(188))}if(n.return!==i.return)n=r,i=s;else{for(var o=!1,a=r.child;a;){if(a===n){o=!0,n=r,i=s;break}if(a===i){o=!0,i=r,n=s;break}a=a.sibling}if(!o){for(a=s.child;a;){if(a===n){o=!0,n=s,i=r;break}if(a===i){o=!0,i=s,n=r;break}a=a.sibling}if(!o)throw Error(ie(189))}}if(n.alternate!==i)throw Error(ie(190))}if(n.tag!==3)throw Error(ie(188));return n.stateNode.current===n?t:e}function oy(t){return t=JM(t),t!==null?ay(t):null}function ay(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=ay(t);if(e!==null)return e;t=t.sibling}return null}var ly=Pn.unstable_scheduleCallback,h0=Pn.unstable_cancelCallback,eE=Pn.unstable_shouldYield,tE=Pn.unstable_requestPaint,bt=Pn.unstable_now,nE=Pn.unstable_getCurrentPriorityLevel,vp=Pn.unstable_ImmediatePriority,cy=Pn.unstable_UserBlockingPriority,mc=Pn.unstable_NormalPriority,iE=Pn.unstable_LowPriority,uy=Pn.unstable_IdlePriority,tu=null,Mi=null;function rE(t){if(Mi&&typeof Mi.onCommitFiberRoot=="function")try{Mi.onCommitFiberRoot(tu,t,void 0,(t.current.flags&128)===128)}catch{}}var si=Math.clz32?Math.clz32:aE,sE=Math.log,oE=Math.LN2;function aE(t){return t>>>=0,t===0?32:31-(sE(t)/oE|0)|0}var el=64,tl=4194304;function Yo(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function gc(t,e){var n=t.pendingLanes;if(n===0)return 0;var i=0,r=t.suspendedLanes,s=t.pingedLanes,o=n&268435455;if(o!==0){var a=o&~r;a!==0?i=Yo(a):(s&=o,s!==0&&(i=Yo(s)))}else o=n&~r,o!==0?i=Yo(o):s!==0&&(i=Yo(s));if(i===0)return 0;if(e!==0&&e!==i&&!(e&r)&&(r=i&-i,s=e&-e,r>=s||r===16&&(s&4194240)!==0))return e;if(i&4&&(i|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=i;0<e;)n=31-si(e),r=1<<n,i|=t[n],e&=~r;return i}function lE(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function cE(t,e){for(var n=t.suspendedLanes,i=t.pingedLanes,r=t.expirationTimes,s=t.pendingLanes;0<s;){var o=31-si(s),a=1<<o,l=r[o];l===-1?(!(a&n)||a&i)&&(r[o]=lE(a,e)):l<=e&&(t.expiredLanes|=a),s&=~a}}function md(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function fy(){var t=el;return el<<=1,!(el&4194240)&&(el=64),t}function Iu(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Fa(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-si(e),t[e]=n}function uE(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var i=t.eventTimes;for(t=t.expirationTimes;0<n;){var r=31-si(n),s=1<<r;e[r]=0,i[r]=-1,t[r]=-1,n&=~s}}function yp(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var i=31-si(n),r=1<<i;r&e|t[i]&e&&(t[i]|=e),n&=~r}}var nt=0;function dy(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var hy,_p,py,my,gy,gd=!1,nl=[],_r=null,Sr=null,Mr=null,ma=new Map,ga=new Map,hr=[],fE="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function p0(t,e){switch(t){case"focusin":case"focusout":_r=null;break;case"dragenter":case"dragleave":Sr=null;break;case"mouseover":case"mouseout":Mr=null;break;case"pointerover":case"pointerout":ma.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":ga.delete(e.pointerId)}}function Po(t,e,n,i,r,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[r]},e!==null&&(e=Oa(e),e!==null&&_p(e)),t):(t.eventSystemFlags|=i,e=t.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),t)}function dE(t,e,n,i,r){switch(e){case"focusin":return _r=Po(_r,t,e,n,i,r),!0;case"dragenter":return Sr=Po(Sr,t,e,n,i,r),!0;case"mouseover":return Mr=Po(Mr,t,e,n,i,r),!0;case"pointerover":var s=r.pointerId;return ma.set(s,Po(ma.get(s)||null,t,e,n,i,r)),!0;case"gotpointercapture":return s=r.pointerId,ga.set(s,Po(ga.get(s)||null,t,e,n,i,r)),!0}return!1}function xy(t){var e=Kr(t.target);if(e!==null){var n=gs(e);if(n!==null){if(e=n.tag,e===13){if(e=sy(n),e!==null){t.blockedOn=e,gy(t.priority,function(){py(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Hl(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=xd(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var i=new n.constructor(n.type,n);fd=i,n.target.dispatchEvent(i),fd=null}else return e=Oa(n),e!==null&&_p(e),t.blockedOn=n,!1;e.shift()}return!0}function m0(t,e,n){Hl(t)&&n.delete(e)}function hE(){gd=!1,_r!==null&&Hl(_r)&&(_r=null),Sr!==null&&Hl(Sr)&&(Sr=null),Mr!==null&&Hl(Mr)&&(Mr=null),ma.forEach(m0),ga.forEach(m0)}function Do(t,e){t.blockedOn===e&&(t.blockedOn=null,gd||(gd=!0,Pn.unstable_scheduleCallback(Pn.unstable_NormalPriority,hE)))}function xa(t){function e(r){return Do(r,t)}if(0<nl.length){Do(nl[0],t);for(var n=1;n<nl.length;n++){var i=nl[n];i.blockedOn===t&&(i.blockedOn=null)}}for(_r!==null&&Do(_r,t),Sr!==null&&Do(Sr,t),Mr!==null&&Do(Mr,t),ma.forEach(e),ga.forEach(e),n=0;n<hr.length;n++)i=hr[n],i.blockedOn===t&&(i.blockedOn=null);for(;0<hr.length&&(n=hr[0],n.blockedOn===null);)xy(n),n.blockedOn===null&&hr.shift()}var eo=Ji.ReactCurrentBatchConfig,xc=!0;function pE(t,e,n,i){var r=nt,s=eo.transition;eo.transition=null;try{nt=1,Sp(t,e,n,i)}finally{nt=r,eo.transition=s}}function mE(t,e,n,i){var r=nt,s=eo.transition;eo.transition=null;try{nt=4,Sp(t,e,n,i)}finally{nt=r,eo.transition=s}}function Sp(t,e,n,i){if(xc){var r=xd(t,e,n,i);if(r===null)Hu(t,e,i,vc,n),p0(t,i);else if(dE(r,t,e,n,i))i.stopPropagation();else if(p0(t,i),e&4&&-1<fE.indexOf(t)){for(;r!==null;){var s=Oa(r);if(s!==null&&hy(s),s=xd(t,e,n,i),s===null&&Hu(t,e,i,vc,n),s===r)break;r=s}r!==null&&i.stopPropagation()}else Hu(t,e,i,null,n)}}var vc=null;function xd(t,e,n,i){if(vc=null,t=xp(i),t=Kr(t),t!==null)if(e=gs(t),e===null)t=null;else if(n=e.tag,n===13){if(t=sy(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return vc=t,null}function vy(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(nE()){case vp:return 1;case cy:return 4;case mc:case iE:return 16;case uy:return 536870912;default:return 16}default:return 16}}var gr=null,Mp=null,Wl=null;function yy(){if(Wl)return Wl;var t,e=Mp,n=e.length,i,r="value"in gr?gr.value:gr.textContent,s=r.length;for(t=0;t<n&&e[t]===r[t];t++);var o=n-t;for(i=1;i<=o&&e[n-i]===r[s-i];i++);return Wl=r.slice(t,1<i?1-i:void 0)}function jl(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function il(){return!0}function g0(){return!1}function Ln(t){function e(n,i,r,s,o){this._reactName=n,this._targetInst=r,this.type=i,this.nativeEvent=s,this.target=o,this.currentTarget=null;for(var a in t)t.hasOwnProperty(a)&&(n=t[a],this[a]=n?n(s):s[a]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?il:g0,this.isPropagationStopped=g0,this}return xt(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=il)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=il)},persist:function(){},isPersistent:il}),e}var So={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Ep=Ln(So),ka=xt({},So,{view:0,detail:0}),gE=Ln(ka),Nu,Uu,Lo,nu=xt({},ka,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Tp,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Lo&&(Lo&&t.type==="mousemove"?(Nu=t.screenX-Lo.screenX,Uu=t.screenY-Lo.screenY):Uu=Nu=0,Lo=t),Nu)},movementY:function(t){return"movementY"in t?t.movementY:Uu}}),x0=Ln(nu),xE=xt({},nu,{dataTransfer:0}),vE=Ln(xE),yE=xt({},ka,{relatedTarget:0}),Fu=Ln(yE),_E=xt({},So,{animationName:0,elapsedTime:0,pseudoElement:0}),SE=Ln(_E),ME=xt({},So,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),EE=Ln(ME),TE=xt({},So,{data:0}),v0=Ln(TE),wE={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},AE={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},bE={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function CE(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=bE[t])?!!e[t]:!1}function Tp(){return CE}var RE=xt({},ka,{key:function(t){if(t.key){var e=wE[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=jl(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?AE[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Tp,charCode:function(t){return t.type==="keypress"?jl(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?jl(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),PE=Ln(RE),DE=xt({},nu,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),y0=Ln(DE),LE=xt({},ka,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Tp}),IE=Ln(LE),NE=xt({},So,{propertyName:0,elapsedTime:0,pseudoElement:0}),UE=Ln(NE),FE=xt({},nu,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),kE=Ln(FE),OE=[9,13,27,32],wp=Yi&&"CompositionEvent"in window,ta=null;Yi&&"documentMode"in document&&(ta=document.documentMode);var BE=Yi&&"TextEvent"in window&&!ta,_y=Yi&&(!wp||ta&&8<ta&&11>=ta),_0=" ",S0=!1;function Sy(t,e){switch(t){case"keyup":return OE.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function My(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var Os=!1;function VE(t,e){switch(t){case"compositionend":return My(e);case"keypress":return e.which!==32?null:(S0=!0,_0);case"textInput":return t=e.data,t===_0&&S0?null:t;default:return null}}function zE(t,e){if(Os)return t==="compositionend"||!wp&&Sy(t,e)?(t=yy(),Wl=Mp=gr=null,Os=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return _y&&e.locale!=="ko"?null:e.data;default:return null}}var GE={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function M0(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!GE[t.type]:e==="textarea"}function Ey(t,e,n,i){ey(i),e=yc(e,"onChange"),0<e.length&&(n=new Ep("onChange","change",null,n,i),t.push({event:n,listeners:e}))}var na=null,va=null;function HE(t){Ny(t,0)}function iu(t){var e=zs(t);if(Yv(e))return t}function WE(t,e){if(t==="change")return e}var Ty=!1;if(Yi){var ku;if(Yi){var Ou="oninput"in document;if(!Ou){var E0=document.createElement("div");E0.setAttribute("oninput","return;"),Ou=typeof E0.oninput=="function"}ku=Ou}else ku=!1;Ty=ku&&(!document.documentMode||9<document.documentMode)}function T0(){na&&(na.detachEvent("onpropertychange",wy),va=na=null)}function wy(t){if(t.propertyName==="value"&&iu(va)){var e=[];Ey(e,va,t,xp(t)),ry(HE,e)}}function jE(t,e,n){t==="focusin"?(T0(),na=e,va=n,na.attachEvent("onpropertychange",wy)):t==="focusout"&&T0()}function XE(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return iu(va)}function YE(t,e){if(t==="click")return iu(e)}function $E(t,e){if(t==="input"||t==="change")return iu(e)}function qE(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var li=typeof Object.is=="function"?Object.is:qE;function ya(t,e){if(li(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),i=Object.keys(e);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var r=n[i];if(!Jf.call(e,r)||!li(t[r],e[r]))return!1}return!0}function w0(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function A0(t,e){var n=w0(t);t=0;for(var i;n;){if(n.nodeType===3){if(i=t+n.textContent.length,t<=e&&i>=e)return{node:n,offset:e-t};t=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=w0(n)}}function Ay(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?Ay(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function by(){for(var t=window,e=dc();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=dc(t.document)}return e}function Ap(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function KE(t){var e=by(),n=t.focusedElem,i=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&Ay(n.ownerDocument.documentElement,n)){if(i!==null&&Ap(n)){if(e=i.start,t=i.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var r=n.textContent.length,s=Math.min(i.start,r);i=i.end===void 0?s:Math.min(i.end,r),!t.extend&&s>i&&(r=i,i=s,s=r),r=A0(n,s);var o=A0(n,i);r&&o&&(t.rangeCount!==1||t.anchorNode!==r.node||t.anchorOffset!==r.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(r.node,r.offset),t.removeAllRanges(),s>i?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var ZE=Yi&&"documentMode"in document&&11>=document.documentMode,Bs=null,vd=null,ia=null,yd=!1;function b0(t,e,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;yd||Bs==null||Bs!==dc(i)||(i=Bs,"selectionStart"in i&&Ap(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),ia&&ya(ia,i)||(ia=i,i=yc(vd,"onSelect"),0<i.length&&(e=new Ep("onSelect","select",null,e,n),t.push({event:e,listeners:i}),e.target=Bs)))}function rl(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var Vs={animationend:rl("Animation","AnimationEnd"),animationiteration:rl("Animation","AnimationIteration"),animationstart:rl("Animation","AnimationStart"),transitionend:rl("Transition","TransitionEnd")},Bu={},Cy={};Yi&&(Cy=document.createElement("div").style,"AnimationEvent"in window||(delete Vs.animationend.animation,delete Vs.animationiteration.animation,delete Vs.animationstart.animation),"TransitionEvent"in window||delete Vs.transitionend.transition);function ru(t){if(Bu[t])return Bu[t];if(!Vs[t])return t;var e=Vs[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in Cy)return Bu[t]=e[n];return t}var Ry=ru("animationend"),Py=ru("animationiteration"),Dy=ru("animationstart"),Ly=ru("transitionend"),Iy=new Map,C0="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Ir(t,e){Iy.set(t,e),ms(e,[t])}for(var Vu=0;Vu<C0.length;Vu++){var zu=C0[Vu],QE=zu.toLowerCase(),JE=zu[0].toUpperCase()+zu.slice(1);Ir(QE,"on"+JE)}Ir(Ry,"onAnimationEnd");Ir(Py,"onAnimationIteration");Ir(Dy,"onAnimationStart");Ir("dblclick","onDoubleClick");Ir("focusin","onFocus");Ir("focusout","onBlur");Ir(Ly,"onTransitionEnd");oo("onMouseEnter",["mouseout","mouseover"]);oo("onMouseLeave",["mouseout","mouseover"]);oo("onPointerEnter",["pointerout","pointerover"]);oo("onPointerLeave",["pointerout","pointerover"]);ms("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));ms("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));ms("onBeforeInput",["compositionend","keypress","textInput","paste"]);ms("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));ms("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));ms("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var $o="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),eT=new Set("cancel close invalid load scroll toggle".split(" ").concat($o));function R0(t,e,n){var i=t.type||"unknown-event";t.currentTarget=n,QM(i,e,void 0,t),t.currentTarget=null}function Ny(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var i=t[n],r=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var o=i.length-1;0<=o;o--){var a=i[o],l=a.instance,c=a.currentTarget;if(a=a.listener,l!==s&&r.isPropagationStopped())break e;R0(r,a,c),s=l}else for(o=0;o<i.length;o++){if(a=i[o],l=a.instance,c=a.currentTarget,a=a.listener,l!==s&&r.isPropagationStopped())break e;R0(r,a,c),s=l}}}if(pc)throw t=pd,pc=!1,pd=null,t}function dt(t,e){var n=e[Td];n===void 0&&(n=e[Td]=new Set);var i=t+"__bubble";n.has(i)||(Uy(e,t,2,!1),n.add(i))}function Gu(t,e,n){var i=0;e&&(i|=4),Uy(n,t,i,e)}var sl="_reactListening"+Math.random().toString(36).slice(2);function _a(t){if(!t[sl]){t[sl]=!0,Gv.forEach(function(n){n!=="selectionchange"&&(eT.has(n)||Gu(n,!1,t),Gu(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[sl]||(e[sl]=!0,Gu("selectionchange",!1,e))}}function Uy(t,e,n,i){switch(vy(e)){case 1:var r=pE;break;case 4:r=mE;break;default:r=Sp}n=r.bind(null,e,n,t),r=void 0,!hd||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),i?r!==void 0?t.addEventListener(e,n,{capture:!0,passive:r}):t.addEventListener(e,n,!0):r!==void 0?t.addEventListener(e,n,{passive:r}):t.addEventListener(e,n,!1)}function Hu(t,e,n,i,r){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var o=i.tag;if(o===3||o===4){var a=i.stateNode.containerInfo;if(a===r||a.nodeType===8&&a.parentNode===r)break;if(o===4)for(o=i.return;o!==null;){var l=o.tag;if((l===3||l===4)&&(l=o.stateNode.containerInfo,l===r||l.nodeType===8&&l.parentNode===r))return;o=o.return}for(;a!==null;){if(o=Kr(a),o===null)return;if(l=o.tag,l===5||l===6){i=s=o;continue e}a=a.parentNode}}i=i.return}ry(function(){var c=s,u=xp(n),d=[];e:{var f=Iy.get(t);if(f!==void 0){var p=Ep,m=t;switch(t){case"keypress":if(jl(n)===0)break e;case"keydown":case"keyup":p=PE;break;case"focusin":m="focus",p=Fu;break;case"focusout":m="blur",p=Fu;break;case"beforeblur":case"afterblur":p=Fu;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=x0;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=vE;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=IE;break;case Ry:case Py:case Dy:p=SE;break;case Ly:p=UE;break;case"scroll":p=gE;break;case"wheel":p=kE;break;case"copy":case"cut":case"paste":p=EE;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=y0}var E=(e&4)!==0,g=!E&&t==="scroll",h=E?f!==null?f+"Capture":null:f;E=[];for(var x=c,S;x!==null;){S=x;var _=S.stateNode;if(S.tag===5&&_!==null&&(S=_,h!==null&&(_=pa(x,h),_!=null&&E.push(Sa(x,_,S)))),g)break;x=x.return}0<E.length&&(f=new p(f,m,null,n,u),d.push({event:f,listeners:E}))}}if(!(e&7)){e:{if(f=t==="mouseover"||t==="pointerover",p=t==="mouseout"||t==="pointerout",f&&n!==fd&&(m=n.relatedTarget||n.fromElement)&&(Kr(m)||m[$i]))break e;if((p||f)&&(f=u.window===u?u:(f=u.ownerDocument)?f.defaultView||f.parentWindow:window,p?(m=n.relatedTarget||n.toElement,p=c,m=m?Kr(m):null,m!==null&&(g=gs(m),m!==g||m.tag!==5&&m.tag!==6)&&(m=null)):(p=null,m=c),p!==m)){if(E=x0,_="onMouseLeave",h="onMouseEnter",x="mouse",(t==="pointerout"||t==="pointerover")&&(E=y0,_="onPointerLeave",h="onPointerEnter",x="pointer"),g=p==null?f:zs(p),S=m==null?f:zs(m),f=new E(_,x+"leave",p,n,u),f.target=g,f.relatedTarget=S,_=null,Kr(u)===c&&(E=new E(h,x+"enter",m,n,u),E.target=S,E.relatedTarget=g,_=E),g=_,p&&m)t:{for(E=p,h=m,x=0,S=E;S;S=_s(S))x++;for(S=0,_=h;_;_=_s(_))S++;for(;0<x-S;)E=_s(E),x--;for(;0<S-x;)h=_s(h),S--;for(;x--;){if(E===h||h!==null&&E===h.alternate)break t;E=_s(E),h=_s(h)}E=null}else E=null;p!==null&&P0(d,f,p,E,!1),m!==null&&g!==null&&P0(d,g,m,E,!0)}}e:{if(f=c?zs(c):window,p=f.nodeName&&f.nodeName.toLowerCase(),p==="select"||p==="input"&&f.type==="file")var w=WE;else if(M0(f))if(Ty)w=$E;else{w=XE;var b=jE}else(p=f.nodeName)&&p.toLowerCase()==="input"&&(f.type==="checkbox"||f.type==="radio")&&(w=YE);if(w&&(w=w(t,c))){Ey(d,w,n,u);break e}b&&b(t,f,c),t==="focusout"&&(b=f._wrapperState)&&b.controlled&&f.type==="number"&&od(f,"number",f.value)}switch(b=c?zs(c):window,t){case"focusin":(M0(b)||b.contentEditable==="true")&&(Bs=b,vd=c,ia=null);break;case"focusout":ia=vd=Bs=null;break;case"mousedown":yd=!0;break;case"contextmenu":case"mouseup":case"dragend":yd=!1,b0(d,n,u);break;case"selectionchange":if(ZE)break;case"keydown":case"keyup":b0(d,n,u)}var A;if(wp)e:{switch(t){case"compositionstart":var y="onCompositionStart";break e;case"compositionend":y="onCompositionEnd";break e;case"compositionupdate":y="onCompositionUpdate";break e}y=void 0}else Os?Sy(t,n)&&(y="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(y="onCompositionStart");y&&(_y&&n.locale!=="ko"&&(Os||y!=="onCompositionStart"?y==="onCompositionEnd"&&Os&&(A=yy()):(gr=u,Mp="value"in gr?gr.value:gr.textContent,Os=!0)),b=yc(c,y),0<b.length&&(y=new v0(y,t,null,n,u),d.push({event:y,listeners:b}),A?y.data=A:(A=My(n),A!==null&&(y.data=A)))),(A=BE?VE(t,n):zE(t,n))&&(c=yc(c,"onBeforeInput"),0<c.length&&(u=new v0("onBeforeInput","beforeinput",null,n,u),d.push({event:u,listeners:c}),u.data=A))}Ny(d,e)})}function Sa(t,e,n){return{instance:t,listener:e,currentTarget:n}}function yc(t,e){for(var n=e+"Capture",i=[];t!==null;){var r=t,s=r.stateNode;r.tag===5&&s!==null&&(r=s,s=pa(t,n),s!=null&&i.unshift(Sa(t,s,r)),s=pa(t,e),s!=null&&i.push(Sa(t,s,r))),t=t.return}return i}function _s(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function P0(t,e,n,i,r){for(var s=e._reactName,o=[];n!==null&&n!==i;){var a=n,l=a.alternate,c=a.stateNode;if(l!==null&&l===i)break;a.tag===5&&c!==null&&(a=c,r?(l=pa(n,s),l!=null&&o.unshift(Sa(n,l,a))):r||(l=pa(n,s),l!=null&&o.push(Sa(n,l,a)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var tT=/\r\n?/g,nT=/\u0000|\uFFFD/g;function D0(t){return(typeof t=="string"?t:""+t).replace(tT,`
`).replace(nT,"")}function ol(t,e,n){if(e=D0(e),D0(t)!==e&&n)throw Error(ie(425))}function _c(){}var _d=null,Sd=null;function Md(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Ed=typeof setTimeout=="function"?setTimeout:void 0,iT=typeof clearTimeout=="function"?clearTimeout:void 0,L0=typeof Promise=="function"?Promise:void 0,rT=typeof queueMicrotask=="function"?queueMicrotask:typeof L0<"u"?function(t){return L0.resolve(null).then(t).catch(sT)}:Ed;function sT(t){setTimeout(function(){throw t})}function Wu(t,e){var n=e,i=0;do{var r=n.nextSibling;if(t.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"){if(i===0){t.removeChild(r),xa(e);return}i--}else n!=="$"&&n!=="$?"&&n!=="$!"||i++;n=r}while(n);xa(e)}function Er(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function I0(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var Mo=Math.random().toString(36).slice(2),yi="__reactFiber$"+Mo,Ma="__reactProps$"+Mo,$i="__reactContainer$"+Mo,Td="__reactEvents$"+Mo,oT="__reactListeners$"+Mo,aT="__reactHandles$"+Mo;function Kr(t){var e=t[yi];if(e)return e;for(var n=t.parentNode;n;){if(e=n[$i]||n[yi]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=I0(t);t!==null;){if(n=t[yi])return n;t=I0(t)}return e}t=n,n=t.parentNode}return null}function Oa(t){return t=t[yi]||t[$i],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function zs(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(ie(33))}function su(t){return t[Ma]||null}var wd=[],Gs=-1;function Nr(t){return{current:t}}function ht(t){0>Gs||(t.current=wd[Gs],wd[Gs]=null,Gs--)}function ft(t,e){Gs++,wd[Gs]=t.current,t.current=e}var Rr={},on=Nr(Rr),yn=Nr(!1),as=Rr;function ao(t,e){var n=t.type.contextTypes;if(!n)return Rr;var i=t.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===e)return i.__reactInternalMemoizedMaskedChildContext;var r={},s;for(s in n)r[s]=e[s];return i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=r),r}function _n(t){return t=t.childContextTypes,t!=null}function Sc(){ht(yn),ht(on)}function N0(t,e,n){if(on.current!==Rr)throw Error(ie(168));ft(on,e),ft(yn,n)}function Fy(t,e,n){var i=t.stateNode;if(e=e.childContextTypes,typeof i.getChildContext!="function")return n;i=i.getChildContext();for(var r in i)if(!(r in e))throw Error(ie(108,jM(t)||"Unknown",r));return xt({},n,i)}function Mc(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||Rr,as=on.current,ft(on,t),ft(yn,yn.current),!0}function U0(t,e,n){var i=t.stateNode;if(!i)throw Error(ie(169));n?(t=Fy(t,e,as),i.__reactInternalMemoizedMergedChildContext=t,ht(yn),ht(on),ft(on,t)):ht(yn),ft(yn,n)}var Bi=null,ou=!1,ju=!1;function ky(t){Bi===null?Bi=[t]:Bi.push(t)}function lT(t){ou=!0,ky(t)}function Ur(){if(!ju&&Bi!==null){ju=!0;var t=0,e=nt;try{var n=Bi;for(nt=1;t<n.length;t++){var i=n[t];do i=i(!0);while(i!==null)}Bi=null,ou=!1}catch(r){throw Bi!==null&&(Bi=Bi.slice(t+1)),ly(vp,Ur),r}finally{nt=e,ju=!1}}return null}var Hs=[],Ws=0,Ec=null,Tc=0,Fn=[],kn=0,ls=null,zi=1,Gi="";function Wr(t,e){Hs[Ws++]=Tc,Hs[Ws++]=Ec,Ec=t,Tc=e}function Oy(t,e,n){Fn[kn++]=zi,Fn[kn++]=Gi,Fn[kn++]=ls,ls=t;var i=zi;t=Gi;var r=32-si(i)-1;i&=~(1<<r),n+=1;var s=32-si(e)+r;if(30<s){var o=r-r%5;s=(i&(1<<o)-1).toString(32),i>>=o,r-=o,zi=1<<32-si(e)+r|n<<r|i,Gi=s+t}else zi=1<<s|n<<r|i,Gi=t}function bp(t){t.return!==null&&(Wr(t,1),Oy(t,1,0))}function Cp(t){for(;t===Ec;)Ec=Hs[--Ws],Hs[Ws]=null,Tc=Hs[--Ws],Hs[Ws]=null;for(;t===ls;)ls=Fn[--kn],Fn[kn]=null,Gi=Fn[--kn],Fn[kn]=null,zi=Fn[--kn],Fn[kn]=null}var Rn=null,Cn=null,pt=!1,ni=null;function By(t,e){var n=Vn(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function F0(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,Rn=t,Cn=Er(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,Rn=t,Cn=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=ls!==null?{id:zi,overflow:Gi}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=Vn(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,Rn=t,Cn=null,!0):!1;default:return!1}}function Ad(t){return(t.mode&1)!==0&&(t.flags&128)===0}function bd(t){if(pt){var e=Cn;if(e){var n=e;if(!F0(t,e)){if(Ad(t))throw Error(ie(418));e=Er(n.nextSibling);var i=Rn;e&&F0(t,e)?By(i,n):(t.flags=t.flags&-4097|2,pt=!1,Rn=t)}}else{if(Ad(t))throw Error(ie(418));t.flags=t.flags&-4097|2,pt=!1,Rn=t}}}function k0(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;Rn=t}function al(t){if(t!==Rn)return!1;if(!pt)return k0(t),pt=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!Md(t.type,t.memoizedProps)),e&&(e=Cn)){if(Ad(t))throw Vy(),Error(ie(418));for(;e;)By(t,e),e=Er(e.nextSibling)}if(k0(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(ie(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){Cn=Er(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}Cn=null}}else Cn=Rn?Er(t.stateNode.nextSibling):null;return!0}function Vy(){for(var t=Cn;t;)t=Er(t.nextSibling)}function lo(){Cn=Rn=null,pt=!1}function Rp(t){ni===null?ni=[t]:ni.push(t)}var cT=Ji.ReactCurrentBatchConfig;function Io(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(ie(309));var i=n.stateNode}if(!i)throw Error(ie(147,t));var r=i,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(o){var a=r.refs;o===null?delete a[s]:a[s]=o},e._stringRef=s,e)}if(typeof t!="string")throw Error(ie(284));if(!n._owner)throw Error(ie(290,t))}return t}function ll(t,e){throw t=Object.prototype.toString.call(e),Error(ie(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function O0(t){var e=t._init;return e(t._payload)}function zy(t){function e(h,x){if(t){var S=h.deletions;S===null?(h.deletions=[x],h.flags|=16):S.push(x)}}function n(h,x){if(!t)return null;for(;x!==null;)e(h,x),x=x.sibling;return null}function i(h,x){for(h=new Map;x!==null;)x.key!==null?h.set(x.key,x):h.set(x.index,x),x=x.sibling;return h}function r(h,x){return h=br(h,x),h.index=0,h.sibling=null,h}function s(h,x,S){return h.index=S,t?(S=h.alternate,S!==null?(S=S.index,S<x?(h.flags|=2,x):S):(h.flags|=2,x)):(h.flags|=1048576,x)}function o(h){return t&&h.alternate===null&&(h.flags|=2),h}function a(h,x,S,_){return x===null||x.tag!==6?(x=Qu(S,h.mode,_),x.return=h,x):(x=r(x,S),x.return=h,x)}function l(h,x,S,_){var w=S.type;return w===ks?u(h,x,S.props.children,_,S.key):x!==null&&(x.elementType===w||typeof w=="object"&&w!==null&&w.$$typeof===fr&&O0(w)===x.type)?(_=r(x,S.props),_.ref=Io(h,x,S),_.return=h,_):(_=Ql(S.type,S.key,S.props,null,h.mode,_),_.ref=Io(h,x,S),_.return=h,_)}function c(h,x,S,_){return x===null||x.tag!==4||x.stateNode.containerInfo!==S.containerInfo||x.stateNode.implementation!==S.implementation?(x=Ju(S,h.mode,_),x.return=h,x):(x=r(x,S.children||[]),x.return=h,x)}function u(h,x,S,_,w){return x===null||x.tag!==7?(x=rs(S,h.mode,_,w),x.return=h,x):(x=r(x,S),x.return=h,x)}function d(h,x,S){if(typeof x=="string"&&x!==""||typeof x=="number")return x=Qu(""+x,h.mode,S),x.return=h,x;if(typeof x=="object"&&x!==null){switch(x.$$typeof){case Za:return S=Ql(x.type,x.key,x.props,null,h.mode,S),S.ref=Io(h,null,x),S.return=h,S;case Fs:return x=Ju(x,h.mode,S),x.return=h,x;case fr:var _=x._init;return d(h,_(x._payload),S)}if(Xo(x)||Co(x))return x=rs(x,h.mode,S,null),x.return=h,x;ll(h,x)}return null}function f(h,x,S,_){var w=x!==null?x.key:null;if(typeof S=="string"&&S!==""||typeof S=="number")return w!==null?null:a(h,x,""+S,_);if(typeof S=="object"&&S!==null){switch(S.$$typeof){case Za:return S.key===w?l(h,x,S,_):null;case Fs:return S.key===w?c(h,x,S,_):null;case fr:return w=S._init,f(h,x,w(S._payload),_)}if(Xo(S)||Co(S))return w!==null?null:u(h,x,S,_,null);ll(h,S)}return null}function p(h,x,S,_,w){if(typeof _=="string"&&_!==""||typeof _=="number")return h=h.get(S)||null,a(x,h,""+_,w);if(typeof _=="object"&&_!==null){switch(_.$$typeof){case Za:return h=h.get(_.key===null?S:_.key)||null,l(x,h,_,w);case Fs:return h=h.get(_.key===null?S:_.key)||null,c(x,h,_,w);case fr:var b=_._init;return p(h,x,S,b(_._payload),w)}if(Xo(_)||Co(_))return h=h.get(S)||null,u(x,h,_,w,null);ll(x,_)}return null}function m(h,x,S,_){for(var w=null,b=null,A=x,y=x=0,C=null;A!==null&&y<S.length;y++){A.index>y?(C=A,A=null):C=A.sibling;var P=f(h,A,S[y],_);if(P===null){A===null&&(A=C);break}t&&A&&P.alternate===null&&e(h,A),x=s(P,x,y),b===null?w=P:b.sibling=P,b=P,A=C}if(y===S.length)return n(h,A),pt&&Wr(h,y),w;if(A===null){for(;y<S.length;y++)A=d(h,S[y],_),A!==null&&(x=s(A,x,y),b===null?w=A:b.sibling=A,b=A);return pt&&Wr(h,y),w}for(A=i(h,A);y<S.length;y++)C=p(A,h,y,S[y],_),C!==null&&(t&&C.alternate!==null&&A.delete(C.key===null?y:C.key),x=s(C,x,y),b===null?w=C:b.sibling=C,b=C);return t&&A.forEach(function(D){return e(h,D)}),pt&&Wr(h,y),w}function E(h,x,S,_){var w=Co(S);if(typeof w!="function")throw Error(ie(150));if(S=w.call(S),S==null)throw Error(ie(151));for(var b=w=null,A=x,y=x=0,C=null,P=S.next();A!==null&&!P.done;y++,P=S.next()){A.index>y?(C=A,A=null):C=A.sibling;var D=f(h,A,P.value,_);if(D===null){A===null&&(A=C);break}t&&A&&D.alternate===null&&e(h,A),x=s(D,x,y),b===null?w=D:b.sibling=D,b=D,A=C}if(P.done)return n(h,A),pt&&Wr(h,y),w;if(A===null){for(;!P.done;y++,P=S.next())P=d(h,P.value,_),P!==null&&(x=s(P,x,y),b===null?w=P:b.sibling=P,b=P);return pt&&Wr(h,y),w}for(A=i(h,A);!P.done;y++,P=S.next())P=p(A,h,y,P.value,_),P!==null&&(t&&P.alternate!==null&&A.delete(P.key===null?y:P.key),x=s(P,x,y),b===null?w=P:b.sibling=P,b=P);return t&&A.forEach(function(F){return e(h,F)}),pt&&Wr(h,y),w}function g(h,x,S,_){if(typeof S=="object"&&S!==null&&S.type===ks&&S.key===null&&(S=S.props.children),typeof S=="object"&&S!==null){switch(S.$$typeof){case Za:e:{for(var w=S.key,b=x;b!==null;){if(b.key===w){if(w=S.type,w===ks){if(b.tag===7){n(h,b.sibling),x=r(b,S.props.children),x.return=h,h=x;break e}}else if(b.elementType===w||typeof w=="object"&&w!==null&&w.$$typeof===fr&&O0(w)===b.type){n(h,b.sibling),x=r(b,S.props),x.ref=Io(h,b,S),x.return=h,h=x;break e}n(h,b);break}else e(h,b);b=b.sibling}S.type===ks?(x=rs(S.props.children,h.mode,_,S.key),x.return=h,h=x):(_=Ql(S.type,S.key,S.props,null,h.mode,_),_.ref=Io(h,x,S),_.return=h,h=_)}return o(h);case Fs:e:{for(b=S.key;x!==null;){if(x.key===b)if(x.tag===4&&x.stateNode.containerInfo===S.containerInfo&&x.stateNode.implementation===S.implementation){n(h,x.sibling),x=r(x,S.children||[]),x.return=h,h=x;break e}else{n(h,x);break}else e(h,x);x=x.sibling}x=Ju(S,h.mode,_),x.return=h,h=x}return o(h);case fr:return b=S._init,g(h,x,b(S._payload),_)}if(Xo(S))return m(h,x,S,_);if(Co(S))return E(h,x,S,_);ll(h,S)}return typeof S=="string"&&S!==""||typeof S=="number"?(S=""+S,x!==null&&x.tag===6?(n(h,x.sibling),x=r(x,S),x.return=h,h=x):(n(h,x),x=Qu(S,h.mode,_),x.return=h,h=x),o(h)):n(h,x)}return g}var co=zy(!0),Gy=zy(!1),wc=Nr(null),Ac=null,js=null,Pp=null;function Dp(){Pp=js=Ac=null}function Lp(t){var e=wc.current;ht(wc),t._currentValue=e}function Cd(t,e,n){for(;t!==null;){var i=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),t===n)break;t=t.return}}function to(t,e){Ac=t,Pp=js=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(vn=!0),t.firstContext=null)}function jn(t){var e=t._currentValue;if(Pp!==t)if(t={context:t,memoizedValue:e,next:null},js===null){if(Ac===null)throw Error(ie(308));js=t,Ac.dependencies={lanes:0,firstContext:t}}else js=js.next=t;return e}var Zr=null;function Ip(t){Zr===null?Zr=[t]:Zr.push(t)}function Hy(t,e,n,i){var r=e.interleaved;return r===null?(n.next=n,Ip(e)):(n.next=r.next,r.next=n),e.interleaved=n,qi(t,i)}function qi(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var dr=!1;function Np(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Wy(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function Wi(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function Tr(t,e,n){var i=t.updateQueue;if(i===null)return null;if(i=i.shared,qe&2){var r=i.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),i.pending=e,qi(t,n)}return r=i.interleaved,r===null?(e.next=e,Ip(i)):(e.next=r.next,r.next=e),i.interleaved=e,qi(t,n)}function Xl(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,yp(t,n)}}function B0(t,e){var n=t.updateQueue,i=t.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var r=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?r=s=o:s=s.next=o,n=n.next}while(n!==null);s===null?r=s=e:s=s.next=e}else r=s=e;n={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:s,shared:i.shared,effects:i.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function bc(t,e,n,i){var r=t.updateQueue;dr=!1;var s=r.firstBaseUpdate,o=r.lastBaseUpdate,a=r.shared.pending;if(a!==null){r.shared.pending=null;var l=a,c=l.next;l.next=null,o===null?s=c:o.next=c,o=l;var u=t.alternate;u!==null&&(u=u.updateQueue,a=u.lastBaseUpdate,a!==o&&(a===null?u.firstBaseUpdate=c:a.next=c,u.lastBaseUpdate=l))}if(s!==null){var d=r.baseState;o=0,u=c=l=null,a=s;do{var f=a.lane,p=a.eventTime;if((i&f)===f){u!==null&&(u=u.next={eventTime:p,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var m=t,E=a;switch(f=e,p=n,E.tag){case 1:if(m=E.payload,typeof m=="function"){d=m.call(p,d,f);break e}d=m;break e;case 3:m.flags=m.flags&-65537|128;case 0:if(m=E.payload,f=typeof m=="function"?m.call(p,d,f):m,f==null)break e;d=xt({},d,f);break e;case 2:dr=!0}}a.callback!==null&&a.lane!==0&&(t.flags|=64,f=r.effects,f===null?r.effects=[a]:f.push(a))}else p={eventTime:p,lane:f,tag:a.tag,payload:a.payload,callback:a.callback,next:null},u===null?(c=u=p,l=d):u=u.next=p,o|=f;if(a=a.next,a===null){if(a=r.shared.pending,a===null)break;f=a,a=f.next,f.next=null,r.lastBaseUpdate=f,r.shared.pending=null}}while(!0);if(u===null&&(l=d),r.baseState=l,r.firstBaseUpdate=c,r.lastBaseUpdate=u,e=r.shared.interleaved,e!==null){r=e;do o|=r.lane,r=r.next;while(r!==e)}else s===null&&(r.shared.lanes=0);us|=o,t.lanes=o,t.memoizedState=d}}function V0(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var i=t[e],r=i.callback;if(r!==null){if(i.callback=null,i=n,typeof r!="function")throw Error(ie(191,r));r.call(i)}}}var Ba={},Ei=Nr(Ba),Ea=Nr(Ba),Ta=Nr(Ba);function Qr(t){if(t===Ba)throw Error(ie(174));return t}function Up(t,e){switch(ft(Ta,e),ft(Ea,t),ft(Ei,Ba),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:ld(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=ld(e,t)}ht(Ei),ft(Ei,e)}function uo(){ht(Ei),ht(Ea),ht(Ta)}function jy(t){Qr(Ta.current);var e=Qr(Ei.current),n=ld(e,t.type);e!==n&&(ft(Ea,t),ft(Ei,n))}function Fp(t){Ea.current===t&&(ht(Ei),ht(Ea))}var mt=Nr(0);function Cc(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Xu=[];function kp(){for(var t=0;t<Xu.length;t++)Xu[t]._workInProgressVersionPrimary=null;Xu.length=0}var Yl=Ji.ReactCurrentDispatcher,Yu=Ji.ReactCurrentBatchConfig,cs=0,gt=null,Ft=null,Gt=null,Rc=!1,ra=!1,wa=0,uT=0;function Qt(){throw Error(ie(321))}function Op(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!li(t[n],e[n]))return!1;return!0}function Bp(t,e,n,i,r,s){if(cs=s,gt=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,Yl.current=t===null||t.memoizedState===null?pT:mT,t=n(i,r),ra){s=0;do{if(ra=!1,wa=0,25<=s)throw Error(ie(301));s+=1,Gt=Ft=null,e.updateQueue=null,Yl.current=gT,t=n(i,r)}while(ra)}if(Yl.current=Pc,e=Ft!==null&&Ft.next!==null,cs=0,Gt=Ft=gt=null,Rc=!1,e)throw Error(ie(300));return t}function Vp(){var t=wa!==0;return wa=0,t}function mi(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Gt===null?gt.memoizedState=Gt=t:Gt=Gt.next=t,Gt}function Xn(){if(Ft===null){var t=gt.alternate;t=t!==null?t.memoizedState:null}else t=Ft.next;var e=Gt===null?gt.memoizedState:Gt.next;if(e!==null)Gt=e,Ft=t;else{if(t===null)throw Error(ie(310));Ft=t,t={memoizedState:Ft.memoizedState,baseState:Ft.baseState,baseQueue:Ft.baseQueue,queue:Ft.queue,next:null},Gt===null?gt.memoizedState=Gt=t:Gt=Gt.next=t}return Gt}function Aa(t,e){return typeof e=="function"?e(t):e}function $u(t){var e=Xn(),n=e.queue;if(n===null)throw Error(ie(311));n.lastRenderedReducer=t;var i=Ft,r=i.baseQueue,s=n.pending;if(s!==null){if(r!==null){var o=r.next;r.next=s.next,s.next=o}i.baseQueue=r=s,n.pending=null}if(r!==null){s=r.next,i=i.baseState;var a=o=null,l=null,c=s;do{var u=c.lane;if((cs&u)===u)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),i=c.hasEagerState?c.eagerState:t(i,c.action);else{var d={lane:u,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(a=l=d,o=i):l=l.next=d,gt.lanes|=u,us|=u}c=c.next}while(c!==null&&c!==s);l===null?o=i:l.next=a,li(i,e.memoizedState)||(vn=!0),e.memoizedState=i,e.baseState=o,e.baseQueue=l,n.lastRenderedState=i}if(t=n.interleaved,t!==null){r=t;do s=r.lane,gt.lanes|=s,us|=s,r=r.next;while(r!==t)}else r===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function qu(t){var e=Xn(),n=e.queue;if(n===null)throw Error(ie(311));n.lastRenderedReducer=t;var i=n.dispatch,r=n.pending,s=e.memoizedState;if(r!==null){n.pending=null;var o=r=r.next;do s=t(s,o.action),o=o.next;while(o!==r);li(s,e.memoizedState)||(vn=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,i]}function Xy(){}function Yy(t,e){var n=gt,i=Xn(),r=e(),s=!li(i.memoizedState,r);if(s&&(i.memoizedState=r,vn=!0),i=i.queue,zp(Ky.bind(null,n,i,t),[t]),i.getSnapshot!==e||s||Gt!==null&&Gt.memoizedState.tag&1){if(n.flags|=2048,ba(9,qy.bind(null,n,i,r,e),void 0,null),Ht===null)throw Error(ie(349));cs&30||$y(n,e,r)}return r}function $y(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=gt.updateQueue,e===null?(e={lastEffect:null,stores:null},gt.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function qy(t,e,n,i){e.value=n,e.getSnapshot=i,Zy(e)&&Qy(t)}function Ky(t,e,n){return n(function(){Zy(e)&&Qy(t)})}function Zy(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!li(t,n)}catch{return!0}}function Qy(t){var e=qi(t,1);e!==null&&oi(e,t,1,-1)}function z0(t){var e=mi();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Aa,lastRenderedState:t},e.queue=t,t=t.dispatch=hT.bind(null,gt,t),[e.memoizedState,t]}function ba(t,e,n,i){return t={tag:t,create:e,destroy:n,deps:i,next:null},e=gt.updateQueue,e===null?(e={lastEffect:null,stores:null},gt.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(i=n.next,n.next=t,t.next=i,e.lastEffect=t)),t}function Jy(){return Xn().memoizedState}function $l(t,e,n,i){var r=mi();gt.flags|=t,r.memoizedState=ba(1|e,n,void 0,i===void 0?null:i)}function au(t,e,n,i){var r=Xn();i=i===void 0?null:i;var s=void 0;if(Ft!==null){var o=Ft.memoizedState;if(s=o.destroy,i!==null&&Op(i,o.deps)){r.memoizedState=ba(e,n,s,i);return}}gt.flags|=t,r.memoizedState=ba(1|e,n,s,i)}function G0(t,e){return $l(8390656,8,t,e)}function zp(t,e){return au(2048,8,t,e)}function e_(t,e){return au(4,2,t,e)}function t_(t,e){return au(4,4,t,e)}function n_(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function i_(t,e,n){return n=n!=null?n.concat([t]):null,au(4,4,n_.bind(null,e,t),n)}function Gp(){}function r_(t,e){var n=Xn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&Op(e,i[1])?i[0]:(n.memoizedState=[t,e],t)}function s_(t,e){var n=Xn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&Op(e,i[1])?i[0]:(t=t(),n.memoizedState=[t,e],t)}function o_(t,e,n){return cs&21?(li(n,e)||(n=fy(),gt.lanes|=n,us|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,vn=!0),t.memoizedState=n)}function fT(t,e){var n=nt;nt=n!==0&&4>n?n:4,t(!0);var i=Yu.transition;Yu.transition={};try{t(!1),e()}finally{nt=n,Yu.transition=i}}function a_(){return Xn().memoizedState}function dT(t,e,n){var i=Ar(t);if(n={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null},l_(t))c_(e,n);else if(n=Hy(t,e,n,i),n!==null){var r=fn();oi(n,t,i,r),u_(n,e,i)}}function hT(t,e,n){var i=Ar(t),r={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null};if(l_(t))c_(e,r);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var o=e.lastRenderedState,a=s(o,n);if(r.hasEagerState=!0,r.eagerState=a,li(a,o)){var l=e.interleaved;l===null?(r.next=r,Ip(e)):(r.next=l.next,l.next=r),e.interleaved=r;return}}catch{}finally{}n=Hy(t,e,r,i),n!==null&&(r=fn(),oi(n,t,i,r),u_(n,e,i))}}function l_(t){var e=t.alternate;return t===gt||e!==null&&e===gt}function c_(t,e){ra=Rc=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function u_(t,e,n){if(n&4194240){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,yp(t,n)}}var Pc={readContext:jn,useCallback:Qt,useContext:Qt,useEffect:Qt,useImperativeHandle:Qt,useInsertionEffect:Qt,useLayoutEffect:Qt,useMemo:Qt,useReducer:Qt,useRef:Qt,useState:Qt,useDebugValue:Qt,useDeferredValue:Qt,useTransition:Qt,useMutableSource:Qt,useSyncExternalStore:Qt,useId:Qt,unstable_isNewReconciler:!1},pT={readContext:jn,useCallback:function(t,e){return mi().memoizedState=[t,e===void 0?null:e],t},useContext:jn,useEffect:G0,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,$l(4194308,4,n_.bind(null,e,t),n)},useLayoutEffect:function(t,e){return $l(4194308,4,t,e)},useInsertionEffect:function(t,e){return $l(4,2,t,e)},useMemo:function(t,e){var n=mi();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var i=mi();return e=n!==void 0?n(e):e,i.memoizedState=i.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},i.queue=t,t=t.dispatch=dT.bind(null,gt,t),[i.memoizedState,t]},useRef:function(t){var e=mi();return t={current:t},e.memoizedState=t},useState:z0,useDebugValue:Gp,useDeferredValue:function(t){return mi().memoizedState=t},useTransition:function(){var t=z0(!1),e=t[0];return t=fT.bind(null,t[1]),mi().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var i=gt,r=mi();if(pt){if(n===void 0)throw Error(ie(407));n=n()}else{if(n=e(),Ht===null)throw Error(ie(349));cs&30||$y(i,e,n)}r.memoizedState=n;var s={value:n,getSnapshot:e};return r.queue=s,G0(Ky.bind(null,i,s,t),[t]),i.flags|=2048,ba(9,qy.bind(null,i,s,n,e),void 0,null),n},useId:function(){var t=mi(),e=Ht.identifierPrefix;if(pt){var n=Gi,i=zi;n=(i&~(1<<32-si(i)-1)).toString(32)+n,e=":"+e+"R"+n,n=wa++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=uT++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},mT={readContext:jn,useCallback:r_,useContext:jn,useEffect:zp,useImperativeHandle:i_,useInsertionEffect:e_,useLayoutEffect:t_,useMemo:s_,useReducer:$u,useRef:Jy,useState:function(){return $u(Aa)},useDebugValue:Gp,useDeferredValue:function(t){var e=Xn();return o_(e,Ft.memoizedState,t)},useTransition:function(){var t=$u(Aa)[0],e=Xn().memoizedState;return[t,e]},useMutableSource:Xy,useSyncExternalStore:Yy,useId:a_,unstable_isNewReconciler:!1},gT={readContext:jn,useCallback:r_,useContext:jn,useEffect:zp,useImperativeHandle:i_,useInsertionEffect:e_,useLayoutEffect:t_,useMemo:s_,useReducer:qu,useRef:Jy,useState:function(){return qu(Aa)},useDebugValue:Gp,useDeferredValue:function(t){var e=Xn();return Ft===null?e.memoizedState=t:o_(e,Ft.memoizedState,t)},useTransition:function(){var t=qu(Aa)[0],e=Xn().memoizedState;return[t,e]},useMutableSource:Xy,useSyncExternalStore:Yy,useId:a_,unstable_isNewReconciler:!1};function ei(t,e){if(t&&t.defaultProps){e=xt({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function Rd(t,e,n,i){e=t.memoizedState,n=n(i,e),n=n==null?e:xt({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var lu={isMounted:function(t){return(t=t._reactInternals)?gs(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var i=fn(),r=Ar(t),s=Wi(i,r);s.payload=e,n!=null&&(s.callback=n),e=Tr(t,s,r),e!==null&&(oi(e,t,r,i),Xl(e,t,r))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var i=fn(),r=Ar(t),s=Wi(i,r);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=Tr(t,s,r),e!==null&&(oi(e,t,r,i),Xl(e,t,r))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=fn(),i=Ar(t),r=Wi(n,i);r.tag=2,e!=null&&(r.callback=e),e=Tr(t,r,i),e!==null&&(oi(e,t,i,n),Xl(e,t,i))}};function H0(t,e,n,i,r,s,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(i,s,o):e.prototype&&e.prototype.isPureReactComponent?!ya(n,i)||!ya(r,s):!0}function f_(t,e,n){var i=!1,r=Rr,s=e.contextType;return typeof s=="object"&&s!==null?s=jn(s):(r=_n(e)?as:on.current,i=e.contextTypes,s=(i=i!=null)?ao(t,r):Rr),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=lu,t.stateNode=e,e._reactInternals=t,i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=r,t.__reactInternalMemoizedMaskedChildContext=s),e}function W0(t,e,n,i){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,i),e.state!==t&&lu.enqueueReplaceState(e,e.state,null)}function Pd(t,e,n,i){var r=t.stateNode;r.props=n,r.state=t.memoizedState,r.refs={},Np(t);var s=e.contextType;typeof s=="object"&&s!==null?r.context=jn(s):(s=_n(e)?as:on.current,r.context=ao(t,s)),r.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(Rd(t,e,s,n),r.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(e=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),e!==r.state&&lu.enqueueReplaceState(r,r.state,null),bc(t,n,r,i),r.state=t.memoizedState),typeof r.componentDidMount=="function"&&(t.flags|=4194308)}function fo(t,e){try{var n="",i=e;do n+=WM(i),i=i.return;while(i);var r=n}catch(s){r=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:r,digest:null}}function Ku(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function Dd(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var xT=typeof WeakMap=="function"?WeakMap:Map;function d_(t,e,n){n=Wi(-1,n),n.tag=3,n.payload={element:null};var i=e.value;return n.callback=function(){Lc||(Lc=!0,zd=i),Dd(t,e)},n}function h_(t,e,n){n=Wi(-1,n),n.tag=3;var i=t.type.getDerivedStateFromError;if(typeof i=="function"){var r=e.value;n.payload=function(){return i(r)},n.callback=function(){Dd(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){Dd(t,e),typeof i!="function"&&(wr===null?wr=new Set([this]):wr.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function j0(t,e,n){var i=t.pingCache;if(i===null){i=t.pingCache=new xT;var r=new Set;i.set(e,r)}else r=i.get(e),r===void 0&&(r=new Set,i.set(e,r));r.has(n)||(r.add(n),t=DT.bind(null,t,e,n),e.then(t,t))}function X0(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function Y0(t,e,n,i,r){return t.mode&1?(t.flags|=65536,t.lanes=r,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=Wi(-1,1),e.tag=2,Tr(n,e,1))),n.lanes|=1),t)}var vT=Ji.ReactCurrentOwner,vn=!1;function ln(t,e,n,i){e.child=t===null?Gy(e,null,n,i):co(e,t.child,n,i)}function $0(t,e,n,i,r){n=n.render;var s=e.ref;return to(e,r),i=Bp(t,e,n,i,s,r),n=Vp(),t!==null&&!vn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Ki(t,e,r)):(pt&&n&&bp(e),e.flags|=1,ln(t,e,i,r),e.child)}function q0(t,e,n,i,r){if(t===null){var s=n.type;return typeof s=="function"&&!Kp(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,p_(t,e,s,i,r)):(t=Ql(n.type,null,i,e,e.mode,r),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&r)){var o=s.memoizedProps;if(n=n.compare,n=n!==null?n:ya,n(o,i)&&t.ref===e.ref)return Ki(t,e,r)}return e.flags|=1,t=br(s,i),t.ref=e.ref,t.return=e,e.child=t}function p_(t,e,n,i,r){if(t!==null){var s=t.memoizedProps;if(ya(s,i)&&t.ref===e.ref)if(vn=!1,e.pendingProps=i=s,(t.lanes&r)!==0)t.flags&131072&&(vn=!0);else return e.lanes=t.lanes,Ki(t,e,r)}return Ld(t,e,n,i,r)}function m_(t,e,n){var i=e.pendingProps,r=i.children,s=t!==null?t.memoizedState:null;if(i.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},ft(Ys,bn),bn|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,ft(Ys,bn),bn|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=s!==null?s.baseLanes:n,ft(Ys,bn),bn|=i}else s!==null?(i=s.baseLanes|n,e.memoizedState=null):i=n,ft(Ys,bn),bn|=i;return ln(t,e,r,n),e.child}function g_(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function Ld(t,e,n,i,r){var s=_n(n)?as:on.current;return s=ao(e,s),to(e,r),n=Bp(t,e,n,i,s,r),i=Vp(),t!==null&&!vn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Ki(t,e,r)):(pt&&i&&bp(e),e.flags|=1,ln(t,e,n,r),e.child)}function K0(t,e,n,i,r){if(_n(n)){var s=!0;Mc(e)}else s=!1;if(to(e,r),e.stateNode===null)ql(t,e),f_(e,n,i),Pd(e,n,i,r),i=!0;else if(t===null){var o=e.stateNode,a=e.memoizedProps;o.props=a;var l=o.context,c=n.contextType;typeof c=="object"&&c!==null?c=jn(c):(c=_n(n)?as:on.current,c=ao(e,c));var u=n.getDerivedStateFromProps,d=typeof u=="function"||typeof o.getSnapshotBeforeUpdate=="function";d||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==i||l!==c)&&W0(e,o,i,c),dr=!1;var f=e.memoizedState;o.state=f,bc(e,i,o,r),l=e.memoizedState,a!==i||f!==l||yn.current||dr?(typeof u=="function"&&(Rd(e,n,u,i),l=e.memoizedState),(a=dr||H0(e,n,a,i,f,l,c))?(d||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=l),o.props=i,o.state=l,o.context=c,i=a):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{o=e.stateNode,Wy(t,e),a=e.memoizedProps,c=e.type===e.elementType?a:ei(e.type,a),o.props=c,d=e.pendingProps,f=o.context,l=n.contextType,typeof l=="object"&&l!==null?l=jn(l):(l=_n(n)?as:on.current,l=ao(e,l));var p=n.getDerivedStateFromProps;(u=typeof p=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==d||f!==l)&&W0(e,o,i,l),dr=!1,f=e.memoizedState,o.state=f,bc(e,i,o,r);var m=e.memoizedState;a!==d||f!==m||yn.current||dr?(typeof p=="function"&&(Rd(e,n,p,i),m=e.memoizedState),(c=dr||H0(e,n,c,i,f,m,l)||!1)?(u||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(i,m,l),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(i,m,l)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&f===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&f===t.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=m),o.props=i,o.state=m,o.context=l,i=c):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&f===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&f===t.memoizedState||(e.flags|=1024),i=!1)}return Id(t,e,n,i,s,r)}function Id(t,e,n,i,r,s){g_(t,e);var o=(e.flags&128)!==0;if(!i&&!o)return r&&U0(e,n,!1),Ki(t,e,s);i=e.stateNode,vT.current=e;var a=o&&typeof n.getDerivedStateFromError!="function"?null:i.render();return e.flags|=1,t!==null&&o?(e.child=co(e,t.child,null,s),e.child=co(e,null,a,s)):ln(t,e,a,s),e.memoizedState=i.state,r&&U0(e,n,!0),e.child}function x_(t){var e=t.stateNode;e.pendingContext?N0(t,e.pendingContext,e.pendingContext!==e.context):e.context&&N0(t,e.context,!1),Up(t,e.containerInfo)}function Z0(t,e,n,i,r){return lo(),Rp(r),e.flags|=256,ln(t,e,n,i),e.child}var Nd={dehydrated:null,treeContext:null,retryLane:0};function Ud(t){return{baseLanes:t,cachePool:null,transitions:null}}function v_(t,e,n){var i=e.pendingProps,r=mt.current,s=!1,o=(e.flags&128)!==0,a;if((a=o)||(a=t!==null&&t.memoizedState===null?!1:(r&2)!==0),a?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(r|=1),ft(mt,r&1),t===null)return bd(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=i.children,t=i.fallback,s?(i=e.mode,s=e.child,o={mode:"hidden",children:o},!(i&1)&&s!==null?(s.childLanes=0,s.pendingProps=o):s=fu(o,i,0,null),t=rs(t,i,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=Ud(n),e.memoizedState=Nd,t):Hp(e,o));if(r=t.memoizedState,r!==null&&(a=r.dehydrated,a!==null))return yT(t,e,o,i,a,r,n);if(s){s=i.fallback,o=e.mode,r=t.child,a=r.sibling;var l={mode:"hidden",children:i.children};return!(o&1)&&e.child!==r?(i=e.child,i.childLanes=0,i.pendingProps=l,e.deletions=null):(i=br(r,l),i.subtreeFlags=r.subtreeFlags&14680064),a!==null?s=br(a,s):(s=rs(s,o,n,null),s.flags|=2),s.return=e,i.return=e,i.sibling=s,e.child=i,i=s,s=e.child,o=t.child.memoizedState,o=o===null?Ud(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},s.memoizedState=o,s.childLanes=t.childLanes&~n,e.memoizedState=Nd,i}return s=t.child,t=s.sibling,i=br(s,{mode:"visible",children:i.children}),!(e.mode&1)&&(i.lanes=n),i.return=e,i.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=i,e.memoizedState=null,i}function Hp(t,e){return e=fu({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function cl(t,e,n,i){return i!==null&&Rp(i),co(e,t.child,null,n),t=Hp(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function yT(t,e,n,i,r,s,o){if(n)return e.flags&256?(e.flags&=-257,i=Ku(Error(ie(422))),cl(t,e,o,i)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=i.fallback,r=e.mode,i=fu({mode:"visible",children:i.children},r,0,null),s=rs(s,r,o,null),s.flags|=2,i.return=e,s.return=e,i.sibling=s,e.child=i,e.mode&1&&co(e,t.child,null,o),e.child.memoizedState=Ud(o),e.memoizedState=Nd,s);if(!(e.mode&1))return cl(t,e,o,null);if(r.data==="$!"){if(i=r.nextSibling&&r.nextSibling.dataset,i)var a=i.dgst;return i=a,s=Error(ie(419)),i=Ku(s,i,void 0),cl(t,e,o,i)}if(a=(o&t.childLanes)!==0,vn||a){if(i=Ht,i!==null){switch(o&-o){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(i.suspendedLanes|o)?0:r,r!==0&&r!==s.retryLane&&(s.retryLane=r,qi(t,r),oi(i,t,r,-1))}return qp(),i=Ku(Error(ie(421))),cl(t,e,o,i)}return r.data==="$?"?(e.flags|=128,e.child=t.child,e=LT.bind(null,t),r._reactRetry=e,null):(t=s.treeContext,Cn=Er(r.nextSibling),Rn=e,pt=!0,ni=null,t!==null&&(Fn[kn++]=zi,Fn[kn++]=Gi,Fn[kn++]=ls,zi=t.id,Gi=t.overflow,ls=e),e=Hp(e,i.children),e.flags|=4096,e)}function Q0(t,e,n){t.lanes|=e;var i=t.alternate;i!==null&&(i.lanes|=e),Cd(t.return,e,n)}function Zu(t,e,n,i,r){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:r}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=i,s.tail=n,s.tailMode=r)}function y_(t,e,n){var i=e.pendingProps,r=i.revealOrder,s=i.tail;if(ln(t,e,i.children,n),i=mt.current,i&2)i=i&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Q0(t,n,e);else if(t.tag===19)Q0(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}i&=1}if(ft(mt,i),!(e.mode&1))e.memoizedState=null;else switch(r){case"forwards":for(n=e.child,r=null;n!==null;)t=n.alternate,t!==null&&Cc(t)===null&&(r=n),n=n.sibling;n=r,n===null?(r=e.child,e.child=null):(r=n.sibling,n.sibling=null),Zu(e,!1,r,n,s);break;case"backwards":for(n=null,r=e.child,e.child=null;r!==null;){if(t=r.alternate,t!==null&&Cc(t)===null){e.child=r;break}t=r.sibling,r.sibling=n,n=r,r=t}Zu(e,!0,n,null,s);break;case"together":Zu(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function ql(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function Ki(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),us|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(ie(153));if(e.child!==null){for(t=e.child,n=br(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=br(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function _T(t,e,n){switch(e.tag){case 3:x_(e),lo();break;case 5:jy(e);break;case 1:_n(e.type)&&Mc(e);break;case 4:Up(e,e.stateNode.containerInfo);break;case 10:var i=e.type._context,r=e.memoizedProps.value;ft(wc,i._currentValue),i._currentValue=r;break;case 13:if(i=e.memoizedState,i!==null)return i.dehydrated!==null?(ft(mt,mt.current&1),e.flags|=128,null):n&e.child.childLanes?v_(t,e,n):(ft(mt,mt.current&1),t=Ki(t,e,n),t!==null?t.sibling:null);ft(mt,mt.current&1);break;case 19:if(i=(n&e.childLanes)!==0,t.flags&128){if(i)return y_(t,e,n);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),ft(mt,mt.current),i)break;return null;case 22:case 23:return e.lanes=0,m_(t,e,n)}return Ki(t,e,n)}var __,Fd,S_,M_;__=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Fd=function(){};S_=function(t,e,n,i){var r=t.memoizedProps;if(r!==i){t=e.stateNode,Qr(Ei.current);var s=null;switch(n){case"input":r=rd(t,r),i=rd(t,i),s=[];break;case"select":r=xt({},r,{value:void 0}),i=xt({},i,{value:void 0}),s=[];break;case"textarea":r=ad(t,r),i=ad(t,i),s=[];break;default:typeof r.onClick!="function"&&typeof i.onClick=="function"&&(t.onclick=_c)}cd(n,i);var o;n=null;for(c in r)if(!i.hasOwnProperty(c)&&r.hasOwnProperty(c)&&r[c]!=null)if(c==="style"){var a=r[c];for(o in a)a.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(da.hasOwnProperty(c)?s||(s=[]):(s=s||[]).push(c,null));for(c in i){var l=i[c];if(a=r!=null?r[c]:void 0,i.hasOwnProperty(c)&&l!==a&&(l!=null||a!=null))if(c==="style")if(a){for(o in a)!a.hasOwnProperty(o)||l&&l.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in l)l.hasOwnProperty(o)&&a[o]!==l[o]&&(n||(n={}),n[o]=l[o])}else n||(s||(s=[]),s.push(c,n)),n=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,a=a?a.__html:void 0,l!=null&&a!==l&&(s=s||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(s=s||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(da.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&dt("scroll",t),s||a===l||(s=[])):(s=s||[]).push(c,l))}n&&(s=s||[]).push("style",n);var c=s;(e.updateQueue=c)&&(e.flags|=4)}};M_=function(t,e,n,i){n!==i&&(e.flags|=4)};function No(t,e){if(!pt)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:i.sibling=null}}function Jt(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,i=0;if(e)for(var r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags&14680064,i|=r.flags&14680064,r.return=t,r=r.sibling;else for(r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=t,r=r.sibling;return t.subtreeFlags|=i,t.childLanes=n,e}function ST(t,e,n){var i=e.pendingProps;switch(Cp(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Jt(e),null;case 1:return _n(e.type)&&Sc(),Jt(e),null;case 3:return i=e.stateNode,uo(),ht(yn),ht(on),kp(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(t===null||t.child===null)&&(al(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,ni!==null&&(Wd(ni),ni=null))),Fd(t,e),Jt(e),null;case 5:Fp(e);var r=Qr(Ta.current);if(n=e.type,t!==null&&e.stateNode!=null)S_(t,e,n,i,r),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!i){if(e.stateNode===null)throw Error(ie(166));return Jt(e),null}if(t=Qr(Ei.current),al(e)){i=e.stateNode,n=e.type;var s=e.memoizedProps;switch(i[yi]=e,i[Ma]=s,t=(e.mode&1)!==0,n){case"dialog":dt("cancel",i),dt("close",i);break;case"iframe":case"object":case"embed":dt("load",i);break;case"video":case"audio":for(r=0;r<$o.length;r++)dt($o[r],i);break;case"source":dt("error",i);break;case"img":case"image":case"link":dt("error",i),dt("load",i);break;case"details":dt("toggle",i);break;case"input":a0(i,s),dt("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!s.multiple},dt("invalid",i);break;case"textarea":c0(i,s),dt("invalid",i)}cd(n,s),r=null;for(var o in s)if(s.hasOwnProperty(o)){var a=s[o];o==="children"?typeof a=="string"?i.textContent!==a&&(s.suppressHydrationWarning!==!0&&ol(i.textContent,a,t),r=["children",a]):typeof a=="number"&&i.textContent!==""+a&&(s.suppressHydrationWarning!==!0&&ol(i.textContent,a,t),r=["children",""+a]):da.hasOwnProperty(o)&&a!=null&&o==="onScroll"&&dt("scroll",i)}switch(n){case"input":Qa(i),l0(i,s,!0);break;case"textarea":Qa(i),u0(i);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(i.onclick=_c)}i=r,e.updateQueue=i,i!==null&&(e.flags|=4)}else{o=r.nodeType===9?r:r.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=Kv(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof i.is=="string"?t=o.createElement(n,{is:i.is}):(t=o.createElement(n),n==="select"&&(o=t,i.multiple?o.multiple=!0:i.size&&(o.size=i.size))):t=o.createElementNS(t,n),t[yi]=e,t[Ma]=i,__(t,e,!1,!1),e.stateNode=t;e:{switch(o=ud(n,i),n){case"dialog":dt("cancel",t),dt("close",t),r=i;break;case"iframe":case"object":case"embed":dt("load",t),r=i;break;case"video":case"audio":for(r=0;r<$o.length;r++)dt($o[r],t);r=i;break;case"source":dt("error",t),r=i;break;case"img":case"image":case"link":dt("error",t),dt("load",t),r=i;break;case"details":dt("toggle",t),r=i;break;case"input":a0(t,i),r=rd(t,i),dt("invalid",t);break;case"option":r=i;break;case"select":t._wrapperState={wasMultiple:!!i.multiple},r=xt({},i,{value:void 0}),dt("invalid",t);break;case"textarea":c0(t,i),r=ad(t,i),dt("invalid",t);break;default:r=i}cd(n,r),a=r;for(s in a)if(a.hasOwnProperty(s)){var l=a[s];s==="style"?Jv(t,l):s==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&Zv(t,l)):s==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&ha(t,l):typeof l=="number"&&ha(t,""+l):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(da.hasOwnProperty(s)?l!=null&&s==="onScroll"&&dt("scroll",t):l!=null&&hp(t,s,l,o))}switch(n){case"input":Qa(t),l0(t,i,!1);break;case"textarea":Qa(t),u0(t);break;case"option":i.value!=null&&t.setAttribute("value",""+Cr(i.value));break;case"select":t.multiple=!!i.multiple,s=i.value,s!=null?Zs(t,!!i.multiple,s,!1):i.defaultValue!=null&&Zs(t,!!i.multiple,i.defaultValue,!0);break;default:typeof r.onClick=="function"&&(t.onclick=_c)}switch(n){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return Jt(e),null;case 6:if(t&&e.stateNode!=null)M_(t,e,t.memoizedProps,i);else{if(typeof i!="string"&&e.stateNode===null)throw Error(ie(166));if(n=Qr(Ta.current),Qr(Ei.current),al(e)){if(i=e.stateNode,n=e.memoizedProps,i[yi]=e,(s=i.nodeValue!==n)&&(t=Rn,t!==null))switch(t.tag){case 3:ol(i.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&ol(i.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else i=(n.nodeType===9?n:n.ownerDocument).createTextNode(i),i[yi]=e,e.stateNode=i}return Jt(e),null;case 13:if(ht(mt),i=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(pt&&Cn!==null&&e.mode&1&&!(e.flags&128))Vy(),lo(),e.flags|=98560,s=!1;else if(s=al(e),i!==null&&i.dehydrated!==null){if(t===null){if(!s)throw Error(ie(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(ie(317));s[yi]=e}else lo(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;Jt(e),s=!1}else ni!==null&&(Wd(ni),ni=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(i=i!==null,i!==(t!==null&&t.memoizedState!==null)&&i&&(e.child.flags|=8192,e.mode&1&&(t===null||mt.current&1?kt===0&&(kt=3):qp())),e.updateQueue!==null&&(e.flags|=4),Jt(e),null);case 4:return uo(),Fd(t,e),t===null&&_a(e.stateNode.containerInfo),Jt(e),null;case 10:return Lp(e.type._context),Jt(e),null;case 17:return _n(e.type)&&Sc(),Jt(e),null;case 19:if(ht(mt),s=e.memoizedState,s===null)return Jt(e),null;if(i=(e.flags&128)!==0,o=s.rendering,o===null)if(i)No(s,!1);else{if(kt!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=Cc(t),o!==null){for(e.flags|=128,No(s,!1),i=o.updateQueue,i!==null&&(e.updateQueue=i,e.flags|=4),e.subtreeFlags=0,i=n,n=e.child;n!==null;)s=n,t=i,s.flags&=14680066,o=s.alternate,o===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=o.childLanes,s.lanes=o.lanes,s.child=o.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=o.memoizedProps,s.memoizedState=o.memoizedState,s.updateQueue=o.updateQueue,s.type=o.type,t=o.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return ft(mt,mt.current&1|2),e.child}t=t.sibling}s.tail!==null&&bt()>ho&&(e.flags|=128,i=!0,No(s,!1),e.lanes=4194304)}else{if(!i)if(t=Cc(o),t!==null){if(e.flags|=128,i=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),No(s,!0),s.tail===null&&s.tailMode==="hidden"&&!o.alternate&&!pt)return Jt(e),null}else 2*bt()-s.renderingStartTime>ho&&n!==1073741824&&(e.flags|=128,i=!0,No(s,!1),e.lanes=4194304);s.isBackwards?(o.sibling=e.child,e.child=o):(n=s.last,n!==null?n.sibling=o:e.child=o,s.last=o)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=bt(),e.sibling=null,n=mt.current,ft(mt,i?n&1|2:n&1),e):(Jt(e),null);case 22:case 23:return $p(),i=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==i&&(e.flags|=8192),i&&e.mode&1?bn&1073741824&&(Jt(e),e.subtreeFlags&6&&(e.flags|=8192)):Jt(e),null;case 24:return null;case 25:return null}throw Error(ie(156,e.tag))}function MT(t,e){switch(Cp(e),e.tag){case 1:return _n(e.type)&&Sc(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return uo(),ht(yn),ht(on),kp(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return Fp(e),null;case 13:if(ht(mt),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(ie(340));lo()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return ht(mt),null;case 4:return uo(),null;case 10:return Lp(e.type._context),null;case 22:case 23:return $p(),null;case 24:return null;default:return null}}var ul=!1,nn=!1,ET=typeof WeakSet=="function"?WeakSet:Set,_e=null;function Xs(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(i){Mt(t,e,i)}else n.current=null}function kd(t,e,n){try{n()}catch(i){Mt(t,e,i)}}var J0=!1;function TT(t,e){if(_d=xc,t=by(),Ap(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var r=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var o=0,a=-1,l=-1,c=0,u=0,d=t,f=null;t:for(;;){for(var p;d!==n||r!==0&&d.nodeType!==3||(a=o+r),d!==s||i!==0&&d.nodeType!==3||(l=o+i),d.nodeType===3&&(o+=d.nodeValue.length),(p=d.firstChild)!==null;)f=d,d=p;for(;;){if(d===t)break t;if(f===n&&++c===r&&(a=o),f===s&&++u===i&&(l=o),(p=d.nextSibling)!==null)break;d=f,f=d.parentNode}d=p}n=a===-1||l===-1?null:{start:a,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(Sd={focusedElem:t,selectionRange:n},xc=!1,_e=e;_e!==null;)if(e=_e,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,_e=t;else for(;_e!==null;){e=_e;try{var m=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(m!==null){var E=m.memoizedProps,g=m.memoizedState,h=e.stateNode,x=h.getSnapshotBeforeUpdate(e.elementType===e.type?E:ei(e.type,E),g);h.__reactInternalSnapshotBeforeUpdate=x}break;case 3:var S=e.stateNode.containerInfo;S.nodeType===1?S.textContent="":S.nodeType===9&&S.documentElement&&S.removeChild(S.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(ie(163))}}catch(_){Mt(e,e.return,_)}if(t=e.sibling,t!==null){t.return=e.return,_e=t;break}_e=e.return}return m=J0,J0=!1,m}function sa(t,e,n){var i=e.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var r=i=i.next;do{if((r.tag&t)===t){var s=r.destroy;r.destroy=void 0,s!==void 0&&kd(e,n,s)}r=r.next}while(r!==i)}}function cu(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var i=n.create;n.destroy=i()}n=n.next}while(n!==e)}}function Od(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function E_(t){var e=t.alternate;e!==null&&(t.alternate=null,E_(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[yi],delete e[Ma],delete e[Td],delete e[oT],delete e[aT])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function T_(t){return t.tag===5||t.tag===3||t.tag===4}function eg(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||T_(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Bd(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=_c));else if(i!==4&&(t=t.child,t!==null))for(Bd(t,e,n),t=t.sibling;t!==null;)Bd(t,e,n),t=t.sibling}function Vd(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(i!==4&&(t=t.child,t!==null))for(Vd(t,e,n),t=t.sibling;t!==null;)Vd(t,e,n),t=t.sibling}var jt=null,ti=!1;function ir(t,e,n){for(n=n.child;n!==null;)w_(t,e,n),n=n.sibling}function w_(t,e,n){if(Mi&&typeof Mi.onCommitFiberUnmount=="function")try{Mi.onCommitFiberUnmount(tu,n)}catch{}switch(n.tag){case 5:nn||Xs(n,e);case 6:var i=jt,r=ti;jt=null,ir(t,e,n),jt=i,ti=r,jt!==null&&(ti?(t=jt,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):jt.removeChild(n.stateNode));break;case 18:jt!==null&&(ti?(t=jt,n=n.stateNode,t.nodeType===8?Wu(t.parentNode,n):t.nodeType===1&&Wu(t,n),xa(t)):Wu(jt,n.stateNode));break;case 4:i=jt,r=ti,jt=n.stateNode.containerInfo,ti=!0,ir(t,e,n),jt=i,ti=r;break;case 0:case 11:case 14:case 15:if(!nn&&(i=n.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){r=i=i.next;do{var s=r,o=s.destroy;s=s.tag,o!==void 0&&(s&2||s&4)&&kd(n,e,o),r=r.next}while(r!==i)}ir(t,e,n);break;case 1:if(!nn&&(Xs(n,e),i=n.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=n.memoizedProps,i.state=n.memoizedState,i.componentWillUnmount()}catch(a){Mt(n,e,a)}ir(t,e,n);break;case 21:ir(t,e,n);break;case 22:n.mode&1?(nn=(i=nn)||n.memoizedState!==null,ir(t,e,n),nn=i):ir(t,e,n);break;default:ir(t,e,n)}}function tg(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new ET),e.forEach(function(i){var r=IT.bind(null,t,i);n.has(i)||(n.add(i),i.then(r,r))})}}function $n(t,e){var n=e.deletions;if(n!==null)for(var i=0;i<n.length;i++){var r=n[i];try{var s=t,o=e,a=o;e:for(;a!==null;){switch(a.tag){case 5:jt=a.stateNode,ti=!1;break e;case 3:jt=a.stateNode.containerInfo,ti=!0;break e;case 4:jt=a.stateNode.containerInfo,ti=!0;break e}a=a.return}if(jt===null)throw Error(ie(160));w_(s,o,r),jt=null,ti=!1;var l=r.alternate;l!==null&&(l.return=null),r.return=null}catch(c){Mt(r,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)A_(e,t),e=e.sibling}function A_(t,e){var n=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if($n(e,t),di(t),i&4){try{sa(3,t,t.return),cu(3,t)}catch(E){Mt(t,t.return,E)}try{sa(5,t,t.return)}catch(E){Mt(t,t.return,E)}}break;case 1:$n(e,t),di(t),i&512&&n!==null&&Xs(n,n.return);break;case 5:if($n(e,t),di(t),i&512&&n!==null&&Xs(n,n.return),t.flags&32){var r=t.stateNode;try{ha(r,"")}catch(E){Mt(t,t.return,E)}}if(i&4&&(r=t.stateNode,r!=null)){var s=t.memoizedProps,o=n!==null?n.memoizedProps:s,a=t.type,l=t.updateQueue;if(t.updateQueue=null,l!==null)try{a==="input"&&s.type==="radio"&&s.name!=null&&$v(r,s),ud(a,o);var c=ud(a,s);for(o=0;o<l.length;o+=2){var u=l[o],d=l[o+1];u==="style"?Jv(r,d):u==="dangerouslySetInnerHTML"?Zv(r,d):u==="children"?ha(r,d):hp(r,u,d,c)}switch(a){case"input":sd(r,s);break;case"textarea":qv(r,s);break;case"select":var f=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!s.multiple;var p=s.value;p!=null?Zs(r,!!s.multiple,p,!1):f!==!!s.multiple&&(s.defaultValue!=null?Zs(r,!!s.multiple,s.defaultValue,!0):Zs(r,!!s.multiple,s.multiple?[]:"",!1))}r[Ma]=s}catch(E){Mt(t,t.return,E)}}break;case 6:if($n(e,t),di(t),i&4){if(t.stateNode===null)throw Error(ie(162));r=t.stateNode,s=t.memoizedProps;try{r.nodeValue=s}catch(E){Mt(t,t.return,E)}}break;case 3:if($n(e,t),di(t),i&4&&n!==null&&n.memoizedState.isDehydrated)try{xa(e.containerInfo)}catch(E){Mt(t,t.return,E)}break;case 4:$n(e,t),di(t);break;case 13:$n(e,t),di(t),r=t.child,r.flags&8192&&(s=r.memoizedState!==null,r.stateNode.isHidden=s,!s||r.alternate!==null&&r.alternate.memoizedState!==null||(Xp=bt())),i&4&&tg(t);break;case 22:if(u=n!==null&&n.memoizedState!==null,t.mode&1?(nn=(c=nn)||u,$n(e,t),nn=c):$n(e,t),di(t),i&8192){if(c=t.memoizedState!==null,(t.stateNode.isHidden=c)&&!u&&t.mode&1)for(_e=t,u=t.child;u!==null;){for(d=_e=u;_e!==null;){switch(f=_e,p=f.child,f.tag){case 0:case 11:case 14:case 15:sa(4,f,f.return);break;case 1:Xs(f,f.return);var m=f.stateNode;if(typeof m.componentWillUnmount=="function"){i=f,n=f.return;try{e=i,m.props=e.memoizedProps,m.state=e.memoizedState,m.componentWillUnmount()}catch(E){Mt(i,n,E)}}break;case 5:Xs(f,f.return);break;case 22:if(f.memoizedState!==null){ig(d);continue}}p!==null?(p.return=f,_e=p):ig(d)}u=u.sibling}e:for(u=null,d=t;;){if(d.tag===5){if(u===null){u=d;try{r=d.stateNode,c?(s=r.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(a=d.stateNode,l=d.memoizedProps.style,o=l!=null&&l.hasOwnProperty("display")?l.display:null,a.style.display=Qv("display",o))}catch(E){Mt(t,t.return,E)}}}else if(d.tag===6){if(u===null)try{d.stateNode.nodeValue=c?"":d.memoizedProps}catch(E){Mt(t,t.return,E)}}else if((d.tag!==22&&d.tag!==23||d.memoizedState===null||d===t)&&d.child!==null){d.child.return=d,d=d.child;continue}if(d===t)break e;for(;d.sibling===null;){if(d.return===null||d.return===t)break e;u===d&&(u=null),d=d.return}u===d&&(u=null),d.sibling.return=d.return,d=d.sibling}}break;case 19:$n(e,t),di(t),i&4&&tg(t);break;case 21:break;default:$n(e,t),di(t)}}function di(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(T_(n)){var i=n;break e}n=n.return}throw Error(ie(160))}switch(i.tag){case 5:var r=i.stateNode;i.flags&32&&(ha(r,""),i.flags&=-33);var s=eg(t);Vd(t,s,r);break;case 3:case 4:var o=i.stateNode.containerInfo,a=eg(t);Bd(t,a,o);break;default:throw Error(ie(161))}}catch(l){Mt(t,t.return,l)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function wT(t,e,n){_e=t,b_(t)}function b_(t,e,n){for(var i=(t.mode&1)!==0;_e!==null;){var r=_e,s=r.child;if(r.tag===22&&i){var o=r.memoizedState!==null||ul;if(!o){var a=r.alternate,l=a!==null&&a.memoizedState!==null||nn;a=ul;var c=nn;if(ul=o,(nn=l)&&!c)for(_e=r;_e!==null;)o=_e,l=o.child,o.tag===22&&o.memoizedState!==null?rg(r):l!==null?(l.return=o,_e=l):rg(r);for(;s!==null;)_e=s,b_(s),s=s.sibling;_e=r,ul=a,nn=c}ng(t)}else r.subtreeFlags&8772&&s!==null?(s.return=r,_e=s):ng(t)}}function ng(t){for(;_e!==null;){var e=_e;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:nn||cu(5,e);break;case 1:var i=e.stateNode;if(e.flags&4&&!nn)if(n===null)i.componentDidMount();else{var r=e.elementType===e.type?n.memoizedProps:ei(e.type,n.memoizedProps);i.componentDidUpdate(r,n.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&V0(e,s,i);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}V0(e,o,n)}break;case 5:var a=e.stateNode;if(n===null&&e.flags&4){n=a;var l=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var u=c.memoizedState;if(u!==null){var d=u.dehydrated;d!==null&&xa(d)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(ie(163))}nn||e.flags&512&&Od(e)}catch(f){Mt(e,e.return,f)}}if(e===t){_e=null;break}if(n=e.sibling,n!==null){n.return=e.return,_e=n;break}_e=e.return}}function ig(t){for(;_e!==null;){var e=_e;if(e===t){_e=null;break}var n=e.sibling;if(n!==null){n.return=e.return,_e=n;break}_e=e.return}}function rg(t){for(;_e!==null;){var e=_e;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{cu(4,e)}catch(l){Mt(e,n,l)}break;case 1:var i=e.stateNode;if(typeof i.componentDidMount=="function"){var r=e.return;try{i.componentDidMount()}catch(l){Mt(e,r,l)}}var s=e.return;try{Od(e)}catch(l){Mt(e,s,l)}break;case 5:var o=e.return;try{Od(e)}catch(l){Mt(e,o,l)}}}catch(l){Mt(e,e.return,l)}if(e===t){_e=null;break}var a=e.sibling;if(a!==null){a.return=e.return,_e=a;break}_e=e.return}}var AT=Math.ceil,Dc=Ji.ReactCurrentDispatcher,Wp=Ji.ReactCurrentOwner,Gn=Ji.ReactCurrentBatchConfig,qe=0,Ht=null,It=null,qt=0,bn=0,Ys=Nr(0),kt=0,Ca=null,us=0,uu=0,jp=0,oa=null,xn=null,Xp=0,ho=1/0,Oi=null,Lc=!1,zd=null,wr=null,fl=!1,xr=null,Ic=0,aa=0,Gd=null,Kl=-1,Zl=0;function fn(){return qe&6?bt():Kl!==-1?Kl:Kl=bt()}function Ar(t){return t.mode&1?qe&2&&qt!==0?qt&-qt:cT.transition!==null?(Zl===0&&(Zl=fy()),Zl):(t=nt,t!==0||(t=window.event,t=t===void 0?16:vy(t.type)),t):1}function oi(t,e,n,i){if(50<aa)throw aa=0,Gd=null,Error(ie(185));Fa(t,n,i),(!(qe&2)||t!==Ht)&&(t===Ht&&(!(qe&2)&&(uu|=n),kt===4&&pr(t,qt)),Sn(t,i),n===1&&qe===0&&!(e.mode&1)&&(ho=bt()+500,ou&&Ur()))}function Sn(t,e){var n=t.callbackNode;cE(t,e);var i=gc(t,t===Ht?qt:0);if(i===0)n!==null&&h0(n),t.callbackNode=null,t.callbackPriority=0;else if(e=i&-i,t.callbackPriority!==e){if(n!=null&&h0(n),e===1)t.tag===0?lT(sg.bind(null,t)):ky(sg.bind(null,t)),rT(function(){!(qe&6)&&Ur()}),n=null;else{switch(dy(i)){case 1:n=vp;break;case 4:n=cy;break;case 16:n=mc;break;case 536870912:n=uy;break;default:n=mc}n=U_(n,C_.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function C_(t,e){if(Kl=-1,Zl=0,qe&6)throw Error(ie(327));var n=t.callbackNode;if(no()&&t.callbackNode!==n)return null;var i=gc(t,t===Ht?qt:0);if(i===0)return null;if(i&30||i&t.expiredLanes||e)e=Nc(t,i);else{e=i;var r=qe;qe|=2;var s=P_();(Ht!==t||qt!==e)&&(Oi=null,ho=bt()+500,is(t,e));do try{RT();break}catch(a){R_(t,a)}while(!0);Dp(),Dc.current=s,qe=r,It!==null?e=0:(Ht=null,qt=0,e=kt)}if(e!==0){if(e===2&&(r=md(t),r!==0&&(i=r,e=Hd(t,r))),e===1)throw n=Ca,is(t,0),pr(t,i),Sn(t,bt()),n;if(e===6)pr(t,i);else{if(r=t.current.alternate,!(i&30)&&!bT(r)&&(e=Nc(t,i),e===2&&(s=md(t),s!==0&&(i=s,e=Hd(t,s))),e===1))throw n=Ca,is(t,0),pr(t,i),Sn(t,bt()),n;switch(t.finishedWork=r,t.finishedLanes=i,e){case 0:case 1:throw Error(ie(345));case 2:jr(t,xn,Oi);break;case 3:if(pr(t,i),(i&130023424)===i&&(e=Xp+500-bt(),10<e)){if(gc(t,0)!==0)break;if(r=t.suspendedLanes,(r&i)!==i){fn(),t.pingedLanes|=t.suspendedLanes&r;break}t.timeoutHandle=Ed(jr.bind(null,t,xn,Oi),e);break}jr(t,xn,Oi);break;case 4:if(pr(t,i),(i&4194240)===i)break;for(e=t.eventTimes,r=-1;0<i;){var o=31-si(i);s=1<<o,o=e[o],o>r&&(r=o),i&=~s}if(i=r,i=bt()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*AT(i/1960))-i,10<i){t.timeoutHandle=Ed(jr.bind(null,t,xn,Oi),i);break}jr(t,xn,Oi);break;case 5:jr(t,xn,Oi);break;default:throw Error(ie(329))}}}return Sn(t,bt()),t.callbackNode===n?C_.bind(null,t):null}function Hd(t,e){var n=oa;return t.current.memoizedState.isDehydrated&&(is(t,e).flags|=256),t=Nc(t,e),t!==2&&(e=xn,xn=n,e!==null&&Wd(e)),t}function Wd(t){xn===null?xn=t:xn.push.apply(xn,t)}function bT(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var i=0;i<n.length;i++){var r=n[i],s=r.getSnapshot;r=r.value;try{if(!li(s(),r))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function pr(t,e){for(e&=~jp,e&=~uu,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-si(e),i=1<<n;t[n]=-1,e&=~i}}function sg(t){if(qe&6)throw Error(ie(327));no();var e=gc(t,0);if(!(e&1))return Sn(t,bt()),null;var n=Nc(t,e);if(t.tag!==0&&n===2){var i=md(t);i!==0&&(e=i,n=Hd(t,i))}if(n===1)throw n=Ca,is(t,0),pr(t,e),Sn(t,bt()),n;if(n===6)throw Error(ie(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,jr(t,xn,Oi),Sn(t,bt()),null}function Yp(t,e){var n=qe;qe|=1;try{return t(e)}finally{qe=n,qe===0&&(ho=bt()+500,ou&&Ur())}}function fs(t){xr!==null&&xr.tag===0&&!(qe&6)&&no();var e=qe;qe|=1;var n=Gn.transition,i=nt;try{if(Gn.transition=null,nt=1,t)return t()}finally{nt=i,Gn.transition=n,qe=e,!(qe&6)&&Ur()}}function $p(){bn=Ys.current,ht(Ys)}function is(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,iT(n)),It!==null)for(n=It.return;n!==null;){var i=n;switch(Cp(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&Sc();break;case 3:uo(),ht(yn),ht(on),kp();break;case 5:Fp(i);break;case 4:uo();break;case 13:ht(mt);break;case 19:ht(mt);break;case 10:Lp(i.type._context);break;case 22:case 23:$p()}n=n.return}if(Ht=t,It=t=br(t.current,null),qt=bn=e,kt=0,Ca=null,jp=uu=us=0,xn=oa=null,Zr!==null){for(e=0;e<Zr.length;e++)if(n=Zr[e],i=n.interleaved,i!==null){n.interleaved=null;var r=i.next,s=n.pending;if(s!==null){var o=s.next;s.next=r,i.next=o}n.pending=i}Zr=null}return t}function R_(t,e){do{var n=It;try{if(Dp(),Yl.current=Pc,Rc){for(var i=gt.memoizedState;i!==null;){var r=i.queue;r!==null&&(r.pending=null),i=i.next}Rc=!1}if(cs=0,Gt=Ft=gt=null,ra=!1,wa=0,Wp.current=null,n===null||n.return===null){kt=1,Ca=e,It=null;break}e:{var s=t,o=n.return,a=n,l=e;if(e=qt,a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,u=a,d=u.tag;if(!(u.mode&1)&&(d===0||d===11||d===15)){var f=u.alternate;f?(u.updateQueue=f.updateQueue,u.memoizedState=f.memoizedState,u.lanes=f.lanes):(u.updateQueue=null,u.memoizedState=null)}var p=X0(o);if(p!==null){p.flags&=-257,Y0(p,o,a,s,e),p.mode&1&&j0(s,c,e),e=p,l=c;var m=e.updateQueue;if(m===null){var E=new Set;E.add(l),e.updateQueue=E}else m.add(l);break e}else{if(!(e&1)){j0(s,c,e),qp();break e}l=Error(ie(426))}}else if(pt&&a.mode&1){var g=X0(o);if(g!==null){!(g.flags&65536)&&(g.flags|=256),Y0(g,o,a,s,e),Rp(fo(l,a));break e}}s=l=fo(l,a),kt!==4&&(kt=2),oa===null?oa=[s]:oa.push(s),s=o;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var h=d_(s,l,e);B0(s,h);break e;case 1:a=l;var x=s.type,S=s.stateNode;if(!(s.flags&128)&&(typeof x.getDerivedStateFromError=="function"||S!==null&&typeof S.componentDidCatch=="function"&&(wr===null||!wr.has(S)))){s.flags|=65536,e&=-e,s.lanes|=e;var _=h_(s,a,e);B0(s,_);break e}}s=s.return}while(s!==null)}L_(n)}catch(w){e=w,It===n&&n!==null&&(It=n=n.return);continue}break}while(!0)}function P_(){var t=Dc.current;return Dc.current=Pc,t===null?Pc:t}function qp(){(kt===0||kt===3||kt===2)&&(kt=4),Ht===null||!(us&268435455)&&!(uu&268435455)||pr(Ht,qt)}function Nc(t,e){var n=qe;qe|=2;var i=P_();(Ht!==t||qt!==e)&&(Oi=null,is(t,e));do try{CT();break}catch(r){R_(t,r)}while(!0);if(Dp(),qe=n,Dc.current=i,It!==null)throw Error(ie(261));return Ht=null,qt=0,kt}function CT(){for(;It!==null;)D_(It)}function RT(){for(;It!==null&&!eE();)D_(It)}function D_(t){var e=N_(t.alternate,t,bn);t.memoizedProps=t.pendingProps,e===null?L_(t):It=e,Wp.current=null}function L_(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=MT(n,e),n!==null){n.flags&=32767,It=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{kt=6,It=null;return}}else if(n=ST(n,e,bn),n!==null){It=n;return}if(e=e.sibling,e!==null){It=e;return}It=e=t}while(e!==null);kt===0&&(kt=5)}function jr(t,e,n){var i=nt,r=Gn.transition;try{Gn.transition=null,nt=1,PT(t,e,n,i)}finally{Gn.transition=r,nt=i}return null}function PT(t,e,n,i){do no();while(xr!==null);if(qe&6)throw Error(ie(327));n=t.finishedWork;var r=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(ie(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(uE(t,s),t===Ht&&(It=Ht=null,qt=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||fl||(fl=!0,U_(mc,function(){return no(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=Gn.transition,Gn.transition=null;var o=nt;nt=1;var a=qe;qe|=4,Wp.current=null,TT(t,n),A_(n,t),KE(Sd),xc=!!_d,Sd=_d=null,t.current=n,wT(n),tE(),qe=a,nt=o,Gn.transition=s}else t.current=n;if(fl&&(fl=!1,xr=t,Ic=r),s=t.pendingLanes,s===0&&(wr=null),rE(n.stateNode),Sn(t,bt()),e!==null)for(i=t.onRecoverableError,n=0;n<e.length;n++)r=e[n],i(r.value,{componentStack:r.stack,digest:r.digest});if(Lc)throw Lc=!1,t=zd,zd=null,t;return Ic&1&&t.tag!==0&&no(),s=t.pendingLanes,s&1?t===Gd?aa++:(aa=0,Gd=t):aa=0,Ur(),null}function no(){if(xr!==null){var t=dy(Ic),e=Gn.transition,n=nt;try{if(Gn.transition=null,nt=16>t?16:t,xr===null)var i=!1;else{if(t=xr,xr=null,Ic=0,qe&6)throw Error(ie(331));var r=qe;for(qe|=4,_e=t.current;_e!==null;){var s=_e,o=s.child;if(_e.flags&16){var a=s.deletions;if(a!==null){for(var l=0;l<a.length;l++){var c=a[l];for(_e=c;_e!==null;){var u=_e;switch(u.tag){case 0:case 11:case 15:sa(8,u,s)}var d=u.child;if(d!==null)d.return=u,_e=d;else for(;_e!==null;){u=_e;var f=u.sibling,p=u.return;if(E_(u),u===c){_e=null;break}if(f!==null){f.return=p,_e=f;break}_e=p}}}var m=s.alternate;if(m!==null){var E=m.child;if(E!==null){m.child=null;do{var g=E.sibling;E.sibling=null,E=g}while(E!==null)}}_e=s}}if(s.subtreeFlags&2064&&o!==null)o.return=s,_e=o;else e:for(;_e!==null;){if(s=_e,s.flags&2048)switch(s.tag){case 0:case 11:case 15:sa(9,s,s.return)}var h=s.sibling;if(h!==null){h.return=s.return,_e=h;break e}_e=s.return}}var x=t.current;for(_e=x;_e!==null;){o=_e;var S=o.child;if(o.subtreeFlags&2064&&S!==null)S.return=o,_e=S;else e:for(o=x;_e!==null;){if(a=_e,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:cu(9,a)}}catch(w){Mt(a,a.return,w)}if(a===o){_e=null;break e}var _=a.sibling;if(_!==null){_.return=a.return,_e=_;break e}_e=a.return}}if(qe=r,Ur(),Mi&&typeof Mi.onPostCommitFiberRoot=="function")try{Mi.onPostCommitFiberRoot(tu,t)}catch{}i=!0}return i}finally{nt=n,Gn.transition=e}}return!1}function og(t,e,n){e=fo(n,e),e=d_(t,e,1),t=Tr(t,e,1),e=fn(),t!==null&&(Fa(t,1,e),Sn(t,e))}function Mt(t,e,n){if(t.tag===3)og(t,t,n);else for(;e!==null;){if(e.tag===3){og(e,t,n);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(wr===null||!wr.has(i))){t=fo(n,t),t=h_(e,t,1),e=Tr(e,t,1),t=fn(),e!==null&&(Fa(e,1,t),Sn(e,t));break}}e=e.return}}function DT(t,e,n){var i=t.pingCache;i!==null&&i.delete(e),e=fn(),t.pingedLanes|=t.suspendedLanes&n,Ht===t&&(qt&n)===n&&(kt===4||kt===3&&(qt&130023424)===qt&&500>bt()-Xp?is(t,0):jp|=n),Sn(t,e)}function I_(t,e){e===0&&(t.mode&1?(e=tl,tl<<=1,!(tl&130023424)&&(tl=4194304)):e=1);var n=fn();t=qi(t,e),t!==null&&(Fa(t,e,n),Sn(t,n))}function LT(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),I_(t,n)}function IT(t,e){var n=0;switch(t.tag){case 13:var i=t.stateNode,r=t.memoizedState;r!==null&&(n=r.retryLane);break;case 19:i=t.stateNode;break;default:throw Error(ie(314))}i!==null&&i.delete(e),I_(t,n)}var N_;N_=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||yn.current)vn=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return vn=!1,_T(t,e,n);vn=!!(t.flags&131072)}else vn=!1,pt&&e.flags&1048576&&Oy(e,Tc,e.index);switch(e.lanes=0,e.tag){case 2:var i=e.type;ql(t,e),t=e.pendingProps;var r=ao(e,on.current);to(e,n),r=Bp(null,e,i,t,r,n);var s=Vp();return e.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,_n(i)?(s=!0,Mc(e)):s=!1,e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,Np(e),r.updater=lu,e.stateNode=r,r._reactInternals=e,Pd(e,i,t,n),e=Id(null,e,i,!0,s,n)):(e.tag=0,pt&&s&&bp(e),ln(null,e,r,n),e=e.child),e;case 16:i=e.elementType;e:{switch(ql(t,e),t=e.pendingProps,r=i._init,i=r(i._payload),e.type=i,r=e.tag=UT(i),t=ei(i,t),r){case 0:e=Ld(null,e,i,t,n);break e;case 1:e=K0(null,e,i,t,n);break e;case 11:e=$0(null,e,i,t,n);break e;case 14:e=q0(null,e,i,ei(i.type,t),n);break e}throw Error(ie(306,i,""))}return e;case 0:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:ei(i,r),Ld(t,e,i,r,n);case 1:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:ei(i,r),K0(t,e,i,r,n);case 3:e:{if(x_(e),t===null)throw Error(ie(387));i=e.pendingProps,s=e.memoizedState,r=s.element,Wy(t,e),bc(e,i,null,n);var o=e.memoizedState;if(i=o.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){r=fo(Error(ie(423)),e),e=Z0(t,e,i,n,r);break e}else if(i!==r){r=fo(Error(ie(424)),e),e=Z0(t,e,i,n,r);break e}else for(Cn=Er(e.stateNode.containerInfo.firstChild),Rn=e,pt=!0,ni=null,n=Gy(e,null,i,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(lo(),i===r){e=Ki(t,e,n);break e}ln(t,e,i,n)}e=e.child}return e;case 5:return jy(e),t===null&&bd(e),i=e.type,r=e.pendingProps,s=t!==null?t.memoizedProps:null,o=r.children,Md(i,r)?o=null:s!==null&&Md(i,s)&&(e.flags|=32),g_(t,e),ln(t,e,o,n),e.child;case 6:return t===null&&bd(e),null;case 13:return v_(t,e,n);case 4:return Up(e,e.stateNode.containerInfo),i=e.pendingProps,t===null?e.child=co(e,null,i,n):ln(t,e,i,n),e.child;case 11:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:ei(i,r),$0(t,e,i,r,n);case 7:return ln(t,e,e.pendingProps,n),e.child;case 8:return ln(t,e,e.pendingProps.children,n),e.child;case 12:return ln(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(i=e.type._context,r=e.pendingProps,s=e.memoizedProps,o=r.value,ft(wc,i._currentValue),i._currentValue=o,s!==null)if(li(s.value,o)){if(s.children===r.children&&!yn.current){e=Ki(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var a=s.dependencies;if(a!==null){o=s.child;for(var l=a.firstContext;l!==null;){if(l.context===i){if(s.tag===1){l=Wi(-1,n&-n),l.tag=2;var c=s.updateQueue;if(c!==null){c=c.shared;var u=c.pending;u===null?l.next=l:(l.next=u.next,u.next=l),c.pending=l}}s.lanes|=n,l=s.alternate,l!==null&&(l.lanes|=n),Cd(s.return,n,e),a.lanes|=n;break}l=l.next}}else if(s.tag===10)o=s.type===e.type?null:s.child;else if(s.tag===18){if(o=s.return,o===null)throw Error(ie(341));o.lanes|=n,a=o.alternate,a!==null&&(a.lanes|=n),Cd(o,n,e),o=s.sibling}else o=s.child;if(o!==null)o.return=s;else for(o=s;o!==null;){if(o===e){o=null;break}if(s=o.sibling,s!==null){s.return=o.return,o=s;break}o=o.return}s=o}ln(t,e,r.children,n),e=e.child}return e;case 9:return r=e.type,i=e.pendingProps.children,to(e,n),r=jn(r),i=i(r),e.flags|=1,ln(t,e,i,n),e.child;case 14:return i=e.type,r=ei(i,e.pendingProps),r=ei(i.type,r),q0(t,e,i,r,n);case 15:return p_(t,e,e.type,e.pendingProps,n);case 17:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:ei(i,r),ql(t,e),e.tag=1,_n(i)?(t=!0,Mc(e)):t=!1,to(e,n),f_(e,i,r),Pd(e,i,r,n),Id(null,e,i,!0,t,n);case 19:return y_(t,e,n);case 22:return m_(t,e,n)}throw Error(ie(156,e.tag))};function U_(t,e){return ly(t,e)}function NT(t,e,n,i){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Vn(t,e,n,i){return new NT(t,e,n,i)}function Kp(t){return t=t.prototype,!(!t||!t.isReactComponent)}function UT(t){if(typeof t=="function")return Kp(t)?1:0;if(t!=null){if(t=t.$$typeof,t===mp)return 11;if(t===gp)return 14}return 2}function br(t,e){var n=t.alternate;return n===null?(n=Vn(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function Ql(t,e,n,i,r,s){var o=2;if(i=t,typeof t=="function")Kp(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case ks:return rs(n.children,r,s,e);case pp:o=8,r|=8;break;case ed:return t=Vn(12,n,e,r|2),t.elementType=ed,t.lanes=s,t;case td:return t=Vn(13,n,e,r),t.elementType=td,t.lanes=s,t;case nd:return t=Vn(19,n,e,r),t.elementType=nd,t.lanes=s,t;case jv:return fu(n,r,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case Hv:o=10;break e;case Wv:o=9;break e;case mp:o=11;break e;case gp:o=14;break e;case fr:o=16,i=null;break e}throw Error(ie(130,t==null?t:typeof t,""))}return e=Vn(o,n,e,r),e.elementType=t,e.type=i,e.lanes=s,e}function rs(t,e,n,i){return t=Vn(7,t,i,e),t.lanes=n,t}function fu(t,e,n,i){return t=Vn(22,t,i,e),t.elementType=jv,t.lanes=n,t.stateNode={isHidden:!1},t}function Qu(t,e,n){return t=Vn(6,t,null,e),t.lanes=n,t}function Ju(t,e,n){return e=Vn(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function FT(t,e,n,i,r){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Iu(0),this.expirationTimes=Iu(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Iu(0),this.identifierPrefix=i,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function Zp(t,e,n,i,r,s,o,a,l){return t=new FT(t,e,n,a,l),e===1?(e=1,s===!0&&(e|=8)):e=0,s=Vn(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:i,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Np(s),t}function kT(t,e,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Fs,key:i==null?null:""+i,children:t,containerInfo:e,implementation:n}}function F_(t){if(!t)return Rr;t=t._reactInternals;e:{if(gs(t)!==t||t.tag!==1)throw Error(ie(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(_n(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(ie(171))}if(t.tag===1){var n=t.type;if(_n(n))return Fy(t,n,e)}return e}function k_(t,e,n,i,r,s,o,a,l){return t=Zp(n,i,!0,t,r,s,o,a,l),t.context=F_(null),n=t.current,i=fn(),r=Ar(n),s=Wi(i,r),s.callback=e??null,Tr(n,s,r),t.current.lanes=r,Fa(t,r,i),Sn(t,i),t}function du(t,e,n,i){var r=e.current,s=fn(),o=Ar(r);return n=F_(n),e.context===null?e.context=n:e.pendingContext=n,e=Wi(s,o),e.payload={element:t},i=i===void 0?null:i,i!==null&&(e.callback=i),t=Tr(r,e,o),t!==null&&(oi(t,r,o,s),Xl(t,r,o)),o}function Uc(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function ag(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function Qp(t,e){ag(t,e),(t=t.alternate)&&ag(t,e)}function OT(){return null}var O_=typeof reportError=="function"?reportError:function(t){console.error(t)};function Jp(t){this._internalRoot=t}hu.prototype.render=Jp.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(ie(409));du(t,e,null,null)};hu.prototype.unmount=Jp.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;fs(function(){du(null,t,null,null)}),e[$i]=null}};function hu(t){this._internalRoot=t}hu.prototype.unstable_scheduleHydration=function(t){if(t){var e=my();t={blockedOn:null,target:t,priority:e};for(var n=0;n<hr.length&&e!==0&&e<hr[n].priority;n++);hr.splice(n,0,t),n===0&&xy(t)}};function em(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function pu(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function lg(){}function BT(t,e,n,i,r){if(r){if(typeof i=="function"){var s=i;i=function(){var c=Uc(o);s.call(c)}}var o=k_(e,i,t,0,null,!1,!1,"",lg);return t._reactRootContainer=o,t[$i]=o.current,_a(t.nodeType===8?t.parentNode:t),fs(),o}for(;r=t.lastChild;)t.removeChild(r);if(typeof i=="function"){var a=i;i=function(){var c=Uc(l);a.call(c)}}var l=Zp(t,0,!1,null,null,!1,!1,"",lg);return t._reactRootContainer=l,t[$i]=l.current,_a(t.nodeType===8?t.parentNode:t),fs(function(){du(e,l,n,i)}),l}function mu(t,e,n,i,r){var s=n._reactRootContainer;if(s){var o=s;if(typeof r=="function"){var a=r;r=function(){var l=Uc(o);a.call(l)}}du(e,o,t,r)}else o=BT(n,e,t,r,i);return Uc(o)}hy=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=Yo(e.pendingLanes);n!==0&&(yp(e,n|1),Sn(e,bt()),!(qe&6)&&(ho=bt()+500,Ur()))}break;case 13:fs(function(){var i=qi(t,1);if(i!==null){var r=fn();oi(i,t,1,r)}}),Qp(t,1)}};_p=function(t){if(t.tag===13){var e=qi(t,134217728);if(e!==null){var n=fn();oi(e,t,134217728,n)}Qp(t,134217728)}};py=function(t){if(t.tag===13){var e=Ar(t),n=qi(t,e);if(n!==null){var i=fn();oi(n,t,e,i)}Qp(t,e)}};my=function(){return nt};gy=function(t,e){var n=nt;try{return nt=t,e()}finally{nt=n}};dd=function(t,e,n){switch(e){case"input":if(sd(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var i=n[e];if(i!==t&&i.form===t.form){var r=su(i);if(!r)throw Error(ie(90));Yv(i),sd(i,r)}}}break;case"textarea":qv(t,n);break;case"select":e=n.value,e!=null&&Zs(t,!!n.multiple,e,!1)}};ny=Yp;iy=fs;var VT={usingClientEntryPoint:!1,Events:[Oa,zs,su,ey,ty,Yp]},Uo={findFiberByHostInstance:Kr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},zT={bundleType:Uo.bundleType,version:Uo.version,rendererPackageName:Uo.rendererPackageName,rendererConfig:Uo.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Ji.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=oy(t),t===null?null:t.stateNode},findFiberByHostInstance:Uo.findFiberByHostInstance||OT,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var dl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!dl.isDisabled&&dl.supportsFiber)try{tu=dl.inject(zT),Mi=dl}catch{}}Dn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=VT;Dn.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!em(e))throw Error(ie(200));return kT(t,e,null,n)};Dn.createRoot=function(t,e){if(!em(t))throw Error(ie(299));var n=!1,i="",r=O_;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=Zp(t,1,!1,null,null,n,!1,i,r),t[$i]=e.current,_a(t.nodeType===8?t.parentNode:t),new Jp(e)};Dn.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(ie(188)):(t=Object.keys(t).join(","),Error(ie(268,t)));return t=oy(e),t=t===null?null:t.stateNode,t};Dn.flushSync=function(t){return fs(t)};Dn.hydrate=function(t,e,n){if(!pu(e))throw Error(ie(200));return mu(null,t,e,!0,n)};Dn.hydrateRoot=function(t,e,n){if(!em(t))throw Error(ie(405));var i=n!=null&&n.hydratedSources||null,r=!1,s="",o=O_;if(n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=k_(e,null,t,1,n??null,r,!1,s,o),t[$i]=e.current,_a(t),i)for(t=0;t<i.length;t++)n=i[t],r=n._getVersion,r=r(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,r]:e.mutableSourceEagerHydrationData.push(n,r);return new hu(e)};Dn.render=function(t,e,n){if(!pu(e))throw Error(ie(200));return mu(null,t,e,!1,n)};Dn.unmountComponentAtNode=function(t){if(!pu(t))throw Error(ie(40));return t._reactRootContainer?(fs(function(){mu(null,null,t,!1,function(){t._reactRootContainer=null,t[$i]=null})}),!0):!1};Dn.unstable_batchedUpdates=Yp;Dn.unstable_renderSubtreeIntoContainer=function(t,e,n,i){if(!pu(n))throw Error(ie(200));if(t==null||t._reactInternals===void 0)throw Error(ie(38));return mu(t,e,n,!1,i)};Dn.version="18.3.1-next-f1338f8080-20240426";function B_(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(B_)}catch(t){console.error(t)}}B_(),Bv.exports=Dn;var GT=Bv.exports,cg=GT;Qf.createRoot=cg.createRoot,Qf.hydrateRoot=cg.hydrateRoot;/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V_=(...t)=>t.filter((e,n,i)=>!!e&&e.trim()!==""&&i.indexOf(e)===n).join(" ").trim();/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const HT=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const WT=t=>t.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,n,i)=>i?i.toUpperCase():n.toLowerCase());/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ug=t=>{const e=WT(t);return e.charAt(0).toUpperCase()+e.slice(1)};/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var ef={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jT=t=>{for(const e in t)if(e.startsWith("aria-")||e==="role"||e==="title")return!0;return!1},XT=Se.createContext({}),YT=()=>Se.useContext(XT),$T=Se.forwardRef(({color:t,size:e,strokeWidth:n,absoluteStrokeWidth:i,className:r="",children:s,iconNode:o,...a},l)=>{const{size:c=24,strokeWidth:u=2,absoluteStrokeWidth:d=!1,color:f="currentColor",className:p=""}=YT()??{},m=i??d?Number(n??u)*24/Number(e??c):n??u;return Se.createElement("svg",{ref:l,...ef,width:e??c??ef.width,height:e??c??ef.height,stroke:t??f,strokeWidth:m,className:V_("lucide",p,r),...!s&&!jT(a)&&{"aria-hidden":"true"},...a},[...o.map(([E,g])=>Se.createElement(E,g)),...Array.isArray(s)?s:[s]])});/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fr=(t,e)=>{const n=Se.forwardRef(({className:i,...r},s)=>Se.createElement($T,{ref:s,iconNode:e,className:V_(`lucide-${HT(ug(t))}`,`lucide-${t}`,i),...r}));return n.displayName=ug(t),n};/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qT=[["path",{d:"m5 12 7-7 7 7",key:"hav0vg"}],["path",{d:"M12 19V5",key:"x0mq9r"}]],KT=Fr("arrow-up",qT);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ZT=[["path",{d:"M10.268 21a2 2 0 0 0 3.464 0",key:"vwvbt9"}],["path",{d:"M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",key:"11g9vi"}]],QT=Fr("bell",ZT);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const JT=[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]],ew=Fr("file-text",JT);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tw=[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"r6nss1"}]],nw=Fr("house",tw);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const iw=[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]],rw=Fr("search",iw);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sw=[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",key:"1s2grr"}],["path",{d:"M20 2v4",key:"1rf3ol"}],["path",{d:"M22 4h-4",key:"gwowj6"}],["circle",{cx:"4",cy:"20",r:"2",key:"6kqj1y"}]],ow=Fr("sparkles",sw);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const aw=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]],lw=Fr("user",aw);/**
 * @license lucide-react v1.39.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cw=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["path",{d:"M16 3.128a4 4 0 0 1 0 7.744",key:"16gr8j"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]],uw=Fr("users",cw);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const tm="185",fw=0,fg=1,dw=2,Jl=1,hw=2,qo=3,Pr=0,Mn=1,Vi=2,ji=0,io=1,jd=2,dg=3,hg=4,pw=5,$r=100,mw=101,gw=102,xw=103,vw=104,yw=200,_w=201,Sw=202,Mw=203,Xd=204,Yd=205,Ew=206,Tw=207,ww=208,Aw=209,bw=210,Cw=211,Rw=212,Pw=213,Dw=214,$d=0,qd=1,Kd=2,po=3,Zd=4,Qd=5,Jd=6,eh=7,z_=0,Lw=1,Iw=2,Ti=0,G_=1,H_=2,W_=3,j_=4,X_=5,Y_=6,$_=7,q_=300,ds=301,mo=302,tf=303,nf=304,gu=306,th=1e3,Hi=1001,nh=1002,Yt=1003,Nw=1004,hl=1005,rn=1006,rf=1007,Jr=1008,Bn=1009,K_=1010,Z_=1011,Ra=1012,nm=1013,Ci=1014,_i=1015,Zi=1016,im=1017,rm=1018,Pa=1020,Q_=35902,J_=35899,eS=1021,tS=1022,ri=1023,Qi=1026,es=1027,nS=1028,sm=1029,hs=1030,om=1031,am=1033,ec=33776,tc=33777,nc=33778,ic=33779,ih=35840,rh=35841,sh=35842,oh=35843,ah=36196,lh=37492,ch=37496,uh=37488,fh=37489,Fc=37490,dh=37491,hh=37808,ph=37809,mh=37810,gh=37811,xh=37812,vh=37813,yh=37814,_h=37815,Sh=37816,Mh=37817,Eh=37818,Th=37819,wh=37820,Ah=37821,bh=36492,Ch=36494,Rh=36495,Ph=36283,Dh=36284,kc=36285,Lh=36286,Uw=3200,pg=0,Fw=1,mr="",Un="srgb",Oc="srgb-linear",Bc="linear",tt="srgb",Ss=7680,mg=519,kw=512,Ow=513,Bw=514,lm=515,Vw=516,zw=517,cm=518,Gw=519,gg=35044,xg="300 es",Si=2e3,Vc=2001;function Hw(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function zc(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function Ww(){const t=zc("canvas");return t.style.display="block",t}const vg={};function yg(...t){const e="THREE."+t.shift();console.log(e,...t)}function iS(t){const e=t[0];if(typeof e=="string"&&e.startsWith("TSL:")){const n=t[1];n&&n.isStackTrace?t[0]+=" "+n.getLocation():t[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return t}function Le(...t){t=iS(t);const e="THREE."+t.shift();{const n=t[0];n&&n.isStackTrace?console.warn(n.getError(e)):console.warn(e,...t)}}function $e(...t){t=iS(t);const e="THREE."+t.shift();{const n=t[0];n&&n.isStackTrace?console.error(n.getError(e)):console.error(e,...t)}}function ro(...t){const e=t.join(" ");e in vg||(vg[e]=!0,Le(...t))}function jw(t,e,n){return new Promise(function(i,r){function s(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:r();break;case t.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}const Xw={[$d]:qd,[Kd]:Jd,[Zd]:eh,[po]:Qd,[qd]:$d,[Jd]:Kd,[eh]:Zd,[Qd]:po};class xs{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const n=this._listeners;if(n===void 0)return;const i=n[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const en=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],sf=Math.PI/180,Ih=180/Math.PI;function Va(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(en[t&255]+en[t>>8&255]+en[t>>16&255]+en[t>>24&255]+"-"+en[e&255]+en[e>>8&255]+"-"+en[e>>16&15|64]+en[e>>24&255]+"-"+en[n&63|128]+en[n>>8&255]+"-"+en[n>>16&255]+en[n>>24&255]+en[i&255]+en[i>>8&255]+en[i>>16&255]+en[i>>24&255]).toLowerCase()}function je(t,e,n){return Math.max(e,Math.min(n,t))}function Yw(t,e){return(t%e+e)%e}function of(t,e,n){return(1-n)*t+n*e}function Fo(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function gn(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const zm=class zm{constructor(e=0,n=0){this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=je(this.x,e.x,n.x),this.y=je(this.y,e.y,n.y),this}clampScalar(e,n){return this.x=je(this.x,e,n),this.y=je(this.y,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(je(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(je(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};zm.prototype.isVector2=!0;let Qe=zm;class Eo{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,s,o,a){let l=i[r+0],c=i[r+1],u=i[r+2],d=i[r+3],f=s[o+0],p=s[o+1],m=s[o+2],E=s[o+3];if(d!==E||l!==f||c!==p||u!==m){let g=l*f+c*p+u*m+d*E;g<0&&(f=-f,p=-p,m=-m,E=-E,g=-g);let h=1-a;if(g<.9995){const x=Math.acos(g),S=Math.sin(x);h=Math.sin(h*x)/S,a=Math.sin(a*x)/S,l=l*h+f*a,c=c*h+p*a,u=u*h+m*a,d=d*h+E*a}else{l=l*h+f*a,c=c*h+p*a,u=u*h+m*a,d=d*h+E*a;const x=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=x,c*=x,u*=x,d*=x}}e[n]=l,e[n+1]=c,e[n+2]=u,e[n+3]=d}static multiplyQuaternionsFlat(e,n,i,r,s,o){const a=i[r],l=i[r+1],c=i[r+2],u=i[r+3],d=s[o],f=s[o+1],p=s[o+2],m=s[o+3];return e[n]=a*m+u*d+l*p-c*f,e[n+1]=l*m+u*f+c*d-a*p,e[n+2]=c*m+u*p+a*f-l*d,e[n+3]=u*m-a*d-l*f-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(r/2),d=a(s/2),f=l(i/2),p=l(r/2),m=l(s/2);switch(o){case"XYZ":this._x=f*u*d+c*p*m,this._y=c*p*d-f*u*m,this._z=c*u*m+f*p*d,this._w=c*u*d-f*p*m;break;case"YXZ":this._x=f*u*d+c*p*m,this._y=c*p*d-f*u*m,this._z=c*u*m-f*p*d,this._w=c*u*d+f*p*m;break;case"ZXY":this._x=f*u*d-c*p*m,this._y=c*p*d+f*u*m,this._z=c*u*m+f*p*d,this._w=c*u*d-f*p*m;break;case"ZYX":this._x=f*u*d-c*p*m,this._y=c*p*d+f*u*m,this._z=c*u*m-f*p*d,this._w=c*u*d+f*p*m;break;case"YZX":this._x=f*u*d+c*p*m,this._y=c*p*d+f*u*m,this._z=c*u*m-f*p*d,this._w=c*u*d-f*p*m;break;case"XZY":this._x=f*u*d-c*p*m,this._y=c*p*d-f*u*m,this._z=c*u*m+f*p*d,this._w=c*u*d+f*p*m;break;default:Le("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],r=n[4],s=n[8],o=n[1],a=n[5],l=n[9],c=n[2],u=n[6],d=n[10],f=i+a+d;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(u-l)*p,this._y=(s-c)*p,this._z=(o-r)*p}else if(i>a&&i>d){const p=2*Math.sqrt(1+i-a-d);this._w=(u-l)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(s+c)/p}else if(a>d){const p=2*Math.sqrt(1+a-i-d);this._w=(s-c)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+d-i-a);this._w=(o-r)/p,this._x=(s+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(je(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,r=e._y,s=e._z,o=e._w,a=n._x,l=n._y,c=n._z,u=n._w;return this._x=i*u+o*a+r*c-s*l,this._y=r*u+o*l+s*a-i*c,this._z=s*u+o*c+i*l-r*a,this._w=o*u-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,n){let i=e._x,r=e._y,s=e._z,o=e._w,a=this.dot(e);a<0&&(i=-i,r=-r,s=-s,o=-o,a=-a);let l=1-n;if(a<.9995){const c=Math.acos(a),u=Math.sin(c);l=Math.sin(l*c)/u,n=Math.sin(n*c)/u,this._x=this._x*l+i*n,this._y=this._y*l+r*n,this._z=this._z*l+s*n,this._w=this._w*l+o*n,this._onChangeCallback()}else this._x=this._x*l+i*n,this._y=this._y*l+r*n,this._z=this._z*l+s*n,this._w=this._w*l+o*n,this.normalize();return this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(n),s*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Gm=class Gm{constructor(e=0,n=0,i=0){this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(_g.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(_g.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const n=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*i),u=2*(a*n-s*r),d=2*(s*i-o*n);return this.x=n+l*c+o*d-a*u,this.y=i+l*u+a*c-s*d,this.z=r+l*d+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=je(this.x,e.x,n.x),this.y=je(this.y,e.y,n.y),this.z=je(this.z,e.z,n.z),this}clampScalar(e,n){return this.x=je(this.x,e,n),this.y=je(this.y,e,n),this.z=je(this.z,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(je(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,r=e.y,s=e.z,o=n.x,a=n.y,l=n.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return af.copy(this).projectOnVector(e),this.sub(af)}reflect(e){return this.sub(af.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(je(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Gm.prototype.isVector3=!0;let B=Gm;const af=new B,_g=new Eo,Hm=class Hm{constructor(e,n,i,r,s,o,a,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,l,c)}set(e,n,i,r,s,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=n,u[4]=s,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],d=i[7],f=i[2],p=i[5],m=i[8],E=r[0],g=r[3],h=r[6],x=r[1],S=r[4],_=r[7],w=r[2],b=r[5],A=r[8];return s[0]=o*E+a*x+l*w,s[3]=o*g+a*S+l*b,s[6]=o*h+a*_+l*A,s[1]=c*E+u*x+d*w,s[4]=c*g+u*S+d*b,s[7]=c*h+u*_+d*A,s[2]=f*E+p*x+m*w,s[5]=f*g+p*S+m*b,s[8]=f*h+p*_+m*A,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return n*o*u-n*a*c-i*s*u+i*a*l+r*s*c-r*o*l}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=u*o-a*c,f=a*l-u*s,p=c*s-o*l,m=n*d+i*f+r*p;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const E=1/m;return e[0]=d*E,e[1]=(r*c-u*i)*E,e[2]=(a*i-r*o)*E,e[3]=f*E,e[4]=(u*n-r*l)*E,e[5]=(r*s-a*n)*E,e[6]=p*E,e[7]=(i*l-c*n)*E,e[8]=(o*n-i*s)*E,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+n,0,0,1),this}scale(e,n){return ro("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(lf.makeScale(e,n)),this}rotate(e){return ro("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(lf.makeRotation(-e)),this}translate(e,n){return ro("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(lf.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Hm.prototype.isMatrix3=!0;let Ne=Hm;const lf=new Ne,Sg=new Ne().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Mg=new Ne().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function $w(){const t={enabled:!0,workingColorSpace:Oc,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===tt&&(r.r=Xi(r.r),r.g=Xi(r.g),r.b=Xi(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===tt&&(r.r=so(r.r),r.g=so(r.g),r.b=so(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===mr?Bc:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return ro("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),t.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return ro("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),t.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return t.define({[Oc]:{primaries:e,whitePoint:i,transfer:Bc,toXYZ:Sg,fromXYZ:Mg,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Un},outputColorSpaceConfig:{drawingBufferColorSpace:Un}},[Un]:{primaries:e,whitePoint:i,transfer:tt,toXYZ:Sg,fromXYZ:Mg,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Un}}}),t}const We=$w();function Xi(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function so(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let Ms;class qw{static getDataURL(e,n="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Ms===void 0&&(Ms=zc("canvas")),Ms.width=e.width,Ms.height=e.height;const r=Ms.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Ms}return i.toDataURL(n)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=zc("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Xi(s[o]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Xi(n[i]/255)*255):n[i]=Xi(n[i]);return{data:n,width:e.width,height:e.height}}else return Le("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Kw=0;class um{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Kw++}),this.uuid=Va(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?e.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?e.set(n.displayWidth,n.displayHeight,0):n!==null?e.set(n.width,n.height,n.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(cf(r[o].image)):s.push(cf(r[o]))}else s=cf(r);i.url=s}return n||(e.images[this.uuid]=i),i}}function cf(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?qw.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(Le("Texture: Unable to serialize Texture."),{})}let Zw=0;const uf=new B;class dn extends xs{constructor(e=dn.DEFAULT_IMAGE,n=dn.DEFAULT_MAPPING,i=Hi,r=Hi,s=rn,o=Jr,a=ri,l=Bn,c=dn.DEFAULT_ANISOTROPY,u=mr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Zw++}),this.uuid=Va(),this.name="",this.source=new um(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Qe(0,0),this.repeat=new Qe(1,1),this.center=new Qe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ne,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(uf).x}get height(){return this.source.getSize(uf).y}get depth(){return this.source.getSize(uf).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const n in e){const i=e[n];if(i===void 0){Le(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){Le(`Texture.setValues(): property '${n}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==q_)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case th:e.x=e.x-Math.floor(e.x);break;case Hi:e.x=e.x<0?0:1;break;case nh:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case th:e.y=e.y-Math.floor(e.y);break;case Hi:e.y=e.y<0?0:1;break;case nh:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}dn.DEFAULT_IMAGE=null;dn.DEFAULT_MAPPING=q_;dn.DEFAULT_ANISOTROPY=1;const Wm=class Wm{constructor(e=0,n=0,i=0,r=1){this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*n+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*n+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*n+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*n+o[7]*i+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,s;const l=e.elements,c=l[0],u=l[4],d=l[8],f=l[1],p=l[5],m=l[9],E=l[2],g=l[6],h=l[10];if(Math.abs(u-f)<.01&&Math.abs(d-E)<.01&&Math.abs(m-g)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+E)<.1&&Math.abs(m+g)<.1&&Math.abs(c+p+h-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const S=(c+1)/2,_=(p+1)/2,w=(h+1)/2,b=(u+f)/4,A=(d+E)/4,y=(m+g)/4;return S>_&&S>w?S<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(S),r=b/i,s=A/i):_>w?_<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(_),i=b/r,s=y/r):w<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(w),i=A/s,r=y/s),this.set(i,r,s,n),this}let x=Math.sqrt((g-m)*(g-m)+(d-E)*(d-E)+(f-u)*(f-u));return Math.abs(x)<.001&&(x=1),this.x=(g-m)/x,this.y=(d-E)/x,this.z=(f-u)/x,this.w=Math.acos((c+p+h-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=je(this.x,e.x,n.x),this.y=je(this.y,e.y,n.y),this.z=je(this.z,e.z,n.z),this.w=je(this.w,e.w,n.w),this}clampScalar(e,n){return this.x=je(this.x,e,n),this.y=je(this.y,e,n),this.z=je(this.z,e,n),this.w=je(this.w,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(je(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Wm.prototype.isVector4=!0;let Et=Wm;class Qw extends xs{constructor(e=1,n=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:rn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=i.depth,this.scissor=new Et(0,0,e,n),this.scissorTest=!1,this.viewport=new Et(0,0,e,n),this.textures=[];const r={width:e,height:n,depth:i.depth},s=new dn(r),o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const n={minFilter:rn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(n.mapping=e.mapping),e.wrapS!==void 0&&(n.wrapS=e.wrapS),e.wrapT!==void 0&&(n.wrapT=e.wrapT),e.wrapR!==void 0&&(n.wrapR=e.wrapR),e.magFilter!==void 0&&(n.magFilter=e.magFilter),e.minFilter!==void 0&&(n.minFilter=e.minFilter),e.format!==void 0&&(n.format=e.format),e.type!==void 0&&(n.type=e.type),e.anisotropy!==void 0&&(n.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(n.colorSpace=e.colorSpace),e.flipY!==void 0&&(n.flipY=e.flipY),e.generateMipmaps!==void 0&&(n.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(n.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(n)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=n,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++){this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const r=Object.assign({},e.textures[n].image);this.textures[n].source=new um(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class wi extends Qw{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class rS extends dn{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Yt,this.minFilter=Yt,this.wrapR=Hi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Jw extends dn{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Yt,this.minFilter=Yt,this.wrapR=Hi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Jc=class Jc{constructor(e,n,i,r,s,o,a,l,c,u,d,f,p,m,E,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,l,c,u,d,f,p,m,E,g)}set(e,n,i,r,s,o,a,l,c,u,d,f,p,m,E,g){const h=this.elements;return h[0]=e,h[4]=n,h[8]=i,h[12]=r,h[1]=s,h[5]=o,h[9]=a,h[13]=l,h[2]=c,h[6]=u,h[10]=d,h[14]=f,h[3]=p,h[7]=m,h[11]=E,h[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Jc().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return this.determinantAffine()===0?(e.set(1,0,0),n.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const n=this.elements,i=e.elements,r=1/Es.setFromMatrixColumn(e,0).length(),s=1/Es.setFromMatrixColumn(e,1).length(),o=1/Es.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*o,n[9]=i[9]*o,n[10]=i[10]*o,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const f=o*u,p=o*d,m=a*u,E=a*d;n[0]=l*u,n[4]=-l*d,n[8]=c,n[1]=p+m*c,n[5]=f-E*c,n[9]=-a*l,n[2]=E-f*c,n[6]=m+p*c,n[10]=o*l}else if(e.order==="YXZ"){const f=l*u,p=l*d,m=c*u,E=c*d;n[0]=f+E*a,n[4]=m*a-p,n[8]=o*c,n[1]=o*d,n[5]=o*u,n[9]=-a,n[2]=p*a-m,n[6]=E+f*a,n[10]=o*l}else if(e.order==="ZXY"){const f=l*u,p=l*d,m=c*u,E=c*d;n[0]=f-E*a,n[4]=-o*d,n[8]=m+p*a,n[1]=p+m*a,n[5]=o*u,n[9]=E-f*a,n[2]=-o*c,n[6]=a,n[10]=o*l}else if(e.order==="ZYX"){const f=o*u,p=o*d,m=a*u,E=a*d;n[0]=l*u,n[4]=m*c-p,n[8]=f*c+E,n[1]=l*d,n[5]=E*c+f,n[9]=p*c-m,n[2]=-c,n[6]=a*l,n[10]=o*l}else if(e.order==="YZX"){const f=o*l,p=o*c,m=a*l,E=a*c;n[0]=l*u,n[4]=E-f*d,n[8]=m*d+p,n[1]=d,n[5]=o*u,n[9]=-a*u,n[2]=-c*u,n[6]=p*d+m,n[10]=f-E*d}else if(e.order==="XZY"){const f=o*l,p=o*c,m=a*l,E=a*c;n[0]=l*u,n[4]=-d,n[8]=c*u,n[1]=f*d+E,n[5]=o*u,n[9]=p*d-m,n[2]=m*d-p,n[6]=a*u,n[10]=E*d+f}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(e2,e,t2)}lookAt(e,n,i){const r=this.elements;return wn.subVectors(e,n),wn.lengthSq()===0&&(wn.z=1),wn.normalize(),rr.crossVectors(i,wn),rr.lengthSq()===0&&(Math.abs(i.z)===1?wn.x+=1e-4:wn.z+=1e-4,wn.normalize(),rr.crossVectors(i,wn)),rr.normalize(),pl.crossVectors(wn,rr),r[0]=rr.x,r[4]=pl.x,r[8]=wn.x,r[1]=rr.y,r[5]=pl.y,r[9]=wn.y,r[2]=rr.z,r[6]=pl.z,r[10]=wn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],d=i[5],f=i[9],p=i[13],m=i[2],E=i[6],g=i[10],h=i[14],x=i[3],S=i[7],_=i[11],w=i[15],b=r[0],A=r[4],y=r[8],C=r[12],P=r[1],D=r[5],F=r[9],X=r[13],ee=r[2],O=r[6],q=r[10],z=r[14],L=r[3],W=r[7],Z=r[11],ne=r[15];return s[0]=o*b+a*P+l*ee+c*L,s[4]=o*A+a*D+l*O+c*W,s[8]=o*y+a*F+l*q+c*Z,s[12]=o*C+a*X+l*z+c*ne,s[1]=u*b+d*P+f*ee+p*L,s[5]=u*A+d*D+f*O+p*W,s[9]=u*y+d*F+f*q+p*Z,s[13]=u*C+d*X+f*z+p*ne,s[2]=m*b+E*P+g*ee+h*L,s[6]=m*A+E*D+g*O+h*W,s[10]=m*y+E*F+g*q+h*Z,s[14]=m*C+E*X+g*z+h*ne,s[3]=x*b+S*P+_*ee+w*L,s[7]=x*A+S*D+_*O+w*W,s[11]=x*y+S*F+_*q+w*Z,s[15]=x*C+S*X+_*z+w*ne,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],d=e[6],f=e[10],p=e[14],m=e[3],E=e[7],g=e[11],h=e[15],x=l*p-c*f,S=a*p-c*d,_=a*f-l*d,w=o*p-c*u,b=o*f-l*u,A=o*d-a*u;return n*(E*x-g*S+h*_)-i*(m*x-g*w+h*b)+r*(m*S-E*w+h*A)-s*(m*_-E*b+g*A)}determinantAffine(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[1],o=e[5],a=e[9],l=e[2],c=e[6],u=e[10];return n*(o*u-a*c)-i*(s*u-a*l)+r*(s*c-o*l)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=e[9],f=e[10],p=e[11],m=e[12],E=e[13],g=e[14],h=e[15],x=n*a-i*o,S=n*l-r*o,_=n*c-s*o,w=i*l-r*a,b=i*c-s*a,A=r*c-s*l,y=u*E-d*m,C=u*g-f*m,P=u*h-p*m,D=d*g-f*E,F=d*h-p*E,X=f*h-p*g,ee=x*X-S*F+_*D+w*P-b*C+A*y;if(ee===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const O=1/ee;return e[0]=(a*X-l*F+c*D)*O,e[1]=(r*F-i*X-s*D)*O,e[2]=(E*A-g*b+h*w)*O,e[3]=(f*b-d*A-p*w)*O,e[4]=(l*P-o*X-c*C)*O,e[5]=(n*X-r*P+s*C)*O,e[6]=(g*_-m*A-h*S)*O,e[7]=(u*A-f*_+p*S)*O,e[8]=(o*F-a*P+c*y)*O,e[9]=(i*P-n*F-s*y)*O,e[10]=(m*b-E*_+h*x)*O,e[11]=(d*_-u*b-p*x)*O,e[12]=(a*C-o*D-l*y)*O,e[13]=(n*D-i*C+r*y)*O,e[14]=(E*S-m*w-g*x)*O,e[15]=(u*w-d*S+f*x)*O,this}scale(e){const n=this.elements,i=e.x,r=e.y,s=e.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,u*a+i,u*l-r*o,0,c*l-r*a,u*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){const r=this.elements,s=n._x,o=n._y,a=n._z,l=n._w,c=s+s,u=o+o,d=a+a,f=s*c,p=s*u,m=s*d,E=o*u,g=o*d,h=a*d,x=l*c,S=l*u,_=l*d,w=i.x,b=i.y,A=i.z;return r[0]=(1-(E+h))*w,r[1]=(p+_)*w,r[2]=(m-S)*w,r[3]=0,r[4]=(p-_)*b,r[5]=(1-(f+h))*b,r[6]=(g+x)*b,r[7]=0,r[8]=(m+S)*A,r[9]=(g-x)*A,r[10]=(1-(f+E))*A,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinantAffine();if(s===0)return i.set(1,1,1),n.identity(),this;let o=Es.set(r[0],r[1],r[2]).length();const a=Es.set(r[4],r[5],r[6]).length(),l=Es.set(r[8],r[9],r[10]).length();s<0&&(o=-o),qn.copy(this);const c=1/o,u=1/a,d=1/l;return qn.elements[0]*=c,qn.elements[1]*=c,qn.elements[2]*=c,qn.elements[4]*=u,qn.elements[5]*=u,qn.elements[6]*=u,qn.elements[8]*=d,qn.elements[9]*=d,qn.elements[10]*=d,n.setFromRotationMatrix(qn),i.x=o,i.y=a,i.z=l,this}makePerspective(e,n,i,r,s,o,a=Si,l=!1){const c=this.elements,u=2*s/(n-e),d=2*s/(i-r),f=(n+e)/(n-e),p=(i+r)/(i-r);let m,E;if(l)m=s/(o-s),E=o*s/(o-s);else if(a===Si)m=-(o+s)/(o-s),E=-2*o*s/(o-s);else if(a===Vc)m=-o/(o-s),E=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=d,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=E,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,n,i,r,s,o,a=Si,l=!1){const c=this.elements,u=2/(n-e),d=2/(i-r),f=-(n+e)/(n-e),p=-(i+r)/(i-r);let m,E;if(l)m=1/(o-s),E=o/(o-s);else if(a===Si)m=-2/(o-s),E=-(o+s)/(o-s);else if(a===Vc)m=-1/(o-s),E=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=d,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=m,c[14]=E,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}};Jc.prototype.isMatrix4=!0;let Ct=Jc;const Es=new B,qn=new Ct,e2=new B(0,0,0),t2=new B(1,1,1),rr=new B,pl=new B,wn=new B,Eg=new Ct,Tg=new Eo;class ps{constructor(e=0,n=0,i=0,r=ps.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],u=r[9],d=r[2],f=r[6],p=r[10];switch(n){case"XYZ":this._y=Math.asin(je(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-je(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(je(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-je(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(je(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-je(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:Le("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return Eg.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Eg,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return Tg.setFromEuler(this),this.setFromQuaternion(Tg,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ps.DEFAULT_ORDER="XYZ";class sS{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let n2=0;const wg=new B,Ts=new Eo,Li=new Ct,ml=new B,ko=new B,i2=new B,r2=new Eo,Ag=new B(1,0,0),bg=new B(0,1,0),Cg=new B(0,0,1),Rg={type:"added"},s2={type:"removed"},ws={type:"childadded",child:null},ff={type:"childremoved",child:null};class En extends xs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:n2++}),this.uuid=Va(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=En.DEFAULT_UP.clone();const e=new B,n=new ps,i=new Eo,r=new B(1,1,1);function s(){i.setFromEuler(n,!1)}function o(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Ct},normalMatrix:{value:new Ne}}),this.matrix=new Ct,this.matrixWorld=new Ct,this.matrixAutoUpdate=En.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=En.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new sS,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return Ts.setFromAxisAngle(e,n),this.quaternion.multiply(Ts),this}rotateOnWorldAxis(e,n){return Ts.setFromAxisAngle(e,n),this.quaternion.premultiply(Ts),this}rotateX(e){return this.rotateOnAxis(Ag,e)}rotateY(e){return this.rotateOnAxis(bg,e)}rotateZ(e){return this.rotateOnAxis(Cg,e)}translateOnAxis(e,n){return wg.copy(e).applyQuaternion(this.quaternion),this.position.add(wg.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(Ag,e)}translateY(e){return this.translateOnAxis(bg,e)}translateZ(e){return this.translateOnAxis(Cg,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Li.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?ml.copy(e):ml.set(e,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),ko.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Li.lookAt(ko,ml,this.up):Li.lookAt(ml,ko,this.up),this.quaternion.setFromRotationMatrix(Li),r&&(Li.extractRotation(r.matrixWorld),Ts.setFromRotationMatrix(Li),this.quaternion.premultiply(Ts.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?($e("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Rg),ws.child=e,this.dispatchEvent(ws),ws.child=null):$e("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(s2),ff.child=e,this.dispatchEvent(ff),ff.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Li.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Li.multiply(e.parent.matrixWorld)),e.applyMatrix4(Li),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Rg),ws.child=e,this.dispatchEvent(ws),ws.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,n);if(o!==void 0)return o}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ko,e,i2),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ko,r2,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const n=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=n-s[0]*n-s[4]*i-s[8]*r,s[13]+=i-s[1]*n-s[5]*i-s[9]*r,s[14]+=r-s[2]*n-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].updateMatrixWorld(e)}updateWorldMatrix(e,n,i=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),n===!0){const s=this.children;for(let o=0,a=s.length;o<a;o++)s[o].updateWorldMatrix(!1,!0,i)}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(n){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),d=o(e.shapes),f=o(e.skeletons),p=o(e.animations),m=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),f.length>0&&(i.skeletons=f),p.length>0&&(i.animations=p),m.length>0&&(i.nodes=m)}return i.object=r,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}En.DEFAULT_UP=new B(0,1,0);En.DEFAULT_MATRIX_AUTO_UPDATE=!0;En.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Ko extends En{constructor(){super(),this.isGroup=!0,this.type="Group"}}const o2={type:"move"};class df{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ko,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ko,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ko,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const E of e.hand.values()){const g=n.getJointPose(E,i),h=this._getHandJoint(c,E);g!==null&&(h.matrix.fromArray(g.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=g.radius),h.visible=g!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],f=u.position.distanceTo(d.position),p=.02,m=.005;c.inputState.pinching&&f>p+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=p-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));a!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(o2)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new Ko;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}const oS={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},sr={h:0,s:0,l:0},gl={h:0,s:0,l:0};function hf(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class Ke{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=Un){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,We.colorSpaceToWorking(this,n),this}setRGB(e,n,i,r=We.workingColorSpace){return this.r=e,this.g=n,this.b=i,We.colorSpaceToWorking(this,r),this}setHSL(e,n,i,r=We.workingColorSpace){if(e=Yw(e,1),n=je(n,0,1),i=je(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,o=2*i-s;this.r=hf(o,s,e+1/3),this.g=hf(o,s,e),this.b=hf(o,s,e-1/3)}return We.colorSpaceToWorking(this,r),this}setStyle(e,n=Un){function i(s){s!==void 0&&parseFloat(s)<1&&Le("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:Le("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(o===6)return this.setHex(parseInt(s,16),n);Le("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=Un){const i=oS[e.toLowerCase()];return i!==void 0?this.setHex(i,n):Le("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Xi(e.r),this.g=Xi(e.g),this.b=Xi(e.b),this}copyLinearToSRGB(e){return this.r=so(e.r),this.g=so(e.g),this.b=so(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Un){return We.workingToColorSpace(tn.copy(this),e),Math.round(je(tn.r*255,0,255))*65536+Math.round(je(tn.g*255,0,255))*256+Math.round(je(tn.b*255,0,255))}getHexString(e=Un){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=We.workingColorSpace){We.workingToColorSpace(tn.copy(this),n);const i=tn.r,r=tn.g,s=tn.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=u<=.5?d/(o+a):d/(2-o-a),o){case i:l=(r-s)/d+(r<s?6:0);break;case r:l=(s-i)/d+2;break;case s:l=(i-r)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,n=We.workingColorSpace){return We.workingToColorSpace(tn.copy(this),n),e.r=tn.r,e.g=tn.g,e.b=tn.b,e}getStyle(e=Un){We.workingToColorSpace(tn.copy(this),e);const n=tn.r,i=tn.g,r=tn.b;return e!==Un?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(sr),this.setHSL(sr.h+e,sr.s+n,sr.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(sr),e.getHSL(gl);const i=of(sr.h,gl.h,n),r=of(sr.s,gl.s,n),s=of(sr.l,gl.l,n);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const tn=new Ke;Ke.NAMES=oS;class fm{constructor(e,n=1,i=1e3){this.isFog=!0,this.name="",this.color=new Ke(e),this.near=n,this.far=i}clone(){return new fm(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class a2 extends En{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ps,this.environmentIntensity=1,this.environmentRotation=new ps,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}const Kn=new B,Ii=new B,pf=new B,Ni=new B,As=new B,bs=new B,Pg=new B,mf=new B,gf=new B,xf=new B,vf=new Et,yf=new Et,_f=new Et;class ii{constructor(e=new B,n=new B,i=new B){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),Kn.subVectors(e,n),r.cross(Kn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,n,i,r,s){Kn.subVectors(r,n),Ii.subVectors(i,n),pf.subVectors(e,n);const o=Kn.dot(Kn),a=Kn.dot(Ii),l=Kn.dot(pf),c=Ii.dot(Ii),u=Ii.dot(pf),d=o*c-a*a;if(d===0)return s.set(0,0,0),null;const f=1/d,p=(c*l-a*u)*f,m=(o*u-a*l)*f;return s.set(1-p-m,m,p)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,Ni)===null?!1:Ni.x>=0&&Ni.y>=0&&Ni.x+Ni.y<=1}static getInterpolation(e,n,i,r,s,o,a,l){return this.getBarycoord(e,n,i,r,Ni)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Ni.x),l.addScaledVector(o,Ni.y),l.addScaledVector(a,Ni.z),l)}static getInterpolatedAttribute(e,n,i,r,s,o){return vf.setScalar(0),yf.setScalar(0),_f.setScalar(0),vf.fromBufferAttribute(e,n),yf.fromBufferAttribute(e,i),_f.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(vf,s.x),o.addScaledVector(yf,s.y),o.addScaledVector(_f,s.z),o}static isFrontFacing(e,n,i,r){return Kn.subVectors(i,n),Ii.subVectors(e,n),Kn.cross(Ii).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Kn.subVectors(this.c,this.b),Ii.subVectors(this.a,this.b),Kn.cross(Ii).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ii.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return ii.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,r,s){return ii.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}containsPoint(e){return ii.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ii.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,r=this.b,s=this.c;let o,a;As.subVectors(r,i),bs.subVectors(s,i),mf.subVectors(e,i);const l=As.dot(mf),c=bs.dot(mf);if(l<=0&&c<=0)return n.copy(i);gf.subVectors(e,r);const u=As.dot(gf),d=bs.dot(gf);if(u>=0&&d<=u)return n.copy(r);const f=l*d-u*c;if(f<=0&&l>=0&&u<=0)return o=l/(l-u),n.copy(i).addScaledVector(As,o);xf.subVectors(e,s);const p=As.dot(xf),m=bs.dot(xf);if(m>=0&&p<=m)return n.copy(s);const E=p*c-l*m;if(E<=0&&c>=0&&m<=0)return a=c/(c-m),n.copy(i).addScaledVector(bs,a);const g=u*m-p*d;if(g<=0&&d-u>=0&&p-m>=0)return Pg.subVectors(s,r),a=(d-u)/(d-u+(p-m)),n.copy(r).addScaledVector(Pg,a);const h=1/(g+E+f);return o=E*h,a=f*h,n.copy(i).addScaledVector(As,o).addScaledVector(bs,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class za{constructor(e=new B(1/0,1/0,1/0),n=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(Zn.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(Zn.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=Zn.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Zn):Zn.fromBufferAttribute(s,o),Zn.applyMatrix4(e.matrixWorld),this.expandByPoint(Zn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),xl.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),xl.copy(i.boundingBox)),xl.applyMatrix4(e.matrixWorld),this.union(xl)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Zn),Zn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Oo),vl.subVectors(this.max,Oo),Cs.subVectors(e.a,Oo),Rs.subVectors(e.b,Oo),Ps.subVectors(e.c,Oo),or.subVectors(Rs,Cs),ar.subVectors(Ps,Rs),Br.subVectors(Cs,Ps);let n=[0,-or.z,or.y,0,-ar.z,ar.y,0,-Br.z,Br.y,or.z,0,-or.x,ar.z,0,-ar.x,Br.z,0,-Br.x,-or.y,or.x,0,-ar.y,ar.x,0,-Br.y,Br.x,0];return!Sf(n,Cs,Rs,Ps,vl)||(n=[1,0,0,0,1,0,0,0,1],!Sf(n,Cs,Rs,Ps,vl))?!1:(yl.crossVectors(or,ar),n=[yl.x,yl.y,yl.z],Sf(n,Cs,Rs,Ps,vl))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Zn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Zn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ui[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ui[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ui[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ui[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ui[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ui[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ui[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ui[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ui),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Ui=[new B,new B,new B,new B,new B,new B,new B,new B],Zn=new B,xl=new za,Cs=new B,Rs=new B,Ps=new B,or=new B,ar=new B,Br=new B,Oo=new B,vl=new B,yl=new B,Vr=new B;function Sf(t,e,n,i,r){for(let s=0,o=t.length-3;s<=o;s+=3){Vr.fromArray(t,s);const a=r.x*Math.abs(Vr.x)+r.y*Math.abs(Vr.y)+r.z*Math.abs(Vr.z),l=e.dot(Vr),c=n.dot(Vr),u=i.dot(Vr);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const Dt=new B,_l=new Qe;let l2=0;class Ai extends xs{constructor(e,n,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:l2++}),this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=gg,this.updateRanges=[],this.gpuType=_i,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)_l.fromBufferAttribute(this,n),_l.applyMatrix3(e),this.setXY(n,_l.x,_l.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Dt.fromBufferAttribute(this,n),Dt.applyMatrix3(e),this.setXYZ(n,Dt.x,Dt.y,Dt.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)Dt.fromBufferAttribute(this,n),Dt.applyMatrix4(e),this.setXYZ(n,Dt.x,Dt.y,Dt.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)Dt.fromBufferAttribute(this,n),Dt.applyNormalMatrix(e),this.setXYZ(n,Dt.x,Dt.y,Dt.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)Dt.fromBufferAttribute(this,n),Dt.transformDirection(e),this.setXYZ(n,Dt.x,Dt.y,Dt.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=Fo(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=gn(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=Fo(n,this.array)),n}setX(e,n){return this.normalized&&(n=gn(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=Fo(n,this.array)),n}setY(e,n){return this.normalized&&(n=gn(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=Fo(n,this.array)),n}setZ(e,n){return this.normalized&&(n=gn(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=Fo(n,this.array)),n}setW(e,n){return this.normalized&&(n=gn(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=gn(n,this.array),i=gn(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=gn(n,this.array),i=gn(i,this.array),r=gn(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e*=this.itemSize,this.normalized&&(n=gn(n,this.array),i=gn(i,this.array),r=gn(r,this.array),s=gn(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==gg&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class aS extends Ai{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class lS extends Ai{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class sn extends Ai{constructor(e,n,i){super(new Float32Array(e),n,i)}}const c2=new za,Bo=new B,Mf=new B;class xu{constructor(e=new B,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):c2.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Bo.subVectors(e,this.center);const n=Bo.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(Bo,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Mf.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Bo.copy(e.center).add(Mf)),this.expandByPoint(Bo.copy(e.center).sub(Mf))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let u2=0;const Nn=new Ct,Ef=new En,Ds=new B,An=new za,Vo=new za,zt=new B;class Yn extends xs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:u2++}),this.uuid=Va(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Hw(e)?lS:aS)(e,1):this.index=e,this}setIndirect(e,n=0){return this.indirect=e,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Ne().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Nn.makeRotationFromQuaternion(e),this.applyMatrix4(Nn),this}rotateX(e){return Nn.makeRotationX(e),this.applyMatrix4(Nn),this}rotateY(e){return Nn.makeRotationY(e),this.applyMatrix4(Nn),this}rotateZ(e){return Nn.makeRotationZ(e),this.applyMatrix4(Nn),this}translate(e,n,i){return Nn.makeTranslation(e,n,i),this.applyMatrix4(Nn),this}scale(e,n,i){return Nn.makeScale(e,n,i),this.applyMatrix4(Nn),this}lookAt(e){return Ef.lookAt(e),Ef.updateMatrix(),this.applyMatrix4(Ef.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ds).negate(),this.translate(Ds.x,Ds.y,Ds.z),this}setFromPoints(e){const n=this.getAttribute("position");if(n===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new sn(i,3))}else{const i=Math.min(e.length,n.count);for(let r=0;r<i;r++){const s=e[r];n.setXYZ(r,s.x,s.y,s.z||0)}e.length>n.count&&Le("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new za);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){$e("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];An.setFromBufferAttribute(s),this.morphTargetsRelative?(zt.addVectors(this.boundingBox.min,An.min),this.boundingBox.expandByPoint(zt),zt.addVectors(this.boundingBox.max,An.max),this.boundingBox.expandByPoint(zt)):(this.boundingBox.expandByPoint(An.min),this.boundingBox.expandByPoint(An.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&$e('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new xu);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){$e("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new B,1/0);return}if(e){const i=this.boundingSphere.center;if(An.setFromBufferAttribute(e),n)for(let s=0,o=n.length;s<o;s++){const a=n[s];Vo.setFromBufferAttribute(a),this.morphTargetsRelative?(zt.addVectors(An.min,Vo.min),An.expandByPoint(zt),zt.addVectors(An.max,Vo.max),An.expandByPoint(zt)):(An.expandByPoint(Vo.min),An.expandByPoint(Vo.max))}An.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)zt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(zt));if(n)for(let s=0,o=n.length;s<o;s++){const a=n[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)zt.fromBufferAttribute(a,c),l&&(Ds.fromBufferAttribute(e,c),zt.add(Ds)),r=Math.max(r,i.distanceToSquared(zt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&$e('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){$e("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,r=n.normal,s=n.uv;let o=this.getAttribute("tangent");(o===void 0||o.count!==i.count)&&(o=new Ai(new Float32Array(4*i.count),4),this.setAttribute("tangent",o));const a=[],l=[];for(let y=0;y<i.count;y++)a[y]=new B,l[y]=new B;const c=new B,u=new B,d=new B,f=new Qe,p=new Qe,m=new Qe,E=new B,g=new B;function h(y,C,P){c.fromBufferAttribute(i,y),u.fromBufferAttribute(i,C),d.fromBufferAttribute(i,P),f.fromBufferAttribute(s,y),p.fromBufferAttribute(s,C),m.fromBufferAttribute(s,P),u.sub(c),d.sub(c),p.sub(f),m.sub(f);const D=1/(p.x*m.y-m.x*p.y);isFinite(D)&&(E.copy(u).multiplyScalar(m.y).addScaledVector(d,-p.y).multiplyScalar(D),g.copy(d).multiplyScalar(p.x).addScaledVector(u,-m.x).multiplyScalar(D),a[y].add(E),a[C].add(E),a[P].add(E),l[y].add(g),l[C].add(g),l[P].add(g))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let y=0,C=x.length;y<C;++y){const P=x[y],D=P.start,F=P.count;for(let X=D,ee=D+F;X<ee;X+=3)h(e.getX(X+0),e.getX(X+1),e.getX(X+2))}const S=new B,_=new B,w=new B,b=new B;function A(y){w.fromBufferAttribute(r,y),b.copy(w);const C=a[y];S.copy(C),S.sub(w.multiplyScalar(w.dot(C))).normalize(),_.crossVectors(b,C);const D=_.dot(l[y])<0?-1:1;o.setXYZW(y,S.x,S.y,S.z,D)}for(let y=0,C=x.length;y<C;++y){const P=x[y],D=P.start,F=P.count;for(let X=D,ee=D+F;X<ee;X+=3)A(e.getX(X+0)),A(e.getX(X+1)),A(e.getX(X+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==n.count)i=new Ai(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let f=0,p=i.count;f<p;f++)i.setXYZ(f,0,0,0);const r=new B,s=new B,o=new B,a=new B,l=new B,c=new B,u=new B,d=new B;if(e)for(let f=0,p=e.count;f<p;f+=3){const m=e.getX(f+0),E=e.getX(f+1),g=e.getX(f+2);r.fromBufferAttribute(n,m),s.fromBufferAttribute(n,E),o.fromBufferAttribute(n,g),u.subVectors(o,s),d.subVectors(r,s),u.cross(d),a.fromBufferAttribute(i,m),l.fromBufferAttribute(i,E),c.fromBufferAttribute(i,g),a.add(u),l.add(u),c.add(u),i.setXYZ(m,a.x,a.y,a.z),i.setXYZ(E,l.x,l.y,l.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let f=0,p=n.count;f<p;f+=3)r.fromBufferAttribute(n,f+0),s.fromBufferAttribute(n,f+1),o.fromBufferAttribute(n,f+2),u.subVectors(o,s),d.subVectors(r,s),u.cross(d),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)zt.fromBufferAttribute(e,n),zt.normalize(),e.setXYZ(n,zt.x,zt.y,zt.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,d=a.normalized,f=new c.constructor(l.length*u);let p=0,m=0;for(let E=0,g=l.length;E<g;E++){a.isInterleavedBufferAttribute?p=l[E]*a.data.stride+a.offset:p=l[E]*u;for(let h=0;h<u;h++)f[m++]=c[p++]}return new Ai(f,u,d)}if(this.index===null)return Le("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Yn,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=e(l,i);n.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,d=c.length;u<d;u++){const f=c[u],p=e(f,i);l.push(p)}n.morphAttributes[a]=l}n.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,f=c.length;d<f;d++){const p=c[d];u.push(p.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(n))}const s=e.morphAttributes;for(const c in s){const u=[],d=s[c];for(let f=0,p=d.length;f<p;f++)u.push(d[f].clone(n));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let f2=0;class Ga extends xs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:f2++}),this.uuid=Va(),this.name="",this.type="Material",this.blending=io,this.side=Pr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Xd,this.blendDst=Yd,this.blendEquation=$r,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ke(0,0,0),this.blendAlpha=0,this.depthFunc=po,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=mg,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ss,this.stencilZFail=Ss,this.stencilZPass=Ss,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){Le(`Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){Le(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==io&&(i.blending=this.blending),this.side!==Pr&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Xd&&(i.blendSrc=this.blendSrc),this.blendDst!==Yd&&(i.blendDst=this.blendDst),this.blendEquation!==$r&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==po&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==mg&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ss&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Ss&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Ss&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(n){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}fromJSON(e,n){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Ke().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=n[e.map]||null),e.matcap!==void 0&&(this.matcap=n[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=n[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=n[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=n[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Qe().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=n[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=n[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=n[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=n[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=n[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=n[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=n[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=n[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=n[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=n[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=n[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=n[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=n[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=n[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Qe().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=n[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=n[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=n[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=n[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=n[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=n[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=n[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Fi=new B,Tf=new B,Sl=new B,lr=new B,wf=new B,Ml=new B,Af=new B;class cS{constructor(e=new B,n=new B(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Fi)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=Fi.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(Fi.copy(this.origin).addScaledVector(this.direction,n),Fi.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){Tf.copy(e).add(n).multiplyScalar(.5),Sl.copy(n).sub(e).normalize(),lr.copy(this.origin).sub(Tf);const s=e.distanceTo(n)*.5,o=-this.direction.dot(Sl),a=lr.dot(this.direction),l=-lr.dot(Sl),c=lr.lengthSq(),u=Math.abs(1-o*o);let d,f,p,m;if(u>0)if(d=o*l-a,f=o*a-l,m=s*u,d>=0)if(f>=-m)if(f<=m){const E=1/u;d*=E,f*=E,p=d*(d+o*f+2*a)+f*(o*d+f+2*l)+c}else f=s,d=Math.max(0,-(o*f+a)),p=-d*d+f*(f+2*l)+c;else f=-s,d=Math.max(0,-(o*f+a)),p=-d*d+f*(f+2*l)+c;else f<=-m?(d=Math.max(0,-(-o*s+a)),f=d>0?-s:Math.min(Math.max(-s,-l),s),p=-d*d+f*(f+2*l)+c):f<=m?(d=0,f=Math.min(Math.max(-s,-l),s),p=f*(f+2*l)+c):(d=Math.max(0,-(o*s+a)),f=d>0?s:Math.min(Math.max(-s,-l),s),p=-d*d+f*(f+2*l)+c);else f=o>0?-s:s,d=Math.max(0,-(o*f+a)),p=-d*d+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(Tf).addScaledVector(Sl,f),p}intersectSphere(e,n){Fi.subVectors(e.center,this.origin);const i=Fi.dot(this.direction),r=Fi.dot(Fi)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,n):this.at(a,n)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return c>=0?(i=(e.min.x-f.x)*c,r=(e.max.x-f.x)*c):(i=(e.max.x-f.x)*c,r=(e.min.x-f.x)*c),u>=0?(s=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),d>=0?(a=(e.min.z-f.z)*d,l=(e.max.z-f.z)*d):(a=(e.max.z-f.z)*d,l=(e.min.z-f.z)*d),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,Fi)!==null}intersectTriangle(e,n,i,r,s){wf.subVectors(n,e),Ml.subVectors(i,e),Af.crossVectors(wf,Ml);let o=this.direction.dot(Af),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;lr.subVectors(this.origin,e);const l=a*this.direction.dot(Ml.crossVectors(lr,Ml));if(l<0)return null;const c=a*this.direction.dot(wf.cross(lr));if(c<0||l+c>o)return null;const u=-a*lr.dot(Af);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class dm extends Ga{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ke(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ps,this.combine=z_,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Dg=new Ct,zr=new cS,El=new xu,Lg=new B,Tl=new B,wl=new B,Al=new B,bf=new B,bl=new B,Ig=new B,Cl=new B;class Ri extends En{constructor(e=new Yn,n=new dm){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;n.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){bl.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],d=s[l];u!==0&&(bf.fromBufferAttribute(d,e),o?bl.addScaledVector(bf,u):bl.addScaledVector(bf.sub(n),u))}n.add(bl)}return n}raycast(e,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),El.copy(i.boundingSphere),El.applyMatrix4(s),zr.copy(e.ray).recast(e.near),!(El.containsPoint(zr.origin)===!1&&(zr.intersectSphere(El,Lg)===null||zr.origin.distanceToSquared(Lg)>(e.far-e.near)**2))&&(Dg.copy(s).invert(),zr.copy(e.ray).applyMatrix4(Dg),!(i.boundingBox!==null&&zr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,zr)))}_computeIntersections(e,n,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,f=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,E=f.length;m<E;m++){const g=f[m],h=o[g.materialIndex],x=Math.max(g.start,p.start),S=Math.min(a.count,Math.min(g.start+g.count,p.start+p.count));for(let _=x,w=S;_<w;_+=3){const b=a.getX(_),A=a.getX(_+1),y=a.getX(_+2);r=Rl(this,h,e,i,c,u,d,b,A,y),r&&(r.faceIndex=Math.floor(_/3),r.face.materialIndex=g.materialIndex,n.push(r))}}else{const m=Math.max(0,p.start),E=Math.min(a.count,p.start+p.count);for(let g=m,h=E;g<h;g+=3){const x=a.getX(g),S=a.getX(g+1),_=a.getX(g+2);r=Rl(this,o,e,i,c,u,d,x,S,_),r&&(r.faceIndex=Math.floor(g/3),n.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let m=0,E=f.length;m<E;m++){const g=f[m],h=o[g.materialIndex],x=Math.max(g.start,p.start),S=Math.min(l.count,Math.min(g.start+g.count,p.start+p.count));for(let _=x,w=S;_<w;_+=3){const b=_,A=_+1,y=_+2;r=Rl(this,h,e,i,c,u,d,b,A,y),r&&(r.faceIndex=Math.floor(_/3),r.face.materialIndex=g.materialIndex,n.push(r))}}else{const m=Math.max(0,p.start),E=Math.min(l.count,p.start+p.count);for(let g=m,h=E;g<h;g+=3){const x=g,S=g+1,_=g+2;r=Rl(this,o,e,i,c,u,d,x,S,_),r&&(r.faceIndex=Math.floor(g/3),n.push(r))}}}}function d2(t,e,n,i,r,s,o,a){let l;if(e.side===Mn?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===Pr,a),l===null)return null;Cl.copy(a),Cl.applyMatrix4(t.matrixWorld);const c=n.ray.origin.distanceTo(Cl);return c<n.near||c>n.far?null:{distance:c,point:Cl.clone(),object:t}}function Rl(t,e,n,i,r,s,o,a,l,c){t.getVertexPosition(a,Tl),t.getVertexPosition(l,wl),t.getVertexPosition(c,Al);const u=d2(t,e,n,i,Tl,wl,Al,Ig);if(u){const d=new B;ii.getBarycoord(Ig,Tl,wl,Al,d),r&&(u.uv=ii.getInterpolatedAttribute(r,a,l,c,d,new Qe)),s&&(u.uv1=ii.getInterpolatedAttribute(s,a,l,c,d,new Qe)),o&&(u.normal=ii.getInterpolatedAttribute(o,a,l,c,d,new B),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new B,materialIndex:0};ii.getNormal(Tl,wl,Al,f.normal),u.face=f,u.barycoord=d}return u}class h2 extends dn{constructor(e=null,n=1,i=1,r,s,o,a,l,c=Yt,u=Yt,d,f){super(null,o,a,l,c,u,r,s,d,f),this.isDataTexture=!0,this.image={data:e,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Cf=new B,p2=new B,m2=new Ne;class Xr{constructor(e=new B(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const r=Cf.subVectors(i,n).cross(p2.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n,i=!0){const r=e.delta(Cf),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const o=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(o<0||o>1)?null:n.copy(e.start).addScaledVector(r,o)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||m2.getNormalMatrix(e),r=this.coplanarPoint(Cf).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Gr=new xu,g2=new Qe(.5,.5),Pl=new B;class uS{constructor(e=new Xr,n=new Xr,i=new Xr,r=new Xr,s=new Xr,o=new Xr){this.planes=[e,n,i,r,s,o]}set(e,n,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(n),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=Si,i=!1){const r=this.planes,s=e.elements,o=s[0],a=s[1],l=s[2],c=s[3],u=s[4],d=s[5],f=s[6],p=s[7],m=s[8],E=s[9],g=s[10],h=s[11],x=s[12],S=s[13],_=s[14],w=s[15];if(r[0].setComponents(c-o,p-u,h-m,w-x).normalize(),r[1].setComponents(c+o,p+u,h+m,w+x).normalize(),r[2].setComponents(c+a,p+d,h+E,w+S).normalize(),r[3].setComponents(c-a,p-d,h-E,w-S).normalize(),i)r[4].setComponents(l,f,g,_).normalize(),r[5].setComponents(c-l,p-f,h-g,w-_).normalize();else if(r[4].setComponents(c-l,p-f,h-g,w-_).normalize(),n===Si)r[5].setComponents(c+l,p+f,h+g,w+_).normalize();else if(n===Vc)r[5].setComponents(l,f,g,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Gr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Gr.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Gr)}intersectsSprite(e){Gr.center.set(0,0,0);const n=g2.distanceTo(e.center);return Gr.radius=.7071067811865476+n,Gr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Gr)}intersectsSphere(e){const n=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(Pl.x=r.normal.x>0?e.max.x:e.min.x,Pl.y=r.normal.y>0?e.max.y:e.min.y,Pl.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Pl)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class fS extends Ga{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ke(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Gc=new B,Hc=new B,Ng=new Ct,zo=new cS,Dl=new xu,Rf=new B,Ug=new B;class x2 extends En{constructor(e=new Yn,n=new fS){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[0];for(let r=1,s=n.count;r<s;r++)Gc.fromBufferAttribute(n,r-1),Hc.fromBufferAttribute(n,r),i[r]=i[r-1],i[r]+=Gc.distanceTo(Hc);e.setAttribute("lineDistance",new sn(i,1))}else Le("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,n){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Dl.copy(i.boundingSphere),Dl.applyMatrix4(r),Dl.radius+=s,e.ray.intersectsSphere(Dl)===!1)return;Ng.copy(r).invert(),zo.copy(e.ray).applyMatrix4(Ng);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=i.index,f=i.attributes.position;if(u!==null){const p=Math.max(0,o.start),m=Math.min(u.count,o.start+o.count);for(let E=p,g=m-1;E<g;E+=c){const h=u.getX(E),x=u.getX(E+1),S=Ll(this,e,zo,l,h,x,E);S&&n.push(S)}if(this.isLineLoop){const E=u.getX(m-1),g=u.getX(p),h=Ll(this,e,zo,l,E,g,m-1);h&&n.push(h)}}else{const p=Math.max(0,o.start),m=Math.min(f.count,o.start+o.count);for(let E=p,g=m-1;E<g;E+=c){const h=Ll(this,e,zo,l,E,E+1,E);h&&n.push(h)}if(this.isLineLoop){const E=Ll(this,e,zo,l,m-1,p,m-1);E&&n.push(E)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Ll(t,e,n,i,r,s,o){const a=t.geometry.attributes.position;if(Gc.fromBufferAttribute(a,r),Hc.fromBufferAttribute(a,s),n.distanceSqToSegment(Gc,Hc,Rf,Ug)>i)return;Rf.applyMatrix4(t.matrixWorld);const c=e.ray.origin.distanceTo(Rf);if(!(c<e.near||c>e.far))return{distance:c,point:Ug.clone().applyMatrix4(t.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:t}}const Fg=new B,kg=new B;class v2 extends x2{constructor(e,n){super(e,n),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[];for(let r=0,s=n.count;r<s;r+=2)Fg.fromBufferAttribute(n,r),kg.fromBufferAttribute(n,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+Fg.distanceTo(kg);e.setAttribute("lineDistance",new sn(i,1))}else Le("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class dS extends dn{constructor(e=[],n=ds,i,r,s,o,a,l,c,u){super(e,n,i,r,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class go extends dn{constructor(e,n,i=Ci,r,s,o,a=Yt,l=Yt,c,u=Qi,d=1){if(u!==Qi&&u!==es)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:n,depth:d};super(f,r,s,o,a,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new um(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}class y2 extends go{constructor(e,n=Ci,i=ds,r,s,o=Yt,a=Yt,l,c=Qi){const u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,n,i,r,s,o,a,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class hS extends dn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Ha extends Yn{constructor(e=1,n=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],d=[];let f=0,p=0;m("z","y","x",-1,-1,i,n,e,o,s,0),m("z","y","x",1,-1,i,n,-e,o,s,1),m("x","z","y",1,1,e,i,n,r,o,2),m("x","z","y",1,-1,e,i,-n,r,o,3),m("x","y","z",1,-1,e,n,i,r,s,4),m("x","y","z",-1,-1,e,n,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new sn(c,3)),this.setAttribute("normal",new sn(u,3)),this.setAttribute("uv",new sn(d,2));function m(E,g,h,x,S,_,w,b,A,y,C){const P=_/A,D=w/y,F=_/2,X=w/2,ee=b/2,O=A+1,q=y+1;let z=0,L=0;const W=new B;for(let Z=0;Z<q;Z++){const ne=Z*D-X;for(let oe=0;oe<O;oe++){const ze=oe*P-F;W[E]=ze*x,W[g]=ne*S,W[h]=ee,c.push(W.x,W.y,W.z),W[E]=0,W[g]=0,W[h]=b>0?1:-1,u.push(W.x,W.y,W.z),d.push(oe/A),d.push(1-Z/y),z+=1}}for(let Z=0;Z<y;Z++)for(let ne=0;ne<A;ne++){const oe=f+ne+O*Z,ze=f+ne+O*(Z+1),Je=f+(ne+1)+O*(Z+1),He=f+(ne+1)+O*Z;l.push(oe,ze,He),l.push(ze,Je,He),L+=6}a.addGroup(p,L,C),p+=L,f+=z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ha(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class vu extends Yn{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};const s=e/2,o=n/2,a=Math.floor(i),l=Math.floor(r),c=a+1,u=l+1,d=e/a,f=n/l,p=[],m=[],E=[],g=[];for(let h=0;h<u;h++){const x=h*f-o;for(let S=0;S<c;S++){const _=S*d-s;m.push(_,-x,0),E.push(0,0,1),g.push(S/a),g.push(1-h/l)}}for(let h=0;h<l;h++)for(let x=0;x<a;x++){const S=x+c*h,_=x+c*(h+1),w=x+1+c*(h+1),b=x+1+c*h;p.push(S,_,b),p.push(_,w,b)}this.setIndex(p),this.setAttribute("position",new sn(m,3)),this.setAttribute("normal",new sn(E,3)),this.setAttribute("uv",new sn(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vu(e.width,e.height,e.widthSegments,e.heightSegments)}}class hm extends Yn{constructor(e=1,n=32,i=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:n,heightSegments:i,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},n=Math.max(3,Math.floor(n)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const u=[],d=new B,f=new B,p=[],m=[],E=[],g=[];for(let h=0;h<=i;h++){const x=[],S=h/i,_=o+S*a,w=e*Math.cos(_),b=Math.sqrt(e*e-w*w);let A=0;h===0&&o===0?A=.5/n:h===i&&l===Math.PI&&(A=-.5/n);for(let y=0;y<=n;y++){const C=y/n,P=r+C*s;d.x=-b*Math.cos(P),d.y=w,d.z=b*Math.sin(P),m.push(d.x,d.y,d.z),f.copy(d).normalize(),E.push(f.x,f.y,f.z),g.push(C+A,1-S),x.push(c++)}u.push(x)}for(let h=0;h<i;h++)for(let x=0;x<n;x++){const S=u[h][x+1],_=u[h][x],w=u[h+1][x],b=u[h+1][x+1];(h!==0||o>0)&&p.push(S,_,b),(h!==i-1||l<Math.PI)&&p.push(_,w,b)}this.setIndex(p),this.setAttribute("position",new sn(m,3)),this.setAttribute("normal",new sn(E,3)),this.setAttribute("uv",new sn(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new hm(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function xo(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const r=t[n][i];if(Og(r))r.isRenderTargetTexture?(Le("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone();else if(Array.isArray(r))if(Og(r[0])){const s=[];for(let o=0,a=r.length;o<a;o++)s[o]=r[o].clone();e[n][i]=s}else e[n][i]=r.slice();else e[n][i]=r}}return e}function an(t){const e={};for(let n=0;n<t.length;n++){const i=xo(t[n]);for(const r in i)e[r]=i[r]}return e}function Og(t){return t&&(t.isColor||t.isMatrix3||t.isMatrix4||t.isVector2||t.isVector3||t.isVector4||t.isTexture||t.isQuaternion)}function _2(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function pS(t){const e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:We.workingColorSpace}const S2={clone:xo,merge:an};var M2=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,E2=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Pi extends Ga{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=M2,this.fragmentShader=E2,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=xo(e.uniforms),this.uniformsGroups=_2(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?n.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?n.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?n.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?n.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?n.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?n.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?n.uniforms[r]={type:"m4",value:o.toArray()}:n.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}fromJSON(e,n){if(super.fromJSON(e,n),e.uniforms!==void 0)for(const i in e.uniforms){const r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=n[r.value]||null;break;case"c":this.uniforms[i].value=new Ke().setHex(r.value);break;case"v2":this.uniforms[i].value=new Qe().fromArray(r.value);break;case"v3":this.uniforms[i].value=new B().fromArray(r.value);break;case"v4":this.uniforms[i].value=new Et().fromArray(r.value);break;case"m3":this.uniforms[i].value=new Ne().fromArray(r.value);break;case"m4":this.uniforms[i].value=new Ct().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class T2 extends Pi{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class w2 extends Ga{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Uw,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class A2 extends Ga{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Il=new B,Nl=new Eo,hi=new B;class mS extends En{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ct,this.projectionMatrix=new Ct,this.projectionMatrixInverse=new Ct,this.coordinateSystem=Si,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Il,Nl,hi),hi.x===1&&hi.y===1&&hi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Il,Nl,hi.set(1,1,1)).invert()}updateWorldMatrix(e,n,i=!1){super.updateWorldMatrix(e,n,i),this.matrixWorld.decompose(Il,Nl,hi),hi.x===1&&hi.y===1&&hi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Il,Nl,hi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const cr=new B,Bg=new Qe,Vg=new Qe;class On extends mS{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=Ih*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(sf*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ih*2*Math.atan(Math.tan(sf*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){cr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(cr.x,cr.y).multiplyScalar(-e/cr.z),cr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(cr.x,cr.y).multiplyScalar(-e/cr.z)}getViewSize(e,n){return this.getViewBounds(e,Bg,Vg),n.subVectors(Vg,Bg)}setViewOffset(e,n,i,r,s,o){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(sf*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,n-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}class gS extends mS{constructor(e=-1,n=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+n,l=r-n;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const Ls=-90,Is=1;class b2 extends En{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new On(Ls,Is,e,n);r.layers=this.layers,this.add(r);const s=new On(Ls,Is,e,n);s.layers=this.layers,this.add(s);const o=new On(Ls,Is,e,n);o.layers=this.layers,this.add(o);const a=new On(Ls,Is,e,n);a.layers=this.layers,this.add(a);const l=new On(Ls,Is,e,n);l.layers=this.layers,this.add(l);const c=new On(Ls,Is,e,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,r,s,o,a,l]=n;for(const c of n)this.remove(c);if(e===Si)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Vc)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of n)this.add(c),c.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const E=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(n,s),e.setRenderTarget(i,1,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(n,o),e.setRenderTarget(i,2,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(n,a),e.setRenderTarget(i,3,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(n,l),e.setRenderTarget(i,4,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(n,c),i.texture.generateMipmaps=E,e.setRenderTarget(i,5,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(n,u),e.setRenderTarget(d,f,p),e.xr.enabled=m,i.texture.needsPMREMUpdate=!0}}class C2 extends On{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const jm=class jm{constructor(e,n,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,n,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,n=0){for(let i=0;i<4;i++)this.elements[i]=e[i+n];return this}set(e,n,i,r){const s=this.elements;return s[0]=e,s[2]=n,s[1]=i,s[3]=r,this}};jm.prototype.isMatrix2=!0;let zg=jm;function Gg(t,e,n,i){const r=R2(i);switch(n){case eS:return t*e;case nS:return t*e/r.components*r.byteLength;case sm:return t*e/r.components*r.byteLength;case hs:return t*e*2/r.components*r.byteLength;case om:return t*e*2/r.components*r.byteLength;case tS:return t*e*3/r.components*r.byteLength;case ri:return t*e*4/r.components*r.byteLength;case am:return t*e*4/r.components*r.byteLength;case ec:case tc:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case nc:case ic:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case rh:case oh:return Math.max(t,16)*Math.max(e,8)/4;case ih:case sh:return Math.max(t,8)*Math.max(e,8)/2;case ah:case lh:case uh:case fh:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case ch:case Fc:case dh:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case hh:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case ph:return Math.floor((t+4)/5)*Math.floor((e+3)/4)*16;case mh:return Math.floor((t+4)/5)*Math.floor((e+4)/5)*16;case gh:return Math.floor((t+5)/6)*Math.floor((e+4)/5)*16;case xh:return Math.floor((t+5)/6)*Math.floor((e+5)/6)*16;case vh:return Math.floor((t+7)/8)*Math.floor((e+4)/5)*16;case yh:return Math.floor((t+7)/8)*Math.floor((e+5)/6)*16;case _h:return Math.floor((t+7)/8)*Math.floor((e+7)/8)*16;case Sh:return Math.floor((t+9)/10)*Math.floor((e+4)/5)*16;case Mh:return Math.floor((t+9)/10)*Math.floor((e+5)/6)*16;case Eh:return Math.floor((t+9)/10)*Math.floor((e+7)/8)*16;case Th:return Math.floor((t+9)/10)*Math.floor((e+9)/10)*16;case wh:return Math.floor((t+11)/12)*Math.floor((e+9)/10)*16;case Ah:return Math.floor((t+11)/12)*Math.floor((e+11)/12)*16;case bh:case Ch:case Rh:return Math.ceil(t/4)*Math.ceil(e/4)*16;case Ph:case Dh:return Math.ceil(t/4)*Math.ceil(e/4)*8;case kc:case Lh:return Math.ceil(t/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function R2(t){switch(t){case Bn:case K_:return{byteLength:1,components:1};case Ra:case Z_:case Zi:return{byteLength:2,components:1};case im:case rm:return{byteLength:2,components:4};case Ci:case nm:case _i:return{byteLength:4,components:1};case Q_:case J_:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${t}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:tm}}));typeof window<"u"&&(window.__THREE__?Le("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=tm);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function xS(){let t=null,e=!1,n=null,i=null;function r(s,o){n(s,o),i=t.requestAnimationFrame(r)}return{start:function(){e!==!0&&n!==null&&t!==null&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t!==null&&t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function P2(t){const e=new WeakMap;function n(a,l){const c=a.array,u=a.usage,d=c.byteLength,f=t.createBuffer();t.bindBuffer(l,f),t.bufferData(l,c,u),a.onUploadCallback();let p;if(c instanceof Float32Array)p=t.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=t.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=t.HALF_FLOAT:p=t.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=t.SHORT;else if(c instanceof Uint32Array)p=t.UNSIGNED_INT;else if(c instanceof Int32Array)p=t.INT;else if(c instanceof Int8Array)p=t.BYTE;else if(c instanceof Uint8Array)p=t.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function i(a,l,c){const u=l.array,d=l.updateRanges;if(t.bindBuffer(c,a),d.length===0)t.bufferSubData(c,0,u);else{d.sort((p,m)=>p.start-m.start);let f=0;for(let p=1;p<d.length;p++){const m=d[f],E=d[p];E.start<=m.start+m.count+1?m.count=Math.max(m.count,E.start+E.count-m.start):(++f,d[f]=E)}d.length=f+1;for(let p=0,m=d.length;p<m;p++){const E=d[p];t.bufferSubData(c,E.start*u.BYTES_PER_ELEMENT,u,E.start,E.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(t.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,n(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}var D2=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,L2=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,I2=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,N2=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,U2=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,F2=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,k2=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,O2=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,B2=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,V2=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,z2=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,G2=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,H2=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,W2=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,j2=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,X2=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Y2=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,$2=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,q2=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,K2=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Z2=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Q2=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,J2=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,eA=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,tA=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,nA=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,iA=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,rA=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,sA=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,oA=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,aA="gl_FragColor = linearToOutputTexel( gl_FragColor );",lA=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,cA=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,uA=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,fA=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,dA=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,hA=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,pA=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,mA=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,gA=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,xA=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,vA=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,yA=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,_A=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,SA=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,MA=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,EA=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,TA=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,wA=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,AA=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,bA=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,CA=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,RA=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,PA=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,DA=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,LA=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,IA=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,NA=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,UA=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,FA=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,kA=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,OA=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,BA=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,VA=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,zA=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,GA=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,HA=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,WA=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,jA=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,XA=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,YA=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,$A=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,qA=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,KA=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,ZA=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,QA=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,JA=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,eb=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,tb=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,nb=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ib=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,rb=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,sb=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ob=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,ab=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,lb=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,cb=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ub=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,fb=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,db=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,hb=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,pb=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,mb=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,gb=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,xb=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,vb=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,yb=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,_b=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Sb=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Mb=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Eb=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Tb=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,wb=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Ab=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,bb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Cb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Rb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Pb=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Db=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Lb=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ib=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Nb=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ub=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Fb=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kb=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Ob=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Bb=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Vb=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,zb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Gb=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hb=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Wb=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,jb=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Xb=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Yb=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$b=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qb=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Kb=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Zb=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Qb=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Jb=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,eC=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,tC=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,nC=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,iC=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,rC=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sC=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,oC=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,aC=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,lC=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,cC=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,uC=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Oe={alphahash_fragment:D2,alphahash_pars_fragment:L2,alphamap_fragment:I2,alphamap_pars_fragment:N2,alphatest_fragment:U2,alphatest_pars_fragment:F2,aomap_fragment:k2,aomap_pars_fragment:O2,batching_pars_vertex:B2,batching_vertex:V2,begin_vertex:z2,beginnormal_vertex:G2,bsdfs:H2,iridescence_fragment:W2,bumpmap_pars_fragment:j2,clipping_planes_fragment:X2,clipping_planes_pars_fragment:Y2,clipping_planes_pars_vertex:$2,clipping_planes_vertex:q2,color_fragment:K2,color_pars_fragment:Z2,color_pars_vertex:Q2,color_vertex:J2,common:eA,cube_uv_reflection_fragment:tA,defaultnormal_vertex:nA,displacementmap_pars_vertex:iA,displacementmap_vertex:rA,emissivemap_fragment:sA,emissivemap_pars_fragment:oA,colorspace_fragment:aA,colorspace_pars_fragment:lA,envmap_fragment:cA,envmap_common_pars_fragment:uA,envmap_pars_fragment:fA,envmap_pars_vertex:dA,envmap_physical_pars_fragment:EA,envmap_vertex:hA,fog_vertex:pA,fog_pars_vertex:mA,fog_fragment:gA,fog_pars_fragment:xA,gradientmap_pars_fragment:vA,lightmap_pars_fragment:yA,lights_lambert_fragment:_A,lights_lambert_pars_fragment:SA,lights_pars_begin:MA,lights_toon_fragment:TA,lights_toon_pars_fragment:wA,lights_phong_fragment:AA,lights_phong_pars_fragment:bA,lights_physical_fragment:CA,lights_physical_pars_fragment:RA,lights_fragment_begin:PA,lights_fragment_maps:DA,lights_fragment_end:LA,lightprobes_pars_fragment:IA,logdepthbuf_fragment:NA,logdepthbuf_pars_fragment:UA,logdepthbuf_pars_vertex:FA,logdepthbuf_vertex:kA,map_fragment:OA,map_pars_fragment:BA,map_particle_fragment:VA,map_particle_pars_fragment:zA,metalnessmap_fragment:GA,metalnessmap_pars_fragment:HA,morphinstance_vertex:WA,morphcolor_vertex:jA,morphnormal_vertex:XA,morphtarget_pars_vertex:YA,morphtarget_vertex:$A,normal_fragment_begin:qA,normal_fragment_maps:KA,normal_pars_fragment:ZA,normal_pars_vertex:QA,normal_vertex:JA,normalmap_pars_fragment:eb,clearcoat_normal_fragment_begin:tb,clearcoat_normal_fragment_maps:nb,clearcoat_pars_fragment:ib,iridescence_pars_fragment:rb,opaque_fragment:sb,packing:ob,premultiplied_alpha_fragment:ab,project_vertex:lb,dithering_fragment:cb,dithering_pars_fragment:ub,roughnessmap_fragment:fb,roughnessmap_pars_fragment:db,shadowmap_pars_fragment:hb,shadowmap_pars_vertex:pb,shadowmap_vertex:mb,shadowmask_pars_fragment:gb,skinbase_vertex:xb,skinning_pars_vertex:vb,skinning_vertex:yb,skinnormal_vertex:_b,specularmap_fragment:Sb,specularmap_pars_fragment:Mb,tonemapping_fragment:Eb,tonemapping_pars_fragment:Tb,transmission_fragment:wb,transmission_pars_fragment:Ab,uv_pars_fragment:bb,uv_pars_vertex:Cb,uv_vertex:Rb,worldpos_vertex:Pb,background_vert:Db,background_frag:Lb,backgroundCube_vert:Ib,backgroundCube_frag:Nb,cube_vert:Ub,cube_frag:Fb,depth_vert:kb,depth_frag:Ob,distance_vert:Bb,distance_frag:Vb,equirect_vert:zb,equirect_frag:Gb,linedashed_vert:Hb,linedashed_frag:Wb,meshbasic_vert:jb,meshbasic_frag:Xb,meshlambert_vert:Yb,meshlambert_frag:$b,meshmatcap_vert:qb,meshmatcap_frag:Kb,meshnormal_vert:Zb,meshnormal_frag:Qb,meshphong_vert:Jb,meshphong_frag:eC,meshphysical_vert:tC,meshphysical_frag:nC,meshtoon_vert:iC,meshtoon_frag:rC,points_vert:sC,points_frag:oC,shadow_vert:aC,shadow_frag:lC,sprite_vert:cC,sprite_frag:uC},pe={common:{diffuse:{value:new Ke(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ne},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ne}},envmap:{envMap:{value:null},envMapRotation:{value:new Ne},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ne}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ne}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ne},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ne},normalScale:{value:new Qe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ne},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ne}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ne}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ne}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ke(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new B},probesMax:{value:new B},probesResolution:{value:new B}},points:{diffuse:{value:new Ke(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0},uvTransform:{value:new Ne}},sprite:{diffuse:{value:new Ke(16777215)},opacity:{value:1},center:{value:new Qe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ne},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0}}},xi={basic:{uniforms:an([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.fog]),vertexShader:Oe.meshbasic_vert,fragmentShader:Oe.meshbasic_frag},lambert:{uniforms:an([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new Ke(0)},envMapIntensity:{value:1}}]),vertexShader:Oe.meshlambert_vert,fragmentShader:Oe.meshlambert_frag},phong:{uniforms:an([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new Ke(0)},specular:{value:new Ke(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Oe.meshphong_vert,fragmentShader:Oe.meshphong_frag},standard:{uniforms:an([pe.common,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.roughnessmap,pe.metalnessmap,pe.fog,pe.lights,{emissive:{value:new Ke(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Oe.meshphysical_vert,fragmentShader:Oe.meshphysical_frag},toon:{uniforms:an([pe.common,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.gradientmap,pe.fog,pe.lights,{emissive:{value:new Ke(0)}}]),vertexShader:Oe.meshtoon_vert,fragmentShader:Oe.meshtoon_frag},matcap:{uniforms:an([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,{matcap:{value:null}}]),vertexShader:Oe.meshmatcap_vert,fragmentShader:Oe.meshmatcap_frag},points:{uniforms:an([pe.points,pe.fog]),vertexShader:Oe.points_vert,fragmentShader:Oe.points_frag},dashed:{uniforms:an([pe.common,pe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Oe.linedashed_vert,fragmentShader:Oe.linedashed_frag},depth:{uniforms:an([pe.common,pe.displacementmap]),vertexShader:Oe.depth_vert,fragmentShader:Oe.depth_frag},normal:{uniforms:an([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,{opacity:{value:1}}]),vertexShader:Oe.meshnormal_vert,fragmentShader:Oe.meshnormal_frag},sprite:{uniforms:an([pe.sprite,pe.fog]),vertexShader:Oe.sprite_vert,fragmentShader:Oe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ne},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Oe.background_vert,fragmentShader:Oe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ne}},vertexShader:Oe.backgroundCube_vert,fragmentShader:Oe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Oe.cube_vert,fragmentShader:Oe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Oe.equirect_vert,fragmentShader:Oe.equirect_frag},distance:{uniforms:an([pe.common,pe.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Oe.distance_vert,fragmentShader:Oe.distance_frag},shadow:{uniforms:an([pe.lights,pe.fog,{color:{value:new Ke(0)},opacity:{value:1}}]),vertexShader:Oe.shadow_vert,fragmentShader:Oe.shadow_frag}};xi.physical={uniforms:an([xi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ne},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ne},clearcoatNormalScale:{value:new Qe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ne},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ne},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ne},sheen:{value:0},sheenColor:{value:new Ke(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ne},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ne},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ne},transmissionSamplerSize:{value:new Qe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ne},attenuationDistance:{value:0},attenuationColor:{value:new Ke(0)},specularColor:{value:new Ke(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ne},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ne},anisotropyVector:{value:new Qe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ne}}]),vertexShader:Oe.meshphysical_vert,fragmentShader:Oe.meshphysical_frag};const Ul={r:0,b:0,g:0},fC=new Ct,vS=new Ne;vS.set(-1,0,0,0,1,0,0,0,1);function dC(t,e,n,i,r,s){const o=new Ke(0);let a=r===!0?0:1,l,c,u=null,d=0,f=null;function p(x){let S=x.isScene===!0?x.background:null;if(S&&S.isTexture){const _=x.backgroundBlurriness>0;S=e.get(S,_)}return S}function m(x){let S=!1;const _=p(x);_===null?g(o,a):_&&_.isColor&&(g(_,1),S=!0);const w=t.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,s):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,s),(t.autoClear||S)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function E(x,S){const _=p(S);_&&(_.isCubeTexture||_.mapping===gu)?(c===void 0&&(c=new Ri(new Ha(1,1,1),new Pi({name:"BackgroundCubeMaterial",uniforms:xo(xi.backgroundCube.uniforms),vertexShader:xi.backgroundCube.vertexShader,fragmentShader:xi.backgroundCube.fragmentShader,side:Mn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(w,b,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=_,c.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(fC.makeRotationFromEuler(S.backgroundRotation)).transpose(),_.isCubeTexture&&_.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(vS),c.material.toneMapped=We.getTransfer(_.colorSpace)!==tt,(u!==_||d!==_.version||f!==t.toneMapping)&&(c.material.needsUpdate=!0,u=_,d=_.version,f=t.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new Ri(new vu(2,2),new Pi({name:"BackgroundMaterial",uniforms:xo(xi.background.uniforms),vertexShader:xi.background.vertexShader,fragmentShader:xi.background.fragmentShader,side:Pr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,l.material.toneMapped=We.getTransfer(_.colorSpace)!==tt,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),(u!==_||d!==_.version||f!==t.toneMapping)&&(l.material.needsUpdate=!0,u=_,d=_.version,f=t.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null))}function g(x,S){x.getRGB(Ul,pS(t)),n.buffers.color.setClear(Ul.r,Ul.g,Ul.b,S,s)}function h(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(x,S=1){o.set(x),a=S,g(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(x){a=x,g(o,a)},render:m,addToRenderList:E,dispose:h}}function hC(t,e){const n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},r=f(null);let s=r,o=!1;function a(D,F,X,ee,O){let q=!1;const z=d(D,ee,X,F);s!==z&&(s=z,c(s.object)),q=p(D,ee,X,O),q&&m(D,ee,X,O),O!==null&&e.update(O,t.ELEMENT_ARRAY_BUFFER),(q||o)&&(o=!1,_(D,F,X,ee),O!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(O).buffer))}function l(){return t.createVertexArray()}function c(D){return t.bindVertexArray(D)}function u(D){return t.deleteVertexArray(D)}function d(D,F,X,ee){const O=ee.wireframe===!0;let q=i[F.id];q===void 0&&(q={},i[F.id]=q);const z=D.isInstancedMesh===!0?D.id:0;let L=q[z];L===void 0&&(L={},q[z]=L);let W=L[X.id];W===void 0&&(W={},L[X.id]=W);let Z=W[O];return Z===void 0&&(Z=f(l()),W[O]=Z),Z}function f(D){const F=[],X=[],ee=[];for(let O=0;O<n;O++)F[O]=0,X[O]=0,ee[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:X,attributeDivisors:ee,object:D,attributes:{},index:null}}function p(D,F,X,ee){const O=s.attributes,q=F.attributes;let z=0;const L=X.getAttributes();for(const W in L)if(L[W].location>=0){const ne=O[W];let oe=q[W];if(oe===void 0&&(W==="instanceMatrix"&&D.instanceMatrix&&(oe=D.instanceMatrix),W==="instanceColor"&&D.instanceColor&&(oe=D.instanceColor)),ne===void 0||ne.attribute!==oe||oe&&ne.data!==oe.data)return!0;z++}return s.attributesNum!==z||s.index!==ee}function m(D,F,X,ee){const O={},q=F.attributes;let z=0;const L=X.getAttributes();for(const W in L)if(L[W].location>=0){let ne=q[W];ne===void 0&&(W==="instanceMatrix"&&D.instanceMatrix&&(ne=D.instanceMatrix),W==="instanceColor"&&D.instanceColor&&(ne=D.instanceColor));const oe={};oe.attribute=ne,ne&&ne.data&&(oe.data=ne.data),O[W]=oe,z++}s.attributes=O,s.attributesNum=z,s.index=ee}function E(){const D=s.newAttributes;for(let F=0,X=D.length;F<X;F++)D[F]=0}function g(D){h(D,0)}function h(D,F){const X=s.newAttributes,ee=s.enabledAttributes,O=s.attributeDivisors;X[D]=1,ee[D]===0&&(t.enableVertexAttribArray(D),ee[D]=1),O[D]!==F&&(t.vertexAttribDivisor(D,F),O[D]=F)}function x(){const D=s.newAttributes,F=s.enabledAttributes;for(let X=0,ee=F.length;X<ee;X++)F[X]!==D[X]&&(t.disableVertexAttribArray(X),F[X]=0)}function S(D,F,X,ee,O,q,z){z===!0?t.vertexAttribIPointer(D,F,X,O,q):t.vertexAttribPointer(D,F,X,ee,O,q)}function _(D,F,X,ee){E();const O=ee.attributes,q=X.getAttributes(),z=F.defaultAttributeValues;for(const L in q){const W=q[L];if(W.location>=0){let Z=O[L];if(Z===void 0&&(L==="instanceMatrix"&&D.instanceMatrix&&(Z=D.instanceMatrix),L==="instanceColor"&&D.instanceColor&&(Z=D.instanceColor)),Z!==void 0){const ne=Z.normalized,oe=Z.itemSize,ze=e.get(Z);if(ze===void 0)continue;const Je=ze.buffer,He=ze.type,K=ze.bytesPerElement,ae=He===t.INT||He===t.UNSIGNED_INT||Z.gpuType===nm;if(Z.isInterleavedBufferAttribute){const re=Z.data,Ie=re.stride,Ue=Z.offset;if(re.isInstancedInterleavedBuffer){for(let Pe=0;Pe<W.locationSize;Pe++)h(W.location+Pe,re.meshPerAttribute);D.isInstancedMesh!==!0&&ee._maxInstanceCount===void 0&&(ee._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let Pe=0;Pe<W.locationSize;Pe++)g(W.location+Pe);t.bindBuffer(t.ARRAY_BUFFER,Je);for(let Pe=0;Pe<W.locationSize;Pe++)S(W.location+Pe,oe/W.locationSize,He,ne,Ie*K,(Ue+oe/W.locationSize*Pe)*K,ae)}else{if(Z.isInstancedBufferAttribute){for(let re=0;re<W.locationSize;re++)h(W.location+re,Z.meshPerAttribute);D.isInstancedMesh!==!0&&ee._maxInstanceCount===void 0&&(ee._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let re=0;re<W.locationSize;re++)g(W.location+re);t.bindBuffer(t.ARRAY_BUFFER,Je);for(let re=0;re<W.locationSize;re++)S(W.location+re,oe/W.locationSize,He,ne,oe*K,oe/W.locationSize*re*K,ae)}}else if(z!==void 0){const ne=z[L];if(ne!==void 0)switch(ne.length){case 2:t.vertexAttrib2fv(W.location,ne);break;case 3:t.vertexAttrib3fv(W.location,ne);break;case 4:t.vertexAttrib4fv(W.location,ne);break;default:t.vertexAttrib1fv(W.location,ne)}}}}x()}function w(){C();for(const D in i){const F=i[D];for(const X in F){const ee=F[X];for(const O in ee){const q=ee[O];for(const z in q)u(q[z].object),delete q[z];delete ee[O]}}delete i[D]}}function b(D){if(i[D.id]===void 0)return;const F=i[D.id];for(const X in F){const ee=F[X];for(const O in ee){const q=ee[O];for(const z in q)u(q[z].object),delete q[z];delete ee[O]}}delete i[D.id]}function A(D){for(const F in i){const X=i[F];for(const ee in X){const O=X[ee];if(O[D.id]===void 0)continue;const q=O[D.id];for(const z in q)u(q[z].object),delete q[z];delete O[D.id]}}}function y(D){for(const F in i){const X=i[F],ee=D.isInstancedMesh===!0?D.id:0,O=X[ee];if(O!==void 0){for(const q in O){const z=O[q];for(const L in z)u(z[L].object),delete z[L];delete O[q]}delete X[ee],Object.keys(X).length===0&&delete i[F]}}}function C(){P(),o=!0,s!==r&&(s=r,c(s.object))}function P(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:C,resetDefaultState:P,dispose:w,releaseStatesOfGeometry:b,releaseStatesOfObject:y,releaseStatesOfProgram:A,initAttributes:E,enableAttribute:g,disableUnusedAttributes:x}}function pC(t,e,n){let i;function r(l){i=l}function s(l,c){t.drawArrays(i,l,c),n.update(c,i,1)}function o(l,c,u){u!==0&&(t.drawArraysInstanced(i,l,c,u),n.update(c,i,u))}function a(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,u);let f=0;for(let p=0;p<u;p++)f+=c[p];n.update(f,i,1)}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a}function mC(t,e,n,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");r=t.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(A){return!(A!==ri&&i.convert(A)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){const y=A===Zi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==Bn&&i.convert(A)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==_i&&!y)}function l(A){if(A==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp";const u=l(c);u!==c&&(Le("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&e.has("EXT_clip_control");n.reversedDepthBuffer===!0&&f===!1&&Le("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),m=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),E=t.getParameter(t.MAX_TEXTURE_SIZE),g=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),h=t.getParameter(t.MAX_VERTEX_ATTRIBS),x=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),S=t.getParameter(t.MAX_VARYING_VECTORS),_=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),w=t.getParameter(t.MAX_SAMPLES),b=t.getParameter(t.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:E,maxCubemapSize:g,maxAttributes:h,maxVertexUniforms:x,maxVaryings:S,maxFragmentUniforms:_,maxSamples:w,samples:b}}function gC(t){const e=this;let n=null,i=0,r=!1,s=!1;const o=new Xr,a=new Ne,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const p=d.length!==0||f||i!==0||r;return r=f,i=d.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,f){n=u(d,f,0)},this.setState=function(d,f,p){const m=d.clippingPlanes,E=d.clipIntersection,g=d.clipShadows,h=t.get(d);if(!r||m===null||m.length===0||s&&!g)s?u(null):c();else{const x=s?0:i,S=x*4;let _=h.clippingState||null;l.value=_,_=u(m,f,S,p);for(let w=0;w!==S;++w)_[w]=n[w];h.clippingState=_,this.numIntersection=E?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,f,p,m){const E=d!==null?d.length:0;let g=null;if(E!==0){if(g=l.value,m!==!0||g===null){const h=p+E*4,x=f.matrixWorldInverse;a.getNormalMatrix(x),(g===null||g.length<h)&&(g=new Float32Array(h));for(let S=0,_=p;S!==E;++S,_+=4)o.copy(d[S]).applyMatrix4(x,a),o.normal.toArray(g,_),g[_+3]=o.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=E,e.numIntersection=0,g}}const vr=4,Hg=[.125,.215,.35,.446,.526,.582],qr=20,xC=256,Go=new gS,Wg=new Ke;let Pf=null,Df=0,Lf=0,If=!1;const vC=new B;class jg{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,n=0,i=.1,r=100,s={}){const{size:o=256,position:a=vC}=s;Pf=this._renderer.getRenderTarget(),Df=this._renderer.getActiveCubeFace(),Lf=this._renderer.getActiveMipmapLevel(),If=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,a),n>0&&this._blur(l,0,0,n),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=$g(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Yg(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Pf,Df,Lf),this._renderer.xr.enabled=If,e.scissorTest=!1,Ns(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===ds||e.mapping===mo?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Pf=this._renderer.getRenderTarget(),Df=this._renderer.getActiveCubeFace(),Lf=this._renderer.getActiveMipmapLevel(),If=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:rn,minFilter:rn,generateMipmaps:!1,type:Zi,format:ri,colorSpace:Oc,depthBuffer:!1},r=Xg(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Xg(e,n,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=yC(s)),this._blurMaterial=SC(s,e,n),this._ggxMaterial=_C(s,e,n)}return r}_compileMaterial(e){const n=new Ri(new Yn,e);this._renderer.compile(n,Go)}_sceneToCubeUV(e,n,i,r,s){const l=new On(90,1,n,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,p=d.toneMapping;d.getClearColor(Wg),d.toneMapping=Ti,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Ri(new Ha,new dm({name:"PMREM.Background",side:Mn,depthWrite:!1,depthTest:!1})));const E=this._backgroundBox,g=E.material;let h=!1;const x=e.background;x?x.isColor&&(g.color.copy(x),e.background=null,h=!0):(g.color.copy(Wg),h=!0);for(let S=0;S<6;S++){const _=S%3;_===0?(l.up.set(0,c[S],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[S],s.y,s.z)):_===1?(l.up.set(0,0,c[S]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[S],s.z)):(l.up.set(0,c[S],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[S]));const w=this._cubeSize;Ns(r,_*w,S>2?w:0,w,w),d.setRenderTarget(r),h&&d.render(E,l),d.render(e,l)}d.toneMapping=p,d.autoClear=f,e.background=x}_textureToCubeUV(e,n){const i=this._renderer,r=e.mapping===ds||e.mapping===mo;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=$g()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Yg());const s=r?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=s;const a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;Ns(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(o,Go)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);n.autoClear=i}_applyGGXFilter(e,n,i){const r=this._renderer,s=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[i];a.material=o;const l=o.uniforms,c=i/(this._lodMeshes.length-1),u=n/(this._lodMeshes.length-1),d=Math.sqrt(c*c-u*u),f=0+c*1.25,p=d*f,{_lodMax:m}=this,E=this._sizeLods[i],g=3*E*(i>m-vr?i-m+vr:0),h=4*(this._cubeSize-E);l.envMap.value=e.texture,l.roughness.value=p,l.mipInt.value=m-n,Ns(s,g,h,3*E,2*E),r.setRenderTarget(s),r.render(a,Go),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=m-i,Ns(e,g,h,3*E,2*E),r.setRenderTarget(e),r.render(a,Go)}_blur(e,n,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,n,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,n,i,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&$e("blur direction must be either latitudinal or longitudinal!");const u=3,d=this._lodMeshes[r];d.material=c;const f=c.uniforms,p=this._sizeLods[i]-1,m=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*qr-1),E=s/m,g=isFinite(s)?1+Math.floor(u*E):qr;g>qr&&Le(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${qr}`);const h=[];let x=0;for(let A=0;A<qr;++A){const y=A/E,C=Math.exp(-y*y/2);h.push(C),A===0?x+=C:A<g&&(x+=2*C)}for(let A=0;A<h.length;A++)h[A]=h[A]/x;f.envMap.value=e.texture,f.samples.value=g,f.weights.value=h,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:S}=this;f.dTheta.value=m,f.mipInt.value=S-i;const _=this._sizeLods[r],w=3*_*(r>S-vr?r-S+vr:0),b=4*(this._cubeSize-_);Ns(n,w,b,3*_,2*_),l.setRenderTarget(n),l.render(d,Go)}}function yC(t){const e=[],n=[],i=[];let r=t;const s=t-vr+1+Hg.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);e.push(a);let l=1/a;o>t-vr?l=Hg[o-t+vr-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),u=-c,d=1+c,f=[u,u,d,u,d,d,u,u,d,d,u,d],p=6,m=6,E=3,g=2,h=1,x=new Float32Array(E*m*p),S=new Float32Array(g*m*p),_=new Float32Array(h*m*p);for(let b=0;b<p;b++){const A=b%3*2/3-1,y=b>2?0:-1,C=[A,y,0,A+2/3,y,0,A+2/3,y+1,0,A,y,0,A+2/3,y+1,0,A,y+1,0];x.set(C,E*m*b),S.set(f,g*m*b);const P=[b,b,b,b,b,b];_.set(P,h*m*b)}const w=new Yn;w.setAttribute("position",new Ai(x,E)),w.setAttribute("uv",new Ai(S,g)),w.setAttribute("faceIndex",new Ai(_,h)),i.push(new Ri(w,null)),r>vr&&r--}return{lodMeshes:i,sizeLods:e,sigmas:n}}function Xg(t,e,n){const i=new wi(t,e,n);return i.texture.mapping=gu,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ns(t,e,n,i,r){t.viewport.set(e,n,i,r),t.scissor.set(e,n,i,r)}function _C(t,e,n){return new Pi({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:xC,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:yu(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:ji,depthTest:!1,depthWrite:!1})}function SC(t,e,n){const i=new Float32Array(qr),r=new B(0,1,0);return new Pi({name:"SphericalGaussianBlur",defines:{n:qr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:yu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ji,depthTest:!1,depthWrite:!1})}function Yg(){return new Pi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:yu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ji,depthTest:!1,depthWrite:!1})}function $g(){return new Pi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:yu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ji,depthTest:!1,depthWrite:!1})}function yu(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class yS extends wi{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new dS(r),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Ha(5,5,5),s=new Pi({name:"CubemapFromEquirect",uniforms:xo(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Mn,blending:ji});s.uniforms.tEquirect.value=n;const o=new Ri(r,s),a=n.minFilter;return n.minFilter===Jr&&(n.minFilter=rn),new b2(1,10,this).update(e,o),n.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,n=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(n,i,r);e.setRenderTarget(s)}}function MC(t){let e=new WeakMap,n=new WeakMap,i=null;function r(f,p=!1){return f==null?null:p?o(f):s(f)}function s(f){if(f&&f.isTexture){const p=f.mapping;if(p===tf||p===nf)if(e.has(f)){const m=e.get(f).texture;return a(m,f.mapping)}else{const m=f.image;if(m&&m.height>0){const E=new yS(m.height);return E.fromEquirectangularTexture(t,f),e.set(f,E),f.addEventListener("dispose",c),a(E.texture,f.mapping)}else return null}}return f}function o(f){if(f&&f.isTexture){const p=f.mapping,m=p===tf||p===nf,E=p===ds||p===mo;if(m||E){let g=n.get(f);const h=g!==void 0?g.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==h)return i===null&&(i=new jg(t)),g=m?i.fromEquirectangular(f,g):i.fromCubemap(f,g),g.texture.pmremVersion=f.pmremVersion,n.set(f,g),g.texture;if(g!==void 0)return g.texture;{const x=f.image;return m&&x&&x.height>0||E&&x&&l(x)?(i===null&&(i=new jg(t)),g=m?i.fromEquirectangular(f):i.fromCubemap(f),g.texture.pmremVersion=f.pmremVersion,n.set(f,g),f.addEventListener("dispose",u),g.texture):null}}}return f}function a(f,p){return p===tf?f.mapping=ds:p===nf&&(f.mapping=mo),f}function l(f){let p=0;const m=6;for(let E=0;E<m;E++)f[E]!==void 0&&p++;return p===m}function c(f){const p=f.target;p.removeEventListener("dispose",c);const m=e.get(p);m!==void 0&&(e.delete(p),m.dispose())}function u(f){const p=f.target;p.removeEventListener("dispose",u);const m=n.get(p);m!==void 0&&(n.delete(p),m.dispose())}function d(){e=new WeakMap,n=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:d}}function EC(t){const e={};function n(i){if(e[i]!==void 0)return e[i];const r=t.getExtension(i);return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const r=n(i);return r===null&&ro("WebGLRenderer: "+i+" extension not supported."),r}}}function TC(t,e,n,i){const r={},s=new WeakMap;function o(d){const f=d.target;f.index!==null&&e.remove(f.index);for(const m in f.attributes)e.remove(f.attributes[m]);f.removeEventListener("dispose",o),delete r[f.id];const p=s.get(f);p&&(e.remove(p),s.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,n.memory.geometries--}function a(d,f){return r[f.id]===!0||(f.addEventListener("dispose",o),r[f.id]=!0,n.memory.geometries++),f}function l(d){const f=d.attributes;for(const p in f)e.update(f[p],t.ARRAY_BUFFER)}function c(d){const f=[],p=d.index,m=d.attributes.position;let E=0;if(m===void 0)return;if(p!==null){const x=p.array;E=p.version;for(let S=0,_=x.length;S<_;S+=3){const w=x[S+0],b=x[S+1],A=x[S+2];f.push(w,b,b,A,A,w)}}else{const x=m.array;E=m.version;for(let S=0,_=x.length/3-1;S<_;S+=3){const w=S+0,b=S+1,A=S+2;f.push(w,b,b,A,A,w)}}const g=new(m.count>=65535?lS:aS)(f,1);g.version=E;const h=s.get(d);h&&e.remove(h),s.set(d,g)}function u(d){const f=s.get(d);if(f){const p=d.index;p!==null&&f.version<p.version&&c(d)}else c(d);return s.get(d)}return{get:a,update:l,getWireframeAttribute:u}}function wC(t,e,n){let i;function r(d){i=d}let s,o;function a(d){s=d.type,o=d.bytesPerElement}function l(d,f){t.drawElements(i,f,s,d*o),n.update(f,i,1)}function c(d,f,p){p!==0&&(t.drawElementsInstanced(i,f,s,d*o,p),n.update(f,i,p))}function u(d,f,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,s,d,0,p);let E=0;for(let g=0;g<p;g++)E+=f[g];n.update(E,i,1)}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function AC(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(n.calls++,o){case t.TRIANGLES:n.triangles+=a*(s/3);break;case t.LINES:n.lines+=a*(s/2);break;case t.LINE_STRIP:n.lines+=a*(s-1);break;case t.LINE_LOOP:n.lines+=a*s;break;case t.POINTS:n.points+=a*s;break;default:$e("WebGLInfo: Unknown draw mode:",o);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function bC(t,e,n){const i=new WeakMap,r=new Et;function s(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0;let f=i.get(a);if(f===void 0||f.count!==d){let P=function(){y.dispose(),i.delete(a),a.removeEventListener("dispose",P)};var p=P;f!==void 0&&f.texture.dispose();const m=a.morphAttributes.position!==void 0,E=a.morphAttributes.normal!==void 0,g=a.morphAttributes.color!==void 0,h=a.morphAttributes.position||[],x=a.morphAttributes.normal||[],S=a.morphAttributes.color||[];let _=0;m===!0&&(_=1),E===!0&&(_=2),g===!0&&(_=3);let w=a.attributes.position.count*_,b=1;w>e.maxTextureSize&&(b=Math.ceil(w/e.maxTextureSize),w=e.maxTextureSize);const A=new Float32Array(w*b*4*d),y=new rS(A,w,b,d);y.type=_i,y.needsUpdate=!0;const C=_*4;for(let D=0;D<d;D++){const F=h[D],X=x[D],ee=S[D],O=w*b*4*D;for(let q=0;q<F.count;q++){const z=q*C;m===!0&&(r.fromBufferAttribute(F,q),A[O+z+0]=r.x,A[O+z+1]=r.y,A[O+z+2]=r.z,A[O+z+3]=0),E===!0&&(r.fromBufferAttribute(X,q),A[O+z+4]=r.x,A[O+z+5]=r.y,A[O+z+6]=r.z,A[O+z+7]=0),g===!0&&(r.fromBufferAttribute(ee,q),A[O+z+8]=r.x,A[O+z+9]=r.y,A[O+z+10]=r.z,A[O+z+11]=ee.itemSize===4?r.w:1)}}f={count:d,texture:y,size:new Qe(w,b)},i.set(a,f),a.addEventListener("dispose",P)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(t,"morphTexture",o.morphTexture,n);else{let m=0;for(let g=0;g<c.length;g++)m+=c[g];const E=a.morphTargetsRelative?1:1-m;l.getUniforms().setValue(t,"morphTargetBaseInfluence",E),l.getUniforms().setValue(t,"morphTargetInfluences",c)}l.getUniforms().setValue(t,"morphTargetsTexture",f.texture,n),l.getUniforms().setValue(t,"morphTargetsTextureSize",f.size)}return{update:s}}function CC(t,e,n,i,r){let s=new WeakMap;function o(c){const u=r.render.frame,d=c.geometry,f=e.get(c,d);if(s.get(f)!==u&&(e.update(f),s.set(f,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==u&&(n.update(c.instanceMatrix,t.ARRAY_BUFFER),c.instanceColor!==null&&n.update(c.instanceColor,t.ARRAY_BUFFER),s.set(c,u))),c.isSkinnedMesh){const p=c.skeleton;s.get(p)!==u&&(p.update(),s.set(p,u))}return f}function a(){s=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),i.releaseStatesOfObject(u),n.remove(u.instanceMatrix),u.instanceColor!==null&&n.remove(u.instanceColor)}return{update:o,dispose:a}}const RC={[G_]:"LINEAR_TONE_MAPPING",[H_]:"REINHARD_TONE_MAPPING",[W_]:"CINEON_TONE_MAPPING",[j_]:"ACES_FILMIC_TONE_MAPPING",[Y_]:"AGX_TONE_MAPPING",[$_]:"NEUTRAL_TONE_MAPPING",[X_]:"CUSTOM_TONE_MAPPING"};function PC(t,e,n,i,r,s){const o=new wi(e,n,{type:t,depthBuffer:r,stencilBuffer:s,samples:i?4:0,depthTexture:r?new go(e,n):void 0}),a=new wi(e,n,{type:Zi,depthBuffer:!1,stencilBuffer:!1}),l=new Yn;l.setAttribute("position",new sn([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new sn([0,2,0,0,2,0],2));const c=new T2({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),u=new Ri(l,c),d=new gS(-1,1,1,-1,0,1);let f=null,p=null,m=!1,E,g=null,h=[],x=!1;this.setSize=function(S,_){o.setSize(S,_),a.setSize(S,_);for(let w=0;w<h.length;w++){const b=h[w];b.setSize&&b.setSize(S,_)}},this.setEffects=function(S){h=S,x=h.length>0&&h[0].isRenderPass===!0;const _=o.width,w=o.height;for(let b=0;b<h.length;b++){const A=h[b];A.setSize&&A.setSize(_,w)}},this.begin=function(S,_){if(m||S.toneMapping===Ti&&h.length===0)return!1;if(g=_,_!==null){const w=_.width,b=_.height;(o.width!==w||o.height!==b)&&this.setSize(w,b)}return x===!1&&S.setRenderTarget(o),E=S.toneMapping,S.toneMapping=Ti,!0},this.hasRenderPass=function(){return x},this.end=function(S,_){S.toneMapping=E,m=!0;let w=o,b=a;for(let A=0;A<h.length;A++){const y=h[A];if(y.enabled!==!1&&(y.render(S,b,w,_),y.needsSwap!==!1)){const C=w;w=b,b=C}}if(f!==S.outputColorSpace||p!==S.toneMapping){f=S.outputColorSpace,p=S.toneMapping,c.defines={},We.getTransfer(f)===tt&&(c.defines.SRGB_TRANSFER="");const A=RC[p];A&&(c.defines[A]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=w.texture,S.setRenderTarget(g),S.render(u,d),g=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){o.depthTexture&&o.depthTexture.dispose(),o.dispose(),a.dispose(),l.dispose(),c.dispose()}}const _S=new dn,Nh=new go(1,1),SS=new rS,MS=new Jw,ES=new dS,qg=[],Kg=[],Zg=new Float32Array(16),Qg=new Float32Array(9),Jg=new Float32Array(4);function To(t,e,n){const i=t[0];if(i<=0||i>0)return t;const r=e*n;let s=qg[r];if(s===void 0&&(s=new Float32Array(r),qg[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=n,t[o].toArray(s,a)}return s}function Ot(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function Bt(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function _u(t,e){let n=Kg[e];n===void 0&&(n=new Int32Array(e),Kg[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function DC(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function LC(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Ot(n,e))return;t.uniform2fv(this.addr,e),Bt(n,e)}}function IC(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(Ot(n,e))return;t.uniform3fv(this.addr,e),Bt(n,e)}}function NC(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Ot(n,e))return;t.uniform4fv(this.addr,e),Bt(n,e)}}function UC(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Ot(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),Bt(n,e)}else{if(Ot(n,i))return;Jg.set(i),t.uniformMatrix2fv(this.addr,!1,Jg),Bt(n,i)}}function FC(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Ot(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),Bt(n,e)}else{if(Ot(n,i))return;Qg.set(i),t.uniformMatrix3fv(this.addr,!1,Qg),Bt(n,i)}}function kC(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Ot(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),Bt(n,e)}else{if(Ot(n,i))return;Zg.set(i),t.uniformMatrix4fv(this.addr,!1,Zg),Bt(n,i)}}function OC(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function BC(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Ot(n,e))return;t.uniform2iv(this.addr,e),Bt(n,e)}}function VC(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Ot(n,e))return;t.uniform3iv(this.addr,e),Bt(n,e)}}function zC(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Ot(n,e))return;t.uniform4iv(this.addr,e),Bt(n,e)}}function GC(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function HC(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Ot(n,e))return;t.uniform2uiv(this.addr,e),Bt(n,e)}}function WC(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Ot(n,e))return;t.uniform3uiv(this.addr,e),Bt(n,e)}}function jC(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Ot(n,e))return;t.uniform4uiv(this.addr,e),Bt(n,e)}}function XC(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);let s;this.type===t.SAMPLER_2D_SHADOW?(Nh.compareFunction=n.isReversedDepthBuffer()?cm:lm,s=Nh):s=_S,n.setTexture2D(e||s,r)}function YC(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||MS,r)}function $C(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(e||ES,r)}function qC(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||SS,r)}function KC(t){switch(t){case 5126:return DC;case 35664:return LC;case 35665:return IC;case 35666:return NC;case 35674:return UC;case 35675:return FC;case 35676:return kC;case 5124:case 35670:return OC;case 35667:case 35671:return BC;case 35668:case 35672:return VC;case 35669:case 35673:return zC;case 5125:return GC;case 36294:return HC;case 36295:return WC;case 36296:return jC;case 35678:case 36198:case 36298:case 36306:case 35682:return XC;case 35679:case 36299:case 36307:return YC;case 35680:case 36300:case 36308:case 36293:return $C;case 36289:case 36303:case 36311:case 36292:return qC}}function ZC(t,e){t.uniform1fv(this.addr,e)}function QC(t,e){const n=To(e,this.size,2);t.uniform2fv(this.addr,n)}function JC(t,e){const n=To(e,this.size,3);t.uniform3fv(this.addr,n)}function eR(t,e){const n=To(e,this.size,4);t.uniform4fv(this.addr,n)}function tR(t,e){const n=To(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function nR(t,e){const n=To(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function iR(t,e){const n=To(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function rR(t,e){t.uniform1iv(this.addr,e)}function sR(t,e){t.uniform2iv(this.addr,e)}function oR(t,e){t.uniform3iv(this.addr,e)}function aR(t,e){t.uniform4iv(this.addr,e)}function lR(t,e){t.uniform1uiv(this.addr,e)}function cR(t,e){t.uniform2uiv(this.addr,e)}function uR(t,e){t.uniform3uiv(this.addr,e)}function fR(t,e){t.uniform4uiv(this.addr,e)}function dR(t,e,n){const i=this.cache,r=e.length,s=_u(n,r);Ot(i,s)||(t.uniform1iv(this.addr,s),Bt(i,s));let o;this.type===t.SAMPLER_2D_SHADOW?o=Nh:o=_S;for(let a=0;a!==r;++a)n.setTexture2D(e[a]||o,s[a])}function hR(t,e,n){const i=this.cache,r=e.length,s=_u(n,r);Ot(i,s)||(t.uniform1iv(this.addr,s),Bt(i,s));for(let o=0;o!==r;++o)n.setTexture3D(e[o]||MS,s[o])}function pR(t,e,n){const i=this.cache,r=e.length,s=_u(n,r);Ot(i,s)||(t.uniform1iv(this.addr,s),Bt(i,s));for(let o=0;o!==r;++o)n.setTextureCube(e[o]||ES,s[o])}function mR(t,e,n){const i=this.cache,r=e.length,s=_u(n,r);Ot(i,s)||(t.uniform1iv(this.addr,s),Bt(i,s));for(let o=0;o!==r;++o)n.setTexture2DArray(e[o]||SS,s[o])}function gR(t){switch(t){case 5126:return ZC;case 35664:return QC;case 35665:return JC;case 35666:return eR;case 35674:return tR;case 35675:return nR;case 35676:return iR;case 5124:case 35670:return rR;case 35667:case 35671:return sR;case 35668:case 35672:return oR;case 35669:case 35673:return aR;case 5125:return lR;case 36294:return cR;case 36295:return uR;case 36296:return fR;case 35678:case 36198:case 36298:case 36306:case 35682:return dR;case 35679:case 36299:case 36307:return hR;case 35680:case 36300:case 36308:case 36293:return pR;case 36289:case 36303:case 36311:case 36292:return mR}}class xR{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=KC(n.type)}}class vR{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=gR(n.type)}}class yR{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,n[a.id],i)}}}const Nf=/(\w+)(\])?(\[|\.)?/g;function ex(t,e){t.seq.push(e),t.map[e.id]=e}function _R(t,e,n){const i=t.name,r=i.length;for(Nf.lastIndex=0;;){const s=Nf.exec(i),o=Nf.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){ex(n,c===void 0?new xR(a,t,e):new vR(a,t,e));break}else{let d=n.map[a];d===void 0&&(d=new yR(a),ex(n,d)),n=d}}}class rc{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){const a=e.getActiveUniform(n,o),l=e.getUniformLocation(n,a.name);_R(a,l,this)}const r=[],s=[];for(const o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(o):s.push(o);r.length>0&&(this.seq=r.concat(s))}setValue(e,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(e,i,r)}setOptional(e,n,i){const r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let s=0,o=n.length;s!==o;++s){const a=n[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,n){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in n&&i.push(o)}return i}}function tx(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const SR=37297;let MR=0;function ER(t,e){const n=t.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${n[o]}`)}return i.join(`
`)}const nx=new Ne;function TR(t){We._getMatrix(nx,We.workingColorSpace,t);const e=`mat3( ${nx.elements.map(n=>n.toFixed(4))} )`;switch(We.getTransfer(t)){case Bc:return[e,"LinearTransferOETF"];case tt:return[e,"sRGBTransferOETF"];default:return Le("WebGLProgram: Unsupported color space: ",t),[e,"LinearTransferOETF"]}}function ix(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),s=(t.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const a=parseInt(o[1]);return n.toUpperCase()+`

`+s+`

`+ER(t.getShaderSource(e),a)}else return s}function wR(t,e){const n=TR(e);return[`vec4 ${t}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}const AR={[G_]:"Linear",[H_]:"Reinhard",[W_]:"Cineon",[j_]:"ACESFilmic",[Y_]:"AgX",[$_]:"Neutral",[X_]:"Custom"};function bR(t,e){const n=AR[e];return n===void 0?(Le("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+t+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const Fl=new B;function CR(){We.getLuminanceCoefficients(Fl);const t=Fl.x.toFixed(4),e=Fl.y.toFixed(4),n=Fl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function RR(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Zo).join(`
`)}function PR(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function DR(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=t.getActiveAttrib(e,r),o=s.name;let a=1;s.type===t.FLOAT_MAT2&&(a=2),s.type===t.FLOAT_MAT3&&(a=3),s.type===t.FLOAT_MAT4&&(a=4),n[o]={type:s.type,location:t.getAttribLocation(e,o),locationSize:a}}return n}function Zo(t){return t!==""}function rx(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function sx(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const LR=/^[ \t]*#include +<([\w\d./]+)>/gm;function Uh(t){return t.replace(LR,NR)}const IR=new Map;function NR(t,e){let n=Oe[e];if(n===void 0){const i=IR.get(e);if(i!==void 0)n=Oe[i],Le('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Uh(n)}const UR=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ox(t){return t.replace(UR,FR)}function FR(t,e,n,i){let r="";for(let s=parseInt(e);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function ax(t){let e=`precision ${t.precision} float;
	precision ${t.precision} int;
	precision ${t.precision} sampler2D;
	precision ${t.precision} samplerCube;
	precision ${t.precision} sampler3D;
	precision ${t.precision} sampler2DArray;
	precision ${t.precision} sampler2DShadow;
	precision ${t.precision} samplerCubeShadow;
	precision ${t.precision} sampler2DArrayShadow;
	precision ${t.precision} isampler2D;
	precision ${t.precision} isampler3D;
	precision ${t.precision} isamplerCube;
	precision ${t.precision} isampler2DArray;
	precision ${t.precision} usampler2D;
	precision ${t.precision} usampler3D;
	precision ${t.precision} usamplerCube;
	precision ${t.precision} usampler2DArray;
	`;return t.precision==="highp"?e+=`
#define HIGH_PRECISION`:t.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:t.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const kR={[Jl]:"SHADOWMAP_TYPE_PCF",[qo]:"SHADOWMAP_TYPE_VSM"};function OR(t){return kR[t.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const BR={[ds]:"ENVMAP_TYPE_CUBE",[mo]:"ENVMAP_TYPE_CUBE",[gu]:"ENVMAP_TYPE_CUBE_UV"};function VR(t){return t.envMap===!1?"ENVMAP_TYPE_CUBE":BR[t.envMapMode]||"ENVMAP_TYPE_CUBE"}const zR={[mo]:"ENVMAP_MODE_REFRACTION"};function GR(t){return t.envMap===!1?"ENVMAP_MODE_REFLECTION":zR[t.envMapMode]||"ENVMAP_MODE_REFLECTION"}const HR={[z_]:"ENVMAP_BLENDING_MULTIPLY",[Lw]:"ENVMAP_BLENDING_MIX",[Iw]:"ENVMAP_BLENDING_ADD"};function WR(t){return t.envMap===!1?"ENVMAP_BLENDING_NONE":HR[t.combine]||"ENVMAP_BLENDING_NONE"}function jR(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function XR(t,e,n,i){const r=t.getContext(),s=n.defines;let o=n.vertexShader,a=n.fragmentShader;const l=OR(n),c=VR(n),u=GR(n),d=WR(n),f=jR(n),p=RR(n),m=PR(s),E=r.createProgram();let g,h,x=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(g=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,m].filter(Zo).join(`
`),g.length>0&&(g+=`
`),h=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,m].filter(Zo).join(`
`),h.length>0&&(h+=`
`)):(g=[ax(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,m,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+u:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexNormals?"#define HAS_NORMAL":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Zo).join(`
`),h=[ax(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,m,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+u:"",n.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==Ti?"#define TONE_MAPPING":"",n.toneMapping!==Ti?Oe.tonemapping_pars_fragment:"",n.toneMapping!==Ti?bR("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Oe.colorspace_pars_fragment,wR("linearToOutputTexel",n.outputColorSpace),CR(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(Zo).join(`
`)),o=Uh(o),o=rx(o,n),o=sx(o,n),a=Uh(a),a=rx(a,n),a=sx(a,n),o=ox(o),a=ox(a),n.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,g=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,h=["#define varying in",n.glslVersion===xg?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===xg?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const S=x+g+o,_=x+h+a,w=tx(r,r.VERTEX_SHADER,S),b=tx(r,r.FRAGMENT_SHADER,_);r.attachShader(E,w),r.attachShader(E,b),n.index0AttributeName!==void 0?r.bindAttribLocation(E,0,n.index0AttributeName):n.hasPositionAttribute===!0&&r.bindAttribLocation(E,0,"position"),r.linkProgram(E);function A(D){if(t.debug.checkShaderErrors){const F=r.getProgramInfoLog(E)||"",X=r.getShaderInfoLog(w)||"",ee=r.getShaderInfoLog(b)||"",O=F.trim(),q=X.trim(),z=ee.trim();let L=!0,W=!0;if(r.getProgramParameter(E,r.LINK_STATUS)===!1)if(L=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,E,w,b);else{const Z=ix(r,w,"vertex"),ne=ix(r,b,"fragment");$e("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(E,r.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+O+`
`+Z+`
`+ne)}else O!==""?Le("WebGLProgram: Program Info Log:",O):(q===""||z==="")&&(W=!1);W&&(D.diagnostics={runnable:L,programLog:O,vertexShader:{log:q,prefix:g},fragmentShader:{log:z,prefix:h}})}r.deleteShader(w),r.deleteShader(b),y=new rc(r,E),C=DR(r,E)}let y;this.getUniforms=function(){return y===void 0&&A(this),y};let C;this.getAttributes=function(){return C===void 0&&A(this),C};let P=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=r.getProgramParameter(E,SR)),P},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(E),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=MR++,this.cacheKey=e,this.usedTimes=1,this.program=E,this.vertexShader=w,this.fragmentShader=b,this}let YR=0;class $R{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,n,i){const r=this._getShaderCacheForMaterial(e);return r.has(n)===!1&&(r.add(n),n.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new qR(e),n.set(e,i)),i}}class qR{constructor(e){this.id=YR++,this.code=e,this.usedTimes=0}}function KR(t){return t===hs||t===Fc||t===kc}function ZR(t,e,n,i,r,s){const o=new sS,a=new $R,l=new Set,c=[],u=new Map,d=i.logarithmicDepthBuffer;let f=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(y){return l.add(y),y===0?"uv":`uv${y}`}function E(y,C,P,D,F,X){const ee=D.fog,O=F.geometry,q=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?D.environment:null,z=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,L=e.get(y.envMap||q,z),W=L&&L.mapping===gu?L.image.height:null,Z=p[y.type];y.precision!==null&&(f=i.getMaxPrecision(y.precision),f!==y.precision&&Le("WebGLProgram.getParameters:",y.precision,"not supported, using",f,"instead."));const ne=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,oe=ne!==void 0?ne.length:0;let ze=0;O.morphAttributes.position!==void 0&&(ze=1),O.morphAttributes.normal!==void 0&&(ze=2),O.morphAttributes.color!==void 0&&(ze=3);let Je,He,K,ae;if(Z){const Ee=xi[Z];Je=Ee.vertexShader,He=Ee.fragmentShader}else{Je=y.vertexShader,He=y.fragmentShader;const Ee=a.getVertexShaderStage(y),yt=a.getFragmentShaderStage(y);a.update(y,Ee,yt),K=Ee.id,ae=yt.id}const re=t.getRenderTarget(),Ie=t.state.buffers.depth.getReversed(),Ue=F.isInstancedMesh===!0,Pe=F.isBatchedMesh===!0,Tt=!!y.map,Ge=!!y.matcap,rt=!!L,Ze=!!y.aoMap,Xe=!!y.lightMap,Rt=!!y.bumpMap&&y.wireframe===!1,Nt=!!y.normalMap,Vt=!!y.displacementMap,Wt=!!y.emissiveMap,vt=!!y.metalnessMap,Pt=!!y.roughnessMap,N=y.anisotropy>0,mn=y.clearcoat>0,et=y.dispersion>0,R=y.iridescence>0,M=y.sheen>0,k=y.transmission>0,H=N&&!!y.anisotropyMap,Y=mn&&!!y.clearcoatMap,se=mn&&!!y.clearcoatNormalMap,ce=mn&&!!y.clearcoatRoughnessMap,$=R&&!!y.iridescenceMap,J=R&&!!y.iridescenceThicknessMap,ue=M&&!!y.sheenColorMap,Ae=M&&!!y.sheenRoughnessMap,he=!!y.specularMap,fe=!!y.specularColorMap,Re=!!y.specularIntensityMap,De=k&&!!y.transmissionMap,Fe=k&&!!y.thicknessMap,I=!!y.gradientMap,le=!!y.alphaMap,Q=y.alphaTest>0,de=!!y.alphaHash,xe=!!y.extensions;let te=Ti;y.toneMapped&&(re===null||re.isXRRenderTarget===!0)&&(te=t.toneMapping);const we={shaderID:Z,shaderType:y.type,shaderName:y.name,vertexShader:Je,fragmentShader:He,defines:y.defines,customVertexShaderID:K,customFragmentShaderID:ae,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:f,batching:Pe,batchingColor:Pe&&F._colorsTexture!==null,instancing:Ue,instancingColor:Ue&&F.instanceColor!==null,instancingMorph:Ue&&F.morphTexture!==null,outputColorSpace:re===null?t.outputColorSpace:re.isXRRenderTarget===!0?re.texture.colorSpace:We.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:Tt,matcap:Ge,envMap:rt,envMapMode:rt&&L.mapping,envMapCubeUVHeight:W,aoMap:Ze,lightMap:Xe,bumpMap:Rt,normalMap:Nt,displacementMap:Vt,emissiveMap:Wt,normalMapObjectSpace:Nt&&y.normalMapType===Fw,normalMapTangentSpace:Nt&&y.normalMapType===pg,packedNormalMap:Nt&&y.normalMapType===pg&&KR(y.normalMap.format),metalnessMap:vt,roughnessMap:Pt,anisotropy:N,anisotropyMap:H,clearcoat:mn,clearcoatMap:Y,clearcoatNormalMap:se,clearcoatRoughnessMap:ce,dispersion:et,iridescence:R,iridescenceMap:$,iridescenceThicknessMap:J,sheen:M,sheenColorMap:ue,sheenRoughnessMap:Ae,specularMap:he,specularColorMap:fe,specularIntensityMap:Re,transmission:k,transmissionMap:De,thicknessMap:Fe,gradientMap:I,opaque:y.transparent===!1&&y.blending===io&&y.alphaToCoverage===!1,alphaMap:le,alphaTest:Q,alphaHash:de,combine:y.combine,mapUv:Tt&&m(y.map.channel),aoMapUv:Ze&&m(y.aoMap.channel),lightMapUv:Xe&&m(y.lightMap.channel),bumpMapUv:Rt&&m(y.bumpMap.channel),normalMapUv:Nt&&m(y.normalMap.channel),displacementMapUv:Vt&&m(y.displacementMap.channel),emissiveMapUv:Wt&&m(y.emissiveMap.channel),metalnessMapUv:vt&&m(y.metalnessMap.channel),roughnessMapUv:Pt&&m(y.roughnessMap.channel),anisotropyMapUv:H&&m(y.anisotropyMap.channel),clearcoatMapUv:Y&&m(y.clearcoatMap.channel),clearcoatNormalMapUv:se&&m(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ce&&m(y.clearcoatRoughnessMap.channel),iridescenceMapUv:$&&m(y.iridescenceMap.channel),iridescenceThicknessMapUv:J&&m(y.iridescenceThicknessMap.channel),sheenColorMapUv:ue&&m(y.sheenColorMap.channel),sheenRoughnessMapUv:Ae&&m(y.sheenRoughnessMap.channel),specularMapUv:he&&m(y.specularMap.channel),specularColorMapUv:fe&&m(y.specularColorMap.channel),specularIntensityMapUv:Re&&m(y.specularIntensityMap.channel),transmissionMapUv:De&&m(y.transmissionMap.channel),thicknessMapUv:Fe&&m(y.thicknessMap.channel),alphaMapUv:le&&m(y.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(Nt||N),vertexNormals:!!O.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!O.attributes.uv&&(Tt||le),fog:!!ee,useFog:y.fog===!0,fogExp2:!!ee&&ee.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||O.attributes.normal===void 0&&Nt===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:Ie,skinning:F.isSkinnedMesh===!0,hasPositionAttribute:O.attributes.position!==void 0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:oe,morphTextureStride:ze,numDirLights:C.directional.length,numPointLights:C.point.length,numSpotLights:C.spot.length,numSpotLightMaps:C.spotLightMap.length,numRectAreaLights:C.rectArea.length,numHemiLights:C.hemi.length,numDirLightShadows:C.directionalShadowMap.length,numPointLightShadows:C.pointShadowMap.length,numSpotLightShadows:C.spotShadowMap.length,numSpotLightShadowsWithMaps:C.numSpotLightShadowsWithMaps,numLightProbes:C.numLightProbes,numLightProbeGrids:X.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:y.dithering,shadowMapEnabled:t.shadowMap.enabled&&P.length>0,shadowMapType:t.shadowMap.type,toneMapping:te,decodeVideoTexture:Tt&&y.map.isVideoTexture===!0&&We.getTransfer(y.map.colorSpace)===tt,decodeVideoTextureEmissive:Wt&&y.emissiveMap.isVideoTexture===!0&&We.getTransfer(y.emissiveMap.colorSpace)===tt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Vi,flipSided:y.side===Mn,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:xe&&y.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(xe&&y.extensions.multiDraw===!0||Pe)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return we.vertexUv1s=l.has(1),we.vertexUv2s=l.has(2),we.vertexUv3s=l.has(3),l.clear(),we}function g(y){const C=[];if(y.shaderID?C.push(y.shaderID):(C.push(y.customVertexShaderID),C.push(y.customFragmentShaderID)),y.defines!==void 0)for(const P in y.defines)C.push(P),C.push(y.defines[P]);return y.isRawShaderMaterial===!1&&(h(C,y),x(C,y),C.push(t.outputColorSpace)),C.push(y.customProgramCacheKey),C.join()}function h(y,C){y.push(C.precision),y.push(C.outputColorSpace),y.push(C.envMapMode),y.push(C.envMapCubeUVHeight),y.push(C.mapUv),y.push(C.alphaMapUv),y.push(C.lightMapUv),y.push(C.aoMapUv),y.push(C.bumpMapUv),y.push(C.normalMapUv),y.push(C.displacementMapUv),y.push(C.emissiveMapUv),y.push(C.metalnessMapUv),y.push(C.roughnessMapUv),y.push(C.anisotropyMapUv),y.push(C.clearcoatMapUv),y.push(C.clearcoatNormalMapUv),y.push(C.clearcoatRoughnessMapUv),y.push(C.iridescenceMapUv),y.push(C.iridescenceThicknessMapUv),y.push(C.sheenColorMapUv),y.push(C.sheenRoughnessMapUv),y.push(C.specularMapUv),y.push(C.specularColorMapUv),y.push(C.specularIntensityMapUv),y.push(C.transmissionMapUv),y.push(C.thicknessMapUv),y.push(C.combine),y.push(C.fogExp2),y.push(C.sizeAttenuation),y.push(C.morphTargetsCount),y.push(C.morphAttributeCount),y.push(C.numDirLights),y.push(C.numPointLights),y.push(C.numSpotLights),y.push(C.numSpotLightMaps),y.push(C.numHemiLights),y.push(C.numRectAreaLights),y.push(C.numDirLightShadows),y.push(C.numPointLightShadows),y.push(C.numSpotLightShadows),y.push(C.numSpotLightShadowsWithMaps),y.push(C.numLightProbes),y.push(C.shadowMapType),y.push(C.toneMapping),y.push(C.numClippingPlanes),y.push(C.numClipIntersection),y.push(C.depthPacking)}function x(y,C){o.disableAll(),C.instancing&&o.enable(0),C.instancingColor&&o.enable(1),C.instancingMorph&&o.enable(2),C.matcap&&o.enable(3),C.envMap&&o.enable(4),C.normalMapObjectSpace&&o.enable(5),C.normalMapTangentSpace&&o.enable(6),C.clearcoat&&o.enable(7),C.iridescence&&o.enable(8),C.alphaTest&&o.enable(9),C.vertexColors&&o.enable(10),C.vertexAlphas&&o.enable(11),C.vertexUv1s&&o.enable(12),C.vertexUv2s&&o.enable(13),C.vertexUv3s&&o.enable(14),C.vertexTangents&&o.enable(15),C.anisotropy&&o.enable(16),C.alphaHash&&o.enable(17),C.batching&&o.enable(18),C.dispersion&&o.enable(19),C.batchingColor&&o.enable(20),C.gradientMap&&o.enable(21),C.packedNormalMap&&o.enable(22),C.vertexNormals&&o.enable(23),y.push(o.mask),o.disableAll(),C.fog&&o.enable(0),C.useFog&&o.enable(1),C.flatShading&&o.enable(2),C.logarithmicDepthBuffer&&o.enable(3),C.reversedDepthBuffer&&o.enable(4),C.skinning&&o.enable(5),C.morphTargets&&o.enable(6),C.morphNormals&&o.enable(7),C.morphColors&&o.enable(8),C.premultipliedAlpha&&o.enable(9),C.shadowMapEnabled&&o.enable(10),C.doubleSided&&o.enable(11),C.flipSided&&o.enable(12),C.useDepthPacking&&o.enable(13),C.dithering&&o.enable(14),C.transmission&&o.enable(15),C.sheen&&o.enable(16),C.opaque&&o.enable(17),C.pointsUvs&&o.enable(18),C.decodeVideoTexture&&o.enable(19),C.decodeVideoTextureEmissive&&o.enable(20),C.alphaToCoverage&&o.enable(21),C.numLightProbeGrids>0&&o.enable(22),C.hasPositionAttribute&&o.enable(23),y.push(o.mask)}function S(y){const C=p[y.type];let P;if(C){const D=xi[C];P=S2.clone(D.uniforms)}else P=y.uniforms;return P}function _(y,C){let P=u.get(C);return P!==void 0?++P.usedTimes:(P=new XR(t,C,y,r),c.push(P),u.set(C,P)),P}function w(y){if(--y.usedTimes===0){const C=c.indexOf(y);c[C]=c[c.length-1],c.pop(),u.delete(y.cacheKey),y.destroy()}}function b(y){a.remove(y)}function A(){a.dispose()}return{getParameters:E,getProgramCacheKey:g,getUniforms:S,acquireProgram:_,releaseProgram:w,releaseShaderCache:b,programs:c,dispose:A}}function QR(){let t=new WeakMap;function e(o){return t.has(o)}function n(o){let a=t.get(o);return a===void 0&&(a={},t.set(o,a)),a}function i(o){t.delete(o)}function r(o,a,l){t.get(o)[a]=l}function s(){t=new WeakMap}return{has:e,get:n,remove:i,update:r,dispose:s}}function JR(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.materialVariant!==e.materialVariant?t.materialVariant-e.materialVariant:t.z!==e.z?t.z-e.z:t.id-e.id}function lx(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function cx(){const t=[];let e=0;const n=[],i=[],r=[];function s(){e=0,n.length=0,i.length=0,r.length=0}function o(f){let p=0;return f.isInstancedMesh&&(p+=2),f.isSkinnedMesh&&(p+=1),p}function a(f,p,m,E,g,h){let x=t[e];return x===void 0?(x={id:f.id,object:f,geometry:p,material:m,materialVariant:o(f),groupOrder:E,renderOrder:f.renderOrder,z:g,group:h},t[e]=x):(x.id=f.id,x.object=f,x.geometry=p,x.material=m,x.materialVariant=o(f),x.groupOrder=E,x.renderOrder=f.renderOrder,x.z=g,x.group=h),e++,x}function l(f,p,m,E,g,h){const x=a(f,p,m,E,g,h);m.transmission>0?i.push(x):m.transparent===!0?r.push(x):n.push(x)}function c(f,p,m,E,g,h){const x=a(f,p,m,E,g,h);m.transmission>0?i.unshift(x):m.transparent===!0?r.unshift(x):n.unshift(x)}function u(f,p,m){n.length>1&&n.sort(f||JR),i.length>1&&i.sort(p||lx),r.length>1&&r.sort(p||lx),m&&(n.reverse(),i.reverse(),r.reverse())}function d(){for(let f=e,p=t.length;f<p;f++){const m=t[f];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:l,unshift:c,finish:d,sort:u}}function e3(){let t=new WeakMap;function e(i,r){const s=t.get(i);let o;return s===void 0?(o=new cx,t.set(i,[o])):r>=s.length?(o=new cx,s.push(o)):o=s[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}function t3(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new B,color:new Ke};break;case"SpotLight":n={position:new B,direction:new B,color:new Ke,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new B,color:new Ke,distance:0,decay:0};break;case"HemisphereLight":n={direction:new B,skyColor:new Ke,groundColor:new Ke};break;case"RectAreaLight":n={color:new Ke,position:new B,halfWidth:new B,halfHeight:new B};break}return t[e.id]=n,n}}}function n3(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Qe};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Qe};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Qe,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let i3=0;function r3(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function s3(t){const e=new t3,n=n3(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new B);const r=new B,s=new Ct,o=new Ct;function a(c){let u=0,d=0,f=0;for(let C=0;C<9;C++)i.probe[C].set(0,0,0);let p=0,m=0,E=0,g=0,h=0,x=0,S=0,_=0,w=0,b=0,A=0;c.sort(r3);for(let C=0,P=c.length;C<P;C++){const D=c[C],F=D.color,X=D.intensity,ee=D.distance;let O=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===hs?O=D.shadow.map.texture:O=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)u+=F.r*X,d+=F.g*X,f+=F.b*X;else if(D.isLightProbe){for(let q=0;q<9;q++)i.probe[q].addScaledVector(D.sh.coefficients[q],X);A++}else if(D.isDirectionalLight){const q=e.get(D);if(q.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const z=D.shadow,L=n.get(D);L.shadowIntensity=z.intensity,L.shadowBias=z.bias,L.shadowNormalBias=z.normalBias,L.shadowRadius=z.radius,L.shadowMapSize=z.mapSize,i.directionalShadow[p]=L,i.directionalShadowMap[p]=O,i.directionalShadowMatrix[p]=D.shadow.matrix,x++}i.directional[p]=q,p++}else if(D.isSpotLight){const q=e.get(D);q.position.setFromMatrixPosition(D.matrixWorld),q.color.copy(F).multiplyScalar(X),q.distance=ee,q.coneCos=Math.cos(D.angle),q.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),q.decay=D.decay,i.spot[E]=q;const z=D.shadow;if(D.map&&(i.spotLightMap[w]=D.map,w++,z.updateMatrices(D),D.castShadow&&b++),i.spotLightMatrix[E]=z.matrix,D.castShadow){const L=n.get(D);L.shadowIntensity=z.intensity,L.shadowBias=z.bias,L.shadowNormalBias=z.normalBias,L.shadowRadius=z.radius,L.shadowMapSize=z.mapSize,i.spotShadow[E]=L,i.spotShadowMap[E]=O,_++}E++}else if(D.isRectAreaLight){const q=e.get(D);q.color.copy(F).multiplyScalar(X),q.halfWidth.set(D.width*.5,0,0),q.halfHeight.set(0,D.height*.5,0),i.rectArea[g]=q,g++}else if(D.isPointLight){const q=e.get(D);if(q.color.copy(D.color).multiplyScalar(D.intensity),q.distance=D.distance,q.decay=D.decay,D.castShadow){const z=D.shadow,L=n.get(D);L.shadowIntensity=z.intensity,L.shadowBias=z.bias,L.shadowNormalBias=z.normalBias,L.shadowRadius=z.radius,L.shadowMapSize=z.mapSize,L.shadowCameraNear=z.camera.near,L.shadowCameraFar=z.camera.far,i.pointShadow[m]=L,i.pointShadowMap[m]=O,i.pointShadowMatrix[m]=D.shadow.matrix,S++}i.point[m]=q,m++}else if(D.isHemisphereLight){const q=e.get(D);q.skyColor.copy(D.color).multiplyScalar(X),q.groundColor.copy(D.groundColor).multiplyScalar(X),i.hemi[h]=q,h++}}g>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=pe.LTC_FLOAT_1,i.rectAreaLTC2=pe.LTC_FLOAT_2):(i.rectAreaLTC1=pe.LTC_HALF_1,i.rectAreaLTC2=pe.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=f;const y=i.hash;(y.directionalLength!==p||y.pointLength!==m||y.spotLength!==E||y.rectAreaLength!==g||y.hemiLength!==h||y.numDirectionalShadows!==x||y.numPointShadows!==S||y.numSpotShadows!==_||y.numSpotMaps!==w||y.numLightProbes!==A)&&(i.directional.length=p,i.spot.length=E,i.rectArea.length=g,i.point.length=m,i.hemi.length=h,i.directionalShadow.length=x,i.directionalShadowMap.length=x,i.pointShadow.length=S,i.pointShadowMap.length=S,i.spotShadow.length=_,i.spotShadowMap.length=_,i.directionalShadowMatrix.length=x,i.pointShadowMatrix.length=S,i.spotLightMatrix.length=_+w-b,i.spotLightMap.length=w,i.numSpotLightShadowsWithMaps=b,i.numLightProbes=A,y.directionalLength=p,y.pointLength=m,y.spotLength=E,y.rectAreaLength=g,y.hemiLength=h,y.numDirectionalShadows=x,y.numPointShadows=S,y.numSpotShadows=_,y.numSpotMaps=w,y.numLightProbes=A,i.version=i3++)}function l(c,u){let d=0,f=0,p=0,m=0,E=0;const g=u.matrixWorldInverse;for(let h=0,x=c.length;h<x;h++){const S=c[h];if(S.isDirectionalLight){const _=i.directional[d];_.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),_.direction.sub(r),_.direction.transformDirection(g),d++}else if(S.isSpotLight){const _=i.spot[p];_.position.setFromMatrixPosition(S.matrixWorld),_.position.applyMatrix4(g),_.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),_.direction.sub(r),_.direction.transformDirection(g),p++}else if(S.isRectAreaLight){const _=i.rectArea[m];_.position.setFromMatrixPosition(S.matrixWorld),_.position.applyMatrix4(g),o.identity(),s.copy(S.matrixWorld),s.premultiply(g),o.extractRotation(s),_.halfWidth.set(S.width*.5,0,0),_.halfHeight.set(0,S.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),m++}else if(S.isPointLight){const _=i.point[f];_.position.setFromMatrixPosition(S.matrixWorld),_.position.applyMatrix4(g),f++}else if(S.isHemisphereLight){const _=i.hemi[E];_.direction.setFromMatrixPosition(S.matrixWorld),_.direction.transformDirection(g),E++}}}return{setup:a,setupView:l,state:i}}function ux(t){const e=new s3(t),n=[],i=[],r=[];function s(f){d.camera=f,n.length=0,i.length=0,r.length=0}function o(f){n.push(f)}function a(f){i.push(f)}function l(f){r.push(f)}function c(){e.setup(n)}function u(f){e.setupView(n,f)}const d={lightsArray:n,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:d,setupLights:c,setupLightsView:u,pushLight:o,pushShadow:a,pushLightProbeGrid:l}}function o3(t){let e=new WeakMap;function n(r,s=0){const o=e.get(r);let a;return o===void 0?(a=new ux(t),e.set(r,[a])):s>=o.length?(a=new ux(t),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:n,dispose:i}}const a3=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,l3=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,c3=[new B(1,0,0),new B(-1,0,0),new B(0,1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1)],u3=[new B(0,-1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1),new B(0,-1,0),new B(0,-1,0)],fx=new Ct,Ho=new B,Uf=new B;function f3(t,e,n){let i=new uS;const r=new Qe,s=new Qe,o=new Et,a=new w2,l=new A2,c={},u=n.maxTextureSize,d={[Pr]:Mn,[Mn]:Pr,[Vi]:Vi},f=new Pi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Qe},radius:{value:4}},vertexShader:a3,fragmentShader:l3}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const m=new Yn;m.setAttribute("position",new Ai(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const E=new Ri(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Jl;let h=this.type;this.render=function(b,A,y){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||b.length===0)return;this.type===hw&&(Le("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Jl);const C=t.getRenderTarget(),P=t.getActiveCubeFace(),D=t.getActiveMipmapLevel(),F=t.state;F.setBlending(ji),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const X=h!==this.type;X&&A.traverse(function(ee){ee.material&&(Array.isArray(ee.material)?ee.material.forEach(O=>O.needsUpdate=!0):ee.material.needsUpdate=!0)});for(let ee=0,O=b.length;ee<O;ee++){const q=b[ee],z=q.shadow;if(z===void 0){Le("WebGLShadowMap:",q,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;r.copy(z.mapSize);const L=z.getFrameExtents();r.multiply(L),s.copy(z.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/L.x),r.x=s.x*L.x,z.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/L.y),r.y=s.y*L.y,z.mapSize.y=s.y));const W=t.state.buffers.depth.getReversed();if(z.camera._reversedDepth=W,z.map===null||X===!0){if(z.map!==null&&(z.map.depthTexture!==null&&(z.map.depthTexture.dispose(),z.map.depthTexture=null),z.map.dispose()),this.type===qo){if(q.isPointLight){Le("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}z.map=new wi(r.x,r.y,{format:hs,type:Zi,minFilter:rn,magFilter:rn,generateMipmaps:!1}),z.map.texture.name=q.name+".shadowMap",z.map.depthTexture=new go(r.x,r.y,_i),z.map.depthTexture.name=q.name+".shadowMapDepth",z.map.depthTexture.format=Qi,z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=Yt,z.map.depthTexture.magFilter=Yt}else q.isPointLight?(z.map=new yS(r.x),z.map.depthTexture=new y2(r.x,Ci)):(z.map=new wi(r.x,r.y),z.map.depthTexture=new go(r.x,r.y,Ci)),z.map.depthTexture.name=q.name+".shadowMap",z.map.depthTexture.format=Qi,this.type===Jl?(z.map.depthTexture.compareFunction=W?cm:lm,z.map.depthTexture.minFilter=rn,z.map.depthTexture.magFilter=rn):(z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=Yt,z.map.depthTexture.magFilter=Yt);z.camera.updateProjectionMatrix()}const Z=z.map.isWebGLCubeRenderTarget?6:1;for(let ne=0;ne<Z;ne++){if(z.map.isWebGLCubeRenderTarget)t.setRenderTarget(z.map,ne),t.clear();else{ne===0&&(t.setRenderTarget(z.map),t.clear());const oe=z.getViewport(ne);o.set(s.x*oe.x,s.y*oe.y,s.x*oe.z,s.y*oe.w),F.viewport(o)}if(q.isPointLight){const oe=z.camera,ze=z.matrix,Je=q.distance||oe.far;Je!==oe.far&&(oe.far=Je,oe.updateProjectionMatrix()),Ho.setFromMatrixPosition(q.matrixWorld),oe.position.copy(Ho),Uf.copy(oe.position),Uf.add(c3[ne]),oe.up.copy(u3[ne]),oe.lookAt(Uf),oe.updateMatrixWorld(),ze.makeTranslation(-Ho.x,-Ho.y,-Ho.z),fx.multiplyMatrices(oe.projectionMatrix,oe.matrixWorldInverse),z._frustum.setFromProjectionMatrix(fx,oe.coordinateSystem,oe.reversedDepth)}else z.updateMatrices(q);i=z.getFrustum(),_(A,y,z.camera,q,this.type)}z.isPointLightShadow!==!0&&this.type===qo&&x(z,y),z.needsUpdate=!1}h=this.type,g.needsUpdate=!1,t.setRenderTarget(C,P,D)};function x(b,A){const y=e.update(E);f.defines.VSM_SAMPLES!==b.blurSamples&&(f.defines.VSM_SAMPLES=b.blurSamples,p.defines.VSM_SAMPLES=b.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new wi(r.x,r.y,{format:hs,type:Zi})),f.uniforms.shadow_pass.value=b.map.depthTexture,f.uniforms.resolution.value=b.mapSize,f.uniforms.radius.value=b.radius,t.setRenderTarget(b.mapPass),t.clear(),t.renderBufferDirect(A,null,y,f,E,null),p.uniforms.shadow_pass.value=b.mapPass.texture,p.uniforms.resolution.value=b.mapSize,p.uniforms.radius.value=b.radius,t.setRenderTarget(b.map),t.clear(),t.renderBufferDirect(A,null,y,p,E,null)}function S(b,A,y,C){let P=null;const D=y.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(D!==void 0)P=D;else if(P=y.isPointLight===!0?l:a,t.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const F=P.uuid,X=A.uuid;let ee=c[F];ee===void 0&&(ee={},c[F]=ee);let O=ee[X];O===void 0&&(O=P.clone(),ee[X]=O,A.addEventListener("dispose",w)),P=O}if(P.visible=A.visible,P.wireframe=A.wireframe,C===qo?P.side=A.shadowSide!==null?A.shadowSide:A.side:P.side=A.shadowSide!==null?A.shadowSide:d[A.side],P.alphaMap=A.alphaMap,P.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,P.map=A.map,P.clipShadows=A.clipShadows,P.clippingPlanes=A.clippingPlanes,P.clipIntersection=A.clipIntersection,P.displacementMap=A.displacementMap,P.displacementScale=A.displacementScale,P.displacementBias=A.displacementBias,P.wireframeLinewidth=A.wireframeLinewidth,P.linewidth=A.linewidth,y.isPointLight===!0&&P.isMeshDistanceMaterial===!0){const F=t.properties.get(P);F.light=y}return P}function _(b,A,y,C,P){if(b.visible===!1)return;if(b.layers.test(A.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&P===qo)&&(!b.frustumCulled||i.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,b.matrixWorld);const X=e.update(b),ee=b.material;if(Array.isArray(ee)){const O=X.groups;for(let q=0,z=O.length;q<z;q++){const L=O[q],W=ee[L.materialIndex];if(W&&W.visible){const Z=S(b,W,C,P);b.onBeforeShadow(t,b,A,y,X,Z,L),t.renderBufferDirect(y,null,X,Z,b,L),b.onAfterShadow(t,b,A,y,X,Z,L)}}}else if(ee.visible){const O=S(b,ee,C,P);b.onBeforeShadow(t,b,A,y,X,O,null),t.renderBufferDirect(y,null,X,O,b,null),b.onAfterShadow(t,b,A,y,X,O,null)}}const F=b.children;for(let X=0,ee=F.length;X<ee;X++)_(F[X],A,y,C,P)}function w(b){b.target.removeEventListener("dispose",w);for(const y in c){const C=c[y],P=b.target.uuid;P in C&&(C[P].dispose(),delete C[P])}}}function d3(t,e){function n(){let I=!1;const le=new Et;let Q=null;const de=new Et(0,0,0,0);return{setMask:function(xe){Q!==xe&&!I&&(t.colorMask(xe,xe,xe,xe),Q=xe)},setLocked:function(xe){I=xe},setClear:function(xe,te,we,Ee,yt){yt===!0&&(xe*=Ee,te*=Ee,we*=Ee),le.set(xe,te,we,Ee),de.equals(le)===!1&&(t.clearColor(xe,te,we,Ee),de.copy(le))},reset:function(){I=!1,Q=null,de.set(-1,0,0,0)}}}function i(){let I=!1,le=!1,Q=null,de=null,xe=null;return{setReversed:function(te){if(le!==te){const we=e.get("EXT_clip_control");te?we.clipControlEXT(we.LOWER_LEFT_EXT,we.ZERO_TO_ONE_EXT):we.clipControlEXT(we.LOWER_LEFT_EXT,we.NEGATIVE_ONE_TO_ONE_EXT),le=te;const Ee=xe;xe=null,this.setClear(Ee)}},getReversed:function(){return le},setTest:function(te){te?re(t.DEPTH_TEST):Ie(t.DEPTH_TEST)},setMask:function(te){Q!==te&&!I&&(t.depthMask(te),Q=te)},setFunc:function(te){if(le&&(te=Xw[te]),de!==te){switch(te){case $d:t.depthFunc(t.NEVER);break;case qd:t.depthFunc(t.ALWAYS);break;case Kd:t.depthFunc(t.LESS);break;case po:t.depthFunc(t.LEQUAL);break;case Zd:t.depthFunc(t.EQUAL);break;case Qd:t.depthFunc(t.GEQUAL);break;case Jd:t.depthFunc(t.GREATER);break;case eh:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}de=te}},setLocked:function(te){I=te},setClear:function(te){xe!==te&&(xe=te,le&&(te=1-te),t.clearDepth(te))},reset:function(){I=!1,Q=null,de=null,xe=null,le=!1}}}function r(){let I=!1,le=null,Q=null,de=null,xe=null,te=null,we=null,Ee=null,yt=null;return{setTest:function(ct){I||(ct?re(t.STENCIL_TEST):Ie(t.STENCIL_TEST))},setMask:function(ct){le!==ct&&!I&&(t.stencilMask(ct),le=ct)},setFunc:function(ct,ci,ui){(Q!==ct||de!==ci||xe!==ui)&&(t.stencilFunc(ct,ci,ui),Q=ct,de=ci,xe=ui)},setOp:function(ct,ci,ui){(te!==ct||we!==ci||Ee!==ui)&&(t.stencilOp(ct,ci,ui),te=ct,we=ci,Ee=ui)},setLocked:function(ct){I=ct},setClear:function(ct){yt!==ct&&(t.clearStencil(ct),yt=ct)},reset:function(){I=!1,le=null,Q=null,de=null,xe=null,te=null,we=null,Ee=null,yt=null}}}const s=new n,o=new i,a=new r,l=new WeakMap,c=new WeakMap;let u={},d={},f={},p=new WeakMap,m=[],E=null,g=!1,h=null,x=null,S=null,_=null,w=null,b=null,A=null,y=new Ke(0,0,0),C=0,P=!1,D=null,F=null,X=null,ee=null,O=null;const q=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,L=0;const W=t.getParameter(t.VERSION);W.indexOf("WebGL")!==-1?(L=parseFloat(/^WebGL (\d)/.exec(W)[1]),z=L>=1):W.indexOf("OpenGL ES")!==-1&&(L=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),z=L>=2);let Z=null,ne={};const oe=t.getParameter(t.SCISSOR_BOX),ze=t.getParameter(t.VIEWPORT),Je=new Et().fromArray(oe),He=new Et().fromArray(ze);function K(I,le,Q,de){const xe=new Uint8Array(4),te=t.createTexture();t.bindTexture(I,te),t.texParameteri(I,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(I,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let we=0;we<Q;we++)I===t.TEXTURE_3D||I===t.TEXTURE_2D_ARRAY?t.texImage3D(le,0,t.RGBA,1,1,de,0,t.RGBA,t.UNSIGNED_BYTE,xe):t.texImage2D(le+we,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,xe);return te}const ae={};ae[t.TEXTURE_2D]=K(t.TEXTURE_2D,t.TEXTURE_2D,1),ae[t.TEXTURE_CUBE_MAP]=K(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),ae[t.TEXTURE_2D_ARRAY]=K(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),ae[t.TEXTURE_3D]=K(t.TEXTURE_3D,t.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),re(t.DEPTH_TEST),o.setFunc(po),Rt(!1),Nt(fg),re(t.CULL_FACE),Ze(ji);function re(I){u[I]!==!0&&(t.enable(I),u[I]=!0)}function Ie(I){u[I]!==!1&&(t.disable(I),u[I]=!1)}function Ue(I,le){return f[I]!==le?(t.bindFramebuffer(I,le),f[I]=le,I===t.DRAW_FRAMEBUFFER&&(f[t.FRAMEBUFFER]=le),I===t.FRAMEBUFFER&&(f[t.DRAW_FRAMEBUFFER]=le),!0):!1}function Pe(I,le){let Q=m,de=!1;if(I){Q=p.get(le),Q===void 0&&(Q=[],p.set(le,Q));const xe=I.textures;if(Q.length!==xe.length||Q[0]!==t.COLOR_ATTACHMENT0){for(let te=0,we=xe.length;te<we;te++)Q[te]=t.COLOR_ATTACHMENT0+te;Q.length=xe.length,de=!0}}else Q[0]!==t.BACK&&(Q[0]=t.BACK,de=!0);de&&t.drawBuffers(Q)}function Tt(I){return E!==I?(t.useProgram(I),E=I,!0):!1}const Ge={[$r]:t.FUNC_ADD,[mw]:t.FUNC_SUBTRACT,[gw]:t.FUNC_REVERSE_SUBTRACT};Ge[xw]=t.MIN,Ge[vw]=t.MAX;const rt={[yw]:t.ZERO,[_w]:t.ONE,[Sw]:t.SRC_COLOR,[Xd]:t.SRC_ALPHA,[bw]:t.SRC_ALPHA_SATURATE,[ww]:t.DST_COLOR,[Ew]:t.DST_ALPHA,[Mw]:t.ONE_MINUS_SRC_COLOR,[Yd]:t.ONE_MINUS_SRC_ALPHA,[Aw]:t.ONE_MINUS_DST_COLOR,[Tw]:t.ONE_MINUS_DST_ALPHA,[Cw]:t.CONSTANT_COLOR,[Rw]:t.ONE_MINUS_CONSTANT_COLOR,[Pw]:t.CONSTANT_ALPHA,[Dw]:t.ONE_MINUS_CONSTANT_ALPHA};function Ze(I,le,Q,de,xe,te,we,Ee,yt,ct){if(I===ji){g===!0&&(Ie(t.BLEND),g=!1);return}if(g===!1&&(re(t.BLEND),g=!0),I!==pw){if(I!==h||ct!==P){if((x!==$r||w!==$r)&&(t.blendEquation(t.FUNC_ADD),x=$r,w=$r),ct)switch(I){case io:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case jd:t.blendFunc(t.ONE,t.ONE);break;case dg:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case hg:t.blendFuncSeparate(t.DST_COLOR,t.ONE_MINUS_SRC_ALPHA,t.ZERO,t.ONE);break;default:$e("WebGLState: Invalid blending: ",I);break}else switch(I){case io:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case jd:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE,t.ONE,t.ONE);break;case dg:$e("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case hg:$e("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:$e("WebGLState: Invalid blending: ",I);break}S=null,_=null,b=null,A=null,y.set(0,0,0),C=0,h=I,P=ct}return}xe=xe||le,te=te||Q,we=we||de,(le!==x||xe!==w)&&(t.blendEquationSeparate(Ge[le],Ge[xe]),x=le,w=xe),(Q!==S||de!==_||te!==b||we!==A)&&(t.blendFuncSeparate(rt[Q],rt[de],rt[te],rt[we]),S=Q,_=de,b=te,A=we),(Ee.equals(y)===!1||yt!==C)&&(t.blendColor(Ee.r,Ee.g,Ee.b,yt),y.copy(Ee),C=yt),h=I,P=!1}function Xe(I,le){I.side===Vi?Ie(t.CULL_FACE):re(t.CULL_FACE);let Q=I.side===Mn;le&&(Q=!Q),Rt(Q),I.blending===io&&I.transparent===!1?Ze(ji):Ze(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),o.setFunc(I.depthFunc),o.setTest(I.depthTest),o.setMask(I.depthWrite),s.setMask(I.colorWrite);const de=I.stencilWrite;a.setTest(de),de&&(a.setMask(I.stencilWriteMask),a.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),a.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),Wt(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?re(t.SAMPLE_ALPHA_TO_COVERAGE):Ie(t.SAMPLE_ALPHA_TO_COVERAGE)}function Rt(I){D!==I&&(I?t.frontFace(t.CW):t.frontFace(t.CCW),D=I)}function Nt(I){I!==fw?(re(t.CULL_FACE),I!==F&&(I===fg?t.cullFace(t.BACK):I===dw?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):Ie(t.CULL_FACE),F=I}function Vt(I){I!==X&&(z&&t.lineWidth(I),X=I)}function Wt(I,le,Q){I?(re(t.POLYGON_OFFSET_FILL),(ee!==le||O!==Q)&&(ee=le,O=Q,o.getReversed()&&(le=-le),t.polygonOffset(le,Q))):Ie(t.POLYGON_OFFSET_FILL)}function vt(I){I?re(t.SCISSOR_TEST):Ie(t.SCISSOR_TEST)}function Pt(I){I===void 0&&(I=t.TEXTURE0+q-1),Z!==I&&(t.activeTexture(I),Z=I)}function N(I,le,Q){Q===void 0&&(Z===null?Q=t.TEXTURE0+q-1:Q=Z);let de=ne[Q];de===void 0&&(de={type:void 0,texture:void 0},ne[Q]=de),(de.type!==I||de.texture!==le)&&(Z!==Q&&(t.activeTexture(Q),Z=Q),t.bindTexture(I,le||ae[I]),de.type=I,de.texture=le)}function mn(){const I=ne[Z];I!==void 0&&I.type!==void 0&&(t.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function et(){try{t.compressedTexImage2D(...arguments)}catch(I){$e("WebGLState:",I)}}function R(){try{t.compressedTexImage3D(...arguments)}catch(I){$e("WebGLState:",I)}}function M(){try{t.texSubImage2D(...arguments)}catch(I){$e("WebGLState:",I)}}function k(){try{t.texSubImage3D(...arguments)}catch(I){$e("WebGLState:",I)}}function H(){try{t.compressedTexSubImage2D(...arguments)}catch(I){$e("WebGLState:",I)}}function Y(){try{t.compressedTexSubImage3D(...arguments)}catch(I){$e("WebGLState:",I)}}function se(){try{t.texStorage2D(...arguments)}catch(I){$e("WebGLState:",I)}}function ce(){try{t.texStorage3D(...arguments)}catch(I){$e("WebGLState:",I)}}function $(){try{t.texImage2D(...arguments)}catch(I){$e("WebGLState:",I)}}function J(){try{t.texImage3D(...arguments)}catch(I){$e("WebGLState:",I)}}function ue(I){return d[I]!==void 0?d[I]:t.getParameter(I)}function Ae(I,le){d[I]!==le&&(t.pixelStorei(I,le),d[I]=le)}function he(I){Je.equals(I)===!1&&(t.scissor(I.x,I.y,I.z,I.w),Je.copy(I))}function fe(I){He.equals(I)===!1&&(t.viewport(I.x,I.y,I.z,I.w),He.copy(I))}function Re(I,le){let Q=c.get(le);Q===void 0&&(Q=new WeakMap,c.set(le,Q));let de=Q.get(I);de===void 0&&(de=t.getUniformBlockIndex(le,I.name),Q.set(I,de))}function De(I,le){const de=c.get(le).get(I);l.get(le)!==de&&(t.uniformBlockBinding(le,de,I.__bindingPointIndex),l.set(le,de))}function Fe(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),o.setReversed(!1),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),t.pixelStorei(t.PACK_ALIGNMENT,4),t.pixelStorei(t.UNPACK_ALIGNMENT,4),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,t.BROWSER_DEFAULT_WEBGL),t.pixelStorei(t.PACK_ROW_LENGTH,0),t.pixelStorei(t.PACK_SKIP_PIXELS,0),t.pixelStorei(t.PACK_SKIP_ROWS,0),t.pixelStorei(t.UNPACK_ROW_LENGTH,0),t.pixelStorei(t.UNPACK_IMAGE_HEIGHT,0),t.pixelStorei(t.UNPACK_SKIP_PIXELS,0),t.pixelStorei(t.UNPACK_SKIP_ROWS,0),t.pixelStorei(t.UNPACK_SKIP_IMAGES,0),u={},d={},Z=null,ne={},f={},p=new WeakMap,m=[],E=null,g=!1,h=null,x=null,S=null,_=null,w=null,b=null,A=null,y=new Ke(0,0,0),C=0,P=!1,D=null,F=null,X=null,ee=null,O=null,Je.set(0,0,t.canvas.width,t.canvas.height),He.set(0,0,t.canvas.width,t.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:re,disable:Ie,bindFramebuffer:Ue,drawBuffers:Pe,useProgram:Tt,setBlending:Ze,setMaterial:Xe,setFlipSided:Rt,setCullFace:Nt,setLineWidth:Vt,setPolygonOffset:Wt,setScissorTest:vt,activeTexture:Pt,bindTexture:N,unbindTexture:mn,compressedTexImage2D:et,compressedTexImage3D:R,texImage2D:$,texImage3D:J,pixelStorei:Ae,getParameter:ue,updateUBOMapping:Re,uniformBlockBinding:De,texStorage2D:se,texStorage3D:ce,texSubImage2D:M,texSubImage3D:k,compressedTexSubImage2D:H,compressedTexSubImage3D:Y,scissor:he,viewport:fe,reset:Fe}}function h3(t,e,n,i,r,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Qe,u=new WeakMap,d=new Set;let f;const p=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function E(R,M){return m?new OffscreenCanvas(R,M):zc("canvas")}function g(R,M,k){let H=1;const Y=et(R);if((Y.width>k||Y.height>k)&&(H=k/Math.max(Y.width,Y.height)),H<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const se=Math.floor(H*Y.width),ce=Math.floor(H*Y.height);f===void 0&&(f=E(se,ce));const $=M?E(se,ce):f;return $.width=se,$.height=ce,$.getContext("2d").drawImage(R,0,0,se,ce),Le("WebGLRenderer: Texture has been resized from ("+Y.width+"x"+Y.height+") to ("+se+"x"+ce+")."),$}else return"data"in R&&Le("WebGLRenderer: Image in DataTexture is too big ("+Y.width+"x"+Y.height+")."),R;return R}function h(R){return R.generateMipmaps}function x(R){t.generateMipmap(R)}function S(R){return R.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?t.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?t.TEXTURE_2D_ARRAY:t.TEXTURE_2D}function _(R,M,k,H,Y,se=!1){if(R!==null){if(t[R]!==void 0)return t[R];Le("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let ce;H&&(ce=e.get("EXT_texture_norm16"),ce||Le("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let $=M;if(M===t.RED&&(k===t.FLOAT&&($=t.R32F),k===t.HALF_FLOAT&&($=t.R16F),k===t.UNSIGNED_BYTE&&($=t.R8),k===t.UNSIGNED_SHORT&&ce&&($=ce.R16_EXT),k===t.SHORT&&ce&&($=ce.R16_SNORM_EXT)),M===t.RED_INTEGER&&(k===t.UNSIGNED_BYTE&&($=t.R8UI),k===t.UNSIGNED_SHORT&&($=t.R16UI),k===t.UNSIGNED_INT&&($=t.R32UI),k===t.BYTE&&($=t.R8I),k===t.SHORT&&($=t.R16I),k===t.INT&&($=t.R32I)),M===t.RG&&(k===t.FLOAT&&($=t.RG32F),k===t.HALF_FLOAT&&($=t.RG16F),k===t.UNSIGNED_BYTE&&($=t.RG8),k===t.UNSIGNED_SHORT&&ce&&($=ce.RG16_EXT),k===t.SHORT&&ce&&($=ce.RG16_SNORM_EXT)),M===t.RG_INTEGER&&(k===t.UNSIGNED_BYTE&&($=t.RG8UI),k===t.UNSIGNED_SHORT&&($=t.RG16UI),k===t.UNSIGNED_INT&&($=t.RG32UI),k===t.BYTE&&($=t.RG8I),k===t.SHORT&&($=t.RG16I),k===t.INT&&($=t.RG32I)),M===t.RGB_INTEGER&&(k===t.UNSIGNED_BYTE&&($=t.RGB8UI),k===t.UNSIGNED_SHORT&&($=t.RGB16UI),k===t.UNSIGNED_INT&&($=t.RGB32UI),k===t.BYTE&&($=t.RGB8I),k===t.SHORT&&($=t.RGB16I),k===t.INT&&($=t.RGB32I)),M===t.RGBA_INTEGER&&(k===t.UNSIGNED_BYTE&&($=t.RGBA8UI),k===t.UNSIGNED_SHORT&&($=t.RGBA16UI),k===t.UNSIGNED_INT&&($=t.RGBA32UI),k===t.BYTE&&($=t.RGBA8I),k===t.SHORT&&($=t.RGBA16I),k===t.INT&&($=t.RGBA32I)),M===t.RGB&&(k===t.UNSIGNED_SHORT&&ce&&($=ce.RGB16_EXT),k===t.SHORT&&ce&&($=ce.RGB16_SNORM_EXT),k===t.UNSIGNED_INT_5_9_9_9_REV&&($=t.RGB9_E5),k===t.UNSIGNED_INT_10F_11F_11F_REV&&($=t.R11F_G11F_B10F)),M===t.RGBA){const J=se?Bc:We.getTransfer(Y);k===t.FLOAT&&($=t.RGBA32F),k===t.HALF_FLOAT&&($=t.RGBA16F),k===t.UNSIGNED_BYTE&&($=J===tt?t.SRGB8_ALPHA8:t.RGBA8),k===t.UNSIGNED_SHORT&&ce&&($=ce.RGBA16_EXT),k===t.SHORT&&ce&&($=ce.RGBA16_SNORM_EXT),k===t.UNSIGNED_SHORT_4_4_4_4&&($=t.RGBA4),k===t.UNSIGNED_SHORT_5_5_5_1&&($=t.RGB5_A1)}return($===t.R16F||$===t.R32F||$===t.RG16F||$===t.RG32F||$===t.RGBA16F||$===t.RGBA32F)&&e.get("EXT_color_buffer_float"),$}function w(R,M){let k;return R?M===null||M===Ci||M===Pa?k=t.DEPTH24_STENCIL8:M===_i?k=t.DEPTH32F_STENCIL8:M===Ra&&(k=t.DEPTH24_STENCIL8,Le("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===Ci||M===Pa?k=t.DEPTH_COMPONENT24:M===_i?k=t.DEPTH_COMPONENT32F:M===Ra&&(k=t.DEPTH_COMPONENT16),k}function b(R,M){return h(R)===!0||R.isFramebufferTexture&&R.minFilter!==Yt&&R.minFilter!==rn?Math.log2(Math.max(M.width,M.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?M.mipmaps.length:1}function A(R){const M=R.target;M.removeEventListener("dispose",A),C(M),M.isVideoTexture&&u.delete(M),M.isHTMLTexture&&d.delete(M)}function y(R){const M=R.target;M.removeEventListener("dispose",y),D(M)}function C(R){const M=i.get(R);if(M.__webglInit===void 0)return;const k=R.source,H=p.get(k);if(H){const Y=H[M.__cacheKey];Y.usedTimes--,Y.usedTimes===0&&P(R),Object.keys(H).length===0&&p.delete(k)}i.remove(R)}function P(R){const M=i.get(R);t.deleteTexture(M.__webglTexture);const k=R.source,H=p.get(k);delete H[M.__cacheKey],o.memory.textures--}function D(R){const M=i.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),i.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let H=0;H<6;H++){if(Array.isArray(M.__webglFramebuffer[H]))for(let Y=0;Y<M.__webglFramebuffer[H].length;Y++)t.deleteFramebuffer(M.__webglFramebuffer[H][Y]);else t.deleteFramebuffer(M.__webglFramebuffer[H]);M.__webglDepthbuffer&&t.deleteRenderbuffer(M.__webglDepthbuffer[H])}else{if(Array.isArray(M.__webglFramebuffer))for(let H=0;H<M.__webglFramebuffer.length;H++)t.deleteFramebuffer(M.__webglFramebuffer[H]);else t.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&t.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&t.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let H=0;H<M.__webglColorRenderbuffer.length;H++)M.__webglColorRenderbuffer[H]&&t.deleteRenderbuffer(M.__webglColorRenderbuffer[H]);M.__webglDepthRenderbuffer&&t.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const k=R.textures;for(let H=0,Y=k.length;H<Y;H++){const se=i.get(k[H]);se.__webglTexture&&(t.deleteTexture(se.__webglTexture),o.memory.textures--),i.remove(k[H])}i.remove(R)}let F=0;function X(){F=0}function ee(){return F}function O(R){F=R}function q(){const R=F;return R>=r.maxTextures&&Le("WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+r.maxTextures),F+=1,R}function z(R){const M=[];return M.push(R.wrapS),M.push(R.wrapT),M.push(R.wrapR||0),M.push(R.magFilter),M.push(R.minFilter),M.push(R.anisotropy),M.push(R.internalFormat),M.push(R.format),M.push(R.type),M.push(R.generateMipmaps),M.push(R.premultiplyAlpha),M.push(R.flipY),M.push(R.unpackAlignment),M.push(R.colorSpace),M.join()}function L(R,M){const k=i.get(R);if(R.isVideoTexture&&N(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&k.__version!==R.version){const H=R.image;if(H===null)Le("WebGLRenderer: Texture marked for update but no image data found.");else if(H.complete===!1)Le("WebGLRenderer: Texture marked for update but image is incomplete");else{Ie(k,R,M);return}}else R.isExternalTexture&&(k.__webglTexture=R.sourceTexture?R.sourceTexture:null);n.bindTexture(t.TEXTURE_2D,k.__webglTexture,t.TEXTURE0+M)}function W(R,M){const k=i.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&k.__version!==R.version){Ie(k,R,M);return}else R.isExternalTexture&&(k.__webglTexture=R.sourceTexture?R.sourceTexture:null);n.bindTexture(t.TEXTURE_2D_ARRAY,k.__webglTexture,t.TEXTURE0+M)}function Z(R,M){const k=i.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&k.__version!==R.version){Ie(k,R,M);return}n.bindTexture(t.TEXTURE_3D,k.__webglTexture,t.TEXTURE0+M)}function ne(R,M){const k=i.get(R);if(R.isCubeDepthTexture!==!0&&R.version>0&&k.__version!==R.version){Ue(k,R,M);return}n.bindTexture(t.TEXTURE_CUBE_MAP,k.__webglTexture,t.TEXTURE0+M)}const oe={[th]:t.REPEAT,[Hi]:t.CLAMP_TO_EDGE,[nh]:t.MIRRORED_REPEAT},ze={[Yt]:t.NEAREST,[Nw]:t.NEAREST_MIPMAP_NEAREST,[hl]:t.NEAREST_MIPMAP_LINEAR,[rn]:t.LINEAR,[rf]:t.LINEAR_MIPMAP_NEAREST,[Jr]:t.LINEAR_MIPMAP_LINEAR},Je={[kw]:t.NEVER,[Gw]:t.ALWAYS,[Ow]:t.LESS,[lm]:t.LEQUAL,[Bw]:t.EQUAL,[cm]:t.GEQUAL,[Vw]:t.GREATER,[zw]:t.NOTEQUAL};function He(R,M){if(M.type===_i&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===rn||M.magFilter===rf||M.magFilter===hl||M.magFilter===Jr||M.minFilter===rn||M.minFilter===rf||M.minFilter===hl||M.minFilter===Jr)&&Le("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(R,t.TEXTURE_WRAP_S,oe[M.wrapS]),t.texParameteri(R,t.TEXTURE_WRAP_T,oe[M.wrapT]),(R===t.TEXTURE_3D||R===t.TEXTURE_2D_ARRAY)&&t.texParameteri(R,t.TEXTURE_WRAP_R,oe[M.wrapR]),t.texParameteri(R,t.TEXTURE_MAG_FILTER,ze[M.magFilter]),t.texParameteri(R,t.TEXTURE_MIN_FILTER,ze[M.minFilter]),M.compareFunction&&(t.texParameteri(R,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(R,t.TEXTURE_COMPARE_FUNC,Je[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Yt||M.minFilter!==hl&&M.minFilter!==Jr||M.type===_i&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||i.get(M).__currentAnisotropy){const k=e.get("EXT_texture_filter_anisotropic");t.texParameterf(R,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,r.getMaxAnisotropy())),i.get(M).__currentAnisotropy=M.anisotropy}}}function K(R,M){let k=!1;R.__webglInit===void 0&&(R.__webglInit=!0,M.addEventListener("dispose",A));const H=M.source;let Y=p.get(H);Y===void 0&&(Y={},p.set(H,Y));const se=z(M);if(se!==R.__cacheKey){Y[se]===void 0&&(Y[se]={texture:t.createTexture(),usedTimes:0},o.memory.textures++,k=!0),Y[se].usedTimes++;const ce=Y[R.__cacheKey];ce!==void 0&&(Y[R.__cacheKey].usedTimes--,ce.usedTimes===0&&P(M)),R.__cacheKey=se,R.__webglTexture=Y[se].texture}return k}function ae(R,M,k){return Math.floor(Math.floor(R/k)/M)}function re(R,M,k,H){const se=R.updateRanges;if(se.length===0)n.texSubImage2D(t.TEXTURE_2D,0,0,0,M.width,M.height,k,H,M.data);else{se.sort((Ae,he)=>Ae.start-he.start);let ce=0;for(let Ae=1;Ae<se.length;Ae++){const he=se[ce],fe=se[Ae],Re=he.start+he.count,De=ae(fe.start,M.width,4),Fe=ae(he.start,M.width,4);fe.start<=Re+1&&De===Fe&&ae(fe.start+fe.count-1,M.width,4)===De?he.count=Math.max(he.count,fe.start+fe.count-he.start):(++ce,se[ce]=fe)}se.length=ce+1;const $=n.getParameter(t.UNPACK_ROW_LENGTH),J=n.getParameter(t.UNPACK_SKIP_PIXELS),ue=n.getParameter(t.UNPACK_SKIP_ROWS);n.pixelStorei(t.UNPACK_ROW_LENGTH,M.width);for(let Ae=0,he=se.length;Ae<he;Ae++){const fe=se[Ae],Re=Math.floor(fe.start/4),De=Math.ceil(fe.count/4),Fe=Re%M.width,I=Math.floor(Re/M.width),le=De,Q=1;n.pixelStorei(t.UNPACK_SKIP_PIXELS,Fe),n.pixelStorei(t.UNPACK_SKIP_ROWS,I),n.texSubImage2D(t.TEXTURE_2D,0,Fe,I,le,Q,k,H,M.data)}R.clearUpdateRanges(),n.pixelStorei(t.UNPACK_ROW_LENGTH,$),n.pixelStorei(t.UNPACK_SKIP_PIXELS,J),n.pixelStorei(t.UNPACK_SKIP_ROWS,ue)}}function Ie(R,M,k){let H=t.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(H=t.TEXTURE_2D_ARRAY),M.isData3DTexture&&(H=t.TEXTURE_3D);const Y=K(R,M),se=M.source;n.bindTexture(H,R.__webglTexture,t.TEXTURE0+k);const ce=i.get(se);if(se.version!==ce.__version||Y===!0){if(n.activeTexture(t.TEXTURE0+k),(typeof ImageBitmap<"u"&&M.image instanceof ImageBitmap)===!1){const Q=We.getPrimaries(We.workingColorSpace),de=M.colorSpace===mr?null:We.getPrimaries(M.colorSpace),xe=M.colorSpace===mr||Q===de?t.NONE:t.BROWSER_DEFAULT_WEBGL;n.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,M.flipY),n.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),n.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,xe)}n.pixelStorei(t.UNPACK_ALIGNMENT,M.unpackAlignment);let J=g(M.image,!1,r.maxTextureSize);J=mn(M,J);const ue=s.convert(M.format,M.colorSpace),Ae=s.convert(M.type);let he=_(M.internalFormat,ue,Ae,M.normalized,M.colorSpace,M.isVideoTexture);He(H,M);let fe;const Re=M.mipmaps,De=M.isVideoTexture!==!0,Fe=ce.__version===void 0||Y===!0,I=se.dataReady,le=b(M,J);if(M.isDepthTexture)he=w(M.format===es,M.type),Fe&&(De?n.texStorage2D(t.TEXTURE_2D,1,he,J.width,J.height):n.texImage2D(t.TEXTURE_2D,0,he,J.width,J.height,0,ue,Ae,null));else if(M.isDataTexture)if(Re.length>0){De&&Fe&&n.texStorage2D(t.TEXTURE_2D,le,he,Re[0].width,Re[0].height);for(let Q=0,de=Re.length;Q<de;Q++)fe=Re[Q],De?I&&n.texSubImage2D(t.TEXTURE_2D,Q,0,0,fe.width,fe.height,ue,Ae,fe.data):n.texImage2D(t.TEXTURE_2D,Q,he,fe.width,fe.height,0,ue,Ae,fe.data);M.generateMipmaps=!1}else De?(Fe&&n.texStorage2D(t.TEXTURE_2D,le,he,J.width,J.height),I&&re(M,J,ue,Ae)):n.texImage2D(t.TEXTURE_2D,0,he,J.width,J.height,0,ue,Ae,J.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){De&&Fe&&n.texStorage3D(t.TEXTURE_2D_ARRAY,le,he,Re[0].width,Re[0].height,J.depth);for(let Q=0,de=Re.length;Q<de;Q++)if(fe=Re[Q],M.format!==ri)if(ue!==null)if(De){if(I)if(M.layerUpdates.size>0){const xe=Gg(fe.width,fe.height,M.format,M.type);for(const te of M.layerUpdates){const we=fe.data.subarray(te*xe/fe.data.BYTES_PER_ELEMENT,(te+1)*xe/fe.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,Q,0,0,te,fe.width,fe.height,1,ue,we)}M.clearLayerUpdates()}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,Q,0,0,0,fe.width,fe.height,J.depth,ue,fe.data)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,Q,he,fe.width,fe.height,J.depth,0,fe.data,0,0);else Le("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else De?I&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,Q,0,0,0,fe.width,fe.height,J.depth,ue,Ae,fe.data):n.texImage3D(t.TEXTURE_2D_ARRAY,Q,he,fe.width,fe.height,J.depth,0,ue,Ae,fe.data)}else{De&&Fe&&n.texStorage2D(t.TEXTURE_2D,le,he,Re[0].width,Re[0].height);for(let Q=0,de=Re.length;Q<de;Q++)fe=Re[Q],M.format!==ri?ue!==null?De?I&&n.compressedTexSubImage2D(t.TEXTURE_2D,Q,0,0,fe.width,fe.height,ue,fe.data):n.compressedTexImage2D(t.TEXTURE_2D,Q,he,fe.width,fe.height,0,fe.data):Le("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):De?I&&n.texSubImage2D(t.TEXTURE_2D,Q,0,0,fe.width,fe.height,ue,Ae,fe.data):n.texImage2D(t.TEXTURE_2D,Q,he,fe.width,fe.height,0,ue,Ae,fe.data)}else if(M.isDataArrayTexture)if(De){if(Fe&&n.texStorage3D(t.TEXTURE_2D_ARRAY,le,he,J.width,J.height,J.depth),I)if(M.layerUpdates.size>0){const Q=Gg(J.width,J.height,M.format,M.type);for(const de of M.layerUpdates){const xe=J.data.subarray(de*Q/J.data.BYTES_PER_ELEMENT,(de+1)*Q/J.data.BYTES_PER_ELEMENT);n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,de,J.width,J.height,1,ue,Ae,xe)}M.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,ue,Ae,J.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,he,J.width,J.height,J.depth,0,ue,Ae,J.data);else if(M.isData3DTexture)De?(Fe&&n.texStorage3D(t.TEXTURE_3D,le,he,J.width,J.height,J.depth),I&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,ue,Ae,J.data)):n.texImage3D(t.TEXTURE_3D,0,he,J.width,J.height,J.depth,0,ue,Ae,J.data);else if(M.isFramebufferTexture){if(Fe)if(De)n.texStorage2D(t.TEXTURE_2D,le,he,J.width,J.height);else{let Q=J.width,de=J.height;for(let xe=0;xe<le;xe++)n.texImage2D(t.TEXTURE_2D,xe,he,Q,de,0,ue,Ae,null),Q>>=1,de>>=1}}else if(M.isHTMLTexture){if("texElementImage2D"in t){const Q=t.canvas;if(Q.hasAttribute("layoutsubtree")||Q.setAttribute("layoutsubtree","true"),J.parentNode!==Q){Q.appendChild(J),d.add(M),Q.onpaint=de=>{const xe=de.changedElements;for(const te of d)xe.includes(te.image)&&(te.needsUpdate=!0)},Q.requestPaint();return}if(t.texElementImage2D.length===3)t.texElementImage2D(t.TEXTURE_2D,t.RGBA8,J);else{const xe=t.RGBA,te=t.RGBA,we=t.UNSIGNED_BYTE;t.texElementImage2D(t.TEXTURE_2D,0,xe,te,we,J)}t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE)}}else if(Re.length>0){if(De&&Fe){const Q=et(Re[0]);n.texStorage2D(t.TEXTURE_2D,le,he,Q.width,Q.height)}for(let Q=0,de=Re.length;Q<de;Q++)fe=Re[Q],De?I&&n.texSubImage2D(t.TEXTURE_2D,Q,0,0,ue,Ae,fe):n.texImage2D(t.TEXTURE_2D,Q,he,ue,Ae,fe);M.generateMipmaps=!1}else if(De){if(Fe){const Q=et(J);n.texStorage2D(t.TEXTURE_2D,le,he,Q.width,Q.height)}I&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,ue,Ae,J)}else n.texImage2D(t.TEXTURE_2D,0,he,ue,Ae,J);h(M)&&x(H),ce.__version=se.version,M.onUpdate&&M.onUpdate(M)}R.__version=M.version}function Ue(R,M,k){if(M.image.length!==6)return;const H=K(R,M),Y=M.source;n.bindTexture(t.TEXTURE_CUBE_MAP,R.__webglTexture,t.TEXTURE0+k);const se=i.get(Y);if(Y.version!==se.__version||H===!0){n.activeTexture(t.TEXTURE0+k);const ce=We.getPrimaries(We.workingColorSpace),$=M.colorSpace===mr?null:We.getPrimaries(M.colorSpace),J=M.colorSpace===mr||ce===$?t.NONE:t.BROWSER_DEFAULT_WEBGL;n.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,M.flipY),n.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),n.pixelStorei(t.UNPACK_ALIGNMENT,M.unpackAlignment),n.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,J);const ue=M.isCompressedTexture||M.image[0].isCompressedTexture,Ae=M.image[0]&&M.image[0].isDataTexture,he=[];for(let te=0;te<6;te++)!ue&&!Ae?he[te]=g(M.image[te],!0,r.maxCubemapSize):he[te]=Ae?M.image[te].image:M.image[te],he[te]=mn(M,he[te]);const fe=he[0],Re=s.convert(M.format,M.colorSpace),De=s.convert(M.type),Fe=_(M.internalFormat,Re,De,M.normalized,M.colorSpace),I=M.isVideoTexture!==!0,le=se.__version===void 0||H===!0,Q=Y.dataReady;let de=b(M,fe);He(t.TEXTURE_CUBE_MAP,M);let xe;if(ue){I&&le&&n.texStorage2D(t.TEXTURE_CUBE_MAP,de,Fe,fe.width,fe.height);for(let te=0;te<6;te++){xe=he[te].mipmaps;for(let we=0;we<xe.length;we++){const Ee=xe[we];M.format!==ri?Re!==null?I?Q&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+te,we,0,0,Ee.width,Ee.height,Re,Ee.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+te,we,Fe,Ee.width,Ee.height,0,Ee.data):Le("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):I?Q&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+te,we,0,0,Ee.width,Ee.height,Re,De,Ee.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+te,we,Fe,Ee.width,Ee.height,0,Re,De,Ee.data)}}}else{if(xe=M.mipmaps,I&&le){xe.length>0&&de++;const te=et(he[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,de,Fe,te.width,te.height)}for(let te=0;te<6;te++)if(Ae){I?Q&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,he[te].width,he[te].height,Re,De,he[te].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,Fe,he[te].width,he[te].height,0,Re,De,he[te].data);for(let we=0;we<xe.length;we++){const yt=xe[we].image[te].image;I?Q&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+te,we+1,0,0,yt.width,yt.height,Re,De,yt.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+te,we+1,Fe,yt.width,yt.height,0,Re,De,yt.data)}}else{I?Q&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,Re,De,he[te]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,Fe,Re,De,he[te]);for(let we=0;we<xe.length;we++){const Ee=xe[we];I?Q&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+te,we+1,0,0,Re,De,Ee.image[te]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+te,we+1,Fe,Re,De,Ee.image[te])}}}h(M)&&x(t.TEXTURE_CUBE_MAP),se.__version=Y.version,M.onUpdate&&M.onUpdate(M)}R.__version=M.version}function Pe(R,M,k,H,Y,se){const ce=s.convert(k.format,k.colorSpace),$=s.convert(k.type),J=_(k.internalFormat,ce,$,k.normalized,k.colorSpace),ue=i.get(M),Ae=i.get(k);if(Ae.__renderTarget=M,!ue.__hasExternalTextures){const he=Math.max(1,M.width>>se),fe=Math.max(1,M.height>>se);Y===t.TEXTURE_3D||Y===t.TEXTURE_2D_ARRAY?n.texImage3D(Y,se,J,he,fe,M.depth,0,ce,$,null):n.texImage2D(Y,se,J,he,fe,0,ce,$,null)}n.bindFramebuffer(t.FRAMEBUFFER,R),Pt(M)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,H,Y,Ae.__webglTexture,0,vt(M)):(Y===t.TEXTURE_2D||Y>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&Y<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,H,Y,Ae.__webglTexture,se),n.bindFramebuffer(t.FRAMEBUFFER,null)}function Tt(R,M,k){if(t.bindRenderbuffer(t.RENDERBUFFER,R),M.depthBuffer){const H=M.depthTexture,Y=H&&H.isDepthTexture?H.type:null,se=w(M.stencilBuffer,Y),ce=M.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;Pt(M)?a.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,vt(M),se,M.width,M.height):k?t.renderbufferStorageMultisample(t.RENDERBUFFER,vt(M),se,M.width,M.height):t.renderbufferStorage(t.RENDERBUFFER,se,M.width,M.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,ce,t.RENDERBUFFER,R)}else{const H=M.textures;for(let Y=0;Y<H.length;Y++){const se=H[Y],ce=s.convert(se.format,se.colorSpace),$=s.convert(se.type),J=_(se.internalFormat,ce,$,se.normalized,se.colorSpace);Pt(M)?a.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,vt(M),J,M.width,M.height):k?t.renderbufferStorageMultisample(t.RENDERBUFFER,vt(M),J,M.width,M.height):t.renderbufferStorage(t.RENDERBUFFER,J,M.width,M.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function Ge(R,M,k){const H=M.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(t.FRAMEBUFFER,R),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const Y=i.get(M.depthTexture);if(Y.__renderTarget=M,(!Y.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),H){if(Y.__webglInit===void 0&&(Y.__webglInit=!0,M.depthTexture.addEventListener("dispose",A)),Y.__webglTexture===void 0){Y.__webglTexture=t.createTexture(),n.bindTexture(t.TEXTURE_CUBE_MAP,Y.__webglTexture),He(t.TEXTURE_CUBE_MAP,M.depthTexture);const ue=s.convert(M.depthTexture.format),Ae=s.convert(M.depthTexture.type);let he;M.depthTexture.format===Qi?he=t.DEPTH_COMPONENT24:M.depthTexture.format===es&&(he=t.DEPTH24_STENCIL8);for(let fe=0;fe<6;fe++)t.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,he,M.width,M.height,0,ue,Ae,null)}}else L(M.depthTexture,0);const se=Y.__webglTexture,ce=vt(M),$=H?t.TEXTURE_CUBE_MAP_POSITIVE_X+k:t.TEXTURE_2D,J=M.depthTexture.format===es?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;if(M.depthTexture.format===Qi)Pt(M)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,J,$,se,0,ce):t.framebufferTexture2D(t.FRAMEBUFFER,J,$,se,0);else if(M.depthTexture.format===es)Pt(M)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,J,$,se,0,ce):t.framebufferTexture2D(t.FRAMEBUFFER,J,$,se,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function rt(R){const M=i.get(R),k=R.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==R.depthTexture){const H=R.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),H){const Y=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,H.removeEventListener("dispose",Y)};H.addEventListener("dispose",Y),M.__depthDisposeCallback=Y}M.__boundDepthTexture=H}if(R.depthTexture&&!M.__autoAllocateDepthBuffer)if(k)for(let H=0;H<6;H++)Ge(M.__webglFramebuffer[H],R,H);else{const H=R.texture.mipmaps;H&&H.length>0?Ge(M.__webglFramebuffer[0],R,0):Ge(M.__webglFramebuffer,R,0)}else if(k){M.__webglDepthbuffer=[];for(let H=0;H<6;H++)if(n.bindFramebuffer(t.FRAMEBUFFER,M.__webglFramebuffer[H]),M.__webglDepthbuffer[H]===void 0)M.__webglDepthbuffer[H]=t.createRenderbuffer(),Tt(M.__webglDepthbuffer[H],R,!1);else{const Y=R.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,se=M.__webglDepthbuffer[H];t.bindRenderbuffer(t.RENDERBUFFER,se),t.framebufferRenderbuffer(t.FRAMEBUFFER,Y,t.RENDERBUFFER,se)}}else{const H=R.texture.mipmaps;if(H&&H.length>0?n.bindFramebuffer(t.FRAMEBUFFER,M.__webglFramebuffer[0]):n.bindFramebuffer(t.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=t.createRenderbuffer(),Tt(M.__webglDepthbuffer,R,!1);else{const Y=R.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,se=M.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,se),t.framebufferRenderbuffer(t.FRAMEBUFFER,Y,t.RENDERBUFFER,se)}}n.bindFramebuffer(t.FRAMEBUFFER,null)}function Ze(R,M,k){const H=i.get(R);M!==void 0&&Pe(H.__webglFramebuffer,R,R.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),k!==void 0&&rt(R)}function Xe(R){const M=R.texture,k=i.get(R),H=i.get(M);R.addEventListener("dispose",y);const Y=R.textures,se=R.isWebGLCubeRenderTarget===!0,ce=Y.length>1;if(ce||(H.__webglTexture===void 0&&(H.__webglTexture=t.createTexture()),H.__version=M.version,o.memory.textures++),se){k.__webglFramebuffer=[];for(let $=0;$<6;$++)if(M.mipmaps&&M.mipmaps.length>0){k.__webglFramebuffer[$]=[];for(let J=0;J<M.mipmaps.length;J++)k.__webglFramebuffer[$][J]=t.createFramebuffer()}else k.__webglFramebuffer[$]=t.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){k.__webglFramebuffer=[];for(let $=0;$<M.mipmaps.length;$++)k.__webglFramebuffer[$]=t.createFramebuffer()}else k.__webglFramebuffer=t.createFramebuffer();if(ce)for(let $=0,J=Y.length;$<J;$++){const ue=i.get(Y[$]);ue.__webglTexture===void 0&&(ue.__webglTexture=t.createTexture(),o.memory.textures++)}if(R.samples>0&&Pt(R)===!1){k.__webglMultisampledFramebuffer=t.createFramebuffer(),k.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let $=0;$<Y.length;$++){const J=Y[$];k.__webglColorRenderbuffer[$]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,k.__webglColorRenderbuffer[$]);const ue=s.convert(J.format,J.colorSpace),Ae=s.convert(J.type),he=_(J.internalFormat,ue,Ae,J.normalized,J.colorSpace,R.isXRRenderTarget===!0),fe=vt(R);t.renderbufferStorageMultisample(t.RENDERBUFFER,fe,he,R.width,R.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+$,t.RENDERBUFFER,k.__webglColorRenderbuffer[$])}t.bindRenderbuffer(t.RENDERBUFFER,null),R.depthBuffer&&(k.__webglDepthRenderbuffer=t.createRenderbuffer(),Tt(k.__webglDepthRenderbuffer,R,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(se){n.bindTexture(t.TEXTURE_CUBE_MAP,H.__webglTexture),He(t.TEXTURE_CUBE_MAP,M);for(let $=0;$<6;$++)if(M.mipmaps&&M.mipmaps.length>0)for(let J=0;J<M.mipmaps.length;J++)Pe(k.__webglFramebuffer[$][J],R,M,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+$,J);else Pe(k.__webglFramebuffer[$],R,M,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+$,0);h(M)&&x(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(ce){for(let $=0,J=Y.length;$<J;$++){const ue=Y[$],Ae=i.get(ue);let he=t.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(he=R.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(he,Ae.__webglTexture),He(he,ue),Pe(k.__webglFramebuffer,R,ue,t.COLOR_ATTACHMENT0+$,he,0),h(ue)&&x(he)}n.unbindTexture()}else{let $=t.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&($=R.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture($,H.__webglTexture),He($,M),M.mipmaps&&M.mipmaps.length>0)for(let J=0;J<M.mipmaps.length;J++)Pe(k.__webglFramebuffer[J],R,M,t.COLOR_ATTACHMENT0,$,J);else Pe(k.__webglFramebuffer,R,M,t.COLOR_ATTACHMENT0,$,0);h(M)&&x($),n.unbindTexture()}R.depthBuffer&&rt(R)}function Rt(R){const M=R.textures;for(let k=0,H=M.length;k<H;k++){const Y=M[k];if(h(Y)){const se=S(R),ce=i.get(Y).__webglTexture;n.bindTexture(se,ce),x(se),n.unbindTexture()}}}const Nt=[],Vt=[];function Wt(R){if(R.samples>0){if(Pt(R)===!1){const M=R.textures,k=R.width,H=R.height;let Y=t.COLOR_BUFFER_BIT;const se=R.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,ce=i.get(R),$=M.length>1;if($)for(let ue=0;ue<M.length;ue++)n.bindFramebuffer(t.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ue,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,ce.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+ue,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,ce.__webglMultisampledFramebuffer);const J=R.texture.mipmaps;J&&J.length>0?n.bindFramebuffer(t.DRAW_FRAMEBUFFER,ce.__webglFramebuffer[0]):n.bindFramebuffer(t.DRAW_FRAMEBUFFER,ce.__webglFramebuffer);for(let ue=0;ue<M.length;ue++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(Y|=t.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(Y|=t.STENCIL_BUFFER_BIT)),$){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,ce.__webglColorRenderbuffer[ue]);const Ae=i.get(M[ue]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,Ae,0)}t.blitFramebuffer(0,0,k,H,0,0,k,H,Y,t.NEAREST),l===!0&&(Nt.length=0,Vt.length=0,Nt.push(t.COLOR_ATTACHMENT0+ue),R.depthBuffer&&R.resolveDepthBuffer===!1&&(Nt.push(se),Vt.push(se),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,Vt)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,Nt))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),$)for(let ue=0;ue<M.length;ue++){n.bindFramebuffer(t.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ue,t.RENDERBUFFER,ce.__webglColorRenderbuffer[ue]);const Ae=i.get(M[ue]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,ce.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+ue,t.TEXTURE_2D,Ae,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,ce.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){const M=R.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[M])}}}function vt(R){return Math.min(r.maxSamples,R.samples)}function Pt(R){const M=i.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function N(R){const M=o.render.frame;u.get(R)!==M&&(u.set(R,M),R.update())}function mn(R,M){const k=R.colorSpace,H=R.format,Y=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||k!==Oc&&k!==mr&&(We.getTransfer(k)===tt?(H!==ri||Y!==Bn)&&Le("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):$e("WebGLTextures: Unsupported texture color space:",k)),M}function et(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=q,this.resetTextureUnits=X,this.getTextureUnits=ee,this.setTextureUnits=O,this.setTexture2D=L,this.setTexture2DArray=W,this.setTexture3D=Z,this.setTextureCube=ne,this.rebindTextures=Ze,this.setupRenderTarget=Xe,this.updateRenderTargetMipmap=Rt,this.updateMultisampleRenderTarget=Wt,this.setupDepthRenderbuffer=rt,this.setupFrameBufferTexture=Pe,this.useMultisampledRTT=Pt,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function p3(t,e){function n(i,r=mr){let s;const o=We.getTransfer(r);if(i===Bn)return t.UNSIGNED_BYTE;if(i===im)return t.UNSIGNED_SHORT_4_4_4_4;if(i===rm)return t.UNSIGNED_SHORT_5_5_5_1;if(i===Q_)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===J_)return t.UNSIGNED_INT_10F_11F_11F_REV;if(i===K_)return t.BYTE;if(i===Z_)return t.SHORT;if(i===Ra)return t.UNSIGNED_SHORT;if(i===nm)return t.INT;if(i===Ci)return t.UNSIGNED_INT;if(i===_i)return t.FLOAT;if(i===Zi)return t.HALF_FLOAT;if(i===eS)return t.ALPHA;if(i===tS)return t.RGB;if(i===ri)return t.RGBA;if(i===Qi)return t.DEPTH_COMPONENT;if(i===es)return t.DEPTH_STENCIL;if(i===nS)return t.RED;if(i===sm)return t.RED_INTEGER;if(i===hs)return t.RG;if(i===om)return t.RG_INTEGER;if(i===am)return t.RGBA_INTEGER;if(i===ec||i===tc||i===nc||i===ic)if(o===tt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===ec)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===tc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===nc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===ic)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===ec)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===tc)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===nc)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===ic)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===ih||i===rh||i===sh||i===oh)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===ih)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===rh)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===sh)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===oh)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===ah||i===lh||i===ch||i===uh||i===fh||i===Fc||i===dh)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===ah||i===lh)return o===tt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===ch)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===uh)return s.COMPRESSED_R11_EAC;if(i===fh)return s.COMPRESSED_SIGNED_R11_EAC;if(i===Fc)return s.COMPRESSED_RG11_EAC;if(i===dh)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===hh||i===ph||i===mh||i===gh||i===xh||i===vh||i===yh||i===_h||i===Sh||i===Mh||i===Eh||i===Th||i===wh||i===Ah)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===hh)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===ph)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===mh)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===gh)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===xh)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===vh)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===yh)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===_h)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Sh)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Mh)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Eh)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Th)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===wh)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Ah)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===bh||i===Ch||i===Rh)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===bh)return o===tt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Ch)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Rh)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Ph||i===Dh||i===kc||i===Lh)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Ph)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Dh)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===kc)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Lh)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Pa?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:n}}const m3=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,g3=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class x3{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n){if(this.texture===null){const i=new hS(e.texture);(e.depthNear!==n.depthNear||e.depthFar!==n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,i=new Pi({vertexShader:m3,fragmentShader:g3,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Ri(new vu(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class v3 extends xs{constructor(e,n){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,d=null,f=null,p=null,m=null;const E=typeof XRWebGLBinding<"u",g=new x3,h={},x=n.getContextAttributes();let S=null,_=null;const w=[],b=[],A=new Qe;let y=null;const C=new On;C.viewport=new Et;const P=new On;P.viewport=new Et;const D=[C,P],F=new C2;let X=null,ee=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let ae=w[K];return ae===void 0&&(ae=new df,w[K]=ae),ae.getTargetRaySpace()},this.getControllerGrip=function(K){let ae=w[K];return ae===void 0&&(ae=new df,w[K]=ae),ae.getGripSpace()},this.getHand=function(K){let ae=w[K];return ae===void 0&&(ae=new df,w[K]=ae),ae.getHandSpace()};function O(K){const ae=b.indexOf(K.inputSource);if(ae===-1)return;const re=w[ae];re!==void 0&&(re.update(K.inputSource,K.frame,c||o),re.dispatchEvent({type:K.type,data:K.inputSource}))}function q(){r.removeEventListener("select",O),r.removeEventListener("selectstart",O),r.removeEventListener("selectend",O),r.removeEventListener("squeeze",O),r.removeEventListener("squeezestart",O),r.removeEventListener("squeezeend",O),r.removeEventListener("end",q),r.removeEventListener("inputsourceschange",z);for(let K=0;K<w.length;K++){const ae=b[K];ae!==null&&(b[K]=null,w[K].disconnect(ae))}X=null,ee=null,g.reset();for(const K in h)delete h[K];e.setRenderTarget(S),p=null,f=null,d=null,r=null,_=null,He.stop(),i.isPresenting=!1,e.setPixelRatio(y),e.setSize(A.width,A.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){s=K,i.isPresenting===!0&&Le("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){a=K,i.isPresenting===!0&&Le("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(K){c=K},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return d===null&&E&&(d=new XRWebGLBinding(r,n)),d},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(K){if(r=K,r!==null){if(S=e.getRenderTarget(),r.addEventListener("select",O),r.addEventListener("selectstart",O),r.addEventListener("selectend",O),r.addEventListener("squeeze",O),r.addEventListener("squeezestart",O),r.addEventListener("squeezeend",O),r.addEventListener("end",q),r.addEventListener("inputsourceschange",z),x.xrCompatible!==!0&&await n.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(A),E&&"createProjectionLayer"in XRWebGLBinding.prototype){let re=null,Ie=null,Ue=null;x.depth&&(Ue=x.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,re=x.stencil?es:Qi,Ie=x.stencil?Pa:Ci);const Pe={colorFormat:n.RGBA8,depthFormat:Ue,scaleFactor:s};d=this.getBinding(),f=d.createProjectionLayer(Pe),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),_=new wi(f.textureWidth,f.textureHeight,{format:ri,type:Bn,depthTexture:new go(f.textureWidth,f.textureHeight,Ie,void 0,void 0,void 0,void 0,void 0,void 0,re),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const re={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,n,re),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),_=new wi(p.framebufferWidth,p.framebufferHeight,{format:ri,type:Bn,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),He.setContext(r),He.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function z(K){for(let ae=0;ae<K.removed.length;ae++){const re=K.removed[ae],Ie=b.indexOf(re);Ie>=0&&(b[Ie]=null,w[Ie].disconnect(re))}for(let ae=0;ae<K.added.length;ae++){const re=K.added[ae];let Ie=b.indexOf(re);if(Ie===-1){for(let Pe=0;Pe<w.length;Pe++)if(Pe>=b.length){b.push(re),Ie=Pe;break}else if(b[Pe]===null){b[Pe]=re,Ie=Pe;break}if(Ie===-1)break}const Ue=w[Ie];Ue&&Ue.connect(re)}}const L=new B,W=new B;function Z(K,ae,re){L.setFromMatrixPosition(ae.matrixWorld),W.setFromMatrixPosition(re.matrixWorld);const Ie=L.distanceTo(W),Ue=ae.projectionMatrix.elements,Pe=re.projectionMatrix.elements,Tt=Ue[14]/(Ue[10]-1),Ge=Ue[14]/(Ue[10]+1),rt=(Ue[9]+1)/Ue[5],Ze=(Ue[9]-1)/Ue[5],Xe=(Ue[8]-1)/Ue[0],Rt=(Pe[8]+1)/Pe[0],Nt=Tt*Xe,Vt=Tt*Rt,Wt=Ie/(-Xe+Rt),vt=Wt*-Xe;if(ae.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(vt),K.translateZ(Wt),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),Ue[10]===-1)K.projectionMatrix.copy(ae.projectionMatrix),K.projectionMatrixInverse.copy(ae.projectionMatrixInverse);else{const Pt=Tt+Wt,N=Ge+Wt,mn=Nt-vt,et=Vt+(Ie-vt),R=rt*Ge/N*Pt,M=Ze*Ge/N*Pt;K.projectionMatrix.makePerspective(mn,et,R,M,Pt,N),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function ne(K,ae){ae===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(ae.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(r===null)return;let ae=K.near,re=K.far;g.texture!==null&&(g.depthNear>0&&(ae=g.depthNear),g.depthFar>0&&(re=g.depthFar)),F.near=P.near=C.near=ae,F.far=P.far=C.far=re,(X!==F.near||ee!==F.far)&&(r.updateRenderState({depthNear:F.near,depthFar:F.far}),X=F.near,ee=F.far),F.layers.mask=K.layers.mask|6,C.layers.mask=F.layers.mask&-5,P.layers.mask=F.layers.mask&-3;const Ie=K.parent,Ue=F.cameras;ne(F,Ie);for(let Pe=0;Pe<Ue.length;Pe++)ne(Ue[Pe],Ie);Ue.length===2?Z(F,C,P):F.projectionMatrix.copy(C.projectionMatrix),oe(K,F,Ie)};function oe(K,ae,re){re===null?K.matrix.copy(ae.matrixWorld):(K.matrix.copy(re.matrixWorld),K.matrix.invert(),K.matrix.multiply(ae.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(ae.projectionMatrix),K.projectionMatrixInverse.copy(ae.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=Ih*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function(K){l=K,f!==null&&(f.fixedFoveation=K),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=K)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(F)},this.getCameraTexture=function(K){return h[K]};let ze=null;function Je(K,ae){if(u=ae.getViewerPose(c||o),m=ae,u!==null){const re=u.views;p!==null&&(e.setRenderTargetFramebuffer(_,p.framebuffer),e.setRenderTarget(_));let Ie=!1;re.length!==F.cameras.length&&(F.cameras.length=0,Ie=!0);for(let Ge=0;Ge<re.length;Ge++){const rt=re[Ge];let Ze=null;if(p!==null)Ze=p.getViewport(rt);else{const Rt=d.getViewSubImage(f,rt);Ze=Rt.viewport,Ge===0&&(e.setRenderTargetTextures(_,Rt.colorTexture,Rt.depthStencilTexture),e.setRenderTarget(_))}let Xe=D[Ge];Xe===void 0&&(Xe=new On,Xe.layers.enable(Ge),Xe.viewport=new Et,D[Ge]=Xe),Xe.matrix.fromArray(rt.transform.matrix),Xe.matrix.decompose(Xe.position,Xe.quaternion,Xe.scale),Xe.projectionMatrix.fromArray(rt.projectionMatrix),Xe.projectionMatrixInverse.copy(Xe.projectionMatrix).invert(),Xe.viewport.set(Ze.x,Ze.y,Ze.width,Ze.height),Ge===0&&(F.matrix.copy(Xe.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),Ie===!0&&F.cameras.push(Xe)}const Ue=r.enabledFeatures;if(Ue&&Ue.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&E){d=i.getBinding();const Ge=d.getDepthInformation(re[0]);Ge&&Ge.isValid&&Ge.texture&&g.init(Ge,r.renderState)}if(Ue&&Ue.includes("camera-access")&&E){e.state.unbindTexture(),d=i.getBinding();for(let Ge=0;Ge<re.length;Ge++){const rt=re[Ge].camera;if(rt){let Ze=h[rt];Ze||(Ze=new hS,h[rt]=Ze);const Xe=d.getCameraImage(rt);Ze.sourceTexture=Xe}}}}for(let re=0;re<w.length;re++){const Ie=b[re],Ue=w[re];Ie!==null&&Ue!==void 0&&Ue.update(Ie,ae,c||o)}ze&&ze(K,ae),ae.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ae}),m=null}const He=new xS;He.setAnimationLoop(Je),this.setAnimationLoop=function(K){ze=K},this.dispose=function(){}}}const y3=new Ct,TS=new Ne;TS.set(-1,0,0,0,1,0,0,0,1);function _3(t,e){function n(g,h){g.matrixAutoUpdate===!0&&g.updateMatrix(),h.value.copy(g.matrix)}function i(g,h){h.color.getRGB(g.fogColor.value,pS(t)),h.isFog?(g.fogNear.value=h.near,g.fogFar.value=h.far):h.isFogExp2&&(g.fogDensity.value=h.density)}function r(g,h,x,S,_){h.isNodeMaterial?h.uniformsNeedUpdate=!1:h.isMeshBasicMaterial?s(g,h):h.isMeshLambertMaterial?(s(g,h),h.envMap&&(g.envMapIntensity.value=h.envMapIntensity)):h.isMeshToonMaterial?(s(g,h),d(g,h)):h.isMeshPhongMaterial?(s(g,h),u(g,h),h.envMap&&(g.envMapIntensity.value=h.envMapIntensity)):h.isMeshStandardMaterial?(s(g,h),f(g,h),h.isMeshPhysicalMaterial&&p(g,h,_)):h.isMeshMatcapMaterial?(s(g,h),m(g,h)):h.isMeshDepthMaterial?s(g,h):h.isMeshDistanceMaterial?(s(g,h),E(g,h)):h.isMeshNormalMaterial?s(g,h):h.isLineBasicMaterial?(o(g,h),h.isLineDashedMaterial&&a(g,h)):h.isPointsMaterial?l(g,h,x,S):h.isSpriteMaterial?c(g,h):h.isShadowMaterial?(g.color.value.copy(h.color),g.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function s(g,h){g.opacity.value=h.opacity,h.color&&g.diffuse.value.copy(h.color),h.emissive&&g.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(g.map.value=h.map,n(h.map,g.mapTransform)),h.alphaMap&&(g.alphaMap.value=h.alphaMap,n(h.alphaMap,g.alphaMapTransform)),h.bumpMap&&(g.bumpMap.value=h.bumpMap,n(h.bumpMap,g.bumpMapTransform),g.bumpScale.value=h.bumpScale,h.side===Mn&&(g.bumpScale.value*=-1)),h.normalMap&&(g.normalMap.value=h.normalMap,n(h.normalMap,g.normalMapTransform),g.normalScale.value.copy(h.normalScale),h.side===Mn&&g.normalScale.value.negate()),h.displacementMap&&(g.displacementMap.value=h.displacementMap,n(h.displacementMap,g.displacementMapTransform),g.displacementScale.value=h.displacementScale,g.displacementBias.value=h.displacementBias),h.emissiveMap&&(g.emissiveMap.value=h.emissiveMap,n(h.emissiveMap,g.emissiveMapTransform)),h.specularMap&&(g.specularMap.value=h.specularMap,n(h.specularMap,g.specularMapTransform)),h.alphaTest>0&&(g.alphaTest.value=h.alphaTest);const x=e.get(h),S=x.envMap,_=x.envMapRotation;S&&(g.envMap.value=S,g.envMapRotation.value.setFromMatrix4(y3.makeRotationFromEuler(_)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(TS),g.reflectivity.value=h.reflectivity,g.ior.value=h.ior,g.refractionRatio.value=h.refractionRatio),h.lightMap&&(g.lightMap.value=h.lightMap,g.lightMapIntensity.value=h.lightMapIntensity,n(h.lightMap,g.lightMapTransform)),h.aoMap&&(g.aoMap.value=h.aoMap,g.aoMapIntensity.value=h.aoMapIntensity,n(h.aoMap,g.aoMapTransform))}function o(g,h){g.diffuse.value.copy(h.color),g.opacity.value=h.opacity,h.map&&(g.map.value=h.map,n(h.map,g.mapTransform))}function a(g,h){g.dashSize.value=h.dashSize,g.totalSize.value=h.dashSize+h.gapSize,g.scale.value=h.scale}function l(g,h,x,S){g.diffuse.value.copy(h.color),g.opacity.value=h.opacity,g.size.value=h.size*x,g.scale.value=S*.5,h.map&&(g.map.value=h.map,n(h.map,g.uvTransform)),h.alphaMap&&(g.alphaMap.value=h.alphaMap,n(h.alphaMap,g.alphaMapTransform)),h.alphaTest>0&&(g.alphaTest.value=h.alphaTest)}function c(g,h){g.diffuse.value.copy(h.color),g.opacity.value=h.opacity,g.rotation.value=h.rotation,h.map&&(g.map.value=h.map,n(h.map,g.mapTransform)),h.alphaMap&&(g.alphaMap.value=h.alphaMap,n(h.alphaMap,g.alphaMapTransform)),h.alphaTest>0&&(g.alphaTest.value=h.alphaTest)}function u(g,h){g.specular.value.copy(h.specular),g.shininess.value=Math.max(h.shininess,1e-4)}function d(g,h){h.gradientMap&&(g.gradientMap.value=h.gradientMap)}function f(g,h){g.metalness.value=h.metalness,h.metalnessMap&&(g.metalnessMap.value=h.metalnessMap,n(h.metalnessMap,g.metalnessMapTransform)),g.roughness.value=h.roughness,h.roughnessMap&&(g.roughnessMap.value=h.roughnessMap,n(h.roughnessMap,g.roughnessMapTransform)),h.envMap&&(g.envMapIntensity.value=h.envMapIntensity)}function p(g,h,x){g.ior.value=h.ior,h.sheen>0&&(g.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),g.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(g.sheenColorMap.value=h.sheenColorMap,n(h.sheenColorMap,g.sheenColorMapTransform)),h.sheenRoughnessMap&&(g.sheenRoughnessMap.value=h.sheenRoughnessMap,n(h.sheenRoughnessMap,g.sheenRoughnessMapTransform))),h.clearcoat>0&&(g.clearcoat.value=h.clearcoat,g.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(g.clearcoatMap.value=h.clearcoatMap,n(h.clearcoatMap,g.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,n(h.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(g.clearcoatNormalMap.value=h.clearcoatNormalMap,n(h.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===Mn&&g.clearcoatNormalScale.value.negate())),h.dispersion>0&&(g.dispersion.value=h.dispersion),h.iridescence>0&&(g.iridescence.value=h.iridescence,g.iridescenceIOR.value=h.iridescenceIOR,g.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(g.iridescenceMap.value=h.iridescenceMap,n(h.iridescenceMap,g.iridescenceMapTransform)),h.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=h.iridescenceThicknessMap,n(h.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),h.transmission>0&&(g.transmission.value=h.transmission,g.transmissionSamplerMap.value=x.texture,g.transmissionSamplerSize.value.set(x.width,x.height),h.transmissionMap&&(g.transmissionMap.value=h.transmissionMap,n(h.transmissionMap,g.transmissionMapTransform)),g.thickness.value=h.thickness,h.thicknessMap&&(g.thicknessMap.value=h.thicknessMap,n(h.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=h.attenuationDistance,g.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(g.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(g.anisotropyMap.value=h.anisotropyMap,n(h.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=h.specularIntensity,g.specularColor.value.copy(h.specularColor),h.specularColorMap&&(g.specularColorMap.value=h.specularColorMap,n(h.specularColorMap,g.specularColorMapTransform)),h.specularIntensityMap&&(g.specularIntensityMap.value=h.specularIntensityMap,n(h.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,h){h.matcap&&(g.matcap.value=h.matcap)}function E(g,h){const x=e.get(h).light;g.referencePosition.value.setFromMatrixPosition(x.matrixWorld),g.nearDistance.value=x.shadow.camera.near,g.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function S3(t,e,n,i){let r={},s={},o=[];const a=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function l(_,w){const b=w.program;i.uniformBlockBinding(_,b)}function c(_,w){let b=r[_.id];b===void 0&&(g(_),b=u(_),r[_.id]=b,_.addEventListener("dispose",x));const A=w.program;i.updateUBOMapping(_,A);const y=e.render.frame;s[_.id]!==y&&(f(_),s[_.id]=y)}function u(_){const w=d();_.__bindingPointIndex=w;const b=t.createBuffer(),A=_.__size,y=_.usage;return t.bindBuffer(t.UNIFORM_BUFFER,b),t.bufferData(t.UNIFORM_BUFFER,A,y),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,w,b),b}function d(){for(let _=0;_<a;_++)if(o.indexOf(_)===-1)return o.push(_),_;return $e("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(_){const w=r[_.id],b=_.uniforms,A=_.__cache;t.bindBuffer(t.UNIFORM_BUFFER,w);for(let y=0,C=b.length;y<C;y++){const P=b[y];if(Array.isArray(P))for(let D=0,F=P.length;D<F;D++)p(P[D],y,D,A);else p(P,y,0,A)}t.bindBuffer(t.UNIFORM_BUFFER,null)}function p(_,w,b,A){if(E(_,w,b,A)===!0){const y=_.__offset,C=_.value;if(Array.isArray(C)){let P=0;for(let D=0;D<C.length;D++){const F=C[D],X=h(F);m(F,_.__data,P),typeof F!="number"&&typeof F!="boolean"&&!F.isMatrix3&&!ArrayBuffer.isView(F)&&(P+=X.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(C,_.__data,0);t.bufferSubData(t.UNIFORM_BUFFER,y,_.__data)}}function m(_,w,b){typeof _=="number"||typeof _=="boolean"?w[0]=_:_.isMatrix3?(w[0]=_.elements[0],w[1]=_.elements[1],w[2]=_.elements[2],w[3]=0,w[4]=_.elements[3],w[5]=_.elements[4],w[6]=_.elements[5],w[7]=0,w[8]=_.elements[6],w[9]=_.elements[7],w[10]=_.elements[8],w[11]=0):ArrayBuffer.isView(_)?w.set(new _.constructor(_.buffer,_.byteOffset,w.length)):_.toArray(w,b)}function E(_,w,b,A){const y=_.value,C=w+"_"+b;if(A[C]===void 0)return typeof y=="number"||typeof y=="boolean"?A[C]=y:ArrayBuffer.isView(y)?A[C]=y.slice():A[C]=y.clone(),!0;{const P=A[C];if(typeof y=="number"||typeof y=="boolean"){if(P!==y)return A[C]=y,!0}else{if(ArrayBuffer.isView(y))return!0;if(P.equals(y)===!1)return P.copy(y),!0}}return!1}function g(_){const w=_.uniforms;let b=0;const A=16;for(let C=0,P=w.length;C<P;C++){const D=Array.isArray(w[C])?w[C]:[w[C]];for(let F=0,X=D.length;F<X;F++){const ee=D[F],O=Array.isArray(ee.value)?ee.value:[ee.value];for(let q=0,z=O.length;q<z;q++){const L=O[q],W=h(L),Z=b%A,ne=Z%W.boundary,oe=Z+ne;b+=ne,oe!==0&&A-oe<W.storage&&(b+=A-oe),ee.__data=new Float32Array(W.storage/Float32Array.BYTES_PER_ELEMENT),ee.__offset=b,b+=W.storage}}}const y=b%A;return y>0&&(b+=A-y),_.__size=b,_.__cache={},this}function h(_){const w={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(w.boundary=4,w.storage=4):_.isVector2?(w.boundary=8,w.storage=8):_.isVector3||_.isColor?(w.boundary=16,w.storage=12):_.isVector4?(w.boundary=16,w.storage=16):_.isMatrix3?(w.boundary=48,w.storage=48):_.isMatrix4?(w.boundary=64,w.storage=64):_.isTexture?Le("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(_)?(w.boundary=16,w.storage=_.byteLength):Le("WebGLRenderer: Unsupported uniform value type.",_),w}function x(_){const w=_.target;w.removeEventListener("dispose",x);const b=o.indexOf(w.__bindingPointIndex);o.splice(b,1),t.deleteBuffer(r[w.id]),delete r[w.id],delete s[w.id]}function S(){for(const _ in r)t.deleteBuffer(r[_]);o=[],r={},s={}}return{bind:l,update:c,dispose:S}}const M3=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let pi=null;function E3(){return pi===null&&(pi=new h2(M3,16,16,hs,Zi),pi.name="DFG_LUT",pi.minFilter=rn,pi.magFilter=rn,pi.wrapS=Hi,pi.wrapT=Hi,pi.generateMipmaps=!1,pi.needsUpdate=!0),pi}class T3{constructor(e={}){const{canvas:n=Ww(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:f=!1,outputBufferType:p=Bn}=e;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=o;const E=p,g=new Set([am,om,sm]),h=new Set([Bn,Ci,Ra,Pa,im,rm]),x=new Uint32Array(4),S=new Int32Array(4),_=new B;let w=null,b=null;const A=[],y=[];let C=null;this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ti,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const P=this;let D=!1,F=null,X=null,ee=null,O=null;this._outputColorSpace=Un;let q=0,z=0,L=null,W=-1,Z=null;const ne=new Et,oe=new Et;let ze=null;const Je=new Ke(0);let He=0,K=n.width,ae=n.height,re=1,Ie=null,Ue=null;const Pe=new Et(0,0,K,ae),Tt=new Et(0,0,K,ae);let Ge=!1;const rt=new uS;let Ze=!1,Xe=!1;const Rt=new Ct,Nt=new B,Vt=new Et,Wt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let vt=!1;function Pt(){return L===null?re:1}let N=i;function mn(T,U){return n.getContext(T,U)}try{const T={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${tm}`),n.addEventListener("webglcontextlost",yt,!1),n.addEventListener("webglcontextrestored",ct,!1),n.addEventListener("webglcontextcreationerror",ci,!1),N===null){const U="webgl2";if(N=mn(U,T),N===null)throw mn(U)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(T){throw $e("WebGLRenderer: "+T.message),T}let et,R,M,k,H,Y,se,ce,$,J,ue,Ae,he,fe,Re,De,Fe,I,le,Q,de,xe,te;function we(){et=new EC(N),et.init(),de=new p3(N,et),R=new mC(N,et,e,de),M=new d3(N,et),R.reversedDepthBuffer&&f&&M.buffers.depth.setReversed(!0),X=N.createFramebuffer(),ee=N.createFramebuffer(),O=N.createFramebuffer(),k=new AC(N),H=new QR,Y=new h3(N,et,M,H,R,de,k),se=new MC(P),ce=new P2(N),xe=new hC(N,ce),$=new TC(N,ce,k,xe),J=new CC(N,$,ce,xe,k),I=new bC(N,R,Y),Re=new gC(H),ue=new ZR(P,se,et,R,xe,Re),Ae=new _3(P,H),he=new e3,fe=new o3(et),Fe=new dC(P,se,M,J,m,l),De=new f3(P,J,R),te=new S3(N,k,R,M),le=new pC(N,et,k),Q=new wC(N,et,k),k.programs=ue.programs,P.capabilities=R,P.extensions=et,P.properties=H,P.renderLists=he,P.shadowMap=De,P.state=M,P.info=k}we(),E!==Bn&&(C=new PC(E,n.width,n.height,a,r,s));const Ee=new v3(P,N);this.xr=Ee,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const T=et.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=et.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return re},this.setPixelRatio=function(T){T!==void 0&&(re=T,this.setSize(K,ae,!1))},this.getSize=function(T){return T.set(K,ae)},this.setSize=function(T,U,j=!0){if(Ee.isPresenting){Le("WebGLRenderer: Can't change size while VR device is presenting.");return}K=T,ae=U,n.width=Math.floor(T*re),n.height=Math.floor(U*re),j===!0&&(n.style.width=T+"px",n.style.height=U+"px"),C!==null&&C.setSize(n.width,n.height),this.setViewport(0,0,T,U)},this.getDrawingBufferSize=function(T){return T.set(K*re,ae*re).floor()},this.setDrawingBufferSize=function(T,U,j){K=T,ae=U,re=j,n.width=Math.floor(T*j),n.height=Math.floor(U*j),this.setViewport(0,0,T,U)},this.setEffects=function(T){if(E===Bn){$e("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(T){for(let U=0;U<T.length;U++)if(T[U].isOutputPass===!0){Le("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}C.setEffects(T||[])},this.getCurrentViewport=function(T){return T.copy(ne)},this.getViewport=function(T){return T.copy(Pe)},this.setViewport=function(T,U,j,V){T.isVector4?Pe.set(T.x,T.y,T.z,T.w):Pe.set(T,U,j,V),M.viewport(ne.copy(Pe).multiplyScalar(re).round())},this.getScissor=function(T){return T.copy(Tt)},this.setScissor=function(T,U,j,V){T.isVector4?Tt.set(T.x,T.y,T.z,T.w):Tt.set(T,U,j,V),M.scissor(oe.copy(Tt).multiplyScalar(re).round())},this.getScissorTest=function(){return Ge},this.setScissorTest=function(T){M.setScissorTest(Ge=T)},this.setOpaqueSort=function(T){Ie=T},this.setTransparentSort=function(T){Ue=T},this.getClearColor=function(T){return T.copy(Fe.getClearColor())},this.setClearColor=function(){Fe.setClearColor(...arguments)},this.getClearAlpha=function(){return Fe.getClearAlpha()},this.setClearAlpha=function(){Fe.setClearAlpha(...arguments)},this.clear=function(T=!0,U=!0,j=!0){let V=0;if(T){let G=!1;if(L!==null){const ge=L.texture.format;G=g.has(ge)}if(G){const ge=L.texture.type,ye=h.has(ge),me=Fe.getClearColor(),Te=Fe.getClearAlpha(),be=me.r,ke=me.g,Be=me.b;ye?(x[0]=be,x[1]=ke,x[2]=Be,x[3]=Te,N.clearBufferuiv(N.COLOR,0,x)):(S[0]=be,S[1]=ke,S[2]=Be,S[3]=Te,N.clearBufferiv(N.COLOR,0,S))}else V|=N.COLOR_BUFFER_BIT}U&&(V|=N.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),j&&(V|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),V!==0&&N.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(T){T.setRenderer(this),F=T},this.dispose=function(){n.removeEventListener("webglcontextlost",yt,!1),n.removeEventListener("webglcontextrestored",ct,!1),n.removeEventListener("webglcontextcreationerror",ci,!1),Fe.dispose(),he.dispose(),fe.dispose(),H.dispose(),se.dispose(),J.dispose(),xe.dispose(),te.dispose(),ue.dispose(),Ee.dispose(),Ee.removeEventListener("sessionstart",Ym),Ee.removeEventListener("sessionend",$m),Or.stop()};function yt(T){T.preventDefault(),yg("WebGLRenderer: Context Lost."),D=!0}function ct(){yg("WebGLRenderer: Context Restored."),D=!1;const T=k.autoReset,U=De.enabled,j=De.autoUpdate,V=De.needsUpdate,G=De.type;we(),k.autoReset=T,De.enabled=U,De.autoUpdate=j,De.needsUpdate=V,De.type=G}function ci(T){$e("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function ui(T){const U=T.target;U.removeEventListener("dispose",ui),lM(U)}function lM(T){cM(T),H.remove(T)}function cM(T){const U=H.get(T).programs;U!==void 0&&(U.forEach(function(j){ue.releaseProgram(j)}),T.isShaderMaterial&&ue.releaseShaderCache(T))}this.renderBufferDirect=function(T,U,j,V,G,ge){U===null&&(U=Wt);const ye=G.isMesh&&G.matrixWorld.determinantAffine()<0,me=dM(T,U,j,V,G);M.setMaterial(V,ye);let Te=j.index,be=1;if(V.wireframe===!0){if(Te=$.getWireframeAttribute(j),Te===void 0)return;be=2}const ke=j.drawRange,Be=j.attributes.position;let Ce=ke.start*be,it=(ke.start+ke.count)*be;ge!==null&&(Ce=Math.max(Ce,ge.start*be),it=Math.min(it,(ge.start+ge.count)*be)),Te!==null?(Ce=Math.max(Ce,0),it=Math.min(it,Te.count)):Be!=null&&(Ce=Math.max(Ce,0),it=Math.min(it,Be.count));const wt=it-Ce;if(wt<0||wt===1/0)return;xe.setup(G,V,me,j,Te);let _t,st=le;if(Te!==null&&(_t=ce.get(Te),st=Q,st.setIndex(_t)),G.isMesh)V.wireframe===!0?(M.setLineWidth(V.wireframeLinewidth*Pt()),st.setMode(N.LINES)):st.setMode(N.TRIANGLES);else if(G.isLine){let Zt=V.linewidth;Zt===void 0&&(Zt=1),M.setLineWidth(Zt*Pt()),G.isLineSegments?st.setMode(N.LINES):G.isLineLoop?st.setMode(N.LINE_LOOP):st.setMode(N.LINE_STRIP)}else G.isPoints?st.setMode(N.POINTS):G.isSprite&&st.setMode(N.TRIANGLES);if(G.isBatchedMesh)if(et.get("WEBGL_multi_draw"))st.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{const Zt=G._multiDrawStarts,ve=G._multiDrawCounts,Tn=G._multiDrawCount,Ye=Te?ce.get(Te).bytesPerElement:1,In=H.get(V).currentProgram.getUniforms();for(let fi=0;fi<Tn;fi++)In.setValue(N,"_gl_DrawID",fi),st.render(Zt[fi]/Ye,ve[fi])}else if(G.isInstancedMesh)st.renderInstances(Ce,wt,G.count);else if(j.isInstancedBufferGeometry){const Zt=j._maxInstanceCount!==void 0?j._maxInstanceCount:1/0,ve=Math.min(j.instanceCount,Zt);st.renderInstances(Ce,wt,ve)}else st.render(Ce,wt)};function Xm(T,U,j){T.transparent===!0&&T.side===Vi&&T.forceSinglePass===!1?(T.side=Mn,T.needsUpdate=!0,qa(T,U,j),T.side=Pr,T.needsUpdate=!0,qa(T,U,j),T.side=Vi):qa(T,U,j)}this.compile=function(T,U,j=null){j===null&&(j=T),b=fe.get(j),b.init(U),y.push(b),j.traverseVisible(function(G){G.isLight&&G.layers.test(U.layers)&&(b.pushLight(G),G.castShadow&&b.pushShadow(G))}),T!==j&&T.traverseVisible(function(G){G.isLight&&G.layers.test(U.layers)&&(b.pushLight(G),G.castShadow&&b.pushShadow(G))}),b.setupLights();const V=new Set;return T.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;const ge=G.material;if(ge)if(Array.isArray(ge))for(let ye=0;ye<ge.length;ye++){const me=ge[ye];Xm(me,j,G),V.add(me)}else Xm(ge,j,G),V.add(ge)}),b=y.pop(),V},this.compileAsync=function(T,U,j=null){const V=this.compile(T,U,j);return new Promise(G=>{function ge(){if(V.forEach(function(ye){H.get(ye).currentProgram.isReady()&&V.delete(ye)}),V.size===0){G(T);return}setTimeout(ge,10)}et.get("KHR_parallel_shader_compile")!==null?ge():setTimeout(ge,10)})};let Au=null;function uM(T){Au&&Au(T)}function Ym(){Or.stop()}function $m(){Or.start()}const Or=new xS;Or.setAnimationLoop(uM),typeof self<"u"&&Or.setContext(self),this.setAnimationLoop=function(T){Au=T,Ee.setAnimationLoop(T),T===null?Or.stop():Or.start()},Ee.addEventListener("sessionstart",Ym),Ee.addEventListener("sessionend",$m),this.render=function(T,U){if(U!==void 0&&U.isCamera!==!0){$e("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;F!==null&&F.renderStart(T,U);const j=Ee.enabled===!0&&Ee.isPresenting===!0,V=C!==null&&(L===null||j)&&C.begin(P,L);if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),Ee.enabled===!0&&Ee.isPresenting===!0&&(C===null||C.isCompositing()===!1)&&(Ee.cameraAutoUpdate===!0&&Ee.updateCamera(U),U=Ee.getCamera()),T.isScene===!0&&T.onBeforeRender(P,T,U,L),b=fe.get(T,y.length),b.init(U),b.state.textureUnits=Y.getTextureUnits(),y.push(b),Rt.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),rt.setFromProjectionMatrix(Rt,Si,U.reversedDepth),Xe=this.localClippingEnabled,Ze=Re.init(this.clippingPlanes,Xe),w=he.get(T,A.length),w.init(),A.push(w),Ee.enabled===!0&&Ee.isPresenting===!0){const ye=P.xr.getDepthSensingMesh();ye!==null&&bu(ye,U,-1/0,P.sortObjects)}bu(T,U,0,P.sortObjects),w.finish(),P.sortObjects===!0&&w.sort(Ie,Ue,U.reversedDepth),vt=Ee.enabled===!1||Ee.isPresenting===!1||Ee.hasDepthSensing()===!1,vt&&Fe.addToRenderList(w,T),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Ze===!0&&Re.beginShadows();const G=b.state.shadowsArray;if(De.render(G,T,U),Ze===!0&&Re.endShadows(),(V&&C.hasRenderPass())===!1){const ye=w.opaque,me=w.transmissive;if(b.setupLights(),U.isArrayCamera){const Te=U.cameras;if(me.length>0)for(let be=0,ke=Te.length;be<ke;be++){const Be=Te[be];Km(ye,me,T,Be)}vt&&Fe.render(T);for(let be=0,ke=Te.length;be<ke;be++){const Be=Te[be];qm(w,T,Be,Be.viewport)}}else me.length>0&&Km(ye,me,T,U),vt&&Fe.render(T),qm(w,T,U)}L!==null&&z===0&&(Y.updateMultisampleRenderTarget(L),Y.updateRenderTargetMipmap(L)),V&&C.end(P),T.isScene===!0&&T.onAfterRender(P,T,U),xe.resetDefaultState(),W=-1,Z=null,y.pop(),y.length>0?(b=y[y.length-1],Y.setTextureUnits(b.state.textureUnits),Ze===!0&&Re.setGlobalState(P.clippingPlanes,b.state.camera)):b=null,A.pop(),A.length>0?w=A[A.length-1]:w=null,F!==null&&F.renderEnd()};function bu(T,U,j,V){if(T.visible===!1)return;if(T.layers.test(U.layers)){if(T.isGroup)j=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(U);else if(T.isLightProbeGrid)b.pushLightProbeGrid(T);else if(T.isLight)b.pushLight(T),T.castShadow&&b.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||rt.intersectsSprite(T)){V&&Vt.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Rt);const ye=J.update(T),me=T.material;me.visible&&w.push(T,ye,me,j,Vt.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||rt.intersectsObject(T))){const ye=J.update(T),me=T.material;if(V&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Vt.copy(T.boundingSphere.center)):(ye.boundingSphere===null&&ye.computeBoundingSphere(),Vt.copy(ye.boundingSphere.center)),Vt.applyMatrix4(T.matrixWorld).applyMatrix4(Rt)),Array.isArray(me)){const Te=ye.groups;for(let be=0,ke=Te.length;be<ke;be++){const Be=Te[be],Ce=me[Be.materialIndex];Ce&&Ce.visible&&w.push(T,ye,Ce,j,Vt.z,Be)}}else me.visible&&w.push(T,ye,me,j,Vt.z,null)}}const ge=T.children;for(let ye=0,me=ge.length;ye<me;ye++)bu(ge[ye],U,j,V)}function qm(T,U,j,V){const{opaque:G,transmissive:ge,transparent:ye}=T;b.setupLightsView(j),Ze===!0&&Re.setGlobalState(P.clippingPlanes,j),V&&M.viewport(ne.copy(V)),G.length>0&&$a(G,U,j),ge.length>0&&$a(ge,U,j),ye.length>0&&$a(ye,U,j),M.buffers.depth.setTest(!0),M.buffers.depth.setMask(!0),M.buffers.color.setMask(!0),M.setPolygonOffset(!1)}function Km(T,U,j,V){if((j.isScene===!0?j.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[V.id]===void 0){const Ce=et.has("EXT_color_buffer_half_float")||et.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[V.id]=new wi(1,1,{generateMipmaps:!0,type:Ce?Zi:Bn,minFilter:Jr,samples:Math.max(4,R.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:We.workingColorSpace})}const ge=b.state.transmissionRenderTarget[V.id],ye=V.viewport||ne;ge.setSize(ye.z*P.transmissionResolutionScale,ye.w*P.transmissionResolutionScale);const me=P.getRenderTarget(),Te=P.getActiveCubeFace(),be=P.getActiveMipmapLevel();P.setRenderTarget(ge),P.getClearColor(Je),He=P.getClearAlpha(),He<1&&P.setClearColor(16777215,.5),P.clear(),vt&&Fe.render(j);const ke=P.toneMapping;P.toneMapping=Ti;const Be=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),b.setupLightsView(V),Ze===!0&&Re.setGlobalState(P.clippingPlanes,V),$a(T,j,V),Y.updateMultisampleRenderTarget(ge),Y.updateRenderTargetMipmap(ge),et.has("WEBGL_multisampled_render_to_texture")===!1){let Ce=!1;for(let it=0,wt=U.length;it<wt;it++){const _t=U[it],{object:st,geometry:Zt,material:ve,group:Tn}=_t;if(ve.side===Vi&&st.layers.test(V.layers)){const Ye=ve.side;ve.side=Mn,ve.needsUpdate=!0,Zm(st,j,V,Zt,ve,Tn),ve.side=Ye,ve.needsUpdate=!0,Ce=!0}}Ce===!0&&(Y.updateMultisampleRenderTarget(ge),Y.updateRenderTargetMipmap(ge))}P.setRenderTarget(me,Te,be),P.setClearColor(Je,He),Be!==void 0&&(V.viewport=Be),P.toneMapping=ke}function $a(T,U,j){const V=U.isScene===!0?U.overrideMaterial:null;for(let G=0,ge=T.length;G<ge;G++){const ye=T[G],{object:me,geometry:Te,group:be}=ye;let ke=ye.material;ke.allowOverride===!0&&V!==null&&(ke=V),me.layers.test(j.layers)&&Zm(me,U,j,Te,ke,be)}}function Zm(T,U,j,V,G,ge){T.onBeforeRender(P,U,j,V,G,ge),T.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),G.onBeforeRender(P,U,j,V,T,ge),G.transparent===!0&&G.side===Vi&&G.forceSinglePass===!1?(G.side=Mn,G.needsUpdate=!0,P.renderBufferDirect(j,U,V,G,T,ge),G.side=Pr,G.needsUpdate=!0,P.renderBufferDirect(j,U,V,G,T,ge),G.side=Vi):P.renderBufferDirect(j,U,V,G,T,ge),T.onAfterRender(P,U,j,V,G,ge)}function qa(T,U,j){U.isScene!==!0&&(U=Wt);const V=H.get(T),G=b.state.lights,ge=b.state.shadowsArray,ye=G.state.version,me=ue.getParameters(T,G.state,ge,U,j,b.state.lightProbeGridArray),Te=ue.getProgramCacheKey(me);let be=V.programs;V.environment=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?U.environment:null,V.fog=U.fog;const ke=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap;V.envMap=se.get(T.envMap||V.environment,ke),V.envMapRotation=V.environment!==null&&T.envMap===null?U.environmentRotation:T.envMapRotation,be===void 0&&(T.addEventListener("dispose",ui),be=new Map,V.programs=be);let Be=be.get(Te);if(Be!==void 0){if(V.currentProgram===Be&&V.lightsStateVersion===ye)return Jm(T,me),Be}else me.uniforms=ue.getUniforms(T),F!==null&&T.isNodeMaterial&&F.build(T,j,me),T.onBeforeCompile(me,P),Be=ue.acquireProgram(me,Te),be.set(Te,Be),V.uniforms=me.uniforms;const Ce=V.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Ce.clippingPlanes=Re.uniform),Jm(T,me),V.needsLights=pM(T),V.lightsStateVersion=ye,V.needsLights&&(Ce.ambientLightColor.value=G.state.ambient,Ce.lightProbe.value=G.state.probe,Ce.directionalLights.value=G.state.directional,Ce.directionalLightShadows.value=G.state.directionalShadow,Ce.spotLights.value=G.state.spot,Ce.spotLightShadows.value=G.state.spotShadow,Ce.rectAreaLights.value=G.state.rectArea,Ce.ltc_1.value=G.state.rectAreaLTC1,Ce.ltc_2.value=G.state.rectAreaLTC2,Ce.pointLights.value=G.state.point,Ce.pointLightShadows.value=G.state.pointShadow,Ce.hemisphereLights.value=G.state.hemi,Ce.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Ce.spotLightMatrix.value=G.state.spotLightMatrix,Ce.spotLightMap.value=G.state.spotLightMap,Ce.pointShadowMatrix.value=G.state.pointShadowMatrix),V.lightProbeGrid=b.state.lightProbeGridArray.length>0,V.currentProgram=Be,V.uniformsList=null,Be}function Qm(T){if(T.uniformsList===null){const U=T.currentProgram.getUniforms();T.uniformsList=rc.seqWithValue(U.seq,T.uniforms)}return T.uniformsList}function Jm(T,U){const j=H.get(T);j.outputColorSpace=U.outputColorSpace,j.batching=U.batching,j.batchingColor=U.batchingColor,j.instancing=U.instancing,j.instancingColor=U.instancingColor,j.instancingMorph=U.instancingMorph,j.skinning=U.skinning,j.morphTargets=U.morphTargets,j.morphNormals=U.morphNormals,j.morphColors=U.morphColors,j.morphTargetsCount=U.morphTargetsCount,j.numClippingPlanes=U.numClippingPlanes,j.numIntersection=U.numClipIntersection,j.vertexAlphas=U.vertexAlphas,j.vertexTangents=U.vertexTangents,j.toneMapping=U.toneMapping}function fM(T,U){if(T.length===0)return null;if(T.length===1)return T[0].texture!==null?T[0]:null;_.setFromMatrixPosition(U.matrixWorld);for(let j=0,V=T.length;j<V;j++){const G=T[j];if(G.texture!==null&&G.boundingBox.containsPoint(_))return G}return null}function dM(T,U,j,V,G){U.isScene!==!0&&(U=Wt),Y.resetTextureUnits();const ge=U.fog,ye=V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial?U.environment:null,me=L===null?P.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:We.workingColorSpace,Te=V.isMeshStandardMaterial||V.isMeshLambertMaterial&&!V.envMap||V.isMeshPhongMaterial&&!V.envMap,be=se.get(V.envMap||ye,Te),ke=V.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,Be=!!j.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Ce=!!j.morphAttributes.position,it=!!j.morphAttributes.normal,wt=!!j.morphAttributes.color;let _t=Ti;V.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(_t=P.toneMapping);const st=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,Zt=st!==void 0?st.length:0,ve=H.get(V),Tn=b.state.lights;if(Ze===!0&&(Xe===!0||T!==Z)){const ut=T===Z&&V.id===W;Re.setState(V,T,ut)}let Ye=!1;V.version===ve.__version?(ve.needsLights&&ve.lightsStateVersion!==Tn.state.version||ve.outputColorSpace!==me||G.isBatchedMesh&&ve.batching===!1||!G.isBatchedMesh&&ve.batching===!0||G.isBatchedMesh&&ve.batchingColor===!0&&G.colorTexture===null||G.isBatchedMesh&&ve.batchingColor===!1&&G.colorTexture!==null||G.isInstancedMesh&&ve.instancing===!1||!G.isInstancedMesh&&ve.instancing===!0||G.isSkinnedMesh&&ve.skinning===!1||!G.isSkinnedMesh&&ve.skinning===!0||G.isInstancedMesh&&ve.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&ve.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&ve.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&ve.instancingMorph===!1&&G.morphTexture!==null||ve.envMap!==be||V.fog===!0&&ve.fog!==ge||ve.numClippingPlanes!==void 0&&(ve.numClippingPlanes!==Re.numPlanes||ve.numIntersection!==Re.numIntersection)||ve.vertexAlphas!==ke||ve.vertexTangents!==Be||ve.morphTargets!==Ce||ve.morphNormals!==it||ve.morphColors!==wt||ve.toneMapping!==_t||ve.morphTargetsCount!==Zt||!!ve.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&(Ye=!0):(Ye=!0,ve.__version=V.version);let In=ve.currentProgram;Ye===!0&&(In=qa(V,U,G),F&&V.isNodeMaterial&&F.onUpdateProgram(V,In,ve));let fi=!1,er=!1,vs=!1;const ot=In.getUniforms(),At=ve.uniforms;if(M.useProgram(In.program)&&(fi=!0,er=!0,vs=!0),V.id!==W&&(W=V.id,er=!0),ve.needsLights){const ut=fM(b.state.lightProbeGridArray,G);ve.lightProbeGrid!==ut&&(ve.lightProbeGrid=ut,er=!0)}if(fi||Z!==T){M.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),ot.setValue(N,"projectionMatrix",T.projectionMatrix),ot.setValue(N,"viewMatrix",T.matrixWorldInverse);const nr=ot.map.cameraPosition;nr!==void 0&&nr.setValue(N,Nt.setFromMatrixPosition(T.matrixWorld)),R.logarithmicDepthBuffer&&ot.setValue(N,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&ot.setValue(N,"isOrthographic",T.isOrthographicCamera===!0),Z!==T&&(Z=T,er=!0,vs=!0)}if(ve.needsLights&&(Tn.state.directionalShadowMap.length>0&&ot.setValue(N,"directionalShadowMap",Tn.state.directionalShadowMap,Y),Tn.state.spotShadowMap.length>0&&ot.setValue(N,"spotShadowMap",Tn.state.spotShadowMap,Y),Tn.state.pointShadowMap.length>0&&ot.setValue(N,"pointShadowMap",Tn.state.pointShadowMap,Y)),G.isSkinnedMesh){ot.setOptional(N,G,"bindMatrix"),ot.setOptional(N,G,"bindMatrixInverse");const ut=G.skeleton;ut&&(ut.boneTexture===null&&ut.computeBoneTexture(),ot.setValue(N,"boneTexture",ut.boneTexture,Y))}G.isBatchedMesh&&(ot.setOptional(N,G,"batchingTexture"),ot.setValue(N,"batchingTexture",G._matricesTexture,Y),ot.setOptional(N,G,"batchingIdTexture"),ot.setValue(N,"batchingIdTexture",G._indirectTexture,Y),ot.setOptional(N,G,"batchingColorTexture"),G._colorsTexture!==null&&ot.setValue(N,"batchingColorTexture",G._colorsTexture,Y));const tr=j.morphAttributes;if((tr.position!==void 0||tr.normal!==void 0||tr.color!==void 0)&&I.update(G,j,In),(er||ve.receiveShadow!==G.receiveShadow)&&(ve.receiveShadow=G.receiveShadow,ot.setValue(N,"receiveShadow",G.receiveShadow)),(V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial)&&V.envMap===null&&U.environment!==null&&(At.envMapIntensity.value=U.environmentIntensity),At.dfgLUT!==void 0&&(At.dfgLUT.value=E3()),er){if(ot.setValue(N,"toneMappingExposure",P.toneMappingExposure),ve.needsLights&&hM(At,vs),ge&&V.fog===!0&&Ae.refreshFogUniforms(At,ge),Ae.refreshMaterialUniforms(At,V,re,ae,b.state.transmissionRenderTarget[T.id]),ve.needsLights&&ve.lightProbeGrid){const ut=ve.lightProbeGrid;At.probesSH.value=ut.texture,At.probesMin.value.copy(ut.boundingBox.min),At.probesMax.value.copy(ut.boundingBox.max),At.probesResolution.value.copy(ut.resolution)}rc.upload(N,Qm(ve),At,Y)}if(V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(rc.upload(N,Qm(ve),At,Y),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&ot.setValue(N,"center",G.center),ot.setValue(N,"modelViewMatrix",G.modelViewMatrix),ot.setValue(N,"normalMatrix",G.normalMatrix),ot.setValue(N,"modelMatrix",G.matrixWorld),V.uniformsGroups!==void 0){const ut=V.uniformsGroups;for(let nr=0,ys=ut.length;nr<ys;nr++){const e0=ut[nr];te.update(e0,In),te.bind(e0,In)}}return In}function hM(T,U){T.ambientLightColor.needsUpdate=U,T.lightProbe.needsUpdate=U,T.directionalLights.needsUpdate=U,T.directionalLightShadows.needsUpdate=U,T.pointLights.needsUpdate=U,T.pointLightShadows.needsUpdate=U,T.spotLights.needsUpdate=U,T.spotLightShadows.needsUpdate=U,T.rectAreaLights.needsUpdate=U,T.hemisphereLights.needsUpdate=U}function pM(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return q},this.getActiveMipmapLevel=function(){return z},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(T,U,j){const V=H.get(T);V.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),H.get(T.texture).__webglTexture=U,H.get(T.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:j,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,U){const j=H.get(T);j.__webglFramebuffer=U,j.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(T,U=0,j=0){L=T,q=U,z=j;let V=null,G=!1,ge=!1;if(T){const me=H.get(T);if(me.__useDefaultFramebuffer!==void 0){M.bindFramebuffer(N.FRAMEBUFFER,me.__webglFramebuffer),ne.copy(T.viewport),oe.copy(T.scissor),ze=T.scissorTest,M.viewport(ne),M.scissor(oe),M.setScissorTest(ze),W=-1;return}else if(me.__webglFramebuffer===void 0)Y.setupRenderTarget(T);else if(me.__hasExternalTextures)Y.rebindTextures(T,H.get(T.texture).__webglTexture,H.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const ke=T.depthTexture;if(me.__boundDepthTexture!==ke){if(ke!==null&&H.has(ke)&&(T.width!==ke.image.width||T.height!==ke.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Y.setupDepthRenderbuffer(T)}}const Te=T.texture;(Te.isData3DTexture||Te.isDataArrayTexture||Te.isCompressedArrayTexture)&&(ge=!0);const be=H.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(be[U])?V=be[U][j]:V=be[U],G=!0):T.samples>0&&Y.useMultisampledRTT(T)===!1?V=H.get(T).__webglMultisampledFramebuffer:Array.isArray(be)?V=be[j]:V=be,ne.copy(T.viewport),oe.copy(T.scissor),ze=T.scissorTest}else ne.copy(Pe).multiplyScalar(re).floor(),oe.copy(Tt).multiplyScalar(re).floor(),ze=Ge;if(j!==0&&(V=X),M.bindFramebuffer(N.FRAMEBUFFER,V)&&M.drawBuffers(T,V),M.viewport(ne),M.scissor(oe),M.setScissorTest(ze),G){const me=H.get(T.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+U,me.__webglTexture,j)}else if(ge){const me=U;for(let Te=0;Te<T.textures.length;Te++){const be=H.get(T.textures[Te]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+Te,be.__webglTexture,j,me)}}else if(T!==null&&j!==0){const me=H.get(T.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,me.__webglTexture,j)}W=-1},this.readRenderTargetPixels=function(T,U,j,V,G,ge,ye,me=0){if(!(T&&T.isWebGLRenderTarget)){$e("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Te=H.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&ye!==void 0&&(Te=Te[ye]),Te){M.bindFramebuffer(N.FRAMEBUFFER,Te);try{const be=T.textures[me],ke=be.format,Be=be.type;if(T.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+me),!R.textureFormatReadable(ke)){$e("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!R.textureTypeReadable(Be)){$e("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=T.width-V&&j>=0&&j<=T.height-G&&N.readPixels(U,j,V,G,de.convert(ke),de.convert(Be),ge)}finally{const be=L!==null?H.get(L).__webglFramebuffer:null;M.bindFramebuffer(N.FRAMEBUFFER,be)}}},this.readRenderTargetPixelsAsync=async function(T,U,j,V,G,ge,ye,me=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Te=H.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&ye!==void 0&&(Te=Te[ye]),Te)if(U>=0&&U<=T.width-V&&j>=0&&j<=T.height-G){M.bindFramebuffer(N.FRAMEBUFFER,Te);const be=T.textures[me],ke=be.format,Be=be.type;if(T.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+me),!R.textureFormatReadable(ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!R.textureTypeReadable(Be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ce=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,Ce),N.bufferData(N.PIXEL_PACK_BUFFER,ge.byteLength,N.STREAM_READ),N.readPixels(U,j,V,G,de.convert(ke),de.convert(Be),0);const it=L!==null?H.get(L).__webglFramebuffer:null;M.bindFramebuffer(N.FRAMEBUFFER,it);const wt=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await jw(N,wt,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,Ce),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,ge),N.deleteBuffer(Ce),N.deleteSync(wt),ge}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,U=null,j=0){const V=Math.pow(2,-j),G=Math.floor(T.image.width*V),ge=Math.floor(T.image.height*V),ye=U!==null?U.x:0,me=U!==null?U.y:0;Y.setTexture2D(T,0),N.copyTexSubImage2D(N.TEXTURE_2D,j,0,0,ye,me,G,ge),M.unbindTexture()},this.copyTextureToTexture=function(T,U,j=null,V=null,G=0,ge=0){let ye,me,Te,be,ke,Be,Ce,it,wt;const _t=T.isCompressedTexture?T.mipmaps[ge]:T.image;if(j!==null)ye=j.max.x-j.min.x,me=j.max.y-j.min.y,Te=j.isBox3?j.max.z-j.min.z:1,be=j.min.x,ke=j.min.y,Be=j.isBox3?j.min.z:0;else{const At=Math.pow(2,-G);ye=Math.floor(_t.width*At),me=Math.floor(_t.height*At),T.isDataArrayTexture?Te=_t.depth:T.isData3DTexture?Te=Math.floor(_t.depth*At):Te=1,be=0,ke=0,Be=0}V!==null?(Ce=V.x,it=V.y,wt=V.z):(Ce=0,it=0,wt=0);const st=de.convert(U.format),Zt=de.convert(U.type);let ve;U.isData3DTexture?(Y.setTexture3D(U,0),ve=N.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(Y.setTexture2DArray(U,0),ve=N.TEXTURE_2D_ARRAY):(Y.setTexture2D(U,0),ve=N.TEXTURE_2D),M.activeTexture(N.TEXTURE0),M.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,U.flipY),M.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),M.pixelStorei(N.UNPACK_ALIGNMENT,U.unpackAlignment);const Tn=M.getParameter(N.UNPACK_ROW_LENGTH),Ye=M.getParameter(N.UNPACK_IMAGE_HEIGHT),In=M.getParameter(N.UNPACK_SKIP_PIXELS),fi=M.getParameter(N.UNPACK_SKIP_ROWS),er=M.getParameter(N.UNPACK_SKIP_IMAGES);M.pixelStorei(N.UNPACK_ROW_LENGTH,_t.width),M.pixelStorei(N.UNPACK_IMAGE_HEIGHT,_t.height),M.pixelStorei(N.UNPACK_SKIP_PIXELS,be),M.pixelStorei(N.UNPACK_SKIP_ROWS,ke),M.pixelStorei(N.UNPACK_SKIP_IMAGES,Be);const vs=T.isDataArrayTexture||T.isData3DTexture,ot=U.isDataArrayTexture||U.isData3DTexture;if(T.isDepthTexture){const At=H.get(T),tr=H.get(U),ut=H.get(At.__renderTarget),nr=H.get(tr.__renderTarget);M.bindFramebuffer(N.READ_FRAMEBUFFER,ut.__webglFramebuffer),M.bindFramebuffer(N.DRAW_FRAMEBUFFER,nr.__webglFramebuffer);for(let ys=0;ys<Te;ys++)vs&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,H.get(T).__webglTexture,G,Be+ys),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,H.get(U).__webglTexture,ge,wt+ys)),N.blitFramebuffer(be,ke,ye,me,Ce,it,ye,me,N.DEPTH_BUFFER_BIT,N.NEAREST);M.bindFramebuffer(N.READ_FRAMEBUFFER,null),M.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(G!==0||T.isRenderTargetTexture||H.has(T)){const At=H.get(T),tr=H.get(U);M.bindFramebuffer(N.READ_FRAMEBUFFER,ee),M.bindFramebuffer(N.DRAW_FRAMEBUFFER,O);for(let ut=0;ut<Te;ut++)vs?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,At.__webglTexture,G,Be+ut):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,At.__webglTexture,G),ot?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,tr.__webglTexture,ge,wt+ut):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,tr.__webglTexture,ge),G!==0?N.blitFramebuffer(be,ke,ye,me,Ce,it,ye,me,N.COLOR_BUFFER_BIT,N.NEAREST):ot?N.copyTexSubImage3D(ve,ge,Ce,it,wt+ut,be,ke,ye,me):N.copyTexSubImage2D(ve,ge,Ce,it,be,ke,ye,me);M.bindFramebuffer(N.READ_FRAMEBUFFER,null),M.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else ot?T.isDataTexture||T.isData3DTexture?N.texSubImage3D(ve,ge,Ce,it,wt,ye,me,Te,st,Zt,_t.data):U.isCompressedArrayTexture?N.compressedTexSubImage3D(ve,ge,Ce,it,wt,ye,me,Te,st,_t.data):N.texSubImage3D(ve,ge,Ce,it,wt,ye,me,Te,st,Zt,_t):T.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,ge,Ce,it,ye,me,st,Zt,_t.data):T.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,ge,Ce,it,_t.width,_t.height,st,_t.data):N.texSubImage2D(N.TEXTURE_2D,ge,Ce,it,ye,me,st,Zt,_t);M.pixelStorei(N.UNPACK_ROW_LENGTH,Tn),M.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Ye),M.pixelStorei(N.UNPACK_SKIP_PIXELS,In),M.pixelStorei(N.UNPACK_SKIP_ROWS,fi),M.pixelStorei(N.UNPACK_SKIP_IMAGES,er),ge===0&&U.generateMipmaps&&N.generateMipmap(ve),M.unbindTexture()},this.initRenderTarget=function(T){H.get(T).__webglFramebuffer===void 0&&Y.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?Y.setTextureCube(T,0):T.isData3DTexture?Y.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?Y.setTexture2DArray(T,0):Y.setTexture2D(T,0),M.unbindTexture()},this.resetState=function(){q=0,z=0,L=null,M.reset(),xe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Si}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=We._getDrawingBufferColorSpace(e),n.unpackColorSpace=We._getUnpackColorSpace()}}function w3(){Se.useRef(null);const t=Se.useRef(null);if(!t.current){const e=document.createElement("div");e.style.cssText="position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:0;pointer-events:none;overflow:hidden;background:radial-gradient(circle at bottom right,#18181b 0%,#000000 50%,#000000 100%)",t.current=e}return Se.useEffect(()=>{document.body.appendChild(t.current);const e=t.current;let n=window.innerWidth,i=window.innerHeight;const r=new a2;r.fog=new fm(657930,300,950);const s=new On(60,n/i,1,2e3);s.position.z=650;const o=new T3({alpha:!0,antialias:!0});o.setSize(n,i),o.setPixelRatio(Math.min(window.devicePixelRatio,2)),o.setClearColor(0,0),o.domElement.style.cssText="position:absolute;inset:0;",e.appendChild(o.domElement);const a=document.createElement("div");a.style.cssText="position:absolute;top:50%;left:60%;transform:translate(-50%,-50%);border-radius:50%;filter:blur(140px);opacity:0.05;background:white;width:800px;height:800px;",e.appendChild(a);const l=new Ko;r.add(l);const c=120,u=[],d=new hm(1,16,16);for(let w=0;w<c;w++){let b=Math.acos(-1+2*w/c),A=Math.sqrt(c*Math.PI)*b,y=Math.cos(A)*Math.sin(b),C=Math.sin(A)*Math.sin(b),P=Math.cos(b),D=new Ri(d,new dm({color:16777215,transparent:!0,opacity:.9}));D.position.set(y,C,P),D.userData={baseSize:Math.random()*1.5+1,pulseSpeed:Math.random()*.02+.015,pulseOffset:Math.random()*Math.PI*2},l.add(D),u.push(D)}const f=[],p=[];for(let w=0;w<c;w++)for(let b=w+1;b<c;b++){let A=u[w].position.distanceTo(u[b].position);const y=.45;if(A<y){f.push(u[w].position.x,u[w].position.y,u[w].position.z),f.push(u[b].position.x,u[b].position.y,u[b].position.z);let C=(1-A/y)*.8;p.push(C,C,C),p.push(C,C,C)}}const m=new Yn;m.setAttribute("position",new sn(f,3)),m.setAttribute("color",new sn(p,3));const E=new fS({vertexColors:!0,transparent:!0,blending:jd,depthWrite:!1,opacity:.3}),g=new v2(m,E);l.add(g);function h(){n=window.innerWidth,i=window.innerHeight,s.aspect=n/i,s.updateProjectionMatrix(),o.setSize(n,i);const w=n>768?380:200;l.scale.set(w,w,w);const b=n>768?n*.2:0,A=n>768?-i*.05:-i*.2;l.position.set(b,A,0)}window.addEventListener("resize",h),h();let x=0,S;function _(){S=requestAnimationFrame(_),x+=1,l.rotation.y=x*.0018,l.rotation.x=.2,l.rotation.z=x*6e-4,u.forEach(w=>{let b=w.userData,A=(Math.sin(x*b.pulseSpeed+b.pulseOffset)+1)/2,C=(b.baseSize+A*1.8)/l.scale.x;w.scale.set(C,C,C),w.material.opacity=.18+A*.32}),o.render(r,s)}return _(),()=>{window.removeEventListener("resize",h),cancelAnimationFrame(S),d.dispose(),u.forEach(w=>w.material.dispose()),m.dispose(),E.dispose(),o.dispose(),e.parentNode&&e.parentNode.removeChild(e)}},[]),null}function A3(){const t=Se.useMemo(()=>{const e=[],n=["#ffffff","#ffffff","#e0f2fe","#bae6fd","#fef08a","#fed7aa","#f5d0fe"];let i=42;const r=()=>(i=(i*9301+49297)%233280,i/233280);for(let s=0;s<140;s++){const o=(r()*98).toFixed(2),a=(r()*98).toFixed(2),l=(r()*2.2+.8).toFixed(1),c=n[Math.floor(r()*n.length)],u=(r()*4+2.5).toFixed(1),d=(r()*6).toFixed(1),f=r()>.91;e.push({id:s,top:`${o}%`,left:`${a}%`,size:`${l}px`,color:c,duration:`${u}s`,delay:`${d}s`,isMajor:f})}return e},[]);return v.jsxs(v.Fragment,{children:[v.jsx("style",{children:`
        /* =========================================================
           TRAJECTORY & ORBIT ANIMATIONS
           Multiple realistic cosmic pathways across the cosmos
           ========================================================= */

        /* Path 1: Top-Left to Bottom-Right (Trans-orbital corridor) */
        @keyframes travTL_BR {
          0%   { transform: translate(0, 0) scale(1); opacity: 0; }
          4%   { opacity: 0.90; }
          90%  { opacity: 0.85; }
          100% { transform: translate(78vw, 82vh) scale(0.28); opacity: 0; }
        }

        /* Path 2: Top-Right to Bottom-Left (Retrograde orbital pass) */
        @keyframes travTR_BL {
          0%   { transform: translate(0, 0) scale(0.95); opacity: 0; }
          5%   { opacity: 0.88; }
          90%  { opacity: 0.80; }
          100% { transform: translate(-76vw, 84vh) scale(0.25); opacity: 0; }
        }

        /* Path 3: Bottom-Left to Upper-Right (Deep space ascent) */
        @keyframes travBL_TR {
          0%   { transform: translate(0, 0) scale(0.32); opacity: 0; }
          6%   { opacity: 0.82; }
          88%  { opacity: 0.78; }
          100% { transform: translate(72vw, -75vh) scale(0.95); opacity: 0; }
        }

        /* Path 4: High-latitude Equatorial Drift (Left to Right) */
        @keyframes travL_R {
          0%   { transform: translate(0, 0) scale(0.85); opacity: 0; }
          4%   { opacity: 0.85; }
          92%  { opacity: 0.80; }
          100% { transform: translate(96vw, 15vh) scale(0.35); opacity: 0; }
        }

        /* Path 5: Mid-inclination Slingshot */
        @keyframes travSlingshot {
          0%   { transform: translate(0, 0) scale(0.4) rotate(0deg); opacity: 0; }
          5%   { opacity: 0.86; }
          50%  { transform: translate(38vw, 42vh) scale(0.8) rotate(14deg); opacity: 0.92; }
          92%  { opacity: 0.82; }
          100% { transform: translate(82vw, 24vh) scale(0.32) rotate(28deg); opacity: 0; }
        }

        /* Satellite Trajectories with realistic pitch & roll */
        @keyframes satFlightA {
          0%   { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 0; }
          4%   { opacity: 0.92; }
          90%  { opacity: 0.85; }
          100% { transform: translate(80vw, 76vh) scale(0.30) rotate(16deg); opacity: 0; }
        }

        @keyframes satFlightB {
          0%   { transform: translate(0, 0) scale(0.92) rotate(0deg); opacity: 0; }
          5%   { opacity: 0.90; }
          88%  { opacity: 0.80; }
          100% { transform: translate(-74vw, 78vh) scale(0.26) rotate(-18deg); opacity: 0; }
        }

        @keyframes satFlightC {
          0%   { transform: translate(0, 0) scale(0.35) rotate(-6deg); opacity: 0; }
          5%   { opacity: 0.85; }
          90%  { opacity: 0.80; }
          100% { transform: translate(68vw, -68vh) scale(0.88) rotate(12deg); opacity: 0; }
        }

        @keyframes satFlightD {
          0%   { transform: translate(0, 0) scale(0.85) rotate(5deg); opacity: 0; }
          4%   { opacity: 0.90; }
          92%  { opacity: 0.82; }
          100% { transform: translate(92vw, 28vh) scale(0.32) rotate(-14deg); opacity: 0; }
        }

        @keyframes satPolarPass {
          0%   { transform: translate(0, 0) scale(0.4) rotate(-35deg); opacity: 0; }
          5%   { opacity: 0.88; }
          88%  { opacity: 0.82; }
          100% { transform: translate(-22vw, 95vh) scale(0.75) rotate(-30deg); opacity: 0; }
        }

        /* Shooting Stars (Meteors) */
        @keyframes meteorStreak1 {
          0%   { transform: translate(0, 0) rotate(-35deg) scaleX(0); opacity: 0; }
          2%   { opacity: 1; transform: translate(12vw, 16vh) rotate(-35deg) scaleX(1); }
          6%   { opacity: 0; transform: translate(32vw, 42vh) rotate(-35deg) scaleX(1.4); }
          100% { opacity: 0; transform: translate(32vw, 42vh) rotate(-35deg) scaleX(0); }
        }

        @keyframes meteorStreak2 {
          0%   { transform: translate(0, 0) rotate(-42deg) scaleX(0); opacity: 0; }
          2%   { opacity: 0.95; transform: translate(14vw, 18vh) rotate(-42deg) scaleX(1); }
          5%   { opacity: 0; transform: translate(36vw, 48vh) rotate(-42deg) scaleX(1.6); }
          100% { opacity: 0; transform: translate(36vw, 48vh) rotate(-42deg) scaleX(0); }
        }

        @keyframes meteorStreak3 {
          0%   { transform: translate(0, 0) rotate(135deg) scaleX(0); opacity: 0; }
          2%   { opacity: 1; transform: translate(-15vw, 18vh) rotate(135deg) scaleX(1); }
          6%   { opacity: 0; transform: translate(-40vw, 48vh) rotate(135deg) scaleX(1.5); }
          100% { opacity: 0; transform: translate(-40vw, 48vh) rotate(135deg) scaleX(0); }
        }

        /* Celestial Ring rotations */
        @keyframes ringA { from { transform: rotateX(72deg) rotateZ(0deg); } to { transform: rotateX(72deg) rotateZ(360deg); } }
        @keyframes ringB { from { transform: rotateX(68deg) rotateZ(0deg); } to { transform: rotateX(68deg) rotateZ(-360deg); } }
        @keyframes saturnRingSpin { from { transform: rotateX(76deg) rotateZ(-22deg); } to { transform: rotateX(76deg) rotateZ(338deg); } }
        @keyframes uranusRingTilt { 0%, 100% { transform: rotateZ(88deg) rotateX(65deg); } 50% { transform: rotateZ(92deg) rotateX(60deg); } }

        /* Pulsing & Glow effects */
        @keyframes atmoGlow {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50%      { opacity: 0.60; transform: scale(1.08); }
        }

        @keyframes enginePlume {
          0%, 100% { opacity: 0.40; filter: blur(3px); transform: translateX(-50%) scaleY(0.9); }
          50%      { opacity: 0.95; filter: blur(5px); transform: translateX(-50%) scaleY(1.3); }
        }

        @keyframes beaconBlink {
          0%, 100% { opacity: 0.2; }
          50%      { opacity: 1; filter: drop-shadow(0 0 6px #22d3ee); }
        }

        @keyframes solarGlint {
          0%, 100% { opacity: 0.08; }
          50%      { opacity: 0.85; filter: brightness(1.6); }
        }

        @keyframes starTwinkleDynamic {
          0%, 100% { opacity: 0.25; transform: scale(0.85); }
          50%      { opacity: 0.95; transform: scale(1.25); }
        }

        @keyframes constellationGlow {
          0%, 100% { opacity: 0.30; }
          50%      { opacity: 0.65; }
        }

        @keyframes pulsarSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        @keyframes radarScanWave {
          0%   { transform: scale(0.2) rotate(0deg); opacity: 0.8; }
          100% { transform: scale(2.2) rotate(20deg); opacity: 0; }
        }

        /* Space Debris Spin Keyframes */
        @keyframes deb1 { 0%{transform:translate(0,0) rotate(0deg) scale(1);opacity:0} 4%{opacity:.5} 92%{opacity:.38} 100%{transform:translate(82vw,78vh) rotate(720deg) scale(.18);opacity:0} }
        @keyframes deb2 { 0%{transform:translate(0,0) rotate(0deg) scale(1);opacity:0} 5%{opacity:.44} 90%{opacity:.32} 100%{transform:translate(-72vw,84vh) rotate(-540deg) scale(.14);opacity:0} }
        @keyframes deb3 { 0%{transform:translate(0,0) rotate(0deg) scale(1);opacity:0} 6%{opacity:.40} 88%{opacity:.28} 100%{transform:translate(76vw,-72vh) rotate(480deg) scale(.20);opacity:0} }
        @keyframes deb4 { 0%{transform:translate(0,0) rotate(0deg) scale(1);opacity:0} 4%{opacity:.46} 90%{opacity:.36} 100%{transform:translate(88vw,48vh) rotate(-600deg) scale(.16);opacity:0} }
      `}),v.jsx("svg",{width:"0",height:"0",style:{position:"absolute"},children:v.jsxs("defs",{children:[v.jsx("filter",{id:"shadow3d",x:"-30%",y:"-30%",width:"160%",height:"160%",children:v.jsx("feDropShadow",{dx:"-6",dy:"10",stdDeviation:"14",floodColor:"#000000",floodOpacity:"0.90"})}),v.jsxs("radialGradient",{id:"earthG",cx:"36%",cy:"30%",r:"65%",children:[v.jsx("stop",{offset:"0%",stopColor:"#7dd3fc"}),v.jsx("stop",{offset:"16%",stopColor:"#38bdf8"}),v.jsx("stop",{offset:"42%",stopColor:"#0284c7"}),v.jsx("stop",{offset:"70%",stopColor:"#1e3a8a"}),v.jsx("stop",{offset:"90%",stopColor:"#0f172a"}),v.jsx("stop",{offset:"100%",stopColor:"#020617"})]}),v.jsxs("radialGradient",{id:"earthSpec",cx:"30%",cy:"24%",r:"32%",children:[v.jsx("stop",{offset:"0%",stopColor:"rgba(255,255,255,0.65)"}),v.jsx("stop",{offset:"55%",stopColor:"rgba(186,230,253,0.12)"}),v.jsx("stop",{offset:"100%",stopColor:"transparent"})]}),v.jsxs("linearGradient",{id:"earthTerm",x1:"90%",y1:"0%",x2:"10%",y2:"100%",children:[v.jsx("stop",{offset:"0%",stopColor:"transparent"}),v.jsx("stop",{offset:"50%",stopColor:"transparent"}),v.jsx("stop",{offset:"78%",stopColor:"rgba(0,0,15,0.48)"}),v.jsx("stop",{offset:"100%",stopColor:"rgba(0,0,5,0.85)"})]}),v.jsxs("radialGradient",{id:"saturnG",cx:"38%",cy:"32%",r:"62%",children:[v.jsx("stop",{offset:"0%",stopColor:"#fef08a"}),v.jsx("stop",{offset:"18%",stopColor:"#fde047"}),v.jsx("stop",{offset:"40%",stopColor:"#d97706"}),v.jsx("stop",{offset:"65%",stopColor:"#92400e"}),v.jsx("stop",{offset:"85%",stopColor:"#451a03"}),v.jsx("stop",{offset:"100%",stopColor:"#1c0a02"})]}),v.jsxs("radialGradient",{id:"saturnSpec",cx:"30%",cy:"25%",r:"30%",children:[v.jsx("stop",{offset:"0%",stopColor:"rgba(254,249,195,0.55)"}),v.jsx("stop",{offset:"60%",stopColor:"rgba(253,224,71,0.08)"}),v.jsx("stop",{offset:"100%",stopColor:"transparent"})]}),v.jsxs("linearGradient",{id:"saturnTerm",x1:"90%",y1:"0%",x2:"10%",y2:"100%",children:[v.jsx("stop",{offset:"0%",stopColor:"transparent"}),v.jsx("stop",{offset:"52%",stopColor:"transparent"}),v.jsx("stop",{offset:"80%",stopColor:"rgba(0,0,0,0.45)"}),v.jsx("stop",{offset:"100%",stopColor:"rgba(0,0,0,0.82)"})]}),v.jsxs("radialGradient",{id:"venusG",cx:"35%",cy:"28%",r:"65%",children:[v.jsx("stop",{offset:"0%",stopColor:"#fffbeb"}),v.jsx("stop",{offset:"22%",stopColor:"#fef3c7"}),v.jsx("stop",{offset:"48%",stopColor:"#fcd34d"}),v.jsx("stop",{offset:"72%",stopColor:"#d97706"}),v.jsx("stop",{offset:"90%",stopColor:"#78350f"}),v.jsx("stop",{offset:"100%",stopColor:"#290e02"})]}),v.jsxs("radialGradient",{id:"venusSpec",cx:"28%",cy:"22%",r:"30%",children:[v.jsx("stop",{offset:"0%",stopColor:"rgba(255,255,230,0.65)"}),v.jsx("stop",{offset:"60%",stopColor:"rgba(254,243,199,0.12)"}),v.jsx("stop",{offset:"100%",stopColor:"transparent"})]}),v.jsxs("radialGradient",{id:"moonG",cx:"38%",cy:"30%",r:"62%",children:[v.jsx("stop",{offset:"0%",stopColor:"#f8fafc"}),v.jsx("stop",{offset:"20%",stopColor:"#e2e8f0"}),v.jsx("stop",{offset:"45%",stopColor:"#94a3b8"}),v.jsx("stop",{offset:"70%",stopColor:"#475569"}),v.jsx("stop",{offset:"88%",stopColor:"#1e293b"}),v.jsx("stop",{offset:"100%",stopColor:"#090d16"})]}),v.jsxs("radialGradient",{id:"uranusG",cx:"36%",cy:"30%",r:"64%",children:[v.jsx("stop",{offset:"0%",stopColor:"#cffafe"}),v.jsx("stop",{offset:"22%",stopColor:"#67e8f9"}),v.jsx("stop",{offset:"50%",stopColor:"#06b6d4"}),v.jsx("stop",{offset:"75%",stopColor:"#0e7490"}),v.jsx("stop",{offset:"90%",stopColor:"#164e63"}),v.jsx("stop",{offset:"100%",stopColor:"#041f29"})]}),v.jsxs("radialGradient",{id:"marsG",cx:"34%",cy:"28%",r:"66%",children:[v.jsx("stop",{offset:"0%",stopColor:"#fed7aa"}),v.jsx("stop",{offset:"20%",stopColor:"#fb923c"}),v.jsx("stop",{offset:"45%",stopColor:"#c2410c"}),v.jsx("stop",{offset:"70%",stopColor:"#7c2d12"}),v.jsx("stop",{offset:"90%",stopColor:"#431407"}),v.jsx("stop",{offset:"100%",stopColor:"#160502"})]}),v.jsxs("radialGradient",{id:"marsSpec",cx:"28%",cy:"22%",r:"32%",children:[v.jsx("stop",{offset:"0%",stopColor:"rgba(255,230,200,0.52)"}),v.jsx("stop",{offset:"60%",stopColor:"rgba(251,146,60,0.08)"}),v.jsx("stop",{offset:"100%",stopColor:"transparent"})]}),v.jsxs("linearGradient",{id:"marsTerm",x1:"90%",y1:"0%",x2:"10%",y2:"100%",children:[v.jsx("stop",{offset:"0%",stopColor:"transparent"}),v.jsx("stop",{offset:"52%",stopColor:"transparent"}),v.jsx("stop",{offset:"80%",stopColor:"rgba(0,0,0,0.42)"}),v.jsx("stop",{offset:"100%",stopColor:"rgba(0,0,0,0.76)"})]}),v.jsxs("radialGradient",{id:"jupG",cx:"38%",cy:"33%",r:"60%",children:[v.jsx("stop",{offset:"0%",stopColor:"#fef3c7"}),v.jsx("stop",{offset:"18%",stopColor:"#fde68a"}),v.jsx("stop",{offset:"42%",stopColor:"#d97706"}),v.jsx("stop",{offset:"68%",stopColor:"#92400e"}),v.jsx("stop",{offset:"88%",stopColor:"#451a03"}),v.jsx("stop",{offset:"100%",stopColor:"#170601"})]}),v.jsxs("radialGradient",{id:"jupSpec",cx:"32%",cy:"26%",r:"30%",children:[v.jsx("stop",{offset:"0%",stopColor:"rgba(255,248,220,0.52)"}),v.jsx("stop",{offset:"60%",stopColor:"rgba(245,158,11,0.08)"}),v.jsx("stop",{offset:"100%",stopColor:"transparent"})]}),v.jsxs("linearGradient",{id:"jupTerm",x1:"90%",y1:"0%",x2:"10%",y2:"100%",children:[v.jsx("stop",{offset:"0%",stopColor:"transparent"}),v.jsx("stop",{offset:"50%",stopColor:"transparent"}),v.jsx("stop",{offset:"78%",stopColor:"rgba(0,0,0,0.44)"}),v.jsx("stop",{offset:"100%",stopColor:"rgba(0,0,0,0.78)"})]}),v.jsxs("radialGradient",{id:"nepG",cx:"36%",cy:"30%",r:"64%",children:[v.jsx("stop",{offset:"0%",stopColor:"#e0f2fe"}),v.jsx("stop",{offset:"18%",stopColor:"#38bdf8"}),v.jsx("stop",{offset:"42%",stopColor:"#1d4ed8"}),v.jsx("stop",{offset:"65%",stopColor:"#1e3a8a"}),v.jsx("stop",{offset:"85%",stopColor:"#0f172a"}),v.jsx("stop",{offset:"100%",stopColor:"#020617"})]}),v.jsxs("radialGradient",{id:"nepSpec",cx:"30%",cy:"24%",r:"28%",children:[v.jsx("stop",{offset:"0%",stopColor:"rgba(224,242,254,0.58)"}),v.jsx("stop",{offset:"55%",stopColor:"rgba(56,189,248,0.10)"}),v.jsx("stop",{offset:"100%",stopColor:"transparent"})]}),v.jsxs("linearGradient",{id:"goldMliG",x1:"0%",y1:"0%",x2:"100%",y2:"100%",children:[v.jsx("stop",{offset:"0%",stopColor:"#fef08a"}),v.jsx("stop",{offset:"35%",stopColor:"#f59e0b"}),v.jsx("stop",{offset:"70%",stopColor:"#b45309"}),v.jsx("stop",{offset:"100%",stopColor:"#78350f"})]}),v.jsxs("linearGradient",{id:"solarPanelG",x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[v.jsx("stop",{offset:"0%",stopColor:"#0c4a6e"}),v.jsx("stop",{offset:"50%",stopColor:"#0284c7"}),v.jsx("stop",{offset:"100%",stopColor:"#0369a1"})]}),v.jsxs("linearGradient",{id:"meteorTailG",x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[v.jsx("stop",{offset:"0%",stopColor:"rgba(255,255,255,0.95)"}),v.jsx("stop",{offset:"25%",stopColor:"rgba(147,197,253,0.75)"}),v.jsx("stop",{offset:"70%",stopColor:"rgba(59,130,246,0.25)"}),v.jsx("stop",{offset:"100%",stopColor:"transparent"})]})]})}),v.jsxs("div",{style:{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden"},children:[v.jsx("div",{style:{position:"absolute",top:"-15%",left:"15%",width:"55vw",height:"55vh",background:"radial-gradient(ellipse at center, rgba(147, 51, 234, 0.045) 0%, rgba(79, 70, 229, 0.02) 45%, transparent 70%)",filter:"blur(60px)",transform:"rotate(-15deg)"}}),v.jsx("div",{style:{position:"absolute",bottom:"-10%",right:"10%",width:"60vw",height:"60vh",background:"radial-gradient(ellipse at center, rgba(14, 165, 233, 0.04) 0%, rgba(16, 185, 129, 0.015) 50%, transparent 70%)",filter:"blur(70px)",transform:"rotate(25deg)"}}),v.jsx("div",{style:{position:"absolute",top:"35%",left:"-5%",width:"45vw",height:"45vh",background:"radial-gradient(ellipse at center, rgba(245, 158, 11, 0.03) 0%, rgba(239, 68, 68, 0.012) 50%, transparent 70%)",filter:"blur(65px)"}}),v.jsx("div",{style:{position:"absolute",inset:0},children:t.map(e=>v.jsx("div",{style:{position:"absolute",top:e.top,left:e.left,width:e.size,height:e.size,borderRadius:"50%",backgroundColor:e.color,boxShadow:e.isMajor?`0 0 6px ${e.color}, 0 0 12px ${e.color}`:`0 0 3px ${e.color}`,animation:`starTwinkleDynamic ${e.duration} ease-in-out infinite alternate ${e.delay}`},children:e.isMajor&&v.jsx("div",{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:"12px",height:"1px",background:`linear-gradient(90deg, transparent, ${e.color}, transparent)`}})},e.id))}),v.jsxs("svg",{width:"160",height:"180",viewBox:"0 0 160 180",style:{position:"absolute",top:"8%",right:"22%",opacity:.55,animation:"constellationGlow 7s ease-in-out infinite"},children:[v.jsx("circle",{cx:"35",cy:"30",r:"3.2",fill:"#f87171",filter:"drop-shadow(0 0 4px #ef4444)"}),v.jsx("circle",{cx:"120",cy:"40",r:"2.4",fill:"#93c5fd"}),v.jsx("circle",{cx:"68",cy:"88",r:"2.2",fill:"#ffffff"}),v.jsx("circle",{cx:"78",cy:"90",r:"2.2",fill:"#ffffff"}),v.jsx("circle",{cx:"88",cy:"92",r:"2.2",fill:"#ffffff"}),v.jsx("circle",{cx:"48",cy:"150",r:"2.4",fill:"#bfdbfe"}),v.jsx("circle",{cx:"126",cy:"144",r:"3.2",fill:"#60a5fa",filter:"drop-shadow(0 0 5px #3b82f6)"}),v.jsx("line",{x1:"35",y1:"30",x2:"68",y2:"88",stroke:"rgba(147,197,253,0.30)",strokeWidth:"0.8",strokeDasharray:"2,3"}),v.jsx("line",{x1:"120",y1:"40",x2:"88",y2:"92",stroke:"rgba(147,197,253,0.30)",strokeWidth:"0.8",strokeDasharray:"2,3"}),v.jsx("line",{x1:"68",y1:"88",x2:"78",y2:"90",stroke:"rgba(255,255,255,0.45)",strokeWidth:"1"}),v.jsx("line",{x1:"78",y1:"90",x2:"88",y2:"92",stroke:"rgba(255,255,255,0.45)",strokeWidth:"1"}),v.jsx("line",{x1:"68",y1:"88",x2:"48",y2:"150",stroke:"rgba(147,197,253,0.30)",strokeWidth:"0.8",strokeDasharray:"2,3"}),v.jsx("line",{x1:"88",y1:"92",x2:"126",y2:"144",stroke:"rgba(147,197,253,0.30)",strokeWidth:"0.8",strokeDasharray:"2,3"}),v.jsx("line",{x1:"48",y1:"150",x2:"126",y2:"144",stroke:"rgba(147,197,253,0.22)",strokeWidth:"0.6",strokeDasharray:"1,4"})]}),v.jsxs("svg",{width:"190",height:"120",viewBox:"0 0 190 120",style:{position:"absolute",top:"12%",left:"12%",opacity:.5,animation:"constellationGlow 8s ease-in-out infinite 2s"},children:[v.jsx("circle",{cx:"20",cy:"20",r:"2.2",fill:"#ffffff"}),v.jsx("circle",{cx:"55",cy:"35",r:"2.2",fill:"#bae6fd"}),v.jsx("circle",{cx:"85",cy:"48",r:"2.2",fill:"#ffffff"}),v.jsx("circle",{cx:"118",cy:"52",r:"2.4",fill:"#fef08a"}),v.jsx("circle",{cx:"132",cy:"92",r:"2.4",fill:"#ffffff"}),v.jsx("circle",{cx:"175",cy:"85",r:"2.4",fill:"#bae6fd"}),v.jsx("circle",{cx:"165",cy:"48",r:"2.4",fill:"#ffffff"}),v.jsx("polyline",{points:"20,20 55,35 85,48 118,52 132,92 175,85 165,48 118,52",fill:"none",stroke:"rgba(186,230,253,0.32)",strokeWidth:"0.8",strokeDasharray:"2,3"})]}),v.jsxs("svg",{width:"120",height:"70",viewBox:"0 0 120 70",style:{position:"absolute",bottom:"16%",left:"8%",opacity:.45,animation:"constellationGlow 9s ease-in-out infinite 4s"},children:[v.jsx("circle",{cx:"12",cy:"18",r:"2.2",fill:"#fef08a"}),v.jsx("circle",{cx:"38",cy:"48",r:"2.2",fill:"#ffffff"}),v.jsx("circle",{cx:"65",cy:"26",r:"2.4",fill:"#bae6fd"}),v.jsx("circle",{cx:"92",cy:"54",r:"2.2",fill:"#ffffff"}),v.jsx("circle",{cx:"112",cy:"16",r:"2.2",fill:"#93c5fd"}),v.jsx("polyline",{points:"12,18 38,48 65,26 92,54 112,16",fill:"none",stroke:"rgba(254,240,138,0.28)",strokeWidth:"0.8",strokeDasharray:"2,3"})]}),v.jsx("div",{style:{position:"absolute",top:"6%",left:"28%",width:"140px",height:"2px",background:"url(#meteorTailG)",borderRadius:"2px",animation:"meteorStreak1 14s ease-out infinite 1s",transformOrigin:"left center"},children:v.jsx("div",{style:{position:"absolute",left:0,top:"-1.5px",width:"5px",height:"5px",borderRadius:"50%",background:"#ffffff",boxShadow:"0 0 8px #ffffff, 0 0 16px #93c5fd"}})}),v.jsx("div",{style:{position:"absolute",top:"18%",left:"55%",width:"180px",height:"2.5px",background:"linear-gradient(90deg, #ffffff 0%, rgba(147,197,253,0.8) 30%, rgba(96,165,250,0.15) 75%, transparent 100%)",borderRadius:"2px",animation:"meteorStreak2 19s ease-out infinite 8s",transformOrigin:"left center"},children:v.jsx("div",{style:{position:"absolute",left:0,top:"-2px",width:"6px",height:"6px",borderRadius:"50%",background:"#ffffff",boxShadow:"0 0 10px #ffffff, 0 0 20px #38bdf8"}})}),v.jsx("div",{style:{position:"absolute",top:"25%",right:"15%",width:"160px",height:"2px",background:"linear-gradient(90deg, #ffffff 0%, rgba(254,240,138,0.7) 30%, rgba(245,158,11,0.15) 75%, transparent 100%)",borderRadius:"2px",animation:"meteorStreak3 23s ease-out infinite 14s",transformOrigin:"left center"},children:v.jsx("div",{style:{position:"absolute",left:0,top:"-1.5px",width:"5px",height:"5px",borderRadius:"50%",background:"#ffffff",boxShadow:"0 0 8px #ffffff, 0 0 14px #f59e0b"}})}),v.jsxs("div",{style:{position:"absolute",top:"40%",left:"4%",width:"28px",height:"28px",opacity:.65},children:[v.jsxs("div",{style:{position:"absolute",inset:0,animation:"pulsarSpin 12s linear infinite"},children:[v.jsx("div",{style:{position:"absolute",top:"50%",left:"-35px",width:"98px",height:"1px",background:"linear-gradient(90deg, transparent, rgba(56,189,248,0.7), transparent)"}}),v.jsx("div",{style:{position:"absolute",left:"50%",top:"-35px",width:"1px",height:"98px",background:"linear-gradient(180deg, transparent, rgba(56,189,248,0.7), transparent)"}})]}),v.jsx("div",{style:{position:"absolute",inset:"11px",borderRadius:"50%",background:"#ffffff",boxShadow:"0 0 8px #38bdf8, 0 0 16px #0284c7",animation:"beaconBlink 3s ease-in-out infinite"}})]}),v.jsxs("div",{style:{position:"absolute",top:"3%",left:"1%",animation:"travTL_BR 52s linear infinite 2s",filter:"url(#shadow3d)"},children:[v.jsx("div",{style:{position:"absolute",inset:"-18px",borderRadius:"50%",background:"radial-gradient(circle, rgba(56,189,248,0.40) 0%, rgba(14,116,144,0.14) 55%, transparent 75%)",animation:"atmoGlow 5s ease-in-out infinite"}}),v.jsxs("svg",{width:"108",height:"108",viewBox:"0 0 108 108",style:{filter:"drop-shadow(0 0 20px rgba(14,165,233,0.45))"},children:[v.jsx("circle",{cx:"54",cy:"54",r:"50",fill:"url(#earthG)"}),v.jsxs("g",{style:{opacity:.85},children:[v.jsx("path",{d:"M40,28 Q48,22 62,25 Q74,30 78,42 Q72,50 62,48 Q58,58 54,64 Q50,56 46,48 Q36,44 38,34 Z",fill:"#15803d",stroke:"#166534",strokeWidth:"0.8"}),v.jsx("path",{d:"M26,46 Q36,42 42,48 Q46,58 40,72 Q34,78 30,68 Q24,60 26,46 Z",fill:"#b45309",opacity:"0.80"}),v.jsx("ellipse",{cx:"76",cy:"74",rx:"8",ry:"5.5",fill:"#15803d"}),v.jsx("circle",{cx:"88",cy:"68",r:"2",fill:"#16a34a"}),v.jsx("ellipse",{cx:"54",cy:"9",rx:"18",ry:"4.5",fill:"#f8fafc",opacity:"0.95"}),v.jsx("ellipse",{cx:"54",cy:"99",rx:"22",ry:"5",fill:"#f8fafc",opacity:"0.95"})]}),v.jsxs("g",{style:{mixBlendMode:"screen",opacity:.65},children:[v.jsx("path",{d:"M12,42 Q28,34 50,38 T96,36",fill:"none",stroke:"#ffffff",strokeWidth:"4",strokeLinecap:"round",filter:"blur(1px)"}),v.jsx("path",{d:"M18,58 Q42,52 68,56 T102,52",fill:"none",stroke:"#ffffff",strokeWidth:"3.2",strokeLinecap:"round",filter:"blur(1px)"}),v.jsx("path",{d:"M32,24 Q50,18 70,22",fill:"none",stroke:"#ffffff",strokeWidth:"2.5",strokeLinecap:"round"}),v.jsx("circle",{cx:"66",cy:"38",r:"5",fill:"none",stroke:"#ffffff",strokeWidth:"1.5",strokeDasharray:"3,2"})]}),v.jsx("circle",{cx:"54",cy:"54",r:"50",fill:"url(#earthSpec)"}),v.jsx("circle",{cx:"54",cy:"54",r:"50",fill:"url(#earthTerm)"}),v.jsx("circle",{cx:"54",cy:"54",r:"49",fill:"none",stroke:"rgba(186,230,253,0.30)",strokeWidth:"1.2"})]})]}),v.jsxs("div",{style:{position:"absolute",top:"2%",right:"4%",animation:"travTR_BL 62s linear infinite 10s",filter:"url(#shadow3d)"},children:[v.jsx("div",{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:"120px",height:"120px",borderRadius:"50%",background:"radial-gradient(circle, rgba(245,158,11,0.28) 0%, rgba(180,83,9,0.06) 60%, transparent 75%)",animation:"atmoGlow 6s ease-in-out infinite 1s"}}),v.jsxs("svg",{width:"210",height:"130",viewBox:"0 0 210 130",style:{filter:"drop-shadow(0 0 22px rgba(245,158,11,0.40))"},children:[v.jsxs("g",{transform:"translate(105, 65) rotate(-16)",children:[v.jsx("ellipse",{cx:"0",cy:"0",rx:"98",ry:"24",fill:"none",stroke:"rgba(180,83,9,0.25)",strokeWidth:"14"}),v.jsx("ellipse",{cx:"0",cy:"0",rx:"90",ry:"22",fill:"none",stroke:"rgba(245,158,11,0.55)",strokeWidth:"8"}),v.jsx("ellipse",{cx:"0",cy:"0",rx:"84",ry:"20",fill:"none",stroke:"rgba(0,0,0,0.85)",strokeWidth:"2.2"}),v.jsx("ellipse",{cx:"0",cy:"0",rx:"76",ry:"18",fill:"none",stroke:"rgba(253,224,71,0.65)",strokeWidth:"10"}),v.jsx("ellipse",{cx:"0",cy:"0",rx:"64",ry:"15",fill:"none",stroke:"rgba(217,119,6,0.35)",strokeWidth:"6"})]}),v.jsx("circle",{cx:"105",cy:"65",r:"42",fill:"url(#saturnG)"}),v.jsxs("g",{style:{mixBlendMode:"multiply",opacity:.65},children:[v.jsx("rect",{x:"63",y:"44",width:"84",height:"4",fill:"#92400e"}),v.jsx("rect",{x:"63",y:"52",width:"84",height:"6",fill:"#b45309"}),v.jsx("rect",{x:"63",y:"62",width:"84",height:"7",fill:"#78350f"}),v.jsx("rect",{x:"63",y:"73",width:"84",height:"5",fill:"#92400e"}),v.jsx("rect",{x:"63",y:"82",width:"84",height:"4",fill:"#b45309"})]}),v.jsx("circle",{cx:"105",cy:"65",r:"42",fill:"url(#saturnSpec)"}),v.jsx("circle",{cx:"105",cy:"65",r:"42",fill:"url(#saturnTerm)"}),v.jsx("circle",{cx:"105",cy:"65",r:"41",fill:"none",stroke:"rgba(254,240,138,0.22)",strokeWidth:"1"}),v.jsxs("g",{transform:"translate(105, 65) rotate(-16)",children:[v.jsx("clipPath",{id:"frontRingsClip",children:v.jsx("rect",{x:"-110",y:"0",width:"220",height:"40"})}),v.jsxs("g",{clipPath:"url(#frontRingsClip)",children:[v.jsx("ellipse",{cx:"0",cy:"0",rx:"98",ry:"24",fill:"none",stroke:"rgba(180,83,9,0.30)",strokeWidth:"14"}),v.jsx("ellipse",{cx:"0",cy:"0",rx:"90",ry:"22",fill:"none",stroke:"rgba(245,158,11,0.60)",strokeWidth:"8"}),v.jsx("ellipse",{cx:"0",cy:"0",rx:"84",ry:"20",fill:"none",stroke:"rgba(0,0,0,0.85)",strokeWidth:"2.2"}),v.jsx("ellipse",{cx:"0",cy:"0",rx:"76",ry:"18",fill:"none",stroke:"rgba(253,224,71,0.72)",strokeWidth:"10"}),v.jsx("ellipse",{cx:"0",cy:"0",rx:"64",ry:"15",fill:"none",stroke:"rgba(217,119,6,0.40)",strokeWidth:"6"})]})]})]})]}),v.jsxs("div",{style:{position:"absolute",top:"1%",left:"14%",animation:"travTL_BR 44s linear infinite 16s",filter:"url(#shadow3d)"},children:[v.jsx("div",{style:{position:"absolute",inset:"-16px",borderRadius:"50%",background:"radial-gradient(circle, rgba(239,68,68,0.32) 0%, rgba(185,28,28,0.08) 55%, transparent 75%)",animation:"atmoGlow 5s ease-in-out infinite"}}),v.jsxs("svg",{width:"98",height:"98",viewBox:"0 0 98 98",style:{filter:"drop-shadow(0 0 16px rgba(220,38,38,0.42))"},children:[v.jsx("circle",{cx:"49",cy:"49",r:"45",fill:"url(#marsG)"}),v.jsxs("g",{style:{mixBlendMode:"overlay",opacity:.7},children:[v.jsx("ellipse",{cx:"47",cy:"14",rx:"14",ry:"4",fill:"#ffffff",opacity:"0.90"}),v.jsx("ellipse",{cx:"47",cy:"14",rx:"19",ry:"6.5",fill:"#ffffff",opacity:"0.35"}),v.jsx("path",{d:"M22,46 Q38,40 56,44 Q72,48 86,43",fill:"none",stroke:"rgba(40,10,4,0.75)",strokeWidth:"4.2",strokeLinecap:"round"}),v.jsx("circle",{cx:"32",cy:"36",r:"8",fill:"rgba(50,15,5,0.65)"}),v.jsx("circle",{cx:"32",cy:"36",r:"3",fill:"rgba(30,8,2,0.85)"}),v.jsx("ellipse",{cx:"66",cy:"58",rx:"14",ry:"8",fill:"rgba(220,120,60,0.35)"}),v.jsx("path",{d:"M16,34 Q32,30 50,32 T86,30",fill:"none",stroke:"rgba(120,40,15,0.42)",strokeWidth:"2.5"})]}),v.jsx("circle",{cx:"49",cy:"49",r:"45",fill:"url(#marsSpec)"}),v.jsx("circle",{cx:"49",cy:"49",r:"45",fill:"url(#marsTerm)"}),v.jsx("circle",{cx:"49",cy:"49",r:"44",fill:"none",stroke:"rgba(254,215,170,0.18)",strokeWidth:"1.2"})]})]}),v.jsxs("div",{style:{position:"absolute",top:"22%",left:"2%",animation:"travL_R 68s linear infinite 24s",filter:"url(#shadow3d)"},children:[v.jsx("div",{style:{position:"absolute",inset:"-18px",borderRadius:"50%",background:"radial-gradient(circle, rgba(245,158,11,0.26) 0%, rgba(180,83,9,0.06) 55%, transparent 75%)",animation:"atmoGlow 7s ease-in-out infinite 2s"}}),v.jsxs("svg",{width:"118",height:"118",viewBox:"0 0 118 118",style:{filter:"drop-shadow(0 0 20px rgba(217,119,6,0.38))"},children:[v.jsx("circle",{cx:"59",cy:"59",r:"52",fill:"url(#jupG)"}),v.jsxs("g",{style:{mixBlendMode:"multiply",opacity:.58},children:[v.jsx("rect",{x:"7",y:"20",width:"104",height:"6",fill:"#78350f"}),v.jsx("rect",{x:"7",y:"31",width:"104",height:"10",fill:"#92400e"}),v.jsx("rect",{x:"7",y:"46",width:"104",height:"8",fill:"#713f12"}),v.jsx("rect",{x:"7",y:"58",width:"104",height:"12",fill:"#854d0e"}),v.jsx("rect",{x:"7",y:"74",width:"104",height:"9",fill:"#78350f"}),v.jsx("rect",{x:"7",y:"88",width:"104",height:"6",fill:"#92400e"})]}),v.jsxs("g",{style:{mixBlendMode:"screen",opacity:.65},children:[v.jsx("ellipse",{cx:"74",cy:"64",rx:"16",ry:"10",fill:"#ef4444"}),v.jsx("ellipse",{cx:"74",cy:"64",rx:"12",ry:"7.5",fill:"#f87171"}),v.jsx("ellipse",{cx:"74",cy:"64",rx:"8",ry:"4.5",fill:"#fef08a"}),v.jsx("path",{d:"M20,40 Q36,36 52,40 Q66,44 80,40 Q94,36 104,40",fill:"none",stroke:"rgba(254,240,138,0.25)",strokeWidth:"1.5"}),v.jsx("path",{d:"M16,56 Q32,52 48,55 Q64,58 80,55 Q94,52 108,55",fill:"none",stroke:"rgba(245,158,11,0.22)",strokeWidth:"1.2"})]}),v.jsx("circle",{cx:"106",cy:"46",r:"3.2",fill:"#fef08a",filter:"drop-shadow(0 0 4px #f59e0b)"}),v.jsx("circle",{cx:"82",cy:"50",r:"2.2",fill:"rgba(0,0,0,0.6)"})," ",v.jsx("circle",{cx:"59",cy:"59",r:"52",fill:"url(#jupSpec)"}),v.jsx("circle",{cx:"59",cy:"59",r:"52",fill:"url(#jupTerm)"}),v.jsx("circle",{cx:"59",cy:"59",r:"51",fill:"none",stroke:"rgba(254,243,199,0.12)",strokeWidth:"1.2"})]})]}),v.jsxs("div",{style:{position:"absolute",bottom:"8%",left:"6%",animation:"travBL_TR 58s linear infinite 6s",filter:"url(#shadow3d)"},children:[v.jsx("div",{style:{position:"absolute",inset:"-18px",borderRadius:"50%",background:"radial-gradient(circle, rgba(253,224,71,0.35) 0%, rgba(217,119,6,0.08) 55%, transparent 75%)",animation:"atmoGlow 5.5s ease-in-out infinite"}}),v.jsxs("svg",{width:"90",height:"90",viewBox:"0 0 90 90",style:{filter:"drop-shadow(0 0 18px rgba(245,158,11,0.45))"},children:[v.jsx("circle",{cx:"45",cy:"45",r:"41",fill:"url(#venusG)"}),v.jsxs("g",{style:{mixBlendMode:"soft-light",opacity:.7},children:[v.jsx("path",{d:"M12,30 Q30,22 52,26 T82,24",fill:"none",stroke:"#ffffff",strokeWidth:"3",strokeLinecap:"round"}),v.jsx("path",{d:"M10,48 Q32,42 56,46 T84,44",fill:"none",stroke:"#ffffff",strokeWidth:"3.5",strokeLinecap:"round"}),v.jsx("path",{d:"M14,64 Q36,58 60,62 T80,60",fill:"none",stroke:"#ffffff",strokeWidth:"2.8",strokeLinecap:"round"})]}),v.jsx("circle",{cx:"45",cy:"45",r:"41",fill:"url(#venusSpec)"}),v.jsx("circle",{cx:"45",cy:"45",r:"40",fill:"none",stroke:"rgba(255,255,230,0.25)",strokeWidth:"1.2"})]})]}),v.jsxs("div",{style:{position:"absolute",top:"8%",left:"32%",animation:"travTL_BR 48s linear infinite 30s",filter:"url(#shadow3d)"},children:[v.jsx("div",{style:{position:"absolute",inset:"-14px",borderRadius:"50%",background:"radial-gradient(circle, rgba(241,245,249,0.22) 0%, transparent 70%)"}}),v.jsxs("svg",{width:"78",height:"78",viewBox:"0 0 78 78",style:{filter:"drop-shadow(0 0 14px rgba(226,232,240,0.30))"},children:[v.jsx("circle",{cx:"39",cy:"39",r:"35",fill:"url(#moonG)"}),v.jsxs("g",{style:{opacity:.55},children:[v.jsx("ellipse",{cx:"28",cy:"28",rx:"8",ry:"6",fill:"#1e293b"})," ",v.jsx("ellipse",{cx:"44",cy:"26",rx:"10",ry:"7",fill:"#1e293b"})," ",v.jsx("ellipse",{cx:"26",cy:"44",rx:"11",ry:"9",fill:"#1e293b"})," ",v.jsx("ellipse",{cx:"50",cy:"42",rx:"7",ry:"6",fill:"#1e293b"})," ",v.jsx("circle",{cx:"36",cy:"62",r:"2.8",fill:"#ffffff",opacity:"0.9"}),v.jsx("line",{x1:"36",y1:"62",x2:"24",y2:"48",stroke:"#ffffff",strokeWidth:"0.5",opacity:"0.4"}),v.jsx("line",{x1:"36",y1:"62",x2:"48",y2:"52",stroke:"#ffffff",strokeWidth:"0.5",opacity:"0.4"}),v.jsx("line",{x1:"36",y1:"62",x2:"38",y2:"70",stroke:"#ffffff",strokeWidth:"0.5",opacity:"0.4"})]}),v.jsx("circle",{cx:"39",cy:"39",r:"34",fill:"none",stroke:"rgba(255,255,255,0.18)",strokeWidth:"1"})]})]}),v.jsxs("div",{style:{position:"absolute",top:"1%",left:"22%",animation:"travTL_BR 56s linear infinite 38s",filter:"url(#shadow3d)"},children:[v.jsx("div",{style:{position:"absolute",inset:"-20px",borderRadius:"50%",background:"radial-gradient(circle, rgba(56,189,248,0.38) 0%, rgba(30,58,138,0.12) 55%, transparent 75%)",animation:"atmoGlow 6s ease-in-out infinite 1s"}}),v.jsxs("svg",{width:"106",height:"106",viewBox:"0 0 106 106",style:{filter:"drop-shadow(0 0 20px rgba(37,99,235,0.48))"},children:[v.jsx("circle",{cx:"53",cy:"53",r:"48",fill:"url(#nepG)"}),v.jsxs("g",{style:{mixBlendMode:"soft-light",opacity:.8},children:[v.jsx("ellipse",{cx:"62",cy:"58",rx:"14",ry:"8",fill:"rgba(2,6,23,0.92)"}),v.jsx("ellipse",{cx:"62",cy:"58",rx:"18",ry:"11",fill:"none",stroke:"rgba(56,189,248,0.50)",strokeWidth:"1.5"}),v.jsx("path",{d:"M14,36 Q38,30 62,33 Q82,36 96,32",fill:"none",stroke:"#ffffff",strokeWidth:"2.2",strokeLinecap:"round"}),v.jsx("path",{d:"M18,72 Q42,68 66,71 Q85,74 94,70",fill:"none",stroke:"#ffffff",strokeWidth:"1.8",strokeLinecap:"round"})]}),v.jsx("circle",{cx:"53",cy:"53",r:"48",fill:"url(#nepSpec)"}),v.jsx("circle",{cx:"53",cy:"53",r:"47",fill:"none",stroke:"rgba(186,230,253,0.22)",strokeWidth:"1.2"})]})]}),v.jsxs("div",{style:{position:"absolute",bottom:"12%",right:"8%",animation:"travTR_BL 66s linear infinite 18s",filter:"url(#shadow3d)"},children:[v.jsx("div",{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:"140px",height:"140px",borderRadius:"50%",border:"1.8px solid rgba(103,232,249,0.35)",boxShadow:"0 0 16px rgba(6,182,212,0.25)",animation:"uranusRingTilt 14s ease-in-out infinite",pointerEvents:"none"}}),v.jsxs("svg",{width:"94",height:"94",viewBox:"0 0 94 94",style:{filter:"drop-shadow(0 0 18px rgba(6,182,212,0.42))"},children:[v.jsx("circle",{cx:"47",cy:"47",r:"42",fill:"url(#uranusG)"}),v.jsx("circle",{cx:"47",cy:"47",r:"42",fill:"url(#nepSpec)",opacity:"0.6"}),v.jsx("circle",{cx:"47",cy:"47",r:"41",fill:"none",stroke:"rgba(207,250,254,0.25)",strokeWidth:"1.2"})]})]}),v.jsxs("div",{style:{position:"absolute",top:"2%",left:"6%",animation:"satFlightA 40s linear infinite 4s"},children:[v.jsx("div",{style:{position:"absolute",bottom:"-12px",left:"50%",width:"22px",height:"24px",background:"radial-gradient(circle, rgba(56,189,248,0.75) 0%, rgba(2,132,199,0.22) 55%, transparent 80%)",animation:"enginePlume 2.4s ease-in-out infinite"}}),v.jsxs("svg",{width:"102",height:"70",viewBox:"0 0 102 70",children:[v.jsx("rect",{x:"0",y:"24",width:"36",height:"18",rx:"2",fill:"url(#solarPanelG)",stroke:"rgba(56,189,248,0.65)",strokeWidth:"0.8"}),v.jsx("line",{x1:"12",y1:"24",x2:"12",y2:"42",stroke:"rgba(56,189,248,0.4)",strokeWidth:"0.5"}),v.jsx("line",{x1:"24",y1:"24",x2:"24",y2:"42",stroke:"rgba(56,189,248,0.4)",strokeWidth:"0.5"}),v.jsx("line",{x1:"0",y1:"30",x2:"36",y2:"30",stroke:"rgba(56,189,248,0.4)",strokeWidth:"0.5"}),v.jsx("line",{x1:"0",y1:"36",x2:"36",y2:"36",stroke:"rgba(56,189,248,0.4)",strokeWidth:"0.5"}),v.jsx("rect",{x:"0",y:"24",width:"36",height:"18",rx:"2",fill:"rgba(255,255,255,0.12)",style:{animation:"solarGlint 4s ease-in-out infinite"}}),v.jsx("rect",{x:"66",y:"24",width:"36",height:"18",rx:"2",fill:"url(#solarPanelG)",stroke:"rgba(56,189,248,0.65)",strokeWidth:"0.8"}),v.jsx("line",{x1:"78",y1:"24",x2:"78",y2:"42",stroke:"rgba(56,189,248,0.4)",strokeWidth:"0.5"}),v.jsx("line",{x1:"90",y1:"24",x2:"90",y2:"42",stroke:"rgba(56,189,248,0.4)",strokeWidth:"0.5"}),v.jsx("line",{x1:"66",y1:"30",x2:"102",y2:"30",stroke:"rgba(56,189,248,0.4)",strokeWidth:"0.5"}),v.jsx("line",{x1:"66",y1:"36",x2:"102",y2:"36",stroke:"rgba(56,189,248,0.4)",strokeWidth:"0.5"}),v.jsx("rect",{x:"66",y:"24",width:"36",height:"18",rx:"2",fill:"rgba(255,255,255,0.12)",style:{animation:"solarGlint 4s ease-in-out infinite 1.2s"}}),v.jsx("line",{x1:"36",y1:"33",x2:"42",y2:"33",stroke:"rgba(148,163,184,0.85)",strokeWidth:"1.6"}),v.jsx("line",{x1:"60",y1:"33",x2:"66",y2:"33",stroke:"rgba(148,163,184,0.85)",strokeWidth:"1.6"}),v.jsx("rect",{x:"40",y:"16",width:"22",height:"30",rx:"3",fill:"url(#goldMliG)",stroke:"rgba(245,158,11,0.8)",strokeWidth:"1"}),v.jsx("rect",{x:"42",y:"18",width:"18",height:"26",rx:"2",fill:"rgba(15,23,42,0.65)"}),v.jsx("ellipse",{cx:"51",cy:"12",rx:"11",ry:"4",fill:"rgba(203,213,225,0.85)",stroke:"rgba(148,163,184,0.9)",strokeWidth:"0.8"}),v.jsx("line",{x1:"51",y1:"12",x2:"51",y2:"16",stroke:"#94a3b8",strokeWidth:"1.2"}),v.jsx("circle",{cx:"51",cy:"12",r:"1.5",fill:"#f59e0b",style:{animation:"beaconBlink 2s infinite"}}),v.jsx("polygon",{points:"46,46 56,46 59,52 43,52",fill:"#475569",stroke:"#64748b",strokeWidth:"0.8"}),v.jsx("text",{x:"51",y:"66",textAnchor:"middle",fontSize:"5",fill:"rgba(56,189,248,0.85)",fontFamily:"monospace",letterSpacing:"0.8",children:"CHANDRAYAAN-3"})]})]}),v.jsxs("div",{style:{position:"absolute",top:"5%",left:"26%",animation:"satFlightA 46s linear infinite 14s"},children:[v.jsx("div",{style:{position:"absolute",bottom:"-8px",left:"50%",width:"18px",height:"20px",background:"radial-gradient(circle, rgba(245,158,11,0.65) 0%, transparent 75%)",animation:"enginePlume 2.8s ease-in-out infinite"}}),v.jsxs("svg",{width:"94",height:"66",viewBox:"0 0 94 66",children:[v.jsx("rect",{x:"2",y:"22",width:"30",height:"15",rx:"1.5",fill:"url(#solarPanelG)",stroke:"#38bdf8",strokeWidth:"0.8"}),v.jsx("rect",{x:"62",y:"22",width:"30",height:"15",rx:"1.5",fill:"url(#solarPanelG)",stroke:"#38bdf8",strokeWidth:"0.8"}),v.jsx("line",{x1:"32",y1:"29",x2:"38",y2:"29",stroke:"#94a3b8",strokeWidth:"1.5"}),v.jsx("line",{x1:"56",y1:"29",x2:"62",y2:"29",stroke:"#94a3b8",strokeWidth:"1.5"}),v.jsx("polygon",{points:"40,16 54,16 58,40 36,40",fill:"url(#goldMliG)",stroke:"#f59e0b",strokeWidth:"1"}),v.jsx("circle",{cx:"47",cy:"22",r:"4.5",fill:"#0f172a",stroke:"#f59e0b",strokeWidth:"1"}),v.jsx("circle",{cx:"47",cy:"22",r:"2",fill:"#ef4444",style:{animation:"beaconBlink 1.5s infinite"}}),v.jsx("line",{x1:"47",y1:"16",x2:"47",y2:"6",stroke:"#e2e8f0",strokeWidth:"1.2"}),v.jsx("circle",{cx:"47",cy:"6",r:"2",fill:"#38bdf8"}),v.jsx("text",{x:"47",y:"60",textAnchor:"middle",fontSize:"4.8",fill:"rgba(245,158,11,0.90)",fontFamily:"monospace",letterSpacing:"0.8",children:"ADITYA-L1"})]})]}),v.jsx("div",{style:{position:"absolute",top:"3%",right:"12%",animation:"satFlightB 50s linear infinite 8s"},children:v.jsxs("svg",{width:"98",height:"68",viewBox:"0 0 98 68",children:[v.jsx("rect",{x:"4",y:"22",width:"34",height:"16",rx:"2",fill:"url(#solarPanelG)",stroke:"#38bdf8",strokeWidth:"0.8"}),v.jsx("line",{x1:"38",y1:"30",x2:"44",y2:"30",stroke:"#94a3b8",strokeWidth:"1.6"}),v.jsx("rect",{x:"44",y:"18",width:"22",height:"24",rx:"2.5",fill:"url(#goldMliG)",stroke:"#f59e0b",strokeWidth:"1"}),v.jsx("ellipse",{cx:"78",cy:"30",rx:"14",ry:"10",fill:"rgba(241,245,249,0.92)",stroke:"#94a3b8",strokeWidth:"1"}),v.jsx("ellipse",{cx:"78",cy:"30",rx:"4",ry:"2.5",fill:"#475569"}),v.jsx("line",{x1:"66",y1:"30",x2:"78",y2:"30",stroke:"#64748b",strokeWidth:"1.5"}),v.jsx("circle",{cx:"48",cy:"24",r:"2",fill:"#22d3ee",style:{animation:"beaconBlink 2.2s infinite"}}),v.jsx("circle",{cx:"58",cy:"24",r:"2",fill:"#10b981"}),v.jsx("text",{x:"55",y:"58",textAnchor:"middle",fontSize:"4.8",fill:"rgba(239,68,68,0.85)",fontFamily:"monospace",letterSpacing:"0.8",children:"MOM / MARS"})]})}),v.jsx("div",{style:{position:"absolute",bottom:"16%",left:"4%",animation:"satFlightC 54s linear infinite 12s"},children:v.jsxs("svg",{width:"104",height:"74",viewBox:"0 0 104 74",children:[v.jsx("polygon",{points:"52,10 98,34 52,58 6,34",fill:"rgba(226,232,240,0.85)",stroke:"#cbd5e1",strokeWidth:"1"}),v.jsx("polygon",{points:"52,13 94,34 52,55 10,34",fill:"rgba(241,245,249,0.65)"}),v.jsxs("g",{transform:"translate(52, 34) scale(0.9)",children:[v.jsx("circle",{cx:"0",cy:"0",r:"14",fill:"#f59e0b",stroke:"#d97706",strokeWidth:"0.8"}),v.jsx("circle",{cx:"0",cy:"0",r:"4",fill:"#0f172a"}),v.jsx("polygon",{points:"-6,-10 0,-14 6,-10 6,-3 0,0 -6,-3",fill:"#fbbf24",stroke:"#d97706",strokeWidth:"0.5"}),v.jsx("polygon",{points:"6,-10 12,-14 18,-10 18,-3 12,0 6,-3",fill:"#fbbf24",stroke:"#d97706",strokeWidth:"0.5"}),v.jsx("polygon",{points:"-18,-10 -12,-14 -6,-10 -6,-3 -12,0 -18,-3",fill:"#fbbf24",stroke:"#d97706",strokeWidth:"0.5"}),v.jsx("polygon",{points:"-6,10 0,6 6,10 6,17 0,20 -6,17",fill:"#fbbf24",stroke:"#d97706",strokeWidth:"0.5"}),v.jsx("line",{x1:"0",y1:"0",x2:"-8",y2:"-16",stroke:"#475569",strokeWidth:"0.8"}),v.jsx("line",{x1:"0",y1:"0",x2:"8",y2:"-16",stroke:"#475569",strokeWidth:"0.8"}),v.jsx("circle",{cx:"0",cy:"-16",r:"2",fill:"#0f172a",stroke:"#d97706",strokeWidth:"0.5"})]}),v.jsx("text",{x:"52",y:"70",textAnchor:"middle",fontSize:"5",fill:"rgba(245,158,11,0.85)",fontFamily:"monospace",letterSpacing:"0.8",children:"JWST"})]})}),v.jsx("div",{style:{position:"absolute",top:"14%",left:"1%",animation:"satFlightD 62s linear infinite 22s"},children:v.jsxs("svg",{width:"124",height:"64",viewBox:"0 0 124 64",children:[v.jsx("line",{x1:"8",y1:"32",x2:"116",y2:"32",stroke:"#94a3b8",strokeWidth:"2.5"}),v.jsx("rect",{x:"8",y:"10",width:"18",height:"20",fill:"url(#solarPanelG)",stroke:"#38bdf8",strokeWidth:"0.6"}),v.jsx("rect",{x:"8",y:"34",width:"18",height:"20",fill:"url(#solarPanelG)",stroke:"#38bdf8",strokeWidth:"0.6"}),v.jsx("rect",{x:"28",y:"10",width:"18",height:"20",fill:"url(#solarPanelG)",stroke:"#38bdf8",strokeWidth:"0.6"}),v.jsx("rect",{x:"28",y:"34",width:"18",height:"20",fill:"url(#solarPanelG)",stroke:"#38bdf8",strokeWidth:"0.6"}),v.jsx("rect",{x:"78",y:"10",width:"18",height:"20",fill:"url(#solarPanelG)",stroke:"#38bdf8",strokeWidth:"0.6"}),v.jsx("rect",{x:"78",y:"34",width:"18",height:"20",fill:"url(#solarPanelG)",stroke:"#38bdf8",strokeWidth:"0.6"}),v.jsx("rect",{x:"98",y:"10",width:"18",height:"20",fill:"url(#solarPanelG)",stroke:"#38bdf8",strokeWidth:"0.6"}),v.jsx("rect",{x:"98",y:"34",width:"18",height:"20",fill:"url(#solarPanelG)",stroke:"#38bdf8",strokeWidth:"0.6"}),v.jsx("rect",{x:"52",y:"24",width:"20",height:"16",rx:"2",fill:"rgba(241,245,249,0.92)",stroke:"#64748b",strokeWidth:"1"}),v.jsx("rect",{x:"58",y:"16",width:"8",height:"32",rx:"2",fill:"rgba(203,213,225,0.85)",stroke:"#64748b",strokeWidth:"0.8"}),v.jsx("circle",{cx:"62",cy:"32",r:"3",fill:"#0284c7",stroke:"#ffffff",strokeWidth:"0.5"}),v.jsx("circle",{cx:"54",cy:"26",r:"1.5",fill:"#10b981",style:{animation:"beaconBlink 2s infinite"}}),v.jsx("text",{x:"62",y:"58",textAnchor:"middle",fontSize:"4.6",fill:"rgba(148,163,184,0.85)",fontFamily:"monospace",letterSpacing:"0.8",children:"ISS"})]})}),v.jsxs("div",{style:{position:"absolute",top:"2%",right:"22%",animation:"satPolarPass 48s linear infinite 16s"},children:[v.jsx("div",{style:{position:"absolute",bottom:"-14px",left:"50%",width:"36px",height:"36px",borderRadius:"50%",border:"1.5px solid rgba(34,211,238,0.55)",animation:"radarScanWave 3.5s ease-out infinite"}}),v.jsxs("svg",{width:"90",height:"74",viewBox:"0 0 90 74",children:[v.jsx("ellipse",{cx:"45",cy:"20",rx:"22",ry:"12",fill:"none",stroke:"url(#goldMliG)",strokeWidth:"1.8"}),v.jsx("ellipse",{cx:"45",cy:"20",rx:"16",ry:"8",fill:"none",stroke:"rgba(245,158,11,0.5)",strokeWidth:"0.8",strokeDasharray:"2,2"}),v.jsx("line",{x1:"45",y1:"20",x2:"45",y2:"34",stroke:"#94a3b8",strokeWidth:"1.5"}),v.jsx("rect",{x:"36",y:"34",width:"18",height:"22",rx:"2",fill:"rgba(15,23,42,0.92)",stroke:"#38bdf8",strokeWidth:"1"}),v.jsx("circle",{cx:"45",cy:"44",r:"4",fill:"#0369a1",stroke:"#38bdf8",strokeWidth:"0.8"}),v.jsx("rect",{x:"10",y:"38",width:"24",height:"12",rx:"1.5",fill:"url(#solarPanelG)",stroke:"#38bdf8",strokeWidth:"0.8"}),v.jsx("rect",{x:"56",y:"38",width:"24",height:"12",rx:"1.5",fill:"url(#solarPanelG)",stroke:"#38bdf8",strokeWidth:"0.8"}),v.jsx("text",{x:"45",y:"68",textAnchor:"middle",fontSize:"4.6",fill:"rgba(34,211,238,0.85)",fontFamily:"monospace",letterSpacing:"0.8",children:"NISAR / SAR"})]})]}),v.jsxs("div",{style:{position:"absolute",top:"1%",left:"18%",animation:"satFlightA 52s linear infinite 26s"},children:[v.jsx("div",{style:{position:"absolute",bottom:"4px",left:"50%",width:"16px",height:"16px",background:"radial-gradient(circle, rgba(56,189,248,0.65) 0%, transparent 75%)",animation:"enginePlume 3.2s ease-in-out infinite"}}),v.jsxs("svg",{width:"74",height:"78",viewBox:"0 0 74 78",children:[v.jsx("polygon",{points:"24,12 50,12 60,48 14,48",fill:"rgba(30,41,59,0.94)",stroke:"rgba(56,189,248,0.6)",strokeWidth:"1"}),v.jsx("rect",{x:"27",y:"16",width:"20",height:"26",rx:"2",fill:"url(#goldMliG)",stroke:"#f59e0b",strokeWidth:"0.6"}),v.jsx("line",{x1:"18",y1:"46",x2:"6",y2:"64",stroke:"#94a3b8",strokeWidth:"2.2",strokeLinecap:"round"}),v.jsx("line",{x1:"6",y1:"64",x2:"0",y2:"64",stroke:"#94a3b8",strokeWidth:"2.2",strokeLinecap:"round"}),v.jsx("ellipse",{cx:"3",cy:"65",rx:"3.5",ry:"2",fill:"#64748b"}),v.jsx("line",{x1:"56",y1:"46",x2:"68",y2:"64",stroke:"#94a3b8",strokeWidth:"2.2",strokeLinecap:"round"}),v.jsx("line",{x1:"68",y1:"64",x2:"74",y2:"64",stroke:"#94a3b8",strokeWidth:"2.2",strokeLinecap:"round"}),v.jsx("ellipse",{cx:"71",cy:"65",rx:"3.5",ry:"2",fill:"#64748b"}),v.jsx("polygon",{points:"32,48 42,48 45,56 29,56",fill:"#475569"}),v.jsx("circle",{cx:"37",cy:"24",r:"3.5",fill:"#0f172a",stroke:"#38bdf8",strokeWidth:"0.8"}),v.jsx("circle",{cx:"37",cy:"24",r:"1.5",fill:"#22d3ee"}),v.jsx("text",{x:"37",y:"74",textAnchor:"middle",fontSize:"4.6",fill:"rgba(56,189,248,0.85)",fontFamily:"monospace",letterSpacing:"0.8",children:"VIKRAM"})]})]}),v.jsx("div",{style:{position:"absolute",top:"28%",left:"3%",animation:"satFlightD 56s linear infinite 34s"},children:v.jsxs("svg",{width:"86",height:"52",viewBox:"0 0 86 52",children:[v.jsx("rect",{x:"28",y:"18",width:"30",height:"16",rx:"3",fill:"rgba(226,232,240,0.92)",stroke:"#94a3b8",strokeWidth:"1"}),v.jsx("line",{x1:"28",y1:"18",x2:"20",y2:"12",stroke:"#64748b",strokeWidth:"2",strokeLinecap:"round"}),v.jsx("ellipse",{cx:"28",cy:"26",rx:"3",ry:"8",fill:"#0f172a",stroke:"#475569",strokeWidth:"0.8"}),v.jsx("rect",{x:"2",y:"21",width:"22",height:"10",rx:"1",fill:"url(#solarPanelG)",stroke:"#38bdf8",strokeWidth:"0.6"}),v.jsx("rect",{x:"62",y:"21",width:"22",height:"10",rx:"1",fill:"url(#solarPanelG)",stroke:"#38bdf8",strokeWidth:"0.6"}),v.jsx("line",{x1:"24",y1:"26",x2:"28",y2:"26",stroke:"#94a3b8",strokeWidth:"1.2"}),v.jsx("line",{x1:"58",y1:"26",x2:"62",y2:"26",stroke:"#94a3b8",strokeWidth:"1.2"}),v.jsx("circle",{cx:"48",cy:"12",r:"3.5",fill:"rgba(241,245,249,0.8)",stroke:"#94a3b8",strokeWidth:"0.6"}),v.jsx("line",{x1:"48",y1:"12",x2:"48",y2:"18",stroke:"#94a3b8",strokeWidth:"1"}),v.jsx("text",{x:"43",y:"46",textAnchor:"middle",fontSize:"4.6",fill:"rgba(148,163,184,0.85)",fontFamily:"monospace",letterSpacing:"0.8",children:"HUBBLE"})]})}),v.jsx("div",{style:{position:"absolute",top:"8%",left:"38%",animation:"satFlightA 42s linear infinite 20s"},children:v.jsxs("svg",{width:"84",height:"42",viewBox:"0 0 84 42",children:[v.jsxs("g",{transform:"translate(10, 8)",children:[v.jsx("rect",{x:"0",y:"4",width:"10",height:"5",rx:"1",fill:"#cbd5e1",stroke:"#38bdf8",strokeWidth:"0.5"}),v.jsx("rect",{x:"10",y:"3",width:"12",height:"7",rx:"0.5",fill:"url(#solarPanelG)"}),v.jsx("circle",{cx:"5",cy:"6.5",r:"0.8",fill:"#22d3ee",style:{animation:"beaconBlink 1s infinite"}})]}),v.jsxs("g",{transform:"translate(36, 16)",children:[v.jsx("rect",{x:"0",y:"4",width:"10",height:"5",rx:"1",fill:"#cbd5e1",stroke:"#38bdf8",strokeWidth:"0.5"}),v.jsx("rect",{x:"10",y:"3",width:"12",height:"7",rx:"0.5",fill:"url(#solarPanelG)"}),v.jsx("circle",{cx:"5",cy:"6.5",r:"0.8",fill:"#22d3ee",style:{animation:"beaconBlink 1s infinite 0.3s"}})]}),v.jsxs("g",{transform:"translate(60, 24)",children:[v.jsx("rect",{x:"0",y:"4",width:"10",height:"5",rx:"1",fill:"#cbd5e1",stroke:"#38bdf8",strokeWidth:"0.5"}),v.jsx("rect",{x:"10",y:"3",width:"12",height:"7",rx:"0.5",fill:"url(#solarPanelG)"}),v.jsx("circle",{cx:"5",cy:"6.5",r:"0.8",fill:"#22d3ee",style:{animation:"beaconBlink 1s infinite 0.6s"}})]})]})}),v.jsx("div",{style:{position:"absolute",top:"2%",left:"2%",animation:"deb1 30s linear infinite 2s"},children:v.jsx("svg",{width:"14",height:"14",viewBox:"0 0 14 14",children:v.jsx("polygon",{points:"7,0 14,4 12,14 2,12 0,5",fill:"rgba(148,163,184,0.75)",stroke:"rgba(203,213,225,0.3)",strokeWidth:"0.6"})})}),v.jsx("div",{style:{position:"absolute",top:"5%",right:"8%",animation:"deb2 36s linear infinite 7s"},children:v.jsx("svg",{width:"10",height:"10",viewBox:"0 0 10 10",children:v.jsx("polygon",{points:"5,0 10,8 0,10",fill:"rgba(148,163,184,0.70)",stroke:"rgba(203,213,225,0.3)",strokeWidth:"0.5"})})}),v.jsx("div",{style:{position:"absolute",bottom:"18%",left:"14%",animation:"deb3 42s linear infinite 15s"},children:v.jsx("svg",{width:"16",height:"12",viewBox:"0 0 16 12",children:v.jsx("polygon",{points:"0,10 7,0 16,3 12,11",fill:"rgba(148,163,184,0.65)",stroke:"rgba(203,213,225,0.25)",strokeWidth:"0.5"})})}),v.jsx("div",{style:{position:"absolute",top:"4%",left:"28%",animation:"deb4 35s linear infinite 11s"},children:v.jsx("svg",{width:"12",height:"12",viewBox:"0 0 12 12",children:v.jsx("rect",{x:"1",y:"2",width:"10",height:"6",rx:"1.5",fill:"rgba(148,163,184,0.65)",transform:"rotate(32 6 5)"})})})]})]})}const wS=Se.createContext({});function b3(t){const e=Se.useRef(null);return e.current===null&&(e.current=t()),e.current}const C3=typeof window<"u",R3=C3?Se.useLayoutEffect:Se.useEffect,pm=Se.createContext(null);function mm(t,e){t.indexOf(e)===-1&&t.push(e)}function Wc(t,e){const n=t.indexOf(e);n>-1&&t.splice(n,1)}const Di=(t,e,n)=>n>e?e:n<t?t:n;let Su=()=>{};const Dr={},AS=t=>/^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t),bS=t=>typeof t=="object"&&t!==null,CS=t=>/^0[^.\s]+$/u.test(t);function RS(t){let e;return()=>(e===void 0&&(e=t()),e)}const Hn=t=>t,Wa=(...t)=>t.reduce((e,n)=>i=>n(e(i))),Da=(t,e,n)=>{const i=e-t;return i?(n-t)/i:1};class gm{constructor(){this.subscriptions=[]}add(e){return mm(this.subscriptions,e),()=>Wc(this.subscriptions,e)}notify(e,n,i){const r=this.subscriptions.length;if(r)if(r===1)this.subscriptions[0](e,n,i);else for(let s=0;s<r;s++){const o=this.subscriptions[s];o&&o(e,n,i)}}getSize(){return this.subscriptions.length}clear(){this.subscriptions.length=0}}const Wn=t=>t*1e3,zn=t=>t/1e3,PS=(t,e)=>e?t*(1e3/e):0,DS=(t,e,n)=>(((1-3*n+3*e)*t+(3*n-6*e))*t+3*e)*t,P3=1e-7,D3=12;function L3(t,e,n,i,r){let s,o,a=0;do o=e+(n-e)/2,s=DS(o,i,r)-t,s>0?n=o:e=o;while(Math.abs(s)>P3&&++a<D3);return o}function ja(t,e,n,i){if(t===e&&n===i)return Hn;const r=s=>L3(s,0,1,t,n);return s=>s===0||s===1?s:DS(r(s),e,i)}const LS=t=>e=>e<=.5?t(2*e)/2:(2-t(2*(1-e)))/2,IS=t=>e=>1-t(1-e),NS=ja(.33,1.53,.69,.99),xm=IS(NS),US=LS(xm),FS=t=>t>=1?1:(t*=2)<1?.5*xm(t):.5*(2-Math.pow(2,-10*(t-1))),vm=t=>1-Math.sin(Math.acos(t)),kS=IS(vm),OS=LS(vm),I3=ja(.42,0,1,1),N3=ja(0,0,.58,1),BS=ja(.42,0,.58,1),U3=t=>Array.isArray(t)&&typeof t[0]!="number",VS=t=>Array.isArray(t)&&typeof t[0]=="number",F3={linear:Hn,easeIn:I3,easeInOut:BS,easeOut:N3,circIn:vm,circInOut:OS,circOut:kS,backIn:xm,backInOut:US,backOut:NS,anticipate:FS},k3=t=>typeof t=="string",dx=t=>{if(VS(t)){Su(t.length===4);const[e,n,i,r]=t;return ja(e,n,i,r)}else if(k3(t))return F3[t];return t},kl=["setup","read","resolveKeyframes","preUpdate","update","preRender","render","postRender"];function O3(t){let e=new Set,n=new Set,i=!1,r=!1;const s=new WeakSet;let o={delta:0,timestamp:0,isProcessing:!1};function a(c){s.has(c)&&(l.schedule(c),t()),c(o)}const l={schedule:(c,u=!1,d=!1)=>{const p=d&&i?e:n;return u&&s.add(c),p.add(c),c},cancel:c=>{n.delete(c),s.delete(c)},process:c=>{if(o=c,i){r=!0;return}i=!0;const u=e;e=n,n=u,e.forEach(a),e.clear(),i=!1,r&&(r=!1,l.process(c))}};return l}const B3=40;function zS(t,e){let n=!1,i=!0;const r={delta:0,timestamp:0,isProcessing:!1},s=()=>n=!0,o=kl.reduce((S,_)=>(S[_]=O3(s),S),{}),{setup:a,read:l,resolveKeyframes:c,preUpdate:u,update:d,preRender:f,render:p,postRender:m}=o,E=()=>{const S=Dr.useManualTiming,_=S?r.timestamp:performance.now();n=!1,S||(r.delta=i?1e3/60:Math.max(Math.min(_-r.timestamp,B3),1)),r.timestamp=_,r.isProcessing=!0,a.process(r),l.process(r),c.process(r),u.process(r),d.process(r),f.process(r),p.process(r),m.process(r),r.isProcessing=!1,n&&e&&(i=!1,t(E))},g=()=>{n=!0,i=!0,r.isProcessing||t(E)};return{schedule:kl.reduce((S,_)=>{const w=o[_];return S[_]=(b,A=!1,y=!1)=>(n||g(),w.schedule(b,A,y)),S},{}),cancel:S=>{for(let _=0;_<kl.length;_++)o[kl[_]].cancel(S)},state:r,steps:o}}const{schedule:lt,cancel:Lr,state:Xt,steps:Ff}=zS(typeof requestAnimationFrame<"u"?requestAnimationFrame:Hn,!0);let sc;function V3(){sc=void 0}const cn={now:()=>(sc===void 0&&cn.set(Xt.isProcessing||Dr.useManualTiming?Xt.timestamp:performance.now()),sc),set:t=>{sc=t,queueMicrotask(V3)}},GS=t=>e=>typeof e=="string"&&e.startsWith(t),HS=GS("--"),z3=GS("var(--"),ym=t=>z3(t)?G3.test(t.split("/*")[0].trim()):!1,G3=/var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;function hx(t){return typeof t!="string"?!1:t.split("/*")[0].includes("var(--")}const wo={test:t=>typeof t=="number",parse:parseFloat,transform:t=>t},La={...wo,transform:t=>Di(0,1,t)},Ol={...wo,default:1},la=t=>Math.round(t*1e5)/1e5,_m=/-?(?:\d+(?:\.\d+)?|\.\d+)/gu;function H3(t){return t==null}const W3=/^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,Sm=(t,e)=>n=>!!(typeof n=="string"&&W3.test(n)&&n.startsWith(t)||e&&!H3(n)&&Object.prototype.hasOwnProperty.call(n,e)),WS=(t,e,n)=>i=>{if(typeof i!="string")return i;const[r,s,o,a]=i.match(_m);return{[t]:parseFloat(r),[e]:parseFloat(s),[n]:parseFloat(o),alpha:a!==void 0?parseFloat(a):1}},j3=t=>Di(0,255,t),kf={...wo,transform:t=>Math.round(j3(t))},ts={test:Sm("rgb","red"),parse:WS("red","green","blue"),transform:({red:t,green:e,blue:n,alpha:i=1})=>"rgba("+kf.transform(t)+", "+kf.transform(e)+", "+kf.transform(n)+", "+la(La.transform(i))+")"};function X3(t){let e="",n="",i="",r="";return t.length>5?(e=t.substring(1,3),n=t.substring(3,5),i=t.substring(5,7),r=t.substring(7,9)):(e=t.substring(1,2),n=t.substring(2,3),i=t.substring(3,4),r=t.substring(4,5),e+=e,n+=n,i+=i,r+=r),{red:parseInt(e,16),green:parseInt(n,16),blue:parseInt(i,16),alpha:r?parseInt(r,16)/255:1}}const Fh={test:Sm("#"),parse:X3,transform:ts.transform},Xa=t=>({test:e=>typeof e=="string"&&e.endsWith(t)&&e.split(" ").length===1,parse:parseFloat,transform:e=>`${e}${t}`}),ki=Xa("deg"),bi=Xa("%"),Me=Xa("px"),Y3=Xa("vh"),$3=Xa("vw"),px={...bi,parse:t=>bi.parse(t)/100,transform:t=>bi.transform(t*100)},$s={test:Sm("hsl","hue"),parse:WS("hue","saturation","lightness"),transform:({hue:t,saturation:e,lightness:n,alpha:i=1})=>"hsla("+Math.round(t)+", "+bi.transform(la(e))+", "+bi.transform(la(n))+", "+la(La.transform(i))+")"},Lt={test:t=>ts.test(t)||Fh.test(t)||$s.test(t),parse:t=>ts.test(t)?ts.parse(t):$s.test(t)?$s.parse(t):Fh.parse(t),transform:t=>typeof t=="string"?t:t.hasOwnProperty("red")?ts.transform(t):$s.transform(t),getAnimatableNone:t=>{const e=Lt.parse(t);return e.alpha=0,Lt.transform(e)}},q3=/(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;function K3(t){var e,n;return isNaN(t)&&typeof t=="string"&&(((e=t.match(_m))==null?void 0:e.length)||0)+(((n=t.match(q3))==null?void 0:n.length)||0)>0}const jS="number",XS="color",Z3="var",Q3="var(",mx="${}",J3=/var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;function vo(t){const e=t.toString(),n=[],i={color:[],number:[],var:[]},r=[];let s=0;const a=e.replace(J3,l=>(Lt.test(l)?(i.color.push(s),r.push(XS),n.push(Lt.parse(l))):l.startsWith(Q3)?(i.var.push(s),r.push(Z3),n.push(l)):(i.number.push(s),r.push(jS),n.push(parseFloat(l))),++s,mx)).split(mx);return{values:n,split:a,indexes:i,types:r}}function eP(t){return vo(t).values}function YS({split:t,types:e}){const n=t.length;return i=>{let r="";for(let s=0;s<n;s++)if(r+=t[s],i[s]!==void 0){const o=e[s];o===jS?r+=la(i[s]):o===XS?r+=Lt.transform(i[s]):r+=i[s]}return r}}function tP(t){return YS(vo(t))}const nP=t=>typeof t=="number"?0:Lt.test(t)?Lt.getAnimatableNone(t):t,iP=(t,e)=>typeof t=="number"?e!=null&&e.trim().endsWith("/")?t:0:nP(t);function rP(t){const e=vo(t);return YS(e)(e.values.map((i,r)=>iP(i,e.split[r])))}const ai={test:K3,parse:eP,createTransformer:tP,getAnimatableNone:rP};function Of(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*(2/3-n)*6:t}function sP({hue:t,saturation:e,lightness:n,alpha:i}){t/=360,e/=100,n/=100;let r=0,s=0,o=0;if(!e)r=s=o=n;else{const a=n<.5?n*(1+e):n+e-n*e,l=2*n-a;r=Of(l,a,t+1/3),s=Of(l,a,t),o=Of(l,a,t-1/3)}return{red:Math.round(r*255),green:Math.round(s*255),blue:Math.round(o*255),alpha:i}}function jc(t,e){return n=>n>0?e:t}const at=(t,e,n)=>t+(e-t)*n,Bf=(t,e,n)=>{const i=t*t,r=n*(e*e-i)+i;return r<0?0:Math.sqrt(r)},oP=[Fh,ts,$s],aP=t=>oP.find(e=>e.test(t));function gx(t){const e=aP(t);if(!e)return!1;let n=e.parse(t);return e===$s&&(n=sP(n)),n}const xx=(t,e)=>{const n=gx(t),i=gx(e);if(!n||!i)return jc(t,e);const r={...n};return s=>(r.red=Bf(n.red,i.red,s),r.green=Bf(n.green,i.green,s),r.blue=Bf(n.blue,i.blue,s),r.alpha=at(n.alpha,i.alpha,s),ts.transform(r))},kh=new Set(["none","hidden"]);function lP(t,e){return kh.has(t)?n=>n<=0?t:e:n=>n>=1?e:t}function cP(t,e){return n=>at(t,e,n)}function Mm(t){return typeof t=="number"?cP:typeof t=="string"?ym(t)?jc:Lt.test(t)?xx:dP:Array.isArray(t)?$S:typeof t=="object"?Lt.test(t)?xx:uP:jc}function $S(t,e){const n=[...t],i=n.length,r=t.map((s,o)=>Mm(s)(s,e[o]));return s=>{for(let o=0;o<i;o++)n[o]=r[o](s);return n}}function uP(t,e){const n={...t,...e},i={};for(const r in n)t[r]!==void 0&&e[r]!==void 0&&(i[r]=Mm(t[r])(t[r],e[r]));return r=>{for(const s in i)n[s]=i[s](r);return n}}function fP(t,e){const n=[],i={color:0,var:0,number:0};for(let r=0;r<e.values.length;r++){const s=e.types[r],o=t.indexes[s][i[s]],a=t.values[o]??0;n[r]=a,i[s]++}return n}const dP=(t,e)=>{const n=ai.createTransformer(e),i=vo(t),r=vo(e);return i.indexes.var.length===r.indexes.var.length&&i.indexes.color.length===r.indexes.color.length&&i.indexes.number.length>=r.indexes.number.length?kh.has(t)&&!r.values.length||kh.has(e)&&!i.values.length?lP(t,e):Wa($S(fP(i,r),r.values),n):jc(t,e)};function qS(t,e,n){return typeof t=="number"&&typeof e=="number"&&typeof n=="number"?at(t,e,n):Mm(t)(t,e)}const hP=t=>{const e=({timestamp:n})=>t(n);return{start:(n=!0)=>lt.update(e,n),stop:()=>Lr(e),now:()=>Xt.isProcessing?Xt.timestamp:cn.now()}},KS=(t,e,n=10)=>{let i="";const r=Math.max(Math.round(e/n),2);for(let s=0;s<r;s++)i+=Math.round(t(s/(r-1))*1e4)/1e4+", ";return`linear(${i.substring(0,i.length-2)})`},Em=2e4;function Tm(t,e=50,n=Em,i){let r=0,s=t.next(r);for(;!s.done&&r<n;)r+=e,s=t.next(r);return r>=n?1/0:r}function pP(t,e=100,n){const i=n({...t,keyframes:[0,e]}),r=Math.min(Tm(i),Em);return{type:"keyframes",ease:s=>i.next(r*s).value/e,duration:zn(r)}}const St={stiffness:100,damping:10,mass:1,velocity:0,duration:800,bounce:.3,visualDuration:.3,restSpeed:{granular:.01,default:2},restDelta:{granular:.005,default:.5},minDuration:.01,maxDuration:10,minDamping:.05,maxDamping:1};function Oh(t,e){return t*Math.sqrt(1-e*e)}const mP=12;function gP(t,e,n){let i=n;for(let r=1;r<mP;r++)i=i-t(i)/e(i);return i}const Vf=.001;function xP({duration:t=St.duration,bounce:e=St.bounce,velocity:n=St.velocity,mass:i=St.mass}){let r,s,o=1-e;o=Di(St.minDamping,St.maxDamping,o),t=Di(St.minDuration,St.maxDuration,zn(t)),o<1?(r=c=>{const u=c*o,d=u*t,f=u-n,p=Oh(c,o),m=Math.exp(-d);return Vf-f/p*m},s=c=>{const d=c*o*t,f=d*n+n,p=o*o*c*c*t,m=Math.exp(-d),E=Oh(c*c,o);return(-r(c)+Vf>0?-1:1)*((f-p)*m)/E}):(r=c=>{const u=Math.exp(-c*t),d=(c-n)*t+1;return-Vf+u*d},s=c=>{const u=Math.exp(-c*t),d=(n-c)*(t*t);return u*d});const a=5/t,l=gP(r,s,a);if(t=Wn(t),isNaN(l))return{stiffness:St.stiffness,damping:St.damping,duration:t};{const c=l*l*i;return{stiffness:c,damping:o*2*Math.sqrt(i*c),duration:t}}}const vP=["duration","bounce"],yP=["stiffness","damping","mass"];function vx(t,e){return e.some(n=>t[n]!==void 0)}function _P(t){let e={velocity:St.velocity,stiffness:St.stiffness,damping:St.damping,mass:St.mass,isResolvedFromDuration:!1,...t};if(!vx(t,yP)&&vx(t,vP))if(e.velocity=0,t.visualDuration){const n=t.visualDuration,i=2*Math.PI/(n*1.2),r=i*i,s=2*Di(.05,1,1-(t.bounce||0))*Math.sqrt(r);e={...e,mass:St.mass,stiffness:r,damping:s}}else{const n=xP({...t,velocity:0});e={...e,...n,mass:St.mass},e.isResolvedFromDuration=!0}return e}function Xc(t=St.visualDuration,e=St.bounce){const n=typeof t!="object"?{visualDuration:t,keyframes:[0,1],bounce:e}:t;let{restSpeed:i,restDelta:r}=n;const s=n.keyframes[0],o=n.keyframes[n.keyframes.length-1],a={done:!1,value:s},{stiffness:l,damping:c,mass:u,duration:d,velocity:f,isResolvedFromDuration:p}=_P({...n,velocity:-zn(n.velocity||0)}),m=f||0,E=c/(2*Math.sqrt(l*u)),g=o-s,h=zn(Math.sqrt(l/u)),x=E*h,S=Math.abs(g)<5;i||(i=S?St.restSpeed.granular:St.restSpeed.default),r||(r=S?St.restDelta.granular:St.restDelta.default);let _,w;if(E<1){const A=Oh(h,E),y=(m+x*g)/A,C=x*y+g*A,P=x*g-y*A;let D=-1,F=0,X=0;const ee=O=>{if(O!==D){D=O;const q=Math.exp(-x*O),z=Math.sin(A*O),L=Math.cos(A*O);F=o-q*(y*z+g*L),X=q*(C*z+P*L)}};_=O=>(ee(O),F),w=O=>(ee(O),X)}else if(E===1){_=y=>o-Math.exp(-h*y)*(g+(m+h*g)*y);const A=m+h*g;w=y=>Math.exp(-h*y)*(h*A*y-m)}else{const A=h*Math.sqrt(E*E-1);_=D=>{const F=Math.exp(-x*D),X=Math.min(A*D,300);return o-F*((m+x*g)*Math.sinh(X)+A*g*Math.cosh(X))/A};const y=(m+x*g)/A,C=x*y-g*A,P=x*g-y*A;w=D=>{const F=Math.exp(-x*D),X=Math.min(A*D,300);return F*(C*Math.sinh(X)+P*Math.cosh(X))}}const b={calculatedDuration:p&&d||null,velocity:A=>Wn(w(A)),next:A=>{const y=_(A);if(p)a.done=A>=d;else{const C=Wn(w(A));a.done=Math.abs(C)<=i&&Math.abs(o-y)<=r}return a.value=a.done?o:y,a},toString:()=>{const A=Math.min(Tm(b),Em),y=KS(C=>b.next(A*C).value,A,30);return A+"ms "+y},toTransition:()=>{}};return b}Xc.applyToOptions=t=>{const e=pP(t,100,Xc);return t.ease=e.ease,t.duration=Wn(e.duration),t.type="keyframes",t};function Bh({keyframes:t,velocity:e=0,power:n=.8,timeConstant:i=325,bounceDamping:r=10,bounceStiffness:s=500,modifyTarget:o,min:a,max:l,restDelta:c=.5,restSpeed:u}){const d=t[0],f={done:!1,value:d},p=A=>A<a||A>l,m=A=>a===void 0?l:l===void 0||Math.abs(a-A)<Math.abs(l-A)?a:l;let E=n*e;const g=d+E,h=o===void 0?g:o(g);h!==g&&(E=h-d);const x=A=>-E*Math.exp(-A/i),S=A=>{const y=x(A);f.done=Math.abs(y)<=c,f.value=f.done?h:h+y};let _,w;const b=A=>{p(f.value)&&(_=A,w=Xc({keyframes:[f.value,m(f.value)],velocity:-x(A)/i*1e3,damping:r,stiffness:s,restDelta:c,restSpeed:u}))};return b(0),{calculatedDuration:null,next:A=>{let y=!1;return!w&&_===void 0&&(y=!0,S(A),b(A)),_!==void 0&&A>=_?w.next(A-_):(!y&&S(A),f)}}}function SP(t,e,n){const i=[],r=n||Dr.mix||qS,s=t.length-1;for(let o=0;o<s;o++){let a=r(t[o],t[o+1]);if(e){const l=Array.isArray(e)?e[o]||Hn:e;a=Wa(l,a)}i.push(a)}return i}function MP(t,e,{clamp:n=!0,ease:i,mixer:r}={}){const s=t.length;if(Su(s===e.length),s===1)return()=>e[0];if(s===2&&e[0]===e[1])return()=>e[1];const o=t[0]===t[1];t[0]>t[s-1]&&(t=[...t].reverse(),e=[...e].reverse());const a=SP(e,i,r),l=a.length,c=u=>{if(o&&u<t[0])return e[0];let d=0;if(l>1)for(;d<t.length-2&&!(u<t[d+1]);d++);const f=Da(t[d],t[d+1],u);return a[d](f)};return n?u=>c(Di(t[0],t[s-1],u)):c}function EP(t,e){const n=t[t.length-1];for(let i=1;i<=e;i++){const r=Da(0,e,i);t.push(at(n,1,r))}}function TP(t){const e=[0];return EP(e,t.length-1),e}function wP(t,e){return t.map(n=>n*e)}function AP(t,e){return t.map(()=>e||BS).splice(0,t.length-1)}function ca({duration:t=300,keyframes:e,times:n,ease:i="easeInOut"}){const r=U3(i)?i.map(dx):dx(i),s={done:!1,value:e[0]},o=wP(n&&n.length===e.length?n:TP(e),t),a=MP(o,e,{ease:Array.isArray(r)?r:AP(e,r)});return{calculatedDuration:t,next:l=>(s.value=a(l),s.done=l>=t,s)}}const bP=5;function CP(t,e,n){const i=Math.max(e-bP,0);return PS(n-t(i),e-i)}const RP=t=>t!==null;function Mu(t,{repeat:e,repeatType:n="loop"},i,r=1){const s=t.filter(RP),a=r<0||e&&n!=="loop"&&e%2===1?0:s.length-1;return!a||i===void 0?s[a]:i}const PP={decay:Bh,inertia:Bh,tween:ca,keyframes:ca,spring:Xc};function ZS(t){typeof t.type=="string"&&(t.type=PP[t.type])}class wm{constructor(){this.updateFinished()}get finished(){return this._finished}updateFinished(){this._finished=new Promise(e=>{this.resolve=e})}notifyFinished(){this.resolve()}then(e,n){return this.finished.then(e,n)}}const DP=t=>t/100;class Yc extends wm{constructor(e){super(),this.state="idle",this.startTime=null,this.isStopped=!1,this.currentTime=0,this.holdTime=null,this.playbackSpeed=1,this.delayState={done:!1,value:void 0},this.stop=()=>{var i,r;const{motionValue:n}=this.options;n&&n.updatedAt!==cn.now()&&this.tick(cn.now()),this.isStopped=!0,this.state!=="idle"&&(this.teardown(),(r=(i=this.options).onStop)==null||r.call(i))},this.options=e,this.initAnimation(),this.play(),e.autoplay===!1&&this.pause()}initAnimation(){const{options:e}=this;ZS(e);const{type:n=ca,repeat:i=0,repeatDelay:r=0,repeatType:s,velocity:o=0}=e;let{keyframes:a}=e;const l=n||ca;l!==ca&&typeof a[0]!="number"&&(this.mixKeyframes=Wa(DP,qS(a[0],a[1])),a=[0,100]);const c=l({...e,keyframes:a});s==="mirror"&&(this.mirroredGenerator=l({...e,keyframes:[...a].reverse(),velocity:-o})),c.calculatedDuration===null&&(c.calculatedDuration=Tm(c));const{calculatedDuration:u}=c;this.calculatedDuration=u,this.resolvedDuration=u+r,this.totalDuration=this.resolvedDuration*(i+1)-r,this.generator=c}updateTime(e){const n=Math.round(e-this.startTime)*this.playbackSpeed;this.holdTime!==null?this.currentTime=this.holdTime:this.currentTime=n}tick(e,n=!1){const{generator:i,totalDuration:r,mixKeyframes:s,mirroredGenerator:o,resolvedDuration:a,calculatedDuration:l}=this;if(this.startTime===null)return i.next(0);const{delay:c=0,keyframes:u,repeat:d,repeatType:f,repeatDelay:p,type:m,onUpdate:E,finalKeyframe:g}=this.options;this.speed>0?this.startTime=Math.min(this.startTime,e):this.speed<0&&(this.startTime=Math.min(e-r/this.speed,this.startTime)),n?this.currentTime=e:this.updateTime(e);const h=this.currentTime-c*(this.playbackSpeed>=0?1:-1),x=this.playbackSpeed>=0?h<0:h>r;this.currentTime=Math.max(h,0),this.state==="finished"&&this.holdTime===null&&(this.currentTime=r);let S=this.currentTime,_=i;if(d){const y=Math.min(this.currentTime,r)/a;let C=Math.floor(y),P=y%1;!P&&y>=1&&(P=1),P===1&&C--,C=Math.min(C,d+1),!!(C%2)&&(f==="reverse"?(P=1-P,p&&(P-=p/a)):f==="mirror"&&(_=o)),S=Di(0,1,P)*a}let w;x?(this.delayState.value=u[0],w=this.delayState):w=_.next(S),s&&!x&&(w.value=s(w.value));let{done:b}=w;!x&&l!==null&&(b=this.playbackSpeed>=0?this.currentTime>=r:this.currentTime<=0);const A=this.holdTime===null&&(this.state==="finished"||this.state==="running"&&b);return A&&m!==Bh&&(w.value=Mu(u,this.options,g,this.speed)),E&&E(w.value),A&&this.finish(),w}then(e,n){return this.finished.then(e,n)}get duration(){return zn(this.calculatedDuration)}get iterationDuration(){const{delay:e=0}=this.options||{};return this.duration+zn(e)}get time(){return zn(this.currentTime)}set time(e){e=Wn(e),this.currentTime=e,this.startTime===null||this.holdTime!==null||this.playbackSpeed===0?this.holdTime=e:this.driver&&(this.startTime=this.driver.now()-e/this.playbackSpeed),this.driver?this.driver.start(!1):(this.startTime=0,this.state="paused",this.holdTime=e,this.tick(e))}getGeneratorVelocity(){const e=this.currentTime;if(e<=0)return this.options.velocity||0;if(this.generator.velocity)return this.generator.velocity(e);const n=this.generator.next(e).value;return CP(i=>this.generator.next(i).value,e,n)}get speed(){return this.playbackSpeed}set speed(e){const n=this.playbackSpeed!==e;n&&this.driver&&this.updateTime(cn.now()),this.playbackSpeed=e,n&&this.driver&&(this.time=zn(this.currentTime))}play(){var r,s;if(this.isStopped)return;const{driver:e=hP,startTime:n}=this.options;this.driver||(this.driver=e(o=>this.tick(o))),(s=(r=this.options).onPlay)==null||s.call(r);const i=this.driver.now();this.state==="finished"?(this.updateFinished(),this.startTime=i):this.holdTime!==null?this.startTime=i-this.holdTime:this.startTime||(this.startTime=n??i),this.state==="finished"&&this.speed<0&&(this.startTime+=this.calculatedDuration),this.holdTime=null,this.state="running",this.driver.start()}pause(){this.state="paused",this.updateTime(cn.now()),this.holdTime=this.currentTime}complete(){this.state!=="running"&&this.play(),this.state="finished",this.holdTime=null}finish(){var e,n;this.notifyFinished(),this.teardown(),this.state="finished",(n=(e=this.options).onComplete)==null||n.call(e)}cancel(){var e,n;this.holdTime=null,this.startTime=0,this.tick(0),this.teardown(),(n=(e=this.options).onCancel)==null||n.call(e)}teardown(){this.state="idle",this.stopDriver(),this.startTime=this.holdTime=null}stopDriver(){this.driver&&(this.driver.stop(),this.driver=void 0)}sample(e){return this.startTime=0,this.tick(e,!0)}attachTimeline(e){var n;return this.options.allowFlatten&&(this.options.type="keyframes",this.options.ease="linear",this.initAnimation()),(n=this.driver)==null||n.stop(),e.observe(this)}}function LP(t){for(let e=1;e<t.length;e++)t[e]??(t[e]=t[e-1])}const ns=t=>t*180/Math.PI,Vh=t=>{const e=ns(Math.atan2(t[1],t[0]));return zh(e)},IP={x:4,y:5,translateX:4,translateY:5,scaleX:0,scaleY:3,scale:t=>(Math.abs(t[0])+Math.abs(t[3]))/2,rotate:Vh,rotateZ:Vh,skewX:t=>ns(Math.atan(t[1])),skewY:t=>ns(Math.atan(t[2])),skew:t=>(Math.abs(t[1])+Math.abs(t[2]))/2},zh=t=>(t=t%360,t<0&&(t+=360),t),yx=Vh,_x=t=>Math.sqrt(t[0]*t[0]+t[1]*t[1]),Sx=t=>Math.sqrt(t[4]*t[4]+t[5]*t[5]),NP={x:12,y:13,z:14,translateX:12,translateY:13,translateZ:14,scaleX:_x,scaleY:Sx,scale:t=>(_x(t)+Sx(t))/2,rotateX:t=>zh(ns(Math.atan2(t[6],t[5]))),rotateY:t=>zh(ns(Math.atan2(-t[2],t[0]))),rotateZ:yx,rotate:yx,skewX:t=>ns(Math.atan(t[4])),skewY:t=>ns(Math.atan(t[1])),skew:t=>(Math.abs(t[1])+Math.abs(t[4]))/2};function Gh(t){return t.includes("scale")?1:0}function Hh(t,e){if(!t||t==="none")return Gh(e);const n=t.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);let i,r;if(n)i=NP,r=n;else{const a=t.match(/^matrix\(([-\d.e\s,]+)\)$/u);i=IP,r=a}if(!r)return Gh(e);const s=i[e],o=r[1].split(",").map(FP);return typeof s=="function"?s(o):o[s]}const UP=(t,e)=>{const{transform:n="none"}=getComputedStyle(t);return Hh(n,e)};function FP(t){return parseFloat(t.trim())}const Ao=["transformPerspective","x","y","z","translateX","translateY","translateZ","scale","scaleX","scaleY","rotate","rotateX","rotateY","rotateZ","skew","skewX","skewY"],bo=new Set([...Ao,"pathRotation"]),Mx=t=>t===wo||t===Me,kP=new Set(["x","y","z"]),OP=Ao.filter(t=>!kP.has(t));function BP(t){const e=[];return OP.forEach(n=>{const i=t.getValue(n);i!==void 0&&(e.push([n,i.get()]),i.set(n.startsWith("scale")?1:0))}),e}const yr={width:({x:t},{paddingLeft:e="0",paddingRight:n="0",boxSizing:i})=>{const r=t.max-t.min;return i==="border-box"?r:r-parseFloat(e)-parseFloat(n)},height:({y:t},{paddingTop:e="0",paddingBottom:n="0",boxSizing:i})=>{const r=t.max-t.min;return i==="border-box"?r:r-parseFloat(e)-parseFloat(n)},top:(t,{top:e})=>parseFloat(e),left:(t,{left:e})=>parseFloat(e),bottom:({y:t},{top:e})=>parseFloat(e)+(t.max-t.min),right:({x:t},{left:e})=>parseFloat(e)+(t.max-t.min),x:(t,{transform:e})=>Hh(e,"x"),y:(t,{transform:e})=>Hh(e,"y")};yr.translateX=yr.x;yr.translateY=yr.y;const ss=new Set;let Wh=!1,jh=!1,Xh=!1;function QS(){if(jh){const t=Array.from(ss).filter(i=>i.needsMeasurement),e=new Set(t.map(i=>i.element)),n=new Map;e.forEach(i=>{const r=BP(i);r.length&&(n.set(i,r),i.render())}),t.forEach(i=>i.measureInitialState()),e.forEach(i=>{i.render();const r=n.get(i);r&&r.forEach(([s,o])=>{var a;(a=i.getValue(s))==null||a.set(o)})}),t.forEach(i=>i.measureEndState()),t.forEach(i=>{i.suspendedScrollY!==void 0&&window.scrollTo(0,i.suspendedScrollY)})}jh=!1,Wh=!1,ss.forEach(t=>t.complete(Xh)),ss.clear()}function JS(){ss.forEach(t=>{t.readKeyframes(),t.needsMeasurement&&(jh=!0)})}function VP(){Xh=!0,JS(),QS(),Xh=!1}class Am{constructor(e,n,i,r,s,o=!1){this.state="pending",this.isAsync=!1,this.needsMeasurement=!1,this.unresolvedKeyframes=[...e],this.onComplete=n,this.name=i,this.motionValue=r,this.element=s,this.isAsync=o}scheduleResolve(){this.state="scheduled",this.isAsync?(ss.add(this),Wh||(Wh=!0,lt.read(JS),lt.resolveKeyframes(QS))):(this.readKeyframes(),this.complete())}readKeyframes(){const{unresolvedKeyframes:e,name:n,element:i,motionValue:r}=this;if(e[0]===null){const s=r==null?void 0:r.get(),o=e[e.length-1];if(s!==void 0)e[0]=s;else if(i&&n){const a=i.readValue(n,o);a!=null&&(e[0]=a)}e[0]===void 0&&(e[0]=o),r&&s===void 0&&r.set(e[0])}LP(e)}setFinalKeyframe(){}measureInitialState(){}renderEndStyles(){}measureEndState(){}complete(e=!1){this.state="complete",this.onComplete(this.unresolvedKeyframes,this.finalKeyframe,e),ss.delete(this)}cancel(){this.state==="scheduled"&&(ss.delete(this),this.state="pending")}resume(){this.state==="pending"&&this.scheduleResolve()}}const zP=t=>t.startsWith("--");function e1(t,e,n){zP(e)?t.style.setProperty(e,n):t.style[e]=n}const GP={};function t1(t,e){const n=RS(t);return()=>GP[e]??n()}const HP=t1(()=>window.ScrollTimeline!==void 0,"scrollTimeline"),n1=t1(()=>{try{document.createElement("div").animate({opacity:0},{easing:"linear(0, 1)"})}catch{return!1}return!0},"linearEasing"),Qo=([t,e,n,i])=>`cubic-bezier(${t}, ${e}, ${n}, ${i})`,Ex={linear:"linear",ease:"ease",easeIn:"ease-in",easeOut:"ease-out",easeInOut:"ease-in-out",circIn:Qo([0,.65,.55,1]),circOut:Qo([.55,0,1,.45]),backIn:Qo([.31,.01,.66,-.59]),backOut:Qo([.33,1.53,.69,.99])};function i1(t,e){if(t)return typeof t=="function"?n1()?KS(t,e):"ease-out":VS(t)?Qo(t):Array.isArray(t)?t.map(n=>i1(n,e)||Ex.easeOut):Ex[t]}function WP(t,e,n,{delay:i=0,duration:r=300,repeat:s=0,repeatType:o="loop",ease:a="easeOut",times:l}={},c=void 0){const u={[e]:n};l&&(u.offset=l);const d=i1(a,r);Array.isArray(d)&&(u.easing=d);const f={delay:i,duration:r,easing:Array.isArray(d)?"linear":d,fill:"both",iterations:s+1,direction:o==="reverse"?"alternate":"normal"};return c&&(f.pseudoElement=c),t.animate(u,f)}function r1(t){return typeof t=="function"&&"applyToOptions"in t}function jP({type:t,...e}){return r1(t)&&n1()?t.applyToOptions(e):(e.duration??(e.duration=300),e.ease??(e.ease="easeOut"),e)}class s1 extends wm{constructor(e){if(super(),this.finishedTime=null,this.isStopped=!1,this.manualStartTime=null,!e)return;const{element:n,name:i,keyframes:r,pseudoElement:s,allowFlatten:o=!1,finalKeyframe:a,onComplete:l}=e;this.isPseudoElement=!!s,this.allowFlatten=o,this.options=e,Su(typeof e.type!="string");const c=jP(e);this.animation=WP(n,i,r,c,s),c.autoplay===!1&&this.animation.pause(),this.animation.onfinish=()=>{if(this.finishedTime=this.time,!s){const u=Mu(r,this.options,a,this.speed);this.updateMotionValue&&this.updateMotionValue(u),e1(n,i,u),this.animation.cancel()}l==null||l(),this.notifyFinished()}}play(){this.isStopped||(this.manualStartTime=null,this.animation.play(),this.state==="finished"&&this.updateFinished())}pause(){this.animation.pause()}complete(){var e,n;(n=(e=this.animation).finish)==null||n.call(e)}cancel(){try{this.animation.cancel()}catch{}}stop(){if(this.isStopped)return;this.isStopped=!0;const{state:e}=this;e==="idle"||e==="finished"||(this.updateMotionValue?this.updateMotionValue():this.commitStyles(),this.isPseudoElement||this.cancel())}commitStyles(){var n,i,r;const e=(n=this.options)==null?void 0:n.element;!this.isPseudoElement&&(e!=null&&e.isConnected)&&((r=(i=this.animation).commitStyles)==null||r.call(i))}get duration(){var n,i;const e=((i=(n=this.animation.effect)==null?void 0:n.getComputedTiming)==null?void 0:i.call(n).duration)||0;return zn(Number(e))}get iterationDuration(){const{delay:e=0}=this.options||{};return this.duration+zn(e)}get time(){return zn(Number(this.animation.currentTime)||0)}set time(e){const n=this.finishedTime!==null;this.manualStartTime=null,this.finishedTime=null,this.animation.currentTime=Wn(e),n&&this.animation.pause()}get speed(){return this.animation.playbackRate}set speed(e){e<0&&(this.finishedTime=null),this.animation.playbackRate=e}get state(){return this.finishedTime!==null?"finished":this.animation.playState}get startTime(){return this.manualStartTime??Number(this.animation.startTime)}set startTime(e){this.manualStartTime=this.animation.startTime=e}attachTimeline({timeline:e,rangeStart:n,rangeEnd:i,observe:r}){var s;return this.allowFlatten&&((s=this.animation.effect)==null||s.updateTiming({easing:"linear"})),this.animation.onfinish=null,e&&HP()?(this.animation.timeline=e,n&&(this.animation.rangeStart=n),i&&(this.animation.rangeEnd=i),Hn):r(this)}}const o1={anticipate:FS,backInOut:US,circInOut:OS};function XP(t){return t in o1}function YP(t){typeof t.ease=="string"&&XP(t.ease)&&(t.ease=o1[t.ease])}const zf=10;class $P extends s1{constructor(e){YP(e),ZS(e),super(e),e.startTime!==void 0&&e.autoplay!==!1&&(this.startTime=e.startTime),this.options=e}updateMotionValue(e){const{motionValue:n,onUpdate:i,onComplete:r,element:s,...o}=this.options;if(!n)return;if(e!==void 0){n.set(e);return}const a=new Yc({...o,autoplay:!1}),l=Math.max(zf,cn.now()-this.startTime),c=Di(0,zf,l-zf),u=a.sample(l).value,{name:d}=this.options;s&&d&&e1(s,d,u),n.setWithVelocity(a.sample(Math.max(0,l-c)).value,u,c),a.stop()}}const Tx=(t,e)=>e==="zIndex"?!1:!!(typeof t=="number"||Array.isArray(t)||typeof t=="string"&&(ai.test(t)||t==="0")&&!t.startsWith("url("));function qP(t){const e=t[0];if(t.length===1)return!0;for(let n=0;n<t.length;n++)if(t[n]!==e)return!0}function KP(t,e,n,i){const r=t[0];if(r===null)return!1;if(e==="display"||e==="visibility")return!0;const s=t[t.length-1],o=Tx(r,e),a=Tx(s,e);return!o||!a?!1:qP(t)||(n==="spring"||r1(n))&&i}function Yh(t){t.duration=0,t.type="keyframes"}const a1=new Set(["opacity","clipPath","filter","transform","backgroundColor"]),ZP=/^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;function QP(t){for(let e=0;e<t.length;e++)if(typeof t[e]=="string"&&ZP.test(t[e]))return!0;return!1}const JP=new Set(["color","backgroundColor","outlineColor","fill","stroke","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"]),eD=RS(()=>Object.hasOwnProperty.call(Element.prototype,"animate"));function tD(t){var d;const{motionValue:e,name:n,repeatDelay:i,repeatType:r,damping:s,type:o,keyframes:a}=t,l=(d=e==null?void 0:e.owner)==null?void 0:d.current;if(!(l instanceof HTMLElement)&&!(l instanceof SVGElement))return!1;const{onUpdate:c,transformTemplate:u}=e.owner.getProps();return eD()&&n&&(a1.has(n)||JP.has(n)&&QP(a))&&(n!=="transform"||!u)&&!c&&!i&&r!=="mirror"&&s!==0&&o!=="inertia"}const nD=40;class iD extends wm{constructor({autoplay:e=!0,delay:n=0,type:i="keyframes",repeat:r=0,repeatDelay:s=0,repeatType:o="loop",keyframes:a,name:l,motionValue:c,element:u,...d}){var m;super(),this.stop=()=>{var E,g;this._animation&&(this._animation.stop(),(E=this.stopTimeline)==null||E.call(this)),(g=this.keyframeResolver)==null||g.cancel()},this.createdAt=cn.now();const f={autoplay:e,delay:n,type:i,repeat:r,repeatDelay:s,repeatType:o,name:l,motionValue:c,element:u,...d},p=(u==null?void 0:u.KeyframeResolver)||Am;this.keyframeResolver=new p(a,(E,g,h)=>this.onKeyframesResolved(E,g,f,!h),l,c,u),(m=this.keyframeResolver)==null||m.scheduleResolve()}onKeyframesResolved(e,n,i,r){var h,x;this.keyframeResolver=void 0;const{name:s,type:o,velocity:a,delay:l,isHandoff:c,onUpdate:u}=i;this.resolvedAt=cn.now();let d=!0;KP(e,s,o,a)||(d=!1,(Dr.instantAnimations||!l)&&(u==null||u(Mu(e,i,n))),e[0]=e[e.length-1],Yh(i),i.repeat=0);const p={startTime:r?this.resolvedAt?this.resolvedAt-this.createdAt>nD?this.resolvedAt:this.createdAt:this.createdAt:void 0,finalKeyframe:n,...i,keyframes:e},m=d&&!c&&tD(p),E=(x=(h=p.motionValue)==null?void 0:h.owner)==null?void 0:x.current;let g;if(m)try{g=new $P({...p,element:E})}catch{g=new Yc(p)}else g=new Yc(p);g.finished.then(()=>{this.notifyFinished()}).catch(Hn),this.pendingTimeline&&(this.stopTimeline=g.attachTimeline(this.pendingTimeline),this.pendingTimeline=void 0),this._animation=g}get finished(){return this._animation?this.animation.finished:this._finished}then(e,n){return this.finished.finally(e).then(()=>{})}get animation(){var e;return this._animation||((e=this.keyframeResolver)==null||e.resume(),VP()),this._animation}get duration(){return this.animation.duration}get iterationDuration(){return this.animation.iterationDuration}get time(){return this.animation.time}set time(e){this.animation.time=e}get speed(){return this.animation.speed}get state(){return this.animation.state}set speed(e){this.animation.speed=e}get startTime(){return this.animation.startTime}attachTimeline(e){return this._animation?this.stopTimeline=this.animation.attachTimeline(e):this.pendingTimeline=e,()=>this.stop()}play(){this.animation.play()}pause(){this.animation.pause()}complete(){this.animation.complete()}cancel(){var e;this._animation&&this.animation.cancel(),(e=this.keyframeResolver)==null||e.cancel()}}function l1(t,e,n,i=0,r=1){const s=Array.from(t).sort((c,u)=>c.sortNodePosition(u)).indexOf(e),o=t.size,a=(o-1)*i;return typeof n=="function"?n(s,o):r===1?s*i:a-s*i}const wx=30,rD=t=>!isNaN(parseFloat(t));class sD{constructor(e,n={}){this.canTrackVelocity=null,this.events={},this.updateAndNotify=i=>{var s;const r=cn.now();if(this.updatedAt!==r&&this.setPrevFrameValue(),this.prev=this.current,this.setCurrent(i),this.current!==this.prev&&((s=this.events.change)==null||s.notify(this.current),this.dependents))for(const o of this.dependents)o.dirty()},this.hasAnimated=!1,this.setCurrent(e),this.owner=n.owner}setCurrent(e){this.current=e,this.updatedAt=cn.now(),this.canTrackVelocity===null&&e!==void 0&&(this.canTrackVelocity=rD(this.current))}setPrevFrameValue(e=this.current){this.prevFrameValue=e,this.prevUpdatedAt=this.updatedAt}onChange(e){return this.on("change",e)}on(e,n){this.events[e]||(this.events[e]=new gm);const i=this.events[e].add(n);return e==="change"?()=>{i(),lt.read(()=>{this.events.change.getSize()||this.stop()})}:i}clearListeners(){for(const e in this.events)this.events[e].clear()}attach(e,n){this.passiveEffect=e,this.stopPassiveEffect=n}set(e){this.passiveEffect?this.passiveEffect(e,this.updateAndNotify):this.updateAndNotify(e)}setWithVelocity(e,n,i){this.set(n),this.prev=void 0,this.prevFrameValue=e,this.prevUpdatedAt=this.updatedAt-i}jump(e,n=!0){this.updateAndNotify(e),this.prev=e,this.prevUpdatedAt=this.prevFrameValue=void 0,n&&this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}dirty(){var e;(e=this.events.change)==null||e.notify(this.current)}addDependent(e){this.dependents||(this.dependents=new Set),this.dependents.add(e)}removeDependent(e){this.dependents&&this.dependents.delete(e)}get(){return this.current}getPrevious(){return this.prev}getVelocity(){const e=cn.now();if(!this.canTrackVelocity||this.prevFrameValue===void 0||e-this.updatedAt>wx)return 0;const n=Math.min(this.updatedAt-this.prevUpdatedAt,wx);return PS(parseFloat(this.current)-parseFloat(this.prevFrameValue),n)}start(e){return this.stop(),new Promise(n=>{this.hasAnimated=!0,this.animation=e(n),this.events.animationStart&&this.events.animationStart.notify()}).then(()=>{this.events.animationComplete&&this.events.animationComplete.notify(),this.clearAnimation()})}stop(){this.animation&&(this.animation.stop(),this.events.animationCancel&&this.events.animationCancel.notify()),this.clearAnimation()}isAnimating(){return!!this.animation}clearAnimation(){delete this.animation}destroy(){var e,n;(e=this.dependents)==null||e.clear(),(n=this.events.destroy)==null||n.notify(),this.clearListeners(),this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}}function yo(t,e){return new sD(t,e)}function c1(t,e){if(t!=null&&t.inherit&&e){const{inherit:n,...i}=t;return{...e,...i}}return t}function bm(t,e){const n=(t==null?void 0:t[e])??(t==null?void 0:t.default)??t;return n!==t?c1(n,t):n}const oD={type:"spring",stiffness:500,damping:25,restSpeed:10},aD=t=>({type:"spring",stiffness:550,damping:t===0?2*Math.sqrt(550):30,restSpeed:10}),lD={type:"keyframes",duration:.8},cD={type:"keyframes",ease:[.25,.1,.35,1],duration:.3},uD=(t,{keyframes:e})=>e.length>2?lD:bo.has(t)?t.startsWith("scale")?aD(e[1]):oD:cD,fD=new Set(["when","delay","delayChildren","staggerChildren","staggerDirection","repeat","repeatType","repeatDelay","from","elapsed"]);function dD(t){for(const e in t)if(!fD.has(e))return!0;return!1}const Cm=(t,e,n,i={},r,s)=>o=>{const a=bm(i,t)||{},l=a.delay||i.delay||0;let{elapsed:c=0}=i;c=c-Wn(l);const u={keyframes:Array.isArray(n)?n:[null,n],ease:"easeOut",velocity:e.getVelocity(),...a,delay:-c,onUpdate:f=>{e.set(f),a.onUpdate&&a.onUpdate(f)},onComplete:()=>{o(),a.onComplete&&a.onComplete()},name:t,motionValue:e,element:s?void 0:r};dD(a)||Object.assign(u,uD(t,u)),u.duration&&(u.duration=Wn(u.duration)),u.repeatDelay&&(u.repeatDelay=Wn(u.repeatDelay)),u.from!==void 0&&(u.keyframes[0]=u.from);let d=!1;if((u.type===!1||u.duration===0&&!u.repeatDelay)&&(Yh(u),u.delay===0&&(d=!0)),(Dr.instantAnimations||Dr.skipAnimations||r!=null&&r.shouldSkipAnimations||a.skipAnimations)&&(d=!0,Yh(u),u.delay=0),u.allowFlatten=!a.type&&!a.ease,d&&!s&&e.get()!==void 0){const f=Mu(u.keyframes,a);if(f!==void 0){lt.update(()=>{u.onUpdate(f),u.onComplete()});return}}return a.isSync?new Yc(u):new iD(u)},hD=/^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;function pD(t){const e=hD.exec(t);if(!e)return[,];const[,n,i,r]=e;return[`--${n??i}`,r]}function u1(t,e,n=1){const[i,r]=pD(t);if(!i)return;const s=window.getComputedStyle(e).getPropertyValue(i);if(s){const o=s.trim();return AS(o)?parseFloat(o):o}return ym(r)?u1(r,e,n+1):r}function Ax(t){const e=[{},{}];return t==null||t.values.forEach((n,i)=>{e[0][i]=n.get(),e[1][i]=n.getVelocity()}),e}function Rm(t,e,n,i){if(typeof e=="function"){const[r,s]=Ax(i);e=e(n!==void 0?n:t.custom,r,s)}if(typeof e=="string"&&(e=t.variants&&t.variants[e]),typeof e=="function"){const[r,s]=Ax(i);e=e(n!==void 0?n:t.custom,r,s)}return e}function os(t,e,n){const i=t.getProps();return Rm(i,e,n!==void 0?n:i.custom,t)}const f1=new Set(["width","height","top","left","right","bottom",...Ao]),$h=t=>Array.isArray(t);function mD(t,e,n){t.hasValue(e)?t.getValue(e).set(n):t.addValue(e,yo(n))}function gD(t){return $h(t)?t[t.length-1]||0:t}function xD(t,e){const n=os(t,e);let{transitionEnd:i={},transition:r={},...s}=n||{};s={...s,...i};for(const o in s){const a=gD(s[o]);mD(t,o,a)}}const $t=t=>!!(t&&t.getVelocity);function vD(t){return!!($t(t)&&t.add)}function qh(t,e){const n=t.getValue("willChange");if(vD(n))return n.add(e);if(!n&&Dr.WillChange){const i=new Dr.WillChange("auto");t.addValue("willChange",i),i.add(e)}}function Pm(t){return t.replace(/([A-Z])/g,e=>`-${e.toLowerCase()}`)}const yD="framerAppearId",d1="data-"+Pm(yD);function h1(t){return t.props[d1]}const _D=typeof window<"u";function SD({protectedKeys:t,needsAnimating:e},n){const i=t.hasOwnProperty(n)&&e[n]!==!0;return e[n]=!1,i}function p1(t,e,{delay:n=0,transitionOverride:i,type:r}={}){let{transition:s,transitionEnd:o,...a}=e;const l=t.getDefaultTransition();s=s?c1(s,l):l;const c=s==null?void 0:s.reduceMotion,u=s==null?void 0:s.skipAnimations;i&&(s=i);const d=[],f=r&&t.animationState&&t.animationState.getState()[r],p=s==null?void 0:s.path;p&&p.animateVisualElement(t,a,s,n,d);for(const m in a){const E=t.getValue(m,t.latestValues[m]??null),g=a[m];if(g===void 0||f&&SD(f,m))continue;const h={delay:n,...bm(s||{},m)};u&&(h.skipAnimations=!0);const x=E.get();if(x!==void 0&&!E.isAnimating()&&!Array.isArray(g)&&g===x&&!h.velocity){lt.update(()=>E.set(g));continue}let S=!1;if(_D&&window.MotionHandoffAnimation){const b=h1(t);if(b){const A=window.MotionHandoffAnimation(b,m,lt);A!==null&&(h.startTime=A,S=!0)}}qh(t,m);const _=c??t.shouldReduceMotion;E.start(Cm(m,E,g,_&&f1.has(m)?{type:!1}:h,t,S));const w=E.animation;w&&d.push(w)}if(o){const m=()=>lt.update(()=>{o&&xD(t,o)});d.length?Promise.all(d).then(m):m()}return d}function Kh(t,e,n={}){var l;const i=os(t,e,n.type==="exit"?(l=t.presenceContext)==null?void 0:l.custom:void 0);let{transition:r=t.getDefaultTransition()||{}}=i||{};n.transitionOverride&&(r=n.transitionOverride);const s=i?()=>Promise.all(p1(t,i,n)):()=>Promise.resolve(),o=t.variantChildren&&t.variantChildren.size?(c=0)=>{const{delayChildren:u=0,staggerChildren:d,staggerDirection:f}=r;return MD(t,e,c,u,d,f,n)}:()=>Promise.resolve(),{when:a}=r;if(a){const[c,u]=a==="beforeChildren"?[s,o]:[o,s];return c().then(()=>u())}else return Promise.all([s(),o(n.delay)])}function MD(t,e,n=0,i=0,r=0,s=1,o){const a=[];for(const l of t.variantChildren)l.notify("AnimationStart",e),a.push(Kh(l,e,{...o,delay:n+(typeof i=="function"?0:i)+l1(t.variantChildren,l,i,r,s)}).then(()=>l.notify("AnimationComplete",e)));return Promise.all(a)}function ED(t,e,n={}){t.notify("AnimationStart",e);let i;if(Array.isArray(e)){const r=e.map(s=>Kh(t,s,n));i=Promise.all(r)}else if(typeof e=="string")i=Kh(t,e,n);else{const r=typeof e=="function"?os(t,e,n.custom):e;i=Promise.all(p1(t,r,n))}return i.then(()=>{t.notify("AnimationComplete",e)})}const TD={test:t=>t==="auto",parse:t=>t},m1=t=>e=>e.test(t),g1=[wo,Me,bi,ki,$3,Y3,TD],bx=t=>g1.find(m1(t));function wD(t){return typeof t=="number"?t===0:t!==null?t==="none"||t==="0"||CS(t):!0}const AD=new Set(["brightness","contrast","saturate","opacity"]);function bD(t){const[e,n]=t.slice(0,-1).split("(");if(e==="drop-shadow")return t;const[i]=n.match(_m)||[];if(!i)return t;const r=n.replace(i,"");let s=AD.has(e)?1:0;return i!==n&&(s*=100),e+"("+s+r+")"}const CD=/\b([a-z-]*)\(.*?\)/gu,Zh={...ai,getAnimatableNone:t=>{const e=t.match(CD);return e?e.map(bD).join(" "):t}},Qh={...ai,getAnimatableNone:t=>{const e=ai.parse(t);return ai.createTransformer(t)(e.map(i=>typeof i=="number"?0:typeof i=="object"?{...i,alpha:1}:i))}},Cx={...wo,transform:Math.round},RD={rotate:ki,pathRotation:ki,rotateX:ki,rotateY:ki,rotateZ:ki,scale:Ol,scaleX:Ol,scaleY:Ol,scaleZ:Ol,skew:ki,skewX:ki,skewY:ki,distance:Me,translateX:Me,translateY:Me,translateZ:Me,x:Me,y:Me,z:Me,perspective:Me,transformPerspective:Me,opacity:La,originX:px,originY:px,originZ:Me},$c={borderWidth:Me,borderTopWidth:Me,borderRightWidth:Me,borderBottomWidth:Me,borderLeftWidth:Me,borderRadius:Me,borderTopLeftRadius:Me,borderTopRightRadius:Me,borderBottomRightRadius:Me,borderBottomLeftRadius:Me,width:Me,maxWidth:Me,height:Me,maxHeight:Me,top:Me,right:Me,bottom:Me,left:Me,inset:Me,insetBlock:Me,insetBlockStart:Me,insetBlockEnd:Me,insetInline:Me,insetInlineStart:Me,insetInlineEnd:Me,padding:Me,paddingTop:Me,paddingRight:Me,paddingBottom:Me,paddingLeft:Me,paddingBlock:Me,paddingBlockStart:Me,paddingBlockEnd:Me,paddingInline:Me,paddingInlineStart:Me,paddingInlineEnd:Me,margin:Me,marginTop:Me,marginRight:Me,marginBottom:Me,marginLeft:Me,marginBlock:Me,marginBlockStart:Me,marginBlockEnd:Me,marginInline:Me,marginInlineStart:Me,marginInlineEnd:Me,fontSize:Me,backgroundPositionX:Me,backgroundPositionY:Me,...RD,zIndex:Cx,fillOpacity:La,strokeOpacity:La,numOctaves:Cx},PD={...$c,color:Lt,backgroundColor:Lt,outlineColor:Lt,fill:Lt,stroke:Lt,borderColor:Lt,borderTopColor:Lt,borderRightColor:Lt,borderBottomColor:Lt,borderLeftColor:Lt,filter:Zh,WebkitFilter:Zh,mask:Qh,WebkitMask:Qh},x1=t=>PD[t],DD=new Set([Zh,Qh]);function v1(t,e){let n=x1(t);return DD.has(n)||(n=ai),n.getAnimatableNone?n.getAnimatableNone(e):void 0}const LD=new Set(["auto","none","0"]);function ID(t,e,n){let i=0,r;for(;i<t.length&&!r;){const s=t[i];typeof s=="string"&&!LD.has(s)&&vo(s).values.length&&(r=t[i]),i++}if(r&&n)for(const s of e)t[s]=v1(n,r)}class ND extends Am{constructor(e,n,i,r,s){super(e,n,i,r,s,!0)}readKeyframes(){const{unresolvedKeyframes:e,element:n,name:i}=this;if(!n||!n.current)return;super.readKeyframes();for(let u=0;u<e.length;u++){let d=e[u];if(typeof d=="string"&&(d=d.trim(),ym(d))){const f=u1(d,n.current);f!==void 0&&(e[u]=f),u===e.length-1&&(this.finalKeyframe=d)}}if(this.resolveNoneKeyframes(),!f1.has(i)||e.length!==2)return;const[r,s]=e,o=bx(r),a=bx(s),l=hx(r),c=hx(s);if(l!==c&&yr[i]){this.needsMeasurement=!0;return}if(o!==a)if(Mx(o)&&Mx(a))for(let u=0;u<e.length;u++){const d=e[u];typeof d=="string"&&(e[u]=parseFloat(d))}else yr[i]&&(this.needsMeasurement=!0)}resolveNoneKeyframes(){const{unresolvedKeyframes:e,name:n}=this,i=[];for(let r=0;r<e.length;r++)(e[r]===null||wD(e[r]))&&i.push(r);i.length&&ID(e,i,n)}measureInitialState(){const{element:e,unresolvedKeyframes:n,name:i}=this;if(!e||!e.current)return;i==="height"&&(this.suspendedScrollY=window.pageYOffset),this.measuredOrigin=yr[i](e.measureViewportBox(),window.getComputedStyle(e.current)),n[0]=this.measuredOrigin;const r=n[n.length-1];r!==void 0&&e.getValue(i,r).jump(r,!1)}measureEndState(){var a;const{element:e,name:n,unresolvedKeyframes:i}=this;if(!e||!e.current)return;const r=e.getValue(n);r&&r.jump(this.measuredOrigin,!1);const s=i.length-1,o=i[s];i[s]=yr[n](e.measureViewportBox(),window.getComputedStyle(e.current)),o!==null&&this.finalKeyframe===void 0&&(this.finalKeyframe=o),(a=this.removedTransforms)!=null&&a.length&&this.removedTransforms.forEach(([l,c])=>{e.getValue(l).set(c)}),this.resolveNoneKeyframes()}}const Dm=["borderTopLeftRadius","borderTopRightRadius","borderBottomRightRadius","borderBottomLeftRadius"];function y1(t,e,n){if(t==null)return[];if(t instanceof EventTarget)return[t];if(typeof t=="string"){let i=document;const r=(n==null?void 0:n[t])??i.querySelectorAll(t);return r?Array.from(r):[]}return Array.from(t).filter(i=>i!=null)}const Jh=(t,e)=>e&&typeof t=="number"?e.transform(t):t;function UD(t){return bS(t)&&"offsetHeight"in t&&!("ownerSVGElement"in t)}const{schedule:Lm}=zS(queueMicrotask,!1),Jn={x:!1,y:!1};function _1(){return Jn.x||Jn.y}function FD(t){return t==="x"||t==="y"?Jn[t]?null:(Jn[t]=!0,()=>{Jn[t]=!1}):Jn.x||Jn.y?null:(Jn.x=Jn.y=!0,()=>{Jn.x=Jn.y=!1})}function S1(t,e){const n=y1(t),i=new AbortController,r={passive:!0,...e,signal:i.signal};return[n,r,()=>i.abort()]}function kD(t){return!(t.pointerType==="touch"||_1())}function OD(t,e,n={}){const[i,r,s]=S1(t,n);return i.forEach(o=>{let a=!1,l=!1,c;const u=()=>{o.removeEventListener("pointerleave",m)},d=g=>{c&&(c(g),c=void 0),u()},f=g=>{a=!1,window.removeEventListener("pointerup",f),window.removeEventListener("pointercancel",f),l&&(l=!1,d(g))},p=()=>{a=!0,window.addEventListener("pointerup",f,r),window.addEventListener("pointercancel",f,r)},m=g=>{if(g.pointerType!=="touch"){if(a){l=!0;return}d(g)}},E=g=>{if(!kD(g))return;l=!1;const h=e(o,g);typeof h=="function"&&(c=h,o.addEventListener("pointerleave",m,r))};o.addEventListener("pointerenter",E,r),o.addEventListener("pointerdown",p,r)}),s}const M1=(t,e)=>e?t===e?!0:M1(t,e.parentElement):!1,Im=t=>t.pointerType==="mouse"?typeof t.button!="number"||t.button<=0:t.isPrimary!==!1,BD=new Set(["BUTTON","INPUT","SELECT","TEXTAREA","A"]);function VD(t){return BD.has(t.tagName)||t.isContentEditable===!0}const zD=new Set(["INPUT","SELECT","TEXTAREA"]);function GD(t){return zD.has(t.tagName)||t.isContentEditable===!0}const oc=new WeakSet;function Rx(t){return e=>{e.key==="Enter"&&t(e)}}function Gf(t,e){t.dispatchEvent(new PointerEvent("pointer"+e,{isPrimary:!0,bubbles:!0}))}const HD=(t,e)=>{const n=t.currentTarget;if(!n)return;const i=Rx(()=>{if(oc.has(n))return;Gf(n,"down");const r=Rx(()=>{Gf(n,"up")}),s=()=>Gf(n,"cancel");n.addEventListener("keyup",r,e),n.addEventListener("blur",s,e)});n.addEventListener("keydown",i,e),n.addEventListener("blur",()=>n.removeEventListener("keydown",i),e)};function Px(t){return Im(t)&&!_1()}const Dx=new WeakSet;function WD(t,e,n={}){const[i,r,s]=S1(t,n),o=a=>{const l=a.currentTarget;if(!Px(a)||Dx.has(a))return;oc.add(l),n.stopPropagation&&Dx.add(a);const c=e(l,a),u={...r,capture:!0},d=(m,E)=>{window.removeEventListener("pointerup",f,u),window.removeEventListener("pointercancel",p,u),oc.has(l)&&oc.delete(l),Px(m)&&typeof c=="function"&&c(m,{success:E})},f=m=>{d(m,l===window||l===document||n.useGlobalTarget||M1(l,m.target))},p=m=>{d(m,!1)};window.addEventListener("pointerup",f,u),window.addEventListener("pointercancel",p,u)};return i.forEach(a=>{(n.useGlobalTarget?window:a).addEventListener("pointerdown",o,r),UD(a)&&(a.addEventListener("focus",c=>HD(c,r)),!VD(a)&&!a.hasAttribute("tabindex")&&(a.tabIndex=0))}),s}function Nm(t){return bS(t)&&"ownerSVGElement"in t}const ac=new WeakMap;let ur;const E1=(t,e,n)=>(i,r)=>r&&r[0]?r[0][t+"Size"]:Nm(i)&&"getBBox"in i?i.getBBox()[e]:i[n],jD=E1("inline","width","offsetWidth"),XD=E1("block","height","offsetHeight");function YD({target:t,borderBoxSize:e}){var n;(n=ac.get(t))==null||n.forEach(i=>{i(t,{get width(){return jD(t,e)},get height(){return XD(t,e)}})})}function $D(t){t.forEach(YD)}function qD(){typeof ResizeObserver>"u"||(ur=new ResizeObserver($D))}function KD(t,e){ur||qD();const n=y1(t);return n.forEach(i=>{let r=ac.get(i);r||(r=new Set,ac.set(i,r)),r.add(e),ur==null||ur.observe(i)}),()=>{n.forEach(i=>{const r=ac.get(i);r==null||r.delete(e),r!=null&&r.size||ur==null||ur.unobserve(i)})}}const lc=new Set;let qs;function ZD(){qs=()=>{const t={get width(){return window.innerWidth},get height(){return window.innerHeight}};lc.forEach(e=>e(t))},window.addEventListener("resize",qs)}function QD(t){return lc.add(t),qs||ZD(),()=>{lc.delete(t),!lc.size&&typeof qs=="function"&&(window.removeEventListener("resize",qs),qs=void 0)}}function Lx(t,e){return typeof t=="function"?QD(t):KD(t,e)}function JD(t){return Nm(t)&&t.tagName==="svg"}const eL=[...g1,Lt,ai],tL=t=>eL.find(m1(t)),Ix=()=>({translate:0,scale:1,origin:0,originPoint:0}),Ks=()=>({x:Ix(),y:Ix()}),Nx=()=>({min:0,max:0}),Ut=()=>({x:Nx(),y:Nx()}),nL=new WeakMap;function Eu(t){return t!==null&&typeof t=="object"&&typeof t.start=="function"}function Ia(t){return typeof t=="string"||Array.isArray(t)}const Um=["animate","whileInView","whileFocus","whileHover","whileTap","whileDrag","exit"],Fm=["initial",...Um];function Tu(t){return Eu(t.animate)||Fm.some(e=>Ia(t[e]))}function T1(t){return!!(Tu(t)||t.variants)}function iL(t,e,n){for(const i in e){const r=e[i],s=n[i];if($t(r))t.addValue(i,r);else if($t(s))t.addValue(i,yo(r,{owner:t}));else if(s!==r)if(t.hasValue(i)){const o=t.getValue(i);o.liveStyle===!0?o.jump(r):o.hasAnimated||o.set(r)}else{const o=t.getStaticValue(i);t.addValue(i,yo(o!==void 0?o:r,{owner:t}))}}for(const i in n)e[i]===void 0&&t.removeValue(i);return e}const ep={current:null},w1={current:!1},rL=typeof window<"u";function sL(){if(w1.current=!0,!!rL)if(window.matchMedia){const t=window.matchMedia("(prefers-reduced-motion)"),e=()=>ep.current=t.matches;t.addEventListener("change",e),e()}else ep.current=!1}const Ux=["AnimationStart","AnimationComplete","Update","BeforeLayoutMeasure","LayoutMeasure","LayoutAnimationStart","LayoutAnimationComplete"];let qc={};function A1(t){qc=t}function oL(){return qc}class aL{scrapeMotionValuesFromProps(e,n,i){return{}}constructor({parent:e,props:n,presenceContext:i,reducedMotionConfig:r,skipAnimations:s,blockInitialAnimation:o,visualState:a},l={}){this.current=null,this.children=new Set,this.isVariantNode=!1,this.isControllingVariants=!1,this.shouldReduceMotion=null,this.shouldSkipAnimations=!1,this.values=new Map,this.KeyframeResolver=Am,this.features={},this.valueSubscriptions=new Map,this.prevMotionValues={},this.hasBeenMounted=!1,this.events={},this.propEventSubscriptions={},this.notifyUpdate=()=>this.notify("Update",this.latestValues),this.render=()=>{this.current&&(this.triggerBuild(),this.renderInstance(this.current,this.renderState,this.props.style,this.projection))},this.renderScheduledAt=0,this.scheduleRender=()=>{const p=cn.now();this.renderScheduledAt<p&&(this.renderScheduledAt=p,lt.render(this.render,!1,!0))};const{latestValues:c,renderState:u}=a;this.latestValues=c,this.baseTarget={...c},this.initialValues=n.initial?{...c}:{},this.renderState=u,this.parent=e,this.props=n,this.presenceContext=i,this.depth=e?e.depth+1:0,this.reducedMotionConfig=r,this.skipAnimationsConfig=s,this.options=l,this.blockInitialAnimation=!!o,this.isControllingVariants=Tu(n),this.isVariantNode=T1(n),this.isVariantNode&&(this.variantChildren=new Set),this.manuallyAnimateOnMount=!!(e&&e.current);const{willChange:d,...f}=this.scrapeMotionValuesFromProps(n,{},this);for(const p in f){const m=f[p];c[p]!==void 0&&$t(m)&&m.set(c[p])}}mount(e){var n,i;if(this.hasBeenMounted)for(const r in this.initialValues)(n=this.values.get(r))==null||n.jump(this.initialValues[r]),this.latestValues[r]=this.initialValues[r];this.current=e,nL.set(e,this),this.projection&&!this.projection.instance&&this.projection.mount(e),this.parent&&this.isVariantNode&&!this.isControllingVariants&&(this.removeFromVariantTree=this.parent.addVariantChild(this)),this.values.forEach((r,s)=>this.bindToMotionValue(s,r)),this.reducedMotionConfig==="never"?this.shouldReduceMotion=!1:this.reducedMotionConfig==="always"?this.shouldReduceMotion=!0:(w1.current||sL(),this.shouldReduceMotion=ep.current),this.shouldSkipAnimations=this.skipAnimationsConfig??!1,(i=this.parent)==null||i.addChild(this),this.update(this.props,this.presenceContext),this.hasBeenMounted=!0}unmount(){var e;this.projection&&this.projection.unmount(),Lr(this.notifyUpdate),Lr(this.render),this.valueSubscriptions.forEach(n=>n()),this.valueSubscriptions.clear(),this.removeFromVariantTree&&this.removeFromVariantTree(),(e=this.parent)==null||e.removeChild(this);for(const n in this.events)this.events[n].clear();for(const n in this.features){const i=this.features[n];i&&(i.unmount(),i.isMounted=!1)}this.current=null}addChild(e){this.children.add(e),this.enteringChildren??(this.enteringChildren=new Set),this.enteringChildren.add(e)}removeChild(e){this.children.delete(e),this.enteringChildren&&this.enteringChildren.delete(e)}bindToMotionValue(e,n){if(this.valueSubscriptions.has(e)&&this.valueSubscriptions.get(e)(),n.accelerate&&a1.has(e)&&this.current instanceof HTMLElement){const{factory:o,keyframes:a,times:l,ease:c,duration:u}=n.accelerate,d=new s1({element:this.current,name:e,keyframes:a,times:l,ease:c,duration:Wn(u)}),f=o(d);this.valueSubscriptions.set(e,()=>{f(),d.cancel()});return}const i=bo.has(e);i&&this.onBindTransform&&this.onBindTransform();const r=n.on("change",o=>{this.latestValues[e]=o,this.props.onUpdate&&lt.preRender(this.notifyUpdate),i&&this.projection&&(this.projection.isTransformDirty=!0),this.scheduleRender()});let s;typeof window<"u"&&window.MotionCheckAppearSync&&(s=window.MotionCheckAppearSync(this,e,n)),this.valueSubscriptions.set(e,()=>{r(),s&&s()})}sortNodePosition(e){return!this.current||!this.sortInstanceNodePosition||this.type!==e.type?0:this.sortInstanceNodePosition(this.current,e.current)}updateFeatures(){let e="animation";for(e in qc){const n=qc[e];if(!n)continue;const{isEnabled:i,Feature:r}=n;if(!this.features[e]&&r&&i(this.props)&&(this.features[e]=new r(this)),this.features[e]){const s=this.features[e];s.isMounted?s.update():(s.mount(),s.isMounted=!0)}}}triggerBuild(){this.build(this.renderState,this.latestValues,this.props)}measureViewportBox(){return this.current?this.measureInstanceViewportBox(this.current,this.props):Ut()}getStaticValue(e){return this.latestValues[e]}setStaticValue(e,n){this.latestValues[e]=n}update(e,n){(e.transformTemplate||this.props.transformTemplate)&&this.scheduleRender(),this.prevProps=this.props,this.props=e,this.prevPresenceContext=this.presenceContext,this.presenceContext=n;for(let i=0;i<Ux.length;i++){const r=Ux[i];this.propEventSubscriptions[r]&&(this.propEventSubscriptions[r](),delete this.propEventSubscriptions[r]);const s="on"+r,o=e[s];o&&(this.propEventSubscriptions[r]=this.on(r,o))}this.prevMotionValues=iL(this,this.scrapeMotionValuesFromProps(e,this.prevProps||{},this),this.prevMotionValues),this.handleChildMotionValue&&this.handleChildMotionValue()}getProps(){return this.props}getVariant(e){return this.props.variants?this.props.variants[e]:void 0}getDefaultTransition(){return this.props.transition}getTransformPagePoint(){return this.props.transformPagePoint}getClosestVariantNode(){return this.isVariantNode?this:this.parent?this.parent.getClosestVariantNode():void 0}addVariantChild(e){const n=this.getClosestVariantNode();if(n)return n.variantChildren&&n.variantChildren.add(e),()=>n.variantChildren.delete(e)}addValue(e,n){const i=this.values.get(e);n!==i&&(i&&this.removeValue(e),this.bindToMotionValue(e,n),this.values.set(e,n),this.latestValues[e]=n.get())}removeValue(e){this.values.delete(e);const n=this.valueSubscriptions.get(e);n&&(n(),this.valueSubscriptions.delete(e)),delete this.latestValues[e],this.removeValueFromRenderState(e,this.renderState)}hasValue(e){return this.values.has(e)}getValue(e,n){if(this.props.values&&this.props.values[e])return this.props.values[e];let i=this.values.get(e);return i===void 0&&n!==void 0&&(i=yo(n===null?void 0:n,{owner:this}),this.addValue(e,i)),i}readValue(e,n){let i=this.latestValues[e]!==void 0||!this.current?this.latestValues[e]:this.getBaseTargetFromProps(this.props,e)??this.readValueFromInstance(this.current,e,this.options);return i!=null&&(typeof i=="string"&&(AS(i)||CS(i))?i=parseFloat(i):!tL(i)&&ai.test(n)&&(i=v1(e,n)),this.setBaseTarget(e,$t(i)?i.get():i)),$t(i)?i.get():i}setBaseTarget(e,n){this.baseTarget[e]=n}getBaseTarget(e){var s;const{initial:n}=this.props;let i;if(typeof n=="string"||typeof n=="object"){const o=Rm(this.props,n,(s=this.presenceContext)==null?void 0:s.custom);o&&(i=o[e])}if(n&&i!==void 0)return i;const r=this.getBaseTargetFromProps(this.props,e);return r!==void 0&&!$t(r)?r:this.initialValues[e]!==void 0&&i===void 0?void 0:this.baseTarget[e]}on(e,n){return this.events[e]||(this.events[e]=new gm),this.events[e].add(n)}notify(e,...n){this.events[e]&&this.events[e].notify(...n)}scheduleRenderMicrotask(){Lm.render(this.render)}}class b1 extends aL{constructor(){super(...arguments),this.KeyframeResolver=ND}sortInstanceNodePosition(e,n){return e.compareDocumentPosition(n)&2?1:-1}getBaseTargetFromProps(e,n){const i=e.style;return i?i[n]:void 0}removeValueFromRenderState(e,{vars:n,style:i}){delete n[e],delete i[e]}handleChildMotionValue(){this.childSubscription&&(this.childSubscription(),delete this.childSubscription);const{children:e}=this.props;$t(e)&&(this.childSubscription=e.on("change",n=>{this.current&&(this.current.textContent=`${n}`)}))}}class kr{constructor(e){this.isMounted=!1,this.node=e}update(){}}function C1({top:t,left:e,right:n,bottom:i}){return{x:{min:e,max:n},y:{min:t,max:i}}}function lL({x:t,y:e}){return{top:e.min,right:t.max,bottom:e.max,left:t.min}}function cL(t,e){if(!e)return t;const n=e({x:t.left,y:t.top}),i=e({x:t.right,y:t.bottom});return{top:n.y,left:n.x,bottom:i.y,right:i.x}}function Hf(t){return t===void 0||t===1}function tp({scale:t,scaleX:e,scaleY:n}){return!Hf(t)||!Hf(e)||!Hf(n)}function Yr(t){return tp(t)||R1(t)||t.z||t.rotate||t.rotateX||t.rotateY||t.skewX||t.skewY}function R1(t){return Fx(t.x)||Fx(t.y)}function Fx(t){return t&&t!=="0%"}function Kc(t,e,n){const i=t-n,r=e*i;return n+r}function kx(t,e,n,i,r){return r!==void 0&&(t=Kc(t,r,i)),Kc(t,n,i)+e}function np(t,e=0,n=1,i,r){t.min=kx(t.min,e,n,i,r),t.max=kx(t.max,e,n,i,r)}function P1(t,{x:e,y:n}){np(t.x,e.translate,e.scale,e.originPoint),np(t.y,n.translate,n.scale,n.originPoint)}const Ox=.999999999999,Bx=1.0000000000001;function uL(t,e,n,i=!1){var a;const r=n.length;if(!r)return;e.x=e.y=1;let s,o;for(let l=0;l<r;l++){s=n[l],o=s.projectionDelta;const{visualElement:c}=s.options;c&&c.props.style&&c.props.style.display==="contents"||(i&&s.options.layoutScroll&&s.scroll&&s!==s.root&&(vi(t.x,-s.scroll.offset.x),vi(t.y,-s.scroll.offset.y)),o&&(e.x*=o.x.scale,e.y*=o.y.scale,P1(t,o)),i&&Yr(s.latestValues)&&cc(t,s.latestValues,(a=s.layout)==null?void 0:a.layoutBox))}e.x<Bx&&e.x>Ox&&(e.x=1),e.y<Bx&&e.y>Ox&&(e.y=1)}function vi(t,e){t.min+=e,t.max+=e}function Vx(t,e,n,i,r=.5){const s=at(t.min,t.max,r);np(t,e,n,s,i)}function zx(t,e){return typeof t=="string"?parseFloat(t)/100*(e.max-e.min):t}function cc(t,e,n){const i=n??t;Vx(t.x,zx(e.x,i.x),e.scaleX,e.scale,e.originX),Vx(t.y,zx(e.y,i.y),e.scaleY,e.scale,e.originY)}function D1(t,e){return C1(cL(t.getBoundingClientRect(),e))}function fL(t,e,n){const i=D1(t,n),{scroll:r}=e;return r&&(vi(i.x,r.offset.x),vi(i.y,r.offset.y)),i}const dL={x:"translateX",y:"translateY",z:"translateZ",transformPerspective:"perspective"},hL=Ao.length;function pL(t,e,n){let i="",r=!0;for(let o=0;o<hL;o++){const a=Ao[o],l=t[a];if(l===void 0)continue;let c=!0;if(typeof l=="number")c=l===(a.startsWith("scale")?1:0);else{const u=parseFloat(l);c=a.startsWith("scale")?u===1:u===0}if(!c||n){const u=Jh(l,$c[a]);if(!c){r=!1;const d=dL[a]||a;i+=`${d}(${u}) `}n&&(e[a]=u)}}const s=t.pathRotation;return s&&(r=!1,i+=`rotate(${Jh(s,$c.pathRotation)}) `),i=i.trim(),n?i=n(e,r?"":i):r&&(i="none"),i}function km(t,e,n){const{style:i,vars:r,transformOrigin:s}=t;let o=!1,a=!1;for(const l in e){const c=e[l];if(bo.has(l)){o=!0;continue}else if(HS(l)){r[l]=c;continue}else{const u=Jh(c,$c[l]);l.startsWith("origin")?(a=!0,s[l]=u):i[l]=u}}if(e.transform||(o||n?i.transform=pL(e,t.transform,n):i.transform&&(i.transform="none")),a){const{originX:l="50%",originY:c="50%",originZ:u=0}=s;i.transformOrigin=`${l} ${c} ${u}`}}function L1(t,{style:e,vars:n},i,r){const s=t.style;let o;for(o in e)s[o]=e[o];r==null||r.applyProjectionStyles(s,i);for(o in n)s.setProperty(o,n[o])}function Gx(t,e){return e.max===e.min?0:t/(e.max-e.min)*100}const Wo={correct:(t,e)=>{if(!e.target)return t;if(typeof t=="string")if(Me.test(t))t=parseFloat(t);else return t;const n=Gx(t,e.target.x),i=Gx(t,e.target.y);return`${n}% ${i}%`}},mL={correct:(t,{treeScale:e,projectionDelta:n})=>{const i=t,r=ai.parse(t);if(r.length>5)return i;const s=ai.createTransformer(t),o=typeof r[0]!="number"?1:0,a=n.x.scale*e.x,l=n.y.scale*e.y;r[0+o]/=a,r[1+o]/=l;const c=at(a,l,.5);return typeof r[2+o]=="number"&&(r[2+o]/=c),typeof r[3+o]=="number"&&(r[3+o]/=c),s(r)}},ip={borderRadius:{...Wo,applyTo:[...Dm]},borderTopLeftRadius:Wo,borderTopRightRadius:Wo,borderBottomLeftRadius:Wo,borderBottomRightRadius:Wo,boxShadow:mL};function I1(t,{layout:e,layoutId:n}){return bo.has(t)||t.startsWith("origin")||(e||n!==void 0)&&(!!ip[t]||t==="opacity")}function Om(t,e,n){var o;const i=t.style,r=e==null?void 0:e.style,s={};if(!i)return s;for(const a in i)($t(i[a])||r&&$t(r[a])||I1(a,t)||((o=n==null?void 0:n.getValue(a))==null?void 0:o.liveStyle)!==void 0)&&(s[a]=i[a]);return s}function gL(t){return window.getComputedStyle(t)}class xL extends b1{constructor(){super(...arguments),this.type="html",this.renderInstance=L1}mount(e){Su(!!e.style),super.mount(e)}readValueFromInstance(e,n){var i;if(bo.has(n))return(i=this.projection)!=null&&i.isProjecting?Gh(n):UP(e,n);{const r=gL(e),s=(HS(n)?r.getPropertyValue(n):r[n])||0;return typeof s=="string"?s.trim():s}}measureInstanceViewportBox(e,{transformPagePoint:n}){return D1(e,n)}build(e,n,i){km(e,n,i.transformTemplate)}scrapeMotionValuesFromProps(e,n,i){return Om(e,n,i)}}const vL={offset:"stroke-dashoffset",array:"stroke-dasharray"},yL={offset:"strokeDashoffset",array:"strokeDasharray"};function _L(t,e,n=1,i=0,r=!0){t.pathLength=1;const s=r?vL:yL;t[s.offset]=`${-i}`,t[s.array]=`${e} ${n}`}const N1=["transform","opacity","offsetDistance","offsetPath","offsetRotate","offsetAnchor"];function U1(t,{attrX:e,attrY:n,attrScale:i,pathLength:r,pathSpacing:s=1,pathOffset:o=0,...a},l,c,u){if(km(t,a,c),l){t.style.viewBox&&(t.attrs.viewBox=t.style.viewBox);return}t.attrs=t.style,t.style={};const{attrs:d,style:f}=t;for(const p of N1)d[p]!==void 0&&(f[p]=d[p],delete d[p]);(f.transform||d.transformOrigin)&&(f.transformOrigin=d.transformOrigin??"50% 50%",delete d.transformOrigin),f.transform&&(f.transformBox=(u==null?void 0:u.transformBox)??"fill-box",delete d.transformBox),e!==void 0&&(d.x=e),n!==void 0&&(d.y=n),i!==void 0&&(d.scale=i),r!==void 0&&_L(d,r,s,o,!1)}const F1=new Set(["baseFrequency","diffuseConstant","kernelMatrix","kernelUnitLength","keySplines","keyTimes","limitingConeAngle","markerHeight","markerWidth","numOctaves","targetX","targetY","surfaceScale","specularConstant","specularExponent","stdDeviation","tableValues","viewBox","gradientTransform","pathLength","startOffset","textLength","lengthAdjust"]),k1=t=>typeof t=="string"&&t.toLowerCase()==="svg";function SL(t,e,n,i){L1(t,e,void 0,i);for(const r in e.attrs)t.setAttribute(F1.has(r)?r:Pm(r),e.attrs[r])}function O1(t,e,n){const i=Om(t,e,n);for(const r in t)if($t(t[r])||$t(e[r])){const s=Ao.indexOf(r)!==-1?"attr"+r.charAt(0).toUpperCase()+r.substring(1):r;i[s]=t[r]}return i}class ML extends b1{constructor(){super(...arguments),this.type="svg",this.isSVGTag=!1,this.measureInstanceViewportBox=Ut}getBaseTargetFromProps(e,n){return e[n]}readValueFromInstance(e,n){if(bo.has(n)){const i=x1(n);return i&&i.default||0}if(N1.includes(n)){const r=getComputedStyle(e)[n];if(typeof r=="string"&&r)return r.trim()}return n=F1.has(n)?n:Pm(n),e.getAttribute(n)}scrapeMotionValuesFromProps(e,n,i){return O1(e,n,i)}build(e,n,i){U1(e,n,this.isSVGTag,i.transformTemplate,i.style)}renderInstance(e,n,i,r){SL(e,n,i,r)}mount(e){this.isSVGTag=k1(e.tagName),super.mount(e)}}const EL=Fm.length;function B1(t){if(!t)return;if(!t.isControllingVariants){const n=t.parent?B1(t.parent)||{}:{};return t.props.initial!==void 0&&(n.initial=t.props.initial),n}const e={};for(let n=0;n<EL;n++){const i=Fm[n],r=t.props[i];(Ia(r)||r===!1)&&(e[i]=r)}return e}function V1(t,e){if(!Array.isArray(e))return!1;const n=e.length;if(n!==t.length)return!1;for(let i=0;i<n;i++)if(e[i]!==t[i])return!1;return!0}const TL=[...Um].reverse(),wL=Um.length;function AL(t){return e=>Promise.all(e.map(({animation:n,options:i})=>ED(t,n,i)))}function bL(t){let e=AL(t),n=Hx(),i=!0,r=!1;const s=c=>(u,d)=>{var p;const f=os(t,d,c==="exit"?(p=t.presenceContext)==null?void 0:p.custom:void 0);if(f){const{transition:m,transitionEnd:E,...g}=f;u={...u,...g,...E}}return u};function o(c){e=c(t)}function a(c){const{props:u}=t,d=B1(t.parent)||{},f=[],p=new Set;let m={},E=1/0;for(let h=0;h<wL;h++){const x=TL[h],S=n[x],_=u[x]!==void 0?u[x]:d[x],w=Ia(_),b=x===c?S.isActive:null;b===!1&&(E=h);let A=_===d[x]&&_!==u[x]&&w;if(A&&(i||r)&&t.manuallyAnimateOnMount&&(A=!1),S.protectedKeys={...m},!S.isActive&&b===null||!_&&!S.prevProp||Eu(_)||typeof _=="boolean")continue;if(x==="exit"&&S.isActive&&b!==!0){S.prevResolvedValues&&(m={...m,...S.prevResolvedValues});continue}const y=CL(S.prevProp,_);let C=y||x===c&&S.isActive&&!A&&w||h>E&&w,P=!1;const D=Array.isArray(_)?_:[_];let F=D.reduce(s(x),{});b===!1&&(F={});const{prevResolvedValues:X={}}=S,ee={...X,...F},O=L=>{C=!0,p.has(L)&&(P=!0,p.delete(L)),S.needsAnimating[L]=!0;const W=t.getValue(L);W&&(W.liveStyle=!1)};for(const L in ee){const W=F[L],Z=X[L];if(m.hasOwnProperty(L))continue;let ne=!1;$h(W)&&$h(Z)?ne=!V1(W,Z)||y:ne=W!==Z,ne?W!=null?O(L):p.add(L):W!==void 0&&p.has(L)?O(L):S.protectedKeys[L]=!0}S.prevProp=_,S.prevResolvedValues=F,S.isActive&&(m={...m,...F}),(i||r)&&t.blockInitialAnimation&&(C=!1);const q=A&&y;C&&(!q||P)&&f.push(...D.map(L=>{const W={type:x};if(typeof L=="string"&&(i||r)&&!q&&t.manuallyAnimateOnMount&&t.parent){const{parent:Z}=t,ne=os(Z,L);if(Z.enteringChildren&&ne){const{delayChildren:oe}=ne.transition||{};W.delay=l1(Z.enteringChildren,t,oe)}}return{animation:L,options:W}}))}if(p.size){const h={};if(typeof u.initial!="boolean"){const x=os(t,Array.isArray(u.initial)?u.initial[0]:u.initial);x&&x.transition&&(h.transition=x.transition)}p.forEach(x=>{const S=t.getBaseTarget(x),_=t.getValue(x);_&&(_.liveStyle=!0),h[x]=S??null}),f.push({animation:h})}let g=!!f.length;return i&&(u.initial===!1||u.initial===u.animate)&&!t.manuallyAnimateOnMount&&(g=!1),i=!1,r=!1,g?e(f):Promise.resolve()}function l(c,u){var f;if(n[c].isActive===u)return Promise.resolve();(f=t.variantChildren)==null||f.forEach(p=>{var m;return(m=p.animationState)==null?void 0:m.setActive(c,u)}),n[c].isActive=u;const d=a(c);for(const p in n)n[p].protectedKeys={};return d}return{animateChanges:a,setActive:l,setAnimateFunction:o,getState:()=>n,reset:()=>{n=Hx(),r=!0}}}function CL(t,e){return typeof e=="string"?e!==t:Array.isArray(e)?!V1(e,t):!1}function Hr(t=!1){return{isActive:t,protectedKeys:{},needsAnimating:{},prevResolvedValues:{}}}function Hx(){return{animate:Hr(!0),whileInView:Hr(),whileHover:Hr(),whileTap:Hr(),whileDrag:Hr(),whileFocus:Hr(),exit:Hr()}}function rp(t,e){t.min=e.min,t.max=e.max}function Qn(t,e){rp(t.x,e.x),rp(t.y,e.y)}function Wx(t,e){t.translate=e.translate,t.scale=e.scale,t.originPoint=e.originPoint,t.origin=e.origin}const z1=1e-4,RL=1-z1,PL=1+z1,G1=.01,DL=0-G1,LL=0+G1;function un(t){return t.max-t.min}function IL(t,e,n){return Math.abs(t-e)<=n}function jx(t,e,n,i=.5){t.origin=i,t.originPoint=at(e.min,e.max,t.origin),t.scale=un(n)/un(e),t.translate=at(n.min,n.max,t.origin)-t.originPoint,(t.scale>=RL&&t.scale<=PL||isNaN(t.scale))&&(t.scale=1),(t.translate>=DL&&t.translate<=LL||isNaN(t.translate))&&(t.translate=0)}function ua(t,e,n,i){jx(t.x,e.x,n.x,i?i.originX:void 0),jx(t.y,e.y,n.y,i?i.originY:void 0)}function Xx(t,e,n,i=0){const r=i?at(n.min,n.max,i):n.min;t.min=r+e.min,t.max=t.min+un(e)}function NL(t,e,n,i){Xx(t.x,e.x,n.x,i==null?void 0:i.x),Xx(t.y,e.y,n.y,i==null?void 0:i.y)}function Yx(t,e,n,i=0){const r=i?at(n.min,n.max,i):n.min;t.min=e.min-r,t.max=t.min+un(e)}function Zc(t,e,n,i){Yx(t.x,e.x,n.x,i==null?void 0:i.x),Yx(t.y,e.y,n.y,i==null?void 0:i.y)}function $x(t,e,n,i,r){return t-=e,t=Kc(t,1/n,i),r!==void 0&&(t=Kc(t,1/r,i)),t}function UL(t,e=0,n=1,i=.5,r,s=t,o=t){if(bi.test(e)&&(e=parseFloat(e),e=at(o.min,o.max,e/100)-o.min),typeof e!="number")return;let a=at(s.min,s.max,i);t===s&&(a-=e),t.min=$x(t.min,e,n,a,r),t.max=$x(t.max,e,n,a,r)}function qx(t,e,[n,i,r],s,o){UL(t,e[n],e[i],e[r],e.scale,s,o)}const FL=["x","scaleX","originX"],kL=["y","scaleY","originY"];function Kx(t,e,n,i){qx(t.x,e,FL,n?n.x:void 0,i?i.x:void 0),qx(t.y,e,kL,n?n.y:void 0,i?i.y:void 0)}function Zx(t){return t.translate===0&&t.scale===1}function H1(t){return Zx(t.x)&&Zx(t.y)}function Qx(t,e){return t.min===e.min&&t.max===e.max}function OL(t,e){return Qx(t.x,e.x)&&Qx(t.y,e.y)}function Jx(t,e){return Math.round(t.min)===Math.round(e.min)&&Math.round(t.max)===Math.round(e.max)}function W1(t,e){return Jx(t.x,e.x)&&Jx(t.y,e.y)}function ev(t){return un(t.x)/un(t.y)}function tv(t,e){return t.translate===e.translate&&t.scale===e.scale&&t.originPoint===e.originPoint}function gi(t){return[t("x"),t("y")]}function BL(t,e,n){let i="";const r=t.x.translate/e.x,s=t.y.translate/e.y,o=(n==null?void 0:n.z)||0;if((r||s||o)&&(i=`translate3d(${r}px, ${s}px, ${o}px) `),(e.x!==1||e.y!==1)&&(i+=`scale(${1/e.x}, ${1/e.y}) `),n){const{transformPerspective:c,rotate:u,pathRotation:d,rotateX:f,rotateY:p,skewX:m,skewY:E}=n;c&&(i=`perspective(${c}px) ${i}`),u&&(i+=`rotate(${u}deg) `),d&&(i+=`rotate(${d}deg) `),f&&(i+=`rotateX(${f}deg) `),p&&(i+=`rotateY(${p}deg) `),m&&(i+=`skewX(${m}deg) `),E&&(i+=`skewY(${E}deg) `)}const a=t.x.scale*e.x,l=t.y.scale*e.y;return(a!==1||l!==1)&&(i+=`scale(${a}, ${l})`),i||"none"}const VL=Dm.length,nv=t=>typeof t=="string"?parseFloat(t):t,iv=t=>typeof t=="number"||Me.test(t);function zL(t,e,n,i,r,s){r?(t.opacity=at(0,n.opacity??1,GL(i)),t.opacityExit=at(e.opacity??1,0,HL(i))):s&&(t.opacity=at(e.opacity??1,n.opacity??1,i));for(let o=0;o<VL;o++){const a=Dm[o];let l=rv(e,a),c=rv(n,a);if(l===void 0&&c===void 0)continue;l||(l=0),c||(c=0),l===0||c===0||iv(l)===iv(c)?(t[a]=Math.max(at(nv(l),nv(c),i),0),(bi.test(c)||bi.test(l))&&(t[a]+="%")):t[a]=c}(e.rotate||n.rotate)&&(t.rotate=at(e.rotate||0,n.rotate||0,i))}function rv(t,e){return t[e]!==void 0?t[e]:t.borderRadius}const GL=j1(0,.5,kS),HL=j1(.5,.95,Hn);function j1(t,e,n){return i=>i<t?0:i>e?1:n(Da(t,e,i))}function WL(t,e,n){const i=$t(t)?t:yo(t);return i.start(Cm("",i,e,n)),i.animation}function Na(t,e,n,i={passive:!0}){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}const jL=(t,e)=>t.depth-e.depth;class XL{constructor(){this.children=[],this.isDirty=!1}add(e){mm(this.children,e),this.isDirty=!0}remove(e){Wc(this.children,e),this.isDirty=!0}forEach(e){this.isDirty&&this.children.sort(jL),this.isDirty=!1,this.children.forEach(e)}}function YL(t,e){const n=cn.now(),i=({timestamp:r})=>{const s=r-n;s>=e&&(Lr(i),t(s-e))};return lt.setup(i,!0),()=>Lr(i)}function uc(t){return $t(t)?t.get():t}class $L{constructor(){this.members=[]}add(e){mm(this.members,e);for(let n=this.members.length-1;n>=0;n--){const i=this.members[n];if(i===e||i===this.lead||i===this.prevLead)continue;const r=i.instance;(!r||r.isConnected===!1)&&!i.snapshot&&(Wc(this.members,i),i.unmount())}e.scheduleRender()}remove(e){if(Wc(this.members,e),e===this.prevLead&&(this.prevLead=void 0),e===this.lead){const n=this.members[this.members.length-1];n&&this.promote(n)}}relegate(e){var n;for(let i=this.members.indexOf(e)-1;i>=0;i--){const r=this.members[i];if(r.isPresent!==!1&&((n=r.instance)==null?void 0:n.isConnected)!==!1)return this.promote(r),!0}return!1}promote(e,n){var r;const i=this.lead;if(e!==i&&(this.prevLead=i,this.lead=e,e.show(),i)){i.updateSnapshot(),e.scheduleRender();const{layoutDependency:s}=i.options,{layoutDependency:o}=e.options;(s===void 0||s!==o)&&(e.resumeFrom=i,n&&(i.preserveOpacity=!0),i.snapshot&&(e.snapshot=i.snapshot,e.snapshot.latestValues=i.animationValues||i.latestValues),(r=e.root)!=null&&r.isUpdating&&(e.isLayoutDirty=!0)),e.options.crossfade===!1&&i.hide()}}exitAnimationComplete(){this.members.forEach(e=>{var n,i,r,s,o;(i=(n=e.options).onExitComplete)==null||i.call(n),(o=(r=e.resumingFrom)==null?void 0:(s=r.options).onExitComplete)==null||o.call(s)})}scheduleRender(){this.members.forEach(e=>e.instance&&e.scheduleRender(!1))}removeLeadSnapshot(){var e;(e=this.lead)!=null&&e.snapshot&&(this.lead.snapshot=void 0)}}const fc={hasAnimatedSinceResize:!0,hasEverUpdated:!1},Wf=["","X","Y","Z"],qL=1e3;let KL=0;function jf(t,e,n,i){const{latestValues:r}=e;r[t]&&(n[t]=r[t],e.setStaticValue(t,0),i&&(i[t]=0))}function X1(t){if(t.hasCheckedOptimisedAppear=!0,t.root===t)return;const{visualElement:e}=t.options;if(!e)return;const n=h1(e);if(window.MotionHasOptimisedAnimation(n,"transform")){const{layout:r,layoutId:s}=t.options;window.MotionCancelOptimisedAnimation(n,"transform",lt,!(r||s))}const{parent:i}=t;i&&!i.hasCheckedOptimisedAppear&&X1(i)}function Y1({attachResizeListener:t,defaultParent:e,measureScroll:n,checkIsScrollRoot:i,resetTransform:r}){return class{constructor(o={},a=e==null?void 0:e()){this.id=KL++,this.animationId=0,this.animationCommitId=0,this.children=new Set,this.options={},this.isTreeAnimating=!1,this.isAnimationBlocked=!1,this.isLayoutDirty=!1,this.isProjectionDirty=!1,this.isSharedProjectionDirty=!1,this.isTransformDirty=!1,this.updateManuallyBlocked=!1,this.updateBlockedByResize=!1,this.isUpdating=!1,this.isSVG=!1,this.needsReset=!1,this.shouldResetTransform=!1,this.hasCheckedOptimisedAppear=!1,this.treeScale={x:1,y:1},this.eventHandlers=new Map,this.hasTreeAnimated=!1,this.layoutVersion=0,this.updateScheduled=!1,this.scheduleUpdate=()=>this.update(),this.projectionUpdateScheduled=!1,this.checkUpdateFailed=()=>{this.isUpdating&&(this.isUpdating=!1,this.clearAllSnapshots())},this.updateProjection=()=>{this.projectionUpdateScheduled=!1,this.nodes.forEach(JL),this.nodes.forEach(sI),this.nodes.forEach(oI),this.nodes.forEach(eI)},this.resolvedRelativeTargetAt=0,this.linkedParentVersion=0,this.hasProjected=!1,this.isVisible=!0,this.animationProgress=0,this.sharedNodes=new Map,this.latestValues=o,this.root=a?a.root||a:this,this.path=a?[...a.path,a]:[],this.parent=a,this.depth=a?a.depth+1:0;for(let l=0;l<this.path.length;l++)this.path[l].shouldResetTransform=!0;this.root===this&&(this.nodes=new XL)}addEventListener(o,a){return this.eventHandlers.has(o)||this.eventHandlers.set(o,new gm),this.eventHandlers.get(o).add(a)}notifyListeners(o,...a){const l=this.eventHandlers.get(o);l&&l.notify(...a)}hasListeners(o){return this.eventHandlers.has(o)}mount(o){if(this.instance)return;this.isSVG=Nm(o)&&!JD(o),this.instance=o;const{layoutId:a,layout:l,visualElement:c}=this.options;if(c&&!c.current&&c.mount(o),this.root.nodes.add(this),this.parent&&this.parent.children.add(this),this.root.hasTreeAnimated&&(l||a)&&(this.isLayoutDirty=!0),t){let u,d=0;const f=()=>this.root.updateBlockedByResize=!1;lt.read(()=>{d=window.innerWidth}),t(o,()=>{const p=window.innerWidth;p!==d&&(d=p,this.root.updateBlockedByResize=!0,u&&u(),u=YL(f,250),fc.hasAnimatedSinceResize&&(fc.hasAnimatedSinceResize=!1,this.nodes.forEach(av)))})}a&&this.root.registerSharedNode(a,this),this.options.animate!==!1&&c&&(a||l)&&this.addEventListener("didUpdate",({delta:u,hasLayoutChanged:d,hasRelativeLayoutChanged:f,layout:p})=>{if(this.isTreeAnimationBlocked()){this.target=void 0,this.relativeTarget=void 0;return}const m=this.options.transition||c.getDefaultTransition()||fI,{onLayoutAnimationStart:E,onLayoutAnimationComplete:g}=c.getProps(),h=!this.targetLayout||!W1(this.targetLayout,p),x=!d&&f;if(this.options.layoutRoot||this.resumeFrom||x||d&&(h||!this.currentAnimation)){this.resumeFrom&&(this.resumingFrom=this.resumeFrom,this.resumingFrom.resumingFrom=void 0);const S={...bm(m,"layout"),onPlay:E,onComplete:g};(c.shouldReduceMotion||this.options.layoutRoot)&&(S.delay=0,S.type=!1),this.startAnimation(S),this.setAnimationOrigin(u,x,S.path)}else d||av(this),this.isLead()&&this.options.onExitComplete&&this.options.onExitComplete();this.targetLayout=p})}unmount(){this.options.layoutId&&this.willUpdate(),this.root.nodes.remove(this);const o=this.getStack();o&&o.remove(this),this.parent&&this.parent.children.delete(this),this.instance=void 0,this.eventHandlers.clear(),Lr(this.updateProjection)}blockUpdate(){this.updateManuallyBlocked=!0}unblockUpdate(){this.updateManuallyBlocked=!1}isUpdateBlocked(){return this.updateManuallyBlocked||this.updateBlockedByResize}isTreeAnimationBlocked(){return this.isAnimationBlocked||this.parent&&this.parent.isTreeAnimationBlocked()||!1}startUpdate(){this.isUpdateBlocked()||(this.isUpdating=!0,this.nodes&&this.nodes.forEach(aI),this.animationId++)}getTransformTemplate(){const{visualElement:o}=this.options;return o&&o.getProps().transformTemplate}willUpdate(o=!0){if(this.root.hasTreeAnimated=!0,this.root.isUpdateBlocked()){this.options.onExitComplete&&this.options.onExitComplete();return}if(window.MotionCancelOptimisedAnimation&&!this.hasCheckedOptimisedAppear&&X1(this),!this.root.isUpdating&&this.root.startUpdate(),this.isLayoutDirty)return;this.isLayoutDirty=!0;for(let u=0;u<this.path.length;u++){const d=this.path[u];d.shouldResetTransform=!0,(typeof d.latestValues.x=="string"||typeof d.latestValues.y=="string")&&(d.isLayoutDirty=!0),d.updateScroll("snapshot"),d.options.layoutRoot&&d.willUpdate(!1)}const{layoutId:a,layout:l}=this.options;if(a===void 0&&!l)return;const c=this.getTransformTemplate();this.prevTransformTemplateValue=c?c(this.latestValues,""):void 0,this.updateSnapshot(),o&&this.notifyListeners("willUpdate")}update(){if(this.updateScheduled=!1,this.isUpdateBlocked()){const l=this.updateBlockedByResize;this.unblockUpdate(),this.updateBlockedByResize=!1,this.clearAllSnapshots(),l&&this.nodes.forEach(nI),this.nodes.forEach(sv);return}if(this.animationId<=this.animationCommitId){this.nodes.forEach(ov);return}this.animationCommitId=this.animationId,this.isUpdating?(this.isUpdating=!1,this.nodes.forEach(iI),this.nodes.forEach(rI),this.nodes.forEach(ZL),this.nodes.forEach(QL)):this.nodes.forEach(ov),this.clearAllSnapshots();const a=cn.now();Xt.delta=Di(0,1e3/60,a-Xt.timestamp),Xt.timestamp=a,Xt.isProcessing=!0,Ff.update.process(Xt),Ff.preRender.process(Xt),Ff.render.process(Xt),Xt.isProcessing=!1}didUpdate(){this.updateScheduled||(this.updateScheduled=!0,Lm.read(this.scheduleUpdate))}clearAllSnapshots(){this.nodes.forEach(tI),this.sharedNodes.forEach(lI)}scheduleUpdateProjection(){this.projectionUpdateScheduled||(this.projectionUpdateScheduled=!0,lt.preRender(this.updateProjection,!1,!0))}scheduleCheckAfterUnmount(){lt.postRender(()=>{this.isLayoutDirty?this.root.didUpdate():this.root.checkUpdateFailed()})}updateSnapshot(){this.snapshot||!this.instance||(this.snapshot=this.measure(),this.snapshot&&!un(this.snapshot.measuredBox.x)&&!un(this.snapshot.measuredBox.y)&&(this.snapshot=void 0))}updateLayout(){if(!this.instance||(this.updateScroll(),!(this.options.alwaysMeasureLayout&&this.isLead())&&!this.isLayoutDirty))return;if(this.resumeFrom&&!this.resumeFrom.instance)for(let l=0;l<this.path.length;l++)this.path[l].updateScroll();const o=this.layout;this.layout=this.measure(!1),this.layoutVersion++,this.layoutCorrected||(this.layoutCorrected=Ut()),this.isLayoutDirty=!1,this.projectionDelta=void 0,this.notifyListeners("measure",this.layout.layoutBox);const{visualElement:a}=this.options;a&&a.notify("LayoutMeasure",this.layout.layoutBox,o?o.layoutBox:void 0)}updateScroll(o="measure"){let a=!!(this.options.layoutScroll&&this.instance);if(this.scroll&&this.scroll.animationId===this.root.animationId&&this.scroll.phase===o&&(a=!1),a&&this.instance){const l=i(this.instance);this.scroll={animationId:this.root.animationId,phase:o,isRoot:l,offset:n(this.instance),wasRoot:this.scroll?this.scroll.isRoot:l}}}resetTransform(){if(!r)return;const o=this.isLayoutDirty||this.shouldResetTransform||this.options.alwaysMeasureLayout,a=this.projectionDelta&&!H1(this.projectionDelta),l=this.getTransformTemplate(),c=l?l(this.latestValues,""):void 0,u=c!==this.prevTransformTemplateValue;o&&this.instance&&(a||Yr(this.latestValues)||u)&&(r(this.instance,c),this.shouldResetTransform=!1,this.scheduleRender())}measure(o=!0){const a=this.measurePageBox();let l=this.removeElementScroll(a);return o&&(l=this.removeTransform(l)),dI(l),{animationId:this.root.animationId,measuredBox:a,layoutBox:l,latestValues:{},source:this.id}}measurePageBox(){var c;const{visualElement:o}=this.options;if(!o)return Ut();const a=o.measureViewportBox();if(!(((c=this.scroll)==null?void 0:c.wasRoot)||this.path.some(hI))){const{scroll:u}=this.root;u&&(vi(a.x,u.offset.x),vi(a.y,u.offset.y))}return a}removeElementScroll(o){var l;const a=Ut();if(Qn(a,o),(l=this.scroll)!=null&&l.wasRoot)return a;for(let c=0;c<this.path.length;c++){const u=this.path[c],{scroll:d,options:f}=u;u!==this.root&&d&&f.layoutScroll&&(d.wasRoot&&Qn(a,o),vi(a.x,d.offset.x),vi(a.y,d.offset.y))}return a}applyTransform(o,a=!1,l){var u,d;const c=l||Ut();Qn(c,o);for(let f=0;f<this.path.length;f++){const p=this.path[f];!a&&p.options.layoutScroll&&p.scroll&&p!==p.root&&(vi(c.x,-p.scroll.offset.x),vi(c.y,-p.scroll.offset.y)),Yr(p.latestValues)&&cc(c,p.latestValues,(u=p.layout)==null?void 0:u.layoutBox)}return Yr(this.latestValues)&&cc(c,this.latestValues,(d=this.layout)==null?void 0:d.layoutBox),c}removeTransform(o){var l;const a=Ut();Qn(a,o);for(let c=0;c<this.path.length;c++){const u=this.path[c];if(!Yr(u.latestValues))continue;let d;u.instance&&(tp(u.latestValues)&&u.updateSnapshot(),d=Ut(),Qn(d,u.measurePageBox())),Kx(a,u.latestValues,(l=u.snapshot)==null?void 0:l.layoutBox,d)}return Yr(this.latestValues)&&Kx(a,this.latestValues),a}setTargetDelta(o){this.targetDelta=o,this.root.scheduleUpdateProjection(),this.isProjectionDirty=!0}setOptions(o){this.options={...this.options,...o,crossfade:o.crossfade!==void 0?o.crossfade:!0}}clearMeasurements(){this.scroll=void 0,this.layout=void 0,this.snapshot=void 0,this.prevTransformTemplateValue=void 0,this.targetDelta=void 0,this.target=void 0,this.isLayoutDirty=!1}forceRelativeParentToResolveTarget(){this.relativeParent&&this.relativeParent.resolvedRelativeTargetAt!==Xt.timestamp&&this.relativeParent.resolveTargetDelta(!0)}resolveTargetDelta(o=!1){var p;const a=this.getLead();this.isProjectionDirty||(this.isProjectionDirty=a.isProjectionDirty),this.isTransformDirty||(this.isTransformDirty=a.isTransformDirty),this.isSharedProjectionDirty||(this.isSharedProjectionDirty=a.isSharedProjectionDirty);const l=!!this.resumingFrom||this!==a;if(!(o||l&&this.isSharedProjectionDirty||this.isProjectionDirty||(p=this.parent)!=null&&p.isProjectionDirty||this.attemptToResolveRelativeTarget||this.root.updateBlockedByResize))return;const{layout:u,layoutId:d}=this.options;if(!this.layout||!(u||d))return;this.resolvedRelativeTargetAt=Xt.timestamp;const f=this.getClosestProjectingParent();f&&this.linkedParentVersion!==f.layoutVersion&&!f.options.layoutRoot&&this.removeRelativeTarget(),!this.targetDelta&&!this.relativeTarget&&(this.options.layoutAnchor!==!1&&f&&f.layout?this.createRelativeTarget(f,this.layout.layoutBox,f.layout.layoutBox):this.removeRelativeTarget()),!(!this.relativeTarget&&!this.targetDelta)&&(this.target||(this.target=Ut(),this.targetWithTransforms=Ut()),this.relativeTarget&&this.relativeTargetOrigin&&this.relativeParent&&this.relativeParent.target?(this.forceRelativeParentToResolveTarget(),NL(this.target,this.relativeTarget,this.relativeParent.target,this.options.layoutAnchor||void 0)):this.targetDelta?(this.resumingFrom?this.applyTransform(this.layout.layoutBox,!1,this.target):Qn(this.target,this.layout.layoutBox),P1(this.target,this.targetDelta)):Qn(this.target,this.layout.layoutBox),this.attemptToResolveRelativeTarget&&(this.attemptToResolveRelativeTarget=!1,this.options.layoutAnchor!==!1&&f&&!!f.resumingFrom==!!this.resumingFrom&&!f.options.layoutScroll&&f.target&&this.animationProgress!==1?this.createRelativeTarget(f,this.target,f.target):this.relativeParent=this.relativeTarget=void 0))}getClosestProjectingParent(){if(!(!this.parent||tp(this.parent.latestValues)||R1(this.parent.latestValues)))return this.parent.isProjecting()?this.parent:this.parent.getClosestProjectingParent()}isProjecting(){return!!((this.relativeTarget||this.targetDelta||this.options.layoutRoot)&&this.layout)}createRelativeTarget(o,a,l){this.relativeParent=o,this.linkedParentVersion=o.layoutVersion,this.forceRelativeParentToResolveTarget(),this.relativeTarget=Ut(),this.relativeTargetOrigin=Ut(),Zc(this.relativeTargetOrigin,a,l,this.options.layoutAnchor||void 0),Qn(this.relativeTarget,this.relativeTargetOrigin)}removeRelativeTarget(){this.relativeParent=this.relativeTarget=void 0}calcProjection(){var m;const o=this.getLead(),a=!!this.resumingFrom||this!==o;let l=!0;if((this.isProjectionDirty||(m=this.parent)!=null&&m.isProjectionDirty)&&(l=!1),a&&(this.isSharedProjectionDirty||this.isTransformDirty)&&(l=!1),this.resolvedRelativeTargetAt===Xt.timestamp&&(l=!1),l)return;const{layout:c,layoutId:u}=this.options;if(this.isTreeAnimating=!!(this.parent&&this.parent.isTreeAnimating||this.currentAnimation||this.pendingAnimation),this.isTreeAnimating||(this.targetDelta=this.relativeTarget=void 0),!this.layout||!(c||u))return;Qn(this.layoutCorrected,this.layout.layoutBox);const d=this.treeScale.x,f=this.treeScale.y;uL(this.layoutCorrected,this.treeScale,this.path,a),o.layout&&!o.target&&(this.treeScale.x!==1||this.treeScale.y!==1)&&(o.target=o.layout.layoutBox,o.targetWithTransforms=Ut());const{target:p}=o;if(!p){this.prevProjectionDelta&&(this.createProjectionDeltas(),this.scheduleRender());return}!this.projectionDelta||!this.prevProjectionDelta?this.createProjectionDeltas():(Wx(this.prevProjectionDelta.x,this.projectionDelta.x),Wx(this.prevProjectionDelta.y,this.projectionDelta.y)),ua(this.projectionDelta,this.layoutCorrected,p,this.latestValues),(this.treeScale.x!==d||this.treeScale.y!==f||!tv(this.projectionDelta.x,this.prevProjectionDelta.x)||!tv(this.projectionDelta.y,this.prevProjectionDelta.y))&&(this.hasProjected=!0,this.scheduleRender(),this.notifyListeners("projectionUpdate",p))}hide(){this.isVisible=!1}show(){this.isVisible=!0}scheduleRender(o=!0){var a;if((a=this.options.visualElement)==null||a.scheduleRender(),o){const l=this.getStack();l&&l.scheduleRender()}this.resumingFrom&&!this.resumingFrom.instance&&(this.resumingFrom=void 0)}createProjectionDeltas(){this.prevProjectionDelta=Ks(),this.projectionDelta=Ks(),this.projectionDeltaWithTransform=Ks()}setAnimationOrigin(o,a=!1,l){const c=this.snapshot,u=c?c.latestValues:{},d={...this.latestValues},f=Ks();(!this.relativeParent||!this.relativeParent.options.layoutRoot)&&(this.relativeTarget=this.relativeTargetOrigin=void 0),this.attemptToResolveRelativeTarget=!a;const p=Ut(),m=c?c.source:void 0,E=this.layout?this.layout.source:void 0,g=m!==E,h=this.getStack(),x=!h||h.members.length<=1,S=!!(g&&!x&&this.options.crossfade===!0&&!this.path.some(uI));this.animationProgress=0;let _;const w=l==null?void 0:l.interpolateProjection(o);this.mixTargetDelta=b=>{const A=b/1e3,y=w==null?void 0:w(A);y?(f.x.translate=y.x,f.x.scale=at(o.x.scale,1,A),f.x.origin=o.x.origin,f.x.originPoint=o.x.originPoint,f.y.translate=y.y,f.y.scale=at(o.y.scale,1,A),f.y.origin=o.y.origin,f.y.originPoint=o.y.originPoint):(lv(f.x,o.x,A),lv(f.y,o.y,A)),this.setTargetDelta(f),this.relativeTarget&&this.relativeTargetOrigin&&this.layout&&this.relativeParent&&this.relativeParent.layout&&(Zc(p,this.layout.layoutBox,this.relativeParent.layout.layoutBox,this.options.layoutAnchor||void 0),cI(this.relativeTarget,this.relativeTargetOrigin,p,A),_&&OL(this.relativeTarget,_)&&(this.isProjectionDirty=!1),_||(_=Ut()),Qn(_,this.relativeTarget)),g&&(this.animationValues=d,zL(d,u,this.latestValues,A,S,x)),y&&y.rotate!==void 0&&(this.animationValues||(this.animationValues=d),this.animationValues.pathRotation=y.rotate),this.root.scheduleUpdateProjection(),this.scheduleRender(),this.animationProgress=A},this.mixTargetDelta(this.options.layoutRoot?1e3:0)}startAnimation(o){var a,l,c;this.notifyListeners("animationStart"),(a=this.currentAnimation)==null||a.stop(),(c=(l=this.resumingFrom)==null?void 0:l.currentAnimation)==null||c.stop(),this.pendingAnimation&&(Lr(this.pendingAnimation),this.pendingAnimation=void 0),this.pendingAnimation=lt.update(()=>{fc.hasAnimatedSinceResize=!0,this.motionValue||(this.motionValue=yo(0)),this.motionValue.jump(0,!1),this.currentAnimation=WL(this.motionValue,[0,1e3],{...o,velocity:0,isSync:!0,onUpdate:u=>{this.mixTargetDelta(u),o.onUpdate&&o.onUpdate(u)},onComplete:()=>{o.onComplete&&o.onComplete(),this.completeAnimation()}}),this.resumingFrom&&(this.resumingFrom.currentAnimation=this.currentAnimation),this.pendingAnimation=void 0})}completeAnimation(){this.resumingFrom&&(this.resumingFrom.currentAnimation=void 0,this.resumingFrom.preserveOpacity=void 0);const o=this.getStack();o&&o.exitAnimationComplete(),this.resumingFrom=this.currentAnimation=this.animationValues=void 0,this.notifyListeners("animationComplete")}finishAnimation(){this.currentAnimation&&(this.mixTargetDelta&&this.mixTargetDelta(qL),this.currentAnimation.stop()),this.completeAnimation()}applyTransformsToTarget(){const o=this.getLead();let{targetWithTransforms:a,target:l,layout:c,latestValues:u}=o;if(!(!a||!l||!c)){if(this!==o&&this.layout&&c&&$1(this.options.animationType,this.layout.layoutBox,c.layoutBox)){l=this.target||Ut();const d=un(this.layout.layoutBox.x);l.x.min=o.target.x.min,l.x.max=l.x.min+d;const f=un(this.layout.layoutBox.y);l.y.min=o.target.y.min,l.y.max=l.y.min+f}Qn(a,l),cc(a,u),ua(this.projectionDeltaWithTransform,this.layoutCorrected,a,u)}}registerSharedNode(o,a){this.sharedNodes.has(o)||this.sharedNodes.set(o,new $L),this.sharedNodes.get(o).add(a);const c=a.options.initialPromotionConfig;a.promote({transition:c?c.transition:void 0,preserveFollowOpacity:c&&c.shouldPreserveFollowOpacity?c.shouldPreserveFollowOpacity(a):void 0})}isLead(){const o=this.getStack();return o?o.lead===this:!0}getLead(){var a;const{layoutId:o}=this.options;return o?((a=this.getStack())==null?void 0:a.lead)||this:this}getPrevLead(){var a;const{layoutId:o}=this.options;return o?(a=this.getStack())==null?void 0:a.prevLead:void 0}getStack(){const{layoutId:o}=this.options;if(o)return this.root.sharedNodes.get(o)}promote({needsReset:o,transition:a,preserveFollowOpacity:l}={}){const c=this.getStack();c&&c.promote(this,l),o&&(this.projectionDelta=void 0,this.needsReset=!0),a&&this.setOptions({transition:a})}relegate(){const o=this.getStack();return o?o.relegate(this):!1}resetSkewAndRotation(){const{visualElement:o}=this.options;if(!o)return;let a=!1;const{latestValues:l}=o;if((l.z||l.rotate||l.rotateX||l.rotateY||l.rotateZ||l.skewX||l.skewY)&&(a=!0),!a)return;const c={};l.z&&jf("z",o,c,this.animationValues);for(let u=0;u<Wf.length;u++)jf(`rotate${Wf[u]}`,o,c,this.animationValues),jf(`skew${Wf[u]}`,o,c,this.animationValues);o.render();for(const u in c)o.setStaticValue(u,c[u]),this.animationValues&&(this.animationValues[u]=c[u]);o.scheduleRender()}applyProjectionStyles(o,a){if(!this.instance||this.isSVG)return;if(!this.isVisible){o.visibility="hidden";return}const l=this.getTransformTemplate();if(this.needsReset){this.needsReset=!1,o.visibility="",o.opacity="",o.pointerEvents=uc(a==null?void 0:a.pointerEvents)||"",o.transform=l?l(this.latestValues,""):"none";return}const c=this.getLead();if(!this.projectionDelta||!this.layout||!c.target){this.options.layoutId&&(o.opacity=this.latestValues.opacity!==void 0?this.latestValues.opacity:1,o.pointerEvents=uc(a==null?void 0:a.pointerEvents)||""),this.hasProjected&&!Yr(this.latestValues)&&(o.transform=l?l({},""):"none",this.hasProjected=!1);return}o.visibility="";const u=c.animationValues||c.latestValues;this.applyTransformsToTarget();let d=BL(this.projectionDeltaWithTransform,this.treeScale,u);l&&(d=l(u,d)),o.transform=d;const{x:f,y:p}=this.projectionDelta;o.transformOrigin=`${f.origin*100}% ${p.origin*100}% 0`,c.animationValues?o.opacity=c===this?u.opacity??this.latestValues.opacity??1:this.preserveOpacity?this.latestValues.opacity:u.opacityExit:o.opacity=c===this?u.opacity!==void 0?u.opacity:"":u.opacityExit!==void 0?u.opacityExit:0;for(const m in ip){if(u[m]===void 0)continue;const{correct:E,applyTo:g,isCSSVariable:h}=ip[m],x=d==="none"?u[m]:E(u[m],c);if(g){const S=g.length;for(let _=0;_<S;_++)o[g[_]]=x}else h?this.options.visualElement.renderState.vars[m]=x:o[m]=x}this.options.layoutId&&(o.pointerEvents=c===this?uc(a==null?void 0:a.pointerEvents)||"":"none")}clearSnapshot(){this.resumeFrom=this.snapshot=void 0}resetTree(){this.root.nodes.forEach(o=>{var a;return(a=o.currentAnimation)==null?void 0:a.stop()}),this.root.nodes.forEach(sv),this.root.sharedNodes.clear()}}}function ZL(t){t.updateLayout()}function QL(t){var n;const e=((n=t.resumeFrom)==null?void 0:n.snapshot)||t.snapshot;if(t.isLead()&&t.layout&&e&&t.hasListeners("didUpdate")){const{layoutBox:i,measuredBox:r}=t.layout,{animationType:s}=t.options,o=e.source!==t.layout.source;if(s==="size")gi(d=>{const f=o?e.measuredBox[d]:e.layoutBox[d],p=un(f);f.min=i[d].min,f.max=f.min+p});else if(s==="x"||s==="y"){const d=s==="x"?"y":"x";rp(o?e.measuredBox[d]:e.layoutBox[d],i[d])}else $1(s,e.layoutBox,i)&&gi(d=>{const f=o?e.measuredBox[d]:e.layoutBox[d],p=un(i[d]);f.max=f.min+p,t.relativeTarget&&!t.currentAnimation&&(t.isProjectionDirty=!0,t.relativeTarget[d].max=t.relativeTarget[d].min+p)});const a=Ks();ua(a,i,e.layoutBox);const l=Ks();o?ua(l,t.applyTransform(r,!0),e.measuredBox):ua(l,i,e.layoutBox);const c=!H1(a);let u=!1;if(!t.resumeFrom){const d=t.getClosestProjectingParent();if(d&&!d.resumeFrom){const{snapshot:f,layout:p}=d;if(f&&p){const m=t.options.layoutAnchor||void 0,E=Ut();Zc(E,e.layoutBox,f.layoutBox,m);const g=Ut();Zc(g,i,p.layoutBox,m),W1(E,g)||(u=!0),d.options.layoutRoot&&(t.relativeTarget=g,t.relativeTargetOrigin=E,t.relativeParent=d)}}}t.notifyListeners("didUpdate",{layout:i,snapshot:e,delta:l,layoutDelta:a,hasLayoutChanged:c,hasRelativeLayoutChanged:u})}else if(t.isLead()){const{onExitComplete:i}=t.options;i&&i()}t.options.transition=void 0}function JL(t){t.parent&&(t.isProjecting()||(t.isProjectionDirty=t.parent.isProjectionDirty),t.isSharedProjectionDirty||(t.isSharedProjectionDirty=!!(t.isProjectionDirty||t.parent.isProjectionDirty||t.parent.isSharedProjectionDirty)),t.isTransformDirty||(t.isTransformDirty=t.parent.isTransformDirty))}function eI(t){t.isProjectionDirty=t.isSharedProjectionDirty=t.isTransformDirty=!1}function tI(t){t.clearSnapshot()}function sv(t){t.clearMeasurements()}function nI(t){t.isLayoutDirty=!0,t.updateLayout()}function ov(t){t.isLayoutDirty=!1}function iI(t){t.isAnimationBlocked&&t.layout&&!t.isLayoutDirty&&(t.snapshot=t.layout,t.isLayoutDirty=!0)}function rI(t){const{visualElement:e}=t.options;e&&e.getProps().onBeforeLayoutMeasure&&e.notify("BeforeLayoutMeasure"),t.resetTransform()}function av(t){t.finishAnimation(),t.targetDelta=t.relativeTarget=t.target=void 0,t.isProjectionDirty=!0}function sI(t){t.resolveTargetDelta()}function oI(t){t.calcProjection()}function aI(t){t.resetSkewAndRotation()}function lI(t){t.removeLeadSnapshot()}function lv(t,e,n){t.translate=at(e.translate,0,n),t.scale=at(e.scale,1,n),t.origin=e.origin,t.originPoint=e.originPoint}function cv(t,e,n,i){t.min=at(e.min,n.min,i),t.max=at(e.max,n.max,i)}function cI(t,e,n,i){cv(t.x,e.x,n.x,i),cv(t.y,e.y,n.y,i)}function uI(t){return t.animationValues&&t.animationValues.opacityExit!==void 0}const fI={duration:.45,ease:[.4,0,.1,1]},uv=t=>typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().includes(t),fv=uv("applewebkit/")&&!uv("chrome/")?Math.round:Hn;function dv(t){t.min=fv(t.min),t.max=fv(t.max)}function dI(t){dv(t.x),dv(t.y)}function $1(t,e,n){return t==="position"||t==="preserve-aspect"&&!IL(ev(e),ev(n),.2)}function hI(t){var e;return t!==t.root&&((e=t.scroll)==null?void 0:e.wasRoot)}const pI=Y1({attachResizeListener:(t,e)=>Na(t,"resize",e),measureScroll:()=>{var t,e;return{x:document.documentElement.scrollLeft||((t=document.body)==null?void 0:t.scrollLeft)||0,y:document.documentElement.scrollTop||((e=document.body)==null?void 0:e.scrollTop)||0}},checkIsScrollRoot:()=>!0}),Xf={current:void 0},q1=Y1({measureScroll:t=>({x:t.scrollLeft,y:t.scrollTop}),defaultParent:()=>{if(!Xf.current){const t=new pI({});t.mount(window),t.setOptions({layoutScroll:!0}),Xf.current=t}return Xf.current},resetTransform:(t,e)=>{t.style.transform=e!==void 0?e:"none"},checkIsScrollRoot:t=>window.getComputedStyle(t).position==="fixed"}),K1=Se.createContext({transformPagePoint:t=>t,isStatic:!1,reducedMotion:"never"});function mI(t=!0){const e=Se.useContext(pm);if(e===null)return[!0,null];const{isPresent:n,onExitComplete:i,register:r}=e,s=Se.useId();Se.useEffect(()=>{if(t)return r(s)},[t]);const o=Se.useCallback(()=>t&&i&&i(s),[s,i,t]);return!n&&i?[!1,o]:[!0]}const Z1=Se.createContext({strict:!1}),hv={animation:["animate","variants","whileHover","whileTap","exit","whileInView","whileFocus","whileDrag"],exit:["exit"],drag:["drag","dragControls"],focus:["whileFocus"],hover:["whileHover","onHoverStart","onHoverEnd"],tap:["whileTap","onTap","onTapStart","onTapCancel"],pan:["onPan","onPanStart","onPanSessionStart","onPanEnd"],inView:["whileInView","onViewportEnter","onViewportLeave"],layout:["layout","layoutId"]};let pv=!1;function gI(){if(pv)return;const t={};for(const e in hv)t[e]={isEnabled:n=>hv[e].some(i=>!!n[i])};A1(t),pv=!0}function Q1(){return gI(),oL()}function xI(t){const e=Q1();for(const n in t)e[n]={...e[n],...t[n]};A1(e)}const wu=Se.createContext({});function vI(t,e){if(Tu(t)){const{initial:n,animate:i}=t;return{initial:n===!1||Ia(n)?n:void 0,animate:Ia(i)?i:void 0}}return t.inherit!==!1?e:{}}function yI(t){const{initial:e,animate:n}=vI(t,Se.useContext(wu));return Se.useMemo(()=>({initial:e,animate:n}),[mv(e),mv(n)])}function mv(t){return Array.isArray(t)?t.join(" "):t}const Bm=()=>({style:{},transform:{},transformOrigin:{},vars:{}});function J1(t,e,n){for(const i in e)!$t(e[i])&&!I1(i,n)&&(t[i]=e[i])}function _I({transformTemplate:t},e){return Se.useMemo(()=>{const n=Bm();return km(n,e,t),Object.assign({},n.vars,n.style)},[e])}function SI(t,e){const n=t.style||{},i={};return J1(i,n,t),Object.assign(i,_I(t,e)),i}function MI(t,e){const n={},i=SI(t,e);return t.drag&&t.dragListener!==!1&&(n.draggable=!1,i.userSelect=i.WebkitUserSelect=i.WebkitTouchCallout="none",i.touchAction=t.drag===!0?"none":`pan-${t.drag==="x"?"y":"x"}`),t.tabIndex===void 0&&(t.onTap||t.onTapStart||t.whileTap)&&(n.tabIndex=0),n.style=i,n}const eM=()=>({...Bm(),attrs:{}});function EI(t,e,n,i){const r=Se.useMemo(()=>{const s=eM();return U1(s,e,k1(i),t.transformTemplate,t.style),{...s.attrs,style:{...s.style}}},[e]);if(t.style){const s={};J1(s,t.style,t),r.style={...s,...r.style}}return r}const TI=new Set(["animate","exit","variants","initial","style","values","variants","transition","transformTemplate","custom","inherit","onBeforeLayoutMeasure","onAnimationStart","onAnimationComplete","onUpdate","onDragStart","onDrag","onDragEnd","onMeasureDragConstraints","onDirectionLock","onDragTransitionEnd","_dragX","_dragY","onHoverStart","onHoverEnd","onViewportEnter","onViewportLeave","globalTapTarget","propagate","ignoreStrict","viewport"]);function Qc(t){return t.startsWith("while")||t.startsWith("drag")&&t!=="draggable"||t.startsWith("layout")||t.startsWith("onTap")||t.startsWith("onPan")||t.startsWith("onLayout")||TI.has(t)}function wI(t,e){return t.startsWith("on")?!Qc(t):(e==null?void 0:e(t))??!Qc(t)}function AI(t,e,n,i){const r={};for(const s in t)s==="values"&&typeof t.values=="object"||$t(t[s])||(wI(s,i)||n===!0&&Qc(s)||!e&&!Qc(s)||t.draggable&&s.startsWith("onDrag"))&&(r[s]=t[s]);return r}const bI=["animate","circle","defs","desc","ellipse","g","image","line","filter","marker","mask","metadata","path","pattern","polygon","polyline","rect","stop","switch","symbol","svg","text","tspan","use","view"];function Vm(t){return typeof t!="string"||t.includes("-")?!1:!!(bI.indexOf(t)>-1||/[A-Z]/u.test(t))}function CI(t,e,n,{latestValues:i},r,s=!1,o,a){const c=(o??Vm(t)?EI:MI)(e,i,r,t),u=AI(e,typeof t=="string",s,a),d=t!==Se.Fragment?{...u,...c,ref:n}:{},{children:f}=e,p=Se.useMemo(()=>$t(f)?f.get():f,[f]);return Se.createElement(t,{...d,children:p})}function RI({scrapeMotionValuesFromProps:t,createRenderState:e},n,i,r){return{latestValues:PI(n,i,r,t),renderState:e()}}function PI(t,e,n,i){const r={},s=i(t,{});for(const f in s)r[f]=uc(s[f]);let{initial:o,animate:a}=t;const l=Tu(t),c=T1(t);e&&c&&!l&&t.inherit!==!1&&(o===void 0&&(o=e.initial),a===void 0&&(a=e.animate));let u=n?n.initial===!1:!1;u=u||o===!1;const d=u?a:o;if(d&&typeof d!="boolean"&&!Eu(d)){const f=Array.isArray(d)?d:[d];for(let p=0;p<f.length;p++){const m=Rm(t,f[p]);if(m){const{transitionEnd:E,transition:g,...h}=m;for(const x in h){let S=h[x];if(Array.isArray(S)){const _=u?S.length-1:0;S=S[_]}S!==null&&(r[x]=S)}for(const x in E)r[x]=E[x]}}}return r}const tM=t=>(e,n)=>{const i=Se.useContext(wu),r=Se.useContext(pm),s=()=>RI(t,e,i,r);return n?s():b3(s)},DI=tM({scrapeMotionValuesFromProps:Om,createRenderState:Bm}),LI=tM({scrapeMotionValuesFromProps:O1,createRenderState:eM}),II=Symbol.for("motionComponentSymbol");function NI(t,e,n){const i=Se.useRef(n);Se.useInsertionEffect(()=>{i.current=n});const r=Se.useRef(null);return Se.useCallback(s=>{var a;s&&((a=t.onMount)==null||a.call(t,s)),e&&(s?e.mount(s):e.unmount());const o=i.current;if(typeof o=="function")if(s){const l=o(s);typeof l=="function"&&(r.current=l)}else r.current?(r.current(),r.current=null):o(s);else o&&(o.current=s)},[e])}const nM=Se.createContext({});function Us(t){return t&&typeof t=="object"&&Object.prototype.hasOwnProperty.call(t,"current")}function UI(t,e,n,i,r,s){var S,_;const{visualElement:o}=Se.useContext(wu),a=Se.useContext(Z1),l=Se.useContext(pm),c=Se.useContext(K1),u=c.reducedMotion,d=c.skipAnimations,f=Se.useRef(null),p=Se.useRef(!1);i=i||a.renderer,!f.current&&i&&(f.current=i(t,{visualState:e,parent:o,props:n,presenceContext:l,blockInitialAnimation:l?l.initial===!1:!1,reducedMotionConfig:u,skipAnimations:d,isSVG:s}),p.current&&f.current&&(f.current.manuallyAnimateOnMount=!0));const m=f.current,E=Se.useContext(nM);m&&!m.projection&&r&&(m.type==="html"||m.type==="svg")&&FI(f.current,n,r,E);const g=Se.useRef(!1);Se.useInsertionEffect(()=>{m&&g.current&&m.update(n,l)});const h=n[d1],x=Se.useRef(!!h&&typeof window<"u"&&!((S=window.MotionHandoffIsComplete)!=null&&S.call(window,h))&&((_=window.MotionHasOptimisedAnimation)==null?void 0:_.call(window,h)));return R3(()=>{p.current=!0,m&&(g.current=!0,window.MotionIsMounted=!0,m.updateFeatures(),m.scheduleRenderMicrotask(),x.current&&m.animationState&&m.animationState.animateChanges())}),Se.useEffect(()=>{m&&(!x.current&&m.animationState&&m.animationState.animateChanges(),x.current&&(queueMicrotask(()=>{var w;(w=window.MotionHandoffMarkAsComplete)==null||w.call(window,h)}),x.current=!1),m.enteringChildren=void 0)}),m}function FI(t,e,n,i){const{layoutId:r,layout:s,drag:o,dragConstraints:a,layoutScroll:l,layoutRoot:c,layoutAnchor:u,layoutCrossfade:d}=e;t.projection=new n(t.latestValues,e["data-framer-portal-id"]?void 0:iM(t.parent)),t.projection.setOptions({layoutId:r,layout:s,alwaysMeasureLayout:!!o||a&&Us(a),visualElement:t,animationType:typeof s=="string"?s:"both",initialPromotionConfig:i,crossfade:d,layoutScroll:l,layoutRoot:c,layoutAnchor:u})}function iM(t){if(t)return t.options.allowProjection!==!1?t.projection:iM(t.parent)}function Yf(t,{forwardMotionProps:e=!1,type:n}={},i,r){i&&xI(i);const s=n?n==="svg":Vm(t),o=s?LI:DI;function a(c,u){let d;const f={...Se.useContext(K1),...c,layoutId:kI(c)},{isStatic:p,isValidProp:m}=f,E=yI(c),g=o(c,p);if(!p&&typeof window<"u"){OI();const h=BI(f);d=h.MeasureLayout,E.visualElement=UI(t,g,f,r,h.ProjectionNode,s)}return v.jsxs(wu.Provider,{value:E,children:[d&&E.visualElement?v.jsx(d,{visualElement:E.visualElement,...f}):null,CI(t,c,NI(g,E.visualElement,u),g,p,e,s,m)]})}a.displayName=`motion.${typeof t=="string"?t:`create(${t.displayName??t.name??""})`}`;const l=Se.forwardRef(a);return l[II]=t,l}function kI({layoutId:t}){const e=Se.useContext(wS).id;return e&&t!==void 0?e+"-"+t:t}function OI(t,e){Se.useContext(Z1).strict}function BI(t){const e=Q1(),{drag:n,layout:i}=e;if(!n&&!i)return{};const r={...n,...i};return{MeasureLayout:n!=null&&n.isEnabled(t)||i!=null&&i.isEnabled(t)?r.MeasureLayout:void 0,ProjectionNode:r.ProjectionNode}}function VI(t,e){if(typeof Proxy>"u")return Yf;const n=new Map,i=(s,o)=>Yf(s,o,t,e),r=(s,o)=>i(s,o);return new Proxy(r,{get:(s,o)=>o==="create"?i:(n.has(o)||n.set(o,Yf(o,void 0,t,e)),n.get(o))})}const zI=(t,e)=>e.isSVG??Vm(t)?new ML(e):new xL(e,{allowProjection:t!==Se.Fragment});class GI extends kr{constructor(e){super(e),e.animationState||(e.animationState=bL(e))}updateAnimationControlsSubscription(){const{animate:e}=this.node.getProps();Eu(e)&&(this.unmountControls=e.subscribe(this.node))}mount(){this.updateAnimationControlsSubscription()}update(){const{animate:e}=this.node.getProps(),{animate:n}=this.node.prevProps||{};e!==n&&this.updateAnimationControlsSubscription()}unmount(){var e;this.node.animationState.reset(),(e=this.unmountControls)==null||e.call(this)}}let HI=0;class WI extends kr{constructor(){super(...arguments),this.id=HI++,this.isExitComplete=!1}update(){var s;if(!this.node.presenceContext)return;const{isPresent:e,onExitComplete:n}=this.node.presenceContext,{isPresent:i}=this.node.prevPresenceContext||{};if(!this.node.animationState||e===i)return;if(e&&i===!1){if(this.isExitComplete){const{initial:o,custom:a}=this.node.getProps();if(typeof o=="string"||typeof o=="object"&&o!==null&&!Array.isArray(o)){const l=os(this.node,o,a);if(l){const{transition:c,transitionEnd:u,...d}=l;for(const f in d)(s=this.node.getValue(f))==null||s.jump(d[f])}}this.node.animationState.reset(),this.node.animationState.animateChanges()}else this.node.animationState.setActive("exit",!1);this.isExitComplete=!1;return}const r=this.node.animationState.setActive("exit",!e);n&&!e&&r.then(()=>{this.isExitComplete=!0,n(this.id)})}mount(){const{register:e,onExitComplete:n}=this.node.presenceContext||{};n&&n(this.id),e&&(this.unmount=e(this.id))}unmount(){}}const jI={animation:{Feature:GI},exit:{Feature:WI}};function Ya(t){return{point:{x:t.pageX,y:t.pageY}}}const XI=t=>e=>Im(e)&&t(e,Ya(e));function fa(t,e,n,i){return Na(t,e,XI(n),i)}const rM=({current:t})=>t?t.ownerDocument.defaultView:null,gv=(t,e)=>Math.abs(t-e);function YI(t,e){const n=gv(t.x,e.x),i=gv(t.y,e.y);return Math.sqrt(n**2+i**2)}const xv=new Set(["auto","scroll"]);class sM{constructor(e,n,{transformPagePoint:i,contextWindow:r=window,dragSnapToOrigin:s=!1,distanceThreshold:o=3,element:a}={}){if(this.startEvent=null,this.lastMoveEvent=null,this.lastMoveEventInfo=null,this.lastRawMoveEventInfo=null,this.handlers={},this.contextWindow=window,this.scrollPositions=new Map,this.removeScrollListeners=null,this.onElementScroll=m=>{this.handleScroll(m.target)},this.onWindowScroll=()=>{this.handleScroll(window)},this.updatePoint=()=>{if(!(this.lastMoveEvent&&this.lastMoveEventInfo))return;this.lastRawMoveEventInfo&&(this.lastMoveEventInfo=Bl(this.lastRawMoveEventInfo,this.transformPagePoint));const m=$f(this.lastMoveEventInfo,this.history),E=this.startEvent!==null,g=YI(m.offset,{x:0,y:0})>=this.distanceThreshold;if(!E&&!g)return;const{point:h}=m,{timestamp:x}=Xt;this.history.push({...h,timestamp:x});const{onStart:S,onMove:_}=this.handlers;E||(S&&S(this.lastMoveEvent,m),this.startEvent=this.lastMoveEvent),_&&_(this.lastMoveEvent,m)},this.handlePointerMove=(m,E)=>{this.lastMoveEvent=m,this.lastRawMoveEventInfo=E,this.lastMoveEventInfo=Bl(E,this.transformPagePoint),lt.update(this.updatePoint,!0)},this.handlePointerUp=(m,E)=>{this.end();const{onEnd:g,onSessionEnd:h,resumeAnimation:x}=this.handlers;if((this.dragSnapToOrigin||!this.startEvent)&&x&&x(),!(this.lastMoveEvent&&this.lastMoveEventInfo))return;const S=$f(m.type==="pointercancel"?this.lastMoveEventInfo:Bl(E,this.transformPagePoint),this.history);this.startEvent&&g&&g(m,S),h&&h(m,S)},!Im(e))return;this.dragSnapToOrigin=s,this.handlers=n,this.transformPagePoint=i,this.distanceThreshold=o,this.contextWindow=r||window;const l=Ya(e),c=Bl(l,this.transformPagePoint),{point:u}=c,{timestamp:d}=Xt;this.history=[{...u,timestamp:d}];const{onSessionStart:f}=n;f&&f(e,$f(c,this.history));const p={passive:!0,capture:!0};this.removeListeners=Wa(fa(this.contextWindow,"pointermove",this.handlePointerMove,p),fa(this.contextWindow,"pointerup",this.handlePointerUp,p),fa(this.contextWindow,"pointercancel",this.handlePointerUp,p)),a&&this.startScrollTracking(a)}startScrollTracking(e){let n=e.parentElement;for(;n;){const i=getComputedStyle(n);(xv.has(i.overflowX)||xv.has(i.overflowY))&&this.scrollPositions.set(n,{x:n.scrollLeft,y:n.scrollTop}),n=n.parentElement}this.scrollPositions.set(window,{x:window.scrollX,y:window.scrollY}),window.addEventListener("scroll",this.onElementScroll,{capture:!0}),window.addEventListener("scroll",this.onWindowScroll),this.removeScrollListeners=()=>{window.removeEventListener("scroll",this.onElementScroll,{capture:!0}),window.removeEventListener("scroll",this.onWindowScroll)}}handleScroll(e){const n=this.scrollPositions.get(e);if(!n)return;const i=e===window,r=i?{x:window.scrollX,y:window.scrollY}:{x:e.scrollLeft,y:e.scrollTop},s={x:r.x-n.x,y:r.y-n.y};s.x===0&&s.y===0||(i?this.lastMoveEventInfo&&(this.lastMoveEventInfo.point.x+=s.x,this.lastMoveEventInfo.point.y+=s.y):this.history.length>0&&(this.history[0].x-=s.x,this.history[0].y-=s.y),this.scrollPositions.set(e,r),lt.update(this.updatePoint,!0))}updateHandlers(e){this.handlers=e}end(){this.removeListeners&&this.removeListeners(),this.removeScrollListeners&&this.removeScrollListeners(),this.scrollPositions.clear(),Lr(this.updatePoint)}}function Bl(t,e){return e?{point:e(t.point)}:t}function vv(t,e){return{x:t.x-e.x,y:t.y-e.y}}function $f({point:t},e){return{point:t,delta:vv(t,oM(e)),offset:vv(t,$I(e)),velocity:qI(e,.1)}}function $I(t){return t[0]}function oM(t){return t[t.length-1]}function qI(t,e){if(t.length<2)return{x:0,y:0};let n=t.length-1,i=null;const r=oM(t);for(;n>=0&&(i=t[n],!(r.timestamp-i.timestamp>Wn(e)));)n--;if(!i)return{x:0,y:0};i===t[0]&&t.length>2&&r.timestamp-i.timestamp>Wn(e)*2&&(i=t[1]);const s=zn(r.timestamp-i.timestamp);if(s===0)return{x:0,y:0};const o={x:(r.x-i.x)/s,y:(r.y-i.y)/s};return o.x===1/0&&(o.x=0),o.y===1/0&&(o.y=0),o}function KI(t,{min:e,max:n},i){return e!==void 0&&t<e?t=i?at(e,t,i.min):Math.max(t,e):n!==void 0&&t>n&&(t=i?at(n,t,i.max):Math.min(t,n)),t}function yv(t,e,n){return{min:e!==void 0?t.min+e:void 0,max:n!==void 0?t.max+n-(t.max-t.min):void 0}}function ZI(t,{top:e,left:n,bottom:i,right:r}){return{x:yv(t.x,n,r),y:yv(t.y,e,i)}}function _v(t,e){let n=e.min-t.min,i=e.max-t.max;return e.max-e.min<t.max-t.min&&([n,i]=[i,n]),{min:n,max:i}}function QI(t,e){return{x:_v(t.x,e.x),y:_v(t.y,e.y)}}function JI(t,e){let n=.5;const i=un(t),r=un(e);return r>i?n=Da(e.min,e.max-i,t.min):i>r&&(n=Da(t.min,t.max-r,e.min)),Di(0,1,n)}function eN(t,e){const n={};return e.min!==void 0&&(n.min=e.min-t.min),e.max!==void 0&&(n.max=e.max-t.min),n}const sp=.35;function tN(t=sp){return t===!1?t=0:t===!0&&(t=sp),{x:Sv(t,"left","right"),y:Sv(t,"top","bottom")}}function Sv(t,e,n){return{min:Mv(t,e),max:Mv(t,n)}}function Mv(t,e){return typeof t=="number"?t:t[e]||0}const nN=new WeakMap;class iN{constructor(e){this.openDragLock=null,this.isDragging=!1,this.currentDirection=null,this.originPoint={x:0,y:0},this.constraints=!1,this.hasMutatedConstraints=!1,this.elastic=Ut(),this.latestPointerEvent=null,this.latestPanInfo=null,this.visualElement=e}start(e,{snapToCursor:n=!1,distanceThreshold:i}={}){const{presenceContext:r}=this.visualElement;if(r&&r.isPresent===!1)return;const s=d=>{n&&this.snapToCursor(Ya(d).point),this.stopAnimation()},o=(d,f)=>{const{drag:p,dragPropagation:m,onDragStart:E}=this.getProps();if(p&&!m&&(this.openDragLock&&this.openDragLock(),this.openDragLock=FD(p),!this.openDragLock))return;this.latestPointerEvent=d,this.latestPanInfo=f,this.isDragging=!0,this.currentDirection=null,this.resolveConstraints(),this.visualElement.projection&&(this.visualElement.projection.isAnimationBlocked=!0,this.visualElement.projection.target=void 0),gi(h=>{let x=this.getAxisMotionValue(h).get()||0;if(bi.test(x)){const{projection:S}=this.visualElement;if(S&&S.layout){const _=S.layout.layoutBox[h];_&&(x=un(_)*(parseFloat(x)/100))}}this.originPoint[h]=x}),E&&lt.update(()=>E(d,f),!1,!0),qh(this.visualElement,"transform");const{animationState:g}=this.visualElement;g&&g.setActive("whileDrag",!0)},a=(d,f)=>{this.latestPointerEvent=d,this.latestPanInfo=f;const{dragPropagation:p,dragDirectionLock:m,onDirectionLock:E,onDrag:g}=this.getProps();if(!p&&!this.openDragLock)return;const{offset:h}=f;if(m&&this.currentDirection===null){this.currentDirection=sN(h),this.currentDirection!==null&&E&&E(this.currentDirection);return}this.updateAxis("x",f.point,h),this.updateAxis("y",f.point,h),this.visualElement.render(),g&&lt.update(()=>g(d,f),!1,!0)},l=(d,f)=>{this.latestPointerEvent=d,this.latestPanInfo=f,this.stop(d,f),this.latestPointerEvent=null,this.latestPanInfo=null},c=()=>{const{dragSnapToOrigin:d}=this.getProps();(d||this.constraints)&&this.startAnimation({x:0,y:0})},{dragSnapToOrigin:u}=this.getProps();this.panSession=new sM(e,{onSessionStart:s,onStart:o,onMove:a,onSessionEnd:l,resumeAnimation:c},{transformPagePoint:this.visualElement.getTransformPagePoint(),dragSnapToOrigin:u,distanceThreshold:i,contextWindow:rM(this.visualElement),element:this.visualElement.current})}stop(e,n){const i=e||this.latestPointerEvent,r=n||this.latestPanInfo,s=this.isDragging;if(this.cancel(),!s||!r||!i)return;const{velocity:o}=r;this.startAnimation(o);const{onDragEnd:a}=this.getProps();a&&lt.postRender(()=>a(i,r))}cancel(){this.isDragging=!1;const{projection:e,animationState:n}=this.visualElement;e&&(e.isAnimationBlocked=!1),this.endPanSession();const{dragPropagation:i}=this.getProps();!i&&this.openDragLock&&(this.openDragLock(),this.openDragLock=null),n&&n.setActive("whileDrag",!1)}endPanSession(){this.panSession&&this.panSession.end(),this.panSession=void 0}updateAxis(e,n,i){const{drag:r}=this.getProps();if(!i||!Vl(e,r,this.currentDirection))return;const s=this.getAxisMotionValue(e);let o=this.originPoint[e]+i[e];this.constraints&&this.constraints[e]&&(o=KI(o,this.constraints[e],this.elastic[e])),s.set(o)}resolveConstraints(){var s;const{dragConstraints:e,dragElastic:n}=this.getProps(),i=this.visualElement.projection&&!this.visualElement.projection.layout?this.visualElement.projection.measure(!1):(s=this.visualElement.projection)==null?void 0:s.layout,r=this.constraints;e&&Us(e)?this.constraints||(this.constraints=this.resolveRefConstraints()):e&&i?this.constraints=ZI(i.layoutBox,e):this.constraints=!1,this.elastic=tN(n),r!==this.constraints&&!Us(e)&&i&&this.constraints&&!this.hasMutatedConstraints&&gi(o=>{this.constraints!==!1&&this.getAxisMotionValue(o)&&(this.constraints[o]=eN(i.layoutBox[o],this.constraints[o]))})}resolveRefConstraints(){const{dragConstraints:e,onMeasureDragConstraints:n}=this.getProps();if(!e||!Us(e))return!1;const i=e.current,{projection:r}=this.visualElement;if(!r||!r.layout)return!1;r.root&&(r.root.scroll=void 0,r.root.updateScroll());const s=fL(i,r.root,this.visualElement.getTransformPagePoint());let o=QI(r.layout.layoutBox,s);if(n){const a=n(lL(o));this.hasMutatedConstraints=!!a,a&&(o=C1(a))}return o}startAnimation(e){const{drag:n,dragMomentum:i,dragElastic:r,dragTransition:s,dragSnapToOrigin:o,onDragTransitionEnd:a}=this.getProps(),l=this.constraints||{},c=gi(u=>{if(!Vl(u,n,this.currentDirection))return;let d=l&&l[u]||{};(o===!0||o===u)&&(d={min:0,max:0});const f=r?200:1e6,p=r?40:1e7,m={type:"inertia",velocity:i?e[u]:0,bounceStiffness:f,bounceDamping:p,timeConstant:750,restDelta:1,restSpeed:10,...s,...d};return this.startAxisValueAnimation(u,m)});return Promise.all(c).then(a)}startAxisValueAnimation(e,n){const i=this.getAxisMotionValue(e);return qh(this.visualElement,e),i.start(Cm(e,i,0,n,this.visualElement,!1))}stopAnimation(){gi(e=>this.getAxisMotionValue(e).stop())}getAxisMotionValue(e){const n=`_drag${e.toUpperCase()}`,r=this.visualElement.getProps()[n];return r||this.visualElement.getValue(e,this.visualElement.latestValues[e]??0)}snapToCursor(e){gi(n=>{const{drag:i}=this.getProps();if(!Vl(n,i,this.currentDirection))return;const{projection:r}=this.visualElement,s=this.getAxisMotionValue(n);if(r&&r.layout){const{min:o,max:a}=r.layout.layoutBox[n],l=s.get()||0;s.set(e[n]-at(o,a,.5)+l)}})}scalePositionWithinConstraints(){if(!this.visualElement.current)return;const{drag:e,dragConstraints:n}=this.getProps(),{projection:i}=this.visualElement;if(!Us(n)||!i||!this.constraints)return;this.stopAnimation();const r={x:0,y:0};gi(o=>{const a=this.getAxisMotionValue(o);if(a&&this.constraints!==!1){const l=a.get();r[o]=JI({min:l,max:l},this.constraints[o])}});const{transformTemplate:s}=this.visualElement.getProps();this.visualElement.current.style.transform=s?s({},""):"none",i.root&&i.root.updateScroll(),i.updateLayout(),this.constraints=!1,this.resolveConstraints(),gi(o=>{if(!Vl(o,e,null))return;const a=this.getAxisMotionValue(o),{min:l,max:c}=this.constraints[o];a.set(at(l,c,r[o]))}),this.visualElement.render()}addListeners(){if(!this.visualElement.current)return;nN.set(this.visualElement,this);const e=this.visualElement.current,n=fa(e,"pointerdown",c=>{const{drag:u,dragListener:d=!0}=this.getProps(),f=c.target,p=f!==e&&GD(f);u&&d&&!p&&this.start(c)});let i;const r=()=>{const{dragConstraints:c}=this.getProps();Us(c)&&c.current&&(this.constraints=this.resolveRefConstraints(),i||(i=rN(e,c.current,()=>this.scalePositionWithinConstraints())))},{projection:s}=this.visualElement,o=s.addEventListener("measure",r);s&&!s.layout&&(s.root&&s.root.updateScroll(),s.updateLayout()),lt.read(r);const a=Na(window,"resize",()=>this.scalePositionWithinConstraints()),l=s.addEventListener("didUpdate",({delta:c,hasLayoutChanged:u})=>{this.isDragging&&u&&(gi(d=>{const f=this.getAxisMotionValue(d);f&&(this.originPoint[d]+=c[d].translate,f.set(f.get()+c[d].translate))}),this.visualElement.render())});return()=>{a(),n(),o(),l&&l(),i&&i()}}getProps(){const e=this.visualElement.getProps(),{drag:n=!1,dragDirectionLock:i=!1,dragPropagation:r=!1,dragConstraints:s=!1,dragElastic:o=sp,dragMomentum:a=!0}=e;return{...e,drag:n,dragDirectionLock:i,dragPropagation:r,dragConstraints:s,dragElastic:o,dragMomentum:a}}}function Ev(t){let e=!0;return()=>{if(e){e=!1;return}t()}}function rN(t,e,n){const i=Lx(t,Ev(n)),r=Lx(e,Ev(n));return()=>{i(),r()}}function Vl(t,e,n){return(e===!0||e===t)&&(n===null||n===t)}function sN(t,e=10){let n=null;return Math.abs(t.y)>e?n="y":Math.abs(t.x)>e&&(n="x"),n}class oN extends kr{constructor(e){super(e),this.removeGroupControls=Hn,this.removeListeners=Hn,this.controls=new iN(e)}mount(){const{dragControls:e}=this.node.getProps();e&&(this.removeGroupControls=e.subscribe(this.controls)),this.removeListeners=this.controls.addListeners()||Hn}update(){const{dragControls:e}=this.node.getProps(),{dragControls:n}=this.node.prevProps||{};e!==n&&(this.removeGroupControls(),e&&(this.removeGroupControls=e.subscribe(this.controls)))}unmount(){this.removeGroupControls(),this.removeListeners(),this.controls.isDragging||this.controls.endPanSession()}}const qf=t=>(e,n)=>{t&&lt.update(()=>t(e,n),!1,!0)};class aN extends kr{constructor(){super(...arguments),this.removePointerDownListener=Hn}onPointerDown(e){this.session=new sM(e,this.createPanHandlers(),{transformPagePoint:this.node.getTransformPagePoint(),contextWindow:rM(this.node)})}createPanHandlers(){const{onPanSessionStart:e,onPanStart:n,onPan:i,onPanEnd:r}=this.node.getProps();return{onSessionStart:qf(e),onStart:qf(n),onMove:qf(i),onEnd:(s,o)=>{delete this.session,r&&lt.postRender(()=>r(s,o))}}}mount(){this.removePointerDownListener=fa(this.node.current,"pointerdown",e=>this.onPointerDown(e))}update(){this.session&&this.session.updateHandlers(this.createPanHandlers())}unmount(){this.removePointerDownListener(),this.session&&this.session.end()}}let Kf=!1;class lN extends Se.Component{componentDidMount(){const{visualElement:e,layoutGroup:n,switchLayoutGroup:i,layoutId:r}=this.props,{projection:s}=e;s&&(n.group&&n.group.add(s),i&&i.register&&r&&i.register(s),Kf&&s.root.didUpdate(),s.addEventListener("animationComplete",()=>{this.safeToRemove()}),s.setOptions({...s.options,layoutDependency:this.props.layoutDependency,onExitComplete:()=>this.safeToRemove()})),fc.hasEverUpdated=!0}getSnapshotBeforeUpdate(e){const{layoutDependency:n,visualElement:i,drag:r,isPresent:s}=this.props,{projection:o}=i;return o&&(o.isPresent=s,e.layoutDependency!==n&&o.setOptions({...o.options,layoutDependency:n}),Kf=!0,r||e.layoutDependency!==n||n===void 0||e.isPresent!==s?o.willUpdate():this.safeToRemove(),e.isPresent!==s&&(s?o.promote():o.relegate()||lt.postRender(()=>{const a=o.getStack();(!a||!a.members.length)&&this.safeToRemove()}))),null}componentDidUpdate(){const{visualElement:e,layoutAnchor:n}=this.props,{projection:i}=e;i&&(i.options.layoutAnchor=n,i.root.didUpdate(),Lm.postRender(()=>{!i.currentAnimation&&i.isLead()&&this.safeToRemove()}))}componentWillUnmount(){const{visualElement:e,layoutGroup:n,switchLayoutGroup:i}=this.props,{projection:r}=e;Kf=!0,r&&(r.scheduleCheckAfterUnmount(),n&&n.group&&n.group.remove(r),i&&i.deregister&&i.deregister(r))}safeToRemove(){const{safeToRemove:e}=this.props;e&&e()}render(){return null}}function aM(t){const[e,n]=mI(),i=Se.useContext(wS);return v.jsx(lN,{...t,layoutGroup:i,switchLayoutGroup:Se.useContext(nM),isPresent:e,safeToRemove:n})}const cN={pan:{Feature:aN},drag:{Feature:oN,ProjectionNode:q1,MeasureLayout:aM}};function Tv(t,e,n){const{props:i}=t;t.animationState&&i.whileHover&&t.animationState.setActive("whileHover",n==="Start");const r="onHover"+n,s=i[r];s&&lt.postRender(()=>s(e,Ya(e)))}class uN extends kr{mount(){const{current:e}=this.node;e&&(this.unmount=OD(e,(n,i)=>(Tv(this.node,i,"Start"),r=>Tv(this.node,r,"End"))))}unmount(){}}class fN extends kr{constructor(){super(...arguments),this.isActive=!1}onFocus(){let e=!1;try{e=this.node.current.matches(":focus-visible")}catch{e=!0}!e||!this.node.animationState||(this.node.animationState.setActive("whileFocus",!0),this.isActive=!0)}onBlur(){!this.isActive||!this.node.animationState||(this.node.animationState.setActive("whileFocus",!1),this.isActive=!1)}mount(){this.unmount=Wa(Na(this.node.current,"focus",()=>this.onFocus()),Na(this.node.current,"blur",()=>this.onBlur()))}unmount(){}}function wv(t,e,n){const{props:i}=t;if(t.current instanceof HTMLButtonElement&&t.current.disabled)return;t.animationState&&i.whileTap&&t.animationState.setActive("whileTap",n==="Start");const r="onTap"+(n==="End"?"":n),s=i[r];s&&lt.postRender(()=>s(e,Ya(e)))}class dN extends kr{mount(){const{current:e}=this.node;if(!e)return;const{globalTapTarget:n,propagate:i}=this.node.props;this.unmount=WD(e,(r,s)=>(wv(this.node,s,"Start"),(o,{success:a})=>wv(this.node,o,a?"End":"Cancel")),{useGlobalTarget:n,stopPropagation:(i==null?void 0:i.tap)===!1})}unmount(){}}const op=new WeakMap,Zf=new WeakMap,hN=t=>{const e=op.get(t.target);e&&e(t)},pN=t=>{t.forEach(hN)};function mN({root:t,...e}){const n=t||document;Zf.has(n)||Zf.set(n,{});const i=Zf.get(n),r=JSON.stringify(e);return i[r]||(i[r]=new IntersectionObserver(pN,{root:t,...e})),i[r]}function gN(t,e,n){const i=mN(e);return op.set(t,n),i.observe(t),()=>{op.delete(t),i.unobserve(t)}}const xN={some:0,all:1};class vN extends kr{constructor(){super(...arguments),this.hasEnteredView=!1,this.isInView=!1}startObserver(){var l;(l=this.stopObserver)==null||l.call(this);const{viewport:e={}}=this.node.getProps(),{root:n,margin:i,amount:r="some",once:s}=e,o={root:n?n.current:void 0,rootMargin:i,threshold:typeof r=="number"?r:xN[r]},a=c=>{const{isIntersecting:u}=c;if(this.isInView===u||(this.isInView=u,s&&!u&&this.hasEnteredView))return;u&&(this.hasEnteredView=!0),this.node.animationState&&this.node.animationState.setActive("whileInView",u);const{onViewportEnter:d,onViewportLeave:f}=this.node.getProps(),p=u?d:f;p&&p(c)};this.stopObserver=gN(this.node.current,o,a)}mount(){this.startObserver()}update(){if(typeof IntersectionObserver>"u")return;const{props:e,prevProps:n}=this.node;["amount","margin","root"].some(yN(e,n))&&this.startObserver()}unmount(){var e;(e=this.stopObserver)==null||e.call(this),this.hasEnteredView=!1,this.isInView=!1}}function yN({viewport:t={}},{viewport:e={}}={}){return n=>t[n]!==e[n]}const _N={inView:{Feature:vN},tap:{Feature:dN},focus:{Feature:fN},hover:{Feature:uN}},SN={layout:{ProjectionNode:q1,MeasureLayout:aM}},MN={...jI,..._N,...cN,...SN},EN=VI(MN,zI),TN="SatQuery AI.".toUpperCase(),wN=["#D8D365","#E6F082","#D8D365","#605B51","#D8D365","#E6F082","#D8D365","#605B51","#454040","#D8D365","#E6F082","#D8D365"],AN=3200,Av=1200,bN=700,bv=2e3;function CN(t){const e=t*9301+49297,n=i=>{const r=Math.sin(e+i)*1e4;return r-Math.floor(r)};return{x:(n(1)-.5)*100,y:(n(2)-.5)*100,rotate:n(3)>.4?(n(4)-.5)*24:0}}function RN(t){return{duration:2+t%6*.22,amplitude:5+t%4*1.5}}function PN(){const t=Se.useMemo(()=>TN.split(""),[]),e=Se.useMemo(()=>t.map((s,o)=>CN(o)),[t]),n=Se.useMemo(()=>t.map((s,o)=>RN(o)),[t]),[i,r]=Se.useState("reassembling");return Se.useEffect(()=>{let s;const o=(a=!1)=>{s=setTimeout(()=>{r("scattered"),s=setTimeout(()=>{r("reassembling"),s=setTimeout(()=>{r("floating"),o(!1)},bv)},Av+bN)},a?400:AN)};return s=setTimeout(()=>{r("floating"),o(!0)},bv),()=>clearTimeout(s)},[]),v.jsx("div",{style:{display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"center"},children:t.map((s,o)=>{const{x:a,y:l,rotate:c}=e[o],{duration:u,amplitude:d}=n[o],f=s===" ";let p;i==="scattered"?p={x:a,y:l,rotate:c,opacity:.6}:i==="reassembling"?p={x:0,y:0,rotate:0,opacity:1}:p={y:[0,-d,0],opacity:1};let m;return i==="scattered"?m={duration:Av/1e3,ease:"easeInOut"}:i==="reassembling"?m={type:"spring",stiffness:60,damping:22,mass:1,restDelta:.001,restSpeed:.001}:m={opacity:{duration:.4,ease:"easeOut"},y:{duration:u,ease:"easeInOut",repeat:1/0,repeatType:"mirror"}},v.jsx(EN.span,{style:{display:"inline-block",fontSize:"clamp(3rem, 8vw, 9rem)",fontWeight:900,fontFamily:"'Inter', 'Segoe UI', system-ui, sans-serif",letterSpacing:"-0.02em",userSelect:"none",color:f?"transparent":wN[o]??"#D8D365",lineHeight:1},animate:p,transition:m,children:f?" ":s},`${s}-${o}`)})})}function DN(){return v.jsxs(v.Fragment,{children:[v.jsx("style",{children:`
        @keyframes isroBlobMorph {
          0%   { border-radius: 62% 38% 46% 54% / 60% 44% 56% 40%; }
          10%  { border-radius: 38% 62% 60% 40% / 42% 58% 42% 58%; }
          20%  { border-radius: 50% 50% 28% 72% / 50% 34% 66% 50%; }
          30%  { border-radius: 68% 32% 52% 48% / 38% 62% 38% 62%; }
          40%  { border-radius: 34% 66% 42% 58% / 66% 28% 72% 34%; }
          50%  { border-radius: 56% 44% 64% 36% / 48% 72% 28% 52%; }
          60%  { border-radius: 44% 56% 36% 64% / 72% 40% 60% 28%; }
          70%  { border-radius: 70% 30% 54% 46% / 34% 66% 34% 66%; }
          80%  { border-radius: 32% 68% 66% 34% / 56% 44% 56% 44%; }
          90%  { border-radius: 58% 42% 30% 70% / 44% 56% 44% 56%; }
          100% { border-radius: 62% 38% 46% 54% / 60% 44% 56% 40%; }
        }


        .isro-frame-ring {
          animation: isroBlobMorph 8s ease-in-out infinite;
        }

        .isro-frame-clip {
          animation: isroBlobMorph 8s ease-in-out infinite;
        }

        .isro-badge-wrap:hover .isro-frame-ring,
        .isro-badge-wrap:hover .isro-frame-clip {
          animation-play-state: paused;
        }

        .isro-badge-wrap:hover {
          transform: scale(1.08);
        }
      `}),v.jsxs("div",{className:"isro-badge-wrap",style:{position:"fixed",bottom:"22px",right:"26px",zIndex:100,display:"flex",flexDirection:"column",alignItems:"center",gap:"7px",cursor:"default",transition:"transform 0.35s ease"},children:[v.jsxs("div",{style:{position:"relative",width:"104px",height:"104px"},children:[v.jsx("div",{className:"isro-frame-ring",style:{position:"absolute",inset:"-4px",background:"linear-gradient(135deg, #e6641e 0%, #E6F082 40%, #D8D365 60%, #e6641e 100%)"}}),v.jsx("div",{className:"isro-frame-ring",style:{position:"absolute",inset:"-1px",background:"#050508",zIndex:1}}),v.jsx("div",{className:"isro-frame-clip",style:{position:"absolute",inset:0,overflow:"hidden",zIndex:2,background:"#ffffff",display:"flex",alignItems:"center",justifyContent:"center"},children:v.jsx("img",{src:"/isro_official.svg",alt:"ISRO — Indian Space Research Organisation",style:{width:"90%",height:"90%",objectFit:"contain",display:"block"}})})]}),v.jsx("span",{style:{fontSize:"8.5px",fontWeight:700,letterSpacing:"0.2em",color:"rgba(230,100,30,0.80)",textTransform:"uppercase",userSelect:"none"},children:"ISRO"})]})]})}function LN(){const t=Array.from({length:24}).map((e,n)=>{const r=n*360/24*Math.PI/180;return{x1:50+6*Math.cos(r),y1:50+6*Math.sin(r),x2:50+43*Math.cos(r),y2:50+43*Math.sin(r)}});return v.jsxs(v.Fragment,{children:[v.jsx("style",{children:`
        @keyframes indiaBlobMorph {
          0%   { border-radius: 58% 42% 52% 48% / 48% 62% 38% 52%; }
          12%  { border-radius: 42% 58% 36% 64% / 62% 44% 56% 38%; }
          24%  { border-radius: 66% 34% 60% 40% / 36% 68% 32% 64%; }
          36%  { border-radius: 38% 62% 44% 56% / 70% 30% 70% 30%; }
          48%  { border-radius: 54% 46% 68% 32% / 44% 56% 44% 56%; }
          60%  { border-radius: 72% 28% 38% 62% / 52% 40% 60% 48%; }
          72%  { border-radius: 30% 70% 56% 44% / 64% 36% 64% 36%; }
          84%  { border-radius: 46% 54% 30% 70% / 38% 72% 28% 62%; }
          100% { border-radius: 58% 42% 52% 48% / 48% 62% 38% 52%; }
        }

        /* Spin applied to the SVG element only — no translate conflict */
        @keyframes chakraSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        @keyframes indiaHaloPulse {
          0%, 100% { opacity: 0.28; transform: scale(1); }
          50%       { opacity: 0.55; transform: scale(1.1); }
        }

        .india-badge-wrap {
          transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: default;
        }
        .india-badge-wrap:hover { transform: scale(1.1) !important; }
        .india-badge-wrap:hover .india-ring,
        .india-badge-wrap:hover .india-ring-mask,
        .india-badge-wrap:hover .india-clip,
        .india-badge-wrap:hover .india-halo { animation-play-state: paused; }
        .india-badge-wrap:hover .india-chakra-svg { animation-play-state: paused; }

        .india-ring      { animation: indiaBlobMorph 9s ease-in-out infinite; }
        .india-ring-mask { animation: indiaBlobMorph 9s ease-in-out infinite; }
        .india-clip      { animation: indiaBlobMorph 9s ease-in-out infinite; }
        .india-halo      { animation: indiaBlobMorph 9s ease-in-out infinite, indiaHaloPulse 3s ease-in-out infinite; }

        /* Spin only — centering is handled by the wrapper div */
        .india-chakra-svg {
          animation: chakraSpin 8s linear infinite;
          transform-origin: center center;
          display: block;
        }
      `}),v.jsxs("div",{className:"india-badge-wrap",style:{position:"fixed",top:"22px",left:"26px",zIndex:100,display:"flex",flexDirection:"column",alignItems:"center",gap:"7px"},children:[v.jsxs("div",{style:{position:"relative",width:"88px",height:"88px"},children:[v.jsx("div",{className:"india-halo",style:{position:"absolute",inset:"-12px",background:"conic-gradient(from 0deg, rgba(255,153,51,0.35), rgba(19,136,8,0.35), rgba(0,0,128,0.25), rgba(255,153,51,0.35))",filter:"blur(14px)",zIndex:0}}),v.jsx("div",{className:"india-ring",style:{position:"absolute",inset:"-5px",background:"linear-gradient(180deg, #FF9933 0%, #FF9933 33%, #ffffff 33%, #ffffff 66%, #138808 66%, #138808 100%)",zIndex:1}}),v.jsx("div",{className:"india-ring-mask",style:{position:"absolute",inset:"-1px",background:"rgba(4,6,14,0.96)",zIndex:2}}),v.jsx("div",{className:"india-clip",style:{position:"absolute",inset:0,overflow:"hidden",zIndex:3,background:"linear-gradient(180deg, #FF9933 0%, #FF9933 33.3%, #f0f0f0 33.3%, #f0f0f0 66.6%, #138808 66.6%, #138808 100%)"},children:v.jsx("div",{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:"26px",height:"26px",display:"flex",alignItems:"center",justifyContent:"center"},children:v.jsxs("svg",{className:"india-chakra-svg",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 100 100",width:"26",height:"26","aria-label":"Ashoka Chakra",children:[v.jsx("circle",{cx:"50",cy:"50",r:"46",fill:"none",stroke:"#000080",strokeWidth:"4"}),v.jsx("circle",{cx:"50",cy:"50",r:"6",fill:"#000080"}),t.map((e,n)=>v.jsx("line",{x1:e.x1,y1:e.y1,x2:e.x2,y2:e.y2,stroke:"#000080",strokeWidth:"2.8",strokeLinecap:"round"},n)),v.jsx("circle",{cx:"50",cy:"50",r:"42",fill:"none",stroke:"#000080",strokeWidth:"1.5",strokeDasharray:"4 3.5"})]})})})]}),v.jsx("span",{style:{fontSize:"7.5px",fontWeight:800,letterSpacing:"0.22em",color:"rgba(255,153,51,0.85)",textTransform:"uppercase",userSelect:"none",textShadow:"0 0 8px rgba(255,153,51,0.4)"},children:"INDIA"})]})]})}function IN(){const[t,e]=Se.useState(""),[n,i]=Se.useState("home"),r=[{id:"home",icon:nw,label:"Home"},{id:"notifications",icon:QT,label:"Notifications"},{id:"documents",icon:ew,label:"Documents"},{id:"search",icon:rw,label:"Search"},{id:"community",icon:uw,label:"Community"},{id:"profile",icon:lw,label:"Profile"}],s=a=>{a==null||a.preventDefault(),t.trim()&&console.log("Query submitted:",t)},o=a=>{a.key==="Enter"&&s()};return v.jsxs(v.Fragment,{children:[v.jsx(w3,{}),v.jsx(A3,{}),v.jsxs("div",{className:"app-container",children:[v.jsx("aside",{className:"floating-sidebar-wrapper",children:v.jsxs("div",{className:"dark-blue-pill-sidebar",children:[v.jsx("div",{className:"pill-gloss-highlight"}),r.map(a=>{const l=a.icon,c=n===a.id;return v.jsx("button",{className:`pill-nav-btn ${c?"active":""}`,onClick:()=>i(a.id),title:a.label,"aria-label":a.label,children:v.jsx(l,{size:24,className:"pill-icon"})},a.id)})]})}),v.jsx("main",{className:"main-content",children:v.jsx("div",{className:"center-stage",children:v.jsx(PN,{})})})]}),v.jsx("div",{className:"glass-bar-dock",children:v.jsxs("div",{className:"glass-bar-container",children:[v.jsxs("div",{className:"glass-bar-inner",children:[v.jsx("div",{className:"glass-wave2"}),v.jsx("div",{className:"glass-sparkle-icon",children:v.jsx(ow,{size:18})}),v.jsx("input",{type:"text",className:"glass-bar-input",placeholder:"Ask about any satellite scene, coordinates, or change detection...",value:t,onChange:a=>e(a.target.value),onKeyDown:o,autoFocus:!0}),v.jsx("button",{className:`glass-bar-send ${t.trim()?"active":""}`,onClick:s,title:"Submit Query",children:v.jsx(KT,{size:16})})]}),v.jsxs("div",{className:"glass-telemetry",children:[v.jsx("div",{className:"telemetry-live-dot"}),v.jsx("span",{children:"STAC Sentinel-2 & Landsat-9 Constellations Online"})]})]})}),v.jsx(DN,{}),v.jsx(LN,{})]})}Qf.createRoot(document.getElementById("root")).render(v.jsx(DM.StrictMode,{children:v.jsx(IN,{})}));
