import { markdown } from "catalog";

const Hero = () => markdown`
> \`Hero\` showcases a page's title and lead text.

- It can optionally be rounded (used for market subpages) and have a top margin.
- **This component should be used on every page**.

## Usage

~~~code
lang: jsx
---
import { Hero } from "@/components/hero";

<Hero title="Eggs" lead="🥚🥚🥚" />
~~~

## Props

~~~table
span: 5
rows:
  - Name: '\`variant\`'
    Type: '\`regular\` | \`market\`'
    Default: '\`regular\`'
    Description: Variant of the component. For '\`market\`', rounded borders and a top margin is added.
  - Name: '\`title\`'
    Type: '\`string\`'
    Required: ✔️
    Description: Title of the component.
  - Name: '\`lead\`'
    Type: '\`string\`'
    Required: ✔️
    Description: Lead text of the component.
~~~
`;

export default Hero;
