let regionSelect=document.getElementById("region-select");
let productSelect=document.getElementById("product-select");
let tableWrapper=document.getElementById("table-wrapper");

regionSelect.onchange=function(){
    let data=getDataBySelect();
    tableWrapper.innerHTML=renderTable(data);
};

productSelect.onchange=function(){
    let data=getDataBySelect();
    tableWrapper.innerHTML=renderTable(data);
};

function getDataBySelect(){
    let selectValue=regionSelect.options[regionSelect.selectedIndex].value;
    let selectValue2="";
    if(productSelect.selectedIndex!==0){
        selectValue2=productSelect.options[productSelect.selectedIndex].value;
    }
    let arr=[];
    for(let i=0;i<sourceData.length;i++){
        if(selectValue2!=="")
        {
            if(sourceData[i].region===selectValue&&sourceData[i].product===selectValue2){
                arr.push(sourceData[i]);
            }
        }else{
            if(sourceData[i].region===selectValue){
                arr.push(sourceData[i])
            }
        }
    }
    return arr;
}
function renderTable(data) {
    let temp=``;
    if(data.length===0){
        return;
    }
    temp+=`<table border="1">`;
    temp+=`
      <thead>
          <tr>
              <td>商品</td>
              <td>地区</td>
              <td>1月</td>
              <td>2月</td>
              <td>3月</td>
              <td>4月</td>
              <td>5月</td>
              <td>6月</td>
              <td>7月</td>
              <td>8月</td>
              <td>9月</td>
              <td>10月</td>
              <td>11月</td>
              <td>12月</td>
          </tr>
      </thead>`;
    for(let i=0;i<data.length;i++){
        temp+=`<tr>`;
        for(let attr in data[i]){
            if(data[i][attr] instanceof Array){
                for(let j=0;j<data[i][attr].length;j++){
                    temp+=`<td>${data[i][attr][j]}</td>`
                }
            }else{
                temp+=`<td>${data[i][attr]}</td>`
            }
        }
        temp+=`</tr>`
    }
    temp+=`</table>`;
    return temp;
}