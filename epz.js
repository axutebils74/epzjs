var EPZ = (function(){
    var latin1 = { 338: 188, 339: 189, 352: 166, 353: 168, 376: 190, 381: 180, 382: 184, 8364: 164 }
    function recoverU8(str) {
        var bufView = new Uint8Array(str.length);
        for (var i = 0, strLen = str.length; i < strLen; i++) {
            var octet = str.charCodeAt(i);
            if (latin1.hasOwnProperty(octet)) octet = latin1[octet]
            bufView[i] = octet;
        }
        return bufView
    }
    var util = {
        decodeString:function(s){
            var  b = new Uint8Array(s.length);
            for (var i = 0; i < s.length; i++) b[i] = s.charCodeAt(i);
            return b
        },
        decodeBase64:function(s){
            return this.decodeString(atob(s));
        },
        requestSync:function(e,i,j){
            var xhr = new XMLHttpRequest();
            xhr.open("GET", e, false);
            if(i) xhr.setRequestHeader("Range","bytes="+i+"-"+(j-1))
            xhr.overrideMimeType('text/plain; charset=ISO-8859-15');
            xhr.send()
            return recoverU8(xhr.responseText)
        },
        decodeBlobAsync:function(b,fn){
            this.readFile(b,fn);
        },
        decodeBlob:function(b){
            return this.requestSync(b);
        },
        readFile:function(b,fn){
            var reader = new FileReader();
            reader.onload = function(e){
                fn(new Uint8Array(e.target.result))
            }
            reader.readAsArrayBuffer(b);
        },
        request:function(e,fn,i,j){
            var xhr = new XMLHttpRequest();
            xhr.open("GET", e, true);
            xhr.responseType="arraybuffer"
            xhr.setRequestHeader("Range","bytes="+(i||0)+"-"+(j-1))
            xhr.onload = function(){
                fn(new Uint8Array(xhr.response))
            }
            xhr.send()
        },
        toArr:function(u){
            for(var n=0,t=u.length,e=new Array(t);n<t;n++)e[n]=u[n];return e
        },
        toBlob:function(u){
            return  new Blob([u]);
        },
        toBase64:function(u){
            var i, len = u.length,s = new Array(len);
            for (i = 0; i < len; i++) s[i] = String.fromCharCode(u[i]);
            return btoa(s.join(''));
        },
        toArraybuffer:function(u){
            return new Uint8Array(u).buffer
        }
    }
    
    util.decodeLz4=function(){function r(r,i){var o=0|r[i++]<<0;return o|=r[i++]<<8,(o|=r[i++]<<16)|r[i++]<<24}e(5242880);try{new Uint32Array(65536)}catch(r){for(var i=Array(65536),o=0;65536>o;o++)i[o]=0}var a={4:65536,5:262144,6:1048576,7:4194304};function e(r){try{return new Uint8Array(r)}catch(a){for(var i=Array(r),o=0;o<r;o++)i[o]=0;return i}}return function(i,o){if(void 0===o)r:{var t=0;if(407708164!==r(i,t))throw Error;t+=4;var f=i[t++];if(64!=(192&f))throw Error;var n=0!=(16&f),v=i[t++]>>4&7;if(void 0===a[v])throw Error;if(v=a[v],0!=(8&f))n=0|i[t++]<<0,n|=i[t++]<<8,n|=i[t++]<<16,n|=i[t++]<<24,n|=i[t++]<<32,n|=i[t++]<<40,n|=i[t++]<<48,o=n|=i[t++]<<56;else for(t++,f=0;;){var c=r(i,t);if(t+=4,2147483648&c?f+=c&=2147483647:0<c&&(f+=v),0===c){o=f;break r}n&&(t+=4),t+=c}}n=t=e(o);var l=f=0;if(407708164!==r(i,f))throw Error;if(f+=4,64!=(192&(c=i[f++])))throw Error;v=0!=(16&c);var h=i[f++]>>4&7;if(void 0===a[h])throw Error;for(0!=(8&c)&&(f+=8),f++;c=r(i,f),f+=4,0!==c;)if(v&&(f+=4),0!=(2147483648&c))for(c&=2147483647,h=0;h<c;h++)n[l++]=i[f++];else{h=i;var s=n,d=f,m=l,u=void 0!==s.copyWithin&&void 0!==s.fill;for(l=d+c;d<l;){var y=h[d++],p=y>>4;if(0<p){if(15===p)for(;p+=h[d],255===h[d++];);for(p=d+p;d<p;)s[m++]=h[d++]}if(d>=l)break;if(p=15&y,y=h[d++]|h[d++]<<8,15===p)for(;p+=h[d],255===h[d++];);if(p+=4,u&&1===y)s.fill(0|s[m-1],m,m+p),m+=p;else if(u&&y>p&&31<p)s.copyWithin(m,m-y,m-y+p),m+=p;else for(p=(y=m-y)+p;y<p;)s[m++]=0|s[y++]}l=m,f+=c}if((n=l)!==o)if(f=0,Uint8Array.prototype.slice)t=t.slice(f,n);else{for(v=t.length,f=0>(f|=0)?Math.max(v+f,0):Math.min(f,v),n=0>(n=void 0===n?v:0|n)?Math.max(v+n,0):Math.min(n,v),v=new Uint8Array(n-f),c=0;f<n;)v[c++]=t[f++];t=v}return t}}();
    
    util.decodeLzma=function(){var t={A:function(){this.C=0}};return t.A.prototype.create=function(t){this.F&&this.C===t||(this.F=new Uint8Array(t)),this.C=t,this.ba=this.s=0},t.A.prototype.flush=function(){var t=this.s-this.ba;if(0!==t){if(this.u.qa)this.u.qa(this.F,t);else for(var i=0;i<t;i++)this.u.Na(this.F[i]);this.s>=this.C&&(this.s=0),this.ba=this.s}},t.A.prototype.R=function(){this.flush(),this.u=null},t.A.prototype.ca=function(t){this.R(),this.u=t},t.A.prototype.g=function(t){t||(this.s=this.ba=0)},t.A.prototype.ua=function(t,i){var s=this.s-t-1;for(0>s&&(s+=this.C);i--;)s>=this.C&&(s=0),this.F[this.s++]=this.F[s++],this.s>=this.C&&this.flush()},t.A.prototype.Ga=function(t){this.F[this.s++]=t,this.s>=this.C&&this.flush()},t.A.prototype.na=function(t){return 0>(t=this.s-t-1)&&(t+=this.C),this.F[t]},t.G=function(){},t.G.prototype.ca=function(t){this.u=t},t.G.prototype.R=function(){this.u=null},t.G.prototype.g=function(){var t=5;for(this.l=0,this.h=-1;t--;)this.l=this.l<<8|this.u.j()},t.G.prototype.wa=function(t){for(var i,s=0;t--;)this.h>>>=1,i=this.l-this.h>>>31,this.l-=this.h&i-1,s=s<<1|1-i,0==(4278190080&this.h)&&(this.l=this.l<<8|this.u.j(),this.h<<=8);return s},t.G.prototype.m=function(t,i){var s=t[i],h=(this.h>>>11)*s;return(2147483648^this.l)<(2147483648^h)?(this.h=h,t[i]+=2048-s>>>5,0==(4278190080&this.h)&&(this.l=this.l<<8|this.u.j(),this.h<<=8),0):(this.h-=h,this.l-=h,t[i]-=s>>>5,0==(4278190080&this.h)&&(this.l=this.l<<8|this.u.j(),this.h<<=8),1)},t.v=function(t,i){for(;i--;)t[i]=1024},t.o=function(t){this.Z=[],this.P=t},t.o.prototype.g=function(){t.v(this.Z,1<<this.P)},t.o.prototype.decode=function(t){for(var i=1,s=this.P;s--;)i=i<<1|t.m(this.Z,i);return i-(1<<this.P)},t.o.prototype.Ha=function(t){for(var i,s=1,h=0,o=0;o<this.P;++o)s=s<<1|(i=t.m(this.Z,s)),h|=i<<o;return h},t.Ia=function(t,i,s,h){for(var o,a=1,r=0,n=0;n<h;++n)a=a<<1|(o=s.m(t,i+a)),r|=o<<n;return r},t.I=function(){this.S=[],this.X=[],this.Y=[],this.da=new t.o(8),this.J=0},t.I.prototype.create=function(i){for(;this.J<i;++this.J)this.X[this.J]=new t.o(3),this.Y[this.J]=new t.o(3)},t.I.prototype.g=function(){var i=this.J;for(t.v(this.S,2);i--;)this.X[i].g(),this.Y[i].g();this.da.g()},t.I.prototype.decode=function(t,i){return 0===t.m(this.S,0)?this.X[i].decode(t):0===t.m(this.S,1)?8+this.Y[i].decode(t):16+this.da.decode(t)},t.L=function(){this.O=[]},t.L.prototype.g=function(){t.v(this.O,768)},t.L.prototype.ya=function(t){var i=1;do{i=i<<1|t.m(this.O,i)}while(256>i);return 255&i},t.L.prototype.za=function(t,i){var s=1;do{var h=i>>7&1;i<<=1;var o=t.m(this.O,(1+h<<8)+s);if(s=s<<1|o,h!==o){for(;256>s;)s=s<<1|t.m(this.O,s);break}}while(256>s);return 255&s},t.M=function(){},t.M.prototype.create=function(i,s){var h;if(!this.N||this.K!==s||this.$!==i)for(this.$=i,this.ra=(1<<i)-1,this.K=s,this.N=[],h=1<<this.K+this.$;h--;)this.N[h]=new t.L},t.M.prototype.g=function(){for(var t=1<<this.K+this.$;t--;)this.N[t].g()},t.M.prototype.Ca=function(t,i){return this.N[((t&this.ra)<<this.K)+((255&i)>>>8-this.K)]},t.D=function(){this.B=new t.A,this.i=new t.G,this.ea=[],this.ga=[],this.ha=[],this.ia=[],this.ja=[],this.fa=[],this.H=[],this.la=[],this.ka=new t.o(4),this.V=new t.I,this.aa=new t.I,this.W=new t.M,this.U=this.T=-1,this.H[0]=new t.o(6),this.H[1]=new t.o(6),this.H[2]=new t.o(6),this.H[3]=new t.o(6)},t.D.prototype.Ja=function(t){return!(0>t)&&(this.T!==t&&(this.T=t,this.U=Math.max(this.T,1),this.B.create(Math.max(this.U,4096))),!0)},t.D.prototype.Ka=function(t,i,s){var h=1<<s;return!(8<t||4<i||4<s)&&(this.W.create(i,t),this.V.create(h),this.aa.create(h),this.sa=h-1,!0)},t.D.prototype.La=function(t){if(!this.Ka(t.Da,t.Ea,t.Fa))throw Error;if(!this.Ja(t.Ba))throw Error},t.D.prototype.xa=function(t){if(13>t.size)return!1;var i=t.j(),s=i%9,h=(i=~~(i/9))%5;i=~~(i/5);var o=t.j();o|=t.j()<<8,o|=t.j()<<16,o+=16777216*t.j();var a=t.j();return a|=t.j()<<8,a|=t.j()<<16,a+=16777216*t.j(),t.j(),t.j(),t.j(),t.j(),{Da:s,Ea:h,Fa:i,Ba:o,Ma:a}},t.D.prototype.g=function(){var i=4;for(this.B.g(!1),t.v(this.ea,192),t.v(this.fa,192),t.v(this.ga,12),t.v(this.ha,12),t.v(this.ia,12),t.v(this.ja,12),t.v(this.la,114),this.W.g();i--;)this.H[i].g();this.V.g(),this.aa.g(),this.ka.g(),this.i.g()},t.D.prototype.va=function(i,s,h){var o=0,a=0,r=0,n=0,e=0,f=0,u=0;for(this.i.ca(i),this.B.ca(s),this.g();0>h||f<h;)if(i=f&this.sa,0===this.i.m(this.ea,(o<<4)+i))u=this.W.Ca(f++,u),u=7<=o?u.za(this.i,this.B.na(a)):u.ya(this.i),this.B.Ga(u),o=4>o?0:o-(10>o?3:6);else{if(1===this.i.m(this.ga,o))u=0,0===this.i.m(this.ha,o)?0===this.i.m(this.fa,(o<<4)+i)&&(o=7>o?9:11,u=1):(0===this.i.m(this.ia,o)?s=r:(0===this.i.m(this.ja,o)?s=n:(s=e,e=n),n=r),r=a,a=s),0===u&&(u=2+this.aa.decode(this.i,i),o=7>o?8:11);else if(e=n,n=r,r=a,u=2+this.V.decode(this.i,i),o=7>o?7:10,4<=(i=this.H[5>=u?u-2:3].decode(this.i))){if(a=(2|1&i)<<(s=(i>>1)-1),14>i)a+=t.Ia(this.la,a-i-1,this.i,s);else if(a+=this.i.wa(s-4)<<4,0>(a+=this.ka.Ha(this.i))){if(-1===a)break;return!1}}else a=i;if(a>=f||a>=this.U)return!1;this.B.ua(a,u),f+=u,u=this.B.na(0)}return this.B.flush(),this.B.R(),this.i.R(),!0},t.oa=function(t){this.ta=new Uint8Array(t),this.size=t.byteLength,this.offset=0},t.oa.prototype.j=function(){return this.ta[this.offset++]},t.pa=function(){this.size=0,this.ma=[]},t.pa.prototype.qa=function(t,i){this.ma.push(new Uint8Array(t.subarray(0,i))),this.size+=i},t.Aa=function(i){var s=new t.oa(i);i=new t.pa;var h=new t.D,o=h.xa(s),a=o.Ma;if(h.La(o),!h.va(s,i,a))throw Error;for(s=i.ma,i=new Uint8Array(i.size),o=h=0;h<s.length;h++)i.set(s[h],o),o+=s[h].length;return s.length=0,i},t.Aa}();
    
    util.decodeLzString=function(){var r={i:function(o){if(null==o)return r.g(o);for(var a=Array(o.length/2),t=0,n=a.length;t<n;t++)a[t]=256*o[2*t]+o[2*t+1];var e=[];return a.forEach(function(r){e.push(String.fromCharCode(r))}),r.g(e.join(""))},g:function(o){return null==o?"":""==o?null:r.h(o.length,32768,function(r){return o.charCodeAt(r)})},h:function(r,o,a){var t,n,e=[],h=4,f=4,u=3,i=[],c=a(0),l=o,s=1;for(t=0;3>t;t+=1)e[t]=t;var g=0,p=Math.pow(2,2);for(n=1;n!=p;){var C=c&l;0==(l>>=1)&&(l=o,c=a(s++)),g|=(0<C?1:0)*n,n<<=1}switch(g){case 0:for(g=0,p=Math.pow(2,8),n=1;n!=p;)C=c&l,0==(l>>=1)&&(l=o,c=a(s++)),g|=(0<C?1:0)*n,n<<=1;var w=String.fromCharCode(g);break;case 1:for(g=0,p=Math.pow(2,16),n=1;n!=p;)C=c&l,0==(l>>=1)&&(l=o,c=a(s++)),g|=(0<C?1:0)*n,n<<=1;w=String.fromCharCode(g);break;case 2:return""}for(t=e[3]=w,i.push(w);;){if(s>r)return"";for(g=0,p=Math.pow(2,u),n=1;n!=p;)C=c&l,0==(l>>=1)&&(l=o,c=a(s++)),g|=(0<C?1:0)*n,n<<=1;switch(w=g){case 0:for(g=0,p=Math.pow(2,8),n=1;n!=p;)C=c&l,0==(l>>=1)&&(l=o,c=a(s++)),g|=(0<C?1:0)*n,n<<=1;e[f++]=String.fromCharCode(g),w=f-1,h--;break;case 1:for(g=0,p=Math.pow(2,16),n=1;n!=p;)C=c&l,0==(l>>=1)&&(l=o,c=a(s++)),g|=(0<C?1:0)*n,n<<=1;e[f++]=String.fromCharCode(g),w=f-1,h--;break;case 2:return i.join("")}if(0==h&&(h=Math.pow(2,u),u++),e[w])w=e[w];else{if(w!==f)return null;w=t+t.charAt(0)}i.push(w),e[f++]=t+w.charAt(0),t=w,0==--h&&(h=Math.pow(2,u),u++)}}};return r.i}();
    
    if(typeof TextDecoder === "undefined"){
        util.decodeText = function(a){
            var i, s = new Array(a.length);
            for (i = 0; i < a.length; i++) s[i]=String.fromCharCode(a[i]);
            return decodeURIComponent(escape(s.join('')));
        } 
    }else{
        var decoder = new TextDecoder();
        util.decodeText = function(a){
            return decoder.decode(a);
        }
    }
    function EPZ(data,sync){
        this.sync = sync;
        this.isSync = function(fn){
            return this.sync == true || (this.sync == null && fn == null);
        }
        var type = Object.prototype.toString.call(data).slice(8,-1)
        if(type == "String"){
            var x = data.slice(0,4); // equal es6 startsWith
            if(x == "RVBa"){
                if((data[4] == "A" || data[4] == "P") && data.length >= 20){
                    this._uint8 = util.decodeBase64(x)
                }else{
                    this.url = data;
                }
            }else if(x == "data" && data[4] == ":"){
                var e = data.indexOf(",") + 1;
                this._uint8 = util.decodeBase64(data.slice(e));
            }else if(x == "EPZ>" || x == "EPZ\0" || x == "EPZ\x01" || x == "EPZ\x02"){
                this._uint8 = util.decodeString(x);
            }else{
                this.url = data;
            }
        }else if(type == "Array"){
            this._uint8 = new Uint8Array(data)
        }else if(type == "Blob"){
            this._blob = data;
        }else if(type == "ArrayBuffer"){
            this.buf = data;
        }else if(type == "Uint8Array"){
            this._uint8 = data; 
        }else{
            throw new Error("不支持的类型")
        }
        
    }
    EPZ.prototype.method = [function(e){return e},util.decodeLzma,util.decodeLz4,util.decodeLzString];
    EPZ.prototype.md = [util.toArr,util.decodeText,util.toBlob,util.toBase64,util.toArraybuffer];
    EPZ.prototype.init = function(fn){
        if(this._uint8) {
            this._read = function(a,b){
                return this._uint8.subarray(a,b);
            }
        }else if(this.buf){
            this._read = function(a,b){
                return new Uint8Array(this.buf,a,b-a);
            }
        }else if(this._blob){
            this._read = function(a,b){
                return util.decodeBlob(URL.createObjectURL(this._blob.slice(a,b)))
            }
            this._readAsync = function(a,b,fn){
                return util.decodeBlobAsync(this._blob.slice(a,b),fn)
            }
        }else if(this.url){
            this._read = function(a,b){
                return util.requestSync(this.url,a,b);
            }
            this._readAsync = function(a,b,fn){
                return util.request(this.url,fn,a,b)
            }
        }
        
        function genF(){
            this._md = function(x,n,fn){
                if(this.isSync(fn)){
                    return this.md[x](this.uint8(n))
                }else{
                   if(typeof fn === "function"){
                        this.uint8(n,function(d){fn(this.md[x](d))}.bind(this))
                   } 
                }
            }
            this._getFile = function(s){
                var f
                if(typeof s === "number"){ f =  this.arr[s] }else{f = this.obj[s]}
                if(f.refer){ f = this.arr[f.refer-1] }
                return f;
            }
            this.uint8 = function(n,fn){
                var f = this._getFile(n);
                if(this.isSync(fn)){
                    return this.method[f.method](this._read(f.l,f.u));
                }else{
                   typeof fn === "function" && this._readAsync(f.l,f.u,function(d){ 
                       fn(this.method[f.method](d))
                   }.bind(this))
                }
            }
            this.array = this._md.bind(this,0)
            this.text = this._md.bind(this,1)
            this.blob = this._md.bind(this,2)
            this.base64 = this._md.bind(this,3)
            this.arraybuffer = this._md.bind(this,4)
        }
        if(this._blob) {this.length = this._blob.size}
        if(this.url){
            this.getLength = function(fn){
                var xhr = new XMLHttpRequest()
                if(fn){
                    xhr.open("HEAD",this.url, true)
                    xhr.onload = function(){
                       fn(parseInt(xhr.getResponseHeader("Content-Length")))
                    }
                    xhr.send()
                }else{
                    xhr.open("HEAD",this.url, false)
                    xhr.send()
                    return parseInt(xhr.getResponseHeader("Content-Length"))
                }
            }
        }
        if(this._readAsync && !this.isSync(fn)){
            core.__async(this,function(){
                genF.call(this)
                if(typeof fn === "function") fn();
            }.bind(this))
        }else{
            if(this._uint8 || this.buf) { 
                this.length = (this._uint8 || this.buf).byteLength
                this._readAsync = function(i,j,fn){ return fn(this._read(i,j))}
            }
            core.__sync(this);
            genF.call(this);
            if(typeof fn === "function") fn();
        }
    }
    
    var core = {
        __prep:function(arr,prop){
            var r = new DataView(arr.buffer);
            var magic = r.getInt32(0);
            if(magic === 1162893886){
                prop.len = r.getUint32(4);
                prop.start = prop.len + 8
            }else if(magic === 1162893825){
                prop.h = 1;
                prop.len = r.getUint32(4);
                prop.start = prop.len + 8
            }else if(magic === 1162893826){
                prop.start = 4;
            }else if(magic === 1162893827){
                prop.h = 1;
                prop.start = 4;
            }else{
                throw new Error('不是EPZ格式');
            }
        },
        __resolve:function(n,prop,epz){
            if(prop.h){n = util.decodeLzma(n)}
            var i = 0;
            var c = prop.start;
            function readVLQ(){
                var r = 0, e;
                do {
                    e=n[i++];
                    r = (r << 7) | (e & 127);
                }while(e & 128);
                return r;
            }
            function readName(){
                var  j = i
                while(n[i++]){}
                return util.decodeText(n.subarray(j,i-1))
            }
            function readByte(){
                return n[i++];
            }
            var len = readVLQ()
            var arr = []
            var obj = {}
            for(var o=0;o<len;o++){
                var size =  readVLQ();
                var filename = readName();
                var compressmethod = readByte(); 
                arr.push(obj[filename] = {
                    l:c,
                    u:c+=size,
                    size:size,
                    filename:filename,
                    method:compressmethod
                })
            }
            var len = readVLQ()
            for(var o=0;o<len;o++){
                var refer =  readVLQ();
                var filename = readName();
                arr.push(obj[filename] = {
                    refer:refer,
                    filename:filename,
                })
            }
            epz.arr = arr;
            epz.obj = obj;
            epz._data = n;
        },
        __async:function(epz,fn){
            var prop = {};
            function h(i,j){
                epz._readAsync(i,j,function(n){
                    core.__resolve(n,prop,epz);
                    fn();
                })
            }
            epz._readAsync(0,8,function(d){
                core.__prep(d,prop);
                if(!prop.len){
                    function d(x){
                        epz.length = x;
                        epz._readAsync(epz.length-4,epz.length,function(a){
                            var r = new DataView(a.buffer);
                            prop.len = r.getUint32(0);
                            h(4,4 + prop.len);
                        })
                    }
                    if(!epz.length){ epz.getLength(d);} else(d())
                }else{
                    h(8,8+prop.len);
                }
            })
        },
        __sync:function(epz){
            var prop = {};
            this.__prep(epz._read(0,8),prop);
            var n;
            if(!prop.len){
                if(!epz.length){epz.length = epz.getLength()} 
                var r = new DataView(epz._read(epz.length-4,epz.length).buffer);
                prop.len = r.getUint32(0);
                n = epz._read(4,4 + prop.len);
            }else{
                n = epz._read(8,8+prop.len);
            }
            this.__resolve(n,prop,epz);
        }
    }
    return EPZ;
})()
