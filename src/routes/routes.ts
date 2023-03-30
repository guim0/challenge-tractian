interface IRoutes {
  path: string;
  name?: string;
}

export const routes: IRoutes[] = [
  { path: "/", name: "home" },
  { path: "/workorders", name: "workorders" },
];
