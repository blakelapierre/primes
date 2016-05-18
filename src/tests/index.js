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

  let lastPrime = 3,
      check = lastPrime;

  const queue = {};

  while (true) {
    const factors = queue[check];

    if (factors !== undefined) requeue(factors, queue, check);
    /*jshint -W093 */
    else {
      const nextCheck = !((check + check) & 1) ? check + check + check : check + check;
      (queue[nextCheck] = queue[nextCheck] || []).push(check);

      yield lastPrime = check;
    }

    check = check + 2;
  }

  function requeue(factors, queue, check) {
    for (let i = 0; i < factors.length; i++) {
      const factor = factors[i];
      const nextCheck = !((check + factor) & 1) ? check + factor + factor : check + factor;
      // could check if a multiple of any queued items...or something?
      (queue[nextCheck] = queue[nextCheck] || []).push(check);
    }
    delete queue[check];
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