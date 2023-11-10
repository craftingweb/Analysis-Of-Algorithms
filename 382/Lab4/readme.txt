
Write a C++ program that compares the execution times of Heap, Insertion Sort and
Merge Sorts for inputs of different size. The time, in seconds, must be formatted with at
least two decimal numbers.
The implementation of Heap, Insertion and Merge Sorts are the same as we discussed in
class.
First, we must randomly generate inputs of different size, but the “same input” generated,
must be applied to the three sorts. However, the random inputs must be copied to three
different arrays, one for each sort, to make sure that they are not previously sorted by
another sorting technique.
The output of your program should look like:
Input
Length
Heap Sort
(seconds)
Insertion
Sort
(seconds)
Merge Sort
(seconds)
Best time
1,000 xx.xx xx.xx xx.xx Heap
10,000 xx.xx xx.xx xx.xx Merge
25,000 xx.xx xx.xx xx.xx ….
50,000 xx.xx xx.xx xx.xx …..
150,000 xx.xx xx.xx xx.xx
250,000 xx.xx xx.xx xx.xx
Generated
Random
Input Insertion
