/**
 * Created on 11/4/15.
 * @author rankun203
 */

function SRTnode(id, tin, tout, txt) {
  this.id = id;
  this.tin = tin;
  this.tout = tout;
  this.txt = txt;
}

SRTnode.prototype.srt = function () {
  var srt = '';
  srt += this.id + '\n';
  srt += this.tin + ' --> ' + this.tout + '\n';
  srt += this.txt + '\n';
  return srt;
};

module.exports = SRTnode;