### How To Use

```typescript
type RGB = [number, number, number]

function gradient(color1: RGB, color2: RGB, length: number)

gradient([255, 0, 0], [0, 0, 255], 10)

/* => [
  [255, 0, 0],
  [227, 0, 28],
  [198, 0, 57],
  [170, 0, 85],
  [142, 0, 113],
  [113, 0, 142],
  [85, 0, 170],
  [57, 0, 198],
  [28, 0, 227],
  [0, 0, 255],
]
*/
```
