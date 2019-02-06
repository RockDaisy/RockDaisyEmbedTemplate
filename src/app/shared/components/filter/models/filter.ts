export class AppFilter {
  public Key: string;
  public Label: string;
  public Type: FilterType;
  public Options: any;
  public Value: any;

  public constructor(init?: Partial<AppFilter>) {
    Object.assign(this, init);
  }

  public hasValue(): boolean {
    switch (this.Type) {
      case FilterType.MultiSelect:
        return this.Value && this.Value.length;
      case FilterType.DateRange:
        return this.Value && this.Value.start && this.Value.end;
      default:
        return !!this.Value;
    }
  }
}

export enum FilterType {
  DateRange,
  MultiSelect,
  DropDown
}

