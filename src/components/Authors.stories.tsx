import { Authors as AuthorsComponent } from "@/components/Authors";
const authors = [
  {
    firstName: "Maria",
    lastName: " Muster",
    img: "https://picsum.photos/120/120/?image=29",
  },
  {
    firstName: "Hans",
    lastName: "Höllman",
    initials: "HH",
  },
  {
    firstName: "Jean-Jaques",
    lastName: "Langerename",
    img: "https://picsum.photos/120/120/?image=30",
    url: "#",
  },
  {
    firstName: "Sofia",
    lastName: "de Souza",
  },
  {
    firstName: "Katja",
    lastName: "Anna-Beerli",
    img: "https://picsum.photos/120/120/?image=32",
  },
];

export const Authors = () => {
  return <AuthorsComponent authors={authors} />;
};

export default {
  component: AuthorsComponent,
  title: "App components / Authors",
};
