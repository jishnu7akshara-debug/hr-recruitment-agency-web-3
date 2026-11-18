// In-memory token bucket rate limiter for public submissions

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const tracker = new Map<string, RateLimitRecord>();

export function checkRateLimit(
  identifier: string,
  maxLimit: number = 5,
  windowMs: number = 60 * 1000
): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = tracker.get(identifier);

  if (!record || now > record.resetTime) {
    tracker.set(identifier, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: maxLimit - 1 };
  }

  if (record.count >= maxLimit) {
    return { allowed: false, remaining: 0 };
  }

  record.count += 1;
  return { allowed: true, remaining: maxLimit - record.count };
}

