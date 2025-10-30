// export interface ParamsDictionary {
//   [key: string]: (string | boolean | number);
// }

export interface ParamsDictionary {
  [key: string]: (string | boolean | number | ParamsDictionary | ParamsDictionary[]);
}