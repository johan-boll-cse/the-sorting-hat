// Simple utility function for swapping array values at indices a and b
export function swap(a : number, b : number, arr : number[]) : void {
    if (a < 0 || b < 0 || a >= arr.length || b >= arr.length) {
        console.log("Swap out of bounds for (" + a + ", " + b + ") and array length " + arr.length);
        return;
    }
    let tmp = arr[a];
    arr[a] = arr[b];
    arr[b] = tmp;
}

/** Sorting algorithms
Each algorithm takes in an array of number values as a parameter.
They return a result that contains an array of animations for visualizing the sorting process,
and an array of counts for displaying the algorithms access to arrays.
Animations and Counts are guaranteed to be the same size and Counts[i] is related to the state of the array at Animations[i].

Animations are returned in the form:
[{cur : number | undefined, swap : number | undefined, highlight : number | undefined, switch : boolean, final : boolean}, ...]
    cur = the current indices the algorithm is looking at and storing.
    swap = the index the algorithm will be swapping with.
    highlight = an important index the algorithm is holding (current position for selection, pivot for quick).
    switch = whether or not the values at current and swap should be swapped.
    final = whether or not the value that was swapped is in its final sorted position.

Counts are returned in the form:
[{reads : number, writes : number}, ...]
    reads = the number of array reads performed in the algorithm so far.
    writes = the number of array writes performed in the algorithm so far.
**/
export function selectionSort(vals : number[]) : any {
    let arrayReads : number = 0;
    let arrayWrites : number = 0;
    let array = vals.slice();
    let animations : any[] = [];
    let counts : any[] = [];
    for (let i = 0; i < array.length; i++) {
        let minIndex = i;
        let minValue = array[i];
        arrayReads++;
        animations.push({cur: undefined, swap: undefined, highlight: i, switch : false, final: false})
        counts.push({reads: arrayReads, writes: arrayWrites})
        for (let j = i + 1; j < array.length; j++) {
            let swap : number | undefined = undefined;
            if (minIndex === i) {
                swap = undefined;
            } else {
                swap = minIndex;
            }
            animations.push({cur: j, swap: swap, highlight: i, switch : false, final: false})
            counts.push({reads: arrayReads, writes: arrayWrites})
            arrayReads++;
            if (array[j] < minValue) {
                animations.push({cur: undefined, swap: j, highlight: i, switch : false, final: false})
                counts.push({reads: arrayReads, writes: arrayWrites})
                minIndex = j;
                arrayReads++;
                minValue = array[j];
            }
        }
        if (minIndex !== i) {
            swap(i, minIndex, array);
            arrayReads += 2;
            arrayWrites += 2;
            animations.push({cur: i, swap: minIndex, highlight: undefined, switch : true, final: true})
            counts.push({reads: arrayReads, writes: arrayWrites})
        } else {
            animations.push({cur: i, swap: undefined, highlight: undefined, switch : false, final: true})
            counts.push({reads: arrayReads, writes: arrayWrites})
        }
    }
    return {animations: animations, counts: counts}
}

export function bubbleSort(vals: number[]) : any {
    let arrayReads : number = 0;
    let arrayWrites : number = 0;
    let array = vals.slice();
    let animations : any[] = [];
    let counts : any[] = [];
    for (let i = 0; i < array.length; i++) {
        for (let j = 1; j < array.length - i; j++) {
            arrayReads += 2;
            if (array[j - 1] > array[j]) {
                animations.push({cur: j - 1, swap: j, highlight: undefined, switch : true, final: false})
                arrayWrites += 2;
                arrayReads += 2;
                swap(j - 1, j, array);
                counts.push({reads: arrayReads, writes: arrayWrites})
            } else {
                animations.push({cur: j - 1, swap: undefined, highlight: j, switch : false, final: false})
                counts.push({reads: arrayReads, writes: arrayWrites})
            }
            if (j === array.length - i - 1) {
                animations.push({cur: j, swap: undefined, highlight: undefined, switch : false, final: true})
                counts.push({reads: arrayReads, writes: arrayWrites})
            }
        }
    }
    animations.push({cur: 0, swap: undefined, highlight: undefined, switch : false, final: true})
    counts.push({reads: arrayReads, writes: arrayWrites})
    return {animations: animations, counts: counts}
}

