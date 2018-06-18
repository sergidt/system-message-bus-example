export function highlightElement(el, zone, color) {
    const nativeElement = el.nativeElement;
    nativeElement.style.backgroundColor = color;
    zone.runOutsideAngular(() => setTimeout(() => nativeElement.style.backgroundColor = 'white', 500));
}
