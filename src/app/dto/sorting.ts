
export interface SortingOption {
  label: string;
  value: SortingValue | null;
}
;

export interface SortingValue {

  field: string;
  order: string;
}
