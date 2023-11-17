//#region Heap
/**
 * @template TItem
 * @typedef {Object} HeapConstructorParams<TItem>
 * @property {(a: TItem, b: TItem) => boolean} isMorePriority
 * @property {TItem[]} [initialData]
 * @property {(node: TItem, index: number) => any} [onHeapIndexChange]
 */

/**
 * @template TItem
 */
class Heap {
  /**
   * @private
   * @type {(TItem | undefined)[]}
   */
  _nodes;

  /**
   * @private
   * @type {number}
   */
  _size;

  /** @type {boolean} */
  isEnabledTrackingIndex;

  /** @param {HeapConstructorParams<TItem>} param0 */
  constructor({ initialData, isMorePriority, onHeapIndexChange }) {
    /**
     * @private
     * @param {TItem | undefined} a
     * @param {TItem | undefined} b
     * @returns {boolean}
     */
    this._isMorePriority = (a, b) => {
      if (b == undefined) return true;
      if (a == undefined) return false;
      return isMorePriority(a, b);
    };

    /**
     * @private
     */
    this._onHeapIndexChange = onHeapIndexChange;

    /**
     * @private
     * @param {number} index
     * @param {TItem} node
     */
    this._setNodeAndTriggerChange = (index, node) => {
      if (index >= this._nodes.length) return;
      this._nodes[index] = node;

      if (this.isEnabledTrackingIndex) this._onHeapIndexChange?.(node, index);
    };

    this.isEnabledTrackingIndex = !!onHeapIndexChange;
    if (initialData?.length) this.build(initialData);
    else {
      this._nodes = [];
      this._size = 0;
    }
  }

  /**
   * @param {number} index
   */
  floatNode(index) {
    let parentIndex;
    let node = this._nodes[index];

    while ((index - 1) >> 1 >= 0) {
      parentIndex = (index - 1) >> 1;
      if (this._isMorePriority(this._nodes[parentIndex], node)) break;

      this._setNodeAndTriggerChange(index, this._nodes[parentIndex]);
      index = parentIndex;
    }
    this._setNodeAndTriggerChange(index, node);
  }

  /**
   * @param {number} index
   */
  sinkNode(index) {
    let childIndex;
    let node = this._nodes[index];

    while (index * 2 + 1 < this._nodes.length) {
      childIndex = index * 2 + 1;
      if (
        childIndex + 1 < this._nodes.length &&
        this._isMorePriority(
          this._nodes[childIndex + 1],
          this._nodes[childIndex]
        )
      )
        childIndex++;

      if (this._isMorePriority(node, this._nodes[childIndex])) break;

      this._setNodeAndTriggerChange(index, this._nodes[childIndex]);
      index = childIndex;
    }
    this._setNodeAndTriggerChange(index, node);
  }

  /**
   * Sink/Float node.
   * @param {number} index
   */
  adjustNode(index) {
    this.sinkNode(index);
    this.floatNode(index);
  }

  /**
   * @param {TItem[]} data
   */
  build(data) {
    const isEnabledTrackingIndex = this.isEnabledTrackingIndex;
    this.isEnabledTrackingIndex = false;

    this._nodes = [...data];
    this._size = data.length;
    const lastNonLeafIndex = (data.length - 2) >> 1;
    for (let i = lastNonLeafIndex; i >= 0; i--) {
      this.sinkNode(i);
    }

    if (isEnabledTrackingIndex) {
      this.isEnabledTrackingIndex = true;
      this._nodes.forEach((node, index) => {
        this._onHeapIndexChange?.(node, index);
      });
    }
  }

  /**
   * @param {...TItem} nodes
   */
  add(...nodes) {
    nodes.forEach((node) => {
      this._nodes.push(node);
      this._size++;
      this.floatNode(this._nodes.length - 1);
    });
  }

  pop() {
    if (this._nodes[0] == null) return null;

    const result = this._nodes[0];
    this._nodes[0] = null;
    this._size--;
    this.sinkNode(0);

    return result;
  }

  getSize() {
    return this._size;
  }

  getTop() {
    return this._nodes[0];
  }

  getSecond() {
    return this._isMorePriority(this._nodes[1], this._nodes[2])
      ? this._nodes[1]
      : this._nodes[2];
  }
}
//#endregion

