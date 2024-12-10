import * as moment from 'moment-timezone';
import { Provider } from '@nestjs/common';

export const MomentProvider: Provider = {
  provide: 'MOMENT',
  useFactory: () => {
    return moment.tz.setDefault('Europe/Moscow'); // например, "Europe/Moscow"
  },
};
