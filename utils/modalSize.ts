
export const getSizeClass: any = (size: ModalSize = 'medium') => {
  switch (size) {
    case 'small':
      return '25vw';
    case 'regular':
      return '45vw';
    case 'medium':
      return '62vw';
    case 'large':
      return '80vw';
    case 'full':
      return '92vw';
    default:
      return '50vw';
  }
};