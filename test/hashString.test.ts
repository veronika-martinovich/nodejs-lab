import { hashString } from '../src/helpers/hashString';

describe('test hashString function', () => {
  const EXAMPLE_1 = 'Password';
  const EXAMPLE_2 = '123456';
  const EXAMPLE_3 = '@!#$%^*';
  const HASH_LENGTH = 64;

  it('should return defined value', () => {
    expect(hashString(EXAMPLE_1)).toBeDefined();
    expect(hashString(EXAMPLE_2)).toBeDefined();
    expect(hashString(EXAMPLE_3)).toBeDefined();
  });
  it('should return hashed string', () => {
    expect(hashString(EXAMPLE_1).length).toBe(HASH_LENGTH);
    expect(hashString(EXAMPLE_2).length).toBe(HASH_LENGTH);
    expect(hashString(EXAMPLE_3).length).toBe(HASH_LENGTH);
  });
});
