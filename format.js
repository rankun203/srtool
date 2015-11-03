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


var instream = fs.createReadStream('./data/bilingual.txt');
var outfile = fs.openSync('./data/bilingual_out.txt', 'w');
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
  tin = null;
  tout = null;
  lang1 = null;
  lang2 = null;
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
    backupAndClearVars();
    tin = moment('00:01', 'mm:ss').format('HH:mm:ss,SSS');
    tout = moment('00:01', 'mm:ss').format('HH:mm:ss,SSS');

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