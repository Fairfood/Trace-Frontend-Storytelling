/**
 * dir-asc or desc
 * @param array any array
 * @param key string
 * @param dir string
 * @returns
 */
export const sortByKey = (array: any[], key: string, dir: 'asc' | 'desc') => {
  return array.sort(function (a: any, b: any) {
    const x = a[key];
    const y = b[key];
    const asc = x > y ? 1 : 0;
    const desc = y > x ? 1 : 0;
    if (dir === 'asc') {
      return x < y ? -1 : asc;
    } else {
      return y < x ? -1 : desc;
    }
  });
};

/**
 * Depicts the limit of characters for a field
 */
export enum CHAR_LIMIT {
  claimName = 25,
  claimDesc = 500,
  pageTitle = 60,
  projectTitle = 75,
  button = 20,
  projectDesc = 400,
  actorDesc = 250,
  productDesc = 200,
  videoTitle = 60,
  videoDesc = 200,
  shareMessage = 150,
  productName = 30,
  interventionName = 50,
  interventionDesc = 300,
  programTitle = 50,
}

/**
 * Trims the field name to the specified character limit and adds ellipsis if needed.
 * @param limit The maximum character limit for the field name.
 * @param field The field name to be trimmed.
 * @returns The trimmed field name.
 */
export const TrimFieldName = (limit: number, field: string): string => {
  // Check if the length of the field exceeds the character limit
  if (field.length > limit) {
    // Trim the field and add ellipsis
    return `${field.substring(0, limit)}...`;
  }
  // Return the original field as it is within the character limit
  return field;
};

/**
 * Sample program data for demonstration purposes.
 * If no program data it will be shown
 */
export const PROGRAM_SAMPLE = {
  id: 'lp9nO',
  tittle: 'Helping farmers find new markets to grow their business',
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Ut enim ad minim veniamLorem ipsum dolor sit amet, 
    consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
  program_stats_details: [
    {
      is_visible: true,
      value: 278.0,
      name: 'Farmers benefited',
    },
  ],
};

/**
 * Response formatter
 * @param apiRes ApiResponse
 * @returns
 */
export const apiFormatter = (apiRes: any) => {
  const { data, code, success } = apiRes;

  if (code === 200 && success) {
    return data;
  }
  return null;
};
