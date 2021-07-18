import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {

  // constructor( public dialogRef: MatDialogRef<FilterComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: any) { }
  // 
    // onClick(): void {
    //   this.dialogRef.close();
    // }  

    private readonly _matDialogRef: MatDialogRef<FilterComponent>;
    private readonly triggerElementRef: ElementRef;
    constructor(_matDialogRef: MatDialogRef<FilterComponent>,
                @Inject(MAT_DIALOG_DATA) data: { trigger: ElementRef }) {
      this._matDialogRef = _matDialogRef;
      this.triggerElementRef = data.trigger;
    }
  
    ngOnInit() {
      const matDialogConfig: MatDialogConfig = new MatDialogConfig();
      const rect = this.triggerElementRef.nativeElement.getBoundingClientRect();
      matDialogConfig.position = { left: `${rect.left -150}px`, top: `${rect.bottom}px` };
      matDialogConfig.width = '300px';
      matDialogConfig.height = '400px';
      this._matDialogRef.updateSize(matDialogConfig.width, matDialogConfig.height);
      this._matDialogRef.updatePosition(matDialogConfig.position);
    }
    cancel(): void {
      this._matDialogRef.close(null);
    }
}
