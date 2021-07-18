import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FilterComponent } from './filter/filter.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  value = 'demoPreventor';

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl('');
  filteredFruits: Observable<string[]>;
  fruits: string[] = [];
  allFruits = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;

  constructor(public dialog: MatDialog) {
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) =>
        fruit ? this._filter(fruit) : this.allFruits.slice()
      )
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push(value);
      this.fruits = [...new Set(this.fruits)];
    }

    // Clear the input value
    event.input.value = '';
    // event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    console.log(event);
    if (!this.fruits.includes(event.option.value))
      this.fruits.push(event.option.value);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter((fruit) =>
      fruit.toLowerCase().includes(filterValue)
    );
  }

  openDialog(errore: string): void {
    let dialogRef = this.dialog.open(FilterComponent, {
      width: '80%',
      height: '300px',
      data: { error: errore },
      panelClass: 'custom-modalbox',
    });
  }

  onShowDialog(evt: MouseEvent): void {
    const target = new ElementRef(evt.currentTarget);
    const dialogRef = this.dialog.open(FilterComponent, {
      data: { trigger: target },
      backdropClass: 'no-backdrop',
    });
    dialogRef.afterClosed().subscribe((_res) => {
      console.log(_res);
    });
  }
}
