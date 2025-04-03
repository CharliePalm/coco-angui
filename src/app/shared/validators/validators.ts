import { AbstractControl, ValidatorFn } from "@angular/forms";

const VALID_IMAGE_TYPES = [
    'png',
    'jpeg',
    'jpg',
]
export function isValidFileType(): ValidatorFn {
    return (control: AbstractControl) => {
        if (control?.value) {
            if (!VALID_IMAGE_TYPES.includes(control.value.slice(control.value.indexOf('.') + 1, control.value.length).toLowerCase())) {
                return { 'errors': 'Invalid file type' };
            }
        }
        return null;
    }
}