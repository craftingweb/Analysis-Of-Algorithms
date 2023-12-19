
var squareFreeSubsets = function (nums) {
  const LEN = nums.length;
  const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];

  function getMask(num) {
    let mask = 0;
    for (let i = 0; i < 10; i++) {
      let samePrimeCount = 0;
      while (num % primes[i] === 0) {
        samePrimeCount += 1;
        num /= primes[i];
      }
      if (samePrimeCount > 1) return -1; // if a number is getting divided with a prime more than 1 time meaning it can be divided by that primes square
      if (samePrimeCount === 1) mask |= 1 << i; // i + 1 because the for i === 0 product 1 has already been taken
    }
    return mask;
  }

  function dfs(ind, runningMask, nums) {
    if (ind === LEN) return 0;
    if (dp[ind][runningMask] !== undefined) return dp[ind][runningMask];

    let mask = getMask(nums[ind]);
    let ans = dfs(ind + 1, runningMask, nums);

    if (mask !== -1 && (runningMask & mask) === 0) {
      ans++;
      ans = (ans + dfs(ind + 1, runningMask | mask, nums)) % mod;
    }
    dp[ind][runningMask] = ans;
    return ans;
  }

  let mod = 1e9 + 7;
  let dp = [];
  for (let i = 0; i < LEN; i++) dp[i] = [];

  return dfs(0, 0, nums); //
};
//
var totalSteps = function(nums) {
	let stack = [],
		dp = new Array(nums.length).fill(0),
		max = 0

	for (let i = nums.length - 1; i >= 0; i--) {
		while (stack.length > 0 && nums[i] > nums[stack[stack.length - 1]]) {
			dp[i] = Math.max(++dp[i], dp[stack.pop()])
			max = Math.max(dp[i], max)
		}
		stack.push(i)
	}
	return max
};
//
var minLengthAfterRemovals = function(nums) {
    // build priority queue
    let prev = null;
    let freq = 0;
    const queue = new MaxPriorityQueue();

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== prev) {
            if (freq > 0) {
                queue.enqueue(freq);
            }

            prev = nums[i];
            freq = 1;
        } else {
            freq++;
        }
    }
    queue.enqueue(freq);

    // remove values until we have something to remove
    let count = nums.length;
    while (queue.size() > 1) {
        let larger = queue.dequeue().element;
        let smaller = queue.dequeue().element;

        count -= 2;
        if (larger - 1 > 0) {
            queue.enqueue(larger - 1)
        }
        if (smaller - 1 > 0) {
            queue.enqueue(smaller - 1)
        }
    }
    
    return count;
};
//
var myAtoi = function(s) {
    let i = 0;
    while (i < s.length && s[i] === ' ') {
        i++;
    }

    let sign = 1;
    if (s[i] === '+' || s[i] === '-') {
        sign = s[i] === '-' ? -1 : 1;
        i++;
    }

    let result = 0;
    while (i < s.length && isDigit(s[i])) {
        result = result * 10 + parseInt(s[i]);
        i++;
    }

    result *= sign;

    const INT_MAX = 2 ** 31 - 1;
    const INT_MIN = -(2 ** 31);
    result = Math.max(INT_MIN, Math.min(INT_MAX, result));

    return result;
};

function isDigit(char) {
    return char >= '0' && char <= '9';
}
//
class TreeNode {
     constructor(val, left=null, right = null){
         this.val = val;
         this.left = left;
         this.right = right;
     }
 }
