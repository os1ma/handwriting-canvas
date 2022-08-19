export const hello = (): void => {
  console.log('hello');
};

interface Position {
  x: number;
  y: number;
}

export class HandWritingCanvas {
  private context;
  private lastPosition: Position | null = null;
  private dragging = false;
  private _isEmpty = true;

  constructor(private canvasElement: HTMLCanvasElement) {
    this.context = canvasElement.getContext('2d')!;

    canvasElement.addEventListener('mousedown', () => {
      this.dragStart();
    });
    canvasElement.addEventListener('mouseup', () => {
      this.dragEnd();
    });
    canvasElement.addEventListener('mouseout', () => {
      this.dragEnd();
    });
    canvasElement.addEventListener('mousemove', (event: MouseEvent) => {
      const pos = { x: event.offsetX, y: event.offsetY };
      this.draw(pos);
    });
  }

  toBlob(type?: string | undefined, quality?: any) {
    return new Promise((resolve) => {
      this.canvasElement.toBlob(
        (result) => {
          resolve(result);
        },
        type,
        quality
      );
    });
  }

  clear() {
    this._isEmpty = true;
    this.context.clearRect(
      0,
      0,
      this.canvasElement.width,
      this.canvasElement.height
    );
  }

  get isEmpty() {
    return this._isEmpty;
  }

  private dragStart() {
    this.context.beginPath();

    this.dragging = true;
    this._isEmpty = false;
  }

  private dragEnd() {
    this.context.closePath();
    this.dragging = false;

    this.lastPosition = null;
  }

  private draw(pos: Position) {
    if (!this.dragging) {
      return;
    }

    this.context.lineCap = 'round';
    this.context.lineJoin = 'round';
    this.context.lineWidth = 10;
    this.context.strokeStyle = 'black';

    if (this.lastPosition === null) {
      this.context.moveTo(pos.x, pos.y);
    } else {
      this.context.moveTo(this.lastPosition.x, this.lastPosition.y);
    }

    this.context.lineTo(pos.x, pos.y);
    this.context.stroke();

    this.lastPosition = pos;
  }
}
