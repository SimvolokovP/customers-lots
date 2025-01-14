interface IRouterLink {
  text: string;
  to: string;
}

export const routerLinks: IRouterLink[] = [
  { text: "customers", to: "/customers" },
  { text: "lots", to: "/lots" },
];
