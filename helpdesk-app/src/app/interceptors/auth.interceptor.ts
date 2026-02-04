import { HTTP_INTERCEPTORS, HttpInterceptorFn } from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (request, next) => {
  let token = localStorage.getItem('token');

  if (token) {
    debugger;
    const cloneReq = request.clone({ headers: request.headers.set('Authorization', `Baerer ${token}`) });
    console.log(cloneReq);    
    return next(cloneReq);
  } else {
    return next(request);
  }
};
