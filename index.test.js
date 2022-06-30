const { replaceCircularRefs } = require('./index');

describe('replaceCircularRefs', () => {
  describe('replaceCircularRefs should replace circular refs with "Circular [Object]"', () => {
    test('complex object', () => {
      const obj = {
        h: 6,
        i: [7, [8, 9]],
        a: [1, 2, 3, { b: { c: 4, d: { e: 5 } } }],
      };

      obj.a[3].f = obj.a[3].b.d;
      obj.a[3].b.g = obj.a[3].b; // This creates a circular reference

      expect(JSON.stringify.bind(this, obj)).toThrow(); // Circular object throw error
      replaceCircularRefs(obj); // This will change obj in-place
      expect(JSON.stringify(obj)).toBe(
        '{"h":6,"i":[7,[8,9]],"a":[1,2,3,{"b":{"c":4,"d":{"e":5},"g":"Circular [Object]"},"f":{"e":5}}]}'
      );
    });

    test('simple object', () => {
      const obj = {
        a: 1,
        b: {
          c: 2,
        },
      };

      obj.b.d = obj.b; // This creates a circular reference

      expect(JSON.stringify.bind(this, obj)).toThrow(); // Circular object throw error
      replaceCircularRefs(obj); // This will change obj in-place
      expect(JSON.stringify(obj)).toBe(
        '{"a":1,"b":{"c":2,"d":"Circular [Object]"}}'
      );
    });
  });

  describe('replaceCircularRefs should do nothing if the object is not circular', () => {
    test('simple object', () => {
      const obj = {
        h: 6,
        i: [7, [8, 9]],
        a: [1, 2, 3, { b: { c: 4, d: { e: 5 } } }],
      };
      replaceCircularRefs(obj);
      expect(JSON.stringify(obj)).toBe(
        '{"h":6,"i":[7,[8,9]],"a":[1,2,3,{"b":{"c":4,"d":{"e":5}}}]}'
      );
    });

    test('object references itself but it is not circular', () => {
      const obj = {
        h: 6,
        i: [7, [8, 9]],
        a: [1, 2, 3, { b: { c: 4, d: { e: 5 } } }],
      };

      obj.a[3].f = obj.a[3].b.d;
      replaceCircularRefs(obj);
      expect(JSON.stringify(obj)).toBe(
        '{"h":6,"i":[7,[8,9]],"a":[1,2,3,{"b":{"c":4,"d":{"e":5}},"f":{"e":5}}]}'
      );
    });

    test.skip('object is undefined', () => {
      const obj = undefined;
      replaceCircularRefs(obj);
      expect(JSON.stringify(obj)).toBe(undefined);
    });
  });
});
