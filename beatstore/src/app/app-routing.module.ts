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
import { CancelComponent } from './components/cancel/cancel.component';
import { SuccessComponent } from './components/success/success.component';
import {EditProfileComponent} from './components/edit-profile/edit-profile.component'
import { BeatSingleInfoComponent } from './pages/beat-single-info/beat-single-info.component';
import { FileGuard } from './shared/file-guard.guard';
const routes: Routes = [

  { path: '',  pathMatch: 'full', component: HomepageComponent  },
  { path: 'register', component: SignUpComponent }, 
  { path: 'login', component: SignInComponent},
  { path: 'search', component: SearchpageComponent},
  { path: 'search/:name', component: SearchpageComponent},
  { path: 'profile', component: ProfilepageComponent},
  { path: 'profile/:userid', component: PublicProfilePageComponent},
  { path: 'faq', component: FaqpageComponent},
  { path: 'cart', component: CartPageComponent},
  { path: 'cancel', component: CancelComponent },
  { path: 'success', component: SuccessComponent },
  { path: 'profile/edit', component: EditProfileComponent},
  { path: 'beat/:beatid', component: BeatSingleInfoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
