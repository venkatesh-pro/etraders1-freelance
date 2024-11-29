export const formatNumberToCurrency = (price: number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",

    trailingZeroDisplay: "stripIfInteger", // This is probably what most people
  });

  // Use the formatter with the value of an input.
  return formatter.format(price);
};
