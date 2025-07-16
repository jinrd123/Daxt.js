class CircuitBreaker {
  constructor() {
    this.state = 'CLOSED'; // CLOSED, OPEN
    this.failureCount = 0;
    this.failureThreshold = 3; // 3次失败后熔断
    this.timeout = 30000; // 30秒后尝试恢复
    this.lastFailureTime = null;
  }

  onSuccess() {
    this.failureCount = 0;
    this.state = 'CLOSED';
  }

  onFailure() {
    this.failureCount++;
    if (this.failureCount >= this.failureThreshold) {
      this.state = 'OPEN';
      this.lastFailureTime = Date.now();
    }
  }

  shouldReset() {
    return this.state === 'OPEN' && 
           Date.now() - this.lastFailureTime > this.timeout;
  }

  isOpen() {
    // MOCK: 熔断器关闭
    // return true;
    if (this.shouldReset()) {
      this.state = 'CLOSED';
      this.failureCount = 0;
    }
    return this.state === 'OPEN';
  }
}

export default CircuitBreaker; 