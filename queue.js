class Queue extends Array {
  constructor(item) {
    super(item);
  }

  enqueue(item) {
    this.unshift(item);
  }

  dequeue() {
    return this.pop();
  }
}

module.exports = { Queue };