export function quickSort(vals: number[]) : any {
    let array = vals.slice();
    let animations : any[] = [];
    let counts : any[] = [];
    sort(array, 0, array.length - 1, animations, counts);
    return {animations: animations, counts: counts}
}

function partition(array : number[], lo : number, hi : number, animations : any[], counts : any[]) : number {
    let pivot = array[hi];
    let arrayReads = 1;
    let arrayWrites = 0;
    if (counts.length > 0) {
        arrayReads = counts[counts.length - 1]['reads'] + 1
        arrayWrites = counts[counts.length - 1]['writes']
    }
    let i = lo;
    for(let j = lo; j < hi; j++) {
        arrayReads++;
        animations.push({cur: j, swap: i, highlight: hi, switch : false, final: false})
        counts.push({reads: arrayReads, writes: arrayWrites});
        if (array[j] < pivot) {
            arrayReads += 2;
            arrayWrites += 2;
            swap(i, j, array);
            animations.push({cur: j, swap: i, highlight: hi, switch : true, final: false})
            counts.push({reads: arrayReads, writes: arrayWrites});
            i++;
        }
    }
    arrayReads += 2;
    arrayWrites += 2;
    swap(i, hi, array);
    animations.push({cur: hi, swap: i, highlight: hi, switch : true, final: false})
    counts.push({reads: arrayReads, writes: arrayWrites});
    return i;
}

function sort(array : number[], lo : number, hi : number, animations : any[], counts : any[]) {
    let arrayReads = 0;
    let arrayWrites = 0;
    if (counts.length > 0) {
        arrayReads = counts[counts.length - 1]['reads']
        arrayWrites = counts[counts.length - 1]['writes']
    }
    if (lo < hi) {
        let index = partition(array, lo, hi ,animations, counts);
        sort(array, lo, index - 1, animations, counts);
        sort(array, index + 1, hi, animations, counts);
    } else {
        if (hi >= 0 && hi < array.length) {
            animations.push({cur: hi, swap: undefined, highlight: undefined, switch : false, final: true})
            counts.push({reads: arrayReads, writes: arrayWrites});
        }
        if (lo < array.length && lo !== hi) {
            animations.push({cur: lo, swap: undefined, highlight: undefined, switch : false, final: true})
            counts.push({reads: arrayReads, writes: arrayWrites});
        }
        if (lo + 1 < array.length) {
            animations.push({cur: lo + 1, swap: undefined, highlight: undefined, switch : false, final: true})
            counts.push({reads: arrayReads, writes: arrayWrites});
        }
    }
}

/**
Merge sort will be unique because of the additional array storage needed.

Animations will be changed to contain:
[[arrIndex : number, leftIndex : number, leftMax : number, rightIndex : number, rightMax : number, leftInsert : boolean, final: boolean], ...]
    arrIndex = the current index the algorithm is swapping values into.
    leftIndex = the current index the algorithm is at for the left array.
    leftMax = the index of the end of the left array.
    rightIndex = the current index the algorithm is at for the right array.
    rightMax = the index of the end of the right array.
    leftSwap - true if the algorithm will insert the value at leftIndex into arrIndex, false if the algorithm will insert the value at rightIndex into arrIndex.
    final = whether or not the value that was swapped is in its final sorted position.

 Counts will be changed to contain:
 [{reads : number, writes : number, storage : number}, ...]
    reads = the number of array reads performed in the algorithm so far.
    writes = the number of array writes performed in the algorithm so far.
    storage = the total additional array storage used by the algorithm so far.
 **/

