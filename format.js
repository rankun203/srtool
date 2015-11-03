/**
 * Created on 11/4/15.
 * @author rankun203
 */

var fs = require('fs');
var readline = require('readline');
var stream = require('stream');
var SRT = require('./srt/SRTnode');

var s1 = new SRT(1, '00:00:14,460', '00:00:20,170', 'SUGARfx Subtitles Pro is capable of displaying hundreds subtitles.');
var s2 = new SRT(1, '00:00:14,460', '00:00:20,170', 'SUGARfx Subtitles Pro is capable of displaying hundreds subtitles.');

console.log(s1.srt());
console.log(s2.srt());


var instream = fs.createReadStream('./data/test_sub.txt');
var outfile = fs.openSync('./data/test_sub_out.txt', 'w');
var regTime = /^\d.*/;
var regEnglish = /^[a-zA-Z].*/;
var regChinese = /^[^\w^\s].*/;

var rl = readline.createInterface({
  input: instream,
  terminal: false
});

rl.on('line', function (line) {

  if (regTime.test(line))
    console.log('TIME: ', line);
  else if (regEnglish.test(line))
    console.log('ENG', line);
  else if (regChinese.test(line))
    console.log('CHN', line);

  fs.write(outfile, line + '\n');
});