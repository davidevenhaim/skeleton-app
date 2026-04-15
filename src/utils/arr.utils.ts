import _ from "lodash";

export const isEqual = <T>(arr1: T, arr2: T): boolean => _.isEqual(arr1, arr2);
