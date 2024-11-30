export const data = {
  chooseYourModel: [
    {
      name: "Space One",
      length: "16 square metres",
      price: 64000,
      isSelected: true,
    },
    {
      name: "Space One Plus",
      length: "25 square metres",
      price: 114000,
      isSelected: false,
    },
  ],

  chooseYourFinish: [
    { color: "#000000", name: "BLACK", isSelected: false },
    { color: "#E8E8E8", name: "WHITE", isSelected: false },
    { color: "#BCB7AD", name: "DESERT", isSelected: true },
    { color: "#565656", name: "SPACE", isSelected: false },
    { color: "#344C3F", name: "SAGE", isSelected: false },
  ],
  chooseYourOrientation: [
    {
      name: "Standard",
      description: "Canopy eave on the left",
      isSelected: true,
    },
    {
      name: "Mirrored",
      description: "Canopy eave on the right",
      isSelected: false,
    },
  ],

  // for interiors
  chooseYourLayout: [
    {
      name: "Open plan",
      description: "Mesa décor",
      price: 64000,
      isSelected: true,
    },
    {
      name: "Wardrobe",
      description: "Mesa Oak décor",
      price: 72000,
      isSelected: false,
    },
  ],
  optionalUpgradesForLayout: [
    {
      name: "Sheer curtains",
      description: "Privacy and shade",
      price: 3700,
      isSelected: true,
    },
    {
      name: "13-inch display",
      description: "Bigger Ultra Retina touchscreen",
      price: 2200,
      isSelected: false,
    },
  ],
  chooseYourEnergy: [
    {
      name: "No solar",
      description: "Power with existing utilities",
      isSelected: true,
    },
    {
      name: "Full solar",
      description: "Tesla Powerwall 3 and solar array",
      price: 28000,
      isSelected: false,
    },
  ],
  optionalUpgradesForEnergy: [
    {
      name: "Sheer curtains",
      description: "Privacy and shade",
      price: 3700,
      isSelected: false,
    },
  ],
};
