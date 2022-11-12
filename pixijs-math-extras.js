/*!
 * @pixi/math-extras - v6.5.8
 * Compiled Sun, 23 Oct 2022 23:01:45 UTC
 *
 * @pixi/math-extras is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
this.PIXI=this.PIXI||{};var _pixi_math_extras=function(t,i){"use strict";var n={add:function(t,n){return n||(n=new i.Point),n.x=this.x+t.x,n.y=this.y+t.y,n},subtract:function(t,n){return n||(n=new i.Point),n.x=this.x-t.x,n.y=this.y-t.y,n},multiply:function(t,n){return n||(n=new i.Point),n.x=this.x*t.x,n.y=this.y*t.y,n},multiplyScalar:function(t,n){return n||(n=new i.Point),n.x=this.x*t,n.y=this.y*t,n},dot:function(t){return this.x*t.x+this.y*t.y},cross:function(t){return this.x*t.y-this.y*t.x},normalize:function(t){t||(t=new i.Point);var n=Math.sqrt(this.x*this.x+this.y*this.y);return t.x=this.x/n,t.y=this.y/n,t},magnitude:function(){return Math.sqrt(this.x*this.x+this.y*this.y)},magnitudeSquared:function(){return this.x*this.x+this.y*this.y},project:function(t,n){n||(n=new i.Point);var h=(this.x*t.x+this.y*t.y)/(t.x*t.x+t.y*t.y);return n.x=t.x*h,n.y=t.y*h,n},reflect:function(t,n){n||(n=new i.Point);var h=this.x*t.x+this.y*t.y;return n.x=this.x-2*h*t.x,n.y=this.y-2*h*t.y,n}};function h(t,i,n){return void 0===n&&(n=Number.EPSILON),t===i||Math.abs(t-i)<n}function e(t,n,e,r,s,y){y||(y=new i.Point);var o=n.x-t.x,x=n.y-t.y,u=r.x-e.x,a=r.y-e.y,c=a*o-u*x;if(h(c,0))return y.x=NaN,y.y=NaN,y;var g=(u*(t.y-e.y)-a*(t.x-e.x))/c,f=(o*(t.y-e.y)-x*(t.x-e.x))/c;return!s&&(g<0||g>1||f<0||f>1)?(y.x=NaN,y.y=NaN,y):(y.x=t.x+g*o,y.y=e.y+f*a,y)}return Object.assign(i.Point.prototype,n),Object.assign(i.ObservablePoint.prototype,n),i.Rectangle.prototype.containsRect=function(t){return t.width<=0||t.height<=0?t.x>this.x&&t.y>this.y&&t.right<this.right&&t.bottom<this.bottom:t.x>=this.x&&t.y>=this.y&&t.right<=this.right&&t.bottom<=this.bottom},i.Rectangle.prototype.equals=function(t){return t===this||t&&this.x===t.x&&this.y===t.y&&this.width===t.width&&this.height===t.height},i.Rectangle.prototype.intersection=function(t,n){n||(n=new i.Rectangle);var h=this.x<t.x?t.x:this.x,e=this.right>t.right?t.right:this.right;if(e<=h)return n.x=n.y=n.width=n.height=0,n;var r=this.y<t.y?t.y:this.y,s=this.bottom>t.bottom?t.bottom:this.bottom;return s<=r?(n.x=n.y=n.width=n.height=0,n):(n.x=h,n.y=r,n.width=e-h,n.height=s-r,n)},i.Rectangle.prototype.union=function(t,n){n||(n=new i.Rectangle);var h=Math.min(this.x,t.x),e=Math.max(this.x+this.width,t.x+t.width),r=Math.min(this.y,t.y),s=Math.max(this.y+this.height,t.y+t.height);return n.x=h,n.y=r,n.width=e-h,n.height=s-r,n},t.floatEqual=h,t.lineIntersection=function(t,i,n,h,r){return e(t,i,n,h,!0,r)},t.segmentIntersection=function(t,i,n,h,r){return e(t,i,n,h,!1,r)},Object.defineProperty(t,"__esModule",{value:!0}),t}({},PIXI);
//# sourceMappingURL=math-extras.min.js.map