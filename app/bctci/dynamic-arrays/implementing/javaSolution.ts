import Prism from "prismjs";
import "prismjs/components/prism-java";

const javaSolution = `public class DynamicArray {
  private int[] fixedArray;
  private int capacity;
  private int _size;

  public DynamicArray() {
    capacity = 10;
    _size = 0;
    fixedArray = new int[capacity]; // Java arrays are initialized to 0 by
                                    // default
  }

  public int get(int i) {
    if (i < 0 || i >= _size) {
      throw new IndexOutOfBoundsException("Index out of bounds");
    }
    return fixedArray[i];
  }

  public void set(int i, int x) {
    if (i < 0 || i >= _size) {
      throw new IndexOutOfBoundsException("Index out of bounds");
    }
    fixedArray[i] = x;
  }

  public int size() {
    return _size;
  }

  public void append(int x) {
    if (_size == capacity) {
      resize(capacity * 2);
    }
    fixedArray[_size] = x;
    _size++;
  }

  private void resize(int newCapacity) {
    int[] newFixedSizeArr = new int[newCapacity];
    for (int i = 0; i < _size; i++) {
      newFixedSizeArr[i] = fixedArray[i];
    }
    fixedArray = newFixedSizeArr;
    capacity = newCapacity;
  }

  public void popBack() {
    if (_size == 0) {
      throw new IndexOutOfBoundsException("Pop from empty array");
    }
    _size--;
    if (_size * 4 < capacity && capacity > 10) {
      resize(capacity / 2);
    }
  }

  // Added for testing
  public int getCapacity() {
    return capacity;
  }
}`;

export const highlightedJavaSolution = Prism.highlight(javaSolution, Prism.languages.java, "java");

const mySolution = `package com.practice.algorithms.dynamicarrays.implementing;

public class Solution {
    public int[] dynamic;
    public int capacity;
    public int count;

    public Solution() {
        capacity = 10;
        count = 0;
        dynamic = new int[capacity];
    }

    public void append(int x) {
        if (count == capacity) {
            capacity *= 2;
            int[] newD = new int[capacity];

            for (int i = 0; i < count; i++) {
                newD[i] = dynamic[i];
            }

            dynamic = newD;
        }

        dynamic[count] = x;
        count++;
    }

    public int get(int i) {
        if (i < 0 || i >= count) {
            throw new IndexOutOfBoundsException("Index 'i' is out of bounds.");
        }

        return dynamic[i];
    }

    public int size() {
        return count;
    }

    public void set(int i, int x) {
        if (i < 0 || i >= count) {
            throw new IndexOutOfBoundsException("Index 'i' is out of bounds.");
        }

        dynamic[i] = x;
    }

    public void popBack() {
        if (count == 0) {
            throw new IndexOutOfBoundsException("Cannot pop from an empty array.");
        }

        count--;
    }
}`;

export const highlightedMySolution = Prism.highlight(mySolution, Prism.languages.java, "java");
