import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDragDrop]'
})
export class DragDropDirective {

  constructor() { }

  @Output() fileDropped = new EventEmitter();

  @HostListener('dragover', ['$event']) onDragOver(event: DragEvent) {

    event.stopPropagation();
    event.preventDefault();
  }

  @HostListener('dragleave', ['$event']) onDragLeave(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();
  }

  @HostListener('drop', ['$event']) onDrop(event: any) {
    event.stopPropagation();
    event.preventDefault();

    const file = event.dataTransfer.files;

    if (file.length > 0) {
      this.fileDropped.emit(file);
    }
  }
}
