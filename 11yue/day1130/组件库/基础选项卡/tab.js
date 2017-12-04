var eleSpans = document.getElementById('tab_hd').getElementsByTagName('span');
var eleDivs = document.getElementById('tab_bd').getElementsByTagName('div');

for(var i = 0;i < eleSpans.length; i++){
  (function(idx){
    eleSpans[idx].onmouseover = function(){
      for(var j = 0;j < eleDivs.length; j++){
        eleDivs[j].className = '';
      }
      eleDivs[idx].className = 'current';
      for(var k = 0;k < eleSpans.length; k++){
        eleSpans[k].className = '';
      }
      eleSpans[eleSpans.length-1].className = 'last';
      this.className += ' current';// 有空格，很重要，很重要，很重要
    };
  })(i);
}