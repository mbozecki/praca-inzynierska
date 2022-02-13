import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { MusicBottomBarComponent } from './components/music-bottom-bar/music-bottom-bar.component';
import { AuthService } from './shared/services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarOnlyLogoComponent } from './components/navbar-only-logo/navbar-only-logo.component';
import { SearchpageComponent } from './pages/searchpage/searchpage.component';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { BeatSingleItemComponent } from './components/beat-single-item/beat-single-item.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import { ProfilepageComponent } from './pages/profilepage/profilepage.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import {MatStepperModule} from '@angular/material/stepper';
import { AddBeatDialogComponent } from './components/add-beat-dialog/add-beat-dialog.component';
import {MatInputModule} from '@angular/material/input';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { PublicProfilePageComponent } from './pages/public-profile-page/public-profile-page.component';
import { FaqpageComponent } from './pages/faqpage/faqpage.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { FixedPlayerComponent } from './components/fixed-player/fixed-player.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavbarComponent,
    SearchBarComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    MusicBottomBarComponent,
    NavbarOnlyLogoComponent,
    SearchpageComponent,
    BeatSingleItemComponent,
    ProfilepageComponent,
    AddBeatDialogComponent,
    PublicProfilePageComponent,
    FaqpageComponent,
    FixedPlayerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSliderModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTabsModule,
    MatDialogModule,
    MatStepperModule,
    MatInputModule,
    NgxMatFileInputModule,
    MatSnackBarModule,
    MatExpansionModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
