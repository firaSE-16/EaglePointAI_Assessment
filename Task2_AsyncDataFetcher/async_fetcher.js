function wait(ms) {
  return new Promise(r => setTimeout(r, ms));
}

// mock API call that randomly succeeds or fails
async function fakeApiCall(url) {
  await wait(200 + Math.random() * 300); 
  
  if (Math.random() < 0.65) {
    return { data: "Here is your data from " + url };
  }
  
  throw new Error("Something went wrong"); 
}

// fetch data with retry logic
async function fetchDataWithRetry(url, maxAttempts = 4) {
  let lastError;
  
  for (let i = 1; i <= maxAttempts; i++) {
    try {
      console.log(`attempt ${i}...`);
      const data = await fakeApiCall(url); 
      console.log("got it!");
      return data; // return if successful
      
    } catch (err) {
      lastError = err;
      if (i === maxAttempts) break; // stop if last attempt
      
      console.log("failed, waiting a sec...");
      await wait(1000); 
    }
  }
  
  // throw error if all attempts failed
  throw new Error(`gave up after ${maxAttempts} tries - ${lastError.message}`);
}

// immediately invoked async function to test fetch
(async () => {
  try {
    const result = await fetchDataWithRetry("https://api.mysite.com/users", 5);
    console.log("final result ->", result);
  } catch (e) {
    console.log("all attempts failed:", e.message);
  }
})();
