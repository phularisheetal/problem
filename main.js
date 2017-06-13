document.getElementById('button').addEventListener('click',getPages);

function createInputArrays(){ //creates array of queries and pages
  var input = document.getElementById('input').value.split('\n');
  var queries = [];
  var pages = [];
  input.forEach(function(item,key) {
    item.indexOf('P') == 0?pages.push(item.substring(item.indexOf('P')+2,item.length).split(' ')):
    queries.push(item.substring(item.indexOf('Q')+2,item.length).split(' '))
  });
  return {'queries':queries,'pages':pages}
}

function getPages() {
  var maxKeysNumber = document.getElementById('max-keys').value;
  var input = createInputArrays();
  var queries  = input.queries;
  var pages = input.pages;
  debugger
  for(var i =0;i < queries.length;i++) {
    var result =  getPagesObj(queries[i],pages,maxKeysNumber)
    var resultCont = document.getElementById('result');
    var textEle = document.createTextNode('Q'+(i+1)+':'+result)
    resultCont.appendChild(textEle);
    resultCont.appendChild(document.createElement("br"));
  }
}

function getPagesObj(q,pages,maxKeysNumber) {//finds the weight of each query and sorts them in descending order to get most relevant page
  var result = '';
  var arr =[];
  var obj = {};
    for(var i =0;i < q.length;i++) {
      for(var j =0; j < pages.length;j++){
        var index =  pages[j].indexOf(q[i]);
        obj['P'+(j+1)] = obj['P'+(j+1)] ?obj['P'+(j+1)]:null;
        if(index != -1) {
          obj['P'+(j+1)] += (maxKeysNumber-index)*(maxKeysNumber-i)
        }
      }
    }
  var arr = sortObject(obj);
  arr.forEach(function(item,key){
        result += item[0]+' ';
      })
    return result;
}


function sortObject(obj) {//converst obj to array and sorts and returns sorted arr
  var arr = [];
  for(var a in obj) {
    obj[a]?arr.push([a,obj[a]]):'';
  }
  arr.sort(function(a,b)  {
     return b[1]-a[1];
    })
  return arr;
}
