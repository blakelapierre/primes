// function nextPrime(lastPrime, queue) {
//   let i = lastPrime + 1,
//       factors = queue[i];

//   console.log(queue.length);

//   while (factors !== undefined) {
//     factors.forEach(requeue);
//     queue[i].splice(0);
//     // delete queue[i];

//     i++;

//     factors = queue[i];
//   }

//   requeue(i);

//   return i;

//   function requeue(factor) {
//     (queue[i + factor] = queue[i + factor] || []).push(factor);
//   }
// }

// function primesTo(x) {
//   const primes = [];
//   const queue = [];

//   let prime = 1;

//   while (prime < x) {
//     prime = nextPrime(prime, queue);
//     primes.push(prime);
//   }

//   return primes;
// }

// // console.log(primesTo(2e10));

function * primeGenerator() {
  yield 1;
  yield 2;

  let lastPrime = 3,
      check = lastPrime;

  const queue = {};

  while (true) {
    const _ = queue[check];

    if (_ !== undefined) {
      reinsert(_, queue, check);
      delete queue[check];
    }
    else yield reinsert(check, queue, check);

    check = check + 2; // if we track where the next item in queue is, this can probably be sped up quite a bit
  }

  function reinsert(i, queue, check) {
    const nextSlot = check + (((i + check) & 1) ? i : i + i);
          candidate = queue[nextSlot];

    if (candidate) reinsert(i, queue, check + i); // will eventually stack overflow unless optimized out...?
    else queue[nextSlot] = i;

    return check;
  }
}

const generator = primeGenerator();

const check = [1,2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541];
let checkPosition = 0;

let logLevel = 1,
    threshold = Math.pow(10, logLevel);
while (true) {
  const result = generator.next().value;

  if (checkPosition < check.length) {
    if (check[checkPosition++] !== result) throw new Error(`Not prime! ${result}`);
  }

  console.log(result);

  if (result > threshold) {
    console.error('passed level', logLevel, 'at', result);
    logLevel++;
    threshold = Math.pow(10, logLevel);
  }
}