var files = ['./js/caseA.js','https://cdn.bootcss.com/jquery/3.2.1/jquery.js','./js/caseB.js'];

files.forEach(function (item) {
    var eleScript = document.createElement('script');
    eleScript.async = false;// 不异步，同步
    eleScript.src = item;
    document.body.appendChild(eleScript);
});