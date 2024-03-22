import { MathJax } from "better-react-mathjax";
import { match } from "ts-pattern";

interface Props {
  inline?: boolean;
  align?: string;
  children: React.ReactNode;
}

const MathJaxComponent = (props: Props) => {
  const { children, inline = false, align = "left" } = props;
  const alignment = match(align)
    .returnType<"left" | "center" | "right">()
    .with("left", () => "left")
    .with("center", () => "center")
    .with("right", () => "right")
    .otherwise(() => "left");
  return <MathJax inline={inline} style={{ textAlign: alignment }}>{`$${children}$`}</MathJax>;
};

export default MathJaxComponent;
