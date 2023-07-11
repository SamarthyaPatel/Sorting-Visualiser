let generate = document.getElementById("generate_Button");
let algorithm = document.getElementById("algorithms");
let board = document.getElementById("array_Board");
let sort = document.getElementById("sort");
let finish = document.getElementById("finish");
let bars = document.getElementById("bars");
let speed = document.getElementById("speed");
let speedLabel = document.getElementById("speedLabel");
let min = 1;
let max = 20;
let size = 30;
let unsorted_Array = new Array(size);
let MILLI_SECONDS = 200;

function random_Num(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function grenerate_Random_Array() {
    let array = new Array(size);
    for (let i = 0; i < size; i++) {
        array[i] = random_Num(min, max);
    }

    return array;
}

document.addEventListener("DOMContentLoaded", function() {
    unsorted_Array = grenerate_Random_Array();
    updateBars(unsorted_Array);
    speedDisplay();
    document.getElementById("finish").style.display = "none";
});

function updateBars(array) {
    for(let i = 0; i < array.length; i ++) {
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = array[i] * 10 + "px";
        bars.appendChild(bar);
        let data = document.createElement("div");
        data.classList.add("data");
        data.textContent = array[i];
        board.appendChild(data);
    }
}

generate.addEventListener("click", function() {
    unsorted_Array = grenerate_Random_Array();
    bars.innerHTML = "";
    board.innerHTML = "";
    updateBars(unsorted_Array);
});

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function bubble(array) {
    let bars = document.getElementsByClassName("bar");
    let board = document.getElementsByClassName("data");
    for(let i = 0; i < array.length; i ++) {
        for(let j = 0; j < array.length - i - 1; j ++) {
            
            if(array[j] > array[j+1]) {
                for(let k = 0; k < bars.length; k ++) {
                    if(k !== j && k !== j+1) {
                        bars[k].style.backgroundColor = "transparent";
                        board[k].style.backgroundColor = "transparent";
                    }
                }
                bars[j].style.backgroundColor = "lightblue";
                board[j].style.backgroundColor = "lightblue";
                bars[j+1].style.backgroundColor = "lightgreen";
                board[j+1].style.backgroundColor = "lightgreen";
                await sleep(MILLI_SECONDS / Number(speed.value));
                let temp = array[j];
                array[j] = array[j+1];
                array[j+1] =temp;
                bars[j].style.height = array[j] * 10 + "px";
                bars[j].style.backgroundColor = "lightgreen";
                board[j].textContent = array[j];
                board[j].style.backgroundColor = "lightgreen";
                bars[j+1].style.height = array[j + 1] * 10 + "px";
                bars[j+1].style.backgroundColor = "lightblue";
                board[j+1].textContent = array[j+1];
                board[j+1].style.backgroundColor = "lightblue";

                await sleep(MILLI_SECONDS / Number(speed.value));
            }
        }
        await sleep(MILLI_SECONDS / Number(speed.value));
    }

    return array;
}

async function selection(array) {
    let bars = document.getElementsByClassName("bar");
    let board = document.getElementsByClassName("data");
    for(let i = 0; i < array.length - 1; i ++) {
        let pointer = i;
        for(let j = i; j < array.length - 1; j ++) {
            if(array[pointer] > array[j+1]) pointer = j + 1;
        }
        for(let k = 0; k < bars.length; k ++) {
            if(k !== pointer) {
                bars[k].style.backgroundColor = "transparent";
                board[k].style.backgroundColor = "transparent";
            }
        }
        bars[i].style.backgroundColor = "lightblue";
        board[i].style.backgroundColor = "lightblue";
        bars[pointer].style.backgroundColor = "lightgreen";
        board[pointer].style.backgroundColor = "lightgreen";
        await sleep(MILLI_SECONDS / Number(speed.value));
        if(array[i] !== array[pointer]) {
            let temp = array[i];
            array[i] = array[pointer];
            array[pointer] = temp;

            bars[i].style.height = array[i] * 10 + "px";
            bars[i].style.backgroundColor = "lightgreen";
            board[i].textContent = array[i];
            board[i].style.backgroundColor = "lightgreen";
            bars[pointer].style.height = array[pointer] * 10 + "px";
            bars[pointer].style.backgroundColor = "lightblue";
            board[pointer].textContent = array[pointer];
            board[pointer].style.backgroundColor = "lightblue";
            
            await sleep(MILLI_SECONDS / Number(speed.value));
        }
        
    }

    return array;
}

function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
}
  
function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}
  
function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
        animations.push([i, j]);
        animations.push([i, j]);
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            animations.push([k, auxiliaryArray[i]]);
            mainArray[k++] = auxiliaryArray[i++];
        } else {
            animations.push([k, auxiliaryArray[j]]);
            mainArray[k++] = auxiliaryArray[j++];
        }
    }
    while (i <= middleIdx) {
        animations.push([i, i]);
        animations.push([i, i]);
        
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
        animations.push([j, j]);
        animations.push([j, j]);

        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
    }
}

