import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Simple linear dataset → slope and R²",
    actions: [
      { kind: "fill", label: "X Values (independent variable)", value: "1, 2, 3, 4, 5" },
      { kind: "fill", label: "Y Values (dependent variable)", value: "2, 4, 5, 4, 5" },
      { kind: "click", label: "Calculate" },
    ],
    expect: {
      text: ["Regression Results", "Slope (b₁)", "Intercept (b₀)", "R² (Coefficient of Determination)", "Correlation (r)"],
    },
  },
  {
    name: "Perfect linear relationship + prediction",
    actions: [
      { kind: "fill", label: "X Values (independent variable)", value: "1, 2, 3, 4, 5" },
      { kind: "fill", label: "Y Values (dependent variable)", value: "3, 5, 7, 9, 11" },
      { kind: "fill", label: "Predict Y for X =", value: "6" },
      { kind: "click", label: "Calculate" },
    ],
    expect: {
      text: ["Regression Results", "Slope (b₁)", "Predicted ŷ", "Standard Error"],
    },
  },
];
