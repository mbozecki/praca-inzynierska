import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ProfilepageComponent } from './pages/profilepage/profilepage.component';
import { SearchpageComponent } from './pages/searchpage/searchpage.component';
import { PublicProfilePageComponent } from './pages/public-profile-page/public-profile-page.component';
import { FaqpageComponent } from './pages/faqpage/faqpage.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';

const routes: Routes = [

  { path: '',  pathMatch: 'full', component: HomepageComponent  },
  { path: 'register', component: SignUpComponent }, 
  { path: 'login', component: SignInComponent},
  { path: 'search', component: SearchpageComponent},
  { path: 'profile', component: ProfilepageComponent},
  { path: 'profile/public', component: PublicProfilePageComponent},
  { path: 'faq', component: FaqpageComponent},
  { path: 'cart', component: CartPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