async function mergeSort(array) {
    const animations = getMergeSortAnimations(array);
    
    for (let i = 0; i < animations.length; i++) {
      const bars = document.getElementsByClassName('bar');
      const board = document.getElementsByClassName('data');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        let barOne = animations[i][0];
        let barTwo = animations[i][1];
        const color = i % 3 === 0 ? "red" : "lightgreen";
        
        bars[barOne].style.backgroundColor = color;
        board[barOne].style.backgroundColor = color;
        bars[barTwo].style.backgroundColor = color;
        board[barTwo].style.backgroundColor = color;
        await sleep(MILLI_SECONDS / Number(speed.value));
      } else {
        let index = animations[i][0];
        let height = animations[i][1];
        bars[index].style.height = height * 10 + "px";
        board[index].textContent = height;
        await sleep(MILLI_SECONDS / Number(speed.value));
      }
    }
}

async function quickSort(arr, start, end) {
    if(start < end) {
        let pivot = await partition(arr, start, end);
        
        quickSort(arr, start, pivot-1);
        quickSort(arr, pivot + 1, end);
    } 
}
  
async function partition(array, start, end) {
    let bars = document.getElementsByClassName("bar"); 
    let board = document.getElementsByClassName("data");
    let pivot = end;
    let i = start - 1,
        j = start;
  
    while (j < pivot) {
      if (array[j] > array[pivot]) {
        j++;
      } else {
        i++;
        for(let k = 0; k < bars.length; k ++) {
            if(k !== j && k !== i) {
                bars[k].style.backgroundColor = "transparent";
                board[k].style.backgroundColor = "transparent";
            }
        }
        swap(array, j, i);
        bars[i].style.height = array[i] * 10 + "px";
        bars[i].style.backgroundColor = "lightgreen";
        board[i].textContent = array[i];
        board[i].style.backgroundColor = "lightgreen";
        bars[j].style.height = array[j] * 10 + "px";
        bars[j].style.backgroundColor = "lightgreen";
        board[j].textContent = array[j];
        board[j].style.backgroundColor = "lightgreen";

        await sleep(MILLI_SECONDS / Number(speed.value));
        j++;
      }
  
    }
    for(let k = 0; k < bars.length; k ++) {
        if(k !== pivot && k !== i) {
            bars[k].style.backgroundColor = "transparent";
            board[k].style.backgroundColor = "transparent";
        }
    }
    swap(array, i + 1, pivot);
    bars[i+1].style.height = array[i+1] * 10 + "px";
    bars[i+1].style.backgroundColor = "lightgreen";
    board[i+1].textContent = array[i+1];
    board[i+1].style.backgroundColor = "lightgreen";
    bars[pivot].style.height = array[pivot] * 10 + "px";
    bars[pivot].style.backgroundColor = "lightgreen";
    board[pivot].textContent = array[pivot];
    board[pivot].style.backgroundColor = "lightgreen";

    await sleep(MILLI_SECONDS / Number(speed.value));
    return i + 1;
}
  
function swap(arr, firstIndex, secondIndex) {
    let temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
}

function speedDisplay() {
    setInterval(()=> {
        if(Number(speed.value) % 1 == 0) {
            speedLabel.innerHTML = "Speed x" + Number(speed.value) + ".0";
        } else speedLabel.innerHTML = "Speed x" + Number(speed.value);
    }, 100);
}

sort.addEventListener("click", async function() {
    let sorted_Array;
    MILLI_SECONDS = 200;
    document.getElementById("generate_Button").disabled = true;
    generate.style.backgroundColor = "darkgrey";
    document.getElementById("finish").style.display = "flex";
    document.getElementById("finish").style.textAlign = "center";
    document.getElementById("sort").style.display = "none";
    switch(algorithm.value) {
        case "selection": sorted_Array = await selection(unsorted_Array); 
        break;

        case "merge": sorted_Array = await mergeSort(unsorted_Array);
        break;

        case "quick": sorted_Array = await quickSort(unsorted_Array, 0, unsorted_Array.length - 1);
        break;

        default: sorted_Array = await bubble(unsorted_Array);
    }
    document.getElementById("generate_Button").disabled = false;
    generate.style.backgroundColor = "transparent";
    document.getElementById("finish").style.display = "none";
    document.getElementById("sort").style.display = "flex";
    document.getElementById("sort").style.textAlign = "center";
    if(MILLI_SECONDS < 200) {
        speed.value = 1;
    }
})

finish.addEventListener("click", function() {
    speed.value = 3;
    MILLI_SECONDS /= 3*5;
})