#!/bin/bash
# Simple Interest Calculator

echo "Enter the principal:"
read p
echo "Enter the rate:"
read r
echo "Enter the time:"
read t

si=$(echo "$p * $r * $t / 100" | bc)

echo "The simple interest is: $si"
