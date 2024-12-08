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
    { color: "#000000", name: "BLACK", isSelected: true },
    { color: "#E8E8E8", name: "WHITE", isSelected: false },
    { color: "#BCB7AD", name: "DESERT", isSelected: false },
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
  chooseYourLayoutFor16: [
    {
      name: "Studio",
      description: "Mesa décor",
      price: 64000,
      isSelected: true,
    },
    {
      name: "Bedroom",
      description: "Mesa Oak décor",
      price: 72000,
      isSelected: false,
    },
  ],
  chooseYourLayoutFor25: [
    {
      name: "Bedoom suite",
      description: "Mesa décor",
      price: 64000,
      isSelected: true,
    },
    {
      name: "Bedroom ensuite",
      description: "Mesa Oak décor",
      price: 72000,
      isSelected: false,
    },
    {
      name: "Studio ensuite",
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
    // {
    //   name: "13-inch display",
    //   description: "Bigger Ultra Retina touchscreen",
    //   price: 2200,
    //   isSelected: false,
    // },
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
      name: "Security screens",
      description: "Deters bugs and insects",
      price: 3100,
      isSelected: false,
    },
  ],
};

export interface ConfiguratorData {
  chooseYourModel: Array<{
    name: string;
    length: string;
    price: number;
    isSelected: boolean;
  }>;
  chooseYourFinish: Array<{
    color: string;
    name: string;
    isSelected: boolean;
  }>;
  chooseYourOrientation: Array<{
    name: string;
    description: string;
    isSelected: boolean;
  }>;
  chooseYourLayoutFor16: Array<{
    name: string;
    description: string;
    price: number;
    isSelected: boolean;
  }>;
  chooseYourLayoutFor25: Array<{
    name: string;
    description: string;
    price: number;
    isSelected: boolean;
  }>;
  optionalUpgradesForLayout: Array<{
    name: string;
    description: string;
    price: number;
    isSelected: boolean;
  }>;
  chooseYourEnergy: Array<{
    name: string;
    description: string;
    price?: number; // Optional since "No solar" doesn't have a price
    isSelected: boolean;
  }>;
  optionalUpgradesForEnergy: Array<{
    name: string;
    description: string;
    price: number;
    isSelected: boolean;
  }>;
}
