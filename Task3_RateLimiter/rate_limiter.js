// 5 requests per 60 seconds per user
const rateLimiter = new Map(); // to store userId 

function isRateLimited(userId) {
  const now = Date.now();
  const window = 60 * 1000; // 60 seconds
  const limit = 5;

  let times = rateLimiter.get(userId) || [];

  // drop old timestamps
  times = times.filter(t => now - t < window);

  if (times.length >= limit) {
    return true; // blocked
  }

  // store the request
  times.push(now);
  rateLimiter.set(userId, times);

  return false;
}

// quick test function
function request(userId) {
  if (isRateLimited(userId)) {
    console.log(`BLOCKED → ${userId} (too many requests)`);
    return false;
  }
  console.log(`ALLOWED → ${userId}`);
  return true;
}

// demo
function demo() {
  const user = "u777";

  console.log("spamming 8 requests right now:");
  for (let i = 0; i < 8; i++) {
    request(user);
  }

  console.log("\nwaiting 61 seconds...\n");

  setTimeout(() => {
    console.log("after cooldown:");
    for (let i = 0; i < 6; i++) {
      request(user);
    }
  }, 61000);
}

demo();
