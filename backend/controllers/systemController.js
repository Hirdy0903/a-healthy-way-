// @desc    Get active users count (simulated smooth fluctuation)
// @route   GET /api/system/active-users
// @access  Public
export const getActiveUsers = (req, res) => {
  // Use current minute to deterministically generate a base count 
  // so it fluctuates naturally instead of jumping wildly on every request
  const date = new Date();
  const minutes = date.getMinutes();
  
  // Base is between 15 and 35, fluctuating smoothly over the hour
  // We use a sine wave pattern over 60 minutes
  const baseCount = Math.floor(25 + 10 * Math.sin(minutes * Math.PI / 30));
  
  // Add a tiny bit of random jitter (-2 to +2) that changes every 10 seconds
  const secondsBucket = Math.floor(date.getSeconds() / 10);
  // pseudo-random based on bucket
  const jitter = (secondsBucket % 5) - 2; 

  let count = baseCount + jitter;
  
  // Ensure it stays in realistic bounds
  if (count < 12) count = 12;
  if (count > 42) count = 42;

  res.json({ count });
};
