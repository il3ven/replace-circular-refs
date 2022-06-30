function replaceCircularRefs(o) {}

module.exports = {
  replaceCircularRefs,
};

/**
 * FOR DEBUG AND DEVELOPMENT
 */

// const obj = {
//   h: 6,
//   i: [7, [8, 9]],
//   a: [1, 2, 3, { b: { c: 4, d: { e: 5 } } }],
// };

// obj.a[3].f = obj.a[3].b.d;
// obj.a[3].b.g = obj.a[3].b; // This makes obj circular

// replaceCircularRefs(obj);
// console.log(obj);
