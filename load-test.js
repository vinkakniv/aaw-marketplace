import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 }, // Ramp up to 20 users
    { duration: '1m', target: 20 },  // Stay at 20 users for 1 minute
    { duration: '30s', target: 0 },  // Ramp down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests should be below 500ms
    http_req_failed: ['rate<0.01'],   // Less than 1% of requests should fail
  },
};

export default function () {
  const res = http.get('http://auth-service-alb-1519181053.us-east-1.elb.amazonaws.com/');
  
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
  
  sleep(1);
} 