const scoresCache = new Map();
const visited = new Map();

function genRandNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * @param {string} s
 */
function getState(s) {
  let state = 7;
  for (let i = 0; i < s.length; i++) {
    if (s[i - 1] == s[i] && s[i] == s[i + 1]) state += 8;

    let c = s.charCodeAt(i);
    if (c >= 48 && c <= 57) state &= ~1;
    if (c >= 65 && c <= 90) state &= ~2;
    if (c >= 97 && c <= 122) state &= ~4;
  }

  return state;
}

/**
 * @param {string} s
 */
function calcHeuristicScore(s) {
  // if (scoresCache.has(s)) return scoresCache.get(s);

  let res = 0;
  let l = s.length;
  if (l < 6) res += ((6 - l) * 2) ** 2;
  if (l > 20) res += ((l - 20) * 2) ** 2;

  let state = getState(s);
  res += state & ~7;

  res += state & 1;
  res += (state & 2) >> 1;
  res += (state & 4) >> 1;
  scoresCache.set(s, res);
  return res;
}

/**
 * @param {string} s
 * @returns {Set<string>}
 */
function nextStrings(s) {
  let cntNum = 0;
  let cntLow = 0;
  let cntUpp = 0;
  let n = s.length;
  let set = new Set();
  let res = new Set();

  for (let i = 0; i < n; i++) {
    let c = s.charCodeAt(i);
    if (c >= 48 && c <= 57) cntNum++;
    if (c >= 65 && c <= 90) cntUpp++;
    if (c >= 97 && c <= 122) cntLow++;
    set.add(c);
  }

  if (n < 6) {
    for (let i = 0; i < n; i++) {
      let cb = s.charCodeAt(i - 1);
      let ca = s.charCodeAt(i);

      if (!i || cb == ca) {
        let c;
        let sb = s.substring(0, i);
        let sa = s.substring(i);

        do c = genRandNumber(48, 57);
        while (cb == c || ca == c);
        res.add(sb + String.fromCharCode(c) + sa);

        do c = genRandNumber(65, 90);
        while (cb == c || ca == c);
        res.add(sb + String.fromCharCode(c) + sa);

        do c = genRandNumber(97, 122);
        while (cb == c || ca == c);
        res.add(sb + String.fromCharCode(c) + sa);
      }
    }
  } else if (n > 20) {
    for (let i = 0; i < n; i++) {
      if (s[i] == s[i - 1]) continue;
      let c = s.charCodeAt(i);
      if (c >= 48 && c <= 57 && cntNum < 2) continue;
      if (c >= 65 && c <= 90 && cntUpp < 2) continue;
      if (c >= 97 && c <= 122 && cntLow < 2) continue;

      let sb = s.substring(0, i);
      let sa = s.substring(i + 1);
      res.add(sa + sb);
    }
  }
  else {
    for (let i = 0; i < n; i++) {
      let cb = s.charCodeAt(i - 1);
      let ca = s.charCodeAt(i);

      if (!i || cb == ca) {
        let c;
        let sb = s.substring(0, i);
        let sa = s.substring(i + 1);
        let sa2 = s.substring(i);

        do c = genRandNumber(48, 57);
        while (cb == c || ca == c);
        res.add(sb + String.fromCharCode(c) + sa);
        if (n < 20) res.add(sb + String.fromCharCode(c) + sa2);

        do c = genRandNumber(65, 90);
        while (cb == c || ca == c);
        res.add(sb + String.fromCharCode(c) + sa);
        if (n < 20) res.add(sb + String.fromCharCode(c) + sa2);

        do c = genRandNumber(97, 122);
        while (cb == c || ca == c);
        res.add(sb + String.fromCharCode(c) + sa);
        if (n < 20) res.add(sb + String.fromCharCode(c) + sa2);
      }
    }
  }

  return res;
}

/**
 * @param {string} password
 * @return {number}
 */
