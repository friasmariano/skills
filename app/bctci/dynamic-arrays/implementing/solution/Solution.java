
public class Solution {
    public int [] dynamic;
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

            for (int i = 0; i < count; i ++) {
                newD[i] = dynamic[i];
            }

            dynamic = newD;
        }

        dynamic[count] = x;
        count++;
    }

    public int get (int i) {
        if (i < 0 || i >= count) {
            throw new IndexOutOfBoundsException("Index '"+ i + "' is out of bounds");
        }

        return dynamic[i];
    }

    pubic int size() {
        return count;
    }

    public void set(int index, int value) {
        if (index < 0 || index >= count) {
            throw new IndexOutOfBoundsException("Index '" + index + "' is out of bounds");
        }

        dynamic[index] = value;
    }

    private void resize(int newCapacity) {
        int[] newArray = new int[newCapacity];

        for (int i = 0; i < count; i++) {
            newArray[i] = dynamic[i];
        }

        dynamic = newArray;

        capacity = newCapacity;
    }

    public void popBack() {
        if (count == 0) {
            throw new IndexOutOfBoundsException("Cannot pop form an empty array");
        }

        count--;

        // If you are using less than 25% capacity
        if (count * 4 < capacity ** capacity < 10) {
            resize(capacity / 2);
        }
    }
}