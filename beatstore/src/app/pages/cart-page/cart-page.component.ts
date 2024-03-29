import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { loadStripe } from '@stripe/stripe-js';
import { ICreateOrderRequest, IPayPalConfig, ITransactionItem } from 'ngx-paypal';
import { BeatAPIService, BeatDTO, UserDTO, UsersAPIService } from 'src/app/generated';
import { Beat } from 'src/app/shared/models/Beat';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BeatsService } from 'src/app/shared/services/beats.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent implements OnInit {
  stripePromise = loadStripe(environment.stripe);
  public cartBeats: BeatDTO[] = []
  public cartOnlyBeats: BeatDTO[] = []
  public payPalConfig?: IPayPalConfig;
  private likedIDs: string[] = [];
  private allbeats: any[] =[];
  public total: number = 0;
  private hasDownloaded=false;
  public currentUser: UserDTO = {};
  private emptyUser: UserDTO = {

  }
  constructor(
    public beatService: BeatsService,
    private beatAPIService: BeatAPIService,
    private http: HttpClient,
    private authService: AuthService,
    private usersService: UsersAPIService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartOnlyBeats = [];
    console.log(this.cartBeats, "cartbeats")
    this.initConfig();
    this.initData();
  }

  initData() {
    this.cartBeats = [];
    this.total = 0;
    this.authService.uidObs.subscribe((val) => {
      console.log(val);
      this.usersService
        .getusersByCriteria({ firebaseId: val })
        .toPromise()
        .then((pageResult) => {
          this.currentUser =  (pageResult.stream?.filter((usr: UserDTO) => usr.firebase_id == this.authService.uid) as UserDTO[])[0] || this.emptyUser
          console.log('currentny', this.currentUser.beatsincart);
          this.likedIDs = this.currentUser.beatsincart || []
          if (!this.hasDownloaded) {
            this.likedIDs.forEach(id => {
              this.beatAPIService.getBeatById({id: id}).toPromise()
              .then(beat => {
                console.log("bit", beat)
                this.cartBeats.push(beat);
                this.cartOnlyBeats = [...new Set(this.cartBeats)]
                this.cartOnlyBeats.forEach(val => {
                  this.total+=val.price as number;
                })
              });
            })
            this.hasDownloaded= true;
          }
        });
    });
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

  private initConfig(): void {
    var iItems: ITransactionItem[] = [];
    var payee: string;
    this.cartOnlyBeats.forEach(beat => {
      let payee = beat.producedby
      let i: ITransactionItem = {
        name: beat.name as string,
        quantity: '1',
        category: 'DIGITAL_GOODS',
        unit_amount: {
          currency_code: 'USD',
          value: beat.price?.toString() as string,
        }
      }
      iItems.push(i);
      
    })
    this.payPalConfig = {
      currency: 'USD',
      clientId:
        'AfrEGh7QvCnbvO4APMWnBHndzLuAyTmRgZr5m1POXs1LUCEEb5X9ZDUHCDCf1eI979O9F77tEgMmhtYS',
      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: this.total.toString(),
                breakdown: {
                  item_total: {
                    currency_code: 'USD',
                    value: this.total.toString(),
                  },
                },
                
              },

              items: iItems,
            },
          ],
          payee: {
            email_address: payee
          }
        },
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
      },
      onApprove: (data, actions) => {
        console.log(
          'onApprove - transaction was approved, but not authorized',
          data,
          actions
        );
        actions.order.get().then((details: any) => {
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            details
          );
        });
      },
      onClientAuthorization: (data) => {
        console.log(
          'onClientAuthorization - you should probably inform your server about completed transaction at this point',
          data
        );
        let boughtIDS: string[] = [];
        this.cartBeats.forEach(beat => {
          boughtIDS.push(beat.guid as string)
        })
        let updated: UserDTO = {
          ...this.currentUser,
          boughtbeats: boughtIDS,
          beatsincart: [],
        }
        this.usersService.updateUser({id: this.currentUser.guid as string, userDTO: updated  }).toPromise()
          .then(res => {
            console.log(res);
            this.router.navigate(['/profile'])
          })
        //this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        //this.showCancel = true;
      },
      onError: (err) => {
        console.log('OnError', err);
        //this.showError = true;
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
        //this.resetStatus();
      },
    };
  }

  refresh(event: any): void {
    this.ngOnInit();
  }
}
