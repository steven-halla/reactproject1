export const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  export const categories = [
      `Animal`,
      `Baby`,
      `Birthday`,
      `Congratulation`,
      // `Father's Day`,
      `Graduation`,
      `Holidays`,
      // `Mother's Day`,
      `Nature`,
      `Scenery`,
      `Thank you`,
      // `Valetine`
];