/**
 * Created on 11/4/15.
 * @author rankun203
 */

function SRTnode(id, tin, tout, text) {
  this.id = id;
  this.tin = tin;
  this.tout = tout;
  this.text = text;
}

SRTnode.prototype.srt = function () {
  var srt = '';
  srt += this.id + '\n';
  srt += this.tin + ' --> ' + this.tout + '\n';
  srt += this.text + '\n';
  srt += '\n';
  return srt;
};

module.exports = SRTnode;