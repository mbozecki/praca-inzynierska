package org.mbozecki.rs.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CheckoutPayment {
    private String name;
    private String currency;
    private String successUrl;
    private String cancelUrl;
    private long amount;
    private long quantity;
}