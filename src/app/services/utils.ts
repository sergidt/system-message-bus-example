export function highlightElement(el, zone, color) {
    const nativeElement = el.nativeElement;
    nativeElement.style.backgroundColor = color;
    zone.runOutsideAngular(() => setTimeout(() => nativeElement.style.backgroundColor = 'white', 500));
}


export function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }