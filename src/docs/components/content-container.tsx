import { markdown } from "catalog";

const ContentContainer = () => markdown`
> \`ContentContainer\` assures proper horizontal spacing and display of elements on a given page.

- The amount of X margin is based on a \`md\` breakpoint defined in MUI theme object.
- Additionally, it is a column flex container that puts equal spacing between its children.
- **This component should be used on every page**.

## Usage

~~~code
lang: jsx
---
import { ContentContainer } from "@/components/content-container";

<ContentContainer>
  ...
</ContentContainer>
~~~

## Props

~~~table
span: 4
rows:
  - Name: '\`children\`'
    Type: '\`node\`'
    Required: ✔️
    Description: Content of the component.
  - Name: '\`sx\`'
    Type: '\`sx\`'
    Description: Styles to override.
~~~
`;

export default ContentContainer;
