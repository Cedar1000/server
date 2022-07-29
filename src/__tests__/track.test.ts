import { add } from '../controllers/trackController';

describe('This is a test', () => {
  it('should pass', () => {
    expect(add(1, 2)).toBe(3);
  });
});
