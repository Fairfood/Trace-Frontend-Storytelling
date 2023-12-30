import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  standalone: true,
  imports: [CommonModule, MatTooltipModule, TranslateModule, MatDialogModule],
})
export class TimelineComponent implements OnInit {
  @ViewChild('descTemplate') descTemplate: TemplateRef<any>;

  @Input() timelineData: any;

  @Output() itemClicked = new EventEmitter();

  activeItem: number;
  dialogReference: MatDialogRef<TemplateRef<any>>;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.activeItem = 0;
  }

  itemSelected(index: number): void {
    this.activeItem = index;
    this.itemClicked.emit({
      data: this.timelineData[index],
      index,
    });
  }

  /* istanbul ignore next */
  viweMoreDescription(item: any): void {
    this.dialogReference = this.dialog.open(this.descTemplate, {
      data: item,
    });
  }

  trackByFn(item: any, index: number): any {
    return index;
  }

  /* istanbul ignore next */
  close(): void {
    this.dialogReference?.close();
  }
}
