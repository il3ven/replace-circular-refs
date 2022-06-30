## `replaceCircularRefs`

replaceCircularRefs is a function that fixes circular objects in-place. A circular object is replaced by `"Circular [Object]"`.

### Example

```js
const obj = {
  a: 1,
}

obj.b = obj // This converts obj into a circular object

JSON.stringify(obj) // This will throw an error because obj is circular

replaceCircularRefs(obj) // This will fix obj in-place

console.log(obj);
// Output:
// {
//   a: 1,
//   b: "Circular [Object]"
// }

JSON.stringify(obj); // Will not throw error because obj is modified in place
```

### Another Example

```js
const obj = {
  a: 1,
  b: {
    c: 2
  }
}

obj.b.d = obj.b

JSON.stringify(obj) // This will throw an error because obj is circular

replaceCircularRefs(obj)

console.log(obj);
// Output:
// {
//   a: 1,
//   b: {
//     c: 2,
//     d: "Circular [Object]"
//   }
// }

JSON.stringify(obj); // Will not throw error because obj is modified in place
```

### Task

The task is to implement `replaceCircularRefs` function in `index.js` as decribed above such that all test cases pass.

#### Things to note

- `replaceCircularRefs` will modify the circular object in-place
- `replaceCircularRefs` will not modify the object if it is not circular

### How to run tests?

```
npm install
npx jest
```
