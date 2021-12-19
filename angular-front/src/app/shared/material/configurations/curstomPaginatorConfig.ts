import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomMatPaginatorIntl } from './CustomLabelsPaginators';

export function CustomPaginator() {
  const customPaginatorIntl = new CustomMatPaginatorIntl();

  customPaginatorIntl.itemsPerPageLabel = 'Heroes por pagina:';

  return customPaginatorIntl;
}

