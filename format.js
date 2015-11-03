/**
 * Created on 11/4/15.
 * @author rankun203
 */

var SRT = require('./srt/SRTnode');

var s1 = new SRT(1, '00:00:14,460', '00:00:20,170', 'SUGARfx Subtitles Pro is capable of displaying hundreds subtitles.');
var s2 = new SRT(1, '00:00:14,460', '00:00:20,170', 'SUGARfx Subtitles Pro is capable of displaying hundreds subtitles.');

console.log(s1.srt());
console.log(s2.srt());