var deepestLeavesSum = function(root) {
    let maxDepth = -1;
    let sum = 0;
    const dfs = (node, depth) =>{
    if (!node) return;
        if (depth > maxDepth){
            maxDepth = depth;
            sum = node.val;
        } else if ( depth === maxDepth){
           sum += node.val;
        }
        dfs(node.left, depth + 1);
        dfs(node.right, depth + 1);
    }
    dfs(root, 0)
    return sum;
};
//
var subtractProductAndSum = function(n) {
let str = String(n)
  .split("")
  .map((n) => Number(n));
let muliplication = 1;
let summation = 0;
for (let i of str) {
  muliplication *= i;
  summation += i;
}
return muliplication - summation;
};
//
var invalidTransactions = function(transactions) {
    const n = transactions.length;
    const added = new Array(n).fill(false);
    const res = [];

    for (let i = 0; i < n; i++) {
        const [name1, time1, amount1, city1] = transactions[i].split(",");
        
        if (amount1 > 1000 && !added[i]) {
            res.push(transactions[i]);
            added[i] = true;
        }
        
        for (let j = i + 1; j < n; j++) {
            const [name2, time2, amount2, city2] = transactions[j].split(",");
            
            if (name1 === name2 && Math.abs(time1 - time2) <= 60 && city1 != city2) {
                if (!added[j]) {
                   res.push(transactions[j]);
                    added[j] = true;
                }
                
                if (!added[i]) {
                    res.push(transactions[i]);
                    added[i] = true;
                }
            }
        }
        
    }
    
    return res;
};
///
const ll = BigInt;

const subStrHash = (s, p, mod, k, hashValue) => {
    p = ll(p), mod = ll(mod);
    let n = s.length, idx = n, sum = 0n, powerTok = 1n;
    for (let i = 0; i < k - 1; i++) powerTok = powerTok * p % mod;
    for (let i = n - 1; i >= 0; i--) {
        let startVal = s[i].charCodeAt() - 96;
        sum = (sum * p + ll(startVal)) % mod;
        if (i + k <= n) {
            if (sum == hashValue) idx = i;
            let endVal = s[i + k - 1].charCodeAt() - 96;
            sum = (sum - powerTok * ll(endVal)) % mod;
            if (sum < 0) sum += mod;
        }
    }
    return s.slice(idx, idx + k);
};
////
var minimumVisitedCells = function(grid) {
  let m = grid.length, n = grid[0].length;
  let dp = Array(m).fill(0).map(() => Array(n).fill(Infinity)), colStacks = Array(n).fill(0).map(() => []); // colStacks[j] = stack of row indexes for column j
  dp[m - 1][n - 1] = 1;
  colStacks[n - 1].push(m - 1); 
  
  for (let i = m - 1; i >= 0; i--) {
    let rowStack = i === m - 1 ? [n - 1] : []; // stack of column indexes for row i
    for (let j = n - 1; j >= 0; j--) {
      let colIndex = findIndex(rowStack, grid[i][j] + j);
      if (colIndex >= 0) dp[i][j] = Math.min(dp[i][j], 1 + dp[i][rowStack[colIndex]]);
      let colStack = colStacks[j], rowIndex = findIndex(colStack, grid[i][j] + i);
      if (rowIndex >= 0) dp[i][j] = Math.min(dp[i][j], 1 + dp[colStack[rowIndex]][j]);
      
      while (rowStack.length && dp[i][rowStack[rowStack.length - 1]] >= dp[i][j]) rowStack.pop();
      rowStack.push(j);
      while (colStack.length && dp[colStack[colStack.length - 1]][j] >= dp[i][j]) colStack.pop();
      colStack.push(i);
    }
  }
  return dp[0][0] === Infinity ? -1 : dp[0][0];
};

function findIndex(stack, maxIndex) {
  if (!stack.length) return -1;
  let low = 0, high = stack.length - 1;
  while (low < high) {
    let mid = Math.floor((low + high) / 2);
    if (stack[mid] <= maxIndex) high = mid;
    else low = mid + 1;
  }
  return stack[low] <= maxIndex ? low : -1;
}
///
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} x
 * @return {number}
 */
// var minimumTime = function(nums1, nums2, x) {
    
// };

