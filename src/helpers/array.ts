export const filterByValue = <T>(array: T[], value: string): T[] => {
  return value
    .toLowerCase()
    .split(' ')
    .reduceRight(
      (acc, filter) =>
        acc.filter(
          (data) =>
            JSON.stringify(data)
              .replace(/("\w+":)/g, '')
              .toLowerCase()
              .indexOf(filter) !== -1,
        ),
      array,
    );
};