var strongPasswordChecker = function (password) {
  if (scoresCache.size > 100000) scoresCache.clear();
  visited.clear();
  /** @type {Heap<string>} */
  let h = new Heap({
    isMorePriority: (a, b) => scoresCache.get(a) < scoresCache.get(b),
  });

  let score = calcHeuristicScore(password);
  if (!score) return 0;

  h.add(password);
  visited.set(password, 0);
  res = 1000;
  i = 10000;

  while ((i && h.getSize()) || (res == 1000)) {
    let u = h.pop();
    let vi = visited.get(u) + 1;
    if (vi >= res) continue;
    i--;

    let nexts = nextStrings(u);
    for (let v of nexts) {
      if (visited.has(v)) continue;
      score = calcHeuristicScore(v);
      if (!score) res = Math.min(res, vi)

      visited.set(v, vi);
      h.add(v);
    }
  }

  return res;
};


/////
var sumOfMultiples = function(n) {
    let arr = [];
    let sum = 0;
    for (let i = 1; i <= n; i++){
    if (i % 7 === 0 || i % 5 === 0 || i % 3 === 0)  
    sum += i; 
    }
 
    for (let c = 0; c < arr.length; c++){
       sum += arr[c];
    }
    return sum;
};




/////////////// Hash Map for two sum

var twoSum = function(nums, target) {
        let map = new Map();
    for (let c = 0; c < nums.length; c++){
        let compliment = target - nums[c];
        if (map.has(compliment)) {
            return [c, map.get(compliment)]
        } 
            map.set(nums[c], c);
        
    }
};
///////////

class EventEmitter {
    eventMap={}

	subscribe(eventName, callback) {
      	if (!this.eventMap.hasOwnProperty(eventName)){
              this.eventMap[eventName] = new Set();
          }
          this.eventMap[eventName].add(callback)
		return {
			unsubscribe: () => {
				this.eventMap[eventName].delete(callback)
			}
		};
	}
    
	emit(eventName, args = []) {
		const res = [];
        (this.eventMap[eventName] ?? [])
        .forEach((callback) => res.push(callback(...args)));
        return res
	}
}

/////////
704. Binary Search
var search = function(nums, target) {
    let left = 0 ; // = 0 not nums[0]
    let right = nums.length-1; // need to add -1
    // let medium;
    while (left <= right) {// need to add = to <
        let medium = left + Math.floor((right - left)/2); // need to add left
        if (nums[medium]===target) return medium;
        else if (nums[medium]<target) left = medium + 1;
        else right = medium - 1
        }
   return -1
}

217. Contains duplicate
    //Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.

var containsDuplicate = function(nums) {
    let set = new Set(nums);
    return set.size != nums.length; // set has property size not length
    // The not-equal-to operator ( != ) returns true if the operands don't have the same value; otherwise, it returns false
};

========================================================


860. Lemonade Change

var lemonadeChange = function(bills) {
    let fives = 0; // Number of $5 bills on hand
    let tens = 0;  // Number of $10 bills on hand
    
    for (let i = 0; i < bills.length; i++) {
        if (bills[i] === 5) {
            fives++; // Collecting $5, no change needed
        } else if (bills[i] === 10) {
            if (fives >= 1) {
                fives--; // Give $5 in change
                tens++;  // Collect $10
            } else {
                return false; // Cannot provide change
            }
        } else if (bills[i] === 20) {
            if (tens >= 1 && fives >= 1) {
                tens--;  // Give $10 in change
                fives--; // Give $5 in change
            } else if (fives >= 3) {
                fives -= 3; // Give three $5 bills in change
            } else {
                return false; // Cannot provide change
            }
        }
    }
    
    return true; // All customers received correct change
};



58. Length of Last Word
// It looks like nested loops but it is the same loop so it is O(n)
var lengthOfLastWord = function(s) {

    let lastWord = 0;
    for (let i = s.length-1; i >= 0; i--){
        if (s[i] !== " "){
            for (let j = i; j>=0; j--){
                if (s[j] !== " "){
                    lastWord++
                } else {
                    return lastWord
                }
            }
    return lastWord;
    }
}
};



// Given an integer array 'numbers', return the third distinct maximum number in the array. If the third distinct maximum doesn't exist, return the maximum.
///////////////

