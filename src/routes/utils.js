const YEAR_SEPARATOR = ', ';
const YEAR_REGEX = /^([1-9][0-9]{0,3})$/;

const isYear = (value) => YEAR_REGEX.test(value);

// eslint-disable-next-line import/prefer-default-export
export const getFormattedYears = (publications, limit) => {
  const years = publications
    ?.map(({ dateOfPublication }) => dateOfPublication)
    .filter((year) => isYear(year));

  return years?.length
    ? years
      .map((year) => parseInt(year, 10))
      .sort((a, b) => b - a)
      .slice(0, limit)
      .join(YEAR_SEPARATOR)
    : '';
};

export const getFormattedPublishers = (publications) => (
  publications?.find(({ publisher }) => !!publisher)?.publisher ?? ''
);

export const getFormattedContributors = (contributors) => (
  contributors?.find(({ name }) => !!name)?.name ?? ''
);