function minimumTime(nums1, nums2, x) {
    const n = nums1.length;
    const ind = new Array(n);
    let s = 0;
    let d = 0;

    for (let i = 0; i < n; ++i) {
        ind[i] = i;
        s += nums1[i];
        d += nums2[i];
    }

    if (s <= x) {
        return 0;
    }

    ind.sort((a, b) => {
        return nums2[a] - nums2[b];
    });

    const dp = new Array(n + 1).fill(0);
    let r = n + 1;

    for (let i = 1; i <= n; ++i) {
        for (let j = Math.min(i, r - 1); j; --j) {
            dp[j] = Math.max(dp[j], dp[j - 1] + nums2[ind[i - 1]] * j + nums1[ind[i - 1]]);

            if (s + j * d - dp[j] <= x) {
                r = j;
            }
        }
    }

    return r <= n ? r : -1;
}

// Example usage:
const nums1 = [1, 2, 3];
const nums2 = [4, 5, 6];
const x = 10;

console.log(minimumTime(nums1, nums2, x)); // Output: 2



///
var lengthOfLIS = function(nums, k) {
  let max = Math.max(...nums), segTree = new SegmentTree(max + 1), ans = 0;
  for (let num of nums) {
    let maxLength = segTree.maxInRange(Math.max(num - k, 0), num - 1);
    segTree.update(num, maxLength + 1);
    ans = Math.max(ans, maxLength + 1);
  }
  return ans;
};

class SegmentTree {
  constructor(n) {
    this.size = n;
    this.segTree = Array(n * 2).fill(0);
  }
  update(index, val) {
    let n = this.size, idx = index + n;
    this.segTree[idx] = Math.max(this.segTree[idx], val);
    idx = Math.floor(idx / 2);

    while (idx > 0) {
      this.segTree[idx] = Math.max(this.segTree[idx * 2], this.segTree[idx * 2 + 1]);
      idx = Math.floor(idx / 2);
    }
  }
  maxInRange(left, right) {
    let n = this.size, max = 0;
    let left_idx = left + n, right_idx = right + n;
    // left must be even, right must be odd
    // when left is odd or right is even, this indicates partial coverage. 
    // in other words, the parent node will be covering a range outside of the range we are looking for.
    // so, we need to take the partial sum and move the pointers so that it has full coverage.
    while (left_idx <= right_idx) {
      if (left_idx % 2 === 1) {
        max = Math.max(max, this.segTree[left_idx]);
        left_idx++;
      }
      if (right_idx % 2 === 0) {
        max = Math.max(max, this.segTree[right_idx]);
        right_idx--;
      }
      left_idx = Math.floor(left_idx / 2);
      right_idx = Math.floor(right_idx / 2);
    }
    return max;
  }
}
///
var minimumDifference = function (nums) {
  const N = nums.length;
  const n = N / 2;
  const left = new Array(n + 1).fill().map(() => new Array().fill());
  const right = new Array(n + 1).fill().map(() => new Array().fill());

  let sum = 0;
  nums.forEach((num) => (sum += num));

  for (let i = 0; i < 1 << n; i++) {
    let count = 0; // to count number of elements in the subset
    let leftSum = 0;
    let rightSum = 0;

    for (let j = 0; j < n; j++) {
      if (i & (1 << j)) {
        count++;
        leftSum += nums[j];
        rightSum += nums[n + j];   
      }
    }

    left[count].push(leftSum); 
    // store the number of elements in the subset as i'th index or key of the 2D array
    right[count].push(rightSum);
  }

  for (let i = 0; i < n; i++) {
    right[i].sort((a, b) => a - b);
  }

  let ans = Number.MAX_VALUE;

  for (let i = 0; i < n; i++) {
    const leftArr = left[i];
    const rightArr = right[n - i]; 
    // we have to find min abs diff in two equal size arrays

    leftArr.forEach((element) => {
      let low = 0;
      let high = rightArr.length - 1;

      while (low <= high) {
        const mid = Math.floor(low + (high - low) / 2);
        const value = sum - 2 * (element + rightArr[mid]);
        ans = Math.min(ans, Math.abs(value));
        if (ans == 0) {
          return ans;
        }
        if (value > 0) {
          low = mid + 1;
        } else {
          high = mid - 1;
        }
      }

    });
  }

  return ans;
};

