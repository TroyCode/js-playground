// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function converter(A) {
  const result = [];
  for (let i = 0; i < A.length; i++) {
    for (let j = 0; j < A[i].length; j++) {
      if (A[i][j] === 1) result.push([i + 1, j + 1]);
    }
  }
  return result;
}

function findFurthest(converted) {
  if (converted.length <= 2) {
    return converted;
  }

  let maxDistance =
    Math.abs(converted[1][0] - converted[0][0]) +
    Math.abs(converted[1][1] - converted[0][1]);
  let result = [
    [converted[0][0], converted[0][1]],
    [converted[1][0], converted[1][1]],
  ];
  for (let i = 0; i < converted.length; i++) {
    for (let j = 1; j < converted.length; j++) {
      const distance =
        Math.abs(converted[j][0] - converted[i][0]) +
        Math.abs(converted[j][1] - converted[i][1]);
      console.log(distance);
      if (distance > maxDistance) {
        maxDistance = distance;
        result = [
          [converted[i][0], converted[i][1]],
          [converted[j][0], converted[j][1]],
        ];
      }
    }
  }
  return result;
}

function nearBy(coordinate, distance, size) {
  const result = [];
  const resultAdd = (xy) => {
    if (!result.find((ele) => ele[0] === xy[0] && ele[1] === xy[1])) {
      result.push(xy);
    }
  };
  for (let i = 0; i <= distance; i++) {
    for (let j = 0; i + j <= distance; j++) {
      const section1 = [coordinate[0] - i, coordinate[1] + j];
      const section2 = [coordinate[0] - i, coordinate[1] - j];
      const section3 = [coordinate[0] + i, coordinate[1] - j];
      const section4 = [coordinate[0] + i, coordinate[1] + j];
      if (i === 0 && j === 0) {
        continue;
      }
      if (section1[0] > 0 && section1[1] <= size[1]) {
        resultAdd(section1);
      }
      if (section2[0] > 0 && section2[1] > 0) {
        resultAdd(section2);
      }
      if (section3[0] <= size[0] && section2[1] > 0) {
        resultAdd(section3);
      }
      if (section4[0] <= size[0] && section4[1] <= size[1]) {
        resultAdd(section4);
      }
    }
  }
  return result;
}

function solution(K, A) {
  const buildings = converter(A);
  const M = A.length;
  const N = A[0].length;
  const furthest = findFurthest(buildings);
  console.log(furthest);
  const prints = furthest.map((building) => {
    return nearBy(building, K, [M, N]);
  });
  let result =
    prints.length !== 1
      ? prints[0].filter((print) => {
          return prints[1].find(
            (ele) => ele[0] === print[0] && ele[1] === print[1]
          );
        })
      : prints[0];

  if (prints.length !== 1) {
    for (let i = 2; i < prints.length; i++) {
      const tempResult = [];
      result.map((resultPrint) => {
        if (
          prints[i].find(
            (ele) => ele[0] === resultPrint[0] && ele[1] === resultPrint[1]
          )
        ) {
          tempResult.push(resultPrint);
        }
      });
      result = tempResult;
    }
  }

  return result.length;
}
