import solution.Solution;

class TestGetSet {
  public void runTests() {
    Solution d = new Solution();
    // Setup array with [0,1,2,3,4]
    for (int i = 0; i < 5; i++) {
      d.append(i);
    }

    // Test get
    if (d.get(0) != 0) {
      throw new RuntimeException("get(0) should return 0");
    }
    if (d.get(4) != 4) {
      throw new RuntimeException("get(4) should return 4");
    }

    // Test set
    d.set(0, 10);
    if (d.get(0) != 10) {
      throw new RuntimeException("After set(0,10), get(0) should return 10");
    }

    // Test error cases
    try {
      d.get(-1);
      throw new RuntimeException(
          "get(-1) should throw IndexOutOfBoundsException");
    } catch (IndexOutOfBoundsException e) {
      // Expected
    }

    try {
      d.get(5);
      throw new RuntimeException(
          "get(5) should throw IndexOutOfBoundsException");
    } catch (IndexOutOfBoundsException e) {
      // Expected
    }

    try {
      d.set(-1, 0);
      throw new RuntimeException(
          "set(-1,0) should throw IndexOutOfBoundsException");
    } catch (IndexOutOfBoundsException e) {
      // Expected
    }

    try {
      d.set(5, 0);
      throw new RuntimeException(
          "set(5,0) should throw IndexOutOfBoundsException");
    } catch (IndexOutOfBoundsException e) {
      // Expected
    }
  }
}

class TestAppend {
  public void runTests() {
    Solution d = new Solution();
    // Test append to empty array
    d.append(1);
    if (d.size() != 1) {
      throw new RuntimeException("Size should be 1 after append");
    }
    if (d.get(0) != 1) {
      throw new RuntimeException("Element at 0 should be 1");
    }

    // Test multiple appends
    d.append(2);
    d.append(3);
    if (d.size() != 3) {
      throw new RuntimeException("Size should be 3 after appends");
    }
    if (d.get(1) != 2) {
      throw new RuntimeException("Element at 1 should be 2");
    }
    if (d.get(2) != 3) {
      throw new RuntimeException("Element at 2 should be 3");
    }
  }
}

class TestPopBack {
  public void runTests() {
    Solution d = new Solution();
    // Test pop from empty array
    try {
      d.popBack();
      throw new RuntimeException(
          "popBack() on empty array should throw IndexOutOfBoundsException");
    } catch (IndexOutOfBoundsException e) {
      // Expected
    }

    // Setup array with [1,2,3]
    d.append(1);
    d.append(2);
    d.append(3);

    // Test pop_back
    d.popBack();
    if (d.size() != 2) {
      throw new RuntimeException("Size should be 2 after popBack");
    }
    try {
      d.get(2);
      throw new RuntimeException(
          "get(2) should throw IndexOutOfBoundsException after popBack");
    } catch (IndexOutOfBoundsException e) {
      // Expected
    }
  }
}

class TestResize {
  public void runTests() {
    Solution d = new Solution();
    // Test initial capacity
    if (d.getCapacity() != 10) {
      throw new RuntimeException("Initial capacity should be 10");
    }

    // Test grow capacity
    for (int i = 0; i < 11; i++) {
      d.append(i);
    }
    if (d.getCapacity() != 20) {
      throw new RuntimeException("Capacity should double to 20");
    }

    // Test shrink capacity
    for (int i = 0; i < 8; i++) {
      d.popBack();
    }
    if (d.getCapacity() != 10) {
      throw new RuntimeException("Capacity should shrink back to 10");
    }
  }
}

class RunTests {
  public void runTests() {
    TestGetSet testGetSet = new TestGetSet();
    TestAppend testAppend = new TestAppend();
    TestPopBack testPopBack = new TestPopBack();
    TestResize testResize = new TestResize();

    try {
      testGetSet.runTests();

      testAppend.runTests();

      testPopBack.runTests();

      testResize.runTests();

    } catch (RuntimeException e) {
      System.out.println("Test failed: " + e.getMessage());
      throw e;
    }
  }
}

public class Tests {
  public static void main(String[] args) {
    new RunTests().runTests();
  }
}
