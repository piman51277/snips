/** 
 *  Gets the prime factorization of a number where n<10^9
 *  @param n - number to run prime factorization on.
 *  @returns - an object describing the prime factors.
 */
//Note, This algorithm will work above n>10^9, but will fail if trimming does not reduce it under 10^9 in time.
//However, if n > 10^9, there are far better algorithms to use.

function getPrimeFactorization(n) {
    //if N is not a whole number, positive, or non-0, give an error
    if(n <= 0 || Math.round(n) != n) throw "input must be positive whole number"

    let sequence = {};
    let subN = n;

    //use first 25 primes to cut down majority of cases
    const first25primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]
    for (let i = 0; i < first25primes.length; i++) {
        if (subN % first25primes[i] == 0) {
            subN /= first25primes[i];
            sequence[first25primes[i]] = sequence[first25primes[i]] + 1 || 1
            i = -1;
        }
    }

    //if number is too big, throw error
    if (subN > 1000000000) throw "Number after pre-slicing is too big!"

    //use sieve to get remaning primes
    const max_value = Math.ceil(Math.sqrt(subN))

    //initialize array
    const matrix = new Array(max_value)

    //fill array
    for (let i = 0; i < max_value; i++) {
        matrix[i] = false;
    }

    //start on sieve
    for (let pos = 1; pos < max_value; pos++) {
        if (matrix[pos] == false) {
            for (let i = pos + 1; i < matrix.length; i++) {
                if ((i + 1) % (pos + 1) == 0) {
                    matrix[i] = true;
                }
            }
        }
    }

    //compile indexes of remaining
    let primes = [];
    for (let i = 100; i < matrix.length; i++) {
        if (matrix[i] == false) primes.push(i + 1)
    }

    //use newly seived primes to get rest of cases
    for (let i = 0; i < primes.length; i++) {
        if (subN % primes[i] == 0) {
            subN /= primes[i];
            sequence[primes[i]] = sequence[primes[i]] + 1 || 1
        }
    }

    if (subN != 1) sequence[subN] = sequence[subN] + 1 || 1

    return sequence
}

/** Steps
 * 1. Test to check if n falls within acceptable parameters
 * 2. Trim n down for next step using first 25 primes.
 * Average Computation time for the next steps is reduced by more than 80.2% through this step.
 * (Figures from testing 10^0 - 10^9)
 * 3. Check if trimmed n is under 10^9, to prevent crash from hitting memory limit.
 * 4. Use Erestotenes's Sieve to get primes number sqrt(n)
 * 5. Trim n down further using these new primes
 * 6. If n is not 1 after trimming, add n to the list.
 * 7. return
 * */