function findThirdMaximum(numbers) {
let newArray = []
  // set 
  let newSet = new Set(numbers)
//  console.log(newSet)
  let loopSet = newSet.forEach(i => newArray.push(i));
  // console.log(newArray);

  let sortNew = newArray.sort((a, b) => a -b);
  // console.log(sortNew);

  // sort 
  let newSort = newSet.sort;
  // console.log(newSort);
  // return 3rd from last

  let answer = sortNew[sortNew.length - 3];
  return answer

}

console.log(findThirdMaximum([
  1,3,4,7,2,5,3,-1,-4,6,7,8,9,11,11,-5,2313,12
]))


// depth of the tree - the longest path from root to leaf
// this question is recursive in nature

class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

function maxDepth(root) {
  if (root === null) {
    // check if nood exist, if it exist, it go ahead and execute below function if root === to null then it nothing to exicute and it will return 0;
    return 0; // it returns 0 back (nothing)
  }

  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);

  return Math.max(leftDepth, rightDepth) + 1; // +1 because it does not count root level node;;;;; it seems like it returning up values like 1 or 2
}

// Example usage:
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);

const depth = maxDepth(root);
console.log("Maximum depth of the tree:", depth); // Output: 3

let as = 12343;
let d = [];
function aap(jd) {
  let asb = jd.toString();
  let asz = asb.split("").map(Number);

  return asz;
}
console.log(aap(as));

// Pig Latin
function pigLatin(text) {
  let words = text.split(" ");
  let pigWords = words.map((word) => {
    let firstLetter = word[0];
    let restOfLetters = word.slice(1);
    return restOfLetters + firstLetter + "ay";
  });
  return pigWords.join(" ");
}
// !! split the original string into different words in order to map through
// map throug it while getting first charachter and rest of the word
// need return statement in map method
// extra return for const map and so far it is array of strings need use join
console.log(pigLatin("number five"));

// Write a function that takes a number and returns a list of its digits.
function numberIntoArray(number) {
  let str = number.toString();
  const num = str.split("").map(Number);

  return num;
}
// !!!! need to convert to srting and then apply split on it.
// map(Number) will convert into int from str, and need assign to variable. and !!!! chain it to split()
console.log(numberIntoArray(1245));

// Pairs of songs divisible by 60;
let time = [30, 20, 150, 100, 40];
function pairsOfSongsDivisibleBy60(time) {
  let count = 0;
  for (let i = 0; i < time.length; i++) {
    for (let j = 0; j < time.length; j++) {
      if ((time[i] + time[j]) % 60 === 0) count++;
    }
  }
  return count;
}
// we need to start for j = i + 1; not j = 0 because we need pair, otherwise it will do summation of same number
// console.log(pairsOfSongsDivisibleBy60(time));

// Given a string s, reverse the order of the words

function reverseWords(s) {
  return s.trim().split(" ").reverse().join(" ");
}
// console.log(reverseWords("  the sky is blue    "));

let arr1 = [1, 4, 6];
let arr2 = [2, 3, 5];

function twoSort() {
  let i = 0;
  let j = 0;
  let arr = [];

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      arr.push(arr1[i]);
      i++;
    } else {
      arr.push(arr2[j]);
      j++;
    }
  }

  while (i < arr1.length) {
    arr.push(arr1[i]);
    i++;
  }

  return arr;
}
// forgot to return at the end
// console.log(twoSort(arr1, arr2));

// Senior Fibonacci
function fibonacci(number) {
  let fibArr = [0, 1];

  for (let i = 2; i < number; i++) fibArr[i] = fibArr[i - 1] + fibArr[i - 2];

  return fibArr;

  // Big O for loop is O(n) - linear
  // Big O for nested loops is n^2
  // Big O for half loop is log n
}
// console.log(fibonacci(100));

// to find if word is pallindrome?

function isPalindrome(word) {
  return word === word.split("").reverse().join("");
}
// console.log(isPalindrome("kayak"));

function widthLength(area) {
  let width = Math.sqrt(area);
  let widthInt;
  let length;
  if (area % width === 0) {
    widthInt = width;
    length = area / widthInt;
  } else {
    while (area % width === 0) {
      width--;
      widthInt = width;
      length = area / widthInt;
    }
  }
  return [width, length];
  //   while (area % width === 0) {
  //     width--;
  //   }
}
