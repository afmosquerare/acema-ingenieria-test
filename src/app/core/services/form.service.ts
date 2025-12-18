import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

@Injectable({
    providedIn: 'root',
  })
  export class FormService {
    /**
     * Marca todos los controles de un FormGroup como "dirty" y "touched".
     */
    public markAllControlsAsDirtyAndTouched(formGroup: FormGroup): void {
      Object.keys(formGroup.controls).forEach((controlName) => {
        const control = formGroup.get(controlName);
        if (control) {
          control.markAsDirty();
          control.markAsTouched();
        }
      });
    }
  
    /**
     * Resetea un formulario y marca todos los controles como "pristine" y "untouched".
     */
    public resetForm(formGroup: FormGroup): void {
      formGroup.reset();
      Object.keys(formGroup.controls).forEach((controlName) => {
        const control = formGroup.get(controlName);
        if (control) {
          control.markAsPristine();
          control.markAsUntouched();
        }
      });
    }
  
    /**
     * Valida si un formulario es válido y muestra errores si no lo es.
     */
    public validateForm(form: FormGroup | FormControl): boolean {
      if(form instanceof FormGroup){
        this.markAllControlsAsDirtyAndTouched( form );
      }
      else{
        form.markAsDirty()
        form.markAsTouched()
      }
      return form.valid;
    }
  }