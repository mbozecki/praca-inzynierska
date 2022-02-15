import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { Beat } from 'src/app/shared/models/Beat';
import { BeatsService } from 'src/app/shared/services/beats.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  stripePromise = loadStripe(environment.stripe);
  public cartBeats: Beat[] = [];
  constructor(public beatService: BeatsService, private http: HttpClient) { }

  ngOnInit(): void {
    this.beatService.getAllBeats().subscribe((res) => {
      this.cartBeats = res.slice(0,2);
    })
  }

  async pay(): Promise<void> {
    // here we create a payment object
    const payment = {
      name: 'Beats from beatstore',
      currency: 'usd',
      // amount on cents *10 => to be on dollar
      amount: 99900,
      quantity: '1',
      cancelUrl: 'http://localhost:4200/cancel',
      successUrl: 'http://localhost:4200/success',
    };

    const stripe = await this.stripePromise;

    // this is a normal http calls for a backend api
    this.http
      .post(`${environment.serverUrl}/payment`, payment)
      .subscribe((data: any) => {
        console.log(data);
        // I use stripe to redirect To Checkout page of Stripe platform
        stripe?.redirectToCheckout({
          sessionId: data.id,
        });
      });
  }
}
