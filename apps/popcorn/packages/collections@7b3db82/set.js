"use strict";function Set(e,t,n,r){if(!(this instanceof Set))return new Set(e,t,n,r);t=t||Object.equals,n=n||Object.hash,r=r||Function.noop,this.contentEquals=t,this.contentHash=n,this.getDefault=r,this.order=new this.Order(undefined,t),this.store=new this.Store(undefined,function(e,n){return t(e.value,n.value)},function(e){return n(e.value)}),this.length=0,this.addEach(e)}var Shim=require("./shim"),List=require("./list"),FastSet=require("./fast-set"),GenericCollection=require("./generic-collection"),GenericSet=require("./generic-set"),PropertyChanges=require("./listen/property-changes"),RangeChanges=require("./listen/range-changes");module.exports=Set,Object.addEach(Set.prototype,GenericCollection.prototype),Object.addEach(Set.prototype,GenericSet.prototype),Object.addEach(Set.prototype,PropertyChanges.prototype),Object.addEach(Set.prototype,RangeChanges.prototype),Set.prototype.Order=List,Set.prototype.Store=FastSet,Set.prototype.constructClone=function(e){return new this.constructor(e,this.contentEquals,this.contentHash,this.getDefault)},Set.prototype.has=function(e){var t=new this.order.Node(e);return this.store.has(t)},Set.prototype.get=function(e){var t=new this.order.Node(e);return t=this.store.get(t),t?t.value:this.getDefault(e)},Set.prototype.add=function(e){var t=new this.order.Node(e);return this.store.has(t)?!1:(this.dispatchesRangeChanges&&this.dispatchBeforeRangeChange([e],[],0),this.order.add(e),t=this.order.head.prev,this.store.add(t),this.length++,this.dispatchesRangeChanges&&this.dispatchRangeChange([e],[],0),!0)},Set.prototype["delete"]=function(e){var t=new this.order.Node(e);if(this.store.has(t)){this.dispatchesRangeChanges&&this.dispatchBeforeRangeChange([],[e],0);var t=this.store.get(t);return this.store["delete"](t),t["delete"](),this.length--,this.dispatchesRangeChanges&&this.dispatchRangeChange([],[e],0),!0}return!1},Set.prototype.pop=function(){if(this.length){var e=this.order.head.prev.value;return this["delete"](e),e}},Set.prototype.shift=function(){if(this.length){var e=this.order.head.next.value;return this["delete"](e),e}},Set.prototype.one=function(){if(this.length>0)return this.store.one().value},Set.prototype.clear=function(){var e;this.dispatchesRangeChanges&&(e=this.toArray(),this.dispatchBeforeRangeChange([],e,0)),this.store.clear(),this.order.clear(),this.length=0,this.dispatchesRangeChanges&&this.dispatchRangeChange([],e,0)},Set.prototype.reduce=function(e,t){var n=arguments[2],r=this.order,i=0;return r.reduce(function(t,r){return e.call(n,t,r,i++,this)},t,this)},Set.prototype.reduceRight=function(e,t){var n=arguments[2],r=this.order,i=this.length-1;return r.reduceRight(function(t,r){return e.call(n,t,r,i--,this)},t,this)},Set.prototype.iterate=function(){return this.order.iterate()},Set.prototype.log=function(){var e=this.store;return e.log.apply(e,arguments)}