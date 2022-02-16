package org.mbozecki.rs.api;

import com.stripe.Stripe;

import java.util.HashMap;
import java.util.Map;

import org.mbozecki.rs.dtos.CheckoutPayment;
import org.springframework.web.bind.annotation.RequestBody;

import com.google.gson.Gson;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import javax.ws.rs.POST;
import javax.ws.rs.Path;


@Path("/api/payment")
public class StripeController {
    private static final Gson gson = new Gson();

    @POST
    public String paymentWithCheckoutPage(@RequestBody CheckoutPayment payment) throws StripeException {
        init();
        SessionCreateParams params = SessionCreateParams.builder()
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                .setMode(SessionCreateParams.Mode.PAYMENT).setSuccessUrl(payment.getSuccessUrl())
                .setCancelUrl(
                        payment.getCancelUrl())
                .addLineItem(
                        SessionCreateParams.LineItem.builder().setQuantity(payment.getQuantity())
                                .setPriceData(
                                        SessionCreateParams.LineItem.PriceData.builder()
                                                .setCurrency(payment.getCurrency()).setUnitAmount(payment.getAmount())
                                                .setProductData(SessionCreateParams.LineItem.PriceData.ProductData
                                                        .builder().setName(payment.getName()).build())
                                                .build())
                                .build())
                .build();
        Session session = Session.create(params);
        Map<String, String> responseData = new HashMap<>();
        // We get the sessionId and we putted inside the response data you can get more info from the session object
        responseData.put("id", session.getId());
        // We can return only the sessionId as a String
        return gson.toJson(responseData);
    }

    private static void init() {
        Stripe.apiKey = "sk_test_51KT2eYERavA46NSdyWvvqTyiEFpdkwwkypo1kWMxxMFDcfM8Hs2stbydcpXTtqMfl0y6lXhD7V6RA0WCnSjtgIhQ00FSaN4gIl";
    }
}