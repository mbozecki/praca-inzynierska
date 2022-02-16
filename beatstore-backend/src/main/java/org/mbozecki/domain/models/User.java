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

    @OneToMany(cascade = CascadeType.ALL)
    private List<Beat> likedbeats;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Beat> beatsincart;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Beat> boughtbeats;


    @OneToMany(cascade = CascadeType.ALL)
    private List<Beat> soldbeats;


    private double bankaccount;
}
