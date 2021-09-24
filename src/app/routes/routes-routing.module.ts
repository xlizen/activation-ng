import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SimpleGuard} from '@delon/auth';
import {environment} from '@env/environment';
// layout
import {LayoutBasicComponent} from '../layout/basic/basic.component';
import {LayoutPassportComponent} from '../layout/passport/passport.component';
// dashboard pages
// single pages
import {CallbackComponent} from './passport/callback.component';
import {UserLockComponent} from './passport/lock/lock.component';
// passport pages
import {UserLoginComponent} from './passport/login/login.component';
import {UserRegisterResultComponent} from './passport/register-result/register-result.component';
import {UserRegisterComponent} from './passport/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutBasicComponent,
    canActivate: [SimpleGuard],
    children: [
      {path: '', redirectTo: 'order/list', pathMatch: 'full'},
      {path: 'exception', loadChildren: () => import('./exception/exception.module').then((m) => m.ExceptionModule)},
      // 业务子模块
      {path: 'order', loadChildren: () => import('./order/order.module').then((m) => m.OrderModule)},
      {path: 'pro', loadChildren: () => import('./pro/pro.module').then((m) => m.ProModule)},
      {path: 'user', loadChildren: () => import('./user/user.module').then((m) => m.UserModule)}
      ],
  },
  // 空白布局
  // {
  //     path: 'blank',
  //     component: LayoutBlankComponent,
  //     children: [
  //     ]
  // },
  // passport
  {
    path: 'passport',
    component: LayoutPassportComponent,
    children: [
      {path: 'login', component: UserLoginComponent, data: {title: '登录', titleI18n: 'pro-login'}},
      {path: 'register', component: UserRegisterComponent, data: {title: '注册', titleI18n: 'pro-register'}},
      {
        path: 'register-result',
        component: UserRegisterResultComponent,
        data: {title: '注册结果', titleI18n: 'pro-register-result'}
      },
      {path: 'lock', component: UserLockComponent, data: {title: '锁屏', titleI18n: 'lock'}},
    ],
  },
  // 单页不包裹Layout
  {path: 'passport/callback/:type', component: CallbackComponent},
  {path: '**', redirectTo: 'exception/404'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: environment.useHash,
      // NOTICE: If you use `reuse-tab` component and turn on keepingScroll you can set to `disabled`
      // Pls refer to https://ng-alain.com/components/reuse-tab
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class RouteRoutingModule {
}
