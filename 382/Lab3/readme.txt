CSC 382                                   Project 3                                   Due 03/10/11

Average Case
In this project we will try to match the Average Case of algorithm A10 as we derived in class and the “Real Average” of the algorithm using Monte Carlo approach. 

A10: void Insertion (int A[ ], int n) // in reality the elements to be sorted are indexed from
                                                // index 1 to index n
{
         int i,j, temp;
         A[0]=-32768; //smallest possible integer using 2 bytes integer representation
         for (i=1; i<=n, i++) {
               j=i;
          (1) while ( A[j] < A[j-1]) { // swap 
                           temp=A[j];
                           A[j]=A[j-1];
                           A[j-1]=temp;
                           j--;
               }
          }
}
      
First you must modify A10 to return the number of steps executed. Please note that we consider only basic operations, which are the “comparisons” only. Call this subroutine Insertion-Mod( ). 



1)  (Calculated Average)
  Let n = 100.
Calculate the Average-case A(n) as we derived in class.
 Let bound be an integer (choose a large number).
Let tot-number-steps = 0 (accumulates total number of
Generate a sequence of n integers (positive and negative as well) using a random number generator where the numbers of the sequence are between 0 and bound. Call Insertion-Mod ( ) using this sequence and add the number of steps returned by this algorithm to tot-number-steps.
Repeat steps e 100,000 times (i.e., generate 100,000 random sequences and update tot-number-steps).
Calculate the real average of algorithm A10 and let this number be A2(n).
 

Repeat steps a)-thru g) for the following values of n, n= {100, 500, 1000, 2500, 3000, 3500}.
You final output should look like:
Input size   Calculated Average        Real Average
100                   XX                              XX
500                  XX                               XX
..                        ..                                 ..
3500                XX                               XX

Please explain the outcome of the experiments.