export function mergeSort(vals: number[]) : any {
    let array = vals.slice();
    let animations : any[] = [];
    let counts : any[] = [];
    divide(array, 0, array.length - 1, animations, counts);
    return {animations: animations, counts: counts}
}

function divide(arr: number[], start : number, end : number, animations : any[], counts : any[]) {
    if (end <= start) {
        return;
    }
    const mid = start + Math.floor((end - start) / 2);
    divide(arr, start, mid, animations, counts);
    divide(arr, mid + 1, end, animations, counts);
    merge(arr, start, mid, end, animations, counts);
}

function merge(arr : number[], start : number, mid : number, end : number, animations : any[], counts : any[]) : void {
    let arrayReads = 0;
    let arrayWrites = 0;
    let additionalStorage = 0;
    if (counts.length > 0) {
        arrayReads = counts[counts.length - 1]['reads']
        arrayWrites = counts[counts.length - 1]['writes']
        additionalStorage = counts[counts.length - 1]['storage']
    }
    const left = mid - start + 1;
    const right = end - mid;
    let leftArray : number[] = [];
    let rightArray : number[] = [];
    for (let i = 0; i < left; i++) {
        arrayReads++;
        arrayWrites++;
        additionalStorage++;
        leftArray[i] = arr[start + i];
    }
    for (let i = 0; i < right; i++) {
        arrayReads++;
        arrayWrites++;
        additionalStorage++;
        rightArray[i] = arr[mid + 1 + i];
    }

    let leftIndex = 0;
    let rightIndex = 0;
    let arrIndex = start;
    while ( leftIndex < left && rightIndex < right) {
        arrayReads += 3;
        arrayWrites++;
        if (leftArray[leftIndex] < rightArray[rightIndex]) {
            arr[arrIndex] = leftArray[leftIndex];
            animations.push({arrIndex: arrIndex, leftIndex: start + leftIndex, leftMax: mid, rightIndex: mid + 1 + rightIndex, rightMax: end, leftSwap: true, final: (end === arr.length - 1 && mid === Math.floor((arr.length - 1) / 2))});
            counts.push({reads: arrayReads, writes: arrayWrites, storage: additionalStorage});
            leftIndex++;
        } else {
            arr[arrIndex] = rightArray[rightIndex];
            animations.push({arrIndex: arrIndex, leftIndex: start + leftIndex, leftMax: mid, rightIndex: mid + 1 + rightIndex, rightMax: end, leftSwap: false, final: (end === arr.length - 1 && mid === Math.floor((arr.length - 1) / 2))});
            counts.push({reads: arrayReads, writes: arrayWrites, storage: additionalStorage});
            rightIndex++;
        }
        arrIndex++;
    }
    while (leftIndex < left) {
        arrayReads++;
        arrayWrites++;
        arr[arrIndex] = leftArray[leftIndex];
        animations.push({arrIndex: arrIndex, leftIndex: start + leftIndex, leftMax: mid, rightIndex: mid + 1 + rightIndex, rightMax: end, leftSwap: true, final: (end === arr.length - 1 && mid === Math.floor((arr.length - 1) / 2))});
        counts.push({reads: arrayReads, writes: arrayWrites, storage: additionalStorage});
        leftIndex++;
        arrIndex++;
    }
    while (rightIndex < right) {
        arrayReads++;
        arrayWrites++;
        arr[arrIndex] = rightArray[rightIndex];
        animations.push({arrIndex: arrIndex, leftIndex: start + leftIndex, leftMax: mid, rightIndex: mid + 1 + rightIndex, rightMax: end, leftSwap: false, final: (end === arr.length - 1 && mid === Math.floor((arr.length - 1) / 2))});
        counts.push({reads: arrayReads, writes: arrayWrites, storage: additionalStorage});
        rightIndex++;
        arrIndex++;
    }
}