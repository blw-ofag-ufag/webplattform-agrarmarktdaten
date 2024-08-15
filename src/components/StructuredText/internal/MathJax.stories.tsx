import MathJaxComponent from "./MathJax";

export const MathJax = () => {
  return <MathJaxComponent>{"\\(a^2 + b^2 = c^2\\)"}</MathJaxComponent>;
};
export default {
  component: MathJax,
  title: "App Components / MathJax",
};
