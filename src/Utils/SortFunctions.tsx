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
These each take in an array of values as a parameter.
They return an array of animations of the form:
[[cur : number | undefined, swap : number | undefined, highlight : number | undefined, switch : boolean, final : boolean], ...]
      cur = the current indices the algorithm is looking at and storing.
      swap = the index the algorithm will be swapping with.
      highlight = an important index the algorithm is holding (current position for selection, pivot for quick).
      switch = whether or not the values at current and swap should be swapped.
      final = whether or not the value that was swapped is in its final sorted position.
 These animations can be used to simulate the sorting the array.
 **/
export function selectionSort(vals : number[]) : any[] {
    let array = vals.slice();
    let animations : any[] = [];
    for (let i = 0; i < array.length; i++) {
        let minIndex = i;
        let minValue = array[i];
        animations.push({cur: undefined, swap: undefined, highlight: i, switch : false, final: false})
        for (let j = i + 1; j < array.length; j++) {
            let swap : number | undefined = undefined;
            if (minIndex === i) {
                swap = undefined;
            } else {
                swap = minIndex;
            }
            animations.push({cur: j, swap: swap, highlight: i, switch : false, final: false})
            if (array[j] < minValue) {
                animations.push({cur: undefined, swap: j, highlight: i, switch : false, final: false})
                minIndex = j;
                minValue = array[j];
            }
        }
        if (minIndex !== i) {
            swap(i, minIndex, array);
            animations.push({cur: i, swap: minIndex, highlight: undefined, switch : true, final: true})
        } else {
            animations.push({cur: i, swap: undefined, highlight: undefined, switch : false, final: true})
        }
    }
    return animations;
}

export function bubbleSort(vals: number[]) : any[] {
    let array = vals.slice();
    let animations : any[] = [];
    for (let i = 0; i < array.length; i++) {
        for (let j = 1; j < array.length - i; j++) {
            if (array[j - 1] > array[j]) {
                animations.push({cur: j - 1, swap: j, highlight: undefined, switch : true, final: false})
                swap(j - 1, j, array);
            } else {
                animations.push({cur: j - 1, swap: undefined, highlight: j, switch : false, final: false})
            }
            if (j === array.length - i - 1) {
                animations.push({cur: j, swap: undefined, highlight: undefined, switch : false, final: true})
            }
        }
    }
    animations.push({cur: 0, swap: undefined, highlight: undefined, switch : false, final: true})
    return animations;

}

export function quickSort(vals: number[]) : any[] {
    let array = vals.slice();
    let animations : any[] = [];
    sort(array, 0, array.length - 1, animations);
    return animations;

}

function partition(array : number[], lo : number, hi : number, animations : any[]) : number {
    let pivot = array[hi];
    let i = lo;
    for(let j = lo; j < hi; j++) {
        animations.push({cur: j, swap: i, highlight: hi, switch : false, final: false})
        if (array[j] < pivot) {
            swap(i, j, array);
            animations.push({cur: j, swap: i, highlight: hi, switch : true, final: false})
            i++;
        }
    }
    swap(i, hi, array);
    animations.push({cur: hi, swap: i, highlight: hi, switch : true, final: false})
    return i;
}

function sort(array : number[], lo : number, hi : number, animations : any[]) {
    if (lo < hi) {
        let index = partition(array, lo, hi ,animations);
        sort(array, lo, index - 1, animations);
        sort(array, index + 1, hi, animations);
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
 **/

export function mergeSort(vals: number[]) : any[] {
    let array = vals.slice();
    let animations : any[] = [];
    divide(array, 0, array.length - 1, animations);
    return animations;
}

function divide(arr: number[], start : number, end : number, animations : any[]) {
    if (end <= start) {
        return;
    }
    const mid = start + Math.floor((end - start) / 2);
    divide(arr, start, mid, animations);
    divide(arr, mid + 1, end, animations);
    merge(arr, start, mid, end, animations);
}

function merge(arr : number[], start : number, mid : number, end : number, animations : any[]) : void {
    const left = mid - start + 1;
    const right = end - mid;
    let leftArray : number[] = [];
    let rightArray : number[] = [];

    for (let i = 0; i < left; i++) {
        leftArray[i] = arr[start + i];
    }
    for (let i = 0; i < right; i++) {
        rightArray[i] = arr[mid + 1 + i];
    }

    let leftIndex = 0;
    let rightIndex = 0;
    let arrIndex = start;
    while ( leftIndex < left && rightIndex < right) {
        if (leftArray[leftIndex] < rightArray[rightIndex]) {
            arr[arrIndex] = leftArray[leftIndex];
            animations.push({arrIndex: arrIndex, leftIndex: start + leftIndex, leftMax: mid, rightIndex: mid + 1 + rightIndex, rightMax: end, leftSwap: true, final: (end === arr.length - 1 && mid === Math.floor((arr.length - 1) / 2))});
            leftIndex++;
        } else {
            arr[arrIndex] = rightArray[rightIndex];
            animations.push({arrIndex: arrIndex, leftIndex: start + leftIndex, leftMax: mid, rightIndex: mid + 1 + rightIndex, rightMax: end, leftSwap: false, final: (end === arr.length - 1 && mid === Math.floor((arr.length - 1) / 2))});
            rightIndex++;
        }
        arrIndex++;
    }
    while (leftIndex < left) {
        arr[arrIndex] = leftArray[leftIndex];
        animations.push({arrIndex: arrIndex, leftIndex: start + leftIndex, leftMax: mid, rightIndex: mid + 1 + rightIndex, rightMax: end, leftSwap: true, final: (end === arr.length - 1 && mid === Math.floor((arr.length - 1) / 2))});
        leftIndex++;
        arrIndex++;
    }
    while (rightIndex < right) {
        arr[arrIndex] = rightArray[rightIndex];
        animations.push({arrIndex: arrIndex, leftIndex: start + leftIndex, leftMax: mid, rightIndex: mid + 1 + rightIndex, rightMax: end, leftSwap: false, final: (end === arr.length - 1 && mid === Math.floor((arr.length - 1) / 2))});
        rightIndex++;
        arrIndex++;
    }
}