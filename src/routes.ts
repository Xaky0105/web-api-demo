import { WebShare } from "./web-share";
import { ContactPicker } from "./contact-picker";

type Route = {
  path: string;
  Component: React.FC;
};

export const ROUTES: Route[] = [
  { Component: WebShare, path: "/web-share" },
  { Component: ContactPicker, path: "/contact-picker" },
];
