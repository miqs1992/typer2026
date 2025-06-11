import { AbstractControl } from '@angular/forms';

export function equalValues(control1Name: string, control2Name: string) {
  return (group: AbstractControl) => {
    const value1 = group.get(control1Name)?.value;
    const value2 = group.get(control2Name)?.value;
    return value1 === value2 ? null : { valuesMismatch: true };
  };
}
