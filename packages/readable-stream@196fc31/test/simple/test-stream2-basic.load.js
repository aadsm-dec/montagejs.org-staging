montageDefine("196fc31","test/simple/test-stream2-basic",{dependencies:["../common.js","../../lib/_stream_readable","assert","util","events"],factory:function(e){function t(e){i.apply(this),this._buffer=new Buffer(e||100),this._buffer.fill("x"),this._pos=0,this._bufs=10}function n(){l.apply(this),this.received=[],this.flush=!1}function a(e,t){p++,c.push([e,t])}function s(){var e=c.shift();if(!e)return console.error("ok");var t=e[0],n=e[1];console.log("# %s",t),n({same:r.deepEqual,ok:r,equal:r.equal,end:function(){p--,s()}})}e("../common.js");var i=e("../../lib/_stream_readable"),r=e("assert"),o=e("util"),l=e("events").EventEmitter;o.inherits(t,i),t.prototype.read=function(e){if(0===e)return null;var t=this._buffer.length-this._pos;e=e||t,e=Math.max(e,0);var n=Math.min(e,t);if(0===n)return setTimeout(function(){this._pos=0,this._bufs-=1,0>=this._bufs?this.ended||(this.emit("end"),this.ended=!0):this.emit("readable")}.bind(this),10),null;var a=this._buffer.slice(this._pos,this._pos+n);return this._pos+=n,a},o.inherits(n,l),n.prototype.write=function(e){return this.received.push(""+e),this.emit("write",e),!0},n.prototype.end=function(e){e&&this.write(e),this.emit("end",this.received)};var c=[],p=0;process.on("exit",function(){r.equal(p,0)}),process.nextTick(s),a("a most basic test",function(e){function n(){for(var e;null!==(e=a.read(r++));)s.push(""+e);a.once("readable",n)}var a=new t(20),s=[],i=["x","xx","xxx","xxxx","xxxxx","xxxxx","xxxxxxxx","xxxxxxxxx","xxx","xxxxxxxxxxxx","xxxxxxxx","xxxxxxxxxxxxxxx","xxxxx","xxxxxxxxxxxxxxxxxx","xx","xxxxxxxxxxxxxxxxxxxx","xxxxxxxxxxxxxxxxxxxx","xxxxxxxxxxxxxxxxxxxx","xxxxxxxxxxxxxxxxxxxx","xxxxxxxxxxxxxxxxxxxx"];a.on("end",function(){e.same(s,i),e.end()});var r=1;n()}),a("pipe",function(e){var a=new t(5),s=["xxxxx","xxxxx","xxxxx","xxxxx","xxxxx","xxxxx","xxxxx","xxxxx","xxxxx","xxxxx"],i=new n;i.on("end",function(t){e.same(t,s),e.end()}),a.pipe(i)}),[1,2,3,4,5,6,7,8,9].forEach(function(e){a("unpipe",function(a){var s=new t(5),i=["xxxxx","xxxxx","xxxxx","xxxxx","xxxxx","xxxxx","xxxxx","xxxxx","xxxxx","xxxxx"];i=[i.slice(0,e),i.slice(e)];var r=[new n,new n],o=e;r[0].on("write",function(){0===--o&&(s.unpipe(),a.equal(s._readableState.pipes,null),r[0].end(),s.pipe(r[1]),a.equal(s._readableState.pipes,r[1]))});var l=0,c=!1,p=!1;r[0].on("end",function(e){a.equal(c,!1),c=!0,l++,a.same(e,i[0])}),r[1].on("end",function(e){a.equal(p,!1),p=!0,l++,a.equal(l,2),a.same(e,i[1]),a.end()}),s.pipe(r[0])})}),a("multipipe",function(e){var a=new t(5),s=[new n,new n],i=["xxxxx","xxxxx","xxxxx","xxxxx","xxxxx","xxxxx","xxxxx","xxxxx","xxxxx","xxxxx"],r=2;s[0].on("end",function(t){e.same(t,i,"first"),0===--r&&e.end()}),s[1].on("end",function(t){e.same(t,i,"second"),0===--r&&e.end()}),a.pipe(s[0]),a.pipe(s[1])}),[1,2,3,4,5,6,7,8,9].forEach(function(e){a("multi-unpipe",function(a){var s=new t(5),i=["xxxxx","xxxxx","xxxxx","xxxxx","xxxxx","xxxxx","xxxxx","xxxxx","xxxxx","xxxxx"];i=[i.slice(0,e),i.slice(e)];var r=[new n,new n,new n],o=e;r[0].on("write",function(){0===--o&&(s.unpipe(),r[0].end(),s.pipe(r[1]))});var l=0;r[0].on("end",function(e){l++,a.same(e,i[0])}),r[1].on("end",function(e){l++,a.equal(l,2),a.same(e,i[1]),a.end()}),s.pipe(r[0]),s.pipe(r[2])})}),a("back pressure respected",function(e){function t(){}var n=new i({objectMode:!0});n._read=t;var a=0;n.push(["one"]),n.push(["two"]),n.push(["three"]),n.push(["four"]),n.push(null);var s=new i;s.write=function(e){r.equal(e[0],"one"),s.emit("close"),process.nextTick(function(){n.pipe(l),n.pipe(c)})},s.end=t,n.pipe(s);var o=["two","two","three","three","four","four"],l=new i;l.write=function(e){return r.equal(e[0],o.shift()),r.equal(a,0),a++,"four"===e[0]?!0:(setTimeout(function(){a--,l.emit("drain")},10),!1)},l.end=t;var c=new i;c.write=function(e){return r.equal(e[0],o.shift()),r.equal(a,1),a++,"four"===e[0]?!0:(setTimeout(function(){a--,c.emit("drain")},50),!1)},c.end=function(){r.equal(a,2),r.equal(o.length,0),e.end()}}),a("read(0) for ended streams",function(e){var t=new i,n=!1,a=!1;t._read=function(){},t.push(new Buffer("foo")),t.push(null);var s=t.read(0);r.equal(s,null);var o=new i;o.write=function(e){n=!0,r.equal(a,!1),r.equal(""+e,"foo")},o.end=function(){a=!0,r.equal(n,!0),e.end()},t.pipe(o)}),a("sync _read ending",function(e){var t=new i,n=!1;t._read=function(){t.push(null)},t.once("end",function(){n=!0}),t.read(),process.nextTick(function(){r.equal(n,!0),e.end()})}),a("adding readable triggers data flow",function(e){var t=new i({highWaterMark:5}),n=!1,a=0;t._read=function(){2===a++?t.push(null):t.push(new Buffer("asdf"))},t.on("readable",function(){n=!0,t.read()}),t.on("end",function(){e.equal(a,3),e.ok(n),e.end()})})}});