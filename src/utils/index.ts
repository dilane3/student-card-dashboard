export const generateImage = () => {
  // Generate avatar randomly

  const random = Math.floor(Math.random() * 50);

  return `https://i.pravatar.cc/150?img=${random}`;
};

// for pagination
export const ITEM_PER_PAGE = 4;

export const formatDate = (d: Date) => {
  const date = new Date(d);

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const months = [
    "Jan",
    "Fev",
    "Mar",
    "Avr",
    "Mai",
    "Juin",
    "Juil",
    "Aout",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  return `${day <= 9 ? `0${day}` : day} ${months[month]} ${year}`;
};

/**
 * Format a date instance in the form day/month/year
 * @param d
 * @returns
 */
export const formatDateBySlash = (d: Date): string => {
  const date = new Date(d);

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  return `${day <= 9 ? `0${day}` : day}/${
    month <= 9 ? `0${month}` : month
  }/${year}`;
};

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
}