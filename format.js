/**
 * Created on 11/4/15.
 * @author rankun203
 */

var fs = require('fs');
var readline = require('readline');
var stream = require('stream');
var moment = require('moment');
var SRT = require('./srt/SRTnode');

var s1 = new SRT(1, '00:00:14,460', '00:00:20,170', 'SUGARfx Subtitles Pro is capable of displaying hundreds subtitles.');
var s2 = new SRT(1, '00:00:14,460', '00:00:20,170', 'SUGARfx Subtitles Pro is capable of displaying hundreds subtitles.');

console.log(s1.srt());
console.log(s2.srt());


var instream = fs.createReadStream('./data/test_sub.txt');
var outfile = fs.openSync('./data/test_sub_out.srt', 'w');
var regTime = /^\d.*/;
var regEnglish = /^[a-zA-Z].*/;
var regChinese = /^[^\w^\s].*/;

var rl = readline.createInterface({
  input: instream,
  terminal: false
});

// Find out if we are currently another subtitle
// If it's a time, only could be a new subtitle,
var subtitles = [];
var tin, tout, lang1, lang2;
var inc = 0;
function backupAndClearVars() {
  if (!tin) return;

  var txt = lang1 + '\n' + lang2;
  var srt = new SRT(inc, tin, tout, txt);
  subtitles.push(srt);

  fs.write(outfile, srt.srt() + '\n');

  inc++;
  tin = '00:00:01,000';
  tout = '00:00:01,000';
  lang1 = '';
  lang2 = '';
}
rl.on('line', function (line) {

  if (regTime.test(line)) {
    // 16:55-17:00
    backupAndClearVars();
    console.log('TIME: ', line);
    var _times = line.split('-');
    var _t1 = _times[0];
    var _t2 = _times[1];
    tin = moment(_t1, 'mm:ss').format('HH:mm:ss,SSS');
    tout = moment(_t2, 'mm:ss').format('HH:mm:ss,SSS');

  } else if (regEnglish.test(line)) {
    console.log('ENG', line);
    lang1 = line;
  } else if (regChinese.test(line)) {
    console.log('CHN', line);
    lang2 = line;
  }
});
rl.on('close', function () {
  backupAndClearVars();
});