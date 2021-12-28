
calcPrime = () => {
    // check if p and q are prime numbers
    if (isPrime(p) && isPrime(q)) {
        alert("p and q are prime numbers");
        return p * q;
    } else {
        alert("Please enter prime numbers");
    }
}

// function to check if value is prime
isPrime = (value) => {
    for (var i = 2; i < value; i++) {
        if (value % i == 0) {
            return false;
        }
    }
    return true;    
}

gcd = (pubkey, phi_n) => {
    if (phi_n == 0) {
        return pubkey;
    } else {
        return gcd(phi_n, pubkey % phi_n);
    }
}


// function to calculate inverse modulo
function inverse_mod(a, m) {
    // validate inputs
    [a, m] = [Number(a), Number(m)]
    if (Number.isNaN(a) || Number.isNaN(m)) {
      return NaN // invalid input
    }
    a = (a % m + m) % m
    if (!a || m < 2) {
      return NaN // invalid input
    }
    // find the gcd
    const s = []
    let b = m
    while(b) {
      [a, b] = [b, a % b]
      s.push({a, b})
    }
    if (a !== 1) {
      return NaN // inverse does not exists
    }
    // find the inverse
    let x = 1
    let y = 0
    for(let i = s.length - 2; i >= 0; --i) {
      [x, y] = [y,  x - y * Math.floor(s[i].a / s[i].b)]
    }
    return (y % m + m) % m
  }

pubkey = document.getElementById("publickey").value;
p = document.getElementById("prime-no-1").value;
q = document.getElementById("prime-no-2").value;
phi_n = (p - 1) * (q - 1);

var button = document.getElementById("button").addEventListener("click",() => {
    p = document.getElementById("prime-no-1").value;
    q = document.getElementById("prime-no-2").value;
    n = calcPrime();
    if(gcd(pubkey, phi_n) == 1 && pubkey<=phi_n) {
        privkey = inverse_mod(pubkey, phi_n);
        alert("Public key is valid");
        console.log(typeof(privkey));
        document.getElementById("privkey").innerHTML = privkey;
    } else {
        alert("Public key is invalid");
    }
});


// function to perform rsa encryption
function rsa_encrypt(message, pubkey, n) {
    // validate inputs
    [message, pubkey, n] = [Number(message), Number(pubkey), Number(n)]
    if (Number.isNaN(message) || Number.isNaN(pubkey) || Number.isNaN(n)) {
      return NaN // invalid input
    }
    // encrypt
    return Math.pow(message, pubkey) % n
}



