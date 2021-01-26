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

// Sorting algorithms
// These each take in an array of values as a parameter.
// They return an array of animations of the form:
// [[cur : number | undefined, swap : number | undefined, highlight : number | undefined, switch : boolean, final : boolean], ...]
//      cur = the current indices the algorithm is looking at and storing.
//      swap = the index the algorithm will be swapping with.
//      highlight = an important index the algorithm is holding (current position for selection, pivot for quick).
//      switch = whether or not the values at current and swap should be swapped.
//      final = whether or not the value that was swapped is in its final sorted position.
// These animations can be used to simulate the sorting the array.
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