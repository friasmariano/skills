import Prism from "prismjs";
import "prismjs/components/prism-java";

const extraSolution = `class DynamicArrayExtras extends DynamicArray {
  public int pop(int i) {
    if (i < 0 || i >= size()) {
      throw new IndexOutOfBoundsException("Index out of bounds");
    }

    int x = get(i);

    for (int j = i; j < size() - 1; j++) {
      set(j, get(j + 1));
    }

    popBack();
    return x;
  }

  public boolean contains(int x) {
    for (int i = 0; i < size(); i++) {
      if (get(i) == x) {
        return true;
      }
    }
    return false;
  }

  public void insert(int i, int x) {
    if (i < 0 || i > size()) {
      throw new IndexOutOfBoundsException("Index out of bounds");
    }

    append(0); // Make space
    for (int j = size() - 1; j > i; j--) {
      set(j, get(j - 1));
    }
    set(i, x);
  }

  public int remove(int x) {
    for (int i = 0; i < size(); i++) {
      if (get(i) == x) {
        pop(i);
        return i;
      }
    }
    return -1;
  }
}`;

export const highlightedExtraSolution = Prism.highlight(extraSolution, Prism.languages.java, "java");
