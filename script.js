///////////////

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
