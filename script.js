let rowNumberSection = document.querySelector(".row-num-section");
let lastSelected;
let selectedCellSectionDiv = document.querySelector(".selected-cell-section")
let columnTagsSection = document.querySelector(".column-tags-section");
let formulaInputSection = document.querySelector(".formula-input-section");
let dataObj = {}
//for the formula bar to work
formulaInputSection.addEventListener("keypress",function(e){
    if(e.key=="Enter")
    {
        // no cell is selected
        if(!lastSelected) return;
        //taking the formula from the input
        let newFormula = e.currentTarget.value;
        let selectedCellAdd = lastSelected.getAttribute("cell-address");
        let selectedObj = dataObj[selectedCellAdd];
        //update formula
        selectedObj.formula = newFormula;
        let upstream = selectedObj.upstream;
        //remove yourself from the downstream of parents elems
        for(let i=0; i<upstream.length; i++)
        {
            removeFromDownstream(upstream[i],selectedCellAdd);
        }
        // clear upstream
        selectedObj.upstream=[];
        // adding new parent cells in upstream
        let cellAddInFormula = newFormula.split(" ")
        cellAddInFormula =  cellAddInFormula.filter(removeOperators);
        function removeOperators(elemInArr)
        {
            if(
                elemInArr != "+" &&
                elemInArr != "-" &&
                elemInArr != "*" &&
                elemInArr != "/" &&
                elemInArr != "(" &&
                elemInArr != ")" &&
                isNaN(elemInArr)
            ) {
                return elemInArr
            }
        }
        selectedObj.upstream=cellAddInFormula;
        //adding yourself to the downstream of parent cells
        console.log(cellAddInFormula)
        for(i=0; i<cellAddInFormula.length;i++)
        {
            addToDownStream(cellAddInFormula[i],selectedCellAdd)
        }
        // update your value and the values of elem in your downstream
        dataObj[selectedCellAdd] = selectedObj;
        updateValue(selectedCellAdd)
        e.currentTarget.value=''

    }
    
    
})


//rows
for(let i=1; i<=100; i++)
{
    let rowDiv = document.createElement("div");
    rowDiv.classList.add("row-number");
    rowDiv.innerText = i;
    rowNumberSection.append(rowDiv);
}

//columns 
for(let i=0; i<26; i++)
{
    let asciivalue = 65+i;
    let Character= String.fromCharCode(asciivalue);
    let columnDiv = document.createElement("div");
    columnDiv.classList.add("column-tag");
    columnDiv.innerText=Character;
    columnTagsSection.append(columnDiv);
}


let cellSec = document.querySelector(".cell-section");
cellSec.addEventListener("scroll",function(e){
    scrollfunc(e);
})
// cell creation
for(let i=1; i<=100; i++)
{
    let rowDiv=document.createElement("div");
    rowDiv.classList.add("row");
    for(let j=0; j<26;j++)
    {
        let asciivalue = 65+j;

        let Char = String.fromCharCode(asciivalue);

        let cellAddress = Char+i;
        let cellObj = {
            value:undefined,
            formula:undefined,
            downstream:[],
            upstream:[]
        }
        dataObj[cellAddress]=cellObj;
        let cellDiv = document.createElement("div");
        cellDiv.setAttribute("contentEditable",true);
        cellDiv.classList.add("cell");
        cellDiv.setAttribute("cell-address",cellAddress);
        
        //selected cell
        cellDiv.addEventListener("click",function(e){
            selectedCellfunc(e);
            
        })

        //input event case1:formula to direct value && case2: direct value 1 => direct value 2
        cellDiv.addEventListener("input",function(e){
            let currAddress = e.currentTarget.getAttribute("cell-address");
            //cell address
            let currCellObj = dataObj[currAddress];
            //change value of cell
            currCellObj.value=e.currentTarget.innerText;
            //clean up the formula
            currCellObj.formula=undefined;
            //remove self from parents downstream
            let currUpstream =currCellObj.upstream;
            for(let i = 0; i < currUpstream.length; i++)
            {
                removeFromDownstream(currUpstream[i],currAddress);
            }
            currCellObj.upstream=[];
            //update cells in current cells downstream
            let currDownstream = currCellObj.downstream;
            for (let i = 0; i < currDownstream.length; i++) {
                updateValue(currDownstream[i]);
              }
            // updation in main object i.e. dataObj
            dataObj[currAddress] = currCellObj
            console.log(dataObj[currAddress]);
            
        })
        rowDiv.append(cellDiv);
    }
    cellSec.append(rowDiv);
}

// dataObj["A1"].value = 20;
// dataObj["A1"].downstream=["B1"];
// dataObj["B1"].value = 40
// dataObj["B1"].formula="2 * A1";
// dataObj["B1"].upstream=["A1"];
// let a1cell = document.querySelector("[cell-address='A1']")
// let b1cell = document.querySelector("[cell-address='B1']")
// a1cell.innerText=20;
// b1cell.innerText=40;

//highlight of selected cell and display of cell address in selected cell section
function selectedCellfunc(e){
    if(lastSelected)
            {
                lastSelected.classList.remove("selected-cell");
            }
            lastSelected=e.currentTarget;
            e.currentTarget.classList.add("selected-cell");
            let currCellAddress = e.currentTarget.getAttribute("cell-address");
            selectedCellSectionDiv.innerText=currCellAddress;

}

// scroll all columns and rows indivisually
function scrollfunc(e)
{
columnTagsSection.style.transform=`translateX(-${e.currentTarget.scrollLeft}px)`;
rowNumberSection.style.transform=`translateY(-${e.currentTarget.scrollTop}px)`;
    
}

function removeFromDownstream(parent, child){
    let parentDownStreamArr = dataObj[parent].downstream;
    dataObj[parent].downstream= parentDownStreamArr.filter(remove);
    function remove(elemInArr)
    {
        return elemInArr!=child;
    }
    
}

function updateValue(cell)
{
    let currCell = document.querySelector(`[cell-address='${cell}']`)
    let currObj = dataObj[cell]
    let upstream  = currObj.upstream;
    let downstream  =currObj.downstream;
    let formula = currObj.formula;
    let cellValue={}
    for(let i = 0; i < upstream.length; i++)
    {
        cellValue[upstream[i]] = dataObj[upstream[i]].value;

    }
    for(key in cellValue){
        formula = formula.replace(key,cellValue[key]);
    }
    let newValue = eval(formula);
    currObj.value = newValue;
    dataObj[cell] = currObj;
    currCell.innerText = newValue;
    for(let i=0; i<downstream.length; i++)
    {
        updateValue(downstream[i]);
    }
    
}

function addToDownStream(parent,child)
{
    dataObj[parent].downstream.push(child);
}