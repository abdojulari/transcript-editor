//=include vendor/jquery.js
//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function(){function n(n){function t(t,r,e,u,i,o){for(;i>=0&&o>i;i+=n){var a=u?u[i]:i;e=r(e,t[a],a,t)}return e}return function(r,e,u,i){e=b(e,i,4);var o=!k(r)&&m.keys(r),a=(o||r).length,c=n>0?0:a-1;return arguments.length<3&&(u=r[o?o[c]:c],c+=n),t(r,e,u,o,c,a)}}function t(n){return function(t,r,e){r=x(r,e);for(var u=O(t),i=n>0?0:u-1;i>=0&&u>i;i+=n)if(r(t[i],i,t))return i;return-1}}function r(n,t,r){return function(e,u,i){var o=0,a=O(e);if("number"==typeof i)n>0?o=i>=0?i:Math.max(i+a,o):a=i>=0?Math.min(i+1,a):i+a+1;else if(r&&i&&a)return i=r(e,u),e[i]===u?i:-1;if(u!==u)return i=t(l.call(e,o,a),m.isNaN),i>=0?i+o:-1;for(i=n>0?o:a-1;i>=0&&a>i;i+=n)if(e[i]===u)return i;return-1}}function e(n,t){var r=I.length,e=n.constructor,u=m.isFunction(e)&&e.prototype||a,i="constructor";for(m.has(n,i)&&!m.contains(t,i)&&t.push(i);r--;)i=I[r],i in n&&n[i]!==u[i]&&!m.contains(t,i)&&t.push(i)}var u=this,i=u._,o=Array.prototype,a=Object.prototype,c=Function.prototype,f=o.push,l=o.slice,s=a.toString,p=a.hasOwnProperty,h=Array.isArray,v=Object.keys,g=c.bind,y=Object.create,d=function(){},m=function(n){return n instanceof m?n:this instanceof m?void(this._wrapped=n):new m(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=m),exports._=m):u._=m,m.VERSION="1.8.3";var b=function(n,t,r){if(t===void 0)return n;switch(null==r?3:r){case 1:return function(r){return n.call(t,r)};case 2:return function(r,e){return n.call(t,r,e)};case 3:return function(r,e,u){return n.call(t,r,e,u)};case 4:return function(r,e,u,i){return n.call(t,r,e,u,i)}}return function(){return n.apply(t,arguments)}},x=function(n,t,r){return null==n?m.identity:m.isFunction(n)?b(n,t,r):m.isObject(n)?m.matcher(n):m.property(n)};m.iteratee=function(n,t){return x(n,t,1/0)};var _=function(n,t){return function(r){var e=arguments.length;if(2>e||null==r)return r;for(var u=1;e>u;u++)for(var i=arguments[u],o=n(i),a=o.length,c=0;a>c;c++){var f=o[c];t&&r[f]!==void 0||(r[f]=i[f])}return r}},j=function(n){if(!m.isObject(n))return{};if(y)return y(n);d.prototype=n;var t=new d;return d.prototype=null,t},w=function(n){return function(t){return null==t?void 0:t[n]}},A=Math.pow(2,53)-1,O=w("length"),k=function(n){var t=O(n);return"number"==typeof t&&t>=0&&A>=t};m.each=m.forEach=function(n,t,r){t=b(t,r);var e,u;if(k(n))for(e=0,u=n.length;u>e;e++)t(n[e],e,n);else{var i=m.keys(n);for(e=0,u=i.length;u>e;e++)t(n[i[e]],i[e],n)}return n},m.map=m.collect=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=Array(u),o=0;u>o;o++){var a=e?e[o]:o;i[o]=t(n[a],a,n)}return i},m.reduce=m.foldl=m.inject=n(1),m.reduceRight=m.foldr=n(-1),m.find=m.detect=function(n,t,r){var e;return e=k(n)?m.findIndex(n,t,r):m.findKey(n,t,r),e!==void 0&&e!==-1?n[e]:void 0},m.filter=m.select=function(n,t,r){var e=[];return t=x(t,r),m.each(n,function(n,r,u){t(n,r,u)&&e.push(n)}),e},m.reject=function(n,t,r){return m.filter(n,m.negate(x(t)),r)},m.every=m.all=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=0;u>i;i++){var o=e?e[i]:i;if(!t(n[o],o,n))return!1}return!0},m.some=m.any=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=0;u>i;i++){var o=e?e[i]:i;if(t(n[o],o,n))return!0}return!1},m.contains=m.includes=m.include=function(n,t,r,e){return k(n)||(n=m.values(n)),("number"!=typeof r||e)&&(r=0),m.indexOf(n,t,r)>=0},m.invoke=function(n,t){var r=l.call(arguments,2),e=m.isFunction(t);return m.map(n,function(n){var u=e?t:n[t];return null==u?u:u.apply(n,r)})},m.pluck=function(n,t){return m.map(n,m.property(t))},m.where=function(n,t){return m.filter(n,m.matcher(t))},m.findWhere=function(n,t){return m.find(n,m.matcher(t))},m.max=function(n,t,r){var e,u,i=-1/0,o=-1/0;if(null==t&&null!=n){n=k(n)?n:m.values(n);for(var a=0,c=n.length;c>a;a++)e=n[a],e>i&&(i=e)}else t=x(t,r),m.each(n,function(n,r,e){u=t(n,r,e),(u>o||u===-1/0&&i===-1/0)&&(i=n,o=u)});return i},m.min=function(n,t,r){var e,u,i=1/0,o=1/0;if(null==t&&null!=n){n=k(n)?n:m.values(n);for(var a=0,c=n.length;c>a;a++)e=n[a],i>e&&(i=e)}else t=x(t,r),m.each(n,function(n,r,e){u=t(n,r,e),(o>u||1/0===u&&1/0===i)&&(i=n,o=u)});return i},m.shuffle=function(n){for(var t,r=k(n)?n:m.values(n),e=r.length,u=Array(e),i=0;e>i;i++)t=m.random(0,i),t!==i&&(u[i]=u[t]),u[t]=r[i];return u},m.sample=function(n,t,r){return null==t||r?(k(n)||(n=m.values(n)),n[m.random(n.length-1)]):m.shuffle(n).slice(0,Math.max(0,t))},m.sortBy=function(n,t,r){return t=x(t,r),m.pluck(m.map(n,function(n,r,e){return{value:n,index:r,criteria:t(n,r,e)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index-t.index}),"value")};var F=function(n){return function(t,r,e){var u={};return r=x(r,e),m.each(t,function(e,i){var o=r(e,i,t);n(u,e,o)}),u}};m.groupBy=F(function(n,t,r){m.has(n,r)?n[r].push(t):n[r]=[t]}),m.indexBy=F(function(n,t,r){n[r]=t}),m.countBy=F(function(n,t,r){m.has(n,r)?n[r]++:n[r]=1}),m.toArray=function(n){return n?m.isArray(n)?l.call(n):k(n)?m.map(n,m.identity):m.values(n):[]},m.size=function(n){return null==n?0:k(n)?n.length:m.keys(n).length},m.partition=function(n,t,r){t=x(t,r);var e=[],u=[];return m.each(n,function(n,r,i){(t(n,r,i)?e:u).push(n)}),[e,u]},m.first=m.head=m.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:m.initial(n,n.length-t)},m.initial=function(n,t,r){return l.call(n,0,Math.max(0,n.length-(null==t||r?1:t)))},m.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:m.rest(n,Math.max(0,n.length-t))},m.rest=m.tail=m.drop=function(n,t,r){return l.call(n,null==t||r?1:t)},m.compact=function(n){return m.filter(n,m.identity)};var S=function(n,t,r,e){for(var u=[],i=0,o=e||0,a=O(n);a>o;o++){var c=n[o];if(k(c)&&(m.isArray(c)||m.isArguments(c))){t||(c=S(c,t,r));var f=0,l=c.length;for(u.length+=l;l>f;)u[i++]=c[f++]}else r||(u[i++]=c)}return u};m.flatten=function(n,t){return S(n,t,!1)},m.without=function(n){return m.difference(n,l.call(arguments,1))},m.uniq=m.unique=function(n,t,r,e){m.isBoolean(t)||(e=r,r=t,t=!1),null!=r&&(r=x(r,e));for(var u=[],i=[],o=0,a=O(n);a>o;o++){var c=n[o],f=r?r(c,o,n):c;t?(o&&i===f||u.push(c),i=f):r?m.contains(i,f)||(i.push(f),u.push(c)):m.contains(u,c)||u.push(c)}return u},m.union=function(){return m.uniq(S(arguments,!0,!0))},m.intersection=function(n){for(var t=[],r=arguments.length,e=0,u=O(n);u>e;e++){var i=n[e];if(!m.contains(t,i)){for(var o=1;r>o&&m.contains(arguments[o],i);o++);o===r&&t.push(i)}}return t},m.difference=function(n){var t=S(arguments,!0,!0,1);return m.filter(n,function(n){return!m.contains(t,n)})},m.zip=function(){return m.unzip(arguments)},m.unzip=function(n){for(var t=n&&m.max(n,O).length||0,r=Array(t),e=0;t>e;e++)r[e]=m.pluck(n,e);return r},m.object=function(n,t){for(var r={},e=0,u=O(n);u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},m.findIndex=t(1),m.findLastIndex=t(-1),m.sortedIndex=function(n,t,r,e){r=x(r,e,1);for(var u=r(t),i=0,o=O(n);o>i;){var a=Math.floor((i+o)/2);r(n[a])<u?i=a+1:o=a}return i},m.indexOf=r(1,m.findIndex,m.sortedIndex),m.lastIndexOf=r(-1,m.findLastIndex),m.range=function(n,t,r){null==t&&(t=n||0,n=0),r=r||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=Array(e),i=0;e>i;i++,n+=r)u[i]=n;return u};var E=function(n,t,r,e,u){if(!(e instanceof t))return n.apply(r,u);var i=j(n.prototype),o=n.apply(i,u);return m.isObject(o)?o:i};m.bind=function(n,t){if(g&&n.bind===g)return g.apply(n,l.call(arguments,1));if(!m.isFunction(n))throw new TypeError("Bind must be called on a function");var r=l.call(arguments,2),e=function(){return E(n,e,t,this,r.concat(l.call(arguments)))};return e},m.partial=function(n){var t=l.call(arguments,1),r=function(){for(var e=0,u=t.length,i=Array(u),o=0;u>o;o++)i[o]=t[o]===m?arguments[e++]:t[o];for(;e<arguments.length;)i.push(arguments[e++]);return E(n,r,this,this,i)};return r},m.bindAll=function(n){var t,r,e=arguments.length;if(1>=e)throw new Error("bindAll must be passed function names");for(t=1;e>t;t++)r=arguments[t],n[r]=m.bind(n[r],n);return n},m.memoize=function(n,t){var r=function(e){var u=r.cache,i=""+(t?t.apply(this,arguments):e);return m.has(u,i)||(u[i]=n.apply(this,arguments)),u[i]};return r.cache={},r},m.delay=function(n,t){var r=l.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},m.defer=m.partial(m.delay,m,1),m.throttle=function(n,t,r){var e,u,i,o=null,a=0;r||(r={});var c=function(){a=r.leading===!1?0:m.now(),o=null,i=n.apply(e,u),o||(e=u=null)};return function(){var f=m.now();a||r.leading!==!1||(a=f);var l=t-(f-a);return e=this,u=arguments,0>=l||l>t?(o&&(clearTimeout(o),o=null),a=f,i=n.apply(e,u),o||(e=u=null)):o||r.trailing===!1||(o=setTimeout(c,l)),i}},m.debounce=function(n,t,r){var e,u,i,o,a,c=function(){var f=m.now()-o;t>f&&f>=0?e=setTimeout(c,t-f):(e=null,r||(a=n.apply(i,u),e||(i=u=null)))};return function(){i=this,u=arguments,o=m.now();var f=r&&!e;return e||(e=setTimeout(c,t)),f&&(a=n.apply(i,u),i=u=null),a}},m.wrap=function(n,t){return m.partial(t,n)},m.negate=function(n){return function(){return!n.apply(this,arguments)}},m.compose=function(){var n=arguments,t=n.length-1;return function(){for(var r=t,e=n[t].apply(this,arguments);r--;)e=n[r].call(this,e);return e}},m.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},m.before=function(n,t){var r;return function(){return--n>0&&(r=t.apply(this,arguments)),1>=n&&(t=null),r}},m.once=m.partial(m.before,2);var M=!{toString:null}.propertyIsEnumerable("toString"),I=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"];m.keys=function(n){if(!m.isObject(n))return[];if(v)return v(n);var t=[];for(var r in n)m.has(n,r)&&t.push(r);return M&&e(n,t),t},m.allKeys=function(n){if(!m.isObject(n))return[];var t=[];for(var r in n)t.push(r);return M&&e(n,t),t},m.values=function(n){for(var t=m.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=n[t[u]];return e},m.mapObject=function(n,t,r){t=x(t,r);for(var e,u=m.keys(n),i=u.length,o={},a=0;i>a;a++)e=u[a],o[e]=t(n[e],e,n);return o},m.pairs=function(n){for(var t=m.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=[t[u],n[t[u]]];return e},m.invert=function(n){for(var t={},r=m.keys(n),e=0,u=r.length;u>e;e++)t[n[r[e]]]=r[e];return t},m.functions=m.methods=function(n){var t=[];for(var r in n)m.isFunction(n[r])&&t.push(r);return t.sort()},m.extend=_(m.allKeys),m.extendOwn=m.assign=_(m.keys),m.findKey=function(n,t,r){t=x(t,r);for(var e,u=m.keys(n),i=0,o=u.length;o>i;i++)if(e=u[i],t(n[e],e,n))return e},m.pick=function(n,t,r){var e,u,i={},o=n;if(null==o)return i;m.isFunction(t)?(u=m.allKeys(o),e=b(t,r)):(u=S(arguments,!1,!1,1),e=function(n,t,r){return t in r},o=Object(o));for(var a=0,c=u.length;c>a;a++){var f=u[a],l=o[f];e(l,f,o)&&(i[f]=l)}return i},m.omit=function(n,t,r){if(m.isFunction(t))t=m.negate(t);else{var e=m.map(S(arguments,!1,!1,1),String);t=function(n,t){return!m.contains(e,t)}}return m.pick(n,t,r)},m.defaults=_(m.allKeys,!0),m.create=function(n,t){var r=j(n);return t&&m.extendOwn(r,t),r},m.clone=function(n){return m.isObject(n)?m.isArray(n)?n.slice():m.extend({},n):n},m.tap=function(n,t){return t(n),n},m.isMatch=function(n,t){var r=m.keys(t),e=r.length;if(null==n)return!e;for(var u=Object(n),i=0;e>i;i++){var o=r[i];if(t[o]!==u[o]||!(o in u))return!1}return!0};var N=function(n,t,r,e){if(n===t)return 0!==n||1/n===1/t;if(null==n||null==t)return n===t;n instanceof m&&(n=n._wrapped),t instanceof m&&(t=t._wrapped);var u=s.call(n);if(u!==s.call(t))return!1;switch(u){case"[object RegExp]":case"[object String]":return""+n==""+t;case"[object Number]":return+n!==+n?+t!==+t:0===+n?1/+n===1/t:+n===+t;case"[object Date]":case"[object Boolean]":return+n===+t}var i="[object Array]"===u;if(!i){if("object"!=typeof n||"object"!=typeof t)return!1;var o=n.constructor,a=t.constructor;if(o!==a&&!(m.isFunction(o)&&o instanceof o&&m.isFunction(a)&&a instanceof a)&&"constructor"in n&&"constructor"in t)return!1}r=r||[],e=e||[];for(var c=r.length;c--;)if(r[c]===n)return e[c]===t;if(r.push(n),e.push(t),i){if(c=n.length,c!==t.length)return!1;for(;c--;)if(!N(n[c],t[c],r,e))return!1}else{var f,l=m.keys(n);if(c=l.length,m.keys(t).length!==c)return!1;for(;c--;)if(f=l[c],!m.has(t,f)||!N(n[f],t[f],r,e))return!1}return r.pop(),e.pop(),!0};m.isEqual=function(n,t){return N(n,t)},m.isEmpty=function(n){return null==n?!0:k(n)&&(m.isArray(n)||m.isString(n)||m.isArguments(n))?0===n.length:0===m.keys(n).length},m.isElement=function(n){return!(!n||1!==n.nodeType)},m.isArray=h||function(n){return"[object Array]"===s.call(n)},m.isObject=function(n){var t=typeof n;return"function"===t||"object"===t&&!!n},m.each(["Arguments","Function","String","Number","Date","RegExp","Error"],function(n){m["is"+n]=function(t){return s.call(t)==="[object "+n+"]"}}),m.isArguments(arguments)||(m.isArguments=function(n){return m.has(n,"callee")}),"function"!=typeof/./&&"object"!=typeof Int8Array&&(m.isFunction=function(n){return"function"==typeof n||!1}),m.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},m.isNaN=function(n){return m.isNumber(n)&&n!==+n},m.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"===s.call(n)},m.isNull=function(n){return null===n},m.isUndefined=function(n){return n===void 0},m.has=function(n,t){return null!=n&&p.call(n,t)},m.noConflict=function(){return u._=i,this},m.identity=function(n){return n},m.constant=function(n){return function(){return n}},m.noop=function(){},m.property=w,m.propertyOf=function(n){return null==n?function(){}:function(t){return n[t]}},m.matcher=m.matches=function(n){return n=m.extendOwn({},n),function(t){return m.isMatch(t,n)}},m.times=function(n,t,r){var e=Array(Math.max(0,n));t=b(t,r,1);for(var u=0;n>u;u++)e[u]=t(u);return e},m.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))},m.now=Date.now||function(){return(new Date).getTime()};var B={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},T=m.invert(B),R=function(n){var t=function(t){return n[t]},r="(?:"+m.keys(n).join("|")+")",e=RegExp(r),u=RegExp(r,"g");return function(n){return n=null==n?"":""+n,e.test(n)?n.replace(u,t):n}};m.escape=R(B),m.unescape=R(T),m.result=function(n,t,r){var e=null==n?void 0:n[t];return e===void 0&&(e=r),m.isFunction(e)?e.call(n):e};var q=0;m.uniqueId=function(n){var t=++q+"";return n?n+t:t},m.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var K=/(.)^/,z={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},D=/\\|'|\r|\n|\u2028|\u2029/g,L=function(n){return"\\"+z[n]};m.template=function(n,t,r){!t&&r&&(t=r),t=m.defaults({},t,m.templateSettings);var e=RegExp([(t.escape||K).source,(t.interpolate||K).source,(t.evaluate||K).source].join("|")+"|$","g"),u=0,i="__p+='";n.replace(e,function(t,r,e,o,a){return i+=n.slice(u,a).replace(D,L),u=a+t.length,r?i+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'":e?i+="'+\n((__t=("+e+"))==null?'':__t)+\n'":o&&(i+="';\n"+o+"\n__p+='"),t}),i+="';\n",t.variable||(i="with(obj||{}){\n"+i+"}\n"),i="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+i+"return __p;\n";try{var o=new Function(t.variable||"obj","_",i)}catch(a){throw a.source=i,a}var c=function(n){return o.call(this,n,m)},f=t.variable||"obj";return c.source="function("+f+"){\n"+i+"}",c},m.chain=function(n){var t=m(n);return t._chain=!0,t};var P=function(n,t){return n._chain?m(t).chain():t};m.mixin=function(n){m.each(m.functions(n),function(t){var r=m[t]=n[t];m.prototype[t]=function(){var n=[this._wrapped];return f.apply(n,arguments),P(this,r.apply(m,n))}})},m.mixin(m),m.each(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=o[n];m.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!==n&&"splice"!==n||0!==r.length||delete r[0],P(this,r)}}),m.each(["concat","join","slice"],function(n){var t=o[n];m.prototype[n]=function(){return P(this,t.apply(this._wrapped,arguments))}}),m.prototype.value=function(){return this._wrapped},m.prototype.valueOf=m.prototype.toJSON=m.prototype.value,m.prototype.toString=function(){return""+this._wrapped},"function"==typeof define&&define.amd&&define("underscore",[],function(){return m})}).call(this);
//# sourceMappingURL=underscore-min.map
(function(t){var e=typeof self=="object"&&self.self==self&&self||typeof global=="object"&&global.global==global&&global;if(typeof define==="function"&&define.amd){define(["underscore","jquery","exports"],function(i,r,n){e.Backbone=t(e,n,i,r)})}else if(typeof exports!=="undefined"){var i=require("underscore"),r;try{r=require("jquery")}catch(n){}t(e,exports,i,r)}else{e.Backbone=t(e,{},e._,e.jQuery||e.Zepto||e.ender||e.$)}})(function(t,e,i,r){var n=t.Backbone;var s=Array.prototype.slice;e.VERSION="1.2.3";e.$=r;e.noConflict=function(){t.Backbone=n;return this};e.emulateHTTP=false;e.emulateJSON=false;var a=function(t,e,r){switch(t){case 1:return function(){return i[e](this[r])};case 2:return function(t){return i[e](this[r],t)};case 3:return function(t,n){return i[e](this[r],h(t,this),n)};case 4:return function(t,n,s){return i[e](this[r],h(t,this),n,s)};default:return function(){var t=s.call(arguments);t.unshift(this[r]);return i[e].apply(i,t)}}};var o=function(t,e,r){i.each(e,function(e,n){if(i[n])t.prototype[n]=a(e,n,r)})};var h=function(t,e){if(i.isFunction(t))return t;if(i.isObject(t)&&!e._isModel(t))return u(t);if(i.isString(t))return function(e){return e.get(t)};return t};var u=function(t){var e=i.matches(t);return function(t){return e(t.attributes)}};var l=e.Events={};var c=/\s+/;var f=function(t,e,r,n,s){var a=0,o;if(r&&typeof r==="object"){if(n!==void 0&&"context"in s&&s.context===void 0)s.context=n;for(o=i.keys(r);a<o.length;a++){e=f(t,e,o[a],r[o[a]],s)}}else if(r&&c.test(r)){for(o=r.split(c);a<o.length;a++){e=t(e,o[a],n,s)}}else{e=t(e,r,n,s)}return e};l.on=function(t,e,i){return d(this,t,e,i)};var d=function(t,e,i,r,n){t._events=f(v,t._events||{},e,i,{context:r,ctx:t,listening:n});if(n){var s=t._listeners||(t._listeners={});s[n.id]=n}return t};l.listenTo=function(t,e,r){if(!t)return this;var n=t._listenId||(t._listenId=i.uniqueId("l"));var s=this._listeningTo||(this._listeningTo={});var a=s[n];if(!a){var o=this._listenId||(this._listenId=i.uniqueId("l"));a=s[n]={obj:t,objId:n,id:o,listeningTo:s,count:0}}d(t,e,r,this,a);return this};var v=function(t,e,i,r){if(i){var n=t[e]||(t[e]=[]);var s=r.context,a=r.ctx,o=r.listening;if(o)o.count++;n.push({callback:i,context:s,ctx:s||a,listening:o})}return t};l.off=function(t,e,i){if(!this._events)return this;this._events=f(g,this._events,t,e,{context:i,listeners:this._listeners});return this};l.stopListening=function(t,e,r){var n=this._listeningTo;if(!n)return this;var s=t?[t._listenId]:i.keys(n);for(var a=0;a<s.length;a++){var o=n[s[a]];if(!o)break;o.obj.off(e,r,this)}if(i.isEmpty(n))this._listeningTo=void 0;return this};var g=function(t,e,r,n){if(!t)return;var s=0,a;var o=n.context,h=n.listeners;if(!e&&!r&&!o){var u=i.keys(h);for(;s<u.length;s++){a=h[u[s]];delete h[a.id];delete a.listeningTo[a.objId]}return}var l=e?[e]:i.keys(t);for(;s<l.length;s++){e=l[s];var c=t[e];if(!c)break;var f=[];for(var d=0;d<c.length;d++){var v=c[d];if(r&&r!==v.callback&&r!==v.callback._callback||o&&o!==v.context){f.push(v)}else{a=v.listening;if(a&&--a.count===0){delete h[a.id];delete a.listeningTo[a.objId]}}}if(f.length){t[e]=f}else{delete t[e]}}if(i.size(t))return t};l.once=function(t,e,r){var n=f(p,{},t,e,i.bind(this.off,this));return this.on(n,void 0,r)};l.listenToOnce=function(t,e,r){var n=f(p,{},e,r,i.bind(this.stopListening,this,t));return this.listenTo(t,n)};var p=function(t,e,r,n){if(r){var s=t[e]=i.once(function(){n(e,s);r.apply(this,arguments)});s._callback=r}return t};l.trigger=function(t){if(!this._events)return this;var e=Math.max(0,arguments.length-1);var i=Array(e);for(var r=0;r<e;r++)i[r]=arguments[r+1];f(m,this._events,t,void 0,i);return this};var m=function(t,e,i,r){if(t){var n=t[e];var s=t.all;if(n&&s)s=s.slice();if(n)_(n,r);if(s)_(s,[e].concat(r))}return t};var _=function(t,e){var i,r=-1,n=t.length,s=e[0],a=e[1],o=e[2];switch(e.length){case 0:while(++r<n)(i=t[r]).callback.call(i.ctx);return;case 1:while(++r<n)(i=t[r]).callback.call(i.ctx,s);return;case 2:while(++r<n)(i=t[r]).callback.call(i.ctx,s,a);return;case 3:while(++r<n)(i=t[r]).callback.call(i.ctx,s,a,o);return;default:while(++r<n)(i=t[r]).callback.apply(i.ctx,e);return}};l.bind=l.on;l.unbind=l.off;i.extend(e,l);var y=e.Model=function(t,e){var r=t||{};e||(e={});this.cid=i.uniqueId(this.cidPrefix);this.attributes={};if(e.collection)this.collection=e.collection;if(e.parse)r=this.parse(r,e)||{};r=i.defaults({},r,i.result(this,"defaults"));this.set(r,e);this.changed={};this.initialize.apply(this,arguments)};i.extend(y.prototype,l,{changed:null,validationError:null,idAttribute:"id",cidPrefix:"c",initialize:function(){},toJSON:function(t){return i.clone(this.attributes)},sync:function(){return e.sync.apply(this,arguments)},get:function(t){return this.attributes[t]},escape:function(t){return i.escape(this.get(t))},has:function(t){return this.get(t)!=null},matches:function(t){return!!i.iteratee(t,this)(this.attributes)},set:function(t,e,r){if(t==null)return this;var n;if(typeof t==="object"){n=t;r=e}else{(n={})[t]=e}r||(r={});if(!this._validate(n,r))return false;var s=r.unset;var a=r.silent;var o=[];var h=this._changing;this._changing=true;if(!h){this._previousAttributes=i.clone(this.attributes);this.changed={}}var u=this.attributes;var l=this.changed;var c=this._previousAttributes;for(var f in n){e=n[f];if(!i.isEqual(u[f],e))o.push(f);if(!i.isEqual(c[f],e)){l[f]=e}else{delete l[f]}s?delete u[f]:u[f]=e}this.id=this.get(this.idAttribute);if(!a){if(o.length)this._pending=r;for(var d=0;d<o.length;d++){this.trigger("change:"+o[d],this,u[o[d]],r)}}if(h)return this;if(!a){while(this._pending){r=this._pending;this._pending=false;this.trigger("change",this,r)}}this._pending=false;this._changing=false;return this},unset:function(t,e){return this.set(t,void 0,i.extend({},e,{unset:true}))},clear:function(t){var e={};for(var r in this.attributes)e[r]=void 0;return this.set(e,i.extend({},t,{unset:true}))},hasChanged:function(t){if(t==null)return!i.isEmpty(this.changed);return i.has(this.changed,t)},changedAttributes:function(t){if(!t)return this.hasChanged()?i.clone(this.changed):false;var e=this._changing?this._previousAttributes:this.attributes;var r={};for(var n in t){var s=t[n];if(i.isEqual(e[n],s))continue;r[n]=s}return i.size(r)?r:false},previous:function(t){if(t==null||!this._previousAttributes)return null;return this._previousAttributes[t]},previousAttributes:function(){return i.clone(this._previousAttributes)},fetch:function(t){t=i.extend({parse:true},t);var e=this;var r=t.success;t.success=function(i){var n=t.parse?e.parse(i,t):i;if(!e.set(n,t))return false;if(r)r.call(t.context,e,i,t);e.trigger("sync",e,i,t)};z(this,t);return this.sync("read",this,t)},save:function(t,e,r){var n;if(t==null||typeof t==="object"){n=t;r=e}else{(n={})[t]=e}r=i.extend({validate:true,parse:true},r);var s=r.wait;if(n&&!s){if(!this.set(n,r))return false}else{if(!this._validate(n,r))return false}var a=this;var o=r.success;var h=this.attributes;r.success=function(t){a.attributes=h;var e=r.parse?a.parse(t,r):t;if(s)e=i.extend({},n,e);if(e&&!a.set(e,r))return false;if(o)o.call(r.context,a,t,r);a.trigger("sync",a,t,r)};z(this,r);if(n&&s)this.attributes=i.extend({},h,n);var u=this.isNew()?"create":r.patch?"patch":"update";if(u==="patch"&&!r.attrs)r.attrs=n;var l=this.sync(u,this,r);this.attributes=h;return l},destroy:function(t){t=t?i.clone(t):{};var e=this;var r=t.success;var n=t.wait;var s=function(){e.stopListening();e.trigger("destroy",e,e.collection,t)};t.success=function(i){if(n)s();if(r)r.call(t.context,e,i,t);if(!e.isNew())e.trigger("sync",e,i,t)};var a=false;if(this.isNew()){i.defer(t.success)}else{z(this,t);a=this.sync("delete",this,t)}if(!n)s();return a},url:function(){var t=i.result(this,"urlRoot")||i.result(this.collection,"url")||F();if(this.isNew())return t;var e=this.get(this.idAttribute);return t.replace(/[^\/]$/,"$&/")+encodeURIComponent(e)},parse:function(t,e){return t},clone:function(){return new this.constructor(this.attributes)},isNew:function(){return!this.has(this.idAttribute)},isValid:function(t){return this._validate({},i.defaults({validate:true},t))},_validate:function(t,e){if(!e.validate||!this.validate)return true;t=i.extend({},this.attributes,t);var r=this.validationError=this.validate(t,e)||null;if(!r)return true;this.trigger("invalid",this,r,i.extend(e,{validationError:r}));return false}});var b={keys:1,values:1,pairs:1,invert:1,pick:0,omit:0,chain:1,isEmpty:1};o(y,b,"attributes");var x=e.Collection=function(t,e){e||(e={});if(e.model)this.model=e.model;if(e.comparator!==void 0)this.comparator=e.comparator;this._reset();this.initialize.apply(this,arguments);if(t)this.reset(t,i.extend({silent:true},e))};var w={add:true,remove:true,merge:true};var E={add:true,remove:false};var k=function(t,e,i){i=Math.min(Math.max(i,0),t.length);var r=Array(t.length-i);var n=e.length;for(var s=0;s<r.length;s++)r[s]=t[s+i];for(s=0;s<n;s++)t[s+i]=e[s];for(s=0;s<r.length;s++)t[s+n+i]=r[s]};i.extend(x.prototype,l,{model:y,initialize:function(){},toJSON:function(t){return this.map(function(e){return e.toJSON(t)})},sync:function(){return e.sync.apply(this,arguments)},add:function(t,e){return this.set(t,i.extend({merge:false},e,E))},remove:function(t,e){e=i.extend({},e);var r=!i.isArray(t);t=r?[t]:i.clone(t);var n=this._removeModels(t,e);if(!e.silent&&n)this.trigger("update",this,e);return r?n[0]:n},set:function(t,e){if(t==null)return;e=i.defaults({},e,w);if(e.parse&&!this._isModel(t))t=this.parse(t,e);var r=!i.isArray(t);t=r?[t]:t.slice();var n=e.at;if(n!=null)n=+n;if(n<0)n+=this.length+1;var s=[];var a=[];var o=[];var h={};var u=e.add;var l=e.merge;var c=e.remove;var f=false;var d=this.comparator&&n==null&&e.sort!==false;var v=i.isString(this.comparator)?this.comparator:null;var g;for(var p=0;p<t.length;p++){g=t[p];var m=this.get(g);if(m){if(l&&g!==m){var _=this._isModel(g)?g.attributes:g;if(e.parse)_=m.parse(_,e);m.set(_,e);if(d&&!f)f=m.hasChanged(v)}if(!h[m.cid]){h[m.cid]=true;s.push(m)}t[p]=m}else if(u){g=t[p]=this._prepareModel(g,e);if(g){a.push(g);this._addReference(g,e);h[g.cid]=true;s.push(g)}}}if(c){for(p=0;p<this.length;p++){g=this.models[p];if(!h[g.cid])o.push(g)}if(o.length)this._removeModels(o,e)}var y=false;var b=!d&&u&&c;if(s.length&&b){y=this.length!=s.length||i.some(this.models,function(t,e){return t!==s[e]});this.models.length=0;k(this.models,s,0);this.length=this.models.length}else if(a.length){if(d)f=true;k(this.models,a,n==null?this.length:n);this.length=this.models.length}if(f)this.sort({silent:true});if(!e.silent){for(p=0;p<a.length;p++){if(n!=null)e.index=n+p;g=a[p];g.trigger("add",g,this,e)}if(f||y)this.trigger("sort",this,e);if(a.length||o.length)this.trigger("update",this,e)}return r?t[0]:t},reset:function(t,e){e=e?i.clone(e):{};for(var r=0;r<this.models.length;r++){this._removeReference(this.models[r],e)}e.previousModels=this.models;this._reset();t=this.add(t,i.extend({silent:true},e));if(!e.silent)this.trigger("reset",this,e);return t},push:function(t,e){return this.add(t,i.extend({at:this.length},e))},pop:function(t){var e=this.at(this.length-1);return this.remove(e,t)},unshift:function(t,e){return this.add(t,i.extend({at:0},e))},shift:function(t){var e=this.at(0);return this.remove(e,t)},slice:function(){return s.apply(this.models,arguments)},get:function(t){if(t==null)return void 0;var e=this.modelId(this._isModel(t)?t.attributes:t);return this._byId[t]||this._byId[e]||this._byId[t.cid]},at:function(t){if(t<0)t+=this.length;return this.models[t]},where:function(t,e){return this[e?"find":"filter"](t)},findWhere:function(t){return this.where(t,true)},sort:function(t){var e=this.comparator;if(!e)throw new Error("Cannot sort a set without a comparator");t||(t={});var r=e.length;if(i.isFunction(e))e=i.bind(e,this);if(r===1||i.isString(e)){this.models=this.sortBy(e)}else{this.models.sort(e)}if(!t.silent)this.trigger("sort",this,t);return this},pluck:function(t){return i.invoke(this.models,"get",t)},fetch:function(t){t=i.extend({parse:true},t);var e=t.success;var r=this;t.success=function(i){var n=t.reset?"reset":"set";r[n](i,t);if(e)e.call(t.context,r,i,t);r.trigger("sync",r,i,t)};z(this,t);return this.sync("read",this,t)},create:function(t,e){e=e?i.clone(e):{};var r=e.wait;t=this._prepareModel(t,e);if(!t)return false;if(!r)this.add(t,e);var n=this;var s=e.success;e.success=function(t,e,i){if(r)n.add(t,i);if(s)s.call(i.context,t,e,i)};t.save(null,e);return t},parse:function(t,e){return t},clone:function(){return new this.constructor(this.models,{model:this.model,comparator:this.comparator})},modelId:function(t){return t[this.model.prototype.idAttribute||"id"]},_reset:function(){this.length=0;this.models=[];this._byId={}},_prepareModel:function(t,e){if(this._isModel(t)){if(!t.collection)t.collection=this;return t}e=e?i.clone(e):{};e.collection=this;var r=new this.model(t,e);if(!r.validationError)return r;this.trigger("invalid",this,r.validationError,e);return false},_removeModels:function(t,e){var i=[];for(var r=0;r<t.length;r++){var n=this.get(t[r]);if(!n)continue;var s=this.indexOf(n);this.models.splice(s,1);this.length--;if(!e.silent){e.index=s;n.trigger("remove",n,this,e)}i.push(n);this._removeReference(n,e)}return i.length?i:false},_isModel:function(t){return t instanceof y},_addReference:function(t,e){this._byId[t.cid]=t;var i=this.modelId(t.attributes);if(i!=null)this._byId[i]=t;t.on("all",this._onModelEvent,this)},_removeReference:function(t,e){delete this._byId[t.cid];var i=this.modelId(t.attributes);if(i!=null)delete this._byId[i];if(this===t.collection)delete t.collection;t.off("all",this._onModelEvent,this)},_onModelEvent:function(t,e,i,r){if((t==="add"||t==="remove")&&i!==this)return;if(t==="destroy")this.remove(e,r);if(t==="change"){var n=this.modelId(e.previousAttributes());var s=this.modelId(e.attributes);if(n!==s){if(n!=null)delete this._byId[n];if(s!=null)this._byId[s]=e}}this.trigger.apply(this,arguments)}});var S={forEach:3,each:3,map:3,collect:3,reduce:4,foldl:4,inject:4,reduceRight:4,foldr:4,find:3,detect:3,filter:3,select:3,reject:3,every:3,all:3,some:3,any:3,include:3,includes:3,contains:3,invoke:0,max:3,min:3,toArray:1,size:1,first:3,head:3,take:3,initial:3,rest:3,tail:3,drop:3,last:3,without:0,difference:0,indexOf:3,shuffle:1,lastIndexOf:3,isEmpty:1,chain:1,sample:3,partition:3,groupBy:3,countBy:3,sortBy:3,indexBy:3};o(x,S,"models");var I=e.View=function(t){this.cid=i.uniqueId("view");i.extend(this,i.pick(t,P));this._ensureElement();this.initialize.apply(this,arguments)};var T=/^(\S+)\s*(.*)$/;var P=["model","collection","el","id","attributes","className","tagName","events"];i.extend(I.prototype,l,{tagName:"div",$:function(t){return this.$el.find(t)},initialize:function(){},render:function(){return this},remove:function(){this._removeElement();this.stopListening();return this},_removeElement:function(){this.$el.remove()},setElement:function(t){this.undelegateEvents();this._setElement(t);this.delegateEvents();return this},_setElement:function(t){this.$el=t instanceof e.$?t:e.$(t);this.el=this.$el[0]},delegateEvents:function(t){t||(t=i.result(this,"events"));if(!t)return this;this.undelegateEvents();for(var e in t){var r=t[e];if(!i.isFunction(r))r=this[r];if(!r)continue;var n=e.match(T);this.delegate(n[1],n[2],i.bind(r,this))}return this},delegate:function(t,e,i){this.$el.on(t+".delegateEvents"+this.cid,e,i);return this},undelegateEvents:function(){if(this.$el)this.$el.off(".delegateEvents"+this.cid);return this},undelegate:function(t,e,i){this.$el.off(t+".delegateEvents"+this.cid,e,i);return this},_createElement:function(t){return document.createElement(t)},_ensureElement:function(){if(!this.el){var t=i.extend({},i.result(this,"attributes"));if(this.id)t.id=i.result(this,"id");if(this.className)t["class"]=i.result(this,"className");this.setElement(this._createElement(i.result(this,"tagName")));this._setAttributes(t)}else{this.setElement(i.result(this,"el"))}},_setAttributes:function(t){this.$el.attr(t)}});e.sync=function(t,r,n){var s=H[t];i.defaults(n||(n={}),{emulateHTTP:e.emulateHTTP,emulateJSON:e.emulateJSON});var a={type:s,dataType:"json"};if(!n.url){a.url=i.result(r,"url")||F()}if(n.data==null&&r&&(t==="create"||t==="update"||t==="patch")){a.contentType="application/json";a.data=JSON.stringify(n.attrs||r.toJSON(n))}if(n.emulateJSON){a.contentType="application/x-www-form-urlencoded";a.data=a.data?{model:a.data}:{}}if(n.emulateHTTP&&(s==="PUT"||s==="DELETE"||s==="PATCH")){a.type="POST";if(n.emulateJSON)a.data._method=s;var o=n.beforeSend;n.beforeSend=function(t){t.setRequestHeader("X-HTTP-Method-Override",s);if(o)return o.apply(this,arguments)}}if(a.type!=="GET"&&!n.emulateJSON){a.processData=false}var h=n.error;n.error=function(t,e,i){n.textStatus=e;n.errorThrown=i;if(h)h.call(n.context,t,e,i)};var u=n.xhr=e.ajax(i.extend(a,n));r.trigger("request",r,u,n);return u};var H={create:"POST",update:"PUT",patch:"PATCH","delete":"DELETE",read:"GET"};e.ajax=function(){return e.$.ajax.apply(e.$,arguments)};var $=e.Router=function(t){t||(t={});if(t.routes)this.routes=t.routes;this._bindRoutes();this.initialize.apply(this,arguments)};var A=/\((.*?)\)/g;var C=/(\(\?)?:\w+/g;var R=/\*\w+/g;var j=/[\-{}\[\]+?.,\\\^$|#\s]/g;i.extend($.prototype,l,{initialize:function(){},route:function(t,r,n){if(!i.isRegExp(t))t=this._routeToRegExp(t);if(i.isFunction(r)){n=r;r=""}if(!n)n=this[r];var s=this;e.history.route(t,function(i){var a=s._extractParameters(t,i);if(s.execute(n,a,r)!==false){s.trigger.apply(s,["route:"+r].concat(a));s.trigger("route",r,a);e.history.trigger("route",s,r,a)}});return this},execute:function(t,e,i){if(t)t.apply(this,e)},navigate:function(t,i){e.history.navigate(t,i);return this},_bindRoutes:function(){if(!this.routes)return;this.routes=i.result(this,"routes");var t,e=i.keys(this.routes);while((t=e.pop())!=null){this.route(t,this.routes[t])}},_routeToRegExp:function(t){t=t.replace(j,"\\$&").replace(A,"(?:$1)?").replace(C,function(t,e){return e?t:"([^/?]+)"}).replace(R,"([^?]*?)");return new RegExp("^"+t+"(?:\\?([\\s\\S]*))?$")},_extractParameters:function(t,e){var r=t.exec(e).slice(1);return i.map(r,function(t,e){if(e===r.length-1)return t||null;return t?decodeURIComponent(t):null})}});var M=e.History=function(){this.handlers=[];this.checkUrl=i.bind(this.checkUrl,this);if(typeof window!=="undefined"){this.location=window.location;this.history=window.history}};var N=/^[#\/]|\s+$/g;var O=/^\/+|\/+$/g;var U=/#.*$/;M.started=false;i.extend(M.prototype,l,{interval:50,atRoot:function(){var t=this.location.pathname.replace(/[^\/]$/,"$&/");return t===this.root&&!this.getSearch()},matchRoot:function(){var t=this.decodeFragment(this.location.pathname);var e=t.slice(0,this.root.length-1)+"/";return e===this.root},decodeFragment:function(t){return decodeURI(t.replace(/%25/g,"%2525"))},getSearch:function(){var t=this.location.href.replace(/#.*/,"").match(/\?.+/);return t?t[0]:""},getHash:function(t){var e=(t||this).location.href.match(/#(.*)$/);return e?e[1]:""},getPath:function(){var t=this.decodeFragment(this.location.pathname+this.getSearch()).slice(this.root.length-1);return t.charAt(0)==="/"?t.slice(1):t},getFragment:function(t){if(t==null){if(this._usePushState||!this._wantsHashChange){t=this.getPath()}else{t=this.getHash()}}return t.replace(N,"")},start:function(t){if(M.started)throw new Error("Backbone.history has already been started");M.started=true;this.options=i.extend({root:"/"},this.options,t);this.root=this.options.root;this._wantsHashChange=this.options.hashChange!==false;this._hasHashChange="onhashchange"in window&&(document.documentMode===void 0||document.documentMode>7);this._useHashChange=this._wantsHashChange&&this._hasHashChange;this._wantsPushState=!!this.options.pushState;this._hasPushState=!!(this.history&&this.history.pushState);this._usePushState=this._wantsPushState&&this._hasPushState;this.fragment=this.getFragment();this.root=("/"+this.root+"/").replace(O,"/");if(this._wantsHashChange&&this._wantsPushState){if(!this._hasPushState&&!this.atRoot()){var e=this.root.slice(0,-1)||"/";this.location.replace(e+"#"+this.getPath());return true}else if(this._hasPushState&&this.atRoot()){this.navigate(this.getHash(),{replace:true})}}if(!this._hasHashChange&&this._wantsHashChange&&!this._usePushState){this.iframe=document.createElement("iframe");this.iframe.src="javascript:0";this.iframe.style.display="none";this.iframe.tabIndex=-1;var r=document.body;var n=r.insertBefore(this.iframe,r.firstChild).contentWindow;n.document.open();n.document.close();n.location.hash="#"+this.fragment}var s=window.addEventListener||function(t,e){return attachEvent("on"+t,e)};if(this._usePushState){s("popstate",this.checkUrl,false)}else if(this._useHashChange&&!this.iframe){s("hashchange",this.checkUrl,false)}else if(this._wantsHashChange){this._checkUrlInterval=setInterval(this.checkUrl,this.interval)}if(!this.options.silent)return this.loadUrl()},stop:function(){var t=window.removeEventListener||function(t,e){return detachEvent("on"+t,e)};if(this._usePushState){t("popstate",this.checkUrl,false)}else if(this._useHashChange&&!this.iframe){t("hashchange",this.checkUrl,false)}if(this.iframe){document.body.removeChild(this.iframe);this.iframe=null}if(this._checkUrlInterval)clearInterval(this._checkUrlInterval);M.started=false},route:function(t,e){this.handlers.unshift({route:t,callback:e})},checkUrl:function(t){var e=this.getFragment();if(e===this.fragment&&this.iframe){e=this.getHash(this.iframe.contentWindow)}if(e===this.fragment)return false;if(this.iframe)this.navigate(e);this.loadUrl()},loadUrl:function(t){if(!this.matchRoot())return false;t=this.fragment=this.getFragment(t);return i.some(this.handlers,function(e){if(e.route.test(t)){e.callback(t);return true}})},navigate:function(t,e){if(!M.started)return false;if(!e||e===true)e={trigger:!!e};t=this.getFragment(t||"");var i=this.root;if(t===""||t.charAt(0)==="?"){i=i.slice(0,-1)||"/"}var r=i+t;t=this.decodeFragment(t.replace(U,""));if(this.fragment===t)return;this.fragment=t;if(this._usePushState){this.history[e.replace?"replaceState":"pushState"]({},document.title,r)}else if(this._wantsHashChange){this._updateHash(this.location,t,e.replace);if(this.iframe&&t!==this.getHash(this.iframe.contentWindow)){var n=this.iframe.contentWindow;if(!e.replace){n.document.open();n.document.close()}this._updateHash(n.location,t,e.replace)}}else{return this.location.assign(r)}if(e.trigger)return this.loadUrl(t)},_updateHash:function(t,e,i){if(i){var r=t.href.replace(/(javascript:|#).*$/,"");t.replace(r+"#"+e)}else{t.hash="#"+e}}});e.history=new M;var q=function(t,e){var r=this;var n;if(t&&i.has(t,"constructor")){n=t.constructor}else{n=function(){return r.apply(this,arguments)}}i.extend(n,r,e);var s=function(){this.constructor=n};s.prototype=r.prototype;n.prototype=new s;if(t)i.extend(n.prototype,t);n.__super__=r.prototype;return n};y.extend=x.extend=$.extend=I.extend=M.extend=q;var F=function(){throw new Error('A "url" property or function must be specified')};var z=function(t,e){var i=e.error;e.error=function(r){if(i)i.call(e.context,t,r,e);t.trigger("error",t,r,e)}};return e});
//# sourceMappingURL=backbone-min.map
/*! backbone.routefilter - v0.2.0 - 2014-05-06
* https://github.com/boazsender/backbone.routefilter
* Copyright (c) 2014 Boaz Sender; Licensed MIT */
(function(e){typeof define=="function"&&define.amd?define(["backbone","underscore"],e):typeof exports=="object"?module.exports=e(require("backbone"),require("underscore")):e(window.Backbone,window._)})(function(e,t){var n=e.Router.prototype.route,r=function(){};t.extend(e.Router.prototype,{before:r,after:r,route:function(e,i,s){s||(s=this[i]);var o=t.bind(function(){var n=[e,t.toArray(arguments)],i;t.isFunction(this.before)?i=this.before:typeof this.before[e]!="undefined"?i=this.before[e]:i=r;if(i.apply(this,n)===!1)return;s&&s.apply(this,arguments);var o;t.isFunction(this.after)?o=this.after:typeof this.after[e]!="undefined"?o=this.after[e]:o=r,o.apply(this,n)},this);return n.call(this,e,i,o)}})});
//=include vendor/js.cookie.js
(function(deparam){
    if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
        try {
            var jquery = require('jquery');
        } catch (e) {
        }
        module.exports = deparam(jquery);
    } else if (typeof define === 'function' && define.amd){
        define(['jquery'], function(jquery){
            return deparam(jquery);
        });
    } else {
        var global;
        try {
          global = (false || eval)('this'); // best cross-browser way to determine global for < ES5
        } catch (e) {
          global = window; // fails only if browser (https://developer.mozilla.org/en-US/docs/Web/Security/CSP/CSP_policy_directives)
        }
        global.deparam = deparam(global.jQuery); // assume jQuery is in global namespace
    }
})(function ($) {
    var deparam = function( params, coerce ) {
        var obj = {},
        coerce_types = { 'true': !0, 'false': !1, 'null': null };

        // Iterate over all name=value pairs.
        params.replace(/\+/g, ' ').split('&').forEach(function(v){
            var param = v.split( '=' ),
            key = decodeURIComponent( param[0] ),
            val,
            cur = obj,
            i = 0,

            // If key is more complex than 'foo', like 'a[]' or 'a[b][c]', split it
            // into its component parts.
            keys = key.split( '][' ),
            keys_last = keys.length - 1;

            // If the first keys part contains [ and the last ends with ], then []
            // are correctly balanced.
            if ( /\[/.test( keys[0] ) && /\]$/.test( keys[ keys_last ] ) ) {
                // Remove the trailing ] from the last keys part.
                keys[ keys_last ] = keys[ keys_last ].replace( /\]$/, '' );

                // Split first keys part into two parts on the [ and add them back onto
                // the beginning of the keys array.
                keys = keys.shift().split('[').concat( keys );

                keys_last = keys.length - 1;
            } else {
                // Basic 'foo' style key.
                keys_last = 0;
            }

            // Are we dealing with a name=value pair, or just a name?
            if ( param.length === 2 ) {
                val = decodeURIComponent( param[1] );

                // Coerce values.
                if ( coerce ) {
                    val = val && !isNaN(val) && ((+val + '') === val) ? +val        // number
                    : val === 'undefined'                       ? undefined         // undefined
                    : coerce_types[val] !== undefined           ? coerce_types[val] // true, false, null
                    : val;                                                          // string
                }

                if ( keys_last ) {
                    // Complex key, build deep object structure based on a few rules:
                    // * The 'cur' pointer starts at the object top-level.
                    // * [] = array push (n is set to array length), [n] = array if n is
                    //   numeric, otherwise object.
                    // * If at the last keys part, set the value.
                    // * For each keys part, if the current level is undefined create an
                    //   object or array based on the type of the next keys part.
                    // * Move the 'cur' pointer to the next level.
                    // * Rinse & repeat.
                    for ( ; i <= keys_last; i++ ) {
                        key = keys[i] === '' ? cur.length : keys[i];
                        cur = cur[key] = i < keys_last
                        ? cur[key] || ( keys[i+1] && isNaN( keys[i+1] ) ? {} : [] )
                        : val;
                    }

                } else {
                    // Simple key, even simpler rules, since only scalars and shallow
                    // arrays are allowed.

                    if ( Object.prototype.toString.call( obj[key] ) === '[object Array]' ) {
                        // val is already an array, so push on the next value.
                        obj[key].push( val );

                    } else if ( {}.hasOwnProperty.call(obj, key) ) {
                        // val isn't an array, but since a second value has been specified,
                        // convert val into an array.
                        obj[key] = [ obj[key], val ];

                    } else {
                        // val is a scalar.
                        obj[key] = val;
                    }
                }

            } else if ( key ) {
                // No value was defined, so set something meaningful.
                obj[key] = coerce
                ? undefined
                : '';
            }
        });

        return obj;
    };
    if ($) {
      $.prototype.deparam = $.deparam = deparam;
    }
    return deparam;
});

(function(root,factory){if(typeof exports==="object"&&module){module.exports=factory()}else{if(typeof define==="function"&&define.amd){define(factory)}else{root.PubSub=factory()}}}((typeof window==="object"&&window)||this,function(){var PubSub={},messages={},lastUid=-1;function hasKeys(obj){var key;for(key in obj){if(obj.hasOwnProperty(key)){return true}}return false}function throwException(ex){return function reThrowException(){throw ex}}function callSubscriberWithDelayedExceptions(subscriber,message,data){try{subscriber(message,data)}catch(ex){setTimeout(throwException(ex),0)}}function callSubscriberWithImmediateExceptions(subscriber,message,data){subscriber(message,data)}function deliverMessage(originalMessage,matchedMessage,data,immediateExceptions){var subscribers=messages[matchedMessage],callSubscriber=immediateExceptions?callSubscriberWithImmediateExceptions:callSubscriberWithDelayedExceptions,s;if(!messages.hasOwnProperty(matchedMessage)){return}for(s in subscribers){if(subscribers.hasOwnProperty(s)){callSubscriber(subscribers[s],originalMessage,data)}}}function createDeliveryFunction(message,data,immediateExceptions){return function deliverNamespaced(){var topic=String(message),position=topic.lastIndexOf(".");deliverMessage(message,message,data,immediateExceptions);while(position!==-1){topic=topic.substr(0,position);position=topic.lastIndexOf(".");deliverMessage(message,topic,data)}}}function messageHasSubscribers(message){var topic=String(message),found=Boolean(messages.hasOwnProperty(topic)&&hasKeys(messages[topic])),position=topic.lastIndexOf(".");while(!found&&position!==-1){topic=topic.substr(0,position);position=topic.lastIndexOf(".");found=Boolean(messages.hasOwnProperty(topic)&&hasKeys(messages[topic]))}return found}function publish(message,data,sync,immediateExceptions){var deliver=createDeliveryFunction(message,data,immediateExceptions),hasSubscribers=messageHasSubscribers(message);if(!hasSubscribers){return false}if(sync===true){deliver()}else{setTimeout(deliver,0)}return true}PubSub.publish=function(message,data){return publish(message,data,false,PubSub.immediateExceptions)};PubSub.publishSync=function(message,data){return publish(message,data,true,PubSub.immediateExceptions)};PubSub.subscribe=function(message,func){if(typeof func!=="function"){return false}if(!messages.hasOwnProperty(message)){messages[message]={}}var token="uid_"+String(++lastUid);messages[message][token]=func;return token};PubSub.unsubscribe=function(tokenOrFunction){var isToken=typeof tokenOrFunction==="string",result=false,m,message,t,token;for(m in messages){if(messages.hasOwnProperty(m)){message=messages[m];if(isToken&&message[tokenOrFunction]){delete message[tokenOrFunction];result=tokenOrFunction;break}else{if(!isToken){for(t in message){if(message.hasOwnProperty(t)&&message[t]===tokenOrFunction){delete message[t];result=true}}}}}}return result};return PubSub}));
//=include vendor/jquery.j-toker.js
/*!
 * Fuse.js v3.0.3 - Lightweight fuzzy-search (http://fusejs.io)
 * 
 * Copyright (c) 2012-2017 Kirollos Risk (http://kiro.me)
 * All Rights Reserved. Apache Software License 2.0
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("Fuse",[],t):"object"==typeof exports?exports.Fuse=t():e.Fuse=t()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=8)}([function(e,t,n){"use strict";e.exports=function(e){return"[object Array]"===Object.prototype.toString.call(e)}},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=n(5),s=n(7),a=n(4),c=function(){function e(t,n){var o=n.location,i=void 0===o?0:o,s=n.distance,c=void 0===s?100:s,h=n.threshold,u=void 0===h?.6:h,l=n.maxPatternLength,f=void 0===l?32:l,v=n.isCaseSensitive,d=void 0!==v&&v,p=n.tokenSeparator,g=void 0===p?/ +/g:p,m=n.findAllMatches,y=void 0!==m&&m,k=n.minMatchCharLength,x=void 0===k?1:k;r(this,e),this.options={location:i,distance:c,threshold:u,maxPatternLength:f,isCaseSensitive:d,tokenSeparator:g,findAllMatches:y,minMatchCharLength:x},this.pattern=this.options.isCaseSensitive?t:t.toLowerCase(),this.pattern.length<=f&&(this.patternAlphabet=a(this.pattern))}return o(e,[{key:"search",value:function(e){if(this.options.isCaseSensitive||(e=e.toLowerCase()),this.pattern===e)return{isMatch:!0,score:0,matchedIndices:[[0,e.length-1]]};var t=this.options,n=t.maxPatternLength,r=t.tokenSeparator;if(this.pattern.length>n)return i(e,this.pattern,r);var o=this.options,a=o.location,c=o.distance,h=o.threshold,u=o.findAllMatches,l=o.minMatchCharLength;return s(e,this.pattern,this.patternAlphabet,{location:a,distance:c,threshold:h,findAllMatches:u,minMatchCharLength:l})}}]),e}();e.exports=c},function(e,t,n){"use strict";var r=n(0),o=function e(t,n,o){if(n){var i=n.indexOf("."),s=n,a=null;-1!==i&&(s=n.slice(0,i),a=n.slice(i+1));var c=t[s];if(null!==c&&void 0!==c)if(a||"string"!=typeof c&&"number"!=typeof c)if(r(c))for(var h=0,u=c.length;h<u;h+=1)e(c[h],a,o);else a&&e(c,a,o);else o.push(c)}else o.push(t);return o};e.exports=function(e,t){return o(e,t,[])}},function(e,t,n){"use strict";e.exports=function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=[],r=-1,o=-1,i=0,s=e.length;i<s;i+=1){var a=e[i];a&&-1===r?r=i:a||-1===r||(o=i-1,o-r+1>=t&&n.push([r,o]),r=-1)}return e[i-1]&&i-r>=t&&n.push([r,i-1]),n}},function(e,t,n){"use strict";e.exports=function(e){for(var t={},n=e.length,r=0;r<n;r+=1)t[e.charAt(r)]=0;for(var o=0;o<n;o+=1)t[e.charAt(o)]|=1<<n-o-1;return t}},function(e,t,n){"use strict";e.exports=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:/ +/g,r=e.match(new RegExp(t.replace(n,"|"))),o=!!r,i=[];if(o)for(var s=0,a=r.length;s<a;s+=1)match=r[s],i.push([e.indexOf(match),match.length-1]);return{score:o?.5:1,isMatch:o,matchedIndices:i}}},function(e,t,n){"use strict";e.exports=function(e,t){var n=t.errors,r=void 0===n?0:n,o=t.currentLocation,i=void 0===o?0:o,s=t.expectedLocation,a=void 0===s?0:s,c=t.distance,h=void 0===c?100:c,u=r/e.length,l=Math.abs(a-i);return h?u+l/h:l?1:u}},function(e,t,n){"use strict";var r=n(6),o=n(3);e.exports=function(e,t,n,i){for(var s=i.location,a=void 0===s?0:s,c=i.distance,h=void 0===c?100:c,u=i.threshold,l=void 0===u?.6:u,f=i.findAllMatches,v=void 0!==f&&f,d=i.minMatchCharLength,p=void 0===d?1:d,g=a,m=e.length,y=l,k=e.indexOf(t,g),x=t.length,S=[],M=0;M<m;M+=1)S[M]=0;if(-1!=k){var b=r(t,{errors:0,currentLocation:k,expectedLocation:g,distance:h});if(y=Math.min(b,y),-1!=(k=e.lastIndexOf(t,g+x))){var _=r(t,{errors:0,currentLocation:k,expectedLocation:g,distance:h});y=Math.min(_,y)}}k=-1;for(var L=[],w=1,A=x+m,C=1<<x-1,F=0;F<x;F+=1){for(var O=0,P=A;O<P;){r(t,{errors:F,currentLocation:g+P,expectedLocation:g,distance:h})<=y?O=P:A=P,P=Math.floor((A-O)/2+O)}A=P;var j=Math.max(1,g-P+1),z=v?m:Math.min(g+P,m)+x,I=Array(z+2);I[z+1]=(1<<F)-1;for(var T=z;T>=j;T-=1){var E=T-1,K=n[e.charAt(E)];if(K&&(S[E]=1),I[T]=(I[T+1]<<1|1)&K,0!==F&&(I[T]|=(L[T+1]|L[T])<<1|1|L[T+1]),I[T]&C&&(w=r(t,{errors:F,currentLocation:E,expectedLocation:g,distance:h}))<=y){if(y=w,(k=E)<=g)break;j=Math.max(1,2*g-k)}}if(r(t,{errors:F+1,currentLocation:g,expectedLocation:g,distance:h})>y)break;L=I}return{isMatch:k>=0,score:0===w?.001:w,matchedIndices:o(S,p)}}},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=n(1),s=n(2),a=n(0),c=function(){function e(t,n){var o=n.location,i=void 0===o?0:o,a=n.distance,c=void 0===a?100:a,h=n.threshold,u=void 0===h?.6:h,l=n.maxPatternLength,f=void 0===l?32:l,v=n.caseSensitive,d=void 0!==v&&v,p=n.tokenSeparator,g=void 0===p?/ +/g:p,m=n.findAllMatches,y=void 0!==m&&m,k=n.minMatchCharLength,x=void 0===k?1:k,S=n.id,M=void 0===S?null:S,b=n.keys,_=void 0===b?[]:b,L=n.shouldSort,w=void 0===L||L,A=n.getFn,C=void 0===A?s:A,F=n.sortFn,O=void 0===F?function(e,t){return e.score-t.score}:F,P=n.tokenize,j=void 0!==P&&P,z=n.matchAllTokens,I=void 0!==z&&z,T=n.includeMatches,E=void 0!==T&&T,K=n.includeScore,R=void 0!==K&&K,q=n.verbose,B=void 0!==q&&q;r(this,e),this.options={location:i,distance:c,threshold:u,maxPatternLength:f,isCaseSensitive:d,tokenSeparator:g,findAllMatches:y,minMatchCharLength:x,id:M,keys:_,includeMatches:E,includeScore:R,shouldSort:w,getFn:C,sortFn:O,verbose:B,tokenize:j,matchAllTokens:I},this.set(t)}return o(e,[{key:"set",value:function(e){return this.list=e,e}},{key:"search",value:function(e){this._log('---------\nSearch pattern: "'+e+'"');var t=this._prepareSearchers(e),n=t.tokenSearchers,r=t.fullSearcher,o=this._search(n,r),i=o.weights,s=o.results;return this._computeScore(i,s),this.options.shouldSort&&this._sort(s),this._format(s)}},{key:"_prepareSearchers",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=[];if(this.options.tokenize)for(var n=e.split(this.options.tokenSeparator),r=0,o=n.length;r<o;r+=1)t.push(new i(n[r],this.options));return{tokenSearchers:t,fullSearcher:new i(e,this.options)}}},{key:"_search",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments[1],n=this.list,r={},o=[];if("string"==typeof n[0]){for(var i=0,s=n.length;i<s;i+=1)this._analyze({key:"",value:n[i],record:i,index:i},{resultMap:r,results:o,tokenSearchers:e,fullSearcher:t});return{weights:null,results:o}}for(var a={},c=0,h=n.length;c<h;c+=1)for(var u=n[c],l=0,f=this.options.keys.length;l<f;l+=1){var v=this.options.keys[l];if("string"!=typeof v){if(a[v.name]={weight:1-v.weight||1},v.weight<=0||v.weight>1)throw new Error("Key weight has to be > 0 and <= 1");v=v.name}else a[v]={weight:1};this._analyze({key:v,value:this.options.getFn(u,v),record:u,index:c},{resultMap:r,results:o,tokenSearchers:e,fullSearcher:t})}return{weights:a,results:o}}},{key:"_analyze",value:function(e,t){var n=e.key,r=e.value,o=e.record,i=e.index,s=t.tokenSearchers,c=void 0===s?[]:s,h=t.fullSearcher,u=void 0===h?[]:h,l=t.resultMap,f=void 0===l?{}:l,v=t.results,d=void 0===v?[]:v;if(void 0!==r&&null!==r){var p=!1,g=-1,m=0;if("string"==typeof r){this._log("\nKey: "+(""===n?"-":n));var y=u.search(r);if(this._log('Full text: "'+r+'", score: '+y.score),this.options.tokenize){for(var k=r.split(this.options.tokenSeparator),x=[],S=0;S<c.length;S+=1){var M=c[S];this._log('\nPattern: "'+M.pattern+'"');for(var b=!1,_=0;_<k.length;_+=1){var L=k[_],w=M.search(L),A={};w.isMatch?(A[L]=w.score,p=!0,b=!0,x.push(w.score)):(A[L]=1,this.options.matchAllTokens||x.push(1)),this._log('Token: "'+L+'", score: '+A[L])}b&&(m+=1)}g=x[0];for(var C=x.length,F=1;F<C;F+=1)g+=x[F];g/=C,this._log("Token score average:",g)}var O=y.score;g>-1&&(O=(O+g)/2),this._log("Score average:",O);var P=!this.options.tokenize||!this.options.matchAllTokens||m>=c.length;if(this._log("\nCheck Matches: "+P),(p||y.isMatch)&&P){var j=f[i];j?j.output.push({key:n,score:O,matchedIndices:y.matchedIndices}):(f[i]={item:o,output:[{key:n,score:O,matchedIndices:y.matchedIndices}]},d.push(f[i]))}}else if(a(r))for(var z=0,I=r.length;z<I;z+=1)this._analyze({key:n,value:r[z],record:o,index:i},{resultMap:f,results:d,tokenSearchers:c,fullSearcher:u})}}},{key:"_computeScore",value:function(e,t){this._log("\n\nComputing score:\n");for(var n=0,r=t.length;n<r;n+=1){for(var o=t[n].output,i=o.length,s=0,a=1,c=0;c<i;c+=1){var h=o[c].score,u=e?e[o[c].key].weight:1,l=h*u;1!==u?a=Math.min(a,l):(o[c].nScore=l,s+=l)}t[n].score=1===a?s/i:a,this._log(t[n])}}},{key:"_sort",value:function(e){this._log("\n\nSorting...."),e.sort(this.options.sortFn)}},{key:"_format",value:function(e){var t=[];this._log("\n\nOutput:\n\n",e);var n=[];this.options.includeMatches&&n.push(function(e,t){var n=e.output;t.matches=[];for(var r=0,o=n.length;r<o;r+=1){var i=n[r],s={indices:i.matchedIndices};i.key&&(s.key=i.key),t.matches.push(s)}}),this.options.includeScore&&n.push(function(e,t){t.score=e.score});for(var r=0,o=e.length;r<o;r+=1){var i=e[r];if(this.options.id&&(i.item=this.options.getFn(i.item,this.options.id)[0]),n.length){for(var s={item:i.item},a=0,c=n.length;a<c;a+=1)n[a](i,s);t.push(s)}else t.push(i.item)}return t}},{key:"_log",value:function(){if(this.options.verbose){var e;(e=console).log.apply(e,arguments)}}}]),e}();e.exports=c}])});
/*
 * Natural Sort algorithm for Javascript - Version 0.8.1 - Released under MIT license
 * Author: Jim Palmer (based on chunking idea from Dave Koelle)
 */
function naturalSort (a, b) {
    var re = /(^([+\-]?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?(?=\D|\s|$))|^0x[\da-fA-F]+$|\d+)/g,
        sre = /^\s+|\s+$/g,   // trim pre-post whitespace
        snre = /\s+/g,        // normalize all whitespace to single ' ' character
        dre = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/,
        hre = /^0x[0-9a-f]+$/i,
        ore = /^0/,
        i = function(s) {
            return (naturalSort.insensitive && ('' + s).toLowerCase() || '' + s).replace(sre, '');
        },
        // convert all to strings strip whitespace
        x = i(a),
        y = i(b),
        // chunk/tokenize
        xN = x.replace(re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0'),
        yN = y.replace(re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0'),
        // numeric, hex or date detection
        xD = parseInt(x.match(hre), 16) || (xN.length !== 1 && Date.parse(x)),
        yD = parseInt(y.match(hre), 16) || xD && y.match(dre) && Date.parse(y) || null,
        normChunk = function(s, l) {
            // normalize spaces; find floats not starting with '0', string or 0 if not defined (Clint Priest)
            return (!s.match(ore) || l == 1) && parseFloat(s) || s.replace(snre, ' ').replace(sre, '') || 0;
        },
        oFxNcL, oFyNcL;
    // first try and sort Hex codes or Dates
    if (yD) {
        if (xD < yD) { return -1; }
        else if (xD > yD) { return 1; }
    }
    // natural sorting through split numeric strings and default strings
    for(var cLoc = 0, xNl = xN.length, yNl = yN.length, numS = Math.max(xNl, yNl); cLoc < numS; cLoc++) {
        oFxNcL = normChunk(xN[cLoc] || '', xNl);
        oFyNcL = normChunk(yN[cLoc] || '', yNl);
        // handle numeric vs string comparison - number < string - (Kyle Adams)
        if (isNaN(oFxNcL) !== isNaN(oFyNcL)) {
            return isNaN(oFxNcL) ? 1 : -1;
        }
        // if unicode use locale comparison
        if (/[^\x00-\x80]/.test(oFxNcL + oFyNcL) && oFxNcL.localeCompare) {
            var comp = oFxNcL.localeCompare(oFyNcL);
            return comp / Math.abs(comp);
        }
        if (oFxNcL < oFyNcL) { return -1; }
        else if (oFxNcL > oFyNcL) { return 1; }
    }
}
/*
* Backbone.js & Underscore.js Natural Sorting
*
* @author Kevin Jantzer <https://gist.github.com/kjantzer/7027717>
* @since 2013-10-17
* 
* NOTE: make sure to include the Natural Sort algorithm by Jim Palmer (https://github.com/overset/javascript-natural-sort)
*/

// add _.sortByNat() method
_.mixin({

	sortByNat: function(obj, value, context) {
	    var iterator = _.isFunction(value) ? value : function(obj){ return obj[value]; };
	    return _.pluck(_.map(obj, function(value, index, list) {
	      return {
	        value: value,
	        index: index,
	        criteria: iterator.call(context, value, index, list)
	      };
	    }).sort(function(left, right) {
	      var a = left.criteria;
	      var b = right.criteria;
	      return naturalSort(a, b);
	    }), 'value');
	}
});


// add _.sortByNat to Backbone.Collection
Backbone.Collection.prototype.sortByNat = function(value, context) {
  var iterator = _.isFunction(value) ? value : function(model) {
    return model.get(value);
  };
  return _.sortByNat(this.models, iterator, context);
};

// new Natural Sort method on Backbone.Collection
Backbone.Collection.prototype.sortNat = function(options) {
  if (!this.comparator) throw new Error('Cannot sortNat a set without a comparator');
  options || (options = {});

  if (_.isString(this.comparator) || this.comparator.length === 1) {
    this.models = this.sortByNat(this.comparator, this);
  } else {
    this.models.sortNat(_.bind(this.comparator, this));
  }

  if (!options.silent) this.trigger('sort', this, options);
  return this;
};

// save the oringal sorting method
Backbone.Collection.prototype._sort = Backbone.Collection.prototype.sort;

// override the default sort method to determine if "regular" or "natural" sorting should be used
Backbone.Collection.prototype.sort = function(){
	
	if( this.sortType && this.sortType === 'natural' )
		Backbone.Collection.prototype.sortNat.apply(this, arguments);
	else
		Backbone.Collection.prototype._sort.apply(this, arguments);
};
// Plugin: add "playing" property for media
Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
  get: function(){
    return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
  }
});

// Plugin: get input selection (http://stackoverflow.com/a/2897510/5578115)
(function($) {
  $.fn.getInputSelection = function() {
    var input = this.get(0);
    var selection = {start: 0, end: 0, text: ''};
    if (!input) return; // No (input) element found
    if ('selectionStart' in input) {
      // Standard-compliant browsers
      selection.start = input.selectionStart;
      selection.end = input.selectionEnd;
      selection.text = input.value.substring(selection.start, selection.end);
    } else if (document.selection) {
      // IE
      input.focus();
      var sel = document.selection.createRange();
      var selLen = document.selection.createRange().text.length;
      sel.moveStart('character', -input.value.length);
      selection.start = sel.text.length - selLen;
      selection.end = selection.start + selLen;
      selection.text = sel.text;
    }
    return selection;
  }
})(jQuery);

(function($) {
  $.fn.setInputPosition = function(position) {
    var input = this.get(0);
    if (!input) return; // No (input) element found
    input.focus();
    if ('selectionStart' in input) {
      // Standard-compliant browsers
      input.setSelectionRange(position, position);
    } else if (input.createTextRange) {
      // IE
      var sel = input.createTextRange();
      sel.move('character', position);
      sel.select();
    }
  }
})(jQuery);

(function($) {
  $.fn.getTextSize = function() {
    var id = 'text-width-tester',
        text = this.val(),
        $tag = $('#' + id),
        styles = {
          fontWeight: this.css('font-weight'),
          fontSize: this.css('font-size'),
          fontFamily: this.css('font-family'),
          display: 'none'
        };
    if (!$tag.length) {
      $tag = $('<span id="' + id + '">' + text + '</span>');
      $tag.css(styles);
      $('body').append($tag);
    } else {
      $tag.css(styles).html(text);
    }
    return {
      width: $tag.width(),
      height: $tag.height()
    }
  }
})(jQuery);

// Utility functions
(function() {
  window.UTIL = {};

  UTIL.escapeInput = function(str){
    return str.replace(/"/g, '&quot;')
  };

  UTIL.formatDate = function(str) {
    var d = new Date(str);
    return d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate();
  };

  UTIL.formatNumber = function(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  UTIL.formatNumberTiny = function(num, dec) {
    if (!dec && dec!==0) dec = 1;
    var formatted = num;
    if (num > 1000000) formatted = UTIL.round(num/1000000, dec) + 'M+';
    else if (num == 1000000) formatted = '1M';
    else if (num > 99999) formatted = UTIL.round(num/1000) + 'K+';
    else if (num > 1000) formatted = UTIL.round(num/1000, dec) + 'K+';
    else if (num == 1000) formatted = '1K';
    return formatted;
  };

  // Format seconds -> hh:mm:ss
  UTIL.formatTime = function(seconds, dec) {
    var s = seconds || 0,
        h = parseInt(Math.floor(s / 3600)) % 24,
        m = parseInt(Math.floor(s / 60)) % 60,
        s = UTIL.round(s % 60, dec),
        string;

    // create format hh:mm:ss
    string = (h > 0 ? h + ':' : '') + (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
    // remove starting zeros
    if (string[0] == '0') string = string.substring(1, string.length);
    return string;
  };

  // Format seconds -> 1h 20m
  UTIL.formatTimeAlt = function(seconds) {
    var s = seconds || 0,
        h = parseInt(Math.floor(s / 3600)) % 24,
        m = parseInt(Math.floor(s / 60)) % 60,
        s = UTIL.round(s % 60),
        string;
    // create format 1h 20m
    if (m > 0) {
      string = (h > 0 ? h + 'h ' : '') + m + 'm';
    } else {
      string = s + 's';
    }
    return string;
  };

  UTIL.formatTimeMs = function(milliseconds, dec) {
    return UTIL.formatTime(milliseconds*0.001, dec);
  };

  // Convert hh:mm:ss -> seconds
  UTIL.getSeconds = function(string, dec) {
    var parts = string.split(':').reverse(),
        seconds = 0;
    // go from hh:mm:ss to seconds
    for (var i=parts.length-1; i>=0; i--) {
      switch( i ) {
        case 2: // hours
          seconds += parseInt(parts[i]) * 60 * 60;
          break;
        case 1: // minutes
          seconds += parseInt(parts[i]) * 60;
          break;
        case 0: // seconds
          seconds += parseFloat(parts[i]);
          break
        default:
          break;
      }
    }
    return UTIL.round(seconds, dec);
  };

  UTIL.highlightText = function(needle, haystack, open, close) {
    open = open || '<span>';
    close = close || '</span>';
    var regex = new RegExp('('+needle+')', 'ig');
    return haystack.replace(regex, open+"$1"+close);
  };

  // Make a random id
  UTIL.makeId = function(length){
    var text = "",
        alpha = "abcdefghijklmnopqrstuvwxyz",
        alphanum = "abcdefghijklmnopqrstuvwxyz0123456789",
    length = length || 8;
    for(var i=0; i < length; i++) {
      if (i <= 0) { // must start with letter
        text += alpha.charAt(Math.floor(Math.random() * alpha.length));
      } else {
        text += alphanum.charAt(Math.floor(Math.random() * alphanum.length));
      }
    }
    return text;
  };

  UTIL.randomNumber = function(length){
    return Math.floor(Math.pow(10, length-1) + Math.random() * 9 * Math.pow(10, length-1));
  };

  // Round to decimal
  UTIL.round = function(num, dec) {
    num = parseFloat(num);
    dec = dec || 0;
    return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
  };

})();

// COMPONENTS
var COMPONENTS = (function() {
  function COMPONENTS() {
    this.init();
  }

  COMPONENTS.prototype.init = function(){
    this.selectInit();
    this.alertInit();
    this.scrollInit();
    this.stickyInit();
    this.toggleInit();
    this.toggleSoundInit();
  };

  COMPONENTS.prototype.alert = function(message, flash, target, flashDelay){
    target = target || '#primary-alert';
    flashDelay = flashDelay || 3000;

    var $target = $(target);
    $target.html('<div>'+message+'</div>').addClass('active');

    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    if (flash) {
      this.timeout = setTimeout(function(){
        $target.removeClass('active');
      }, flashDelay);
    }
  };

  COMPONENTS.prototype.alertInit = function(){
    var _this = this;

    $(window).on('alert', function(e, message, flash, target, flashDelay){
      _this.alert(message, flash, target, flashDelay);
    });

    $('.alert').on('click', function(){
      $(this).removeClass('active');
    });
  };

  COMPONENTS.prototype.scrollInit = function(){
    var _this = this;

    $(window).on('scroll-to', function(e, $el, offset, delay){
      _this.scrollTo($el, offset, delay);
    });
  };

  COMPONENTS.prototype.scrollTo = function($el, offset, delay) {
    offset = offset || 0;
    delay = delay || 2000;

    $('html, body').animate({
        scrollTop: $el.offset().top - offset
    }, 2000);
  };

  COMPONENTS.prototype.select = function($selectOption){
    var $menu = $selectOption.closest('.select'),
        $active = $menu.find('.select-active'),
        $options = $menu.find('.select-option'),
        activeText = $selectOption.attr('data-active') || $selectOption.text();

    $options.removeClass('selected').attr('aria-checked', 'false');
    $selectOption.addClass('selected').attr('aria-checked', 'true');
    $active.text(activeText);
    $menu.removeClass('active');
  };

  COMPONENTS.prototype.selectInit = function(){
    var _this = this;

    // select box
    $(document).on('click', '.select-active', function(){
      _this.selectMenu($(this).closest('.select'));
    });

    // select option
    $(document).on('click', '.select-option', function(){
      _this.select($(this));
    });

    // click away
    $(document).on('click', function(e){

      // select box
      if (!$(e.target).closest('.select').length) {
        _this.selectMenusHide();
      }

    });
  };

  COMPONENTS.prototype.selectMenu = function($selectMenu){
    $selectMenu.addClass('active');
  };

  COMPONENTS.prototype.selectMenusHide = function(){
    $('.select').removeClass('active');
  };

  COMPONENTS.prototype.sticky = function(header){
    var $stickies = $('.sticky-on-scroll');

    if (!$stickies.length) return false;

    var offsetTop = header ? $(header).height() : 0;
    var windowTop = $(window).scrollTop();

    $stickies.each(function(){
      var $el = $(this),
          elTop = $el.offset().top;

      if (windowTop > elTop-offsetTop) {
        $($el.attr('data-sticky')).addClass('sticky');
      } else {
        $($el.attr('data-sticky')).removeClass('sticky');
      }
    });
  };

  COMPONENTS.prototype.stickyInit = function(){
    var _this = this;

    $(window).on('sticky-on', function(e, header){
      _this.stickyOn(header);
    });
  };

  COMPONENTS.prototype.stickyOn = function(header){
    if (this.sticky_is_on) return false;
    this.sticky_is_on = true;
    var _this = this;

    $(window).on('scroll', function(){
      _this.sticky(header);
    });
  };

  COMPONENTS.prototype.toggle = function(el){
    $(el).toggleClass('active');
  };

  COMPONENTS.prototype.toggleInit = function(){
    var _this = this;

    // toggle button
    $(document).on('click', '.toggle-active', function(e){
      e.preventDefault();
      _this.toggle($(this).attr('data-target'));
    });
  };

  COMPONENTS.prototype.toggleSound = function($el){
    var media = $el[0];

    if (media && media.muted) {
      media.muted = false;
    } else if (media) {
      media.muted = true;
    }
  };

  COMPONENTS.prototype.toggleSoundInit = function(){
    var _this = this;

    $(document).on('click', '.toggle-sound', function(e){
      e.preventDefault();
      _this.toggleSound($(this));
    });
  };

  return COMPONENTS;

})();

// Load app on ready
$(function() {
  var components = new COMPONENTS();
});

// Analytics functions
(function() {
  window.ANALYTICS = {};

  ANALYTICS.event = function(category, ev, label, value){
    // console.log(category, ev, label, value)
    if (ga) {
      if (label && value) ga('send', 'event', category, ev, label, value);
      else if (label) ga('send', 'event', category, ev, label);
      else ga('send', 'event', category, ev);
    }
  };
})();

window.API_URL = PROJECT.apiUrl || window.location.protocol + '//' + window.location.hostname;
if (window.location.port && !PROJECT.apiUrl) window.API_URL += ':' + window.location.port

window.DEBUG = true;

window.app = {
  models: {},
  collections: {},
  views: {},
  routers: {},
  initialize: function(){
    // init auth
    var auth_provider_paths = _.object(_.map(PROJECT.authProviders, function(provider) { return [provider.name, provider.path]; }));
    // NOTE: Authentication is now done via rails
    //
    // $.auth.configure({
    //   apiUrl: API_URL,
    //   authProviderPaths: auth_provider_paths
    // });

    // Debug
    // DEBUG && console.log("Project", PROJECT);
    // PubSub.subscribe('auth.validation.success', function(ev, user) {
    //   DEBUG && console.log('User', user);
    // });

    // Force a hard refresh after sign in/out
    PubSub.subscribe('auth.oAuthSignIn.success', function(ev, msg) {
      window.location.reload(true);
    });
    PubSub.subscribe('auth.signOut.success', function(ev, msg) {
      window.location.reload(true);
    });

    // load the main router
    var mainRouter = new app.routers.DefaultRouter();

    // Enable pushState for compatible browsers
    var enablePushState = true;
    var pushState = !!(enablePushState && window.history && window.history.pushState);

    // Start backbone history
    Backbone.history = Backbone.history || new Backbone.History({});
    Backbone.history.start({
      pushState:pushState
    });

    // Backbone.history.start();
  }
};

/**
 * Configurable page title.
 *
 * @TODO: Move this to a view or something.
 */
window.app.pageTitle = function(pagename) {
  if (!pagename) {
    pagename = '';
  }
  var titleElems = document.getElementsByTagName('title');
  if (!titleElems.length) {
    return '';
  }
  var titleElem = titleElems[0];
  var sitename = (
    !!titleElem.getAttribute('data-title-sitename') ?
    titleElem.getAttribute('data-title-sitename') :
    titleElem.textContent
  );
  var template = (
    !!titleElem.getAttribute('data-title-template') ?
    titleElem.getAttribute('data-title-template') :
    ''
  );
  if (!pagename.length || !template.length) {
    return titleElem.textContent;
  }
  return template.replace('{{sitename}}', sitename)
    .replace('{{pagename}}', pagename);
};

// Init backbone app
$(function(){
  app.initialize();
});

// Social media integration.
window.app.socialIntegration = function() {
  this.intervalStage1 = null;
  this.intervalStage2 = null;
  this.initialised = false;
  this.attempts = 0;
  this.maxAttempts = 100;
  this.shown = false;

  // Tests whether social media JS has loaded and initialised.
  var readyForSocial = function(win) {
    return (
      !!win.twttr &&
      !!win.twttr.widgets &&
      !!win.twttr.widgets.load &&
      !!win.FB &&
      !!win.FB.XFBML &&
      !!win.FB.XFBML.parse
    );
  };

  // Shows social media widgets.
  // Must be called after readyForSocial resolves to TRUE.
  this.showSocialWidgets = function() {
    window.twttr.widgets.load();
    FB.XFBML.parse();
    this.shown = true;
  };

  // Checks the progress of the loader so far.
  this.runIntervalStage2 = function() {
    // Short circuit.
    if (this.shown) {
      return;
    }

    // Check to see if we are ready to display.
    var ready = readyForSocial(window);
    if (!!ready) {
      clearInterval(this.socialLoadIntId);
      this.showSocialWidgets();
      return;
    }

    // Check to see if we've let it go on too long.
    this.attempts++;
    if (this.attempts >= this.maxAttempts) {
      console.error('Gave up on loading social widgets.');
      clearInterval(this.socialLoadIntId);
      return;
    }
  };

  // Load Facebook.
  this.initFacebook = function(d, s, id, fbAppId) {
    // Check for existence of fb-root first.
    if (!document.getElementById('fb-root')) {
      return false;
    }
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.8&appId=" + fbAppId;
    fjs.parentNode.insertBefore(js, fjs);
    return true;
  };

  // Load Twitter.
  this.initTwitter = function(d, s, id) {
    var js,
    fjs = d.getElementsByTagName(s)[0],
    t = window.twttr || {};
    if (d.getElementById(id)) {
      return t;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);
    t._e = [];
    t.ready = function(f) {
      t._e.push(f);
    };
    return t;
  };

  // Initialise social media external Javascript,
  // and set up any HTML scaffolding.
  this.initSocialScripts = function() {
    // Insert fb-root element.
    if (!document.getElementById('fb-root')) {
      var body = document.getElementsByTagName('body')[0];
      var fbRoot = document.createElement('div');
      fbRoot.setAttribute('id', 'fb-root');
      body.insertBefore(fbRoot, body.firstChild);
    }

    // Insert Facebook script.
    window.fbLoad = this.initFacebook(document, 'script', 'facebook-jssdk', facebookAppId);

    // Insert Twitter script.
    window.twttr = this.initTwitter(document, "script", "twitter-wjs");

    // Minimum initialisation prerequisites.
    this.initialised = (
      !!document.getElementById('fb-root') &&
      !!window.fbLoad &&
      !!window.twttr
    );
    return;
  };

  // Once the social scripts have been initialised,
  // show the widgets.
  this.completeStage1 = function() {
    this.attempts = 0;
    this.shown = false;
    if (!!this.intervalStage2) {
      clearInterval(this.intervalStage2);
    }
    this.intervalStage2 = setInterval(this.runIntervalStage2.bind(this), 250);
  };

  // Stage 1: Initialise social scripts, and don't continue until we have.
  this.runIntervalStage1 = function() {
    if (!!this.initialised) {
      clearInterval(this.intervalStage1);
      this.completeStage1();
    }
    else {
      this.initSocialScripts();
    }  
  };

  // Initialises entire social widget stack.
  this.init = function() {
    if (!!this.intervalStage1) {
      clearInterval(this.intervalStage1);
    }
    this.intervalStage1 = setInterval(this.runIntervalStage1.bind(this), 250);
  };
};

window.app.social = new window.app.socialIntegration();
document.addEventListener("DOMContentLoaded", function(event) {
  window.app.social.init();
});

app.routers.DefaultRouter = Backbone.Router.extend({

  routes: {
    "":                             "index",
    "?*queryString":                "index",
    "transcripts/:id":              "transcriptEdit",
    "transcripts/:id?*queryString": "transcriptEdit",
    "page/:id":                     "pageShow",
    "dashboard":                    "dashboard",
    "search":                       "search",
    "search?*queryString":          "search",
    "collections":                  "collections",
  },

  before: function( route, params ) {
    $('#main').empty().addClass('loading');
  },

  after: function( route, params ) {
    window.scrollTo(0, 0);
  },

  dashboard: function(){
    var data = this._getData(data);
    var header = new app.views.Header(data);
    var main = new app.views.Dashboard(data);
    var footer = new app.views.Footer(data);
    main.$el.attr('role', 'main');
  },

  index: function(queryString) {
    var data = this._getData(data);
    if (queryString) data.queryParams = deparam(queryString);
    var header = new app.views.Header(data);
    var main = new app.views.Home(data);
    var footer = new app.views.Footer(data);
  },

  pageShow: function(id){
    var data = this._getData(data);
    var header = new app.views.Header(data);
    var main = new app.views.Page(_.extend({}, data, {el: '#main', page_key: id}));
    var footer = new app.views.Footer(data);
    main.$el.removeClass('loading').attr('role', 'main');
  },

  search: function(queryString) {
    var data = this._getData(data);
    if (queryString) data.queryParams = deparam(queryString);
    var header = new app.views.Header(data);
    var main = new app.views.Search(data);
    var footer = new app.views.Footer(data);
  },

  collections: function() {
    var data = this._getData(data);
    var header = new app.views.Header(data);
    var main = new app.views.Collections(data);
    var footer = new app.views.Footer(data);
  },

  transcriptEdit: function(id, queryString) {
    var data = this._getData(data);
    if (queryString) data.queryParams = deparam(queryString);
    var header = new app.views.Header(data);
    var toolbar = new app.views.TranscriptToolbar(_.extend({}, data, {el: '#secondary-navigation', menu: 'transcript_edit'}));
    var modals = new app.views.Modals(data);
    var footer = new app.views.Footer(data);

    var verifyView = new app.views.TranscriptLineVerify(data);
    modals.addModal(verifyView.$el);

    var flagView = new app.views.TranscriptLineFlag(data);
    modals.addModal(flagView.$el);

    var downloadView = new app.views.TranscriptDownload(_.extend({}, data, {transcript_id: id}));
    modals.addModal(downloadView.$el);

    var transcript_model = new app.models.Transcript({id: id});
    var main = new app.views.TranscriptEdit(_.extend({}, data, {el: '#main', model: transcript_model}));
  },

  _getData: function(data){

    var user = {};
    if ($.auth.user && $.auth.user.signedIn) {
      user = $.auth.user;
    }

    data = data || {};
    data = $.extend({}, {project: PROJECT, user: user, debug: DEBUG, route: this._getRouteData()}, data);

    DEBUG && console.log('Route', data.route);

    return data;
  },

  _getRouteData: function(){
    var Router = this,
        fragment = Backbone.history.fragment,
        routes = _.pairs(Router.routes),
        route = null, action = null, params = null, matched, path;

    matched = _.find(routes, function(handler) {
      action = _.isRegExp(handler[0]) ? handler[0] : Router._routeToRegExp(handler[0]);
      return action.test(fragment);
    });

    if(matched) {
      params = Router._extractParameters(action, fragment);
      route = matched[0];
      action = matched[1];
    }

    path = fragment ? '/#/' + fragment : '/';

    return {
      route: route,
      action: action,
      fragment : fragment,
      path: path,
      params : params
    };
  }

});

app.models.Transcript = Backbone.Model.extend({

  parse: function(resp){
    return resp;
  },

  url: function(){
    var id = this.get('uid') || this.id;
    return API_URL + '/transcripts/'+id+'.json';
  }

});

app.collections.Collections = Backbone.Collection.extend({

  url: function() {
    return API_URL + '/collections.json';
  }

});

app.collections.Transcripts = Backbone.Collection.extend({
  sortType: 'natural',

  initialize: function(params) {
    var defaults = {
      endpoint: '/transcripts.json'
    };
    this.options = _.extend({}, defaults, params);

    this.params = {page: 1};
    if (this.options.params) this.params = _.extend({}, this.params, this.options.params);
  },

  getPage: function(){
    return this.params.page;
  },

  getParam: function(name){
    return this.params[name];
  },

  getParams: function(){
    return this.params;
  },

  hasAllPages: function(){
    return !this.hasMorePages();
  },

  hasMorePages: function(){
    return (this.params.page * this.per_page < this.total);
  },

  nextPage: function(){
    this.params.page += 1;
  },

  parse: function(resp){
    this.params.page = resp.current_page;
    this.per_page = resp.per_page;
    this.total = resp.total_entries;

    var entries = [];
    _.each(resp.entries, function(t, i){
      t.completeness = t.percent_completed + t.percent_edited * 0.01;
      entries.push(t);
    });

    return entries;
  },

  setParams: function(params){
    var _this = this;

    _.each(params, function(value, key){
      if (value=="ALL" || !value.length) _this.params = _.omit(_this.params, key);
      else _this.params[key] = value;
    });
  },

  url: function() {
    var params = '?' + $.param(this.params);
    return API_URL + this.options.endpoint + params;
  }

});

app.views.Base = Backbone.View.extend({

});

app.views.Collections = app.views.Base.extend({

  el: '#main',
  template: _.template(TEMPLATES['collections_index.ejs']),

  initialize: function(data){
    var defaults = {
      queryParams: {}
    };

    this.data = _.extend({}, defaults, data);

    this.render();
  },

  onCollectionsLoaded: function(collection){
    var data = collection.toJSON();
    this.$el.html(this.template({collections: data}));
    this.$el.removeClass('loading');
  },

  render: function() {
    document.title = app.pageTitle('Collections');

    this.collections = this.collections || new app.collections.Collections({
      endpoint: '/collections.json'
    });

    this.collections.fetch({
      success: this.onCollectionsLoaded.bind(this),
      error: function(collection, response, options){
        $(window).trigger('alert', ['Whoops! We seem to have trouble loading our transcripts. Please try again by refreshing your browser or come back later!']);
      }
    });

    return this;
  }

});

app.views.Account = app.views.Base.extend({

  el: '#account-container',

  template: _.template(TEMPLATES['account.ejs']),

  events: {
    "click .auth-link": "doAuthFromLink",
    "click .check-auth-link": "checkAuthForLink",
    "click .sign-out-link": "signOut"
  },

  initialize: function(data){
    this.data = data;
    this.data.signedIn = false;
    this.data.score = 0;
    this.loadListeners();
    this.loadUser();

    this.render();
  },

  // this function needs to be refactor later
  loadUser: function(){
    var self = this;

    console.log('Logged in user');
    $.post(API_URL + "/authenticate.json", function(data) {
      user = data.user;

      if (user.id) {
        self.data.signedIn = true;
        self.data.user = user;
        self.data.score = user.lines_edited;
        PubSub.publish('auth.validation.success', user)
      }
      else {
        self.data.signedIn = false;
        self.data.user = null;
        self.data.score = null;

      }
    });
  },

  doAuth: function(provider) {
    $.auth
      .oAuthSignIn({provider: provider})
      .fail(function(resp) {
        $(window).trigger('alert', ['Authentication failure: ' + resp.errors.join(' ')]);
      });
  },

  doAuthFromLink: function(e){
    e.preventDefault();
    var provider = $(e.currentTarget).attr('data-provider');
    this.doAuth(provider);
  },

  checkAuthForLink: function(e) {
    e.preventDefault();
    $.auth.validateToken()
    .then(function(user) {
      // Valid, redirect to destination path.
      console.log('checkAuthForLink success');
      window.location.href = e.target.href;
    })
    .fail(function() {
      // Failed, report error.
      console.log('checkAuthForLink failure');
      $(window).trigger('alert', [
        'You must log in as admin to access this section.',
        true,
      ]);
    });
  },

  listenForAuth: function(){
    var _this = this;

    // check auth sign in
    PubSub.subscribe('auth.oAuthSignIn.success', function(ev, msg) {
      _this.onValidationSuccess($.auth.user);
      $(window).trigger('alert', ['Successfully signed in as '+$.auth.user.name+'!  Refreshing page...', true]);
    });

    // check auth validation
    PubSub.subscribe('auth.validation.success', function(ev, user) {
      _this.onValidationSuccess(user);
    });

    // check sign out
    PubSub.subscribe('auth.signOut.success', function(ev, msg) {
      _this.onSignOutSuccess();
      $(window).trigger('alert', ['Successfully signed out! Refreshing page...', true]);
    });
  },

  loadListeners: function(){
    var _this = this;

    this.listenForAuth();

    // user submitted new edit; increment
    PubSub.subscribe('transcript.edit.submit', function(ev, data){
      if (data.is_new && _this.data.user.signedIn) {
        _this.data.score += 1;
        _this.updateScore();
      }
    });
  },

  onSignOutSuccess: function(){
    this.data.user = {};
    this.data.score = 0;
    // this.render();
    // Redirect to homepage when user logs out.
    window.history.pushState({}, document.title, '/');
  },

  onValidationSuccess: function(user){
    this.data.user = user;
    this.data.score = user.lines_edited;
    this.render();
  },

  render: function() {
    this.$el.html(this.template(this.data));
    return this;
  },

  signOut: function(e){
    e && e.preventDefault();

    $.auth.signOut();
  },

  updateScore: function(){
    this.$('.score').text(UTIL.formatNumberTiny(this.data.score)).addClass('active');
  }

});

app.views.Crumbs = app.views.Base.extend({

  template: _.template(TEMPLATES['crumbs.ejs']),

  initialize: function(data){
    this.data = data;

    this.data.crumbs = this.data.crumbs || [];

    this.listenForCrumbs();

    this.render();
  },

  listenForCrumbs: function(){
    var _this = this;

    // check for transcript load
    PubSub.subscribe('transcript.load', function(ev, data) {
      var crumb = {'label': data.label || data.transcript.title};
      //if (data.transcript.image_url) crumb.image = data.transcript.image_url;
      _this.data.crumbs = [crumb];
      _this.render();
    });


  },

  render: function() {
    this.$el.html(this.template(this.data));
    return this;
  }

});

app.views.Menu = app.views.Base.extend({

  template: _.template(TEMPLATES['menu.ejs']),

  initialize: function(data){
    this.data = data;
    this.data.menu_key = this.data.menu_key || '';

    var menus = this.data.project.menus || {},
        key = this.data.menu_key;

    this.data.menu = [];
    if (key && menus[key]) {
      this.data.menu = menus[key];
    }

    this.render();
  },

  render: function() {
    this.$el.html(this.toString());
    return this;
  },

  toString: function(){
    return this.template(this.data);
  }

});

app.views.Modal = app.views.Base.extend({

  tagName: "div",
  className: "modal-wrapper",

  template: _.template(TEMPLATES['modal.ejs']),

  events: {
    "click .modal-tab": "tab"
  },

  initialize: function(data){
    this.data = _.extend({}, data);

    this.data.active_page = 0;
    this.data.active = false;

    this.loadContents();
    this.render();
  },

  loadContents: function(){
    var _this = this,
        modal_pages = this.data.page ? [this.data.page] : this.data.pages;

    // retrieve page contents
    _.each(modal_pages, function(page, i){
      var pageView = new app.views.Page(_.extend({}, _this.data, {page_key: page.file}));
      modal_pages[i]['contents'] = pageView.toString();
    });

    this.data.pages = modal_pages;
  },

  render: function() {
    this.$el.html(this.template(this.data));
    return this;
  },

  tab: function(e){
    e && e.preventDefault();
    var $tab = $(e.currentTarget);
    this.data.active_page = parseInt($tab.attr('data-tab'));
    this.data.active = true;
    this.render();
  }

});

app.views.Page = app.views.Base.extend({

  template: _.template(TEMPLATES['page.ejs']),

  initialize: function(data){
    this.data = _.extend({}, data);

    this.data.content = this.data.content || '';

    this.getPageContent();

    if (this.el) this.render();

    this.displayQueryStringAlert();
  },

  getPageContent: function(){
    var page_key = this.data.page_key;
    var pages = this.data.project.pages;

    if (!page_key) return false;
    
    // add .md extension if we can't find the page
    if (!pages[page_key]) page_key += '.md';

    if (pages[page_key]) {
      var template = _.template(pages[page_key]);
      this.data.content = template(this.data);
    }
  },

  getPageTitle: function() {
    if (!!this.data.page_key) {
      var matches = this.data.content.match(/<h1.*>([^<]+)<\/h1>/);
      if (!!matches) {
        return matches[1];
      }
    }
    return '';
  },

  render: function() {
    this.$el.html(this.toString());
    var pageTitle = this.getPageTitle();
    if (!!pageTitle.length) {
      document.title = app.pageTitle(pageTitle);
    }
    return this;
  },

  toString: function(){
    return this.template(this.data);
  },

  displayQueryStringAlert: function() {
    // Determine if we need to throw out an alert on load.
    // Do some rough query string param parsing to get the value
    // of show_alert, which we use in lieu of flash.
    if (!!window.location.search && window.location.search.length) {
      var might_show_alert = window.location.search.match(/show_alert=([^&]+)/);
      if (!!might_show_alert) {
        $(window).trigger('alert', [
          decodeURIComponent(might_show_alert[1]).replace(/\+/g, ' '),
          true,
        ]);

        // Strip alert from URL and force refresh.
        var newUrl = window.location.href
          .replace("show_alert=" + might_show_alert[1])
          .replace(/(&+)/, '&')
          .replace(/(\?&)/, '?');
        window.history.pushState({}, document.title, newUrl);
      }
    }
  }

});

app.views.Dashboard = app.views.Base.extend({

  template: _.template(TEMPLATES['user_dashboard.ejs']),

  el: '#main',

  initialize: function(data){
    this.data = data;
    this.secondsPerLine = 5;
    this.listenForAuth();
  },

  listenForAuth: function(){
    var _this = this;

    // check auth validation
    PubSub.subscribe('auth.validation.success', function(ev, user) {
      _this.loadData(user);
    });
  },

  loadData: function(user){
    var _this = this;

    this.data.transcripts = [];

    $.getJSON("/transcript_edits.json", {user_id: user.id}, function(data) {
      if (data.edits && data.edits.length) {
        _this.parseEdits(data.edits, data.transcripts);
      }
      _this.render();
    });
  },

  parseEdits: function(edits, transcripts){
    var _this = this;

    edits = _.map(edits, function(edit){
      var e = _.clone(edit);
      e.updated_at = Date.parse(e.updated_at)/1000;
      return e;
    });

    var transcripts = _.map(transcripts, function(transcript, i){
      var t = _.clone(transcript);
      t.index = i;
      t.edits = _.filter(edits, function(e){ return e.transcript_id==transcript.id; });
      t.edit_count = t.edits.length;
      t.seconds_edited = t.edit_count * _this.secondsPerLine;
      var last_edit = _.max(t.edits, function(e){ return e.updated_at; });
      if (last_edit) t.updated_at = last_edit.updated_at;
      return t;
    });

    this.data.transcripts = _.sortBy(transcripts, function(t){ return t.updated_at; }).reverse();
    this.data.edit_count = edits.length;
    this.data.seconds_edited = this.data.edit_count * this.secondsPerLine;
  },

  render: function() {
    this.$el.html(this.template(this.data));
    this.$el.removeClass('loading');

    return this;
  }

});

app.views.Footer = app.views.Base.extend({

  el: '#footer',

  initialize: function(data){
    this.data = _.extend({}, data);

    this.render();
  },

  render: function() {
    this.renderContent();
    this.renderMenu();

    return this;
  },

  renderContent: function(){
    if (this.data.project.pages['footer.md']) {
      var page = new app.views.Page(_.extend({}, this.data, {page_key: 'footer.md'}))
      this.$el.append(page.render().$el);
    }
  },

  renderMenu: function(){
    // render the menu
    var menu = new app.views.Menu(_.extend({}, this.data, {el: '#footer-menu-container', menu_key: 'footer'}));
  }

});

app.views.Header = app.views.Base.extend({

  el: '#header',

  title_template: _.template(TEMPLATES['header_title.ejs']),

  initialize: function(data){
    this.data = data;

    this.render();
  },

  render: function() {
    // render the title
    this.renderTitle();

    // render the header crumbs
    var header_crumbs = new app.views.Crumbs(_.extend({}, this.data, {el: '#header-crumbs'}));

    // render the primary menu
    var primary_menu = new app.views.Menu(_.extend({}, this.data, {el: '#primary-menu-container', menu_key: 'header'}));

    // render the account
    var account = new app.views.Account(this.data);

    return this;
  },

  renderTitle: function(){
    this.$el.find('#header-title').html(this.title_template(this.data));
  }

});

app.views.Home = app.views.Base.extend({

  el: '#main',

  initialize: function(data){
    this.data = data;

    this.render();
  },

  render: function() {

    // write page contents
    var home_page = new app.views.Page(_.extend({}, this.data, {page_key: 'home.md'}));

    // get transcripts
    var transcript_collection = new app.collections.Transcripts();
    var collection_collection = new app.collections.Collections();
    var transcripts_view = new app.views.TranscriptsIndex(_.extend({}, this.data, {collection: transcript_collection, collections: collection_collection}));

    this.$el.append(home_page.render().$el);
    this.$el.append(transcripts_view.$el);
    this.$el.removeClass('loading');

    return this;
  }

});

app.views.Modals = app.views.Base.extend({

  el: '#app',

  events: {
    "click .modal-dismiss": "dismissModals",
    "click .modal-invoke": "invokeModalFromLink"
  },

  initialize: function(data){
    this.data = data;
    this.lastInvoked = false;

    this.loadListeners();
    this.render();
  },

  addModal: function($modal){
    this.$el.append($modal);
  },

  dismissModals: function(e){
    e && e.preventDefault();
    this.$('.modal').removeClass('active');
  },

  invokeModal: function(id){
    this.$('#'+id).find('.modal').addClass('active');
    this.lastInvoked = id;
  },

  invokeModalFromLink: function(e){
    e.preventDefault();

    this.invokeModal($(e.currentTarget).attr('data-modal'));
  },

  loadListeners: function(){
    var _this = this;

    PubSub.subscribe('modal.invoke', function(ev, id) {
      _this.invokeModal(id);
    });

    PubSub.subscribe('modals.dismiss', function(ev, data) {
      _this.dismissModals();
    });

    // listen for player state change
    PubSub.subscribe('player.state.change', function(ev, state) {
      _this.$el.attr('state', state);
    });
  },

  render: function() {
    // modals have already been rendered
    if (this.$('.modal').length) return this;

    var _this = this,
        pages = this.data.project.pages;

    _.each(this.data.project.modals, function(modal, id){
      // render modal
      var data = _.extend({}, modal, {id: id, project: _this.data.project});
      var modal = new app.views.Modal(data);
      _this.$el.append(modal.$el);
    });

    return this;
  }

});

app.views.Search = app.views.Base.extend({

  el: '#main',
  template: _.template(TEMPLATES['transcript_search.ejs']),
  template_list: _.template(TEMPLATES['transcript_list.ejs']),
  template_item: _.template(TEMPLATES['transcript_search_item.ejs']),

  events: {
    "submit .search-form": "searchFromForm",
    "keyup .search-form input": "searchFromInput"
  },

  initialize: function(data){
    var defaults = {
      queryParams: {}
    };

    this.data = _.extend({}, defaults, data);

    this.render();
    this.loadListeners();
    this.loadTranscripts();
    this.loadCollections();
  },

  loadCollections: function(){
    var _this = this;

    this.collections = this.collections || new app.collections.Collections();

    this.collections.fetch({
      success: function(collection, response, options){
        _this.renderFacets(collection.toJSON());
      },
      error: function(collection, response, options){
        _this.renderFacets([]);
      }
    });
  },

  loadListeners: function(){
    var _this = this;

    PubSub.subscribe('transcripts.filter', function(ev, filter) {
      var data = {};
      data[filter.name] = filter.value;
      _this.setParams(data);
    });

    PubSub.subscribe('transcripts.sort', function(ev, sort_option) {
      _this.setParams({
        'sort_by': sort_option.name,
        'order': sort_option.order
      });
    });

    PubSub.subscribe('transcripts.search', function(ev, keyword) {
      _this.setParams({
        'q': keyword
      });
    });
  },

  loadTranscripts: function(){
    var _this = this;
    var params = this.data.queryParams;

    // do a deep search
    params.deep = 1;

    this.$transcripts.addClass('loading');
    this.transcripts = this.transcripts || new app.collections.Transcripts({
      endpoint: '/search.json',
      params: params
    });

    this.transcripts.fetch({
      success: function(collection, response, options){
        _this.renderTranscripts(collection);
      },
      error: function(collection, response, options){
        $(window).trigger('alert', ['Whoops! We seem to have trouble loading our transcripts. Please try again by refreshing your browser or come back later!']);
      }
    });
  },

  render: function() {
    this.$el.html(this.template(this.data));
    this.$el.removeClass('loading');
    this.$transcripts = this.$('#transcript-results');
    this.$facets = this.$('#transcript-facets');
    document.title = app.pageTitle('Search');
    return this;
  },

  renderFacets: function(collections){
    this.facetsView = this.facetsView || new app.views.TranscriptFacets({collections: collections, queryParams: this.data.queryParams, disableSearch: true, disableSort: true});
    this.$facets.html(this.facetsView.render().$el);
  },

  renderTranscripts: function(transcripts){
    var _this = this;
    var transcriptsData = transcripts.toJSON();

    var list = this.template_list({has_more: transcripts.hasMorePages()});
    var $list = $(list);
    var $target = $list.first();
    var query = transcripts.getParam('q') || '';

    if (transcripts.getPage() > 1) {
      this.$transcripts.append($list);

    } else {
      this.$transcripts.empty();
      if (transcriptsData.length){
        this.$transcripts.html($list);
      } else {
        this.$transcripts.html('<p>No transcripts found!</p>');
      }
    }
    this.$transcripts.removeClass('loading');

    _.each(transcriptsData, function(transcript){
      var item = _this.template_item(_.extend({}, transcript, {query: query}));
      $target.append($(item));
    });

    $(window).trigger('scroll-to', [this.$('#search-form'), 110]);
  },

  search: function(keyword){
    PubSub.publish('transcripts.search', keyword);
  },

  searchFromForm: function(e){
    e.preventDefault();
    var $form = $(e.currentTarget),
        keyword = $form.find('input[name="keyword"]').val();

    keyword = keyword.trim().toLowerCase();

    this.search(keyword);
  },

  searchFromInput: function(e){
    var $input = $(e.currentTarget),
        keyword = $input.val();

    keyword = keyword.trim();

    // only submit if empty
    if (!keyword.length)
      this.search(keyword);
  },

  setParams: function(params){
    this.$transcripts.empty().addClass('loading');
    params.page = 1;
    this.transcripts.setParams(params);
    this.loadTranscripts();
    this.updateUrlParams();
  },

  updateUrlParams: function(){
    // get params
    var params = this.transcripts.getParams();
    // update URL if there's facet data
    if (_.keys(params).length > 0 && window.history) {
      var url = '/' + this.data.route.route + '?' + $.param(params);
      window.history.pushState(params, document.title, url);
    }
    else if (window.history) {
      var url = '/' + this.data.route.route;
      window.history.pushState(params, document.title, url);
    }
  }

});

// Core Transcript view to be extended
app.views.Transcript = app.views.Base.extend({

  current_line_i: -1,
  play_all: false,

  centerOn: function($el){
    var offset = $el.offset().top,
        height = $el.height(),
        windowHeight = $(window).height(),
        animationDuration = 500,
        animationPadding = 100,
        timeSinceLastAction = 9999,
        currentTime = +new Date(),
        scrollOffset;

    // determine time since last action to prevent too many queued animations
    if (this.lastCenterActionTime) {
      timeSinceLastAction = currentTime - this.lastCenterActionTime;
    }
    this.lastCenterActionTime = currentTime;

    // determine scroll offset
    if (height < windowHeight) {
      scrollOffset = offset - ((windowHeight / 2) - (height / 2));

    } else {
      scrollOffset = offset;
    }

    // user is clicking rapidly; don't animate
    if (timeSinceLastAction < (animationDuration+animationPadding)) {
      $('html, body').scrollTop(scrollOffset);
    }
    else {
      $('html, body').animate({scrollTop: scrollOffset}, animationDuration);
    }

  },

  checkForStartTime: function(){
    if (!this.data.queryParams || !this.data.queryParams.t) return false;

    var seconds = UTIL.getSeconds(this.data.queryParams.t);
    if (!seconds) return false;

    var select_line_i = 0;
    _.each(this.data.transcript.lines, function(line, i){
      var line_seconds = UTIL.getSeconds(UTIL.formatTime(line.start_time/1000));
      if (line_seconds <= seconds) select_line_i = i;
    });

    this.lineSelect(select_line_i);

  },

  fitInput: function($input){
    var fontSize = parseInt($input.css('font-size')),
        maxWidth = $input.width() + 5;

    // store the original font size
    if (!$input.attr('original-font-size')) $input.attr('original-font-size', fontSize);

    // see how big the text is at the default size
    var textWidth = $input.getTextSize().width;
    if (textWidth > maxWidth) {
        // the extra .8 here makes up for some over-measures
        fontSize = fontSize * maxWidth / textWidth * 0.8;
    }

    $input.css({fontSize: fontSize + 'px'});
  },

  fitInputReset: function($input){
    // store the original font size
    if ($input.attr('original-font-size')) {
      $input.css({fontSize: $input.attr('original-font-size') + 'px'});
    }
  },

  getPageTitle: function() {
    if (!!this.data.transcript) {
      return this.data.transcript.title;
    }
    return '';
  },

  lineNext: function(){
    this.lineSelect(this.current_line_i + 1);
  },

  linePrevious: function(){
    this.lineSelect(this.current_line_i - 1);
  },

  lineSave: function(i){
    // override me
  },

  lineSelect: function(i){
    // check if in bounds
    var lines = this.data.transcript.lines;
    // the last one
    if (i >= lines.length) {
      this.onLineOff(this.current_line_i);
      PubSub.publish('transcript.finished', true);
      return false;
    }
    if (i < 0 || i==this.current_line_i) return false;

    this.onLineOff(this.current_line_i);

    // select line
    this.current_line_i = i;
    this.current_line = this.data.transcript.lines[i];

    // update UI
    var $active = $('.line[sequence="' + i + '"]').first();
    var $input = $active.find('input');

    $('.line.active').removeClass('active');
    $active.addClass('active');

    this.centerOn($active);

    if (!this.play_all) {
      // focus on input
      if ($input.length) $input.first().focus();
    }

    // fit input
    this.fitInput($input);

    // play audio
    this.pause_at_time = this.current_line.end_time * 0.001;
    this.playerPlay(this.current_line.start_time);
  },

  lineSubmit: function(){
    this.lineNext();
  },

  lineToggle: function(){
    // not started yet, initialize to first line
    if (this.current_line_i < 0) {
      this.lineSelect(0);

    // replay the line if end-of-line reached
    } else if (this.pause_at_time !== undefined && this.player.currentTime >= this.pause_at_time && !this.player.playing) {
      this.playerPlay(this.current_line.start_time);

    // otherwise, just toggle play
    } else {
      this.playerToggle();
    }
  },

  listenForAuth: function(){
    var _this = this;

    // check auth sign in
    PubSub.subscribe('auth.oAuthSignIn.success', function(ev, msg) {
      _this.refresh();
    });

    // check sign out
    PubSub.subscribe('auth.signOut.success', function(ev, msg) {
      _this.refresh();
    });
  },

  loadAudio: function(){
    // Player already loaded
    if (this.player) {

      // Transcript audio already loaded
      if ($(this.player).attr('data-transcript') == ""+this.data.transcript.id) {
        this.onAudioLoad();
        return false;
      }
      $(this.player).remove();
    }

    var _this = this,
      audio_urls = this.data.project.useVendorAudio && this.data.transcript.vendor_audio_urls.length ? this.data.transcript.vendor_audio_urls : [this.data.transcript.audio_url];

    // build audio string
    var audio_string = '<audio data-transcript="'+this.data.transcript.id+'" preload>';
    _.each(audio_urls, function(url){
      var ext = url.substr(url.lastIndexOf('.') + 1),
          type = ext;
      if (ext == 'mp3') type = 'mpeg';
      audio_string += '<source src="'+url+'" type="audio/'+type+'">';
    });
    audio_string += '</audio>';

    // create audio object
    var $audio = $(audio_string);
    this.player = $audio[0];

    // wait for audio to start to load
    this.player.onloadstart = function(){
      if (!_this.player_loaded) {
        _this.player_loaded = true;
        _this.onAudioLoad();
      }
    };

    // wait for it to load
    // this.player.oncanplay = function(){
    //   if (!_this.player_loaded) {
    //     _this.player_loaded = true;
    //     _this.onAudioLoad();
    //   }
    // };

    // check for time update
    this.player.ontimeupdate = function() {
      _this.onTimeUpdate();
    };

    // check for buffer time
    this.player.onwaiting = function(){
      _this.message('Buffering audio...');
      _this.playerState('buffering');
    };

  },

  loadListeners: function(){ /* override me */ },

  loadTranscript: function(){
    var _this = this;

    this.$el.addClass('loading');

    this.model.fetch({
      success: function(model, response, options){
        _this.onTranscriptLoad(model);
      },
      error: function(model, response, options){
        $(window).trigger('alert', ['Whoops! We seem to have trouble loading this transcript. Please try again by refreshing your browser or come back later!']);
      }
    });
  },

  loadUserProgress: function(){ /* override me */ },

  message: function(text){
    // $('#transcript-notifications').text(text);
  },

  messageHide: function(text){
    // if ($('#transcript-notifications').text()==text) {
    //   $('#transcript-notifications').text('');
    // }
  },

  onAudioLoad: function(){ /* override me */ },

  onLineOff: function(i){
    // close all modals
    PubSub.publish('modals.dismiss', true);

    // save line always
    this.lineSave(i);

    // reset input
    var $input = $('.line[sequence="'+i+'"] input').first();
    this.fitInputReset($input);
  },

  onTranscriptLoad: function(transcript){ /* override me */ },

  onTimeUpdate: function(){ /* override me */ },

  parseTranscript: function(){
    var _this = this,
        lines = this.data.transcript.lines,
        user_edits = this.data.transcript.user_edits,
        line_statuses = this.data.transcript.transcript_line_statuses,
        speakers = this.data.transcript.speakers || [],
        superUserHiearchy = PROJECT.consensus.superUserHiearchy,
        user_role = this.data.transcript.user_role,
        user_flags = this.data.transcript.user_flags,
        maxLineTimeOverlapMs = PROJECT.maxLineTimeOverlapMs,
        allowTranscriptDownload = PROJECT.allowTranscriptDownload;

    // map edits for easy lookup
    var user_edits_map = _.object(_.map(user_edits, function(edit) {
      return [""+edit.transcript_line_id, edit.text]
    }));

    // map statuses for easy lookup
    var line_statuses_map = _.object(_.map(line_statuses, function(status) {
      return [""+status.id, status]
    }));

    // add multiple speaker option
    var speaker_options = _.map(speakers, _.clone);
    if (speakers.length > 1) {
      speaker_options.push({id: -1, name: "Multiple Speakers"});
    }
    this.data.transcript.speaker_options = speaker_options;

    // map speakers for easy lookup
    var speakers_map = _.object(_.map(speaker_options, function(speaker) {
      return [""+speaker.id, speaker]
    }));
    var speaker_ids = _.pluck(speaker_options, 'id');

    // map flags for easy lookup
    var user_flags_map = _.object(_.map(user_flags, function(flag) {
      return [""+flag.transcript_line_id, flag]
    }));

    // check to see if download is allowed
    this.data.transcript.can_download = allowTranscriptDownload && this.data.transcript.can_download;

    // process each line
    _.each(lines, function(line, i){
      // add user text to lines
      var user_text = "";
      if (_.has(user_edits_map, ""+line.id)) {
        user_text = user_edits_map[""+line.id];
      }
      _this.data.transcript.lines[i].user_text = user_text;

      // add statuses to lines
      var status = line_statuses[0];
      if (_.has(line_statuses_map, ""+line.transcript_line_status_id)) {
        status = line_statuses_map[""+line.transcript_line_status_id];
      }
      _this.data.transcript.lines[i].status = status;

      // determine display text; default to original
      var display_text = line.original_text;
      // show final text if final
      if (line.text && status.name=="completed") display_text = line.text;
      // otherwise, show user's text
      else if (user_text) display_text = user_text;
      // otherwise show guess text
      else if (PROJECT.consensus.lineDisplayMethod=="guess" && line.guess_text) display_text = line.guess_text;
      // set the display text
      _this.data.transcript.lines[i].display_text = display_text;

      // determine if text is editable
      var is_editable = true;
      // input is locked when reviewing/completed/flagged/archived
      if (_.contains(["reviewing","completed","flagged","archived"], status.name)) is_editable = false;
      // in review, but user submitted, so may edit
      if (status.name=="reviewing" && user_text) is_editable = true;
      // admins/mods can always edit
      if (user_role && user_role.hiearchy >= superUserHiearchy) is_editable = true;
      _this.data.transcript.lines[i].is_editable = is_editable;

      // determine if text is available
      var is_available = true;
      // input is available when not completed/archived
      if (_.contains(["completed","archived"], status.name)) is_available = false;
      _this.data.transcript.lines[i].is_available = is_available;

      // check for speaker
      var speaker = false;
      var speaker_pos = -1;
      if (_.has(speakers_map, ""+line.speaker_id)) {
        speaker = speakers_map[""+line.speaker_id];
        speaker_pos = speaker_ids.indexOf(speaker.id);
      }
      _this.data.transcript.lines[i].speaker = speaker;
      _this.data.transcript.lines[i].speaker_pos = speaker_pos;
      _this.data.transcript.lines[i].has_speakers = speakers.length > 1 ? true : false;

      // check for flag
      var user_flag = {flag_type_id: 0, text: ""};
      if (_.has(user_flags_map, ""+line.id)) {
        user_flag = user_flags_map[""+line.id];
      }
      _this.data.transcript.lines[i].user_flag = user_flag;

      // can user resolve a flag
      var can_resolve = false;
      if (user_role && user_role.hiearchy >= superUserHiearchy) can_resolve = true;
      _this.data.transcript.lines[i].can_resolve = can_resolve;

      // adjust timestamps overlap
      if (maxLineTimeOverlapMs >= 0 && i > 0) {
        var prevLine = _this.data.transcript.lines[i-1];
        var overlapMs = prevLine.end_time - line.start_time;
        // overlap is larger than threshold
        if (overlapMs > maxLineTimeOverlapMs) {
          // var adjustMs = Math.round((overlapMs - maxLineTimeOverlapMs) / 2);
          var paddingMs = 0;
          _this.data.transcript.lines[i-1].end_time = _this.data.transcript.lines[i].start_time + paddingMs;
          _this.data.transcript.lines[i].start_time = _this.data.transcript.lines[i].start_time - paddingMs;
        }
      }
    });

    // add data about lines that are being reviewed
    if (this.data.transcript.percent_reviewing > 0) this.data.transcript.hasLinesInReview = true;
    if (this.data.transcript.percent_completed > 0) this.data.transcript.hasLinesCompleted = true;
  },

  playerPause: function(options) {
    if (options === undefined) options = {};

    if (this.player.playing) {
      this.player.pause();
      this.message('Paused');
      this.playerState('paused');

      if (this.play_all && (options.trigger == 'end_of_line')) {
        this.lineNext();
      }
    }
  },

  playerPlay: function(ms){

    // set time if passed
    if (ms !== undefined) {
      this.player.currentTime = ms * 0.001;
    }

    if (!this.player.playing) {
      this.player.play();
    }
  },

  playerState: function(state) {
    if (this.state==state) return false;
    this.state = state;
    this.$el.attr('state', state);
    PubSub.publish('player.state.change', state);
  },

  playerToggle: function(){
    if (this.player.playing) {
      this.playerPause({trigger: 'manual'});

    } else {
      this.playerPlay();
    }
  },

  refresh: function(){
    this.current_line_i = -1;

    this.loadTranscript();
  },

  render: function(){
    this.$el.html(this.template(this.data));
    this.renderLines();
    this.loadUserProgress();
    var pageTitle = this.getPageTitle();
    if (!!pageTitle.length) {
      document.title = app.pageTitle(pageTitle);
    }
    // Reload social media.
    // window.app.social.init();
  },

  renderLines: function(){
    var $container = this.$el.find('#transcript-lines'),
        $lines = $('<div>');

    if (!$container.length) return false;
    $container.empty();

    var speakers = this.data.transcript.speaker_options;
    var transcript_id = this.data.transcript.id;
    var flag_types = this.data.transcript.flag_types;
    _.each(this.data.transcript.lines, function(line) {
      var lineView = new app.views.TranscriptLine({
        transcript_id: transcript_id,
        line: line,
        speakers: speakers,
        flag_types: flag_types
      });
      $lines.append(lineView.$el);
    });
    $container.append($lines);
  },

  start: function(){
    this.$('.start-play, .play-all').addClass('disabled');

    var selectLine = 0,
        lines = this.data.transcript.lines;

    // Find the first line that is editable
    $.each(lines, function(i, line){
      if (line.is_editable) {
        selectLine = i;
        return false;
      }
    });

    // when `Play All` always select from the first line
    if (this.play_all) {
      selectLine = 0;
    }
    this.lineSelect(selectLine);
  },

  playAll: function() {
    this.play_all = true;

    this.start();
  },

  submitEdit: function(data){
    var _this = this;
    this.message('Saving changes...');

    $.post(API_URL + "/transcript_edits.json", {transcript_edit: data}, function(resp) {
      _this.message('Changes saved.');
    });

    PubSub.publish('transcript.edit.submit', data);
  }

});

app.views.TranscriptDownload = app.views.Base.extend({

  id: "transcript-download",
  className: "modal-wrapper",

  template: _.template(TEMPLATES['transcript_download.ejs']),

  events: {
    "click .download": "download",
    "submit .download-form": "download",
    "change .formatOption": "selectFormat",
    "change .format-options input": "updateURL"
  },

  initialize: function(data){
    var _this = this;

    this.data = _.extend({}, data);
    this.data.active = false;
    this.data.transcript = false;

    this.base_url = API_URL + '/transcript_files/' + this.data.transcript_id;

    // check for transcript load
    PubSub.subscribe('transcript.load', function(ev, data) {
      _this.onTranscriptLoad(data.transcript);
    });
  },

  download: function(e){
    e && e.preventDefault();

    var url = this.$('#transcript-download-url').val();
    window.open(url);
  },

  onTranscriptLoad: function(transcript){
    this.data.transcript = transcript;
    this.render();
    this.updateURL();
  },

  render: function(){
    this.$el.html(this.template(this.data));
  },

  selectFormat: function(e){
    var $input = $(e.currentTarget),
        format = $input.val();

    this.$('.format-options').removeClass('active');
    this.$('.format-options[data-format="'+format+'"]').addClass('active');

    this.updateURL();
  },

  updateURL: function(e){
    var format = this.$('input:radio[name="format"]:checked').val();
    var options = this.$('.format-options.active input').serialize();
    var url = this.base_url + '.' + format;

    if (options.length) {
      url += "?" + options;
    }

    this.$('#transcript-download-url').val(url);
  }

});

app.views.TranscriptFacets = app.views.Base.extend({

  template: _.template(TEMPLATES['transcript_facets.ejs']),

  events: {
    "click .filter-by": "filterFromEl",
    "click .sort-by": "sortFromEl",
    "submit .search-form": "searchFromForm",
    "keyup .search-form input": "searchFromInput"
  },

  initialize: function(data){
    this.data = _.extend({
      disableSearch: false,
      disableSort: false
    }, data);

    this.initFacets();

    // turn sticky on
    $(window).trigger('sticky-on', ['#header']);
  },

  filter: function(name, value){
    PubSub.publish('transcripts.filter', {name: name, value: value});
  },

  filterFromEl: function(e){
    var $el = $(e.currentTarget);

    this.filter($el.attr('data-filter'), $el.attr('data-value'));
  },

  initFacets: function(){
    // set defaults
    var active_collection_id = Amplify.getConfig('homepage.search.sort_options.active_collection_id', 'ALL');
    var active_sort = Amplify.getConfig('homepage.search.sort_options.active_sort', 'id');
    var active_order = Amplify.getConfig('homepage.search.sort_options.active_order', 'asc');
    var active_keyword = Amplify.getConfig('homepage.search.sort_options.active_keyword', '');

    // check for query params
    if (this.data.queryParams) {
      var params = this.data.queryParams;
      if (params.sort_by) {
        active_sort = params.sort_by;
      }
      if (params.order) {
        active_order = params.order;
      }
      if (params.collection_id) {
        active_collection_id = params.collection_id;
      }
      if (params.keyword) {
        active_keyword = params.keyword;
      }
    }

    // Add an "all collections" options.
    if (this.data.collections.length) {
      var all_collections = {
        id: 'ALL',
        title: 'All Collections'
      };
      this.data.collections.unshift(all_collections);
      this.data.collections = _.map(this.data.collections, function(c){
        c.active = false;
        if (c.id == active_collection_id) c.active = true;
        return c;
      });
      this.data.active_collection = _.findWhere(this.data.collections, {active: true});
    }

    // set sort option
    this.data.sort_options = [
      {id: 'random_asc', name: 'random', order: 'asc', label: 'Random'},
      {id: 'title_asc', name: 'title', order: 'asc', label: 'Title (A to Z)'},
      {id: 'title_desc', name: 'title', order: 'desc', label: 'Title (Z to A)'},
      {id: 'completeness_desc', name: 'completeness', order: 'desc', label: 'Completeness (most to least)'},
      {id: 'completeness_asc', name: 'completeness', order: 'asc', label: 'Completeness (least to most)'},
      {id: 'duration_asc', name: 'duration', order: 'asc', label: 'Duration (short to long)'},
      {id: 'duration_desc', name: 'duration', order: 'desc', label: 'Duration (long to short)'},
      {id: 'collection_asc', name: 'collection_id', order: 'asc', label: 'Collection'}
    ];
    this.data.sort_options = _.map(this.data.sort_options, function(option){
      option.active = false;
      if (option.name == active_sort && option.order == active_order) option.active = true;
      return option;
    });
    this.data.active_sort = _.findWhere(this.data.sort_options, {active: true});

    // set keyword
    this.data.active_keyword = active_keyword;
  },

  render: function(){
    this.$el.html(this.template(
      this.sanitiseRenderData(this.data)
    ));
    return this;
  },

  /**
   * Remove HTML markup from collection descriptions before sending to facet template.
   */
  sanitiseRenderData: function(data) {
    data.collections = data.collections.map(function(collection) {
      if (collection.hasOwnProperty('description')) {
        collection.description = collection.description.replace(/<[^>]+>/g, '');
      }
      return collection;
    });
    return data;
  },

  search: function(keyword){
    PubSub.publish('transcripts.search', keyword);
  },

  searchFromForm: function(e){
    e.preventDefault();
    var $form = $(e.currentTarget),
        keyword = $form.find('input[name="keyword"]').val();

    keyword = keyword.trim().toLowerCase();

    this.search(keyword);
  },

  searchFromInput: function(e){
    var $input = $(e.currentTarget),
        keyword = $input.val();

    keyword = keyword.trim();

    // only submit if empty
    if (!keyword.length)
      this.search(keyword);
  },

  sortTranscripts: function(name, order){
    PubSub.publish('transcripts.sort', {name: name, order: order});
  },

  sortFromEl: function(e){
    var $el = $(e.currentTarget);

    this.sortTranscripts($el.attr('data-sort'), $el.attr('data-order'));
  }

});

app.views.TranscriptLineFlag = app.views.Base.extend({

  id: "transcript-line-flag",
  className: "modal-wrapper",

  template: _.template(TEMPLATES['transcript_line_flag.ejs']),

  events: {
    "click .option": "select",
    "click .submit": "submit",
    "click .toggle-play": "togglePlay",
    "click .view-flags": "viewFlags",
    "click .view-add-flag": "viewForm"
  },

  initialize: function(data){
    var _this = this;

    // for storing line data
    this.lines = {};

    this.data = _.extend({}, data);
    this.data.title = this.data.title || "Flag this transcript line";
    this.data.active = this.data.active || false;

    PubSub.subscribe('transcript.flags.load', function(ev, data) {
      _this.onLoad(data);
    });
  },

  onLoad: function(data){
    if (!this.lines[data.line.id]) {
      var line = _.extend({}, data.line);
      this.lines[data.line.id] = line;
    }
    this.data.transcript_id = data.transcript_id;
    this.data.flags = data.flags;
    this.data.flag_types = data.flag_types;
    this.data.line = this.lines[data.line.id];

    this.show();
  },

  render: function(){
    this.$el.html(this.template(this.data));
  },

  select: function(e){
    e.preventDefault();

    var $options = this.$('.option'),
        $option = $(e.currentTarget),
        type_id = parseInt($option.attr('type-id'));

    $options.not('[type-id="'+type_id+'"]').removeClass('active').attr('aria-checked', 'false');
    $option.toggleClass('active');

    // set selected flag type as active
    var flag_type_id = 0;
    if ($option.hasClass('active')) {
      $option.attr('aria-checked', 'true');
      flag_type_id = type_id;
    }
    this.data.line.user_flag.flag_type_id = flag_type_id;
  },

  show: function(){
    this.render();
    PubSub.publish('modal.invoke', this.id);
  },

  submit: function(e){
    e && e.preventDefault();
    var _this = this;

    this.data.line.user_flag.text = this.$('.input-text').val();
    this.lines[this.data.line.id] = _.extend({}, this.data.line);

    var data = {
      flag_type_id: this.data.line.user_flag.flag_type_id,
      text: this.data.line.user_flag.text,
      transcript_line_id: this.data.line.id,
      transcript_id: this.data.transcript_id
    };

    $.post(API_URL + "/flags.json", {flag: data}, function(resp) {
      _this.$('.message').addClass('active').html('<p>Thank you for flagging this line. We will be periodically reviewing and correcting flagged errors.</p>');
      setTimeout(function(){
        PubSub.publish('modals.dismiss', true);
      }, 3000)

    });
  },

  togglePlay: function(e){
    e && e.preventDefault();

    PubSub.publish('player.toggle-play', true);
  },

  viewFlags: function(e){
    e && e.preventDefault();

    this.$('footer .button, .flag-content').removeClass('active');
    this.$('.view-add-flag, #flag-index').addClass('active');
  },

  viewForm: function(e){
    e && e.preventDefault();

    this.$('footer .button, .flag-content').removeClass('active');
    this.$('.submit, .view-flags, #flag-add').addClass('active');
  }

});

app.views.TranscriptItem = app.views.Base.extend({

  template: _.template(TEMPLATES['transcript_item.ejs']),

  tagName: "a",
  className: "transcript-item",
  audioDelay: 500,

  events: {
    'mouseover .item-image': 'on',
    'mouseout .item-image': 'off'
  },

  initialize: function(data){
    this.data = _.extend({}, data);
    this.transcript = this.data.transcript;
    this.timeout = false;
    this.player = false;
    this.player_enabled = PROJECT.previewAudioOnHover;
    this.render();
    this.loadListeners();
  },

  audioInit: function(audio_urls){
    var _this = this;

    // build audio string
    var audio_string = '<audio preload>';
    _.each(audio_urls, function(url){
      var ext = url.substr(url.lastIndexOf('.') + 1),
          type = ext;
      if (ext == 'mp3') type = 'mpeg';
      audio_string += '<source src="'+url+'" type="audio/'+type+'">';
    });
    audio_string += '</audio>';

    // create audio object
    var $audio = $(audio_string);
    // attach to view so it gets destroyed when view gets destroyed
    this.$el.append($audio);
    this.player = $audio[0];

    // check for buffer time
    this.player.onwaiting = function(){
      _this.$el.addClass('buffering');
    };

    // check for time update
    this.player.ontimeupdate = function() {
      _this.$el.removeClass('buffering');
      if (_this.queue_pause) _this.audioPause();
    };
  },

  audioPause: function(){
    if (this.player) {
      this.player.pause();
    }
  },

  audioPlay: function(){
    if (!this.transcript.audio_urls.length) return false;

    PubSub.publish('player.playing', this.transcript.id);

    if (!this.player) {
      this.audioInit(this.transcript.audio_urls);
    }

    if (!this.player.playing && !this.queue_pause) {
      this.player.play();
    }
  },

  loadListeners: function(){
    var _this = this;

    // ensure only one player is playing at a time
    PubSub.subscribe('player.playing', function(e, id){
      if (_this.transcript.id != id) {
        _this.off();
      }
    });
  },

  off: function(e){
    if (!this.player_enabled) return false;

    this.queue_pause = true;
    if (this.timeout) clearTimeout(this.timeout);
    this.audioPause();
  },

  on: function(e){
    if (!this.player_enabled) return false;

    this.queue_pause = false;
    var _this = this;
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(function(){_this.audioPlay()}, this.audioDelay);
  },

  render: function(){
    var transcript = this.transcript;

    // build title
    var title = transcript.title;
    if (transcript.collection_title) title = transcript.collection_title + ': ' + title;
    this.$el.attr('title', title);
    this.$el.attr('role', 'listitem');
    this.$el.attr('href', transcript.path);
    this.$el.html(this.template(transcript));
    return this;
  }

});

app.views.TranscriptLine = app.views.Base.extend({

  template: _.template(TEMPLATES['transcript_line.ejs']),

  events: {
    "click": "select",
    "click .star": "star",
    "click .flag": "flag",
    "click .resolve": "resolve",
    "click .verify": "verify",
    "click .speaker-option": "selectSpeaker"
  },

  initialize: function(data){
    this.data = _.extend({}, data);
    this.line = this.data.line || {};
    this.edits = this.data.edits || [];
    this.speakers = this.data.speakers || [];
    this.flag_types = this.data.flag_types || [];
    this.flags = this.data.flags || [];
    this.flagsLoaded = false;
    this.render();
  },

  flag: function(e){
    if (e) {
      e.preventDefault();
      $(e.currentTarget).addClass('active');
    }
    var _this = this;

    this.select();

    if (!this.flagsLoaded) {
      this.flagsLoaded = true;

      this.loadFlags(function(){
        _this.flag();
      });
      return false;
    }

    PubSub.publish('transcript.flags.load', {
      flags: this.flags,
      line: this.line,
      flag_types: this.flag_types,
      transcript_id: this.data.transcript_id
    });

  },

  loadEdits: function(onSuccess){
    var _this = this;
    $.getJSON(API_URL + "/transcript_edits.json", {transcript_line_id: this.line.id}, function(data) {
      if (data.edits && data.edits.length) {
        _this.edits = _this.parseEdits(data.edits);
        onSuccess && onSuccess();
      }
    });
  },

  loadFlags: function(onSuccess){
    var _this = this;
    $.getJSON(API_URL + "/flags.json", {transcript_line_id: this.line.id}, function(data) {
      _this.flags = data.flags || [];
      onSuccess && onSuccess();
    });
  },

  parseEdits: function(_edits){
    var line = this.line,
        edits = [],
        texts = [];

    _.each(_edits, function(edit, i){
      if (!_.contains(texts, edit.text)) {
        if (line.user_text == edit.text) {
          edit.active = true;
        }
        texts.push(edit.text);
        edits.push(edit);
      }
    });

    return edits;
  },

  render: function(){
    this.$el.html(this.template(_.extend({},this.line,{speakers: this.speakers})));
  },

  resolve: function(e){
    if (e) {
      e.preventDefault();
      $(e.currentTarget).addClass('active');
    }

    $.post(API_URL + "/transcript_lines/"+this.line.id+"/resolve.json");
    this.$('.button.flag').removeClass('active');
  },

  select: function(e){
    e && e.preventDefault();
    PubSub.publish('transcript.line.select', this.line);

    // invoke verify task if reviewing
    if (e && !$(e.currentTarget).hasClass('verify') && this.line.status.name == 'reviewing' && !this.line.is_editable) {
      this.verify();
    }

  },

  selectSpeaker: function(e){
    e.preventDefault();

    var $option = $(e.currentTarget),
        speaker_id = parseInt($option.attr('data-id')),
        old_speaker_id = this.line.speaker_id;

    this.$('.speaker-option').removeClass('selected').attr('aria-checked', 'false');
    this.$('.speaker').removeClass('selected c0 c1 c2 c3 c4 c5 c6 c7');

    // didn't change, unselect
    if (speaker_id == old_speaker_id) {
      this.line.speaker_id = 0;

    // new speaker selection
    } else {
      var position = _.pluck(this.speakers, 'id').indexOf(speaker_id);
      this.line.speaker_id = speaker_id;
      $option.addClass('selected').attr('aria-checked', 'true');
      this.$('.speaker').addClass('selected c'+position);
    }

    var data = {transcript_id: this.data.transcript_id, transcript_line_id: this.line.id, speaker_id: this.line.speaker_id};

    // save speaker
    $.post(API_URL + "/transcript_speaker_edits.json", {transcript_speaker_edit: data}, function(resp) {
      // console.log('Changes saved.')
    });
  },

  star: function(e){
    e.preventDefault();
    $(e.currentTarget).toggleClass('active');
  },

  verify: function(e){
    e && e.preventDefault();
    this.select();

    var _this = this;

    if (!this.edits.length) {
      this.loadEdits(function(){
        _this.verify();
      });
      return false;
    }

    PubSub.publish('transcript.edits.load', {
      edits: this.edits,
      line: this.line
    });
  }

});

app.views.TranscriptUserProgress = app.views.Base.extend({

  template: _.template(TEMPLATES['transcript_user_progress.ejs']),

  el: '#transcript-user-progress',

  events: {
    'click .progress-toggle': 'toggle'
  },

  initialize: function(data){
    var _this = this;

    this.data = {};

    // create a copy with only necessary values
    this.lines = _.map(data.lines, function(line, i){
      return {
        index: i,
        id: line.id,
        sequence: line.sequence,
        edited: line.user_text.length > 0
      }
    });

    this.calculate();
    this.render();
    this.loadListeners();
  },

  calculate: function(){
    var available_lines = this.lines.length;
    var edited_lines = _.reduce(this.lines, function(memo, line){
      var add = line.edited ? 1 : 0;
      return memo + add;
    }, 0);

    this.data.lines_edited = edited_lines;
    this.data.percent_edited = 0;
    this.data.lines_available = 0;

    if (available_lines > 0) {
      this.data.percent_edited = UTIL.round(edited_lines/available_lines*100, 1);
      this.data.lines_available = available_lines;
    }
  },

  loadListeners: function(){
    var _this = this;

    PubSub.subscribe('transcript.edit.submit', function(ev, data) {
      _this.onLineEdit(data.transcript_line_id);
    });
  },

  onLineEdit: function(line_id){
    if (this.data.lines_available <= 0) return;

    var line = _.find(this.lines, function(line){ return line.id == line_id; });
    if (line && !line.edited) {
      this.lines[line.index].edited = true;
      this.calculate();
      this.render();
    }

    if (this.data.percent_edited >= 1) {
      PubSub.publish('transcript.finished', true);
    }
  },

  render: function(){
    if (this.data.lines_edited > 0) this.$el.addClass('active');
    this.$('.progress-content').html(this.template(this.data));
  },

  toggle: function(e){
    e.preventDefault();

    this.$el.toggleClass('minimized');
  }

});

app.views.TranscriptToolbar = app.views.Base.extend({

  template: _.template(TEMPLATES['transcript_toolbar.ejs']),

  initialize: function(data) {
    this.data = _.extend({}, data);

    this.loadControls();
    this.loadListeners();
    this.loadMenu();

    this.render();
  },

  loadControls: function() {
    var controls = this.data.controls || this.data.project.controls;
    this.data.controls = _.map(controls, _.clone);

    this.data.controls = _.map(this.data.controls, function(control){
      var key = control.key;
      // change brackets to spans
      if (key.indexOf('[') >= 0 && key.indexOf(']') >= 0) {
        control.key = control.key.replace(/\[/g, '<span title="'+control.keyLabel+'">').replace(/\]/g, '</span>');
      } else {
        control.key = '<span title="'+control.keyLabel+'">' + control.key + '</span>';
      }
      return control;
    });

    this.data.control_width_percent = 1.0 / this.data.controls.length * 100;
  },

  loadListeners: function() {
    var _this = this;

    // listen for player state change
    PubSub.subscribe('player.state.change', function(ev, state) {
      _this.$el.attr('state', state);
    });
  },

  loadMenu: function() {
    var menu = this.data.menu,
        menus = this.data.project.menus;

    this.data.menu = "";

    if (menu && menus[menu] && menus[menu].length) {
      var data = _.extend({}, this.data, {tagName: "div", menu_key: "transcript_edit"});
      var menuView = new app.views.Menu(data);
      this.data.menu = menuView.toString();
    }
  },

  render: function() {
    this.$el.html(this.template(this.data));
  }

});

app.views.TranscriptLineVerify = app.views.Base.extend({

  id: "transcript-line-verify",
  className: "modal-wrapper",

  template: _.template(TEMPLATES['transcript_line_verify.ejs']),

  events: {
    "click .option": "select",
    "click .submit": "submit",
    "click .none-correct": "noneCorrect",
    "click .toggle-play": "togglePlay"
  },

  initialize: function(data){
    var _this = this;

    this.data = _.extend({}, data);
    this.data.title = this.data.title || "Choose the best transcription";
    this.data.active = this.data.active || false;

    PubSub.subscribe('transcript.edits.load', function(ev, data) {
      _this.data.line = data.line;
      _this.showEdits(data.edits);
    });
  },

  noneCorrect: function(e){
    e.preventDefault();
    var _this = this,
        line = this.data.line;

    PubSub.publish('transcript.edit.delete', line);

    // make all edits inactive
    this.$el.find('.option').removeClass('active');
    this.data.edits = _.map(this.data.edits, function(edit){
      edit.active = false;
      return edit;
    });

    setTimeout(function(){
      _this.submit();
    }, 800);
  },

  render: function(){
    this.$el.html(this.template(this.data));
  },

  select: function(e){
    e.preventDefault();

    var line = this.data.line,
        $options = this.$el.find('.option'),
        $option = $(e.currentTarget),
        edit_id = parseInt($option.attr('edit-id'));

    $options.not('[edit-id="'+edit_id+'"]').removeClass('active').attr('aria-checked', 'false');
    $option.toggleClass('active');

    // set selected edit as active
    this.data.edits = _.map(this.data.edits, function(edit){
      edit.active = false;
      if (edit.id == edit_id && $option.hasClass('active')) {
        edit.active = true;
      }
      return edit;
    });

    // edit is selected
    if ($option.hasClass('active')) {
      $option.attr('aria-checked', 'true');
      PubSub.publish('transcript.line.verify', {line: line, text: $option.text()});

    // edit is deleted
    } else {
      PubSub.publish('transcript.edit.delete', line);
    }
  },

  showEdits: function(edits){
    this.data.edits = edits;
    this.render();
    PubSub.publish('modal.invoke', this.id);
  },

  submit: function(e){
    e && e.preventDefault();

    PubSub.publish('transcript.line.submit', true);
  },

  togglePlay: function(e){
    e && e.preventDefault();

    PubSub.publish('player.toggle-play', true);
  }

});

app.views.TranscriptEdit = app.views.Transcript.extend({

  template: _.template(TEMPLATES['transcript_edit.ejs']),

  events: {
    'click #conventions-link': 'showConventions'
  },

  initialize: function(data){

    this.data = data;

    this.loadTranscript();
    this.listenForAuth();
  },

  finished: function(){
    this.$('.transcript-finished').addClass('disabled');
    this.$('.show-when-finished').addClass('active');
    $(window).trigger('scroll-to', [$('#completion-content'), 100]);
  },

  showConventions: function(){
    this.$('.conventions-page').toggleClass( "active"  )
  },

  lineEditDelete: function(i){
    if (i < 0) return false;

    var $input = $('.line[sequence="'+i+'"] .text-input').first();
    if (!$input.length) return false;
    var line = this.data.transcript.lines[i];

    // display the original text
    $input.val(line.display_text);

    // update UI
    $input.attr('user-value', '');
    $input.closest('.line').removeClass('user-edited');

    // submit edit
    this.submitEdit({transcript_id: this.data.transcript.id, transcript_line_id: line.id, text: '', is_deleted: 1, is_new: false});
  },

  lineSave: function(i){
    if (i < 0) return false;

    var $input = $('.line[sequence="'+i+'"] .text-input').first();
    if (!$input.length) return false;

    var line = this.data.transcript.lines[i];
    var text = $input.val();
    var userText = $input.attr('user-value');

    // implicit save; save even when user has not edited original text
    // only save if line is editable
    if (text != userText && line.is_editable) {
      // Don't save if the user is in Play All mode and hasn't changed the text.
      if ((this.play_all) && (line.display_text == text)) {
        return;
      }

      var is_new = !$input.closest('.line').hasClass('user-edited');

      // update UI
      $input.attr('user-value', text);
      $input.closest('.line').addClass('user-edited');

      // submit edit
      this.submitEdit({transcript_id: this.data.transcript.id, transcript_line_id: line.id, text: text, is_deleted: 0, is_new: is_new});
    }
  },

  lineVerify: function(data){
    var line = data.line,
        text = data.text;

    var $input = $('.line[sequence="'+line.sequence+'"] .text-input').first();
    if (!$input.length) return false;
    var is_new = !$input.closest('.line').hasClass('user-edited');

    // update UI
    $input.val(text);
    $input.attr('user-value', text);
    $input.closest('.line').addClass('user-edited');

    // submit edit
    this.submitEdit({transcript_id: this.data.transcript.id, transcript_line_id: line.id, text: text, is_deleted: 0, is_new: is_new});
  },

  loadAnalytics: function(){
    this.$el.on('click', '.conventions-link', function(){
      ANALYTICS.event('transcript', 'invoke-conventions');
    });

    this.$el.on('click', '.tutorial-link', function(){
      ANALYTICS.event('transcript', 'invoke-tutorial');
    });
  },

  loadCompletionContent: function(){
    this.data.completion_content = '';

    if (this.data.project.pages['transcript_finished.md']) {
      var page = new app.views.Page(_.extend({}, {project: this.data.project, page_key: 'transcript_finished.md'}))
      this.data.completion_content = page.toString();
    }
  },

  loadConventions: function(){
    this.data.page_conventions = this.data.transcript.conventions
  },

  loadListeners: function(){
    var _this = this,
        controls = this.data.project.controls;

    // remove existing listeners
    // $('.control').off('click.transcript');
    // $(window).off('keydown.transcript');
    // PubSub.unsubscribe('transcript.line.select');
    // PubSub.unsubscribe('transcript.line.submit');
    // PubSub.unsubscribe('transcript.line.verify');
    // PubSub.unsubscribe('transcript.edit.delete');
    // this.$el.off('click.transcript', '.start-play');

    // add link listeners
    $('.control').on('click.transcript', function(e){
      e.preventDefault();
      var $el = $(this);

      _.each(controls, function(control){
        if ($el.hasClass(control.id)) {
          _this[control.action]();
        }
      });

    });

    // add keyboard listeners
    $(window).on('keydown.transcript', function(e){
      _.each(controls, function(control){
        var keycodes = [control.keyCode];
        if (control.keyCode.constructor === Array) keycodes = control.keyCode;
        if (keycodes.indexOf(e.keyCode)>=0 && (control.shift && e.shiftKey || !control.shift)) {
          e.preventDefault();
          _this[control.action] && _this[control.action]();
          return false;
        }
      });
    });

    // add line listeners
    PubSub.subscribe('transcript.line.select', function(ev, line) {
      _this.lineSelect(line.sequence);
    });
    PubSub.subscribe('transcript.line.submit', function(ev, data){
      _this.lineSubmit();
    });

    // add verify listener
    PubSub.subscribe('transcript.line.verify', function(ev, data) {
      _this.lineVerify(data);
    });

    // add edit delete listener
    PubSub.subscribe('transcript.edit.delete', function(ev, line) {
      _this.lineEditDelete(line.sequence);
    });

    // add transcript finished listener
    PubSub.subscribe('transcript.finished', function(ev) {
      _this.onTranscriptFinished();
    });

    // add player listener
    PubSub.subscribe('player.toggle-play', function(ev, data) {
      _this.lineToggle();
    });

    // add start listener
    this.$el.on('click.transcript', '.start-play', function(e){
      e.preventDefault();
      _this.start();
    });

    // add start listener
    this.$el.on('click.transcript', '.transcript-finished', function(e){
      e.preventDefault();
      _this.finished();
    });

    this.$el.on('click.transcript', '.play-all', function(e) {
      e.preventDefault();
      _this.playAll();
    });

    this.loadAnalytics();
  },

  loadPageContent: function(){
    this.data.page_content = '';

    if (this.data.project.pages['transcript_edit.md']) {
      var page = new app.views.Page(_.extend({}, {transcript: this.data.transcript, project: this.data.project, page_key: 'transcript_edit.md'}))
      this.data.page_content = page.toString();
    }
  },

  loadTutorial: function(){
    var _this = this,
        tutorial = this.data.project.modals['tutorial_edit'];

    // show the tutorial if it hasn't been seen yet or should always be seen
    if (tutorial && (tutorial.displayMethod=="always" || !$.cookie('tutorial_edit-tutorial'))) {
      PubSub.publish('modal.invoke', 'tutorial_edit');
      $.cookie('tutorial_edit-tutorial', 1);
    }
  },

  loadUserProgress: function(){
    var availableLines = _.filter(this.data.transcript.lines, function(line){ return line.is_available; });
    var userProgressView = new app.views.TranscriptUserProgress({lines: availableLines});
    this.$('#transcript-user-progress').append(userProgressView.$el);
  },

  onAudioLoad: function(){
    this.data.debug && console.log("Loaded audio files");

    this.render();
    this.$el.removeClass('loading');
    this.$('.start-play, .play-all').removeClass('disabled');
    this.loadListeners();
    this.message('Loaded transcript');
    if (!this.loaded) this.loaded = true;
    if (this.queue_start) this.start();
    this.queue_start = false;
    this.checkForStartTime();
  },

  onTranscriptFinished: function(){
    this.$('.completion-content').addClass('active');
  },

  onTranscriptLoad: function(transcript){
    this.data.debug && console.log("Transcript", transcript.toJSON());

    PubSub.publish('transcript.load', {
      transcript: transcript.toJSON(),
      action: 'edit',
      label: transcript.get('title')
    });

    this.data.transcript = transcript.toJSON();
    this.parseTranscript();
    this.loadPageContent();
    this.loadCompletionContent();
    this.loadConventions()
    this.loadAudio();
  },

  onTimeUpdate: function(){
    if (this.player.playing) this.playerState('playing');
    if (this.pause_at_time !== undefined && this.player.currentTime >= this.pause_at_time) {
      this.playerPause({trigger: 'end_of_line'});
    }
  },

  selectTextRange: function(increment){
    var $input = $('.line.active input').first();
    if (!$input.length) return false;

    var input = $input[0],
        text = input.value.replace(/\s{2,}/g, ' ').trim(),
        words = text.split(/\ +/),
        start = 0,
        end = 0;

    // remove multiple spaces
    if (text.length != input.value.length) {
      var cursorPos = $input.getInputSelection().start;
      $input.val(text);
      $input.setInputPosition(cursorPos);
    }

    // default to select where the cursor is
    var selection = $input.getInputSelection(),
        sub_text = text.substring(0, selection.start),
        sel_index = sub_text.split(/\ +/).length - 2;

    // text is selected
    if (selection.end > selection.start) {
      sel_index++;

    // no text selected
    } else {

      // moving left
      if (increment < 0) sel_index+=2;

      // if beginning of word
      if (selection.start <= 0 || text.charAt(selection.start-1)==' ') {
        if (increment < 0) sel_index--;

      // if end of word
      } else if (selection.start >= text.length-1 || text.charAt(selection.start)==' ') {
        if (increment > 0) sel_index++;
      }
    }

    // determine word selection
    sel_index += increment;
    if (sel_index >= words.length) {
      sel_index = 0;
    }
    if (sel_index < 0) {
      sel_index = words.length - 1;
    }

    // determine start/end of current word
    $.each(words, function(i, w){
      if (i==sel_index) {
        end = start + w.length;
        return false;
      }
      start += w.length + 1;
    });

    if (input.setSelectionRange){
      input.setSelectionRange(start, end);
    }
  },

  wordPrevious: function(){
    this.selectTextRange(-1);
  },

  wordNext: function(){
    this.selectTextRange(1);
  }

});

app.views.TranscriptsIndex = app.views.Base.extend({

  template: _.template(TEMPLATES['transcript_index.ejs']),
  template_list: _.template(TEMPLATES['transcript_list.ejs']),
  template_item: _.template(TEMPLATES['transcript_item.ejs']),

  className: 'transcripts-wrapper',

  events: {
    'click .list-next': 'nextPage'
  },

  initialize: function(data){
    this.data = data;
    this.render();

    this.$transcripts = this.$('#transcript-results');
    this.$facets = this.$('#transcript-facets');
    this.transcripts = [];

    // Allow config to specify default sort name and order.
    this.defaultSortName = null;
    this.defaultSortOrder = null;
    if (!!Amplify.getConfig('homepage.search.sort_options.active_sort')) {
      this.sortName = this.defaultSortName = Amplify.getConfig('homepage.search.sort_options.active_sort');
    }
    if (!!Amplify.getConfig('homepage.search.sort_options.active_order')) {
      this.sortOrder = this.defaultSortOrder = Amplify.getConfig('homepage.search.sort_options.active_order');
    }
    if (this.data.queryParams) {
      this.loadParams(this.data.queryParams);
    }
    this.loadTranscripts();
    this.loadCollections();
    this.loadListeners();
  },

  addList: function(transcripts) {
    this.transcripts = this.transcripts.concat(transcripts.toJSON());

    if (this.isFaceted()) {
      this.facet();
    }
    else {
      // Use default sort.
      if (!!this.defaultSortName) {
        this.transcripts = this.sortTranscripts(this.transcripts, this.defaultSortName, this.defaultSortOrder);
      }
      // Instead of using .toJSON on the original collectiom,
      // we send the sorted array.
      this.addListToUI(this.transcripts, transcripts.hasMorePages(), true, (transcripts.getPage() > 1));
    }
  },

  addListToUI: function(transcripts, has_more, append, scroll_to){
    var list = this.template_list({has_more: has_more});
    var $list = $(list);
    var $target = $list.first();

    if (append) {
      this.$transcripts.append($list);
    }
    else {
      this.$transcripts.empty();
      if (transcripts.length){
        this.$transcripts.html($list);
      }
      else {
        this.$transcripts.html('<p>No transcripts found!</p>');
      }
    }
    this.$transcripts.removeClass('loading');

    _.each(transcripts, function(transcript){
      var transcriptView = new app.views.TranscriptItem({transcript: transcript});
      $target.append(transcriptView.$el);
    });

    if (scroll_to) {
      $(window).trigger('scroll-to', [$list, 110]);
    }
  },

  facet: function(){
    // we have all the data, so just facet on the client
    if (this.collection.hasAllPages()) {
      this.facetOnClient();
    }
    // we don't have all the data, we must request from server
    else {
      this.facetOnServer();
    }
  },

  /**
   * Sorts transcripts according to a given field name and order.
   *
   * A random sort doesn't use a fieldname, just sorts randomly.
   *
   * @param array transcripts
   *   The array of transcripts.
   * @param string sortName
   *   The field name to sort on.
   * @param string sortOrder
   *   The sort ordering.
   *
   * @return array
   *   The sorted transcripts.
   */
  sortTranscripts: function(transcripts, sortName, sortOrder) {
    var sortedTranscripts = _.sortByNat(transcripts, function(transcript) {
      if (sortName == 'random') {
        return Math.floor(Math.random() * transcripts.length);
      }
      else {
        return transcript[sortName];
      }
    });
    if (sortOrder.toLowerCase() == 'desc') {
      sortedTranscripts = sortedTranscripts.reverse();
    }
    return sortedTranscripts;
  },

  facetOnClient: function(){
    var _this = this,
        filters = this.filters || {},
        keyword = this.searchKeyword || '',
        transcripts = _.map(this.transcripts, _.clone);

    // do the filters
    _.each(filters, function(value, key) {
      transcripts = _.filter(transcripts, function(transcript) {
        return !_.has(transcript, key) || transcript[key]==value;
      });
    });

    // do the searching
    if (keyword.length) {

      // Use Fuse for fuzzy searching
      var f = new Fuse(transcripts, { keys: ["title", "description"], threshold: 0.2 });

      // Combine the results of a string match and fuzzy search.
      transcripts = _.union(
        _.filter(transcripts, function(transcript) {
          return (
            transcript.title.toLowerCase().indexOf(keyword.toLowerCase()) >= 0 ||
            transcript.description.toLowerCase().indexOf(keyword.toLowerCase()) >= 0
          );
        }),
        f.search(keyword)
      );
    }

    // Do the sorting.
    if (this.sortName) {
      transcripts = this.sortTranscripts(transcripts, this.sortName, this.sortOrder);
    }

    this.renderTranscripts(transcripts);
  },

  facetOnServer: function() {
    // TODO: request from server if not all pages are present

    this.facetOnClient();
  },

  filterBy: function(name, value){
    this.filters = this.filters || {};
    this.filters[name] = value;
    // omit all filters with value "ALL"
    this.filters = _.omit(this.filters, function(value, key){ return value=='ALL'; });
    this.facet();
    this.updateUrlParams();
  },

  isFaceted: function() {
    return (
      this.filters ||
      (!!this.sortName && this.sortName != this.defaultSortName) ||
      (!!this.sortOrder && this.sortOrder != this.defaultSortOrder) ||
      this.searchKeyword
    );
  },

  loadCollections: function(){
    var _this = this;

    this.collections = this.collections || this.data.collections;

    this.collections.fetch({
      success: function(collection, response, options){
        _this.renderFacets(collection.toJSON());
      },
      error: function(collection, response, options){
        _this.renderFacets([]);
      }
    });
  },

  loadListeners: function(){
    var _this = this;

    PubSub.subscribe('transcripts.filter', function(ev, filter) {
      _this.filterBy(filter.name, filter.value);
    });

    PubSub.subscribe('transcripts.sort', function(ev, sort_option) {
      _this.sortBy(sort_option.name, sort_option.order);
    });

    PubSub.subscribe('transcripts.search', function(ev, keyword) {
      _this.search(keyword);
    });
  },

  loadParams: function(params){
    var _this = this;

    this.filters = this.filters || {};

    _.each(params, function(value, key){
      // sort name
      if (key == 'sort_by') {
        _this.sortName = value;
      }
      // sort order
      else if (key == 'order') {
        _this.sortOrder = value;
      }
      // keyword
      else if (key == 'keyword') {
        _this.searchKeyword = value;
      }
      // otherwise, assume it's a filter
      else {
        _this.filters[key] = value;
      }
    });
  },

  loadTranscripts: function(){
    var _this = this;

    this.$transcripts.addClass('loading');

    this.collection.fetch({
      success: function(collection, response, options) {
        _this.addList(collection);
      },
      error: function(collection, response, options) {
        $(window).trigger('alert', ['Whoops! We seem to have trouble loading our transcripts. Please try again by refreshing your browser or come back later!']);
      }
    });
  },

  nextPage: function(e){
    e.preventDefault();
    $(e.currentTarget).remove();
    this.collection.nextPage();
    this.loadTranscripts();
  },

  render: function(){
    this.$el.attr('role', 'main');
    this.$el.html(this.template(this.data));
    return this;
  },

  renderFacets: function(collections){
    this.facetsView = this.facetsView || new app.views.TranscriptFacets({collections: collections, queryParams: this.data.queryParams});
    this.$facets.html(this.facetsView.render().$el);
  },

  renderTranscripts: function(transcripts){
    this.addListToUI(transcripts, false, false, true);
  },

  search: function(keyword){
    this.searchKeyword = keyword;
    this.facet();
  },

  sortBy: function(name, order){
    this.sortName = name;
    this.sortOrder = order;
    this.facet();
    this.updateUrlParams();
  },

  updateUrlParams: function(){
    var data = {};
    // check for sorting
    if (this.sortName && this.sortOrder) {
      data.sort_by = this.sortName;
      data.order = this.sortOrder;
    }
    // check for filters
    if (this.filters) {
      _.each(this.filters, function(value, key){
        data[key] = value;
      });
    }
    // update URL if there's facet data
    if (_.keys(data).length > 0 && window.history) {
      var url = '/' + this.data.route.route + '?' + $.param(data);
      window.history.pushState(data, document.title, url);
    }
    else if (window.history) {
      var url = '/' + this.data.route.route;
      window.history.pushState(data, document.title, url);
    }
  }

});

