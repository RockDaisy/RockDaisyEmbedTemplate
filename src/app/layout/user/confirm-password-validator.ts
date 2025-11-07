import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
	const password = control.get('Password');
	const confirmPassword = control.get('ConfirmPassword');

	if(!password || !confirmPassword || password.value === confirmPassword.value) {
		return null;
	}

	return {passwordMismatch: true};
};
