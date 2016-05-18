function nextPrime(lastPrime, queue) {
  let i = lastPrime + 1,
      factors = queue[i];

  console.log(queue.length);

  while (factors !== undefined) {
    factors.forEach(requeue);
    queue[i].splice(0);
    // delete queue[i];

    i++;

    factors = queue[i];
  }

  requeue(i);

  return i;

  function requeue(factor) {
    (queue[i + factor] = queue[i + factor] || []).push(factor);
  }
}

function * primeGenerator() {
  yield 1;
  yield 2;
  yield 3;

  let lastPrime = 3,
      check = lastPrime;

  const queue = [];

  while (true) {
    check = check + 2;

    const factors = queue[check];

    if (factors !== undefined) {
      factors.forEach(requeue);
    }
    else {
      lastPrime = check;
      yield lastPrime;
    }
  }

  function requeue(factor) {
    (queue[check + factor] = queue[check + factor] || []).push(factor);
  }
}

const generator = primeGenerator();

let logLevel = 1,
    threshold = Math.pow(10, logLevel);
while (true) {
  const result = generator.next().value;

  console.log(result);

  if (result > threshold) {
    console.error('passed level', logLevel, 'at', result);
    logLevel++;
    threshold = Math.pow(10, logLevel);
  }
}

function primesTo(x) {
  const primes = [];
  const queue = [];

  let prime = 1;

  while (prime < x) {
    prime = nextPrime(prime, queue);
    primes.push(prime);
  }

  return primes;
}

// console.log(primesTo(2e10));