///
var beautifulSubstrings = function(s, k) {
    const n=s.length;
    const vowels =new Set(['a','e','i','o','u']);
    let i=1;
    while (i*i%k!==0){
        i++;
    }
    const q=i*2;
    const p=Array.from({length:q},()=>({}));
    p[q-1][0]=1;
    let res=0;
    let v=0;
    for (let i=0;i<n;i++){
        v+=vowels.has(s[i]) ?1:-1;
        res += p[i%q][v]||0;
        p[i%q][v]=(p[i%q][v]||0)+1;
    }
    return res;
};

///
const counter = (a_or_s) => { let m = new Map(); for (const x of a_or_s) m.set(x, m.get(x) + 1 || 1); return m; };

const mod = 1e9 + 7;
const countSubMultisets = (a, l, r) => {
    let f = Array(r + 1).fill(0), m = counter(a), res = 0;
    f[0] = 1;
    for (const [x, occ] of m) {
        if (x == 0) {
            f = f.map(e => e * (occ + 1));
        } else {
            for (let i = x; i <= r; i++) {
                f[i] += f[i - x];
                f[i] %= mod;
            }
            for (let i = r; i >= (occ + 1) * x; i--) {
                f[i] -= f[i - (occ + 1) * x];
                f[i] %= mod;
            }
        }
    }
    for (let i = l; i <= r; i++) {
        res += f[i];
        res %= mod;
    }
    return (res + mod) % mod;
};
///

/* Breadth first search use Queue data structure. O(n)
back ---queque---> front. Things get from the back and leave from front
array.shift() - removes first element from an array and return it so we can use it: const firstItem = [1,2,3].shift();
The order that you visited an queque derived from order in which things leave an queue: 
Reqursive order use stack, so there is no way to do it recursion for queue.

const breadthFirstSearch = (root) => {
  const values = [];
  if (root === null) return [];
  const queue = [root];
  while (queue.length > 0) {
    const current = queue.shift();
    values.push(current.val);
    if (current.left !== null) queue.push(current.left);
    if (current.right !== null) queue.push(current.right);
  }
  return values;
};
*/
/* BFS with target;
once it will loop through the queue and not find target, it will exit and then need to write return false
const breadthFirstSearch = (root, target) => {
  if (root === null) return false;
  const queque = [root];
  while (queque.length > 0) {
    const cur = queque.shift();
    if (cur.val === target) return true;
    else if (cur.left !== null) queque.push(cur.left);
    else if (cur.right !== null ) queque.push(cur.right);
  }
  return false;
};

Recursive breadthFirstSearch with target
inside of function we calling the same function and passing left for one function call and for other function call right node.
breadFirstSearch(root.left, target); it gives boolean data so we can use trick by help of || ;; return left subtre || right subtree if either is true it will return true, else return false
we can add that if root's node value = to target then return true;
important that this test case have to be below another one when checking if it is = to null, otherwise it can not read property of null.val

const breadFirstSearch = (root, target) => {
  if (root === null) return false;
  if (root.val === target) return true;
  return (
    breadFirstSearch(root.left, target) || breadFirstSearch(root.right, target)
  );
};

Tree sum recursively return root.val + treeSum(root.left) + treeSum(root.left); need value and then left calculate everything on the left and right calculate everything on the right.

const treeSum = (root) => {
  if (root = null) return 0;
  return root.val + treeSum(root.left) + treeSum(root.left);
};

// Itirative approach for tree sum, need sum+=current.val after we shift() we getting this node that we removing and we adding its value to sum, instead of put it inside of if statement. It still works but it will be repetitive twice. As well as we need sum initilize to root.val in that case. Otherwise it won't count root value.
const treeSum = (root) => {
  const sum = 0;
  const queue = [root];
  if (root === null) return 0;
  while (queue.length > 0) {
    const current = queue.shift();
    sum += current.val;
    if (current.left !== null) {
      queue.push(current.left);
    }
    if (current.right !== null) {
      queue.push(current.right);
    }
  }
  return sum;
};
*/

