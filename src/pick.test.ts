import { pick } from './pick';

describe('pick', () => {
  it('should pick specified keys from the environment', () => {
    interface Env {
      readonly a: number;
      readonly b: string;
      readonly c: boolean;
    }
    const env: Env = { a: 1, b: 'foo', c: true };
    const reader = pick<Env, 'a' | 'c'>(['a', 'c']);
    const result = reader(env);
    expect(result).toEqual({ a: 1, c: true });
    // @ts-expect-error: Property 'b' does not exist on type 'Pick<Env, "a" | "c">'
    expect(result.b).toBeUndefined();
  });
});
