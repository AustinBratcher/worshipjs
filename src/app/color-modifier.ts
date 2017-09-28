import { Rgba } from './rgba/rgba';

export interface ColorModifier {
  modifyColors(rgba: Rgba, callback: Function);
}