////////////////////////// Template ////////////////////////////////////
function Bisect() {
    return { insort_right, insort_left, bisect_left, bisect_right }
    function insort_right(a, x, lo = 0, hi = null) {
        lo = bisect_right(a, x, lo, hi);
        a.splice(lo, 0, x);
    }
    function bisect_right(a, x, lo = 0, hi = null) { // > upper_bound
        if (lo < 0) throw new Error('lo must be non-negative');
        if (hi == null) hi = a.length;
        while (lo < hi) {
            let mid = parseInt((lo + hi) / 2);
            a[mid] > x ? hi = mid : lo = mid + 1;
        }
        return lo;
    }
    function insort_left(a, x, lo = 0, hi = null) {
        lo = bisect_left(a, x, lo, hi);
        a.splice(lo, 0, x);
    }
    function bisect_left(a, x, lo = 0, hi = null) { // >= lower_bound
        if (lo < 0) throw new Error('lo must be non-negative');
        if (hi == null) hi = a.length;
        while (lo < hi) {
            let mid = parseInt((lo + hi) / 2);
            a[mid] < x ? lo = mid + 1 : hi = mid;
        }
        return lo;
    }
}
///////////////////////////////////////////////////////////////////

const minReverseOperations = (n, p, banned, k) => {
    let res = Array(n).fill(-1), evenOdd = [[], []], q = [p], bi = new Bisect();
    if (k == 1) {
        res[p] = 0;
        return res;
    }
    banned = new Set(banned);
    for (let i = 0; i < n; i++) {
        if (i != p && !banned.has(i)) evenOdd[i % 2].push(i);
    }
    res[p] = 0;
    while (q.length) {
        let cur = q.shift();
        let L = Math.max(-(k - 1), k - 1 - cur * 2), R = Math.min(k - 1, -(k - 1) + (n - cur - 1) * 2); // caculate the jump range
        let x = (cur + k - 1) % 2, idx = bi.bisect_left(evenOdd[x], cur + L);
        while (1) { // not reached position, can be jump from current position (cur -> next)
            let next = evenOdd[x][idx];
            if (next == undefined || next > cur + R) break;
            res[next] = res[cur] + 1;
            q.push(next);
            evenOdd[x].splice(idx, 1);
        }
    }
    return res;
};


///
/* Node represent as a class
if no children nodes then is NULL
left and right children name as left and right
value of node put inside constructor.
default node won't have any children aka = null
to call a node use keyword new and value:
const a = new Node("a");
*/
class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

/*
Depth first search use by stack (array data structure): 
methods push & pop => to the end add & remove node.
End of my array represent as top of the stack
we have to initialize stack with root node
we need to run our algorythm while something in our stack
we removing top of the stack and it gives us that object by assigning
and root here is just a node like Node with value a
if only one child we have to make guard statement if only it exists
we first push right branch because it will below left
then need to create array to store values of removed nodes
by pushing them to array of current.val
*/

const depthFirstSearch = (root) => {
  const result = [];
  const stack = [root];
  while (stack.length > 0) {
    let current = stack.pop();
    result.push(current.val);
    if (current.right) stack.push(current.right);
    if (current.left) stack.push(current.left);
  }
  return result;
};


///
var differenceOfSum = function(nums) {
    let sum = nums.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
    })

    let digitSum = nums.join("")
    .split("")
    .reduce((accumulator, currentValue) => {
      return parseInt(accumulator) + parseInt(currentValue);
    })

    return Math.abs(sum - digitSum);
};

////
var arrayStringsAreEqual = function(word1, word2) {
    let w1 = word1.join('')
    let w2 = word2.join('')
    if (w1 === w2) {
       return true 
    } else {
        return false
    }
};


//
var truncateSentence = function(s, k) {
    let newS = [];
    let oldS= s.split(' ');
    for (let i = 0; i < k; i++){
        newS.push(oldS[i])
    }
    return newS.join(" ")
};


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
