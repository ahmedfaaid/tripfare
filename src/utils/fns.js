export function slugify(str) {
  return String(str)
    .normalize('NFKD') // split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
    .trim() // trim leading or trailing whitespace
    .toLowerCase() // convert to lowercase
    .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace(/-+/g, '-'); // remove consecutive hyphens
}

export function generateYears() {
  const now = new Date().getFullYear();
  const min = now - 2;
  const max = now + 5;

  let list = [];

  for (let i = min; i <= max; i++) {
    list.push(i);
  }

  return list;
}

export const omitFields = (obj, keys) => {
  if (!keys.length) return obj;

  const result = { ...obj };
  keys.forEach((prop) => {
    delete result[prop];
  });
  return result;
};

export function reshapePostFields(rawPost) {
  if (!rawPost) return null;

  const newPost = {
    ...rawPost,
    size_of_group: +rawPost.size_of_group,
    length_of_stay: {
      num: +rawPost.length_of_stay_num,
      period: rawPost.length_of_stay_period
    },
    date_travelled: {
      month: rawPost.date_travelled_month,
      year: +rawPost.date_travelled_year
    },
    total_budget: +rawPost.total_budget,
    budget: {
      accommodation: +rawPost.budget_accommodation,
      food_drinks: +rawPost.budget_food_drinks,
      activities: +rawPost.budget_activities,
      transportation: +rawPost.budget_transportation
    }
  };

  return omitFields(newPost, [
    'length_of_stay_num',
    'length_of_stay_period',
    'date_travelled_month',
    'date_travelled_year',
    'budget_accommodation',
    'budget_food_drinks',
    'budget_activities',
    'budget_transportation'
  ]);
}
