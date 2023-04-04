import { Method } from 'axios';

export interface DownloadFileParams {
  url: string;
  method?: Method;
  fileName?: string;
}
