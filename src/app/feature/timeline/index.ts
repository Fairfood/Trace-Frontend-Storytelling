export { TimelineComponent } from './timeline.component';
/*
# Timeline Component

This Angular component (`TimelineComponent`) is responsible for displaying a timeline with various items and allowing interaction with those items.

## Properties

- `timelineData: any`: Input property to receive timeline data.
- `activeItem: number`: Tracks the index of the active timeline item.
- `dialogReference: MatDialogRef<TemplateRef<any>>`: Reference to the MatDialog to display a template.
- `descTemplate: TemplateRef<any>`: Reference to a template for displaying more item description.

## Methods

- `ngOnInit(): void`: Angular lifecycle hook called after component initialization. Initializes `activeItem`.
- `itemSelected(index: number): void`: Sets the active item and emits an event with the selected item's data and index.
- `viweMoreDescription(item: any): void`: Opens a dialog to display more description for a specific item.
- `trackByFn(item: any, index: number): any`: Track function for ngFor to improve rendering performance.
- `close(): void`: Closes the dialog.

## Usage

```html
<app-timeline
  [timelineData]="timelineData"
  (itemClicked)="onItemClicked($event)"
></app-timeline>
```

```typescript
onItemClicked(event: any): void {
  // Handle item click event here
}
```

This component provides a timeline display with interaction capabilities and allows for handling item click events.
*/
