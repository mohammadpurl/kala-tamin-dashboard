
// This is a type declaration file that will augment the existing types

import { GeoLocation } from './index';

declare module 'react-geocode' {
  export function setKey(key: string): void;
  export function setLanguage(language: string): void;
  export function setRegion(region: string): void;
  export function fromAddress(address: string): Promise<any>;
  export function fromLatLng(lat: string, lng: string): Promise<any>;
}
