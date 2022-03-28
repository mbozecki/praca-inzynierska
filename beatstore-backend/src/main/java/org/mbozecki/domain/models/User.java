package org.mbozecki.domain.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;
import java.util.Set;
import java.util.UUID;

/**
 * The user entity
 */
@Getter
@Setter
@Entity
@Table(name = "t_user")
@JsonIgnoreProperties(ignoreUnknown = true)
public class User {

    @Id
    @Column(name = "guid")
    private String guid = UUID.randomUUID().toString();

    private String name;

    private String bio;

    private String email;

    private String firebase_id;

    @Lob
    private byte[] profilepicture;

    private String[] likedbeats;

    private String[] beatsincart;

    private String[] boughtbeats;

    private String[] soldbeats;


    private double bankaccount;

    public String paypalmail;
}
