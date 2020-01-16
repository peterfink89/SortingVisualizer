/* All sorting algorithms */

/* Pushing values onto animations[] to change the color of 
/* the values within the array that are being either compared or swapped */


//
/* Merge Sort */
//
export function getMergeSortAnimations(array){
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
}

function mergeSortHelper( mainArray, startIdx, endIdx, auxiliaryArray, animations){
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge (mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations){
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx){
        animations.push([i, j]);
        animations.push([i, j]);
        if(auxiliaryArray[i] <= auxiliaryArray[j]){
            animations.push([k, auxiliaryArray[i]]);
            mainArray[k++] = auxiliaryArray[i++];
        }
        else{
            animations.push([k, auxiliaryArray[j]]);
            mainArray[k++] = auxiliaryArray[j++];
        }
    }
    while (i <= middleIdx){
        animations.push([i, i]);
        animations.push([i, i]);
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx){
        animations.push([j, j]);
        animations.push([j, j]);
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
    }
}
//
/* End Merge Sort */
//


//
/* Bubble Sort */
//
export function getBubbleSortAnimations(array){

    const animations = [];
    if (array.length <= 1) return array;

    let isSorted = false;
    let counter = 0;
    while (!isSorted){
        isSorted = true;
        for (let i = 0; i < array.length - 1 - counter; ++i){
            if (array[i] > array[i + 1]){
                animations.push([i, i+1]);
                animations.push([i, i+1]);
                animations.push([array[i], array[i+1]]);
                swap(i, i+1, array);
                isSorted = false;
            }
        }
        counter++;
    }
    return animations;
}
//
/* End Bubble Sort */
//


//
/* Quick Sort */
//
export function getQuickSortAnimations(array){
    const animations = [];
    if (array.ength <= 1) return array;

    quickSortHelper(array, 0, array.length - 1, animations);
    return animations;
}

function quickSortHelper(array, startIdx, endIdx, animations){
    if (startIdx >= endIdx) return;
    const pivotIdx = startIdx;
    let leftIdx = startIdx + 1;
    let rightIdx = endIdx;
    while (rightIdx >= leftIdx){
        if (array[leftIdx] > array[pivotIdx] && array[rightIdx] < array[pivotIdx]){
            animations.push([leftIdx, rightIdx]);
            animations.push([leftIdx, rightIdx]);
            animations.push([array[leftIdx], array[rightIdx]]);
            swap(leftIdx, rightIdx, array);
        }
        if (array[leftIdx] <= array[pivotIdx]) leftIdx++;
        if (array[rightIdx] >= array[pivotIdx]) rightIdx--;
    }
    animations.push([pivotIdx, rightIdx]);
    animations.push([pivotIdx, rightIdx]);
    animations.push([array[pivotIdx], array[rightIdx]]);
    swap(pivotIdx, rightIdx, array);
    const leftSubarrayIsSmaller = rightIdx - 1 - startIdx < endIdx - (rightIdx + 1);
    if(leftSubarrayIsSmaller){
        quickSortHelper(array, startIdx, rightIdx - 1, animations);
        quickSortHelper(array, rightIdx + 1, endIdx, animations);
    }
    else{
        quickSortHelper(array, rightIdx + 1, endIdx, animations);
        quickSortHelper(array, startIdx, rightIdx - 1, animations);
    }
}
//
/* End Quick Sort */
//


//
/* Heap Sort */
//
export function getHeapSortAnimations(array){
    const animations = [];
    buildMaxHeap(array, animations);
    for (let endIdx = array.length - 1; endIdx > 0; endIdx--){
        animations.push([0, endIdx]);
        animations.push([0, endIdx]);
        animations.push([array[0], array[endIdx]]);
        swap(0, endIdx, array);
        siftDown(0, endIdx - 1, array, animations);
    }
    return animations;
}

function buildMaxHeap(array, animations){
    const firstParentIdx = Math.floor((array.length - 2) / 2);
    for (let currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--){
        siftDown(currentIdx, array.length - 1, array, animations);
    }
}

function siftDown(currentIdx, endIdx, heap, animations){
    let childOneIdx = currentIdx * 2 + 1;
    while (childOneIdx <= endIdx){
        const childTwoIdx = currentIdx * 2 + 2 <= endIdx ? currentIdx * 2 + 2 : -1;
        let idxToSwap;
        if(childTwoIdx !== -1 && heap[childTwoIdx] > heap[childOneIdx]){
            idxToSwap = childTwoIdx;
        }
        else{
            idxToSwap = childOneIdx;
        }

        if (heap[idxToSwap] > heap[currentIdx]){
            animations.push([idxToSwap, currentIdx]);
            animations.push([idxToSwap, currentIdx]);
            animations.push([heap[idxToSwap], heap[currentIdx]]);
            swap(currentIdx, idxToSwap, heap);
            currentIdx = idxToSwap;
            childOneIdx = currentIdx * 2 + 1;
        }
        else{
            return;
        }
    }
}
//
/* End Heap Sort */
//


/* Swap used for various sorting algorithms */
function swap(i, j, array){
    const temp = array[j];
    array[j] = array[i];
    array[i] = temp;
}