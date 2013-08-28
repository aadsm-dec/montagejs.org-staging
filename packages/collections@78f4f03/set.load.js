montageDefine("78f4f03","set",{dependencies:["./shim","./list","./fast-set","./generic-collection","./generic-set","./listen/property-changes","./listen/range-changes"],factory:function(e,t,n){"use strict";function s(e,t,n,a){return this instanceof s?(t=t||Object.equals,n=n||Object.hash,a=a||Function.noop,this.contentEquals=t,this.contentHash=n,this.getDefault=a,this.order=new this.Order(void 0,t),this.store=new this.Store(void 0,function(e,n){return t(e.value,n.value)},function(e){return n(e.value)}),this.length=0,this.addEach(e),void 0):new s(e,t,n,a)}e("./shim");var a=e("./list"),i=e("./fast-set"),r=e("./generic-collection"),o=e("./generic-set"),l=e("./listen/property-changes"),c=e("./listen/range-changes");n.exports=s,Object.addEach(s.prototype,r.prototype),Object.addEach(s.prototype,o.prototype),Object.addEach(s.prototype,l.prototype),Object.addEach(s.prototype,c.prototype),s.prototype.Order=a,s.prototype.Store=i,s.prototype.constructClone=function(e){return new this.constructor(e,this.contentEquals,this.contentHash,this.getDefault)},s.prototype.has=function(e){var t=new this.order.Node(e);return this.store.has(t)},s.prototype.get=function(e){var t=new this.order.Node(e);return t=this.store.get(t),t?t.value:this.getDefault(e)},s.prototype.add=function(e){var t=new this.order.Node(e);return this.store.has(t)?!1:(this.dispatchesRangeChanges&&this.dispatchBeforeRangeChange([e],[],0),this.order.add(e),t=this.order.head.prev,this.store.add(t),this.length++,this.dispatchesRangeChanges&&this.dispatchRangeChange([e],[],0),!0)},s.prototype["delete"]=function(e){var t=new this.order.Node(e);if(this.store.has(t)){this.dispatchesRangeChanges&&this.dispatchBeforeRangeChange([],[e],0);var t=this.store.get(t);return this.store["delete"](t),t["delete"](),this.length--,this.dispatchesRangeChanges&&this.dispatchRangeChange([],[e],0),!0}return!1},s.prototype.pop=function(){if(this.length){var e=this.order.head.prev.value;return this["delete"](e),e}},s.prototype.shift=function(){if(this.length){var e=this.order.head.next.value;return this["delete"](e),e}},s.prototype.one=function(){return this.length>0?this.store.one().value:void 0},s.prototype.clear=function(){var e;this.dispatchesRangeChanges&&(e=this.toArray(),this.dispatchBeforeRangeChange([],e,0)),this.store.clear(),this.order.clear(),this.length=0,this.dispatchesRangeChanges&&this.dispatchRangeChange([],e,0)},s.prototype.reduce=function(e,t){var n=arguments[2],s=this.order,a=0;return s.reduce(function(t,s){return e.call(n,t,s,a++,this)},t,this)},s.prototype.reduceRight=function(e,t){var n=arguments[2],s=this.order,a=this.length-1;return s.reduceRight(function(t,s){return e.call(n,t,s,a--,this)},t,this)},s.prototype.iterate=function(){return this.order.iterate()},s.prototype.log=function(){var e=this.store;return e.log.apply(e,arguments)}}});