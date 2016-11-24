

// đây là vùng import tất cả các modules bên ngoài
import * as express from 'express';
import * as body_parser from 'body-parser';


// khai báo app chính
let app = express();

// sử dụng các middleware
app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());


// import router
import {BookRouter} from './routes/book.router';

import {ContactRouter} from './routes/contact.router';
import {TienIchRouter} from './routes/tienich.router';
import {DonViGiaRouter} from './routes/donvigia.router';
import {YeuCauBanRouter} from './routes/yeucauban.router';
// sử dụng các router được định nghĩa từ các modules
// app.use('/Contact', [(new ContactRouter()).GetRouteContact()]);
// app.use('/TienIch',(new TienIchRouter()).GetRouteTienIch());
// app.use('/DonViGia',(new DonViGiaRouter()).GetRouteDonViGia());
// app.use('/YeuCauBan',(new YeuCauBanRouter()).GetRouteYeuCauBan());
app.use('/api',[(new ContactRouter().GetRouteContact()),(new TienIchRouter()).GetRouteTienIch(),(new DonViGiaRouter()).GetRouteDonViGia(),(new YeuCauBanRouter()).GetRouteYeuCauBan()]);
export default app;
